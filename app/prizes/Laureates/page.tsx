// "use client";

// import { useMemo, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   motion,
//   AnimatePresence,
//   useInView,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
// } from "react-simple-maps";
// import { LAUREATES, type Laureate, type PrizeKey } from "@/src/data/laureates";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// /* ------------------------------------------------------------------ */
// /*  Brand palette — orange + light blue only (navy = text)            */
// /* ------------------------------------------------------------------ */
// const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// const STAGGER = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
// };
// const RISE = {
//   hidden: { opacity: 0, y: 26 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
// };
// const ORANGE = "#EC601B";
// const BLUE = "#7DC0F1";
// const GEO_URL =
//   "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// const ALL_YEARS = [...new Set(LAUREATES.map((l) => l.year))].sort(
//   (a, b) => b - a,
// );
// const LATEST_YEAR = ALL_YEARS[0];

// /* Al-Sumait carries the blue, the two Arab programmes carry orange */
// const accentOf = (p: PrizeKey) => (p === "sumait" ? BLUE : ORANGE);

// const PRIZES: {
//   key: PrizeKey;
//   name: string;
//   tab: string;
//   line: string;
//   image: string;
// }[] = [
//   {
//     key: "kuwait",
//     name: "Kuwait Prize",
//     tab: "Kuwait Prize",
//     line: "For distinguished Arab researchers, awarded annually since 1979.",
//     image: "/image/KuwaitPrize.webp",
//   },
//   {
//     key: "jaber",
//     name: "Jaber Al-Ahmad Award",
//     tab: "Jaber Al-Ahmad",
//     line: "For outstanding young Kuwaiti researchers.",
//     image: "/image/jaberPrize.webp",
//   },
//   {
//     key: "sumait",
//     name: "Al-Sumait Prize",
//     tab: "Al-Sumait",
//     line: "For African development in health, food security, and education.",
//     image: "/image/alsumaitPrize.webp",
//   },
// ];
// const PRIZE_LABEL: Record<PrizeKey, string> = {
//   kuwait: "Kuwait Prize",
//   jaber: "Jaber Al-Ahmad",
//   sumait: "Al-Sumait",
// };

// /* ------------------------------------------------------------------ */
// /*  Country normalisation + coordinates  [lng, lat]                    */
// /* ------------------------------------------------------------------ */
// const COUNTRY_FIX: Record<string, string> = {
//   Nairobi: "Kenya",
//   "Abidjan, Côte d’Ivoire": "Côte d’Ivoire",
// };
// const countryOf = (l: Laureate) =>
//   l.country ? (COUNTRY_FIX[l.country] ?? l.country) : "";

// const COORDS: Record<string, [number, number]> = {
//   Kuwait: [47.9, 29.3],
//   Egypt: [30.8, 26.8],
//   Lebanon: [35.8, 33.9],
//   Syria: [38.0, 35.0],
//   Jordan: [36.2, 31.2],
//   Tunisia: [9.5, 34.0],
//   Palestine: [35.2, 31.9],
//   Iraq: [43.7, 33.2],
//   Morocco: [-6.8, 31.8],
//   Algeria: [2.6, 28.0],
//   "Saudi Arabia": [45.0, 23.9],
//   Yemen: [48.5, 15.5],
//   Sudan: [30.2, 15.5],
//   Turkey: [35.2, 38.9],
//   Uganda: [32.3, 1.4],
//   Kenya: [37.9, 0.2],
//   "South Africa": [24.0, -29.0],
//   Nigeria: [8.7, 9.1],
//   Tanzania: [34.9, -6.4],
//   Cameroon: [12.4, 7.4],
//   Ghana: [-1.0, 7.9],
//   "Burkina Faso": [-1.6, 12.2],
//   "Côte d’Ivoire": [-5.5, 7.5],
//   UK: [-1.5, 52.4],
//   USA: [-98.5, 39.8],
//   Peru: [-75.0, -9.2],
// };

// /* ------------------------------------------------------------------ */
// /*  Primitives                                                         */
// /* ------------------------------------------------------------------ */
// function FadeUp({
//   children,
//   delay = 0,
//   className = "",
//   y = 26,
// }: {
//   children: React.ReactNode;
//   delay?: number;
//   className?: string;
//   y?: number;
// }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-70px" });
//   return (
//     <motion.div
//       ref={ref}
//       className={className}
//       initial={{ opacity: 0, y }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.65, delay, ease: EASE }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function SectionHead({
//   kicker,
//   title,
//   intro,
//   color = ORANGE,
// }: {
//   kicker: string;
//   title: string;
//   intro?: string;
//   color?: string;
// }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-70px" });

