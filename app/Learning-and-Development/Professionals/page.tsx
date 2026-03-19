// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import { motion, useInView } from "framer-motion";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// // ─── Program card ───────────────────────────────────────────────────────────
// function ProgramCard({
//   title,
//   body,
//   imageSrc,
//   applyHref = "#",
//   delay = 0,
//   accent = "orange",
//   noMotion = false,
//   titleAsH2 = false,
//   titleInOrangeBar = false,
//   isInView,
// }: {
//   title: string;
//   body: string;
//   imageSrc?: string;
//   applyHref?: string;
//   delay?: number;
//   accent?: "orange" | "blue";
//   noMotion?: boolean;
//   titleAsH2?: boolean;
//   titleInOrangeBar?: boolean;
//   isInView?: boolean;
// }) {
//   const accentColor = accent === "orange" ? "#EC601B" : "#7DC0F1";
//   const articleClassName =
//     "group relative flex flex-col overflow-hidden bg-white border border-[#1D2D44]/08 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(29,45,68,0.12)] hover:border-[#1D2D44]/15";
//   const content = (
//     <>
//       {/* Top accent bar */}
//       <div
//         className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
//         style={{
//           background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
//         }}
//       />
//       <div className="flex flex-col flex-1 p-8 sm:p-10">
//         {imageSrc && (
//           <div
//             className={`relative aspect-[16/10] overflow-hidden -mx-8 -mt-8 ${titleInOrangeBar ? "mb-0" : "mb-6"}`}
//           >
//             <Image
//               src={imageSrc}
//               alt={title}
//               fill
//               sizes="(max-width: 768px) 100vw, 50vw"
//               className="object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//             <div
//               className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//               style={{
//                 background: `linear-gradient(to top, rgba(29,45,68,0.4) 0%, transparent 50%)`,
//               }}
//             />
//           </div>
//         )}
//         {titleInOrangeBar ? (
//           <div
//             className="-mx-8 px-8 py-4 flex items-center"
//             style={{ backgroundColor: accentColor }}
//           >
//             <h2 className="font-poppins text-xl font-semibold text-white leading-snug">
//               {title}
//             </h2>
//           </div>
//         ) : (
//           <>
//             {titleAsH2 ? (
//               <h2 className="font-poppins text-xl font-semibold text-[#1D2D44] leading-snug mb-3">
//                 {title}
//               </h2>
//             ) : (
//               <h3 className="font-poppins text-xl font-semibold text-[#1D2D44] leading-snug mb-3">
//                 {title}
//               </h3>
//             )}
//             <div
//               className="h-0.5 w-12 mb-5 rounded-full"
//               style={{ backgroundColor: accentColor }}
//             />
//           </>
//         )}
//         {titleInOrangeBar && <div className="mb-5" />}
//         <p className="font-poppins text-sm leading-[1.9] text-[#1D2D44]/65 font-light flex-1">
//           {body}
//         </p>
//         <a
//           href={applyHref}
//           className="mt-6 w-fit font-poppins inline-flex items-center gap-3 border border-gray-200 border-b-2 border-b-[#7DC0F1] px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-300 group/btn hover:text-gray-900"
//         >
//           <span>To Apply, click here</span>
//           <svg
//             className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             strokeWidth={2.5}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M17 8l4 4m0 0l-4 4m4-4H3"
//             />
//           </svg>
//         </a>
//       </div>
//     </>
//   );
//   if (noMotion) {
//     return <article className={articleClassName}>{content}</article>;
//   }
//   const motionProps =
//     isInView !== undefined
//       ? {
//           initial: { opacity: 0, y: 40 },
//           animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
//           transition: { duration: 0.6, delay, ease: "easeOut" as const },
//         }
//       : {
//           initial: { opacity: 0, y: 40 },
//           whileInView: { opacity: 1, y: 0 },
//           viewport: { once: true, amount: 0.2 },
//           transition: { duration: 0.6, delay, ease: "easeOut" as const },
//         };
//   return (
//     <motion.article className={articleClassName} {...motionProps}>
//       {content}
//     </motion.article>
//   );
// }

