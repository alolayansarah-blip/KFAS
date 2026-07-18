// components/SearchResult.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/src/i18n/navigation";
import { getSearchIndex, type SearchItem } from "@/lib/searchIndex";

const ALL_CAT = "__all__";

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTAINER = "mx-auto w-full max-w-[1280px]";
const SAFE_X =
  "pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] sm:pl-8 sm:pr-8 lg:pl-12 lg:pr-12";
const SAFE_BOTTOM = "pb-[max(2rem,env(safe-area-inset-bottom))]";

function featuredFromIndex(index: SearchItem[]): SearchItem[] {
  const categoryOrder = Array.from(new Set(index.map((i) => i.category)));
  const byCat = new Map<string, SearchItem>();
  for (const it of index) {
    const existing = byCat.get(it.category);
    if (!existing) byCat.set(it.category, it);
    else if (!existing.description && it.description)
      byCat.set(it.category, it);
  }
  return categoryOrder
    .map((c) => byCat.get(c))
    .filter(Boolean) as SearchItem[];
}

function scoreItem(item: SearchItem, terms: string[]) {
  const title = item.title.toLowerCase();
  const kw = item.keywords.join(" ").toLowerCase();
  const desc = item.description.toLowerCase();
  const cat = item.category.toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (title.includes(t)) score += 5;
    if (kw.includes(t)) score += 3;
    if (cat.includes(t)) score += 2;
    if (desc.includes(t)) score += 1;
  }
  return score;
}

function SmartLink({
  item,
  className,
  children,
}: {
  item: SearchItem;
  className: string;
  children: React.ReactNode;
}) {
  const isExternal = item.url.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={item.url} className={className}>
      {children}
    </Link>
  );
}

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

function SectionLabel({
  children,
  isArabic,
}: {
  children: React.ReactNode;
  isArabic: boolean;
}) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="h-px w-8 shrink-0 bg-[#EC601B]" />
      <span
        className={`font-poppins font-semibold text-[#EC601B] ${
          isArabic
            ? "text-[15px] tracking-normal"
            : "text-[10px] uppercase tracking-[0.35em]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

function Chip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-none border px-4 py-2 font-poppins text-[13px] font-medium transition-colors ${
        active
          ? "border-[#EC601B] bg-[#EC601B] text-white"
          : "border-[#1D2D44]/12 bg-white text-[#1D2D44]/70 hover:border-[#EC601B]/40 hover:text-[#EC601B]"
      }`}
    >
      {label}
      <span
        className={`ms-1.5 ${active ? "text-white/70" : "text-[#1D2D44]/35"}`}
      >
        {count}
      </span>
    </button>
  );
}