//   return (
//     <div ref={ref} className="lg:sticky lg:top-28">
//       <motion.div
//         className="flex items-center gap-3"
//         initial={{ opacity: 0, x: -16 }}
//         animate={inView ? { opacity: 1, x: 0 } : {}}
//         transition={{ duration: 0.55, ease: EASE }}
//       >
//         <span
//           className="h-3 w-8 rounded-sm"
//           style={{ backgroundColor: color }}
//         />
//         <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D2D44]/70">
//           {kicker}
//         </span>
//       </motion.div>
//       <motion.h2
//         className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#1D2D44] sm:text-4xl"
//         initial={{ opacity: 0, y: 20 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
//       >
//         {title}
//       </motion.h2>
//       {intro ? (
//         <motion.p
//           className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#1D2D44]/70"
//           initial={{ opacity: 0, y: 16 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
//         >
//           {intro}
//         </motion.p>
//       ) : null}
//     </div>
//   );
// }

// /* centered section heading (used by map) */
// function CenterHead({
//   kicker,
//   title,
//   intro,
// }: {
//   kicker: string;
//   title: string;
//   intro?: string;
// }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-70px" });

//   return (
//     <div ref={ref} className="mx-auto max-w-2xl text-center">
//       <motion.div
//         className="flex items-center justify-center gap-3"
//         initial={{ opacity: 0, y: 16 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.55, ease: EASE }}
//       >
//         <span
//           className="h-3 w-8 rounded-sm"
//           style={{ backgroundColor: ORANGE }}
//         />
//         <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D2D44]/70">
//           {kicker}
//         </span>
//       </motion.div>
//       <motion.h2
//         className="mt-4 text-3xl font-semibold tracking-tight text-[#1D2D44] sm:text-4xl"
//         initial={{ opacity: 0, y: 20 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
//       >
//         {title}
//       </motion.h2>
//       {intro ? (
//         <motion.p
//           className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#1D2D44]/70"
//           initial={{ opacity: 0, y: 16 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
//         >
//           {intro}
//         </motion.p>
//       ) : null}
//     </div>
//   );
// }

// function Portrait({
//   src,
//   name,
//   accent,
// }: {
//   src?: string;
//   name: string;
//   accent: string;
// }) {
//   if (src) {
//     return (
//       <motion.div
//         className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#1D2D44]/[0.04]"
//         whileHover={{ scale: 1.03 }}
//         transition={{ duration: 0.35, ease: EASE }}
//       >
//         <Image
//           src={src}
//           alt={name}
//           fill
//           sizes="(min-width:1024px) 28vw, 45vw"
//           loading="lazy"
//           className="object-cover"
//         />
//       </motion.div>
//     );
//   }
//   return (
//     <div
//       className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
//       style={{
//         backgroundColor: "rgba(29,45,68,0.03)",
//         backgroundImage:
//           "radial-gradient(rgba(29,45,68,0.10) 1px, transparent 1px)",
//         backgroundSize: "14px 14px",
//       }}
//     >
//       <span
//         className="absolute left-0 top-0 h-7 w-7"
//         style={{
//           backgroundColor: accent,
//           clipPath: "polygon(0 0, 100% 0, 0 100%)",
//         }}
//       />
//       <div className="absolute inset-0 flex items-center justify-center">
//         <svg
//           width="44"
//           height="44"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="#1D2D44"
//           strokeOpacity="0.28"
//           strokeWidth="1.5"
//         >
//           <circle cx="12" cy="8" r="4" />
//           <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
//         </svg>
//       </div>
//     </div>
//   );
// }

// function FieldTag({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="inline-flex items-center rounded-full bg-[#7DC0F1]/[0.18] px-3 py-1 text-xs font-medium text-[#1D2D44]">
//       {children}
//     </span>
//   );
// }

// /* small coloured prize label */
// function PrizeTag({ prize }: { prize: PrizeKey }) {
//   return (
//     <span
//       className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
//       style={{ color: accentOf(prize) }}
//     >
//       <span
//         className="h-1.5 w-1.5 rounded-full"
//         style={{ backgroundColor: accentOf(prize) }}
//       />
//       {PRIZE_LABEL[prize]}
//     </span>
//   );
// }

