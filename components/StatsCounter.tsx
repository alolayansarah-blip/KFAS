// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import SplitText from "./SplitText";

// interface Stat {
//   value: number;
//   label: string;
// }

// const FALLBACK_STATS: Stat[] = [
//   { value: 0, label: "Profiles" },
//   { value: 0, label: "Organizations" },
//   { value: 0, label: "Research Outputs" },
//   { value: 0, label: "Projects" },
//   { value: 0, label: "Impacts" },
//   { value: 0, label: "Prizes" },
//   { value: 0, label: "Equipment" },
// ];

// export default function CounterSection() {
//   const [stats, setStats] = useState<Stat[]>(FALLBACK_STATS);
//   const [counts, setCounts] = useState<number[]>(
//     new Array(FALLBACK_STATS.length).fill(0),
//   );
//   const [loading, setLoading] = useState(true);
//   const sectionRef = useRef<HTMLElement>(null);
//   const timersRef = useRef<NodeJS.Timeout[]>([]);
//   const hasAnimatedRef = useRef(false);

//   // Always fetch from API on mount
//   useEffect(() => {
//     async function fetchStats(retry = false) {
//       try {
//         const base =
//           typeof window !== "undefined" ? window.location.origin : "";
//         const url = `${base}/api/Counters${retry ? `?_=${Date.now()}` : ""}`;
//         const res = await fetch(url, {
//           cache: "no-store",
//           headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
//         });
//         if (!res.ok) throw new Error(`API ${res.status}`);
//         const data: unknown = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         if (arr.length > 0) {
//           const parsed = arr.map((item: unknown) => ({
//             value: Number((item as { value?: number })?.value) || 0,
//             label: String((item as { label?: string })?.label || ""),
//           }));
//           // Reset animation flag so it can re-run with fresh data
//           hasAnimatedRef.current = false;
//           setStats(parsed);
//           setCounts(new Array(parsed.length).fill(0));
//           // Retry once if all zeros (API may have returned cached/empty)
//           if (!retry && !parsed.some((s) => s.value > 0)) {
//             setTimeout(() => fetchStats(true), 2000);
//           }
//         } else {
//           // No data from API — fall back and still animate fallback stats
//           hasAnimatedRef.current = false;
//           setStats(FALLBACK_STATS);
//           setCounts(new Array(FALLBACK_STATS.length).fill(0));
//         }
//       } catch (err) {
//         console.error("Failed to fetch stats:", err);
//         // On error, reset so fallback stats can animate
//         hasAnimatedRef.current = false;
//         setStats(FALLBACK_STATS);
//         setCounts(new Array(FALLBACK_STATS.length).fill(0));
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchStats();
//   }, []);

//   // Count animation — triggers whenever stats change and haven't animated yet
//   useEffect(() => {
//     if (stats.length === 0) return;

//     // Only skip if every single value is 0
//     if (stats.every((s) => s.value === 0)) return;

//     // Guard to prevent double-animation
//     if (hasAnimatedRef.current) return;
//     hasAnimatedRef.current = true;

//     // Clear any previous timers
//     timersRef.current.forEach((t) => clearInterval(t));
//     timersRef.current = [];

//     stats.forEach((stat, index) => {
//       if (stat.value === 0) {
//         setCounts((prev) => {
//           const newCounts = [...prev];
//           newCounts[index] = 0;
//           return newCounts;
//         });
//         return;
//       }

//       const duration = 2000;
//       const steps = 60;
//       const stepDuration = duration / steps;
//       const increment = stat.value / steps;

//       let currentCount = 0;

//       const timer = setInterval(() => {
//         currentCount += increment;

//         setCounts((prev) => {
//           const newCounts = [...prev];
//           newCounts[index] = Math.min(Math.round(currentCount), stat.value);
//           return newCounts;
//         });

//         if (currentCount >= stat.value) {
//           clearInterval(timer);
//           setCounts((prev) => {
//             const newCounts = [...prev];
//             newCounts[index] = stat.value;
//             return newCounts;
//           });
//         }
//       }, stepDuration);

//       timersRef.current.push(timer);
//     });

//     return () => {
//       timersRef.current.forEach((timer) => clearInterval(timer));
//       timersRef.current = [];
//     };
//   }, [stats]);

