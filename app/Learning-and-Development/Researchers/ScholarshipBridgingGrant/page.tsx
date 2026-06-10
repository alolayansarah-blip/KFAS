"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const inlineLink =
  "font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40";

// ─── Image placeholder ─────────────────────────────────────────────────────────
function ImagePlaceholder({ label = "Image" }: { label?: string }) {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden border border-[#1D2D44]/08">
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg, rgba(187,222,251,0.45) 0%, rgba(29,45,68,0.12) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(29,45,68,0.18) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1D2D44"
            strokeOpacity="0.4"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.6" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="font-poppins text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1D2D44]/55">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

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
    <span className="mt-[13px] h-px w-3.5 shrink-0 bg-[#EC601B] transition-all duration-300 group-hover/li:w-6" />
  );
}

const ELIGIBILITY = [
  "Kuwaiti nationals.",
  "Under 35 years of age at the time of submitting the application.",
  "Have attained an unconditional offer from the university, authenticated by the relevant Kuwaiti Cultural Office. Applicants can apply if the offer includes visa and financial or other non-academic conditions.",
  "Does not have the same academic degree as the one being applied for.",
  {
    text: (
      <>
        Field of study must be within the Science, Technology, and Innovation
        (STI) domains. To view the fields, please{" "}
        <a
          href="/image/KFAS strategy 2025-2029 - Priority Areas.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          click here
        </a>
        .
      </>
    ),
  },
  "The cumulative GPA for the bachelor's degree must not be less than 3.5 (4.0 scale) or Upper second-class, according to the UK system, or their equivalent in other systems as assessed by KFAS.",
  "For medical specialties, the cumulative GPA for the bachelor's degree must not be less than 3.33 (4.0 scale) or Lower second-class according to the UK system, or their equivalent in other systems as assessed by KFAS.",
  "For enrolled students, the completed years of study must not exceed one academic year for master's students and three academic years for PhD students.",
  "The prospective university must be ranked in the top 50 global universities (general) or in the top 20 global universities (by major) according to the following rankings: Times Higher Education, US News & World Report.",
];

type DocumentItem =
  | string
  | { text: ReactNode }
  | { label: string; sub: string[] };

const REQUIRED_DOCUMENTS: DocumentItem[] = [
  'Recent copy of the civil ID through the "Kuwait Mobile ID" app.',
  "Updated Curriculum Vitae.",
  "Unconditional offer from the university, authenticated by the relevant Kuwaiti Cultural Office.",
  "All academic degrees and transcripts must be authenticated by the Ministry of Higher Education.",
  "Personal Statement Letter - minimum 250 words - explaining their interest in their subject of study.",
  {
    label: "For enrolled students:",
    sub: [
      "Confirmation of enrolment letter issued by the university that includes the expected graduation date, and current academic standing.",
      'Letter "To Whom it May Concern" issued by the relevant Kuwait Cultural Office.',
    ],
  },
  {
    text: (
      <>
        A recent certificate of &quot;To Whom It May Concern&quot; from the{" "}
        <a
          href="https://eservice.pifss.gov.kw/default.aspx?ReturnUrl=%2f"
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Public Institution for Social Security
        </a>
        .
      </>
    ),
  },
  "Upon acceptance of the grant, employed applicants must provide a study leave from the employer stating that the applicant is on full leave.",
];

