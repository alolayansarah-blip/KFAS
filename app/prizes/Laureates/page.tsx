"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LAUREATES, type Laureate, type PrizeKey } from "@/src/data/laureates";

/* ------------------------------------------------------------------ */
/*  Motion + brand                                                     */
/* ------------------------------------------------------------------ */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ORANGE = "#EC601B";
const RECENT_YEARS = 4; // how many year-blocks show before "Show all"

/* ------------------------------------------------------------------ */
/*  Prize metadata (short copy)                                        */
/* ------------------------------------------------------------------ */
const PRIZES: { key: PrizeKey; name: string; tab: string; line: string }[] = [
  {
    key: "kuwait",
    name: "Kuwait Prize",
    tab: "Kuwait Prize",
    line: "For distinguished Arab researchers, awarded annually since 1979.",
  },
  {
    key: "jaber",
    name: "Jaber Al-Ahmad Award",
    tab: "Jaber Al-Ahmad",
    line: "For outstanding young Kuwaiti researchers.",
  },
  {
    key: "sumait",
    name: "Al-Sumait Prize",
    tab: "Al-Sumait",
    line: "For African development in health, food security, and education.",
  },
];
const PRIZE_LABEL: Record<PrizeKey, string> = {
  kuwait: "Kuwait Prize",
  jaber: "Jaber Al-Ahmad",
  sumait: "Al-Sumait",
};

