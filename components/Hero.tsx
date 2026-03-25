// "use client";

// import {

//   motion,

//   useScroll,

//   useTransform,

//   useReducedMotion,

// } from "framer-motion";

// import { useRef, useState } from "react";

// interface HeroProps {

//   titleEn?: string;

//   titleAr?: string;

//   subtitle?: string;

//   description?: string;

//   video?: string;

//   videoPoster?: string;

//   className?: string;

// }

// export default function Hero({

//   titleEn,

//   titleAr,

//   subtitle,

//   description,

//   video,

//   videoPoster,

//   className = "",

// }: HeroProps) {

//   const sectionRef = useRef<HTMLElement>(null);

//   const videoRef = useRef<HTMLVideoElement>(null);

//   const [isPlaying, setIsPlaying] = useState(true);

//   const prefersReducedMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({

//     target: sectionRef,

//     offset: ["start start", "end start"],

//   });

//   const contentY = useTransform(

//     scrollYProgress,

//     [0, 0.5],

//     prefersReducedMotion ? [0, 0] : [0, 80]

//   );

//   const splitWords = (text: string | undefined) => {

//     if (!text) return [];

//     return text.split(" ");

//   };

//   const splitLines = (text: string | undefined) => {

//     if (!text) return [];

//     // Split by | separator or newline

//     return text.split(/\||\n/).filter((line) => line.trim());

//   };

//   const togglePlayPause = () => {

//     if (videoRef.current) {

//       if (isPlaying) {

//         videoRef.current.pause();

//         setIsPlaying(false);

//       } else {

//         videoRef.current.play();

//         setIsPlaying(true);

//       }

//     }

//   };

//   return (

//     <section

//       ref={sectionRef}

//       className={`relative h-[110vh] md:h-[95vh] flex items-center justify-start overflow-hidden ${className}`}

//     >

//       {/* Video Background */}

//       <div className="absolute inset-0 z-0">

//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10" />

//         <div className="absolute inset-0 bg-[#488FCC]/20 z-10" />

//         <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#488FCC]/30 blur-3xl z-10" />

//         {video && (

//           <video

//             ref={videoRef}

//             autoPlay

//             loop

//             muted

//             playsInline

//             poster={videoPoster}

//             className="absolute inset-0 w-full h-full object-cover"

//             onPlay={() => setIsPlaying(true)}

//             onPause={() => setIsPlaying(false)}

//           >

//             <source src={video} type="video/mp4" />

//           </video>

//         )}

//       </div>

//       {/* Pause/Play Button */}

//       {video && (

//         <button

//           onClick={togglePlayPause}

//           className="absolute right-6 sm:right-8 lg:right-12 bottom-12 z-30 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group"

//           aria-label={isPlaying ? "Pause video" : "Play video"}

//         >

//           {isPlaying ? (

//             <svg

//               className="w-6 h-6 sm:w-7 sm:h-7 text-white"

//               fill="currentColor"

//               viewBox="0 0 24 24"

//             >

//               <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />

//             </svg>

//           ) : (

//             <svg

//               className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1"

//               fill="currentColor"

//               viewBox="0 0 24 24"

//             >

//               <path d="M8 5v14l11-7z" />

//             </svg>

//           )}

//         </button>

//       )}

//       {/* Content */}

//       <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">

//         {" "}

//         {subtitle && (

//           <p className="text-sm tracking-[0.35em] uppercase text-white/90 mb-6 drop-shadow-lg">

//             {subtitle}

//           </p>

//         )}

//         {/* EN title – word by word */}

//         {titleEn && (

//           <h1 className="font-poppins text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.0] drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)]">

//             {splitLines(titleEn).map((line, lineIndex) => (

//               <span key={`line-${lineIndex}`} className="block">

//                 {splitWords(line.trim()).map((word, i) => (

//                   <motion.span

//                     key={`en-${lineIndex}-${i}`}

//                     className="block sm:inline-block sm:mr-3"

//                     initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}

//                     animate={{ opacity: 1, y: 0 }}

//                     transition={{

//                       duration: 0.6,

//                       delay: prefersReducedMotion

//                         ? 0

//                         : lineIndex * 0.5 + i * 0.08,

//                       ease: "easeOut",

//                     }}

//                   >

//                     {word}

//                   </motion.span>

//                 ))}

//               </span>

//             ))}

//           </h1>

//         )}

//         {/* AR title – word by word */}

//         {titleAr && (

//           <h2

//             dir="rtl"

//             className="mt-4 text-white/95 text-3xl sm:text-4xl md:text-5xl font-light tracking-wide drop-shadow-2xl [text-shadow:_2px_2px_8px_rgba(0,0,0,0.8)]"

//           >

//             {splitWords(titleAr).map((word, i) => (

//               <motion.span

//                 key={`ar-${i}`}

//                 className="inline-block ml-2"

//                 initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}

//                 animate={{ opacity: 1, y: 0 }}

//                 transition={{

//                   duration: 0.6,

