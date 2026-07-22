import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "بوابة البحوث" : "KFAS Research Portal",
    description: isArabic
      ? "بوابة البحوث الخاصة بمؤسسة الكويت للتقدم العلمي لتقديم طلبات المنح البحثية ومتابعتها."
      : "The KFAS Research Portal for submitting and managing research grant applications.",
    alternates: localeAlternates("/research/KFASResearchPortal", locale),
  };
}

export default function KFASResearchPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
