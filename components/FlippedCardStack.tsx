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

import React from "react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Research Grants",
  },
  {
    title: "Learning and Development for Professionals",
  },
  {
    title: "Our Publications",
  },
];

type Card = (typeof cards)[number];

function CardItem({ title, index }: Card & { index: number }) {
  // Use orange for all cards
  const bgColor = "bg-[#7DC0F1]";
  const hoverBgColor = "md:hover:bg-[#56A0D7]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className={`group relative ${bgColor} ${hoverBgColor} transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl`}
    >
      <div className="flex flex-col h-full p-6 md:p-8 text-center justify-center items-center min-h-[160px] md:min-h-[200px]">
        <h3 className="text-white text-lg md:text-xl font-semibold leading-tight tracking-wide mb-4 max-w-xs">
          {title}
        </h3>

        <div className="flex items-center justify-center text-white/85 group-hover:text-white transition-colors duration-300">
          <span className="text-xs md:text-sm font-medium">
            Read more
          </span>
          <svg
            className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300"
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
      </div>
    </motion.div>
  );
}

export default function FlippedCardStack() {
  return (
    <motion.section
      className="relative w-full bg-gray-50 py-12 md:py-16 mt-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Mobile: Stacked cards with gaps */}
        <div className="md:hidden grid grid-cols-1 gap-4 max-w-md mx-auto">
          {cards.map((card, index) => (
            <div key={index} className="rounded-2xl overflow-hidden">
              <CardItem {...card} index={index} />
            </div>
          ))}
        </div>

        {/* Desktop: Side by side cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-0 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${
                index < cards.length - 1
                  ? "border-r border-white/20"
                  : ""
              }`}
            >
              <CardItem {...card} index={index} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}