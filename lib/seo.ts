import type { Metadata } from "next";

/**
 * Builds the canonical + reciprocal en/ar hreflang block for a page.
 *
 * @param path   The locale-free pathname, exactly as written in hrefs
 *               (e.g. "/search", "/about/AboutKfas", "/" for the homepage).
 * @param locale The current locale from generateMetadata params.
 *
 * Relative URLs here resolve against `metadataBase` set in
 * app/[locale]/layout.tsx, so switching to the official domain later
 * requires no changes in this file or in any page.
 *
 * Usage inside any generateMetadata:
 *   alternates: localeAlternates("/search", locale),
 */
export function localeAlternates(
  path: string,
  locale: string,
): Metadata["alternates"] {
  const enPath = path;
  const arPath = path === "/" ? "/ar" : `/ar${path}`;

  return {
    canonical: locale === "ar" ? arPath : enPath,
    languages: {
      en: enPath,
      ar: arPath,
    },
  };
}
