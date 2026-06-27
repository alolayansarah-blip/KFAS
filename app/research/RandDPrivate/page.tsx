"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const GRANT_TYPES = [
  {
    title: "Flagship Grants",
    subtitle:
      "Designed for high-impact projects of national or strategic importance.",
    bullets: [
      "Supports large scale R&D or technology transfer projects",
      "Ideal for projects that can generate strong success stories for Kuwait",
      "Typical duration: 6–36 months",
      "Funding levels are designed to attract ambitious, high-value projects",
    ],
    note: "This grant type is intended for larger, strategically significant projects with the potential to deliver strong national and sector-wide impact.",
  },
  {
    title: "Business Development Grants",
    subtitle:
      "Designed for projects with clear and measurable business benefits.",
    bullets: [
      "Supports feasibility studies, applied R&D, technology transfer, and process optimisation",
      "Suitable for small-to-medium scale innovation projects",
      "Typical duration: 6–24 months",
    ],
    note: "This pathway supports focused innovation projects that strengthen business performance and create tangible value for the company.",
  },
] as const;

const WHO_CAN_APPLY_ITEMS = [
  "Is a Kuwait-based private sector company or has legal representation in Kuwait",
  "Has a clear R&D, technology, or innovation challenge",
  "Can co-fund part of the project (financially or in-kind)",
  "Has the operational and technical capacity to execute the project",
  "Is seeking to work with a knowledge provider (local or international), or has strong in-house capabilities",
] as const;

const WHAT_WE_LOOK_FOR_ITEMS = [
  "Clarity of objectives and problem definition",
  "Technical feasibility and sound methodology",
  "Innovation and novelty (locally or within the sector)",
  "Expected outputs and business impact",
  "Relevance to Kuwait and alignment with KFAS priorities",
  "Budget justification and value for money",
] as const;

const APPLICATION_PROCESS_STEPS = [
  {
    title: "Concept Note / Expression of Interest",
    lead: "Applicants submit a short concept note outlining:",
    bullets: [
      "Company details and contact information",
      "Project objectives and scope",
      "High-level timeline",
      "Budget summary",
      "Expected business impact",
    ],
  },
  {
    title: "Concept Review & Management Presentation",
    bullets: [
      "KFAS reviews the concept for eligibility and relevance",
      "Shortlisted applicants are invited to present their project to KFAS management",
    ],
  },
  {
    title: "Full Application Submission",
    lead: "Eligible applicants are invited to submit a full proposal, including:",
    bullets: [
      "Detailed project description and methodology",
      "Work plan and milestones",
      "Budget and co-funding plan",
      "Information on the project team and knowledge providers",
    ],
  },
  {
    title: "Review & Decision",
    bullets: [
      "Applications undergo rigorous review",
      "Final funding decisions are communicated to applicants",
    ],
  },
  {
    title: "Grant Agreement & Project Kick-off",
    bullets: [
      "Successful applicants sign a grant agreement",
      "Projects begin with agreed milestones, reporting, and payment schedules",
    ],
  },
] as const;

const DURING_PROJECT_ITEMS = [
  "Regular status update meetings",
  "Milestone-based deliverables and payments",
  "Ongoing interaction from KFAS team",
  "Support with project adjustments, if needed",
] as const;

const AFTER_PROJECT_FOCUS_ITEMS = [
  "Measuring business and technological impact",
  "Capturing lessons learned",
  "Identifying scale-up or follow-on opportunities",
  "Sharing success stories to inspire the wider private sector",
] as const;

const PARTNER_WITH_KFAS_ITEMS = [
  "Co-Fund Grants reduce innovation risk",
  "Access to trusted local and international expertise",
  "Structured governance and milestone-based funding",
  "Strong focus on real-world impact",
  "Long-term partnership beyond a single project",
] as const;

