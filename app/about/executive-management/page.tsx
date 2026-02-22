"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ProfileCard({
  imageSrc,
  imageAlt,
  name,
  title,
  usePlaceholder = false,
  isInView,
  animationDelay = 0,
  borderPosition = "left",
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
  borderPosition?: "left" | "right";
  layout?: "horizontal" | "vertical";
  compact?: boolean;
  large?: boolean;
}) {
  const isVertical = layout === "vertical";

  return (
    <div
      className={`flex items-center gap-6 sm:gap-8 ${
        isVertical ? "flex-col" : "flex-col sm:flex-row"
      }`}
    >
      <motion.div
        className="relative shrink-0"
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.6, delay: animationDelay, ease: "easeOut" }}
      >
        {borderPosition === "left" && (
          <div
            className="absolute -top-4 -left-4 w-full h-full border-l-4 border-b-4 border-[#56A0D7] pointer-events-none"
            aria-hidden
          />
        )}
        <div
          className={`relative bg-blue-50 p-4 ${
            large
              ? "w-56 h-56 sm:w-64 sm:h-64 shadow-[0_8px_30px_rgba(86,160,215,0.12)]"
              : isVertical
                ? compact
                  ? "w-40 h-40 sm:w-44 sm:h-44 shadow-[0_6px_24px_rgba(86,160,215,0.1)]"
                  : "w-48 h-48 sm:w-52 sm:h-52 shadow-[0_8px_30px_rgba(86,160,215,0.12)]"
                : "w-56 h-56 sm:w-64 sm:h-64 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          }`}
        >
          {usePlaceholder ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <User className="w-24 h-24" strokeWidth={1.5} />
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </motion.div>
      <motion.div
        className={`min-w-0 relative ${
          large
            ? "w-[300px] h-[140px] sm:h-[150px] flex flex-col justify-center px-5 py-6 text-center rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] shrink-0"
            : isVertical
              ? compact
                ? "w-[200px] h-[100px] sm:h-[108px] flex flex-col justify-center px-4 py-4 text-center rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.04)] shrink-0"
                : "w-[260px] h-[120px] sm:h-[125px] flex flex-col justify-center px-5 py-6 text-center rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] shrink-0"
              : "text-left flex-1"
        } ${borderPosition === "right" && !isVertical ? "pr-8 pb-6" : ""}`}
        initial={{ opacity: 0, y: isVertical ? 16 : 0, x: isVertical ? 0 : 40 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0, y: isVertical ? 16 : 0, x: isVertical ? 0 : 40 }
        }
        transition={{
          duration: 0.6,
          delay: animationDelay + 0.15,
          ease: "easeOut",
        }}
      >
        {borderPosition === "right" && !isVertical && (
          <div
            className="absolute bottom-0 right-0 w-20 h-20 border-r-[1.5px] border-b-[1.5px] border-[#56A0D7]/90 pointer-events-none"
            style={{ borderBottomRightRadius: "2px" }}
            aria-hidden
          />
        )}
        {borderPosition === "right" && isVertical && (
          <div
            className={`absolute border-r-[1.5px] border-b-[1.5px] border-[#56A0D7]/80 pointer-events-none ${
              large
                ? "bottom-3 right-3 w-14 h-14"
                : compact
                  ? "bottom-2 right-2 w-10 h-10"
                  : "bottom-3 right-3 w-14 h-14"
            }`}
            style={{ borderBottomRightRadius: "2px" }}
            aria-hidden
          />
        )}
        <p
          className={`font-poppins font-bold text-gray-900 leading-tight ${
            large
              ? "text-[15px] sm:text-base tracking-wide"
              : isVertical
                ? compact
                  ? "text-[13px] sm:text-[14px] tracking-wide"
                  : "text-[15px] sm:text-base tracking-wide"
                : "text-base sm:text-lg tracking-tight"
          }`}
        >
          {name}
        </p>
        <p
          className={`leading-relaxed break-words ${
            large
              ? "mt-2.5 text-[13px] sm:text-sm text-gray-600/95 font-medium tracking-wide"
              : isVertical
                ? compact
                  ? "mt-1.5 text-[11px] sm:text-xs text-gray-600/95 font-medium tracking-wide"
                  : "mt-2.5 text-[13px] sm:text-sm text-gray-600/95 font-medium tracking-wide"
                : "mt-3 text-sm sm:text-base text-gray-700/95"
          }`}
        >
          {title}
        </p>
      </motion.div>
    </div>
  );
}

