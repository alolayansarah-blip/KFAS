"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OurHistoryPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      image: "/image/KuwaitPrizes.jpg",
      imageAlt: "Kuwait Prize",
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
      image: "/image/1987.png",
      imageAlt: "KFAS Headquarters",
    },
    {
      year: "1988",
      title: "Jaber Al-Ahmad Prize for Young Researchers",
      description:
        "KFAS established a national prize to encourage and recognize outstanding Kuwaiti researchers and strengthen the research pipeline.",
      image: "/image/1987-2.jpg",
      imageAlt: "Jaber Al-Ahmad Prize for Young Researchers",
    },
    {
      year: "2000",
      title: "The Scientific Center (TSCK)",
      description:
        "KFAS established The Scientific Center as a major national platform for STEM learning and public engagement through interactive exhibits and scientific experiences.",
      image: "/image/2000tsck.jpg",
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
    },
    {
      year: "2006",
      title: "Dasman Diabetes Institute (DDI)",
      description:
        "KFAS established Dasman Diabetes Institute to reduce diabetes burden in Kuwait through research, training, education, and health awareness programs.",
      image: "/image/2006Dasman.png",
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
      image: "/image/2013.png",
      imageAlt: "KFAS Innovation Challenge",
    },
    {
      year: "2015",
      title: "Al-Sumait Prize for African Development",
      description:
        "KFAS expanded its international recognition footprint through the Al-Sumait Prize, honoring impactful development outcomes in Africa and linking science to tangible social progress.",
      image: "/image/2015alsumait.png",
      imageAlt: "Al-Sumait Prize for African Development",
    },
    {
      year: "2017",
      title: "KFAS Academy",
      description:
        "KFAS established KFAS Academy to scale high-quality training and capacity development using advanced learning technologies and delivery models.",
    },
    {
      year: "2019",
      title: "Kuwait University CMS-CERN Membership",
      description:
        "KFAS supported Kuwait University’s full membership in the CMS experiment at CERN to deepen research collaboration and build student and teacher capacity in physics and engineering.",
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
      title: "PURE Research Portal",
      description:
        "KFAS launched the “PURE” portal to showcase funded projects and research outputs, and to enable discovery of expertise and collaboration opportunities.",
      image: "/image/2024-pure.png",
      imageAlt: "PURE Research Portal",
    },
    {
      year: "Sep 2024",
      title: "Kuwait National Space Research Center Announced",
      description:
        "A national space research center was announced under KFAS auspices to strengthen Kuwait’s space research, technology, and human-capital development.",
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
      image: "/image/kfasStrategy.jpeg",
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
  }, [historyMilestones]);

  const filteredMilestones = useMemo(() => {
    if (selectedYear === "all") return historyMilestones;
    return historyMilestones.filter((m) => {
      const startYear = getStartYear(m.year);
      return startYear !== null && startYear >= selectedYear;
    });
  }, [historyMilestones, selectedYear]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section with Banner */}
        <section
          className="relative overflow-hidden flex items-center h-[55vh]"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/image/HistoryBanner.png"
              alt="Our History"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Dark black gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8">
            <div ref={sectionRef} className="text-left">
              {/* Breadcrumb */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
                <span className="text-white/60">About</span>
                <span className="text-white/40">/</span>
                <span className="text-white">Our History</span>
              </div>
              {/* Title */}
              <div className="relative mb-6">
                <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)]">
                  <span className="block">Our History</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Straight bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white"></div>
        </section>

        {/* History Content Section */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="space-y-12">
              {/* Introduction Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-600 leading-[1.9] text-base">
                  Founded in 1976 by Amiri Decree, the Kuwait Foundation for the
                  Advancement of Sciences (KFAS) is a private, non-profit
                  organization that advances science, technology, and innovation
                  to support Kuwait’s development. KFAS is funded by
                  contributions from Kuwait’s private-sector shareholding
                  companies as a percentage of annual profits (currently 1%),
                  with a governance model in which the Board is chaired and
                  appointed by the Amir of the State of Kuwait.
                </p>
              </motion.div>

              {/* Timeline Filters */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="relative group">
                    <div className="text-xs uppercase tracking-[0.35em] text-gray-400">
                      Filter
                    </div>
                    <div className="pointer-events-none absolute left-0 top-6 z-10 w-56 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Filter timeline entries by year.
                    </div>
                  </div>
                </div>

                {/* Dropdown */}
                <div>
                  <select
                    value={selectedYear}
                    onChange={(e) =>
                      setSelectedYear(
                        e.target.value === "all"
                          ? "all"
                          : Number(e.target.value),
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm sm:max-w-xs"
                    aria-label="Filter timeline by year"
                  >
                    <option value="all">All</option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Timeline Display - Modern Alternating Layout */}
              <div className="mt-12">
                <div className="relative space-y-12">
                  <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#EC601B] via-[#EC601B]/40 to-transparent" />
                  {filteredMilestones.map((milestone, index) => {
                    const hasImage = Boolean(milestone.image);
                    const isFoundation = milestone.year === "1976";
                    const isEven = index % 2 === 0;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: isFoundation ? 0.9 : 0.6,
                          delay: index * 0.12 + (isFoundation ? 0.2 : 0),
                          ease: "easeOut",
                        }}
                        className={`relative pb-12 last:pb-0 flex flex-col lg:flex-row ${
                          isEven ? "" : "lg:flex-row-reverse"
                        }`}
                      >
                        {/* Marker */}
                        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 w-3 h-3 rounded-full bg-white border-2 border-[#EC601B] shadow-sm" />

                        {/* Content Column */}
                        <div className="lg:w-1/2 lg:px-8">
                          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 sm:p-7">
                            <div className="font-poppins font-bold text-[#EC601B] text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight">
                              {milestone.year}
                            </div>
                            <div className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mt-3">
                              Milestone
                            </div>
                            <h4 className="font-poppins text-lg sm:text-xl font-semibold text-gray-900 mt-3">
                              {milestone.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed text-base sm:text-lg mt-3">
                              {milestone.description}
                            </p>
                          </div>
                        </div>

                        {/* Image Column */}
                        <div className="lg:w-1/2 lg:px-8 mt-6 lg:mt-0">
                          {hasImage && (
                            <div className="relative w-full h-48 sm:h-60 lg:h-64 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                              <img
                                src={milestone.image}
                                alt={milestone.imageAlt || milestone.title}
                                className={`w-full h-full object-cover scale-[1.03] contrast-110 saturate-110 ${
                                  milestone.image === "/image/ShaikhJaber.jpeg"
                                    ? "grayscale"
                                    : ""
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
