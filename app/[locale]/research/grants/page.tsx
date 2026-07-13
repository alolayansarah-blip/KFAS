"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type GrantEntry = { id: string; title: string; description: string };

interface GrantType {
  id: string;
  title: string;
  description: string;
  applyHref: string;
  imageSrc?: string;
  imageAlt?: string;
}

const GRANT_META: Record<
  string,
  { applyHref: string; imageSrc: string; imageAlt: string }
> = {
  rig: {
    applyHref: "/research/grants/RIG",
    imageSrc: "/image/Research.webp",
    imageAlt:
      "Researchers collaborating in a laboratory with microscope and equipment",
  },
  applied: {
    applyHref: "/research/grants/Applied-Research-Grants",
    imageSrc: "/image/AppliedResearchGrants.webp",
    imageAlt:
      "Students and mentor working on robotics and applied research equipment",
  },
  fundamental: {
    applyHref: "/research/grants/Fundamental-Research-Grants",
    imageSrc: "/image/FRG.jpg",
    imageAlt:
      "Researchers and attendees at a scientific conference poster session",
  },
  young: {
    applyHref: "/research/grants/Young-Researcher-Grants",
    imageSrc: "/image/YoungResearcher.png",
    imageAlt:
      "Young researchers and scientists collaborating in a research setting",
  },
  policy: {
    applyHref: "/research/grants/Policy-Research-Grants",
    imageSrc: "/image/Policy.png",
    imageAlt:
      "Professionals collaborating in a policy research and workshop discussion",
  },
  "call-for-reviewers": {
    applyHref: "/research/grants/CallforReviewers",
    imageSrc: "/image/Researcher.jpeg",
    imageAlt: "Researcher reviewing scientific work",
  },
};

// ─── Apply Link ───────────────────────────────────────────────────────────────
function ApplyLink({ href = "#", label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const className = "group mt-6 inline-flex w-fit items-center gap-3";
  const content = (
    <>
      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
        {label}
      </span>
      <svg
        className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:-scale-x-100 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
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
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

// ─── Grant Card ───────────────────────────────────────────────────────────────
function GrantCard({
  title,
  description,
  applyHref,
  applyLabel,
  imageSrc,
  imageAlt,
  index,
}: {
  title: string;
  description: string;
  applyHref?: string;
  applyLabel: string;
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
        className="h-[2px] origin-left rtl:origin-right bg-[#EC601B]"
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
        <ApplyLink href={applyHref ?? "#"} label={applyLabel} />
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GrantsPage() {
  const t = useTranslations("GrantsIndexPage");
  const isArabic = useLocale() === "ar";

  const grants = t.raw("grants") as GrantEntry[];
  const grantTypes: GrantType[] = grants.map((g) => ({
    ...g,
    ...GRANT_META[g.id],
  }));

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#1D2D44]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/Grants2.png"
              alt="Grants"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Directional overlay — heavy on the leading side for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(252deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)"
                  : "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
              aria-hidden
            />
            {/* Bottom fade */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
              aria-hidden
            />
          </div>

          {/* Content — vertically centered, leading-aligned */}
          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
            <motion.div
              className={`mb-5 flex items-center gap-2 font-semibold text-white/45 ${
                isArabic
                  ? "text-base tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>{t("breadcrumb")}</span>
              <span className="text-white/25">/</span>
            </motion.div>

            {/* Title — clip-path wipe */}
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
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>

            {/* Orange rule */}
            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          {/* White bleed into body */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <h2 className="mt-5 font-poppins text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-[#1D2D44]">
                {t("overviewTitle")}
              </h2>
            </motion.div>
            <motion.p
              className="mt-7 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {t("overviewBody")}
            </motion.p>
          </div>
        </section>

        {/* ── Grant Cards ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
              {grantTypes.map((grant, index) => (
                <GrantCard
                  key={grant.id}
                  title={grant.title}
                  description={grant.description}
                  applyHref={grant.applyHref}
                  applyLabel={t("applyLinkText")}
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