// // ─── Sub-program card ───────────────────────────────────────────────────────
// function SubProgramCard({
//   title,
//   body,
//   imageSrc,
//   applyHref = "#",
//   delay = 0,
//   titleInBar = false,
//   isInView,
// }: {
//   title: string;
//   body: string;
//   imageSrc?: string;
//   applyHref?: string;
//   delay?: number;
//   titleInBar?: boolean;
//   isInView?: boolean;
// }) {
//   const barColor = "#7DC0F1";
//   const motionProps =
//     isInView !== undefined
//       ? {
//           initial: { opacity: 0, y: 40 },
//           animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
//           transition: { duration: 0.6, delay, ease: "easeOut" as const },
//         }
//       : {
//           initial: { opacity: 0, y: 40 },
//           whileInView: { opacity: 1, y: 0 },
//           viewport: { once: true, amount: 0.2 },
//           transition: { duration: 0.6, delay, ease: "easeOut" as const },
//         };
//   return (
//     <motion.article
//       className="group relative flex flex-col overflow-hidden bg-white border border-[#1D2D44]/08 transition-all duration-500 hover:shadow-[0_16px_40px_-12px_rgba(29,45,68,0.1)] hover:border-[#7DC0F1]/30"
//       {...motionProps}
//     >
//       <div className="h-1 w-full bg-gradient-to-r from-[#7DC0F1] to-[#7DC0F1]/60" />
//       <div className="flex flex-col flex-1 p-6 sm:p-8">
//         {imageSrc && (
//           <div
//             className={`relative aspect-[16/10] overflow-hidden -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 ${titleInBar ? "mb-0" : "mb-5 sm:mb-6"}`}
//           >
//             <Image
//               src={imageSrc}
//               alt={title}
//               fill
//               sizes="(max-width: 768px) 100vw, 33vw"
//               className="object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//           </div>
//         )}
//         {titleInBar ? (
//           <div
//             className="-mx-6 sm:-mx-8 px-6 sm:px-8 py-3 flex items-center"
//             style={{ backgroundColor: barColor }}
//           >
//             <h4 className="font-poppins text-lg font-semibold text-white leading-snug">
//               {title}
//             </h4>
//           </div>
//         ) : (
//           <>
//             <h4 className="font-poppins text-lg font-semibold text-[#1D2D44] leading-snug mb-2">
//               {title}
//             </h4>
//             <div className="h-0.5 w-8 bg-[#7DC0F1] rounded-full mb-4" />
//           </>
//         )}
//         {titleInBar && <div className="mb-4" />}
//         <p className="font-poppins text-sm leading-[1.85] text-[#1D2D44]/65 font-light flex-1">
//           {body}
//         </p>
//         <a
//           href={applyHref}
//           className="mt-4 w-fit font-poppins inline-flex items-center gap-3 border border-gray-200 border-b-2 border-b-[#7DC0F1] px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-300 group/btn hover:text-gray-900"
//         >
//           <span>To Apply, click here</span>
//           <svg
//             className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             strokeWidth={2.5}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M17 8l4 4m0 0l-4 4m4-4H3"
//             />
//           </svg>
//         </a>
//       </div>
//     </motion.article>
//   );
// }

// // ─── Page ───────────────────────────────────────────────────────────────────
// export default function ProfessionalsPage() {
//   const section1Ref = useRef(null);
//   const section2Ref = useRef(null);
//   const customizedRef = useRef(null);
//   const openEnrollmentRef = useRef(null);
//   const professionalCertRef = useRef(null);
//   const isSection1InView = useInView(section1Ref, {
//     once: true,
//     margin: "-80px",
//   });
//   const isSection2InView = useInView(section2Ref, {
//     once: true,
//     margin: "-80px",
//   });
//   const isCustomizedInView = useInView(customizedRef, {
//     once: true,
//     margin: "-80px",
//   });
//   const isOpenEnrollmentInView = useInView(openEnrollmentRef, {
//     once: true,
//     amount: 0.2,
//   });
//   const isProfessionalCertInView = useInView(professionalCertRef, {
//     once: true,
//     amount: 0.2,
//   });

