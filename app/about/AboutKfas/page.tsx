// "use client";

// import React, { useRef } from "react";
// import Image from "next/image";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const EASE = [0.16, 1, 0.3, 1] as const;
// const VIEWPORT = { once: true, amount: 0.15 };

// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 24 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: VIEWPORT,
//   transition: { duration: 0.7, delay, ease: EASE },
// });

// const CENTERS = [
//   {
//     title: "The Scientific Center",
//     description:
//       "The Scientific Center of Kuwait (TSCK) is a leading national institution dedicated to promoting scientific knowledge and public scientific awareness.",
//     image: "/image/SCNew2.png",
//     href: "https://tsck.org.kw/",
//   },
//   {
//     title: "Dasman Diabetes Institute",
//     description:
//       "Developing research projects, educational programs, and awareness-raising initiatives that improve society and combat diabetes.",
//     image: "/image/DDI1.png",
//     href: "https://www.dasmaninstitute.org/",
//   },
//   {
//     title: "Sabah Al-Ahmad Center",
//     description:
//       "A center dedicated to nurturing talent and creativity in young individuals under the Kuwait Foundation for the Advancement of Sciences.",
//     image: "/image/newsaacgc.jpg",
//     href: "https://linktr.ee/sacgc_kw",
//   },
//   {
//     title: "Advancement of Sciences",
//     description:
//       "An advanced research and development center focused on innovation, scientific excellence, and the dissemination of knowledge.",
//     image: "/image/aspd.jpg",
//     href: "https://www.aspdkw.com/",
//   },
//   {
//     title: "Kuwait National Space Research Center",
//     description:
//       "Kuwait's national center for space research, advancing scientific exploration, technology, and human-capital development under KFAS auspices.",
//     image: "/image/NSRCBack.JPG",
//     href: "http://www.knsrc.org.kw/",
//   },
//   {
//     title: "Sheikh Abdullah Al Salem Cultural Centre",
//     description:
//       "One of the world's largest cultural complexes, housing museums of natural history, science, space, and Arabic Islamic science with over 1,100 exhibits.",
//     image: "/image/AbdullahAlsalemBuilding.jpg",
//     href: "https://booking.ascckw.com/ticket-selection/",
//   },
// ];

// function TextBlock({
//   children,
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   delay?: number;
// }) {
//   return (
//     <motion.p
//       className="text-base font-light leading-[1.9] text-[#1D2D44]/65 text-justify"
//       {...fadeUp(delay)}
//     >
//       {children}
//     </motion.p>
//   );
// }

// export default function AboutKfasPage() {
//   const heroRef = useRef(null);
//   const { scrollYProgress: heroScroll } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
//   const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <>
//       <Header logo="/image/KfasBuilding2.png" forceWhiteBackground={true} />
//       <main className="min-h-screen bg-white font-poppins">
//         {/* ── Hero — full bleed, header overlays on top ── */}
//         <section
//           ref={heroRef}
//           className="relative overflow-hidden flex items-end justify-start h-[60vh] min-h-[420px]"
//         >
//           <motion.div className="absolute inset-0" style={{ y: heroY }}>
//             <Image
//               src="/image/AboutKFASBanner2.jpg"
//               alt="Who We Are"
//               fill
//               priority
//               quality={65}
//               sizes="100vw"
//               className="object-cover object-[center_80%] scale-110"
//             />
//             {/* Directional overlay — left heavy for text legibility */}
//             <div
//               className="absolute inset-0"
//               style={{
//                 background:
//                   "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
//               }}
//             />
//             {/* Bottom fade */}
//             <div
//               className="absolute inset-0"
//               style={{
//                 background:
//                   "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
//               }}
//             />
//           </motion.div>

//           {/* Content — padded for fixed header height */}
//           <motion.div
//             className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-14 pt-28"
//             style={{ opacity: heroOpacity }}
//           >
//             {/* Breadcrumb */}
//             <motion.div
//               className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, ease: EASE }}
//             >
//               <span>About</span>
//               <span className="text-white/25">/</span>
//             </motion.div>

//             {/* Title — clip-path wipe */}
//             <div className="overflow-hidden">
//               <motion.h1
//                 className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 transition={{
//                   duration: 0.75,
//                   delay: 0.15,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//               >
//                 Who We Are
//               </motion.h1>
//             </div>

//             {/* Orange rule */}
//             <motion.div
//               className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
//               initial={{ scaleX: 0, opacity: 0 }}
//               animate={{ scaleX: 1, opacity: 1 }}
//               transition={{
//                 duration: 0.8,
//                 delay: 0.55,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               style={{ width: 72 }}
//             />
//           </motion.div>

