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
}: {
  imageSrc?: string;
  imageAlt: string;
  name: string;
  title: string;
  usePlaceholder?: boolean;
  isInView: boolean;
  animationDelay?: number;
  borderPosition?: "left" | "right";
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
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
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 bg-blue-50 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
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
        className={`flex-1 min-w-0 relative ${borderPosition === "right" ? "pr-8 pb-6" : ""}`}
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 0.6, delay: animationDelay + 0.15, ease: "easeOut" }}
      >
        {borderPosition === "right" && (
          <div
            className="absolute bottom-0 right-0 w-20 h-20 border-r-[1.5px] border-b-[1.5px] border-[#56A0D7]/90 pointer-events-none"
            style={{ borderBottomRightRadius: "2px" }}
            aria-hidden
          />
        )}
        <p className="font-montserrat text-base sm:text-lg font-bold text-gray-900 leading-tight tracking-tight">
          {name}
        </p>
        <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm sm:text-base text-gray-700/95 leading-relaxed">
          <li>{title}</li>
        </ul>
      </motion.div>
    </div>
  );
}

export default function BoardOfDirectorsPage() {
  const profileRef = useRef(null);
  const deputiesRef = useRef(null);
  const isInView = useInView(profileRef, { once: true, margin: "-80px" });
  const isDeputiesInView = useInView(deputiesRef, { once: true, margin: "-80px" });

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
              src="/image/KFASBuilding2.png"
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
      </main>
      <Footer />
    </>
  );
}
