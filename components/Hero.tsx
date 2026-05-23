"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroProps {
  titleEn?: string;
  titleAr?: string;
  subtitle?: string;
  description?: string;
  video?: string;
  videoPoster?: string;
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

function splitLines(text: string): string[] {
  return text.split(/\||\n/).filter((l) => l.trim());
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero({
  titleEn,
  titleAr,
  subtitle,
  description,
  video,
  videoPoster,
  className = "",
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-5%"]);

  const lines = titleEn ? splitLines(titleEn) : [];

  return (
    <section
      ref={sectionRef}
      className={`relative flex h-[min(100dvh,52rem)] min-h-[min(100dvh,36rem)] flex-col items-start justify-end overflow-hidden ${className}`}
    >
      {/* ── Video ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        {video ? (
          /*
            ① Ken Burns opening — video gently scales from 1.06 → 1 over ~3s.
               Creates a cinematic "settling into focus" feel on load.
          */
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={videoPoster}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                filter: "contrast(1.06) brightness(0.88) saturate(1.1)",
              }}
            >
              <source src={video} type="video/mp4" />
            </video>
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-[#1D2D44]" />
        )}

        {/* Navy wash over video for legibility */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(29, 45, 68, 0.50)" }}
        />

        {/*
          ② Ambient warm orb — a slow-drifting radial orange glow anchored
             to the lower-left. Breathes life into the still background without
             competing with the video or text.
        */}
        <motion.div
          className="absolute -bottom-32 -left-32 z-[12] pointer-events-none"
          style={{
            width: "700px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(236,96,27,0.13) 0%, transparent 68%)",
            filter: "blur(48px)",
          }}
          animate={{ x: [0, 45, 0], y: [0, -35, 0] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
          }}
        />
      </motion.div>

      {/* ── Content — pinned to bottom-left ── */}
      <motion.div
        className="relative z-20 w-full pb-20 sm:pb-24 lg:pb-28"
        style={{ opacity: contentOp, y: contentY }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
          {/* Eyebrow
              ③ Letter-spacing expands from tight → full tracking as it fades in.
                 Feels like the text is "breathing out" into place.
          */}
          {subtitle && (
            <motion.p
              className="mb-5 text-[10px] font-semibold uppercase text-white/40"
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Large title
              ④ Each line uses an overflow-hidden mask + y: "100%" → "0%" rise.
                 This is the classic editorial/magazine "curtain reveal" —
                 text climbs up into view from behind a hidden edge.
          */}
          {lines.length > 0 && (
            <h1
              className="mb-6 font-poppins font-bold leading-[1.04] tracking-[-0.02em] text-white"
              style={{
                fontSize: "clamp(2.75rem, 1.25rem + 4vw, 5.5rem)",
                textShadow: "0 2px 32px rgba(0,0,0,0.25)",
              }}
              aria-label={lines.join(" ")}
            >
              {lines.map((line, i) => (
                /*
                  The outer <span> is the clipping mask (overflow-hidden).
                  The inner <motion.span> rises from 100% below into 0%.
                */
                <span
                  key={i}
                  className="block overflow-hidden pb-[0.15em] -mb-[0.15em]"
                >
                  <motion.span
                    className="block"
                    aria-hidden="true"
                    initial={{ y: "108%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.4 + i * 0.13,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          )}

          {/* Orange rule
              ⑤ After the rule draws in, a warm glow blooms then settles —
                 like a struck match fading to ember.
          */}
          <motion.div
            className="mb-6 h-px bg-[#EC601B]"
            initial={{
              width: 0,
              opacity: 0,
              boxShadow: "0 0 0px rgba(236,96,27,0)",
            }}
            animate={{
              width: 40,
              opacity: 1,
              boxShadow: [
                "0 0 0px rgba(236,96,27,0)",
                "0 0 14px rgba(236,96,27,0.85)",
                "0 0 5px rgba(236,96,27,0.35)",
              ],
            }}
            transition={{
              width: { duration: 0.7, delay: 1.0, ease: EASE },
              opacity: { duration: 0.7, delay: 1.0, ease: EASE },
              boxShadow: { duration: 1.4, delay: 1.7, ease: "easeOut" },
            }}
          />

          {/* Arabic */}
          {titleAr && (
            <motion.p
              dir="rtl"
              className="mb-4 font-poppins text-lg font-light text-white/40 sm:text-xl lg:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
            >
              {titleAr}
            </motion.p>
          )}

          {/* Description
              ⑥ Fades in through a soft blur → sharp reveal.
                 Conveys the feeling of information coming into clarity.
          */}
          {description && (
            <motion.p
              className="max-w-[48ch] font-poppins text-[13.5px] font-light leading-[2] tracking-[0.01em] text-white/45 sm:text-[15px] lg:text-[14px]"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.0, delay: 1.15, ease: EASE }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* ── Scroll indicator — centred bottom
          ⑦ Replaced the plain line with a refined chevron that bounces gently.
             Minimal, universally understood, doesn't crowd the composition.
      ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-30 flex flex-col items-center gap-2"
        style={{ x: "-50%" }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.7, ease: EASE }}
      >
        <span className="text-[8px] font-light uppercase tracking-[0.45em] text-white/20">
          Scroll
        </span>
        {/* Bouncing chevron */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-white/30"
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
