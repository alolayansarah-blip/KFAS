import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "المهمات العلمية" : "Scientific Missions",
    description: isArabic
      ? "البعثات العلمية المقدمة من مؤسسة الكويت للتقدم العلمي لتدريب الباحثين وتبادل الخبرات في الخارج."
      : "KFAS scientific missions supporting researchers' training and exchange abroad.",
    alternates: localeAlternates(
      "/Learning-and-Development/Researchers/ScientificMissions",
      locale,
    ),
  };
}

export default function ScientificMissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
