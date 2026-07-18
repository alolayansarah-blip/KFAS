"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Link } from "@/src/i18n/navigation";
import { LAUREATES, type Laureate, type PrizeKey } from "@/src/data/laureates";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Brand palette                                                      */
/*  Three prize colours — one per programme, used on the map + medals  */
/* ------------------------------------------------------------------ */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const RISE = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const ORANGE = "#EC601B";

/* per-prize accent — Kuwait orange, Jaber blue, Al-Sumait navy */
const PRIZE_COLOR: Record<PrizeKey, string> = {
  kuwait: "#EC601B",
  jaber: "#56A0D7",
  sumait: "#1D2D44",
};
const accentOf = (p: PrizeKey) => PRIZE_COLOR[p];

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const ALL_YEARS = [...new Set(LAUREATES.map((l) => l.year))].sort(
  (a, b) => b - a,
);
const LATEST_YEAR = ALL_YEARS[0];
const FIRST_YEAR = ALL_YEARS[ALL_YEARS.length - 1];

const PRIZES: {
  key: PrizeKey;
  name: string;
  tab: string;
  line: string;
  image: string;
  href: string;
}[] = [
  {
    key: "kuwait",
    name: "Kuwait Prize",
    tab: "Kuwait Prize",
    line: "For distinguished Arab researchers, awarded annually since 1979.",
    image: "/image/KuwaitPrize.webp",
    href: "/prizes/KuwaitPrize",
  },
  {
    key: "jaber",
    name: "Jaber Al-Ahmad Award",
    tab: "Jaber Al-Ahmad",
    line: "For outstanding young Kuwaiti researchers.",
    image: "/image/jaberPrize.webp",
    href: "/prizes/Jaber-AlAhmadPrize",
  },
  {
    key: "sumait",
    name: "Al-Sumait Prize",
    tab: "Al-Sumait",
    line: "For African development in health, food security, and education.",
    image: "/image/alsumaitPrize.webp",
    href: "/prizes/AlSumaitPrize",
  },
];
const PRIZE_LABEL: Record<PrizeKey, string> = {
  kuwait: "Kuwait Prize",
  jaber: "Jaber Al-Ahmad",
  sumait: "Al-Sumait",
};

/* ---- PLACEHOLDER COPY (replace with your words when ready) -------- */
const BIO_PLACEHOLDER =
  "Biography to follow — details for this laureate are being added.";

/* ------------------------------------------------------------------ */
/*  Country normalisation + coordinates  [lng, lat]                    */
/* ------------------------------------------------------------------ */
const COUNTRY_FIX: Record<string, string> = {
  Nairobi: "Kenya",
  "Abidjan, Côte d’Ivoire": "Côte d’Ivoire",
};
const countryOf = (l: Laureate) =>
  l.country ? (COUNTRY_FIX[l.country] ?? l.country) : "";

const COORDS: Record<string, [number, number]> = {
  Kuwait: [47.9, 29.3],
  Egypt: [30.8, 26.8],
  Lebanon: [35.8, 33.9],
  Syria: [38.0, 35.0],
  Jordan: [36.2, 31.2],
  Tunisia: [9.5, 34.0],
  Palestine: [35.2, 31.9],
  Iraq: [43.7, 33.2],
  Morocco: [-6.8, 31.8],
  Algeria: [2.6, 28.0],
  "Saudi Arabia": [45.0, 23.9],
  Yemen: [48.5, 15.5],
  Sudan: [30.2, 15.5],
  Turkey: [35.2, 38.9],
  Uganda: [32.3, 1.4],
  Kenya: [37.9, 0.2],
  "South Africa": [24.0, -29.0],
  Nigeria: [8.7, 9.1],
  Tanzania: [34.9, -6.4],
  Cameroon: [12.4, 7.4],
  Ghana: [-1.0, 7.9],
  "Burkina Faso": [-1.6, 12.2],
  "Côte d’Ivoire": [-5.5, 7.5],
  UK: [-1.5, 52.4],
  USA: [-98.5, 39.8],
  Peru: [-75.0, -9.2],
};

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */
function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 26,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({
  kicker,
  title,
  intro,
  color = ORANGE,
}: {
  kicker: string;
  title: string;
  intro?: string;
  color?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <div ref={ref} className="lg:sticky lg:top-28">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <span
          className="h-0.5 w-12 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D2D44]/70">
          {kicker}
        </span>
      </motion.div>
      <motion.h2
        className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#1D2D44] sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
      >
        {title}
      </motion.h2>
      {intro ? (
        <motion.p
          className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#1D2D44]/70"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
        >
          {intro}
        </motion.p>
      ) : null}
    </div>
  );
}

