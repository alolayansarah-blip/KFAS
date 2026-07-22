import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "دعم النشر العلمي" : "Scholarly Publication",
    description: isArabic
      ? "دعم مؤسسة الكويت للتقدم العلمي للنشر العلمي والأكاديمي."
      : "KFAS support for scholarly publication and academic publishing.",
    alternates: localeAlternates(
      "/Learning-and-Development/Researchers/Scholarly-Publication",
      locale,
    ),
  };
}

export default function ScholarlyPublicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
