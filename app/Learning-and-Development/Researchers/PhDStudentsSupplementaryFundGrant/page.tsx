"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

type EligibilityItem =
  | string
  | { text: ReactNode }
  | { label: string; sub: (string | { text: ReactNode })[] };

const ELIGIBILITY: EligibilityItem[] = [
  "Kuwaiti nationals.",
  {
    text: (
      <>
        The major must be within the Science, Technology, and Innovation (STI)
        domains (
        <a
          href={STI_DOMAINS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          View the list
        </a>
        )
      </>
    ),
  },
  "Must be a PhD candidate and have passed the qualification stages for obtaining the PhD.",
  "Cumulative Bachelor GPA must not be less than 3.5 (4.0 scale) or a minimum of Upper second class, according to the UK system. Or their equivalent in other systems assessed by KFAS.",
  "For medical specialties, the cumulative Bachelor GPA must not be less than 3.33 (4.0 scale), or Lower second-class according to the UK system. Or their equivalent in other systems assessed by KFAS.",
  {
    label: "The applicant must be enrolled full-time:",
    sub: [
      "Local public university in Kuwait",
      {
        text: (
          <div>
            <span>
              Or; At a university abroad, ranked among the top 200 globally.
            </span>
            <p className="mt-2 font-poppins text-[13px] font-light italic leading-[1.7] text-[#1D2D44]/55">
              according to{" "}
              <a
                href="https://www.timeshighereducation.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${inlineLink} not-italic`}
              >
                Times Higher Education
              </a>
            </p>
          </div>
        ),
      },
    ],
  },
];

type DocumentItem =
  | string
  | { text: ReactNode }
  | { label: string; sub: string[] };

const REQUIRED_DOCUMENTS: DocumentItem[] = [
  'Recent copy of the civil ID through the "Kuwait Mobile ID" app.',
  "Updated curriculum vitae.",
  "All academic certificates and transcripts (Bachelor\u2019s and Master\u2019s) must be certified by the Ministry of Higher Education (MOHE) (if applicable).",
  "Letter of Intent addressed to KFAS confirming the applicant\u2019s status as a PhD candidate and that their dissertation proposal has been approved. It must be signed by a senior university official, such as the President, Dean of the College, Head of Academic Affairs, or an equivalent authority.",
  "Research Proposal: Must adhere to the KFAS template and signed by the applicant\u2019s academic supervisor.",
  {
    text: (
      <>
        Click here for the{" "}
        <a
          href={PHD_TEMPLATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          KFAS PhD Supplementary Fund Template
        </a>
        .
      </>
    ),
  },
  "A non-disclosure agreement or proof of collaboration with international institutes/researchers. (If applicable)",
  {
    label: "For local PhD candidates (studying in Kuwait):",
    sub: ["The applicant\u2019s acceptance or enrollment documents."],
  },
  {
    label: "For PhD candidates studying abroad:",
    sub: [
      "To Whom It May Concern letter from the KCO, confirming the applicant\u2019s current enrolment status in the stated university.",
      "A letter from the PhD scholarship sponsor, approving the applicant\u2019s application for the fund (if available).",
    ],
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function PhDStudentsSupplementaryFundGrantPage() {
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
                PhD Students Supplementary Fund Grant
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
            <motion.p
              className="font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70 sm:text-[16px]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              This program is designed to support Kuwaiti PhD candidates enrolled
              at local or internationally recognized universities by providing
              supplementary funding to help them complete their doctoral research
              successfully. The Supplementary Grant provides valuable support for
              research-related expenses, enabling students to focus on delivering
              high-quality scientific work during their postgraduate studies. The
              grant covers essential research costs such as tools, equipment,
              consumables, specialized software, laboratory analysis fees, and
              other similar needs directly related to the student&rsquo;s PhD
              research. Please note that the grant does not cover tuition fees,
              salaries, or personal benefits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              whileHover={{ y: -8 }}
            >
              <ImagePlaceholder label="PhD Students Supplementary Fund Grant" />
            </motion.div>
          </div>
        </section>

        {/* ── Grant amount ───────────────────────────────────────────── */}
        <section
          className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12"
          style={{ background: "#7DC0F1" }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:gap-12 lg:text-left">
            <motion.p
              className="max-w-[42ch] font-poppins text-[1.25rem] font-semibold leading-[1.35] tracking-tight text-white sm:text-[1.5rem]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              The grant amount is a maximum of 10,000 KWD or its equivalent
              amount in other currencies.
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
              (View the eligible items covered by the grant)
            </motion.a>
          </div>
        </section>

        {/* ── Eligibility Criteria ───────────────────────────────────── */}
        <section className="relative bg-white py-20 sm:py-28">
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
                      <ul className="mt-4 flex flex-col gap-3 pl-8">
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

        {/* ── Application Submission ───────────────────────────────────── */}
        <section className="relative bg-white py-20 sm:py-28">
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
            <div className="lg:col-span-4 xl:col-span-3">
              <SectionHead title="Third: Application Submission" />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9">
              <motion.ul
                className="max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  Applications are open all year-round.
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  If the applicant does not submit the required documents within
                  two weeks from the date of notification by KFAS, the
                  application is considered declined and must be resubmitted.
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  Application process will take up to 60 working days after
                  application submission.
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  <span>
                    Only applications that are submitted through the application
                    link{" "}
                    <a
                      href={APPLICATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      click here
                    </a>{" "}
                    will be considered.
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
                  For any inquiries, please contact:
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
