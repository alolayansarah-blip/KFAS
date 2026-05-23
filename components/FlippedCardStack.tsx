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
  index,
}: (typeof CARDS)[number] & { delay: number; index: number }) {
  return (
    <motion.div
      /*
        ① Entrance — each card rises from below with a gentle stagger.
           Alternating slight x-offset (left / center / right) adds depth
           and prevents the flat "everything moves identically" feel.
      */
      initial={{ opacity: 0, y: 28, x: (index - 1) * -8 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.75, delay, ease: EASE }}
      /*
        ② Lift on hover — card floats up 6px with a deepening orange shadow.
           The shadow colour echoes the brand without being distracting.
      */
      whileHover={{
        y: -6,
        transition: { duration: 0.35, ease: EASE },
      }}
      /*
        ③ Tap feedback — subtle press-down for tactile feel on mobile/click.
      */
      whileTap={{ scale: 0.975, transition: { duration: 0.15 } }}
      className="group relative"
      style={{
        filter: "drop-shadow(0 0px 0px rgba(236,96,27,0))",
        transition: "filter 0.4s ease",
      }}
      /*
        The shadow is handled via CSS on the inner div (group-hover) so it
        transitions in sync with the orange fill sweep.
      */
    >
      <Link href={href} className="block h-full">
        <div
          className={`
            relative flex h-full flex-col justify-between overflow-hidden
            bg-[#BBDEFB25] p-6
            transition-shadow duration-500
            group-hover:shadow-[0_20px_48px_-8px_rgba(236,96,27,0.22)]
          `}
          style={{ aspectRatio: "3/2" }}
        >
          {/* Orange hover fill sweeps up */}
          <div className="absolute inset-0 origin-bottom scale-y-0 bg-[#EC601B] transition-transform duration-500 ease-out group-hover:scale-y-100" />

          {/* ── Content ── */}
          <div className="relative z-10 flex h-full flex-col justify-between">
            {/* Top — arrow slides in diagonally on hover */}
            <div className="flex justify-end">
              {/*
                ④ Diagonal arrow entrance — starts offset bottom-left,
                   slides to origin matching the ↗ arrow direction.
                   Much more intentional than a plain y-slide.
              */}
              <svg
                className="h-4 w-4 text-white opacity-0
                           translate-x-[-5px] translate-y-[5px]
                           transition-all duration-350 ease-out
                           group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
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
              {/*
                ⑤ Accent rule — widens on hover AND the origin is left-anchored,
                   so it feels like it's "growing outward" rather than stretching
                   from the center. Color flips from orange → white.
              */}
              <div
                className="mb-3 h-[2px] w-6 origin-left bg-[#EC601B]
                           transition-all duration-500
                           group-hover:w-10 group-hover:bg-white"
              />

              <h3 className="mb-0 font-poppins text-[15px] font-bold leading-snug tracking-tight text-[#1D2D44] transition-colors duration-300 group-hover:text-white sm:text-[16px]">
                {title}
              </h3>

              {/* CTA
                  ⑥ Letter-spacing expands slightly on hover — the same
                     "breathing out" technique used in the Hero eyebrow.
              */}
              <div className="mt-4">
                <span
                  className="font-poppins text-[9px] font-semibold uppercase
                             tracking-[0.28em] text-[#EC601B]
                             transition-all duration-400
                             group-hover:tracking-[0.38em] group-hover:text-white"
                >
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
            <Card key={card.href} {...card} index={i} delay={0.06 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
