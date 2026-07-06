"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocale, useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Types ────────────────────────────────────────────────────────────────────
type PrizeComponent = { title: string; desc: string };

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isArabic = useLocale() === "ar";
  return (
    <div ref={ref} className="mb-10">
      <motion.h2
        className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <motion.div
        className={`mt-5 h-px ${
          isArabic
            ? "origin-right bg-gradient-to-l from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
            : "origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
        }`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      />
    </div>
  );
}

function SectionHeadingLight({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isArabic = useLocale() === "ar";
  return (
    <div ref={ref} className="mb-10">
      <motion.h2
        className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <motion.div
        className={`mt-5 h-px bg-white/30 ${isArabic ? "origin-right" : "origin-left"}`}
        style={{ width: 48 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
      />
    </div>
  );
}

function ApplyLink({ href = "#", text }: { href?: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 inline-flex items-center gap-3 w-fit"
    >
      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
        {text}
      </span>
      <svg
        className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:-scale-x-100 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
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
  );
}

function ObjectiveRow({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-[#1D2D44]/10"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-[#EC601B] mt-[10px] flex-shrink-0"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          duration: 2.5,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p className="font-poppins text-[#1D2D44]/70 font-light leading-[1.85] text-[0.95rem]">
        {text}
      </p>
    </motion.div>
  );
}

function ObjectiveRows({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((text, i) => (
        <ObjectiveRow key={i} text={text} index={i} />
      ))}
    </div>
  );
}

function PrizeFieldRow({ label, index }: { label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-white/25"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-white mt-[10px] flex-shrink-0"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          duration: 2.5,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p className="font-poppins text-white/85 font-light leading-[1.85] text-[0.95rem]">
        {label}
      </p>
    </motion.div>
  );
}

function PrizeFieldRows({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((label, i) => (
        <PrizeFieldRow key={label} label={label} index={i} />
      ))}
    </div>
  );
}

function EligibilityNumberedRow({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-4 sm:gap-5 py-5 border-b border-[#1D2D44]/10"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
    >
      <span className="font-poppins text-[#EC601B] font-medium tabular-nums shrink-0 w-7 sm:w-8 text-[0.95rem] mt-0.5">
        {index + 1}.
      </span>
      <p className="font-poppins text-[#1D2D44]/70 font-light leading-[1.85] text-[0.95rem] min-w-0">
        {text}
      </p>
    </motion.div>
  );
}

function EligibilityNumberedRows({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((text, i) => (
        <EligibilityNumberedRow key={i} text={text} index={i} />
      ))}
    </div>
  );
}

function PrizeComponentRows({ items }: { items: PrizeComponent[] }) {
  return (
    <div className="mt-10 border-t border-[#1D2D44]/08 pt-12 sm:pt-14">
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-0">
        {items.map((item) => (
          <div
            key={item.title}
            className="relative flex min-w-0 flex-col items-center border-b border-[#1D2D44]/06 px-5 py-10 text-center last:border-b-0 sm:border-b-0 sm:border-e sm:border-[#1D2D44]/08 sm:py-2 sm:last:border-e-0 lg:px-10"
          >
            <p className="font-poppins text-[#EC601B] font-light text-[1.5rem] leading-[1.25] tracking-[0.03em] sm:text-[1.65rem] lg:text-[1.8rem]">
              {item.title}
            </p>
            <p className="mx-auto mt-6 max-w-[15.5rem] font-poppins text-[0.9375rem] font-light leading-[1.75] text-[#1D2D44]/58">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AlSumaitPrizePage() {
  const t = useTranslations("AlSumaitPrizePage");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const objectiveItems = t.raw("objectiveItems") as string[];
  const fieldItems = t.raw("fieldItems") as string[];
  const eligibilityItems = t.raw("eligibilityItems") as string[];
  const prizeComponents = t.raw("prizeComponents") as PrizeComponent[];

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#121820]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/Prizes1.png"
              alt=""
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-[center_40%] scale-[1.06] brightness-[0.98] contrast-[1.02]"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                background: isArabic
                  ? [
                      "linear-gradient(232deg, rgba(72,143,204,0.34) 0%, rgba(72,143,204,0.09) 44%, transparent 70%)",
                      "radial-gradient(ellipse 90% 65% at 90% 6%, rgba(200,220,250,0.16) 0%, transparent 58%)",
                      "linear-gradient(to bottom, rgba(18,24,32,0.14) 0%, rgba(29,45,68,0.3) 42%, rgba(10,14,22,0.8) 100%)",
                    ].join(", ")
                  : [
                      "linear-gradient(128deg, rgba(72,143,204,0.34) 0%, rgba(72,143,204,0.09) 44%, transparent 70%)",
                      "radial-gradient(ellipse 90% 65% at 10% 6%, rgba(200,220,250,0.16) 0%, transparent 58%)",
                      "linear-gradient(to bottom, rgba(18,24,32,0.14) 0%, rgba(29,45,68,0.3) 42%, rgba(10,14,22,0.8) 100%)",
                    ].join(", "),
              }}
            />
          </div>

          <motion.div
            className="relative z-10 mt-28 md:mt-28 lg:mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
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
              <span>{t("breadcrumb")}</span>
              <span className="text-white/25">/</span>
            </motion.div>

            <h1
              className={`font-poppins flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] ${
                isArabic ? "leading-[1.35]" : "leading-[1.1]"
              }`}
            >
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                >
                  {t("heroTitleLine1")}
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
                >
                  {t("heroTitleLine2")}
                </motion.span>
              </div>
              <motion.span
                className="text-base sm:text-lg lg:text-xl font-light text-white/90 tracking-normal"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
              >
                {t("heroSubtitle")}
              </motion.span>
            </h1>

            <motion.div
              className={`mt-5 h-[3px] rounded-full bg-[#EC601B] ${
                isArabic ? "origin-right" : "origin-left"
              }`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview + Objectives ── */}
        <div className="relative">
          <div className="relative z-10">
            <section className="py-20 sm:py-28">
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <SectionHeading>{t("overviewTitle")}</SectionHeading>
                <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
                  <div className="min-w-0 flex-1 space-y-6">
                    <FadeUp delay={0.1}>
                      <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                        {t("overviewBody1Pre")}
                        {t("overviewBody1Bold") && (
                          <span className="font-semibold text-[#1D2D44]">
                            {t("overviewBody1Bold")}
                          </span>
                        )}
                        {t("overviewBody1Post")}
                      </p>
                    </FadeUp>
                    <FadeUp delay={0.18}>
                      <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                        {t("overviewBody2Pre")}
                        {t("overviewBody2Bold") && (
                          <span className="font-semibold text-[#1D2D44]">
                            {t("overviewBody2Bold")}
                          </span>
                        )}
                        {t("overviewBody2Post")}
                      </p>
                    </FadeUp>
                    {isArabic && (
                      <FadeUp delay={0.22}>
                        <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                          {t("overviewBody3")}
                        </p>
                      </FadeUp>
                    )}
                    <FadeUp delay={0.26}>
                      <ApplyLink
                        href="https://prizes.kfas.org.kw/"
                        text={t("applyLinkText")}
                      />
                    </FadeUp>
                  </div>
                  <FadeUp
                    delay={0.25}
                    className="flex shrink-0 justify-center lg:justify-end lg:pt-1"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#EC601B]/10 blur-3xl rounded-full scale-125 pointer-events-none" />
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src="/image/alsumaitPrize.webp"
                          alt={t("logoAlt")}
                          width={400}
                          height={400}
                          className="relative h-auto w-full max-w-[240px] object-contain sm:max-w-[280px] lg:max-w-[300px] drop-shadow-lg"
                          sizes="(max-width: 1024px) 280px, 300px"
                        />
                      </motion.div>
                    </div>
                  </FadeUp>
                </div>
              </div>
            </section>

            <section className="pb-20 sm:pb-28 pt-0">
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
                  <div className="lg:sticky lg:top-32">
                    <SectionHeading>{t("objectivesTitle")}</SectionHeading>
                    <FadeUp delay={0.15}>
                      <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-4">
                        {t("objectivesIntro")}
                      </p>
                    </FadeUp>
                  </div>
                  <ObjectiveRows items={objectiveItems} />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ── Prize Fields — orange ── */}
        <section className="bg-[#EC601B] py-24 relative">
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden
          >
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 1px, transparent 0, transparent 50%)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          </div>
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeadingLight>{t("fieldsTitle")}</SectionHeadingLight>
                <FadeUp delay={0.15}>
                  <p className="font-poppins text-base leading-[1.9] text-white/70 font-light mt-4">
                    {t("fieldsIntro")}
                  </p>
                </FadeUp>
              </div>
              <PrizeFieldRows items={fieldItems} />
            </div>
            <FadeUp delay={0.2}>
              <p className="font-poppins text-base leading-[1.9] text-white/75 font-light mt-14 lg:mt-16 max-w-2xl">
                {t("fieldsClosing")}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Eligibility — light blue tint ── */}
        <section className="bg-[#BBDEFB40] py-24 relative">
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden
          >
            <svg
              className="absolute -top-20 -end-20 opacity-[0.08] w-[480px]"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="130"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="80"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
            </svg>
            <svg
              className="absolute -bottom-16 -start-16 opacity-[0.06] w-[320px]"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="110"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start relative z-10">
            <div className="lg:sticky lg:top-32">
              <SectionHeading>{t("eligibilityTitle")}</SectionHeading>
              <FadeUp delay={0.12}>
                <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-4">
                  {t("eligibilityIntro")}
                </p>
              </FadeUp>
            </div>
            <EligibilityNumberedRows items={eligibilityItems} />
          </div>
        </section>

        {/* ── Prize Components ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>{t("componentsTitle")}</SectionHeading>
            <div className="mt-8 space-y-6">
              <FadeUp delay={0.05}>
                <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                  {t("componentsIntro")}
                </p>
              </FadeUp>
              <PrizeComponentRows items={prizeComponents} />
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
