import { NextRequest, NextResponse } from "next/server";
import { kfasKnowledgeEn, kfasKnowledgeAr } from "@/lib/kfasKnowledge";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_HISTORY_MESSAGES = 10;

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

      let code: string | undefined;
      try {
        code = JSON.parse(errText)?.error?.code;
      } catch {
        /* ignore parse errors */
      }

      if (response.status === 429 || code === "insufficient_quota") {
        const quotaMessage =
          locale === "ar"
            ? "خدمة المساعد غير متاحة مؤقتًا بسبب تجاوز حصة واجهة OpenAI. يُرجى التحقق من خطة الفوترة والرصيد في حساب OpenAI، ثم المحاولة لاحقًا."
            : "The assistant is temporarily unavailable because the OpenAI account has no remaining quota. Check billing and credits at platform.openai.com, then try again.";

        return NextResponse.json(
          { error: "insufficient_quota", reply: quotaMessage },
          { status: 503 },
        );
      }

      return NextResponse.json(
        { error: "Chat request failed" },
        { status: 502 },
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
