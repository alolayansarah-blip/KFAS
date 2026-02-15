"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";

function WhoWeAre() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "50px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="who-we-are"
      className="relative bg-gray-50 overflow-hidden py-20 lg:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column: Stacked Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] sm:h-[550px] lg:h-[600px]">
              {/* Main large image */}
              <div className="absolute top-0 left-0 w-[70%] h-[65%] rounded-2xl overflow-hidden shadow-xl z-10 group">
                <img
                  src="/image/Impactstory1.png"
                  alt="KFAS Team"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Second overlapping image */}
              <div className="absolute bottom-0 right-0 w-[65%] h-[55%] rounded-2xl overflow-hidden shadow-lg z-20 border-4 border-white group">
                <img
                  src="/image/banner3.webp"
                  alt="Scientific Research"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Third small image */}
              <div className="absolute bottom-[15%] left-[5%] w-[40%] h-[35%] rounded-2xl overflow-hidden shadow-lg z-30 border-4 border-white group">
                <img
                  src="/image/who4.png"
                  alt="Innovation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Modern decorative elements */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#7DC0F1]/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#EC601B]/20 rounded-full blur-3xl"></div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <div className="space-y-6">
            {/* About Us Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-block mb-2">
                <span className="text-sm font-semibold text-gray-500 capitalize tracking-widest">
                  About Us
                </span>
                <div className="h-0.5 w-16 bg-[#EC601B] mt-2"></div>
              </div>

              {/* Animated Title */}
              <div className="relative overflow-hidden min-h-[100px] mb-2">
                {/* KFAS shorthand */}
                {isVisible && (
                  <motion.h2
                    initial={{ opacity: 1 }}
                    animate={
                      isVisible ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute top-0 left-0 text-5xl lg:text-6xl font-bold text-orange-600 leading-tight tracking-wide flex items-center gap-4"
                  >
                    <span>KFAS</span>
                  </motion.h2>
                )}

                {/* Full name */}
                {isVisible && (
                  <>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 1 }}
                      className="-mt-1 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight tracking-tight flex items-start gap-4"
                    >
                      <span className="flex-1">
                        <SplitText
                          text="Kuwait Foundation for the"
                          className="block whitespace-nowrap"
                          highlightChars={[0, 7]}
                          highlightClassName="text-orange-600 font-bold"
                          delay={40}
                          duration={1}
                          ease="easeOut"
                          splitType="chars"
                          from={{ opacity: 0, y: 10 }}
                          to={{ opacity: 1, y: 0 }}
                          textAlign="left"
                        />
                        <SplitText
                          text="Advancement of Sciences"
                          className="block whitespace-nowrap"
                          highlightChars={[0, 15]}
                          highlightClassName="text-orange-600 font-bold"
                          delay={40}
                          duration={1}
                          ease="easeOut"
                          splitType="chars"
                          from={{ opacity: 0, y: 10 }}
                          to={{ opacity: 1, y: 0 }}
                          textAlign="left"
                        />
                      </span>
                      <img
                        src="/image/logo_c.png"
                        alt="KFAS logo"
                        className="h-16 lg:h-20 w-auto flex-shrink-0"
                      />
                    </motion.h2>
                    <div className="mt-3 h-px w-24 bg-gray-200" />
                  </>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-gray-600 leading-relaxed"
            >
              Established in 1976, the Kuwait Foundation for the Advancement of
              Sciences (KFAS), is a private, non-profit organization that
              supports research, training, and development in STEAM innovation
              in alignment with Kuwait's national priorities.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-gray-600 leading-relaxed"
            >
              Through its educational programs, cross-sector partnerships,
              public engagement initiatives, specialized centers, and
              prestigious prizes, KFAS rewards excellence, promotes impactful
              research, and inspires future generations in spreading knowledge
              and accelerating progress.
            </motion.p>

            {/* Learn More Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href="/AboutKfas"
                className="inline-flex items-center gap-2 text-[#EC601B] font-semibold hover:text-[#D54E0F] transition-colors duration-300 group"
              >
                <span>Read More About KFAS</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
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
        </div>
      </div>
    </motion.section>
  );
}

export default memo(WhoWeAre);
