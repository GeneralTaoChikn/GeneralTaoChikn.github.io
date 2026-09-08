export type ChatTurn = { role: "user" | "assistant"; content: string };
export type ResumeSource = { title: string; href: string; text: string };
export const MAX_QUESTION_LENGTH = 500;
export const UNKNOWN_ANSWER =
  "I couldn’t find that information in Chris’s résumé. Try asking about his experience, skills, education, or contact details, or email Chris directly.";
