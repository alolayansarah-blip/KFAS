"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutKfasPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white pt-20 font-poppins">
        {/* Hero Section with Banner */}
        <motion.section
          className="relative overflow-hidden flex items-center"
          initial={{ height: "70vh" }}
          animate={{ height: "45vh" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute inset-0">
            <img
              src="/image/AboutKFASBanner2.jpg"
              alt="Who We Are"
              className="w-full h-full object-cover object-[center_80%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
                <span className="text-white/60">About</span>
                <span className="text-white/40">/</span>
                <span className="text-white">Who We Are</span>
              </div>
              <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] mb-6">
                Who We Are
              </h1>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </motion.section>

        {/* About KFAS Text Sections */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="space-y-12">
              <TextBlock delay={0}>
                The Kuwait Foundation for the Advancement of Sciences (KFAS) is
                a private, non-profit organization established in December 1976.
                Through cooperation with local and international partners, KFAS
                funds and implements research, training, and development
                programs that address Kuwait's national priorities in the fields
                of science, technology, and innovation, as well as operating
                specialized scientific centers. The programs target various
                segments within the innovation ecosystem. KFAS also actively
                engages the wider public to generate awareness and interest in
                the fields of science and technology. KFAS builds alliances
                across academia, government, the private sector, non-government
                organizations, and the broader community to diffuse knowledge
                and accelerate progress.
              </TextBlock>

              <TextBlock delay={0.1}>
                Through its prestigious prizes, KFAS not only celebrates the
                remarkable contributions of Kuwaiti and Arab researchers but
                also reinforces its commitment to advancing science and
                technology. These prizes underscore KFAS's role in rewarding
                excellence, validating impactful research, inspiring future
                generations, and encouraging further contributions to Kuwait's
                scientific and technological landscape. KFAS is recognized as a
                leading player in Kuwait's scientific and technological
                accomplishments and advancements. The governance system of KFAS
                is structured to ensure effective oversight and management of
                its activities. It includes a Board of Directors, chaired and
                appointed by H.H. The Amir of the State of Kuwait, that is
                responsible for strategic decision-making, executive board
                committees focused on specific areas, and an executive
                management that handles day-to-day operations.
              </TextBlock>

              {/* Vision and Mission Section */}
              <div className="mt-10 grid gap-8 lg:grid-cols-2">
                {/* Vision - Left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-3xl border border-[#EC601B]/20 p-8"
                >
                  <div>
                    <h3 className="font-montserrat text-2xl font-bold text-gray-900">
                      Our Vision
                    </h3>
                    <div className="mt-2 h-1 w-12 rounded-full bg-[#EC601B]" />
                  </div>
                  <p className="mt-6 text-gray-600 leading-relaxed">
                    To advance science, technology, and innovation for a resilient,
                    thriving, and sustainable future.
                  </p>
                </motion.div>

                {/* Mission - Right */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-3xl border border-[#EC601B]/20 p-8"
                >
                  <div>
                    <h3 className="font-montserrat text-2xl font-bold text-gray-900">
                      Our Mission
                    </h3>
                    <div className="mt-2 h-1 w-12 rounded-full bg-[#EC601B]" />
                  </div>
                  <p className="mt-6 text-gray-600 leading-relaxed">
                    To pursue scientific excellence to tackle national challenges
                    through a prominent science, technology, and innovation model.
                  </p>
                </motion.div>
              </div>

              {/* Strategic Direction Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 space-y-6"
              >
                <p className="text-gray-600 leading-[1.9] text-base">
                  Driving our work is the premise that science creates
                  knowledge, technology accelerates progress, and innovation
                  shapes transformative solutions. During 2025–2029, we aim to
                  build on our legacy and our strengths by continuing to support
                  exemplary programs and projects, while also accelerating our
                  support for emerging scientific areas that call for new
                  research, novel uses of technology, and expanded horizons in
                  knowledge transfers and human capacities.
                </p>
                <p className="text-gray-600 leading-[1.9] text-base">
                  All of our work will be aligned with our three pillars—robust
                  research ecosystem, viable innovation, and human ingenuity—and
                  each pillar will complement and produce synergies with the
                  others. We will focus on elevating research efficacy,
                  encouraging transdisciplinary research, and informing
                  science-based policy. We will also focus on promoting science,
                  technology, and innovation (STI) transfers and contributing to
                  the growth of the innovation ecosystem. And we will focus on
                  diffusing knowledge and developing human capabilities and
                  potential.
                </p>
                <p className="text-gray-600 leading-[1.9] text-base">
                  We will pursue priority areas that address issues of
                  importance to Kuwait, particularly in the areas of
                  environment, energy, health, STEAM education, water and food
                  security, and future economies, while maintaining a vigilant
                  awareness of emerging trends and initiatives outside these
                  areas that could bring benefit to the nation.
                </p>
                <p className="text-gray-600 leading-[1.9] text-base">
                  Specialized centers of excellence have been established in
                  Kuwait and continue to be funded as subsidiaries of the
                  foundation, providing the country with additional ways to
                  address national challenges through research and development.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-16 bg-[#EC601B]">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
            >
              {[
                "/image/logo_sc.png",
                "/image/logo4.png",
                "/image/logo5.png",
                "/image/logo6.png",
              ].map((src) => (
                <LogoCard key={src} src={src} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Back to Top Section */}
        <div className="py-12 bg-gray-100 flex flex-col items-center justify-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={scrollToTop}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-[#EC601B] transition-colors duration-300 group"
            aria-label="Back to top"
          >
            <div className="w-10 h-10 border-2 border-gray-300 group-hover:border-[#EC601B] rounded-full flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Back to Top</span>
          </motion.button>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Reusable Components
function TextBlock({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <p className="text-gray-600 leading-[1.9] text-base">{children}</p>
    </motion.div>
  );
}

function TimelineItem({
  delay,
  icon,
  title,
  content,
  isLast = false,
}: {
  delay: number;
  icon: "vision" | "mission";
  title: string;
  content: string;
  isLast?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative flex gap-8 ${!isLast ? "pb-12" : ""}`}
    >
      <div className="relative z-10 flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#EC601B] flex items-center justify-center shadow-lg">
          {icon === "vision" ? (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="flex-1 pt-2">
        <h3 className="font-montserrat text-xl font-bold text-[#EC601B] mb-3">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
}

function LogoCard({ src }: { src: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/30 bg-white/15 p-6 shadow-lg shadow-black/10 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center justify-center">
        <img
          src={src}
          alt="Partner Logo"
          className="h-20 w-auto object-contain filter brightness-0 invert opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
    </motion.div>
  );
}
