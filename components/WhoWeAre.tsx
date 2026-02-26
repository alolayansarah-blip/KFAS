"use client";

import React, { memo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MOTION } from "@/lib/motion";

function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showFullName, setShowFullName] = useState(false);

  const isVisible = useInView(sectionRef, MOTION.viewport);

  // Trigger full name when section is 50% in view
  const isMidVisible = useInView(sectionRef, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    if (isMidVisible) {
      const timer = setTimeout(() => setShowFullName(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isMidVisible]);

  const fadeUp = (delay = 0) => MOTION.fadeUpDelay(delay);

  // The title words for the full name expansion
  const titleParts = [
    { letter: "K", rest: "uwait " },
    { letter: "F", rest: "oundation for the " },
    { letter: "A", rest: "dvancement of " },
    { letter: "S", rest: "ciences" },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="who-we-are"
      className="relative overflow-hidden pt-16 lg:pt-20 pb-24 lg:pb-32 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: MOTION.ease }}
    >

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* ── Image ── */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="group relative w-full"
          >
            <div className="relative">
              {/* Decorative corner — like LatestNews */}
              <div
                className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-[#2563EB] pointer-events-none z-10"
                aria-hidden
              />
              <div className="relative bg-blue-50 p-4 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="aspect-[16/10] relative min-h-[280px] lg:min-h-0 overflow-hidden">
                  <Image
                    src="/image/WhoWe3.png"
                    alt="KFAS - Kuwait Foundation for the Advancement of Sciences"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Content ── */}
          <div className="relative z-10 h-full flex flex-col justify-between py-4 lg:py-6">
            {/* Label */}
            <motion.span
              variants={fadeUp(0.15)}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-[10px] font-medium tracking-[0.45em] text-[#56A0D7] uppercase"
            >
              About Us
            </motion.span>

            {/* ── Title Block ── */}
            <motion.div
              variants={fadeUp(0.25)}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="mt-3 flex items-start gap-4"
            >
              {/* KFAS acronym — always visible, fades out when full name shows */}
              <div className="relative flex-1 min-w-0">
                {/* SHORT: "KFAS" — shown first, hidden when expanded */}
                <motion.h2
                  key="short"
                  animate={
                    showFullName
                      ? { opacity: 0, y: -8, position: "absolute" }
                      : { opacity: 1, y: 0, position: "relative" }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold leading-none tracking-tight"
                  aria-hidden={showFullName}
                >
                  {["K", "F", "A", "S"].map((letter, i) => (
                    <motion.span
                      key={letter}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                      className="text-[#EC601B]"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.h2>

                {/* FULL: "Kuwait Foundation..." — shown after scroll */}
                <motion.h2
                  key="full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    showFullName
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10, pointerEvents: "none" }
                  }
                  transition={{
                    duration: 0.6,
                    ease: MOTION.ease,
                  }}
                  className="font-poppins text-2xl sm:text-3xl lg:text-[2rem] font-semibold text-[#1D2D44] leading-[1.4] tracking-[-0.02em]"
                >
                  {titleParts.map(({ letter, rest }) => (
                    <React.Fragment key={letter}>
                      <span className="text-[#EC601B] font-bold">{letter}</span>
                      {rest}
                    </React.Fragment>
                  ))}
                </motion.h2>
              </div>

              {/* Logo — right of title */}
              <div className="flex-shrink-0 mt-1">
                <Image
                  src="/image/logo_c.png"
                  alt="KFAS"
                  width={72}
                  height={72}
                  className="h-14 w-auto sm:h-16 lg:h-20"
                />
              </div>
            </motion.div>

            {/* Body text */}
            <motion.div
              variants={fadeUp(0.35)}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="mt-4 flex-1"
            >
              <p className="font-poppins text-[15px] text-[#1D2D44]/80 leading-[1.85] tracking-[0.015em]">
                Established in 1976, the Kuwait Foundation for the Advancement of
                Sciences (KFAS), is a private, non-profit organization that
                supports research, training, and development in STEAM innovation
                in alignment with Kuwait&apos;s national priorities. Through its
                educational programs, cross-sector partnerships, public engagement
                initiatives, specialized centers, and prestigious prizes, KFAS
                rewards excellence, promotes impactful research, and inspires
                future generations in spreading knowledge and accelerating progress.{" "}
                <motion.a
                  href="/AboutKfas"
                  className="group inline-flex items-center gap-1.5 text-[#EC601B] font-poppins text-sm font-medium hover:text-[#d95518] transition-colors duration-300"
                >
                  <span>Read more</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default memo(WhoWeAre);
