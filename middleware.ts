import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

function splitLocalePath(pathname: string): {
  locale: string | null;
  rest: string;
} {
  const match = pathname.match(/^\/(en|ar)(\/.*)?$/);
  if (match) {
    return { locale: match[1], rest: match[2] ?? "" };
  }
  return { locale: null, rest: pathname };
}

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { locale, rest } = splitLocalePath(url.pathname);
  const prefix = locale ? `/${locale}` : "";

  if (rest.startsWith("/Research/")) {
    url.pathname = `${prefix}/research/${rest.slice("/Research/".length)}`;
    return NextResponse.redirect(url);
  }

  if (rest.startsWith("/research/")) {
    const segment = rest.slice("/research/".length);
    if (
      segment.toLowerCase() === "randdprivate" &&
      segment !== "RandDPrivate"
    ) {
      url.pathname = `${prefix}/research/RandDPrivate`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
