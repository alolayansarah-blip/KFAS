"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import SplitText from "./SplitText";
import { COUNTER_FALLBACKS, fallbackFor } from "@/lib/counterFallbacks";

interface Stat {
  value: number;
  label: string;
}

// Real snapshot numbers (lib/counterFallbacks.ts) — visitors must NEVER
// see zeros; worst case they see slightly stale real numbers.
const FALLBACK_STATS: Stat[] = [...COUNTER_FALLBACKS];

// The /api/Counters route always returns English labels (they key off the
// PURE API's own field names), so translation happens client-side by
// looking up the English label rather than by changing the API contract.
const STAT_LABEL_AR: Record<string, string> = {
  Profiles: "الملفات الشخصية",
  Organizations: "المؤسسات",
  "Research Outputs": "المخرجات البحثية",
  Projects: "المشاريع",
  Impacts: "الأثر",
  Prizes: "الجوائز",
  Equipment: "المعدات",
};

const STATS_STRINGS = {
  en: {
    since: "Since 1976",
    headlineEmphasis: "50 Year",
    headlineMid: "Journey Supporting",
    headlineLine2: "Science, Technology, and Innovation",
  },
  ar: {
    since: "منذ عام 1976",
    headlineEmphasis: "٥٠ عاماً",
    headlineMid: "من دعم",
    headlineLine2: "العلوم والتكنولوجيا والابتكار",
  },
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CounterSection() {
  const isArabic = useLocale() === "ar";
  const s = STATS_STRINGS[isArabic ? "ar" : "en"];
  const [stats, setStats] = useState<Stat[]>(FALLBACK_STATS);
  const [counts, setCounts] = useState<number[]>(
    new Array(FALLBACK_STATS.length).fill(0),
  );
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const hasAnimatedRef = useRef(false);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    async function fetchStats(retry = false) {
      try {
        const base =
          typeof window !== "undefined" ? window.location.origin : "";
        const url = `${base}/api/Counters${retry ? `?_=${Date.now()}` : ""}`;
        const res = await fetch(url, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data: unknown = await res.json();
        const arr = Array.isArray(data) ? data : [];
        if (arr.length > 0) {
          const parsed = arr.map((item: unknown) => {
            const label = String((item as { label?: string })?.label || "");
            return {
              value:
                Number((item as { value?: number })?.value) ||
                fallbackFor(label),
              label,
            };
          });
          hasAnimatedRef.current = false;
          setStats(parsed);
          setCounts(new Array(parsed.length).fill(0));
          if (!retry && !parsed.some((s) => s.value > 0)) {
            setTimeout(() => fetchStats(true), 2000);
          }
        } else {
          hasAnimatedRef.current = false;
          setStats(FALLBACK_STATS);
          setCounts(new Array(FALLBACK_STATS.length).fill(0));
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        hasAnimatedRef.current = false;
        setStats(FALLBACK_STATS);
        setCounts(new Array(FALLBACK_STATS.length).fill(0));
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    if (stats.length === 0) return;
    if (stats.every((s) => s.value === 0)) return;
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    timersRef.current.forEach((t) => clearInterval(t));
    timersRef.current = [];

    stats.forEach((stat, index) => {
      if (stat.value === 0) {
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = 0;
          return newCounts;
        });
        return;
      }

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      const increment = stat.value / steps;
      let currentCount = 0;

      const timer = setInterval(() => {
        currentCount += increment;
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.min(Math.round(currentCount), stat.value);
          return newCounts;
        });
        if (currentCount >= stat.value) {
          clearInterval(timer);
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = stat.value;
            return newCounts;
          });
        }
      }, stepDuration);

      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach((timer) => clearInterval(timer));
      timersRef.current = [];
    };
  }, [stats, isInView]);

  const formatNumber = (num: number) => {
    const n = Math.round(Number(num) || 0);
    return n.toLocaleString();
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 lg:py-40"
    >
      <div className="absolute inset-0 bg-[url('/image/benduluim.png')] bg-cover bg-center bg-fixed" />
      <div className="absolute inset-0 bg-[#EC601B]/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#EC601B]/30 via-transparent to-[#EC601B]/20" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isArabic
            ? "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], x: ["0%", "4%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16">
          <motion.p
            className={`mb-4 font-semibold text-white/50 ${
              isArabic ? "text-[15px] tracking-normal" : "text-[10px] uppercase"
            }`}
            initial={{
              opacity: 0,
              y: 16,
              letterSpacing: isArabic ? "0em" : "0.15em",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              letterSpacing: isArabic ? "0em" : "0.42em",
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            {s.since}
          </motion.p>

          <motion.h2
            className="font-poppins text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <SplitText
              text={s.headlineEmphasis}
              className="font-poppins font-semibold relative z-10"
              delay={40}
              duration={1}
              ease="easeOut"
              splitType={isArabic ? "words" : "chars"}
              from={{ opacity: 0, y: 10 }}
              to={{ opacity: 1, y: 0 }}
              textAlign={isArabic ? "right" : "left"}
            />{" "}
            <span className="font-light opacity-90">{s.headlineMid}</span>
            <br className="hidden sm:block" />{" "}
            <span className="font-light tracking-wide opacity-80">
              {s.headlineLine2}
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: index * 0.07, ease: EASE }}
              whileHover={{
                y: -5,
                borderColor: "rgba(255,255,255,0.35)",
                transition: { duration: 0.3, ease: EASE },
              }}
              className="border border-white/15 bg-white/8 backdrop-blur-sm p-5 text-center cursor-default"
            >
              <div className="mb-3 font-poppins text-3xl font-semibold tabular-nums text-white lg:text-4xl">
                {loading ? "—" : formatNumber(counts[index] ?? stat.value)}
              </div>

              <motion.div
                className="h-px bg-white/30 mx-auto mb-3"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: 0.25 + index * 0.07,
                  ease: EASE,
                }}
              />

              <p
                className={`font-poppins font-medium leading-tight text-white/65 ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[10px] uppercase tracking-widest"
                }`}
              >
                {isArabic
                  ? (STAT_LABEL_AR[stat.label] ?? stat.label)
                  : stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
