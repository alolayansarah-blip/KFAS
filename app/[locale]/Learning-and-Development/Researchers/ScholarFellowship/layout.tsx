import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? " منح الزماله البحثيه" : "Scholar Fellowship",
    description: isArabic
      ? "برنامج زمالة الباحثين المقدم من مؤسسة الكويت للتقدم العلمي للباحثين المتميزين."
      : "The KFAS Scholar Fellowship program for distinguished researchers.",
    alternates: localeAlternates(
      "/Learning-and-Development/Researchers/ScholarFellowship",
      locale,
    ),
  };
}

export default function ScholarFellowshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
