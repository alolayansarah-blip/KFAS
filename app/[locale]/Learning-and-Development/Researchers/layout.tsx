import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "الباحثون" : "Researchers",
    description: isArabic
      ? "برامج ومنح التعلم والتطوير المقدمة من مؤسسة الكويت للتقدم العلمي للباحثين."
      : "KFAS learning and development programs and grants for researchers.",
    alternates: localeAlternates(
      "/Learning-and-Development/Researchers",
      locale,
    ),
  };
}

export default function ResearchersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
