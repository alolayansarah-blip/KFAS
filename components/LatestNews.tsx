"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { sortedNews } from "@/src/data/news";

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

export default function LatestNews() {
  const t = useTranslations("LatestNews");
  const isArabic = useLocale() === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  const dateFormatter = new Intl.DateTimeFormat(
    isArabic ? "ar-u-nu-latn" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const preview = sortedNews.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      id="our-impact-stories"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.h2
              className="font-poppins text-2xl font-semibold leading-tight tracking-tight text-[#1D2D44] sm:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              {t("sectionTitle")}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <Link
              href="/news"
              className="group inline-flex shrink-0 items-center gap-3 self-start sm:self-auto"
            >
              <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
              <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                {t("allNewsLabel")}
              </span>
              <ArrowIcon className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510] rtl:translate-x-1 rtl:rotate-180" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {preview.map((item) => (
            <article key={item.id} className="group flex flex-col">
              <a href={item.link} className="flex h-full flex-col">
                <div className="relative mb-5 aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(item.titleKey)}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[#1D2D44]/0 transition-all duration-500 group-hover:bg-[#1D2D44]/10" />
                </div>

                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1D2D44]/35">
                  {dateFormatter.format(new Date(item.dateISO))}
                </p>

                <h3 className="mb-3 font-poppins text-[17px] font-normal leading-snug text-[#1D2D44] transition-colors duration-300 group-hover:text-[#EC601B] line-clamp-3">
                  {t(item.titleKey)}
                </h3>

                <p className="mb-6 font-poppins text-[14px] font-light leading-relaxed text-[#1D2D44]/55 line-clamp-3">
                  {t(item.descriptionKey)}
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <div className="h-[1.5px] w-5 bg-[#EC601B] transition-all duration-500 group-hover:w-8" />
                  <span className="text-[12px] font-medium tracking-[0.08em] text-[#EC601B]">
                    {t("readMoreLabel")}
                  </span>
                  <ArrowIcon className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 rtl:translate-x-1 rtl:rotate-180" />
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
