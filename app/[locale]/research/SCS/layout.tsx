import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "رعاية المؤتمرات العلمية"
      : "Scientific Conference Sponsorship",
    description: isArabic
      ? "رعاية مؤسسة الكويت للتقدم العلمي للمؤتمرات العلمية داخل الكويت وخارجها."
      : "KFAS sponsorship of scientific conferences held in Kuwait and abroad.",
    alternates: localeAlternates("/research/SCS", locale),
  };
}

export default function SCSLayout({ children }: { children: React.ReactNode }) {
  return children;
}
