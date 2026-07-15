"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

type Grant = { title: string; body: string };
type EligibilityBlock = { title: string; items: string[] };
type Cycle = { cycle: string; window: string };

/* ── shared pieces ────────────────────────────────────────────────────── */

// Editorial section head: orange + sky kicker, then title
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

// Refined hairline list marker (grows on hover of its row)
function Mark() {
  return (
    <span className="mt-[13px] h-px w-3.5 shrink-0 bg-[#EC601B] transition-all duration-300 group-hover/li:w-6" />
  );
}

export default function ScholarFellowshipPage() {
  const t = useTranslations("ScholarFellowshipPage");
  const isArabic = useLocale() === "ar";

  const grants = t.raw("grants") as Grant[];
  const eligibilityBlocks = t.raw("eligibilityBlocks") as EligibilityBlock[];
  const requiredDocuments = t.raw("requiredDocuments") as string[];
  const financialItems = t.raw("financialItems") as string[];
  const cycles = t.raw("cycles") as Cycle[];

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

      <main className="min-h-screen bg-white font-poppins selection:bg-[#EC601B] selection:text-white">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#1D2D44]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/ScholarFellowship2.png"
              alt=""
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* navy overlays for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(102deg, rgba(15,24,40,0.85) 0%, rgba(29,45,68,0.55) 46%, rgba(29,45,68,0.20) 76%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,24,40,0.60) 0%, transparent 46%)",
              }}
            />
          </div>

          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
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
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-1"
              }`}
            >
              <motion.h1
                className={`font-poppins text-4xl font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl [text-shadow:_2px_2px_20px_rgba(0,0,0,0.45)] ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-[1.08] tracking-tight"
                }`}
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              >
                {t("heroTitle")}
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

        {/* ─── Lead + Grants ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full opacity-[0.12] rtl:right-auto rtl:-left-40"
            style={{
              background:
                "radial-gradient(circle, #7DC0F1 0%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.p
              className="max-w-3xl font-poppins text-[19px] leading-[1.7] font-light text-[#1D2D44]/80 sm:text-[22px]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {t("leadParagraph")}
            </motion.p>

            <div className="mt-10 max-w-3xl border-t border-[#1D2D44]/10">
              {grants.map((grant, i) => (
                <motion.div
                  key={grant.title}
                  className="group relative border-b border-[#1D2D44]/10 py-8 pl-7 rtl:pl-0 rtl:pr-7"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                >
                  <span className="absolute left-0 top-9 h-7 w-[3px] rounded-full bg-[#EC601B] transition-all duration-500 group-hover:h-[calc(100%-3.5rem)] rtl:left-auto rtl:right-0" />
                  <h3 className="font-poppins text-[19px] font-semibold leading-snug text-[#1D2D44]">
                    {grant.title}
                  </h3>
                  <p className="mt-2.5 font-poppins text-[15px] leading-[1.85] font-light text-[#1D2D44]/65">
                    {grant.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Eligibility ───────────────────────────────────────────────── */}
        <section className="relative bg-[#7DC0F1]/[0.07] py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 0% 0%, rgba(125,192,241,0.16) 0%, transparent 55%)",
            }}
          />
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
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    1.
                  </span>
                  {t("eligibilityItem1")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    2.
                  </span>
                  {t("eligibilityItem2")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    3.
                  </span>
                  {t("eligibilityItem3")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    4.
                  </span>
                  <span>
                    {t("eligibilityItem4Pre")}{" "}
                    <a
                      href="/image/KFAS strategy 2025-2029 - Priority Areas.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      {t("eligibilityItem4LinkText")}
                    </a>
                    .
                  </span>
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    5.
                  </span>
                  <span>
                    {t("eligibilityItem5Pre")}{" "}
                    <a
                      href="https://www.timeshighereducation.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      {t("eligibilityItem5LinkText")}
                    </a>{" "}
                    {t("eligibilityItem5Post")}
                  </span>
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    6.
                  </span>
                  {t("eligibilityItem6")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    7.
                  </span>
                  {t("eligibilityItem7")}
                </li>
              </motion.ul>

              <div className="mt-6 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-10 pl-9 rtl:pl-0 rtl:pr-9 md:grid-cols-2">
                {eligibilityBlocks.map((block, i) => (
                  <motion.div
                    key={block.title}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  >
                    <h4 className="font-poppins text-[16px] font-semibold leading-snug text-[#1D2D44]">
                      {block.title}
                    </h4>
                    <ul className="mt-4 space-y-3.5">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="group/li flex items-start gap-3.5 font-poppins text-[14.5px] leading-[1.85] font-light text-[#1D2D44]/70"
                        >
                          <Mark />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Required Documents ────────────────────────────────────────── */}
        <section className="relative bg-white py-20 sm:py-28">
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
                {requiredDocuments.map((doc) => (
                  <li
                    key={doc}
                    className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                  >
                    <Mark />
                    {doc}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* ─── Financial Benefits ────────────────────────────────────────── */}
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
              <SectionHead title={t("financialBenefitsTitle")} />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12">
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                <p className="font-poppins text-[15px] font-medium text-[#1D2D44]">
                  {t("monthlyAllowanceIntro")}
                </p>

                <div className="mt-5 overflow-hidden border border-[#1D2D44]/12 bg-white shadow-[0_24px_60px_-40px_rgba(29,45,68,0.45)]">
                  <table className="w-full border-collapse text-left rtl:text-right">
                    <thead>
                      <tr className="bg-[#1D2D44]">
                        <th className="border-b-[3px] border-[#7DC0F1] px-5 py-4 font-poppins text-[12px] font-semibold uppercase tracking-[0.12em] text-white sm:px-7">
                          {t("tableFellowshipType")}
                        </th>
                        <th className="border-b-[3px] border-[#7DC0F1] px-5 py-4 font-poppins text-[12px] font-semibold uppercase tracking-[0.12em] text-white sm:px-7">
                          {t("tableMonthlyAllowance")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {grants.map((grant, i) => (
                        <tr
                          key={grant.title}
                          className="border-t border-[#1D2D44]/10 transition-colors hover:bg-[#7DC0F1]/10"
                        >
                          <td className="px-5 py-5 font-poppins text-[15px] font-medium text-[#1D2D44] sm:px-7">
                            {grant.title}
                          </td>
                          <td className="px-5 py-5 font-poppins text-[16px] font-semibold text-[#EC601B] sm:px-7">
                            {i === 0 ? "KD 2,000" : "KD 1,200"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 font-poppins text-[12.5px] font-light italic text-[#1D2D44]/55">
                  {t("tableFootnote")}
                </p>
              </motion.div>

              <motion.ul
                className="mt-12 max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              >
                {financialItems.map((item) => (
                  <li
                    key={item}
                    className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                  >
                    <Mark />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* ─── Application Submission ────────────────────────────────────── */}
        <section className="relative bg-white py-20 sm:py-28">
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
            <div className="lg:col-span-4 xl:col-span-3">
              <SectionHead title={t("applicationSubmissionTitle")} />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12">
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                <p className="font-poppins text-[15px] font-medium text-[#1D2D44]">
                  {t("applicationsOpenIntro")}
                </p>
                <div className="mt-5 border-y border-[#1D2D44]/10">
                  {cycles.map((c, i) => (
                    <div
                      key={c.cycle}
                      className={`group flex flex-wrap items-center gap-x-5 gap-y-1 py-5 ${
                        i === 0 ? "border-b border-[#1D2D44]/10" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#7DC0F1] transition-colors duration-300 group-hover:bg-[#EC601B]" />
                        <span className="font-poppins text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EC601B]">
                          {c.cycle}
                        </span>
                      </span>
                      <span className="font-poppins text-[18px] font-semibold text-[#1D2D44]">
                        {c.window}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.ul
                className="mt-10 max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
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
                  <span>
                    {t("applicationItem3Pre")}{" "}
                    <a
                      href="https://apply.kfas.org.kw/FormDetails/Index?Id=195263e4-b3f6-f011-8406-6045bd6a4103"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      {t("applicationItem3LinkText")}
                    </a>
                    {t("applicationItem3Post")}
                  </span>
                </li>
              </motion.ul>

              <motion.div
                className="mt-10 flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#7DC0F1]/40 pt-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              >
                <span className="font-poppins text-[14px] font-light text-[#1D2D44]/60">
                  {t("contactLabel")}
                </span>
                <a
                  href="mailto:rgraduates@kfas.org.kw"
                  dir="ltr"
                  className="group inline-flex items-center gap-2 font-poppins text-[14px] font-semibold text-[#EC601B] transition-colors hover:text-[#1D2D44]"
                >
                  <span className="underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors group-hover:decoration-[#1D2D44]/40">
                    rgraduates@kfas.org.kw
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
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
