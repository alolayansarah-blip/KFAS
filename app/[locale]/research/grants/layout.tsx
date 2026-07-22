import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "دعم البحوث/المنح" : "Research Grants",
    description: isArabic
      ? "برامج المنح البحثية لمؤسسة الكويت للتقدم العلمي: البحوث التطبيقية والأساسية وبحوث السياسات ومنح الباحثين الشباب."
      : "KFAS research grant programs: applied, fundamental, policy, young researcher, and research infrastructure grants.",
    alternates: localeAlternates("/research/grants", locale),
  };
}

export default function GrantsIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
