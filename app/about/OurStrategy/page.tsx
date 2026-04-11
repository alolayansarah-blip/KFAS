"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function OurStrategyPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-end justify-start h-[60vh] min-h-[420px]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/benduluim.png"
              alt="Our Strategy"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </motion.div>

          <motion.div
            className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-14 pt-28"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>About</span>
              <span className="text-white/25">/</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Our Strategy
              </motion.h1>
            </div>

            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Content ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
              {/* Left — body copy */}
              <div className="space-y-6">
                <motion.p
                  className="text-base text-justify font-light capitalize leading-[1.9] text-[#1D2D44]/65"
                  {...fadeUp(0)}
                >
                  With its strategy for 2025-2029, the Kuwait Foundation for the
                  Advancement of Sciences seeks to enhance and demonstrate the
                  potential value of science, technology, and innovation to
                  complement national efforts in achieving Kuwait's vision and
                  enhancing individual competitiveness on the global stage. In
                  the next five years, we will promote a robust research
                  ecosystem, catalyze viable innovation, and invest in Kuwait's
                  human ingenuity. KFAS integrates its three pillars—
                  <strong className="font-semibold">
                    robust research ecosystem, viable innovation
                  </strong>
                  , and{" "}
                  <strong className="font-semibold"> human ingenuity</strong>
                  —to create a synergistic framework where scientific
                  advancements drive innovation, innovation fuels economic
                  growth, and capacity-building efforts prepare individuals to
                  excel in a knowledge-based economy. By aligning research,
                  innovation, and human development efforts with Kuwait's
                  national vision, KFAS enhances the interplay between knowledge
                  creation, practical application, and talent cultivation,
                  ensuring a sustainable and globally competitive future for the
                  nation. To promote a{" "}
                  <strong className="font-semibold">
                    {" "}
                    robust research ecosystem
                  </strong>
                  , we will amplify Kuwait's scientific contributions regionally
                  and internationally by enabling collaborations with
                  institutions around the world. We will focus our efforts on
                  evolving dynamic priority areas supported in our preceding
                  strategy.
                </motion.p>

                <motion.p
                  className="text-base text-justify font-light capitalize leading-[1.9] text-[#1D2D44]/65"
                  {...fadeUp(0.05)}
                >
                  To catalyze{" "}
                  <strong className="font-semibold"> viable innovation</strong>,
                  we will continue to empower programs and practices that equip
                  Kuwait to meet present and future challenges, converting
                  research outputs into applied knowledge and technologies.
                </motion.p>

                <motion.p
                  className="text-base text-justify font-light capitalize leading-[1.9] text-[#1D2D44]/65"
                  {...fadeUp(0.1)}
                >
                  To invest in Kuwait's{" "}
                  <strong className="font-semibold"> human ingenuity</strong>,
                  we will facilitate knowledge transfers and develop people's
                  capabilities. We will meet shifting demands with rigorous gap
                  analyses and needs assessments. To foster a culture of
                  scientific interest and curiosity, our programs will promote
                  lifelong learning.
                </motion.p>

                <motion.p
                  className="text-base text-justify font-light capitalize leading-[1.9] text-[#1D2D44]/65"
                  {...fadeUp(0.15)}
                >
                  Building on the momentum of recent initiatives to modernize
                  our operations, we will increasingly distinguish KFAS as a
                  model of organizational agility and proficiency. We will
                  strive constantly to be more effective and efficient, and we
                  will strive to adhere to international standards. Through the
                  interconnected pillars of research, innovation, and human
                  ingenuity, KFAS aims to address dynamic national and global
                  challenges by fostering collaborative networks, bridging gaps
                  between academia and industry, and empowering individuals to
                  lead in science, technology, and innovation-driven fields. In
                  our pursuit of organizational proficiency, we will invest in
                  optimizing our operations and developing a positive
                  organizational culture.
                </motion.p>

                {/* Download CTA */}
                <motion.div {...fadeUp(0.2)}>
                  <a
                    href="/image/KFAS_Strategy_2025-2029_EN.pdf"
                    download="KFAS_Strategy_2025-2029_EN.pdf"
                    className="group inline-flex items-center gap-3 mt-4"
                  >
                    <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
                    <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                      Download file
                    </span>
                    <svg
                      className="h-3 w-3 text-[#EC601B] transition-all duration-300 group-hover:text-[#d45510] group-hover:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                      />
                    </svg>
                  </a>
                </motion.div>
              </div>

              {/* Right — three pillars card */}
              <motion.div
                className="hidden lg:flex flex-col gap-4 sticky top-32"
                {...fadeUp(0.2)}
              >
                {[
                  { label: "Pillar 1", title: "Robust Research Ecosystem" },
                  { label: "Pillar 2", title: "Viable Innovation" },
                  { label: "Pillar 3", title: "Human Ingenuity" },
                ].map(({ label, title }, i) => (
                  <div
                    key={i}
                    className="relative border border-[#1D2D44]/08 p-5"
                  >
                    {i === 0 && (
                      <div className="absolute -left-2 -top-2 h-6 w-6 border-l-[1.5px] border-t-[1.5px] border-[#EC601B]/40 pointer-events-none" />
                    )}
                    {i === 2 && (
                      <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-[1.5px] border-r-[1.5px] border-[#7DC0F1]/35 pointer-events-none" />
                    )}
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#EC601B]">
                      {label}
                    </p>
                    <p className="font-poppins text-[15px] font-normal text-[#1D2D44] leading-snug">
                      {title}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Strategy diagram */}
            <motion.img
              src="/image/KFAS_Strategy.png"
              alt="KFAS strategy diagram"
              className="mt-16 w-full max-w-7xl mx-auto"
              {...fadeUp(0.1)}
            />
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
