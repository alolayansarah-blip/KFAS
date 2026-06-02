"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Palette — navy #1D2D44 · orange #EC601B · sky #7DC0F1 · paper #FAFAF8 */

const inlineLink =
  "font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40";

/* ─── Shared motion variants ──────────────────────────────────────────────── */
// A container that reveals its children one after another on scroll-in.
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// A single child that fades + slides up. Pairs with `staggerContainer`.
const fadeItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const VIEWPORT = { once: true, margin: "-60px" } as const;

// ─── FadeUp — reveals a block once when it scrolls into view ─────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger — reveals its children in sequence when scrolled into view ──────────
function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

// ─── Chapter header — accent, title, rule, logo ─────────────────────────────────
function ChapterHeader({
  title,
  logoSrc,
  logoAlt,
}: {
  title: string;
  logoSrc: string;
  logoAlt: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="relative">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
        <div className="max-w-2xl">
          <motion.span
            className="block h-[3px] w-12 rounded-full bg-[#EC601B]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ transformOrigin: "left" }}
          />
          <motion.h2
            className="mt-6 font-poppins text-[1.7rem] font-semibold leading-[1.22] tracking-tight text-[#1D2D44] sm:text-[2.1rem] lg:text-[2.35rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            {title}
          </motion.h2>
        </div>

        {/* logo — transparent, enlarged; multiply blend drops any white background */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
        >
          <div className="relative h-[140px] w-[400px] sm:h-[180px] sm:w-[500px]">
            <Image
              src={logoSrc}
              alt={logoAlt}
              fill
              quality={95}
              sizes="(max-width: 640px) 400px, 500px"
              className="object-contain object-center mix-blend-multiply"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 h-px w-full origin-left bg-[#1D2D44]/10"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
      />
    </div>
  );
}

// ─── Mini heading inside a chapter ───────────────────────────────────────────────
function MiniHeading({ children }: { children: ReactNode }) {
  return (
    <motion.div className="mb-6" variants={fadeItem}>
      <h3 className="font-poppins text-[1.05rem] font-semibold tracking-tight text-[#1D2D44]">
        {children}
      </h3>
      <div className="mt-3 h-px w-9 bg-[#EC601B]/55" />
    </motion.div>
  );
}

// ─── Body paragraph — staggers in when used inside a <Stagger> ───────────────────
function Paragraph({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      variants={fadeItem}
      className={`font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/65 ${className}`}
    >
      {children}
    </motion.p>
  );
}

// ─── Bullet list (dash markers) ─────────────────────────────────────────────────
function BulletList({
  items,
  columns = false,
}: {
  items: string[];
  columns?: boolean;
}) {
  return (
    <motion.ul
      className={
        columns ? "grid gap-x-10 gap-y-[16px] sm:grid-cols-2" : "space-y-[16px]"
      }
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-30px" }}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          className="flex items-start gap-3.5"
          variants={fadeItem}
        >
          <span className="mt-[13px] h-px w-4 shrink-0 bg-[#EC601B]/70" />
          <span className="font-poppins text-[15px] leading-[1.8] font-light text-[#1D2D44]/65">
            {item}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ─── Apply / link ──────────────────────────────────────────────────────────────
function ApplyLink({
  href = "#",
  label = "Click here to apply",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-8 inline-flex items-center gap-3 w-fit"
    >
      <span className="h-[1.5px] w-7 bg-[#EC601B] transition-all duration-500 group-hover:w-12" />
      <span className="font-poppins text-[12.5px] font-semibold uppercase tracking-[0.13em] text-[#EC601B]">
        {label}
      </span>
      <svg
        className="h-3 w-3 -translate-x-1.5 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0"
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

// ─── ICTP opportunity row (dot marker, no numbers) ───────────────────────────────
function Opportunity({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className="group border-t border-[#1D2D44]/10 py-7"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="flex items-start gap-4">
        <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#EC601B] transition-transform duration-300 group-hover:scale-125" />
        <div className="flex-1">
          <h4 className="font-poppins text-[16px] font-semibold leading-snug text-[#1D2D44]">
            {title}
          </h4>
          <div className="mt-3 space-y-4 font-poppins text-[15px] leading-[1.85] font-light text-[#1D2D44]/65">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function InternationalCollaborativeResearchPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

      <main className="min-h-screen bg-white font-poppins selection:bg-[#EC601B] selection:text-white">
        {/* ─── Hero ─────────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex min-h-[440px] items-end justify-start overflow-hidden bg-[#1D2D44] h-[62vh]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            {/* subtle navy depth gradients (no photo) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(102deg, rgba(15,24,40,0.55) 0%, rgba(29,45,68,0.20) 50%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,24,40,0.45) 0%, transparent 46%)",
              }}
            />
          </motion.div>

          <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-gradient-to-r from-[#EC601B] via-[#EC601B]/40 to-transparent" />

          <motion.div
            className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-32 sm:px-8 lg:px-10"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-6 flex items-center gap-2.5 font-poppins text-[10px] font-semibold uppercase tracking-[0.34em] text-white/55"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span>Learning &amp; Development</span>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Researchers</span>
            </motion.div>

            <div className="overflow-hidden pb-1">
              <motion.h1
                className="font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl [text-shadow:_2px_2px_20px_rgba(0,0,0,0.45)]"
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              >
                International Collaborative Research
              </motion.h1>
            </div>

            <motion.div
              className="mt-7 h-[3px] origin-left rounded-full bg-[#EC601B]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 76 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ─── Harvard Kennedy School ───────────────────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10">
            <ChapterHeader
              title="The Kuwait Program at Harvard Kennedy School (HKS)"
              logoSrc="/image/Belfer.png"
              logoAlt="Harvard Kennedy School — Belfer Center for Science and International Affairs"
            />

            <Stagger className="mt-12">
              <Paragraph className="max-w-3xl">
                Launched during the 2000–2001 academic year, today the Kuwait
                Program supports: residential fellowships for junior,
                mid-career, and senior scholars from or based in the State of
                Kuwait; a Customized Executive Education Program for leaders
                across Kuwait&apos;s private, public, and nonprofit sectors.
              </Paragraph>
            </Stagger>

            <FadeUp delay={0.08} className="mt-14">
              <MiniHeading>About the Kuwait Program</MiniHeading>

              <Stagger className="max-w-3xl space-y-5">
                <Paragraph>
                  Launched in 2000 and generously supported by the Kuwait
                  Foundation for the Advancement of Sciences (KFAS), the Kuwait
                  Program at the John F. Kennedy School of Government at Harvard
                  University aims to identify evidence-based, rigorously
                  scientific solutions to public policy challenges facing the
                  State of Kuwait, the Gulf region, and the world; provide
                  professional development and advanced training to current and
                  future leaders and scholars in Kuwait and the broader region;
                  and facilitate exchanges of ideas, expertise, and know-how
                  between Harvard and educational and policy-oriented
                  institutions in the State of Kuwait and the region.
                </Paragraph>
                <Paragraph>
                  Today, the Kuwait Program comprises the following program
                  components:
                </Paragraph>
              </Stagger>

              <div className="mt-7 max-w-3xl">
                <BulletList
                  items={[
                    "Residential fellowships at the Harvard Kennedy School for junior, mid-career, and senior scholars who are from or based in the State of Kuwait.",
                    "Customized Executive Education Program for leaders across Kuwait's private, public, and nonprofit sectors.",
                    "Collaborative research between Kuwait-based scholars and Harvard faculty.",
                    "Research and internship opportunities, as well as on-campus events, for Harvard students to explore policy-relevant topics related to Kuwait.",
                  ]}
                />
              </div>

              <ApplyLink
                href="https://www.belfercenter.org/programs/middle-east-initiative/kuwait-program"
                label="For more information"
              />
            </FadeUp>
          </div>
        </section>

        {/* ─── ICTP ─────────────────────────────────────────────────────────── */}
        <section className="bg-[#BBDEFB25] py-20 sm:py-28">
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10">
            <ChapterHeader
              title="The Kuwait Program at The International Centre for Theoretical Physics (ICTP)"
              logoSrc="/image/ICTP.png"
              logoAlt="The Abdus Salam International Centre for Theoretical Physics (ICTP)"
            />

            <Stagger className="mt-12">
              <Paragraph className="max-w-3xl">
                The Kuwait Foundation for the Advancement of Sciences (KFAS) and
                ICTP have extended their longtime partnership for science
                advancement by creating a new joint programme of support for
                scientists from Kuwait and other Arab countries to be engaged in
                ICTP activities.
              </Paragraph>
            </Stagger>

            <FadeUp delay={0.08} className="mt-12">
              <p className="font-poppins text-[15px] font-semibold text-[#1D2D44]">
                The Kuwait Programme at ICTP offers the following opportunities:
              </p>

              <div className="mt-6 border-b border-[#1D2D44]/10">
                <Opportunity title="Supporting Scientists from Arab Countries to attend ICTP Scientific Calendar activities">
                  <p>
                    ICTP organizes numerous conferences, schools and workshops
                    every year through its Scientific Calendar of activities.
                    The Kuwait Programme at ICTP offers support to Arab
                    scientists who would like to attend an ICTP activity for a
                    period not exceeding one month of their stay for the
                    activity. Those who wish to apply for the fellowships should
                    indicate so when using ICTP&apos;s online application system
                    for Scientific Calendar activities. Choose an activity by
                    viewing{" "}
                    <a
                      href="https://www.ictp.it/home/scientific-calendar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      ICTP&apos;s Scientific Calendar
                    </a>
                    .
                  </p>
                </Opportunity>

                <Opportunity title="Diploma Students Programme">
                  <p>
                    ICTP&apos;s Postgraduate Diploma Programme is a 12-month
                    pre-doctoral education programme for talented young science
                    students from the Global South who have limited
                    possibilities to pursue advanced studies in their home
                    countries. The Kuwait Programme offers support for three
                    Arab students to attend this intensive educational course
                    selected on a competitive basis. Visit ICTP&apos;s{" "}
                    <a
                      href="https://www.ictp.it/opportunity/ictp-postgraduate-diploma-programme"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      Postgraduate Diploma Programme
                    </a>{" "}
                    website for more details. The application deadline for the
                    Programme is 28 February 2026. Applicants from Arab
                    countries who are accepted into the Diploma Programme are
                    considered for a KFAS grant.
                  </p>
                </Opportunity>

                <Opportunity title="Kuwaiti Post-doctoral Fellowship">
                  <p>
                    Awarded to young Kuwaiti scientists who have completed their
                    PhD and are working in Kuwait or abroad. The fellowship
                    allows the scientists to continue their research in the
                    areas of ICTP expertise, under the supervision of a resident
                    scientist at the Centre. The fellow(s) will be selected by
                    ICTP in consultation with KFAS. Selected fellows will be
                    awarded a research fellowship agreement for a period of one
                    year with the possibility to extend for an additional year.
                  </p>
                </Opportunity>

                <Opportunity title="Kuwait Visiting Scientists Scheme and Training and Research in Italian Laboratories (TRIL) Fellowships">
                  <p>
                    The visiting scientists scheme offers scientists and PhD
                    students from Kuwait the opportunity to visit and
                    collaborate with ICTP scientists for a period not exceeding
                    3 months per year. The purpose of the visits is to perform
                    studies in ICTP&apos;s areas of expertise in close
                    interaction with the Sections&apos; resident staff as well
                    as attending ongoing events (conferences, schools, seminars
                    and workshops). The visiting scientists will be selected by
                    ICTP in consultation with KFAS.
                  </p>
                  <p>
                    For longer stays, ICTP will make available its{" "}
                    <a
                      href="https://www.ictp.it/opportunity/training-and-research-italian-laboratories-tril"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      TRIL Programme
                    </a>
                    . The TRIL fellowship aims at allowing PhD students and
                    scientists from Kuwait to undertake training and research in
                    an Italian laboratory in different branches of the physical
                    sciences. The fellows will be selected by ICTP in
                    consultation with KFAS. The fellowship will be awarded once
                    a year for a period not exceeding 12 months.
                  </p>
                </Opportunity>
              </div>

              <ApplyLink
                href="https://www.ictp.it/opportunity/kuwait-programme-ictp"
                label="For more information about the Kuwait Programme at ICTP"
              />
            </FadeUp>

            {/* ── Eligibility / contact — white card, orange accents, sharp ── */}
            <FadeUp delay={0.1} className="mt-14">
              <div className="group relative max-w-3xl border border-[#1D2D44]/15 bg-white">
                {/* deadline header */}
                <div className="flex items-center gap-3.5 border-b border-dashed border-[#1D2D44]/15 px-7 py-5 sm:px-9">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#EC601B]/10 text-[#EC601B]">
                    <svg
                      className="h-[18px] w-[18px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <p className="font-poppins text-[14.5px] font-light leading-relaxed text-[#1D2D44]/80">
                    The deadline for applications to the Diploma Programme is{" "}
                    <span className="font-semibold text-[#EC601B]">
                      28 February 2026
                    </span>
                    .
                  </p>
                </div>

                {/* body */}
                <div className="px-7 py-7 sm:px-9 sm:py-8">
                  <p className="font-poppins text-[14.5px] leading-[1.9] font-light text-[#1D2D44]/70">
                    According to the agreement between KFAS and ICTP,
                    postdoctoral fellowships are awarded exclusively to young
                    Kuwaiti scientists. The only two programmes for which
                    non-Kuwaiti scientists are eligible to apply are:
                  </p>

                  <motion.ul
                    className="mt-5 space-y-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-30px" }}
                  >
                    {[
                      "Participation in ICTP Scientific Calendar activities",
                      "The Diploma Programme",
                    ].map((item) => (
                      <motion.li
                        key={item}
                        className="flex items-start gap-3 font-poppins text-[13.5px] font-medium text-[#1D2D44]"
                        variants={fadeItem}
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EC601B]" />
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-[#1D2D44]/10 pt-6">
                    <span className="font-poppins text-[13.5px] font-light text-[#1D2D44]/60">
                      For contact:
                    </span>
                    <a
                      href="mailto:ictp.kfas@ictp.it"
                      className="font-poppins text-[13.5px] font-semibold text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      ictp.kfas@ictp.it
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ─── LSE ──────────────────────────────────────────────────────────── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10">
            <ChapterHeader
              title="The Kuwait Program at the London School of Economics and Political Science (LSE)"
              logoSrc="/image/LSE.png"
              logoAlt="The London School of Economics and Political Science (LSE)"
            />

            <Stagger className="mt-12">
              <Paragraph className="max-w-3xl">
                The Kuwait Programme is a world-leading hub for research and
                expertise on Kuwait. The Programme is the main conduit through
                which research on Kuwait at the School is facilitated, expanded
                and promoted.
              </Paragraph>
              <Paragraph className="mt-5 max-w-3xl">
                The Programme is funded by the Kuwait Foundation for the
                Advancement of Sciences and directed by Professor Toby Dodge,
                who is also Kuwait Professor.
              </Paragraph>
            </Stagger>

            <FadeUp delay={0.08} className="mt-14">
              <MiniHeading>Aims of the Programme</MiniHeading>
              <div className="max-w-3xl">
                <BulletList
                  items={[
                    "To establish collaborative research partnerships between LSE and Kuwaiti universities that will deliver high quality research on the challenges facing the country, expand Kuwaiti expertise on these challenges, and produce long-term relationships of value;",
                    "To conduct time-sensitive, policy-relevant research which will inform evidence-based policymaking in Kuwait and the wider GCC;",
                    "To produce and publish high quality original academic research on contemporary Kuwait;",
                    "To organize exchanges between LSE faculty and Kuwaiti academics and policy practitioners to facilitate knowledge exchange, intellectual capacity and career development;",
                    "To provide for the development of leaders and academics in Kuwaiti research and higher education institutions through the production, management and dissemination of research as well as through longer-term research collaboration activities.",
                  ]}
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="mt-14">
              <MiniHeading>Research Themes</MiniHeading>
              <BulletList
                columns
                items={[
                  "Improving the delivery of healthcare in Kuwait.",
                  "Enhancing Kuwait's water and food security;",
                  "Diversifying energy sources in an oil-rich economy;",
                  "Driving forward Kuwait's digital transformation;",
                  "Developing public policy to reform the public sector and improve public service delivery in Kuwait;",
                  "Developing economic and legal perspectives on diversifying the oil-dependent economy of Kuwait;",
                  "Informing and improving environmental policy in Kuwait;",
                  "Improving the role of the sovereign wealth fund in driving forward Kuwaiti development;",
                  "Setting economic vision(s) to diversify the economy;",
                  "Improving and developing education policies in Kuwait.",
                ]}
              />
            </FadeUp>

            <FadeUp delay={0.1} className="mt-14">
              <p className="max-w-3xl font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/65">
                For more information about the Programme, please contact{" "}
                <a
                  href="https://www.lse.ac.uk/people/mercedes-masters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  Mercedes Masters
                </a>
                , Programme Coordinator, at{" "}
                <a href="mailto:m.c.masters@lse.ac.uk" className={inlineLink}>
                  m.c.masters@lse.ac.uk
                </a>
                .
              </p>

              <ApplyLink
                href="https://www.lse.ac.uk/middleeastcentre/research/kuwait-programme"
                label="For more information"
              />
            </FadeUp>
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
