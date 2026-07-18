"use client";

import { useRef, type ReactNode } from "react";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const ELIGIBLE_ITEMS_URL =
  "https://kfas.sharepoint.com/:w:/g/IQBOOW2Wne4DRKilLX2cPzSFAWolLq87CvQnclHp7T70AFs?rtime=NeVgeU3G3kg";

const STI_DOMAINS_URL =
  "https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2F2025%2F2%2D%20STI%20Domains%20Priority%20Areas%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS%2F2025&p=true&ga=1";

const PHD_TEMPLATE_URL =
  "https://kfas.sharepoint.com/:w:/g/IQAFPKqLd3x_R60v21fxNqvvAZRSqLxhQ--girbCb6R0pFo?e=3ZgXat";

const APPLICATION_URL =
  "https://kfas.formstack.com/forms/supplementary_fund_application";

const inlineLink =
  "font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40";

// ─── Section head ──────────────────────────────────────────────────────────────
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

// ─── List marker ───────────────────────────────────────────────────────────────
function Mark() {
  return (
    <span className="mt-[13px] h-px w-3.5 shrink-0 bg-[#EC601B] transition-all duration-300 group-hover/li:w-6 rtl:group-hover/li:w-6" />
  );
}

type EligibilityItem =
  | string
  | { text: ReactNode }
  | { label: string; sub: (string | { text: ReactNode })[] };

