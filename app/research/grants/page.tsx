"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface GrantType {
  id: string;
  title: string;
  description: string;
  applyHref: string;
  imageSrc?: string;
  imageAlt?: string;
}

const GRANT_TYPES: GrantType[] = [
  {
    id: "rig",
    title: "Research Infrastructure Grants",
    description:
      "The Kuwait Foundation for the Advancement of Sciences (KFAS) provides grants for research infrastructure proposals. The Research Infrastructure Grant (RIG) will support and invest in public research centers and laboratories in Kuwait.",
    applyHref: "/research/grants/RIG",
    imageSrc: "/image/RIG1.jpg",
    imageAlt:
      "Researchers collaborating in a laboratory with microscope and equipment",
  },
  {
    id: "applied",
    title: "Applied Research Grants",
    description:
      "Supporting research projects that translate scientific findings into practical solutions for industry and society.",
    applyHref: "/research/grants/Applied-Research-Grants",
    imageSrc: "/image/AppliedResearchGrants.webp",
    imageAlt:
      "Students and mentor working on robotics and applied research equipment",
  },
  {
    id: "fundamental",
    title: "Fundamental Research Grants",
    description:
      "Backing curiosity-driven research that advances foundational knowledge without immediate commercial application.",
    applyHref: "/research/grants/Fundamental-Research-Grants",
    imageSrc: "/image/FRG.jpg",
    imageAlt:
      "Researchers and attendees at a scientific conference poster session",
  },
  {
    id: "young",
    title: "Young Researcher Grants",
    description:
      "Empowering early-career scientists and researchers with funding to launch independent research careers.",
    applyHref: "/research/grants/Young-Researcher-Grants",
    imageSrc: "/image/YoungResearcher.png",
    imageAlt:
      "Young researchers and scientists collaborating in a research setting",
  },
  {
    id: "policy",
    title: "Policy Research Grants",
    description:
      "Enabling evidence-based research that informs public policy, governance, and national development strategies.",
    applyHref: "/research/grants/Policy-Research-Grants",
    imageSrc: "/image/Policy.png",
    imageAlt:
      "Professionals collaborating in a policy research and workshop discussion",
  },
];

// ─── Apply Link ───────────────────────────────────────────────────────────────
function ApplyLink({ href = "#" }: { href: string }) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group mt-6 inline-flex w-fit items-center gap-3"
    >
      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
        Click here
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

// ─── Grant Card ───────────────────────────────────────────────────────────────
function GrantCard({
  title,
  description,
  applyHref,
  imageSrc,
  imageAlt,
  index,
}: {
  title: string;
  description: string;
  applyHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      className="group relative flex h-full flex-col overflow-hidden border border-[#1D2D44]/08 bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
    >
      <motion.div
        className="h-[2px] origin-left bg-[#EC601B]"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 + 0.25, ease: EASE }}
      />

      {imageSrc && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-[#1D2D44]/0 transition-all duration-500 group-hover:bg-[#1D2D44]/10"
            aria-hidden
          />
        </div>
      )}

      <div className="flex min-h-[5rem] items-start bg-[#EC601B] px-7 py-5">
        <h3 className="font-poppins text-lg font-semibold leading-snug text-white">
          {title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col px-7 py-7">
        <p className="flex-1 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/60">
          {description}
        </p>
        <ApplyLink href={applyHref ?? "#"} />
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GrantsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
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
        <div
          ref={heroRef}
          className="relative flex h-[60vh] min-h-[420px] items-end justify-start overflow-hidden bg-[#1D2D44]"
        >
          <motion.div
            className="absolute inset-0 scale-110"
            style={{ y: heroY }}
          >
            <Image
              src="/image/Grants2.png"
              alt="Grants"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
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
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                Grants
              </motion.h1>
            </div>
            <motion.div
              className="mt-5 h-[3px] w-[72px] rounded-full origin-left bg-[#EC601B]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-0 bg-white" />
        </div>

        {/* ── Overview band ── */}
        <section className="bg-[#7DC0F1] px-6 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:px-12">
          <div className="mx-auto max-w-[1280px] text-center">
            <motion.h2
              className="mb-6 font-poppins text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              KFAS Grant Programs Overview
            </motion.h2>
            <motion.div
              className="mb-6 h-px w-10 bg-white/40 mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            />
            <motion.p
              className="mx-auto max-w-4xl text-justify font-poppins text-[15px] font-light leading-[1.9] text-white/85"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
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

        {/* ── Grant Cards ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
              {GRANT_TYPES.map((grant, index) => (
                <GrantCard
                  key={grant.id}
                  title={grant.title}
                  description={grant.description}
                  applyHref={grant.applyHref}
                  imageSrc={grant.imageSrc}
                  imageAlt={grant.imageAlt}
                  index={index}
                />
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
