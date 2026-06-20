"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;

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
      <div className="flex flex-col items-center gap-4">
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OurTeamPage() {
  const heroRef = useRef(null);
  const profileRef = useRef(null);
  const deputiesRef = useRef(null);
  const officersRef = useRef(null);
  const directorsRef = useRef(null);
  const directors2Ref = useRef(null);
  const directors3Ref = useRef(null);

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
  const isDirectorsInView = useInView(directorsRef, {
    once: true,
    margin: "-80px",
  });
  const isDirectors2InView = useInView(directors2Ref, {
    once: true,
    margin: "-80px",
  });
  const isDirectors3InView = useInView(directors3Ref, {
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
          className="relative flex h-[540px] items-center justify-start overflow-hidden bg-[#1D2D44]"
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
            className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12"
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 justify-items-center">
              <ProfileCard
                imageSrc="/image/DrSalehAlqgeely.png"
                imageAlt="Saleh A. Alaqely"
                name="Dr. Saleh A. Alaqely"
                title="Deputy Director General - Support Services"
                isInView={isDeputiesInView}
                animationDelay={0}
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/DrFahadAlfadhli.png"
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
        <section ref={officersRef} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 justify-items-center max-w-3xl mx-auto">
              <ProfileCard
                imageSrc="/image/AbdullahBuQmashah.png"
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

        {/* ── Senior Directors row 1 ── */}
        <section ref={directorsRef} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 justify-items-center">
              <ProfileCard
                imageSrc="/image/EmanHabib.png"
                imageAlt="Eman H. Hussain"
                name="Eman H. Hussain"
                title="Board Secretary"
                isInView={isDirectorsInView}
                animationDelay={0}
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/YousefAlmazeedi.png"
                imageAlt="Yousef M. AlMazeedi"
                name="Yousef M. AlMazeedi"
                title="Senior Director - Communications"
                isInView={isDirectorsInView}
                animationDelay={0.05}
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/MubarakAlQuood.png"
                imageAlt="Mubarak A. Al-Quoud"
                name="Mubarak A. Al-Quoud"
                title="Senior Director - Accounts"
                isInView={isDirectorsInView}
                animationDelay={0.1}
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/HasanAkbar.png"
                imageAlt="Hasan A. Akbar"
                name="Hasan A. Akbar"
                title="Senior Director - Information Technology"
                isInView={isDirectorsInView}
                animationDelay={0.15}
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/ManarAlmousa.png"
                imageAlt="Manar A. AlMoussa"
                name="Manar A. AlMoussa"
                title="Senior Director - Prizes"
                isInView={isDirectorsInView}
                animationDelay={0.2}
                layout="vertical"
                compact
              />
            </div>
          </div>
        </section>

        {/* ── Senior Directors row 2 ── */}
        <section ref={directors2Ref} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 justify-items-center">
              <ProfileCard
                imageSrc="/image/DinaAlnaqeeb.png"
                imageAlt="Dina N. Alnakib"
                name="Dina N. Alnakib"
                title="Senior Director - Research & Technology Deployment"
                isInView={isDirectors2InView}
                animationDelay={0}
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/KhalodounHarmi.png"
                imageAlt="Khaldoun K. Harmi"
                name="Khaldoun K. Harmi"
                title="Senior Director - Planning & Development"
                isInView={isDirectors2InView}
                animationDelay={0.05}
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/HananAlebrahim.png"
                imageAlt="Hanan I. Alibrahim"
                name="Hanan I. Alibrahim"
                title="Senior Director - Monitoring & Evaluation"
                isInView={isDirectors2InView}
                animationDelay={0.1}
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/AbdulAziziAbduljalil.png"
                imageAlt="Abdulaziz S. Alabduljalil"
                name="Abdulaziz S. Alabduljalil"
                title="Director - Engineering & Administration"
                isInView={isDirectors2InView}
                animationDelay={0.15}
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/YousefAlabdullah.png"
                imageAlt="Yousef A. Alabdullah"
                name="Yousef A. Alabdullah"
                title="Director - Enterprise Learning & Development"
                isInView={isDirectors2InView}
                animationDelay={0.2}
                layout="vertical"
                compact
              />
            </div>
          </div>
        </section>

        {/* ── Directors ── */}
        <section ref={directors3Ref} className="bg-white pb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 justify-items-center">
              <ProfileCard
                imageSrc="/image/NouriaAlBader.png"
                imageAlt="Nouria A. AlBader"
                name="Nouria A. AlBader"
                title="Director - Investment & Treasury"
                isInView={isDirectors3InView}
                animationDelay={0}
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/AishaAlDuaij.png"
                imageAlt="Aisha H. AlDuaij"
                name="Aisha H. AlDuaij"
                title="Director - Human Resources"
                isInView={isDirectors3InView}
                animationDelay={0.1}
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/AbrarAlmosa.png"
                imageAlt="Abrar S. Almoosa"
                name="Abrar S. Almoosa"
                title="Director - Research Capacity Building"
                isInView={isDirectors3InView}
                animationDelay={0.2}
                layout="vertical"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
