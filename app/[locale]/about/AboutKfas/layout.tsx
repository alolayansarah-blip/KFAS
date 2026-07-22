import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "من نحن" : "Who We Are",
    description: isArabic
      ? "تعرّف على مؤسسة الكويت للتقدم العلمي: رسالتها ورؤيتها ودورها في دعم العلوم والابتكار في الكويت منذ عام 1976."
      : "Learn about the Kuwait Foundation for the Advancement of Sciences: our mission, vision, and role in advancing science and innovation in Kuwait since 1976.",
    alternates: localeAlternates("/about/AboutKfas", locale),
  };
}

export default function AboutKfasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
