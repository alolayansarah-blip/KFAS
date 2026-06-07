"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Brand ───────────────────────────────────────────────────────────────────
const BRAND = {
  orange: "#EC601B",
  lightBlue: "#BBDEFB",
  navy: "#1D2D44",
  white: "#FFFFFF",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTAINER = "mx-auto max-w-[1280px]";

// ─── Image placeholder ─────────────────────────────────────────────────────────
// Swap each placeholder for a real photo by replacing the inner block with:
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
      style={{ borderColor: `${BRAND.navy}14` }}
    >
      {/* ── REPLACE FROM HERE ────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${BRAND.lightBlue}45 0%, ${BRAND.navy}12 100%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `radial-gradient(${BRAND.navy}18 1px, transparent 1px)`,
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
            stroke={`${BRAND.navy}`}
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
            style={{ color: `${BRAND.navy}55` }}
          >
            {label}
          </span>
        </div>
      </div>
      {/* ── REPLACE TO HERE ──────────────────────────────────────────── */}

      {/* corner accent */}
      <span
        className="absolute left-0 top-0 h-1 w-10"
        style={{ background: BRAND.orange }}
        aria-hidden
      />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ActivitiesAndEventsSponsershipPage() {
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
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex h-[60vh] min-h-[420px] items-end justify-start overflow-hidden bg-[#121820]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <div
              className="absolute inset-0 scale-110"
              style={{ background: BRAND.navy }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
              aria-hidden
            />
          </motion.div>

          <motion.div
            className="relative z-10 w-full px-6 pb-14 pt-28 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <div className={`${CONTAINER} w-full`}>
              <motion.div
                className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <span>Science &amp; Society</span>
                <span className="text-white/25">/</span>
                <span>Activities &amp; Events Sponsorship</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  className="max-w-[18ch] text-left font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
                >
                  Activities &amp; Events Sponsorship
                </motion.h1>
              </div>

              <motion.div
                className="mt-6 h-[3px] w-[72px] origin-left rounded-full bg-[#EC601B]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              />
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ─────────────────────────────────────────────────── */}
        <section
          id="overview"
          className="scroll-mt-28 px-6 py-20 sm:px-8 sm:py-28 lg:px-12"
        >
          <div className={CONTAINER}>
            <motion.p
              className="mx-auto max-w-[60ch] text-justify font-poppins text-[19px] sm:text-[22px] font-light leading-[1.7]"
              style={{ color: BRAND.navy }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
            >
              KFAS provides grants to support impactful events and activities
              that promote science, technology, and innovation across Kuwait.
              This offering aims to engage the community, inspire youth, and
              strengthen the culture of scientific thinking through interactive
              and educational experiences.
            </motion.p>
          </div>
        </section>

        {/* ── Objectives — two-column grid (image + list) ──────────────── */}
        <section
          id="objectives"
          className="scroll-mt-28 px-6 pb-20 sm:px-8 sm:pb-28 lg:px-12"
        >
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
                whileHover={{ y: -8 }}
              >
                <ImagePlaceholder ratio="aspect-[5/6]" label="Objectives" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                <h2
                  className="font-poppins text-[1.55rem] sm:text-[1.8rem] font-semibold leading-[1.3] tracking-tight"
                  style={{ color: BRAND.navy }}
                >
                  Objectives
                </h2>
                <motion.div
                  className="mt-4 h-px w-full max-w-[420px] origin-left"
                  style={{
                    background: `linear-gradient(to right, ${BRAND.orange}, ${BRAND.lightBlue}40, transparent)`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                />

                <ul className="mt-9 flex flex-col gap-5">
                  {[
                    "Promote public understanding of science and technology",
                    "Encourage youth engagement in STEM fields",
                    "Support knowledge sharing and community outreach",
                    "Foster collaboration between institutions and experts",
                  ].map((objective, i) => (
                    <motion.li
                      key={objective}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.08,
                        ease: EASE,
                      }}
                    >
                      <span
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: BRAND.orange }}
                      />
                      <span
                        className="font-poppins text-[15px] font-light leading-[1.8]"
                        style={{ color: `${BRAND.navy}C0` }}
                      >
                        {objective}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Areas of Focus ───────────────────────────────────────────── */}
        <section id="focus" className="scroll-mt-28 px-6 pb-8 sm:px-8 lg:px-12">
          <div className={CONTAINER}>
            <div
              className="h-px w-full"
              style={{ background: `${BRAND.navy}12` }}
            />
          </div>
        </section>

        {/* Citizen Science Grants — image left / text right */}
        <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
                whileHover={{ y: -8 }}
              >
                <ImagePlaceholder
                  ratio="aspect-[4/3]"
                  label="Citizen Science"
                />
              </motion.div>

              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                <h3
                  className="font-poppins text-[1.4rem] sm:text-[1.65rem] font-semibold leading-[1.3] tracking-tight"
                  style={{ color: BRAND.navy }}
                >
                  Citizen Science Grants
                </h3>

                <div className="flex flex-col gap-4">
                  <p
                    className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
                    style={{ color: `${BRAND.navy}B0` }}
                  >
                    Citizen Science Grant supports initiatives that directly
                    involve the public in scientific research and data
                    collection, with the aim of broadening access to science,
                    strengthening community participation, and enhancing science
                    literacy.
                  </p>
                  <p
                    className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
                    style={{ color: `${BRAND.navy}B0` }}
                  >
                    Through participatory research models, citizen science
                    initiatives enable non-specialist participants to contribute
                    meaningfully to scientific inquiry under appropriate
                    scientific guidance. Supported initiatives are expected to
                    generate reliable data, address locally relevant challenges,
                    and contribute to evidence-based knowledge that benefits the
                    State of Kuwait.
                  </p>
                  <p
                    className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
                    style={{ color: `${BRAND.navy}B0` }}
                  >
                    Citizen science initiatives may be implemented through field
                    activities, digital platforms, community-based monitoring,
                    or other participatory approaches, provided that scientific
                    rigor, and ethical standards.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Science Communication Grant — text left / image right */}
        <section
          className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12"
          style={{ background: `${BRAND.lightBlue}20` }}
        >
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                className="flex flex-col gap-6 lg:order-1"
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <h3
                  className="font-poppins text-[1.4rem] sm:text-[1.65rem] font-semibold leading-[1.3] tracking-tight"
                  style={{ color: BRAND.navy }}
                >
                  Science Communication Grants
                </h3>

                <p
                  className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
                  style={{ color: `${BRAND.navy}B0` }}
                >
                  Science Communication Grant supports initiatives that
                  disseminate scientific knowledge, simplify complex scientific
                  concepts, and enhance public understanding and appreciation of
                  science in everyday life. Also initiatives that translate
                  scientific and technological knowledge into accessible,
                  engaging, and meaningful content for non-specialist audiences.
                  This offering aims to strengthen science culture, promote
                  informed public discourse, and increase awareness of
                  scientific and technological developments across society.
                </p>
              </motion.div>

              <motion.div
                className="lg:order-2"
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                whileHover={{ y: -8 }}
              >
                <ImagePlaceholder
                  ratio="aspect-[4/3]"
                  label="Science Communication"
                />
              </motion.div>
            </div>

            {/* Scope + Eligibility — two-column grid */}
            <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Scope */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <h4
                  className="font-poppins text-[12px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: BRAND.navy }}
                >
                  Scope
                </h4>
                <p
                  className="font-poppins text-[14px] font-light leading-[1.9]"
                  style={{ color: `${BRAND.navy}A0` }}
                >
                  Eligible initiatives may include, but are not limited to:
                </p>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: BRAND.orange }}
                    />
                    <span
                      className="font-poppins text-[14.5px] font-light leading-[1.85]"
                      style={{ color: `${BRAND.navy}B0` }}
                    >
                      <strong
                        className="font-medium"
                        style={{ color: BRAND.navy }}
                      >
                        Scientific publications
                      </strong>{" "}
                      (such as books, magazines, journals, and periodicals),
                      provided that the application is submitted by an academic
                      institution, research center, or professional
                      public-benefit association.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: BRAND.orange }}
                    />
                    <span
                      className="font-poppins text-[14.5px] font-light leading-[1.85]"
                      style={{ color: `${BRAND.navy}B0` }}
                    >
                      <strong
                        className="font-medium"
                        style={{ color: BRAND.navy }}
                      >
                        Media and content production
                      </strong>{" "}
                      including visual, audio, and digital media (e.g.
                      documentaries, videos, podcasts, digital series, and
                      campaigns) with scientific or technological content aimed
                      at disseminating scientific knowledge and raising public
                      awareness of technological advancements.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span
                      className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: BRAND.orange }}
                    />
                    <span
                      className="font-poppins text-[14.5px] font-light leading-[1.85]"
                      style={{ color: `${BRAND.navy}B0` }}
                    >
                      <strong
                        className="font-medium"
                        style={{ color: BRAND.navy }}
                      >
                        Public science communication initiatives
                      </strong>{" "}
                      including exhibitions, festivals, and public awareness
                      activities with scientific and technological content,
                      targeting:
                      <span className="mt-3 flex flex-col gap-2 pl-1">
                        {[
                          "K–12 students",
                          "Undergraduate and graduate students",
                          "Educators and teachers",
                        ].map((target) => (
                          <span key={target} className="flex items-start gap-3">
                            <span
                              className="mt-[10px] h-1 w-3 shrink-0 rounded-full"
                              style={{ background: `${BRAND.lightBlue}` }}
                            />
                            <span>{target}</span>
                          </span>
                        ))}
                      </span>
                    </span>
                  </li>
                </ul>
              </motion.div>

              {/* Eligibility */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              >
                <h4
                  className="font-poppins text-[12px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: BRAND.navy }}
                >
                  Eligibility
                </h4>
                <p
                  className="font-poppins text-[14px] font-light leading-[1.9]"
                  style={{ color: `${BRAND.navy}A0` }}
                >
                  Grants are open to:
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Educational institutions",
                    "Non-profit organizations and civil society groups",
                    "Research and scientific entities",
                    "Relevant public and private sector organizations",
                  ].map((entity, i) => (
                    <motion.li
                      key={entity}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + i * 0.08,
                        ease: EASE,
                      }}
                    >
                      <span
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: BRAND.orange }}
                      />
                      <span
                        className="font-poppins text-[14.5px] font-light leading-[1.8]"
                        style={{ color: `${BRAND.navy}B0` }}
                      >
                        {entity}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section
          id="apply"
          className="scroll-mt-28 px-6 py-20 sm:px-8 sm:py-24 lg:px-12"
          style={{ background: "#7DC0F1" }}
        >
          <div
            className={`${CONTAINER} flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:gap-12 lg:text-left`}
          >
            <motion.h2
              className="max-w-[30ch] font-poppins text-[1.5rem] sm:text-[2rem] font-semibold leading-[1.3] tracking-tight"
              style={{ color: BRAND.white }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              Apply now and bring your initiative to life with KFAS support.
            </motion.h2>
            <motion.a
              href="#"
              className="inline-flex shrink-0 items-center justify-center rounded-full px-9 py-3.5 font-poppins text-[13px] font-semibold uppercase tracking-[0.18em] shadow-sm"
              style={{ background: BRAND.white, color: BRAND.navy }}
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
