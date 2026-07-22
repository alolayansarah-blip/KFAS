import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "فريقنا" : "Our Team",
    description: isArabic
      ? "تعرّف على قيادات وفريق عمل مؤسسة الكويت للتقدم العلمي."
      : "Meet the leadership and team of the Kuwait Foundation for the Advancement of Sciences.",
    alternates: localeAlternates("/about/our-team", locale),
  };
}

export default function OurTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
