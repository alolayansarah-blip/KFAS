import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "الشباب" : "Youth",
    description: isArabic
      ? "برامج مؤسسة الكويت للتقدم العلمي للشباب في مجالات العلوم والابتكار."
      : "KFAS learning and development programs for youth in science and innovation.",
    alternates: localeAlternates("/Learning-and-Development/Youth", locale),
  };
}

export default function YouthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
