import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// Self-hosted so Arabic does not depend on Google Fonts at build time.
const tajawal = localFont({
  src: [
    { path: "../fonts/tajawal/tajawal-300.ttf", weight: "300", style: "normal" },
    { path: "../fonts/tajawal/tajawal-400.ttf", weight: "400", style: "normal" },
    { path: "../fonts/tajawal/tajawal-500.ttf", weight: "500", style: "normal" },
    { path: "../fonts/tajawal/tajawal-700.ttf", weight: "700", style: "normal" },
    { path: "../fonts/tajawal/tajawal-800.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
