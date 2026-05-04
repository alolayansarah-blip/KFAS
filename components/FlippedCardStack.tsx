"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    title: "Research Grants",
    href: "/research/grants",
    label: "Explore",
    image: "/image/Grants.jpg",
    description: "Funding scientific discovery and innovation across Kuwait.",
  },
  {
    title: "Learning & Development",
    href: "/Learning-and-Development",
    label: "Discover",
    image: "/image/OE.jpg",
    description: "Programs for researchers, professionals, youth and beyond.",
  },
  {
    title: "Our Publications",
    href: "/Science-and-Society/Publications",
    label: "Browse",
    image: "/image/back4.webp",
    description: "Insights, reports and journals advancing Kuwaiti science.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 };

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({
  title,
  href,
  label,
  image,
  description,
  delay,
}: (typeof CARDS)[number] & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="group relative overflow-hidden"
    >
      <Link href={href} className="block">
        {/* ── Full image ── */}
        <div className="relative aspect-[5/4]">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />

          {/* Orange gradient — always on, intensifies on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
            style={{
              background:
                "linear-gradient(to top, rgba(236,96,27,0.95) 0%, rgba(236,96,27,0.60) 45%, rgba(236,96,27,0.20) 100%)",
              opacity: 0.82,
            }}
          />

          {/* ── All content over image ── */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Title */}
            <h3 className="mb-2 font-poppins text-[18px] font-bold leading-snug tracking-tight text-white sm:text-[20px]">
              {title}
            </h3>

            {/* Description — slides up on hover */}
            <p className="mb-5 translate-y-2 font-poppins text-[13px] font-light leading-relaxed text-white/0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:text-white/80">
              {description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <div className="h-[1.5px] w-6 bg-white transition-all duration-500 group-hover:w-10" />
              <span className="font-poppins text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80 transition-colors duration-300 group-hover:text-white">
                {label}
              </span>
              <svg
                className="-translate-x-1 h-3 w-3 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
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
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FlippedCardStack() {
  return (
    <section className="relative w-full bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* 3 equal cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
          {CARDS.map((card, i) => (
            <Card key={card.href} {...card} delay={0.08 + i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
