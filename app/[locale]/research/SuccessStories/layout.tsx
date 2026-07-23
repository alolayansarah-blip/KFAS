import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "قصص النجاح والأثر" : "Success Stories and Impact",
    description: isArabic
      ? "قصص نجاح ومشاريع أثر مدعومة من مؤسسة الكويت للتقدم العلمي في البحث والتطوير والابتكار."
      : "KFAS-supported success stories and impact projects in research, development, and innovation.",
    alternates: localeAlternates("/research/SuccessStories", locale),
  };
}

export default function SuccessStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
