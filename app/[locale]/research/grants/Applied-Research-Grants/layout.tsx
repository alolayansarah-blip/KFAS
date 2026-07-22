import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "منح البحوث التطبيقية" : "Applied Research Grants",
    description: isArabic
      ? "منح البحوث التطبيقية تدعم البحوث التي تعالج الأولويات الوطنية والتحديات العملية في الكويت."
      : "Applied Research Grants support research addressing Kuwait's national priorities and practical challenges.",
    alternates: localeAlternates(
      "/research/grants/Applied-Research-Grants",
      locale,
    ),
  };
}

export default function AppliedResearchGrantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
