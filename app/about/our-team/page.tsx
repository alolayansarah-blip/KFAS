"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;

type Person = {
  src: string;
  alt: string;
  name: string;
  title: string;
};

// ─── Data ───────────────────────────────────────────────────────────────────

const directorsRow1: Person[] = [
  {
    src: "/image/Dina.png",
    alt: "Dina N. Alnakib",
    name: "Dina N. Alnakib",
    title: "Senior Director - Research & Technology Deployment",
  },
  {
    src: "/image/Mubarak.png",
    alt: "Mubarak A. Al-Quoud",
    name: "Mubarak A. Al-Quoud",
    title: "Senior Director - Accounts",
  },
  {
    src: "/image/Manar.png",
    alt: "Manar A. AlMoussa",
    name: "Manar A. AlMoussa",
    title: "Senior Director - Prizes",
  },
  {
    src: "/image/Almazeedi.png",
    alt: "Yousef M. AlMazeedi",
    name: "Yousef M. AlMazeedi",
    title: "Senior Director - Communications",
  },
];

const directorsRow2: Person[] = [
  {
    src: "/image/Khaldoun.png",
    alt: "Khaldoun K. Harmi",
    name: "Khaldoun K. Harmi",
    title: "Senior Director - Planning & Development",
  },
  {
    src: "/image/Hanan.png",
    alt: "Hanan I. Alibrahim",
    name: "Hanan I. Alibrahim",
    title: "Senior Director - Monitoring & Evaluation",
  },
  {
    src: "/image/Nouria.png",
    alt: "Nouria A. AlBader",
    name: "Nouria A. AlBader",
    title: "Director - Investment & Treasury",
  },
  {
    src: "/image/Akbar.png",
    alt: "Hasan A. Akbar",
    name: "Hasan A. Akbar",
    title: "Senior Director - Information Technology",
  },
];

const directorsRow3: Person[] = [
  {
    src: "/image/Abduljaleel.png",
    alt: "Abdulaziz S. Alabduljalil",
    name: "Abdulaziz S. Alabduljalil",
    title: "Director - Engineering & Administration",
  },
  {
    src: "/image/YousefAbdullah.png",
    alt: "Yousef A. Alabdullah",
    name: "Yousef A. Alabdullah",
    title: "Director - Enterprise Learning & Development",
  },
  {
    src: "/image/Abrar.png",
    alt: "Abrar S. Almoosa",
    name: "Abrar S. Almoosa",
    title: "Director - Research Capacity Building",
  },
  {
    src: "/image/Aisha.png",
    alt: "Aisha H. AlDuaij",
    name: "Aisha H. AlDuaij",
    title: "Director - Human Resources",
  },
];

// ─── Profile Card ─────────────────────────────────────────────────────────────

function ProfileCard({
  imageSrc,
  imageAlt,
  name,
  title,
  usePlaceholder = false,
  isInView,
  animationDelay = 0,
  layout = "horizontal",
  compact = false,
  large = false,
}: {
  imageSrc?: string;
  imageAlt: string;
  name: string;
  title: string;
  usePlaceholder?: boolean;
  isInView: boolean;
  animationDelay?: number;
  layout?: "horizontal" | "vertical";
  compact?: boolean;
  large?: boolean;
}) {
  const isVertical = layout === "vertical";

  const imgSize = "w-44 h-44 sm:w-52 sm:h-52";

  if (isVertical) {
    return (
      <div className="flex w-44 flex-col items-center gap-4 sm:w-52">
        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: animationDelay, ease: EASE }}
        >
          <div className="absolute -left-2 -top-2 h-6 w-6 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 pointer-events-none z-10" />
          <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none z-10" />
          <div
            className={`relative overflow-hidden bg-[#1D2D44]/[0.03] ${imgSize}`}
          >
            {usePlaceholder ? (
              <div className="w-full h-full flex items-center justify-center bg-[#1D2D44]/[0.05] text-[#1D2D44]/20">
                <User className="w-16 h-16" strokeWidth={1} />
              </div>
            ) : (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.5,
            delay: animationDelay + 0.12,
            ease: EASE,
          }}
        >
          <p
            className={`font-poppins font-semibold text-[#1D2D44] leading-snug tracking-tight ${large ? "text-base" : compact ? "text-[13px] sm:text-[14px]" : "text-[14px] sm:text-[15px]"}`}
          >
            {name}
          </p>
          <p
            className={`mt-1.5 font-light text-[#EC601B] tracking-wide ${large ? "text-[12px]" : compact ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-[12px]"}`}
          >
            {title}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
      <motion.div
        className="relative shrink-0"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6, delay: animationDelay, ease: EASE }}
      >
        <div className="absolute -left-2 -top-2 h-7 w-7 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 pointer-events-none z-10" />
        <div className="absolute -bottom-2 -right-2 h-7 w-7 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none z-10" />
        <div
          className={`relative overflow-hidden bg-[#1D2D44]/[0.03] ${imgSize}`}
        >
          {usePlaceholder ? (
            <div className="w-full h-full flex items-center justify-center bg-[#1D2D44]/[0.05] text-[#1D2D44]/20">
              <User className="w-16 h-16" strokeWidth={1} />
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </motion.div>

      <motion.div
        className="flex-1 text-center sm:text-left sm:pt-4"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.5, delay: animationDelay + 0.12, ease: EASE }}
      >
        <p className="font-poppins text-base sm:text-lg font-semibold text-[#1D2D44] leading-snug tracking-tight">
          {name}
        </p>
        <p className="mt-2 text-[12px] font-light text-[#EC601B] tracking-wide">
          {title}
        </p>
        <div className="mt-3 h-px w-8 bg-gradient-to-r from-[#EC601B]/40 to-transparent" />
      </motion.div>
    </div>
  );
}

