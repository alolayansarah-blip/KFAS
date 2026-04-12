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
        className={`mt-5 h-px bg-gradient-to-r ${light ? "from-[#EC601B]/70 via-white/20 to-transparent" : "from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"}`}
      />
    </motion.div>
  );
}

function CtaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3"
    >
      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
        {children}
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
  );
}

const focusAreas = [
  "Health",
  "STEAM Education",
  "Energy",
  "Environment",
  "Food & Water Security",
  "Future Economies",
] as const;

const attachmentItems = [
  {
    label: "KFAS 2026 First Call for Research Proposals",
    href: "https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2F2025%2F1st%20CALL%20FOR%20PROPOSAL%202026%20%2D%20Final%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS%2F2025&p=true&ga=1",
  },
  {
    label: "KFAS Research Grant Manual",
    href: "https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2FKFAS%20Research%20Grant%20Manual%202020%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS&p=true&ga=1",
  },
  {
    label: "KFAS Code of Research Conduct",
    href: "https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2FKFAS%20Code%20for%20Research%20Conduct%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS&p=true&ga=1",
  },
  {
    label: "KFAS Intellectual Property (IP) Policy",
    href: "https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2FKFAS%20Intellectual%20Property%20%28IP%29%20Policy%20%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS&p=true&ga=1",
  },
  {
    label: "KFAS Young Researcher Grant Guidelines",
    href: "https://kfas-my.sharepoint.com/personal/fsbackup_kfas_org_kw/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Ffsbackup%5Fkfas%5Forg%5Fkw%2FDocuments%2FPublic%2FKFAS%20Young%20Researcher%20Grant%20Guidelines%2Epdf&parent=%2Fpersonal%2Ffsbackup%5Fkfas%5Forg%5Fkw%2FDocuments%2FPublic&ga=1",
  },
];