export default function ExecutiveManagementPage() {
  const profileRef = useRef(null);
  const deputiesRef = useRef(null);
  const officersRef = useRef(null);
  const directorsRef = useRef(null);
  const directors2Ref = useRef(null);
  const directors3Ref = useRef(null);
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
      <main className="min-h-screen bg-white pt-20 font-poppins">
        <section className="relative overflow-hidden flex items-center h-[55vh]">
          <div className="absolute inset-0">
            <img
              src="/image/KfasBuilding2.png"
              alt="Executive Management"
              className="w-full h-full object-cover object-[center_15%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
                <span className="text-white/60">About</span>
                <span className="text-white/40">/</span>
                <span className="text-white">Executive Management</span>
              </div>
              <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] mb-6">
                Executive Management
              </h1>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>
        <section ref={profileRef} className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 justify-items-center">
              <ProfileCard
                imageSrc="/image/DrAmeenah.png"
                imageAlt="Ameenah R. Farhan"
                name="Dr. Ameenah R. Farhan"
                title="Director General"
                isInView={isInView}
                borderPosition="right"
                layout="vertical"
                compact
                large
              />
            </div>
          </div>
        </section>
        <section ref={deputiesRef} className="bg-white pb-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
              <ProfileCard
                imageSrc="/image/DrSalehAlqgeely.png"
                imageAlt="Saleh A. Alaqely"
                name="Dr. Saleh A. Alaqely"
                title="Deputy Director General - Support Services"
                usePlaceholder={false}
                isInView={isDeputiesInView}
                animationDelay={0}
                borderPosition="right"
              />
              <ProfileCard
                imageSrc="/image/DrFahadAlfadhli.png"
                imageAlt="Fahad M. Al-Fadhli"
                name="Dr. Fahad M. Al-Fadhli"
                title="Deputy Director General - Scientific Programs"
                usePlaceholder={false}
                isInView={isDeputiesInView}
                animationDelay={0.1}
                borderPosition="right"
              />
            </div>
          </div>
        </section>
        <section ref={officersRef} className="bg-white pb-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 justify-items-center">
              <ProfileCard
                imageSrc="/image/AbdullahBuQmashah.png"
                imageAlt="Abdullah S. Abu Qumasha"
                name="Abdullah S. Abu Qumasha"
                title="Chief Strategy Officer"
                usePlaceholder={false}
                isInView={isOfficersInView}
                animationDelay={0}
                borderPosition="right"
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/DrBassam.png"
                imageAlt="Dr.Bassam A. Alfaili"
                name="Dr.Bassam A. Alfaili"
                title="Chief Enterprise Development Officer"
                usePlaceholder={false}
                isInView={isOfficersInView}
                animationDelay={0.1}
                borderPosition="right"
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/AliBuMjdad.png"
                imageAlt="Ali Y. Bumajdad"
                name="Ali Y. Bumajdad"
                title="Chief Research & Technology Officer"
                usePlaceholder={false}
                isInView={isOfficersInView}
                animationDelay={0.2}
                borderPosition="right"
                layout="vertical"
              />
            </div>
          </div>
        </section>
        <section ref={directorsRef} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-6 justify-items-center">
              <ProfileCard
                imageSrc="/image/EmanHabib.png"
                imageAlt="Eman H. Hussain"
                name="Eman H. Hussain"
                title="Board Secretary"
                usePlaceholder={false}
                isInView={isDirectorsInView}
                animationDelay={0}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/YousefAlmazeedi.png"
                imageAlt="Yousef M. AlMazeedi"
                name="Yousef M. AlMazeedi"
                title="Senior Director - Communications"
                usePlaceholder={false}
                isInView={isDirectorsInView}
                animationDelay={0.05}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/MubarakAlQuood.png"
                imageAlt="Mubarak A. Al-Quoud"
                name="Mubarak A. Al-Quoud"
                title="Senior Director - Accounts"
                usePlaceholder={false}
                isInView={isDirectorsInView}
                animationDelay={0.1}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/HasanAkbar.png"
                imageAlt="Hasan A. Akbar"
                name="Hasan A. Akbar"
                title="Senior Director - Information Technology"
                usePlaceholder={false}
                isInView={isDirectorsInView}
                animationDelay={0.15}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/ManarAlmousa.png"
                imageAlt="Manar A. AlMoussa"
                name="Manar A. AlMoussa"
                title="Senior Director - Prizes"
                usePlaceholder={false}
                isInView={isDirectorsInView}
                animationDelay={0.2}
                borderPosition="right"
                layout="vertical"
                compact
              />
            </div>
          </div>
        </section>
        <section ref={directors2Ref} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-6 justify-items-center">
              <ProfileCard
                imageSrc="/image/DinaAlnaqeeb.png"
                imageAlt="Dina N. Alnakib"
                name="Dina N. Alnakib"
                title="Senior Director - Research & Technology Deployment"
                usePlaceholder={false}
                isInView={isDirectors2InView}
                animationDelay={0}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/KhalodounHarmi.png"
                imageAlt="Khaldoun K. Harmi"
                name="Khaldoun K. Harmi"
                title="Senior Director - Planning & Development"
                usePlaceholder={false}
                isInView={isDirectors2InView}
                animationDelay={0.05}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/HananAlebrahim.png"
                imageAlt="Hanan I. Alibrahim"
                name="Hanan I. Alibrahim"
                title="Senior Director - Monitoring & Evaluation"
                usePlaceholder={false}
                isInView={isDirectors2InView}
                animationDelay={0.1}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/AbdulAziziAbduljalil.png"
                imageAlt="Abdulaziz S. Alabduljalil"
                name="Abdulaziz S. Alabduljalil"
                title="Director - Engineering & Administration"
                usePlaceholder={false}
                isInView={isDirectors2InView}
                animationDelay={0.15}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/YousefAlabdullah.png"
                imageAlt="Yousef A. Alabdullah"
                name="Yousef A. Alabdullah"
                title="Director - Enterprise Learning & Development"
                usePlaceholder={false}
                isInView={isDirectors2InView}
                animationDelay={0.2}
                borderPosition="right"
                layout="vertical"
                compact
              />
            </div>
          </div>
        </section>
        <section ref={directors3Ref} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 justify-items-center">
              <ProfileCard
                imageSrc="/image/NouriaAlBader.png"
                imageAlt="Nouria A. AlBader"
                name="Nouria A. AlBader"
                title="Director - Investment & Treasury"
                usePlaceholder={false}
                isInView={isDirectors3InView}
                animationDelay={0}
                borderPosition="right"
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/AishaAlDuaij.png"
                imageAlt="Aisha H. AlDuaij"
                name="Aisha H. AlDuaij"
                title="Director - Human Resources"
                usePlaceholder={false}
                isInView={isDirectors3InView}
                animationDelay={0.1}
                borderPosition="right"
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/AbrarAlmosa.png"
                imageAlt="Abrar S. Almoosa"
                name="Abrar S. Almoosa"
                title="Director - Research Capacity Building"
                usePlaceholder={false}
                isInView={isDirectors3InView}
                animationDelay={0.2}
                borderPosition="right"
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
