import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "منح الباحثين الشباب" : "Young Researcher Grants",
    description: isArabic
      ? "منح الباحثين الشباب تساعد الباحثين في بداية مسيرتهم المهنية في الكويت على إطلاق أبحاثهم المستقلة."
      : "Young Researcher Grants help early-career researchers in Kuwait launch independent research.",
    alternates: localeAlternates(
      "/research/grants/Young-Researcher-Grants",
      locale,
    ),
  };
}

export default function YoungResearcherGrantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
