"use client";

import React, { memo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

type Stat = { value: string; label: string };

// ─── Animated counter stat ────────────────────────────────────────────────────

/*
  ① Stat counter — each number counts up from 0 when scrolled into view.
     The speed is proportional to the value so they feel organic, not mechanical.
     Suffix ("+") is appended statically after the motion span.
*/
function AnimatedStat({
  value,
  label,
  delay,
  isArabic = false,
}: {
  value: string;
  label: string;
  delay: number;
  isArabic?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Split "500+" → numericVal=500, suffix="+"
  const numMatch = value.match(/^(\d+)(.*)$/);
  const numericVal = numMatch ? parseInt(numMatch[1], 10) : 0;
  const suffix = numMatch ? numMatch[2] : "";

  const count = useMotionValue(0);
  const displayCount = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, numericVal, {
      duration: numericVal > 200 ? 2.0 : 1.3,
      ease: "easeOut",
      delay,
    });
    return controls.stop;
  }, [isInView, count, numericVal, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <div
        className={`font-poppins font-bold tabular-nums text-[#EC601B] ${
          isArabic ? "text-xl" : "text-lg"
        }`}
      >
        <motion.span>{displayCount}</motion.span>
        {suffix}
      </div>
      <div
        className={`mt-0.5 font-light text-[#1D2D44]/40 ${
          isArabic
            ? "text-[13px] tracking-normal"
            : "text-[10px] uppercase tracking-[0.18em]"
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ─── WhoWeAre ─────────────────────────────────────────────────────────────────

function WhoWeAre() {
  const t = useTranslations("WhoWeAre");
  const isArabic = useLocale() === "ar";
  const stats = t.raw("stats") as Stat[];
  const titleLines = [
    { text: t("titleLine1"), accent: true },
    { text: t("titleLine2"), accent: true },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const isTitleInView = useInView(titleRef, { once: true, amount: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["2%", "-5%"]);

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      {/* Ghost year watermark */}
      <motion.div
        className="pointer-events-none absolute -end-[4vw] top-1/2 -translate-y-1/2 select-none font-poppins text-[26vw] font-black leading-none text-[#1D2D44]/[0.03] whitespace-nowrap"
        style={{ y: ghostY }}
        aria-hidden
      >
        1976
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── Left: Content ── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <motion.div
              className="mb-5 flex items-center gap-3"
              initial={{ opacity: 0, x: isArabic ? 16 : -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/*
                ② Eyebrow rule draws in — width animates 0 → 28px,
                   feeling like a brushstroke appearing before the label.
              */}
              <motion.div
                className="h-px bg-[#EC601B]"
                initial={{ width: 0 }}
                whileInView={{ width: 28 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
              />
              <span
                className={`font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[14px] tracking-normal"
                    : "text-[10px] uppercase tracking-[0.45em]"
                }`}
              >
                {t("eyebrow")}
              </span>
            </motion.div>

            {/* Title — curtain reveal (same technique as Hero) */}
            <div
              ref={titleRef}
              className="mb-4 flex items-start gap-5"
              aria-label={t("titleAriaLabel")}
            >
              <div className="flex flex-col gap-0.5 flex-1">
                {titleLines.map(({ text, accent }, i) => (
                  <div
                    key={text}
                    className="overflow-hidden pb-[0.1em] -mb-[0.1em]"
                  >
                    <motion.span
                      className={[
                        "block font-poppins text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl",
                        accent ? "text-[#EC601B]" : "text-[#1D2D44]",
                      ].join(" ")}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={
                        isTitleInView
                          ? { y: "0%", opacity: 1 }
                          : { y: "110%", opacity: 0 }
                      }
                      transition={{
                        duration: 0.7,
                        delay: 0.08 + i * 0.14,
                        ease: EASE,
                      }}
                    >
                      {text}
                    </motion.span>
                  </div>
                ))}
              </div>

              {/* Logo */}
              <motion.div
                className="flex items-center gap-4 pt-1 self-stretch"
                initial={{ opacity: 0, x: isArabic ? -10 : 10 }}
                animate={
                  isTitleInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: isArabic ? -10 : 10 }
                }
                transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              >
                <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24 opacity-90">
                  <Image
                    src="/image/logo_c.png"
                    alt={t("logoAlt")}
                    fill
                    sizes="96px"
                    className="object-contain drop-shadow-sm"
                  />
                </div>
              </motion.div>
            </div>

            {/* Body
                ③ Blur-to-clear reveal — same technique as Hero description.
                   Information "comes into focus" as you read down the page.
            */}
            <motion.p
              className={`mb-6 font-poppins font-light leading-relaxed text-[#1D2D44]/60 ${
                isArabic
                  ? "text-[17px] tracking-normal leading-[1.9]"
                  : "text-[15px] tracking-[0.01em]"
              }`}
              initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VIEWPORT}
              transition={{ duration: 0.85, delay: 0.45, ease: EASE }}
            >
              {t("body")}
            </motion.p>

            {/* Stats
                ④ Each stat enters individually with stagger (not all at once),
                   and the number counts up from 0 using useMotionValue.
            */}
            <div className="mb-7 grid grid-cols-3 gap-4">
              {stats.map(({ value, label }, i) => (
                <AnimatedStat
                  key={label}
                  value={value}
                  label={label}
                  delay={0.55 + i * 0.12}
                  isArabic={isArabic}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
            >
              <a
                href="/about/AboutKfas"
                className="group inline-flex items-center gap-3"
              >
                <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
                <span
                  className={`font-medium text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510] ${
                    isArabic
                      ? "text-[15px] tracking-normal"
                      : "text-[13px] tracking-[0.08em]"
                  }`}
                >
                  {t("readMore")}
                </span>
                <svg
                  className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:-scale-x-100 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* ── Right: Image ──
              Lighter, editorial treatment: a soft navy veil that lifts on
              hover so the photo sits gently on the white section instead of
              reading as a solid block, plus orange/blue corner accents that
              tie it to the rest of the site. quality={65} keeps the bytes down.
          */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <div className="group relative">
              {/* Image + veil — full photo, no crop */}
              <div className="relative overflow-hidden">
                <motion.div className="relative" style={{ y: imageY }}>
                  <Image
                    src="/image/GroupPage.webp"
                    alt={t("imageAlt")}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    quality={65}
                    className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    priority={false}
                  />
                </motion.div>

                {/* Flat wash — softens the photo, clears on hover */}
                <div className="pointer-events-none absolute inset-0 bg-[#1D2D44]/15 transition-colors duration-500 group-hover:bg-[#1D2D44]/[0.04]" />
                {/* Bottom gradient — grounds the image and adds depth */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1D2D44]/30 via-transparent to-transparent" />
              </div>

              {/* Corner accents — same editorial vocabulary as the rest of the site */}
              <div className="pointer-events-none absolute -start-2.5 -top-2.5 h-9 w-9 border-s-[1.5px] border-t-[1.5px] border-[#EC601B]/45" />
              <div className="pointer-events-none absolute -bottom-2.5 -end-2.5 h-9 w-9 border-b-[1.5px] border-e-[1.5px] border-[#7DC0F1]/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(WhoWeAre);
