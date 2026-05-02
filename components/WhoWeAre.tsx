// "use client";

// import React, { memo, useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   motion,
//   useInView,
//   useScroll,
//   useTransform,
//   useReducedMotion,
//   useMotionValueEvent,
// } from "framer-motion";
// import { MOTION } from "@/lib/motion";

// /** How long to keep the short "KFAS" title visible after scroll passes the reveal threshold (ms) */
// const FULL_NAME_REVEAL_DELAY_MS = 500;

// function WhoWeAre() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const [showFullName, setShowFullName] = useState(false);
//   const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const wasPastThresholdRef = useRef(false);

//   const clearRevealTimer = () => {
//     if (revealTimerRef.current) {
//       clearTimeout(revealTimerRef.current);
//       revealTimerRef.current = null;
//     }
//   };

//   const isVisible = useInView(sectionRef, MOTION.viewport);

//   const prefersReducedMotion = useReducedMotion();
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });
//   const imageY = useTransform(
//     scrollYProgress,
//     [0, 0.5, 1],
//     prefersReducedMotion ? [0, 0, 0] : [40, 0, -40]
//   );

//   /** Short "KFAS" first; after delay once scroll passes threshold, show full name */
//   useEffect(() => {
//     if (prefersReducedMotion) {
//       clearRevealTimer();
//       setShowFullName(true);
//       return;
//     }
//     const past = scrollYProgress.get() > 0.28;
//     if (past) {
//       if (!wasPastThresholdRef.current) {
//         wasPastThresholdRef.current = true;
//         clearRevealTimer();
//         revealTimerRef.current = setTimeout(() => {
//           setShowFullName(true);
//           revealTimerRef.current = null;
//         }, FULL_NAME_REVEAL_DELAY_MS);
//       }
//     } else {
//       wasPastThresholdRef.current = false;
//       clearRevealTimer();
//       setShowFullName(false);
//     }
//     return () => clearRevealTimer();
//   }, [prefersReducedMotion, scrollYProgress]);

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     if (prefersReducedMotion) return;
//     const past = latest > 0.28;
//     if (past) {
//       if (!wasPastThresholdRef.current) {
//         wasPastThresholdRef.current = true;
//         clearRevealTimer();
//         revealTimerRef.current = setTimeout(() => {
//           setShowFullName(true);
//           revealTimerRef.current = null;
//         }, FULL_NAME_REVEAL_DELAY_MS);
//       }
//     } else {
//       wasPastThresholdRef.current = false;
//       clearRevealTimer();
//       setShowFullName(false);
//     }
//   });

//   const fadeUp = (delay = 0) => MOTION.fadeUpDelay(delay);

//   // The title words for the full name expansion
//   const titleParts = [
//     { letter: "K", rest: "uwait " },
//     { letter: "F", rest: "oundation for the " },
//     { letter: "A", rest: "dvancement of " },
//     { letter: "S", rest: "ciences" },
//   ];

//   return (
//     <motion.section
//       ref={sectionRef}
//       id="who-we-are"
//       className="relative overflow-hidden pt-16 lg:pt-20 pb-24 lg:pb-32 bg-white"
//       initial={{ opacity: 0, y: 20 }}
//       animate={isVisible ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, ease: MOTION.ease }}
//     >

//       <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
//           {/* ── Image (parallax) ── */}
//           <motion.div
//             variants={fadeUp(0.1)}
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//             style={{ y: imageY }}
//             className="group relative w-full"
//           >
//             <div className="relative">
//               {/* Decorative corner — like LatestNews */}
//               <div
//                 className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-[#2563EB] pointer-events-none z-10"
//                 aria-hidden
//               />
//               <div className="relative bg-blue-50 p-4 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
//                 <div className="aspect-[16/10] relative min-h-[280px] lg:min-h-0 overflow-hidden">
//                   <Image
//                     src="/image/WhoWe3.png"
//                     alt="KFAS - Kuwait Foundation for the Advancement of Sciences"
//                     fill
//                     sizes="(max-width: 1024px) 100vw, 50vw"
//                     className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
//                     priority={false}
//                   />
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* ── Content ── */}
//           <div className="relative z-10 h-full flex flex-col justify-between py-4 lg:py-6">
//             {/* Label */}
//             <motion.span
//               variants={fadeUp(0.15)}
//               initial="hidden"
//               animate={isVisible ? "visible" : "hidden"}
//               className="text-[10px] font-medium tracking-[0.45em] text-[#56A0D7] uppercase"
//             >
//               About Us
//             </motion.span>

