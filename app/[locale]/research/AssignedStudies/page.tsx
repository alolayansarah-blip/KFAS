"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocale, useTranslations } from "next-intl";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const WHITE_PAPER_IMAGES = [
  "/image/WhitePaper1.jpg",
  "/image/WhitePaper2.jpg",
] as const;

// ─── Shared UI ────────────────────────────────────────────────────────────────

// Editorial section head: orange kicker, then title — sticky in the left rail
function SectionHead({ title }: { title: string }) {
  return (
    <div className="lg:sticky lg:top-28">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
        <h2 className="mt-5 font-poppins text-[1.55rem] font-semibold leading-[1.18] tracking-tight text-[#1D2D44] sm:text-[1.9rem]">
          {title}
        </h2>
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AssignedStudiesPage() {
  const t = useTranslations("AssignedStudiesPage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const bodyTextSize = isArabic ? "text-[17px]" : "text-[15px]";

  const whitePapers = (
    t.raw("whitePapers") as { title: string; alt: string }[]
  ).map((paper, i) => ({
    id: String(i + 1).padStart(2, "0"),
    title: paper.title,
    alt: paper.alt,
    image: WHITE_PAPER_IMAGES[i] ?? WHITE_PAPER_IMAGES[0],
  }));

  const steps = (t.raw("steps") as { title: string; body: string }[]).map(
    (step, i) => ({
      id: String(i + 1).padStart(2, "0"),
      title: step.title,
      body: step.body,
    }),
  );

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
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/AssignedBanner.webp"
              alt={t("heroTitle")}
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-105 object-cover object-center"
            />
            {/* Directional overlay — left heavy for text legibility */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(252deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)"
                  : "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            {/* Bottom fade */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </div>

          {/* Content — vertically centered, left-aligned */}
          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
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
              <span>{t("breadcrumb")}</span>
              {/* <span className="text-white/25">/</span>
              <span>Assigned Studies</span> */}
            </motion.div>

            {/* Title — clip-path wipe */}
            <div className={`overflow-hidden ${isArabic ? "pb-2" : "pb-0.5"}`}>
              <motion.h1
                className={`font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] ${
                  isArabic ? "leading-[1.4]" : "leading-tight"
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
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          {/* White bleed into body */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview (full-width intro) ── */}
        <section className="bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.div className="max-w-[860px]" {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <span
                className={`mt-5 block font-poppins font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[10px] uppercase tracking-[0.35em]"
                }`}
              >
                {t("overviewKicker")}
              </span>
              <h2
                className={`mt-3 font-poppins font-semibold tracking-tight text-[#1D2D44] sm:text-[1.9rem] ${
                  isArabic
                    ? "text-[1.55rem] leading-[1.45]"
                    : "text-[1.55rem] leading-[1.18]"
                }`}
              >
                {t("overviewTitle")}
              </h2>

              <p className={`mt-7 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/70`}>
                {t("overviewBody")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── White Papers (two-column rail) ── */}
        <section className="border-t border-[#1D2D44]/10 bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title={t("whitePapersTitle")} />
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {whitePapers.map(({ id, title, image, alt }, i) => (
                    <motion.article key={id} {...fadeUp(0.05 + i * 0.08)}>
                      <div className="group relative aspect-[3/4] w-full overflow-hidden border border-[#1D2D44]/[0.08]">
                        <Image
                          src={image}
                          alt={alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className="absolute left-0 top-0 z-10 h-1 w-10 bg-[#EC601B]"
                          aria-hidden
                        />
                      </div>
                      <h3 className="mt-4 font-poppins text-[15px] font-semibold leading-snug text-[#1D2D44]">
                        {title}
                      </h3>
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Process (two-column rail) ── */}
        <section className="border-t border-[#1D2D44]/10 bg-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title={t("processTitle")} />
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/60 lg:pl-12">
                <ul className="divide-y divide-[#1D2D44]/10 border-t border-[#1D2D44]/10">
                  {steps.map(({ id, title, body }, i) => (
                    <motion.li
                      key={id}
                      {...fadeUp(0.05 + i * 0.08)}
                      className="group/li flex gap-5 py-7 sm:gap-7 sm:py-9"
                    >
                      <span className="shrink-0 pt-1 font-poppins text-[12px] font-bold tracking-[0.2em] text-[#EC601B]">
                        {id}
                      </span>
                      <p className={`font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/75`}>
                        <span className="font-semibold underline underline-offset-[3px] decoration-[#1D2D44]/40">
                          {title}
                        </span>{" "}
                        {body}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact note ──────────────────────────────────────────────── */}
        <section className="bg-[#7DC0F1]/[0.06] px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.p
              {...fadeUp(0.05)}
              className={`font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/75`}
            >
              {t("contactText")}{" "}
              <a
                href="mailto:research@kfas.org.kw"
                className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
              >
                research@kfas.org.kw
              </a>
            </motion.p>
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