//   return (
//     <>
//       <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

//       <main className="min-h-screen bg-[#FAFAF8] font-poppins pt-20">
//         {/* ── Hero ── */}
//         <section className="relative overflow-hidden flex items-end justify-start h-[55vh]">
//           <div className="absolute inset-0">
//             <Image
//               src="/image/Grants.jpg"
//               alt=""
//               fill
//               priority
//               sizes="100vw"
//               className="object-cover object-center"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-[#1D2D44]/30 via-[#1D2D44]/40 to-[#1D2D44]/50" />
//           </div>

//           <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
//             <div className="text-left">
//               <motion.div
//                 className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.3em] text-white/70 mb-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//               >
//                 <span className="text-white/60">Learning & Development</span>
//               </motion.div>
//               <motion.h1
//                 className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] mb-6 text-left"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
//               >
//                 Professionals
//               </motion.h1>
//             </div>
//           </div>

//           <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-[#FAFAF8]" />
//         </section>

//         {/* ── Section 1: Professional Development Learning ── */}
//         <section ref={section1Ref} className="py-20 sm:py-28">
//           <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
//             <motion.div
//               className="mb-14"
//               initial={{ opacity: 0, y: 40 }}
//               animate={
//                 isSection1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
//               }
//               transition={{ duration: 0.6, ease: "easeOut" as const }}
//             >
//               <h2 className="font-poppins text-2xl sm:text-3xl font-semibold text-[#1D2D44] tracking-tight">
//                 Professional Development Learning
//               </h2>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div ref={openEnrollmentRef}>
//                 <ProgramCard
//                   title="Open enrollment courses"
//                   body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in courses by subject matter expert practitioners. This activity would focus on developing specific skills needed for organizational development. Short-courses (up to 5 days) are offered to all employee levels in open enrollment style. Courses are delivered with latest and highest standard of learning delivery. Seats are open to all Kuwaiti citizens, targeting the entire workforce population."
//                   imageSrc="/image/OE.jpg"
//                   applyHref="#"
//                   delay={0}
//                   accent="orange"
//                   titleAsH2
//                   titleInOrangeBar
//                   isInView={isOpenEnrollmentInView}
//                 />
//               </div>
//               <div ref={professionalCertRef}>
//                 <ProgramCard
//                   title="Professional Certificate Incentive Scheme"
//                   body="KFAS offer grants to enhance the capabilities of the Kuwaiti human capital and sharpen their professional skills by a scheme to encourage individuals to obtain their professional credentials. An attractive monetary reward is given upon successfully obtaining the professional certificate. The amount of the reward will be determined based on KFAS policies and procedures for rewards."
//                   imageSrc="/image/back4.webp"
//                   applyHref="#"
//                   delay={0}
//                   accent="blue"
//                   titleInOrangeBar
//                   isInView={isProfessionalCertInView}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Section 2: Executive Education ── */}
//         <section ref={section2Ref} className="py-20 sm:py-28">
//           <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
//             <motion.div
//               className="mb-14"
//               initial={{ opacity: 0, y: 40 }}
//               animate={
//                 isSection2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
//               }
//               transition={{ duration: 0.6, ease: "easeOut" as const }}
//             >
//               <h2 className="font-poppins text-2xl sm:text-3xl font-semibold text-[#1D2D44] tracking-tight">
//                 Executive Education
//               </h2>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//               <ProgramCard
//                 title="Local courses"
//                 body="KFAS bring executive education short-courses offered by international academic institutions on selected topics (in line with KFAS strategic direction) to Kuwait to offer seats locally and would be available to all Kuwaiti citizens."
//                 imageSrc="/image/InstagramPost.png"
//                 applyHref="#"
//                 delay={0}
//                 accent="orange"
//                 titleInOrangeBar
//                 isInView={isSection2InView}
//               />
//               <ProgramCard
//                 title="Aboard courses (international open enrollment programs)"
//                 body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in programs already offered by academic institutions. This would allow participants to interact and exchange knowledge with other participants from around the world."
//                 imageSrc="/image/KfasBuilding2.png"
//                 applyHref="#"
//                 delay={0.1}
//                 accent="blue"
//                 titleInOrangeBar
//                 isInView={isSection2InView}
//               />
//             </div>

