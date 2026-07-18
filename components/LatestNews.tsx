"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

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

// `dateISO` drives sorting; the displayed date is formatted per-locale at
// render time so it shows Arabic month names without breaking the sort.
const news = [
  {
    image: "/image/news1.jpeg",
    titleKey: "news1Title",
    descriptionKey: "news1Description",
    dateISO: "2026-01-10",
    link: "#",
  },
  {
    image: "/image/news2.jpeg",
    titleKey: "news2Title",
    descriptionKey: "news2Description",
    dateISO: "2024-12-05",
    link: "#",
  },
  {
    image: "/image/news3.jpeg",
    titleKey: "news3Title",
    descriptionKey: "news3Description",
    dateISO: "2024-11-28",
    link: "#",
  },
] as const;

const sortedNews = [...news].sort(
  (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
);

export default function LatestNews() {
  const t = useTranslations("LatestNews");
  const isArabic = useLocale() === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  const dateFormatter = new Intl.DateTimeFormat(
    isArabic ? "ar-u-nu-latn" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

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
              {t("sectionTitle")}
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
              {t("allNewsLabel")}
            </span>
            <ArrowIcon className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:rotate-180 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]" />
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
                    alt={t(item.titleKey)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[#1D2D44]/0 transition-all duration-500 group-hover:bg-[#1D2D44]/10" />
                </div>

                {/* Date */}
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1D2D44]/35">
                  {dateFormatter.format(new Date(item.dateISO))}
                </p>

                {/* Title */}
                <h3 className="font-poppins text-[17px] font-normal text-[#1D2D44] leading-snug mb-3 line-clamp-3 transition-colors duration-300 group-hover:text-[#EC601B]">
                  {t(item.titleKey)}
                </h3>

                {/* Description */}
                <p className="font-poppins text-[14px] font-light text-[#1D2D44]/55 leading-relaxed line-clamp-3 mb-6">
                  {t(item.descriptionKey)}
                </p>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-3">
                  <div className="h-[1.5px] w-5 bg-[#EC601B] transition-all duration-500 group-hover:w-8" />
                  <span className="text-[12px] font-medium tracking-[0.08em] text-[#EC601B]">
                    {t("readMoreLabel")}
                  </span>
                  <ArrowIcon className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:rotate-180 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0" />
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
