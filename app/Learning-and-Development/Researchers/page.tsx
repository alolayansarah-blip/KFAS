// "use client";

// import { useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, useScroll, useTransform, useInView } from "framer-motion";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const EASE = [0.22, 1, 0.36, 1] as const;

// // ─── Researcher Card ──────────────────────────────────────────────────────────
// function ResearcherCard({
//   title,
//   body,
//   href,
//   index = 0,
// }: {
//   title: string;
//   body: string;
//   href: string;
//   index?: number;
// }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
//       className="h-full"
//     >
//       <Link
//         href={href}
//         className="group relative flex h-full flex-col overflow-hidden bg-white border border-[#1D2D44]/08 transition-shadow duration-300 hover:shadow-[0_24px_56px_-16px_rgba(29,45,68,0.18)]"
//       >
//         {/* Orange top bar */}
//         <motion.div
//           className="h-[2px] bg-[#EC601B] origin-left"
//           initial={{ scaleX: 0 }}
//           animate={inView ? { scaleX: 1 } : {}}
//           transition={{ duration: 0.6, delay: index * 0.1 + 0.25, ease: EASE }}
//         />

//         {/* Title band */}
//         <div className="bg-[#EC601B] px-7 py-5 min-h-[5rem] flex items-center">
//           <h3 className="font-poppins text-lg font-semibold text-white leading-snug">
//             {title}
//           </h3>
//         </div>

//         <div className="flex flex-col flex-1 px-7 py-7">
//           <p className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/60 font-light flex-1">
//             {body}
//           </p>

//           <span className="group mt-6 inline-flex items-center gap-3 w-fit">
//             <span className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
//             <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
//               Learn more
//             </span>
//             <svg
//               className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               strokeWidth={2.5}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M17 8l4 4m0 0l-4 4m4-4H3"
//               />
//             </svg>
//           </span>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const PROGRAMS = [
//   {
//     title: "International Collaborative Research",
//     href: "/Learning-and-Development/Researchers/International-Collaborative-Research",
//     body: "Funding that enables Kuwaiti researchers to collaborate with leading international institutions on joint research projects, fostering knowledge exchange and global partnerships.",
//   },
//   {
//     title: "Scholar Fellowship",
//     href: "/Learning-and-Development/Researchers/ScholarFellowship",
//     body: "Fellowship opportunities that support researchers in advancing their academic and scientific careers through dedicated research time and resources.",
//   },
//   {
//     title: "Scholarly Publication",
//     href: "/Learning-and-Development/Researchers/Scholarly-Publication",
//     body: "Support for publishing high-quality scientific research in reputable journals and outlets, increasing the visibility and impact of Kuwaiti research.",
//   },
//   {
//     title: "Scientific Missions",
//     href: "/Learning-and-Development/Researchers/ScientificMissions",
//     body: "Grants enabling researchers to participate in scientific missions, conferences, and field activities locally and around the world.",
//   },
//   {
//     title: "Scholarship Bridging Grant",
//     href: "/Learning-and-Development/Researchers/ScholarshipBridgingGrant",
//     body: "Bridging support for scholars transitioning between academic stages or programs, helping ensure continuity in their research journey.",
//   },
//   {
//     title: "Extension of Scholarship Bridging Grant",
//     href: "/Learning-and-Development/Researchers/ExtensionOfScholarshipBridgingGrant",
//     body: "Extended bridging support for eligible scholars who require additional time to complete their academic and research objectives.",
//   },
//   {
//     title: "PhD Students Supplementary Fund Grant",
//     href: "/Learning-and-Development/Researchers/PhDStudentsSupplementaryFundGrant",
//     body: "Supplementary funding for PhD students to support their research needs, academic activities, and successful completion of their doctoral studies.",
//   },
// ];

// // ─── Page ────────────────────────────────────────────────────────────────────
// export default function ResearchersPage() {
//   const heroRef = useRef<HTMLElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

//   return (
//     <>
//       <Header
//         logo="/image/logo_c.png"
//         logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
//         forceWhiteBackground
//       />
//       <main className="min-h-screen bg-white font-poppins">
//         {/* ── Hero ─────────────────────────────────────────────────────── */}
//         <section
//           ref={heroRef}
//           className="relative flex h-[540px] items-center justify-start overflow-hidden bg-[#1D2D44]"
//         >
//           <motion.div className="absolute inset-0" style={{ y: heroY }}>
//             <Image
//               src="/image/Researcher.jpeg"
//               alt="Researcher in a university research facility"
//               fill
//               priority
//               quality={90}
//               sizes="100vw"
//               className="scale-105 object-cover object-center"
//             />
//             <div
//               className="absolute inset-0"
//               style={{
//                 background:
//                   "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
//               }}
//               aria-hidden
//             />
//             <div
//               className="absolute inset-0"
//               style={{
//                 background:
//                   "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
//               }}
//               aria-hidden
//             />
//           </motion.div>

