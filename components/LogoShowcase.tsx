// "use client";

// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";

// const EASE = [0.16, 1, 0.3, 1] as const;
// const VIEWPORT = { once: true, amount: 0.2 };

// const tiles = [
//   {
//     title: "The Scientific Center",
//     description:
//       "The Scientific Center of Kuwait (TSCK) is a leading national institution dedicated to promoting scientific knowledge and public scientific awareness.",
//     href: "https://tsck.org.kw/",
//     image: "/image/sc.jpg",
//     logo: "/image/logo_sc.png",
//   },
//   {
//     title: "Sabah Al-Ahmad Center",
//     description:
//       "A center dedicated to nurturing talent and creativity in young individuals under the Kuwait Foundation for the Advancement of Sciences.",
//     href: "https://linktr.ee/sacgc_kw",
//     image: "/image/sabahAlahmad.jpg",
//     logo: "/image/logo6.png",
//   },
//   {
//     title: "Advancement of Sciences",
//     description:
//       "An advanced research and development center focused on innovation, scientific excellence, and the dissemination of knowledge.",
//     href: "https://www.aspdkw.com/",
//     image: "/image/aspd.png",
//     logo: "/image/logo4.png",
//   },
//   {
//     title: "Dasman Diabetes Institute",
//     description:
//       "Developing research projects, educational programs, and awareness-raising initiatives that improve society and combat diabetes.",
//     href: "https://www.dasmaninstitute.org/",
//     image: "/image/DDI.jpg",
//     logo: "/image/logo5.png",
//   },
// ];

// export default function LogoShowcase() {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const sectionRef = useRef<HTMLElement>(null);
//   const isInView = useInView(sectionRef, VIEWPORT);

