"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Button, Card, TextArea } from "@radix-ui/themes";
import {
  ArrowUpRight,
  FileText,
  LockKeyhole,
  MessageCircle,
  Search,
  Send,
  Trash2,
} from "lucide-react";
import {
  MAX_QUESTION_LENGTH,
  UNKNOWN_ANSWER,
  type ChatTurn,
  type ResumeSource,
} from "@/lib/resume-chat-types";
import { retrieveSources } from "@/lib/resume-chat-context";

type Message = ChatTurn & {
  id: number;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState("");
  const nextId = useRef(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const followOutput = useRef(true);

  useEffect(() => {
    if (followOutput.current && logRef.current)
      logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  const submit = () => {
    const question = input.trim().slice(0, MAX_QUESTION_LENGTH);
    if (!question) return;
    const previousQuestion = messages.findLast(
      (message) => message.role === "user",
    )?.content;
    const sources = retrieveSources(question, previousQuestion);
    const user: Message = {
      id: ++nextId.current,
      role: "user",
      content: question,
    };
    const answer: Message = {
      id: ++nextId.current,
      role: "assistant",
      content: sources.length ? "Related résumé excerpts:" : UNKNOWN_ANSWER,
      sources,
    };
    followOutput.current = true;
    setMessages((current) => [...current, user, answer]);
    setInput("");
    setNotice(
      sources.length
        ? `${sources.length} résumé excerpts found.`
        : "No matching résumé excerpts found.",
    );
  };
  const reset = () => {
    setMessages([]);
    setInput("");
    setNotice("Conversation cleared.");
    inputRef.current?.focus();
  };

  return (
    <section id="chat" className="content-section" aria-labelledby="chat-title">
      <div className="section-heading">
        <div className="section-title">
          <span className="section-number">06</span>
          <h2 id="chat-title">Ask my résumé</h2>
        </div>
        <p>Find experience, skills, and education in my résumé.</p>
      </div>
      <div className="resume-chat-layout">
        <aside className="chat-intro">
          <span className="icon-tile large">
            <MessageCircle />
          </span>
          <h3>What would you like to know?</h3>
          <p>
            Search Chris’s skills, career, and education. Results show existing
            résumé text from this portfolio, with links to the relevant sections.
            No answers are generated.
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
                <Search />
              </span>
              <div>
                <h3>Résumé search</h3>
                <span>Excerpts from this portfolio</span>
              </div>
            </div>
            <Badge color="green" variant="soft">
              On-device
            </Badge>
          </div>
          <div
            className="chat-log"
            ref={logRef}
            role="log"
            aria-label="Résumé conversation"
            aria-live="polite"
            aria-relevant="additions text"
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
                <Search />
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
                    {message.role === "user" ? "You" : "Résumé search"}
                  </span>
                  <p>{message.content}</p>
                  {message.sources && message.sources.length > 0 && (
                    <div className="chat-sources">
                      {message.sources.map((source, index) => (
                        <div key={`${source.title}-${index}`}>
                          <a href={source.href}>
                            {source.title}
                            <ArrowUpRight />
                          </a>
                          <p>{source.text}</p>
                        </div>
                      ))}
                    </div>
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
                Enter to search · Shift + Enter for a new line
              </span>
              <Button type="submit" disabled={!input.trim()}>
                <Send />
                Search
              </Button>
            </div>
          </form>
          <div className="chat-bottom">
            <span>
              <LockKeyhole />
              Runs locally · No model download
            </span>
            <Button
              type="button"
              size="1"
              variant="ghost"
              color="gray"
              disabled={messages.length === 0}
              onClick={reset}
            >
              <Trash2 />
              Clear chat
            </Button>
          </div>
          <p className="chat-disclaimer">
            Results are matching excerpts, and may not answer every part of your
            question. For details the résumé doesn’t cover,{" "}
            <a href="mailto:chrisdiasanta@gmail.com">ask Chris</a>.
          </p>
          <p className="sr-only" role="status">
            {notice}
          </p>
        </Card>
      </div>
    </section>
  );
}
