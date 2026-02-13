import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json({ posts: [] });
    }

    // Fetch user media from Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,timestamp,caption&access_token=${accessToken}&limit=12`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Failed to fetch Instagram posts"
      );
    }

    const data = await response.json();

    // Filter out reels and videos, only show IMAGE and CAROUSEL_ALBUM
    const filteredPosts = data.data
      .filter(
        (post: any) =>
          post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM"
      )
      .slice(0, 3); // Return only latest 3 posts

    return NextResponse.json({ posts: filteredPosts });
  } catch (error: any) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch Instagram posts" },
      { status: 500 }
    );
  }
}
