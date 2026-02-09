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
//               <h3 className="text-xl font-semibold text-gray-900 mb-2 font-montserrat">
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
//                   <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors font-montserrat">
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

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function OurImpactStories() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const news = [
    {
      image: "/image/news1.jpeg",
      title: "The ICTP SciFabLab Meets Kuwait",
      description:
        "ICTP and the Kuwait Foundation for the Advancement of Sciences (KFAS) have been working together to support scientific development across the Middle East and Northern Africa since 1981. Their collaboration, which so far has focussed on supporting researchers and scholars, has recently expanded to include outreach activities in Kuwait.",
      date: "January 10, 2026",
      link: "#",
    },
    {
      image: "/image/news2.jpeg",
      title:
        "KFAS signs a memorandum of understanding with the Mohammed Bin Rashid Space Centre to enhance cooperation in space sciences.",
      description:
        "The Kuwait Foundation for the Advancement of Sciences (KFAS) announced that it has signed a memorandum of understanding with the Mohammed Bin Rashid Space Centre (MBRSC), aiming to establish a strategic framework for cooperation in the fields of space sciences, scientific research, and the development of national capabilities in this vital sector.",
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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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

  return (
    <section
      ref={sectionRef}
      id="our-impact-stories"
      className="relative bg-gray-50 py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            {/* <div className="inline-block mb-4">
              <span className="font-poppins text-sm font-semibold text-gray-500 uppercase tracking-widest">
                Latest News
              </span>
              <div className="h-0.5 w-16 bg-[#EC601B] mt-2" />
            </div> */}

            <h2 className="font-poppins text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight tracking-tight">
              Latest News
            </h2>
          </div>

          {/* View All Link */}
          <a
            href="#"
            className="font-poppins inline-flex items-center gap-3 border border-gray-200 border-b-2 border-b-[#7DC0F1] px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-300 group hover:text-gray-900"
          >
            <span>All News</span>
            <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedNews.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group h-full p-4"
            >
              <a href={item.link} className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="font-poppins text-xs font-semibold text-gray-900">
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className="pt-5 flex flex-col flex-1">
                  <h3 className="font-poppins text-lg lg:text-xl font-light text-gray-900 leading-tight mb-3 line-clamp-3 min-h-[3.75rem] group-hover:text-[#EC601B] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-sm text-gray-600 leading-relaxed line-clamp-3 min-h-[4.5rem] mb-4">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <span className="font-poppins inline-flex items-center gap-3 border border-gray-200 border-b-2 border-b-[#7DC0F1] px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 group-hover:text-gray-900">
                      Read More
                      <ArrowIcon className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}