export default function YoungResearcherGrantsPage() {
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
              src="/image/YoungResearcherBanner.png"
              alt="Young researcher working with a microscope in a laboratory"
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover object-center"
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
              className="mb-5 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>Research</span>
              <span className="text-white/25">/</span>
              <Link
                href="/research/grants"
                className="transition-colors hover:text-white"
              >
                Grants
              </Link>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                Young Researcher Grants
              </motion.h1>
            </div>
            <motion.div
              className="mt-5 h-[3px] w-[72px] origin-left rounded-full bg-[#EC601B]"
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
                Young Researcher Grants
              </h2>
              <motion.div
                className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              />
              <div className="mt-7 space-y-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
                <p>
                  The Kuwait Foundation for the Advancement of Sciences (KFAS)
                  provides grants for Young Researchers. Young Researcher Grants
                  are aimed to promote and support students, working
                  professionals and researchers (non-Ph.D. holders) under the
                  age of 33 who are interested in leading applied or fundamental
                  research projects to help foster their research careers. These
                  grants should be implemented at local research or academic
                  institutions or entities. Individuals awarded these grants
                  should be under the supervision of a qualified mentor (holding
                  a PhD degree or equivalent) at these institutions or entities.{" "}
                  <span className="font-semibold text-[#1D2D44]">
                    Individuals with at least a bachelor&apos;s degree are
                    eligible to apply.
                  </span>
                </p>
                <p>
                  All submitted proposals should aim to generate solutions and
                  outcomes that advance a scientific field, promote innovative
                  approaches or methodologies, and support the development of
                  new technologies.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2026 Call ── */}
        <section className="bg-[#BBDEFB40] px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>
              KFAS 2026 First Call for Research Proposals for Applied,
              Fundamental, Policy and Young Researcher Proposals
            </SectionHeading>
            <div className="mt-8 space-y-5 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
              <motion.div {...fadeUp(0.05)}>
                <p>
                  The Kuwait Foundation for the Advancement of Sciences invites
                  competitive research proposals to be submitted starting on
                  the:
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <p className="font-semibold text-[#1D2D44]">
                  15th of January to 15th of April 2026, by midnight Kuwait
                  time.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.15)}>
                <CtaLink href="https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2F2025%2F1st%20CALL%20FOR%20PROPOSAL%202026%20%2D%20Final%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS%2F2025&p=true&ga=1">
                  KFAS 2026 First Call for Research Proposals
                </CtaLink>
              </motion.div>
              <motion.div {...fadeUp(0.2)}>
                <p className="border-l-2 border-[#EC601B]/40 pl-4 pt-1 text-[#1D2D44]/75">
                  Please note that only applications that are submitted through
                  the{" "}
                  <a
                    href="https://grants.kfas.org.kw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40"
                  >
                    KFAS Research Grants Management System
                  </a>{" "}
                  are accepted, as manual submission of proposals is not
                  accepted. Any application missing major requirements by the
                  closing date of the cycle will be marked as incomplete and
                  declined.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.25)}>
                <p>
                  It is recommended that researchers submit their application
                  early on the call announcement to ensure that there is
                  adequate time to complete the submission, should any
                  documentation be missing.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Focus Areas ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>Focus Areas and Domains:</SectionHeading>
            <div className="mt-7 space-y-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
              <motion.div {...fadeUp(0.05)}>
                <p>
                  All submitted proposals should aim to generate solutions and
                  outcomes that advance a scientific field, promote innovative
                  approaches or methodologies, or support the development of new
                  technologies and policy development.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <p>
                  In addition to the below specified research domains, KFAS
                  invites competitive proposals on general topics related to
                  science, technology and innovation (STI), however priority
                  will be given to the specified domains below:
                </p>
              </motion.div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
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
                    <span className="mr-1.5 tabular-nums text-[#EC601B]">
                      {i + 1}.
                    </span>
                    {label}
                  </p>
                  <div className="mt-auto h-[2px] w-6 bg-[#EC601B]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Funded Project Examples ── */}
        <section className="bg-[#BBDEFB40] px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>
              Funded Project Examples on KFAS Research Portal:
            </SectionHeading>
            <div className="mt-8 space-y-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
              <motion.div {...fadeUp(0.05)}>
                <p>
                  The KFAS Research Portal is a research information management
                  system that connects researchers and collaborators, showcasing
                  the expertise and ongoing projects of those working in
                  partnership with KFAS across various scholarly fields.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <p>
                  <Link
                    href="/technology-and-innovation/KFAS-Research-Portal"
                    className="font-semibold text-[#EC601B] underline decoration-[#EC601B]/40 underline-offset-[3px] transition-colors hover:text-[#d45510]"
                  >
                    KFAS Research Portal Link
                  </Link>
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.15)}>
                <p>
                  Visit the &apos;Projects and Impact&apos; section of the KFAS
                  Research Portal to discover a range of successful KFAS-funded
                  projects, both ongoing and completed, from Applied,
                  Fundamental, Policy, and Young Researcher grants.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Application Related Documents ── */}
        <section className="px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>Application Related Documents:</SectionHeading>
            <motion.div {...fadeUp(0.05)} className="mt-7">
              <p className="font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
                All details, conditions and information on the scope of funding
                and proposal requirements can be found in the following
                attachments:
              </p>
            </motion.div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {attachmentItems.map((doc, i) => (
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
            <div className="mt-8 space-y-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
              <motion.div {...fadeUp(0.2)}>
                <p>
                  In addition to the proposal submission, applicant is required
                  to do the following:
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.25)}>
                <p>
                  To upload, through the Grant Management System (GMS), a Letter
                  of Intent written by the institute/organization to which the
                  applicant is affiliated, indicating approval of submitting the
                  proposal to KFAS. (
                  <a
                    href="https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2FSample%20Letter%20of%20Intent%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS&p=true&ga=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
                  >
                    sample of letter of intent
                  </a>
                  ).
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.3)}>
                <p>
                  Failure to comply may result in noncompliance consequences for
                  both the applicant and their institution, including declining
                  proposal funding, as well as negatively impacting any future
                  funding requests.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Eligibility — navy ── */}
        <section className="bg-[#1D2D44] px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading light>
              General Eligibility for Proposal Submissions:
            </SectionHeading>
            <ul className="mt-8 space-y-5">
              {[
                <>
                  Researchers and scientists from the following sectors are
                  eligible to apply:
                  <ul className="mt-3 space-y-2 pl-2">
                    {[
                      "Research & Higher Education sector",
                      "Public/Governmental sector",
                      "Not-for-Profit Companies and Civil Society Organizations (CSOs)",
                    ].map((sub, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7DC0F1]" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </>,
                <>
                  <span className="font-semibold text-white">
                    Individuals with at least a bachelor&apos;s degree (less than
                    33 years of age), are eligible to apply
                  </span>{" "}
                  under the supervision of a qualified mentor (holding a PhD
                  degree or equivalent) at local institutions or entities.
                </>,
                "Applicants must ensure that a letter of intent is submitted with their proposals.",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-4 font-poppins text-[15px] font-light leading-[1.9] text-white/65"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7DC0F1]" />
                  <div className="min-w-0 flex-1">{item}</div>
                </motion.li>
              ))}
            </ul>
            <motion.div {...fadeUp(0.25)} className="mt-8">
              <p className="font-poppins text-[15px] font-light leading-[1.9] text-white/40">
                Applicants are strongly encouraged to review all criteria and
                ensure eligibility, prior to proposal submission.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Grant Application Portal ── */}
        <section className="border-t border-[#1D2D44]/08 px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>Grant Application Portal:</SectionHeading>
            <div className="mt-8 space-y-4 font-poppins text-[15px] font-light leading-[1.9] text-[#1D2D44]/65">
              <motion.div {...fadeUp(0.05)}>
                <p>
                  All applications must be submitted online through the{" "}
                  <a
                    href="https://grants.kfas.org.kw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
                  >
                    KFAS Research Grants Management System
                  </a>
                  .
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <p>
                  If you are new to the portal, start with the following clip
                  for instructions on applying. Click below for the KFAS
                  Research Grants Management System tutorial.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.15)}>
                <CtaLink href="https://kfas.sharepoint.com/sites/GrantsSystemTraining/_layouts/15/stream.aspx?id=%2Fsites%2FGrantsSystemTraining%2FShared%20Documents%2FGeneral%2FApplicant%20portal%2Emp4&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E9d47ccc4%2Df151%2D4ffe%2Dadda%2D65d3a3ac7138">
                  GMS Tutorial
                </CtaLink>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="border-t border-[#1D2D44]/08 px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading>Contact Us:</SectionHeading>
            <div className="mt-8 space-y-3 font-poppins text-[15px] font-light text-[#1D2D44]/65">
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
                    className="font-medium text-[#1D2D44] transition-colors hover:text-[#EC601B]"
                  >
                    (+965) 22278125
                  </a>{" "}
                  or{" "}
                  <a
                    href="tel:+96522278126"
                    className="font-medium text-[#1D2D44] transition-colors hover:text-[#EC601B]"
                  >
                    22278126
                  </a>
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.15)}>
                <p className="pt-2 text-[#1D2D44]/45">
                  KFAS decisions regarding research grants are final, and not
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
