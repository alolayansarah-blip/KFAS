import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "جائزة السميط" : "Al-Sumait Prize",
    description: isArabic
      ? "جائزة السميط تكافئ الإنجازات التنموية في إفريقيا في مجالات الأمن الغذائي والصحة والتعليم."
      : "The Al-Sumait Prize rewards development achievements in Africa in food security, health, and education.",
    alternates: localeAlternates("/prizes/AlSumaitPrize", locale),
  };
}

export default function AlSumaitPrizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
