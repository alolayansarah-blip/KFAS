"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "./SplitText";

// Types
interface Partner {
  image: string;
  logo: string;
  name: string;
  link: string;
  description: string;
}

// Constants
const PARTNERS: Partner[] = [
  {
    image: "/image/sc.jpg",
    logo: "/image/logo3.png",
    name: "The Scientific Center of Kuwait",
    link: "https://tsck.org.kw/",
    description:
      "The Scientific Center of Kuwait (TSCK), is a leading science and discovery destination. Through interactive exhibits, immersive experiences, and educational programs, TSCK inspires curiosity and promotes scientific learning.",
  },
  {
    image: "/image/sabahAlahmad2.png",
    logo: "/image/logo6.png",
    name: "Sabah al-ahmad Center for Giftedness and Creativity",
    link: "https://linktr.ee/sacgc_kw",
    description:
      "Sabah Al-Ahmad Center for Giftedness and Creativity (SACGC) is a center under the Kuwait Foundation for the Advancement of Sciences dedicated to nurturing talent and creativity in young individuals.",
  },
  {
    image: "/image/aspd.jpg",
    logo: "/image/logo4.png",
    name: "Advancement of Sciences Publishing and Distribution Co.",
    link: "https://www.aspdkw.com/",
    description:
      "Advanced research and development center focused on innovation and scientific excellence.",
  },
  {
    image: "/image/DDI.jpg",
    logo: "/image/logo5.png",
    name: "Dasman Diabetes Institute",
    link: "https://www.dasmaninstitute.org/",
    description:
      "At Dasman Diabetes Institute (DDI), they aim to benefit their community by developing research projects, educational programs, and awareness-raising initiatives that improve society.",
  },
];

const ACCENT_COLORS = {
  primary: "#7DC0F1",
  secondary: "#EC601B",
};

const ANIMATION_CONFIG = {
  splitText: {
    delay: 50,
    duration: 1.25,
    ease: "easeOut" as const,
    threshold: 0.2,
    rootMargin: "-100px",
  },
  cardHover: {
    y: -8,
    duration: 0.3,
    ease: "easeOut" as const,
  },
  backgroundTransition: {
    duration: 0.5,
  },
};

// Components
const BackgroundImage = ({ partner }: { partner: Partner }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: ANIMATION_CONFIG.backgroundTransition.duration }}
    className="absolute inset-0"
  >
    <img
      src={partner.image}
      alt=""
      className={`w-full h-full object-cover ${
        partner.image === "/image/sabahAlahmad2.png" ? "object-top" : "object-center"
      }`}
    />
    <div className="absolute inset-0 bg-[#1D2D44]/25" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#7DC0F1]/10 via-white/95 to-white" />
  </motion.div>
);

const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-left mb-16"
  >
    <div
      className="mb-4 leading-tight tracking-wide text-white"
      style={{
        textShadow: "0 6px 24px rgba(0, 0, 0, 0.45), 0 0 18px rgba(86, 160, 215, 0.6)",
      }}
    >
      <span className="block mb-2 text-sm font-semibold text-white/80 capitalize tracking-widest">
        Our centers
      </span>
      <div className="mb-4 h-0.5 w-12 bg-[#EC601B]" />
      <SplitText
        text="Build the Future"
        className="text-3xl lg:text-4xl xl:text-5xl font-bold"
        splitType="chars"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        textAlign="left"
        {...ANIMATION_CONFIG.splitText}
      />
      <SplitText
        text="Together"
        className="text-3xl lg:text-4xl xl:text-5xl font-light"
        splitType="chars"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        textAlign="left"
        {...ANIMATION_CONFIG.splitText}
      />
    </div>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="text-lg text-white/90"
    >
      Partnering with leading organizations to drive innovation and excellence
    </motion.p>
  </motion.div>
);

const PartnerCard = ({
  partner,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  partner: Partner;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) => {
  const accentColor = index % 2 === 0 ? ACCENT_COLORS.primary : ACCENT_COLORS.secondary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {/* Logo Card */}
      <motion.div
        whileHover={{ y: ANIMATION_CONFIG.cardHover.y }}
        transition={{
          duration: ANIMATION_CONFIG.cardHover.duration,
          ease: ANIMATION_CONFIG.cardHover.ease,
        }}
        className="relative h-48 rounded-2xl border-2 bg-transparent p-6 transition-all duration-300 cursor-pointer"
        style={{
          borderColor: isHovered ? accentColor : "#e5e7eb",
          boxShadow: isHovered ? `0 20px 60px -15px ${accentColor}50` : "none",
        }}
      >
        <div className="relative h-full flex items-center justify-center">
          <motion.img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="max-h-full max-w-full object-contain"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Hover Description */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="mt-3 text-center rounded-xl bg-white/90 backdrop-blur px-3 py-2 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed text-justify">
              {partner.description}{" "}
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#EC601B] hover:text-[#D54E0F] transition-colors group/readmore"
              >
                Read more
                <svg
                  className="h-3 w-3 transition-transform duration-200 group-hover/readmore:scale-90"
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
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Component
export default function LogoShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? 0;

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <BackgroundImage key={activeIndex} partner={PARTNERS[activeIndex]} />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeader />

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PARTNERS.map((partner, index) => (
            <PartnerCard
              key={partner.name}
              partner={partner}
              index={index}
              isHovered={hoveredIndex === index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}