import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "المكتبة الإعلامية" : "Media Library",
    description: isArabic
      ? "المكتبة الإعلامية لمؤسسة الكويت للتقدم العلمي: صور ومقاطع مرئية وإصدارات."
      : "The KFAS media library: photos, videos, and publications.",
    alternates: localeAlternates("/MediaLibrary", locale),
  };
}

export default function MediaLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
