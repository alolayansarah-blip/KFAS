// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// export default function OurImpactStories() {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//           }
//         });
//       },
//       {
//         threshold: 0.1,
//         rootMargin: "0px",
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   const news = [
//     {
//       image: "/image/news1.jpeg",
//       title: "The ICTP SciFabLab Meets Kuwait",
//       description:
//         "ICTP and the Kuwait Foundation for the Advancement of Sciences (KFAS) have been working together to support scientific development across the Middle East and Northern Africa since 1981. Their collaboration, which so far has focussed on supporting researchers and scholars, has recently expanded to include outreach activities in Kuwait.",
//       date: "January 10, 2026",
//       link: "#",
//     },
//     {
//       image: "/image/news2.jpeg",
//       title:
//         "KFAS signs a memorandum of understanding with the Mohammed Bin Rashid Space Centre to enhance cooperation in space sciences.",
//       description:
//         "The Kuwait Foundation for the Advancement of Sciences (KFAS) announced that it has signed a memorandum of understanding with the Mohammed Bin Rashid Space Centre (MBRSC), aiming to establish a strategic framework for cooperation in the fields of space sciences, scientific research, and the development of national capabilities in this vital sector.",
//       date: "December 5, 2024",
//       link: "#",
//     },
//     {
//       image: "/image/news3.jpeg",
//       title: "Innovation Workshop Success",
//       description:
//         "Over 200 participants joined our recent workshop on fostering innovation and entrepreneurship in the scientific community.",
//       date: "November 28, 2024",
//       link: "#",
//     },
//   ];

//   return (
//     <motion.section
//       ref={sectionRef}
//       id="our-impact-stories"
//       className="relative bg-white pt-24 lg:pt-32 pb-32 lg:pb-40 m-0 overflow-hidden font-poppins"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Beautiful orange gradient effects */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-radial from-[#F26A21]/12 via-[#EC601B]/6 to-transparent rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-radial from-[#EC601B]/10 via-[#F7911E]/5 to-transparent rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#F7911E]/8 via-[#FFAB40]/4 to-transparent rounded-full blur-3xl"></div>
//         <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#EC601B]/9 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-[#F7911E]/8 rounded-full blur-3xl"></div>
//         <div className="absolute top-0 right-1/3 w-[350px] h-[350px] bg-[#FFAB40]/7 rounded-full blur-3xl"></div>
//       </div>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
//         {/* Header */}
//         <motion.div
//           className="mb-10 lg:mb-12"
//           initial={{ opacity: 0, y: 30 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{
//             duration: 0.8,
//             delay: 0.2,
//             ease: [0.25, 0.46, 0.45, 0.94],
//           }}
//         >
//           <div className="flex items-center justify-between">
//             <motion.h2
//               className="text-sm font-semibold tracking-[0.18em] text-gray-900 font-poppins uppercase"
//               initial={{ opacity: 0, y: 10 }}
//               animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               LATEST NEWS
//             </motion.h2>
//             <motion.a
//               href="#"
//               className="text-xs font-semibold tracking-[0.18em] text-gray-500 hover:text-gray-800 transition-colors font-poppins uppercase"
//               initial={{ opacity: 0, y: 10 }}
//               animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//             >
//               VIEW ALL
//             </motion.a>
//           </div>
//         </motion.div>

//         {/* News Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14">
//           {/* Featured story */}
//           <motion.a
//             href={news[0]?.link}
//             className="group block"
//             initial={{ opacity: 0, y: 30 }}
//             animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//           >
//             <div className="relative aspect-[5/3] overflow-hidden rounded-md border border-gray-200">
//               <img
//                 src={news[0]?.image}
//                 alt={news[0]?.title}
//                 className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
//               />
//             </div>
//             <div className="mt-4">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2 font-poppins">
//                 {news[0]?.title}
//               </h3>
//               <p className="text-sm text-gray-600 line-clamp-2">
//                 {news[0]?.description}
//               </p>
//               <div className="mt-3 text-sm font-semibold text-[#EC601B] group-hover:text-[#D45417] transition-colors">
//                 Read More
//               </div>
//             </div>
//           </motion.a>

//           {/* Side list */}
//           <div className="space-y-6">
//             {news.slice(1).map((item, index) => (
//               <motion.a
//                 key={item.title}
//                 href={item.link}
//                 className="group flex items-start gap-4 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={
//                   isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
//                 }
//                 transition={{
//                   duration: 0.6,
//                   delay: 0.55 + index * 0.15,
//                 }}
//               >
//                 <div className="flex-1">
//                   <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors font-poppins">
//                     {item.title}
//                   </h4>
//                   <p className="text-xs text-gray-500 line-clamp-2">
//                     {item.description}
//                   </p>
//                   <div className="mt-2 text-xs font-semibold text-[#EC601B] group-hover:text-[#D45417] transition-colors">
//                     Read More
//                   </div>
//                 </div>
//                 <div className="w-20 h-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
//                   />
//                 </div>
//               </motion.a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// }

"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
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
);

