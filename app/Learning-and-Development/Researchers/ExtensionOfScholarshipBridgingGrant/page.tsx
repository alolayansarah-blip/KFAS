"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

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
    <span className="mt-[13px] h-px w-3.5 shrink-0 bg-[#EC601B] transition-all duration-300 group-hover/li:w-6" />
  );
}

const ELIGIBILITY = [
  "Enrolled in a KFAS-sponsored PhD program at the same university and in the same major approved by KFAS.",
  "If any, courses taken during the extension must be core and required for graduation.",
  "The university must be ranked the top 10 global universities (general or by major) according to the following rankings: Times Higher Education, US News & World Report, QS World University Rankings.",
  "However, this requirement is waived for those who have published a scientific paper related to their thesis/dissertation in a journal ranked in the top 25% (Q1) according to the Journal Citation Reports, during the academic year funded by KFAS.",
];

type DocumentItem = string | { text: ReactNode };

const REQUIRED_DOCUMENTS: DocumentItem[] = [
  "A letter from the academic supervisor detailing the applicant\u2019s academic performance and status, reasons for the extension request, and a study plan for the extension period.",
  "If applicable, a letter from the university confirming that courses registered during the extension are core and required for graduation.",
  "If applicable, a copy of the published scientific paper in a scholarly journal.",
  {
    text: (
      <>
        Certificate of &quot;To Whom It May Concern&quot; from the{" "}
        <a
          href="https://eservice.pifss.gov.kw/default.aspx?ReturnUrl=%2f"
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Public Institution for Social Security
        </a>{" "}
        website.
      </>
    ),
  },
  "If the applicant is employed, an updated study leave must confirm that the applicant is on full leave.",
  'Letter "To Whom it May Concern" issued by the relevant Kuwait Cultural Office.',
  "Must declare if the applicant receives funding for the PhD program from another source.",
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ExtensionOfScholarshipBridgingGrantPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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
              src="/image/extensionss.png"
              alt="Extension of scholarship bridging grant for researchers"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-125 object-cover object-[center_18%]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.72) 0%, rgba(29,45,68,0.38) 42%, rgba(29,45,68,0.10) 68%, transparent 100%)",
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
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
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
              <Link
                href="/Learning-and-Development/Researchers"
                className="text-white/80 transition-colors hover:text-white"
              >
                Researchers
              </Link>
            </motion.div>

            <div className="overflow-hidden pb-[0.12em]">
              <motion.h1
                className="font-poppins text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl [text-shadow:_2px_2px_20px_rgba(0,0,0,0.45)]"
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              >
                Extension of Scholarship
                <br />
                Bridging Grant
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
              Recipients of the KFAS Scholarship Bridging Grant who require
              additional time for their studies may submit a request for an
              extension. The extension period shall not exceed six months and,
              if approved, will be considered the final extension granted under
              this award. And the student is responsible to pay the remaining
              tuition fees beyond the six months.
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
                  src="/image/Extension2.jpeg"
                  alt="Extension of scholarship bridging grant for graduate students"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
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
                    {item}
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
                {REQUIRED_DOCUMENTS.map((item, i) => (
                  <li
                    key={i}
                    className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70"
                  >
                    <Mark />
                    {typeof item === "string" ? item : item.text}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* ── Application Submission ───────────────────────────────────── */}
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
                  Submit the extension request at least 3 months before the KFAS
                  grant ends.
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  <span>
                    Only applications that are submitted through the application
                    link: Please{" "}
                    <a
                      href="https://www.kfas.org/Offerings/Student/Extension-of-Scholarship-Bridging-Grant"
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
