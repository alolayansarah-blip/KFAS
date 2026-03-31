"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  "Encourage young researchers and practitioners across Africa to excel in scientific research and development practice.",
  "Recognize outstanding achievements in the early stages of a career that advance African development priorities.",
  "Promote a culture of scientific research and innovation within academic, governmental, and civil society institutions serving the continent.",
  "Support the development of a generation of leaders capable of advancing scientific knowledge for sustainable progress in Africa.",
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

const prizeFieldLabels = ["Health", "Food Security", "Education"];

function PrizeFieldRow({ label, index }: { label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-white/25 group"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-white mt-[10px] flex-shrink-0"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          duration: 2.5,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p className="font-poppins text-white/85 font-light leading-[1.85] text-[0.95rem]">
        {label}
      </p>
    </motion.div>
  );
}

function PrizeFieldRows() {
  return (
    <div>
      {prizeFieldLabels.map((label, i) => (
        <PrizeFieldRow key={label} label={label} index={i} />
      ))}
    </div>
  );
}

const eligibilityItems = [
  "The nominated candidates' research and development work or projects and initiatives must be innovative and have achieved high-impact in the African continent.",
  "The submitted work must be of paramount importance in promoting significant economic, social, human resources and infrastructure development within the announced field of the prize.",
  "Submitted research work of a nominated candidate should be composed of studies and applied research, published in peer-review Scientific journals and recognized at a global level within the announced field. The research outcomes need to have been applied after publication in African countries within the past ten years. Adequate supporting evidence needs to be provided.",
  "Nominations are accepted from competent regional and international institutions and scientific centers (universities, institutes and centers of scientific research) as well as from UN organizations, former winners in the field of the prize, or former evaluation members.",
  "All submissions must be submitted in English. If the work is carried out in other languages, a comprehensive summary of the nominated work in English must be submitted.",
];

function EligibilityNumberedRow({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-4 sm:gap-5 py-5 border-b border-[#1D2D44]/10"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="font-poppins text-[#EC601B] font-medium tabular-nums shrink-0 w-7 sm:w-8 text-[0.95rem] mt-0.5">
        {index + 1}.
      </span>
      <p className="font-poppins text-[#1D2D44]/70 font-light leading-[1.85] text-[0.95rem] min-w-0">
        {text}
      </p>
    </motion.div>
  );
}

function EligibilityNumberedRows() {
  return (
    <div>
      {eligibilityItems.map((text, i) => (
        <EligibilityNumberedRow key={i} text={text} index={i} />
      ))}
    </div>
  );
}

const prizeComponentItems: { title: string; desc: string }[] = [
  {
    title: "USD 1,000,000",
    desc: "A monetary award of USD 1,000,000.",
  },
  {
    title: "Gold Medal",
    desc: "A gold medal.",
  },
  {
    title: "Certificate",
    desc: "A certificate of recognition.",
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

export default function AlSumaitPrizePage() {
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

      <main className="min-h-screen bg-[#FAFAF8] font-poppins pt-20">
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-end justify-start h-[55vh] bg-[#1a1412]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/AlsumaitPrize.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_42%] scale-[1.06] brightness-[0.97] contrast-[1.02]"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                background: [
                  "linear-gradient(128deg, rgba(236,96,27,0.34) 0%, rgba(236,96,27,0.09) 44%, transparent 70%)",
                  "radial-gradient(ellipse 90% 65% at 12% 8%, rgba(255,180,130,0.14) 0%, transparent 58%)",
                  "linear-gradient(to bottom, rgba(26,20,18,0.12) 0%, rgba(55,32,22,0.28) 42%, rgba(18,12,10,0.78) 100%)",
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
              <span className="text-white/60">Prizes / </span>
            </motion.div>

            <h1 className="font-poppins flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 lg:gap-x-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_0_2px_28px_rgba(0,0,0,0.45),_0_1px_2px_rgba(0,0,0,0.35)]">
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
                  Al-Sumait Prize
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
                for African Development
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

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden
          >
            <Image
              src="/image/Africa.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center opacity-[0.42]"
            />
            <div className="absolute inset-0 bg-[#FAFAF8]/80" />
          </div>

          <div className="relative z-10">
            <section className="py-20 sm:py-28">
              <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
                <SectionHeading>Overview of the Al-Sumait Prize</SectionHeading>
                <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
                  <div className="min-w-0 flex-1 space-y-6">
                    <FadeUp delay={0.1}>
                      <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/80 font-light">
                        The Kuwait Foundation for the Advancement of Sciences
                        (KFAS) awards the{" "}
                        <span className="font-semibold text-[#1D2D44]">
                          Al-Sumait Prize for African Development
                        </span>{" "}
                        to encourage outstanding contributions to human
                        development in Africa and to link science and innovation
                        to tangible social progress across various branches of
                        sustainable development.
                      </p>
                    </FadeUp>
                    <FadeUp delay={0.18}>
                      <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/80 font-light">
                        The Al-Sumait Prize reflects KFAS&apos;s commitment to
                        expanding its international recognition footprint,
                        honoring impactful development outcomes in Africa, and
                        encouraging creativity and excellence in fields that
                        strengthen communities and advance long-term prosperity
                        on the continent.
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
                          src="/image/AlsumaitP.png"
                          alt="Al-Sumait Prize for African Development"
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
            </section>

            <section className="pb-20 sm:pb-28 pt-0">
              <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
                  <div className="lg:sticky lg:top-32">
                    <SectionHeading>Objectives of the Prize</SectionHeading>
                    <FadeUp delay={0.15}>
                      <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-6">
                        The Al-Sumait Prize aims to:
                      </p>
                    </FadeUp>
                  </div>
                  <ObjectiveRows />
                </div>
              </div>
            </section>
          </div>
        </div>

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
                <FadeUp delay={0.15}>
                  <p className="font-poppins text-base leading-[1.9] text-white/70 font-light mt-6">
                    The prize is awarded annually in rotating fields that
                    address key development priorities in Africa:
                  </p>
                </FadeUp>
              </div>
              <PrizeFieldRows />
            </div>

            <FadeUp delay={0.2}>
              <p className="font-poppins text-base leading-[1.9] text-white/75 font-light mt-14 lg:mt-16 max-w-2xl">
                Each year, one of these fields is selected as the focus of the
                prize cycle.
              </p>
            </FadeUp>
          </div>
        </section>

        <section className="bg-[#F2EFE9] py-24 relative">
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
              <SectionHeading>Eligibility and Conditions</SectionHeading>
              <FadeUp delay={0.12}>
                <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-6">
                  Nominated candidates must satisfy the following:
                </p>
              </FadeUp>
            </div>
            <EligibilityNumberedRows />
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
            <div>
              <SectionHeading>Prize Components</SectionHeading>
              <div className="mt-8 space-y-6">
                <FadeUp delay={0.05}>
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/80 font-light">
                    The Al-Sumait Prize includes:
                  </p>
                </FadeUp>
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
