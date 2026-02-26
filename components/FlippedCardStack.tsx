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

// import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

const containerVariants = MOTION.container;
const cardVariants = MOTION.item;

const cards = [
  { title: "Research Grants", href: "/Research" },
  {
    title: "Learning and Development for Professionals",
    href: "/Learning-and-Development",
  },
  { title: "Our Publications", href: "/Science-and-Society/Publications" },
];

type Card = (typeof cards)[number];

function CardItem({ title, href }: Card & { index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      className="h-full"
      whileHover={MOTION.whileHover}
    >
      <Link
        href={href}
        className="group block h-full rounded-xl transition-shadow duration-300 hover:shadow-lg"
      >
        <div className="relative h-full">
          {/* Decorative corner — like WhoWeAre image */}
          <div
            className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-[#2563EB] pointer-events-none z-10"
            aria-hidden
          />
          <div className="relative h-full bg-blue-50 p-4 sm:p-5 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] min-h-[100px] flex flex-col justify-center items-center text-center gap-3 transition-colors duration-300 group-hover:bg-blue-100">
            <p className="font-poppins font-semibold text-[#1D2D44] leading-snug text-base sm:text-lg tracking-tight group-hover:text-[#EC601B] transition-colors duration-300">
              {title}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FlippedCardStack() {
  return (
    <motion.section
      className="relative w-full bg-white py-12 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={MOTION.viewport}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-[800px] px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          variants={containerVariants}
        >
          {cards.map((card, index) => (
            <CardItem key={index} {...card} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
