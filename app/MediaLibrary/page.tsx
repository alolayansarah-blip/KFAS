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

// PLACEHOLDER downloads — rename each `title` and point `href` at your real file.
const DOWNLOADS = [
  { title: "Brand Guidelines", meta: "PDF", href: "#" },
  { title: "Color Palettes", meta: "PDF", href: "#" },
  { title: "Logo Usage", meta: "PDF", href: "#" },
  { title: "Asset Pack", meta: "PDF", href: "#" },
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

// Downloadable file row — editorial hairline list treatment.
// To wire a real file: set `href` to its path (e.g. "/files/brand-guidelines.pdf").
function DownloadRow({
  title,
  meta = "PDF",
  href = "#",
}: {
  title: string;
  meta?: string;
  href?: string;
}) {
  return (
    <a
      href={
        href
      } /* ── REPLACE: path to your PDF, e.g. "/files/your-file.pdf" ── */
      download
      className="group flex items-center gap-5 py-6 sm:gap-6"
    >
      {/* file icon */}
      <span className="grid h-12 w-12 shrink-0 place-items-center bg-[#7DC0F1]/[0.12] text-[#EC601B] transition-colors duration-300 group-hover:bg-[#EC601B] group-hover:text-white">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-poppins text-[15px] font-medium text-[#1D2D44] transition-colors duration-300 group-hover:text-[#EC601B]">
          {title}
        </span>
        <span className="mt-1 block font-poppins text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1D2D44]/40">
          {meta}
        </span>
      </span>

      {/* download arrow */}
      <span className="shrink-0 text-[#1D2D44]/25 transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-[#EC601B]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 3v12" />
          <path d="m7 11 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
      </span>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MediaLibraryPage() {
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
              src="/image/KFASBuilding3.png"
              alt="Media Library"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-110 object-cover object-bottom"
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
                <span>About</span>
                <span className="text-white/25">/</span>
                <span>Media Library</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
                >
                  Media Library
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
            <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
              <motion.div className="lg:col-span-7" {...fadeUp(0)}>
                <p className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70">
                  Welcome to the KFAS Media Library. This centralized resource
                  is designed to ensure consistent and accurate representation
                  of the Kuwait Foundation for the Advancement of Sciences brand
                  across all platforms. Here, you will find our official brand
                  guidelines, primary and secondary color palettes, and specific
                  rules for correct logo usage. Please review our visual
                  identity requirements and download the official asset packs
                  and comprehensive PDF guideline manuals below to ensure your
                  materials align with our standards.
                </p>
              </motion.div>

              <motion.div
                className="flex justify-center lg:col-span-5 lg:justify-end"
                {...fadeUp(0.1)}
              >
                <Image
                  src="/image/KFASLogo.png"
                  alt="Kuwait Foundation for the Advancement of Sciences (KFAS)"
                  width={280}
                  height={110}
                  className="h-auto w-full max-w-[200px] sm:max-w-[230px] lg:max-w-[260px]"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Downloads (two-column rail) ── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                {/* placeholder heading — rename to your own */}
                <SectionHead title="Downloads" />
              </div>

              <div className="lg:col-span-8">
                <div className="divide-y divide-[#1D2D44]/[0.08] border-y border-[#1D2D44]/[0.08]">
                  {DOWNLOADS.map(({ title, meta, href }, i) => (
                    <motion.div key={title} {...fadeUp(0.05 + i * 0.06)}>
                      <DownloadRow title={title} meta={meta} href={href} />
                    </motion.div>
                  ))}
                </div>
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
