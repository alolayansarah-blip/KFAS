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

const GRANT_FOCUS_ITEMS = [
  "Product research & development",
  "Technology transfer and adaptation",
  "Digital transformation and advanced technologies",
  "Process, service, and operational optimisation",
  "Feasibility studies for new technologies or markets",
] as const;

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

const SUCCESS_STORIES_IMPACT_ITEMS = [
  "Launch new or improved products",
  "Adopt advanced technologies",
  "Improve efficiency and competitiveness",
  "Build internal R&D and innovation capabilities",
  "Create long-term partnerships with knowledge providers",
] as const;

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

// ─── Image placeholder ──────────────────────────────────────────────────────
// Swap each placeholder for a real photo by replacing the block between the
// REPLACE markers with:
//   <Image src="/image/your-photo.jpg" alt="…" fill className="object-cover" />
// (or a plain <img src="…" className="absolute inset-0 h-full w-full object-cover" />)
function ImagePlaceholder({
  ratio = "aspect-[4/3]",
  label = "Image",
  className = "",
}: {
  ratio?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden border ${ratio} ${className}`}
      style={{ borderColor: "#1D2D4414" }}
    >
      {/* ── REPLACE FROM HERE ────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #7DC0F145 0%, #1D2D4412 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(#1D2D4418 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1D2D44"
            strokeOpacity="0.4"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.6" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span
            className="font-poppins text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#1D2D4455" }}
          >
            {label}
          </span>
        </div>
      </div>
      {/* ── REPLACE TO HERE ──────────────────────────────────────────── */}

      {/* corner accent */}
      <span
        className="absolute left-0 top-0 h-1 w-10 bg-[#EC601B]"
        aria-hidden
      />
    </div>
  );
}

export default function RandDPrivatePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />

      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex h-[60vh] min-h-[420px] items-end justify-start overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-[#1D2D44]"
            style={{ y: heroY }}
          >
            <Image
              src="/image/RandD.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-[0.92] contrast-[1.02]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </motion.div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-14 pt-28 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>Research</span>
              <span className="text-white/25">/</span>
              <span>R&amp;D in Private Sector</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                R&amp;D in Private Sector
              </motion.h1>
            </div>

            <motion.div
              className="mt-5 h-[3px] w-[72px] origin-left rounded-full bg-[#EC601B]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview (full-width editorial lead) ──────────────────────── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fadeUp()}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p className="mt-5 font-poppins text-[12px] font-semibold uppercase tracking-[0.3em] text-[#EC601B]">
                Overview
              </p>
              <h2 className="mt-4 max-w-3xl font-poppins text-[1.7rem] font-semibold leading-[1.18] tracking-tight text-[#1D2D44] sm:text-[2.1rem]">
                Empowering Innovation in Kuwait&apos;s Private Sector
              </h2>
            </motion.div>

            <div className="mt-8 max-w-3xl space-y-6">
              <motion.p
                {...fadeUp(0.1)}
                className="font-poppins text-[15px] font-light leading-[1.95] text-[#1D2D44]/70"
              >
                KFAS supports Kuwaiti companies in strengthening their
                competitiveness, productivity, and long-term growth through
                science, technology, and innovation.
              </motion.p>
              <motion.p
                {...fadeUp(0.18)}
                className="font-poppins text-[15px] font-light leading-[1.95] text-[#1D2D44]/70"
              >
                Our{" "}
                <span className="font-semibold text-[#1D2D44]">
                  Private Sector R&amp;D Co-Funding Grants
                </span>{" "}
                are designed to help companies transform ideas into impactful
                solutions by sharing risk, accelerating innovation, and
                connecting businesses with local and international knowledge
                providers.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── What is the grant (rail · tint) ───────────────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title="What is the Private Sector R&D Co-Funding Grant?">
                  <p className="mt-5 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
                    The KFAS Private Sector R&amp;D Co-Funding Grant supports
                    applied research, technology development, and innovation
                    projects that deliver clear business and national impact.
                    Grants are co-funded, meaning KFAS partners with companies
                    to jointly fund projects that advance innovation.
                  </p>
                  <p className="mt-5 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/55">
                    Projects typically focus on:
                  </p>
                </SectionHead>
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <RailList items={GRANT_FOCUS_ITEMS} />
              </div>
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
              </div>
            </div>
          </div>
        </section>

        {/* ── Success Stories (rail · tint) ─────────────────────────────── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title="Success Stories & Impact">
                  <p className="mt-5 border-l-2 border-[#EC601B]/30 pl-4 font-poppins text-[0.9rem] font-light italic leading-relaxed text-[#1D2D44]/45">
                    (This is something we can add so people can see previous
                    projects)
                  </p>
                </SectionHead>
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <motion.div {...fadeUp(0.08)}>
                  <h3 className="font-poppins text-[1.15rem] font-semibold leading-snug text-[#1D2D44]">
                    Turning Innovation into Results
                  </h3>
                  <p className="mt-3 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
                    This section can showcase how KFAS-supported projects have
                    helped companies:
                  </p>
                </motion.div>
                <div className="mt-4">
                  <RailList items={SUCCESS_STORIES_IMPACT_ITEMS} />
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} {...fadeUp(0.05 + i * 0.08)}>
                  <ImagePlaceholder
                    ratio="aspect-[4/3]"
                    label="Previous Project"
                  />
                </motion.div>
              ))}
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
