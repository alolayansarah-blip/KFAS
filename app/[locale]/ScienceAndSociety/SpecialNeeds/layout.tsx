import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "ذوي الاحتياجات الخاصة" : "Special Needs",
    description: isArabic
      ? "برامج مؤسسة الكويت للتقدم العلمي لدعم ذوي الاحتياجات الخاصة من خلال العلوم والتكنولوجيا."
      : "KFAS programs supporting people with special needs through science and technology.",
    alternates: localeAlternates("/ScienceAndSociety/SpecialNeeds", locale),
  };
}

export default function SpecialNeedsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