//   const formatNumber = (num: number) => {
//     const n = Math.round(Number(num) || 0);
//     return n.toLocaleString();
//   };

//   if (loading) {
//     return (
//       <section className="py-20 lg:py-32 relative overflow-hidden min-h-[400px]">
//         <div className="absolute inset-0 bg-[url('/image/benduluim.png')] bg-cover bg-center bg-fixed" />
//         <div className="absolute inset-0 bg-[#EC601B]/90" />
//         <div className="relative z-10 flex items-center justify-center min-h-[300px]">
//           <p className="text-white font-poppins">Loading...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <motion.section
//       ref={sectionRef}
//       className="py-20 lg:py-32 relative overflow-hidden"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//     >
//       {/* Background image */}
//       <div className="absolute inset-0 bg-[url('/image/benduluim.png')] bg-cover bg-center bg-fixed" />
//       {/* Orange overlay */}
//       <div className="absolute inset-0 bg-[#EC601B]/90" />

//       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
//         <div className="text-left max-w-7xl mb-16">
//           <h2 className="font-poppins text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight text-left">
//             <span className="relative inline-block">
//               <SplitText
//                 text="50 Year"
//                 className="font-poppins font-bold text-3xl lg:text-4xl xl:text-5xl relative z-10"
//                 delay={40}
//                 duration={1}
//                 ease="easeOut"
//                 splitType="chars"
//                 from={{ opacity: 0, y: 10 }}
//                 to={{ opacity: 1, y: 0 }}
//                 textAlign="left"
//               />
//               <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/20 -z-10" />
//             </span>{" "}
//             Journey Supporting
//             <br />
//             Science, Technology, and Innovation
//           </h2>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 duration: 0.4,
//                 delay: index * 0.05,
//                 ease: "easeOut",
//               }}
//               whileHover={{ y: -8, scale: 1.05 }}
//               className="group relative bg-white/10 backdrop-blur-md p-6 text-center transition-all duration-300 border border-white/20 hover:bg-white/15 hover:border-white/40 cursor-default"
//             >
//               {/* Decorative corner element */}
//               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30 group-hover:border-white/50 transition-colors duration-300" />

//               {/* Number */}
//               <div className="font-poppins text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 tabular-nums">
//                 {formatNumber(counts[index] ?? stat.value)}
//               </div>

//               {/* Divider line */}
//               <div className="h-0.5 w-12 bg-white/40 mx-auto mb-3 group-hover:w-16 group-hover:bg-white/60 transition-all duration-300" />

//               {/* Label */}
//               <p className="font-poppins text-xs text-white/80 font-medium leading-tight uppercase tracking-wide group-hover:text-white transition-colors duration-300">
//                 {stat.label}
//               </p>

//               {/* Glow effect on hover */}
//               <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom decorative element */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="mt-16 text-center"
//         >
//           <div className="inline-flex items-center gap-2 text-white/60 text-sm">
//             <div className="w-12 h-px bg-white/30" />
//             <span className="font-poppins font-medium">Since 1976</span>
//             <div className="w-12 h-px bg-white/30" />
//           </div>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// }
//===============================================================================
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import SplitText from "./SplitText";

// interface Stat {
//   value: number;
//   label: string;
// }

// const FALLBACK_STATS: Stat[] = [
//   { value: 0, label: "Profiles" },
//   { value: 0, label: "Organizations" },
//   { value: 0, label: "Research Outputs" },
//   { value: 0, label: "Projects" },
//   { value: 0, label: "Impacts" },
//   { value: 0, label: "Prizes" },
//   { value: 0, label: "Equipment" },
// ];

// const EASE = [0.16, 1, 0.3, 1] as const;

// export default function CounterSection() {
//   const [stats, setStats] = useState<Stat[]>(FALLBACK_STATS);
//   const [counts, setCounts] = useState<number[]>(
//     new Array(FALLBACK_STATS.length).fill(0),
//   );
//   const [loading, setLoading] = useState(true);
//   const sectionRef = useRef<HTMLElement>(null);
//   const timersRef = useRef<NodeJS.Timeout[]>([]);
//   const hasAnimatedRef = useRef(false);