/* ------------------------------------------------------------------ */
/*  Editorial primitives                                               */
/* ------------------------------------------------------------------ */
function SectionHead({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="lg:sticky lg:top-28">
      <div className="flex items-center gap-3">
        <span className="h-3 w-8 rounded-sm" style={{ backgroundColor: ORANGE }} />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D2D44]/70">
          {kicker}
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#1D2D44] sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#1D2D44]/70">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/* Portrait placeholder — dot grid, icon, orange corner accent.
   When a real photo exists on the record, it renders instead.        */
function Portrait({ src, name }: { src?: string; name: string }) {
  if (src) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#1D2D44]/[0.04]">
        {/* REPLACE FROM HERE — real portrait */}
        <Image
          src={src}
          alt={name}
          fill
          sizes="(min-width:1024px) 22vw, (min-width:640px) 30vw, 45vw"
          loading="lazy"
          className="object-cover"
        />
        {/* REPLACE TO HERE */}
      </div>
    );
  }
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#1D2D44]/[0.03]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(29,45,68,0.10) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      {/* orange corner accent */}
      <span
        className="absolute left-0 top-0 h-7 w-7"
        style={{
          backgroundColor: ORANGE,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
      {/* portrait icon */}
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

/* ------------------------------------------------------------------ */
/*  Featured card                                                      */
/* ------------------------------------------------------------------ */
function FeaturedCard({ l }: { l: Laureate }) {
  return (
    <figure className="group">
      <Portrait src={l.image} name={l.name} />
      <figcaption className="mt-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#EC601B]">
          {PRIZE_LABEL[l.prize]} · {l.year}
        </span>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-[#1D2D44]">
          {l.name}
        </h3>
        <p className="mt-1 text-sm text-[#1D2D44]/60">
          {l.field}
          {l.country ? ` · ${l.country}` : ""}
        </p>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Laureate row + year group                                          */
/* ------------------------------------------------------------------ */
function LaureateRow({ l }: { l: Laureate }) {
  return (
    <li className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <div className="min-w-0">
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

        {l.nameAr ? (
          <div dir="rtl" className="mt-0.5 text-sm text-[#1D2D44]/45">
            {l.nameAr}
          </div>
        ) : null}

        {l.brief ? (
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#1D2D44]/70">
            {l.brief}
          </p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-[#7DC0F1]/[0.18] px-3 py-1 text-xs font-medium text-[#1D2D44]">
          {l.field}
        </span>
      </div>
    </li>
  );
}

function YearGroup({ year, items }: { year: number; items: Laureate[] }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t border-[#1D2D44]/[0.08] py-3 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
      <div className="pt-5">
        <span className="text-2xl font-semibold tabular-nums tracking-tight text-[#1D2D44]/85">
          {year}
        </span>
      </div>
      <ul className="divide-y divide-[#1D2D44]/[0.08]">
        {items.map((l) => (
          <LaureateRow key={l.id} l={l} />
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function LaureatesPage() {
  const [prize, setPrize] = useState<PrizeKey>("kuwait");
  const [field, setField] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [showAll, setShowAll] = useState(false);

  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: "-80px" });
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-80px" });

  // totals per prize
  const totals = useMemo(() => {
    const t: Record<PrizeKey, number> = { kuwait: 0, jaber: 0, sumait: 0 };
    for (const l of LAUREATES) t[l.prize]++;
    return t;
  }, []);

  // featured = most recent award year across all prizes (cap 8)
  const featured = useMemo(() => {
    const maxYear = Math.max(...LAUREATES.map((l) => l.year));
    return LAUREATES.filter((l) => l.year === maxYear).slice(0, 8);
  }, []);

  // fields within the active prize
  const fields = useMemo(() => {
    const set = new Set<string>();
    for (const l of LAUREATES) if (l.prize === prize) set.add(l.field);
    return [...set].sort();
  }, [prize]);

  // filtered + grouped by year (desc)
  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = LAUREATES.filter(
      (l) =>
        l.prize === prize &&
        (field === "all" || l.field === field) &&
        (q === "" ||
          l.name.toLowerCase().includes(q) ||
          (l.nameAr ?? "").includes(query.trim()) ||
          (l.country ?? "").toLowerCase().includes(q))
    );
    const byYear = new Map<number, Laureate[]>();
    for (const l of list) {
      const arr = byYear.get(l.year) ?? [];
      arr.push(l);
      byYear.set(l.year, arr);
    }
    return {
      count: list.length,
      groups: [...byYear.entries()].sort((a, b) => b[0] - a[0]),
    };
  }, [prize, field, query]);

  // collapse: show only recent year-blocks unless searching / filtering / expanded
  const isBrowsingAll = query.trim() === "" && field === "all" && !showAll;
  const visibleGroups = isBrowsingAll
    ? grouped.groups.slice(0, RECENT_YEARS)
    : grouped.groups;
  const hiddenCount =
    grouped.count -
    visibleGroups.reduce((n, [, items]) => n + items.length, 0);

  function selectPrize(p: PrizeKey) {
    setPrize(p);
    setField("all");
    setQuery("");
    setShowAll(false);
  }

  return (
    <main className="bg-white">
      {/* ============================== HERO ============================== */}
      <section className="relative h-[540px] w-full overflow-hidden">
        <Image
          src="/image/Laureates.webp" /* TODO: confirm actual hero filename */
          alt="KFAS laureates"
          fill
          priority
          quality={65}
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(29,45,68,0.88) 0%, rgba(29,45,68,0.64) 45%, rgba(29,45,68,0.32) 100%)",
          }}
        />
        <div className="relative mx-auto flex h-full max-w-[1280px] items-center justify-start px-6 py-12 lg:px-8">
          <div className="max-w-2xl text-left">
            <nav className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/70">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/prizes" className="transition hover:text-white">
                Prizes
              </Link>
              <span>/</span>
              <span className="text-white">Laureates</span>
            </nav>
            <span
              className="mb-4 inline-block h-3 w-10 rounded-sm"
              style={{ backgroundColor: ORANGE }}
            />
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Laureates
            </h1>
          </div>
        </div>
      </section>

      {/* ============================== INTRO — PRIZES AT KFAS ============================== */}
      <section ref={introRef} className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionHead
                kicker="Since 1979"
                title="Prizes at KFAS"
                intro="Three programmes recognising scientific excellence across the Arab world and Africa."
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-8"
            >
              <div className="grid grid-cols-1 divide-y divide-[#1D2D44]/[0.08] border-y border-[#1D2D44]/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {PRIZES.map((p, idx) => (
                  <div key={p.key} className={`py-7 sm:px-6 ${idx === 0 ? "sm:pl-0" : ""}`}>
                    <div className="text-4xl font-semibold tracking-tight text-[#1D2D44]">
                      {totals[p.key]}
                    </div>
                    <div className="mt-3 text-base font-semibold text-[#1D2D44]">
                      {p.name}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#1D2D44]/65">
                      {p.line}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================== FEATURED ============================== */}
      <section ref={featRef} className="bg-[#7DC0F1]/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-8 rounded-sm" style={{ backgroundColor: ORANGE }} />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D2D44]/70">
                  Most recent
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1D2D44] sm:text-4xl">
                Latest laureates
              </h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={featInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
          >
            {featured.map((l) => (
              <FeaturedCard key={l.id} l={l} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================== WINNERS (ARCHIVE) ============================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionHead
                kicker="The honour roll"
                title="Browse all laureates"
                intro="Pick a programme, filter by field, or search a name."
              />
            </div>

            <div className="lg:col-span-8">
              {/* prize tabs */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-[#1D2D44]/[0.10]">
                {PRIZES.map((p) => {
                  const active = p.key === prize;
                  return (
                    <button
                      key={p.key}
                      onClick={() => selectPrize(p.key)}
                      className={`-mb-px border-b-2 pb-3 pt-1 text-sm font-semibold transition ${
                        active
                          ? "border-[#EC601B] text-[#1D2D44]"
                          : "border-transparent text-[#1D2D44]/50 hover:text-[#1D2D44]/80"
                      }`}
                    >
                      {p.tab}
                      <span className="ml-2 text-xs font-normal text-[#1D2D44]/40">
                        {totals[p.key]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* controls */}
              <div className="mt-6 flex flex-col gap-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or country…"
                  className="w-full rounded-sm border border-[#1D2D44]/[0.14] bg-white px-4 py-2.5 text-sm text-[#1D2D44] outline-none transition placeholder:text-[#1D2D44]/40 focus:border-[#EC601B]"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setField("all")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                      field === "all"
                        ? "bg-[#1D2D44] text-white"
                        : "bg-white text-[#1D2D44]/70 hover:bg-[#1D2D44]/[0.06]"
                    }`}
                  >
                    All fields
                  </button>
                  {fields.map((f) => (
                    <button
                      key={f}
                      onClick={() => setField(f)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                        field === f
                          ? "bg-[#1D2D44] text-white"
                          : "bg-white text-[#1D2D44]/70 hover:bg-[#1D2D44]/[0.06]"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* count */}
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-[#1D2D44]/45">
                {grouped.count} {grouped.count === 1 ? "laureate" : "laureates"}
              </p>

              {/* roll */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${prize}-${field}-${query}-${showAll}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mt-3"
                >
                  {visibleGroups.length === 0 ? (
                    <p className="border-t border-[#1D2D44]/[0.08] py-12 text-[#1D2D44]/55">
                      No laureates match this filter.
                    </p>
                  ) : (
                    visibleGroups.map(([year, items]) => (
                      <YearGroup key={year} year={year} items={items} />
                    ))
                  )}
                </motion.div>
              </AnimatePresence>

              {/* show all */}
              {isBrowsingAll && hiddenCount > 0 ? (
                <button
                  onClick={() => setShowAll(true)}
                  className="group mt-8 inline-flex items-center gap-2 border-t border-[#1D2D44]/[0.08] pt-8 text-sm font-semibold text-[#1D2D44]"
                >
                  Show all {grouped.count} laureates
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth="2"
                    className="transition-transform group-hover:translate-y-0.5"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}