import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "جائزة الكويت" : "Kuwait Prize",
    description: isArabic
      ? "جائزة الكويت تكرّم الباحثين والعلماء العرب المتميزين تقديرًا لإنجازاتهم العلمية والفكرية البارزة."
      : "The Kuwait Prize honors distinguished Arab researchers and scholars for outstanding scientific and intellectual achievements.",
    alternates: localeAlternates("/prizes/KuwaitPrize", locale),
  };
}

export default function KuwaitPrizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
