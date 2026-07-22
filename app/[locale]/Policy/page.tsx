import type { Metadata } from "next";
import PolicyContent from "./PolicyContent";

const BASE_URL = "https://monkfish-app-kgans.ondigitalocean.app";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "سياسة الموقع | مؤسسة الكويت للتقدم العلمي"
      : "Website Policy | KFAS — Kuwait Foundation for the Advancement of Sciences",
    description: isArabic
      ? "سياسة استخدام الموقع الإلكتروني لمؤسسة الكويت للتقدم العلمي، بما في ذلك الخصوصية وجمع البيانات والملكية الفكرية."
      : "Website usage policy of the Kuwait Foundation for the Advancement of Sciences, covering privacy, data collection, and intellectual property.",
    alternates: {
      canonical: isArabic ? `${BASE_URL}/ar/Policy` : `${BASE_URL}/Policy`,
      languages: {
        en: `${BASE_URL}/Policy`,
        ar: `${BASE_URL}/ar/Policy`,
      },
    },
  };
}

export default function Page() {
  return <PolicyContent />;
}