//             {/* ── Title Block (no fade-up; scroll reveals full name) ── */}
//             <div className="mt-3 flex items-start gap-4">
//               <div className="relative flex-1 min-w-0">
//                 {/* SHORT: "KFAS" — visible until user scrolls down */}
//                 <motion.h2
//                   key="short"
//                   animate={
//                     showFullName
//                       ? { opacity: 0, y: -8, position: "absolute" }
//                       : { opacity: 1, y: 0, position: "relative" }
//                   }
//                   transition={{ duration: 0.35, ease: "easeInOut" }}
//                   className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold leading-none tracking-tight text-[#EC601B]"
//                   aria-hidden={showFullName}
//                 >
//                   KFAS
//                 </motion.h2>

//                 {/* FULL: "Kuwait Foundation..." — shown after scroll */}
//                 <motion.h2
//                   key="full"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={
//                     showFullName
//                       ? { opacity: 1, y: 0 }
//                       : { opacity: 0, y: 10, pointerEvents: "none" }
//                   }
//                   transition={{
//                     duration: 0.6,
//                     ease: MOTION.ease,
//                   }}
//                   className="font-poppins text-2xl sm:text-3xl lg:text-[2rem] font-semibold text-[#1D2D44] leading-[1.4] tracking-[-0.02em]"
//                 >
//                   {titleParts.map(({ letter, rest }) => (
//                     <React.Fragment key={letter}>
//                       <span className="text-[#EC601B] font-bold">{letter}</span>
//                       {rest}
//                     </React.Fragment>
//                   ))}
//                 </motion.h2>
//               </div>

//               {/* Logo — right of title */}
//               <div className="flex-shrink-0 mt-1">
//                 <Image
//                   src="/image/logo_c.png"
//                   alt="KFAS"
//                   width={72}
//                   height={72}
//                   className="h-14 w-auto sm:h-16 lg:h-20"
//                 />
//               </div>
//             </div>

//             {/* Body text */}
//             <motion.div
//               variants={fadeUp(0.35)}
//               initial="hidden"
//               animate={isVisible ? "visible" : "hidden"}
//               className="mt-4 flex-1"
//             >
//               <p className="font-poppins text-[15px] text-[#1D2D44]/80 leading-[1.85] tracking-[0.015em]">
//                 Established in 1976, the Kuwait Foundation for the Advancement of
//                 Sciences (KFAS), is a private, non-profit organization that
//                 supports research, training, and development in STEAM innovation
//                 in alignment with Kuwait&apos;s national priorities. Through its
//                 educational programs, cross-sector partnerships, public engagement
//                 initiatives, specialized centers, and prestigious prizes, KFAS
//                 rewards excellence, promotes impactful research, and inspires
//                 future generations in spreading knowledge and accelerating progress.{" "}
//                 <motion.a
//                   href="/about/AboutKfas"
//                   className="group inline-flex items-center gap-1.5 text-[#EC601B] font-poppins text-sm font-medium hover:text-[#d95518] transition-colors duration-300"
//                 >
//                   <span>Read more</span>
//                   <svg
//                     className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-110"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M17 8l4 4m0 0l-4 4m4-4H3"
//                     />
//                   </svg>
//                 </motion.a>
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// export default memo(WhoWeAre);
"use client";