type DocumentItem =
  | string
  | { text: ReactNode }
  | { label: string; sub: string[] };

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PhDStudentsSupplementaryFundGrantPage() {
  const t = useTranslations("PhDStudentsSupplementaryFundGrantPage");
  const isArabic = useLocale() === "ar";

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const ELIGIBILITY: EligibilityItem[] = [
    t("eligibilityItem1"),
    {
      text: (
        <>
          {t("eligibilityItem2Pre")}
          <a
            href={STI_DOMAINS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            {t("eligibilityItem2LinkText")}
          </a>
          {t("eligibilityItem2Post")}
        </>
      ),
    },
    t("eligibilityItem3"),
    t("eligibilityItem4"),
    t("eligibilityItem5"),
    {
      label: t("enrolledLabel"),
      sub: [
        t("enrolledSub1"),
        {
          text: (
            <div>
              <span>{t("enrolledSub2")}</span>
              <p className="mt-2 font-poppins text-[13px] font-light italic leading-[1.7] text-[#1D2D44]/55">
                {t("enrolledSub2Note")}{" "}
                <a
                  href="https://www.timeshighereducation.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${inlineLink} not-italic`}
                >
                  {t("enrolledSub2LinkText")}
                </a>
              </p>
            </div>
          ),
        },
      ],
    },
  ];

  const REQUIRED_DOCUMENTS: DocumentItem[] = [
    t("requiredDocItem1"),
    t("requiredDocItem2"),
    t("requiredDocItem3"),
    t("requiredDocItem4"),
    t("requiredDocItem5"),
    {
      text: (
        <>
          {t("requiredDocItem6Pre")}{" "}
          <a
            href={PHD_TEMPLATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            {t("requiredDocItem6LinkText")}
          </a>
          {t("requiredDocItem6Post")}
        </>
      ),
    },
    t("requiredDocItem7"),
    {
      label: t("localLabel"),
      sub: [t("localSub1")],
    },
    {
      label: t("abroadLabel"),
      sub: [t("abroadSub1"), t("abroadSub2")],
    },
  ];

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />
      <main className="min-h-screen bg-white font-poppins selection:bg-[#EC601B] selection:text-white">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#1D2D44]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/PhD1.png"
              alt="PhD thesis research and supplementary fund grant"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  isArabic
                    ? "linear-gradient(252deg, rgba(29,45,68,0.72) 0%, rgba(29,45,68,0.38) 42%, rgba(29,45,68,0.10) 68%, transparent 100%)"
                    : "linear-gradient(108deg, rgba(29,45,68,0.72) 0%, rgba(29,45,68,0.38) 42%, rgba(29,45,68,0.10) 68%, transparent 100%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.50) 0%, transparent 45%)",
              }}
              aria-hidden
            />
          </div>

          <motion.div
            className="relative z-10 mt-32 w-full max-w-7xl mx-auto px-6 py-12 sm:mt-40 sm:px-8 md:mt-44 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className={`mb-6 flex items-center gap-2.5 font-poppins font-semibold text-white/55 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.34em]"
              }`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span>{t("breadcrumbLearning")}</span>
              <span className="text-white/30">/</span>
              <Link
                href="/Learning-and-Development/Researchers"
                className="text-white/80 transition-colors hover:text-white"
              >
                {t("breadcrumbResearchers")}
              </Link>
            </motion.div>

            <div
              className={`overflow-hidden ${
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-[0.12em]"
              }`}
            >
              <motion.h1
                className={`font-poppins text-3xl font-bold text-white sm:text-4xl lg:text-5xl xl:text-6xl [text-shadow:_2px_2px_20px_rgba(0,0,0,0.45)] ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-[1.12] tracking-tight"
                }`}
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              >
                {t("heroTitleLine1")}
                <br />
                {t("heroTitleLine2")}
                {!isArabic && (
                  <>
                    <br />
                    {t("heroTitleLine3")}
                  </>
                )}
              </motion.h1>
            </div>

            {/* Orange divider under title — desktop / tablet */}
            <motion.div
              className="mt-7 hidden h-[3px] w-[76px] origin-left rtl:origin-right rounded-full bg-[#EC601B] md:block"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          {/* Orange divider on navy / white border — mobile only */}
          <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-30 md:hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <motion.div
                className="h-[3px] w-[76px] origin-left rtl:origin-right rounded-full bg-[#EC601B]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full opacity-[0.12] rtl:right-auto rtl:-left-40"
            style={{
              background:
                "radial-gradient(circle, #7DC0F1 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
            <motion.p
              className="font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70 sm:text-[16px]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {t("overviewBody")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              whileHover={{ y: -8 }}
            >
              <div className="group relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/08">
                <Image
                  src="/image/PhD2.jpeg"
                  alt="PhD students collaborating on research at a desk with books and a tablet"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Grant amount ───────────────────────────────────────────── */}
        <section
          className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12"
          style={{ background: "#7DC0F1" }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:gap-12 lg:text-left rtl:lg:text-right">
            <motion.p
              className="max-w-[42ch] font-poppins text-[1.25rem] font-semibold leading-[1.35] tracking-tight text-white sm:text-[1.5rem]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {t("grantAmountBody")}
            </motion.p>
            <motion.a
              href={ELIGIBLE_ITEMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 font-poppins text-[15px] font-semibold text-white underline decoration-white/40 underline-offset-[4px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              {t("eligibleItemsLinkText")}
            </motion.a>
          </div>
        </section>

        {/* ── Eligibility Criteria ───────────────────────────────────── */}
        <section className="relative bg-white py-20 sm:py-28">
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
            <div className="lg:col-span-4 xl:col-span-3">
              <SectionHead title={t("eligibilityTitle")} />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12">
              <motion.ul
                className="max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                {ELIGIBILITY.map((item, i) =>
                  typeof item === "string" ? (
                    <li
                      key={i}
                      className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                    >
                      <Mark />
                      {item}
                    </li>
                  ) : "text" in item ? (
                    <li
                      key={i}
                      className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                    >
                      <Mark />
                      {item.text}
                    </li>
                  ) : (
                    <li
                      key={i}
                      className="py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                    >
                      <div className="group/li flex items-start gap-4">
                        <Mark />
                        <span className="font-medium text-[#1D2D44]">
                          {item.label}
                        </span>
                      </div>
                      <ul className="mt-4 flex flex-col gap-3 pl-8 rtl:pl-0 rtl:pr-8">
                        {item.sub.map((sub, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-[#1D2D44]/70"
                          >
                            <span className="mt-[11px] h-1 w-3 shrink-0 rounded-full bg-[#7DC0F1]" />
                            {typeof sub === "string" ? sub : sub.text}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
                )}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* ── Required Documents ─────────────────────────────────────── */}
        <section className="relative bg-[#7DC0F1]/[0.07] py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 100% 0%, rgba(125,192,241,0.16) 0%, transparent 55%)",
            }}
          />
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
            <div className="lg:col-span-4 xl:col-span-3">
              <SectionHead title={t("requiredDocumentsTitle")} />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12">
              <motion.ul
                className="max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                {REQUIRED_DOCUMENTS.map((item, i) =>
                  typeof item === "string" ? (
                    <li
                      key={i}
                      className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                    >
                      <Mark />
                      {item}
                    </li>
                  ) : "text" in item ? (
                    <li
                      key={i}
                      className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                    >
                      <Mark />
                      {item.text}
                    </li>
                  ) : (
                    <li
                      key={i}
                      className="py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                    >
                      <div className="group/li flex items-start gap-4">
                        <Mark />
                        <span className="font-medium text-[#1D2D44]">
                          {item.label}
                        </span>
                      </div>
                      <ul className="mt-4 flex flex-col gap-3 pl-8 rtl:pl-0 rtl:pr-8">
                        {item.sub.map((sub) => (
                          <li
                            key={sub}
                            className="flex items-start gap-3 text-[#1D2D44]/70"
                          >
                            <span className="mt-[11px] h-1 w-3 shrink-0 rounded-full bg-[#7DC0F1]" />
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
                )}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* ── Application Submission ───────────────────────────────────── */}
        <section className="relative bg-white py-20 sm:py-28">
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
            <div className="lg:col-span-4 xl:col-span-3">
              <SectionHead title={t("applicationSubmissionTitle")} />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12">
              <motion.ul
                className="max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("applicationItem1")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("applicationItem2")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("applicationItem3")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  <span>
                    {t("applicationItem4Pre")}{" "}
                    <a
                      href={APPLICATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      {t("applicationItem4LinkText")}
                    </a>{" "}
                    {t("applicationItem4Post")}
                  </span>
                </li>
              </motion.ul>

              <motion.div
                className="mt-10 flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#7DC0F1]/40 pt-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              >
                <span className="font-poppins text-[14px] font-light text-[#1D2D44]/60">
                  {t("contactLabel")}
                </span>
                <a
                  href="mailto:rgraduates@kfas.org.kw"
                  className="group inline-flex items-center gap-2 font-poppins text-[14px] font-semibold text-[#EC601B] transition-colors hover:text-[#1D2D44]"
                >
                  <span className="underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors group-hover:decoration-[#1D2D44]/40">
                    rgraduates@kfas.org.kw
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              </motion.div>
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
