"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

type FinancialGroup = { group: string; rows: [string, string][] };

/* ── shared pieces ────────────────────────────────────────────────────── */

// Editorial section head: orange kicker, then title
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

export default function ScientificMissionsPage() {
  const t = useTranslations("ScientificMissionsPage");
  const isArabic = useLocale() === "ar";

  const financialTable = t.raw("financialTable") as FinancialGroup[];

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
          <div className="absolute inset-0 bg-[#1D2D44]">
            <Image
              src="/image/ScientificMissions.webp"
              alt="Scientific missions and research collaboration"
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
            <div
              className="absolute inset-0"
              style={{
                background:
                  isArabic
                    ? "linear-gradient(to right, rgba(125,192,241,0.28) 0%, rgba(125,192,241,0.12) 28%, transparent 55%)"
                    : "linear-gradient(to left, rgba(125,192,241,0.28) 0%, rgba(125,192,241,0.12) 28%, transparent 55%)",
              }}
              aria-hidden
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

            <div className="overflow-hidden pb-1">
              <motion.h1
                className="font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl [text-shadow:_2px_2px_20px_rgba(0,0,0,0.45)]"
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

        {/* ─── Overview ──────────────────────────────────────────────────── */}
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
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-poppins font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[12px] uppercase tracking-[0.3em]"
                }`}
              >
                {t("overviewKicker")}
              </p>
              <p className="mt-5 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                {t("overviewBody")}
              </p>
            </motion.div>
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
                  <Mark />
                  {t("eligibilityItem1")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("eligibilityItem2")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  <span>
                    {t("eligibilityItem3Pre")}{" "}
                    <a
                      href="/image/KFAS strategy 2025-2029 - Priority Areas.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      {t("eligibilityItem3LinkText")}
                    </a>
                    .
                  </span>
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("eligibilityItem4")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("eligibilityItem5")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("eligibilityItem6")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("eligibilityItem7")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("eligibilityItem8")}
                </li>
              </motion.ul>
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
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("requiredDocItem1")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("requiredDocItem2")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("requiredDocItem3")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("requiredDocItem4")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("requiredDocItem5")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  <span>
                    {t("requiredDocItem6Pre")}{" "}
                    <a
                      href="/image/Co-authors Approval Template.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      {t("requiredDocItem6LinkText")}
                    </a>
                  </span>
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("requiredDocItem7")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("requiredDocItem8")}
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("requiredDocItem9")}
                </li>
              </motion.ul>
            </div>
          </div>
        </section>

        {/* ─── The Financial Grant ───────────────────────────────────────── */}
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
              <SectionHead title={t("financialGrantTitle")} />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12">
              <motion.p
                className="max-w-3xl font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                {t("financialGrantBody")}
              </motion.p>

              <motion.div
                className="mt-9 max-w-3xl overflow-hidden border border-[#1D2D44]/12 bg-white shadow-[0_24px_60px_-40px_rgba(29,45,68,0.45)]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              >
                <table className="w-full border-collapse text-left rtl:text-right">
                  <tbody>
                    {financialTable.map((section) => (
                      <Fragment key={section.group}>
                        <tr className="bg-[#7DC0F1]/[0.16]">
                          <td
                            colSpan={2}
                            className="px-5 py-2.5 font-poppins text-[12px] font-semibold uppercase tracking-[0.16em] text-[#EC601B] sm:px-7"
                          >
                            {section.group}
                          </td>
                        </tr>
                        {section.rows.map(([dest, amount]) => (
                          <tr
                            key={`${section.group}-${amount}`}
                            className="border-t border-[#1D2D44]/10 transition-colors hover:bg-[#7DC0F1]/10"
                          >
                            <td className="px-5 py-4 font-poppins text-[14.5px] font-light leading-[1.7] text-[#1D2D44]/70 sm:px-7">
                              {dest}
                            </td>
                            <td className="whitespace-nowrap px-5 py-4 text-right rtl:text-left font-poppins text-[15px] font-semibold text-[#1D2D44] sm:px-7">
                              {amount}
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </motion.div>
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
                  <span>
                    {t("applicationItem2Pre")}{" "}
                    <a
                      href="https://kfas.formstack.com/forms/scientific_mission_application"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      {t("applicationItem2LinkText")}
                    </a>{" "}
                    {t("applicationItem2Post")}
                  </span>
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  {t("applicationItem3")}
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
                  href="mailto:research-sm@kfas.org.kw"
                  dir="ltr"
                  className="group inline-flex items-center gap-2 font-poppins text-[14px] font-semibold text-[#EC601B] transition-colors hover:text-[#1D2D44]"
                >
                  <span className="underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors group-hover:decoration-[#1D2D44]/40">
                    research-sm@kfas.org.kw
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
