"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    title: "Research Grants",
    href: "/research/grants",
    label: "Explore",
  },
  {
    title: "Learning & Development",
    href: "/Learning-and-Development",
    label: "Discover",
  },
  {
    title: "Our Publications",
    href: "/Science-and-Society/Publications",
    label: "Browse",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 };

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({
  title,
  href,
  label,
  delay,
}: (typeof CARDS)[number] & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="group relative"
    >
      <Link href={href} className="block h-full">
        <div
          className="relative flex h-full flex-col justify-between overflow-hidden bg-[#BBDEFB25] p-6"
          style={{ aspectRatio: "3/2" }}
        >
          {/* Orange hover fill sweeps up */}
          <div className="absolute inset-0 origin-bottom scale-y-0 bg-[#EC601B] transition-transform duration-500 ease-out group-hover:scale-y-100" />

          {/* ── Content ── */}
          <div className="relative z-10 flex h-full flex-col justify-between">
            {/* Top — arrow appears on hover */}
            <div className="flex justify-end">
              <svg
                className="-translate-y-1 h-4 w-4 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </div>

            {/* Bottom */}
            <div>
              {/* Accent rule */}
              <div className="mb-3 h-[2px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10 group-hover:bg-white" />

              <h3 className="mb-0 font-poppins text-[15px] font-bold leading-snug tracking-tight text-[#1D2D44] transition-colors duration-300 group-hover:text-white sm:text-[16px]">
                {title}
              </h3>

              {/* CTA */}
              <div className="mt-4">
                <span className="font-poppins text-[9px] font-semibold uppercase tracking-[0.28em] text-[#EC601B] transition-colors duration-300 group-hover:text-white">
                  {label}
                </span>
              </div>
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
    <section className="w-full bg-white pt-10 pb-16 lg:pt-12 lg:pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
          {CARDS.map((card, i) => (
            <Card key={card.href} {...card} delay={0.06 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
