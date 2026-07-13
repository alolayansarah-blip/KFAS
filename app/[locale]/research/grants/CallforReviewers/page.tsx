"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function SectionHead({ title }: { title: ReactNode }) {
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

function Mark() {
  return (
    <span
      aria-hidden
      className="mt-[0.7rem] block h-px w-6 shrink-0 bg-[#EC601B]/70 transition-all duration-500 group-hover:w-10"
    />
  );
}

function CtaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3"
    >
      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
        {children}
      </span>
      <svg
        className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:-scale-x-100 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0"
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

function RailSection({
  title,
  tint = false,
  children,
}: {
  title: ReactNode;
  tint?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`px-6 py-20 sm:px-8 sm:py-24 lg:px-12 ${tint ? "bg-[#7DC0F1]/[0.06]" : "bg-white"}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead title={title} />
          </div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function CallforReviewersPage() {
  const t = useTranslations("CallforReviewersPage");
  const isArabic = useLocale() === "ar";
  const requirementsItems = t.raw("requirementsItems") as string[];

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
          className={`relative overflow-hidden flex items-center justify-start bg-[#1D2D44] ${
            isArabic
              ? "h-[400px] md:h-[500px] lg:h-[560px]"
              : "h-[360px] md:h-[460px] lg:h-[540px]"
          }`}
        >
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(252deg, rgba(29,45,68,0.95) 0%, rgba(29,45,68,0.85) 42%, rgba(29,45,68,0.7) 68%, rgba(29,45,68,0.55) 100%)"
                  : "linear-gradient(108deg, rgba(29,45,68,0.95) 0%, rgba(29,45,68,0.85) 42%, rgba(29,45,68,0.7) 68%, rgba(29,45,68,0.55) 100%)",
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
          </div>

          <motion.div
            className={`relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 ${
              isArabic
                ? "mt-36 sm:mt-40 lg:mt-44"
                : "mt-36 md:mt-28 lg:mt-44"
            }`}
            style={{ opacity: heroOpacity }}
          >
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
              <span>{t("breadcrumbResearch")}</span>
              <span className="text-white/25">/</span>
              <Link
                href="/research/grants"
                className="hover:text-white transition-colors"
              >
                {t("breadcrumbGrants")}
              </Link>
            </motion.div>

            <div
              className={`overflow-hidden ${
                isArabic ? "pt-3 pb-4 sm:pt-4 sm:pb-5" : "pb-0.5"
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

            {/* Orange divider under title — desktop / tablet */}
            <motion.div
              className="mt-5 hidden h-[3px] w-[72px] rounded-full bg-[#EC601B] origin-left rtl:origin-right md:block"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          {/* Orange divider on navy / white border — mobile only */}
          <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-30 md:hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <motion.div
                className="h-[3px] w-[72px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Introduction ── */}
        <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[16px] tracking-normal"
                    : "text-[10px] uppercase tracking-[0.4em]"
                }`}
              >
                {t("overviewKicker")}
              </p>
              <h2 className="mt-4 font-poppins text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-[#1D2D44]">
                {t("overviewTitle")}
              </h2>
            </motion.div>
            <div className="mt-7 space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
              <motion.p {...fadeUp(0.05)}>{t("overviewBody1")}</motion.p>
              <motion.p {...fadeUp(0.1)}>{t("overviewBody2")}</motion.p>
            </div>
          </div>
        </section>

        {/* ── Become a Grant Reviewer ── */}
        <RailSection tint title={t("becomeTitle")}>
          <div className="space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>{t("becomeBody1")}</motion.p>
            <motion.p {...fadeUp(0.1)}>{t("becomeBody2")}</motion.p>
          </div>
        </RailSection>

        {/* ── Requirements ── */}
        <RailSection title={t("requirementsTitle")}>
          <div className="divide-y divide-[#1D2D44]/[0.08]">
            {requirementsItems.map((item, i) => (
              <motion.div
                key={item}
                className="group flex gap-5 py-6 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
                initial={{ opacity: 0, x: isArabic ? 12 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Mark />
                <div className="min-w-0 flex-1">{item}</div>
              </motion.div>
            ))}
          </div>
        </RailSection>

        {/* ── Application Form ── */}
        <RailSection tint title={t("applicationTitle")}>
          <div className="space-y-5 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>{t("applicationBody")}</motion.p>
            <motion.div {...fadeUp(0.1)}>
              <CtaLink href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=6cSW2yoASkm-pO14480FIEM0MFUVdLVCrKhPabT88stUQTlKUjBIMzNCMjdZWDk5V1ZUSVYzUjlTMC4u&route=shorturl">
                {t("applicationLinkText")}
              </CtaLink>
            </motion.div>
          </div>
        </RailSection>

        {/* ── Funded Project Examples ── */}
        <RailSection title={t("fundedTitle")}>
          <div className="space-y-5 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>{t("fundedBody")}</motion.p>
            <motion.div {...fadeUp(0.1)}>
              <CtaLink href="https://research.kfas.org.kw">
                {t("fundedLinkText")}
              </CtaLink>
            </motion.div>
          </div>
        </RailSection>

        {/* ── Contact ── */}
        <RailSection tint title={t("contactTitle")}>
          <div className="space-y-3 font-poppins text-[15px] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
              {t("contactBody1Pre")}
              <a
                href="mailto:research@kfas.org.kw"
                dir="ltr"
                className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
              >
                research@kfas.org.kw
              </a>
            </motion.p>
            <motion.p {...fadeUp(0.1)}>
              {t("contactPhoneLabel")}
              <a
                href="tel:+96522278125"
                dir="ltr"
                className="font-medium text-[#1D2D44] hover:text-[#EC601B] transition-colors"
              >
                (+965) 22278125
              </a>
              {t("contactPhoneMid")}
              <a
                href="tel:+96522278126"
                dir="ltr"
                className="font-medium text-[#1D2D44] hover:text-[#EC601B] transition-colors"
              >
                22278126
              </a>
            </motion.p>
          </div>
        </RailSection>
      </main>
      <Footer />
    </>
  );
}
