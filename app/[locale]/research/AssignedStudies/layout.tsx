import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "الدراسات بالتكليف" : "Assigned Studies",
    description: isArabic
      ? "الدراسات الموجهة التي تكلّف بها مؤسسة الكويت للتقدم العلمي لمعالجة الأولويات البحثية الوطنية."
      : "Assigned studies commissioned by KFAS to address national research priorities.",
    alternates: localeAlternates("/research/AssignedStudies", locale),
  };
}

export default function AssignedStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
