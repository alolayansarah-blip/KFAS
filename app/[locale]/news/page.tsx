"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { sortedNews } from "@/src/data/news";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const RISE = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
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
);

export default function AllNewsPage() {
  const t = useTranslations("AllNewsPage");
  const tNews = useTranslations("LatestNews");
  const isArabic = useLocale() === "ar";

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const dateFormatter = new Intl.DateTimeFormat(
    isArabic ? "ar-u-nu-latn" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

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
          className="relative flex h-[360px] items-center justify-start overflow-hidden bg-[#1D2D44] md:h-[460px] lg:h-[540px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/KFASBuilding3.png"
              alt={t("heroTitle")}
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-110 object-cover object-[center_40%]"
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
            className="relative z-10 mx-auto mt-44 w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12"
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
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-0.5"
              }`}
            >
              <motion.h1
                className={`font-poppins text-4xl font-bold text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl ${
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

            <motion.div
              className="mt-5 h-[3px] origin-left rounded-full bg-[#EC601B] rtl:origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.65, ease: EASE }}
              className="mb-12 max-w-2xl"
            >
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[10px] uppercase tracking-[0.35em]"
                }`}
              >
                {t("kicker")}
              </p>
              <p className="mt-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70">
                {t("intro")}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              variants={STAGGER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {sortedNews.map((item) => (
                <motion.article
                  key={item.id}
                  variants={RISE}
                  className="group flex flex-col"
                >
                  <a href={item.link} className="flex h-full flex-col">
                    <div className="relative mb-5 aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={tNews(item.titleKey)}
                        fill
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-[#1D2D44]/0 transition-all duration-500 group-hover:bg-[#1D2D44]/10" />
                    </div>

                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1D2D44]/35">
                      {dateFormatter.format(new Date(item.dateISO))}
                    </p>

                    <h2 className="mb-3 font-poppins text-[17px] font-normal leading-snug text-[#1D2D44] transition-colors duration-300 group-hover:text-[#EC601B] line-clamp-3">
                      {tNews(item.titleKey)}
                    </h2>

                    <p className="mb-6 font-poppins text-[14px] font-light leading-relaxed text-[#1D2D44]/55 line-clamp-3">
                      {tNews(item.descriptionKey)}
                    </p>

                    <div className="mt-auto flex items-center gap-3">
                      <div className="h-[1.5px] w-5 bg-[#EC601B] transition-all duration-500 group-hover:w-8" />
                      <span className="text-[12px] font-medium tracking-[0.08em] text-[#EC601B]">
                        {t("readMoreLabel")}
                      </span>
                      <ArrowIcon className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 rtl:translate-x-1 rtl:rotate-180" />
                    </div>
                  </a>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              className="mt-16 flex justify-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-3 text-[13px] font-medium tracking-[0.08em] text-[#1D2D44]/60 transition-colors hover:text-[#EC601B]"
              >
                <ArrowIcon className="h-3 w-3 rotate-180 rtl:rotate-0" />
                {t("backHome")}
              </Link>
            </motion.div>
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
