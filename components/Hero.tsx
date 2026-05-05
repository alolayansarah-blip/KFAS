"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

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
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-5%"]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    isPlaying
      ? videoRef.current.pause()
      : videoRef.current.play().catch(() => {});
  };

  const lines = titleEn ? splitLines(titleEn) : [];

  return (
    <section
      ref={sectionRef}
      className={`relative flex h-[min(100dvh,52rem)] min-h-[min(100dvh,36rem)] flex-col items-start justify-end overflow-hidden ${className}`}
    >
      {/* ── Video ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        {video ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={videoPoster}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "contrast(1.06) brightness(0.88) saturate(1.1)" }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-[#1D2D44]" />
        )}

        {/* Navy wash over video for legibility */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(29, 45, 68, 0.50)" }}
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
          {/* Eyebrow */}
          {subtitle && (
            <motion.p
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Large title — bigger on mobile now that nothing competes above it */}
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
                <motion.span
                  key={i}
                  className="block"
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.45 + i * 0.12,
                    ease: EASE,
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
          )}

          {/* Orange rule */}
          <motion.div
            className="mb-6 h-px bg-[#EC601B]"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 40, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
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

          {/* Description */}
          {description && (
            <motion.p
              className="max-w-[48ch] font-poppins text-[13.5px] font-light leading-[2] tracking-[0.01em] text-white/45 sm:text-[15px] lg:text-[14px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* ── Play / Pause — bottom right ── */}
      {video && (
        <motion.button
          type="button"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-8 right-8 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/20 backdrop-blur-sm transition-colors duration-300 hover:border-[#EC601B]/40 hover:bg-[#EC601B]/10 sm:bottom-10 sm:right-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.svg
                key="pause"
                className="h-3 w-3 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="play"
                className="ml-0.5 h-3 w-3 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <path d="M8 5v14l11-7z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      {/* ── Scroll indicator — centred bottom ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: "-50%" }}
        transition={{ duration: 0.8, delay: 1.7, ease: EASE }}
      >
        <motion.div
          className="h-10 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.35))",
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[8px] font-light uppercase tracking-[0.45em] text-white/20">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