//   useEffect(() => {
//     async function fetchStats(retry = false) {
//       try {
//         const base =
//           typeof window !== "undefined" ? window.location.origin : "";
//         const url = `${base}/api/Counters${retry ? `?_=${Date.now()}` : ""}`;
//         const res = await fetch(url, {
//           cache: "no-store",
//           headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
//         });
//         if (!res.ok) throw new Error(`API ${res.status}`);
//         const data: unknown = await res.json();
//         const arr = Array.isArray(data) ? data : [];
//         if (arr.length > 0) {
//           const parsed = arr.map((item: unknown) => ({
//             value: Number((item as { value?: number })?.value) || 0,
//             label: String((item as { label?: string })?.label || ""),
//           }));
//           hasAnimatedRef.current = false;
//           setStats(parsed);
//           setCounts(new Array(parsed.length).fill(0));
//           if (!retry && !parsed.some((s) => s.value > 0)) {
//             setTimeout(() => fetchStats(true), 2000);
//           }
//         } else {
//           hasAnimatedRef.current = false;
//           setStats(FALLBACK_STATS);
//           setCounts(new Array(FALLBACK_STATS.length).fill(0));
//         }
//       } catch (err) {
//         console.error("Failed to fetch stats:", err);
//         hasAnimatedRef.current = false;
//         setStats(FALLBACK_STATS);
//         setCounts(new Array(FALLBACK_STATS.length).fill(0));
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchStats();
//   }, []);

//   useEffect(() => {
//     if (stats.length === 0) return;
//     if (stats.every((s) => s.value === 0)) return;
//     if (hasAnimatedRef.current) return;
//     hasAnimatedRef.current = true;

//     timersRef.current.forEach((t) => clearInterval(t));
//     timersRef.current = [];

//     stats.forEach((stat, index) => {
//       if (stat.value === 0) {
//         setCounts((prev) => {
//           const newCounts = [...prev];
//           newCounts[index] = 0;
//           return newCounts;
//         });
//         return;
//       }

//       const duration = 2000;
//       const steps = 60;
//       const stepDuration = duration / steps;
//       const increment = stat.value / steps;
//       let currentCount = 0;

//       const timer = setInterval(() => {
//         currentCount += increment;
//         setCounts((prev) => {
//           const newCounts = [...prev];
//           newCounts[index] = Math.min(Math.round(currentCount), stat.value);
//           return newCounts;
//         });
//         if (currentCount >= stat.value) {
//           clearInterval(timer);
//           setCounts((prev) => {
//             const newCounts = [...prev];
//             newCounts[index] = stat.value;
//             return newCounts;
//           });
//         }
//       }, stepDuration);

//       timersRef.current.push(timer);
//     });

//     return () => {
//       timersRef.current.forEach((timer) => clearInterval(timer));
//       timersRef.current = [];
//     };
//   }, [stats]);

//   const formatNumber = (num: number) => {
//     const n = Math.round(Number(num) || 0);
//     return n.toLocaleString();
//   };

//   if (loading) {
//     return (
//       <section className="py-20 lg:py-32 relative overflow-hidden min-h-[400px]">
//         <div className="absolute inset-0 bg-[url('/image/benduluim.png')] bg-cover bg-center bg-fixed" />
//         <div className="absolute inset-0 bg-[#EC601B]/80" />
//         <div className="relative z-10 flex items-center justify-center min-h-[300px]">
//           <p className="text-white/60 font-poppins text-sm tracking-widest uppercase">
//             Loading…
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <motion.section
//       ref={sectionRef}
//       className="py-20 lg:py-32 relative overflow-hidden"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true, amount: 0.1 }}
//       transition={{ duration: 0.8, ease: EASE }}
//     >
//       {/* Background image */}
//       <div className="absolute inset-0 bg-[url('/image/benduluim.png')] bg-cover bg-center bg-fixed" />
//       {/* Orange overlay — lightened to let image breathe */}
//       <div className="absolute inset-0 bg-[#EC601B]/80" />
//       {/* Subtle top vignette */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#EC601B]/30 via-transparent to-[#EC601B]/20" />

//       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <div className="mb-16">
//           {/* Eyebrow — matches site style */}
//           <motion.p
//             className="mb-4 text-[10px] font-semibold uppercase tracking-[0.42em] text-white/50"
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.2 }}
//             transition={{ duration: 0.6, ease: EASE }}
//           >
//             Since 1976
//           </motion.p>

