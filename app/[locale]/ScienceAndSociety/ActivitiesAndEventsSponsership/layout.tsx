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
      ? "رعاية الأنشطة والفعاليات"
      : "Activities & Events Sponsorship",
    description: isArabic
      ? "رعاية مؤسسة الكويت للتقدم العلمي لأنشطة وفعاليات العلوم والمجتمع."
      : "KFAS sponsorship of science and society activities and events.",
    alternates: localeAlternates(
      "/ScienceAndSociety/ActivitiesAndEventsSponsership",
      locale,
    ),
  };
}

export default function ActivitiesAndEventsSponsershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
