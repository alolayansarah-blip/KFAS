import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "المهنيون" : "Professionals",
    description: isArabic
      ? "برامج التعلم والتطوير المقدمة من مؤسسة الكويت للتقدم العلمي للمهنيين."
      : "Learning and development programs for professionals offered by KFAS.",
    alternates: localeAlternates(
      "/Learning-and-Development/Professionals",
      locale,
    ),
  };
}

export default function ProfessionalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
