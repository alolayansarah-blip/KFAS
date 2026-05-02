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

// ─── Motion Variants ──────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

/** Clip-path wipe reveal per word */
const wordVariants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.75,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function splitWords(text: string): string[] {
  const bySpace = text.split(" ").filter(Boolean);
  if (bySpace.length > 1) return bySpace;

  const byCamel = text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(" ")
    .filter(Boolean);

  return byCamel.length > 1 ? byCamel : bySpace;
}

function splitLines(text: string): string[] {
  return text.split(/\||\n/).filter((l) => l.trim());
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    // FIX 3: Remove Tailwind's `-translate-x-1/2` to avoid CSS transform conflict
    // with Framer Motion's `y` animation. Use `left: "50%"` + `x: "-50%"` instead,
    // so both transforms are owned by Framer Motion and compose correctly.
    <motion.div
      className="absolute bottom-8 left-1/2 z-30 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 28, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{
        duration: 0.75,
        delay: 1.6,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
        Scroll
      </span>
      <div className="flex h-10 w-[22px] items-start justify-center rounded-full border border-white/20 p-[5px]">
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
      className="group absolute bottom-8 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-[#EC601B]/60 hover:bg-[#EC601B]/10 sm:bottom-12 sm:right-8 sm:h-16 sm:w-16 lg:right-12"
      aria-label={isPlaying ? "Pause video" : "Play video"}
      {...fadeUp(1.4)}
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

  // FIX 1: Start as `false` — let the `onPlay` event set it to `true`.
  // Previously `true` caused the button to show "Pause" even when autoplay
  // was blocked by the browser, resulting in an incorrect UI state.
  const [isPlaying, setIsPlaying] = useState(false);

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
      // FIX 2: `play()` returns a Promise that rejects when autoplay is blocked.
      // Without `.catch()`, this produces an unhandled promise rejection error.
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-[600px] h-[100svh] items-center overflow-hidden pt-24
        /* Mobile: centered */ justify-center text-center
        /* Desktop: left-aligned */ lg:justify-start lg:text-left
        ${className}`}
    >
      {/* ── Video background ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        {/* Soft directional wash */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(108deg, rgba(29,45,68,0.58) 0%, rgba(29,45,68,0.35) 42%, rgba(29,45,68,0.10) 70%, transparent 100%)",
          }}
        />
        {/* Gentle bottom grounding */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(29,45,68,0.45) 0%, transparent 45%)",
          }}
        />
        {/* Soft top fade */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(29,45,68,0.18) 0%, transparent 30%)",
          }}
        />

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
        className="relative z-20 mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          className="mx-auto w-full max-w-[1280px] lg:mx-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle / eyebrow */}
          {subtitle && (
            <motion.div
              className="mb-7 inline-flex items-center gap-3"
              {...fadeUp(0.2)}
            >
              <motion.div
                className="h-[1.5px] bg-gradient-to-r from-white/50 to-[#EC601B]"
                initial={{ width: 0 }}
                animate={{ width: 44 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/65">
                {subtitle}
              </span>
              <motion.div
                className="h-[1.5px] bg-gradient-to-l from-transparent to-[#EC601B]/60"
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.div>
          )}

          {/* English title — clip-path wipe per word */}
          {titleEn && (
            <>
              <h1
                className="font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl [text-shadow:_2px_2px_20px_rgba(0,0,0,0.6)]"
                aria-label={splitLines(titleEn)
                  .map((line) => splitWords(line.trim()).join(" "))
                  .join(" ")}
              >
                {splitLines(titleEn).map((line, li) => (
                  <span key={li} className="block" aria-hidden="true">
                    {splitWords(line.trim()).map((word, wi) => (
                      <motion.span
                        key={wi}
                        className="mr-[0.28em] inline-block overflow-hidden"
                        variants={wordVariants}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Orange rule */}
              <motion.div
                className="mb-6 mt-5 h-[3px] rounded-full bg-[#EC601B]"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 72, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.0,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.div
                  className="h-full w-full rounded-full bg-[#EC601B]"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 2.5,
                    delay: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}

          {/* Arabic title */}
          {titleAr && (
            <motion.h2
              dir="rtl"
              className="mb-6 text-2xl font-light tracking-wide text-white/85 sm:text-3xl lg:text-4xl"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.65)" }}
              {...fadeUp(0.85)}
            >
              {titleAr}
            </motion.h2>
          )}

          {/* Description */}
          {description && (
            <motion.div className="relative" {...fadeUp(1.05)}>
              {/* Left accent bar — desktop only */}
              <motion.div
                className="absolute -left-4 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-[#EC601B] to-[#EC601B]/10 hidden lg:block"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ originY: 0 }}
              />
              <p className="max-w-[1280px] text-base leading-[1.9] text-white/75 sm:text-lg lg:pl-2">
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
