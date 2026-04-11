"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <motion.div {...fadeUp(0)}>
      <h2
        className={`font-poppins text-2xl sm:text-3xl font-semibold leading-tight tracking-tight ${light ? "text-white" : "text-[#1D2D44]"}`}
      >
        {children}
      </h2>
      <div
        className={`mt-5 h-px origin-left bg-gradient-to-r ${light ? "from-[#EC601B]/70 via-white/20 to-transparent" : "from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"}`}
      />
    </motion.div>
  );
}

const focusAreas = [
  "Health-related infrastructures",
  "General Science infrastructures",
  "Engineering infrastructures",
  "Future Economies",
];

const documents = [
  {
    label: "RIG Proposal Template",
    href: "https://kfas.sharepoint.com/:w:/g/IQDcdCil0djoQ4u0Et7ait4-AXDquE-z_lMQheiMMDs4pvE?e=wRrIux",
  },
  {
    label: "RIG Letter of Intent Sample",
    href: "https://kfas.sharepoint.com/:w:/g/IQBE5Pe5xj0kTK7vhkYRBiXnAcc26lBv17tZdUR88wnKcpg?e=XLADNz",
  },
  {
    label: "KFAS Code of Research Conduct",
    href: "https://kfas.sharepoint.com/:b:/g/EUD_9NsPmaNNugiff4w2ASIBjuzNAair1Om3_rCPUh9ppQ?e=bJ40gj",
  },
  {
    label: "KFAS Intellectual Property (IP) Policy",
    href: "https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2FKFAS%20IP%20Policy%20%2D%202024%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS&p=true&ga=1",
  },
];

