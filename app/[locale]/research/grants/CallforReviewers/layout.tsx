import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "دعوة للمحكمين" : "Call for Reviewers",
    description: isArabic
      ? "انضم إلى شبكة المحكمين لدى مؤسسة الكويت للتقدم العلمي وساهم في تقييم مقترحات المنح البحثية."
      : "Join the KFAS reviewer network and contribute to evaluating research grant proposals.",
    alternates: localeAlternates("/research/grants/CallforReviewers", locale),
  };
}

export default function CallforReviewersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
