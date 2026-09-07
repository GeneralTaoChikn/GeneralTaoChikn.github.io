"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Button, Card, Progress, TextArea } from "@radix-ui/themes";
import {
  ArrowUpRight,
  Bot,
  Check,
  Download,
  FileText,
  LoaderCircle,
  LockKeyhole,
  MessageCircle,
  Send,
  Square,
  Trash2,
} from "lucide-react";
import {
  MAX_HISTORY_TURNS,
  MAX_QUESTION_LENGTH,
  type ChatResponse,
  type ChatTurn,
  type ResumeSource,
} from "@/lib/resume-chat-types";

type Status = "idle" | "loading" | "ready" | "generating" | "error";
type Message = ChatTurn & {
  id: number;
  complete: boolean;
  sources?: ResumeSource[];
};
const suggestions = [
  "What backend experience does Chris have?",
  "How has Chris improved performance?",
  "Where did Chris study?",
];
const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;

export default function ResumeChat() {
  const [status, setStatus] = useState<Status>("idle");
  const [device, setDevice] = useState<"webgpu" | "wasm">("wasm");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState<number>();
  const [loadingLabel, setLoadingLabel] = useState("Preparing the assistant…");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const worker = useRef<Worker | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const followOutput = useRef(true);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const releaseWorker = () => {
    clearTimer();
    worker.current?.terminate();
    worker.current = null;
  };
  useEffect(
    () => () => {
      worker.current?.terminate();
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (followOutput.current && logRef.current)
      logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  const fail = (message: string) => {
    releaseWorker();
    setStatus("error");
    setError(message);
    setMessages((current) => current.filter((item) => item.complete));
  };
  const start = (cpuOnly = false) => {
    releaseWorker();
    setError("");
    setNotice("");
    setProgress(undefined);
    setLoadingLabel("Preparing the assistant…");
    setStatus("loading");
    try {
      const instance = new Worker(
        new URL("./chat.worker.ts", import.meta.url),
        { type: "module" },
      );
      worker.current = instance;
      timer.current = setTimeout(
        () =>
          fail(
            "The download is taking longer than expected. Check your connection and retry; completed model files may already be cached.",
          ),
        300_000,
      );
      instance.onmessage = ({ data }: MessageEvent<ChatResponse>) => {
        if (worker.current !== instance) return;
        if (data.type === "progress") {
          setLoadingLabel(data.label);
          setProgress(data.progress);
        }
        if (data.type === "ready") {
          clearTimer();
          setDevice(data.device);
          setStatus("ready");
          setNotice("Ready for your question.");
        }
        if (data.type === "token")
          setMessages((current) =>
            current.map((item) =>
              item.id === data.id ? { ...item, content: data.text } : item,
            ),
          );
        if (data.type === "complete") {
          clearTimer();
          setMessages((current) =>
            current.map((item) =>
              item.id === data.id
                ? {
                    ...item,
                    content: data.text,
                    complete: true,
                    sources: data.sources,
                  }
                : item,
            ),
          );
          setStatus("ready");
          setNotice("Answer complete.");
        }
        if (data.type === "error") fail(data.message);
      };
      instance.onerror = () =>
        fail(
          "The assistant couldn’t start in this browser. Try again using CPU mode, or read the résumé directly.",
        );
      instance.onmessageerror = () =>
        fail("The assistant connection was interrupted. Please restart it.");
      instance.postMessage({ type: "load", cpuOnly });
    } catch {
      fail(
        "This browser cannot start the assistant. You can still download the résumé or contact Chris.",
      );
    }
  };

  const submit = () => {
    const question = input.trim();
    if (!question || status !== "ready" || !worker.current) return;
    const user: Message = {
      id: ++nextId.current,
      role: "user",
      content: question.slice(0, MAX_QUESTION_LENGTH),
      complete: true,
    };
    const answer: Message = {
      id: ++nextId.current,
      role: "assistant",
      content: "",
      complete: false,
    };
    const history = [...messages.filter((item) => item.complete), user].slice(
      -MAX_HISTORY_TURNS,
    );
    setMessages((current) => [...current, user, answer]);
    setInput("");
    setStatus("generating");
    setNotice("Reading the résumé and preparing an answer…");
    followOutput.current = true;
    timer.current = setTimeout(
      () =>
        fail(
          "This device is taking too long to answer. Try a shorter question after restarting the assistant.",
        ),
      180_000,
    );
    worker.current.postMessage({
      type: "generate",
      id: answer.id,
      messages: history.map(({ role, content }) => ({ role, content })),
    });
  };
  const stop = () => {
    releaseWorker();
    setStatus("idle");
    setMessages((current) => current.filter((item) => item.complete));
    setNotice(
      "Stopped. Start the assistant again to continue; cached files can be reused.",
    );
  };
  const reset = () => {
    setMessages([]);
    setInput("");
    setNotice("Conversation cleared.");
    inputRef.current?.focus();
  };
  const busy = status === "loading" || status === "generating";

  return (
    <section id="chat" className="content-section" aria-labelledby="chat-title">
      <div className="section-heading">
        <div className="section-title">
          <span className="section-number">06</span>
          <h2 id="chat-title">Ask my résumé</h2>
        </div>
        <p>A quick conversation about the experience behind the work.</p>
      </div>
      <div className="resume-chat-layout">
        <aside className="chat-intro">
          <span className="icon-tile large">
            <MessageCircle />
          </span>
          <h3>What would you like to know?</h3>
          <p>
            Explore Chris’s skills, career, and education. Answers use
            information from this portfolio, with résumé excerpts to check the
            details.
          </p>
          <div className="chat-privacy">
            <LockKeyhole />
            <span>
              Your questions stay in this browser. No account or API key needed.
            </span>
          </div>
          <a
            href={assetPath("/Diasanta_Resume.pdf")}
            download
            className="explore-link"
          >
            <FileText />
            Prefer the full résumé?
            <ArrowUpRight />
          </a>
        </aside>
        <Card className="resume-chat-card" size="3">
          <div className="chat-header">
            <div>
              <span className="icon-tile">
                <Bot />
              </span>
              <div>
                <h3>Résumé assistant</h3>
                <span>Powered by Transformers.js</span>
              </div>
            </div>
            <Badge
              color={
                status === "ready" || status === "generating" ? "green" : "gray"
              }
              variant="soft"
            >
              {status === "ready" || status === "generating"
                ? "On-device"
                : "Local AI"}
            </Badge>
          </div>
          {(status === "idle" ||
            status === "error" ||
            status === "loading") && (
            <div className="chat-start">
              <h4>
                {status === "loading"
                  ? "Getting things ready"
                  : "Start a conversation, privately."}
              </h4>
              <p>
                Starting downloads a small AI model (about 400 MB) from Hugging
                Face, plus its runtime. Your browser caches files when possible.
                The first load can take a few minutes.
              </p>
              {status === "loading" ? (
                <>
                  <div className="chat-download-status">
                    <LoaderCircle className="chat-spinner" />
                    <span>{loadingLabel}</span>
                    {progress !== undefined && <span>{progress}%</span>}
                  </div>
                  <Progress
                    aria-label="Current model file download"
                    value={progress}
                  />
                  <Button
                    type="button"
                    variant="soft"
                    color="gray"
                    onClick={stop}
                  >
                    <Square />
                    Cancel download
                  </Button>
                </>
              ) : (
                <div className="chat-start-actions">
                  <Button type="button" onClick={() => start()}>
                    <Download />
                    {status === "error" ? "Try again" : "Start assistant"}
                  </Button>
                  {status === "error" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => start(true)}
                    >
                      Try CPU mode
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
          {error && (
            <p className="chat-error" role="alert">
              {error}
            </p>
          )}
          <div
            className="chat-log"
            ref={logRef}
            role="log"
            aria-label="Résumé conversation"
            aria-live="polite"
            aria-relevant="additions text"
            aria-busy={status === "generating"}
            tabIndex={0}
            onScroll={() => {
              const log = logRef.current;
              if (log)
                followOutput.current =
                  log.scrollHeight - log.scrollTop - log.clientHeight < 64;
            }}
          >
            {messages.length === 0 ? (
              <div className="chat-empty">
                <Bot />
                <p>
                  Ask about backend experience, performance improvements, or the
                  tools Chris uses.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message chat-message-${message.role}`}
                >
                  <span className="chat-message-label">
                    {message.role === "user" ? "You" : "Résumé assistant"}
                  </span>
                  <p>{message.content || "Reading the résumé…"}</p>
                  {message.sources && message.sources.length > 0 && (
                    <details className="chat-sources">
                      <summary>
                        <FileText />
                        Résumé context used ({message.sources.length})
                      </summary>
                      {message.sources.map((source, index) => (
                        <div key={`${source.title}-${index}`}>
                          <a href={source.href}>
                            {source.title}
                            <ArrowUpRight />
                          </a>
                          <p>{source.text}</p>
                        </div>
                      ))}
                    </details>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="chat-suggestions" aria-label="Suggested questions">
            {suggestions.map((question) => (
              <button
                key={question}
                type="button"
                disabled={busy}
                onClick={() => {
                  setInput(question);
                  inputRef.current?.focus();
                }}
              >
                {question}
                <ArrowUpRight />
              </button>
            ))}
          </div>
          <form
            className="chat-form"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <label htmlFor="resume-question">Your question</label>
            <TextArea
              id="resume-question"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={MAX_QUESTION_LENGTH}
              rows={2}
              placeholder="Ask about Chris’s résumé…"
              aria-describedby="chat-input-help"
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  submit();
                }
              }}
            />
            <div className="chat-form-actions">
              <span id="chat-input-help">
                {status === "idle" || status === "loading" || status === "error"
                  ? "Start the assistant to send a question."
                  : "Enter to send · Shift + Enter for a new line"}
              </span>
              {status === "generating" ? (
                <Button
                  type="button"
                  variant="soft"
                  color="gray"
                  onClick={stop}
                >
                  <Square />
                  Stop
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={status !== "ready" || !input.trim()}
                >
                  <Send />
                  Send
                </Button>
              )}
            </div>
          </form>
          <div className="chat-bottom">
            <span>
              {status === "ready" || status === "generating" ? (
                <>
                  <Check />
                  {device === "webgpu"
                    ? "GPU accelerated"
                    : "CPU mode · answers may take longer"}
                </>
              ) : (
                <>
                  <LockKeyhole />
                  Runs in your browser
                </>
              )}
            </span>
            <Button
              type="button"
              size="1"
              variant="ghost"
              color="gray"
              disabled={busy || messages.length === 0}
              onClick={reset}
            >
              <Trash2 />
              Clear chat
            </Button>
          </div>
          <p className="chat-disclaimer">
            AI answers can be inaccurate. Check the résumé excerpts or{" "}
            <a href="mailto:chrisdiasanta@gmail.com">ask Chris</a> to confirm
            details.
          </p>
          <p className="sr-only" role="status">
            {notice}
          </p>
        </Card>
      </div>
    </section>
  );
}
