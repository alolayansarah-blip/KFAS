import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "مجلس الإدارة" : "Board of Directors",
    description: isArabic
      ? "أعضاء مجلس إدارة مؤسسة الكويت للتقدم العلمي برئاسة حضرة صاحب السمو أمير البلاد."
      : "Members of the KFAS Board of Directors, chaired by His Highness the Amir of Kuwait.",
    alternates: localeAlternates("/about/BoardOfDirectors", locale),
  };
}

export default function BoardOfDirectorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
