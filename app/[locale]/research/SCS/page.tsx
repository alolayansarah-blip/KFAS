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

// Refined hairline list marker (grows on hover of its row)
function Mark() {
  return (
    <span className="mt-[13px] h-px w-3.5 shrink-0 bg-[#EC601B] transition-all duration-300 group-hover/li:w-6" />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScientificConferenceSponsorshipPage() {
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
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#1D2D44]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/SCS.jpeg"
              alt="Scientific Conference Sponsorship"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-110 object-cover object-[center_22%]"
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
            className="relative z-10 mt-24 md:mt-28 lg:mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
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
            </motion.div>

            {/* Title — clip-path wipe */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                Scientific Conference Sponsorship
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

        {/* ── Overview (text + image editorial row) ── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-2">
              <motion.div {...fadeUp(0)}>
                <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
                <span className="mt-5 block font-poppins text-[10px] font-semibold uppercase tracking-[0.35em] text-[#EC601B]">
                  Overview
                </span>

                <p className="mt-7 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70">
                  KFAS provides sponsorship opportunities to support the
                  organization of high-quality scientific conferences, forums,
                  and symposia in Kuwait. This offering aims to strengthen the
                  national research ecosystem by facilitating knowledge
                  exchange, fostering collaboration, and promoting public
                  engagement with science and technology.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.1)}>
                <div className="group relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/[0.08]">
                  <Image
                    src="/image/ScS2.jpeg"
                    alt="Audience at a scientific conference in Kuwait"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Objectives (two-column rail) ── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title="Objectives" />
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <ul className="divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
                  {OBJECTIVES.map((item, i) => (
                    <motion.li
                      key={item}
                      {...fadeUp(0.05 + i * 0.06)}
                      className="group/li flex gap-4 py-5 sm:py-6"
                    >
                      <Mark />
                      <span className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Eligibility (two-column rail) ── */}
        <section className="border-t border-[#1D2D44]/10 bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title="Eligibility" />
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <motion.p
                  {...fadeUp(0)}
                  className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70"
                >
                  Grants are open to:
                </motion.p>

                <ul className="mt-2 divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
                  {ELIGIBILITY.map((item, i) => (
                    <motion.li
                      key={item}
                      {...fadeUp(0.05 + i * 0.06)}
                      className="group/li flex gap-4 py-5 sm:py-6"
                    >
                      <Mark />
                      <span className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/75">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
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