//           {/* White bleed into body */}
//           <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
//         </section>

//         {/* ── Main content ── */}
//         <section className="py-20 sm:py-28 bg-white">
//           <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//             {/* Two-column layout: text left, decorative right */}
//             <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start mb-20">
//               {/* Left — body copy */}
//               <div className="space-y-8">
//                 <TextBlock delay={0}>
//                   The Kuwait Foundation for the Advancement of Sciences (KFAS)
//                   is a private, non-profit organization established in December
//                   1976. Through cooperation with local and international
//                   partners, KFAS funds and implements research, training, and
//                   development programs that address Kuwait's national priorities
//                   in the fields of science, technology, and innovation, as well
//                   as operating specialized scientific centers. The programs
//                   target various segments within the innovation ecosystem. KFAS
//                   also actively engages the wider public to generate awareness
//                   and interest in the fields of science and technology. KFAS
//                   builds alliances across academia, government, the private
//                   sector, non-government organizations, and the broader
//                   community to diffuse knowledge and accelerate progress.
//                 </TextBlock>

//                 <TextBlock delay={0.1}>
//                   Through its prestigious prizes, KFAS not only celebrates the
//                   remarkable contributions of Kuwaiti and Arab researchers but
//                   also reinforces its commitment to advancing science and
//                   technology. These prizes underscore KFAS's role in rewarding
//                   excellence, validating impactful research, inspiring future
//                   generations, and encouraging further contributions to Kuwait's
//                   scientific and technological landscape. KFAS is recognized as
//                   a leading player in Kuwait's scientific and technological
//                   accomplishments and advancements. The governance system of
//                   KFAS is structured to ensure effective oversight and
//                   management of its activities. It includes a Board of
//                   Directors, chaired and appointed by H.H. The Amir of the State
//                   of Kuwait, that is responsible for strategic decision-making,
//                   executive board committees focused on specific areas, and an
//                   executive management that handles day-to-day operations.
//                 </TextBlock>
//               </div>

//               {/* Right — KFAS building */}
//               <motion.div
//                 className="hidden lg:flex flex-col items-center justify-center sticky top-32"
//                 {...fadeUp(0.2)}
//               >
//                 <div className="relative p-10 border border-[#1D2D44]/08">
//                   <div className="absolute -left-2 -top-2 h-8 w-8 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 pointer-events-none" />
//                   <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none" />
//                   <Image
//                     src="/image/KfasBuilding2.png"
//                     alt="KFAS building with KFAS signage"
//                     width={640}
//                     height={400}
//                     sizes="420px"
//                     className="w-full max-w-[420px] h-auto object-contain opacity-85"
//                   />
//                 </div>
//               </motion.div>
//             </div>

//             {/* Vision & Mission */}
//             <div className="grid gap-6 lg:grid-cols-2 mb-20">
//               {[
//                 {
//                   label: "Vision",
//                   text: "To advance science, technology, and innovation for a resilient, thriving, and sustainable future.",
//                   delay: 0,
//                 },
//                 {
//                   label: "Mission",
//                   text: "To pursue scientific excellence to tackle national challenges through a prominent science, technology, and innovation model.",
//                   delay: 0.1,
//                 },
//               ].map(({ label, text, delay }) => (
//                 <motion.div
//                   key={label}
//                   className="relative flex flex-col p-8 border border-[#1D2D44]/08"
//                   {...fadeUp(delay)}
//                 >
//                   <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none" />
//                   <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#EC601B]">
//                     Our
//                   </p>
//                   <h3 className="mb-4 font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem]">
//                     {label}
//                   </h3>
//                   <div className="mb-5 h-px w-8 bg-gradient-to-r from-[#EC601B]/50 to-transparent" />
//                   <p className="text-[15px] font-light leading-[1.85] text-[#1D2D44]/65">
//                     {text}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Strategic paragraphs */}
//             <div className="max-w-4xl space-y-6">
//               <TextBlock delay={0}>
//                 Driving our work is the premise that science creates knowledge,
//                 technology accelerates progress, and innovation shapes
//                 transformative solutions. During 2025–2029, we aim to build on
//                 our legacy and our strengths by continuing to support exemplary
//                 programs and projects, while also accelerating our support for
//                 emerging scientific areas that call for new research, novel uses
//                 of technology, and expanded horizons in knowledge transfers and
//                 human capacities.
//               </TextBlock>
//               <TextBlock delay={0.05}>
//                 All of our work will be aligned with our three pillars—robust
//                 research ecosystem, viable innovation, and human ingenuity—and
//                 each pillar will complement and produce synergies with the
//                 others. We will focus on elevating research efficacy,
//                 encouraging transdisciplinary research, and informing
//                 science-based policy. We will also focus on promoting science,
//                 technology, and innovation (STI) transfers and contributing to
//                 the growth of the innovation ecosystem. And we will focus on
//                 diffusing knowledge and developing human capabilities and
//                 potential.
//               </TextBlock>
//               <TextBlock delay={0.1}>
//                 We will pursue priority areas that address issues of importance
//                 to Kuwait, particularly in the areas of environment, energy,
//                 health, STEAM education, water and food security, and future
//                 economies, while maintaining a vigilant awareness of emerging
//                 trends and initiatives outside these areas that could bring
//                 benefit to the nation.
//               </TextBlock>
//               <TextBlock delay={0.15}>
//                 Specialized centers of excellence have been established in
//                 Kuwait and continue to be funded as subsidiaries of the
//                 foundation, providing the country with additional ways to
//                 address national challenges through research and development.
//               </TextBlock>
//             </div>
//           </div>
//         </section>

