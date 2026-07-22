import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "منح البحوث الأساسية" : "Fundamental Research Grants",
    description: isArabic
      ? "منح البحوث الأساسية تدعم البحث العلمي الاستكشافي في مختلف التخصصات."
      : "Fundamental Research Grants support curiosity-driven scientific research across disciplines.",
    alternates: localeAlternates(
      "/research/grants/Fundamental-Research-Grants",
      locale,
    ),
  };
}

export default function FundamentalResearchGrantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
