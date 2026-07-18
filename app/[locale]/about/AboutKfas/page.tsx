"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

type VisionMissionItem = { label: string; title: string; text: string };
type Center = { title: string; description: string };

const CENTER_IMAGES = [
  "/image/ScientificCenter.webp",
  "/image/DDI1.png",
  "/image/SAAC.webp",
  "/image/aspd.jpg",
  "/image/NSRC2.webp",
  "/image/AbdullahAlsalemBuilding.jpg",
];

const CENTER_HREFS = [
  "https://tsck.org.kw/",
  "https://www.dasmaninstitute.org/",
  "https://linktr.ee/sacgc_kw",
  "https://www.aspdkw.com/",
  "http://www.knsrc.org.kw/",
  "https://booking.ascckw.com/ticket-selection/",
];

/* ── shared editorial pieces ───────────────────────────────────────────── */

// Sticky section head: orange kicker, then title (+ optional rich children)
function SectionHead({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="lg:sticky lg:top-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
        <h2 className="mt-5 font-poppins text-[1.55rem] font-semibold leading-[1.18] tracking-tight text-[#1D2D44] sm:text-[1.9rem]">
          {title}
        </h2>
        {children}
      </motion.div>
    </div>
  );
}

// Refined hairline list marker (grows on hover of its row)
function Mark() {
  return (
    <span
      aria-hidden
      className="mt-[0.7rem] block h-px w-6 shrink-0 bg-[#EC601B]/70 transition-all duration-500 group-hover:w-10"
    />
  );
}

function TextBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.p
      className="text-base font-light leading-[1.9] text-[#1D2D44]/65 text-justify"
      {...fadeUp(delay)}
    >
      {children}
    </motion.p>
  );
}

