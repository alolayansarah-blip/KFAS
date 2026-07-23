"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocale, useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

type ImpactStoryText = {
  title: string;
  body: string;
  alt?: string;
};

const IMPACT_STORIES_META = [
  { id: "kdd", image: "/image/randD3.png", imageFit: "contain" as const },
  { id: "soof", image: "/image/tech3.jpg", imageFit: "cover" as const },
  { id: "beorganic", image: "/image/randD4.jpg", imageFit: "cover" as const },
  {
    id: "al-hamra",
    image: "/image/al-hamra-monitoring.png",
    imageFit: "cover" as const,
  },
  { id: "quantum", image: "/image/Quantum.jpg", imageFit: "cover" as const },
  { id: "ndt-robot", image: "/image/NDT.jpg", imageFit: "cover" as const },
] as const;

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

export default function SuccessStoriesPage() {
  const t = useTranslations("SuccessStoriesPage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const bodyTextSize = isArabic ? "text-[17px]" : "text-[15px]";

  const impactStoriesText = t.raw("impactStories") as ImpactStoryText[];
  const impactStories = IMPACT_STORIES_META.map((meta, i) => ({
    ...meta,
    ...impactStoriesText[i],
  }));

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />

      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — solid navy, matches research page pattern (no photo) ── */}
        <section
          ref={heroRef}
          className="relative flex h-[360px] items-center justify-start overflow-hidden bg-[#1D2D44] md:h-[460px] lg:h-[540px]"
        >
          <motion.div
            className="relative z-10 mx-auto mt-24 w-full max-w-7xl px-6 py-12 sm:px-8 md:mt-28 lg:mt-44 lg:px-12"
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
              <span>{t("breadcrumb")}</span>
            </motion.div>

            <div
              className={`overflow-hidden ${
                isArabic ? "pb-4 pt-2 sm:pb-5" : "pb-0.5"
              }`}
            >
              <motion.h1
                className={`font-poppins text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl ${
                  isArabic
                    ? "leading-[1.45]"
                    : "leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                <span className="block">{t("heroTitleLine1")}</span>
                <span className="block">{t("heroTitleLine2")}</span>
              </motion.h1>
            </div>

            <motion.div
              className="mt-5 h-[3px] origin-left rounded-full bg-[#EC601B] rtl:origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>
        </section>

        <section className="bg-[#7DC0F1]/[0.06] px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title={t("storiesTitle")} />
                {t("intro") ? (
                  <motion.p
                    {...fadeUp(0.1)}
                    className={`mt-6 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/70 lg:sticky lg:top-[12.5rem]`}
                  >
                    {t("intro")}
                  </motion.p>
                ) : null}
              </div>

              <div className="lg:col-span-8 lg:border-s lg:border-[#7DC0F1]/60 lg:ps-12">
                <div className="divide-y divide-[#1D2D44]/10">
                  {impactStories.map((story, i) => (
                    <motion.article
                      key={story.id}
                      {...fadeUp(0.08 + i * 0.08)}
                      className={i === 0 ? "pb-10" : "py-10"}
                    >
                      <h3 className="font-poppins text-[1.15rem] font-semibold leading-snug text-[#1D2D44]">
                        {story.title}
                      </h3>
                      <p
                        className={`mt-3 font-poppins ${bodyTextSize} font-light leading-[1.9] text-[#1D2D44]/65`}
                      >
                        {story.body}
                      </p>

                      {story.image ? (
                        <div className="mt-8 max-w-md">
                          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/[0.08] bg-white">
                            <Image
                              src={story.image}
                              alt={story.alt ?? story.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 28rem"
                              className={
                                story.imageFit === "contain"
                                  ? "object-contain object-center p-4"
                                  : "object-cover object-center"
                              }
                            />
                            <span
                              className="absolute top-0 start-0 h-1 w-10 bg-[#EC601B]"
                              aria-hidden
                            />
                          </div>
                        </div>
                      ) : null}
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center bg-white py-12">
          <motion.button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex flex-col items-center gap-2 text-[#1D2D44]/35 transition-colors duration-300 hover:text-[#EC601B]"
            {...fadeUp(0)}
            aria-label={t("backToTop")}
          >
            <div className="flex h-9 w-9 items-center justify-center border border-[#1D2D44]/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#EC601B]/50">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
              {t("backToTop")}
            </span>
          </motion.button>
        </div>
      </main>

      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
