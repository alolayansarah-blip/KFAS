// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import {
//   motion,
//   useInView,
//   useScroll,
//   useTransform,
//   Variants,
// } from "framer-motion";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// // ─── Types ───────────────────────────────────────────────────────────────────

// type Accent = "orange" | "blue";

// interface ProgramCardProps {
//   title: string;
//   body: string;
//   imageSrc?: string;
//   applyHref?: string;
//   index?: number;
//   accent?: Accent;
//   titleAsH2?: boolean;
// }

// interface SubProgramCardProps {
//   title: string;
//   body: string;
//   imageSrc?: string;
//   applyHref?: string;
//   index?: number;
// }

// // ─── Constants ───────────────────────────────────────────────────────────────

// const ACCENT: Record<Accent, string> = {
//   orange: "#EC601B",
//   blue: "#7DC0F1",
// };

// // ─── Motion Variants ──────────────────────────────────────────────────────────

// /**
//  * Cards slide up from below with a clip-path wipe + subtle scale.
//  * Each card in a grid gets an `index` to stagger independently.
//  */
// const cardVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 60,
//     scale: 0.96,
//     clipPath: "inset(8% 4% 0% 4% round 4px)",
//   },
//   visible: (index: number = 0) => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     clipPath: "inset(0% 0% 0% 0% round 0px)",
//     transition: {
//       duration: 0.75,
//       delay: index * 0.12,
//       ease: [0.16, 1, 0.3, 1] as const,
//     },
//   }),
// };

// /** Subtle lift + shadow on hover — no tilt, keeps it clean */
// const cardHover = {
//   whileHover: {
//     y: -6,
//     boxShadow: "0 28px 64px -16px rgba(29,45,68,0.18)",
//     transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
//   },
// };

// const headingVariants: Variants = {
//   hidden: { opacity: 0, x: -24 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
//   },
// };

// // ─── Reusable: Accent Bar ────────────────────────────────────────────────────

// function AccentBar({ color }: { color: string }) {
//   return (
//     <div className="relative h-1 w-full overflow-hidden">
//       <div className="absolute inset-0" style={{ background: color }} />
//       <motion.div
//         className="absolute inset-0"
//         style={{
//           background:
//             "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
//         }}
//         initial={{ x: "-100%" }}
//         whileHover={{ x: "100%" }}
//         transition={{ duration: 0.65, ease: "easeInOut" }}
//       />
//     </div>
//   );
// }

// // ─── Reusable: Apply Link ────────────────────────────────────────────────────

// function ApplyLink({ href = "#" }: { href?: string }) {
//   return (
//     <a
//       href={href}
//       className="mt-6 w-fit inline-flex items-center gap-3 border border-gray-200 border-b-2 border-b-[#EC601B] px-6 py-3 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-[#EC601B] group/btn font-poppins"
//     >
//       <span>Click here, to apply</span>
//       <svg
//         className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         strokeWidth={2.5}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M17 8l4 4m0 0l-4 4m4-4H3"
//         />
//       </svg>
//     </a>
//   );
// }

// // ─── Section Heading ─────────────────────────────────────────────────────────

// function SectionHeading({ children }: { children: React.ReactNode }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <motion.div
//       ref={ref}
//       className="mb-14"
//       variants={headingVariants}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//     >
//       <h2 className="font-poppins text-2xl sm:text-3xl font-semibold text-[#1D2D44] tracking-tight">
//         {children}
//       </h2>
//       <div className="mt-3 h-0.5 w-12 bg-[#EC601B] rounded-full" />
//     </motion.div>
//   );
// }

// // ─── Program Card ─────────────────────────────────────────────────────────────

// function ProgramCard({
//   title,
//   body,
//   imageSrc,
//   applyHref,
//   index = 0,
//   accent = "orange",
//   titleAsH2 = false,
// }: ProgramCardProps) {
//   const color = ACCENT[accent];
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });
//   const TitleTag = titleAsH2 ? "h2" : "h3";