//           <motion.div
//             className="relative z-10 w-full px-6 py-12 sm:px-8 lg:px-12"
//             style={{ opacity: heroOpacity }}
//           >
//             <div className="mx-auto w-full max-w-[1280px]">
//               <motion.div
//                 className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.55, ease: EASE }}
//               >
//                 <span>Learning &amp; Development</span>
//                 {/* <span className="text-white/25">/</span>
//               <span>Researchers</span> */}
//               </motion.div>

//               <div className="overflow-hidden">
//                 <motion.h1
//                   className="text-left font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
//                   initial={{ y: "100%" }}
//                   animate={{ y: 0 }}
//                   transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
//                 >
//                   Researchers
//                 </motion.h1>
//               </div>

//               <motion.div
//                 className="mt-5 h-[3px] w-[72px] origin-left rounded-full bg-[#EC601B]"
//                 initial={{ scaleX: 0, opacity: 0 }}
//                 animate={{ scaleX: 1, opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
//               />
//             </div>
//           </motion.div>

//           <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
//         </section>

//         {/* ── Programs ─────────────────────────────────────────────────── */}
//         <section className="py-20 sm:py-28 bg-white">
//           <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
//               {PROGRAMS.map((program, i) => (
//                 <ResearcherCard key={program.title} {...program} index={i} />
//               ))}
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

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Researcher Card ──────────────────────────────────────────────────────────
function ResearcherCard({
  title,
  body,
  href,
  index = 0,
}: {
  title: string;
  body: string;
  href: string;
  index?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="h-full"
    >
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden bg-white border border-[#1D2D44]/08 transition-shadow duration-300 hover:shadow-[0_24px_56px_-16px_rgba(29,45,68,0.18)]"
      >
        {/* Orange top bar */}
        <motion.div
          className="h-[2px] bg-[#EC601B] origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.25, ease: EASE }}
        />

        {/* Title band */}
        <div className="bg-[#EC601B] px-7 py-5 min-h-[5rem] flex items-center">
          <h3 className="font-poppins text-lg font-semibold text-white leading-snug">
            {title}
          </h3>
        </div>

        <div className="flex flex-col flex-1 px-7 py-7">
          <p className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/60 font-light flex-1">
            {body}
          </p>

          <span className="group mt-6 inline-flex items-center gap-3 w-fit">
            <span className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
            <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
              Learn more
            </span>
            <svg
              className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
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
      </Link>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    title: "International Collaborative Research",
    href: "/Learning-and-Development/Researchers/International-Collaborative-Research",
    body: "Funding that enables Kuwaiti researchers to collaborate with leading international institutions on joint research projects, fostering knowledge exchange and global partnerships.",
  },
  {
    title: "Scholar Fellowship",
    href: "/Learning-and-Development/Researchers/ScholarFellowship",
    body: "Fellowship opportunities that support researchers in advancing their academic and scientific careers through dedicated research time and resources.",
  },
  {
    title: "Scholarly Publication",
    href: "/Learning-and-Development/Researchers/Scholarly-Publication",
    body: "Support for publishing high-quality scientific research in reputable journals and outlets, increasing the visibility and impact of Kuwaiti research.",
  },
  {
    title: "Scientific Missions",
    href: "/Learning-and-Development/Researchers/ScientificMissions",
    body: "Grants enabling researchers to participate in scientific missions, conferences, and field activities locally and around the world.",
  },
  {
    title: "Scholarship Bridging Grant",
    href: "/Learning-and-Development/Researchers/ScholarshipBridgingGrant",
    body: "Bridging support for scholars transitioning between academic stages or programs, helping ensure continuity in their research journey.",
  },
  {
    title: "Extension of Scholarship Bridging Grant",
    href: "/Learning-and-Development/Researchers/ExtensionOfScholarshipBridgingGrant",
    body: "Extended bridging support for eligible scholars who require additional time to complete their academic and research objectives.",
  },
  {
    title: "PhD Students Supplementary Fund Grant",
    href: "/Learning-and-Development/Researchers/PhDStudentsSupplementaryFundGrant",
    body: "Supplementary funding for PhD students to support their research needs, academic activities, and successful completion of their doctoral studies.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ResearchersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#1D2D44]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/Researcher.jpeg"
              alt="Researcher in a university research facility"
              fill
              priority
              quality={65}
              sizes="100vw"
              // className="object-cover object-center"
              className="object-cover object-center lg:object-[center_38%]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
              aria-hidden
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
              <span>Learning &amp; Development</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                Researchers
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

        {/* ── Programs ─────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
              {PROGRAMS.map((program, i) => (
                <ResearcherCard key={program.title} {...program} index={i} />
              ))}
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
