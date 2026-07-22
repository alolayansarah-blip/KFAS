import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "SearchPage" });
  const isArabic = locale === "ar";

  return {
    title: t("heroTitle"),
    description: isArabic
      ? "ابحث في محتوى موقع مؤسسة الكويت للتقدم العلمي: المنح البحثية، الجوائز العلمية، البرامج، الأخبار والفعاليات."
      : "Search the KFAS website: research grants, science prizes, programs, news, and events.",
    alternates: localeAlternates("/search", locale),
  };
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
