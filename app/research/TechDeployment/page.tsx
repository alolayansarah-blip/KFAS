"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// ─── Sticky rail heading ────────────────────────────────────────────────────
function SectionHead({ title }: { title: ReactNode }) {
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
      </motion.div>
    </div>
  );
}

// ─── Two-column rail section ────────────────────────────────────────────────
function RailSection({
  title,
  tint = false,
  children,
}: {
  title: ReactNode;
  tint?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`px-6 py-20 sm:px-8 sm:py-24 lg:px-12 ${tint ? "bg-[#7DC0F1]/[0.06]" : "bg-white"}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead title={title} />
          </div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

type ProcessStep =
  | { num: number; title: string; bullets: string[] }
  | { num: number; body: string };

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: 1,
    title: "Applicants submit a short concept note outlining:",
    bullets: [
      "Project objectives and scope",
      "High-level timeline",
      "Budget summary",
      "Expected outcome",
    ],
  },
  {
    num: 2,
    body: "Concept Review: KFAS reviews the concept for relevance and eligibility. This can include several meetings with applicant to refine the proposed concept.",
  },
  {
    num: 3,
    body: "Applicant is requested to submit a detailed proposal with project description and methodology including a letter of intent from his/her institution.",
  },
  {
    num: 4,
    body: "KFAS reviews the proposal for funding eligibility.",
  },
];

/* ─── Editorial step row ─────────────────────────────────────────────────── */

function StepRow({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <motion.div
      className="flex gap-5 py-6"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
    >
      <div className="flex shrink-0 flex-col items-center pt-1">
        <span className="font-poppins text-[0.85rem] font-semibold leading-none tabular-nums text-[#EC601B]">
          {String(step.num).padStart(2, "0")}
        </span>
        {index < PROCESS_STEPS.length - 1 && (
          <div className="mt-2 min-h-[24px] w-px flex-1 bg-[#EC601B]/20" />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-2">
        {"bullets" in step ? (
          <>
            <p className="font-poppins text-[0.95rem] font-semibold leading-snug text-[#1D2D44]">
              {step.title}
            </p>
            <ul className="mt-3 space-y-2 pl-2">
              {step.bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7DC0F1]" />
                  <span className="font-poppins text-[0.9rem] font-light leading-[1.8] text-[#1D2D44]/65">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="font-poppins text-[0.95rem] font-light leading-[1.85] text-[#1D2D44]/65">
            {step.body}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function TechDeploymentPage() {
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
          <div className="absolute inset-0">
            <Image
              src="/image/techD.webp"
              alt="Technology deployment and innovation"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-110 object-cover object-[center_70%]"
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
            className="relative z-10 mt-32 md:mt-28 lg:mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
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
              <span>Technology Deployment</span> */}
            </motion.div>

            {/* Title — clip-path wipe */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                Technology
                <br />
                Deployment
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

        {/* ── Overview ──────────────────────────────────────────────────── */}
        <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#EC601B]">
                Overview
              </p>
              <h2 className="mt-4 font-poppins text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-[#1D2D44]">
                Tech Deployment
              </h2>
              <p className="mt-4 font-poppins text-[0.9rem] font-light uppercase leading-relaxed tracking-[0.3em] text-[#1D2D44]/35">
                Pilot Projects &amp;
                <br />
                Scalable Solutions
              </p>
            </motion.div>
            <motion.p
              className="mt-7 font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light"
              {...fadeUp(0.05)}
            >
              Technology Deployment (Pilot) projects offer scalable solutions to
              national challenges. These projects drive innovation,
              sustainability, and socio-economic progress in Kuwait and are
              designed to transform research into practical applications,
              supporting technology transfer, economic growth, and institutional
              collaboration.
            </motion.p>
          </div>
        </section>

        {/* ── Who Can Apply ─────────────────────────────────────────────── */}
        <RailSection tint title="Who Can Apply?">
          <motion.p
            className="font-poppins text-base leading-[1.9] text-[#1D2D44]/70 font-light"
            {...fadeUp(0.05)}
          >
            Any Kuwait based research institution, public entities and NGOs.
          </motion.p>
        </RailSection>

        {/* ── How the Process Works ─────────────────────────────────────── */}
        <RailSection title="How the Process Works">
          <motion.p
            className="font-poppins text-base leading-[1.9] text-[#1D2D44]/50 font-light"
            {...fadeUp(0.05)}
          >
            Applications open year-round
          </motion.p>
          <div className="mt-6">
            {PROCESS_STEPS.map((step, i) => (
              <StepRow key={step.num} step={step} index={i} />
            ))}
          </div>
        </RailSection>
      </main>

      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
