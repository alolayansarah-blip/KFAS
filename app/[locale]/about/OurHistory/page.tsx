"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.1 };

type Milestone = {
  year: string;
  title: string;
  description: string;
  imageAlt: string;
};

// Visual assets keyed by milestone index — kept out of translations since
// they aren't locale-specific.
const MILESTONE_MEDIA: {
  image?: string;
  imageFit?: "contain" | "cover";
  grayscale?: boolean;
}[] = [
  { image: "/image/ShaikhJaber.jpeg", grayscale: true }, // 1976
  { image: "/image/KuwaitPrize.webp", imageFit: "contain" }, // 1979
  { image: "/image/1984AspdPublications.png" }, // 1984
  { image: "/image/1986.png" }, // 1986
  { image: "/image/1987.webp" }, // 1987
  { image: "/image/jaberPrize.webp", imageFit: "contain" }, // 1988
  { image: "/image/ScientificCenter.webp" }, // 2000
  { image: "/image/2001.jpg" }, // 2000-2001
  { image: "/image/MIT.webp" }, // 2005
  { image: "/image/DDI2.webp" }, // 2006
  { image: "/image/2010.png" }, // 2010
  { image: "/image/2013.webp" }, // 2013
  { image: "/image/alsumaitPrize.webp", imageFit: "contain" }, // 2015
  { image: "/image/2019CERN.webp" }, // 2019
  {}, // 2020
  { image: "/image/2023.png" }, // 2023
  { image: "/image/Pure.webp" }, // 2024
  { image: "/image/NSRClogo.png", imageFit: "contain" }, // Sep 2024
  { image: "/image/naseem.png" }, // 2024–2025
  { image: "/image/KFASstrategy1.jpeg" }, // 28 May 2025
  { image: "/image/mou.png" }, // 30 Nov 2025
  { image: "/image/harvard.png" }, // 2025
  {}, // 2023–2025
];

export default function OurHistoryPage() {
  const t = useTranslations("OurHistoryPage");
  const isArabic = useLocale() === "ar";
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const historyMilestones = t.raw("milestones") as Milestone[];

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const getStartYear = (value: string) => {
    const match = value.match(/\d{4}/);
    return match ? Number(match[0]) : null;
  };

  const yearOptions = useMemo(() => {
    const years = historyMilestones
      .map((m) => getStartYear(m.year))
      .filter((year): year is number => year !== null);
    return Array.from(new Set(years)).sort((a, b) => a - b);
  }, [historyMilestones]);

  const filteredMilestones = useMemo(() => {
    if (selectedYear === "all") return historyMilestones;
    return historyMilestones.filter((m) => {
      const startYear = getStartYear(m.year);
      return startYear !== null && startYear >= selectedYear;
    });
  }, [historyMilestones, selectedYear]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            {/* object-cover fills the hero edge to edge (no side gaps).
                object-position controls which part stays in frame — lower the
                percentage to show more of the top, raise it to show more of
                the bottom. */}
            <Image
              src="/image/SkeikhJaber.webp"
              alt="Our History"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-[center_28%] -scale-x-100"
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

            <div
              className={`overflow-hidden ${
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-0.5"
              }`}
            >
              <motion.h1
                className={`font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-tight tracking-tight"
                }`}
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
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Intro */}
            <motion.p
              className="max-w-4xl text-base font-light leading-[1.9] text-[#1D2D44]/65 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {t("introBody")}
            </motion.p>

            {/* Filter */}
            <motion.div
              className="mb-14 inline-flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#1D2D44]/40">
                {t("filterByYear")}
              </p>
              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(
                    e.target.value === "all" ? "all" : Number(e.target.value),
                  )
                }
                className="border border-[#1D2D44]/12 bg-white px-5 py-3 text-[13px] font-medium text-[#1D2D44] focus:outline-none focus:border-[#EC601B]/40 transition-colors duration-200 w-48"
                aria-label={t("filterAriaLabel")}
              >
                <option value="all">{t("allYears")}</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Center vertical line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#EC601B]/60 via-[#EC601B]/20 to-transparent" />

              <div className="space-y-12">
                {filteredMilestones.map((milestone, index) => {
                  const media = MILESTONE_MEDIA[index];
                  const hasImage = Boolean(media?.image);
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={`${milestone.year}-${milestone.title}`}
                      className={`relative flex flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"}`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
                    >
                      {/* Center dot */}
                      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 h-3 w-3 rounded-full bg-white border-2 border-[#EC601B]" />

                      {/* Content card */}
                      <div className="lg:w-1/2 lg:px-10">
                        <div className="relative border border-[#1D2D44]/[0.08] p-6 sm:p-8">
                          {/* Corner accent */}
                          <div
                            className={`absolute -top-2 h-8 w-8 border-t-[1.5px] border-[#EC601B]/40 pointer-events-none ${isEven ? "-right-2 border-r-[1.5px]" : "-left-2 border-l-[1.5px]"}`}
                          />

                          {/* Year */}
                          <div className="font-poppins font-bold text-[#EC601B] text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight mb-3">
                            {milestone.year}
                          </div>

                          {/* Eyebrow */}
                          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#1D2D44]/35 mb-3">
                            {t("milestoneEyebrow")}
                          </p>

                          {/* Title */}
                          <h4 className="font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem] mb-4">
                            {milestone.title}
                          </h4>

                          {/* Divider */}
                          <div className="mb-4 h-px w-8 bg-gradient-to-r from-[#EC601B]/40 to-transparent rtl:bg-gradient-to-l" />

                          {/* Description */}
                          <p className="text-base font-light leading-[1.9] text-[#1D2D44]/65">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="lg:w-1/2 lg:px-10 mt-5 lg:mt-0 flex items-center">
                        {hasImage && (
                          <div className="relative w-full overflow-hidden aspect-[16/10] group">
                            <Image
                              src={media.image as string}
                              alt={milestone.imageAlt || milestone.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className={`${
                                media.imageFit === "contain"
                                  ? "object-contain"
                                  : "object-cover"
                              } transition-transform duration-700 group-hover:scale-[1.03] ${
                                media.grayscale ? "grayscale" : ""
                              }`}
                            />
                            <div className="absolute inset-0 bg-[#1D2D44]/15 transition-all duration-500 group-hover:bg-[#1D2D44]/5" />
                            <div
                              className={`absolute -top-2 h-8 w-8 border-t-[1.5px] border-[#7DC0F1]/40 pointer-events-none ${!isEven ? "-right-2 border-r-[1.5px]" : "-left-2 border-l-[1.5px]"}`}
                            />
                            <div
                              className={`absolute -bottom-2 h-8 w-8 border-b-[1.5px] border-[#7DC0F1]/35 pointer-events-none ${isEven ? "-right-2 border-r-[1.5px]" : "-left-2 border-l-[1.5px]"}`}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Back to top */}
            <div className="mt-24 flex justify-center">
              <motion.button
                onClick={scrollToTop}
                className="group inline-flex flex-col items-center gap-2 text-[#1D2D44]/35 hover:text-[#EC601B] transition-colors duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE }}
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
