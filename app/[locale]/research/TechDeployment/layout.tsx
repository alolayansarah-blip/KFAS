import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "نشر التكنولوجيا" : "Tech Deployment",
    description: isArabic
      ? "برامج مؤسسة الكويت للتقدم العلمي لنشر التقنيات المتقدمة وتبنّيها في الكويت."
      : "KFAS programs for deploying and adopting advanced technologies in Kuwait.",
    alternates: localeAlternates("/research/TechDeployment", locale),
  };
}

export default function TechDeploymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
