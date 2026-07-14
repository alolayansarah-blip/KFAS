"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Constants ───────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// ─── Types ────────────────────────────────────────────────────────────────────

type ShowcaseItem = { title: string; body: string };

type FaqItem = {
  label: string;
  question: string;
  answer?: string;
  answerPre?: string;
  answerBold?: string;
  answerPost?: string;
  imageAlt: string;
  imageCaption: string;
};

const FAQ_IMAGES = [
  "/image/Portal1.png",
  "/image/Portal2.png",
  "/image/Portal 3.png",
];
const FAQ_REVERSE = [false, true, false];

// ─── Shared UI (editorial) ─────────────────────────────────────────────────────

// Sticky rail head: orange kicker bar, title, optional intro
function SectionHead({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
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
          <p className="mt-5 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
            {intro}
          </p>
        )}
        {children}
      </motion.div>
    </div>
  );
}

// Hairline list marker (grows on row hover)
function Mark() {
  return (
    <span className="mt-[13px] h-px w-3.5 shrink-0 bg-[#EC601B] transition-all duration-300 group-hover/li:w-6" />
  );
}

// ─── FAQ Row (orange section — kept) ────────────────────────────────────────────

function FaqRow({
  item,
  image,
  reverse,
  index,
}: {
  item: FaqItem;
  image: string;
  reverse: boolean;
  index: number;
}) {
  const {
    label,
    question,
    answer,
    answerPre,
    answerBold,
    answerPost,
    imageAlt,
  } = item;

  const textCell = (
    <motion.div
      className="flex flex-col justify-center px-10 py-14 lg:px-16 lg:py-20 relative overflow-hidden"
      initial={{ opacity: 0, x: reverse ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
    >
      {/* label */}
      <motion.span
        className="mb-5 flex items-center gap-3 font-poppins text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
      >
        <span className="h-px w-7 shrink-0 bg-white/35" />
        {label}
      </motion.span>

      {/* question */}
      <motion.h2
        className="font-poppins text-[1.3rem] font-bold leading-[1.3] tracking-tight text-white sm:text-[1.6rem]"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
      >
        {question}
      </motion.h2>

      {/* animated accent bar */}
      <motion.div
        className="mt-5 mb-5 h-[2.5px] w-10 origin-left rtl:origin-right rounded-full bg-white/55"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      />

      {/* answer */}
      <motion.p
        className="font-poppins text-[14.5px] font-light leading-[1.9] text-white/80"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
      >
        {answer ? (
          answer
        ) : (
          <>
            {answerPre}{" "}
            <strong className="font-semibold text-white">{answerBold}</strong>{" "}
            {answerPost}
          </>
        )}
      </motion.p>
    </motion.div>
  );

  // hidden on mobile (below sm), visible on sm and above.
  // object-contain so the full screenshot shows without cropping.
  const imageCell = (
    <motion.div
      className="relative overflow-hidden hidden sm:block"
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="50vw"
        className="object-contain object-center transition-transform duration-1200 ease-out hover:scale-105"
      />
    </motion.div>
  );

  return (
    <>
      {/* thin divider between rows (skip first) */}
      {index > 0 && (
        <div className="mx-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      )}

      {/*
        Mobile: single column — text fills full width (image is hidden via hidden sm:block)
        Desktop (sm+): two equal columns — text + image side by side
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[340px] sm:min-h-[380px]">
        {reverse ? (
          <>
            {imageCell}
            {textCell}
          </>
        ) : (
          <>
            {textCell}
            {imageCell}
          </>
        )}
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KFASResearchPortalPage() {
  const t = useTranslations("KFASPortalPage");
  const isArabic = useLocale() === "ar";

  const pavingAims = t.raw("pavingAims") as string[];
  const faqItems = t.raw("faqItems") as FaqItem[];
  const showcaseItems = t.raw("showcaseItems") as ShowcaseItem[];
  const performanceMetrics = t.raw("performanceMetrics") as ShowcaseItem[];

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
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/Portal.png"
              alt="KFAS Research Portal"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-105 object-cover object-center"
            />
            {/* Directional overlay — leading heavy for text legibility */}
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
              isArabic
                ? "mt-28 sm:mt-36 lg:mt-44"
                : "mt-28 md:mt-28 lg:mt-44"
            }`}
            style={{ opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
            <motion.div
              className={`mb-5 flex items-center gap-2 font-semibold text-white/45 ${
                isArabic
                  ? "text-base tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>{t("breadcrumbResearch")}</span>
            </motion.div>

            {/* Title — clip-path wipe */}
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
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                <span className="block">{t("heroTitleLine1")}</span>
                <span className="block">{t("heroTitleLine2")}</span>
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

          {/* White bleed into body */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview (full-width editorial lead) ── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.div className="max-w-3xl" {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p className="mt-5 font-poppins text-[12px] font-semibold uppercase tracking-[0.3em] text-[#EC601B]">
                {t("overviewKicker")}
              </p>
              <h2 className="mt-4 font-poppins text-[1.7rem] font-semibold leading-[1.18] tracking-tight text-[#1D2D44] sm:text-[2.1rem]">
                {t("overviewTitle")}
              </h2>

              <p className="mt-7 font-poppins text-[15px] font-light leading-[1.95] text-[#1D2D44]/70">
                {t("overviewBody")}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
                <a
                  href=""
                  className="group inline-flex items-center gap-3 pointer-events-none"
                  aria-disabled="true"
                >
                  <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
                  <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                    {t("overviewLinkText")}
                  </span>
                  <svg
                    className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:rotate-180 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 rtl:group-hover:translate-x-0"
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
          </div>
        </section>

        {/* ── Paving the Way (rail · tint) ── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title={t("pavingTitle")}
                  intro={t("pavingIntro")}
                />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12">
                <ul className="divide-y divide-[#1D2D44]/[0.08] border-t border-[#1D2D44]/[0.08]">
                  {pavingAims.map((item, i) => (
                    <motion.li
                      key={item}
                      {...fadeUp(0.05 + i * 0.08)}
                      className="group/li flex gap-5 py-7 sm:gap-7 sm:py-9"
                    >
                      <Mark />
                      <p className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75">
                        {item}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ (orange section — kept) ── */}
        <section className="overflow-hidden bg-[#EC601B] px-6 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1280px]">
            {faqItems.map((item, i) => (
              <FaqRow
                key={item.label}
                item={item}
                image={FAQ_IMAGES[i]}
                reverse={FAQ_REVERSE[i]}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ── Portal Showcases (rail · white) ── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title={t("showcaseTitle")}
                  intro={t("showcaseIntro")}
                />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12">
                <ul className="divide-y divide-[#1D2D44]/[0.08] border-t border-[#1D2D44]/[0.08]">
                  {showcaseItems.map(({ title, body }, i) => (
                    <motion.li
                      key={title}
                      {...fadeUp(0.05 + i * 0.08)}
                      className="group/li flex gap-5 py-7 sm:gap-7 sm:py-9"
                    >
                      <Mark />
                      <p className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75">
                        <span className="font-semibold text-[#1D2D44]">
                          {title}:{" "}
                        </span>
                        {body}
                      </p>
                    </motion.li>
                  ))}

                  {/* Research Performance Metrics (nested) */}
                  <motion.li
                    {...fadeUp(0.05 + showcaseItems.length * 0.08)}
                    className="group/li flex gap-5 py-7 sm:gap-7 sm:py-9"
                  >
                    <Mark />
                    <div className="min-w-0 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75">
                      <span>
                        <span className="font-semibold text-[#1D2D44]">
                          {t("performanceLabel")}:{" "}
                        </span>
                        {t("performanceIntro")}
                      </span>
                      <ul className="mt-3 space-y-3">
                        {performanceMetrics.map(({ title, body }) => (
                          <li key={title} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7DC0F1]" />
                            <span>
                              <span className="font-semibold text-[#1D2D44]">
                                {title}:{" "}
                              </span>
                              {body}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact (rail · tint) ── */}
        <section className="border-t border-[#1D2D44]/[0.08] bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title={t("contactTitle")} />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12">
                <div className="space-y-3 font-poppins text-[15px] font-light text-[#1D2D44]/65">
                  <motion.p {...fadeUp(0.05)}>
                    {t("contactBody1Pre")}
                    <a
                      href="mailto:pure@kfas.org.kw"
                      dir="ltr"
                      className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
                    >
                      pure@kfas.org.kw
                    </a>
                  </motion.p>

                  <motion.p {...fadeUp(0.1)}>
                    {t("contactPhoneLabel")}
                    <a
                      href="tel:+96522278125"
                      dir="ltr"
                      className="font-medium text-[#1D2D44] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:text-[#EC601B]"
                    >
                      (+965) 22278125
                    </a>
                    {t("contactPhoneMid")}
                    <a
                      href="tel:+96522278126"
                      dir="ltr"
                      className="font-medium text-[#1D2D44] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:text-[#EC601B]"
                    >
                      22278126
                    </a>
                  </motion.p>

                  <motion.p
                    className="pt-6 text-[15px] font-light leading-[1.85] sm:text-[16px]"
                    {...fadeUp(0.15)}
                  >
                    {t("contactClosingPre")}
                    <br />
                    <span className="font-semibold text-[#1D2D44]">
                      {t("contactClosingBold")}
                    </span>{" "}
                    {t("contactClosingPost")}
                  </motion.p>
                </div>
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
