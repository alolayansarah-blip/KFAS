import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * App routes live under /research/... (lowercase). Nav and bookmarks may use
 * /Research/... which 404s on case-sensitive hosts. Normalize the prefix.
 * Also normalize /research/randdprivate -> /research/RandDPrivate.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const p = url.pathname;

  if (p.startsWith("/Research/")) {
    url.pathname = "/research/" + p.slice("/Research/".length);
    return NextResponse.redirect(url);
  }

  if (p.startsWith("/research/")) {
    const rest = p.slice("/research/".length);
    if (rest.toLowerCase() === "randdprivate" && rest !== "RandDPrivate") {
      url.pathname = "/research/RandDPrivate";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Research/:path*", "/research/:path*"],
};
