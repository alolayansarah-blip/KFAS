"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { User, X } from "lucide-react";
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
  onClick,
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
  onClick?: () => void;
}) {
  const isVertical = layout === "vertical";

  const content = (
    <div
      className={`flex items-center gap-6 sm:gap-8 ${
        isVertical ? "flex-col" : "flex-col sm:flex-row"
      } ${onClick ? "cursor-pointer" : ""}`}
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

  return onClick ? (
    <button type="button" onClick={onClick} className="text-left w-full focus:outline-none focus:ring-2 focus:ring-[#56A0D7]/50 rounded-lg">
      {content}
    </button>
  ) : (
    content
  );
}

const SHEIKH_AHMAD_MODAL_CONTENT = {
  name: "H.H the Prime Minister of Kuwait Sheikh Ahmad Abdullah Al-Ahmad Al-Sabah",
  government: [
    "Chief of The Diwan of H.H. The Crown Prince, since 21st September 2021",
    "Minister of Oil & The Minister of Information May 2009 — May 2011",
    "Minister of Oil February 2009 — May 2009",
    "Minister of Health February 2006 — March 2007",
    "Minister of Health & Minister of Communications June 2005 — February 2006",
    "Minister of Communications & Minister of Planning & Minister of State for Administrative Development February 2001 — July 2005",
    "Minister Finance & Minister of Communications July 1999 - February 2001",
  ],
  privateSector: [
    "Deputy Chairman & Managing Director, Al-Ahli Bank of Kuwait, November 1997 —July 1999",
    "Chairman & Managing Director, Burgan Bank, May 1987 — November 1997",
    "Manager of Banking Supervision Department, Central Bank of Kuwait, 1985 —1987",
    "Acting Manager of Banking Supervision Department, Central Bank of Kuwait, August 1984 — May 1985",
    "Head of Research Section, Central Bank of Kuwait, 1981 —1984",
    "Financial Researcher March 1978 - February 1981",
    "Kuwait Financial Center Financial Analyst, April 1977 — March 1978",
  ],
  otherExperience: [
    "Chairman, Public Services Committee Ministers Cabinet",
    "Chairman, Higher Council of Civil Aviation",
    "Chairman, Board of Kuwait Ports Authority",
    "Chairman, Public Authority for Civil information",
    "Chairman, Council Arab Planning Institute",
    "Chairman, Central Technical Body for Implementing Information Technology in Government Business",
    "Honorary Chairman, Kuwait GIS User Group — Since 2003 to Present",
  ],
  education: [
    "B.A. Business Administration, Finance (Banking & Investment), University of Illinois, USA, 1976",
    "National Evangelical High School, Sidon, Lebanon, 1972",
  ],
};

const ABDULLAH_ALGHUNAIM_MODAL_CONTENT = {
  name: "H.E. Dr. Abdullah Yousef Al-Ghunaim",
  image: "/image/AbdullahAlghunaim.png",
  items: [
    "Minister of Education (1990-1991), and Minister of Education and Higher Education (1996-1998).",
    "President of the Center for Research and Studies on Kuwait (1992 – present).",
    "Professor in the Department of Geography at Kuwait University, Head of the Geography Department and then the Dean of the College of Arts at Kuwait University (1976-1985).",
    "Director of the Institute of Arabic Manuscripts - The Arab League Educational, Cultural and Scientific Organization (1989-1990).",
    "Corresponding member of the Academy of the Arabic Language in Syria and Egypt, and member of the Egyptian Scientific Academy.",
    "Member of the International Academic Council of the Center for Islamic Studies (Oxford University).",
    "Member of the Board of Directors of the Manuscripts Museum - Bibliotheca Alexandrina.",
    "Member of a number of scientific centers and councils, both Arab and international.",
  ],
};

const AHMAD_ALDEKHEEL_MODAL_CONTENT = {
  name: "Mr. Ahmad Aldekheel",
  image: "/image/MRAhmedAldhakheel.png",
  items: [
    "Middle school teacher (15/9/1970) - (14/9/1975)",
    "School Deputy Headmaster (15/9/1975) - (8/9/1976)",
    "Academic Study Leave (9/9/1976) - (15/2/1980)",
    "Head of Cultural Activity Section in School Activities Department (11/2/1980) - (3/10/1980)",
    "Administrative Director, College of Education, Kuwait University (KU) (4/10/1980) - (3/10/1993)",
    "KU Assistant Secretary General for Services Affairs (15/10/1996) - (24/2/2001)",
    "KU Assistant Secretary General for Financial and Administrative Affairs (15/10/1996) - (24/2/2001)",
    "KU Acting Secretary General (1/9/2002) – (31/8/2003)",
    "Chairman of the Board of Directors of KU Social Security Fund (20/11/1992) - (10/6/1996)",
    "Chairman and Managing Director of the Kuwait International Advanced Industries Company (KAI) (2/1/2004) - (1/1/2014)",
    "Advisor to the Director of KU (2016 - 2019)",
  ],
};

const KHALED_ALFADHEL_MODAL_CONTENT = {
  name: "H. E. Dr. Khaled Ali Al-Fadhel",
  image: "/image/DrKhaledAlfadhil.png",
  sections: [
    {
      label: "Academic Degrees",
      items: [
        "PhD: Mathematical Modeling Of Microchemical Systems, Lehigh University (2005).",
        "MSc: Analytical Approaches to Multicomponent Diffusion and 3D Navier-Stokes (NS) Equations for Flow in Isothermal Microseparators, Lehigh University (2001).",
        "B.S Chemical Engineering, Kuwait University (1996).",
      ],
    },
    {
      label: "Experiences",
      items: [
        "Assistant Professor of Chemical Engineering, College of Engineering & Petroleum, Kuwait University (2023 – 2024).",
        "Deputy Prime Minister & State Minister for Cabinets Affairs (2023).",
        "Director General, Kuwait Foundation for the Advancement of Science (KFAS) (2021 – 2023).",
        "Minister of Oil & Minister of Commerce & Industry (2018).",
        "Kuwait University: Director, Center of Evaluation & Measurements (2016 – 2018).",
        "Kuwait University: Assistant Vice President for Academic Affairs (2015-2018).",
        "College of Engineering & Petroleum: Vice Dean for Student Affairs (2011 – 2015).",
        "College of Engineering & Petroleum: Director of Counseling & Guidance (2008 – 2011).",
        "Kuwait University: Assistant Professor of Chemical Engineering (2005 – 2018).",
        "Lehigh University (Bethlehem, PA, U.S.A) Teaching Assistant (2001 – 2003).",
        "Kuwait University: Scholar in USA (1999 – 2005).",
        "Kuwait University: Teaching Assistant – Laboratory Engineer (1996-1999).",
      ],
    },
    {
      label: "Membership, Board Member",
      items: [
        "Member of the Board: Kuwait Foundation for the Advancement of Science.",
        "Chairman of the Board: Kuwait Petroleum Corporation (KPC).",
        "Member of the Board, Kuwait Investment Authority.",
        "Member of the Board, the Public Authority of Agriculture Affairs and Fish Resources.",
        "Member of the Board, the Public Authority for Industry.",
      ],
    },
  ],
};

const IBRAHIM_MODAL_CONTENT = {
  name: "Dr. Ibrahim Rashid Al Rashdan",
  image: "/image/DrIbrahimAlRashdan.png",
  items: [
    "Member of the teaching staff at the Faculty of Medicine at Kuwait University.",
    "Consultant cardiovascular specialist, specializing in Interventional Cardiology.",
    "President of the Kuwait Cardiac Society (2004).",
    "A Bachelor's degree in Basic Medical Sciences from Kuwait University (1986).",
    "A Bachelor of Medicine and Surgery from Kuwait University (1989).",
    "American Board of Internal Medicine (1995).",
    "Fellowship of the Canadian Royal College of Internal Medicine (1996).",
    "American Board of Cardiology (1998).",
    "Fellowship of the Canadian Royal College of Cardiology (1998).",
    "American Board of Interventional Cardiology Specialization (1999).",
  ],
};

const MESHAAL_MODAL_CONTENT = {
  name: "H.E. Sheikh Dr. Meshaal Jaber Al-Ahmed Al-Sabah",
  image: "/image/DrMeshalJaberAlAhmed.png",
  items: [
    "Dr. Meshaal Jaber Al-Ahmad Al-Sabah is the Director General of Kuwait Direct Investment Promotion Authority (KDIPA). He heads multiple committees, including the Permanent Committee for Streamlining Business Environment & Enhancing Competitiveness in Kuwait (PCK) established by the Council of Ministers, the trade & investment sub-group of the Kuwait-UK Joint Steering Group, and the economic & commercial coordination working group in the Kuwait-US Strategic Dialogue.",
    "Previously he held the post of the Chief of Kuwait Foreign Investment Bureau (KFIB) at the Kuwait Ministry of Commerce & Industry (MOCI). In addition to various posts at General Secretariat of the Council of Ministers (CoM). He sat on multiple boards including the National Offset Company (NOC), as Vice Chairman of the Board of Directors, and the Central Bank of Kuwait, as a member of the Board of Directors. He also headed multiple specialized committees, including the Committee for Amending Capital Markets Law, the Committee for Drafting the Insolvency & Creditor Rights Law and Economic Inducement Committee established by the Council of Ministers.",
    "Dr. Meshaal obtained his Bachelor's degree in Political Science with a minor in Public Administration at Kuwait University (KU), College of Social Sciences. He then obtained a master's degree in Strategic Management at Maastricht Business School (KMBS), and a PhD in HR & Marketing Management at the University of Portsmouth, School of Business in the UK.",
  ],
};

export default function BoardOfDirectorsPage() {
  const [isAhmadModalOpen, setIsAhmadModalOpen] = useState(false);
  const [isAbdullahModalOpen, setIsAbdullahModalOpen] = useState(false);
  const [isMeshaalModalOpen, setIsMeshaalModalOpen] = useState(false);
  const [isAhmadAldekheelModalOpen, setIsAhmadAldekheelModalOpen] = useState(false);
  const [isKhaledModalOpen, setIsKhaledModalOpen] = useState(false);
  const [isIbrahimModalOpen, setIsIbrahimModalOpen] = useState(false);
  const chairmanRef = useRef(null);
  const directorGeneralRef = useRef(null);
  const membersRef = useRef(null);
  const members2Ref = useRef(null);
  const isChairmanInView = useInView(chairmanRef, { once: true, margin: "-80px" });
  const isDirectorGeneralInView = useInView(directorGeneralRef, { once: true, margin: "-80px" });
  const isMembersInView = useInView(membersRef, { once: true, margin: "-80px" });
  const isMembers2InView = useInView(members2Ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAhmadModalOpen(false);
        setIsAbdullahModalOpen(false);
        setIsMeshaalModalOpen(false);
        setIsAhmadAldekheelModalOpen(false);
        setIsKhaledModalOpen(false);
        setIsIbrahimModalOpen(false);
      }
    };
    if (isAhmadModalOpen || isAbdullahModalOpen || isMeshaalModalOpen || isAhmadAldekheelModalOpen || isKhaledModalOpen || isIbrahimModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isAhmadModalOpen, isAbdullahModalOpen, isMeshaalModalOpen, isAhmadAldekheelModalOpen, isKhaledModalOpen, isIbrahimModalOpen]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white pt-20 font-poppins">
        <section
          className="relative overflow-hidden flex items-center h-[55vh]"
        >
          <div className="absolute inset-0">
            <img
              src="/image/KfasBuilding2.png"
              alt="Board of Directors"
              className="w-full h-full object-cover object-[center_15%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
                <span className="text-white/60">About</span>
                <span className="text-white/40">/</span>
                <span className="text-white">Board of Directors</span>
              </div>
              <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] mb-6">
                Board of Directors
              </h1>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        <section ref={chairmanRef} className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
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
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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
                onClick={() => setIsAhmadModalOpen(true)}
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
                onClick={() => setIsAbdullahModalOpen(true)}
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
                onClick={() => setIsMeshaalModalOpen(true)}
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
                onClick={() => setIsIbrahimModalOpen(true)}
              />
            </div>
          </div>
        </section>

        <section ref={members2Ref} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 justify-items-center">
              <div className="hidden lg:block" aria-hidden />
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
                onClick={() => setIsAhmadAldekheelModalOpen(true)}
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
                onClick={() => setIsKhaledModalOpen(true)}
              />
              <div className="hidden lg:block" aria-hidden />
            </div>
          </div>
        </section>

        <section ref={directorGeneralRef} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 justify-items-center">
              <ProfileCard
                imageSrc="/image/DrAmeenah.png"
                imageAlt="Dr. Ameenah Rajab Farhan"
                name="Dr. Ameenah Rajab Farhan"
                title="Director General"
                isInView={isDirectorGeneralInView}
                borderPosition="right"
                layout="vertical"
                compact
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <AnimatePresence>
        {isAhmadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAhmadModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with profile */}
              <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-blue-50/50 border-b border-gray-100/80">
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-[#56A0D7]/30 pointer-events-none rounded-br" aria-hidden />
                <div className="relative flex items-start gap-5 px-6 py-5">
                  <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white shadow-lg">
                    <img
                      src="/image/ShaikhAhmadAlsabah.png"
                      alt={SHEIKH_AHMAD_MODAL_CONTENT.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-poppins text-lg font-bold text-gray-900 tracking-tight leading-snug">
                      {SHEIKH_AHMAD_MODAL_CONTENT.name}
                    </h3>
                    <div className="mt-2 h-px w-8 bg-[#56A0D7]/40" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAhmadModalOpen(false)}
                    className="shrink-0 p-2.5 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-xl transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
                <div className="space-y-8">
                  {[
                    { label: "Government", items: SHEIKH_AHMAD_MODAL_CONTENT.government },
                    { label: "Private Sector", items: SHEIKH_AHMAD_MODAL_CONTENT.privateSector },
                    { label: "Other Experience", items: SHEIKH_AHMAD_MODAL_CONTENT.otherExperience },
                    { label: "Education", items: SHEIKH_AHMAD_MODAL_CONTENT.education },
                  ].map((section) => (
                    <div key={section.label} className="relative pl-6 border-l-2 border-[#56A0D7]/25">
                      <h4 className="font-poppins text-[11px] font-semibold text-[#56A0D7] uppercase tracking-[0.2em] mb-3 ml-1">
                        {section.label}
                      </h4>
                      <ul className="space-y-2.5">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-3">
                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#56A0D7]/40 mt-2" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAbdullahModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAbdullahModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-blue-50/50 border-b border-gray-100/80">
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-[#56A0D7]/30 pointer-events-none rounded-br" aria-hidden />
                <div className="relative flex items-start gap-5 px-6 py-5">
                  <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white shadow-lg">
                    <img
                      src={ABDULLAH_ALGHUNAIM_MODAL_CONTENT.image}
                      alt={ABDULLAH_ALGHUNAIM_MODAL_CONTENT.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-poppins text-lg font-bold text-gray-900 tracking-tight leading-snug">
                      {ABDULLAH_ALGHUNAIM_MODAL_CONTENT.name}
                    </h3>
                    <div className="mt-2 h-px w-8 bg-[#56A0D7]/40" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAbdullahModalOpen(false)}
                    className="shrink-0 p-2.5 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-xl transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
                <ul className="space-y-2.5">
                  {ABDULLAH_ALGHUNAIM_MODAL_CONTENT.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-3">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#56A0D7]/40 mt-2" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMeshaalModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMeshaalModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-blue-50/50 border-b border-gray-100/80">
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-[#56A0D7]/30 pointer-events-none rounded-br" aria-hidden />
                <div className="relative flex items-start gap-5 px-6 py-5">
                  <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white shadow-lg">
                    <img
                      src={MESHAAL_MODAL_CONTENT.image}
                      alt={MESHAAL_MODAL_CONTENT.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-poppins text-lg font-bold text-gray-900 tracking-tight leading-snug">
                      {MESHAAL_MODAL_CONTENT.name}
                    </h3>
                    <div className="mt-2 h-px w-8 bg-[#56A0D7]/40" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMeshaalModalOpen(false)}
                    className="shrink-0 p-2.5 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-xl transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
                <ul className="space-y-2.5">
                  {MESHAAL_MODAL_CONTENT.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-3">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#56A0D7]/40 mt-2" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAhmadAldekheelModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAhmadAldekheelModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-blue-50/50 border-b border-gray-100/80">
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-[#56A0D7]/30 pointer-events-none rounded-br" aria-hidden />
                <div className="relative flex items-start gap-5 px-6 py-5">
                  <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white shadow-lg">
                    <img
                      src={AHMAD_ALDEKHEEL_MODAL_CONTENT.image}
                      alt={AHMAD_ALDEKHEEL_MODAL_CONTENT.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-poppins text-lg font-bold text-gray-900 tracking-tight leading-snug">
                      {AHMAD_ALDEKHEEL_MODAL_CONTENT.name}
                    </h3>
                    <div className="mt-2 h-px w-8 bg-[#56A0D7]/40" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAhmadAldekheelModalOpen(false)}
                    className="shrink-0 p-2.5 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-xl transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
                <ul className="space-y-2.5">
                  {AHMAD_ALDEKHEEL_MODAL_CONTENT.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-3">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#56A0D7]/40 mt-2" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isIbrahimModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsIbrahimModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-blue-50/50 border-b border-gray-100/80">
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-[#56A0D7]/30 pointer-events-none rounded-br" aria-hidden />
                <div className="relative flex items-start gap-5 px-6 py-5">
                  <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white shadow-lg">
                    <img
                      src={IBRAHIM_MODAL_CONTENT.image}
                      alt={IBRAHIM_MODAL_CONTENT.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-poppins text-lg font-bold text-gray-900 tracking-tight leading-snug">
                      {IBRAHIM_MODAL_CONTENT.name}
                    </h3>
                    <div className="mt-2 h-px w-8 bg-[#56A0D7]/40" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsIbrahimModalOpen(false)}
                    className="shrink-0 p-2.5 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-xl transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
                <ul className="space-y-2.5">
                  {IBRAHIM_MODAL_CONTENT.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-3">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#56A0D7]/40 mt-2" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isKhaledModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsKhaledModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-50 to-blue-50/50 border-b border-gray-100/80">
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-[#56A0D7]/30 pointer-events-none rounded-br" aria-hidden />
                <div className="relative flex items-start gap-5 px-6 py-5">
                  <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden ring-2 ring-white shadow-lg">
                    <img
                      src={KHALED_ALFADHEL_MODAL_CONTENT.image}
                      alt={KHALED_ALFADHEL_MODAL_CONTENT.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-poppins text-lg font-bold text-gray-900 tracking-tight leading-snug">
                      {KHALED_ALFADHEL_MODAL_CONTENT.name}
                    </h3>
                    <div className="mt-2 h-px w-8 bg-[#56A0D7]/40" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsKhaledModalOpen(false)}
                    className="shrink-0 p-2.5 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-xl transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
                <div className="space-y-8">
                  {KHALED_ALFADHEL_MODAL_CONTENT.sections.map((section) => (
                    <div key={section.label} className="relative pl-6 border-l-2 border-[#56A0D7]/25">
                      <h4 className="font-poppins text-[11px] font-semibold text-[#56A0D7] uppercase tracking-[0.2em] mb-3 ml-1">
                        {section.label}
                      </h4>
                      <ul className="space-y-2.5">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-3">
                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#56A0D7]/40 mt-2" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
