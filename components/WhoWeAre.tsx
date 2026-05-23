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

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const TITLE_LINES = [
  { text: "Kuwait Foundation", accent: false },
  { text: "for the Advancement of Sciences", accent: true },
];

const STATS = [
  { value: "1976", label: "Founded" },
  { value: "48+", label: "Years of Impact" },
  { value: "500+", label: "Research Grants" },
];

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
}: {
  value: string;
  label: string;
  delay: number;
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
      <div className="font-poppins text-lg font-bold tabular-nums text-[#EC601B]">
        <motion.span>{displayCount}</motion.span>
        {suffix}
      </div>
      <div className="mt-0.5 text-[10px] font-light uppercase tracking-[0.18em] text-[#1D2D44]/40">
        {label}
      </div>
    </motion.div>
  );
}

// ─── WhoWeAre ─────────────────────────────────────────────────────────────────

function WhoWeAre() {
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
      className="relative overflow-hidden bg-white py-12 lg:py-16"
    >
      {/* Ghost year watermark */}
      <motion.div
        className="pointer-events-none absolute -right-[4vw] top-1/2 -translate-y-1/2 select-none font-poppins text-[26vw] font-black leading-none text-[#1D2D44]/[0.03] whitespace-nowrap"
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
              initial={{ opacity: 0, x: -16 }}
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
              <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#EC601B]">
                Who We Are
              </span>
            </motion.div>

            {/* Title — curtain reveal (same technique as Hero) */}
            <div
              ref={titleRef}
              className="mb-4 flex items-start gap-5"
              aria-label="Kuwait Foundation for the Advancement of Sciences"
            >
              <div className="flex flex-col gap-0.5 flex-1">
                {TITLE_LINES.map(({ text, accent }, i) => (
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
                initial={{ opacity: 0, x: 10 }}
                animate={
                  isTitleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }
                }
                transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              >
                <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24 opacity-90">
                  <Image
                    src="/image/logo_c.png"
                    alt="KFAS logo"
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
              className="mb-6 font-poppins text-[15px] font-light leading-relaxed tracking-[0.01em] text-[#1D2D44]/60"
              initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VIEWPORT}
              transition={{ duration: 0.85, delay: 0.45, ease: EASE }}
            >
              Established in 1976, KFAS is a private, non-profit organization
              that supports research, training, and development in STEAM
              innovation in alignment with Kuwait&apos;s national priorities.
              Through educational programs, cross-sector partnerships, and
              prestigious prizes, KFAS rewards excellence and inspires future
              generations to spread knowledge and accelerate progress.
            </motion.p>

            {/* Stats
                ④ Each stat enters individually with stagger (not all at once),
                   and the number counts up from 0 using useMotionValue.
            */}
            <div className="mb-7 grid grid-cols-3 gap-4">
              {STATS.map(({ value, label }, i) => (
                <AnimatedStat
                  key={label}
                  value={value}
                  label={label}
                  delay={0.55 + i * 0.12}
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
                <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                  Read more
                </span>
                <svg
                  className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
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

          {/* ── Right: Image ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <div className="group relative overflow-hidden">
              <motion.div style={{ y: imageY }}>
                <Image
                  src="/image/WhoWe3.png"
                  alt="KFAS — Kuwait Foundation for the Advancement of Sciences"
                  width={1600}
                  height={1000}
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  priority={false}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(WhoWeAre);
