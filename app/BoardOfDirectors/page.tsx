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
            isVertical
              ? "w-48 h-48 sm:w-52 sm:h-52 shadow-[0_8px_30px_rgba(86,160,215,0.12)]"
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
          isVertical
            ? "w-[260px] h-[120px] sm:h-[125px] flex flex-col justify-center px-5 py-6 text-center rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] shrink-0"
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
            className="absolute bottom-3 right-3 w-14 h-14 border-r-[1.5px] border-b-[1.5px] border-[#56A0D7]/80 pointer-events-none"
            style={{ borderBottomRightRadius: "3px" }}
            aria-hidden
          />
        )}
        <p
          className={`font-montserrat font-bold text-gray-900 leading-tight ${
            isVertical ? "text-[15px] sm:text-base tracking-wide" : "text-base sm:text-lg tracking-tight"
          }`}
        >
          {name}
        </p>
        <p
          className={`leading-relaxed break-words ${
            isVertical
              ? "mt-2.5 text-[13px] sm:text-sm text-gray-600/95 font-medium tracking-wide"
              : "mt-3 text-sm sm:text-base text-gray-700/95"
          }`}
        >
          {title}
        </p>
      </motion.div>
    </div>
  );
}

export default function BoardOfDirectorsPage() {
  const profileRef = useRef(null);
  const deputiesRef = useRef(null);
  const officersRef = useRef(null);
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
      <main className="min-h-screen bg-white pt-20 font-poppins">
        <motion.section
          className="relative overflow-hidden flex items-center"
          initial={{ height: "70vh" }}
          animate={{ height: "45vh" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute inset-0">
            <img
              src="/image/KfasBuilding2.png"
              alt="Board of Directors"
              className="w-full h-full object-cover object-[center_15%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
                <span className="text-white/60">About</span>
                <span className="text-white/40">/</span>
                <span className="text-white">Board of Directors</span>
              </div>
              <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] mb-6">
                Board of Directors
              </h1>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </motion.section>
        <section ref={profileRef} className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl mx-auto">
              <ProfileCard
                imageSrc="/image/DrAmeenah.png"
                imageAlt="Ameenah Rajab Belal Farhan"
                name="Dr. Ameenah Rajab Farhan"
                title="Director General"
                isInView={isInView}
              />
            </div>
          </div>
        </section>
        <section ref={deputiesRef} className="bg-white pb-16">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
              <ProfileCard
                imageSrc="/image/DrSalehAlqgeely.png"
                imageAlt="Saleh Abdulmohsen Alaqely"
                name="Dr. Saleh Abdulmohsen Alaqely"
                title="Deputy Director General - Support Services"
                usePlaceholder={false}
                isInView={isDeputiesInView}
                animationDelay={0}
                borderPosition="right"
              />
              <ProfileCard
                imageSrc="/image/DrFahadAlfadhli.png"
                imageAlt="Fahad Mohammad Al-Fadhli"
                name="Dr. Fahad Mohammad Al-Fadhli"
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
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 justify-items-center">
              <ProfileCard
                imageSrc="/image/AbdullahBuQmashah.png"
                imageAlt="Abdullah Salem Abu Qumasha"
                name="Abdullah Salem Abu Qumasha"
                title="Chief Strategy Officer"
                usePlaceholder={false}
                isInView={isOfficersInView}
                animationDelay={0}
                borderPosition="right"
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/DrBassam%20Alfeeli.png"
                imageAlt="Bassam Abdulkareem Alfaili"
                name="Bassam Abdulkareem Alfaili"
                title="Chief Enterprise Development Officer"
                usePlaceholder={false}
                isInView={isOfficersInView}
                animationDelay={0.1}
                borderPosition="right"
                layout="vertical"
              />
              <ProfileCard
                imageSrc="/image/AliBuMjdad.png"
                imageAlt="Ali Yahya Bo Mejdad"
                name="Ali Yahya Bo Mejdad"
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
      </main>
      <Footer />
    </>
  );
}
