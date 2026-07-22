"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.65, delay, ease: EASE },
});

type PolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export default function PolicyContent() {
  const t = useTranslations("PolicyPage");
  const isArabic = useLocale() === "ar";
  const sections = t.raw("sections") as PolicySection[];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />

      <main className="min-h-screen bg-white font-poppins">
        <section
          ref={heroRef}
          className="relative flex h-[360px] items-center justify-start overflow-hidden bg-[#1D2D44] md:h-[460px] lg:h-[540px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/KFASBuilding3.png"
              alt={t("heroTitle")}
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-110 object-cover object-[center_40%]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(252deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)"
                  : "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </div>

          <motion.div
            className="relative z-10 mx-auto mt-44 w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className={`mb-5 flex items-center gap-2 font-semibold text-white/45 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>{t("breadcrumb")}</span>
            </motion.div>

            <div
              className={`overflow-hidden ${
                isArabic ? "pb-4 pt-2 sm:pb-5" : "pb-0.5"
              }`}
            >
              <motion.h1
                className={`font-poppins text-4xl font-bold text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-tight tracking-tight"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>

            <motion.div
              className="mt-5 h-[3px] origin-left rounded-full bg-[#EC601B] rtl:origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <motion.div {...fadeUp(0)} className="mb-14">
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[10px] uppercase tracking-[0.35em]"
                }`}
              >
                {t("kicker")}
              </p>
              <p className="mt-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70">
                {t("intro")}
              </p>
              <p className="mt-3 font-poppins text-[13px] font-light text-[#1D2D44]/45">
                {t("lastUpdated")}
              </p>
            </motion.div>

            <div className="space-y-14">
              {sections.map((section, i) => (
                <motion.article
                  key={section.id}
                  id={section.id}
                  {...fadeUp(0.05 + i * 0.04)}
                  className="scroll-mt-28"
                >
                  <h2 className="font-poppins text-[1.35rem] font-semibold leading-snug tracking-tight text-[#1D2D44] sm:text-[1.55rem]">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p
                        key={`${section.id}-${pIndex}`}
                        className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <div className="flex justify-center bg-white py-12">
          <motion.button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex flex-col items-center gap-2 text-[#1D2D44]/35 transition-colors duration-300 hover:text-[#EC601B]"
            {...fadeUp(0)}
            aria-label={t("backToTop")}
          >
            <div className="flex h-9 w-9 items-center justify-center border border-[#1D2D44]/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#EC601B]/50">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
              {t("backToTop")}
            </span>
          </motion.button>
        </div>
      </main>

      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