/* centered section heading (used by map) */
function CenterHead({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <div ref={ref} className="mx-auto max-w-2xl text-center">
      <motion.div
        className="flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <span
          className="h-0.5 w-12 rounded-full"
          style={{ backgroundColor: ORANGE }}
        />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D2D44]/70">
          {kicker}
        </span>
      </motion.div>
      <motion.h2
        className="mt-4 text-3xl font-semibold tracking-tight text-[#1D2D44] sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
      >
        {title}
      </motion.h2>
      {intro ? (
        <motion.p
          className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#1D2D44]/70"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
        >
          {intro}
        </motion.p>
      ) : null}
    </div>
  );
}

function Portrait({
  src,
  name,
  accent,
}: {
  src?: string;
  name: string;
  accent: string;
}) {
  if (src) {
    return (
      <motion.div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#1D2D44]/[0.04]"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <Image
          src={src}
          alt={name}
          fill
          sizes="(min-width:1024px) 28vw, 45vw"
          loading="lazy"
          className="object-cover"
        />
      </motion.div>
    );
  }
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
      style={{
        backgroundColor: "rgba(29,45,68,0.03)",
        backgroundImage:
          "radial-gradient(rgba(29,45,68,0.10) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      <span
        className="absolute left-0 top-0 h-7 w-7"
        style={{
          backgroundColor: accent,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1D2D44"
          strokeOpacity="0.28"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </div>
    </div>
  );
}

function FieldTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#7DC0F1]/[0.18] px-3 py-1 text-xs font-medium text-[#1D2D44]">
      {children}
    </span>
  );
}

/* small coloured prize label */
function PrizeTag({ prize }: { prize: PrizeKey }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: accentOf(prize) }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: accentOf(prize) }}
      />
      {PRIZE_LABEL[prize]}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Medal — circular prize artwork with a coloured ring                */
