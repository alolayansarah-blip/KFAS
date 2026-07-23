import { NextRequest, NextResponse } from "next/server";
import {
  kfasKnowledgeEn,
  kfasKnowledgeAr,
  KNOWN_PATHS,
  KNOWN_EXTERNAL_LINKS,
} from "@/lib/kfasKnowledge";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_HISTORY_MESSAGES = 10;

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;
const KNOWN_PATH_SET = new Set<string>(KNOWN_PATHS);
const KNOWN_EXTERNAL_SET = new Set<string>(KNOWN_EXTERNAL_LINKS);

/**
 * Strips any markdown link whose target isn't in our known-good list,
 * leaving just the link's label text behind. This is the real safety
 * net: the system prompt asks the model to only use known paths, but
 * small models occasionally ignore that and invent a URL anyway (e.g.
 * guessing "https://kfas.org.kw/prizes" because it "sounds right").
 * Without this, a hallucinated link would go straight to the visitor.
 */
function sanitizeLinks(text: string): string {
  return text.replace(LINK_PATTERN, (full, label, href) => {
    const isKnownInternal = KNOWN_PATH_SET.has(href);
    const isKnownExternal = KNOWN_EXTERNAL_SET.has(href);
    return isKnownInternal || isKnownExternal ? full : label;
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages, locale } = (await req.json()) as {
      messages: ChatMessage[];
      locale?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is not set");
      return NextResponse.json(
        { error: "Chat is not configured" },
        { status: 500 },
      );
    }

    const systemPrompt = locale === "ar" ? kfasKnowledgeAr : kfasKnowledgeEn;
    const trimmedHistory = messages.slice(-MAX_HISTORY_MESSAGES);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...trimmedHistory,
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", response.status, errText);
      return NextResponse.json(
        { error: "Chat request failed" },
        { status: 502 },
      );
    }

    const data = await response.json();
    const rawReply = data.choices?.[0]?.message?.content ?? "";
    const reply = sanitizeLinks(rawReply);

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
