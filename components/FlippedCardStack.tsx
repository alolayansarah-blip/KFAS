// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const cards = [
//   {
//     title: "Research Grants",
//   },
//   {
//     title: "Learning and Development for Professionals",
//   },
//   {
//     title: "Our Publications",
//   },
// ];

// type Card = (typeof cards)[number];

// function CardItem({ title, index }: Card & { index: number }) {
//   const getRoundedClasses = () => {
//     // Mobile: first and last cards get rounded corners
//     // Desktop: left card gets left rounded, right card gets right rounded
//     if (index === 0)
//       return "rounded-t-2xl md:rounded-t-none md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none md:rounded-br-none";
//     if (index === 2) return "rounded-b-2xl md:rounded-b-none md:rounded-r-2xl";
//     return "";
//   };

//   const shadowClass = index === 0 ? "shadow-lg" : "";
//   const dividerClass =
//     index < cards.length - 1
//       ? "border-b border-white/20 md:border-b-0 md:border-r md:border-white/20"
//       : "";

//   return (
//     <div
//       className={`relative h-44 ${getRoundedClasses()} p-0 ${shadowClass} ${dividerClass} bg-orange-500 md:hover:bg-[#FFAB40] md:hover:scale-105 transition-all duration-300 md:cursor-pointer`}
//     >
//       <div className="flex flex-col h-full p-3 md:p-4 text-center justify-center items-center">
//         <h3 className="text-white text-lg md:text-base font-semibold mb-2 md:mb-3 leading-snug md:leading-tight px-3 md:px-2 drop-shadow-lg [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
//           {title}
//         </h3>

//         <div className="flex items-center justify-center text-white/80">
//           <span className="text-base md:text-xs mr-1 drop-shadow-md [text-shadow:_1px_1px_2px_rgba(0,0,0,0.4)]">
//             Read more
//           </span>
//           <svg
//             className="w-3 h-3 md:w-4 md:h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17 8l4 4m0 0l-4 4m4-4H3"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function FlippedCardStack() {
//   return (
//     <motion.section
//       className="relative w-full bg-white md:bg-transparent pt-10 sm:pt-12 md:pt-20 pb-24 -mt-32"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
//     >
//       <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
//           {cards.map((card, index) => (
//             <CardItem key={index} {...card} index={index} />
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// }
"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    title: "Research Grants",
    href: "/research/grants",
    label: "Explore",
    image: "/image/Grants.jpg",
  },
  {
    title: "Learning and Development for Professionals",
    href: "/Learning-and-Development",
    label: "Discover",
    image: "/image/OE.jpg",
  },
  {
    title: "Our Publications",
    href: "/Science-and-Society/Publications",
    label: "Browse",
    image: "/image/back4.webp",
  },
];

// ─── Motion ───────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ title, href, label, image }: (typeof CARDS)[number]) {
  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link href={href} className="group block h-full">
        <div className="relative h-full min-h-[200px] overflow-hidden border border-white/15 bg-[#EC601B]">
          {/* Image — fades in on hover */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-0 scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100"
            style={{ backgroundImage: `url(${image})` }}
          />

          {/* Darken photo on hover for readable white text */}
          <div className="absolute inset-0 z-[1] bg-[#1D2D44]/50 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/25 transition-opacity duration-300 group-hover:opacity-60" />

          {/* Content — title centered; "Read more" fades in at bottom on hover */}
          <div className="relative z-10 flex h-full min-h-[200px] flex-col items-center justify-center px-7 py-10 text-center">
            <div className="flex max-w-[95%] flex-col items-center">
              <p className="font-poppins text-[15px] font-semibold leading-snug tracking-tight text-white [text-shadow:_0_1px_12px_rgba(0,0,0,0.12)] transition-colors duration-300 sm:text-base">
                {title}
              </p>
              <div className="mx-auto mt-3 h-px w-0 bg-white/80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14" />
            </div>

            <div className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-2 whitespace-nowrap opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-sm font-medium text-white drop-shadow-sm">
                Read more
              </span>
              <svg
                className="h-3.5 w-3.5 text-white"
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
            </div>

            <span className="sr-only">{label}</span>
          </div>

          {/* Top-right dot */}
          <div className="absolute top-6 right-6 z-10 h-2 w-2 rounded-full bg-white/35 transition-all duration-300 group-hover:bg-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function FlippedCardStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative w-full bg-white py-12 lg:py-20">
      <div ref={ref} className="mx-auto max-w-[800px] px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {CARDS.map((card) => (
            <Card key={card.href} {...card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
