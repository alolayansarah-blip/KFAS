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
      ? "تمديد المنحة الجزئية"
      : "Extension of Scholarship Bridging Grant",
    description: isArabic
      ? "تمديد منحة الابتعاث الجزئية للباحثين المستمرين في مسيرتهم البحثية."
      : "Extension of the Scholarship Bridging Grant for continuing researchers.",
    alternates: localeAlternates(
      "/Learning-and-Development/Researchers/ExtensionOfScholarshipBridgingGrant",
      locale,
    ),
  };
}

export default function ExtensionOfScholarshipBridgingGrantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
