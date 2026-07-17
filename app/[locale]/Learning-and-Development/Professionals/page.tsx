"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
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
        className="mt-5 h-px origin-left rtl:origin-right bg-gradient-to-r rtl:bg-gradient-to-l from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      />
    </div>
  );
}

function ApplyLink({ href = "#", label }: { href?: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 inline-flex items-center gap-3 w-fit"
    >
      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
        {label}
      </span>
      <svg
        className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:rotate-180 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
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
  applyLabel,
  index = 0,
  titleAsH2 = false,
}: {
  title: string;
  body: string;
  imageSrc?: string;
  applyHref?: string;
  applyLabel: string;
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
        className="h-[2px] bg-[#EC601B] origin-left rtl:origin-right"
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
        <ApplyLink href={applyHref} label={applyLabel} />
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
  applyLabel,
  index = 0,
}: {
  title: string;
  body: string;
  imageSrc?: string;
  applyHref?: string;
  applyLabel: string;
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
        className="h-[2px] bg-[#EC601B] origin-left rtl:origin-right"
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
        <ApplyLink href={applyHref} label={applyLabel} />
      </div>
    </motion.article>
  );
}

// ─── Customized Programs ──────────────────────────────────────────────────────
function CustomizedPrograms({
  title,
  body,
  applyLabel,
  subPrograms,
}: {
  title: string;
  body: string;
  applyLabel: string;
  subPrograms: {
    title: string;
    imageSrc: string;
    body: string;
    applyHref: string;
  }[];
}) {
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
        className="h-[2px] bg-[#EC601B] origin-left rtl:origin-right"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      />

      <div className="p-8 sm:p-10 lg:p-12">
        <FadeUp delay={0.1}>
          <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-[#1D2D44] leading-snug mb-4">
            {title}
          </h3>
          <div className="mb-6 h-px w-10 bg-gradient-to-r rtl:bg-gradient-to-l from-[#EC601B]/50 to-transparent" />
          <p className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/60 font-light max-w-2xl mb-6">
            {body}
          </p>
          <ApplyLink href="https://learn.kfas.org.kw/" label={applyLabel} />
        </FadeUp>

        <div className="mt-12 border-t border-[#1D2D44]/06 pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {subPrograms.map((p, i) => (
            <SubProgramCard
              key={p.title}
              {...p}
              applyLabel={applyLabel}
              index={i}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProfessionalsPage() {
  const t = useTranslations("ProfessionalsPage");
  const isArabic = useLocale() === "ar";

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const overviewParagraphs = t.raw("overviewParagraphs") as string[];
  const applyLabel = t("applyLinkLabel");

  const subPrograms = [
    {
      title: t("innovationChallengeTitle"),
      imageSrc: "/image/Innovation.webp",
      body: t("innovationChallengeBody"),
      applyHref: "https://learn.kfas.org.kw/",
    },
    {
      title: t("harvardTitle"),
      imageSrc: "/image/Harvard.jpg",
      body: t("harvardBody"),
      applyHref: "https://learn.kfas.org.kw/",
    },
    {
      title: t("highPotentialTitle"),
      imageSrc: "/image/HighPotenial.webp",
      body: t("highPotentialBody"),
      applyHref: "https://learn.kfas.org.kw/",
    },
  ];

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
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(125,192,241,0.28) 0%, rgba(125,192,241,0.12) 28%, transparent 55%)",
              }}
              aria-hidden
            />
          </div>

          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className={`mb-5 flex items-center gap-2 font-semibold text-white/45 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>{t("breadcrumbLearning")}</span>
              <span className="text-white/25">/</span>
            </motion.div>
            <div
              className={`overflow-hidden ${
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-0.5"
              }`}
            >
              <motion.h1
                className={`font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-tight tracking-tight"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>
            {/* Orange divider under title — desktop / tablet */}
            <motion.div
              className="mt-5 hidden h-[3px] w-[72px] rounded-full bg-[#EC601B] origin-left rtl:origin-right md:block"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>

          {/* Orange divider on navy / white border — mobile only */}
          <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-30 md:hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <motion.div
                className="h-[3px] w-[72px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ── */}
        <section
          id="overview"
          className="relative scroll-mt-28 overflow-hidden bg-white py-20 sm:py-28"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full opacity-[0.12] rtl:right-auto rtl:-left-40"
            style={{
              background:
                "radial-gradient(circle, #7DC0F1 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-poppins font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[12px] uppercase tracking-[0.3em]"
                }`}
              >
                {t("overviewLabel")}
              </p>
              <div className="mt-5 flex flex-col gap-6">
                {overviewParagraphs.map((paragraph, i) =>
                  i === 0 ? (
                    <p
                      key={i}
                      className="text-justify font-poppins text-[15px] sm:text-[16px] leading-[1.9] font-light text-[#1D2D44]/70"
                    >
                      {paragraph}
                    </p>
                  ) : (
                    <motion.p
                      key={i}
                      className="text-justify font-poppins text-[15px] sm:text-[16px] leading-[1.9] font-light text-[#1D2D44]/70"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                    >
                      {paragraph}
                    </motion.p>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Professional Development Learning ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>
              {t("sectionProfessionalDevelopment")}
            </SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <ProgramCard
                title={t("card1Title")}
                body={t("card1Body")}
                imageSrc="/image/OE.jpg"
                applyHref="https://learn.kfas.org.kw/"
                applyLabel={applyLabel}
                index={0}
                titleAsH2
              />
              <ProgramCard
                title={t("card2Title")}
                body={t("card2Body")}
                imageSrc="/image/Professional.webp"
                applyHref="https://kfas.formstack.com/forms/kfas_support_for_professional_certifications_2026"
                applyLabel={applyLabel}
                index={1}
              />
            </div>
          </div>
        </section>

        {/* ── Executive Education ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>{t("sectionExecutiveEducation")}</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-10">
              <ProgramCard
                title={t("localCoursesTitle")}
                body={t("localCoursesBody")}
                imageSrc="/image/LocalCourses.webp"
                applyHref="https://learn.kfas.org.kw/"
                applyLabel={applyLabel}
                index={0}
              />
              <ProgramCard
                title={t("abroadCoursesTitle")}
                body={t("abroadCoursesBody")}
                imageSrc="/image/Abroad.jpg"
                applyHref="https://learn.kfas.org.kw/"
                applyLabel={applyLabel}
                index={1}
              />
            </div>
            <CustomizedPrograms
              title={t("customizedTitle")}
              body={t("customizedBody")}
              applyLabel={applyLabel}
              subPrograms={subPrograms}
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
