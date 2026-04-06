"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GRADIENT_OVERLAY =
  "linear-gradient(to bottom, rgba(29,45,68,0.35) 0%, rgba(29,45,68,0.45) 50%, rgba(29,45,68,0.6) 100%)";

const HERO_TITLE_TRANSITION = {
  duration: 0.7,
  delay: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

const ACCENT_LINE_TRANSITION = {
  duration: 0.8,
  delay: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function AppliedResearchGrantsPage() {
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
      <main className="min-h-screen bg-white pt-20 font-poppins">
        <section
          ref={heroRef}
          className="relative flex h-[55vh] items-end justify-start overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/applied.png"
              alt="Students collaborating on robotics and applied research"
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ background: GRADIENT_OVERLAY }}
              aria-hidden
            />
          </motion.div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-4 inline-flex flex-wrap items-center gap-2 text-xs tracking-[0.3em] text-white/70 sm:text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-white/60">Research</span>
              <span className="text-white/40">/</span>
              <Link
                href="/research/grants"
                className="text-white/60 transition-colors hover:text-white"
              >
                Grants
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white/60">Applied Research</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={HERO_TITLE_TRANSITION}
              >
                Applied Research Grants
              </motion.h1>
            </div>

            <motion.div
              className="mt-6 h-[2px] origin-left bg-[#EC601B]"
              style={{ width: 80 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={ACCENT_LINE_TRANSITION}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>
      </main>
      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