// function LaureateRow({ l, showPrize }: { l: Laureate; showPrize?: boolean }) {
//   return (
//     <>
//       <div className="min-w-0">
//         {showPrize ? (
//           <div className="mb-1">
//             <PrizeTag prize={l.prize} />
//           </div>
//         ) : null}
//         <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
//           <span className="text-lg font-semibold tracking-tight text-[#1D2D44]">
//             {l.name}
//           </span>
//           {l.country ? (
//             <span className="text-sm text-[#1D2D44]/55">{l.country}</span>
//           ) : null}
//           {l.status === "shared" ? (
//             <span className="rounded-full border border-[#1D2D44]/[0.12] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#1D2D44]/55">
//               Shared
//             </span>
//           ) : null}
//         </div>
//         {l.brief ? (
//           <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#1D2D44]/70">
//             {l.brief}
//           </p>
//         ) : null}
//       </div>
//       <div className="flex shrink-0 items-center gap-2">
//         <FieldTag>{l.field}</FieldTag>
//       </div>
//     </>
//   );
// }

// function YearGroup({
//   year,
//   items,
//   showPrize,
// }: {
//   year: number;
//   items: Laureate[];
//   showPrize?: boolean;
// }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });

//   return (
//     <motion.div
//       ref={ref}
//       className="grid grid-cols-1 gap-2 border-t border-[#1D2D44]/[0.08] py-3 sm:grid-cols-[4.5rem_1fr] sm:gap-8"
//       initial={{ opacity: 0, y: 18 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, ease: EASE }}
//     >
//       <div className="pt-5">
//         <motion.span
//           className="text-2xl font-semibold tabular-nums tracking-tight text-[#1D2D44]/85"
//           initial={{ opacity: 0, x: -12 }}
//           animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
//         >
//           {year}
//         </motion.span>
//       </div>
//       <motion.ul
//         className="divide-y divide-[#1D2D44]/[0.08]"
//         variants={STAGGER}
//         initial="hidden"
//         animate={inView ? "show" : "hidden"}
//       >
//         {items.map((l) => (
//           <motion.li
//             key={l.id}
//             variants={RISE}
//             className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
//           >
//             <LaureateRow l={l} showPrize={showPrize} />
//           </motion.li>
//         ))}
//       </motion.ul>
//     </motion.div>
//   );
// }

// /* Latest winners — one column per prize */
// function LatestColumn({
//   prizeKey,
//   year,
//   winners,
// }: {
//   prizeKey: PrizeKey;
//   year: number;
//   winners: Laureate[];
// }) {
//   const accent = accentOf(prizeKey);
//   return (
//     <motion.div
//       className="flex h-full flex-col rounded-2xl border border-[#1D2D44]/[0.08] bg-white p-6 shadow-[0_2px_24px_-12px_rgba(29,45,68,0.18)]"
//       whileHover={{
//         y: -6,
//         boxShadow: "0 12px 34px -14px rgba(29,45,68,0.22)",
//       }}
//       transition={{ duration: 0.3, ease: EASE }}
//     >
//       <div
//         className="flex items-center justify-between border-b-2 pb-3"
//         style={{ borderColor: accent }}
//       >
//         <h3 className="text-base font-semibold text-[#1D2D44]">
//           {PRIZE_LABEL[prizeKey]}
//         </h3>
//         <span className="rounded-full bg-[#7DC0F1]/[0.18] px-2.5 py-0.5 text-xs font-semibold text-[#1D2D44]">
//           {year}
//         </span>
//       </div>
//       <motion.div
//         className="mt-5 space-y-6"
//         variants={STAGGER}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, margin: "-40px" }}
//       >
//         {winners.map((l) => (
//           <motion.div
//             key={l.id}
//             variants={RISE}
//             className="grid grid-cols-[64px_1fr] gap-4"
//           >
//             <div className="w-16">
//               <Portrait src={l.image} name={l.name} accent={accent} />
//             </div>
//             <div className="min-w-0">
//               <h4 className="text-[15px] font-semibold leading-snug tracking-tight text-[#1D2D44]">
//                 {l.name}
//               </h4>
//               <p className="mt-1 text-[13px] leading-snug text-[#1D2D44]/60">
//                 {l.field}
//               </p>
//               {l.country ? (
//                 <p className="mt-0.5 text-xs text-[#1D2D44]/45">{l.country}</p>
//               ) : null}
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  World map — centered, panel below                                  */
// /* ------------------------------------------------------------------ */
// function WorldSection() {
//   const { counts, dominant } = useMemo(() => {
//     const counts = new Map<string, number>();
//     const perPrize = new Map<string, Record<PrizeKey, number>>();
//     for (const l of LAUREATES) {
//       const c = countryOf(l);
//       if (!c) continue;
//       counts.set(c, (counts.get(c) ?? 0) + 1);
//       const rec = perPrize.get(c) ?? { kuwait: 0, jaber: 0, sumait: 0 };
//       rec[l.prize]++;
//       perPrize.set(c, rec);
//     }
//     const dominant = new Map<string, PrizeKey>();
//     perPrize.forEach((rec, c) =>
//       dominant.set(
//         c,
//         Object.entries(rec).sort((a, b) => b[1] - a[1])[0][0] as PrizeKey,
//       ),
//     );
//     return { counts, dominant };
//   }, []);

