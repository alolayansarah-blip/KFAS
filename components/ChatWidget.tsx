"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { useLocale } from "next-intl";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const COPY = {
  en: {
    title: "Ask about KFAS",
    placeholder: "Type your question…",
    greeting: "Hi! Ask me about KFAS grants, prizes, or programs.",
    error: "Sorry, something went wrong. Please try again.",
    send: "Send",
  },
  ar: {
    title: "اسأل عن مؤسسة الكويت للتقدم العلمي",
    placeholder: "اكتب سؤالك…",
    greeting:
      "مرحبًا! اسألني عن منح مؤسسة الكويت للتقدم العلمي أو جوائزها أو برامجها.",
    error: "عذرًا، حدث خطأ ما. حاول مرة أخرى.",
    send: "إرسال",
  },
};

// Matches [text](path) — used to turn the model's markdown links into
// real clickable anchors. Only relative paths are expected (the model
// is instructed to only use paths from its known-links list).
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders message text, converting [label](/path) into locale-aware
 * clickable links. Plain text in between is rendered as-is.
 */
function MessageContent({ text, locale }: { text: string; locale: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    const [full, label, rawHref] = match;
    if (match.index > lastIndex) {
      parts.push(
        <Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>,
      );
    }

    // Internal in-site paths get the locale prefix and open in the same
    // tab. External links (e.g. the Publications site) are rendered as-is
    // and open in a new tab. Anything else is shown as plain text so we
    // never silently link somewhere unintended.
    if (rawHref.startsWith("/")) {
      const href = `/${locale}${rawHref}`;
      parts.push(
        <a
          key={key++}
          href={href}
          className="underline underline-offset-2 font-medium hover:opacity-80"
        >
          {label}
        </a>,
      );
    } else if (
      rawHref.startsWith("https://") ||
      rawHref.startsWith("http://")
    ) {
      parts.push(
        <a
          key={key++}
          href={rawHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 font-medium hover:opacity-80"
        >
          {label}
        </a>,
      );
    } else {
      parts.push(<Fragment key={key++}>{full}</Fragment>);
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{parts}</>;
}

export default function ChatWidget() {
  const locale = useLocale() as "en" | "ar";
  const t = COPY[locale] ?? COPY.en;
  const isRtl = locale === "ar";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, locale }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t.error }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    // Closed: below sticky bars. Open: above site header so the chat title
    // stays readable. Panel height is capped so it grows up from the FAB
    // without spanning the full viewport.
    <div
      className={`fixed bottom-5 end-5 flex flex-col items-end sm:bottom-6 sm:end-6 ${
        isOpen ? "z-[120]" : "z-[35]"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {isOpen && (
        <div className="mb-3 flex h-[min(440px,calc(100dvh-11rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[#1D2D44]/[0.08] bg-white shadow-2xl sm:mb-4">
          {/* Chat panel title bar */}
          <div className="relative z-10 flex shrink-0 items-center justify-between bg-[#1D2D44] px-5 py-4">
            <span className="font-medium text-sm text-white pe-2">{t.title}</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#7DC0F1]/[0.04]"
          >
            <div className="flex">
              <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-white border border-[#1D2D44]/[0.08] px-3.5 py-2.5 text-sm text-[#1D2D44]">
                {t.greeting}
              </div>
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-xl rounded-tr-sm bg-[#EC601B] px-3.5 py-2.5 text-sm text-white whitespace-pre-wrap"
                      : "max-w-[85%] rounded-xl rounded-tl-sm bg-white border border-[#1D2D44]/[0.08] px-3.5 py-2.5 text-sm text-[#1D2D44] whitespace-pre-wrap [&_a]:text-[#EC601B]"
                  }
                >
                  {m.role === "assistant" ? (
                    <MessageContent text={m.content} locale={locale} />
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-xl rounded-tl-sm bg-white border border-[#1D2D44]/[0.08] px-3.5 py-2.5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D2D44]/30 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D2D44]/30 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D2D44]/30 animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[#1D2D44]/[0.08] px-3 py-3 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-[#1D2D44]/[0.12] focus:outline-none focus:border-[#EC601B]/60 text-[#1D2D44] placeholder:text-[#1D2D44]/40"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label={t.send}
              className="shrink-0 w-9 h-9 rounded-lg bg-[#EC601B] disabled:bg-[#EC601B]/30 flex items-center justify-center transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path
                  d={
                    isRtl
                      ? "M19 12H5M5 12l6 6M5 12l6-6"
                      : "M5 12h14M13 6l6 6-6 6"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t.title}
        className="w-14 h-14 rounded-full bg-[#EC601B] shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
