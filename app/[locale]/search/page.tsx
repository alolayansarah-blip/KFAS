"use client";

import { Suspense, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResult";

const EASE = [0.22, 1, 0.36, 1] as const;

const SAFE_X =
  "pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] sm:pl-8 sm:pr-8 lg:pl-12 lg:pr-12";

export default function SearchPage() {
  const t = useTranslations("SearchPage");
  const isArabic = useLocale() === "ar";
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />

      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#1D2D44]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/KFASBuilding3.png"
              alt={t("heroTitle")}
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-105 object-cover object-right-bottom"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.82) 0%, rgba(29,45,68,0.48) 45%, rgba(29,45,68,0.12) 72%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.55) 0%, transparent 50%)",
              }}
            />
          </div>

          <motion.div
            className="relative z-10 mt-32 w-full max-w-7xl mx-auto px-6 py-12 sm:mt-40 sm:px-8 md:mt-44 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <div
              className={`overflow-hidden ${
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-0.5"
              }`}
            >
              <motion.h1
                className={`font-poppins text-4xl font-bold text-white [text-shadow:_2px_2px_20px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl xl:text-7xl ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-[1.08] tracking-tight"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>

            {/* Orange divider under title — desktop / tablet */}
            <motion.div
              className="mt-5 hidden h-[3px] w-[72px] rounded-full bg-[#EC601B] origin-left rtl:origin-right md:block"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          {/* Orange divider on navy / blue border — mobile only */}
          <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-30 md:hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <motion.div
                className="h-[3px] w-[72px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              />
            </div>
          </div>

          {/* Matches search band color so there’s no white gap under the hero */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-[#7DC0F1]" />
        </section>

        <Suspense
          fallback={
            <div
              className={`${SAFE_X} bg-white py-16 font-poppins text-[#1D2D44]/50`}
            >
              {t("loading")}
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </main>

      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
