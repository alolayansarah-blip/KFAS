"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { User, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Modal component — shared across all board members ────────────────────────

function Modal({
  isOpen,
  onClose,
  imageSrc,
  name,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#1D2D44]/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Orange top accent */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#EC601B] via-[#7DC0F1]/50 to-transparent" />

            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-[#1D2D44]/08">
              <div className="flex items-start gap-5 px-6 py-5">
                {imageSrc && (
                  <div className="shrink-0 w-16 h-16 overflow-hidden border border-[#1D2D44]/08">
                    <img
                      src={imageSrc}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="font-poppins text-base font-semibold text-[#1D2D44] leading-snug tracking-tight">
                    {name}
                  </h3>
                  <div className="mt-2 h-px w-8 bg-gradient-to-r from-[#EC601B]/50 to-transparent" />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 p-2 text-[#1D2D44]/30 hover:text-[#EC601B] transition-colors duration-200"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)] px-6 py-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalSection({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-7">
      <p className="mb-3 text-[10px] font-semibold tracking-wide text-[#EC601B]">
        {label}
      </p>
      <div className="pl-4 border-l border-[#1D2D44]/08">
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-[13px] text-[#1D2D44]/65 leading-relaxed font-light"
            >
              <span
                className="shrink-0 w-1 h-1 rounded-full bg-[#EC601B]/50 mt-2"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Profile Card ─────────────────────────────────────────────────────────────

function ProfileCard({
  imageSrc,
  imageAlt,
  name,
  title,
  usePlaceholder = false,
  isInView,
  animationDelay = 0,
  compact = false,
  large = false,
  onClick,
}: {
  imageSrc?: string;
  imageAlt: string;
  name: React.ReactNode;
  title: string;
  usePlaceholder?: boolean;
  isInView: boolean;
  animationDelay?: number;
  compact?: boolean;
  large?: boolean;
  onClick?: () => void;
}) {
  // Uniform image size for every card — all the same.
  const imgSize = "w-44 h-44 sm:w-52 sm:h-52";

  const content = (
    <div
      className={`flex flex-col items-center gap-4 ${onClick ? "cursor-pointer group" : ""}`}
    >
      {/* Image */}
      <motion.div
        className="relative shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: animationDelay, ease: EASE }}
      >
        {/* Corner brackets */}
        <div className="absolute -left-2 -top-2 h-6 w-6 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 pointer-events-none z-10" />
        <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none z-10" />

        <div className={`relative overflow-hidden ${imgSize}`}>
          {usePlaceholder ? (
            <div className="w-full h-full flex items-center justify-center bg-[#1D2D44]/05 text-[#1D2D44]/20">
              <User className="w-16 h-16" strokeWidth={1} />
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          )}
        </div>
      </motion.div>

      {/* Name + title */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, delay: animationDelay + 0.12, ease: EASE }}
      >
        <p
          className={`font-poppins font-semibold text-[#1D2D44] leading-snug tracking-tight ${large ? "text-base" : "text-[13px] sm:text-[14px]"}`}
        >
          {name}
        </p>
        <p
          className={`mt-1.5 font-light text-[#EC601B] tracking-wide ${large ? "text-[13px]" : "text-[11px] sm:text-[12px]"}`}
        >
          {title}
        </p>
        {onClick && (
          <div className="mt-2 flex justify-center">
            <div className="h-[1px] w-4 bg-[#EC601B]/40 transition-all duration-300 group-hover:w-8" />
          </div>
        )}
      </motion.div>
    </div>
  );

  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-fit focus:outline-none"
    >
      {content}
    </button>
  ) : (
    content
  );
}

// ─── Modal content data ───────────────────────────────────────────────────────

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

const AMEENAH_MODAL_CONTENT = {
  name: "Dr. Ameenah Rajab Farhan",
  image: "/image/DrAmeenah.png",
  sections: [
    {
      label: "Academic Positions",
      items: [
        "Associate Professor, Kuwait University, Physics Department Physics Department Chair (1999 - 2004) and (2018-present).",
        "Vice Dean for Research and Laboratories Affairs, Faculty of Science (2004 - 2008).",
      ],
    },
    {
      label: "Scientific Positions",
      items: [
        "Senior Scientific Advisor, Kuwait Foundation for the Advancement of Sciences (KFAS) (2011 - 2018).",
        "Acting Director for Research Directorate (KFAS) (2016 - 2018).",
        "Program Manager for Research Program (KFAS) (2011- 2018).",
        "Project Leader for Kuwait Nuclear Data Center (1986-2016).",
        "Technical Advisor, Kuwait Environmental Remediation Program (KERP), Kuwait National Focal point (KNFP) (2009 - 2011).",
        "Member & Convener of Jaber Al-Ahmed Center for Nuclear Medicine and Medical Imaging Board, (2013 - 2020).",
        "Member of the Board of Trustees for American University of Kuwait (2004 - 2014).",
        "Jury Member for L'OREAL UNESCO For Women in Science (FWIS) Middle East Fellowship Program. (2015 - Present).",
      ],
    },
    {
      label: "Associations",
      items: [
        "American Physical Society (APS).",
        "Member of the International Network of Nuclear Structure and Decay Data (NSDD) Evaluators.",
        "American Academy for the Advancement of Science (AAAS).",
      ],
    },
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BoardOfDirectorsPage() {
  const [isAhmadModalOpen, setIsAhmadModalOpen] = useState(false);
  const [isAbdullahModalOpen, setIsAbdullahModalOpen] = useState(false);
  const [isMeshaalModalOpen, setIsMeshaalModalOpen] = useState(false);
  const [isAhmadAldekheelModalOpen, setIsAhmadAldekheelModalOpen] =
    useState(false);
  const [isKhaledModalOpen, setIsKhaledModalOpen] = useState(false);
  const [isIbrahimModalOpen, setIsIbrahimModalOpen] = useState(false);
  const [isAmeenahModalOpen, setIsAmeenahModalOpen] = useState(false);

  const heroRef = useRef(null);
  const chairmanRef = useRef(null);
  const directorGeneralRef = useRef(null);
  const membersRef = useRef(null);
  const members2Ref = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const isChairmanInView = useInView(chairmanRef, {
    once: true,
    margin: "-80px",
  });
  const isDirectorGeneralInView = useInView(directorGeneralRef, {
    once: true,
    margin: "-80px",
  });
  const isMembersInView = useInView(membersRef, {
    once: true,
    margin: "-80px",
  });
  const isMembers2InView = useInView(members2Ref, {
    once: true,
    margin: "-80px",
  });

  const anyModalOpen =
    isAhmadModalOpen ||
    isAbdullahModalOpen ||
    isMeshaalModalOpen ||
    isAhmadAldekheelModalOpen ||
    isKhaledModalOpen ||
    isIbrahimModalOpen ||
    isAmeenahModalOpen;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAhmadModalOpen(false);
        setIsAbdullahModalOpen(false);
        setIsMeshaalModalOpen(false);
        setIsAhmadAldekheelModalOpen(false);
        setIsKhaledModalOpen(false);
        setIsIbrahimModalOpen(false);
        setIsAmeenahModalOpen(false);
      }
    };
    if (anyModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [anyModalOpen]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src="/image/KFASBuilding.webp"
              alt="Board of Directors"
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
                Board of Directors
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

        {/* ── Chairman ── */}
        <section ref={chairmanRef} className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-center">
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
                large
              />
            </div>
          </div>
        </section>

        {/* ── Board Members row 1 ── */}
        <section ref={membersRef} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 justify-items-center">
              <ProfileCard
                imageSrc="/image/ShaikhAhmadAlsabah.png"
                imageAlt="H.H the Prime Minister of Kuwait Sheikh Ahmad Abdullah Al-Ahmad Al-Sabah"
                name="H.H the Prime Minister of Kuwait Sheikh Ahmad Abdullah Al-Ahmad Al-Sabah"
                title="Board Member"
                isInView={isMembersInView}
                animationDelay={0}
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
                compact
                onClick={() => setIsIbrahimModalOpen(true)}
              />
            </div>
          </div>
        </section>

        {/* ── Board Members row 2 ── */}
        <section ref={members2Ref} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 justify-items-center">
              <div className="hidden lg:block" aria-hidden />
              <ProfileCard
                imageSrc="/image/MRAhmedAldhakheel.png"
                imageAlt="Mr. Ahmad Aldekheel"
                name="Mr. Ahmad Aldekheel"
                title="Board Member"
                isInView={isMembers2InView}
                animationDelay={0}
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
                compact
                onClick={() => setIsKhaledModalOpen(true)}
              />
              <div className="hidden lg:block" aria-hidden />
            </div>
          </div>
        </section>

        {/* ── Director General ── */}
        <section ref={directorGeneralRef} className="bg-white pb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-center">
              <ProfileCard
                imageSrc="/image/DrAmeenah.png"
                imageAlt="Dr. Ameenah Rajab Farhan"
                name="Dr. Ameenah Rajab Farhan"
                title="Director General"
                isInView={isDirectorGeneralInView}
                large
                onClick={() => setIsAmeenahModalOpen(true)}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* ── Modals ── */}

      <Modal
        isOpen={isAmeenahModalOpen}
        onClose={() => setIsAmeenahModalOpen(false)}
        imageSrc={AMEENAH_MODAL_CONTENT.image}
        name={AMEENAH_MODAL_CONTENT.name}
      >
        {AMEENAH_MODAL_CONTENT.sections.map((s) => (
          <ModalSection key={s.label} label={s.label} items={s.items} />
        ))}
      </Modal>

      <Modal
        isOpen={isAhmadModalOpen}
        onClose={() => setIsAhmadModalOpen(false)}
        imageSrc="/image/ShaikhAhmadAlsabah.png"
        name={SHEIKH_AHMAD_MODAL_CONTENT.name}
      >
        <ModalSection
          label="Government"
          items={SHEIKH_AHMAD_MODAL_CONTENT.government}
        />
        <ModalSection
          label="Private Sector"
          items={SHEIKH_AHMAD_MODAL_CONTENT.privateSector}
        />
        <ModalSection
          label="Other Experience"
          items={SHEIKH_AHMAD_MODAL_CONTENT.otherExperience}
        />
        <ModalSection
          label="Education"
          items={SHEIKH_AHMAD_MODAL_CONTENT.education}
        />
      </Modal>

      <Modal
        isOpen={isAbdullahModalOpen}
        onClose={() => setIsAbdullahModalOpen(false)}
        imageSrc={ABDULLAH_ALGHUNAIM_MODAL_CONTENT.image}
        name={ABDULLAH_ALGHUNAIM_MODAL_CONTENT.name}
      >
        <ModalSection
          label="Experience"
          items={ABDULLAH_ALGHUNAIM_MODAL_CONTENT.items}
        />
      </Modal>

      <Modal
        isOpen={isMeshaalModalOpen}
        onClose={() => setIsMeshaalModalOpen(false)}
        imageSrc={MESHAAL_MODAL_CONTENT.image}
        name={MESHAAL_MODAL_CONTENT.name}
      >
        <ModalSection label="Experience" items={MESHAAL_MODAL_CONTENT.items} />
      </Modal>

      <Modal
        isOpen={isAhmadAldekheelModalOpen}
        onClose={() => setIsAhmadAldekheelModalOpen(false)}
        imageSrc={AHMAD_ALDEKHEEL_MODAL_CONTENT.image}
        name={AHMAD_ALDEKHEEL_MODAL_CONTENT.name}
      >
        <ModalSection
          label="Experience"
          items={AHMAD_ALDEKHEEL_MODAL_CONTENT.items}
        />
      </Modal>

      <Modal
        isOpen={isKhaledModalOpen}
        onClose={() => setIsKhaledModalOpen(false)}
        imageSrc={KHALED_ALFADHEL_MODAL_CONTENT.image}
        name={KHALED_ALFADHEL_MODAL_CONTENT.name}
      >
        {KHALED_ALFADHEL_MODAL_CONTENT.sections.map((s) => (
          <ModalSection key={s.label} label={s.label} items={s.items} />
        ))}
      </Modal>

      <Modal
        isOpen={isIbrahimModalOpen}
        onClose={() => setIsIbrahimModalOpen(false)}
        imageSrc={IBRAHIM_MODAL_CONTENT.image}
        name={IBRAHIM_MODAL_CONTENT.name}
      >
        <ModalSection label="Experience" items={IBRAHIM_MODAL_CONTENT.items} />
      </Modal>
    </>
  );
}