export default function SearchResults() {
  const t = useTranslations("SearchPage");
  const params = useSearchParams();
  const router = useRouter();
  const isArabic = useLocale() === "ar";
  const searchIndex = useMemo(() => getSearchIndex(isArabic), [isArabic]);
  const categoryOrder = useMemo(
    () => Array.from(new Set(searchIndex.map((i) => i.category))),
    [searchIndex],
  );
  const featured = useMemo(
    () => featuredFromIndex(searchIndex),
    [searchIndex],
  );
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [activeCat, setActiveCat] = useState<string>(ALL_CAT);

  useEffect(() => setQuery(initial), [initial]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return searchIndex
      .map((item) => ({ item, score: scoreItem(item, terms) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }, [query, searchIndex]);

  const cats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of results)
      counts.set(r.category, (counts.get(r.category) ?? 0) + 1);
    return categoryOrder.filter((c) => counts.has(c)).map((c) => ({
      name: c,
      count: counts.get(c)!,
    }));
  }, [results, categoryOrder]);

  useEffect(() => {
    if (activeCat !== ALL_CAT && !cats.some((c) => c.name === activeCat)) {
      setActiveCat(ALL_CAT);
    }
  }, [cats, activeCat]);

  const filtered =
    activeCat === ALL_CAT
      ? results
      : results.filter((r) => r.category === activeCat);

  function onChange(value: string) {
    setQuery(value);
    const usp = new URLSearchParams();
    if (value.trim()) usp.set("q", value.trim());
    router.replace(`/search${usp.toString() ? `?${usp.toString()}` : ""}`, {
      scroll: false,
    });
  }

  const trimmed = query.trim();

  return (
    <>
      {/* ── Search band ── */}
      <section
        className={`${SAFE_X} pb-12 pt-8 sm:pb-14 sm:pt-10`}
        style={{ background: "#7DC0F1" }}
      >
        <div className={`${CONTAINER} relative`}>
          <svg
            className="pointer-events-none absolute start-5 top-1/2 z-10 -translate-y-1/2 text-[#1D2D44]/35"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t("placeholder")}
            aria-label={t("placeholder")}
            className="w-full rounded-none border border-white/30 bg-white py-4 ps-12 pe-12 font-poppins text-[15px] font-medium text-[#1D2D44] shadow-[0_8px_32px_-8px_rgba(29,45,68,0.18)] placeholder:font-normal placeholder:text-[#1D2D44]/40 transition-[border-color,box-shadow] focus:border-[#1D2D44]/20 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          {query && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label={t("clearSearch")}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-[#1D2D44]/40 transition-colors hover:text-[#EC601B]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </section>

      {/* ── Results & browse ── */}
      <section
        className={`${SAFE_X} ${SAFE_BOTTOM} bg-white py-14 sm:py-20`}
      >
        <div className={CONTAINER}>
          {results.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              <Chip
                label={t("all")}
                count={results.length}
                active={activeCat === ALL_CAT}
                onClick={() => setActiveCat(ALL_CAT)}
              />
              {cats.map((c) => (
                <Chip
                  key={c.name}
                  label={c.name}
                  count={c.count}
                  active={activeCat === c.name}
                  onClick={() => setActiveCat(c.name)}
                />
              ))}
            </div>
          )}

          {trimmed === "" ? (
            <div>
              <p className="max-w-xl font-poppins text-[15px] font-light leading-[1.85] text-[#1D2D44]/55">
                {t("emptyHint")}
              </p>

              <div className="mt-14">
                <SectionLabel isArabic={isArabic}>{t("explore")}</SectionLabel>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featured.map((item, i) => (
                    <motion.div
                      key={item.url}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                        delay: i * 0.04,
                      }}
                    >
                      <SmartLink
                        item={item}
                        className="group flex h-full flex-col gap-3 border border-[#1D2D44]/08 bg-[#BBDEFB]/10 p-6 transition-all duration-300 hover:border-[#EC601B]/35 hover:bg-[#BBDEFB]/25 hover:shadow-[0_12px_40px_-16px_rgba(29,45,68,0.12)]"
                      >
                        <span
                          className={`font-semibold text-[#EC601B] ${
                            isArabic
                              ? "text-[15px] tracking-normal"
                              : "text-[10px] uppercase tracking-[0.28em]"
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="font-poppins text-[17px] font-semibold leading-snug text-[#1D2D44] transition-colors group-hover:text-[#EC601B]">
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="text-sm leading-relaxed text-[#1D2D44]/55">
                            {item.description}
                          </span>
                        )}
                        <ArrowIcon className="mt-auto text-[#1D2D44]/20 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#EC601B] rtl:group-hover:-translate-x-1" />
                      </SmartLink>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="font-poppins text-[15px] text-[#1D2D44]/60">
              {t("noResultsPre")}{" "}
              <span className="font-medium text-[#1D2D44]">
                &ldquo;{trimmed}&rdquo;
              </span>
              .
            </p>
          ) : (
            <div className="max-w-3xl">
              <p
                className={`mb-6 font-poppins font-medium text-[#1D2D44]/40 ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[12px] uppercase tracking-[0.2em]"
                }`}
              >
                {filtered.length}{" "}
                {filtered.length === 1
                  ? t("resultSingular")
                  : t("resultPlural")}
                {activeCat !== ALL_CAT ? ` · ${activeCat}` : ""}
              </p>
              <div className="divide-y divide-[#1D2D44]/08 border-t border-[#1D2D44]/08">
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: EASE,
                      delay: Math.min(i * 0.03, 0.24),
                    }}
                  >
                    <SmartLink
                      item={item}
                      className="group block py-6 transition-colors hover:bg-[#BBDEFB]/10"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex min-w-0 flex-col gap-1.5">
                          <span
                            className={`font-semibold text-[#EC601B] ${
                              isArabic
                                ? "text-[15px] tracking-normal"
                                : "text-[10px] uppercase tracking-[0.28em]"
                            }`}
                          >
                            {item.category}
                          </span>
                          <span className="font-poppins text-[17px] font-semibold text-[#1D2D44] transition-colors group-hover:text-[#EC601B]">
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="text-sm leading-relaxed text-[#1D2D44]/55">
                              {item.description}
                            </span>
                          )}
                        </div>
                        <ArrowIcon className="shrink-0 text-[#1D2D44]/20 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#EC601B] rtl:group-hover:-translate-x-1" />
                      </div>
                    </SmartLink>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