export default function RigPage() {
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
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative flex h-[60vh] min-h-[420px] items-end justify-start overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/RIGbanner2.png"
              alt="Researchers collaborating in a laboratory"
              fill
              priority
              sizes="100vw"
              className="scale-105 object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
              aria-hidden
            />
          </motion.div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-14 pt-28 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>Research</span>
              <span className="text-white/25">/</span>
              <Link
                href="/research/grants"
                className="hover:text-white transition-colors"
              >
                Grants
              </Link>
              <span className="text-white/25">/</span>
              <span>RIG</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                RIG
              </motion.h1>
            </div>
            <motion.div
              className="mt-5 h-[3px] w-[72px] rounded-full origin-left bg-[#EC601B]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ── */}
        <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <motion.div className="w-full" {...fadeUp(0)}>
              <h2 className="font-poppins text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-[#1D2D44]">
                Research Infrastructure Grants
              </h2>
              <motion.div
                className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              />
              <div className="mt-7 space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
                <p>
                  The Kuwait Foundation for the Advancement of Sciences (KFAS)
                  provides grants for research infrastructure proposals. The
                  Research Infrastructure Grant (RIG) will support and invest in
                  public research centers and laboratories in Kuwait, in an aim
                  to maximize their impact on the scientific community and
                  strengthen their alignment with the global research ecosystem
                  standards.
                </p>
                <p>
                  All submitted proposals by the public institutions in Kuwait,
                  should focus on strengthening research infrastructure by
                  enabling the acquisition of cutting-edge equipment and
                  enhancing institutional research capabilities to advance
                  scientific fields.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2026 Call ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-12 bg-[#BBDEFB40]">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>
              KFAS 2026 Call for Research Infrastructure Grant Proposals
            </SectionHeading>
            <div className="mt-8 space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
              <motion.div {...fadeUp(0.05)}>
                <p>
                  For the 2026 First Call for Research Infrastructure Grant
                  Proposals (RIG), the Kuwait Foundation for the Advancement of
                  Sciences (KFAS) invites competitive proposals to be submitted
                  starting from February 1st 2026 to May 1st 2026.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <p>
                  The call can be accessed and downloaded from the link below:
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.15)}>
                <a
                  href="https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2F2026%2FResearch%20Infrastructure%20Grants%202026%20Final%201%20Feb%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS%2F2026&p=true&ga=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3"
                >
                  <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
                  <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
                    KFAS Call for Research Infrastructure Grant Proposals
                  </span>
                  <svg
                    className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0"
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
                </a>
              </motion.div>
              <motion.div {...fadeUp(0.2)}>
                <p className="border-l-2 border-[#EC601B]/40 pl-4 pt-1 text-[#1D2D44]/75">
                  <span className="font-semibold text-[#1D2D44]">Note:</span>{" "}
                  Only applications that are submitted via email to{" "}
                  <a
                    href="mailto:research@kfas.org.kw"
                    className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40"
                  >
                    research@kfas.org.kw
                  </a>{" "}
                  are accepted.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Focus Areas ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>Focus Areas and Domains:</SectionHeading>
            <motion.div {...fadeUp(0.05)}>
              <p className="mt-7 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
                The Kuwait Foundation for the Advancement of Sciences (KFAS)
                invites proposals that advance Kuwait&apos;s research
                infrastructure within the following priority domains:
              </p>
            </motion.div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {focusAreas.map((label, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-start gap-3 border border-[#7DC0F1]/30 bg-[#BBDEFB]/10 p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <p className="font-poppins text-[13px] font-medium leading-snug text-[#1D2D44]">
                    {label}
                  </p>
                  <div className="mt-auto h-[2px] w-6 bg-[#EC601B]" />
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)}>
              <p className="mt-7 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
                All submitted proposals should demonstrate how the proposed
                infrastructure will elevate research capacity, catalyze
                innovation, and enable impactful scientific and technological
                advancement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Proposal Submissions ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-12 bg-[#BBDEFB40]">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>Proposal Submissions:</SectionHeading>
            <div className="mt-8 space-y-5 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
              <motion.div {...fadeUp(0.05)}>
                <p>
                  All proposals must be submitted by the Principal Researchers,
                  who are the individuals responsible for managing and
                  overseeing research laboratories or centers and who hold
                  official administrative titles, acting on behalf of their
                  respective entities.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <p>
                  The following,{" "}
                  <a
                    href="https://kfas.sharepoint.com/:w:/g/IQDcdCil0djoQ4u0Et7ait4-AXDquE-z_lMQheiMMDs4pvE?e=wRrIux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
                  >
                    RIG Proposal Form Template
                  </a>
                  , must be completed and submitted via email to{" "}
                  <a
                    href="mailto:research@kfas.org.kw"
                    className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
                  >
                    research@kfas.org.kw
                  </a>
                  . All necessary details are included in the template for your
                  reference.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.15)}>
                <p>
                  A Letter of Intent:{" "}
                  <a
                    href="https://kfas.sharepoint.com/:w:/g/IQBE5Pe5xj0kTK7vhkYRBiXnAcc26lBv17tZdUR88wnKcpg?e=XLADNz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
                  >
                    RIG Letter of Intent Sample
                  </a>{" "}
                  from the applicant&apos;s institution/organization issued by
                  the assigned authority, indicating the approval to submit the
                  proposal to KFAS is required with the submission.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.2)}>
                <p>
                  Proposals are strongly encouraged to set short- to medium-term
                  objectives and are expected to be implemented within five
                  years of the award date.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Eligibility ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>
              General Eligibility for Proposal Submissions:
            </SectionHeading>
            <motion.div {...fadeUp(0.05)}>
              <p className="mt-7 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
                All institutions applying for the Research Infrastructure Grant
                must meet the following eligibility requirements:
              </p>
            </motion.div>
            <ol className="mt-8 space-y-5">
              {[
                <>Must be based in Kuwait at a Public Institution.</>,
                <>
                  Must Submit proposals via e-mail to (
                  <a
                    href="mailto:research@kfas.org.kw"
                    className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40"
                  >
                    research@kfas.org.kw
                  </a>
                  ); manual submissions will not be accepted.
                </>,
                <>
                  Provide a Letter of intent from the applying institution
                  indicating:
                  <ul className="mt-3 space-y-2 pl-2">
                    {[
                      "Commitment to co-funding and ongoing maintenance of the infrastructure.",
                      "Evidence of existing laboratory facilities and/or designated areas to host the proposed infrastructure.",
                    ].map((sub, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7DC0F1]" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </>,
                <>
                  Demonstrate a strong researchers track record among faculty
                  members and/or researchers within the institution that
                  demonstrates their capacity to effectively utilize the
                  requested equipment in the proposed research area.
                </>,
                <>
                  Ensure the requested infrastructure supports research that
                  meets high standards of excellence and has the potential of
                  generating high quality, impactful outputs.
                </>,
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex gap-5 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-[#7DC0F1]/20 font-poppins text-xs font-bold text-[#1D2D44]">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">{item}</div>
                </motion.li>
              ))}
            </ol>
            <motion.div {...fadeUp(0.2)}>
              <p className="mt-8 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/50 font-light">
                Any application missing major requirements by the closing date
                of the cycle will be marked as incomplete and consequently
                declined.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Important Information — navy ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-12 bg-[#1D2D44]">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading light>Important Information:</SectionHeading>
            <ul className="mt-8 space-y-5">
              {[
                "A Letter of Intent from the applicant's institution/organization issued by the assigned authority, indicating the approval to submit the proposal to KFAS is required.",
                "All proposals that pass KFAS' initial internal screening will be evaluated by external peer reviewers and will subsequently undergo a binary review (decline or approval).",
                "Applicant Institution should be committed to providing an environment that upholds research ethics of transparency, accountability, and auditability, including rules that govern KFAS's Intellectual Property (IP) Policy.",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-4 font-poppins text-[15px] leading-[1.9] text-white/65 font-light"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7DC0F1]" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div {...fadeUp(0.25)}>
              <p className="mt-8 font-poppins text-[15px] leading-[1.9] text-white/40 font-light">
                Applicants (Principal Researchers, who hold official
                administrative titles) are strongly encouraged to submit their
                applications early in the call announcement period to ensure
                sufficient time for resolving any missing documentation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Documents ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>Application Related Documents:</SectionHeading>
            <motion.div {...fadeUp(0.05)}>
              <p className="mt-7 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
                All details, conditions and information on the scope of funding
                and proposal requirements can be found in the following
                attachments:
              </p>
            </motion.div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {documents.map((doc, i) => (
                <motion.a
                  key={doc.label}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-[#1D2D44]/08 p-5 transition-all hover:bg-[#BBDEFB]/20"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#7DC0F1]/15">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M4 2h6l4 4v8H4V2z"
                          stroke="#56A0D7"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 2v4h4"
                          stroke="#56A0D7"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6 9h4M6 11.5h2.5"
                          stroke="#56A0D7"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="font-poppins text-[14px] font-medium text-[#1D2D44]">
                      {doc.label}
                    </span>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0 opacity-20 transition-opacity group-hover:opacity-100"
                  >
                    <path
                      d="M2 7h10M7 2l5 5-5 5"
                      stroke="#EC601B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              ))}
            </div>
            <motion.div {...fadeUp(0.2)}>
              <p className="mt-7 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
                It is the responsibility of the applicant and the
                applicant&apos;s institution to ensure that they read,
                understand, and adhere to the application requirements and all
                KFAS guidelines, rules, and regulations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-16 lg:px-12 border-t border-[#1D2D44]/08">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>Contact Us:</SectionHeading>
            <div className="mt-8 space-y-3 font-poppins text-[15px] text-[#1D2D44]/65 font-light">
              <motion.div {...fadeUp(0.05)}>
                <p>
                  If you have any inquiries, please email us at:{" "}
                  <a
                    href="mailto:research@kfas.org.kw"
                    className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
                  >
                    research@kfas.org.kw
                  </a>
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <p>
                  Telephone:{" "}
                  <a
                    href="tel:+96522278125"
                    className="font-medium text-[#1D2D44] hover:text-[#EC601B] transition-colors"
                  >
                    (+965) 22278125
                  </a>{" "}
                  or{" "}
                  <a
                    href="tel:+96522278126"
                    className="font-medium text-[#1D2D44] hover:text-[#EC601B] transition-colors"
                  >
                    22278126
                  </a>
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.15)}>
                <p className="pt-2 text-[#1D2D44]/45">
                  KFAS decisions regarding research grants are final and not
                  subject to appeal.
                </p>
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
