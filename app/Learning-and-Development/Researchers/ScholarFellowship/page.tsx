"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

      <main className="min-h-screen bg-white font-poppins selection:bg-[#EC601B] selection:text-white">
        {/* ─── Hero (unchanged) ──────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex h-[540px] items-center justify-start overflow-hidden bg-[#1D2D44]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/ScholarFellowship2.png"
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="scale-150 object-cover object-right translate-x-[12%]"
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
          </motion.div>

          <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-gradient-to-r from-[#EC601B] via-[#EC601B]/40 to-transparent" />

          <motion.div
            className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12"
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

            <div className="overflow-hidden pb-1">
              <motion.h1
                className="font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl [text-shadow:_2px_2px_20px_rgba(0,0,0,0.45)]"
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              >
                Scholar Fellowship
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

        {/* ─── Lead + Grants ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full opacity-[0.12]"
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
              The Kuwait Foundation for the Advancement of Sciences (KFAS)
              offers the following grants to support outstanding Kuwaiti
              researchers:
            </motion.p>

            <div className="mt-10 max-w-3xl border-t border-[#1D2D44]/10">
              {[
                {
                  title: "Postdoctoral Research",
                  body: "A grant for those holding a PhD to continue research in their specialized fields under the supervision of experts or academic/research institutions.",
                },
                {
                  title: "Research Internship",
                  body: "A fellowship for conducting research or gaining experience in using advanced research techniques.",
                },
              ].map((grant, i) => (
                <motion.div
                  key={grant.title}
                  className="group relative border-b border-[#1D2D44]/10 py-8 pl-7"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                >
                  <span className="absolute left-0 top-9 h-7 w-[3px] rounded-full bg-[#EC601B] transition-all duration-500 group-hover:h-[calc(100%-3.5rem)]" />
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
              <SectionHead title="Eligibility Criteria" />
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
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    1.
                  </span>
                  Kuwaiti nationals.
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    2.
                  </span>
                  No more than 45 years of age at the time of submitting the
                  application.
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    3.
                  </span>
                  Have obtained their most recent academic degree within three
                  years before the application date.
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    4.
                  </span>
                  <span>
                    The fellowship must be related to the applicant&apos;s
                    academic field and falls within Science, Technology, and
                    Innovation (STI) domains. To view the fields, please{" "}
                    <a
                      href="/image/KFAS strategy 2025-2029 - Priority Areas.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      click here
                    </a>
                    .
                  </span>
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    5.
                  </span>
                  <span>
                    The applicant must have received an acceptance letter from a
                    university, research/academic institution or company
                    involved in scientific research and innovation. Provided
                    that the institution is ranked among the top 200 globally
                    according to{" "}
                    <a
                      href="https://www.timeshighereducation.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      Times Higher Education home
                    </a>{" "}
                    or U.S. News &amp; World Report.
                  </span>
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    6.
                  </span>
                  If approved, applicant must provide an official leave letter
                  from his/her employer (if applicable).
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <span className="w-5 shrink-0 font-poppins text-[15px] font-semibold tabular-nums text-[#EC601B]">
                    7.
                  </span>
                  Specific Eligibility Criteria
                </li>
              </motion.ul>

              <div className="mt-6 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-10 pl-9 md:grid-cols-2">
                {[
                  {
                    title: "7.1 Postdoctoral Research:",
                    items: [
                      "The applicant must have obtained a Ph.D. degree or its equivalent.",
                      "The duration must not be less than 6 months and not more than 12 months.",
                    ],
                  },
                  {
                    title: "7.2 Research Internship:",
                    items: [
                      "Must hold a bachelor's or master's degree.",
                      "The duration must not be less than 3 months and not more than 6 months.",
                    ],
                  },
                ].map((block, i) => (
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
              <SectionHead title="Required Documents" />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9">
              <motion.ul
                className="max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                {[
                  'Recent copy of the civil ID through the "Kuwait Mobile ID" app.',
                  "Updated Curriculum Vitae.",
                  "An acceptance letter from the university or academic/research institution or company, specifying the fellowship duration (start and end date).",
                  "All academic degrees and transcripts must be authenticated by the Ministry of Higher Education.",
                  "Personal Statement – minimum 200 words.",
                ].map((doc) => (
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
              <SectionHead title="Financial Benefits" />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9">
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                <p className="font-poppins text-[15px] font-medium text-[#1D2D44]">
                  Monthly Allowance per table below:
                </p>

                <div className="mt-5 overflow-hidden border border-[#1D2D44]/12 bg-white shadow-[0_24px_60px_-40px_rgba(29,45,68,0.45)]">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-[#1D2D44]">
                        <th className="border-b-[3px] border-[#7DC0F1] px-5 py-4 font-poppins text-[12px] font-semibold uppercase tracking-[0.12em] text-white sm:px-7">
                          Fellowship Type
                        </th>
                        <th className="border-b-[3px] border-[#7DC0F1] px-5 py-4 font-poppins text-[12px] font-semibold uppercase tracking-[0.12em] text-white sm:px-7">
                          Monthly Allowance*
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Postdoctoral Research", "KD 2,000"],
                        ["Research Internship", "KD 1,200"],
                      ].map(([type, amount]) => (
                        <tr
                          key={type}
                          className="border-t border-[#1D2D44]/10 transition-colors hover:bg-[#7DC0F1]/10"
                        >
                          <td className="px-5 py-5 font-poppins text-[15px] font-medium text-[#1D2D44] sm:px-7">
                            {type}
                          </td>
                          <td className="px-5 py-5 font-poppins text-[16px] font-semibold text-[#EC601B] sm:px-7">
                            {amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 font-poppins text-[12.5px] font-light italic text-[#1D2D44]/55">
                  *Only for the grant duration
                </p>
              </motion.div>

              <motion.ul
                className="mt-12 max-w-3xl divide-y divide-[#1D2D44]/8"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              >
                {[
                  "A flight ticket allowance for one round-trip economy-class ticket to the fellowship location.",
                  "Travel insurance.",
                  "Applicants must declare if they receive funding for the same fellowship from another source. KFAS will cover the difference.",
                ].map((item) => (
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
              <SectionHead title="Application Submission" />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-[#7DC0F1]/40 lg:pl-12 xl:col-span-9">
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              >
                <p className="font-poppins text-[15px] font-medium text-[#1D2D44]">
                  Applications are open twice a year:
                </p>
                <div className="mt-5 border-y border-[#1D2D44]/10">
                  {[
                    { cycle: "Cycle 1", window: "April 1 – May 31" },
                    { cycle: "Cycle 2", window: "October 1 – November 30" },
                  ].map((c, i) => (
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
                  If the applicant does not submit the required documents within
                  two weeks from the date of notification by KFAS, the
                  application is considered declined and must be resubmitted.
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  Application process will take up to 60 working days after
                  application window closure.
                </li>
                <li className="group/li flex items-start gap-4 py-4 font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/70">
                  <Mark />
                  <span>
                    For applying, please{" "}
                    <a
                      href="https://apply.kfas.org.kw/FormDetails/Index?Id=195263e4-b3f6-f011-8406-6045bd6a4103"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      click here
                    </a>
                    . Only applications that are submitted through the
                    application link will be considered.
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
