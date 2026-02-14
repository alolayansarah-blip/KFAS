import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";

// Lazy load components below the fold for better performance
const FlippedCardStack = dynamic(
  () => import("@/components/FlippedCardStack"),
  {
    loading: () => <div className="min-h-[400px]" />,
  },
);
const StatsCounter = dynamic(() => import("@/components/StatsCounter"), {
  loading: () => <div className="min-h-[200px]" />,
});
// const ExploreOurWork = dynamic(() => import("@/components/ExploreOurWork"), {
//   loading: () => <div className="min-h-[400px]" />,
// });
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

export default function Home() {
  return (
    <>
      <Header logo="/image/logo_white.png" logoText="KFastest" />
      <SocialShareMenu />
      <main>
        <Hero
          titleEn="Timeless Legacy|Innovative Future"
          // titleAr="إرث راسخ"
          // subtitle="KFAS"
          // description="Kuwait Foundation for the Advancement of Sciences "
          video="/videos/HeroVideo.mp4"
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
