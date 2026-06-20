"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Motion + brand constants                                           */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const NAVY = "#1D2D44";
const ORANGE = "#EC601B";

/* ------------------------------------------------------------------ */
/*  Editorial primitives (kept inline per the page convention)         */
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
        <span
          className="h-3 w-8 rounded-sm"
          style={{ backgroundColor: ORANGE }}
        />
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

function Mark({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="flex gap-4 py-5">
      <span
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: ORANGE }}
      />
      <div>
        <h3 className="text-lg font-semibold text-[#1D2D44]">{title}</h3>
        {children ? (
          <p className="mt-1.5 text-[15px] leading-relaxed text-[#1D2D44]/70">
            {children}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1D2D44]/[0.04]">
      {/* dot-grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(29,45,68,0.16) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      {/* orange corner accent */}
      <span
        className="absolute left-0 top-0 h-6 w-6"
        style={{
          borderTop: `3px solid ${ORANGE}`,
          borderLeft: `3px solid ${ORANGE}`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={NAVY}
          strokeWidth="1.4"
          className="opacity-50"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
        </svg>
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#1D2D44]/45">
          {label}
        </span>
      </div>
      {/* REPLACE FROM HERE */}
      {/* Swap this ImagePlaceholder for a portrait:
          <Image src={laureate.image!} alt={laureate.name} fill sizes="160px"
                 className="object-contain" loading="lazy" /> */}
      {/* REPLACE TO HERE */}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data model                                                         */
/*  NOTE: This array is the single source of truth for the roll.       */
/*  Replace / extend with the official KFAS laureate list, and add an  */
/*  `image` path per entry to render a portrait instead of the         */
/*  placeholder. Citations are paraphrased summaries — verify each.    */
/* ------------------------------------------------------------------ */

type PrizeKey = "kuwait" | "jaber" | "sumait";

interface Prize {
  key: PrizeKey;
  name: string;
  short: string;
  blurb: string;
}

interface Laureate {
  id: string;
  name: string;
  country: string;
  field: string;
  prize: PrizeKey;
  year: number;
  edition?: string;
  citation: string;
  image?: string; // e.g. "/image/laureates/ashraf-ibrahim.webp"
}

const PRIZES: Prize[] = [
  {
    key: "kuwait",
    name: "Kuwait Prize",
    short: "Kuwait Prize",
    blurb:
      "Awarded annually since 1979 to Kuwaiti and Arab researchers across four fields, with a biennial fifth field in emerging specialized sciences.",
  },
  {
    key: "jaber",
    name: "Jaber Al-Ahmad Award for Young Researchers",
    short: "Jaber Al-Ahmad",
    blurb:
      "Honours Kuwaiti PhD holders for outstanding early-career contributions across engineering, natural, life, and social sciences.",
  },
  {
    key: "sumait",
    name: "Al-Sumait Prize",
    short: "Al-Sumait",
    blurb:
      "Recognises work that drives measurable progress for African development in health, food security, and education.",
  },
];

const LAUREATES: Laureate[] = [
  // ---- Kuwait Prize — 43rd edition (2024) ----
  {
    id: "kp-2024-ibrahim",
    name: "Prof. Ashraf Ibrahim",
    country: "Jordan",
    field: "Basic Sciences — Biological Sciences",
    prize: "kuwait",
    year: 2024,
    edition: "43rd Kuwait Prize",
    citation:
      "Pioneering diagnostic and therapeutic approaches in translational medicine for chronic and complex diseases.",
  },
  {
    id: "kp-2024-farhat",
    name: "Prof. Charbel Farhat",
    country: "Lebanon",
    field: "Applied Sciences — Engineering Sciences",
    prize: "kuwait",
    year: 2024,
    edition: "43rd Kuwait Prize",
    citation:
      "Advances in computational aerosciences and aircraft structural engineering.",
  },
  {
    id: "kp-2024-kafafi",
    name: "Prof. Zeidan Kafafi",
    country: "Jordan",
    field: "Arts, Humanities & Literature",
    prize: "kuwait",
    year: 2024,
    edition: "43rd Kuwait Prize",
    citation:
      "Contributions to archaeology and the civilizational history of the Arab region.",
  },

  // ---- Kuwait Prize — earlier ----
  {
    id: "kp-2019-jamal",
    name: "Prof. Amaney Jamal",
    country: "United States",
    field: "Economics & Social Sciences",
    prize: "kuwait",
    year: 2019,
    edition: "Kuwait Prize",
    citation:
      "Scholarship in political science and democratization in the Arab world.",
  },

  // ---- Jaber Al-Ahmad Award — 36th edition (2025) ----
  {
    id: "ja-2025-qahim",
    name: "Dr. Yousef Al-Qahim",
    country: "Kuwait",
    field: "Engineering Sciences",
    prize: "jaber",
    year: 2025,
    edition: "36th Jaber Al-Ahmad Award",
    citation: "Applied engineering solutions serving the oil and gas sectors.",
  },
  {
    id: "ja-2025-khazi",
    name: "Dr. Yousef Al-Khazi",
    country: "Kuwait",
    field: "Natural Sciences & Mathematics",
    prize: "jaber",
    year: 2025,
    edition: "36th Jaber Al-Ahmad Award",
    citation: "Distinguished research in mathematics and the natural sciences.",
  },
  {
    id: "ja-2025-azmi",
    name: "Dr. Aisha Al-Azmi",
    country: "Kuwait",
    field: "Social Sciences & Humanities",
    prize: "jaber",
    year: 2025,
    edition: "36th Jaber Al-Ahmad Award",
    citation:
      "Developing educational policy and improving the efficiency of education systems.",
  },
  {
    id: "ja-2025-behbehani",
    name: "Dr. Hussein Behbehani",
    country: "Kuwait",
    field: "Life Sciences",
    prize: "jaber",
    year: 2025,
    edition: "36th Jaber Al-Ahmad Award",
    citation: "Distinguished scientific research in the biological sciences.",
  },

  // ---- Al-Sumait Prize ----
  {
    id: "as-marsh",
    name: "Prof. Kevin Marsh",
    country: "United Kingdom",
    field: "Health",
    prize: "sumait",
    year: 2017,
    edition: "Al-Sumait Prize for Health",
    citation:
      "Sustained efforts to control and eradicate malaria across Africa.",
  },
];

/* ------------------------------------------------------------------ */
/*  Filter chips                                                       */
/* ------------------------------------------------------------------ */

const FILTERS: { key: PrizeKey | "all"; label: string }[] = [
  { key: "all", label: "All laureates" },
  { key: "kuwait", label: "Kuwait Prize" },
  { key: "jaber", label: "Jaber Al-Ahmad" },
  { key: "sumait", label: "Al-Sumait" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function LaureateRow({
  laureate,
  index,
}: {
  laureate: Laureate;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 }}
      className="flex flex-col gap-5 py-7 sm:flex-row sm:items-start sm:gap-7"
    >
      {/* portrait — object-contain in a uniform box */}
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-sm border border-[#1D2D44]/[0.08] bg-white">
        {laureate.image ? (
          <Image
            src={laureate.image}
            alt={laureate.name}
            fill
            sizes="128px"
            className="object-contain"
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder label="Portrait" />
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-[#1D2D44]">
            {laureate.name}
          </h3>
          <span className="text-sm text-[#1D2D44]/55">{laureate.country}</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[#7DC0F1]/[0.18] px-3 py-1 text-xs font-medium text-[#1D2D44]">
            {laureate.field}
          </span>
          {laureate.edition ? (
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#1D2D44]/45">
              {laureate.edition}
            </span>
          ) : null}
        </div>

        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#1D2D44]/75">
          {laureate.citation}
        </p>
      </div>
    </motion.li>
  );
}

function YearGroup({ year, items }: { year: number; items: Laureate[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-[#1D2D44]/[0.08] py-2 sm:grid-cols-[5rem_1fr] sm:gap-8">
      {/* year index numeral */}
      <div className="pt-7">
        <span className="text-3xl font-semibold tabular-nums tracking-tight text-[#1D2D44]/85">
          {year}
        </span>
      </div>
      <ul className="divide-y divide-[#1D2D44]/[0.08]">
        {items.map((l, i) => (
          <LaureateRow key={l.id} laureate={l} index={i} />
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LaureatesPage() {
  const [filter, setFilter] = useState<PrizeKey | "all">("all");

  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: "-80px" });
  const prizeRef = useRef(null);
  const prizeInView = useInView(prizeRef, { once: true, margin: "-80px" });

  // group filtered laureates by year (descending)
  const grouped = useMemo(() => {
    const list =
      filter === "all"
        ? LAUREATES
        : LAUREATES.filter((l) => l.prize === filter);

    const byYear = new Map<number, Laureate[]>();
    for (const l of list) {
      const arr = byYear.get(l.year) ?? [];
      arr.push(l);
      byYear.set(l.year, arr);
    }
    return [...byYear.entries()].sort((a, b) => b[0] - a[0]);
  }, [filter]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
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
              "linear-gradient(90deg, rgba(29,45,68,0.86) 0%, rgba(29,45,68,0.62) 45%, rgba(29,45,68,0.30) 100%)",
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
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              The researchers and scholars KFAS has honoured for advancing
              science, society, and human knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* ============================== INTRO ============================== */}
      <section ref={introRef} className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionHead
                kicker="Since 1979"
                title="Recognising scientific excellence"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-8"
            >
              <p className="text-lg leading-relaxed text-[#1D2D44]/80">
                For more than four decades KFAS has honoured Kuwaiti and Arab
                researchers whose work has reshaped their fields and served
                their societies. Its awards celebrate achievement and inspire
                the next generation to pursue scientific careers.
              </p>

              {/* restrained hairline metadata strip */}
              <dl className="mt-10 grid grid-cols-3 divide-x divide-[#1D2D44]/[0.08] border-y border-[#1D2D44]/[0.08]">
                {[
                  { v: "43+", l: "Prize editions" },
                  { v: "130+", l: "Laureates honoured" },
                  { v: "5", l: "Fields of award" },
                ].map((s) => (
                  <div key={s.l} className="px-5 py-6 first:pl-0">
                    <dd className="text-3xl font-semibold tracking-tight text-[#1D2D44]">
                      {s.v}
                    </dd>
                    <dt className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[#1D2D44]/55">
                      {s.l}
                    </dt>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================== PRIZE PROGRAMS ============================== */}
      <section ref={prizeRef} className="bg-[#7DC0F1]/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionHead
                kicker="The awards"
                title="Three programmes, one mission"
                intro="Each programme recognises a distinct community of researchers — from established Arab scholars to Kuwait's emerging talent."
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={prizeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-8"
            >
              <ul className="divide-y divide-[#1D2D44]/[0.08] border-t border-[#1D2D44]/[0.08]">
                {PRIZES.map((p) => (
                  <Mark key={p.key} title={p.name}>
                    {p.blurb}
                  </Mark>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================== THE HONOR ROLL ============================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionHead
                kicker="The honour roll"
                title="Every laureate"
                intro="Filter by programme. Names are grouped by award year."
              />
            </div>

            <div className="lg:col-span-8">
              {/* filter chips */}
              <div className="mb-8 flex flex-wrap gap-2">
                {FILTERS.map((f) => {
                  const active = filter === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-[#1D2D44] text-white"
                          : "bg-[#1D2D44]/[0.05] text-[#1D2D44]/75 hover:bg-[#1D2D44]/[0.10]"
                      }`}
                      aria-pressed={active}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              {/* roll */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {grouped.length === 0 ? (
                    <p className="border-t border-[#1D2D44]/[0.08] py-12 text-[#1D2D44]/55">
                      No laureates to show for this programme yet.
                    </p>
                  ) : (
                    grouped.map(([year, items]) => (
                      <YearGroup key={year} year={year} items={items} />
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== NOMINATION CTA ============================== */}
      <section className="bg-[#7DC0F1]/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionHead
                kicker="Take part"
                title="Nominate a researcher"
                intro="Nominations open ahead of each award cycle and are reviewed by specialised juries and the Awards Council."
              />
            </div>

            <div className="lg:col-span-8">
              <ul className="divide-y divide-[#1D2D44]/[0.08] border-t border-[#1D2D44]/[0.08]">
                <Mark title="Eligibility">
                  Criteria vary by programme — Arab researchers worldwide for
                  the Kuwait Prize, Kuwaiti PhD holders for the Jaber Al-Ahmad
                  Award.
                </Mark>
                <Mark title="Review">
                  Candidates are assessed by field-specific arbitration and
                  selection committees before Board approval.
                </Mark>
                <Mark title="Recognition">
                  Laureates receive a cash award, a medal, and a certificate of
                  recognition at the annual ceremony.
                </Mark>
              </ul>

              <Link
                href="/prizes/nominate"
                className="group mt-10 inline-flex items-center gap-2 rounded-sm bg-[#EC601B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d45415]"
              >
                Start a nomination
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
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