//         {/* ── Centers / Logos Section ── */}
//         <section className="py-20 bg-white">
//           <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//             <div className="space-y-16">
//               {CENTERS.map((item, index) => (
//                 <motion.div
//                   key={item.title}
//                   className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
//                   {...fadeUp(0.05)}
//                 >
//                   {/* Image */}
//                   <div
//                     className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
//                   >
//                     <div className="relative overflow-hidden aspect-[16/10] group">
//                       <Image
//                         src={item.image}
//                         alt={item.title}
//                         fill
//                         sizes="(max-width: 1024px) 100vw, 50vw"
//                         className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
//                       />
//                       <div className="absolute inset-0 bg-[#1D2D44]/20 transition-all duration-500 group-hover:bg-[#1D2D44]/5" />
//                       <div className="absolute -left-2 -top-2 h-8 w-8 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 pointer-events-none" />
//                       <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none" />
//                     </div>
//                   </div>

//                   {/* Text */}
//                   <div className={index % 2 === 1 ? "lg:order-1" : ""}>
//                     <h3 className="mb-3 font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem]">
//                       {item.title}
//                     </h3>
//                     <div className="mb-5 h-px w-10 bg-gradient-to-r from-[#EC601B]/50 to-transparent" />
//                     <p className="mb-7 text-base font-light leading-relaxed text-[#1D2D44]/65 text-justify">
//                       {item.description}
//                     </p>
//                     <a
//                       href={item.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="group inline-flex items-center gap-3"
//                     >
//                       <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
//                       <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
//                         Read More
//                       </span>
//                       <svg
//                         className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2.5}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M17 8l4 4m0 0l-4 4m4-4H3"
//                         />
//                       </svg>
//                     </a>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── Back to Top ── */}
//         <div className="py-12 bg-white flex justify-center">
//           <motion.button
//             onClick={scrollToTop}
//             className="group inline-flex flex-col items-center gap-2 text-[#1D2D44]/35 hover:text-[#EC601B] transition-colors duration-300"
//             {...fadeUp(0)}
//             aria-label="Back to top"
//           >
//             <div className="flex h-9 w-9 items-center justify-center border border-[#1D2D44]/15 transition-all duration-300 group-hover:border-[#EC601B]/50 group-hover:-translate-y-1">
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 15l7-7 7 7"
//                 />
//               </svg>
//             </div>
//             <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
//               Back to Top
//             </span>
//           </motion.button>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

/* ── shared editorial pieces ───────────────────────────────────────────── */

// Sticky section head: orange kicker, then title (+ optional rich children)
function SectionHead({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="lg:sticky lg:top-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
        <h2 className="mt-5 font-poppins text-[1.55rem] font-semibold leading-[1.18] tracking-tight text-[#1D2D44] sm:text-[1.9rem]">
          {title}
        </h2>
        {children}
      </motion.div>
    </div>
  );
}

// Refined hairline list marker (grows on hover of its row)
function Mark() {
  return (
    <span
      aria-hidden
      className="mt-[0.7rem] block h-px w-6 shrink-0 bg-[#EC601B]/70 transition-all duration-500 group-hover:w-10"
    />
  );
}

function TextBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.p
      className="text-base font-light leading-[1.9] text-[#1D2D44]/65 text-justify"
      {...fadeUp(delay)}
    >
      {children}
    </motion.p>
  );
}

