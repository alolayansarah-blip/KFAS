"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
}: {
  imageSrc?: string;
  imageAlt: string;
  name: React.ReactNode;
  title: string;
  usePlaceholder?: boolean;
  isInView: boolean;
  animationDelay?: number;
  borderPosition?: "left" | "right";
  layout?: "horizontal" | "vertical";
  compact?: boolean;
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
          isVertical
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
        {borderPosition === "right" && isVertical && (
          <div
            className={`absolute border-r-[1.5px] border-b-[1.5px] border-[#56A0D7]/80 pointer-events-none ${
              compact ? "bottom-2 right-2 w-10 h-10" : "bottom-3 right-3 w-14 h-14"
            }`}
            style={{ borderBottomRightRadius: "2px" }}
            aria-hidden
          />
        )}
        {borderPosition === "right" && !isVertical && (
          <div
            className="absolute bottom-0 right-0 w-20 h-20 border-r-[1.5px] border-b-[1.5px] border-[#56A0D7]/90 pointer-events-none"
            style={{ borderBottomRightRadius: "2px" }}
            aria-hidden
          />
        )}
        <p
          className={`font-poppins font-bold text-gray-900 leading-tight ${
            isVertical
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
            isVertical
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

export default function BoardOfDirectorsPage() {
  const chairmanRef = useRef(null);
  const membersRef = useRef(null);
  const members2Ref = useRef(null);
  const isChairmanInView = useInView(chairmanRef, { once: true, margin: "-80px" });
  const isMembersInView = useInView(membersRef, { once: true, margin: "-80px" });
  const isMembers2InView = useInView(members2Ref, { once: true, margin: "-80px" });
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
              <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] mb-6">
                Board of Directors
              </h1>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </motion.section>

        <section ref={chairmanRef} className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl mx-auto">
              <ProfileCard
                imageSrc="/image/SHIEKH%20MESHAAL%20JABER%20AL%20SABAH-%20BM.png"
                imageAlt="H.H. The Amir Sheikh Meshal Al-Ahmad Al-Jaber Al-Sabah"
                name={
                  <>
                    H.H. The Amir
                    <br />
                    Sheikh Meshal Al-Ahmad Al-Jaber Al-Sabah
                  </>
                }
                title="Chairman"
                isInView={isChairmanInView}
              />
            </div>
          </div>
        </section>

        <section ref={membersRef} className="bg-white pb-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 justify-items-center">
              <ProfileCard
                imageSrc="/image/ShaikhAhmadAlsabah.png"
                imageAlt="H.H the Prime Minister of Kuwait Sheikh Ahmad Abdullah Al-Ahmad Al-Sabah"
                name="H.H the Prime Minister of Kuwait Sheikh Ahmad Abdullah Al-Ahmad Al-Sabah"
                title="Board Member"
                isInView={isMembersInView}
                animationDelay={0}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/AbdullahAlghunaim.png"
                imageAlt="H.E. Dr. Abdullah Yousef Al-Ghunaim"
                name="H.E. Dr. Abdullah Yousef Al-Ghunaim"
                title="Board Member"
                isInView={isMembersInView}
                animationDelay={0.05}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/DrMeshalJaberAlAhmed.png"
                imageAlt="H.E. Sheikh Dr. Meshaal Jaber Al-Ahmed Al-Sabah"
                name="H.E. Sheikh Dr. Meshaal Jaber Al-Ahmed Al-Sabah"
                title="Board Member"
                isInView={isMembersInView}
                animationDelay={0.1}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/DrIbrahimAlRashdan.png"
                imageAlt="Dr. Ibrahim Rashid Al Rashdan"
                name="Dr. Ibrahim Rashid Al Rashdan"
                title="Board Member"
                isInView={isMembersInView}
                animationDelay={0.15}
                borderPosition="right"
                layout="vertical"
                compact
              />
            </div>
          </div>
        </section>

        <section ref={members2Ref} className="bg-white pb-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 justify-items-center">
              <ProfileCard
                imageSrc="/image/MRAhmedAldhakheel.png"
                imageAlt="Mr. Ahmad Aldekheel"
                name="Mr. Ahmad Aldekheel"
                title="Board Member"
                isInView={isMembers2InView}
                animationDelay={0}
                borderPosition="right"
                layout="vertical"
                compact
              />
              <ProfileCard
                imageSrc="/image/DrKhaledAlfadhil.png"
                imageAlt="H. E. Dr. Khaled Ali Al-Fadhel"
                name="H. E. Dr. Khaled Ali Al-Fadhel"
                title="Board Member"
                isInView={isMembers2InView}
                animationDelay={0.1}
                borderPosition="right"
                layout="vertical"
                compact
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
