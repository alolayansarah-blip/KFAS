import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "جائزة جابر الأحمد" : "Jaber Al-Ahmad Prize",
    description: isArabic
      ? "جائزة جابر الأحمد تكرّم الباحثين الكويتيين الشباب المتميزين."
      : "The Jaber Al-Ahmad Prize recognizes outstanding young Kuwaiti researchers.",
    alternates: localeAlternates("/prizes/Jaber-AlAhmadPrize", locale),
  };
}

export default function JaberAlAhmadPrizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
