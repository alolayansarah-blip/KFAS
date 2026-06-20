"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── FadeUp ───────────────────────────────────────────────────────────────────
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

// ─── Section Heading ──────────────────────────────────────────────────────────
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

// ─── Section Heading Light (for orange bg) ────────────────────────────────────
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

// ─── Apply Link — matches site CTA style ─────────────────────────────────────
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

// ─── Prize Components ─────────────────────────────────────────────────────────
const prizeComponentItems = [
  {
    title: "KD 40,000",
    desc: "A monetary award of KD 40,000. (Approx. $135,000)",
  },
  { title: "Gold Medal", desc: "A gold medal bearing the emblem of KFAS." },
  { title: "Certificate", desc: "A certificate of recognition from KFAS." },
];

function PrizeComponentRows() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="mt-10 border-t border-[#1D2D44]/08 pt-12 sm:pt-14"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-0">
        {prizeComponentItems.map((item, i) => (
          <motion.div
            key={item.title}
            className="relative flex min-w-0 flex-col items-center border-b border-[#1D2D44]/06 px-5 py-10 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:border-[#1D2D44]/08 sm:py-2 sm:last:border-r-0 lg:px-10"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.28, ease: EASE }}
          >
            <p className="font-poppins text-[#EC601B] font-light text-[1.5rem] leading-[1.25] tracking-[0.03em] sm:text-[1.65rem] lg:text-[1.8rem]">
              {item.title}
            </p>
            <p className="mx-auto mt-6 max-w-[15.5rem] font-poppins text-[0.9375rem] font-light leading-[1.75] text-[#1D2D44]/58">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Prize Fields ─────────────────────────────────────────────────────────────
const fieldData = [
  "Basic Sciences",
  "Applied Sciences",
  "Economic, Social and Legal Sciences",
  "Humanities, Arts and Literature",
  "Emerging Sciences",
];

function PrizeFieldRow({ label, index }: { label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-white/25 group"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
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
      {fieldData.map((label, i) => (
        <PrizeFieldRow key={label} label={label} index={i} />
      ))}
    </div>
  );
}

// ─── Eligibility ──────────────────────────────────────────────────────────────
const eligibilityItems = [
  "The nominee must be of Arab nationality and provide supporting documentation proving Arab origin.",
  "The nominee must be a distinguished researcher in the relevant scientific field and hold a doctorate degree or, in medical specialties, an equivalent fellowship.",
  "The nominee must not have previously won any field of the Kuwait Prize.",
  "Nomination may be made in one field only.",
  "The nominee's scientific or scholarly production must represent an original, continuous, and influential contribution in the field of nomination.",
  "The submitted scientific production must be of significant relevance to the subject of the Prize.",
  "Scientific production may include peer-reviewed research published in scientific journals, research published in scientific conferences, authored, translated, edited, and verified books and book chapters, artistic production in the fields of arts and literature, art exhibitions, and international patents, in accordance with the approved rules and criteria of the Prize.",
  "Nominations are accepted through universities, governmental and private institutes, previous Kuwait Prize laureates, research and nomination committees, accredited international organizations, as well as self-nomination, in accordance with KFAS regulations. KFAS does not accept nominations from political entities.",
  "In the case of self-nomination, the nominee shall attach a detailed statement setting out the justifications for eligibility, together with recommendation letters from references affiliated with scientific institutions.",
];

function EligibilityRow({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-[#1D2D44]/10 group"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
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

function EligibilityRows() {
  return (
    <div>
      {eligibilityItems.map((text, i) => (
        <EligibilityRow key={i} text={text} index={i} />
      ))}
    </div>
  );
}

// ─── Objectives ───────────────────────────────────────────────────────────────
const objectiveItems = [
  "Promote scientific research and innovation in key fields of knowledge.",
  "Recognize and honor distinguished scientists and scholars whose work has significantly advanced their disciplines.",
  "Encourage Arab researchers to pursue excellence in scientific inquiry and discovery.",
  "Strengthen the culture of research and knowledge development in the Arab world.",
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function KuwaitPrizesPage() {
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
            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_0_2px_28px_rgba(0,0,0,0.45),_0_1px_2px_rgba(0,0,0,0.35)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              >
                Kuwait Prize
              </motion.h1>
            </div>
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

        {/* ── Body ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
            {/* Overview */}
            <div>
              <SectionHeading>Overview of the Kuwait Prize</SectionHeading>
              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
                <div className="min-w-0 flex-1 space-y-6">
                  <FadeUp delay={0.1}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                      The Kuwait Prize is one of the most prestigious scientific
                      awards granted by the Kuwait Foundation for the
                      Advancement of Sciences (KFAS). The prize recognizes
                      distinguished researchers who have made significant and
                      impactful contributions to the advancement of science,
                      knowledge, and innovation in fields that serve humanity
                      and promote scientific progress.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.18}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                      Established in{" "}
                      <span className="font-semibold text-[#1D2D44]">1979</span>
                      , the Kuwait Prize aims to encourage excellence in
                      scientific research and to highlight outstanding
                      achievements by scientists and scholars whose work
                      contributes to the development of knowledge and the
                      advancement of society.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.22}>
                    <ApplyLink href="https://prizes.kfas.org.kw" />
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
                        src="/image/KuwaitPrizeLogo.png"
                        alt="Kuwait Prize"
                        width={400}
                        height={400}
                        className="relative h-auto w-full max-w-[240px] object-contain sm:max-w-[280px] lg:max-w-[300px] drop-shadow-lg"
                        sizes="(max-width: 1024px) 280px, 300px"
                      />
                    </motion.div>
                  </div>
                </FadeUp>
              </div>
            </div>

            {/* Objectives */}
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeading>Objectives of the Prize</SectionHeading>
                <FadeUp delay={0.15}>
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-4">
                    The Kuwait Prize seeks to:
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
                <FadeUp delay={0.15}>
                  <p className="font-poppins text-base leading-[1.9] text-white/70 font-light mt-4">
                    The Kuwait Prize covers five main fields:
                  </p>
                </FadeUp>
              </div>
              <PrizeFieldRows />
            </div>
            <FadeUp delay={0.2}>
              <p className="font-poppins text-base leading-[1.9] text-white/75 font-light mt-14 lg:mt-16 max-w-2xl">
                The first four fields are awarded annually, while the fifth
                field, Emerging Sciences, is awarded biennially. Within these
                main fields, the specific scientific subfields are determined
                and announced by KFAS in accordance with the approved prize
                cycle.
              </p>
            </FadeUp>
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
              <FadeUp>
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
                <FadeUp delay={0.15}>
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-6">
                    Candidates for the Kuwait Prize must satisfy the approved
                    conditions and requirements of the Prize, including the
                    following:
                  </p>
                </FadeUp>
              </FadeUp>
            </div>
            <EligibilityRows />
          </div>
        </section>

        {/* ── Prize Components ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>Prize Components</SectionHeading>
            <div className="mt-8 space-y-6">
              <FadeUp delay={0.05}>
                <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                  For each awarded subfield, the Kuwait Prize consists of:
                </p>
              </FadeUp>
              <PrizeComponentRows />
              <FadeUp delay={0.1}>
                <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                  The prize may be awarded to one laureate or shared by multiple
                  laureates whose contributions merit recognition.
                </p>
              </FadeUp>
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
