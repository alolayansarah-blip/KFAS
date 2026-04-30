"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Constants ───────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const PORTAL_AIMS = [
  "Showcasing KFAS's supported projects.",
  "Encouraging collaborations between researchers.",
  "Promoting communication & dissemination.",
  "Promoting research Infrastructures & facilities etc.",
];

const PORTAL_SHOWCASES = [
  {
    title: "Data Showcased",
    body: "The KFAS Pure Portal includes publications, research outputs, people, projects and grants, research units, prizes, and research-related activities. Items can be interconnected, allowing research centers to tag publications based on their funded research.",
  },
  {
    title: "Sustainable Development Goals",
    body: "The Portal demonstrates KFAS' contribution to the UN Sustainable Development Goals (SDGs) on a Profile User Level, Research Unit or Institute Level, and on a Research Output Level.",
  },
  {
    title: "Potential Collaborators",
    body: "The Portal is an excellent starting point to look for an advisor, a co-author, or assembling a multidisciplinary team for a grant.",
  },
];

const PERFORMANCE_METRICS = [
  {
    title: "Research-Output Metrics",
    body: "such as Scopus Citations, PlumX Metrics, and the Altmetric Donut, which track citations, online engagement, and research visibility across various platforms.",
  },
  {
    title: "Author-Level Metrics",
    body: "such as the Scopus h-index, Elsevier Fingerprint, and a Global Map of Collaborations help assess researcher impact, identify key expertise, and visualize international research partnerships.",
  },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    label: "What is it",
    question: "What is the KFAS Research Portal?",
    answer: (
      <>
        It serves as the centralized system for managing publications, grants,
        projects, and researcher profiles.{" "}
        <strong className="font-semibold text-white">
          The KFAS Research Portal powered by Pure provides a single, searchable
          platform
        </strong>{" "}
        that aggregates and showcases all KFAS-funded research outputs and
        impact in one place.
      </>
    ),
    image: "/image/Portal1.png",
    imageAlt: "Researcher name",
    imageCaption: "Researcher name",
    // text left, image right
    reverse: false,
  },
  {
    label: "Who can access",
    question: "Who can access the KFAS Research Portal?",
    answer:
      "Everyone has access to the Portal; it showcases all the research achievements of KFAS to our audience in Kuwait and around the world.",
    image: "/image/Portal2.png",
    imageAlt: "Researcher name",
    imageCaption: "Researcher name",
    // image left, text right
    reverse: true,
  },
  {
    label: "Eligibility",
    question: "Who can create a profile in KFAS Research Portal?",
    answer:
      "Only researchers who have engaged in projects with KFAS, whether past or future, are eligible to create profiles on the KFAS Research Portal.",
    image: "/image/Portal 3.png",
    imageAlt: "Researcher name",
    imageCaption: "Researcher name",
    // text left, image right
    reverse: false,
  },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="mt-5 h-px bg-gradient-to-r from-[#EC601B]/40 via-[#BBDEFB40] to-transparent" />
  );
}