const CENTERS = [
  {
    title: "The Scientific Center",
    description:
      "The Scientific Center of Kuwait (TSCK) is a leading national institution dedicated to promoting scientific knowledge and public scientific awareness.",
    image: "/image/ScientificCenter.webp",
    href: "https://tsck.org.kw/",
  },
  {
    title: "Dasman Diabetes Institute",
    description:
      "Developing research projects, educational programs, and awareness-raising initiatives that improve society and combat diabetes.",
    image: "/image/DDI1.png",
    href: "https://www.dasmaninstitute.org/",
  },
  {
    title: "Sabah Al-Ahmad Center",
    description:
      "A center dedicated to nurturing talent and creativity in young individuals under the Kuwait Foundation for the Advancement of Sciences.",
    image: "/image/SAAC.webp",
    href: "https://linktr.ee/sacgc_kw",
  },
  {
    title: "Advancement of Sciences",
    description:
      "An advanced research and development center focused on innovation, scientific excellence, and the dissemination of knowledge.",
    image: "/image/aspd.jpg",
    href: "https://www.aspdkw.com/",
  },
  {
    title: "Kuwait National Space Research Center",
    description:
      "Kuwait's national center for space research, advancing scientific exploration, technology, and human-capital development under KFAS auspices.",
    image: "/image/NSRC2.webp",
    href: "http://www.knsrc.org.kw/",
  },
  {
    title: "Sheikh Abdullah Al Salem Cultural Centre",
    description:
      "One of the world's largest cultural complexes, housing museums of natural history, science, space, and Arabic Islamic science with over 1,100 exhibits.",
    image: "/image/AbdullahAlsalemBuilding.jpg",
    href: "https://booking.ascckw.com/ticket-selection/",
  },
];

