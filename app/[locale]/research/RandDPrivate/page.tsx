"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocale, useTranslations } from "next-intl";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

// ─── Types ────────────────────────────────────────────────────────────────────

type GrantType = {
  title: string;
  subtitle: string;
  bullets: string[];
  note?: string;
};

type ApplicationStep = {
  title: string;
  lead?: string;
  bullets: string[];
};

type ImpactStoryText = {
  title: string;
  body: string;
  alt?: string;
};

// ─── Data (non-translatable: image paths / layout only) ──────────────────────

const IMPACT_STORIES_META = [
  { id: "kdd", image: "/image/randD3.png", imageFit: "contain" as const },
  { id: "soof", image: "/image/tech3.jpg", imageFit: "cover" as const },
  { id: "beorganic", image: "/image/randD4.jpg", imageFit: "cover" as const },
  { id: "al-hamra", image: "/image/al-hamra-monitoring.png", imageFit: "cover" as const },
  { id: "quantum", image: "/image/Quantum.jpg", imageFit: "cover" as const },
  { id: "ndt-robot", image: "/image/NDT.jpg", imageFit: "cover" as const },
] as const;

const OVERVIEW_IMAGE_SRC = "/image/randD1.jpg";
const GRANT_SECTION_IMAGE_SRC = "/image/randD2.jpg";

const READY_TO_START_EMAIL = "research@kfas.org.kw";

// ─── Shared UI ────────────────────────────────────────────────────────────────

// Editorial section head: orange kicker, then title (+ optional intro) — sticky in the left rail
function SectionHead({
  title,
  intro,
  children,
  bodyTextSize = "text-[15px]",
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
  bodyTextSize?: string;
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
        {intro && (
          <p
            className={`mt-5 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/65`}
          >
            {intro}
          </p>
        )}
        {children}
      </motion.div>
    </div>
  );
}

// Refined hairline list marker (grows on hover of its row)
function Mark() {
  return (
    <span className="mt-[13px] h-px w-3.5 shrink-0 bg-[#EC601B] transition-all duration-300 group-hover/li:w-6" />
  );
}

