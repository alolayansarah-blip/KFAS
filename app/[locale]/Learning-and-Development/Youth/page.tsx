"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Brand ───────────────────────────────────────────────────────────────────
const BRAND = {
  orange: "#EC601B",
  lightBlue: "#BBDEFB",
  navy: "#1D2D44",
  white: "#FFFFFF",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTAINER = "mx-auto max-w-[1280px]";

// ─── Image placeholder ─────────────────────────────────────────────────────────
// Swap for a real photo by replacing the inner block with:
//   <Image src="/image/your-photo.jpg" alt="…" fill className="object-cover" />
function ImagePlaceholder({
  ratio = "aspect-[4/3]",
  label = "Image",
}: {
  ratio?: string;
  label?: string;
}) {
  return (
    <div
      className={`group relative w-full overflow-hidden border ${ratio}`}
      style={{ borderColor: `${BRAND.navy}14` }}
    >
      {/* ── REPLACE FROM HERE ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${BRAND.lightBlue}45 0%, ${BRAND.navy}12 100%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `radial-gradient(${BRAND.navy}18 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${BRAND.navy}`}
            strokeOpacity="0.4"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.6" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span
            className="font-poppins text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: `${BRAND.navy}55` }}
          >
            {label}
          </span>
        </div>
      </div>
      {/* ── REPLACE TO HERE ──────────────────────────────────────────── */}
    </div>
  );
}

// ─── Program section ────────────────────────────────────────────────────────────
function ProgramSection({
  title,
  bodyParagraphs,
  goalsTitle,
  goalsItems,
  closingParagraph,
  imageLabel,
  imageSrc,
  imageAlt,
  imageLeft = false,
  background,
}: {
  title: string;
  bodyParagraphs: string[];
  goalsTitle?: string;
  goalsItems?: string[];
  closingParagraph?: string;
  imageLabel: string;
  imageSrc?: string;
  imageAlt?: string;
  imageLeft?: boolean;
  background?: string;
}) {
  const text = (
    <motion.div
      className={`flex flex-col gap-5 ${imageLeft ? "lg:order-2" : ""}`}
      initial={{ opacity: 0, x: imageLeft ? 48 : -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div>
        <h3
          className="font-poppins text-[1.4rem] sm:text-[1.65rem] font-semibold leading-[1.3] tracking-tight"
          style={{ color: BRAND.navy }}
        >
          {title}
        </h3>
        <div
          className="mt-4 h-px w-full max-w-[360px] bg-gradient-to-r rtl:bg-gradient-to-l from-[#EC601B] via-[#BBDEFB]/40 to-transparent"
        />
      </div>
      <div className="flex flex-col gap-4">
        {bodyParagraphs.map((paragraph, i) => (
          <p
            key={i}
            className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
            style={{ color: `${BRAND.navy}B0` }}
          >
            {paragraph}
          </p>
        ))}
      </div>
      {goalsItems && goalsItems.length > 0 && (
        <div className="flex flex-col gap-4">
          {goalsTitle && (
            <p
              className="font-poppins text-[14.5px] font-semibold"
              style={{ color: BRAND.navy }}
            >
              {goalsTitle}
            </p>
          )}
          <ul className="flex flex-col gap-3">
            {goalsItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: BRAND.orange }}
                />
                <span
                  className="font-poppins text-[14px] font-light leading-[1.8]"
                  style={{ color: `${BRAND.navy}B0` }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {closingParagraph && (
        <p
          className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
          style={{ color: `${BRAND.navy}B0` }}
        >
          {closingParagraph}
        </p>
      )}
    </motion.div>
  );

  const image = (
    <motion.div
      className={imageLeft ? "lg:order-1" : ""}
      initial={{ opacity: 0, x: imageLeft ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      whileHover={{ y: -8 }}
    >
      {imageSrc ? (
        <div
          className="group relative aspect-[4/3] w-full overflow-hidden border"
          style={{ borderColor: `${BRAND.navy}14` }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt ?? imageLabel}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <ImagePlaceholder label={imageLabel} />
      )}
    </motion.div>
  );

  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12"
      style={background ? { background } : undefined}
    >
      <div className={CONTAINER}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {text}
          {image}
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function YouthPage() {
  const t = useTranslations("YouthPage");
  const isArabic = useLocale() === "ar";

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // The Arabic source text supplied richer, multi-paragraph copy for these
  // three programs than the live English page has; only Arabic has the
  // additional paragraphs beyond the first.
  const genScienceBody = isArabic
    ? [t("genScienceBody1"), t("genScienceBody2")]
    : [t("genScienceBody1")];
  const scienceMonthBody = isArabic
    ? [t("scienceMonthBody1"), t("scienceMonthBody2"), t("scienceMonthBody3")]
    : [t("scienceMonthBody1")];
  const scienceBusBody = isArabic
    ? [t("scienceBusBody1"), t("scienceBusBody2"), t("scienceBusBody3")]
    : [t("scienceBusBody1")];

  const scopeGroups = [
    {
      title: t("scopeGroup1Title"),
      items: [
        t("scopeGroup1Item1"),
        t("scopeGroup1Item2"),
        t("scopeGroup1Item3"),
      ],
    },
    {
      title: t("scopeGroup2Title"),
      items: [
        t("scopeGroup2Item1"),
        t("scopeGroup2Item2"),
        t("scopeGroup2Item3"),
      ],
    },
    {
      title: t("scopeGroup3Title"),
      items: [
        t("scopeGroup3Item1"),
        t("scopeGroup3Item2"),
        t("scopeGroup3Item3"),
      ],
    },
  ];

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
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#121820]"
        >
          <div className="absolute inset-0 bg-[#1D2D44]">
            <Image
              src="/image/youth.webp"
              alt="Youth engaged in hands-on learning and development"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-105 object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(125,192,241,0.28) 0%, rgba(125,192,241,0.12) 28%, transparent 55%)",
              }}
              aria-hidden
            />
          </div>

          <motion.div
            className="relative z-10 mt-32 w-full max-w-7xl mx-auto px-6 py-12 sm:mt-40 sm:px-8 md:mt-44 lg:px-12"
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
              <span>{t("breadcrumbLearning")}</span>
            </motion.div>

            <div
              className={`overflow-hidden ${
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-0.5"
              }`}
            >
              <motion.h1
                className={`text-left rtl:text-right font-poppins text-4xl font-bold text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-[1.08] tracking-tight"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
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

          {/* Orange divider on navy / white border — mobile only */}
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

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ─────────────────────────────────────────────────── */}
        <section
          id="overview"
          className="relative scroll-mt-28 overflow-hidden bg-white py-20 sm:py-28"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full opacity-[0.12] rtl:right-auto rtl:-left-40"
            style={{
              background:
                "radial-gradient(circle, #7DC0F1 0%, transparent 70%)",
            }}
          />
          <div className={`relative ${CONTAINER} px-6 sm:px-8 lg:px-12`}>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-poppins font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[12px] uppercase tracking-[0.3em]"
                }`}
              >
                {t("overviewLabel")}
              </p>
              <div className="mt-5 flex flex-col gap-6">
                <p className="text-justify font-poppins text-[15px] sm:text-[16px] leading-[1.9] font-light text-[#1D2D44]/70">
                  {t("overviewPara1")}
                </p>
                <motion.p
                  className="text-justify font-poppins text-[15px] sm:text-[16px] leading-[1.9] font-light text-[#1D2D44]/70"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                >
                  {t("overviewPara2")}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Scope ────────────────────────────────────────────────────── */}
        <section
          id="scope"
          className="scroll-mt-28 px-6 pb-20 sm:px-8 sm:pb-28 lg:px-12"
        >
          <div className={CONTAINER}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <h2
                className="font-poppins text-[1.55rem] sm:text-[1.8rem] font-semibold leading-[1.3] tracking-tight"
                style={{ color: BRAND.navy }}
              >
                {t("scopeTitle")}
              </h2>
              <motion.div
                className="mt-4 h-px w-full max-w-[420px] origin-left rtl:origin-right bg-gradient-to-r rtl:bg-gradient-to-l from-[#EC601B] via-[#BBDEFB]/40 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              />
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
              {scopeGroups.map((group, gi) => (
                <motion.div
                  key={group.title}
                  className="flex h-full flex-col overflow-hidden border"
                  style={{ borderColor: `${BRAND.navy}14` }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: gi * 0.1, ease: EASE }}
                  whileHover={{ y: -6 }}
                >
                  <div
                    className="h-1 w-full"
                    style={{ background: BRAND.orange }}
                  />
                  <div className="flex flex-col gap-5 px-7 py-8">
                    <h3
                      className="font-poppins text-[16px] font-semibold leading-snug"
                      style={{ color: BRAND.navy }}
                    >
                      {group.title}
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: BRAND.orange }}
                          />
                          <span
                            className="font-poppins text-[14px] font-light leading-[1.8]"
                            style={{ color: `${BRAND.navy}B0` }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section
          id="apply"
          className="scroll-mt-28 px-6 py-20 sm:px-8 sm:py-24 lg:px-12"
          style={{ background: "#7DC0F1" }}
        >
          <div
            className={`${CONTAINER} flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:gap-12 lg:text-left rtl:lg:text-right`}
          >
            <motion.h2
              className="max-w-[30ch] font-poppins text-[1.5rem] sm:text-[2rem] font-semibold leading-[1.3] tracking-tight"
              style={{ color: BRAND.white }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {t("ctaTitle")}
            </motion.h2>
            <motion.a
              href="#"
              className="inline-flex shrink-0 items-center justify-center rounded-full px-9 py-3.5 font-poppins text-[13px] font-semibold uppercase tracking-[0.18em] shadow-sm"
              style={{ background: BRAND.white, color: BRAND.navy }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("ctaButton")}
            </motion.a>
          </div>
        </section>

        {/* ── Programs ─────────────────────────────────────────────────── */}
        <ProgramSection
          title={t("genScienceTitle")}
          imageLabel="Generation Science"
          imageSrc="/image/Generation.png"
          imageAlt="Students exploring STEM through virtual reality"
          bodyParagraphs={genScienceBody}
          goalsTitle={t("genScienceGoalsTitle")}
          goalsItems={[
            t("genScienceGoal1"),
            t("genScienceGoal2"),
            t("genScienceGoal3"),
            t("genScienceGoal4"),
            t("genScienceGoal5"),
            t("genScienceGoal6"),
          ]}
        />

        <ProgramSection
          title={t("scienceMonthTitle")}
          imageLabel="Science Month"
          imageSrc="/image/ScienceMonth.png"
          imageAlt="Science Month community event with youth activities"
          imageLeft
          background={`${BRAND.lightBlue}20`}
          bodyParagraphs={scienceMonthBody}
          goalsTitle={t("scienceMonthGoalsTitle")}
          goalsItems={[
            t("scienceMonthGoal1"),
            t("scienceMonthGoal2"),
            t("scienceMonthGoal3"),
            t("scienceMonthGoal4"),
            t("scienceMonthGoal5"),
            t("scienceMonthGoal6"),
          ]}
          closingParagraph={t("scienceMonthClosing")}
        />

        <ProgramSection
          title={t("scienceBusTitle")}
          imageLabel="Science Bus"
          imageSrc="/image/SciencesBus.png"
          imageAlt="Students learning inside the mobile Science Bus laboratory"
          bodyParagraphs={scienceBusBody}
          goalsTitle={t("scienceBusGoalsTitle")}
          goalsItems={[
            t("scienceBusGoal1"),
            t("scienceBusGoal2"),
            t("scienceBusGoal3"),
            t("scienceBusGoal4"),
            t("scienceBusGoal5"),
            t("scienceBusGoal6"),
            t("scienceBusGoal7"),
          ]}
          closingParagraph={t("scienceBusClosing")}
        />
      </main>
      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