export default function AboutKfasPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const visionMission = [
    {
      label: "Our",
      title: "Vision",
      text: "To advance science, technology, and innovation for a resilient, thriving, and sustainable future.",
    },
    {
      label: "Our",
      title: "Mission",
      text: "To pursue scientific excellence to tackle national challenges through a prominent science, technology, and innovation model.",
    },
  ];

  return (
    <>
      <Header logo="/image/KfasBuilding2.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-end justify-start h-[60vh] min-h-[420px]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/AboutKFAS2.webp"
              alt="Who We Are"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-[center_80%] scale-110"
            />
            {/* Directional overlay — left heavy for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            {/* Bottom fade */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </motion.div>

          {/* Content — padded for fixed header height */}
          <motion.div
            className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-14 pt-28"
            style={{ opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>About</span>
              <span className="text-white/25">/</span>
            </motion.div>

            {/* Title — clip-path wipe */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15,
                  ease: EASE,
                }}
              >
                Who We Are
              </motion.h1>
            </div>

            {/* Orange rule */}
            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: EASE,
              }}
              style={{ width: 72 }}
            />
          </motion.div>

          {/* White bleed into body */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#EC601B]">
                Overview
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start">
              {/* Left — body copy */}
              <div className="space-y-8">
                <TextBlock delay={0}>
                  The Kuwait Foundation for the Advancement of Sciences (KFAS)
                  is a private, non-profit organization established in December
                  1976. Through cooperation with local and international
                  partners, KFAS funds and implements research, training, and
                  development programs that address Kuwait's national priorities
                  in the fields of science, technology, and innovation, as well
                  as operating specialized scientific centers. The programs
                  target various segments within the innovation ecosystem. KFAS
                  also actively engages the wider public to generate awareness
                  and interest in the fields of science and technology. KFAS
                  builds alliances across academia, government, the private
                  sector, non-government organizations, and the broader
                  community to diffuse knowledge and accelerate progress.
                </TextBlock>

                <TextBlock delay={0.1}>
                  Through its prestigious prizes, KFAS not only celebrates the
                  remarkable contributions of Kuwaiti and Arab researchers but
                  also reinforces its commitment to advancing science and
                  technology. These prizes underscore KFAS's role in rewarding
                  excellence, validating impactful research, inspiring future
                  generations, and encouraging further contributions to Kuwait's
                  scientific and technological landscape. KFAS is recognized as
                  a leading player in Kuwait's scientific and technological
                  accomplishments and advancements. The governance system of
                  KFAS is structured to ensure effective oversight and
                  management of its activities. It includes a Board of
                  Directors, chaired and appointed by H.H. The Amir of the State
                  of Kuwait, that is responsible for strategic decision-making,
                  executive board committees focused on specific areas, and an
                  executive management that handles day-to-day operations.
                </TextBlock>
              </div>

              {/* Right — KFAS building */}
              <motion.div
                className="hidden lg:flex flex-col items-center justify-center sticky top-32"
                {...fadeUp(0.2)}
              >
                <div className="relative p-10 border border-[#1D2D44]/[0.08]">
                  <div className="absolute -left-2 -top-2 h-8 w-8 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 pointer-events-none" />
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none" />
                  <Image
                    src="/image/KfasBuilding2.png"
                    alt="KFAS building with KFAS signage"
                    width={640}
                    height={400}
                    sizes="420px"
                    className="w-full max-w-[420px] h-auto object-contain opacity-85"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Vision & Mission ── */}
        <section className="bg-[#7DC0F1]/[0.06] py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left rail */}
              <div className="lg:col-span-4">
                <SectionHead title="Vision & Mission" />
              </div>

              {/* Right — hairline divided list */}
              <div className="lg:col-span-8">
                <div className="divide-y divide-[#1D2D44]/[0.08]">
                  {visionMission.map(({ label, title, text }, i) => (
                    <motion.div
                      key={title}
                      className="group flex gap-5 py-8 first:pt-0 last:pb-0"
                      {...fadeUp(i * 0.1)}
                    >
                      <Mark />
                      <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#EC601B]">
                          {label}
                        </p>
                        <h3 className="mb-3 font-poppins text-[1.45rem] font-normal leading-[1.4] tracking-tight text-[#1D2D44] sm:text-[1.7rem]">
                          {title}
                        </h3>
                        <p className="max-w-2xl text-[15px] font-light leading-[1.85] text-[#1D2D44]/65">
                          {text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Strategy ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-4xl space-y-6">
              <TextBlock delay={0}>
                Driving our work is the premise that science creates knowledge,
                technology accelerates progress, and innovation shapes
                transformative solutions. During 2025–2029, we aim to build on
                our legacy and our strengths by continuing to support exemplary
                programs and projects, while also accelerating our support for
                emerging scientific areas that call for new research, novel uses
                of technology, and expanded horizons in knowledge transfers and
                human capacities.
              </TextBlock>
              <TextBlock delay={0.05}>
                All of our work will be aligned with our three pillars—robust
                research ecosystem, viable innovation, and human ingenuity—and
                each pillar will complement and produce synergies with the
                others. We will focus on elevating research efficacy,
                encouraging transdisciplinary research, and informing
                science-based policy. We will also focus on promoting science,
                technology, and innovation (STI) transfers and contributing to
                the growth of the innovation ecosystem. And we will focus on
                diffusing knowledge and developing human capabilities and
                potential.
              </TextBlock>
              <TextBlock delay={0.1}>
                We will pursue priority areas that address issues of importance
                to Kuwait, particularly in the areas of environment, energy,
                health, STEAM education, water and food security, and future
                economies, while maintaining a vigilant awareness of emerging
                trends and initiatives outside these areas that could bring
                benefit to the nation.
              </TextBlock>
              <TextBlock delay={0.15}>
                Specialized centers of excellence have been established in
                Kuwait and continue to be funded as subsidiaries of the
                foundation, providing the country with additional ways to
                address national challenges through research and development.
              </TextBlock>
            </div>
          </div>
        </section>

        {/* ── Centers ── */}
        <section className="bg-[#7DC0F1]/[0.06] py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div className="mb-16" {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#EC601B]">
                Our Centers
              </p>
            </motion.div>

            <div className="space-y-16">
              {CENTERS.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                  {...fadeUp(0.05)}
                >
                  {/* Image */}
                  <div
                    className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div className="relative overflow-hidden aspect-[16/10] group">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[#1D2D44]/20 transition-all duration-500 group-hover:bg-[#1D2D44]/5" />
                      <div className="absolute -left-2 -top-2 h-8 w-8 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 pointer-events-none" />
                      <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h3 className="mb-3 font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem]">
                      {item.title}
                    </h3>
                    <div className="mb-5 h-px w-10 bg-gradient-to-r from-[#EC601B]/50 to-transparent" />
                    <p className="mb-7 text-base font-light leading-relaxed text-[#1D2D44]/65 text-justify">
                      {item.description}
                    </p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3"
                    >
                      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
                      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                        Read More
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
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Back to Top ── */}
        <div className="py-12 bg-white flex justify-center">
          <motion.button
            onClick={scrollToTop}
            className="group inline-flex flex-col items-center gap-2 text-[#1D2D44]/35 hover:text-[#EC601B] transition-colors duration-300"
            {...fadeUp(0)}
            aria-label="Back to top"
          >
            <div className="flex h-9 w-9 items-center justify-center border border-[#1D2D44]/15 transition-all duration-300 group-hover:border-[#EC601B]/50 group-hover:-translate-y-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
              Back to Top
            </span>
          </motion.button>
        </div>
      </main>
      <Footer />
    </>
  );
}
