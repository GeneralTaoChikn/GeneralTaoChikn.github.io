/// <reference lib="webworker" />

import {
  env,
  pipeline,
  TextStreamer,
  type TextGenerationPipeline,
} from "@huggingface/transformers";
import { buildPrompt, retrieveSources } from "../../lib/resume-chat-context";
import {
  MAX_QUESTION_LENGTH,
  UNKNOWN_ANSWER,
  type ChatRequest,
  type ChatResponse,
} from "../../lib/resume-chat-types";

declare const self: DedicatedWorkerGlobalScope;
env.allowLocalModels = false;
// GitHub Pages cannot set cross-origin isolation headers. A single WASM thread
// works without SharedArrayBuffer; inference already runs off the UI thread.
if (env.backends.onnx.wasm) env.backends.onnx.wasm.numThreads = 1;

let generator: TextGenerationPipeline | null = null;
let busy = false;
const send = (message: ChatResponse) => self.postMessage(message);

async function load(cpuOnly = false) {
  let device: "webgpu" | "wasm" = "wasm";
  if (!cpuOnly && "gpu" in self.navigator) {
    try {
      const gpu = self.navigator.gpu as { requestAdapter(): Promise<unknown> };
      if (await gpu.requestAdapter()) device = "webgpu";
    } catch {
      /* Use CPU when a GPU adapter is unavailable. */
    }
  }
  send({ type: "progress", label: "Downloading model files…" });
  const create = (backend: "webgpu" | "wasm") =>
    pipeline("text-generation", "HuggingFaceTB/SmolLM2-360M-Instruct", {
      revision: "a10cc1512eabd3dde888204e902eca88bddb4951",
      device: backend,
      dtype: "q4",
      progress_callback: (event) => {
        if (event.status === "progress") {
          send({
            type: "progress",
            label: `Downloading ${event.file.split("/").at(-1)}…`,
            progress: Math.min(100, Math.round(event.progress)),
          });
        } else if (event.status === "done") {
          send({ type: "progress", label: "Preparing the model…" });
        }
      },
    });
  try {
    generator = await create(device);
  } catch (error) {
    if (device === "wasm") throw error;
    device = "wasm";
    send({ type: "progress", label: "GPU unavailable. Preparing CPU mode…" });
    generator = await create(device);
  }
  send({ type: "ready", device });
}

self.addEventListener(
  "message",
  async ({ data }: MessageEvent<ChatRequest>) => {
    if (busy) return;
    busy = true;
    try {
      if (data.type === "load") {
        await load(data.cpuOnly);
      } else if (data.type === "generate") {
        if (!generator) throw new Error("Model not loaded");
        const question = data.messages
          .at(-1)
          ?.content.trim()
          .slice(0, MAX_QUESTION_LENGTH);
        if (!question) throw new Error("Question is empty");
        const previousQuestion = data.messages
          .slice(0, -1)
          .findLast((message) => message.role === "user")?.content;
        const sources = retrieveSources(question, previousQuestion);
        if (!sources.length) {
          send({
            type: "complete",
            id: data.id,
            text: UNKNOWN_ANSWER,
            sources: [],
          });
        } else {
          let text = "";
          const streamer = new TextStreamer(generator.tokenizer, {
            skip_prompt: true,
            skip_special_tokens: true,
            callback_function: (chunk: string) => {
              text += chunk;
              send({ type: "token", id: data.id, text });
            },
          });
          await generator(buildPrompt(data.messages, sources), {
            max_new_tokens: 160,
            do_sample: false,
            repetition_penalty: 1.1,
            streamer,
          });
          send({
            type: "complete",
            id: data.id,
            text: text.trim() || UNKNOWN_ANSWER,
            sources,
          });
        }
      }
    } catch (error) {
      console.error("Résumé assistant:", error);
      send({
        type: "error",
        message:
          "The assistant couldn’t finish on this device. Check your connection and try CPU mode, or use the résumé and contact links below.",
      });
    } finally {
      busy = false;
    }
  },
);
