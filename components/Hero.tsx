"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  return text.split(/\||\n/).filter((line) => line.trim());
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], ["0%", "-4%"]);

  const lines = titleEn ? splitLines(titleEn) : [];

  return (
    <section
      ref={sectionRef}
      className={`relative flex h-[min(100dvh,52rem)] min-h-[min(100dvh,36rem)] flex-col items-start justify-end overflow-hidden bg-[#1D2D44] ${className}`}
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        {video ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={videoPoster}
            className="absolute inset-0 h-full w-full object-cover "
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-[#1D2D44]" />
        )}

        {/* Navy bottom depth for text legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-[#1D2D44]/65 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 w-full pb-20 sm:pb-24 lg:pb-28"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
          {subtitle && (
            <motion.p
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/65"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
            >
              {subtitle}
            </motion.p>
          )}

          {lines.length > 0 && (
            <h1
              className="mb-6 font-poppins font-bold leading-[1.04] text-white"
              style={{
                fontSize: "clamp(2.75rem, 1.25rem + 4vw, 5.5rem)",
                textShadow: "0 2px 28px rgba(0,0,0,0.28)",
              }}
              aria-label={lines.join(" ")}
            >
              {lines.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  className="block overflow-hidden pb-[0.15em]"
                >
                  <motion.span
                    className="block"
                    aria-hidden="true"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + index * 0.11,
                      ease: EASE,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          )}

          <motion.div
            className="mb-6 h-px bg-[#EC601B]"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 44, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.85, ease: EASE }}
          />

          {titleAr && (
            <motion.p
              dir="rtl"
              className="mb-4 font-poppins text-lg font-light text-white/70 sm:text-xl lg:text-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.95, ease: EASE }}
            >
              {titleAr}
            </motion.p>
          )}

          {description && (
            <motion.p
              className="max-w-[48ch] font-poppins text-[13.5px] font-light leading-[1.9] text-white/72 sm:text-[15px] lg:text-[14px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.05, ease: EASE }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-30 flex flex-col items-center gap-2"
        style={{ x: "-50%" }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 1.3, ease: EASE }}
      >
        <span className="text-[8px] font-light uppercase tracking-[0.35em] text-white/40">
          Scroll
        </span>

        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-white/55"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