//   const markers = useMemo(
//     () =>
//       [...counts.entries()]
//         .filter(([c]) => COORDS[c])
//         .map(([c, n]) => ({
//           name: c,
//           count: n,
//           coords: COORDS[c],
//           prize: dominant.get(c)!,
//         }))
//         .sort((a, b) => b.count - a.count),
//     [counts, dominant],
//   );

//   const [selected, setSelected] = useState<string | null>(null);
//   const [hovered, setHovered] = useState<string | null>(null);

//   const radius = (n: number) => Math.min(16, 4 + Math.sqrt(n) * 1.15);

//   return (
//     <section className="bg-white">
//       <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
//         <CenterHead
//           kicker="Worldwide"
//           title="Laureates around the world"
//           intro="Click a point to see the laureates from that country."
//         />

//         <motion.div
//           className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2"
//           variants={STAGGER}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, margin: "-80px" }}
//         >
//           {[
//             { color: ORANGE, label: "Kuwait Prize & Jaber Al-Ahmad" },
//             { color: BLUE, label: "Al-Sumait Prize" },
//           ].map((item) => (
//             <motion.span
//               key={item.label}
//               variants={RISE}
//               className="flex items-center gap-2 text-xs font-medium text-[#1D2D44]/75"
//             >
//               <span
//                 className="h-2.5 w-2.5 rounded-full"
//                 style={{ backgroundColor: item.color }}
//               />
//               {item.label}
//             </motion.span>
//           ))}
//         </motion.div>

//         {/* big, borderless map blended into the section */}
//         <motion.div
//           className="mx-auto mt-6"
//           initial={{ opacity: 0, scale: 0.97 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.8, ease: EASE }}
//         >
//           <div className="-mx-6 lg:mx-0">
//             <ComposableMap
//               projection="geoEqualEarth"
//               projectionConfig={{ scale: 178, center: [10, 11] }}
//               style={{ width: "100%", height: "auto" }}
//             >
//               <Geographies geography={GEO_URL}>
//                 {({ geographies }) =>
//                   geographies.map((geo) => (
//                     <Geography
//                       key={geo.rsmKey}
//                       geography={geo}
//                       fill="#EAF1F7"
//                       stroke="#FFFFFF"
//                       strokeWidth={0.6}
//                       style={{
//                         default: { outline: "none" },
//                         hover: { outline: "none", fill: "#DEE9F2" },
//                         pressed: { outline: "none" },
//                       }}
//                     />
//                   ))
//                 }
//               </Geographies>
//               {markers.map((m, i) => {
//                 const active = selected === m.name;
//                 const color = accentOf(m.prize);
//                 return (
//                   <Marker
//                     key={m.name}
//                     coordinates={m.coords}
//                     onClick={() => setSelected(m.name)}
//                     onMouseEnter={() => setHovered(m.name)}
//                     onMouseLeave={() => setHovered(null)}
//                     style={{
//                       default: { cursor: "pointer" },
//                       hover: { cursor: "pointer" },
//                       pressed: {},
//                     }}
//                   >
//                     {active ? (
//                       <circle
//                         r={radius(m.count) + 5}
//                         fill="none"
//                         stroke="rgba(29,45,68,0.40)"
//                         strokeWidth={1.5}
//                       />
//                     ) : null}
//                     <motion.circle
//                       r={radius(m.count)}
//                       fill={color}
//                       stroke="#FFFFFF"
//                       strokeWidth={1.25}
//                       initial={{ opacity: 0, scale: 0 }}
//                       whileInView={{ opacity: active ? 1 : 0.85, scale: 1 }}
//                       viewport={{ once: true }}
//                       transition={{
//                         duration: 0.4,
//                         delay: 0.15 + i * 0.022,
//                         ease: EASE,
//                       }}
//                       style={{
//                         transformBox: "fill-box",
//                         transformOrigin: "center",
//                       }}
//                     >
//                       <title>{`${m.name} — ${m.count}`}</title>
//                     </motion.circle>
//                     {hovered === m.name ? (
//                       <text
//                         textAnchor="middle"
//                         y={-radius(m.count) - 7}
//                         stroke="#FFFFFF"
//                         strokeWidth={3}
//                         paintOrder="stroke"
//                         style={{
//                           fontSize: 11,
//                           fontWeight: 700,
//                           fill: "#1D2D44",
//                           pointerEvents: "none",
//                         }}
//                       >
//                         {m.name} ({m.count})
//                       </text>
//                     ) : null}
//                   </Marker>
//                 );
//               })}
//             </ComposableMap>
//           </div>
//           <p className="mt-4 text-center text-xs text-[#1D2D44]/45">
//             Point size reflects the number of laureates · {markers.length}{" "}
//             countries represented
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Page                                                               */
// /* ------------------------------------------------------------------ */
// export default function LaureatesPage() {
//   const heroRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

