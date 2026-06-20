"use client";

import { useRef } from "react";
import Image from "next/image";
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

// Gallery tiles — `span` controls the mosaic shape.
const GALLERY = [
  {
    src: "/image/spacialneeds2.webp",
    alt: "KFAS special needs program community engagement",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/image/specialNeeds.webp",
    alt: "Inclusive support and accessibility for special needs",
  },
  {
    src: "/image/specialneeds3.webp",
    alt: "Special needs educational and outreach activities",
  },
  {
    src: "/image/specialneeds4.webp",
    alt: "Assistive technology and inclusion initiatives",
  },
  {
    src: "/image/specialneeds1.webp",
    alt: "Special needs capacity-building programs",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function SpecialNeedsPage() {
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
          className="relative flex h-[540px] items-center justify-start overflow-hidden bg-[#121820]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <div className="absolute inset-0 bg-[#1D2D44]">
              <Image
                src="/image/specialNeeds.webp"
                alt="Inclusive support and accessibility for special needs"
                fill
                priority
                quality={90}
                sizes="100vw"
                className="scale-105 object-cover object-center"
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
            </div>
          </motion.div>

          <motion.div
            className="relative z-10 w-full px-6 py-12 sm:px-8 lg:px-12"
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
                <span>Special Needs</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  className="text-left font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
                >
                  Special Needs
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
            <div className="flex w-full flex-col gap-6">
              <motion.p
                className="text-justify font-poppins text-[16px] sm:text-[17px] font-light leading-[1.95]"
                style={{ color: BRAND.navy }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                KFAS provides grants to support initiatives that empower
                individuals with special needs through science, education, and
                technology. The program focuses on promoting inclusion,
                enhancing accessibility, and improving quality of life.
              </motion.p>
              <motion.p
                className="text-justify font-poppins text-[16px] sm:text-[17px] font-light leading-[1.95]"
                style={{ color: BRAND.navy }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              >
                KFAS supports projects such as assistive technologies, inclusive
                educational programs, capacity-building initiatives, and
                community awareness activities. Through these grants, KFAS aims
                to enable greater participation, foster independence, and create
                meaningful impact for individuals with special needs and their
                communities.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Gallery ──────────────────────────────────────────────────── */}
        <section
          id="gallery"
          className="scroll-mt-28 px-6 pb-20 sm:px-8 sm:pb-28 lg:px-12"
        >
          <div className={CONTAINER}>
            {/* Editorial mosaic — one feature tile + supporting tiles.
                Row height is set by grid-auto-rows; feature spans 2×2. */}
            <div className="grid grid-cols-2 gap-4 [grid-auto-rows:150px] sm:gap-5 sm:[grid-auto-rows:200px] lg:grid-cols-4">
              {GALLERY.map((item, i) => (
                <motion.div
                  key={item.src}
                  className={`h-full ${item.span ?? ""}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                  whileHover={{ y: -6 }}
                >
                  <div
                    className="group relative h-full w-full overflow-hidden border"
                    style={{ borderColor: `${BRAND.navy}14` }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute left-0 top-0 h-1 w-10"
                      style={{ background: BRAND.orange }}
                      aria-hidden
                    />
                  </div>
                </motion.div>
              ))}
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
