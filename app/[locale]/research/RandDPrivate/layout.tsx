import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "البحث والتطوير في القطاع الخاص"
      : "R&D for the Private Sector",
    description: isArabic
      ? "دعم مؤسسة الكويت للتقدم العلمي للبحث والتطوير والابتكار في القطاع الخاص الكويتي."
      : "KFAS support for research, development, and innovation in Kuwait's private sector.",
    alternates: localeAlternates("/research/RandDPrivate", locale),
  };
}

export default function RandDPrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
