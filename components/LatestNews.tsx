"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
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
);

const news = [
  {
    image: "/image/news1.jpeg",
    title: "The ICTP SciFabLab Meets Kuwait",
    description:
      "ICTP and the Kuwait Foundation for the Advancement of Sciences (KFAS) have been working together to support scientific development across the Middle East and Northern Africa since 1981. Their collaboration has recently expanded to include outreach activities in Kuwait.",
    date: "January 10, 2026",
    link: "#",
  },
  {
    image: "/image/news2.jpeg",
    title:
      "KFAS signs a memorandum of understanding with the Mohammed Bin Rashid Space Centre.",
    description:
      "The Kuwait Foundation for the Advancement of Sciences (KFAS) announced a memorandum of understanding with the Mohammed Bin Rashid Space Centre (MBRSC), establishing a strategic framework for cooperation in space sciences and scientific research.",
    date: "December 5, 2024",
    link: "#",
  },
  {
    image: "/image/news3.jpeg",
    title: "Innovation Workshop Success",
    description:
      "Over 200 participants joined our recent workshop on fostering innovation and entrepreneurship in the scientific community.",
    date: "November 28, 2024",
    link: "#",
  },
];

const sortedNews = [...news].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function OurImpactStories() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="our-impact-stories"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Heading */}
            <motion.h2
              className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              Recent News
            </motion.h2>
          </div>

          {/* All News CTA */}
          <motion.a
            href="#"
            className="group inline-flex items-center gap-3 self-start sm:self-auto shrink-0"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
            <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
              All News
            </span>
            <ArrowIcon className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]" />
          </motion.a>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {sortedNews.map((item, index) => (
            <article key={index} className="group flex flex-col">
              <a href={item.link} className="flex h-full flex-col">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] mb-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[#1D2D44]/0 transition-all duration-500 group-hover:bg-[#1D2D44]/10" />
                </div>

                {/* Date */}
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1D2D44]/35">
                  {item.date}
                </p>

                {/* Title */}
                <h3 className="font-poppins text-[17px] font-normal text-[#1D2D44] leading-snug mb-3 line-clamp-3 transition-colors duration-300 group-hover:text-[#EC601B]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-poppins text-[14px] font-light text-[#1D2D44]/55 leading-relaxed line-clamp-3 mb-6">
                  {item.description}
                </p>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-3">
                  <div className="h-[1.5px] w-5 bg-[#EC601B] transition-all duration-500 group-hover:w-8" />
                  <span className="text-[12px] font-medium tracking-[0.08em] text-[#EC601B]">
                    Read More
                  </span>
                  <ArrowIcon className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0" />
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
