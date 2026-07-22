import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "جميع الأخبار" : "All News",
    description: isArabic
      ? "آخر الأخبار والإعلانات من مؤسسة الكويت للتقدم العلمي."
      : "The latest news and announcements from the Kuwait Foundation for the Advancement of Sciences.",
    alternates: localeAlternates("/news", locale),
  };
}

export default function AllNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