//             {/* Customized Programs */}
//             <motion.div
//               ref={customizedRef}
//               className="relative overflow-hidden rounded-xl border border-[#1D2D44]/08 bg-white p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-[#EC601B]/30 hover:shadow-[0_20px_50px_-12px_rgba(29,45,68,0.08)]"
//               initial={{ opacity: 0, y: 40 }}
//               animate={
//                 isCustomizedInView
//                   ? { opacity: 1, y: 0 }
//                   : { opacity: 0, y: 40 }
//               }
//               transition={{ duration: 0.6, ease: "easeOut" as const }}
//             >
//               <div className="absolute top-0 left-0 h-1 w-24 rounded-r-full bg-[#EC601B]" />
//               <h3 className="font-poppins text-xl font-semibold text-[#1D2D44] leading-snug mb-3">
//                 Customized Programs
//               </h3>
//               <div className="h-0.5 w-10 bg-[#EC601B] rounded-full mb-6" />
//               <p className="font-poppins text-sm leading-[1.9] text-[#1D2D44]/65 font-light max-w-2xl mb-8">
//                 KFAS partners with academic institutions to create customized
//                 programs specifically for participants from Kuwait, offering
//                 blended and experiential learning experiences taught over a
//                 period of months.
//               </p>
//               <a
//                 href="#"
//                 className="w-fit font-poppins inline-flex items-center gap-3 border border-gray-200 border-b-2 border-b-[#7DC0F1] px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-300 group/btn hover:text-gray-900"
//               >
//                 <span>To Apply, click here</span>
//                 <svg
//                   className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2.5}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M17 8l4 4m0 0l-4 4m4-4H3"
//                   />
//                 </svg>
//               </a>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-[#1D2D44]/08">
//                 <SubProgramCard
//                   title="KFAS Innovation Challenge"
//                   imageSrc="/image/KFASInnovation.jpg"
//                   body="One of our standout executive education programs is the annual KFAS Innovation Challenge, in which a small group of selected companies work with prestigious business schools to develop new initiatives and projects that advance a culture of innovation. After a competitive application process, executives and business leaders spend three to four months in structured learning and training, tackling a company-specific challenge."
//                   applyHref="#"
//                   delay={0}
//                   titleInBar
//                   isInView={isCustomizedInView}
//                 />
//                 <SubProgramCard
//                   title="Harvard Kennedy School Program"
//                   imageSrc="/image/Harvard.jpg"
//                   body="A custom executive education program targeting the needs of the Kuwait private sector. Led by Professor Kessely Hong, the Harvard Kennedy School faculty team designed an impactful curriculum tailored to address the challenges and opportunities presented to managers — equipping them with collaborative and innovative tools for today's reality."
//                   applyHref="#"
//                   delay={0.05}
//                   titleInBar
//                   isInView={isCustomizedInView}
//                 />
//                 <SubProgramCard
//                   title="KFAS High Potential Leadership Program"
//                   imageSrc="/image/kfas-hipo.jpg"
//                   body="The vitality of every organization is dependent on the strength of its future leaders. By identifying high potential (Hi-Po) leadership candidates early and supporting their development, organizations drive significant returns on their human capital investments — maximizing strategic initiative, market competitiveness, and overall growth."
//                   applyHref="#"
//                   delay={0.1}
//                   titleInBar
//                   isInView={isCustomizedInView}
//                 />
//               </div>
//             </motion.div>
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

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Types ───────────────────────────────────────────────────────────────────

type Accent = "orange" | "blue";

interface CardBase {
  title: string;
  body: string;
  imageSrc?: string;
  applyHref?: string;
  delay?: number;
  isInView?: boolean;
}

interface ProgramCardProps extends CardBase {
  accent?: Accent;
  titleAsH2?: boolean;
}

