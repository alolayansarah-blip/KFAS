// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import SplitText from "./SplitText";

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
//     image: "/image/aspd.jpg",
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
//   const isInView = useInView(sectionRef, {
//     once: true,
//     amount: 0.25,
//     margin: "0px 0px -100px 0px",
//   });
//   const activeIndex = hoveredIndex ?? 0;
//   const activeImage = tiles[activeIndex].image;

//   const [visibleImage, setVisibleImage] = useState(activeImage);
//   const [fadeIn, setFadeIn] = useState(true);

//   useEffect(() => {
//     setFadeIn(false);
//     const timeout = setTimeout(() => {
//       setVisibleImage(activeImage);
//       setFadeIn(true);
//     }, 300);
//     return () => clearTimeout(timeout);
//   }, [activeImage]);

//   const ArrowIcon = () => (
//     <svg
//       className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       strokeWidth={2.5}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M17 8l4 4m0 0l-4 4m4-4H3"
//       />
//     </svg>
//   );

//   return (
//     <motion.section
//       ref={sectionRef}
//       className="relative w-full overflow-hidden bg-white"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true, amount: 0.25, margin: "0px 0px -100px 0px" }}
//       transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//     >
//       {/* Hero */}
//       <div className="relative min-h-[480px] sm:min-h-[520px] md:min-h-[620px]">
//         <div className="absolute inset-0">
//           <img
//             src={visibleImage}
//             alt=""
//             className="w-full h-full object-cover object-center"
//             style={{
//               opacity: fadeIn ? 1 : 0,
//               transition: "opacity 0.6s ease",
//             }}
//           />
//           <div className="absolute inset-0 bg-[#1D2D44]/95" />
//         </div>

//         {/* Hero content */}
//         <div className="absolute inset-0 z-10 flex items-center">
//           <div className="w-full px-5 sm:px-6 lg:px-8 pt-10 pb-8 sm:pt-16 sm:pb-10 max-w-7xl mx-auto">
//             <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
//               <div className="max-w-7xl lg:pl-6 xl:pl-10 text-left">
//                 <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold text-white leading-tight tracking-tight">
//                   <SplitText
//                     text="Building the Future"
//                     className="text-white"
//                     delay={40}
//                     duration={1}
//                     ease="easeOut"
//                     splitType="chars"
//                     from={{ opacity: 0, y: 10 }}
//                     to={{ opacity: 1, y: 0 }}
//                     textAlign="left"
//                   />{" "}
//                   <span className="relative inline-block">
//                     <SplitText
//                       text="Together"
//                       className="relative z-10 text-white"
//                       delay={40}
//                       duration={1}
//                       ease="easeOut"
//                       splitType="chars"
//                       from={{ opacity: 0, y: 10 }}
//                       to={{ opacity: 1, y: 0 }}
//                       textAlign="left"
//                     />
//                     <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/20 -z-10" />
//                   </span>
//                 </h2>
//                 <div className="mt-5 grid w-full grid-cols-2 items-center justify-items-start gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:flex lg:flex-nowrap lg:justify-start lg:gap-10">
//                   {tiles.map((tile, index) => (
//                     <motion.a
//                       key={tile.title}
//                       href={tile.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="rounded-full outline-none"
//                       onMouseEnter={() => setHoveredIndex(index)}
//                       onMouseLeave={() => setHoveredIndex(null)}
//                       onClick={() => setHoveredIndex(index)}
//                       aria-label={tile.title}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={
//                         isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
//                       }
//                       transition={{
//                         duration: 0.5,
//                         delay: 0.2 + index * 0.1,
//                         ease: [0.25, 0.46, 0.45, 0.94],
//                       }}
//                       whileHover={{ scale: 1.05, y: -4 }}
//                     >
//                       <span
//                         className="block h-16 sm:h-20 md:h-24 lg:h-28 min-w-[4rem] sm:min-w-[5rem] md:min-w-[6rem] lg:min-w-[7rem] bg-white"
//                         style={{
//                           WebkitMaskImage: `url(${tile.logo})`,
//                           WebkitMaskSize: "contain",
//                           WebkitMaskRepeat: "no-repeat",
//                           WebkitMaskPosition: "center",
//                           maskImage: `url(${tile.logo})`,
//                           maskSize: "contain",
//                           maskRepeat: "no-repeat",
//                           maskPosition: "center",
//                         }}
//                         role="img"
//                         aria-label={tile.title}
//                       />
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>

//               <motion.div
//                 className="hidden lg:flex lg:w-[380px] xl:w-[420px]"
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={
//                   isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
//                 }
//                 transition={{
//                   duration: 0.6,
//                   delay: 0.4,
//                   ease: [0.25, 0.46, 0.45, 0.94],
//                 }}
//               >
//                 <div className="w-full rounded-2xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
//                   <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
//                     <img
//                       src={tiles[activeIndex].image}
//                       alt={tiles[activeIndex].title}
//                       className="absolute inset-0 h-full w-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-black/20" />
//                   </div>
//                   <div className="pt-4">
//                     <h3 className="font-poppins text-lg font-semibold text-white">
//                       {tiles[activeIndex].title}
//                     </h3>
//                     <p className="font-poppins mt-2 text-sm text-white/80 leading-relaxed">
//                       {tiles[activeIndex].description}
//                     </p>
//                     <a
//                       href={tiles[activeIndex].href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white group"
//                     >
//                       <span className="font-poppins">Read More</span>
//                       <ArrowIcon />
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 };

