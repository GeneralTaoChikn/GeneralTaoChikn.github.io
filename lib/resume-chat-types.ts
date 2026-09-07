export type ChatTurn = { role: "user" | "assistant"; content: string };
export type ResumeSource = { title: string; href: string; text: string };
export type ChatRequest =
  | { type: "load"; cpuOnly?: boolean }
  | { type: "generate"; id: number; messages: ChatTurn[] };
export type ChatResponse =
  | { type: "progress"; label: string; progress?: number }
  | { type: "ready"; device: "webgpu" | "wasm" }
  | { type: "token"; id: number; text: string }
  | { type: "complete"; id: number; text: string; sources: ResumeSource[] }
  | { type: "error"; message: string };
export const MAX_QUESTION_LENGTH = 500;
export const MAX_HISTORY_TURNS = 6;
export const UNKNOWN_ANSWER =
  "I couldn’t find that information in Chris’s résumé. Try asking about his experience, skills, education, or contact details, or email Chris directly.";