//                   delay: prefersReducedMotion ? 0 : i * 0.08,

//                   ease: "easeOut",

//                 }}

//               >

//                 {word}

//               </motion.span>

//             ))}

//           </h2>

//         )}

//         {description && (

//           <motion.p

//             initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}

//             animate={{ opacity: 1, y: 0 }}

//             transition={{ duration: 0.8, delay: 0.4 }}

//             className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl"

//           >

//             {description}

//           </motion.p>

//         )}

//       </div>

//     </section>

//   );

// }

"use client";

import { useRef, useState, useEffect } from "react";
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

// ─── Motion Variants ──────────────────────────────────────────────────────────

/** Staggered container — children animate in sequence */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

/** Staggered fade-in per word (English title) */
const wordVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

/** Generic fade-up for smaller elements */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function splitWords(text: string) {
  return text.split(" ").filter(Boolean);
}

function splitLines(text: string) {
  return text.split(/\||\n/).filter((l) => l.trim());
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      {...fadeUp(1.4)}
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/50">
        Scroll
      </span>
      {/* Mouse outline */}
      <div className="flex h-10 w-[22px] items-start justify-center rounded-full border border-white/25 p-[5px]">
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-[#EC601B]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

// ─── Play / Pause Button ──────────────────────────────────────────────────────

function PlayPauseButton({
  isPlaying,
  onClick,
}: {
  isPlaying: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group absolute bottom-8 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-[#EC601B]/50 hover:bg-[#EC601B]/10 sm:bottom-12 sm:right-8 sm:h-16 sm:w-16 lg:right-12"
      aria-label={isPlaying ? "Pause video" : "Play video"}
      {...fadeUp(1.2)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPlaying ? (
          <motion.svg
            key="pause"
            className="h-5 w-5 text-white sm:h-6 sm:w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="play"
            className="ml-0.5 h-5 w-5 text-white sm:h-6 sm:w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            <path d="M8 5v14l11-7z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
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
  const [isPlaying, setIsPlaying] = useState(true);

  // Parallax: video drifts up as user scrolls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-8%"]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-[600px] h-[100vh] items-center justify-start overflow-hidden pt-24 ${className}`}
    >
      {/* ── Video background ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        {/* Layered overlays for depth */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(108deg, rgba(29,45,68,0.82) 0%, rgba(29,45,68,0.52) 38%, rgba(29,45,68,0.22) 65%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#1D2D44]/40 via-transparent to-[#1D2D44]/65" />

        {/* Ambient brand glow — top right */}
        <div className="pointer-events-none absolute -top-32 -right-32 z-10 h-[500px] w-[500px] rounded-full bg-[#56A0D7]/12 blur-[96px]" />
        {/* Ambient accent glow — bottom left */}
        <div className="pointer-events-none absolute -bottom-24 -left-24 z-10 h-80 w-80 rounded-full bg-[#EC601B]/08 blur-[80px]" />

        {video && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={videoPoster}
            className="absolute inset-0 h-full w-full scale-110 object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-20 mx-auto w-full max-w-7xl px-6 text-left sm:px-8 lg:px-12"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle / eyebrow */}
          {subtitle && (
            <motion.div
              className="mb-8 inline-flex items-center gap-3"
              {...fadeUp(0.2)}
            >
              {/* Animated dash */}
              <motion.div
                className="h-[1.5px] bg-gradient-to-r from-[#56A0D7] to-[#EC601B]"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* English title — staggered fade-in per word */}
          {titleEn && (
            <>
              <h1 className="font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl [text-shadow:_2px_2px_16px_rgba(0,0,0,0.55)]">
                {splitLines(titleEn).map((line, li) => (
                  <span key={li} className="block">
                    {splitWords(line.trim()).map((word, wi) => (
                      <motion.span
                        key={wi}
                        className="mr-[0.28em] inline-block"
                        variants={wordVariants}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Orange rule — draws in from left */}
              <motion.div
                className="mb-6 mt-6 h-[3px] rounded-full bg-[#EC601B]"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 80, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </>
          )}

          {/* Arabic title */}
          {titleAr && (
            <motion.h2
              dir="rtl"
              className="mb-6 text-2xl font-light tracking-wide text-white/90 sm:text-3xl lg:text-4xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.65)" }}
              {...fadeUp(0.8)}
            >
              {titleAr}
            </motion.h2>
          )}

          {/* Description */}
          {description && (
            <motion.div className="relative" {...fadeUp(1.0)}>
              {/* Left accent bar */}
              <motion.div
                className="absolute -left-4 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-[#56A0D7] to-[#EC601B]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ originY: 0 }}
              />
              <p className="max-w-xl pl-2 text-base leading-[1.85] text-white/80 sm:text-lg">
                {description}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* ── Play / Pause ── */}
      {video && (
        <PlayPauseButton isPlaying={isPlaying} onClick={togglePlayPause} />
      )}

      {/* ── Scroll hint ── */}
      <ScrollIndicator />
    </section>
  );
}
