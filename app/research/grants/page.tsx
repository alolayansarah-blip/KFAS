"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ResearchGrantsPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef as RefObject<HTMLElement | null>,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

      <main className="min-h-screen bg-[#FAFAF8] font-poppins pt-20">
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-end justify-start h-[55vh] bg-[#121820]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/Grants.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_40%] scale-[1.06] brightness-[0.98] contrast-[1.02]"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                background: [
                  "linear-gradient(128deg, rgba(72,143,204,0.34) 0%, rgba(72,143,204,0.09) 44%, transparent 70%)",
                  "radial-gradient(ellipse 90% 65% at 10% 6%, rgba(200,220,250,0.16) 0%, transparent 58%)",
                  "linear-gradient(to bottom, rgba(18,24,32,0.14) 0%, rgba(29,45,68,0.3) 42%, rgba(10,14,22,0.8) 100%)",
                ].join(", "),
              }}
            />
          </motion.div>

          <motion.div
            className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.3em] text-white/70 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-white/60">Research / </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_0_2px_28px_rgba(0,0,0,0.45),_0_1px_2px_rgba(0,0,0,0.35)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Grants
              </motion.h1>
            </div>

            <motion.div
              className="h-[2px] bg-[#EC601B] mt-6 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ width: 80 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-[#FAFAF8]" />
        </section>
      </main>

      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
