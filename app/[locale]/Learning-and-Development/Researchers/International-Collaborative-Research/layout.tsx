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
      ? "البحوث التعاونية الدولية"
      : "International Collaborative Research",
    description: isArabic
      ? "دعم مؤسسة الكويت للتقدم العلمي للشراكات البحثية التعاونية الدولية."
      : "KFAS support for international collaborative research partnerships.",
    alternates: localeAlternates(
      "/Learning-and-Development/Researchers/International-Collaborative-Research",
      locale,
    ),
  };
}

export default function InternationalCollaborativeResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
