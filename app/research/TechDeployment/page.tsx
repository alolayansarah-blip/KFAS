"use client";

import { useRef, type ReactNode } from "react";
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

/* ─── Step block component ───────────────────────────────────────────────── */

function StepBlock({ step, index }: { step: ProcessStep; index: number }) {
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
          {String(step.num).padStart(2, "0")}
        </span>
        {index < PROCESS_STEPS.length - 1 && (
          <div className="w-px flex-1 min-h-[24px] bg-[#EC601B]/20 mt-2" />
        )}
      </div>
      <div className="min-w-0 pb-2">
        {"bullets" in step ? (
          <>
            <p className="font-poppins text-[#1D2D44] font-semibold text-[0.95rem] leading-snug">
              {step.title}
            </p>
            <ul className="mt-3 space-y-2">
              {step.bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EC601B]/50 mt-[9px] flex-shrink-0" />
                  <span className="font-poppins text-[#1D2D44]/65 font-light text-[0.9rem] leading-[1.8]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="font-poppins text-[#1D2D44]/65 font-light text-[0.95rem] leading-[1.85]">
            {step.body}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function TechDeploymentPage() {
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
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
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
              <span>Tech Deployment</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                Tech Deployment
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

        {/* ── Overview ──────────────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="relative overflow-hidden pb-2">
              <Watermark text="Overview" />
              <div className="relative z-10 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-32">
                  <SectionHeading>Tech Deployment</SectionHeading>
                  <FadeUp delay={0.1}>
                    <p className="font-poppins text-[0.9rem] font-light uppercase tracking-[0.3em] text-[#1D2D44]/35 mt-4 leading-relaxed">
                      Pilot Projects &<br />
                      Scalable Solutions
                    </p>
                  </FadeUp>
                </div>
                <FadeUp delay={0.12}>
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                    Technology Deployment (Pilot) projects offer scalable
                    solutions to national challenges. These projects drive
                    innovation, sustainability, and socio-economic progress in
                    Kuwait and are designed to transform research into practical
                    applications, supporting technology transfer, economic
                    growth, and institutional collaboration.
                  </p>
                </FadeUp>
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
            </div>
            <FadeUp delay={0.1}>
              <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/70 font-light">
                Any Kuwait based research institution, public entities and NGOs.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Application Process — white section ───────────────────────── */}
        <section className="bg-white py-24 relative overflow-hidden">
          <Watermark text="Process" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeading>How the Process Works</SectionHeading>
                <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/50 font-light mt-4">
                  Applications open year-round
                </p>
              </div>
              <div>
                {PROCESS_STEPS.map((step, i) => (
                  <StepBlock key={step.num} step={step} index={i} />
                ))}
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

/* ─── Light variant of StepBlock for orange background ──────────────────── */

function StepBlockLight({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-white/25 last:border-b-0"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <span className="font-poppins text-white font-semibold text-[0.85rem] tabular-nums leading-none">
          {String(step.num).padStart(2, "0")}
        </span>
        {index < PROCESS_STEPS.length - 1 && (
          <div className="w-px flex-1 min-h-[24px] bg-white/30 mt-2" />
        )}
      </div>
      <div className="min-w-0 pb-2">
        {"bullets" in step ? (
          <>
            <p className="font-poppins text-white font-semibold text-[0.95rem] leading-snug">
              {step.title}
            </p>
            <ul className="mt-3 space-y-2">
              {step.bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-[9px] flex-shrink-0" />
                  <span className="font-poppins text-white/75 font-light text-[0.9rem] leading-[1.8]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="font-poppins text-white/80 font-light text-[0.95rem] leading-[1.85]">
            {step.body}
          </p>
        )}
      </div>
    </motion.div>
  );
}
