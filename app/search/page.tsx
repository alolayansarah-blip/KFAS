"use client";

import { Suspense, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResult";

const EASE = [0.22, 1, 0.36, 1] as const;

const SAFE_X =
  "pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] sm:pl-8 sm:pr-8 lg:pl-12 lg:pr-12";

export default function SearchPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />

      <main className="min-h-screen bg-white font-poppins">
        <section
          ref={heroRef}
          className="relative flex h-[44vh] min-h-[300px] max-h-[480px] items-end overflow-hidden sm:min-h-[340px]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/KFASBuilding3.png"
              alt="Search"
              fill
              priority
              sizes="100vw"
              className="scale-105 object-cover object-right-bottom"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.82) 0%, rgba(29,45,68,0.48) 45%, rgba(29,45,68,0.12) 72%, transparent 100%)",
              }}
            />
            <div
              aria-hid
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.55) 0%, transparent 50%)",
              }}
            />
          </motion.div>

          <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-gradient-to-r from-[#EC601B] via-[#EC601B]/40 to-transparent" />

          <motion.div
            className={`relative z-10 w-full ${SAFE_X} pb-12 pt-[max(7rem,calc(env(safe-area-inset-top)+5.5rem))] sm:pb-14`}
            style={{ opacity: heroOpacity }}
          >
            <div className="mx-auto w-full max-w-[1280px]">
              <motion.p
                className="mb-4 font-poppins text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                Search
              </motion.p>

              <div className="overflow-hidden">
                <motion.h1
                  className="font-poppins text-[2rem] font-bold leading-[1.1] tracking-tight text-white [text-shadow:_2px_2px_20px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-[3.25rem]"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
                >
                  Search the Website
                </motion.h1>
              </div>

              <motion.div
                className="mt-6 h-[3px] w-16 origin-left bg-[#EC601B]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.5, ease: EASE }}
              />
            </div>
          </motion.div>
        </section>

        <Suspense
          fallback={
            <div
              className={`${SAFE_X} bg-white py-16 font-poppins text-[#1D2D44]/50`}
            >
              Loading…
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </main>

      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
