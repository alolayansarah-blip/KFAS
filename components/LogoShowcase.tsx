"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 };

type PartnerTile = {
  title: string;
  description: string;
  href: string;
  image: string;
  logo?: string;
  placeholder?: boolean;
  /** Default true — set false for logos with dark/colored artwork (e.g. SACA) */
  logoInvert?: boolean;
  /** White pill behind logo when invert is off */
  logoLightBg?: boolean;
  panelLogoMaxWidth?: number;
  panelLogoScale?: number;
};

function PartnerLogo({
  tile,
  large = false,
  active = true,
}: {
  tile: PartnerTile;
  large?: boolean;
  active?: boolean;
}) {
  if (!tile.logo) return null;

  const invert = tile.logoInvert !== false;
  const largeClass = "h-full w-auto object-contain object-left";
  const img = (
    <img
      src={tile.logo}
      alt={tile.title}
      className={
        large
          ? largeClass
          : "mx-auto max-h-[40px] w-auto max-w-[110px] object-contain transition-all duration-500 sm:max-h-[46px]"
      }
      style={{
        ...(invert ? { filter: "brightness(0) invert(1)" } : {}),
        opacity: invert ? (active ? 1 : 0.5) : active ? 1 : 0.85,
        ...(large
          ? {
              maxWidth: tile.panelLogoMaxWidth ?? 280,
              ...(tile.panelLogoScale
                ? {
                    transform: `scale(${tile.panelLogoScale})`,
                    transformOrigin: "left center",
                  }
                : {}),
            }
          : {}),
      }}
    />
  );

  if (tile.logoLightBg) {
    return (
      <div
        className={
          large
            ? "rounded-md bg-white px-3 py-2 shadow-sm"
            : "rounded bg-white/95 px-2 py-1.5 shadow-sm"
        }
      >
        {img}
      </div>
    );
  }

  return img;
}

function PartnerLogoPlaceholder({
  title,
  className = "",
  active = false,
  large = false,
}: {
  title: string;
  className?: string;
  active?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center justify-center rounded border border-dashed border-white/25 bg-white/[0.06]",
        large
          ? "h-full min-h-[72px] w-full max-w-[240px] px-6"
          : "h-full w-full max-w-[120px] px-3",
        active ? "opacity-100" : "opacity-50",
        className,
      ].join(" ")}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <svg
          className={large ? "h-7 w-7 text-white/35" : "h-5 w-5 text-white/35"}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
          />
        </svg>
        <span
          className={[
            "font-medium uppercase tracking-[0.14em] text-white/40",
            large ? "text-[11px]" : "text-[9px]",
          ].join(" ")}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

const tiles: PartnerTile[] = [
  {
    title: "The Scientific Center",
    description:
      "The Scientific Center of Kuwait (TSCK) is a leading national institution dedicated to promoting scientific knowledge and public scientific awareness.",
    href: "https://tsck.org.kw/",
    image: "/image/SCNew.webp",
    logo: "/image/TSCKLogo.png",
  },
  {
    title: "Sabah Al-Ahmad Center",
    description:
      "A center dedicated to nurturing talent and creativity in young individuals under the Kuwait Foundation for the Advancement of Sciences.",
    href: "https://linktr.ee/sacgc_kw",
    image: "/image/SAAC.webp",
    logo: "/image/SACA.png",
    panelLogoMaxWidth: 300,
    panelLogoScale: 1.35,
  },
  {
    title: "Advancement of Sciences",
    description:
      "An advanced research and development center focused on innovation, scientific excellence, and the dissemination of knowledge.",
    href: "https://www.aspdkw.com/",
    image: "/image/aspd.png",
    logo: "/image/aspdlogo.png",
  },
  {
    title: "Dasman Diabetes Institute",
    description:
      "Developing research projects, educational programs, and awareness-raising initiatives that improve society and combat diabetes.",
    href: "https://www.dasmaninstitute.org/",
    image: "/image/DDI.webp",
    logo: "/image/DDIlogo.png",
  },
  // ===== NEW PARTNER #5 — replace title/description/href/image/logo =====
  {
    title: "Kuwait National Space Research Center",
    description:
      "Kuwait's national center for space research, advancing scientific exploration, technology, and human-capital development under KFAS auspices.",
    href: "http://www.knsrc.org.kw/",
    image: "/image/NSRC.webp",
    logo: "/image/NSRClogo.png",
  },
  // ===== NEW PARTNER #6 — replace title/description/href/image/logo =====
  {
    title: "Sheikh Abdullah Al Salem Cultural Centre",
    description:
      "One of the world's largest cultural complexes, housing museums of natural history, science, space, and Arabic Islamic science with over 1,100 exhibits.",
    href: "https://booking.ascckw.com/ticket-selection",
    image: "/image/AbdullahAlsalemBuilding.jpg",
    logo: "/image/ABdullahAlsalem.png",
  },
];