//   // browse-all control — year only
//   const [yearFilter, setYearFilter] = useState<"all" | number>(LATEST_YEAR);

//   const introRef = useRef(null);
//   const introInView = useInView(introRef, { once: true, margin: "-80px" });
//   const latestRef = useRef(null);
//   const latestInView = useInView(latestRef, { once: true, margin: "-80px" });

//   const totals = useMemo(() => {
//     const t: Record<PrizeKey, number> = { kuwait: 0, jaber: 0, sumait: 0 };
//     for (const l of LAUREATES) t[l.prize]++;
//     return t;
//   }, []);

//   const latest = useMemo(
//     () =>
//       PRIZES.map((p) => {
//         const items = LAUREATES.filter((l) => l.prize === p.key);
//         const year = Math.max(...items.map((l) => l.year));
//         return {
//           key: p.key,
//           year,
//           winners: items.filter((l) => l.year === year).slice(0, 3),
//         };
//       }),
//     [],
//   );

//   const years = ALL_YEARS;

//   // unified browse: all winners, filtered by year, grouped by year
//   const grouped = useMemo(() => {
//     const list = LAUREATES.filter(
//       (l) => yearFilter === "all" || l.year === yearFilter,
//     );
//     const byYear = new Map<number, Laureate[]>();
//     for (const l of list) {
//       const arr = byYear.get(l.year) ?? [];
//       arr.push(l);
//       byYear.set(l.year, arr);
//     }
//     // order within a year: kuwait, jaber, sumait
//     const order: Record<PrizeKey, number> = { kuwait: 0, jaber: 1, sumait: 2 };
//     byYear.forEach((arr) =>
//       arr.sort((a, b) => order[a.prize] - order[b.prize]),
//     );
//     return {
//       count: list.length,
//       groups: [...byYear.entries()].sort((a, b) => b[0] - a[0]),
//     };
//   }, [yearFilter]);

//   return (
//     <>
//       <Header
//         logo="/image/logo_c.png"
//         logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
//         forceWhiteBackground
//       />
//       <main className="min-h-screen bg-white font-poppins">
//         {/* ── Hero — full bleed, header overlays on top ── */}
//         <section
//           ref={heroRef}
//           className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#121820]"
//         >
//           <div className="absolute inset-0">
//             <Image
//               src="/image/Prizes1.png"
//               alt="KFAS laureates"
//               fill
//               priority
//               quality={65}
//               sizes="100vw"
//               className="object-cover object-[center_40%] scale-[1.06] brightness-[0.98] contrast-[1.02]"
//             />
//             <div
//               className="absolute inset-0 pointer-events-none"
//               aria-hidden
//               style={{
//                 background: [
//                   "linear-gradient(128deg, rgba(72,143,204,0.34) 0%, rgba(72,143,204,0.09) 44%, transparent 70%)",
//                   "radial-gradient(ellipse 90% 65% at 10% 6%, rgba(200,220,250,0.16) 0%, transparent 58%)",
//                   "linear-gradient(to bottom, rgba(18,24,32,0.14) 0%, rgba(29,45,68,0.3) 42%, rgba(10,14,22,0.8) 100%)",
//                 ].join(", "),
//               }}
//             />
//           </div>

