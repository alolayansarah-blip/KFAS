import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "الأنشطة والفعاليات" : "Activities & Events",
    description: isArabic
      ? "الأنشطة والفعاليات البحثية التي تنظمها وتدعمها مؤسسة الكويت للتقدم العلمي."
      : "Research activities and events organized and supported by KFAS.",
    alternates: localeAlternates("/research/ActivitiesAndEvents", locale),
  };
}

export default function ActivitiesAndEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
