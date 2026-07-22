import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "منح البنيه التحتيه البحثية" : "RIG",
    description: isArabic
      ? "تعرّف على برنامج RIG المقدم من مؤسسة الكويت للتقدم العلمي وكيفية التقديم."
      : "Learn about the RIG program offered by KFAS and how to apply.",
    alternates: localeAlternates("/research/grants/RIG", locale),
  };
}

export default function RIGLayout({ children }: { children: React.ReactNode }) {
  return children;
}
