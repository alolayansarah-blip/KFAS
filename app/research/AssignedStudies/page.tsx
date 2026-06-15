"use client";

import { useRef } from "react";
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

const STEPS = [
  {
    id: "01",
    body: "Policy Papers and Guidelines: KFAS can assist is assigning a consultant, by request, for a specific study of a national issue within priorities that will lead to developing policies or guidelines that have positive impact on stakeholders.",
  },
  {
    id: "02",
    body: "Commissioned Research: KFAS rolls our Call for Proposal for a specific topic or technology within priority areas that requires further research and will lead to application, policy or guidelines.",
  },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

// Editorial section head: orange kicker, then title — sticky in the left rail
function SectionHead({ title }: { title: string }) {
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AssignedStudiesPage() {
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
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/KfasBuilding2.png"
              alt="Assigned Studies"
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover object-center"
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

          {/* padding on the wrapper, max-width on the inner div — matches body sections */}
          <motion.div
            className="relative z-10 w-full px-6 pb-14 pt-28 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <div className="mx-auto w-full max-w-[1280px]">
              <motion.div
                className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <span>Research</span>
                <span className="text-white/25">/</span>
                <span>Assigned Studies</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
                >
                  Assigned Studies
                </motion.h1>
              </div>

              <motion.div
                className="mt-5 h-[3px] w-[72px] origin-left rounded-full bg-[#EC601B]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              />
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview (full-width intro) ── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.div className="max-w-[860px]" {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <span className="mt-5 block font-poppins text-[10px] font-semibold uppercase tracking-[0.35em] text-[#EC601B]">
                Overview
              </span>
              <h2 className="mt-3 font-poppins text-[1.55rem] font-semibold leading-[1.18] tracking-tight text-[#1D2D44] sm:text-[1.9rem]">
                Assigned Studies
              </h2>

              <p className="mt-7 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70">
                They are commissioned studies targeting specific thematic areas
                that have a high impact on Kuwait&apos;s long-term development
                goals, these strategic studies are aligned with Kuwait&apos;s
                national priorities, focusing on producing white papers, policy
                briefs, and research studies to address critical national
                issues.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Process (two-column rail) ── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title="How the process works" />
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <ul className="divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
                  {STEPS.map(({ id, body }, i) => (
                    <motion.li
                      key={id}
                      {...fadeUp(0.05 + i * 0.08)}
                      className="group/li flex gap-5 py-7 sm:gap-7 sm:py-9"
                    >
                      <span className="shrink-0 pt-1 font-poppins text-[12px] font-bold tracking-[0.2em] text-[#EC601B]">
                        {id}
                      </span>
                      <p className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75">
                        {body}
                      </p>
                    </motion.li>
                  ))}
                </ul>
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
