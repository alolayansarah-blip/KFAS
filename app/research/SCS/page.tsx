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
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const OBJECTIVES = [
  "Advance scientific knowledge and dialogue in priority areas",
  "Encourage knowledge exchange and collaboration between local and international experts",
  "Enhance the visibility of Kuwait as a regional hub for scientific exchange",
  "Support outreach activities that engage students and the wider community",
];

const ELIGIBILITY = [
  "Kuwaiti universities and academic institutions",
  "Research centers and scientific organizations",
  "Non-profit entities involved in science and technology",
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Bullet() {
  return (
    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EC601B]" />
  );
}

function Divider() {
  return (
    <div className="mt-5 h-px bg-gradient-to-r from-[#EC601B]/40 via-[#BBDEFB40] to-transparent" />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScientificConferenceSponsorshipPage() {
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
              src="/image/SCSBanner.png"
              alt="Scientific Conference Sponsorship"
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
              <span>Scientific Conference Sponsorship</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                Scientific Conference Sponsorship
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
        <section className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <motion.div className="max-w-[900px]" {...fadeUp(0)}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 shrink-0 bg-[#EC601B]" />
                <span className="font-poppins text-[10px] font-semibold uppercase tracking-[0.35em] text-[#EC601B]">
                  Overview
                </span>
              </div>

              <Divider />

              <p className="mt-7 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70">
                KFAS provides sponsorship opportunities to support the
                organization of high-quality scientific conferences, forums, and
                symposia in Kuwait. This offering aims to strengthen the national
                research ecosystem by facilitating knowledge exchange, fostering
                collaboration, and promoting public engagement with science and
                technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Objectives ── */}
        <section className="border-t border-[#1D2D44]/10 px-6 py-14 sm:px-8 sm:py-20 lg:px-12 bg-[#BBDEFB40]">
          <div className="mx-auto max-w-[1280px]">
            <motion.div className="max-w-[900px]" {...fadeUp(0)}>
              <h2 className="font-poppins text-[1.35rem] font-semibold leading-tight tracking-tight text-[#1D2D44] sm:text-[1.55rem]">
                Objectives
              </h2>
              <Divider />
            </motion.div>

            <ul className="mt-8 max-w-[900px] space-y-4">
              {OBJECTIVES.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <Bullet />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Eligibility ── */}
        <section className="border-t border-[#1D2D44]/10 px-6 py-14 sm:px-8 sm:py-20 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <motion.div className="max-w-[900px]" {...fadeUp(0)}>
              <h2 className="font-poppins text-[1.35rem] font-semibold leading-tight tracking-tight text-[#1D2D44] sm:text-[1.55rem]">
                Eligibility
              </h2>
              <Divider />

              <p className="mt-7 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70">
                Grants are open to:
              </p>
            </motion.div>

            <ul className="mt-6 max-w-[900px] space-y-4">
              {ELIGIBILITY.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <Bullet />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          id="apply"
          className="scroll-mt-28 px-6 py-20 sm:px-8 sm:py-24 lg:px-12"
          style={{ background: "#7DC0F1" }}
        >
          <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:gap-12 lg:text-left">
            <motion.h2
              className="max-w-[30ch] font-poppins text-[1.5rem] font-semibold leading-[1.3] tracking-tight text-white sm:text-[2rem]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              Apply now and bring your initiative to life with KFAS support.
            </motion.h2>
            <motion.a
              href="#"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-9 py-3.5 font-poppins text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1D2D44] shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply Now
            </motion.a>
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
