"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

interface HeroProps {
  titleEn?: string;
  titleAr?: string;
  subtitle?: string;
  description?: string;
  video?: string;
  videoPoster?: string;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function splitLines(text: string): string[] {
  return text.split(/\||\n/).filter((line) => line.trim());
}

// Render a line, coloring *word* (asterisks) or "Future" in brand orange.
function renderAccented(line: string) {
  return line.split(/(\*[^*]+\*|\bFuture\b)/g).map((segment, index) => {
    if (segment.length > 2 && segment.startsWith("*") && segment.endsWith("*")) {
      return (
        <span key={index} className="text-[#EC601B]">
          {segment.slice(1, -1)}
        </span>
      );
    }
    if (segment === "Future") {
      return (
        <span key={index} className="text-[#EC601B]">
          {segment}
        </span>
      );
    }
    return <span key={index}>{segment}</span>;
  });
}

export default function Hero({
  titleEn,
  titleAr,
  subtitle,
  description,
  video = "/videos/KFASHero.mp4",
  videoPoster = "/image/KFAS-hero-poster.jpg",
  className = "",
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const [isPlaying, setIsPlaying] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], ["0%", "-4%"]);

  const lines = titleEn ? splitLines(titleEn) : [];

  const togglePlay = () => {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) {
      node.play();
    } else {
      node.pause();
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative flex h-[min(100dvh,52rem)] flex-col justify-end overflow-hidden bg-[#1D2D44] ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {video ? (
          <video
            ref={videoRef}
            autoPlay={!reduce}
            loop
            muted
            playsInline
            preload="auto"
            poster={videoPoster}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-[#1D2D44]" />
        )}

        {/* Full-coverage, bottom-weighted scrim for text legibility */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#1D2D44]/90 via-[#1D2D44]/[0.45] to-[#1D2D44]/[0.15]" />
        {/* Faint top scrim so the navigation stays legible */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[#1D2D44]/[0.55] to-transparent" />
      </div>

      {/* Content — anchored to the lower portion */}
      <motion.div
        className={`relative z-20 w-full pb-[clamp(4.5rem,10vh,7rem)] pt-24 ${
          hydrated ? "" : "invisible"
        }`}
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-6 text-left sm:px-8 lg:px-12">
          {subtitle && (
            <motion.p
              className="mb-5 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              {subtitle}
            </motion.p>
          )}

          {lines.length > 0 && (
            <h1
              className="mb-7 font-poppins font-bold leading-[1.04] text-white"
              style={{
                fontSize: "clamp(2.25rem, 1rem + 4vw, 4.5rem)",
                textShadow: "0 2px 30px rgba(0,0,0,0.35)",
              }}
            >
              {lines.map((line, index) => (
                <motion.span
                  key={`${line}-${index}`}
                  className="block"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + index * 0.1,
                    ease: EASE,
                  }}
                >
                  {renderAccented(line)}
                </motion.span>
              ))}
            </h1>
          )}

          {titleAr && (
            <motion.p
              dir="rtl"
              className="mb-4 font-poppins text-lg font-light text-white/75 sm:text-xl lg:text-lg"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            >
              {titleAr}
            </motion.p>
          )}

          {description && (
            <motion.p
              className="max-w-[48ch] font-poppins text-[14px] font-light leading-[1.9] text-white/80 sm:text-[15px]"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Play / pause control — signature element */}
      {video && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="absolute bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/[0.06] text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC601B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D2D44] sm:right-8 lg:right-12"
        >
          {isPlaying ? (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-0.5 h-4 w-4"
              aria-hidden="true"
            >
              <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
            </svg>
          )}
        </button>
      )}
    </section>
  );
}