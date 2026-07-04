import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

const LOCALE_PREFIX_RE = /^\/(en|ar)(?=\/|$)/;

/** Strip any locale segment from a pathname. */
export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(LOCALE_PREFIX_RE, "") || "/";
}

/** Build the browser URL for switching locale while keeping the current page. */
export function switchLocalePathname(pathname: string, locale: string): string {
  const path = stripLocalePrefix(pathname);
  if (locale === routing.defaultLocale) {
    return path;
  }
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
