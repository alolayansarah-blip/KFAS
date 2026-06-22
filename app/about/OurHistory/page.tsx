"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.1 };

export default function OurHistoryPage() {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const historyMilestones = [
    {
      year: "1976",
      title: "Establishment ",
      description:
        "KFAS was established by Amiri Decree as a private, non-profit organization to build a national culture of science, technology, and innovation and to support long-term sustainable development.",
      image: "/image/ShaikhJaber.jpeg",
      imageAlt: "KFAS Foundation",
    },
    {
      year: "1979",
      title: "The Kuwait Prize",
      description:
        "KFAS launched the Kuwait Prize to recognize major scientific contributions and strengthen research excellence across Kuwait and the Arab world.",
      image: "/image/KuwaitPrize.webp",
      imageAlt: "Kuwait Prize",
      imageFit: "contain" as const,
    },
    {
      year: "1984 ",
      title: "Advancement of Sciences Publishing and Distribution Company",
      description:
        "KFAS established the Advancement of Sciences Publishing & Distribution Company (ASPD) to popularize science and strengthen science communication for public audiences, youth, and schools.",
      image: "/image/1984AspdPublications.png",
      imageAlt: "Science Publishing and Public Engagement",
    },
    {
      year: "1986",
      title: "Al-Oloom Magazine",
      description:
        "KFAS expanded Arabic science communication through Al-Oloom, building sustained public access to global science content in Arabic.",
      image: "/image/1986.png",
      imageAlt: "Al-Oloom Magazine",
    },
    {
      year: "1987",
      title: "KFAS Headquarters",
      description:
        "KFAS inaugurated its headquarters as an anchor for national science and innovation activity.",
      image: "/image/1987.webp",
      imageAlt: "KFAS Headquarters",
    },
    {
      year: "1988",
      title: "Jaber Al-Ahmad Prize for Young Researchers",
      description:
        "KFAS established a national prize to encourage and recognize outstanding Kuwaiti researchers and strengthen the research pipeline.",
      image: "/image/jaberPrize.webp",
      imageAlt: "Jaber Al-Ahmad Prize for Young Researchers",
      imageFit: "contain" as const,
    },
    {
      year: "2000",
      title: "The Scientific Center (TSCK)",
      description:
        "KFAS established The Scientific Center as a major national platform for STEM learning and public engagement through interactive exhibits and scientific experiences.",
      image: "/image/ScientificCenter.webp",
      imageAlt: "The Scientific Center",
    },
    {
      year: "2000-2001",
      title: "Kuwait Program at Harvard Kennedy School",
      description:
        "KFAS launched the Kuwait Program at Harvard Kennedy School to support fellowships, research collaboration, and leadership development connected to Kuwait's policy priorities.",
      image: "/image/2001.jpg",
      imageAlt: "Kuwait Program at Harvard Kennedy School",
    },
    {
      year: "2005",
      title: "Kuwait–MIT CNRE",
      description:
        "KFAS strengthened international applied research collaboration by establishing a Kuwait–MIT center focused on energy, water, and the environment.",
      image: "/image/MIT.webp",
      imageAlt: "Kuwait–MIT CNRE",
    },
    {
      year: "2006",
      title: "Dasman Diabetes Institute (DDI)",
      description:
        "KFAS established Dasman Diabetes Institute to reduce diabetes burden in Kuwait through research, training, education, and health awareness programs.",
      image: "/image/DDI2.webp",
      imageAlt: "Dasman Diabetes Institute",
    },
    {
      year: "2010",
      title: "Sabah Al-Ahmad Center for Giftedness & Creativity (SACGC)",
      description:
        "KFAS launched SACGC to develop gifted students, support inventors, and strengthen innovation capability including pathways to patenting.",
      image: "/image/2010.png",
      imageAlt: "Sabah Al-Ahmad Center for Giftedness & Creativity",
    },
    {
      year: "2013",
      title: "KFAS Innovation Challenge",
      description:
        "KFAS launched the Innovation Challenge to help organizations build innovation capability through structured executive learning and project development.",
      image: "/image/2013.webp",
      imageAlt: "KFAS Innovation Challenge",
    },
    {
      year: "2015",
      title: "Al-Sumait Prize for African Development",
      description:
        "KFAS expanded its international recognition footprint through the Al-Sumait Prize, honoring impactful development outcomes in Africa and linking science to tangible social progress.",
      image: "/image/alsumaitPrize.webp",
      imageAlt: "Al-Sumait Prize for African Development",
      imageFit: "contain" as const,
    },
    // {
    //   year: "2017",
    //   title: "KFAS Academy",
    //   description:
    //     "KFAS established KFAS Academy to scale high-quality training and capacity development using advanced learning technologies and delivery models.",
    // },
    {
      year: "2019",
      title: "Kuwait University CMS-CERN Membership",
      description:
        "KFAS supported Kuwait University's full membership in the CMS experiment at CERN to deepen research collaboration and build student and teacher capacity in physics and engineering.",
      image: "/image/2019CERN.webp",
      imageAlt: "Kuwait University CMS-CERN Membership",
    },
    {
      year: "2020",
      title: "COVID-19 Rapid Research Response",
      description:
        "KFAS launched dedicated research funding to address COVID-19 impacts across health, education, and the economy, enabling fast national knowledge generation during the pandemic.",
    },
    {
      year: "2023",
      title: "KuwaitSat-1 Launch",
      description:
        "KuwaitSat-1 launched on 3 January 2023 as a Kuwait University project supported by KFAS, advancing national space capability and hands-on student training.",
      image: "/image/2023.png",
      imageAlt: "KuwaitSat-1 Launch",
    },
    {
      year: "2024",
      title: " Research Portal",
      description:
        'KFAS launched the \"PURE\" portal to showcase funded projects and research outputs, and to enable discovery of expertise and collaboration opportunities.',
      image: "/image/Pure.webp",
      imageAlt: "PURE Research Portal",
    },
    {
      year: "Sep 2024",
      title: "Kuwait National Space Research Center Announced",
      description:
        "A national space research center was announced under KFAS auspices to strengthen Kuwait's space research, technology, and human-capital development.",
      image: "/image/NSRClogo.png",
      imageAlt: "Kuwait National Space Research Center",
      imageFit: "contain" as const,
    },
    {
      year: "2024–2025",
      title: "NASEM Precision & Personalized Medicine Workshops",
      description:
        "KFAS partnered with the U.S. National Academies on joint workshops to advance knowledge exchange in precision and personalized medicine.",
      image: "/image/naseem.png",
      imageAlt: "NASEM Precision & Personalized Medicine Workshops",
    },
    {
      year: "28 May 2025",
      title: "KFAS Strategy 2025–2029",
      description:
        "KFAS launched its 2025–2029 strategy to strengthen the national research ecosystem and leverage science, technology, and innovation to address national challenges and sustainable development.",
      image: "/image/KFASstrategy1.jpeg",
      imageAlt: "KFAS Strategy 2025–2029",
    },
    {
      year: "30 Nov 2025",
      title: "KFAS–MBRSC MoU on Space Science",
      description:
        "KFAS and the Mohammed Bin Rashid Space Centre signed an MoU to advance space science cooperation, training, and joint research aligned with national priorities.",
      image: "/image/mou.png",
      imageAlt: "KFAS–MBRSC MoU on Space Science",
    },
    {
      year: "2025",
      title: "25 Years of KFAS–Harvard Executive Education",
      description:
        "KFAS marked 25 years of partnership with Harvard Kennedy School executive education, highlighting leadership development impact and outcomes.",
      image: "/image/harvard.png",
      imageAlt: "25 Years of KFAS–Harvard Executive Education",
    },
    {
      year: "2023–2025",
      title: "National Science Engagement Scales",
      description:
        "KFAS advanced sustained public engagement via annual Science Month programming and mobile STEM outreach initiatives to bring interactive science experiences to students nationwide.",
    },
  ];

  const getStartYear = (value: string) => {
    const match = value.match(/\d{4}/);
    return match ? Number(match[0]) : null;
  };

  const yearOptions = useMemo(() => {
    const years = historyMilestones
      .map((m) => getStartYear(m.year))
      .filter((year): year is number => year !== null);
    return Array.from(new Set(years)).sort((a, b) => a - b);
  }, []);

  const filteredMilestones = useMemo(() => {
    if (selectedYear === "all") return historyMilestones;
    return historyMilestones.filter((m) => {
      const startYear = getStartYear(m.year);
      return startYear !== null && startYear >= selectedYear;
    });
  }, [selectedYear]);

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
            {/* object-cover fills the hero edge to edge (no side gaps).
                object-position controls which part stays in frame — lower the
                percentage to show more of the top, raise it to show more of
                the bottom. */}
            <Image
              src="/image/SkeikhJaber.webp"
              alt="Our History"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-[center_28%] -scale-x-100"
            />
            {/* Directional overlay — left heavy for title legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            {/* Bottom fade */}
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
                Our History
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

        {/* ── Content ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Intro */}
            <motion.p
              className="max-w-4xl text-base font-light leading-[1.9] text-[#1D2D44]/65 mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Founded in 1976 by Amiri Decree, the Kuwait Foundation for the
              Advancement of Sciences (KFAS) is a private, non-profit
              organization that advances science, technology, and innovation to
              support Kuwait's development. KFAS is funded by contributions from
              Kuwait's private-sector shareholding companies as a percentage of
              annual profits (currently 1%), with a governance model in which
              the Board is chaired and appointed by the Amir of the State of
              Kuwait.
            </motion.p>

            {/* Filter */}
            <motion.div
              className="mb-14 inline-flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#1D2D44]/40">
                Filter by year
              </p>
              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(
                    e.target.value === "all" ? "all" : Number(e.target.value),
                  )
                }
                className="border border-[#1D2D44]/12 bg-white px-5 py-3 text-[13px] font-medium text-[#1D2D44] focus:outline-none focus:border-[#EC601B]/40 transition-colors duration-200 w-48"
                aria-label="Filter timeline by year"
              >
                <option value="all">All Years</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Center vertical line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#EC601B]/60 via-[#EC601B]/20 to-transparent" />

              <div className="space-y-12">
                {filteredMilestones.map((milestone, index) => {
                  const hasImage = Boolean(milestone.image);
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={`${milestone.year}-${milestone.title}`}
                      className={`relative flex flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"}`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
                    >
                      {/* Center dot */}
                      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 h-3 w-3 rounded-full bg-white border-2 border-[#EC601B]" />

                      {/* Content card */}
                      <div className="lg:w-1/2 lg:px-10">
                        <div className="relative border border-[#1D2D44]/[0.08] p-6 sm:p-8">
                          {/* Corner accent */}
                          <div
                            className={`absolute -top-2 h-8 w-8 border-t-[1.5px] border-[#EC601B]/40 pointer-events-none ${isEven ? "-right-2 border-r-[1.5px]" : "-left-2 border-l-[1.5px]"}`}
                          />

                          {/* Year */}
                          <div className="font-poppins font-bold text-[#EC601B] text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight mb-3">
                            {milestone.year}
                          </div>

                          {/* Eyebrow */}
                          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#1D2D44]/35 mb-3">
                            Milestone
                          </p>

                          {/* Title */}
                          <h4 className="font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem] mb-4">
                            {milestone.title}
                          </h4>

                          {/* Divider */}
                          <div className="mb-4 h-px w-8 bg-gradient-to-r from-[#EC601B]/40 to-transparent" />

                          {/* Description */}
                          <p className="text-base font-light leading-[1.9] text-[#1D2D44]/65">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="lg:w-1/2 lg:px-10 mt-5 lg:mt-0 flex items-center">
                        {hasImage && (
                          <div className="relative w-full overflow-hidden aspect-[16/10] group">
                            <Image
                              src={milestone.image as string}
                              alt={milestone.imageAlt || milestone.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className={`${
                                milestone.imageFit === "contain"
                                  ? "object-contain"
                                  : "object-cover"
                              } transition-transform duration-700 group-hover:scale-[1.03] ${
                                milestone.image === "/image/ShaikhJaber.jpeg"
                                  ? "grayscale"
                                  : ""
                              }`}
                            />
                            <div className="absolute inset-0 bg-[#1D2D44]/15 transition-all duration-500 group-hover:bg-[#1D2D44]/5" />
                            <div
                              className={`absolute -top-2 h-8 w-8 border-t-[1.5px] border-[#7DC0F1]/40 pointer-events-none ${!isEven ? "-right-2 border-r-[1.5px]" : "-left-2 border-l-[1.5px]"}`}
                            />
                            <div
                              className={`absolute -bottom-2 h-8 w-8 border-b-[1.5px] border-[#7DC0F1]/35 pointer-events-none ${isEven ? "-right-2 border-r-[1.5px]" : "-left-2 border-l-[1.5px]"}`}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Back to top */}
            <div className="mt-24 flex justify-center">
              <motion.button
                onClick={scrollToTop}
                className="group inline-flex flex-col items-center gap-2 text-[#1D2D44]/35 hover:text-[#EC601B] transition-colors duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE }}
                aria-label="Back to top"
              >
                <div className="flex h-9 w-9 items-center justify-center border border-[#1D2D44]/15 transition-all duration-300 group-hover:border-[#EC601B]/50 group-hover:-translate-y-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
                  Back to Top
                </span>
              </motion.button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
