"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

type Pillar = { label: string; title: string };

export default function OurStrategyPage() {
  const t = useTranslations("OurStrategyPage");
  const isArabic = useLocale() === "ar";

  const pillars = t.raw("pillars") as Pillar[];

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — cinematic ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/Strategy.webp"
              alt="Our Strategy"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-[1.15] object-cover object-[center_58%]"
            />
            {/* Directional overlay — mirrored in Arabic so text stays on the dark side */}
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
          </motion.div>

          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
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
              <span>{t("breadcrumbAbout")}</span>
              <span className="text-white/25">/</span>
            </motion.div>

            <div className="overflow-hidden pb-2">
              <motion.h1
                className="font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>

            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Content ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Editorial lead-in */}
            <motion.div className="mb-12" {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[10px] uppercase tracking-[0.4em]"
                }`}
              >
                {t("overviewKicker")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
              {/* Leading column — body copy */}
              <div className="space-y-6">
                <motion.p
                  className="text-base text-justify font-light leading-[1.9] text-[#1D2D44]/65"
                  {...fadeUp(0)}
                >
                  {t("para1Segment1")}
                  <strong className="font-semibold">{t("para1Bold1")}</strong>
                  {t("para1Segment2")}{" "}
                  <strong className="font-semibold">{t("para1Bold2")}</strong>
                  {t("para1Segment3")}{" "}
                  <strong className="font-semibold">{t("para1Bold3")}</strong>
                  {t("para1Segment4")}
                </motion.p>

                <motion.p
                  className="text-base text-justify font-light leading-[1.9] text-[#1D2D44]/65"
                  {...fadeUp(0.05)}
                >
                  {t("para2Pre")}{" "}
                  <strong className="font-semibold">{t("para2Bold")}</strong>
                  {t("para2Post")}
                </motion.p>

                <motion.p
                  className="text-base text-justify font-light leading-[1.9] text-[#1D2D44]/65"
                  {...fadeUp(0.1)}
                >
                  {t("para3Pre")}{" "}
                  <strong className="font-semibold">{t("para3Bold")}</strong>
                  {t("para3Post")}
                </motion.p>

                <motion.p
                  className="text-base text-justify font-light leading-[1.9] text-[#1D2D44]/65"
                  {...fadeUp(0.15)}
                >
                  {t("para4")}
                </motion.p>

                <motion.div {...fadeUp(0.18)} className="mt-6">
                  <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden group">
                    <Image
                      src={
                        isArabic
                          ? "/image/OurStrategyAr.png"
                          : "/image/KFASCover.webp"
                      }
                      alt={t("coverImageAlt")}
                      fill
                      sizes="(max-width: 768px) 100vw, 448px"
                      className="object-contain"
                    />
                    <div className="pointer-events-none absolute -left-2 -top-2 h-8 w-8 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 rtl:left-auto rtl:right-[-0.5rem]" />
                    <div className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 rtl:right-auto rtl:left-[-0.5rem]" />
                  </div>
                </motion.div>

                {/* Download CTA */}
                <motion.div {...fadeUp(0.2)}>
                  <a
                    href={
                      isArabic
                        ? "/image/KFAS%20Strategy%202025-2029%20AR.pdf"
                        : "/image/KFAS_Strategy_2025-2029_EN.pdf"
                    }
                    download={
                      isArabic
                        ? "KFAS Strategy 2025-2029 AR.pdf"
                        : "KFAS_Strategy_2025-2029_EN.pdf"
                    }
                    className="group inline-flex items-center gap-3 mt-4"
                  >
                    <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
                    <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                      {t("downloadText")}
                    </span>
                    <svg
                      className="h-3 w-3 text-[#EC601B] transition-all duration-300 group-hover:text-[#d45510] group-hover:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                      />
                    </svg>
                  </a>
                </motion.div>
              </div>

              {/* Trailing column — three pillars rail */}
              <motion.div
                className="hidden lg:flex flex-col gap-4 sticky top-32"
                {...fadeUp(0.2)}
              >
                {pillars.map(({ label, title }, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden border border-[#1D2D44]/[0.08] p-5 transition-colors duration-300 hover:border-[#EC601B]/30"
                  >
                    {/* Animated orange spine */}
                    <span className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#EC601B] transition-transform duration-500 group-hover:scale-y-100 rtl:left-auto rtl:right-0" />
                    {i === 0 && (
                      <div className="absolute -left-2 -top-2 h-6 w-6 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 pointer-events-none rtl:left-auto rtl:right-[-0.5rem]" />
                    )}
                    {i === 2 && (
                      <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none rtl:right-auto rtl:left-[-0.5rem]" />
                    )}
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#EC601B]">
                      {label}
                    </p>
                    <p className="font-poppins text-[15px] font-normal text-[#1D2D44] leading-snug">
                      {title}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Strategy diagram ── */}
        <section className="bg-[#7DC0F1]/[0.06] py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div className="relative mx-auto max-w-6xl" {...fadeUp(0.1)}>
              <div className="pointer-events-none absolute -left-2.5 -top-2.5 h-10 w-10 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40" />
              <div className="pointer-events-none absolute -bottom-2.5 -right-2.5 h-10 w-10 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35" />
              <img
                src={
                  isArabic
                    ? "/image/OurStrategyAr23.png"
                    : "/image/KFAS_Strategy.png"
                }
                alt={t("diagramAlt")}
                className="w-full"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
