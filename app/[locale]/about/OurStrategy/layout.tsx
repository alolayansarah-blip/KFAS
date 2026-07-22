import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "استراتيجيتنا" : "Our Strategy",
    description: isArabic
      ? "الأولويات والتوجهات الاستراتيجية لمؤسسة الكويت للتقدم العلمي في دعم العلوم والتكنولوجيا والابتكار في الكويت."
      : "KFAS strategic priorities and directions for advancing science, technology, and innovation in Kuwait.",
    alternates: localeAlternates("/about/OurStrategy", locale),
  };
}

export default function OurStrategyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
