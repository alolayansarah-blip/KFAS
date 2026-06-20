"use client";
import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-10">
      <motion.h2
        className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      />
    </div>
  );
}

function SectionHeadingLight({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-10">
      <motion.h2
        className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="mt-5 h-px origin-left bg-white/30"
        style={{ width: 48 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
      />
    </div>
  );
}

function ApplyLink({ href = "#" }: { href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 inline-flex items-center gap-3 w-fit"
    >
      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
        Click here to apply
      </span>
      <svg
        className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </a>
  );
}

const objectiveItems = [
  "Encourage young Kuwaiti researchers to excel in scientific research.",
  "Recognize outstanding research achievements in the early stages of a scientific career.",
  "Promote a culture of scientific research and innovation within academic and research institutions in the State of Kuwait.",
  "Support the development of a generation of researchers capable of contributing to the advancement of scientific knowledge.",
];

function ObjectiveRow({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-[#1D2D44]/10"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-[#EC601B] mt-[10px] flex-shrink-0"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          duration: 2.5,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p className="font-poppins text-[#1D2D44]/70 font-light leading-[1.85] text-[0.95rem]">
        {text}
      </p>
    </motion.div>
  );
}

function ObjectiveRows() {
  return (
    <div>
      {objectiveItems.map((text, i) => (
        <ObjectiveRow key={i} text={text} index={i} />
      ))}
    </div>
  );
}

const jaberFieldBlocks = [
  {
    title: "Natural Sciences and Mathematics",
    body: "Includes physics, chemistry, geology, mathematics, statistics, computer science, and related disciplines.",
  },
  {
    title: "Engineering Sciences",
    body: "Includes chemical engineering, civil engineering, electrical engineering, industrial engineering, mechanical engineering, petroleum engineering, agricultural engineering, and related disciplines.",
  },
  {
    title: "Biological Sciences",
    body: "Includes botany, embryology, zoology, entomology, biochemistry, agriculture, animal resources (veterinary science, dairy production, poultry, livestock, fisheries), agricultural chemistry, plant pathology, horticulture, microbiology, molecular biology, genetics, and related disciplines.",
  },
  {
    title: "Medical and Allied Medical Sciences",
    body: "Includes anatomy, pharmacy, physiology, medical microbiology, pathology, internal medicine, obstetrics and gynecology, pediatrics, psychiatry, radiotherapy, surgery, dentistry, ophthalmology, and related disciplines.",
  },
  {
    title: "Social Sciences and Humanities",
    body: "Includes anthropology, psychology, sociology, political science, history, geography, education, Arabic language, foreign languages, philosophy, law, Islamic jurisprudence, and related disciplines.",
  },
  {
    title: "Administrative and Economic Sciences",
    body: "Includes business administration, marketing, management information systems, finance, international business, accounting, economics, insurance, operations management, and related disciplines.",
  },
];

function JaberFieldBlock({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  return (
    <div className="py-6 border-b border-white/25 last:border-b-0">
      <p className="font-poppins text-white font-medium text-[1rem] sm:text-[1.05rem] leading-snug">
        {index + 1}. {title}
      </p>
      <p className="mt-2 font-poppins text-white/80 font-light leading-[1.85] text-[0.95rem]">
        {body}
      </p>
    </div>
  );
}

const eligibilityItems = [
  "The nominee must be a Kuwaiti national.",
  "The nominee must not have previously won the Jaber Al-Ahmad Prize in any of its fields.",
  "A nominee may not apply for more than one field, and the nomination must be in the nominee's area of scientific specialization with the submitted research.",
  "The nominee must hold a PhD degree, or a fellowship in medical specialties, accredited by the Ministry of Higher Education. Government-sponsored faculty members studying abroad are exempt from this requirement.",
  "The nominee must not exceed 45 years of age at the time the prize is announced.",
  "Scientific outputs considered in the evaluation include primarily peer-reviewed journal publications, as well as conference papers, unpublished research presented at conferences (abstracts and posters), authored/translated/edited books, book chapters, articles, studies, reports, and international patents.",
  "The submitted scientific output must include at least 12 research papers published in peer-reviewed journals after obtaining the PhD or fellowship.",
  "The submitted scientific production must adhere to standards and principles of academic and research integrity.",
  "Decisions of the Board of Directors of KFAS are final and not subject to appeal.",
];

function EligibilityRow({ text }: { text: string }) {
  return (
    <div className="flex gap-5 py-5 border-b border-[#1D2D44]/10">
      <span
        className="w-2 h-2 rounded-full bg-[#EC601B] mt-[10px] flex-shrink-0"
        aria-hidden
      />
      <p className="font-poppins text-[#1D2D44]/70 font-light leading-[1.85] text-[0.95rem]">
        {text}
      </p>
    </div>
  );
}

function EligibilityRows() {
  return (
    <div>
      {eligibilityItems.map((text, i) => (
        <EligibilityRow key={i} text={text} />
      ))}
    </div>
  );
}

const prizeComponentItems = [
  { title: "KD 15,000", desc: "A monetary award of 15,000 Kuwaiti Dinars." },
  {
    title: "Gold Medal",
    desc: "A gold medal bearing the logo of the Kuwait Foundation for the Advancement of Sciences.",
  },
  {
    title: "Certificate",
    desc: "A certificate of recognition issued by KFAS.",
  },
];

function PrizeComponentRows() {
  return (
    <div className="mt-10 border-t border-[#1D2D44]/08 pt-12 sm:pt-14">
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-0">
        {prizeComponentItems.map((item) => (
          <div
            key={item.title}
            className="relative flex min-w-0 flex-col items-center border-b border-[#1D2D44]/06 px-5 py-10 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:border-[#1D2D44]/08 sm:py-2 sm:last:border-r-0 lg:px-10"
          >
            <p className="font-poppins text-[#EC601B] font-light text-[1.5rem] leading-[1.25] tracking-[0.03em] sm:text-[1.65rem] lg:text-[1.8rem]">
              {item.title}
            </p>
            <p className="mx-auto mt-6 max-w-[15.5rem] font-poppins text-[0.9375rem] font-light leading-[1.75] text-[#1D2D44]/58">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JaberAlAhmadPrizePage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative flex h-[540px] items-center justify-start overflow-hidden bg-[#121820]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/Prizes1.png"
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
            className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>Prizes</span>
              <span className="text-white/25">/</span>
            </motion.div>

            <h1 className="font-poppins flex flex-col gap-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]">
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                >
                  Jaber Al-Ahmad
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
                >
                  Prize
                </motion.span>
              </div>
              <motion.span
                className="text-base sm:text-lg lg:text-xl font-light text-white/90 tracking-normal"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
              >
                for Young Researchers
              </motion.span>
            </h1>

            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview + Objectives ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
            <div>
              <SectionHeading>
                Overview of the Jaber Al-Ahmad Prize
              </SectionHeading>
              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
                <div className="min-w-0 flex-1 space-y-6">
                  <FadeUp delay={0.1}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                      The Kuwait Foundation for the Advancement of Sciences
                      (KFAS) awards the{" "}
                      <span className="font-semibold text-[#1D2D44]">
                        Jaber Al-Ahmad Prize for Young Researchers
                      </span>{" "}
                      to encourage outstanding young national scientific talents
                      to engage in research, study, authorship, and translation
                      across various branches of scientific production.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.18}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                      The Jaber Al-Ahmad Prize for Young Researchers was
                      established in{" "}
                      <span className="font-semibold text-[#1D2D44]">1988</span>
                      , following an initiative by the late Amir Sheikh Jaber
                      Al-Ahmad Al-Jaber Al-Sabah, may he rest in peace. The
                      prize aims to honor young Kuwaiti scientists and encourage
                      creativity and excellence in various fields of scientific
                      research.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.22}>
                    <ApplyLink href="https://prizes.kfas.org.kw/" />
                  </FadeUp>
                </div>
                <FadeUp
                  delay={0.25}
                  className="flex shrink-0 justify-center lg:justify-end lg:pt-1"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#EC601B]/10 blur-3xl rounded-full scale-125 pointer-events-none" />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src="/image/JAPrize.png"
                        alt="Jaber Al-Ahmad Prize for Young Researchers"
                        width={480}
                        height={480}
                        className="relative h-auto w-full max-w-[300px] object-contain sm:max-w-[360px] lg:max-w-[400px] drop-shadow-lg"
                        sizes="(max-width: 1024px) 360px, 400px"
                      />
                    </motion.div>
                  </div>
                </FadeUp>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeading>Objectives of the Prize</SectionHeading>
                <FadeUp delay={0.15}>
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-4">
                    The Jaber Al-Ahmad Prize aims to:
                  </p>
                </FadeUp>
              </div>
              <ObjectiveRows />
            </div>
          </div>
        </section>

        {/* ── Prize Fields — orange ── */}
        <section className="bg-[#EC601B] py-24 relative">
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden
          >
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 1px, transparent 0, transparent 50%)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          </div>
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeadingLight>Prize Fields</SectionHeadingLight>
                <p className="font-poppins text-base leading-[1.9] text-white/70 font-light mt-4">
                  The prize covers six scientific fields:
                </p>
              </div>
              <div>
                {jaberFieldBlocks.map((field, i) => (
                  <JaberFieldBlock
                    key={field.title}
                    title={field.title}
                    body={field.body}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Eligibility — light blue tint ── */}
        <section className="bg-[#BBDEFB40] py-24 relative">
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden
          >
            <svg
              className="absolute -top-20 -right-20 opacity-[0.08] w-[480px]"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="130"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="80"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
            </svg>
            <svg
              className="absolute -bottom-16 -left-16 opacity-[0.06] w-[320px]"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="110"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start relative z-10">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight">
                Eligibility and Conditions
              </h2>
              <motion.div
                className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              />
              <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-6">
                Applicants must meet the following requirements:
              </p>
            </div>
            <EligibilityRows />
          </div>
        </section>

        {/* ── Prize Components ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>Prize Components</SectionHeading>
            <div className="mt-8 space-y-6">
              <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                Each Jaber Al-Ahmad Prize includes:
              </p>
              <PrizeComponentRows />
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