/* ------------------------------------------------------------------ */
function Medal({
  src,
  alt,
  color,
  size = 132,
  dim = false,
  lit = false,
  ring = true,
  ringWidth = 3,
}: {
  src: string;
  alt: string;
  color: string;
  size?: number;
  dim?: boolean;
  lit?: boolean;
  ring?: boolean;
  ringWidth?: number;
}) {
  return (
    <motion.div
      className="relative shrink-0 rounded-full"
      style={{ width: size, height: size }}
      animate={{ opacity: dim ? 0.35 : 1, scale: lit ? 1.06 : 1 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* halo */}
      <motion.span
        className="pointer-events-none absolute -inset-2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ opacity: lit ? 0.22 : 0, scale: lit ? 1 : 0.8 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
      <div
        className="relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-white"
        style={
          ring
            ? { boxShadow: `inset 0 0 0 ${ringWidth}px ${color}` }
            : undefined
        }
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          sizes={`${size}px`}
          className="h-full w-full object-contain"
          style={ring ? { padding: ringWidth } : undefined}
        />
      </div>
    </motion.div>
  );
}

function LaureateRow({ l, showPrize }: { l: Laureate; showPrize?: boolean }) {
  return (
    <>
      <div className="min-w-0">
        {showPrize ? (
          <div className="mb-1">
            <PrizeTag prize={l.prize} />
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-lg font-semibold tracking-tight text-[#1D2D44]">
            {l.name}
          </span>
          {l.country ? (
            <span className="text-sm text-[#1D2D44]/55">{l.country}</span>
          ) : null}
          {l.status === "shared" ? (
            <span className="rounded-full border border-[#1D2D44]/[0.12] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#1D2D44]/55">
              Shared
            </span>
          ) : null}
        </div>
        {l.brief ? (
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#1D2D44]/70">
            {l.brief}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <FieldTag>{l.field}</FieldTag>
      </div>
    </>
  );
}

/* Latest winners — compact cover-flow with names anchored to each card */
const GOLD = "#E4C57A";
const GOLD_DEEP = "#C9A24A";

function winnerBio(l: Laureate) {
  if (l.brief) return l.brief;
  const bits = [l.field, l.country, String(l.year)].filter(Boolean);
  return bits.join(" · ");
}

const FEATURED_WINNER_ID = "jaber-2025-380"; // Dr. Aisha Ahmad Mutairan Al-Azmi

function WinnersCarousel({ winners }: { winners: Laureate[] }) {
  const featuredIndex = Math.max(
    0,
    winners.findIndex(
      (l) =>
        l.id === FEATURED_WINNER_ID ||
        l.name.toLowerCase().includes("aisha ahmad"),
    ),
  );
  const [active, setActive] = useState(featuredIndex);
  const [step, setStep] = useState(148);
  const reduce = useReducedMotion();
  const total = winners.length;
  const current = winners[active];

  const go = (dir: -1 | 1) => {
    setActive((i) => Math.min(total - 1, Math.max(0, i + dir)));
  };

  useEffect(() => {
    const syncStep = () => {
      const w = window.innerWidth;
      setStep(w < 640 ? 96 : w < 1024 ? 128 : 152);
    };
    syncStep();
    window.addEventListener("resize", syncStep);
    return () => window.removeEventListener("resize", syncStep);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  if (!total) return null;

  return (
    <div className="relative mx-auto w-full max-w-[1100px]">
      {/* stage */}
      <div className="relative mx-auto flex h-[310px] items-center justify-center sm:h-[360px] lg:h-[390px]">
        {winners.map((l, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          if (abs > 2) return null;

          const isActive = offset === 0;
          const scale = isActive ? 1 : abs === 1 ? 0.78 : 0.62;
          const x = offset * step;
          const y = isActive ? 0 : abs * 18;
          const opacity = isActive ? 1 : abs === 1 ? 0.72 : 0.4;

          return (
            <motion.button
              key={l.id}
              type="button"
              aria-label={`Show ${l.name}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActive(i)}
              className="absolute origin-center cursor-pointer border-0 bg-transparent p-0 text-left outline-none focus-visible:rounded-[1.6rem] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#EC601B]"
              initial={false}
              animate={{
                x,
                y,
                scale,
                opacity,
                zIndex: 20 - abs,
              }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 28 }
              }
              style={{ width: 224 }}
              drag={isActive && !reduce ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <div
                className="relative mx-auto"
                style={{
                  width: isActive ? 216 : 176,
                  height: isActive ? 304 : 248,
                }}
              >
                {/* gold frame — arched top, soft sheen, fine inner line */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-t-[1.6rem] rounded-b-md"
                  style={{
                    background: `linear-gradient(168deg, #F7E9BC 0%, ${GOLD} 40%, ${GOLD_DEEP} 100%)`,
                    boxShadow: isActive
                      ? `0 30px 55px -18px rgba(70,28,4,0.55), 0 0 46px -10px rgba(247,224,160,0.5)`
                      : "0 16px 28px -16px rgba(70,28,4,0.45)",
                  }}
                >
                  {/* single diagonal sheen */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(115deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 34%, rgba(255,255,255,0) 55%)",
                    }}
                  />
                  {/* fine inner hairline */}
                  <div
                    aria-hidden
                    className="absolute inset-[5px] rounded-t-[1.35rem] rounded-b-[0.25rem]"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(255,252,240,0.55)",
                    }}
                  />
                </div>

                {/* portrait — matted inside the gold frame */}
                <div className="absolute inset-x-[5.5%] bottom-[4.5%] top-[5.5%] overflow-hidden rounded-t-[1.05rem] rounded-b-[0.2rem]">
                  {l.image ? (
                    <Image
                      src={l.image}
                      alt={l.name}
                      fill
                      sizes="220px"
                      className="object-cover object-top"
                      draggable={false}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-end justify-center pb-6"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,252,240,0.55) 0%, rgba(255,252,240,0.2) 100%)",
                      }}
                    >
                      <svg
                        width="72"
                        height="72"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7DC0F1"
                        strokeOpacity="0.55"
                        strokeWidth="1.25"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                      </svg>
                    </div>
                  )}
                  {/* fine edge over the photo so it sits into the mat */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-t-[1.05rem] rounded-b-[0.2rem]"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(90,62,18,0.28), inset 0 -14px 22px -14px rgba(90,62,18,0.3)",
                    }}
                  />

                  {/* anchored identity panel — keeps every name readable */}
                  <div
                    className="absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-12 text-center"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(125,192,241,0.98) 0%, rgba(125,192,241,0.88) 52%, transparent 100%)",
                    }}
                  >
                    <div className="font-poppins text-[12px] font-semibold leading-[1.25] tracking-tight text-[#1D2D44] sm:text-[13px]">
                      {l.name}
                    </div>
                    {isActive ? (
                      <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1D2D44]/75">
                        {PRIZE_LABEL[l.prize]}
                        {l.year ? ` · ${l.year}` : ""}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* side chevrons */}
        <button
          type="button"
          aria-label="Previous winner"
          disabled={active === 0}
          onClick={() => go(-1)}
          className="absolute left-0 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#EC601B] ring-1 ring-white/70 shadow-sm transition enabled:hover:bg-[#EC601B] enabled:hover:text-white enabled:hover:ring-[#EC601B] disabled:opacity-20 sm:left-2 lg:left-6"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="rtl:rotate-180"
          >
            <path
              d="M15 5L8 12l7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next winner"
          disabled={active === total - 1}
          onClick={() => go(1)}
          className="absolute right-0 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#EC601B] ring-1 ring-white/70 shadow-sm transition enabled:hover:bg-[#EC601B] enabled:hover:text-white enabled:hover:ring-[#EC601B] disabled:opacity-20 sm:right-2 lg:right-6"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="rtl:rotate-180"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* progress dots */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {winners.map((l, i) => (
          <button
            key={l.id}
            type="button"
            aria-label={`Show ${l.name}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 22 : 6,
              backgroundColor: i === active ? GOLD : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* active bio — only under the center card */}
      <div className="mx-auto mt-4 min-h-[3.5rem] max-w-[520px] px-4 text-center">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="font-poppins text-[13px] font-light leading-relaxed text-white/90 sm:text-[14px]">
                {winnerBio(current)}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Detailed laureate card — portrait + bio (placeholder when absent)  */
/* ------------------------------------------------------------------ */
function LaureateCard({ l }: { l: Laureate }) {
  const accent = accentOf(l.prize);
  const hasBio = Boolean(l.brief);
  return (
    <motion.article
      variants={RISE}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#1D2D44]/[0.08] bg-white shadow-[0_2px_24px_-16px_rgba(29,45,68,0.20)]"
      whileHover={{ y: -4, boxShadow: "0 14px 34px -18px rgba(29,45,68,0.28)" }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <div className="flex gap-4 p-5">
        <div className="w-[84px] shrink-0">
          <Portrait src={l.image} name={l.name} accent={accent} />
        </div>
        <div className="min-w-0 flex-1">
          <PrizeTag prize={l.prize} />
          <h3 className="mt-1.5 text-[15px] font-semibold leading-snug tracking-tight text-[#1D2D44]">
            {l.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#1D2D44]/55">
            <span className="font-semibold tabular-nums text-[#1D2D44]/75">
              {l.year}
            </span>
            {l.country ? (
              <>
                <span className="text-[#1D2D44]/30">·</span>
                <span>{l.country}</span>
              </>
            ) : null}
            {l.status === "shared" ? (
              <span className="rounded-full border border-[#1D2D44]/[0.12] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#1D2D44]/55">
                Shared
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-[#1D2D44]/[0.07] px-5 py-4">
        <div className="mb-2">
          <FieldTag>{l.field}</FieldTag>
        </div>
        {hasBio ? (
          <p className="text-[13.5px] leading-relaxed text-[#1D2D44]/70">
            {l.brief}
          </p>
        ) : (
          <div className="space-y-1.5">
            {l.specializationAr ? (
              <p
                dir="rtl"
                className="text-[13.5px] leading-relaxed text-[#1D2D44]/70"
              >
                {l.specializationAr}
              </p>
            ) : null}
            {l.affiliationAr ? (
              <p
                dir="rtl"
                className="whitespace-pre-line text-[12.5px] leading-relaxed text-[#1D2D44]/50"
              >
                {l.affiliationAr}
              </p>
            ) : null}
            {!l.specializationAr && !l.affiliationAr ? (
              <p className="text-[13px] italic leading-relaxed text-[#1D2D44]/40">
                {BIO_PLACEHOLDER}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* a year block of detailed cards (browse) */
function YearCardGroup({ year, items }: { year: number; items: Laureate[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="border-t border-[#1D2D44]/[0.08] pt-6">
      <div className="mb-5 flex items-center gap-3">
        <motion.span
          className="text-2xl font-semibold tabular-nums tracking-tight text-[#1D2D44]/85"
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {year}
        </motion.span>
        <span className="h-px flex-1 bg-[#1D2D44]/[0.08]" />
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#1D2D44]/45">
          {items.length} {items.length === 1 ? "laureate" : "laureates"}
        </span>
      </div>
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
        variants={STAGGER}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {items.map((l) => (
          <LaureateCard key={l.id} l={l} />
        ))}
      </motion.div>
    </div>
  );
}

/* count from 0 → target with an ease-out, once `run` is true */
function useCountUp(target: number, run: boolean, duration = 1.4) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return val;
}

/* count-up figure */
function Counter({
  value,
  run,
  className,
}: {
  value: number;
  run: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const counted = useCountUp(value, run && !reduce);
  return <span className={className}>{reduce ? value : counted}</span>;
}

/* ------------------------------------------------------------------ */
/*  Stats — image-backed band, centred count-up figures                */
/* ------------------------------------------------------------------ */
function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = useMemo(() => {
    const nationalities = new Set(LAUREATES.map(countryOf).filter(Boolean))
      .size;
    return [
      {
        value: LATEST_YEAR - FIRST_YEAR + 1,
        label: "Years of giving",
        note: "since 1979",
        color: PRIZE_COLOR.kuwait,
      },
      {
        value: LAUREATES.length,
        label: "Laureates",
        note: "across three programmes",
        color: PRIZE_COLOR.jaber,
      },
      {
        value: nationalities,
        label: "Nationalities",
        note: "represented worldwide",
        color: PRIZE_COLOR.sumait,
      },
    ];
  }, []);

  return (
    <section ref={ref} className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-8 lg:py-28">
        <CenterHead kicker="Impact" title="A legacy in numbers" />

        <motion.div
          className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3"
          variants={STAGGER}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={RISE} className="text-center">
              <Counter
                value={s.value}
                run={inView}
                className="block text-6xl font-semibold tabular-nums tracking-tight text-[#1D2D44] sm:text-7xl"
              />
              <span
                className="mx-auto mt-4 block h-1 w-10 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <div className="mt-4 text-base font-semibold text-[#1D2D44]">
                {s.label}
              </div>
              <div className="mt-1 text-sm text-[#1D2D44]/55">{s.note}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  World map — 3 medals control which programme lights up             */
/* ------------------------------------------------------------------ */
function WorldSection() {
  const { counts, dominant, perPrize } = useMemo(() => {
    const counts = new Map<string, number>();
    const perPrize = new Map<string, Record<PrizeKey, number>>();
    for (const l of LAUREATES) {
      const c = countryOf(l);
      if (!c) continue;
      counts.set(c, (counts.get(c) ?? 0) + 1);
      const rec = perPrize.get(c) ?? { kuwait: 0, jaber: 0, sumait: 0 };
      rec[l.prize]++;
      perPrize.set(c, rec);
    }
    const dominant = new Map<string, PrizeKey>();
    perPrize.forEach((rec, c) =>
      dominant.set(
        c,
        Object.entries(rec).sort((a, b) => b[1] - a[1])[0][0] as PrizeKey,
      ),
    );
    return { counts, dominant, perPrize };
  }, []);

  const markers = useMemo(
    () =>
      [...counts.entries()]
        .filter(([c]) => COORDS[c])
        .map(([c, n]) => ({
          name: c,
          count: n,
          coords: COORDS[c],
          prize: dominant.get(c)!,
          prizes: perPrize.get(c)!,
        }))
        .sort((a, b) => b.count - a.count),
    [counts, dominant, perPrize],
  );

  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [litPrize, setLitPrize] = useState<PrizeKey | null>(null);

  const radius = (n: number) => Math.min(16, 4 + Math.sqrt(n) * 1.15);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
        <CenterHead
          kicker="Worldwide"
          title="Laureates around the world"
          intro="Click a point to see the laureates from that country."
        />

        {/* legend — hover a point to light its programme on the map */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
          variants={STAGGER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PRIZES.map((p) => {
            const dim = litPrize !== null && litPrize !== p.key;
            return (
              <motion.button
                key={p.key}
                type="button"
                variants={RISE}
                onMouseEnter={() => setLitPrize(p.key)}
                onMouseLeave={() => setLitPrize(null)}
                onFocus={() => setLitPrize(p.key)}
                onBlur={() => setLitPrize(null)}
                animate={{ opacity: dim ? 0.4 : 1 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-[#1D2D44]/75 outline-none transition hover:text-[#1D2D44] focus-visible:ring-2 focus-visible:ring-[#1D2D44]/30"
                aria-label={`Highlight ${p.name} on the map`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: accentOf(p.key) }}
                />
                {PRIZE_LABEL[p.key]}
              </motion.button>
            );
          })}
        </motion.div>

        {/* big, borderless map blended into the section */}
        <motion.div
          className="mx-auto mt-4"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="-mx-6 lg:mx-0">
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{ scale: 178, center: [10, 11] }}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#EAF1F7"
                      stroke="#FFFFFF"
                      strokeWidth={0.6}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#DEE9F2" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {markers.map((m, i) => {
                const active = selected === m.name;
                const showLabel = active || hovered === m.name;
                const inLit = litPrize !== null && m.prizes[litPrize] > 0;
                const dimmed = litPrize !== null && !inLit;
                const color =
                  litPrize !== null && inLit
                    ? accentOf(litPrize)
                    : accentOf(m.prize);
                const opacity = dimmed
                  ? 0.12
                  : litPrize !== null && inLit
                    ? 1
                    : active
                      ? 1
                      : 0.85;
                const r = radius(m.count) * (inLit ? 1.18 : 1);
                return (
                  <Marker key={m.name} coordinates={m.coords}>
                    <g
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSelected((prev) =>
                          prev === m.name ? null : m.name,
                        )
                      }
                      onMouseEnter={() => setHovered(m.name)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* larger hit area so hover/click work reliably */}
                      <circle
                        r={Math.max(r + 10, 14)}
                        fill="transparent"
                        stroke="none"
                      />
                      {active ? (
                        <circle
                          r={r + 5}
                          fill="none"
                          stroke="rgba(29,45,68,0.45)"
                          strokeWidth={1.5}
                        />
                      ) : null}
                      {inLit ? (
                        <motion.circle
                          r={r + 6}
                          fill={accentOf(litPrize!)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.18 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          style={{
                            transformBox: "fill-box",
                            transformOrigin: "center",
                          }}
                        />
                      ) : null}
                      <motion.circle
                        fill={color}
                        stroke="#FFFFFF"
                        strokeWidth={1.25}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity,
                          scale: 1,
                          r,
                          fill: color,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: litPrize === null ? 0.15 + i * 0.022 : 0,
                          ease: EASE,
                        }}
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "center",
                          pointerEvents: "none",
                        }}
                      />
                      {showLabel ? (
                        <g style={{ pointerEvents: "none" }}>
                          {(() => {
                            // Longer stem in dense areas (e.g. Egypt) so the label clears neighbours
                            const lineH = m.name === "Egypt" ? 56 : 38;
                            const boxH = 20;
                            const padX = 12;
                            const nameW = m.name.length * 6.2;
                            const countW = String(m.count).length * 6.2 + 14;
                            const boxW = Math.max(72, nameW + countW + padX * 2);
                            const labelY = -r - lineH - boxH;
                            const tipY = labelY + boxH;
                            return (
                              <>
                                {/* hairline connector */}
                                <line
                                  x1={0}
                                  y1={-r - 2}
                                  x2={0}
                                  y2={tipY}
                                  stroke={ORANGE}
                                  strokeWidth={0.9}
                                  strokeLinecap="round"
                                />
                                {/* minimal hotspot */}
                                <circle
                                  cx={0}
                                  cy={-r}
                                  r={2.25}
                                  fill={ORANGE}
                                />
                                <circle
                                  cx={0}
                                  cy={-r}
                                  r={4.5}
                                  fill="none"
                                  stroke={ORANGE}
                                  strokeOpacity={0.35}
                                  strokeWidth={1}
                                />
                                {/* light pill */}
                                <rect
                                  x={-boxW / 2}
                                  y={labelY}
                                  width={boxW}
                                  height={boxH}
                                  rx={10}
                                  fill="#FFFFFF"
                                  stroke={ORANGE}
                                  strokeOpacity={0.55}
                                  strokeWidth={0.9}
                                />
                                <text
                                  x={-boxW / 2 + padX}
                                  y={labelY + 13.5}
                                  textAnchor="start"
                                  style={{
                                    fontSize: 10.5,
                                    fontWeight: 600,
                                    letterSpacing: "0.02em",
                                    fill: "#1D2D44",
                                    fontFamily:
                                      "var(--font-poppins), Poppins, sans-serif",
                                  }}
                                >
                                  {m.name}
                                </text>
                                <text
                                  x={boxW / 2 - padX}
                                  y={labelY + 13.5}
                                  textAnchor="end"
                                  style={{
                                    fontSize: 10.5,
                                    fontWeight: 500,
                                    fill: ORANGE,
                                    fontFamily:
                                      "var(--font-poppins), Poppins, sans-serif",
                                  }}
                                >
                                  {m.count}
                                </text>
                              </>
                            );
                          })()}
                        </g>
                      ) : null}
                    </g>
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>

          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mx-auto mt-6 max-w-md rounded-xl bg-[#EC601B] px-5 py-4 text-center text-white"
              >
                <p className="font-poppins text-lg font-semibold tracking-tight">
                  {selected}
                </p>
                <p className="mt-1 text-sm text-white/90">
                  {markers.find((m) => m.name === selected)?.count ?? 0}{" "}
                  winners
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <p className="mt-4 text-center text-xs text-[#1D2D44]/45">
            Hover or click a point to see the country · point size reflects
            laureate count · {markers.length} countries represented
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function LaureatesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // browse-all controls — year + prize
  const [yearFilter, setYearFilter] = useState<"all" | number>(LATEST_YEAR);
  const [prizeFilter, setPrizeFilter] = useState<"all" | PrizeKey>("all");

  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: "-80px" });
  const latestRef = useRef(null);
  const latestInView = useInView(latestRef, { once: true, margin: "-80px" });

  const latestWinners = useMemo(
    () =>
      PRIZES.flatMap((p) => {
        const items = LAUREATES.filter((l) => l.prize === p.key);
        const year = Math.max(...items.map((l) => l.year));
        return items.filter((l) => l.year === year).slice(0, 3);
      }),
    [],
  );

  const years = ALL_YEARS;

  // unified browse: filtered by year + prize, grouped by year
  const grouped = useMemo(() => {
    const list = LAUREATES.filter(
      (l) =>
        (yearFilter === "all" || l.year === yearFilter) &&
        (prizeFilter === "all" || l.prize === prizeFilter),
    );
    const byYear = new Map<number, Laureate[]>();
    for (const l of list) {
      const arr = byYear.get(l.year) ?? [];
      arr.push(l);
      byYear.set(l.year, arr);
    }
    // order within a year: kuwait, jaber, sumait
    const order: Record<PrizeKey, number> = { kuwait: 0, jaber: 1, sumait: 2 };
    byYear.forEach((arr) =>
      arr.sort((a, b) => order[a.prize] - order[b.prize]),
    );
    return {
      count: list.length,
      groups: [...byYear.entries()].sort((a, b) => b[0] - a[0]),
    };
  }, [yearFilter, prizeFilter]);

  const prizePills: { key: "all" | PrizeKey; label: string }[] = [
    { key: "all", label: "All prizes" },
    { key: "kuwait", label: PRIZE_LABEL.kuwait },
    { key: "jaber", label: PRIZE_LABEL.jaber },
    { key: "sumait", label: PRIZE_LABEL.sumait },
  ];

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#121820]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/Prizes1.png"
              alt="KFAS laureates"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-[center_40%] scale-[1.06] brightness-[0.98] contrast-[1.02]"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                background: [
                  "linear-gradient(128deg, rgba(72,143,204,0.34) 0%, rgba(72,143,204,0.09) 44%, transparent 70%)",
                  "radial-gradient(ellipse 90% 65% at 10% 6%, rgba(200,220,250,0.16) 0%, transparent 58%)",
                  "linear-gradient(to bottom, rgba(18,24,32,0.14) 0%, rgba(29,45,68,0.3) 42%, rgba(10,14,22,0.8) 100%)",
                ].join(", "),
              }}
            />
          </div>

          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <Link href="/prizes" className="transition hover:text-white/80">
                Prizes
              </Link>
              <span className="text-white/25">/</span>
              <span className="text-white/80">Laureates</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_0_2px_28px_rgba(0,0,0,0.45),_0_1px_2px_rgba(0,0,0,0.35)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              >
                Laureates
              </motion.h1>
            </div>

            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ============================== INTRODUCTION ============================== */}
        <section ref={introRef} className="relative overflow-hidden bg-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full opacity-[0.12] rtl:right-auto rtl:-left-40"
            style={{
              background:
                "radial-gradient(circle, #7DC0F1 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
              <FadeUp>
                <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
                <span className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.35em] text-[#EC601B]">
                  Since 1979
                </span>
                <h2 className="mt-3 font-poppins text-[1.55rem] font-semibold leading-[1.18] tracking-tight text-[#1D2D44] sm:text-[1.9rem] lg:text-[2.1rem]">
                  Prizes at KFAS
                </h2>
                <p className="mt-5 max-w-[420px] font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70">
                  Three programmes recognising scientific excellence across the
                  Arab world and Africa.
                </p>
              </FadeUp>

              <motion.div
                variants={STAGGER}
                initial="hidden"
                animate={introInView ? "show" : "hidden"}
                className="grid h-full grid-cols-1 items-stretch gap-8 sm:grid-cols-3 sm:gap-4 lg:gap-6"
              >
                {PRIZES.map((p) => (
                  <motion.div key={p.key} variants={RISE} className="h-full">
                    <Link
                      href={p.href}
                      className="group flex h-full flex-col items-center text-center"
                    >
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <Medal
                          src={p.image}
                          alt={p.name}
                          color={ORANGE}
                          size={148}
                          ring={false}
                        />
                      </motion.div>
                      <div className="mt-4 text-sm font-semibold text-[#1D2D44] transition-colors duration-300 group-hover:text-[#EC601B] sm:text-base">
                        {p.name}
                      </div>
                      <p className="mt-1.5 max-w-[200px] flex-1 text-sm font-light leading-relaxed text-[#1D2D44]/65">
                        {p.line}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-3 pt-4">
                        <span className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
                        <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                          Learn more
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================== LATEST WINNERS ============================== */}
        <section
          ref={latestRef}
          className="relative overflow-hidden bg-[#EC601B]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full opacity-[0.22]"
            style={{
              background:
                "radial-gradient(circle, #FFB56B 0%, transparent 68%)",
            }}
          />
          <div className="relative mx-auto max-w-[1280px] px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
            <FadeUp className="mb-5 text-center lg:mb-7">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80">
                Most recent
              </span>
              <h2 className="mt-2 font-poppins text-[2.25rem] font-semibold tracking-tight text-white sm:text-[2.75rem] lg:text-[3.25rem]">
                Latest winners
              </h2>
              <p className="mx-auto mt-2 max-w-[440px] font-poppins text-[15px] font-light leading-relaxed text-white/80">
                The most recent laureates from each of the three programmes.
              </p>
            </FadeUp>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              animate={latestInView ? "show" : "hidden"}
            >
              <WinnersCarousel winners={latestWinners} />
            </motion.div>
          </div>
        </section>

        {/* ============================== WORLD MAP ============================== */}
        <WorldSection />

        {/* ============================== STATS ============================== */}
        <StatsSection />

        {/* ============================== BROWSE ALL — year + prize ============================== */}
        <section className="bg-[#7DC0F1]/[0.06]">
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <SectionHead
                  kicker="The honour roll"
                  title="Browse by year"
                  intro="Every laureate across the three programmes, newest first."
                />
              </div>

              <div className="lg:col-span-8">
                {/* toolbar: prize pills + year select */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="border-b border-[#1D2D44]/[0.10] pb-6"
                >
                  <div className="flex flex-wrap gap-2">
                    {prizePills.map((p) => {
                      const on = prizeFilter === p.key;
                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => setPrizeFilter(p.key)}
                          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                            on
                              ? "text-white"
                              : "text-[#1D2D44]/70 hover:text-[#1D2D44]"
                          }`}
                          style={{
                            backgroundColor: on
                              ? p.key === "all"
                                ? "#1D2D44"
                                : accentOf(p.key as PrizeKey)
                              : "rgba(29,45,68,0.06)",
                          }}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-[#1D2D44]/70">
                      Year
                      <select
                        value={String(yearFilter)}
                        onChange={(e) =>
                          setYearFilter(
                            e.target.value === "all"
                              ? "all"
                              : Number(e.target.value),
                          )
                        }
                        className="rounded-sm border border-[#1D2D44]/[0.16] bg-white px-3 py-1.5 text-sm font-medium text-[#1D2D44] outline-none transition focus:border-[#EC601B]"
                      >
                        <option value="all">All years</option>
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${yearFilter}-${prizeFilter}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-8 space-y-10"
                  >
                    {grouped.groups.length === 0 ? (
                      <p className="border-t border-[#1D2D44]/[0.08] py-12 text-[#1D2D44]/55">
                        No laureates match this filter.
                      </p>
                    ) : (
                      grouped.groups.map(([year, items]) => (
                        <YearCardGroup key={year} year={year} items={items} />
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