//           <motion.div
//             className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
//             style={{ opacity: heroOpacity }}
//           >
//             <motion.div
//               className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, ease: EASE }}
//             >
//               <Link href="/prizes" className="transition hover:text-white/80">
//                 Prizes
//               </Link>
//               <span className="text-white/25">/</span>
//               <span className="text-white/80">Laureates</span>
//             </motion.div>

//             <div className="overflow-hidden">
//               <motion.h1
//                 className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_0_2px_28px_rgba(0,0,0,0.45),_0_1px_2px_rgba(0,0,0,0.35)]"
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
//               >
//                 Laureates
//               </motion.h1>
//             </div>

//             <motion.div
//               className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
//               initial={{ scaleX: 0, opacity: 0 }}
//               animate={{ scaleX: 1, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
//               style={{ width: 72 }}
//             />
//           </motion.div>

//           <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
//         </section>

//         {/* ============================== INTRODUCTION ============================== */}
//         <section ref={introRef} className="bg-white">
//           <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
//             <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
//               <div className="lg:col-span-4">
//                 <SectionHead
//                   kicker="Since 1979"
//                   title="Prizes at KFAS"
//                   intro="Three programmes recognising scientific excellence across the Arab world and Africa."
//                 />
//               </div>
//               <motion.div
//                 variants={STAGGER}
//                 initial="hidden"
//                 animate={introInView ? "show" : "hidden"}
//                 className="lg:col-span-8"
//               >
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
//                   {PRIZES.map((p) => (
//                     <motion.div
//                       key={p.key}
//                       variants={RISE}
//                       whileHover={{ y: -6, scale: 1.01 }}
//                       transition={{ duration: 0.3, ease: EASE }}
//                       className="flex flex-col overflow-hidden rounded-2xl border border-[#1D2D44]/[0.08] bg-white shadow-[0_2px_24px_-14px_rgba(29,45,68,0.18)]"
//                     >
//                       <div className="flex items-center justify-center bg-[#1D2D44]/[0.03] px-6 py-8">
//                         <motion.div
//                           whileHover={{ scale: 1.06 }}
//                           transition={{ duration: 0.35, ease: EASE }}
//                         >
//                           <Image
//                             src={p.image}
//                             alt={p.name}
//                             width={160}
//                             height={160}
//                             className="h-28 w-auto object-contain sm:h-32"
//                             sizes="160px"
//                           />
//                         </motion.div>
//                       </div>
//                       <div className="p-5">
//                         <span
//                           className="block h-1.5 w-10 rounded-full"
//                           style={{ backgroundColor: accentOf(p.key) }}
//                         />
//                         <motion.div
//                           className="mt-4 text-4xl font-semibold tracking-tight text-[#1D2D44]"
//                           initial={{ opacity: 0, scale: 0.9 }}
//                           animate={introInView ? { opacity: 1, scale: 1 } : {}}
//                           transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
//                         >
//                           {totals[p.key]}
//                         </motion.div>
//                         <div className="mt-2 text-base font-semibold text-[#1D2D44]">
//                           {p.name}
//                         </div>
//                         <p className="mt-1.5 text-sm leading-relaxed text-[#1D2D44]/65">
//                           {p.line}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* ============================== LATEST WINNERS ============================== */}
//         <section ref={latestRef} className="bg-[#7DC0F1]/[0.06]">
//           <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
//             <FadeUp>
//               <div className="flex items-center gap-3">
//                 <span
//                   className="h-3 w-8 rounded-sm"
//                   style={{ backgroundColor: ORANGE }}
//                 />
//                 <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D2D44]/70">
//                   Most recent
//                 </span>
//               </div>
//               <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1D2D44] sm:text-4xl">
//                 Latest winners
//               </h2>
//               <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#1D2D44]/70">
//                 The most recent laureates from each of the three programmes.
//               </p>
//             </FadeUp>

//             <motion.div
//               variants={STAGGER}
//               initial="hidden"
//               animate={latestInView ? "show" : "hidden"}
//               className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
//             >
//               {latest.map((c) => (
//                 <motion.div key={c.key} variants={RISE}>
//                   <LatestColumn
//                     prizeKey={c.key}
//                     year={c.year}
//                     winners={c.winners}
//                   />
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* ============================== WORLD MAP ============================== */}
//         <WorldSection />