const news = [
  {
    image: "/image/news1.jpeg",
    title: "The ICTP SciFabLab Meets Kuwait",
    description:
      "ICTP and the Kuwait Foundation for the Advancement of Sciences (KFAS) have been working together to support scientific development across the Middle East and Northern Africa since 1981. Their collaboration has recently expanded to include outreach activities in Kuwait.",
    date: "January 10, 2026",
    link: "#",
  },
  {
    image: "/image/news2.jpeg",
    title:
      "KFAS signs a memorandum of understanding with the Mohammed Bin Rashid Space Centre.",
    description:
      "The Kuwait Foundation for the Advancement of Sciences (KFAS) announced a memorandum of understanding with the Mohammed Bin Rashid Space Centre (MBRSC), establishing a strategic framework for cooperation in space sciences and scientific research.",
    date: "December 5, 2024",
    link: "#",
  },
  {
    image: "/image/news3.jpeg",
    title: "Innovation Workshop Success",
    description:
      "Over 200 participants joined our recent workshop on fostering innovation and entrepreneurship in the scientific community.",
    date: "November 28, 2024",
    link: "#",
  },
];

const sortedNews = [...news].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function OurImpactStories() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="our-impact-stories"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Eyebrow */}
            <motion.p
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#EC601B]"
              {...fadeUp(0)}
            >
              Latest News
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight"
              {...fadeUp(0.1)}
            >
              Stories & Updates
            </motion.h2>

            {/* Divider */}
            <motion.div
              className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            />
          </div>

          {/* All News CTA — matches site style */}
          <motion.a
            href="#"
            className="group inline-flex items-center gap-3 self-start sm:self-auto shrink-0"
            {...fadeUp(0.15)}
          >
            <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
            <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
              All News
            </span>
            <ArrowIcon className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]" />
          </motion.a>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedNews.map((item, index) => (
            <motion.article
              key={index}
              {...fadeUp(0.1 + index * 0.1)}
              className="group flex flex-col"
            >
              <a href={item.link} className="flex h-full flex-col">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] mb-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#1D2D44]/0 transition-all duration-500 group-hover:bg-[#1D2D44]/10" />
                </div>

                {/* Date */}
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1D2D44]/35">
                  {item.date}
                </p>

                {/* Title */}
                <h3 className="font-poppins text-[17px] font-normal text-[#1D2D44] leading-snug mb-3 line-clamp-3 transition-colors duration-300 group-hover:text-[#EC601B]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-poppins text-[14px] font-light text-[#1D2D44]/55 leading-relaxed line-clamp-3 mb-6">
                  {item.description}
                </p>

                {/* CTA — matches WhoWeAre / FlippedCardStack style */}
                <div className="mt-auto flex items-center gap-3">
                  <div className="h-[1.5px] w-5 bg-[#EC601B] transition-all duration-500 group-hover:w-8" />
                  <span className="text-[12px] font-medium tracking-[0.08em] text-[#EC601B]">
                    Read More
                  </span>
                  <ArrowIcon className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0" />
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