//   return (
//     <motion.article
//       ref={ref}
//       className="group relative flex h-full min-h-0 flex-col overflow-hidden bg-white border border-[#1D2D44]/08 cursor-default"
//       variants={cardVariants}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       custom={index}
//       {...cardHover}
//     >
//       <AccentBar color={color} />

//       <div className="flex h-full min-h-0 flex-col flex-1 p-8 sm:p-10">
//         {imageSrc && (
//           <div className="relative aspect-[16/10] overflow-hidden -mx-8 -mt-8 mb-0">
//             <Image
//               src={imageSrc}
//               alt={title}
//               fill
//               sizes="(max-width: 768px) 100vw, 50vw"
//               className="object-cover transition-transform duration-700 group-hover:scale-105"
//             />
//             <div
//               className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//               style={{
//                 background:
//                   "linear-gradient(to top, rgba(29,45,68,0.45) 0%, transparent 60%)",
//               }}
//             />
//           </div>
//         )}

//         <div
//           className="-mx-8 flex min-h-[5rem] items-center px-8 py-4 transition-colors duration-300 sm:min-h-[5.5rem]"
//           style={{ backgroundColor: color }}
//         >
//           <TitleTag className="font-poppins text-xl font-semibold text-white leading-snug">
//             {title}
//           </TitleTag>
//         </div>

//         <div className="mb-5" />

//         <p className="font-poppins text-sm leading-[1.9] text-[#1D2D44]/65 font-light flex-1">
//           {body}
//         </p>

//         <ApplyLink href={applyHref} />
//       </div>
//     </motion.article>
//   );
// }

// // ─── Sub-Program Card ─────────────────────────────────────────────────────────

// function SubProgramCard({
//   title,
//   body,
//   imageSrc,
//   applyHref,
//   index = 0,
// }: SubProgramCardProps) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });

//   return (
//     <motion.article
//       ref={ref}
//       className="group relative flex h-full min-h-0 flex-col overflow-hidden bg-white border border-[#1D2D44]/08 cursor-default"
//       variants={cardVariants}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       custom={index}
//       {...cardHover}
//       whileHover={{
//         y: -6,
//         boxShadow: "0 20px 48px -12px rgba(236,96,27,0.22)",
//         borderColor: "rgba(236,96,27,0.35)",
//         transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
//       }}
//     >
//       <AccentBar color={ACCENT.orange} />

//       <div className="flex h-full min-h-0 flex-col flex-1 p-6 sm:p-8">
//         {imageSrc && (
//           <div className="relative aspect-[16/10] overflow-hidden -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-0">
//             <Image
//               src={imageSrc}
//               alt={title}
//               fill
//               sizes="(max-width: 768px) 100vw, 33vw"
//               className="object-cover transition-transform duration-700 group-hover:scale-105"
//             />
//           </div>
//         )}

//         <div
//           className="-mx-6 flex min-h-[4.75rem] items-center px-6 py-3 sm:-mx-8 sm:min-h-[5.25rem] sm:px-8"
//           style={{ backgroundColor: ACCENT.orange }}
//         >
//           <h4 className="font-poppins text-lg font-semibold text-white leading-snug">
//             {title}
//           </h4>
//         </div>

//         <div className="mb-4" />

//         <p className="font-poppins text-sm leading-[1.85] text-[#1D2D44]/65 font-light flex-1">
//           {body}
//         </p>

//         <ApplyLink href={applyHref} />
//       </div>
//     </motion.article>
//   );
// }

// // ─── Customized Programs Block ────────────────────────────────────────────────

// function CustomizedPrograms() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, amount: 0.1 });

//   return (
//     <motion.div
//       ref={ref}
//       className="relative overflow-hidden border border-[#1D2D44]/08 bg-white p-8 sm:p-10 lg:p-12"
//       initial={{ opacity: 0, y: 40 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ boxShadow: "0 20px 50px -12px rgba(29,45,68,0.08)" }}
//     >
//       {/* Corner accent line */}
//       <motion.div
//         className="absolute top-0 left-0 h-1 bg-[#EC601B]"
//         initial={{ width: 0 }}
//         animate={inView ? { width: 96 } : { width: 0 }}
//         transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
//       />

