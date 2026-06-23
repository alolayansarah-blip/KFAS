"use client";

import { useRef } from "react";
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
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-12">
      <motion.p
        className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#EC601B]"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      />
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

// ─── Section Heading Dark (for navy bg) ──────────────────────────────────────
function SectionHeadingDark({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="mb-12">
      <motion.h2
        className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <motion.div
        className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/70 via-[#7DC0F1]/30 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
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

// ─── Program Card ─────────────────────────────────────────────────────────────
function ProgramCard({
  title,
  body,
  imageSrc,
  applyHref,
  index = 0,
  titleAsH2 = false,
}: {
  title: string;
  body: string;
  imageSrc?: string;
  applyHref?: string;
  index?: number;
  titleAsH2?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const TitleTag = titleAsH2 ? "h2" : "h3";

  return (
    <motion.article
      ref={ref}
      className="group relative flex h-full flex-col overflow-hidden bg-white border border-[#1D2D44]/08"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
    >
      {/* Orange top bar */}
      <motion.div
        className="h-[2px] bg-[#EC601B] origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 + 0.25, ease: EASE }}
      />

      {imageSrc && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[#1D2D44]/0 transition-all duration-500 group-hover:bg-[#1D2D44]/10" />
        </div>
      )}

      {/* Title band */}
      <div className="bg-[#EC601B] px-7 py-5 min-h-[5rem] flex items-center">
        <TitleTag className="font-poppins text-lg font-semibold text-white leading-snug">
          {title}
        </TitleTag>
      </div>

      <div className="flex flex-col flex-1 px-7 py-7">
        <p className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/60 font-light flex-1">
          {body}
        </p>
        <ApplyLink href={applyHref} />
      </div>
    </motion.article>
  );
}

// ─── Sub-Program Card ─────────────────────────────────────────────────────────
function SubProgramCard({
  title,
  body,
  imageSrc,
  applyHref,
  index = 0,
}: {
  title: string;
  body: string;
  imageSrc?: string;
  applyHref?: string;
  index?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      className="group relative flex h-full flex-col overflow-hidden bg-white border border-[#1D2D44]/08"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
    >
      <motion.div
        className="h-[2px] bg-[#EC601B] origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: EASE }}
      />

      {imageSrc && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className="bg-[#EC601B] px-6 py-4 min-h-[4.5rem] flex items-center">
        <h4 className="font-poppins text-base font-semibold text-white leading-snug">
          {title}
        </h4>
      </div>

      <div className="flex flex-col flex-1 px-6 py-6">
        <p className="font-poppins text-[14px] leading-[1.85] text-[#1D2D44]/60 font-light flex-1">
          {body}
        </p>
        <ApplyLink href={applyHref} />
      </div>
    </motion.article>
  );
}

// ─── Customized Programs ──────────────────────────────────────────────────────
const SUB_PROGRAMS = [
  {
    title: "KFAS Innovation Challenge",
    imageSrc: "/image/Innovation.webp",
    body: "One of our standout executive education programs is the annual KFAS Innovation Challenge, in which a small group of selected companies work with prestigious business schools to develop new initiatives and projects that advance a culture of innovation. After a competitive application process, executives and business leaders spend three to four months in structured learning and training, tackling a company-specific challenge.",
    applyHref: "https://learn.kfas.org.kw/",
  },
  {
    title: "Harvard Kennedy School Program",
    imageSrc: "/image/Harvard.jpg",
    body: "A custom executive education program targeting the needs of the Kuwait private sector. Led by Professor Kessely Hong, the Harvard Kennedy School faculty team designed an impactful curriculum tailored to address the challenges and opportunities presented to managers — equipping them with collaborative and innovative tools for today's reality.",
    applyHref: "https://learn.kfas.org.kw/",
  },
  {
    title: "KFAS High Potential Leadership Program",
    imageSrc: "/image/HighPotenial.webp",
    body: "The vitality of every organization is dependent on the strength of its future leaders. By identifying high potential (Hi-Po) leadership candidates early and supporting their development, organizations drive significant returns on their human capital investments — maximizing strategic initiative, market competitiveness, and overall growth.",
    applyHref: "https://learn.kfas.org.kw/",
  },
];

function CustomizedPrograms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden bg-white border border-[#1D2D44]/08"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <motion.div
        className="h-[2px] bg-[#EC601B] origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      />

      <div className="p-8 sm:p-10 lg:p-12">
        <FadeUp delay={0.1}>
          <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-[#1D2D44] leading-snug mb-4">
            Customized Programs
          </h3>
          <div className="mb-6 h-px w-10 bg-gradient-to-r from-[#EC601B]/50 to-transparent" />
          <p className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/60 font-light max-w-2xl mb-6">
            KFAS partners with academic institutions to create customized
            programs specifically for participants from Kuwait, offering blended
            and experiential learning experiences taught over a period of
            months.
          </p>
          <ApplyLink href="https://learn.kfas.org.kw/" />
        </FadeUp>

        <div className="mt-12 border-t border-[#1D2D44]/06 pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {SUB_PROGRAMS.map((p, i) => (
            <SubProgramCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProfessionalsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-white"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/Grants.jpg"
              alt=""
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-center scale-105"
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
          </div>

          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>Learning & Development</span>
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
                Professionals
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

        {/* ── Professional Development Learning ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>Professional Development Learning</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <ProgramCard
                title="Open Enrollment Courses"
                body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in courses by subject matter expert practitioners. This activity would focus on developing specific skills needed for organizational development. Short-courses (up to 5 days) are offered to all employee levels in open enrollment style. Courses are delivered with latest and highest standard of learning delivery. Seats are open to all Kuwaiti citizens, targeting the entire workforce population."
                imageSrc="/image/OE.jpg"
                applyHref="https://learn.kfas.org.kw/"
                index={0}
                titleAsH2
              />
              <ProgramCard
                title="Professional Certificate Incentive Scheme"
                body="KFAS offer grants to enhance the capabilities of the Kuwaiti human capital and sharpen their professional skills by a scheme to encourage individuals to obtain their professional credentials. An attractive monetary reward is given upon successfully obtaining the professional certificate. The amount of the reward will be determined based on KFAS policies and procedures for rewards."
                imageSrc="/image/Professional.webp"
                applyHref="https://kfas.formstack.com/forms/kfas_support_for_professional_certifications_2026"
                index={1}
              />
            </div>
          </div>
        </section>

        {/* ── Executive Education ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>Executive Education</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-10">
              <ProgramCard
                title="Local Courses"
                body="KFAS bring executive education short-courses offered by international academic institutions on selected topics (in line with KFAS strategic direction) to Kuwait to offer seats locally and would be available to all Kuwaiti citizens."
                imageSrc="/image/LocalCourses.webp"
                applyHref="https://learn.kfas.org.kw/"
                index={0}
              />
              <ProgramCard
                title="Abroad Courses"
                body="KFAS offer seats on selected topics (in line with KFAS strategic direction) in programs already offered by academic institutions. This would allow participants to interact and exchange knowledge with other participants from around the world."
                imageSrc="/image/Abroad.webp"
                applyHref="https://learn.kfas.org.kw/"
                index={1}
              />
            </div>
            <CustomizedPrograms />
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
