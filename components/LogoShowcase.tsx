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
import SplitText from "./SplitText";
import { MOTION } from "@/lib/motion";

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
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -80px 0px" as const,
  });
  const activeIndex = hoveredIndex ?? 0;
  const activeImage = tiles[activeIndex].image;

  const [visibleImage, setVisibleImage] = useState(activeImage);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setFadeIn(false);
    const timeout = setTimeout(() => {
      setVisibleImage(activeImage);
      setFadeIn(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [activeImage]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={MOTION.viewport}
      transition={{ duration: MOTION.duration, ease: MOTION.ease }}
    >
      {/* Hero */}
      <div className="relative min-h-[480px] sm:min-h-[520px] md:min-h-[620px]">
        <div className="absolute inset-0">
          <img
            src={visibleImage}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
          <div className="absolute inset-0 bg-[#1D2D44]/95" />
        </div>

        {/* Hero content — stretch so right column matches full section height */}
        <div className="absolute inset-0 z-10 flex items-stretch">
          <div className="w-full min-h-0 flex-1 px-5 sm:px-6 lg:px-8 py-8 sm:pt-16 sm:pb-10 max-w-7xl mx-auto flex h-full min-h-full flex-col justify-center lg:min-h-0 lg:h-full lg:flex-row lg:items-stretch lg:gap-8">
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-1 lg:justify-center lg:pl-6 xl:pl-10 text-left">
              {/* Title */}
              <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold text-white leading-tight tracking-tight">
                <SplitText
                  text="Building the Future"
                  className="text-white"
                  delay={40}
                  duration={1}
                  ease="easeOut"
                  splitType="chars"
                  from={{ opacity: 0, y: 10 }}
                  to={{ opacity: 1, y: 0 }}
                  textAlign="left"
                />{" "}
                <span className="relative inline-block">
                  <SplitText
                    text="Together"
                    className="relative z-10 text-white"
                    delay={40}
                    duration={1}
                    ease="easeOut"
                    splitType="chars"
                    from={{ opacity: 0, y: 10 }}
                    to={{ opacity: 1, y: 0 }}
                    textAlign="left"
                  />
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/20 -z-10" />
                </span>
              </h2>

              {/* Logos — 2×2 on mobile, row on lg+ */}
              <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:flex lg:flex-nowrap lg:items-center lg:gap-10">
                {tiles.map((tile, index) => (
                  <motion.a
                    key={tile.title}
                    href={tile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center outline-none lg:rounded-full"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(index)}
                    aria-label={tile.title}
                    variants={MOTION.fadeUpDelay(0.1 + index * 0.08)}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={MOTION.whileHover}
                  >
                    {/* Mobile: frosted pill backdrop for contrast; invisible on lg+ */}
                    <span className="flex items-center justify-center w-full rounded-2xl bg-white/10 backdrop-blur-sm p-4 lg:contents lg:rounded-none lg:bg-transparent lg:backdrop-blur-none lg:p-0">
                      <span
                        className="block h-16 w-full sm:h-20 lg:h-28 lg:w-36 bg-white"
                        style={{
                          WebkitMaskImage: `url(${tile.logo})`,
                          WebkitMaskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskImage: `url(${tile.logo})`,
                          maskSize: "contain",
                          maskRepeat: "no-repeat",
                          maskPosition: "center",
                        }}
                        role="img"
                        aria-label={tile.title}
                      />
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right card — desktop only; image fills full section height */}
            <motion.div
              className="group hidden lg:flex lg:w-[380px] xl:w-[420px] lg:flex-shrink-0 lg:self-stretch lg:min-h-0 lg:h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: MOTION.duration,
                delay: 0.3,
                ease: MOTION.ease,
              }}
            >
              <div className="relative flex min-h-0 h-full w-full flex-1 flex-col">
                {/* Decorative corner — orange, thick */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-[#EC601B] pointer-events-none z-10"
                  aria-hidden
                />
                <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
                  <div className="relative min-h-0 h-full flex-1 overflow-hidden">
                    <img
                      src={visibleImage}
                      alt={tiles[activeIndex].title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      style={{
                        opacity: fadeIn ? 1 : 0,
                        transition: "opacity 0.6s ease",
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(29, 45, 68, 0.95) 0%, rgba(29, 45, 68, 0.5) 35%, transparent 70%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5 pt-16 pointer-events-none">
                      <h3 className="font-poppins text-lg font-semibold text-white mb-2">
                        {tiles[activeIndex].title}
                      </h3>
                      <p
                        className="font-poppins text-sm text-white/90 leading-relaxed"
                        style={{
                          opacity: fadeIn ? 1 : 0,
                          transition: "opacity 0.6s ease",
                        }}
                      >
                        {tiles[activeIndex].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