//   /** Background: Scientific Center (sc.jpg) by default; follow hovered partner while interacting */
//   const bgIndex = hoveredIndex ?? 0;
//   const bgSrc = tiles[bgIndex].image;
//   const isDefaultScientificCenter = hoveredIndex === null;
//   /** First card matches default sc.jpg background when nothing is hovered */
//   const activeCardIndex = hoveredIndex ?? 0;

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full overflow-hidden bg-[#488FCC] py-20 lg:py-28"
//       onMouseLeave={() => setHoveredIndex(null)}
//     >
//       <div className="absolute inset-0 pointer-events-none">
//         <img
//           key={bgSrc}
//           src={bgSrc}
//           alt=""
//           aria-hidden
//           className="h-full w-full object-cover object-center animate-in fade-in duration-500"
//         />
//         {/* Blue wash — lighter on default so sc.jpg stays clear; stronger when hovering another tile */}
//         <div
//           className="absolute inset-0 bg-[#488FCC]/55 transition-opacity duration-500"
//           style={{ opacity: isDefaultScientificCenter ? 0.18 : 0.42 }}
//         />
//         <div
//           className="absolute inset-0 bg-[#488FCC] transition-opacity duration-500"
//           style={{ opacity: isDefaultScientificCenter ? 0.12 : 0.38 }}
//         />
//         {/* Bottom veil for legibility over any photo */}
//         <div
//           className="absolute inset-0 bg-gradient-to-t from-[#1a2535]/75 via-[#1a2535]/15 to-transparent pointer-events-none"
//           aria-hidden
//         />
//       </div>

//       <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//         {/* Title */}
//         <motion.p
//           className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-white/40"
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={VIEWPORT}
//           transition={{ duration: 0.6, ease: EASE }}
//         >
//           Our Partners
//         </motion.p>
//         <motion.h2
//           className="mb-5 font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight"
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={VIEWPORT}
//           transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
//         >
//           Building the Future{" "}
//           <span className="font-extralight italic text-white/55">Together</span>
//         </motion.h2>
//         <motion.div
//           className="mb-16 h-px origin-left bg-gradient-to-r from-[#EC601B]/50 via-[#7DC0F1]/20 to-transparent"
//           initial={{ opacity: 0, scaleX: 0 }}
//           whileInView={{ opacity: 1, scaleX: 1 }}
//           viewport={VIEWPORT}
//           transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
//         />

//         {/* Logos row */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {tiles.map((tile, index) => (
//             <motion.a
//               key={tile.title}
//               href={tile.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group relative flex flex-col overflow-hidden cursor-pointer"
//               onMouseEnter={() => setHoveredIndex(index)}
//               initial={{ opacity: 0, y: 28 }}
//               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
//               transition={{
//                 duration: 0.6,
//                 delay: 0.15 + index * 0.1,
//                 ease: EASE,
//               }}
//             >
//               {/* Card */}
//               <div
//                 className={`relative flex flex-col items-center justify-start px-4 py-6 md:px-6 md:py-10 border transition-all duration-500 min-h-[200px] md:min-h-[340px] ${
//                   activeCardIndex === index
//                     ? "border-[#EC601B]/60 bg-white/10 backdrop-blur-sm"
//                     : "border-white/10 bg-white/5"
//                 }`}
//               >
//                 {/* Orange top bar on hover */}
//                 <div
//                   className={`absolute top-0 left-0 right-0 h-[2px] bg-[#EC601B] transition-all duration-500 origin-left ${
//                     activeCardIndex === index ? "scale-x-100" : "scale-x-0"
//                   }`}
//                 />

//                 {/* Logo */}
//                 <div className="flex items-center justify-center h-16 md:h-28 w-full mb-4 md:mb-5">
//                   <img
//                     src={tile.logo}
//                     alt={tile.title}
//                     className="h-full w-auto max-w-[120px] md:max-w-[180px] object-contain transition-all duration-500"
//                     style={{
//                       filter: "brightness(0) invert(1)",
//                       opacity: activeCardIndex === index ? 1 : 0.45,
//                     }}
//                   />
//                 </div>

//                 {/* Divider */}
//                 <div
//                   className={`h-px w-8 bg-white/20 mb-4 transition-all duration-500 ${
//                     activeCardIndex === index ? "w-12 bg-[#EC601B]/60" : ""
//                   }`}
//                 />

//                 {/* Title — always visible */}
//                 <p
//                   className={`text-center text-[13px] font-medium leading-snug transition-colors duration-300 mb-4 ${
//                     activeCardIndex === index ? "text-white" : "text-white/50"
//                   }`}
//                 >
//                   {tile.title}
//                 </p>

//                 {/* Summary — fixed space, fades in without affecting height */}
//                 <div className="flex-1 flex flex-col items-center justify-end">
//                   <p
//                     className={`text-center text-[12px] font-light text-white/70 leading-relaxed mb-4 transition-all duration-500 ${
//                       hoveredIndex === index ? "opacity-100" : "opacity-0"
//                     }`}
//                   >
//                     {tile.description}
//                   </p>
//                   <span
//                     className={`inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-[#EC601B] transition-all duration-500 ${
//                       hoveredIndex === index ? "opacity-100" : "opacity-0"
//                     }`}
//                   >
//                     Visit
//                     <svg
//                       className="h-3 w-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       strokeWidth={2.5}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M17 8l4 4m0 0l-4 4m4-4H3"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//               </div>
//             </motion.a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 };

const tiles = [
  {
    title: "The Scientific Center",
    href: "https://tsck.org.kw/",
    logo: "/image/logo_sc.png",
  },
  {
    title: "Sabah Al-Ahmad Center",
    href: "https://linktr.ee/sacgc_kw",
    logo: "/image/logo6.png",
  },
  {
    title: "Advancement of Sciences",
    href: "https://www.aspdkw.com/",
    logo: "/image/logo4.png",
  },
  {
    title: "Dasman Diabetes Institute",
    href: "https://www.dasmaninstitute.org/",
    logo: "/image/logo5.png",
  },
];

// ─── Single Marquee Row ───────────────────────────────────────────────────────

function LogoMarquee({
  speed = 1.0,
  direction = "left",
}: {
  speed?: number;
  direction?: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isHovered = useRef(false);

  // For right-direction rows, start at -half so the loop is seamless
  useEffect(() => {
    if (direction === "right" && trackRef.current) {
      x.set(-trackRef.current.scrollWidth / 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimationFrame(() => {
    if (!trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2;
    const activeSpeed = isHovered.current ? speed * 0.22 : speed;
    const step = direction === "left" ? -activeSpeed : activeSpeed;
    let next = x.get() + step;

    // Seamless loop reset
    if (direction === "left" && next <= -half) next = 0;
    if (direction === "right" && next >= 0) next = -half;

    x.set(next);
  });

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max items-center gap-20"
        style={{ x }}
      >
        {/* Duplicate for seamless loop */}
        {[...tiles, ...tiles].map((tile, i) => (
          <a
            key={i}
            href={tile.href}
            target="_blank"
            rel="noopener noreferrer"
            title={tile.title}
            className="group flex shrink-0 flex-col items-center gap-2.5"
          >
            <img
              src={tile.logo}
              alt={tile.title}
              className="
                h-20 w-auto max-w-[200px] object-contain
                opacity-30 grayscale
                transition-all duration-500 ease-out
                group-hover:opacity-100 group-hover:grayscale-0
                group-hover:drop-shadow-[0_0_18px_rgba(236,96,27,0.45)]
                group-hover:scale-110
              "
            />
            <span
              className="
                font-poppins text-[8.5px] font-semibold capitalize
                tracking-[0.05em] text-[#1D2D44]/20
                transition-all duration-400
                group-hover:text-[#EC601B] group-hover:tracking-[0.08em]
              "
            >
              {tile.title}
            </span>
          </a>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function LogoShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5F9FD] py-20 lg:py-28">
      {/*
        ① Drifting ambient orbs — one warm (orange), one cool (blue).
           They float slowly in opposite corners, giving the neutral
           background a living, atmospheric quality without any imagery.
      */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-1/2 h-[480px] w-[480px]
                   -translate-y-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(236,96,27,0.12) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -right-32 top-1/2 h-[520px] w-[520px]
                   -translate-y-1/2 rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(125,192,241,0.14) 0%, transparent 70%)",
          filter: "blur(56px)",
        }}
        animate={{ x: [0, -45, 0], y: [0, 28, 0] }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
        {/* Text header */}
        <div className="mb-14 text-center">
          {/* Eyebrow */}
          <motion.div
            className="mb-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <motion.div
              className="h-px bg-[#EC601B]"
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#EC601B]">
              Our Partners
            </span>
            <motion.div
              className="h-px bg-[#EC601B]"
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="font-poppins text-3xl font-semibold leading-[1.15] tracking-tight text-[#1D2D44] sm:text-4xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            Building the Future{" "}
            <span className="font-extralight italic text-[#7DC0F1]">
              Together
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p
            className="mx-auto mt-5 max-w-[480px] font-poppins text-[14px]
                       font-light leading-[1.9] text-[#1D2D44]/55"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={VIEWPORT}
            transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
          >
            KFAS collaborates with leading scientific and research institutions
            across Kuwait, fostering innovation and impactful partnerships.
          </motion.p>
        </div>

        {/* ② Two marquee rows — opposite directions, different speeds.
               Row 1 scrolls left at normal speed.
               Row 2 scrolls right slightly slower.
               The contrast creates a beautiful parallax depth effect.
        */}
        <motion.div
          className="flex flex-col gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          {/* Edge fade masks applied to each row */}
          {[
            { speed: 1.0, direction: "left" as const },
            { speed: 0.65, direction: "right" as const },
          ].map(({ speed, direction }, rowIdx) => (
            <div key={rowIdx} className="relative">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28
                           bg-gradient-to-r from-[#F5F9FD] to-transparent"
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28
                           bg-gradient-to-l from-[#F5F9FD] to-transparent"
              />
              <LogoMarquee speed={speed} direction={direction} />
            </div>
          ))}
        </motion.div>

        {/* ③ Thin separator between the two rows — a hairline orange-to-blue
               gradient that echoes the brand palette subtly.
        */}
        {/* (placed via gap-10 above; no extra element needed) */}
      </div>
    </section>
  );
}
