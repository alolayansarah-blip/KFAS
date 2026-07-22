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
      ? "منحة مكمله لطلبة الدكتوراه"
      : "PhD Students Supplementary Fund Grant",
    description: isArabic
      ? "منحة الدعم التكميلي المخصصة لطلبة الدكتوراه في أبحاثهم."
      : "Supplementary funding for PhD students conducting research.",
    alternates: localeAlternates(
      "/Learning-and-Development/Researchers/PhDStudentsSupplementaryFundGrant",
      locale,
    ),
  };
}

export default function PhDStudentsSupplementaryFundGrantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
