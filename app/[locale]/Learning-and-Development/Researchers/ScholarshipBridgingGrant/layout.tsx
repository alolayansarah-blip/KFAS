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
      ? "  المنحه الدراسية الجزئيه"
      : "Scholarship Bridging Grant",
    description: isArabic
      ? "منحة الابتعاث الجسرية لدعم الباحثين في المراحل الانتقالية من مسيرتهم الدراسية."
      : "The Scholarship Bridging Grant supporting researchers between study stages.",
    alternates: localeAlternates(
      "/Learning-and-Development/Researchers/ScholarshipBridgingGrant",
      locale,
    ),
  };
}

export default function ScholarshipBridgingGrantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
