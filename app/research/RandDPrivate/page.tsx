"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Shared primitives ─────────────────────────────────────────────────── */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-10">
      <motion.h2
        className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      />
    </div>
  );
}

function SectionHeadingLight({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-10">
      <motion.h2
        className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="mt-5 h-px origin-left bg-white/30"
        style={{ width: 48 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
      />
    </div>
  );
}

/* ─── Watermark text ─────────────────────────────────────────────────────── */

function Watermark({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none select-none absolute bottom-0 right-0 font-poppins font-black uppercase leading-none tracking-tighter overflow-hidden ${
        light ? "text-white/[0.025]" : "text-[#1D2D44]/[0.025]"
      }`}
      style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)", lineHeight: 0.85 }}
    >
      {text}
    </span>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

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

/* ─── Animated bullet row ────────────────────────────────────────────────── */

function BulletRow({
  text,
  index,
  light = false,
}: {
  text: string;
  index: number;
  light?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={`flex gap-5 py-5 border-b ${
        light ? "border-white/25" : "border-[#1D2D44]/10"
      }`}
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-[#EC601B] mt-[10px] flex-shrink-0"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          duration: 2.5,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p
        className={`font-poppins font-light leading-[1.85] text-[0.95rem] ${
          light ? "text-white/80" : "text-[#1D2D44]/70"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}

/* ─── Grant type block ───────────────────────────────────────────────────── */

function GrantTypeBlock({
  title,
  subtitle,
  bullets,
  index,
}: {
  title: string;
  subtitle: string;
  bullets: readonly string[];
  index: number;
}) {
  return (
    <div className="py-8 border-b border-white/25 last:border-b-0">
      <p className="font-poppins text-white font-semibold text-[1rem] sm:text-[1.05rem] leading-snug">
        {index + 1}. {title}
      </p>
      <p className="mt-2 font-poppins text-white/75 font-light leading-[1.85] text-[0.95rem]">
        {subtitle}
      </p>
      <ul className="mt-4 space-y-2">
        {bullets.map((line, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-[9px] flex-shrink-0" />
            <span className="font-poppins text-white/70 font-light text-[0.9rem] leading-[1.8]">
              {line}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Application step row ───────────────────────────────────────────────── */

function StepBlock({
  step,
  index,
}: {
  step: (typeof APPLICATION_PROCESS_STEPS)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-[#1D2D44]/10 last:border-b-0"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <span className="font-poppins text-[#EC601B] font-semibold text-[0.85rem] tabular-nums leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        {index < APPLICATION_PROCESS_STEPS.length - 1 && (
          <div className="w-px flex-1 min-h-[24px] bg-[#EC601B]/20 mt-2" />
        )}
      </div>
      <div className="min-w-0 pb-2">
        <p className="font-poppins text-[#1D2D44] font-semibold text-[0.95rem] leading-snug">
          {step.title}
        </p>
        {"lead" in step && step.lead && (
          <p className="mt-2 font-poppins text-[#1D2D44]/55 font-light text-[0.9rem] leading-[1.8]">
            {step.lead}
          </p>
        )}
        <ul className="mt-3 space-y-2">
          {step.bullets.map((line, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EC601B]/50 mt-[9px] flex-shrink-0" />
              <span className="font-poppins text-[#1D2D44]/65 font-light text-[0.9rem] leading-[1.8]">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

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
        {/* ── Hero (unchanged) ──────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex h-[60vh] min-h-[420px] items-end justify-start overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-[#1D2D44]"
            style={{ y: heroY }}
          >
            <Image
              src="/image/kfas-hipo.jpg"
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
                  "radial-gradient(ellipse 85% 55% at 75% 15%, rgba(125,192,241,0.22), transparent 60%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent"
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

        {/* ── Overview + What is the Grant ──────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
            {/* Overview */}
            <div className="relative overflow-hidden pb-2">
              <Watermark text="Overview" />
              <SectionHeading>
                Empowering Innovation in Kuwait&apos;s Private Sector
              </SectionHeading>
              <div className="relative z-10 mt-8 space-y-6 max-w-3xl">
                <FadeUp delay={0.1}>
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                    KFAS supports Kuwaiti companies in strengthening their
                    competitiveness, productivity, and long-term growth through
                    science, technology, and innovation.
                  </p>
                </FadeUp>
                <FadeUp delay={0.18}>
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                    Our{" "}
                    <span className="font-semibold text-[#1D2D44]">
                      Private Sector R&amp;D Co-Funding Grants
                    </span>{" "}
                    are designed to help companies transform ideas into
                    impactful solutions by sharing risk, accelerating
                    innovation, and connecting businesses with local and
                    international knowledge providers.
                  </p>
                </FadeUp>
              </div>
            </div>

            {/* What is the grant */}
            <div className="relative overflow-hidden pb-2">
              <Watermark text="Grant" />
              <div className="relative z-10 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-32">
                  <SectionHeading>
                    What is the Private Sector R&amp;D Co-Funding Grant?
                  </SectionHeading>
                  <FadeUp delay={0.1}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-4">
                      The KFAS Private Sector R&amp;D Co-Funding Grant supports
                      applied research, technology development, and innovation
                      projects that deliver clear business and national impact.
                      Grants are co-funded, meaning KFAS partners with companies
                      to jointly fund projects that advance innovation.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.2}>
                    <p className="mt-6 font-poppins text-[0.9rem] font-light leading-[1.85] text-[#1D2D44]/50">
                      Projects typically focus on:
                    </p>
                  </FadeUp>
                </div>
                <div>
                  {GRANT_FOCUS_ITEMS.map((text, i) => (
                    <BulletRow key={i} text={text} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Grant Types — orange section ──────────────────────────────── */}
        <section className="bg-[#EC601B] py-24 relative overflow-hidden">
          <Watermark text="Types" light />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeadingLight>Grant Types</SectionHeadingLight>
                <p className="font-poppins text-base leading-[1.9] text-white/70 font-light mt-4">
                  Two pathways designed to match the scale and ambition of your
                  innovation project:
                </p>
              </div>
              <div>
                {GRANT_TYPES.map((grant, i) => (
                  <GrantTypeBlock
                    key={grant.title}
                    title={grant.title}
                    subtitle={grant.subtitle}
                    bullets={grant.bullets}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Who Can Apply — light blue tint ───────────────────────────── */}
        <section className="bg-[#BBDEFB40] py-24 relative overflow-hidden">
          <Watermark text="Eligibility" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight">
                Who Can Apply?
              </h2>
              <motion.div
                className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              />
              <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-6">
                You should consider applying if your organisation:
              </p>
            </div>
            <div>
              {WHO_CAN_APPLY_ITEMS.map((text, i) => (
                <BulletRow key={i} text={text} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── What We Look For + Application Process ─────────────────────── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
            {/* What we look for */}
            <div className="relative overflow-hidden pb-2">
              <Watermark text="Selection" />
              <div className="relative z-10 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-32">
                  <SectionHeading>What We Look For</SectionHeading>
                  <FadeUp delay={0.1}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-4">
                      Applications are assessed based on:
                    </p>
                  </FadeUp>
                </div>
                <div>
                  {WHAT_WE_LOOK_FOR_ITEMS.map((text, i) => (
                    <BulletRow key={i} text={text} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Application process */}
            <div className="relative overflow-hidden pb-2">
              <Watermark text="Process" />
              <div className="relative z-10 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-32">
                  <SectionHeading>
                    How the Application Process Works
                  </SectionHeading>
                  <FadeUp delay={0.1}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-4">
                      We follow a clear, staged process to support applicants
                      throughout their journey:
                    </p>
                  </FadeUp>
                </div>
                <div>
                  {APPLICATION_PROCESS_STEPS.map((step, i) => (
                    <StepBlock key={step.title} step={step} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── During the Project — light blue tint ─────────────────────── */}
        <section className="bg-[#BBDEFB40] py-24 relative overflow-hidden">
          <Watermark text="Monitoring" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight">
                During the Project: Monitoring &amp; Support
              </h2>
              <motion.div
                className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              />
              <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-6">
                KFAS works closely with funded companies through:
              </p>
            </div>
            <div>
              {[
                "Regular status update meetings",
                "Milestone-based deliverables and payments",
                "Ongoing interaction from KFAS team",
                "Support with project adjustments, if needed",
              ].map((text, i) => (
                <BulletRow key={i} text={text} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── After the Project — dark navy section ─────────────────────── */}
        <section className="bg-[#1D2D44] py-24 relative overflow-hidden">
          <Watermark text="Impact" light />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeadingLight>
                  After the Project: Outcomes &amp; Impact
                </SectionHeadingLight>
                <p className="font-poppins text-base leading-[1.9] text-white/60 font-light mt-4">
                  At project completion, companies submit final deliverables and
                  reports. KFAS focuses on:
                </p>
              </div>
              <div>
                {AFTER_PROJECT_FOCUS_ITEMS.map((text, i) => (
                  <BulletRow key={i} text={text} index={i} light />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Partner + Success Stories ─────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
            {/* Why Partner */}
            <div className="relative overflow-hidden pb-2">
              <Watermark text="Partnership" />
              <div className="relative z-10 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-32">
                  <SectionHeading>Why Partner with KFAS?</SectionHeading>
                </div>
                <div>
                  {PARTNER_WITH_KFAS_ITEMS.map((text, i) => (
                    <BulletRow key={i} text={text} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Success Stories */}
            <div className="relative overflow-hidden pb-2">
              <Watermark text="Stories" />
              <div className="relative z-10">
                <SectionHeading>Success Stories &amp; Impact</SectionHeading>
                <FadeUp delay={0.05}>
                  <p className="mt-2 mb-10 font-poppins text-[0.9rem] font-light italic leading-relaxed text-[#1D2D44]/45 border-l-2 border-[#EC601B]/30 pl-4">
                    (This is something we can add so people can see previous
                    projects)
                  </p>
                </FadeUp>

                <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
                  <div className="lg:sticky lg:top-32">
                    <FadeUp delay={0.08}>
                      <h3 className="font-poppins text-xl font-semibold text-[#1D2D44] leading-snug">
                        Turning Innovation into Results
                      </h3>
                      <p className="mt-4 font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light">
                        This section can showcase how KFAS-supported projects
                        have helped companies:
                      </p>
                    </FadeUp>
                  </div>
                  <div>
                    {SUCCESS_STORIES_IMPACT_ITEMS.map((text, i) => (
                      <BulletRow key={i} text={text} index={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ready to Start — light blue tint ─────────────────────────── */}
        <section className="bg-[#BBDEFB40] py-24 relative overflow-hidden">
          <Watermark text="Apply" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight">
                  Ready to Start?
                </h2>
                <motion.div
                  className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                />
                <FadeUp delay={0.12}>
                  <p className="mt-6 font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light">
                    Companies interested in applying are encouraged to:
                  </p>
                </FadeUp>
              </div>
              <div>
                {READY_TO_START_ITEMS.map((text, i) => (
                  <BulletRow key={i} text={text} index={i} />
                ))}
                <FadeUp delay={0.25}>
                  <p className="mt-10 font-poppins text-[0.95rem] leading-[1.85] text-[#1D2D44]/70">
                    <span className="font-semibold text-[#1D2D44]">
                      Contact:
                    </span>{" "}
                    <a
                      href={`mailto:${READY_TO_START_EMAIL}`}
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/35 underline-offset-[5px] transition-colors hover:text-[#d45510] hover:decoration-[#d45510]/50"
                    >
                      {READY_TO_START_EMAIL}
                    </a>
                  </p>
                </FadeUp>
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
