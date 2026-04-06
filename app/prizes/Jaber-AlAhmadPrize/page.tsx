"use client";
import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <motion.h2
        className="font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="mt-3 h-[2px] bg-[#EC601B] origin-left"
        style={{ width: 48 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function SectionHeadingLight({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <motion.h2
        className="font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-white sm:text-[1.85rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="mt-3 h-[2px] bg-white origin-left"
        style={{ width: 48 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function ApplyLink({ href = "#" }: { href?: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 w-fit inline-flex items-center gap-3 border border-[#1D2D44]/10 border-b-2 border-b-[#EC601B] px-6 py-3 text-sm font-medium text-[#1D2D44] font-poppins group/btn"
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
    >
      <span className="group-hover/btn:text-[#EC601B] transition-colors duration-200">
        Click here to apply
      </span>
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:text-[#EC601B]"
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
    </motion.a>
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
      className="flex gap-5 py-5 border-b border-[#1D2D44]/10 group"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
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

const jaberFieldBlocks: { title: string; body: string }[] = [
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
  "A nominee may not apply for more than one field, and the nomination must be in the nominee’s area of scientific specialization with the submitted research.",
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

const prizeComponentItems: { title: string; desc: string }[] = [
  {
    title: "KD 15,000",
    desc: "A monetary award of 15,000 Kuwaiti Dinars.",
  },
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
    <div className="mt-10 border-t border-[#1D2D44]/[0.08] pt-12 sm:pt-14">
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-0">
        {prizeComponentItems.map((item) => (
          <div
            key={item.title}
            className="relative flex min-w-0 flex-col items-center border-b border-[#1D2D44]/[0.06] px-5 py-10 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:border-[#1D2D44]/[0.08] sm:py-2 sm:last:border-r-0 lg:px-10"
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

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

      <main className="min-h-screen bg-[#FAFAF8] font-poppins pt-20">
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-end justify-start h-[55vh] bg-[#1D2D44]"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background: [
                "linear-gradient(118deg, rgba(72,143,204,0.42) 0%, rgba(72,143,204,0.14) 48%, transparent 72%)",
                "linear-gradient(to bottom, rgba(29,45,68,0.28) 0%, rgba(29,45,68,0.4) 50%, rgba(29,45,68,0.52) 100%)",
              ].join(", "),
            }}
          />

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
              <span className="text-white/60">Prizes / </span>
            </motion.div>

            <h1 className="font-poppins flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 lg:gap-x-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)]">
              <div className="overflow-hidden shrink-0">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Jaber Al-Ahmad Prize
                </motion.span>
              </div>
              <motion.span
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-white/90 tracking-normal max-w-[20ch] sm:max-w-none"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                for Young Researchers
              </motion.span>
            </h1>

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

        <section className="py-20 sm:py-28">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
            <div>
              <SectionHeading>
                Overview of the Jaber Al-Ahmad Prize
              </SectionHeading>
              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
                <div className="min-w-0 flex-1 space-y-6">
                  <FadeUp delay={0.1}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/80 font-light">
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
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/80 font-light">
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
                        className="relative h-auto w-full max-w-[300px] object-contain sm:max-w-[360px] lg:max-w-[400px] rounded-lg drop-shadow-lg"
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
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-6">
                    The Jaber Al-Ahmad Prize aims to:
                  </p>
                </FadeUp>
              </div>
              <ObjectiveRows />
            </div>
          </div>
        </section>

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

          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeadingLight>Prize Fields</SectionHeadingLight>
                <p className="font-poppins text-base leading-[1.9] text-white/70 font-light mt-6">
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

        <section className="bg-[#BBDEFB25] py-24 relative">
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

          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start relative z-10">
            <div className="lg:sticky lg:top-32">
              {/* <p className="text-xs tracking-[0.35em] uppercase text-[#EC601B] font-semibold mb-4">
                Requirements
              </p> */}
              <h2 className="font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-[#1D2D44] sm:text-[1.85rem]">
                Eligibility and Conditions
              </h2>
              <div className="mt-3 h-[2px] w-12 bg-[#EC601B]" />
              <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-6">
                Applicants must meet the following requirements:
              </p>
            </div>
            <EligibilityRows />
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
            <div>
              <SectionHeading>Prize Components</SectionHeading>
              <div className="mt-8 space-y-6">
                <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/80 font-light">
                  Each Jaber Al-Ahmad Prize includes:
                </p>
                <PrizeComponentRows />
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