const IMPACT_STORIES = [
  {
    id: "kdd",
    title: "KDD-No Sugar Added:",
    body: "KFAS funded the “No Sugar Added” project in partnership with Kuwait Danish Dairy and Dasman Diabetes Institute to scientifically re-engineer KDD’s best-selling chocolate ice cream. Using a “metabolic matrix” approach, the team reduced added sugars and enhanced nutritional value without sacrificing taste. Lab tests and an 8-month clinical trial with diabetic patients demonstrated the improved product’s health benefits, leading to the launch of a new no-added-sugar ice cream as part of KDD’s healthier product line. This showcases how scientific R&D can drive healthier food options for the public.",
    image: "/image/randD3.png",
    alt: "KDD Good For Me no added sugar chocolate ice cream",
    imageFit: "contain" as const,
  },
  {
    id: "soof",
    title: "“Soof” Sustainable Wool Processing Mill Project:",
    body: "Kuwait’s first sustainable wool factory “Soof” was inaugurated in Jan 2025. The project began with the Al Sadu Society’s proposal to explore the feasibility of producing sustainable yarns from local wool. KFAS funded a research initiative in collaboration with the Kuwait Institute for Scientific Research (KISR) and the Al Sadu Society, focusing on improving wool quality from Naeemi sheep, known for their high-quality fibers, for use in traditional crafts. The findings demonstrated the potential for economic and industrial development, leading to the recommendation to establish the factory as a model for successful partnerships supported by KFAS. The factory is a result of an initiative by Al Sadu Society, supported by KFAS and hosted by Al-Mawashi. This strategic partnership aims to develop the local wool industry, add value to Kuwait’s natural resources and promote sustainability in national projects. The project transforms raw local sheep fleece into high-quality yarns and felt, employing solar power (15 kW panels generating ~25,000 kWh/year) and advanced water recycling (~70,000 m³/year reused). “Soof” reduces reliance on synthetic and imported fibers, adds value to a local natural resource, and exemplifies KFAS’s push for home-grown innovation and industrial sustainability.",
    image: "/image/tech3.jpg",
    alt: "SOOF Sustainable Wool Processing Mill exhibition booth",
    imageFit: "cover" as const,
  },
  {
    id: "beorganic",
    title: "Beyond Organic:",
    body: "KFAS co-funded the “BeOrganic” vertical farming project in 2022 to bolster food security through technology-driven agriculture. The aeroponic system, installed in Al-Wafra, achieved up to 800% greater crop yield per square foot annually while using 92% less water and zero pesticides compared to traditional farming, demonstrating the viability of sustainable agriculture in Kuwait. This was just one of many projects KFAS supported during Covid-19 to support the private sector's efforts in strengthening national food security.",
    image: "/image/randD4.jpg",
    alt: "BeOrganic vertical farming aeroponic towers display",
    imageFit: "cover" as const,
  },
  {
    id: "al-hamra",
    title: "Al-Hamra Business Tower Structural Health Monitoring:",
    body: "The structural monitoring project, delivered in collaboration with KISR, Kuwait University, and MIT, aimed to develop an advanced system for monitoring the safety and performance of tall buildings in Kuwait. Tested on the Al-Hamra Business Tower, the project focused on modelling ground motion and installing a network of sensors to continuously measure a building’s response to environmental forces such as wind and seismic activity. These sensors capture real-time data on structural behavior, enabling early detection of potential damage or changes in performance. Beyond its technical contributions, the project represents a strategic step toward strengthening Kuwait’s capabilities in infrastructure resilience.",
  },
  {
    id: "quantum",
    title:
      "Using Quantum Technology to Secure Digital Communications in the State of Kuwait:",
    body: "This project, led by Kuwait Hackers, addresses the emerging threat posed by the rapid advancement of quantum computing, which has the potential to compromise conventional cryptographic systems. At the same time, it positions Kuwait at the forefront of next-generation cybersecurity by exploring quantum cryptography as a resilient, forward-looking solution to safeguard critical infrastructure and sensitive data within an increasingly complex and interconnected global landscape.",
  },
  {
    id: "ndt-robot",
    title: "Mobile Non-Destructive Testing NDT Inspection Robot:",
    body: "The EQUATE Group developed an innovative Mobile Non-Destructive Testing inspection robot designed to enhance safety, efficiency, and quality in industrial maintenance operations by enabling remote inspection of confined and hazardous environments without human intervention. Internationally patented through the United States Patent and Trademark Office, the solution was developed by a team of EQUATE engineers in collaboration with KFAS and the Sabah Al-Ahmad Center for Giftedness and Creativity and delivered through the KFAS Innovation Challenge program. Through this initiative, KFAS played a pivotal role in fostering innovation and empowering local talent, supporting the transformation of advanced engineering concepts into globally recognized industrial solutions that strengthen Kuwait’s innovation ecosystem and industrial competitiveness.",
  },
] as const;

