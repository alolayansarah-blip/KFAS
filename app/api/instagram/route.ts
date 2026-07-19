// src/app/api/instagram/route.ts
// Proxies the Instagram Graph API so INSTAGRAM_ACCESS_TOKEN never reaches the browser.
// Cached for 1 hour (revalidate) — Instagram CDN URLs stay valid well beyond that window.

import { NextResponse } from "next/server";

// Always run the handler so LIMIT changes are not stuck behind a stale ISR cache.
export const dynamic = "force-dynamic";

const FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
const LIMIT = 3;

export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  imageUrl: string;
  permalink: string;
  timestamp: string;
};

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "INSTAGRAM_ACCESS_TOKEN is not set" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Instagram API responded ${res.status}` },
        { status: res.status },
      );
    }

    const json = await res.json();

    const posts: InstagramPost[] = (json.data ?? [])
      .map(
        (p: {
          id: string;
          caption?: string;
          media_type: InstagramPost["mediaType"];
          media_url?: string;
          thumbnail_url?: string;
          permalink: string;
          timestamp: string;
        }) => ({
          id: p.id,
          caption: p.caption ?? "",
          mediaType: p.media_type,
          // Videos/Reels have no media_url image — use thumbnail_url instead
          imageUrl:
            p.media_type === "VIDEO"
              ? (p.thumbnail_url ?? p.media_url ?? "")
              : (p.media_url ?? p.thumbnail_url ?? ""),
          permalink: p.permalink,
          timestamp: p.timestamp,
        }),
      )
      .filter((p: InstagramPost) => Boolean(p.imageUrl))
      .slice(0, LIMIT);

    return NextResponse.json(
      { posts },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to reach Instagram API" },
      { status: 502 },
    );
  }
}