// Simple divide-y list of bullet strings inside the right rail
function RailList({
  items,
  bodyTextSize = "text-[15px]",
}: {
  items: readonly string[];
  bodyTextSize?: string;
}) {
  return (
    <ul className="divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
      {items.map((body, i) => (
        <motion.li
          key={i}
          {...fadeUp(0.05 + i * 0.08)}
          className="group/li flex gap-5 py-7 sm:gap-7 sm:py-9"
        >
          <Mark />
          <p
            className={`font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/75`}
          >
            {body}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}

export default function RandDPrivatePage() {
  const t = useTranslations("RandDPrivatePage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const bodyTextSize = isArabic ? "text-[17px]" : "text-[15px]";
  const bulletTextSize = isArabic ? "text-[16px]" : "text-[14.5px]";

  const grantTypes = t.raw("grantTypes") as GrantType[];
  const whoCanApplyItems = t.raw("whoCanApplyItems") as string[];
  const whatWeLookForItems = t.raw("whatWeLookForItems") as string[];
  const applicationProcessSteps = t.raw(
    "applicationProcessSteps",
  ) as ApplicationStep[];
  const duringProjectItems = t.raw("duringProjectItems") as string[];
  const afterProjectItems = t.raw("afterProjectItems") as string[];
  const partnerItems = t.raw("partnerItems") as string[];
  const impactStoriesText = t.raw("impactStories") as ImpactStoryText[];
  const readyToStartItems = t.raw("readyToStartItems") as string[];
  const partnerBody2Mid = t("partnerBody2Mid");

  const impactStories = IMPACT_STORIES_META.map((meta, i) => ({
    ...meta,
    ...impactStoriesText[i],
  }));

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

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
          className={`relative overflow-hidden flex items-center justify-start ${
            isArabic
              ? "h-[420px] md:h-[500px] lg:h-[560px]"
              : "h-[360px] md:h-[460px] lg:h-[540px]"
          }`}
        >
          <div className="absolute inset-0 bg-[#1D2D44]">
            <Image
              src="/image/RandD.webp"
              alt={t("heroAlt")}
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-105 object-cover object-center brightness-[0.92] contrast-[1.02]"
            />
            {/* Directional overlay — heavy on the leading side for text legibility */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(252deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)"
                  : "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            {/* Bottom fade */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </div>

          {/* Content — vertically centered, leading-aligned */}
          <motion.div
            className={`relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 ${
              isArabic ? "mt-36 sm:mt-40 lg:mt-44" : "mt-44"
            }`}
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
              <span>{t("breadcrumb")}</span>
            </motion.div>

            {/* Title — clip-path wipe */}
            <div className={`overflow-hidden ${isArabic ? "pb-4 sm:pb-5" : "pb-0.5"}`}>
              <motion.h1
                className={`font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] ${
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

            {/* Orange rule */}
            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          {/* White bleed into body */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview (text + image editorial row) ─────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
              <motion.div {...fadeUp()}>
                <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
                <p
                  className={`mt-5 font-poppins font-semibold text-[#EC601B] ${
                    isArabic
                      ? "text-[15px] tracking-normal"
                      : "text-[12px] uppercase tracking-[0.3em]"
                  }`}
                >
                  {t("overviewKicker")}
                </p>
                <h2
                  className={`mt-4 font-poppins font-semibold tracking-tight text-[#1D2D44] sm:text-[2.1rem] ${
                    isArabic
                      ? "text-[1.7rem] leading-[1.45]"
                      : "text-[1.7rem] leading-[1.18]"
                  }`}
                >
                  {t("overviewTitle")}
                </h2>

                <div className="mt-8 space-y-6">
                  <p
                    className={`font-poppins ${bodyTextSize} font-light leading-[1.95] text-[#1D2D44]/70`}
                  >
                    {t("overviewBody1")}
                  </p>
                  <p
                    className={`font-poppins ${bodyTextSize} font-light leading-[1.95] text-[#1D2D44]/70`}
                  >
                    {t("overviewBody2Pre")}
                    <span className="font-semibold text-[#1D2D44]">
                      {t("overviewBody2Bold")}
                    </span>
                    {t("overviewBody2Post")}
                  </p>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.1)}>
                <div className="group relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/[0.08]">
                  <Image
                    src={OVERVIEW_IMAGE_SRC}
                    alt={t("overviewImageAlt")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-0 start-0 h-1 w-10 bg-[#EC601B]"
                    aria-hidden
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── What is the grant (text + image · tint) ───────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
              <motion.div {...fadeUp(0.05)} className="order-2 lg:order-1">
                <div className="group relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/[0.08]">
                  <Image
                    src={GRANT_SECTION_IMAGE_SRC}
                    alt={t("grantImageAlt")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-0 start-0 h-1 w-10 bg-[#EC601B]"
                    aria-hidden
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp()} className="order-1 lg:order-2">
                <SectionHead title={t("whatIsGrantTitle")} bodyTextSize={bodyTextSize}>
                  <p
                    className={`mt-5 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/65`}
                  >
                    {t("whatIsGrantBody1")}
                  </p>
                  <p
                    className={`mt-5 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/65`}
                  >
                    {t("whatIsGrantBody2")}
                  </p>
                </SectionHead>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Grant Types (rail · white) ────────────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title={t("grantTypesTitle")}
                  intro={t("grantTypesIntro")}
                  bodyTextSize={bodyTextSize}
                />
              </div>

              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <div className="divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
                  {grantTypes.map((grant, i) => (
                    <motion.div
                      key={grant.title}
                      {...fadeUp(0.05 + i * 0.08)}
                      className="py-7 sm:py-9"
                    >
                      <h3 className="font-poppins text-[1.05rem] font-semibold leading-snug text-[#1D2D44]">
                        {grant.title}
                      </h3>
                      <p
                        className={`mt-2 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/75`}
                      >
                        {grant.subtitle}
                      </p>
                      <ul className="mt-4 space-y-3">
                        {grant.bullets.map((line, j) => (
                          <li key={j} className="group/li flex gap-4">
                            <Mark />
                            <span
                              className={`font-poppins ${bulletTextSize} font-light leading-[1.85] text-[#1D2D44]/70`}
                            >
                              {line}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {grant.note && (
                        <p
                          className={`mt-5 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/75`}
                        >
                          {grant.note}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who Can Apply (rail · tint) ───────────────────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title={t("whoCanApplyTitle")}
                  intro={t("whoCanApplyIntro")}
                  bodyTextSize={bodyTextSize}
                />
              </div>
              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <RailList items={whoCanApplyItems} bodyTextSize={bodyTextSize} />
              </div>
            </div>
          </div>
        </section>

        {/* ── What We Look For (rail · white) ───────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title={t("whatWeLookForTitle")}
                  intro={t("whatWeLookForIntro")}
                  bodyTextSize={bodyTextSize}
                />
              </div>
              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <RailList items={whatWeLookForItems} bodyTextSize={bodyTextSize} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Application Process (rail · tint · numbered steps) ─────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title={t("applicationProcessTitle")}
                  intro={t("applicationProcessIntro")}
                  bodyTextSize={bodyTextSize}
                />
              </div>

              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <ul className="divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
                  {applicationProcessSteps.map((step, i) => (
                    <motion.li
                      key={step.title}
                      {...fadeUp(0.05 + i * 0.08)}
                      className="flex gap-5 py-7 sm:gap-7 sm:py-9"
                    >
                      <span className="shrink-0 pt-1 font-poppins text-[12px] font-bold tracking-[0.2em] text-[#EC601B]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="font-poppins text-[1.05rem] font-semibold leading-snug text-[#1D2D44]">
                          {step.title}
                        </p>
                        {step.lead && (
                          <p
                            className={`mt-2 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/60`}
                          >
                            {step.lead}
                          </p>
                        )}
                        <ul className="mt-4 space-y-3">
                          {step.bullets.map((line, j) => (
                            <li key={j} className="group/li flex gap-4">
                              <Mark />
                              <span
                                className={`font-poppins ${bulletTextSize} font-light leading-[1.85] text-[#1D2D44]/70`}
                              >
                                {line}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── During the Project (rail · white) ─────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title={t("duringProjectTitle")}
                  intro={t("duringProjectIntro")}
                  bodyTextSize={bodyTextSize}
                />
              </div>
              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <RailList items={duringProjectItems} bodyTextSize={bodyTextSize} />
              </div>
            </div>
          </div>
        </section>

        {/* ── After the Project (rail · tint) ───────────────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title={t("afterProjectTitle")}
                  intro={t("afterProjectIntro")}
                  bodyTextSize={bodyTextSize}
                />
              </div>
              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <RailList items={afterProjectItems} bodyTextSize={bodyTextSize} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Partner (rail · white) ────────────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title={t("whyPartnerTitle")} bodyTextSize={bodyTextSize} />
              </div>
              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <RailList items={partnerItems} bodyTextSize={bodyTextSize} />
                <motion.p
                  {...fadeUp(0.2)}
                  className={`mt-8 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/75`}
                >
                  {t("partnerBody1")}
                </motion.p>
                <motion.p
                  {...fadeUp(0.28)}
                  className={`mt-5 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/75`}
                >
                  {t("partnerBody2Pre")}
                  <a
                    href={`mailto:${READY_TO_START_EMAIL}`}
                    dir="ltr"
                    className="font-medium text-[#EC601B] underline decoration-[#EC601B]/35 underline-offset-[5px] transition-colors hover:text-[#d45510] hover:decoration-[#d45510]/50"
                  >
                    {READY_TO_START_EMAIL}
                  </a>
                  {partnerBody2Mid}
                  {partnerBody2Mid ? (
                    <a
                      href={`mailto:${READY_TO_START_EMAIL}`}
                      dir="ltr"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/35 underline-offset-[5px] transition-colors hover:text-[#d45510] hover:decoration-[#d45510]/50"
                    >
                      {READY_TO_START_EMAIL}
                    </a>
                  ) : null}
                  {t("partnerBody2Post")}
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Success Stories (rail · tint) ─────────────────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title={t("successStoriesTitle")} bodyTextSize={bodyTextSize} />
              </div>

              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <div className="divide-y divide-[#1D2D44]/10">
                  {impactStories.map((story, i) => (
                    <motion.article
                      key={story.id}
                      {...fadeUp(0.08 + i * 0.08)}
                      className={i === 0 ? "pb-10" : "py-10"}
                    >
                      <h3 className="font-poppins text-[1.15rem] font-semibold leading-snug text-[#1D2D44]">
                        {story.title}
                      </h3>
                      <p
                        className={`mt-3 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/65`}
                      >
                        {story.body}
                      </p>

                      {"image" in story && story.image && (
                        <div className="mt-8 max-w-md">
                          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/[0.08] bg-white">
                            <Image
                              src={story.image}
                              alt={story.alt ?? story.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 28rem"
                              className={
                                "imageFit" in story &&
                                story.imageFit === "contain"
                                  ? "object-contain object-center p-4"
                                  : "object-cover object-center"
                              }
                            />
                            <span
                              className="absolute top-0 start-0 h-1 w-10 bg-[#EC601B]"
                              aria-hidden
                            />
                          </div>
                        </div>
                      )}
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ready to Start (rail · white) ─────────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title={t("readyToStartTitle")}
                  intro={t("readyToStartIntro")}
                  bodyTextSize={bodyTextSize}
                />
              </div>
              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <RailList items={readyToStartItems} bodyTextSize={bodyTextSize} />
                <motion.p
                  {...fadeUp(0.25)}
                  className={`mt-9 font-poppins ${bodyTextSize} leading-[1.85] text-[#1D2D44]/70`}
                >
                  <span className="font-semibold text-[#1D2D44]">
                    {t("contactLabel")}
                  </span>{" "}
                  <a
                    href={`mailto:${READY_TO_START_EMAIL}`}
                    dir="ltr"
                    className="font-medium text-[#EC601B] underline decoration-[#EC601B]/35 underline-offset-[5px] transition-colors hover:text-[#d45510] hover:decoration-[#d45510]/50"
                  >
                    {READY_TO_START_EMAIL}
                  </a>
                </motion.p>
              </div>
            </div>
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