const OVERVIEW_IMAGE = {
  src: "/image/randD1.jpg",
  alt: "KFAS and private sector partners at a KDD exhibition",
} as const;

const GRANT_SECTION_IMAGE = {
  src: "/image/randD2.jpg",
  alt: "Vertical farming innovation facility",
} as const;

const READY_TO_START_ITEMS = [
  "Review the grant guidelines and eligibility criteria",
  "Prepare a concise project concept",
  "Contact the KFAS Research & Technology team for initial guidance",
] as const;

const READY_TO_START_EMAIL = "research@kfas.org.kw";

// ─── Shared UI ────────────────────────────────────────────────────────────────

// Editorial section head: orange kicker, then title (+ optional intro) — sticky in the left rail
function SectionHead({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="lg:sticky lg:top-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
        <h2 className="mt-5 font-poppins text-[1.55rem] font-semibold leading-[1.18] tracking-tight text-[#1D2D44] sm:text-[1.9rem]">
          {title}
        </h2>
        {intro && (
          <p className="mt-5 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
            {intro}
          </p>
        )}
        {children}
      </motion.div>
    </div>
  );
}

// Refined hairline list marker (grows on hover of its row)
function Mark() {
  return (
    <span className="mt-[13px] h-px w-3.5 shrink-0 bg-[#EC601B] transition-all duration-300 group-hover/li:w-6" />
  );
}

