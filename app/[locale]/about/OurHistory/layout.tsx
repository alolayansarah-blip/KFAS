import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    title: isArabic ? "تاريخنا" : "Our History",
    description: isArabic
      ? "مسيرة مؤسسة الكويت للتقدم العلمي منذ تأسيسها عام 1976 وصولًا إلى دورها اليوم في دعم البحث والابتكار والثقافة العلمية في الكويت."
      : "The history of KFAS from its establishment in 1976 to its role today in supporting research, innovation, and scientific culture in Kuwait.",
    alternates: localeAlternates("/about/OurHistory", locale),
  };
}

export default function OurHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
