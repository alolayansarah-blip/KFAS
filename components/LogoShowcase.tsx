"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 };

const tiles = [
  {
    title: "The Scientific Center",
    description:
      "The Scientific Center of Kuwait (TSCK) is a leading national institution dedicated to promoting scientific knowledge and public scientific awareness.",
    href: "https://tsck.org.kw/",
    image: "/image/sc.jpg",
    logo: "/image/logo_sc.png",
  },
  {
    title: "Sabah Al-Ahmad Center",
    description:
      "A center dedicated to nurturing talent and creativity in young individuals under the Kuwait Foundation for the Advancement of Sciences.",
    href: "https://linktr.ee/sacgc_kw",
    image: "/image/sabahAlahmad.jpg",
    logo: "/image/logo6.png",
  },
  {
    title: "Advancement of Sciences",
    description:
      "An advanced research and development center focused on innovation, scientific excellence, and the dissemination of knowledge.",
    href: "https://www.aspdkw.com/",
    image: "/image/aspd.png",
    logo: "/image/logo4.png",
  },
  {
    title: "Dasman Diabetes Institute",
    description:
      "Developing research projects, educational programs, and awareness-raising initiatives that improve society and combat diabetes.",
    href: "https://www.dasmaninstitute.org/",
    image: "/image/DDI.jpg",
    logo: "/image/logo5.png",
  },
];

export default function LogoShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, VIEWPORT);

  /** Background: Scientific Center (sc.jpg) by default; follow hovered partner while interacting */
  const bgIndex = hoveredIndex ?? 0;
  const bgSrc = tiles[bgIndex].image;
  const isDefaultScientificCenter = hoveredIndex === null;
  /** First card matches default sc.jpg background when nothing is hovered */
  const activeCardIndex = hoveredIndex ?? 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#488FCC] py-20 lg:py-28"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <img
          key={bgSrc}
          src={bgSrc}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center animate-in fade-in duration-500"
        />
        {/* Blue wash — lighter on default so sc.jpg stays clear; stronger when hovering another tile */}
        <div
          className="absolute inset-0 bg-[#488FCC]/55 transition-opacity duration-500"
          style={{ opacity: isDefaultScientificCenter ? 0.18 : 0.42 }}
        />
        <div
          className="absolute inset-0 bg-[#488FCC] transition-opacity duration-500"
          style={{ opacity: isDefaultScientificCenter ? 0.12 : 0.38 }}
        />
        {/* Bottom veil for legibility over any photo */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1a2535]/75 via-[#1a2535]/15 to-transparent pointer-events-none"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <motion.p
          className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-white/40"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Our Partners
        </motion.p>
        <motion.h2
          className="mb-5 font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          Building the Future{" "}
          <span className="font-extralight italic text-white/55">Together</span>
        </motion.h2>
        <motion.div
          className="mb-16 h-px origin-left bg-gradient-to-r from-[#EC601B]/50 via-[#7DC0F1]/20 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        />

        {/* Logos row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiles.map((tile, index) => (
            <motion.a
              key={tile.title}
              href={tile.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.1,
                ease: EASE,
              }}
            >
              {/* Card */}
              <div
                className={`relative flex flex-col items-center justify-start px-4 py-6 md:px-6 md:py-10 border transition-all duration-500 min-h-[200px] md:min-h-[340px] ${
                  activeCardIndex === index
                    ? "border-[#EC601B]/60 bg-white/10 backdrop-blur-sm"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {/* Orange top bar on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-[#EC601B] transition-all duration-500 origin-left ${
                    activeCardIndex === index ? "scale-x-100" : "scale-x-0"
                  }`}
                />

                {/* Logo */}
                <div className="flex items-center justify-center h-16 md:h-28 w-full mb-4 md:mb-5">
                  <img
                    src={tile.logo}
                    alt={tile.title}
                    className="h-full w-auto max-w-[120px] md:max-w-[180px] object-contain transition-all duration-500"
                    style={{
                      filter: "brightness(0) invert(1)",
                      opacity: activeCardIndex === index ? 1 : 0.45,
                    }}
                  />
                </div>

                {/* Divider */}
                <div
                  className={`h-px w-8 bg-white/20 mb-4 transition-all duration-500 ${
                    activeCardIndex === index ? "w-12 bg-[#EC601B]/60" : ""
                  }`}
                />

                {/* Title — always visible */}
                <p
                  className={`text-center text-[13px] font-medium leading-snug transition-colors duration-300 mb-4 ${
                    activeCardIndex === index ? "text-white" : "text-white/50"
                  }`}
                >
                  {tile.title}
                </p>

                {/* Summary — fixed space, fades in without affecting height */}
                <div className="flex-1 flex flex-col items-center justify-end">
                  <p
                    className={`text-center text-[12px] font-light text-white/70 leading-relaxed mb-4 transition-all duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {tile.description}
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-[#EC601B] transition-all duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Visit
                    <svg
                      className="h-3 w-3"
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
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}