//       <h3 className="font-poppins text-xl font-semibold text-[#1D2D44] leading-snug mb-3">
//         Customized Programs
//       </h3>
//       <div className="h-0.5 w-10 bg-[#EC601B] rounded-full mb-6" />

//       <p className="font-poppins text-sm leading-[1.9] text-[#1D2D44]/65 font-light max-w-2xl mb-8">
//         KFAS partners with academic institutions to create customized programs
//         specifically for participants from Kuwait, offering blended and
//         experiential learning experiences taught over a period of months.
//       </p>

//       <ApplyLink href="https://learn.kfas.org.kw/" />

//       <div className="mt-10 grid grid-cols-1 items-stretch gap-6 border-t border-[#1D2D44]/08 pt-10 md:grid-cols-3">
//         {SUB_PROGRAMS.map((p, i) => (
//           <div key={p.title} className="h-full min-h-0">
//             <SubProgramCard {...p} index={i} />
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const SUB_PROGRAMS = [
//   {
//     title: "KFAS Innovation Challenge",
//     imageSrc: "/image/KFASInnovation.jpg",
//     body: "One of our standout executive education programs is the annual KFAS Innovation Challenge, in which a small group of selected companies work with prestigious business schools to develop new initiatives and projects that advance a culture of innovation. After a competitive application process, executives and business leaders spend three to four months in structured learning and training, tackling a company-specific challenge.",
//     applyHref: "https://learn.kfas.org.kw/",
//   },
//   {
//     title: "Harvard Kennedy School Program",
//     imageSrc: "/image/Harvard.jpg",
//     body: "A custom executive education program targeting the needs of the Kuwait private sector. Led by Professor Kessely Hong, the Harvard Kennedy School faculty team designed an impactful curriculum tailored to address the challenges and opportunities presented to managers — equipping them with collaborative and innovative tools for today's reality.",
//     applyHref: "https://learn.kfas.org.kw/",
//   },
//   {
//     title: "KFAS High Potential Leadership Program",
//     imageSrc: "/image/kfas-hipo.jpg",
//     body: "The vitality of every organization is dependent on the strength of its future leaders. By identifying high potential (Hi-Po) leadership candidates early and supporting their development, organizations drive significant returns on their human capital investments — maximizing strategic initiative, market competitiveness, and overall growth.",
//     applyHref: "https://learn.kfas.org.kw/",
//   },
// ];

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export default function ProfessionalsPage() {
//   // Hero parallax
//   const heroRef = useRef(null);
//   const { scrollYProgress: heroScroll } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
//   const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

//   return (
//     <>
//       <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

//       <main className="min-h-screen bg-[#FAFAF8] font-poppins pt-20">
//         {/* ── Hero ── */}
//         <section
//           ref={heroRef}
//           className="relative overflow-hidden flex items-end justify-start h-[55vh]"
//         >
//           <motion.div className="absolute inset-0" style={{ y: heroY }}>
//             <Image
//               src="/image/Grants.jpg"
//               alt=""
//               fill
//               priority
//               sizes="100vw"
//               className="object-cover object-center scale-110"
//             />
//             <div
//               className="absolute inset-0 pointer-events-none"
//               style={{
//                 background: [
//                   "linear-gradient(118deg, rgba(72,143,204,0.42) 0%, rgba(72,143,204,0.14) 48%, transparent 72%)",
//                   "linear-gradient(to bottom, rgba(29,45,68,0.28) 0%, rgba(29,45,68,0.4) 50%, rgba(29,45,68,0.52) 100%)",
//                 ].join(", "),
//               }}
//             />
//           </motion.div>

//           <motion.div
//             className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16"
//             style={{ opacity: heroOpacity }}
//           >
//             <motion.div
//               className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.3em] text-white/70 mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//             >
//               <span className="text-white/60">Learning & Development / </span>
//             </motion.div>

//             <div className="overflow-hidden">
//               <motion.h1
//                 className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)]"
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 transition={{
//                   duration: 0.7,
//                   delay: 0.2,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//               >
//                 Professionals
//               </motion.h1>
//             </div>

//             <motion.div
//               className="h-[2px] bg-[#EC601B] mt-6 origin-left"
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{
//                 duration: 0.8,
//                 delay: 0.55,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               style={{ width: 80 }}
//             />
//           </motion.div>

//           <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-[#FAFAF8]" />
//         </section>

//         {/* ── Section 1: Professional Development Learning ── */}
//         <section className="py-20 sm:py-28">
//           <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
//             <SectionHeading>Professional Development Learning</SectionHeading>

//             <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
//               <div className="h-full min-h-0">
//                 <ProgramCard
//                   title="Open enrollment courses"
//                   body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in courses by subject matter expert practitioners. This activity would focus on developing specific skills needed for organizational development. Short-courses (up to 5 days) are offered to all employee levels in open enrollment style. Courses are delivered with latest and highest standard of learning delivery. Seats are open to all Kuwaiti citizens, targeting the entire workforce population."
//                   imageSrc="/image/OE.jpg"
//                   applyHref="https://learn.kfas.org.kw/"
//                   index={0}
//                   accent="orange"
//                   titleAsH2
//                 />
//               </div>
//               <div className="h-full min-h-0">
//                 <ProgramCard
//                   title="Professional Certificate Incentive Scheme"
//                   body="KFAS offer grants to enhance the capabilities of the Kuwaiti human capital and sharpen their professional skills by a scheme to encourage individuals to obtain their professional credentials. An attractive monetary reward is given upon successfully obtaining the professional certificate. The amount of the reward will be determined based on KFAS policies and procedures for rewards."
//                   imageSrc="/image/back4.webp"
//                   applyHref="https://learn.kfas.org.kw/"
//                   index={1}
//                   accent="orange"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Section 2: Executive Education ── */}
//         <section className="py-20 sm:py-28">
//           <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
//             <SectionHeading>Executive Education</SectionHeading>

//             <div className="mb-12 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
//               <div className="h-full min-h-0">
//                 <ProgramCard
//                   title="Local courses"
//                   body="KFAS bring executive education short-courses offered by international academic institutions on selected topics (in line with KFAS strategic direction) to Kuwait to offer seats locally and would be available to all Kuwaiti citizens."
//                   imageSrc="/image/InstagramPost.png"
//                   applyHref="https://learn.kfas.org.kw/"
//                   index={0}
//                   accent="orange"
//                 />
//               </div>
//               <div className="h-full min-h-0">
//                 <ProgramCard
//                   title="Aboard courses (international open enrollment programs)"
//                   body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in programs already offered by academic institutions. This would allow participants to interact and exchange knowledge with other participants from around the world."
//                   imageSrc="/image/KfasBuilding2.png"
//                   applyHref="https://learn.kfas.org.kw/"
//                   index={1}
//                   accent="orange"
//                 />
//               </div>
//             </div>

//             <CustomizedPrograms />
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
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── FadeUp ──────────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section heading with animated underline ─────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-10">
      <motion.h2
        className="font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="mt-3 h-[2px] bg-[#EC601B] origin-left"
        style={{ width: 48 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ─── Apply link ───────────────────────────────────────────────────────────────
function ApplyLink({ href = "#" }: { href?: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 w-fit inline-flex items-center gap-3 border border-[#1D2D44]/10 border-b-2 border-b-[#EC601B] px-6 py-3 text-sm font-medium text-[#1D2D44] font-poppins group/btn"
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
    >
      <span className="group-hover/btn:text-[#EC601B] transition-colors duration-200">
        Click here, to apply
      </span>
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:text-[#EC601B]"
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
    </motion.a>
  );
}

// ─── Program Card ─────────────────────────────────────────────────────────────
function ProgramCard({
  title,
  body,
  imageSrc,
  applyHref,
  index = 0,
  titleAsH2 = false,
}: {
  title: string;
  body: string;
  imageSrc?: string;
  applyHref?: string;
  index?: number;
  titleAsH2?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const TitleTag = titleAsH2 ? "h2" : "h3";

  return (
    <motion.article
      ref={ref}
      className="group relative flex h-full flex-col overflow-hidden bg-white border border-[#1D2D44]/08 cursor-default"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 28px 64px -16px rgba(29,45,68,0.14)",
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* top orange accent bar */}
      <motion.div
        className="h-[3px] bg-[#EC601B] origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.12 + 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {imageSrc && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to top, rgba(29,45,68,0.4) 0%, transparent 60%)",
            }}
          />
        </div>
      )}

      {/* title band */}
      <div className="bg-[#EC601B] px-8 py-5 min-h-[5rem] flex items-center">
        <TitleTag className="font-poppins text-lg font-semibold text-white leading-snug">
          {title}
        </TitleTag>
      </div>

      <div className="flex flex-col flex-1 px-8 py-7 gap-0">
        <p className="font-poppins text-sm leading-[1.9] text-[#1D2D44]/65 font-light flex-1">
          {body}
        </p>
        <ApplyLink href={applyHref} />
      </div>
    </motion.article>
  );
}

// ─── Sub-Program Card ─────────────────────────────────────────────────────────
function SubProgramCard({
  title,
  body,
  imageSrc,
  applyHref,
  index = 0,
}: {
  title: string;
  body: string;
  imageSrc?: string;
  applyHref?: string;
  index?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      className="group relative flex h-full flex-col overflow-hidden bg-white border border-[#1D2D44]/08 cursor-default"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 48px -12px rgba(236,96,27,0.18)",
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <motion.div
        className="h-[3px] bg-[#EC601B] origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.1 + 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {imageSrc && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div className="bg-[#EC601B] px-6 py-4 min-h-[4.5rem] flex items-center">
        <h4 className="font-poppins text-base font-semibold text-white leading-snug">
          {title}
        </h4>
      </div>

      <div className="flex flex-col flex-1 px-6 py-6 gap-0">
        <p className="font-poppins text-sm leading-[1.85] text-[#1D2D44]/65 font-light flex-1">
          {body}
        </p>
        <ApplyLink href={applyHref} />
      </div>
    </motion.article>
  );
}

// ─── Customized Programs block ────────────────────────────────────────────────
function CustomizedPrograms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden border border-[#1D2D44]/08 bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* animated top bar */}
      <motion.div
        className="h-[3px] bg-[#EC601B] origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="p-8 sm:p-10 lg:p-12">
        <FadeUp delay={0.1}>
          <h3 className="font-poppins text-[1.4rem] font-normal text-[#1D2D44] leading-snug">
            Customized Programs
          </h3>
          <motion.div
            className="mt-3 h-[2px] bg-[#EC601B] origin-left mb-6"
            style={{ width: 48 }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/70 font-light max-w-2xl mb-8">
            KFAS partners with academic institutions to create customized
            programs specifically for participants from Kuwait, offering blended
            and experiential learning experiences taught over a period of
            months.
          </p>
          <ApplyLink href="https://learn.kfas.org.kw/" />
        </FadeUp>

        <div className="mt-10 border-t border-[#1D2D44]/08 pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {SUB_PROGRAMS.map((p, i) => (
            <SubProgramCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SUB_PROGRAMS = [
  {
    title: "KFAS Innovation Challenge",
    imageSrc: "/image/KFASInnovation.jpg",
    body: "One of our standout executive education programs is the annual KFAS Innovation Challenge, in which a small group of selected companies work with prestigious business schools to develop new initiatives and projects that advance a culture of innovation. After a competitive application process, executives and business leaders spend three to four months in structured learning and training, tackling a company-specific challenge.",
    applyHref: "https://learn.kfas.org.kw/",
  },
  {
    title: "Harvard Kennedy School Program",
    imageSrc: "/image/Harvard.jpg",
    body: "A custom executive education program targeting the needs of the Kuwait private sector. Led by Professor Kessely Hong, the Harvard Kennedy School faculty team designed an impactful curriculum tailored to address the challenges and opportunities presented to managers — equipping them with collaborative and innovative tools for today's reality.",
    applyHref: "https://learn.kfas.org.kw/",
  },
  {
    title: "KFAS High Potential Leadership Program",
    imageSrc: "/image/kfas-hipo.jpg",
    body: "The vitality of every organization is dependent on the strength of its future leaders. By identifying high potential (Hi-Po) leadership candidates early and supporting their development, organizations drive significant returns on their human capital investments — maximizing strategic initiative, market competitiveness, and overall growth.",
    applyHref: "https://learn.kfas.org.kw/",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProfessionalsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

      <main className="min-h-screen bg-[#FAFAF8] font-poppins pt-20">
        {/* ══ HERO ══ */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-end justify-start h-[55vh] bg-[#1D2D44]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/Grants.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-110"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: [
                  "linear-gradient(to bottom, rgba(29,45,68,0.15) 0%, rgba(29,45,68,0.5) 60%, rgba(29,45,68,0.85) 100%)",
                  "linear-gradient(to right, rgba(29,45,68,0.6) 0%, rgba(29,45,68,0.2) 60%, transparent 100%)",
                ].join(", "),
              }}
            />
          </motion.div>

          <motion.div
            className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.3em] text-white/70 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-white/60">Learning & Development / </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Professionals
              </motion.h1>
            </div>

            <motion.div
              className="h-[2px] bg-[#EC601B] mt-6 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ width: 80 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-[#FAFAF8]" />
        </section>

        {/* ══ PROFESSIONAL DEVELOPMENT LEARNING ══ */}
        <section className="py-20 sm:py-28">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>Professional Development Learning</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <ProgramCard
                title="Open enrollment courses"
                body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in courses by subject matter expert practitioners. This activity would focus on developing specific skills needed for organizational development. Short-courses (up to 5 days) are offered to all employee levels in open enrollment style. Courses are delivered with latest and highest standard of learning delivery. Seats are open to all Kuwaiti citizens, targeting the entire workforce population."
                imageSrc="/image/OE.jpg"
                applyHref="https://learn.kfas.org.kw/"
                index={0}
                titleAsH2
              />
              <ProgramCard
                title="Professional Certificate Incentive Scheme"
                body="KFAS offer grants to enhance the capabilities of the Kuwaiti human capital and sharpen their professional skills by a scheme to encourage individuals to obtain their professional credentials. An attractive monetary reward is given upon successfully obtaining the professional certificate. The amount of the reward will be determined based on KFAS policies and procedures for rewards."
                imageSrc="/image/back4.webp"
                applyHref="https://learn.kfas.org.kw/"
                index={1}
              />
            </div>
          </div>
        </section>

        {/* ══ EXECUTIVE EDUCATION ══ */}
        <section className="py-20 sm:py-28 bg-[#F2EFE9]">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>Executive Education</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-10">
              <ProgramCard
                title="Local courses"
                body="KFAS bring executive education short-courses offered by international academic institutions on selected topics (in line with KFAS strategic direction) to Kuwait to offer seats locally and would be available to all Kuwaiti citizens."
                imageSrc="/image/InstagramPost.png"
                applyHref="https://learn.kfas.org.kw/"
                index={0}
              />
              <ProgramCard
                title="Aboard courses (international open enrollment programs)"
                body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in programs already offered by academic institutions. This would allow participants to interact and exchange knowledge with other participants from around the world."
                imageSrc="/image/KfasBuilding2.png"
                applyHref="https://learn.kfas.org.kw/"
                index={1}
              />
            </div>
            <CustomizedPrograms />
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