const FINANCIAL_BENEFITS = [
  "The grant covers one academic year tuition fees, including the summer semester.",
  "Monthly allowance of 1,200 Kuwaiti Dinars for master student and 1,500 Kuwaiti Dinars for PhD students.",
  "500 Kuwaiti Dinars to cover the initial expenses of the scholarship.",
  "A flight ticket allowance for one round-trip economy-class ticket to the study destination.",
  "The applicant is subject to the regulations of the Ministry of Higher Education through its health offices, provided that permanent residence is proven according to the health insurance system.",
  "If the applicant receives funding from another source, they may apply to KFAS to cover the difference.",
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ScholarshipBridgingGrantPage() {
  const heroRef = useRef<HTMLElement>(null);
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
      <main className="min-h-screen bg-white font-poppins selection:bg-[#EC601B] selection:text-white">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex h-[62vh] min-h-[440px] items-end justify-start overflow-hidden bg-[#1D2D44]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <div
              className="absolute inset-0 scale-110"
              style={{ background: "#1D2D44" }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(102deg, rgba(15,24,40,0.85) 0%, rgba(29,45,68,0.55) 46%, rgba(29,45,68,0.20) 76%, transparent 100%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,24,40,0.60) 0%, transparent 46%)",
              }}
              aria-hidden
            />
          </motion.div>

          <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-gradient-to-r from-[#EC601B] via-[#EC601B]/40 to-transparent" />

          <motion.div
            className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-6 flex items-center gap-2.5 font-poppins text-[10px] font-semibold uppercase tracking-[0.34em] text-white/55"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span>Learning &amp; Development</span>
              <span className="text-white/30">/</span>
              <span className="text-white/80">Researchers</span>
            </motion.div>

            <div className="overflow-hidden pb-1">
              <motion.h1
                className="font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl [text-shadow:_2px_2px_20px_rgba(0,0,0,0.45)]"
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              >
                Scholarship Bridging Grant
              </motion.h1>
            </div>

            <motion.div
              className="mt-7 h-[3px] origin-left rounded-full bg-[#EC601B]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 76 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full opacity-[0.12]"
            style={{
              background:
                "radial-gradient(circle, #7DC0F1 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
            <div>
              <motion.p
                className="font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70 sm:text-[16px]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                This program is designed to provide partial support to
                outstanding Kuwaitis pursuing master&rsquo;s or PhD degrees. It
                provides full tuition coverage for one academic year (including
                summer semester) at prestigious international universities. This
                support is intended to meet the needs of students who have
                obtained an unconditional offer to pursue their graduate
                studies, as well as those currently enrolled, and do not have
                full financial coverage from other sources. The program targets
                two groups:
              </motion.p>

              <ol className="mt-8 flex flex-col gap-4">
                {["New students.", "Enrolled students."].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.08,
                      ease: EASE,
                    }}
                  >
                    <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                      {i + 1}.
                    </span>
                    <span className="font-poppins text-[15px] font-light leading-[1.85] text-[#1D2D44]/70">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              whileHover={{ y: -8 }}
            >
              <ImagePlaceholder label="Scholarship Bridging Grant" />
            </motion.div>
          </div>
        </section>

        {/* ── Eligibility Criteria ───────────────────────────────────── */}
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
              <SectionHead title="First: Eligibility Criteria" />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9">
              <motion.ul
                className="max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                {ELIGIBILITY.map((item, i) => (
                  <li
                    key={i}
                    className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                  >
                    <Mark />
                    <span>
                      {typeof item === "string" ? item : item.text}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* ── Required Documents ─────────────────────────────────────── */}
        <section className="relative bg-white py-20 sm:py-28">
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
            <div className="lg:col-span-4 xl:col-span-3">
              <SectionHead title="Second: Required Documents" />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9">
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
                      <ul className="mt-4 flex flex-col gap-3 pl-8">
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

        {/* ── Financial Benefits ───────────────────────────────────────── */}
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
              <SectionHead title="Third: Financial Benefits" />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9">
              <motion.ul
                className="max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                {FINANCIAL_BENEFITS.map((item, i) => (
                  <li
                    key={i}
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

        {/* ── Application Submission ───────────────────────────────────── */}
        <section className="relative bg-white py-20 sm:py-28">
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
            <div className="lg:col-span-4 xl:col-span-3">
              <SectionHead title="Fourth: Application Submission" />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9">
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                <div className="border-y border-[#1D2D44]/10">
                  <div className="group flex flex-wrap items-center gap-x-5 gap-y-2 py-5">
                    <span className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-[#7DC0F1] transition-colors duration-300 group-hover:bg-[#EC601B]" />
                      <span className="font-poppins text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EC601B]">
                        Application Window
                      </span>
                    </span>
                    <span className="font-poppins text-[18px] font-semibold text-[#1D2D44]">
                      March 1 &ndash; May 31
                    </span>
                  </div>
                  <div className="border-t border-[#1D2D44]/10 py-5">
                    <span className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/70">
                      Results will be announced in{" "}
                      <span className="font-semibold text-[#1D2D44]">
                        August
                      </span>
                      .
                    </span>
                  </div>
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
                  <span>
                    Only applications that are submitted through the application
                    link will be considered.{" "}
                    <span className="inline-flex items-center rounded-full bg-[#1D2D44]/8 px-2.5 py-0.5 font-poppins text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1D2D44]/55">
                      Closed
                    </span>
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
                  For any inquiries, please reach out via email at:
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