interface SubProgramCardProps extends CardBase {}

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT_COLORS: Record<Accent, string> = {
  orange: "#EC601B",
  blue: "#7DC0F1",
};

const NAVY = "#1D2D44";

// ─── Motion helpers ───────────────────────────────────────────────────────────

/** Build consistent fade-up props, supporting both whileInView and controlled isInView. */
function fadeUp(delay = 0, isInView?: boolean) {
  if (isInView !== undefined) {
    return {
      initial: { opacity: 0, y: 44, filter: "blur(6px)" },
      animate: isInView
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, y: 44, filter: "blur(6px)" },
      transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
    };
  }
  return {
    initial: { opacity: 0, y: 44, filter: "blur(6px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

// ─── Magnetic card hook ───────────────────────────────────────────────────────

function useMagneticHover(strength = 10) {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      setTilt({
        x: ((e.clientY - cy) / height) * -strength,
        y: ((e.clientX - cx) / width) * strength,
      });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return { ref, tilt, onMouseMove, onMouseLeave };
}

// ─── Accent bar (animated shimmer) ───────────────────────────────────────────

function AccentBar({ color }: { color: string }) {
  return (
    <div className="relative h-1 w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)`,
        }}
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─── Apply link ───────────────────────────────────────────────────────────────

function ApplyLink({ href = "#" }: { href?: string }) {
  return (
    <a
      href={href}
      className="mt-6 w-fit inline-flex items-center gap-3 border border-gray-200 border-b-2 border-b-[#7DC0F1] px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-300 hover:text-gray-900 group/btn font-poppins"
    >
      <span>To Apply, click here</span>
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
  );
}

// ─── Program card ─────────────────────────────────────────────────────────────

function ProgramCard({
  title,
  body,
  imageSrc,
  applyHref,
  delay = 0,
  accent = "orange",
  titleAsH2 = false,
  isInView,
}: ProgramCardProps) {
  const color = ACCENT_COLORS[accent];
  const { ref, tilt, onMouseMove, onMouseLeave } = useMagneticHover(6);
  const TitleTag = titleAsH2 ? "h2" : "h3";
  const fadeProps = fadeUp(delay, isInView);
  const { transition: _t, ...restFade } = fadeProps;
  const mergedTransition = {
    rotateX: { type: "spring" as const, stiffness: 260, damping: 22 },
    rotateY: { type: "spring" as const, stiffness: 260, damping: 22 },
    opacity: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
    y: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
    filter: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <motion.article
      ref={ref as React.Ref<HTMLElement>}
      className="group relative flex flex-col overflow-hidden bg-white border border-[#1D2D44]/08 cursor-default"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={mergedTransition}
      {...restFade}
      whileHover={{
        boxShadow: "0 24px 60px -12px rgba(29,45,68,0.14)",
        borderColor: `${color}30`,
      }}
    >
      {/* Shimmer accent bar */}
      <AccentBar color={color} />

      <div className="flex flex-col flex-1 p-8 sm:p-10">
        {/* Image */}
        {imageSrc && (
          <div className="relative aspect-[16/10] overflow-hidden -mx-8 -mt-8 mb-0">
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
                background: `linear-gradient(to top, rgba(29,45,68,0.45) 0%, transparent 60%)`,
              }}
            />
          </div>
        )}

        {/* Title bar */}
        <div
          className="-mx-8 px-8 py-4 flex items-center transition-colors duration-300"
          style={{ backgroundColor: color }}
        >
          <TitleTag className="font-poppins text-xl font-semibold text-white leading-snug">
            {title}
          </TitleTag>
        </div>

        <div className="mb-5" />

        <p className="font-poppins text-sm leading-[1.9] text-[#1D2D44]/65 font-light flex-1">
          {body}
        </p>

        <ApplyLink href={applyHref} />
      </div>
    </motion.article>
  );
}

// ─── Sub-program card ─────────────────────────────────────────────────────────

