"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 640px)");
    const update = () => setHoverCapable(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return hoverCapable;
}

const CARDS = [
  {
    title: "Research Grants",
    href: "/research/grants",
    label: "Explore",
    image: "/image/RandD.png",
  },
  {
    title: "Learning & Development",
    href: "/Learning-and-Development",
    label: "Discover",
    image: "/image/OES.png",
  },
  {
    title: "Our Publications",
    href: "https://www.aspdkw.com/",
    label: "Browse",
    image: "/image/Publication.webp",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 };

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function Card({
  title,
  href,
  label,
  image,
  delay,
  index,
  isLast,
}: (typeof CARDS)[number] & {
  delay: number;
  index: number;
  isLast: boolean;
}) {
  const hoverCapable = useHoverCapable();
  const isExternal = href.startsWith("http");
  const linkClass =
    "block h-full rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  const cardInner = (
        <div
          className="relative overflow-hidden bg-[#EC601B] transition-shadow duration-500 sm:aspect-[3/2] sm:group-hover:shadow-[0_24px_56px_-12px_rgba(236,96,27,0.35)]"
        >
          {/* Image — visible strip on mobile; hover reveal on desktop */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[34%] sm:inset-0 sm:w-full sm:opacity-0 sm:transition-[opacity_transform] sm:duration-700 sm:ease-[cubic-bezier(0.16_1_0.3_1)] sm:group-hover:opacity-[0.85]"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 640px) 40vw, 33vw"
              className="object-cover sm:scale-105 sm:transition-transform sm:duration-700 sm:ease-[cubic-bezier(0.16_1_0.3_1)] sm:group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#EC601B]/60 to-[#EC601B] sm:hidden" />
            <div
              className="absolute inset-0 bg-[#1D2D44]/0 transition-colors duration-700 ease-[cubic-bezier(0.16_1_0.3_1)] sm:bg-transparent sm:group-hover:bg-[#1D2D44]/50"
            />
          </div>

          {/* Mobile — compact horizontal row */}
          <div className="relative z-10 flex items-center gap-3 px-5 py-4 sm:hidden">
            <div className="min-w-0 flex-1">
              <div className="mb-2 h-[2px] w-8 bg-white/50" />
              <h3 className="font-poppins text-[15px] font-bold leading-snug tracking-tight text-white">
                {title}
              </h3>
              <span className="mt-1.5 block font-poppins text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85">
                {label}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-white/90" />
          </div>

          {/* Desktop — vertical card */}
          <div className="relative z-10 hidden h-full flex-col justify-between p-6 sm:flex">
            <div className="flex justify-end">
              <svg
                className="h-4 w-4 text-white opacity-0 translate-x-[-5px] translate-y-[5px] transition-all duration-350 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
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

            <div>
              <div
                className="mb-3 h-[2px] w-6 origin-left bg-white/25 transition-all duration-500 group-hover:w-12 group-hover:bg-white"
              />
              <h3 className="mb-0 font-poppins text-[16px] font-bold leading-snug tracking-tight text-white">
                {title}
              </h3>
              <div className="mt-4">
                <span
                  className="font-poppins text-[9px] font-semibold uppercase tracking-[0.28em] text-white/70 transition-all duration-400 group-hover:tracking-[0.36em] group-hover:text-white"
                >
                  {label}
                </span>
              </div>
            </div>
          </div>
        </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: (index - 1) * -10 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, delay, ease: EASE }}
      whileHover={
        hoverCapable
          ? { y: -8, transition: { duration: 0.35, ease: EASE } }
          : undefined
      }
      whileTap={hoverCapable ? { scale: 0.97 } : undefined}
      className={`group relative ${!isLast ? "border-b border-white/15 sm:border-b-0" : ""}`}
    >
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {cardInner}
        </a>
      ) : (
        <Link href={href} className={linkClass}>
          {cardInner}
        </Link>
      )}
    </motion.div>
  );
}

export default function FlippedCardStack() {
  return (
    <motion.section
      className="w-full bg-white pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-24"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="overflow-hidden sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible">
          {CARDS.map((card, i) => (
            <Card
              key={card.href}
              {...card}
              index={i}
              delay={0.08 + i * 0.12}
              isLast={i === CARDS.length - 1}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