// ─── Team Row ─────────────────────────────────────────────────────────────────

function TeamRow({ label, people }: { label?: string; people: Person[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Optional tier label */}
        {label && (
          <motion.div
            className="mb-12 flex items-center gap-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1D2D44]/55 whitespace-nowrap">
              {label}
            </span>
            <span className="h-px flex-1 bg-[#1D2D44]/10" />
          </motion.div>
        )}

        {/* Fixed 4-up row — 2 per row on mobile */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 md:grid-cols-4 lg:gap-x-10 justify-items-center">
          {people.map((person, index) => (
            <ProfileCard
              key={person.name}
              imageSrc={person.src}
              imageAlt={person.alt}
              name={person.name}
              title={person.title}
              isInView={inView}
              animationDelay={Math.min(index * 0.08, 0.32)}
              layout="vertical"
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OurTeamPage() {
  const heroRef = useRef(null);
  const profileRef = useRef(null);
  const deputiesRef = useRef(null);
  const officersRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const isInView = useInView(profileRef, { once: true, margin: "-80px" });
  const isDeputiesInView = useInView(deputiesRef, {
    once: true,
    margin: "-80px",
  });
  const isOfficersInView = useInView(officersRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#1D2D44]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src="/image/KFASBuilding.webp"
              alt="Our Team"
              className="w-full h-full object-cover object-[center_15%] scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </motion.div>

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
              <span>About</span>
              <span className="text-white/25">/</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Our Team
              </motion.h1>
            </div>
            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ width: 72 }}
            />
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Director General ── */}
        <section ref={profileRef} className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-center">
              <ProfileCard
                imageSrc="/image/DrAmeenah.png"
                imageAlt="Ameenah R. Farhan"
                name="Dr. Ameenah R. Farhan"
                title="Director General"
                isInView={isInView}
                layout="vertical"
                large
              />
            </div>
          </div>
        </section>

        {/* ── Deputy Directors General ── */}
        <section ref={deputiesRef} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
              <ProfileCard
                imageSrc="/image/DrSaleh.png"
                imageAlt="Saleh A. Alaqely"
                name="Dr. Saleh A. Alaqely"
                title="Deputy Director General - Support Services"
                isInView={isDeputiesInView}
                animationDelay={0}
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/DrFahad.png"
                imageAlt="Fahad M. Al-Fadhli"
                name="Dr. Fahad M. Al-Fadhli"
                title="Deputy Director General - Scientific Programs"
                isInView={isDeputiesInView}
                animationDelay={0.1}
                layout="vertical"
              />
            </div>
          </div>
        </section>

        {/* ── Chief Officers ── */}
        <section ref={officersRef} className="bg-white pb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
              <ProfileCard
                imageSrc="/image/AbdullahBuQumashah.png"
                imageAlt="Abdullah S. Abu Qumasha"
                name="Abdullah S. Abu Qumasha"
                title="Chief Strategy Officer"
                isInView={isOfficersInView}
                animationDelay={0}
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/DrBassam.png"
                imageAlt="Dr.Bassam A. Alfaili"
                name="Dr.Bassam A. Alfaili"
                title="Chief Enterprise Development Officer"
                isInView={isOfficersInView}
                animationDelay={0.1}
                layout="vertical"
              />
            </div>
          </div>
        </section>

        {/* ── Directors — row 4 ── */}
        <TeamRow people={directorsRow1} />

        {/* ── Directors — row 5 ── */}
        <TeamRow people={directorsRow2} />

        {/* ── Directors — row 6 ── */}
        <TeamRow people={directorsRow3} />
      </main>
      <Footer />
    </>
  );
}
