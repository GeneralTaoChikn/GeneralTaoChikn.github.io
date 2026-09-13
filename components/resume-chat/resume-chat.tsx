"use client";

import { useEffect, useRef, useState } from "react";
import { Button, TextArea } from "@radix-ui/themes";
import { ArrowUpRight, ChevronDown, Search, Trash2 } from "lucide-react";
import {
  MAX_QUESTION_LENGTH,
  UNKNOWN_ANSWER,
  type ChatTurn,
  type ResumeSource,
} from "@/lib/resume-chat-types";
import { retrieveSources } from "@/lib/resume-chat-context";

function revealSource(target: HTMLElement) {
  // A match can be inside one or more collapsed disclosures.
  for (
    let parent = target.parentElement;
    parent;
    parent = parent.parentElement
  ) {
    if (parent instanceof HTMLDetailsElement) parent.open = true;
  }
  // Let disclosure layout and scroll anchoring settle before positioning the item.
  requestAnimationFrame(() => {
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start", behavior: "instant" });
  });
}

function sourceFromHash(hash: string) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

type Message = ChatTurn & { id: number; sources?: ResumeSource[] };
const suggestions = [
  "What backend experience does Chris have?",
  "How has Chris improved performance?",
  "Where did Chris study?",
];

export default function ResumeChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState("");
  const nextId = useRef(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const latestAnswerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const answer = latestAnswerRef.current;
    if (!answer) return;
    const frame = requestAnimationFrame(() => {
      // Moving focus also dismisses the mobile keyboard after a typed search.
      answer.focus({ preventScroll: true });
      answer.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [messages]);

  useEffect(() => {
    const revealHash = () => {
      const target = sourceFromHash(window.location.hash);
      if (target?.classList.contains("resume-source")) revealSource(target);
    };
    // Shared links also work when opened directly or revisited with Back/Forward.
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, []);

  const submit = (value = input) => {
    const question = value.trim().slice(0, MAX_QUESTION_LENGTH);
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
    setMessages((current) => [...current, user, answer]);
    setInput("");
    setNotice(
      sources.length
        ? `${sources.length} résumé excerpts found.`
        : "No matching résumé excerpts found.",
    );
  };

  return (
    <section id="chat" className="resume-search" aria-labelledby="search-title">
      <details>
        <summary id="resume-search-summary" className="resume-source">
          <span id="search-title">
            <Search />
            Search résumé
          </span>
          <ChevronDown />
        </summary>
        <div className="search-content">
          <p className="search-description">
            Find existing résumé excerpts by topic. Your searches stay in this
            browser.
          </p>
          <div className="chat-suggestions" aria-label="Suggested searches">
            {suggestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => submit(question)}
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
            <label htmlFor="resume-question">
              Search by skill, experience, or education
            </label>
            <TextArea
              id="resume-question"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={MAX_QUESTION_LENGTH}
              rows={2}
              placeholder="For example: Kafka or performance improvements"
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
                <Search />
                Search
              </Button>
            </div>
          </form>
          <div
            className={`chat-log${messages.length ? " has-results" : ""}`}
            role="log"
            aria-label="Résumé search results"
            aria-live="polite"
            aria-relevant="additions text"
            tabIndex={messages.length ? 0 : -1}
          >
            {messages.map((message, messageIndex) => (
              <div
                key={message.id}
                ref={
                  messageIndex === messages.length - 1
                    ? latestAnswerRef
                    : undefined
                }
                tabIndex={message.role === "assistant" ? -1 : undefined}
                role={message.role === "assistant" ? "group" : undefined}
                aria-label={
                  message.role === "assistant"
                    ? "Résumé search answer"
                    : undefined
                }
                className={`chat-message chat-message-${message.role}`}
              >
                <span className="chat-message-label">
                  {message.role === "user" ? "You" : "Résumé search"}
                </span>
                <p>{message.content}</p>
                {!!message.sources?.length && (
                  <div className="chat-sources">
                    {message.sources.map((source, index) => (
                      <div key={`${source.title}-${index}`}>
                        <a
                          href={source.href}
                          onClick={(event) => {
                            if (
                              event.button !== 0 ||
                              event.metaKey ||
                              event.ctrlKey ||
                              event.shiftKey ||
                              event.altKey
                            )
                              return;
                            const target = sourceFromHash(source.href);
                            if (!target) return;
                            event.preventDefault();
                            if (window.location.hash !== source.href) {
                              window.history.pushState(
                                window.history.state,
                                "",
                                source.href,
                              );
                            }
                            revealSource(target);
                          }}
                        >
                          {source.title}
                          <ArrowUpRight />
                        </a>
                        <p>{source.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {!!messages.length && (
            <div className="search-footer">
              <p>
                Need more detail?{" "}
                <a href="mailto:chrisdiasanta@gmail.com">Email Chris</a>.
              </p>
              <Button
                type="button"
                size="1"
                variant="ghost"
                color="gray"
                onClick={() => {
                  setMessages([]);
                  setInput("");
                  setNotice("Search history cleared.");
                  inputRef.current?.focus();
                }}
              >
                <Trash2 />
                Clear searches
              </Button>
            </div>
          )}
          <p className="sr-only" role="status">
            {notice}
          </p>
        </div>
      </details>
    </section>
  );
}