export default function AboutKfasPage() {
  const t = useTranslations("AboutKfasPage");
  const isArabic = useLocale() === "ar";

  const visionMission = t.raw("visionMission") as VisionMissionItem[];
  const centers = t.raw("centers") as Center[];

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Header logo="/image/KfasBuilding2.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] xl:object-[50%_75%]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/AboutKFAS3.webp"
              alt="Who We Are"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="origin-[center_80%] scale-105 object-cover object-[center_80%]"
            />
            {/* Directional overlay — mirrored in Arabic so text stays on the dark side */}
            <div
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(252deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)"
                  : "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            {/* Bottom fade */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
            {/* Soft blue wash — trailing edge (right in EN, left in AR) */}
            <div
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(to right, rgba(125,192,241,0.28) 0%, rgba(125,192,241,0.12) 28%, transparent 55%)"
                  : "linear-gradient(to left, rgba(125,192,241,0.28) 0%, rgba(125,192,241,0.12) 28%, transparent 55%)",
              }}
              aria-hidden
            />
          </div>

          {/* Content — vertically centered, leading-aligned */}
          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
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

            {/* Title — clip-path wipe */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15,
                  ease: EASE,
                }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>

            {/* Orange rule */}
            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: EASE,
              }}
              style={{ width: 72 }}
            />
          </motion.div>

          {/* White bleed into body */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div {...fadeUp(0)}>
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

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start">
              {/* Leading column — body copy */}
              <div className="space-y-8">
                <TextBlock delay={0}>{t("overviewBody1")}</TextBlock>
                <TextBlock delay={0.1}>{t("overviewBody2")}</TextBlock>
              </div>

              {/* Trailing column — KFAS building */}
              <motion.div
                className="hidden lg:flex flex-col items-center justify-center sticky top-32"
                {...fadeUp(0.2)}
              >
                <div className="relative p-10 border border-[#1D2D44]/[0.08]">
                  <div className="pointer-events-none absolute -start-2 -top-2 h-8 w-8 border-s-[1.5px] border-t-[1.5px] border-[#EC601B]/40" />
                  <div className="pointer-events-none absolute -end-2 -bottom-2 h-8 w-8 border-e-[1.5px] border-b-[1.5px] border-[#7DC0F1]/35" />
                  <Image
                    src="/image/KfasBuilding2.png"
                    alt={t("buildingImageAlt")}
                    width={640}
                    height={400}
                    sizes="420px"
                    className="w-full max-w-[420px] h-auto object-contain opacity-85"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Vision & Mission ── */}
        <section className="bg-[#7DC0F1]/[0.06] py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Leading rail */}
              <div className="lg:col-span-4">
                <SectionHead title={t("visionMissionTitle")} />
              </div>

              {/* Trailing — hairline divided list */}
              <div className="lg:col-span-8">
                <div className="divide-y divide-[#1D2D44]/[0.08]">
                  {visionMission.map(({ label, title, text }, i) => (
                    <motion.div
                      key={title}
                      className="group flex gap-5 py-8 first:pt-0 last:pb-0"
                      {...fadeUp(i * 0.1)}
                    >
                      <Mark />
                      <div>
                        <p
                          className={`mb-1 font-semibold text-[#EC601B] ${
                            isArabic
                              ? "text-[15px] tracking-normal"
                              : "text-[10px] uppercase tracking-[0.4em]"
                          }`}
                        >
                          {label}
                        </p>
                        <h3 className="mb-3 font-poppins text-[1.45rem] font-normal leading-[1.4] tracking-tight text-[#1D2D44] sm:text-[1.7rem]">
                          {title}
                        </h3>
                        <p className="max-w-2xl text-[15px] font-light leading-[1.85] text-[#1D2D44]/65">
                          {text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Strategy ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-4xl space-y-6">
              <TextBlock delay={0}>{t("strategyBody1")}</TextBlock>
              <TextBlock delay={0.05}>{t("strategyBody2")}</TextBlock>
              <TextBlock delay={0.1}>{t("strategyBody3")}</TextBlock>
              <TextBlock delay={0.15}>{t("strategyBody4")}</TextBlock>
            </div>
          </div>
        </section>

        {/* ── Centers ── */}
        <section className="bg-[#7DC0F1]/[0.06] py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div className="mb-16" {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[10px] uppercase tracking-[0.4em]"
                }`}
              >
                {t("centersKicker")}
              </p>
            </motion.div>

            <div className="space-y-16">
              {centers.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                  {...fadeUp(0.05)}
                >
                  {/* Image */}
                  <div
                    className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div className="relative overflow-hidden aspect-[16/10] group">
                      <Image
                        src={CENTER_IMAGES[index]}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[#1D2D44]/20 transition-all duration-500 group-hover:bg-[#1D2D44]/5" />
                      <div className="pointer-events-none absolute -start-2 -top-2 h-8 w-8 border-s-[1.5px] border-t-[1.5px] border-[#EC601B]/40" />
                      <div className="pointer-events-none absolute -end-2 -bottom-2 h-8 w-8 border-e-[1.5px] border-b-[1.5px] border-[#7DC0F1]/35" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h3 className="mb-3 font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem]">
                      {item.title}
                    </h3>
                    <div className="mb-5 h-px w-10 bg-gradient-to-r from-[#EC601B]/50 to-transparent rtl:bg-gradient-to-l" />
                    <p className="mb-7 text-base font-light leading-relaxed text-[#1D2D44]/65 text-justify">
                      {item.description}
                    </p>
                    <a
                      href={CENTER_HREFS[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3"
                    >
                      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
                      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                        {t("readMore")}
                      </span>
                      <svg
                        className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:rotate-180 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 rtl:group-hover:translate-x-0 group-hover:text-[#d45510]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Back to Top ── */}
        <div className="py-12 bg-white flex justify-center">
          <motion.button
            onClick={scrollToTop}
            className="group inline-flex flex-col items-center gap-2 text-[#1D2D44]/35 hover:text-[#EC601B] transition-colors duration-300"
            {...fadeUp(0)}
            aria-label={t("backToTop")}
          >
            <div className="flex h-9 w-9 items-center justify-center border border-[#1D2D44]/15 transition-all duration-300 group-hover:border-[#EC601B]/50 group-hover:-translate-y-1">
              <svg
                className="w-4 h-4"
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
      <Footer />
    </>
  );
}