//           <motion.h2
//             className="font-poppins text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white leading-tight tracking-tight"
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.2 }}
//             transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
//           >
//             <SplitText
//               text="50 Year"
//               className="font-poppins font-bold relative z-10"
//               delay={40}
//               duration={1}
//               ease="easeOut"
//               splitType="chars"
//               from={{ opacity: 0, y: 10 }}
//               to={{ opacity: 1, y: 0 }}
//               textAlign="left"
//             />{" "}
//             <span className="font-light opacity-90">Journey Supporting</span>
//             <br className="hidden sm:block" />{" "}
//             <span className="font-extralight tracking-wide opacity-80">
//               Science, Technology, and Innovation
//             </span>
//           </motion.h2>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.1 }}
//               transition={{
//                 duration: 0.55,
//                 delay: index * 0.06,
//                 ease: EASE,
//               }}
//               className="group relative border border-white/15 bg-white/8 backdrop-blur-sm p-5 text-center transition-all duration-500 hover:border-white/30 hover:bg-white/12"
//             >
//               {/* Number */}
//               <div className="font-poppins text-3xl lg:text-4xl font-bold text-white mb-3 tabular-nums">
//                 {formatNumber(counts[index] ?? stat.value)}
//               </div>

//               {/* Divider */}
//               <div className="h-px w-8 bg-white/30 mx-auto mb-3 transition-all duration-500 group-hover:w-12 group-hover:bg-white/50" />

//               {/* Label */}
//               <p className="font-poppins text-[10px] text-white/65 font-medium leading-tight uppercase tracking-widest group-hover:text-white/85 transition-colors duration-300">
//                 {stat.label}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";

interface Stat {
  value: number;
  label: string;
}

const FALLBACK_STATS: Stat[] = [
  { value: 0, label: "Profiles" },
  { value: 0, label: "Organizations" },
  { value: 0, label: "Research Outputs" },
  { value: 0, label: "Projects" },
  { value: 0, label: "Impacts" },
  { value: 0, label: "Prizes" },
  { value: 0, label: "Equipment" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CounterSection() {
  const [stats, setStats] = useState<Stat[]>(FALLBACK_STATS);
  const [counts, setCounts] = useState<number[]>(
    new Array(FALLBACK_STATS.length).fill(0),
  );
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const hasAnimatedRef = useRef(false);

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
          const parsed = arr.map((item: unknown) => ({
            value: Number((item as { value?: number })?.value) || 0,
            label: String((item as { label?: string })?.label || ""),
          }));
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
  }, [stats]);

  const formatNumber = (num: number) => {
    const n = Math.round(Number(num) || 0);
    return n.toLocaleString();
  };

  // ── Single section — no DOM swap, no opacity gate ──────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 lg:py-32"
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/image/benduluim.png')] bg-cover bg-center bg-fixed" />
      {/* Orange overlay */}
      <div className="absolute inset-0 bg-[#EC601B]/80" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EC601B]/30 via-transparent to-[#EC601B]/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.42em] text-white/50"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Since 1976
          </motion.p>

          <motion.h2
            className="font-poppins text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <SplitText
              text="50 Year"
              className="font-poppins font-semibold relative z-10"
              delay={40}
              duration={1}
              ease="easeOut"
              splitType="chars"
              from={{ opacity: 0, y: 10 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
            />{" "}
            <span className="font-light opacity-90">Journey Supporting</span>
            <br className="hidden sm:block" />{" "}
            <span className="font-light tracking-wide opacity-80">
              Science, Technology, and Innovation
            </span>
          </motion.h2>
        </div>

        {/* Stats Grid — no entry animation to avoid flash */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border border-white/15 bg-white/8 backdrop-blur-sm p-5 text-center"
            >
              {/* Number */}
              <div className="mb-3 font-poppins text-3xl font-semibold tabular-nums text-white lg:text-4xl">
                {loading ? "—" : formatNumber(counts[index] ?? stat.value)}
              </div>

              {/* Divider */}
              <div className="h-px w-8 bg-white/30 mx-auto mb-3" />

              {/* Label */}
              <p className="font-poppins text-[10px] text-white/65 font-medium leading-tight uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