function Bullet({ faded = false }: { faded?: boolean }) {
  return (
    <span
      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${faded ? "bg-[#EC601B]/40" : "bg-[#EC601B]"}`}
    />
  );
}

// ─── FAQ Row ──────────────────────────────────────────────────────────────────

function FaqRow({
  item,
  index,
}: {
  item: (typeof FAQ_ITEMS)[number];
  index: number;
}) {
  const { label, question, answer, image, imageAlt, imageCaption, reverse } =
    item;

  const textCell = (
    <motion.div
      className="flex flex-col justify-center px-10 py-14 lg:px-16 lg:py-20 relative overflow-hidden"
      initial={{ opacity: 0, x: reverse ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
    >
      {/* subtle radial highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.07) 0%, transparent 65%)",
        }}
      />

      {/* label */}
      <motion.span
        className="mb-5 flex items-center gap-3 font-poppins text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
      >
        <span className="h-px w-7 shrink-0 bg-white/35" />
        {label}
      </motion.span>

      {/* question */}
      <motion.h2
        className="font-poppins text-[1.3rem] font-bold leading-[1.3] tracking-tight text-white sm:text-[1.6rem]"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
      >
        {question}
      </motion.h2>

      {/* animated accent bar */}
      <motion.div
        className="mt-5 mb-5 h-[2.5px] w-10 origin-left rounded-full bg-white/55"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      />

      {/* answer */}
      <motion.p
        className="font-poppins text-[14.5px] font-light leading-[1.9] text-white/80"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
      >
        {answer}
      </motion.p>
    </motion.div>
  );

  const imageCell = (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="50vw"
        className="object-cover object-center transition-transform duration-[1200ms] ease-out hover:scale-105"
      />
      {/* bottom caption overlay */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(236,96,27,0.7) 0%, transparent 100%)",
        }}
      />
      <span className="absolute bottom-3 left-5 font-poppins text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
        {imageCaption}
      </span>
    </motion.div>
  );

  return (
    <>
      {/* thin divider between rows (skip first) */}
      {index > 0 && (
        <div className="mx-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      )}

      <div
        className="grid min-h-[340px] sm:min-h-[380px]"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {reverse ? (
          <>
            {imageCell}
            {textCell}
          </>
        ) : (
          <>
            {textCell}
            {imageCell}
          </>
        )}
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KFASResearchPortalPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />

      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative flex h-[60vh] min-h-[420px] items-end justify-start overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/Portal.png"
              alt="KFAS Research Portal"
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </motion.div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-14 pt-28 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>Research</span>
              <span className="text-white/25">/</span>
              <span>KFAS Research Portal</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                KFAS Research Portal
              </motion.h1>
            </div>

            <motion.div
              className="mt-5 h-[3px] w-[72px] origin-left rounded-full bg-[#EC601B]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ── */}
        <section className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.div className="max-w-[880px]" {...fadeUp(0)}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 shrink-0 bg-[#EC601B]" />
                <span className="font-poppins text-[10px] font-semibold uppercase tracking-[0.35em] text-[#EC601B]">
                  Overview
                </span>
              </div>

              <h2 className="font-poppins text-[1.55rem] font-semibold leading-[1.3] tracking-tight text-[#1D2D44] sm:text-[1.8rem]">
                The Gateway to Impactful Research in Kuwait
              </h2>
              <Divider />

              <p className="mt-7 font-poppins text-[14.5px] font-light leading-[1.9] text-[#1D2D44]/65">
                The KFAS Research Portal serves as an open window, that
                showcases all the research and impactful achievements of KFAS.
                This innovative research information management system offers
                new insights into the scholarly expertise and collaborative
                opportunities between KFAS and researchers engaged in joint
                projects with various entities. This portal is designed to help
                researchers and potential collaborators identify working on
                specific research or scholarly areas in collaboration with KFAS.
              </p>

              <a
                href="https://pure.kfas.org.kw/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-3"
              >
                <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
                <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                  KFAS Research Portal Link
                </span>
                <svg
                  className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0"
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
            </motion.div>
          </div>
        </section>

        {/* ── Paving the Way ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-12 bg-[#BBDEFB40]">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fadeUp(0)}>
              <h2 className="font-poppins text-2xl font-semibold leading-tight tracking-tight text-[#1D2D44] sm:text-3xl">
                KFAS: Paving the Way
              </h2>
              <Divider />
            </motion.div>

            <motion.p
              className="mt-7 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65"
              {...fadeUp(0.05)}
            >
              KFAS supports Kuwait&apos;s Research Community, both individually
              and institutionally. The KFAS Research Portal aims to:
            </motion.p>

            <ul className="mt-5 space-y-3">
              {PORTAL_AIMS.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <Bullet />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ (redesigned) ── */}
        <section className="overflow-hidden bg-[#EC601B]">
          {FAQ_ITEMS.map((item, i) => (
            <FaqRow key={item.label} item={item} index={i} />
          ))}
        </section>

        {/* ── Portal Showcases ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-12 bg-[#BBDEFB40]">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fadeUp(0)}>
              <h2 className="font-poppins text-2xl font-semibold leading-tight tracking-tight text-[#1D2D44] sm:text-3xl">
                KFAS Research Portal:
              </h2>
              <Divider />
            </motion.div>

            <motion.p
              className="mt-7 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65"
              {...fadeUp(0.05)}
            >
              The portal showcases the following:
            </motion.p>

            <ul className="mt-5 space-y-5">
              {PORTAL_SHOWCASES.map(({ title, body }, i) => (
                <motion.li
                  key={title}
                  className="flex items-start gap-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <Bullet />
                  <span>
                    <span className="font-semibold text-[#1D2D44]">
                      {title}:{" "}
                    </span>
                    {body}
                  </span>
                </motion.li>
              ))}

              {/* Research Performance Metrics (nested) */}
              <motion.li
                className="flex items-start gap-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.21 }}
              >
                <Bullet />
                <span className="flex w-full flex-col gap-1">
                  <span>
                    <span className="font-semibold text-[#1D2D44]">
                      Research Performance Metrics:{" "}
                    </span>
                    The portal also provides:
                  </span>
                  <ul className="mt-3 space-y-3">
                    {PERFORMANCE_METRICS.map(({ title, body }) => (
                      <li key={title} className="flex items-start gap-3">
                        <Bullet faded />
                        <span>
                          <span className="font-semibold text-[#1D2D44]">
                            {title}:{" "}
                          </span>
                          {body}
                        </span>
                      </li>
                    ))}
                  </ul>
                </span>
              </motion.li>
            </ul>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-12 border-t border-[#1D2D44]/08">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fadeUp(0)}>
              <h2 className="font-poppins text-2xl font-semibold leading-tight tracking-tight text-[#1D2D44] sm:text-3xl">
                Contact Us:
              </h2>
              <Divider />
            </motion.div>

            <div className="mt-8 space-y-3 font-poppins text-[15px] font-light text-[#1D2D44]/65">
              <motion.p {...fadeUp(0.05)}>
                If you have any inquiries, please email us at:{" "}
                <a
                  href="mailto:pure@kfas.org.kw"
                  className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
                >
                  pure@kfas.org.kw
                </a>
              </motion.p>

              <motion.p {...fadeUp(0.1)}>
                Telephone:{" "}
                <a
                  href="tel:+96522278125"
                  className="font-medium text-[#1D2D44] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:text-[#EC601B]"
                >
                  (+965) 22278125
                </a>{" "}
                or{" "}
                <a
                  href="tel:+96522278126"
                  className="font-medium text-[#1D2D44] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:text-[#EC601B]"
                >
                  22278126
                </a>
              </motion.p>

              <motion.p
                className="pt-6 text-[15px] font-light leading-[1.85] sm:text-[16px]"
                {...fadeUp(0.15)}
              >
                Stay engaged, stay connected and let the
                <br />
                <span className="font-semibold text-[#1D2D44]">
                  KFAS Research Portal
                </span>{" "}
                be your gateway to impactful research
              </motion.p>
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