function SubProgramCard({
  title,
  body,
  imageSrc,
  applyHref,
  delay = 0,
  isInView,
}: SubProgramCardProps) {
  const { ref, tilt, onMouseMove, onMouseLeave } = useMagneticHover(5);
  const fadeProps = fadeUp(delay, isInView);
  const { transition: _t, ...restFade } = fadeProps;
  const mergedTransition = {
    rotateX: { type: "spring" as const, stiffness: 260, damping: 22 },
    rotateY: { type: "spring" as const, stiffness: 260, damping: 22 },
    opacity: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
    y: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
    filter: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <motion.article
      ref={ref as React.Ref<HTMLElement>}
      className="group relative flex flex-col overflow-hidden bg-white border border-[#1D2D44]/08 cursor-default"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={mergedTransition}
      {...restFade}
      whileHover={{
        boxShadow: "0 16px 40px -12px rgba(125,192,241,0.22)",
        borderColor: "rgba(125,192,241,0.35)",
      }}
    >
      <AccentBar color="#7DC0F1" />

      <div className="flex flex-col flex-1 p-6 sm:p-8">
        {imageSrc && (
          <div className="relative aspect-[16/10] overflow-hidden -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-0">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* Blue title bar */}
        <div className="-mx-6 sm:-mx-8 px-6 sm:px-8 py-3 flex items-center bg-[#7DC0F1]">
          <h4 className="font-poppins text-lg font-semibold text-white leading-snug">
            {title}
          </h4>
        </div>

        <div className="mb-4" />

        <p className="font-poppins text-sm leading-[1.85] text-[#1D2D44]/65 font-light flex-1">
          {body}
        </p>

        <ApplyLink href={applyHref} />
      </div>
    </motion.article>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({
  children,
  isInView,
}: {
  children: React.ReactNode;
  isInView: boolean;
}) {
  return (
    <motion.div className="mb-14" {...fadeUp(0, isInView)}>
      <h2 className="font-poppins text-2xl sm:text-3xl font-semibold text-[#1D2D44] tracking-tight">
        {children}
      </h2>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfessionalsPage() {
  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  // Section refs
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const customizedRef = useRef(null);
  const openEnrollmentRef = useRef(null);
  const professionalCertRef = useRef(null);

  const isSection1InView = useInView(section1Ref, {
    once: true,
    margin: "-80px",
  });
  const isSection2InView = useInView(section2Ref, {
    once: true,
    margin: "-80px",
  });
  const isCustomizedInView = useInView(customizedRef, {
    once: true,
    amount: 0.15,
  });
  const isOpenEnrollmentInView = useInView(openEnrollmentRef, {
    once: true,
    amount: 0.2,
  });
  const isProfessionalCertInView = useInView(professionalCertRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

      <main className="min-h-screen bg-[#FAFAF8] font-poppins pt-20">
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-end justify-start h-[55vh]"
        >
          {/* Parallax image */}
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
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(29,45,68,0.3) 0%, rgba(29,45,68,0.4) 50%, rgba(29,45,68,0.55) 100%)",
              }}
            />
          </motion.div>

          {/* Hero text */}
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

            {/* Decorative line */}
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

        {/* ── Section 1: Professional Development Learning ── */}
        <section ref={section1Ref} className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <SectionHeading isInView={isSection1InView}>
              Professional Development Learning
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div ref={openEnrollmentRef}>
                <ProgramCard
                  title="Open enrollment courses"
                  body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in courses by subject matter expert practitioners. This activity would focus on developing specific skills needed for organizational development. Short-courses (up to 5 days) are offered to all employee levels in open enrollment style. Courses are delivered with latest and highest standard of learning delivery. Seats are open to all Kuwaiti citizens, targeting the entire workforce population."
                  imageSrc="/image/OE.jpg"
                  applyHref="#"
                  delay={0}
                  accent="orange"
                  titleAsH2
                  isInView={isOpenEnrollmentInView}
                />
              </div>
              <div ref={professionalCertRef}>
                <ProgramCard
                  title="Professional Certificate Incentive Scheme"
                  body="KFAS offer grants to enhance the capabilities of the Kuwaiti human capital and sharpen their professional skills by a scheme to encourage individuals to obtain their professional credentials. An attractive monetary reward is given upon successfully obtaining the professional certificate. The amount of the reward will be determined based on KFAS policies and procedures for rewards."
                  imageSrc="/image/back4.webp"
                  applyHref="#"
                  delay={0}
                  accent="blue"
                  isInView={isProfessionalCertInView}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Executive Education ── */}
        <section ref={section2Ref} className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <SectionHeading isInView={isSection2InView}>
              Executive Education
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <ProgramCard
                title="Local courses"
                body="KFAS bring executive education short-courses offered by international academic institutions on selected topics (in line with KFAS strategic direction) to Kuwait to offer seats locally and would be available to all Kuwaiti citizens."
                imageSrc="/image/InstagramPost.png"
                applyHref="#"
                delay={0}
                accent="orange"
                isInView={isSection2InView}
              />
              <ProgramCard
                title="Aboard courses (international open enrollment programs)"
                body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in programs already offered by academic institutions. This would allow participants to interact and exchange knowledge with other participants from around the world."
                imageSrc="/image/KfasBuilding2.png"
                applyHref="#"
                delay={0.1}
                accent="blue"
                isInView={isSection2InView}
              />
            </div>

            {/* ── Customized Programs ── */}
            <motion.div
              ref={customizedRef}
              className="relative overflow-hidden border border-[#1D2D44]/08 bg-white p-8 sm:p-10 lg:p-12 transition-colors duration-300 hover:border-[#EC601B]/25"
              {...fadeUp(0, isCustomizedInView)}
              whileHover={{
                boxShadow: "0 20px 50px -12px rgba(29,45,68,0.08)",
              }}
            >
              {/* Corner accent */}
              <motion.div
                className="absolute top-0 left-0 h-1 rounded-r-full bg-[#EC601B]"
                initial={{ width: 0 }}
                animate={isCustomizedInView ? { width: 96 } : { width: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              <h3 className="font-poppins text-xl font-semibold text-[#1D2D44] leading-snug mb-3">
                Customized Programs
              </h3>
              <div className="h-0.5 w-10 bg-[#EC601B] rounded-full mb-6" />

              <p className="font-poppins text-sm leading-[1.9] text-[#1D2D44]/65 font-light max-w-2xl mb-8">
                KFAS partners with academic institutions to create customized
                programs specifically for participants from Kuwait, offering
                blended and experiential learning experiences taught over a
                period of months.
              </p>

              <ApplyLink href="#" />

              {/* Sub-cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-10 border-t border-[#1D2D44]/08">
                <SubProgramCard
                  title="KFAS Innovation Challenge"
                  imageSrc="/image/KFASInnovation.jpg"
                  body="One of our standout executive education programs is the annual KFAS Innovation Challenge, in which a small group of selected companies work with prestigious business schools to develop new initiatives and projects that advance a culture of innovation. After a competitive application process, executives and business leaders spend three to four months in structured learning and training, tackling a company-specific challenge."
                  applyHref="#"
                  delay={0}
                  isInView={isCustomizedInView}
                />
                <SubProgramCard
                  title="Harvard Kennedy School Program"
                  imageSrc="/image/Harvard.jpg"
                  body="A custom executive education program targeting the needs of the Kuwait private sector. Led by Professor Kessely Hong, the Harvard Kennedy School faculty team designed an impactful curriculum tailored to address the challenges and opportunities presented to managers — equipping them with collaborative and innovative tools for today's reality."
                  applyHref="#"
                  delay={0.08}
                  isInView={isCustomizedInView}
                />
                <SubProgramCard
                  title="KFAS High Potential Leadership Program"
                  imageSrc="/image/kfas-hipo.jpg"
                  body="The vitality of every organization is dependent on the strength of its future leaders. By identifying high potential (Hi-Po) leadership candidates early and supporting their development, organizations drive significant returns on their human capital investments — maximizing strategic initiative, market competitiveness, and overall growth."
                  applyHref="#"
                  delay={0.16}
                  isInView={isCustomizedInView}
                />
              </div>
            </motion.div>
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
