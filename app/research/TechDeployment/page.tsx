"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

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
        {/* ── Hero ── */}
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

        {/* ── Overview ── */}
        <section className="relative overflow-hidden bg-white px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="relative mx-auto max-w-[1280px]">
            <motion.div className="max-w-[900px]" {...fadeUp(0)}>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-[#EC601B]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#EC601B]">
                  Overview
                </span>
              </div>

              <p className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
                Technology Deployment (Pilot) projects offer scalable solutions
                to national challenges. These projects drive innovation,
                sustainability, and socio-economic progress in Kuwait and are
                designed to transform research into practical applications,
                supporting technology transfer, economic growth, and
                institutional collaboration.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Who Can Apply (blue band capped at 1280px like other bands) ── */}
        <section className="bg-white px-6 py-7 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
          <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden bg-[#7DC0F1] px-6 py-7 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
            {/* Dot grid texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(29,45,68,0.35) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Corner accent */}
            <div
              aria-hidden
              className="absolute left-0 top-0 h-1 w-24 bg-[#1D2D44]/20"
            />
            <div
              aria-hidden
              className="absolute left-0 top-0 h-16 w-1 bg-[#1D2D44]/20"
            />

            <div className="relative">
              {/* Section label */}
              <motion.div
                className="mb-4 flex items-center gap-3"
                {...fadeUp(0)}
              >
                <div className="h-px w-8 bg-[#1D2D44]/40" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#1D2D44]/60">
                  Eligibility
                </span>
              </motion.div>

              <motion.div className="max-w-[900px]" {...fadeUp(0.05)}>
                <h2 className="font-poppins text-3xl font-black leading-tight tracking-tight text-[#1D2D44] sm:text-4xl">
                  Who Can
                  <br />
                  <span className="text-[#EC601B]">Apply?</span>
                </h2>

                <p className="mt-4 font-poppins text-[15px] font-light leading-[1.85] text-[#1D2D44]/70">
                  Any Kuwait based research institution, public entities and NGOs.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="relative overflow-hidden bg-white px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="relative mx-auto max-w-[1280px]">
            <motion.div {...fadeUp(0)}>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-[#EC601B]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#EC601B]">
                  Application Process
                </span>
              </div>

              <h2 className="font-poppins text-3xl font-black leading-tight tracking-tight text-[#1D2D44] sm:text-4xl">
                How the Process
                <br />
                Works
              </h2>
              <p className="mt-3 font-poppins text-[15px] font-light leading-relaxed text-[#1D2D44]/55 sm:text-[16px]">
                Applications open year-round
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-0 md:grid-cols-2">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="group relative border border-[#1D2D44]/08 p-8 transition-colors duration-300 hover:bg-[#1D2D44]/[0.02]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                >
                  {/* Step number — large decorative */}
                  <div className="mb-5 flex items-start justify-between">
                    <span className="font-poppins text-[3.5rem] font-black leading-none text-[#EC601B]/15 transition-colors duration-300 group-hover:text-[#EC601B]/25">
                      0{step.num}
                    </span>
                    {/* Orange corner on hover */}
                    <div className="h-5 w-5 border-r-[1.5px] border-t-[1.5px] border-[#EC601B]/0 transition-colors duration-300 group-hover:border-[#EC601B]/50" />
                  </div>

                  {"bullets" in step ? (
                    <>
                      <p className="font-poppins text-[14px] font-medium leading-snug text-[#1D2D44] mb-4">
                        {step.title}
                      </p>
                      <ul className="space-y-2.5">
                        {step.bullets.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 font-poppins text-[13.5px] font-light leading-relaxed text-[#1D2D44]/60"
                          >
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EC601B]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="font-poppins text-[14px] font-light leading-[1.85] text-[#1D2D44]/65">
                      {step.body}
                    </p>
                  )}

                  {/* Bottom orange line — grows on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#EC601B] transition-all duration-500 group-hover:w-full" />
                </motion.div>
              ))}
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
