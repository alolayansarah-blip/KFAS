import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import ChatWidget from "@/components/ChatWidget";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// Self-hosted so Arabic does not depend on Google Fonts at build time.
const tajawal = localFont({
  src: [
    {
      path: "../fonts/tajawal/tajawal-300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/tajawal/tajawal-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/tajawal/tajawal-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/tajawal/tajawal-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/tajawal/tajawal-800.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// TODO: switch to the official KFAS domain once it is connected.
const BASE_URL = "https://monkfish-app-kgans.ondigitalocean.app";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: isArabic
        ? "مؤسسة الكويت للتقدم العلمي"
        : "KFAS — Kuwait Foundation for the Advancement of Sciences",
      template: isArabic ? "%s | مؤسسة الكويت للتقدم العلمي" : "%s | KFAS",
    },
    description: isArabic
      ? "مؤسسة الكويت للتقدم العلمي: دعم البحث العلمي والابتكار وبناء القدرات الوطنية في الكويت منذ عام 1976، من خلال المنح البحثية والجوائز العلمية وبرامج التعلم والتطوير."
      : "The Kuwait Foundation for the Advancement of Sciences (KFAS) has supported scientific research, innovation, and national capacity building in Kuwait since 1976 through research grants, science prizes, and learning and development programs.",
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isArabic = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${poppins.variable} ${tajawal.variable}`}
    >
      <body className={isArabic ? "font-arabic" : "font-poppins"}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
