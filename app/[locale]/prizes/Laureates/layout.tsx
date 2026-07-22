import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "الفائزون بالجوائز" : "Laureates",
    description: isArabic
      ? "استكشف الفائزين بجائزة الكويت وجائزة جابر الأحمد وجائزة السميط من مختلف أنحاء العالم."
      : "Explore the laureates of the Kuwait Prize, Jaber Al-Ahmad Prize, and Al-Sumait Prize from around the world.",
    alternates: localeAlternates("/prizes/Laureates", locale),
  };
}

export default function LaureatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
