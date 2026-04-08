"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Constants ────────────────────────────────────────────────────────────────
const GRADIENT_OVERLAY =
  "linear-gradient(to bottom, rgba(29,45,68,0.3) 0%, rgba(29,45,68,0.4) 50%, rgba(29,45,68,0.55) 100%)";

/** Soft #7DC0F1 wash over card imagery (matches overview strip) */
const CARD_IMAGE_TINT =
  "linear-gradient(to bottom, rgba(125,192,241,0.12) 0%, rgba(125,192,241,0.38) 50%, rgba(125,192,241,0.62) 100%)";

const HERO_TITLE_TRANSITION = {
  duration: 0.7,
  delay: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

const ACCENT_LINE_TRANSITION = {
  duration: 0.8,
  delay: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

const GRANT_TYPES: readonly {
  title: string;
  description: string;
  applyHref: string;
  imageSrc?: string;
  imageAlt?: string;
}[] = [
  {
    title: "Research Infrastructure Grants",
    description:
      "The Kuwait Foundation for the Advancement of Sciences (KFAS) provides grants for research infrastructure proposals. The Research Infrastructure Grant (RIG) will support and invest in public research centers and laboratories in Kuwait.",
    applyHref: "/research/grants/RIG",
    imageSrc: "/image/RIG1.jpg",
    imageAlt:
      "Researchers collaborating in a laboratory with microscope and equipment",
  },
  {
    title: "Applied Research Grants",
    description:
      "Supporting research projects that translate scientific findings into practical solutions for industry and society.",
    applyHref: "/research/grants/Applied-Research-Grants",
    imageSrc: "/image/applied1.png",
    imageAlt:
      "Students and mentor working on robotics and applied research equipment",
  },
  {
    title: "Fundamental Research Grants",
    description:
      "Backing curiosity-driven research that advances foundational knowledge without immediate commercial application.",
    applyHref: "https://www.kfas.com/",
  },
  {
    title: "Young Researcher Grants",
    description:
      "Empowering early-career scientists and researchers with funding to launch independent research careers.",
    applyHref: "https://www.kfas.com/",
  },
  {
    title: "Policy Research Grants",
    description:
      "Enabling evidence-based research that informs public policy, governance, and national development strategies.",
    applyHref: "https://www.kfas.com/",
  },
];

// ─── Apply Link ───────────────────────────────────────────────────────────────
function ApplyLink({ href = "#" }: { href?: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 w-fit inline-flex items-center gap-3 border border-[#1D2D44]/10 border-b-2 border-b-[#EC601B] px-6 py-3 text-sm font-medium text-[#1D2D44] font-poppins group/btn"
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
    >
      <span className="group-hover/btn:text-[#EC601B] transition-colors duration-200">
        Click here
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

// ─── Grant Card ───────────────────────────────────────────────────────────────
function GrantCard({
  title,
  description,
  applyHref,
  imageSrc,
  imageAlt,
  index = 0,
}: {
  title: string;
  description: string;
  applyHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  index?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      className="group relative flex h-full cursor-default flex-col overflow-hidden rounded-2xl border border-[#1D2D44]/08 bg-white"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 28px 64px -16px rgba(29,45,68,0.14)",
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Top orange accent bar */}
      <motion.div
        className="h-[3px] bg-[#EC601B] origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.12 + 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {imageSrc ? (
        <div className="relative h-44 w-full shrink-0 overflow-hidden bg-[#1D2D44]/08">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: CARD_IMAGE_TINT }}
            aria-hidden
          />
        </div>
      ) : null}

      {/* Title band */}
      <div className="flex min-h-[5rem] items-center bg-[#EC601B] px-8 py-5">
        <h3 className="font-poppins text-lg font-semibold leading-snug text-white">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-8 py-7">
        <p className="font-poppins text-sm leading-[1.9] text-[#1D2D44]/65 font-light flex-1">
          {description}
        </p>
        <ApplyLink href={applyHref} />
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GrantsPage() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground />
      <main className="min-h-screen bg-white pt-20 font-poppins">
        {/* ══ HERO ══ */}
        <section
          ref={heroRef}
          className="relative flex h-[55vh] items-end justify-start overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/Grants2.png"
              alt="Grants"
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ background: GRADIENT_OVERLAY }}
            />
          </motion.div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-4 inline-flex items-center gap-2 text-xs tracking-[0.3em] text-white/70 sm:text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-white/60">Research</span>
              <span className="text-white/40">/</span>
              {/* <span className="text-white/60">Grants</span> */}
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={HERO_TITLE_TRANSITION}
              >
                Grants
              </motion.h1>
            </div>

            <motion.div
              className="mt-6 h-[2px] origin-left bg-[#EC601B]"
              style={{ width: 80 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={ACCENT_LINE_TRANSITION}
            />
          </motion.div>
        </section>

        {/* ══ OVERVIEW (flush under hero — no gap) ══ */}
        <section className="bg-[#7DC0F1] px-6 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12">
          <div className="mx-auto max-w-[1280px] text-center">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <h2 className="font-poppins text-[1.6rem] font-normal leading-[1.5] tracking-tight text-white [text-shadow:0_1px_3px_rgba(29,45,68,0.35)] sm:text-[1.85rem]">
                KFAS Grant Programs Overview
              </h2>
            </motion.div>
            <motion.p
              className="mx-auto max-w-3xl font-poppins text-sm font-light leading-[1.85] text-white [text-shadow:0_1px_2px_rgba(29,45,68,0.28)] sm:text-[15px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
            >
              The Kuwait Foundation for the Advancement of Sciences (KFAS)
              offers a diverse portfolio of grant programs designed to support
              research, innovation, and capacity building in Kuwait. These
              programs are strategically structured to cover a wide spectrum of
              research activities, including fundamental, applied,
              policy-oriented, and infrastructure-focused initiatives, as well
              as supporting early-career researchers. Through these grants, KFAS
              aims to address national priorities, strengthen collaboration
              across sectors, and ensure that research outcomes contribute to
              scientific advancement, economic development, and evidence-based
              policymaking. The following sections outline the key grant types
              offered by KFAS:
            </motion.p>
          </div>
        </section>

        {/* ══ GRANT CARDS ══ */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
              {GRANT_TYPES.map((grant, index) => (
                <GrantCard key={grant.title} {...grant} index={index} />
              ))}
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