export default function LogoShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, VIEWPORT);

  /** Default to the first partner so the left panel + background are never empty */
  const activeIndex = hoveredIndex ?? 0;
  const active = tiles[activeIndex];
  const isDefault = hoveredIndex === null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 lg:py-28"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* ---------- Background ---------- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Partner photo, crossfades on hover */}
        <AnimatePresence>
          <motion.img
            key={active.image}
            src={active.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </AnimatePresence>

        {/* Elegant gradient anchored on #7DC0F1 — lifts slightly on hover so the photo reads */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#7DC0F1] via-[#488FCC] to-[#16263b] transition-opacity duration-700"
          style={{ opacity: isDefault ? 0.92 : 0.62 }}
        />
        {/* Soft radial glow for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 15% 25%, rgba(125,192,241,0.55) 0%, rgba(125,192,241,0) 55%)",
          }}
        />
        {/* Left veil so the text column stays crisp */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c2e]/75 via-[#0f1c2e]/15 to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* ===== LEFT : heading + dynamic info (compact) ===== */}
          <div className="lg:pr-8">
            <motion.p
              className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.42em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Our Partners
            </motion.p>

            <motion.h2
              className="mb-4 font-poppins text-3xl sm:text-4xl font-semibold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              Building the Future{" "}
              <span className="font-extralight italic text-white/55">
                Together
              </span>
            </motion.h2>

            <motion.div
              className="mb-6 h-px w-28 origin-left bg-gradient-to-r from-[#EC601B]/70 via-[#7DC0F1]/40 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            />

            {/* Dynamic partner info — swaps on hover */}
            <div className="min-h-[220px] sm:min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {/* Active partner mark — ties the panel to the grid */}
                  <div className="mb-5 flex h-14 items-center overflow-visible sm:h-16 lg:h-[72px]">
                    {active.placeholder ? (
                      <PartnerLogoPlaceholder
                        title={active.title}
                        large
                        active
                      />
                    ) : (
                      <PartnerLogo tile={active} large active />
                    )}
                  </div>

                  <h3 className="mb-3 font-poppins text-2xl sm:text-3xl font-semibold text-white">
                    {active.title}
                  </h3>
                  <p className="mb-6 max-w-sm text-[14px] font-light leading-relaxed text-white/75">
                    {active.description}
                  </p>
                  <a
                    href={active.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#EC601B] transition-colors hover:text-[#ff7a36]"
                  >
                    Visit Partner
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ===== RIGHT : logo grid (2 cols on mobile, 3 cols from sm) ===== */}
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4">
            {tiles.map((tile, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.a
                  key={tile.title}
                  href={tile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`group relative block cursor-pointer ${
                    isActive ? "z-20" : ""
                  }`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.2 + index * 0.08,
                    ease: EASE,
                  }}
                >
                  <div
                    className={`relative flex aspect-square w-full flex-col items-center justify-center px-4 py-6 border transition-all duration-500 ${
                      isActive
                        ? "scale-[1.05] border-[#EC601B]/60 bg-white/10 backdrop-blur-sm"
                        : "border-white/12 bg-white/[0.04] hover:bg-white/[0.07]"
                    }`}
                  >
                    {/* Orange top bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] origin-left bg-[#EC601B] transition-transform duration-500 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />

                    {/* Logo */}
                    <div className="flex h-12 w-full items-center justify-center sm:h-14">
                      {tile.placeholder ? (
                        <PartnerLogoPlaceholder
                          title={tile.title}
                          active={isActive}
                        />
                      ) : (
                        <PartnerLogo tile={tile} active={isActive} />
                      )}
                    </div>

                    {/* Caption */}
                    <p
                      className={`mt-3.5 text-center text-[10.5px] font-medium leading-snug transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/45"
                      }`}
                    >
                      {tile.title}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
//--------------------------------------------------Code for Marquee--------------------------------------------------
// "use client";

// import { useRef, useEffect } from "react";
// import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

// const EASE = [0.16, 1, 0.3, 1] as const;
// const VIEWPORT = { once: true, amount: 0.2 };

// const tiles = [
//   {
//     title: "The Scientific Center",
//     href: "https://tsck.org.kw/",
//     logo: "/image/logo_sc.png",
//   },
//   {
//     title: "Sabah Al-Ahmad Center",
//     href: "https://linktr.ee/sacgc_kw",
//     logo: "/image/logo6.png",
//   },
//   {
//     title: "Advancement of Sciences",
//     href: "https://www.aspdkw.com/",
//     logo: "/image/logo4.png",
//   },
//   {
//     title: "Dasman Diabetes Institute",
//     href: "https://www.dasmaninstitute.org/",
//     logo: "/image/logo5.png",
//   },
// ];

// // ─── Single Marquee Row ───────────────────────────────────────────────────────

// function LogoMarquee({
//   speed = 1.0,
//   direction = "left",
// }: {
//   speed?: number;
//   direction?: "left" | "right";
// }) {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const x = useMotionValue(0);
//   const isHovered = useRef(false);

//   // For right-direction rows, start at -half so the loop is seamless
//   useEffect(() => {
//     if (direction === "right" && trackRef.current) {
//       x.set(-trackRef.current.scrollWidth / 2);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useAnimationFrame(() => {
//     if (!trackRef.current) return;
//     const half = trackRef.current.scrollWidth / 2;
//     const activeSpeed = isHovered.current ? speed * 0.22 : speed;
//     const step = direction === "left" ? -activeSpeed : activeSpeed;
//     let next = x.get() + step;

//     // Seamless loop reset
//     if (direction === "left" && next <= -half) next = 0;
//     if (direction === "right" && next >= 0) next = -half;

//     x.set(next);
//   });

//   return (
//     <div
//       className="overflow-hidden"
//       onMouseEnter={() => {
//         isHovered.current = true;
//       }}
//       onMouseLeave={() => {
//         isHovered.current = false;
//       }}
//     >
//       <motion.div
//         ref={trackRef}
//         className="flex w-max items-center gap-20"
//         style={{ x }}
//       >
//         {/* Duplicate for seamless loop */}
//         {[...tiles, ...tiles].map((tile, i) => (
//           <a
//             key={i}
//             href={tile.href}
//             target="_blank"
//             rel="noopener noreferrer"
//             title={tile.title}
//             className="group flex shrink-0 flex-col items-center gap-2.5"
//           >
//             <img
//               src={tile.logo}
//               alt={tile.title}
//               className="
//                 h-20 w-auto max-w-[200px] object-contain
//                 opacity-30 grayscale
//                 transition-all duration-500 ease-out
//                 group-hover:opacity-100 group-hover:grayscale-0
//                 group-hover:drop-shadow-[0_0_18px_rgba(236,96,27,0.45)]
//                 group-hover:scale-110
//               "
//             />
//             <span
//               className="
//                 font-poppins text-[8.5px] font-semibold capitalize
//                 tracking-[0.05em] text-[#1D2D44]/20
//                 transition-all duration-400
//                 group-hover:text-[#EC601B] group-hover:tracking-[0.08em]
//               "
//             >
//               {tile.title}
//             </span>
//           </a>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// // ─── Section ─────────────────────────────────────────────────────────────────

// export default function LogoShowcase() {
//   return (
//     <section className="relative w-full overflow-hidden bg-[#BBDEFB] py-20 lg:py-28">
//       {/*
//         ① Drifting ambient orbs — one warm (orange), one cool (blue).
//            They float slowly in opposite corners, giving the neutral
//            background a living, atmospheric quality without any imagery.
//       */}
//       <motion.div
//         className="pointer-events-none absolute -left-32 top-1/2 h-[480px] w-[480px]
//                    -translate-y-1/2 rounded-full opacity-40"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(236,96,27,0.12) 0%, transparent 70%)",
//           filter: "blur(48px)",
//         }}
//         animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
//         transition={{
//           duration: 14,
//           repeat: Infinity,
//           ease: "easeInOut",
//           repeatType: "mirror",
//         }}
//       />
//       <motion.div
//         className="pointer-events-none absolute -right-32 top-1/2 h-[520px] w-[520px]
//                    -translate-y-1/2 rounded-full opacity-35"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(125,192,241,0.14) 0%, transparent 70%)",
//           filter: "blur(56px)",
//         }}
//         animate={{ x: [0, -45, 0], y: [0, 28, 0] }}
//         transition={{
//           duration: 17,
//           repeat: Infinity,
//           ease: "easeInOut",
//           repeatType: "mirror",
//         }}
//       />

//       <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
//         {/* Text header */}
//         <div className="mb-14 text-center">
//           {/* Eyebrow */}
//           <motion.div
//             className="mb-4 flex items-center justify-center gap-3"
//             initial={{ opacity: 0, y: 12 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={VIEWPORT}
//             transition={{ duration: 0.6, ease: EASE }}
//           >
//             <motion.div
//               className="h-px bg-[#EC601B]"
//               initial={{ width: 0 }}
//               whileInView={{ width: 24 }}
//               viewport={VIEWPORT}
//               transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
//             />
//             <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#EC601B]">
//               Our Partners
//             </span>
//             <motion.div
//               className="h-px bg-[#EC601B]"
//               initial={{ width: 0 }}
//               whileInView={{ width: 24 }}
//               viewport={VIEWPORT}
//               transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
//             />
//           </motion.div>

//           {/* Heading */}
//           <motion.h2
//             className="font-poppins text-3xl font-semibold leading-[1.15] tracking-tight text-[#1D2D44] sm:text-4xl"
//             initial={{ opacity: 0, y: 18 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={VIEWPORT}
//             transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
//           >
//             Building the Future{" "}
//             <span className="font-extralight italic text-[#7DC0F1]">
//               Together
//             </span>
//           </motion.h2>

//           {/* Body */}
//           <motion.p
//             className="mx-auto mt-5 max-w-[480px] font-poppins text-[14px]
//                        font-light leading-[1.9] text-[#1D2D44]/55"
//             initial={{ opacity: 0, filter: "blur(4px)" }}
//             whileInView={{ opacity: 1, filter: "blur(0px)" }}
//             viewport={VIEWPORT}
//             transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
//           >
//             KFAS collaborates with leading scientific and research institutions
//             across Kuwait, fostering innovation and impactful partnerships.
//           </motion.p>
//         </div>

//         {/* ② Two marquee rows — opposite directions, different speeds.
//                Row 1 scrolls left at normal speed.
//                Row 2 scrolls right slightly slower.
//                The contrast creates a beautiful parallax depth effect.
//         */}
//         <motion.div
//           className="flex flex-col gap-10"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={VIEWPORT}
//           transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
//         >
//           {/* Edge fade masks applied to each row */}
//           {[
//             { speed: 1.0, direction: "left" as const },
//             { speed: 0.65, direction: "right" as const },
//           ].map(({ speed, direction }, rowIdx) => (
//             <div key={rowIdx} className="relative">
//               <div
//                 className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28
//                            bg-gradient-to-r from-[#BBDEFB] to-transparent"
//               />
//               <div
//                 className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28
//                            bg-gradient-to-l from-[#BBDEFB] to-transparent"
//               />
//               <LogoMarquee speed={speed} direction={direction} />
//             </div>
//           ))}
//         </motion.div>

//         {/* ③ Thin separator between the two rows — a hairline orange-to-blue
//                gradient that echoes the brand palette subtly.
//         */}
//         {/* (placed via gap-10 above; no extra element needed) */}
//       </div>
//     </section>
//   );
// }
