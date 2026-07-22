import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "منح البحوث المعنيه بالسياسات" : "Policy Research Grants",
    description: isArabic
      ? "منح بحوث السياسات تدعم الدراسات المبنية على الأدلة لخدمة السياسات العامة في الكويت."
      : "Policy Research Grants support evidence-based studies informing public policy in Kuwait.",
    alternates: localeAlternates(
      "/research/grants/Policy-Research-Grants",
      locale,
    ),
  };
}

export default function PolicyResearchGrantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