// Simple divide-y list of bullet strings inside the right rail
function RailList({ items }: { items: readonly string[] }) {
  return (
    <ul className="divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
      {items.map((body, i) => (
        <motion.li
          key={i}
          {...fadeUp(0.05 + i * 0.08)}
          className="group/li flex gap-5 py-7 sm:gap-7 sm:py-9"
        >
          <Mark />
          <p className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75">
            {body}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}

export default function RandDPrivatePage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />

      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px]"
        >
          <div className="absolute inset-0 bg-[#1D2D44]">
            <Image
              src="/image/RandD.webp"
              alt="R&D in Private Sector"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-105 object-cover object-center brightness-[0.92] contrast-[1.02]"
            />
            {/* Directional overlay — left heavy for text legibility */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            {/* Bottom fade */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </div>

          {/* Content — vertically centered, left-aligned */}
          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>Research</span>
              {/* <span className="text-white/25">/</span>
              <span>R&amp;D in Private Sector</span> */}
            </motion.div>

            {/* Title — clip-path wipe */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                R&amp;D in Private Sector
              </motion.h1>
            </div>

            {/* Orange rule */}
            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          {/* White bleed into body */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview (text + image editorial row) ─────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
              <motion.div {...fadeUp()}>
                <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
                <p className="mt-5 font-poppins text-[12px] font-semibold uppercase tracking-[0.3em] text-[#EC601B]">
                  Overview
                </p>
                <h2 className="mt-4 font-poppins text-[1.7rem] font-semibold leading-[1.18] tracking-tight text-[#1D2D44] sm:text-[2.1rem]">
                  Empowering Innovation in Kuwait&apos;s Private Sector
                </h2>

                <div className="mt-8 space-y-6">
                  <p className="font-poppins text-[15px] font-light leading-[1.95] text-[#1D2D44]/70">
                    KFAS empowers Kuwaiti companies to enhance their
                    competitiveness, boost productivity, and drive sustainable
                    long-term growth through science, technology, and innovation.
                  </p>
                  <p className="font-poppins text-[15px] font-light leading-[1.95] text-[#1D2D44]/70">
                    The{" "}
                    <span className="font-semibold text-[#1D2D44]">
                      Private Sector R&amp;D Co-Funding Grant
                    </span>{" "}
                    supports applied research, technology development, and
                    innovation projects that enhance competitiveness, accelerate
                    growth, and help drive Kuwait&apos;s transition toward a
                    knowledge-based economy.
                  </p>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.1)}>
                <div className="group relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/[0.08]">
                  <Image
                    src={OVERVIEW_IMAGE.src}
                    alt={OVERVIEW_IMAGE.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute left-0 top-0 h-1 w-10 bg-[#EC601B]"
                    aria-hidden
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── What is the grant (text + image · tint) ───────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
              <motion.div {...fadeUp(0.05)} className="order-2 lg:order-1">
                <div className="group relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/[0.08]">
                  <Image
                    src={GRANT_SECTION_IMAGE.src}
                    alt={GRANT_SECTION_IMAGE.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute left-0 top-0 h-1 w-10 bg-[#EC601B]"
                    aria-hidden
                  />
                </div>
              </motion.div>

              <motion.div {...fadeUp()} className="order-1 lg:order-2">
                <SectionHead title="What is the Private Sector R&D Co-Funding Grant?">
                  <p className="mt-5 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
                    The KFAS Private Sector R&amp;D Co-Funding Grant supports
                    applied research, technology development, and innovation
                    projects that deliver clear business and national impact.
                    Grants are co-funded, meaning KFAS partners with companies
                    to jointly fund projects that advance innovation.
                  </p>
                  <p className="mt-5 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
                    The program is designed to reduce innovation risk for
                    companies while enabling them to access advanced expertise,
                    validate new ideas, and accelerate commercialization.
                  </p>
                </SectionHead>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Grant Types (rail · white) ────────────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title="Grant Types"
                  intro="Two pathways designed to match the scale and ambition of your innovation project:"
                />
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <div className="divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
                  {GRANT_TYPES.map((grant, i) => (
                    <motion.div
                      key={grant.title}
                      {...fadeUp(0.05 + i * 0.08)}
                      className="py-7 sm:py-9"
                    >
                      <h3 className="font-poppins text-[1.05rem] font-semibold leading-snug text-[#1D2D44]">
                        {grant.title}
                      </h3>
                      <p className="mt-2 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75">
                        {grant.subtitle}
                      </p>
                      <ul className="mt-4 space-y-3">
                        {grant.bullets.map((line, j) => (
                          <li key={j} className="group/li flex gap-4">
                            <Mark />
                            <span className="font-poppins text-[14.5px] font-light leading-[1.85] text-[#1D2D44]/70">
                              {line}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {"note" in grant && grant.note && (
                        <p className="mt-5 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75">
                          {grant.note}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who Can Apply (rail · tint) ───────────────────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title="Who Can Apply?"
                  intro="You should consider applying if your organisation:"
                />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <RailList items={WHO_CAN_APPLY_ITEMS} />
              </div>
            </div>
          </div>
        </section>

        {/* ── What We Look For (rail · white) ───────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title="What We Look For"
                  intro="Applications are assessed based on:"
                />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <RailList items={WHAT_WE_LOOK_FOR_ITEMS} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Application Process (rail · tint · numbered steps) ─────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title="How the Application Process Works"
                  intro="We follow a clear, staged process to support applicants throughout their journey:"
                />
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <ul className="divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
                  {APPLICATION_PROCESS_STEPS.map((step, i) => (
                    <motion.li
                      key={step.title}
                      {...fadeUp(0.05 + i * 0.08)}
                      className="flex gap-5 py-7 sm:gap-7 sm:py-9"
                    >
                      <span className="shrink-0 pt-1 font-poppins text-[12px] font-bold tracking-[0.2em] text-[#EC601B]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="font-poppins text-[1.05rem] font-semibold leading-snug text-[#1D2D44]">
                          {step.title}
                        </p>
                        {"lead" in step && step.lead && (
                          <p className="mt-2 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/60">
                            {step.lead}
                          </p>
                        )}
                        <ul className="mt-4 space-y-3">
                          {step.bullets.map((line, j) => (
                            <li key={j} className="group/li flex gap-4">
                              <Mark />
                              <span className="font-poppins text-[14.5px] font-light leading-[1.85] text-[#1D2D44]/70">
                                {line}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── During the Project (rail · white) ─────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title="During the Project: Monitoring & Support"
                  intro="KFAS works closely with funded companies through:"
                />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <RailList items={DURING_PROJECT_ITEMS} />
              </div>
            </div>
          </div>
        </section>

        {/* ── After the Project (rail · tint) ───────────────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title="After the Project: Outcomes & Impact"
                  intro="At project completion, companies submit final deliverables and reports. KFAS focuses on:"
                />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <RailList items={AFTER_PROJECT_FOCUS_ITEMS} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Partner (rail · white) ────────────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title="Why Partner with KFAS?" />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <RailList items={PARTNER_WITH_KFAS_ITEMS} />
                <motion.p
                  {...fadeUp(0.2)}
                  className="mt-8 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75"
                >
                  Beyond financial support, the co-funding model helps reduce
                  innovation risk while providing applicants with strategic
                  guidance, project oversight, and access to a global network
                  of knowledge partners.
                </motion.p>
                <motion.p
                  {...fadeUp(0.28)}
                  className="mt-5 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75"
                >
                  Companies interested in applying are encouraged to review the
                  grant guidelines and eligibility criteria and contact{" "}
                  <a
                    href={`mailto:${READY_TO_START_EMAIL}`}
                    className="font-medium text-[#EC601B] underline decoration-[#EC601B]/35 underline-offset-[5px] transition-colors hover:text-[#d45510] hover:decoration-[#d45510]/50"
                  >
                    {READY_TO_START_EMAIL}
                  </a>{" "}
                  with a project concept. For any inquiries, contact{" "}
                  <a
                    href={`mailto:${READY_TO_START_EMAIL}`}
                    className="font-medium text-[#EC601B] underline decoration-[#EC601B]/35 underline-offset-[5px] transition-colors hover:text-[#d45510] hover:decoration-[#d45510]/50"
                  >
                    {READY_TO_START_EMAIL}
                  </a>{" "}
                  for guidance.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Success Stories (rail · tint) ─────────────────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title="Success Stories & Impact" />
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <div className="divide-y divide-[#1D2D44]/10">
                  {IMPACT_STORIES.map((story, i) => (
                    <motion.article
                      key={story.id}
                      {...fadeUp(0.08 + i * 0.08)}
                      className={i === 0 ? "pb-10" : "py-10"}
                    >
                      <h3 className="font-poppins text-[1.15rem] font-semibold leading-snug text-[#1D2D44]">
                        {story.title}
                      </h3>
                      <p className="mt-3 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
                        {story.body}
                      </p>

                      {"image" in story && story.image && (
                        <div className="mt-8 max-w-md">
                          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/[0.08] bg-white">
                            <Image
                              src={story.image}
                              alt={story.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, 28rem"
                              className={
                                story.imageFit === "contain"
                                  ? "object-contain object-center p-4"
                                  : "object-cover object-center"
                              }
                            />
                            <span
                              className="absolute left-0 top-0 h-1 w-10 bg-[#EC601B]"
                              aria-hidden
                            />
                          </div>
                        </div>
                      )}
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ready to Start (rail · white) ─────────────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead
                  title="Ready to Start?"
                  intro="Companies interested in applying are encouraged to:"
                />
              </div>
              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <RailList items={READY_TO_START_ITEMS} />
                <motion.p
                  {...fadeUp(0.25)}
                  className="mt-9 font-poppins text-[0.95rem] leading-[1.85] text-[#1D2D44]/70"
                >
                  <span className="font-semibold text-[#1D2D44]">Contact:</span>{" "}
                  <a
                    href={`mailto:${READY_TO_START_EMAIL}`}
                    className="font-medium text-[#EC601B] underline decoration-[#EC601B]/35 underline-offset-[5px] transition-colors hover:text-[#d45510] hover:decoration-[#d45510]/50"
                  >
                    {READY_TO_START_EMAIL}
                  </a>
                </motion.p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