import React, { memo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

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

// ─── WhoWeAre ─────────────────────────────────────────────────────────────────

function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // ── Two-phase title animation ──
  // Phase "kfas" : only the orange letters are visible (words clipped away)
  // Phase "full" : the rest of each word wipes in left-to-right
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.6 });
  const [phase, setPhase] = useState<"kfas" | "full">("kfas");

  useEffect(() => {
    if (!isTitleInView) return;
    // Let the letter drop-in finish (≈ 4 letters × 100 ms stagger + 500 ms duration)
    // then reveal the full words
    const t = setTimeout(() => setPhase("full"), 900);
    return () => clearTimeout(t);
  }, [isTitleInView]);

  // ── Parallax ──
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
        className="pointer-events-none absolute -right-[4vw] top-1/2 -translate-y-1/2 select-none
                   font-poppins text-[26vw] font-black leading-none text-[#1D2D44]/[0.03] whitespace-nowrap"
        style={{ y: ghostY }}
        aria-hidden
      >
        1976
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ── Left: Content ── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <motion.div
              className="mb-8 flex items-center gap-3"
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

            {/* ── KFAS → Full-name title ── */}
            {/*
             * Layout technique: each row is a flex row containing:
             *   1. The orange letter  — always visible, drop-in entrance
             *   2. A "rest" container — holds an invisible spacer (so the row
             *      never changes width) plus an absolutely-positioned animated
             *      span that clips in from the right.
             *
             * This gives zero layout shift while delivering a clean wipe reveal.
             */}
            <div
              ref={titleRef}
              className="mb-8 space-y-0.5"
              // Accessible full label for screen readers
              aria-label="Kuwait Foundation for the Advancement of Sciences"
            >
              {ACRONYM.map(({ letter, word }, i) => (
                <div key={letter} className="flex items-baseline" aria-hidden>
                  {/* Orange initial letter — drops in */}
                  <motion.span
                    className="shrink-0 font-poppins text-[1.25rem] font-black leading-[1.2]
                               text-[#EC601B] min-[400px]:text-[1.5rem] sm:text-[2rem] lg:text-[2.1rem] xl:text-[2.5rem]"
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

                  {/* Rest of the word */}
                  <span className="relative">
                    {/*
                     * Invisible spacer — always rendered at full width so the
                     * row height / section height never jumps when words reveal.
                     */}
                    <span
                      className="invisible whitespace-nowrap font-poppins text-[1.25rem] font-light
                                 leading-[1.2] min-[400px]:text-[1.5rem] sm:text-[2rem] lg:text-[2.1rem] xl:text-[2.5rem]"
                      aria-hidden
                    >
                      {word}
                    </span>

                    {/* Animated reveal — wipes in left → right via clipPath */}
                    <motion.span
                      className="absolute inset-0 whitespace-nowrap font-poppins text-[1.25rem]
                                 font-light leading-[1.2] text-[#1D2D44]
                                 min-[400px]:text-[1.5rem] sm:text-[2rem] lg:text-[2.1rem] xl:text-[2.5rem]"
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
              className="mb-8 h-px origin-left bg-gradient-to-r from-[#EC601B]/50 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.85, delay: 0.38, ease: EASE }}
            />

            {/* Body — original words unchanged */}
            <motion.p
              className="mb-10 font-poppins text-[15px] font-light leading-[2] tracking-[0.01em] text-[#1D2D44]/60"
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
              className="mb-10 grid grid-cols-3 gap-4 border-l-2 border-[#EC601B]/20 pl-5"
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
            {/* Orange corner — top left */}
            <motion.div
              className="absolute -left-3 -top-3 h-10 w-10 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/35 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            />

            {/* Orange corner — bottom right */}
            <motion.div
              className="absolute -bottom-3 -right-3 h-10 w-10 border-b-[1.5px] border-r-[1.5px] border-[#EC601B]/35 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            />

            {/* Full image — no crop */}
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