//         {/* ============================== BROWSE ALL — by year ============================== */}
//         <section className="bg-[#7DC0F1]/[0.06]">
//           <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
//             <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
//               <div className="lg:col-span-4">
//                 <SectionHead
//                   kicker="The honour roll"
//                   title="Browse by year"
//                   intro="Every laureate across the three programmes, newest first."
//                 />
//               </div>

//               <div className="lg:col-span-8">
//                 {/* simple toolbar: year only */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 16 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-80px" }}
//                   transition={{ duration: 0.5, ease: EASE }}
//                   className="flex items-center justify-between gap-4 border-b border-[#1D2D44]/[0.10] pb-6"
//                 >
//                   <label className="flex items-center gap-2 text-sm text-[#1D2D44]/70">
//                     Year
//                     <select
//                       value={String(yearFilter)}
//                       onChange={(e) =>
//                         setYearFilter(
//                           e.target.value === "all"
//                             ? "all"
//                             : Number(e.target.value),
//                         )
//                       }
//                       className="rounded-sm border border-[#1D2D44]/[0.16] bg-white px-3 py-1.5 text-sm font-medium text-[#1D2D44] outline-none transition focus:border-[#EC601B]"
//                     >
//                       <option value="all">All years</option>
//                       {years.map((y) => (
//                         <option key={y} value={y}>
//                           {y}
//                         </option>
//                       ))}
//                     </select>
//                   </label>
//                   <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#1D2D44]/45">
//                     {grouped.count}{" "}
//                     {grouped.count === 1 ? "laureate" : "laureates"}
//                   </span>
//                 </motion.div>

