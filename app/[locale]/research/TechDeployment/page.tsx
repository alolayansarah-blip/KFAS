"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocale, useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const PILOT_IMAGES = [
  "/image/Tech1.jpg",
  "/image/tech2.jpg",
  "/image/tech3.jpg",
] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

type ProcessStep =
  | { title: string; bullets: string[] }
  | { body: string };

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

function StepRow({
  step,
  index,
  total,
  bodyTextSize,
  isArabic,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  bodyTextSize: string;
  isArabic: boolean;
}) {
  return (
    <motion.div
      className="flex gap-5 py-6 sm:gap-7"
      initial={{ opacity: 0, x: isArabic ? 12 : -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
    >
      <div className="flex w-9 shrink-0 flex-col items-center pt-0.5">
        <span className="w-full text-center font-poppins text-[0.85rem] font-semibold leading-none tabular-nums text-[#EC601B]">
          {String(index + 1).padStart(2, "0")}
        </span>
        {index < total - 1 && (
          <div className="mt-2 min-h-[24px] w-px flex-1 bg-[#EC601B]/20" />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-2">
        {"bullets" in step ? (
          <>
            <p className="font-poppins text-[0.95rem] font-semibold leading-snug text-[#1D2D44]">
              {step.title}
            </p>
            <ul className="mt-3 space-y-2 ps-2">
              {step.bullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7DC0F1]" />
                  <span
                    className={`font-poppins ${bodyTextSize} font-light leading-[1.8] text-[#1D2D44]/65`}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p
            className={`font-poppins ${bodyTextSize} font-light leading-[1.85] text-[#1D2D44]/65`}
          >
            {step.body}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function TechDeploymentPage() {
  const t = useTranslations("TechDeploymentPage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const bodyTextSize = isArabic ? "text-[17px]" : "text-base";

  const processSteps = t.raw("processSteps") as ProcessStep[];
  const pilotAlts = t.raw("pilotAlts") as string[];

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
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/techD.webp"
              alt={t("heroAlt")}
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-110 object-cover object-[center_70%]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(252deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)"
                  : "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
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
          </div>

          <motion.div
            className="relative z-10 mt-32 md:mt-28 lg:mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
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
              <span>{t("breadcrumb")}</span>
            </motion.div>

            <div className={`overflow-hidden ${isArabic ? "pb-2" : "pb-0.5"}`}>
              <motion.h1
                className={`font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] ${
                  isArabic ? "leading-[1.4]" : "leading-tight"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                {t("heroTitleLine1")}
                <br />
                {t("heroTitleLine2")}
              </motion.h1>
            </div>

            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-base tracking-normal"
                    : "text-[10px] uppercase tracking-[0.4em]"
                }`}
              >
                {t("overviewKicker")}
              </p>
              <h2
                className={`mt-4 font-poppins font-semibold tracking-tight text-[#1D2D44] ${
                  isArabic
                    ? "text-2xl sm:text-3xl leading-[1.45]"
                    : "text-2xl sm:text-3xl leading-tight"
                }`}
              >
                {t("overviewTitle")}
              </h2>
              <p
                className={`mt-4 font-poppins font-light text-[#1D2D44]/35 ${
                  isArabic
                    ? "text-base leading-relaxed tracking-normal"
                    : "text-[0.9rem] uppercase leading-relaxed tracking-[0.3em]"
                }`}
              >
                {t("overviewSubtitleLine1")}
                <br />
                {t("overviewSubtitleLine2")}
              </p>
            </motion.div>
            <motion.p
              className={`mt-7 font-poppins ${bodyTextSize} leading-[1.9] text-[#1D2D44]/65 font-light`}
              {...fadeUp(0.05)}
            >
              {t("overviewBody")}
            </motion.p>
          </div>
        </section>

        <RailSection tint title={t("whoCanApplyTitle")}>
          <motion.p
            className={`font-poppins ${bodyTextSize} leading-[1.9] text-[#1D2D44]/70 font-light`}
            {...fadeUp(0.05)}
          >
            {t("whoCanApplyBody")}
          </motion.p>
        </RailSection>

        <section className="bg-white px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {PILOT_IMAGES.map((image, i) => (
                <motion.div key={image} {...fadeUp(0.05 + i * 0.08)}>
                  <div className="group relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/[0.08]">
                    <Image
                      src={image}
                      alt={pilotAlts[i] ?? ""}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute top-0 start-0 z-10 h-1 w-10 bg-[#EC601B]"
                      aria-hidden
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <RailSection title={t("processTitle")}>
          <motion.p
            className={`font-poppins ${bodyTextSize} leading-[1.9] text-[#1D2D44]/50 font-light`}
            {...fadeUp(0.05)}
          >
            {t("processIntro")}
          </motion.p>
          <div className="mt-6">
            {processSteps.map((step, i) => (
              <StepRow
                key={i}
                step={step}
                index={i}
                total={processSteps.length}
                bodyTextSize={bodyTextSize}
                isArabic={isArabic}
              />
            ))}
          </div>
        </RailSection>

        <section className="bg-[#7DC0F1]/[0.06] px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.p
              {...fadeUp(0.05)}
              className={`font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/75`}
            >
              {t("contactText")}{" "}
              <a
                href="mailto:research@kfas.org.kw"
                dir="ltr"
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
