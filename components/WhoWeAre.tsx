"use client";

import React, { memo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const ACRONYM = [
  { letter: "K", word: "uwait" },
  { letter: "F", word: "oundation for the" },
  { letter: "A", word: "dvancement of" },
  { letter: "S", word: "ciences" },
];

const STATS = [
  { value: "1976", label: "Founded" },
  { value: "48+", label: "Years of Impact" },
  { value: "500+", label: "Research Grants" },
];

function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const isTitleInView = useInView(titleRef, { once: true, amount: 0.6 });
  const [phase, setPhase] = useState<"kfas" | "full">("kfas");

  useEffect(() => {
    if (!isTitleInView) return;
    const t = setTimeout(() => setPhase("full"), 900);
    return () => clearTimeout(t);
  }, [isTitleInView]);

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
              <div className="h-px w-7 bg-[#EC601B]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#EC601B]">
                Who We Are
              </span>
            </motion.div>

            {/* KFAS title */}
            <div
              ref={titleRef}
              className="mb-4 space-y-0.5"
              aria-label="Kuwait Foundation for the Advancement of Sciences"
            >
              {ACRONYM.map(({ letter, word }, i) => (
                <div key={letter} className="flex items-baseline" aria-hidden>
                  <motion.span
                    className="shrink-0 font-poppins text-[1.25rem] font-black leading-[1.2] text-[#EC601B] min-[400px]:text-[1.5rem] sm:text-[2rem] lg:text-[2.1rem] xl:text-[2.5rem]"
                    initial={{ opacity: 0, y: 22 }}
                    animate={
                      isTitleInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 22 }
                    }
                    transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                  >
                    {letter}
                  </motion.span>

                  <span className="relative">
                    <span
                      className="invisible whitespace-nowrap font-poppins text-[1.25rem] font-light leading-[1.2] min-[400px]:text-[1.5rem] sm:text-[2rem] lg:text-[2.1rem] xl:text-[2.5rem]"
                      aria-hidden
                    >
                      {word}
                    </span>

                    <motion.span
                      className="absolute inset-0 whitespace-nowrap font-poppins text-[1.25rem] font-light leading-[1.2] text-[#1D2D44] min-[400px]:text-[1.5rem] sm:text-[2rem] lg:text-[2.1rem] xl:text-[2.5rem]"
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={
                        phase === "full"
                          ? { clipPath: "inset(0 0% 0 0)" }
                          : { clipPath: "inset(0 100% 0 0)" }
                      }
                      transition={{
                        duration: 0.65,
                        delay: i * 0.12,
                        ease: EASE,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              className="mb-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/50 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.85, delay: 0.38, ease: EASE }}
            />

            {/* Body */}
            <motion.p
              className="mb-6 font-poppins text-[15px] font-light leading-relaxed tracking-[0.01em] text-[#1D2D44]/60"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            >
              Established in 1976, KFAS is a private, non-profit organization
              that supports research, training, and development in STEAM
              innovation in alignment with Kuwait&apos;s national priorities.
              Through educational programs, cross-sector partnerships, and
              prestigious prizes, KFAS rewards excellence and inspires future
              generations to spread knowledge and accelerate progress.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="mb-7 grid grid-cols-3 gap-4 border-l-2 border-[#EC601B]/20 pl-5"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.65, delay: 0.55, ease: EASE }}
            >
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <div className="font-poppins text-lg font-bold tabular-nums text-[#EC601B]">
                    {value}
                  </div>
                  <div className="mt-0.5 text-[10px] font-light uppercase tracking-[0.18em] text-[#1D2D44]/40">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

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
            <motion.div
              className="absolute -left-3 -top-3 h-10 w-10 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/35 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            />
            <motion.div
              className="absolute -bottom-3 -right-3 h-10 w-10 border-b-[1.5px] border-r-[1.5px] border-[#EC601B]/35 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            />

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