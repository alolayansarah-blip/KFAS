"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  video?: string;
  videoPoster?: string;
  className?: string;
}

function splitLines(text: string): string[] {
  return text.split(/\||\n/).filter((line) => line.trim());
}

// Render a line, coloring any *word* wrapped in asterisks in brand orange.
function renderAccented(line: string) {
  return line.split(/(\*[^*]+\*)/g).map((segment, index) => {
    if (
      segment.length > 2 &&
      segment.startsWith("*") &&
      segment.endsWith("*")
    ) {
      return (
        <span key={index} className="text-[#EC601B]">
          {segment.slice(1, -1)}
        </span>
      );
    }
    return <span key={index}>{segment}</span>;
  });
}

export default function Hero({
  title,
  subtitle,
  description,
  video = "/videos/kfaswebsitevid.mp4",
  videoPoster = "/image/KFAS-hero-poster.jpg",
  className = "",
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], ["0%", "-4%"]);

  const lines = title ? splitLines(title) : [];

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
        {/* Poster underlay — paints with the HTML, independent of the video */}
        {videoPoster && (
          <img
            src={videoPoster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
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

      {/* Entrance animation in pure CSS: runs at first paint, before any JS.
          Same timing/ease as the previous framer-motion config. */}
      <style>{`
        @keyframes kfasHeroRise {
          from { opacity: 0; transform: translateY(var(--rise-y, 16px)); }
          to { opacity: 1; transform: translateY(0); }
        }
        .kfas-hero-rise {
          animation: kfasHeroRise var(--rise-duration, 0.7s) cubic-bezier(0.22, 1, 0.36, 1) var(--rise-delay, 0s) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .kfas-hero-rise { animation: none; }
        }
      `}</style>

      {/* Content — anchored to the lower portion */}
      <motion.div
        className="relative z-20 w-full pb-[clamp(4.5rem,10vh,7rem)] pt-24"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-6 text-start sm:px-8 lg:px-12">
          {subtitle && (
            <p
              className="kfas-hero-rise mb-5 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70"
              style={
                {
                  "--rise-duration": "0.7s",
                  "--rise-delay": "0.1s",
                  "--rise-y": "12px",
                } as React.CSSProperties
              }
            >
              {subtitle}
            </p>
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
                <span
                  key={`${line}-${index}`}
                  className="kfas-hero-rise block"
                  style={
                    {
                      "--rise-duration": "0.9s",
                      "--rise-delay": `${0.2 + index * 0.1}s`,
                      "--rise-y": "20px",
                    } as React.CSSProperties
                  }
                >
                  {renderAccented(line)}
                </span>
              ))}
            </h1>
          )}

          {description && (
            <p
              className="kfas-hero-rise max-w-[48ch] font-poppins text-[14px] font-light leading-[1.9] text-white/80 sm:text-[15px]"
              style={
                {
                  "--rise-duration": "0.7s",
                  "--rise-delay": "0.55s",
                  "--rise-y": "10px",
                } as React.CSSProperties
              }
            >
              {description}
            </p>
          )}
        </div>
      </motion.div>

      {/* Play / pause control — signature element */}
      {video && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={
            isPlaying ? "Pause background video" : "Play background video"
          }
          className="absolute bottom-6 start-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/[0.06] text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC601B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D2D44] sm:start-8 lg:start-12"
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