const tiles = [
  {
    title: "The Scientific Center",
    description:
      "The Scientific Center of Kuwait (TSCK) is a leading national institution dedicated to promoting scientific knowledge and public scientific awareness.",
    href: "https://tsck.org.kw/",
    image: "/image/sc.jpg",
    logo: "/image/logo_sc.png",
  },
  {
    title: "Sabah Al-Ahmad Center",
    description:
      "A center dedicated to nurturing talent and creativity in young individuals under the Kuwait Foundation for the Advancement of Sciences.",
    href: "https://linktr.ee/sacgc_kw",
    image: "/image/sabahAlahmad.jpg",
    logo: "/image/logo6.png",
  },
  {
    title: "Advancement of Sciences",
    description:
      "An advanced research and development center focused on innovation, scientific excellence, and the dissemination of knowledge.",
    href: "https://www.aspdkw.com/",
    image: "/image/aspd.png",
    logo: "/image/logo4.png",
  },
  {
    title: "Dasman Diabetes Institute",
    description:
      "Developing research projects, educational programs, and awareness-raising initiatives that improve society and combat diabetes.",
    href: "https://www.dasmaninstitute.org/",
    image: "/image/DDI.jpg",
    logo: "/image/logo5.png",
  },
];

export default function LogoShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, VIEWPORT);

  const [visibleImage, setVisibleImage] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (hoveredIndex === null) {
      setFadeIn(false);
      const t = setTimeout(() => setVisibleImage(null), 300);
      return () => clearTimeout(t);
    }
    setFadeIn(false);
    const t = setTimeout(() => {
      setVisibleImage(tiles[hoveredIndex].image);
      setFadeIn(true);
    }, 150);
    return () => clearTimeout(t);
  }, [hoveredIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1D2D44] py-20 lg:py-28"
    >
      {/* Background image — only shows on hover */}
      <div className="absolute inset-0 pointer-events-none">
        {visibleImage && (
          <img
            src={visibleImage}
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-center"
            style={{ opacity: fadeIn ? 1 : 0, transition: "opacity 0.5s ease" }}
          />
        )}
        {/* Blue overlay — always present */}
        <div
          className="absolute inset-0 bg-[#7DC0F1]/65"
          style={{
            opacity: visibleImage && fadeIn ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
        {/* Navy base — fades slightly when image is shown */}
        <div
          className="absolute inset-0 bg-[#1D2D44]"
          style={{
            opacity: visibleImage && fadeIn ? 0.45 : 1,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <motion.p
          className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-white/40"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Our Partners
        </motion.p>
        <motion.h2
          className="mb-5 font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          Building the Future{" "}
          <span className="font-extralight italic text-white/55">Together</span>
        </motion.h2>
        <motion.div
          className="mb-16 h-px origin-left bg-gradient-to-r from-[#EC601B]/50 via-[#7DC0F1]/20 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        />

        {/* Logos row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiles.map((tile, index) => (
            <motion.a
              key={tile.title}
              href={tile.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.1,
                ease: EASE,
              }}
            >
              {/* Card */}
              <div
                className={`relative flex flex-col items-center justify-start px-4 py-6 md:px-6 md:py-10 border transition-all duration-500 min-h-[200px] md:min-h-[340px] ${
                  hoveredIndex === index
                    ? "border-[#EC601B]/60 bg-white/10 backdrop-blur-sm"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {/* Orange top bar on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-[#EC601B] transition-all duration-500 origin-left ${
                    hoveredIndex === index ? "scale-x-100" : "scale-x-0"
                  }`}
                />

                {/* Logo */}
                <div className="flex items-center justify-center h-16 md:h-28 w-full mb-4 md:mb-5">
                  <img
                    src={tile.logo}
                    alt={tile.title}
                    className="h-full w-auto max-w-[120px] md:max-w-[180px] object-contain transition-all duration-500"
                    style={{
                      filter: "brightness(0) invert(1)",
                      opacity: hoveredIndex === index ? 1 : 0.45,
                    }}
                  />
                </div>

                {/* Divider */}
                <div
                  className={`h-px w-8 bg-white/20 mb-4 transition-all duration-500 ${
                    hoveredIndex === index ? "w-12 bg-[#EC601B]/60" : ""
                  }`}
                />

                {/* Title — always visible */}
                <p
                  className={`text-center text-[13px] font-medium leading-snug transition-colors duration-300 mb-4 ${
                    hoveredIndex === index ? "text-white" : "text-white/50"
                  }`}
                >
                  {tile.title}
                </p>

                {/* Summary — fixed space, fades in without affecting height */}
                <div className="flex-1 flex flex-col items-center justify-end">
                  <p
                    className={`text-center text-[12px] font-light text-white/70 leading-relaxed mb-4 transition-all duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {tile.description}
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] text-[#EC601B] transition-all duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Visit
                    <svg
                      className="h-3 w-3"
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
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