//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={String(yearFilter)}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.3, ease: EASE }}
//                     className="mt-2"
//                   >
//                     {grouped.groups.length === 0 ? (
//                       <p className="border-t border-[#1D2D44]/[0.08] py-12 text-[#1D2D44]/55">
//                         No laureates match this filter.
//                       </p>
//                     ) : (
//                       grouped.groups.map(([year, items]) => (
//                         <YearGroup
//                           key={year}
//                           year={year}
//                           items={items}
//                           showPrize
//                         />
//                       ))
//                     )}
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer
//         logo="/image/logoFooter.png"
//         logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
//       />
//     </>
//   );
// }
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
}[] = [
  {
    key: "kuwait",
    name: "Kuwait Prize",
    tab: "Kuwait Prize",
    line: "For distinguished Arab researchers, awarded annually since 1979.",
    image: "/image/KuwaitPrize.webp",
  },
  {
    key: "jaber",
    name: "Jaber Al-Ahmad Award",
    tab: "Jaber Al-Ahmad",
    line: "For outstanding young Kuwaiti researchers.",
    image: "/image/jaberPrize.webp",
  },
  {
    key: "sumait",
    name: "Al-Sumait Prize",
    tab: "Al-Sumait",
    line: "For African development in health, food security, and education.",
    image: "/image/alsumaitPrize.webp",
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
}: {
  src: string;
  alt: string;
  color: string;
  size?: number;
  dim?: boolean;
  lit?: boolean;
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
        className="relative grid h-full w-full place-items-center overflow-hidden rounded-full bg-[#1D2D44]/[0.03]"
        style={{ boxShadow: `inset 0 0 0 3px ${color}` }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          sizes={`${size}px`}
          className="h-[72%] w-[72%] object-contain"
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

/* Latest winners — one column per prize */
function LatestColumn({
  prizeKey,
  year,
  winners,
}: {
  prizeKey: PrizeKey;
  year: number;
  winners: Laureate[];
}) {
  const accent = accentOf(prizeKey);
  return (
    <motion.div
      className="flex h-full flex-col rounded-2xl border border-[#1D2D44]/[0.08] bg-white p-6 shadow-[0_2px_24px_-12px_rgba(29,45,68,0.18)]"
      whileHover={{
        y: -6,
        boxShadow: "0 12px 34px -14px rgba(29,45,68,0.22)",
      }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <div
        className="flex items-center justify-between border-b pb-3"
        style={{ borderColor: accent }}
      >
        <h3 className="text-base font-semibold text-[#1D2D44]">
          {PRIZE_LABEL[prizeKey]}
        </h3>
        <span className="rounded-full bg-[#7DC0F1]/[0.18] px-2.5 py-0.5 text-xs font-semibold text-[#1D2D44]">
          {year}
        </span>
      </div>
      <motion.div
        className="mt-5 space-y-6"
        variants={STAGGER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {winners.map((l) => (
          <motion.div
            key={l.id}
            variants={RISE}
            className="grid grid-cols-[64px_1fr] gap-4"
          >
            <div className="w-16">
              <Portrait src={l.image} name={l.name} accent={accent} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[15px] font-semibold leading-snug tracking-tight text-[#1D2D44]">
                {l.name}
              </h4>
              <p className="mt-1 text-[13px] leading-snug text-[#1D2D44]/60">
                {l.field}
              </p>
              {l.country ? (
                <p className="mt-0.5 text-xs text-[#1D2D44]/45">{l.country}</p>
              ) : null}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
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
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-44, 44]);
  const bgY = reduce ? 0 : rawY;

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
    <section ref={ref} className="relative overflow-hidden bg-white">
      {/* background image — parallax; tune `opacity-[…]` + wash strength */}
      <motion.div
        className="pointer-events-none absolute -inset-y-16 left-0 right-0"
        aria-hidden
        style={{ y: bgY }}
      >
        <Image
          src="/image/O.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.3]"
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/85 via-white/35 to-white/85"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px] px-6 py-24 lg:px-8 lg:py-28">
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
                return (
                  <Marker
                    key={m.name}
                    coordinates={m.coords}
                    onClick={() => setSelected(m.name)}
                    onMouseEnter={() => setHovered(m.name)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      default: { cursor: "pointer" },
                      hover: { cursor: "pointer" },
                      pressed: {},
                    }}
                  >
                    {active ? (
                      <circle
                        r={radius(m.count) + 5}
                        fill="none"
                        stroke="rgba(29,45,68,0.40)"
                        strokeWidth={1.5}
                      />
                    ) : null}
                    {inLit ? (
                      <motion.circle
                        r={radius(m.count) + 6}
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
                        r: radius(m.count) * (inLit ? 1.18 : 1),
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
                      }}
                    >
                      <title>{`${m.name} — ${m.count}`}</title>
                    </motion.circle>
                    {hovered === m.name ? (
                      <text
                        textAnchor="middle"
                        y={-radius(m.count) - 7}
                        stroke="#FFFFFF"
                        strokeWidth={3}
                        paintOrder="stroke"
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          fill: "#1D2D44",
                          pointerEvents: "none",
                        }}
                      >
                        {m.name} ({m.count})
                      </text>
                    ) : null}
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>
          <p className="mt-4 text-center text-xs text-[#1D2D44]/45">
            Point size reflects the number of laureates · {markers.length}{" "}
            countries represented
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

  const latest = useMemo(
    () =>
      PRIZES.map((p) => {
        const items = LAUREATES.filter((l) => l.prize === p.key);
        const year = Math.max(...items.map((l) => l.year));
        return {
          key: p.key,
          year,
          winners: items.filter((l) => l.year === year).slice(0, 3),
        };
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
        <section ref={introRef} className="bg-white">
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <SectionHead
                  kicker="Since 1979"
                  title="Prizes at KFAS"
                  intro="Three programmes recognising scientific excellence across the Arab world and Africa."
                />
              </div>

              {/* right side — three medals */}
              <motion.div
                variants={STAGGER}
                initial="hidden"
                animate={introInView ? "show" : "hidden"}
                className="lg:col-span-7"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {PRIZES.map((p) => (
                    <motion.div
                      key={p.key}
                      variants={RISE}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex flex-col items-center text-center"
                    >
                      <Medal
                        src={p.image}
                        alt={p.name}
                        color={accentOf(p.key)}
                        size={132}
                      />
                      <div className="mt-5 text-base font-semibold text-[#1D2D44]">
                        {p.name}
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#1D2D44]/65">
                        {p.line}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================== LATEST WINNERS ============================== */}
        <section ref={latestRef} className="bg-[#7DC0F1]/[0.06]">
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
            <FadeUp>
              <div className="flex items-center gap-3">
                <span
                  className="h-0.5 w-12 rounded-full"
                  style={{ backgroundColor: ORANGE }}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D2D44]/70">
                  Most recent
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1D2D44] sm:text-4xl">
                Latest winners
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#1D2D44]/70">
                The most recent laureates from each of the three programmes.
              </p>
            </FadeUp>

            <motion.div
              variants={STAGGER}
              initial="hidden"
              animate={latestInView ? "show" : "hidden"}
              className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
            >
              {latest.map((c) => (
                <motion.div key={c.key} variants={RISE}>
                  <LatestColumn
                    prizeKey={c.key}
                    year={c.year}
                    winners={c.winners}
                  />
                </motion.div>
              ))}
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
