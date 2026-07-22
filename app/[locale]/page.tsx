import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import { localeAlternates } from "@/lib/seo";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const isArabic = locale === "ar";

  return {
    description: isArabic
      ? "الموقع الرسمي لمؤسسة الكويت للتقدم العلمي — المنح البحثية، جائزة الكويت، جائزة السميط، جائزة جابر الأحمد، وبرامج التعلم والتطوير."
      : "The official website of the Kuwait Foundation for the Advancement of Sciences — research grants, the Kuwait Prize, Al-Sumait Prize, Jaber Al-Ahmad Prize, and learning and development programs.",
    alternates: localeAlternates("/", locale),
  };
}

// Lazy load components below the fold for better performance
const FlippedCardStack = dynamic(
  () => import("@/components/FlippedCardStack"),
  {
    loading: () => <div className="min-h-[400px]" />,
  },
);
const StatsCounter = dynamic(() => import("@/components/StatsCounter"), {
  loading: () => <div className="min-h-[400px]" />,
});
const LogoShowcase = dynamic(() => import("@/components/LogoShowcase"), {
  loading: () => <div className="min-h-[200px]" />,
});
const LatestNews = dynamic(() => import("@/components/LatestNews"), {
  loading: () => <div className="min-h-[400px]" />,
});
const InstagramFeed = dynamic(() => import("@/components/InstagramFeed"), {
  loading: () => <div className="min-h-[400px]" />,
});
const SocialShareMenu = dynamic(() => import("@/components/SocialShareMenu"));

export default async function Home() {
  const t = await getTranslations("HomePage");
  const heroTitle = `${t("heroTitleLine1")}|${t("heroTitleLine2")}`;

  return (
    <>
      <Header logo="/image/logo_white.png" logoText="KFAS" />
      <SocialShareMenu />
      <main>
        <Hero
          title={heroTitle}
          video="/videos/kfaswebsitevid.mp4"
          videoPoster="/image/KFAS-hero-poster.jpg"
        />

        <FlippedCardStack />

        <WhoWeAre />
        <StatsCounter />
        <LatestNews />
        <LogoShowcase />
        <InstagramFeed />

        {/* <StatsCounter /> */}
      </main>
      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
