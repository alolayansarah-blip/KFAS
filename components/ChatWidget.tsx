"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const COPY = {
  en: {
    title: "Ask about KFAS",
    subtitle: "Assistant",
    placeholder: "Type your question…",
    greeting: "Hi! Ask me about KFAS grants, prizes, or programs.",
    error: "Sorry, something went wrong. Please try again.",
    send: "Send",
    openChat: "Open chat assistant",
    closeChat: "Close chat",
  },
  ar: {
    title: "اسأل عن مؤسسة الكويت للتقدم العلمي",
    subtitle: "المساعد",
    placeholder: "اكتب سؤالك…",
    greeting:
      "مرحبًا! اسألني عن منح مؤسسة الكويت للتقدم العلمي أو جوائزها أو برامجها.",
    error: "عذرًا، حدث خطأ ما. حاول مرة أخرى.",
    send: "إرسال",
    openChat: "فتح مساعد المحادثة",
    closeChat: "إغلاق المحادثة",
  },
};

export default function ChatWidget() {
  const locale = useLocale() as "en" | "ar";
  const t = COPY[locale] ?? COPY.en;
  const isRtl = locale === "ar";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 180);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

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

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              typeof data.reply === "string" && data.reply.trim()
                ? data.reply
                : t.error,
          },
        ]);
        return;
      }

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
    <div
      className="fixed bottom-5 end-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:end-7"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Panel */}
      <div
        className={`origin-bottom transition-all duration-300 ease-out ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-[0.96] opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex h-[min(520px,72vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[#1D2D44]/10 bg-white shadow-[0_20px_50px_-24px_rgba(29,45,68,0.55)]">
          {/* Header */}
          <div className="relative shrink-0 overflow-hidden bg-[#1D2D44] px-5 py-4">
            <div
              aria-hidden
              className="pointer-events-none absolute -end-8 -top-10 h-28 w-28 rounded-full bg-[#EC601B]/25 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -start-6 h-24 w-24 rounded-full bg-[#7DC0F1]/20 blur-2xl"
            />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <ChatMarkIcon className="h-5 w-5 text-white" />
                  <span className="absolute -bottom-0.5 -end-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1D2D44] bg-emerald-400" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-poppins text-[14px] font-semibold tracking-tight text-white">
                    {t.title}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 font-poppins text-[11px] text-white/55">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {t.subtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t.closeChat}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,#f7fbfe_0%,#ffffff_48%)] px-4 py-4"
          >
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-ss-md border border-[#1D2D44]/[0.07] bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#1D2D44]/85 shadow-sm">
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
                      ? "max-w-[85%] rounded-2xl rounded-se-md bg-[#EC601B] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white shadow-sm"
                      : "max-w-[85%] rounded-2xl rounded-ss-md border border-[#1D2D44]/[0.07] bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#1D2D44]/85 shadow-sm"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-ss-md border border-[#1D2D44]/[0.07] bg-white px-3.5 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1D2D44]/35 [animation-delay:-0.28s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1D2D44]/35 [animation-delay:-0.14s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1D2D44]/35" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="shrink-0 border-t border-[#1D2D44]/[0.07] bg-white p-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#1D2D44]/10 bg-[#F8FAFC] px-2 py-1.5 transition-colors focus-within:border-[#EC601B]/45 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#EC601B]/15">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                className="min-w-0 flex-1 bg-transparent px-2 py-2 font-poppins text-sm text-[#1D2D44] placeholder:text-[#1D2D44]/38 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                aria-label={t.send}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EC601B] text-white transition-all hover:bg-[#d45510] disabled:cursor-not-allowed disabled:bg-[#EC601B]/30"
              >
                <SendIcon className="h-4 w-4" mirrored={isRtl} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="group relative">
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-full bg-[#EC601B]/35 transition-opacity duration-500 ${
            isOpen ? "opacity-0" : "animate-ping opacity-40"
          }`}
        />
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? t.closeChat : t.openChat}
          aria-expanded={isOpen}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC601B]/50 focus-visible:ring-offset-2 ${
            isOpen
              ? "bg-[#1D2D44] shadow-[0_10px_28px_-10px_rgba(29,45,68,0.7)] hover:bg-[#243752]"
              : "bg-[#EC601B] shadow-[0_12px_32px_-12px_rgba(236,96,27,0.85)] hover:-translate-y-0.5 hover:bg-[#d45510] hover:shadow-[0_16px_36px_-12px_rgba(236,96,27,0.95)]"
          }`}
        >
          <span className="relative h-6 w-6">
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isOpen
                  ? "rotate-90 scale-75 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            >
              <ChatMarkIcon className="h-6 w-6 text-white" />
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-75 opacity-0"
              }`}
            >
              <CloseIcon className="h-5 w-5 text-white" />
            </span>
          </span>
        </button>

        {/* Hover label — desktop only, when closed */}
        {!isOpen && (
          <span
            className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#1D2D44] px-3 py-1.5 font-poppins text-[11px] font-medium tracking-wide text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 sm:block ${
              isRtl
                ? "end-full me-3 translate-x-1 group-hover:translate-x-0"
                : "start-full ms-3 -translate-x-1 group-hover:translate-x-0"
            }`}
          >
            {t.title}
          </span>
        )}
      </div>
    </div>
  );
}

function ChatMarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.5 18.5 4 21V7.8A3.8 3.8 0 0 1 7.8 4h8.4A3.8 3.8 0 0 1 20 7.8v6.4a3.8 3.8 0 0 1-3.8 3.8H7.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="11" r="1" fill="currentColor" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
      <circle cx="15" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SendIcon({
  className,
  mirrored,
}: {
  className?: string;
  mirrored?: boolean;
}) {
  return (
    <svg
      className={`${className ?? ""} ${mirrored ? "-scale-x-100" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
