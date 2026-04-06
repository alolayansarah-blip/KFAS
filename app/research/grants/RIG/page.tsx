"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BRAND = {
  blue: "#56A0D7",
  orange: "#EC601B",
  lightBlue: "#BBDEFB",
  navy: "#1D2D44",
};

const GRADIENT_OVERLAY =
  "linear-gradient(to bottom, rgba(29,45,68,0.35) 0%, rgba(29,45,68,0.45) 50%, rgba(29,45,68,0.6) 100%)";

const HERO_TITLE_TRANSITION = {
  duration: 0.7,
  delay: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

const ACCENT_LINE_TRANSITION = {
  duration: 0.8,
  delay: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <motion.div {...fadeUp(0)}>
    <h2
      className="font-poppins text-[1.45rem] font-semibold leading-snug tracking-tight sm:text-[1.7rem]"
      style={{ color: BRAND.navy }}
    >
      {children}
    </h2>
    <div className="mt-3 h-[2px] w-10" style={{ background: BRAND.orange }} />
  </motion.div>
);

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
      <main className="min-h-screen bg-white pt-20 font-poppins">

        {/* ── HERO — completely original, untouched ── */}
        <section
          ref={heroRef}
          className="relative flex h-[55vh] items-end justify-start overflow-hidden"
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
              style={{ background: GRADIENT_OVERLAY }}
              aria-hidden
            />
          </motion.div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-4 inline-flex flex-wrap items-center gap-2 text-xs tracking-[0.3em] text-white/70 sm:text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-white/60">Research</span>
              <span className="text-white/40">/</span>
              <Link
                href="/research/grants"
                className="text-white/60 transition-colors hover:text-white"
              >
                Grants
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white/60">RIG</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={HERO_TITLE_TRANSITION}
              >
                RIG
              </motion.h1>
            </div>

            <motion.div
              className="mt-6 h-[2px] origin-left bg-[#EC601B]"
              style={{ width: 80 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={ACCENT_LINE_TRANSITION}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── OVERVIEW ── */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1024px]">
            <motion.div className="max-w-3xl" {...fadeUp(0)}>
              <h2
                className="font-poppins text-[1.45rem] font-semibold leading-snug tracking-tight sm:text-[1.7rem]"
                style={{ color: BRAND.navy }}
              >
                Research Infrastructure Grants
              </h2>
              <div className="mt-3 h-[2px] w-10" style={{ background: BRAND.orange }} />
              <div
                className="mt-6 space-y-4 font-poppins text-sm leading-[1.9] sm:text-[15px]"
                style={{ color: `${BRAND.navy}BF` }}
              >
                <p>
                  The Kuwait Foundation for the Advancement of Sciences (KFAS)
                  provides grants for research infrastructure proposals. The
                  Research Infrastructure Grant (RIG) will support and invest
                  in public research centers and laboratories in Kuwait, in an aim
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

        {/* ── 2026 CALL ── */}
        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8" style={{ background: `${BRAND.lightBlue}25` }}>
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>
              KFAS 2026 Call for Research Infrastructure Grant Proposals
            </SectionHeading>
            <div
              className="mt-8 space-y-4 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
            >
              <motion.p {...fadeUp(0.05)}>
                For the 2026 First Call for Research Infrastructure Grant
                Proposals (RIG), the Kuwait Foundation for the Advancement of
                Sciences (KFAS) invites competitive proposals to be submitted
                starting from February 1st 2026 to May 1st 2026.
              </motion.p>
              <motion.p {...fadeUp(0.1)}>
                The call can be accessed and downloaded from the link below:
              </motion.p>
              <motion.p {...fadeUp(0.15)}>
                <a
                  href="https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2F2026%2FResearch%20Infrastructure%20Grants%202026%20Final%201%20Feb%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS%2F2026&p=true&ga=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium transition-colors hover:opacity-80"
                  style={{ color: BRAND.orange }}
                >
                  KFAS Call for Research Infrastructure Grant Proposals
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke={BRAND.orange} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.p>
              <motion.p
                className="border-l-2 pl-4 pt-1"
                style={{ borderColor: `${BRAND.orange}60`, color: `${BRAND.navy}CC` }}
                {...fadeUp(0.2)}
              >
                <span className="font-semibold" style={{ color: BRAND.navy }}>Note:</span>{" "}
                Only applications that are submitted via email to{" "}
                <a
                  href="mailto:research@kfas.org.kw"
                  className="font-medium underline underline-offset-[3px]"
                  style={{ color: BRAND.orange, textDecorationColor: `${BRAND.orange}50` }}
                >
                  research@kfas.org.kw
                </a>{" "}
                are accepted.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── FOCUS AREAS ── */}
        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>Focus Areas and Domains:</SectionHeading>
            <motion.p
              className="mt-6 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
              {...fadeUp(0.05)}
            >
              The Kuwait Foundation for the Advancement of Sciences (KFAS)
              invites proposals that advance Kuwait&apos;s research
              infrastructure within the following priority domains:
            </motion.p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {focusAreas.map((label, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-start gap-3 border p-5"
                  style={{ borderColor: `${BRAND.blue}35`, background: `${BRAND.lightBlue}15` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <p className="font-poppins text-[13px] font-medium leading-snug" style={{ color: BRAND.navy }}>
                    {label}
                  </p>
                  <div className="mt-auto h-[2px] w-6" style={{ background: BRAND.orange }} />
                </motion.div>
              ))}
            </div>
            <motion.p
              className="mt-6 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
              {...fadeUp(0.2)}
            >
              All submitted proposals should demonstrate how the proposed
              infrastructure will elevate research capacity, catalyze
              innovation, and enable impactful scientific and technological
              advancement.
            </motion.p>
          </div>
        </section>

        {/* ── PROPOSAL SUBMISSIONS ── */}
        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8" style={{ background: `${BRAND.lightBlue}25` }}>
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>Proposal Submissions:</SectionHeading>
            <div
              className="mt-8 space-y-5 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
            >
              <motion.p {...fadeUp(0.05)}>
                All proposals must be submitted by the Principal Researchers,
                who are the individuals responsible for managing and overseeing
                research laboratories or centers and who hold official
                administrative titles, acting on behalf of their respective
                entities.
              </motion.p>
              <motion.p {...fadeUp(0.1)}>
                The following,{" "}
                <a
                  href="https://kfas.sharepoint.com/:w:/g/IQDcdCil0djoQ4u0Et7ait4-AXDquE-z_lMQheiMMDs4pvE?e=wRrIux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-[3px] transition-colors hover:opacity-80"
                  style={{ color: BRAND.orange, textDecorationColor: `${BRAND.orange}50` }}
                >
                  RIG Proposal Form Template
                </a>
                , must be completed and submitted via email to{" "}
                <a
                  href="mailto:research@kfas.org.kw"
                  className="font-medium underline underline-offset-[3px] transition-colors hover:opacity-80"
                  style={{ color: BRAND.orange, textDecorationColor: `${BRAND.orange}50` }}
                >
                  research@kfas.org.kw
                </a>
                . All necessary details are included in the template for your
                reference.
              </motion.p>
              <motion.p {...fadeUp(0.15)}>
                A Letter of Intent:{" "}
                <a
                  href="https://kfas.sharepoint.com/:w:/g/IQBE5Pe5xj0kTK7vhkYRBiXnAcc26lBv17tZdUR88wnKcpg?e=XLADNz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-[3px] transition-colors hover:opacity-80"
                  style={{ color: BRAND.orange, textDecorationColor: `${BRAND.orange}50` }}
                >
                  RIG Letter of Intent Sample
                </a>{" "}
                from the applicant&apos;s institution/organization issued by the
                assigned authority, indicating the approval to submit the
                proposal to KFAS is required with the submission.
              </motion.p>
              <motion.p {...fadeUp(0.2)}>
                Proposals are strongly encouraged to set short- to medium-term
                objectives and are expected to be implemented within five years
                of the award date.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── ELIGIBILITY ── */}
        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>General Eligibility for Proposal Submissions:</SectionHeading>
            <motion.p
              className="mt-6 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
              {...fadeUp(0.05)}
            >
              All institutions applying for the Research Infrastructure Grant
              must meet the following eligibility requirements:
            </motion.p>
            <ol className="mt-8 space-y-5">
              {[
                <>Must be based in Kuwait at a Public Institution.</>,
                <>
                  Must Submit proposals via e-mail to (
                  <a
                    href="mailto:research@kfas.org.kw"
                    className="font-medium underline underline-offset-[3px]"
                    style={{ color: BRAND.orange, textDecorationColor: `${BRAND.orange}50` }}
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
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BRAND.blue }} />
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
                  className="flex gap-5 font-poppins text-sm leading-[1.85] sm:text-[15px]"
                  style={{ color: `${BRAND.navy}BF` }}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-poppins text-xs font-bold text-white"
                    style={{ background: BRAND.blue }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">{item}</div>
                </motion.li>
              ))}
            </ol>
            <motion.p
              className="mt-8 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}99` }}
              {...fadeUp(0.2)}
            >
              Any application missing major requirements by the closing date
              of the cycle will be marked as incomplete and consequently
              declined.
            </motion.p>
          </div>
        </section>

        {/* ── IMPORTANT INFORMATION ── */}
        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8" style={{ background: BRAND.navy }}>
          <div className="mx-auto max-w-[1024px]">
            <motion.div {...fadeUp(0)}>
              <h2 className="font-poppins text-[1.45rem] font-semibold leading-snug tracking-tight text-white sm:text-[1.7rem]">
                Important Information:
              </h2>
              <div className="mt-3 h-[2px] w-10" style={{ background: BRAND.orange }} />
            </motion.div>
            <ul className="mt-8 space-y-5">
              {[
                "A Letter of Intent from the applicant's institution/organization issued by the assigned authority, indicating the approval to submit the proposal to KFAS is required.",
                "All proposals that pass KFAS' initial internal screening will be evaluated by external peer reviewers and will subsequently undergo a binary review (decline or approval).",
                "Applicant Institution should be committed to providing an environment that upholds research ethics of transparency, accountability, and auditability, including rules that govern KFAS's Intellectual Property (IP) Policy.",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-4 font-poppins text-sm leading-[1.85] text-white/70 sm:text-[15px]"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BRAND.blue }} />
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="mt-8 font-poppins text-sm leading-[1.85] text-white/50"
              {...fadeUp(0.25)}
            >
              Applicants (Principal Researchers, who hold official
              administrative titles) are strongly encouraged to submit their
              applications early in the call announcement period to ensure
              sufficient time for resolving any missing documentation.
            </motion.p>
          </div>
        </section>

        {/* ── DOCUMENTS ── */}
        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>Application Related Documents:</SectionHeading>
            <motion.p
              className="mt-6 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
              {...fadeUp(0.05)}
            >
              All details, conditions and information on the scope of funding
              and proposal requirements can be found in the following
              attachments:
            </motion.p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {documents.map((doc, i) => (
                <motion.a
                  key={doc.label}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border p-5 transition-all"
                  style={{ borderColor: `${BRAND.navy}18` }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileHover={{ backgroundColor: `${BRAND.lightBlue}35` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center"
                      style={{ background: `${BRAND.blue}15` }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 2h6l4 4v8H4V2z" stroke={BRAND.blue} strokeWidth="1.2" strokeLinejoin="round" />
                        <path d="M10 2v4h4" stroke={BRAND.blue} strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M6 9h4M6 11.5h2.5" stroke={BRAND.blue} strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="font-poppins text-sm font-medium" style={{ color: BRAND.navy }}>
                      {doc.label}
                    </span>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className="shrink-0 opacity-25 transition-opacity group-hover:opacity-100"
                  >
                    <path d="M2 7h10M7 2l5 5-5 5" stroke={BRAND.orange} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              ))}
            </div>
            <motion.p
              className="mt-6 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
              {...fadeUp(0.2)}
            >
              It is the responsibility of the applicant and the
              applicant&apos;s institution to ensure that they read,
              understand, and adhere to the application requirements and all
              KFAS guidelines, rules, and regulations.
            </motion.p>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
          style={{ borderTop: `1px solid ${BRAND.navy}12` }}
        >
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>Contact Us:</SectionHeading>
            <div
              className="mt-8 space-y-3 font-poppins text-sm sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
            >
              <motion.p {...fadeUp(0.05)}>
                If you have any inquiries, please email us at:{" "}
                <a
                  href="mailto:research@kfas.org.kw"
                  className="font-medium underline underline-offset-[3px] transition-colors hover:opacity-80"
                  style={{ color: BRAND.orange, textDecorationColor: `${BRAND.orange}50` }}
                >
                  research@kfas.org.kw
                </a>
              </motion.p>
              <motion.p {...fadeUp(0.1)}>
                Telephone:{" "}
                <a
                  href="tel:+96522278125"
                  className="font-medium transition-colors hover:text-[#EC601B]"
                  style={{ color: BRAND.navy }}
                >
                  (+965) 22278125
                </a>
                {" "}or{" "}
                <a
                  href="tel:+96522278126"
                  className="font-medium transition-colors hover:text-[#EC601B]"
                  style={{ color: BRAND.navy }}
                >
                  22278126
                </a>
              </motion.p>
              <motion.p className="pt-2" style={{ color: `${BRAND.navy}80` }} {...fadeUp(0.15)}>
                KFAS decisions regarding research grants are final and not
                subject to appeal.
              </motion.p>
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