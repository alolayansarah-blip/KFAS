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

import React, { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const TITLE_PARTS = [
  { letter: "K", rest: "uwait " },
  { letter: "F", rest: "oundation for the " },
  { letter: "A", rest: "dvancement of " },
  { letter: "S", rest: "ciences" },
];

// ─── Motion (aligned with Hero / FlippedCardStack) ───────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const lineDividerVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

// ─── WhoWeAre ─────────────────────────────────────────────────────────────────

function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Avoid running entrance motion on first paint / refresh; run after user scrolls
  useEffect(() => {
    const onScroll = () => setHasUserScrolled(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shouldAnimate =
    inView && (hasUserScrolled || Boolean(prefersReducedMotion));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Left: Content ── */}
          <motion.div
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUpVariants}
              className="mb-10 flex items-center gap-3"
            >
              <motion.div
                className="h-px bg-[#EC601B]"
                initial={{ width: 0 }}
                animate={shouldAnimate ? { width: 28 } : { width: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#EC601B]">
                Who We Are
              </span>
            </motion.div>

            {/* Title + logo side by side */}
            <motion.div
              variants={fadeUpVariants}
              className="mb-8 flex items-start justify-between gap-4"
            >
              <div className="relative min-w-0 flex-1">
                <h2 className="font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem]">
                  {TITLE_PARTS.map(({ letter, rest }) => (
                    <React.Fragment key={letter}>
                      <span className="font-bold text-[#EC601B]">{letter}</span>
                      {rest}
                    </React.Fragment>
                  ))}
                </h2>
              </div>

              <div className="shrink-0 pt-1">
                <Image
                  src="/image/logo_c.png"
                  alt="KFAS"
                  width={80}
                  height={80}
                  className="h-12 w-auto opacity-80 sm:h-14 lg:h-16"
                />
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={lineDividerVariants}
              className="mb-8 h-px origin-left bg-gradient-to-r from-[#EC601B]/50 via-[#7DC0F1]/25 to-transparent"
            />

            {/* Body */}
            <motion.p
              variants={fadeUpVariants}
              className="font-poppins text-[15px] font-light leading-[2] tracking-[0.01em] text-[#1D2D44]/60"
            >
              Established in 1976, KFAS is a private, non-profit organization
              that supports research, training, and development in STEAM
              innovation in alignment with Kuwait&apos;s national priorities.
              Through educational programs, cross-sector partnerships, and
              prestigious prizes, KFAS rewards excellence and inspires future
              generations to spread knowledge and accelerate progress.{" "}
              <a
                href="/about/AboutKfas"
                className="group inline-flex items-center gap-1 font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-2 transition-colors hover:text-[#d45510] hover:decoration-[#d45510]/50"
              >
                Read more
                <svg
                  className="h-3 w-3 translate-y-px transition-transform duration-300 group-hover:translate-x-0.5"
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
            </motion.p>
          </motion.div>

          {/* ── Right: Image with offset frame ── */}
          <motion.div
            className="relative"
            variants={fadeUpVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
          >
            {/* Offset frame border — top-right */}
            <motion.div
              className="absolute -right-3 -top-3 bottom-6 left-6 border border-[#EC601B]/25 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
            />

            {/* Image */}
            <div className="group relative overflow-hidden">
              <motion.div className="relative" style={{ y: imageY }}>
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
