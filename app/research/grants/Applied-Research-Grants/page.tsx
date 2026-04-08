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
  "Health",
  "STEAM Education",
  "Energy",
  "Environment",
  "Food & Water Security",
  "Future Economies",
];

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
];

export default function AppliedResearchGrantsPage() {
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

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          className="relative flex h-[55vh] items-end justify-start overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/applied.png"
              alt="Students collaborating on robotics and applied research"
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover object-center"
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
              <span className="text-white/60">Applied Research</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={HERO_TITLE_TRANSITION}
              >
                Applied Research Grants
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
                Applied Research Grants
              </h2>
              <div className="mt-3 h-[2px] w-10" style={{ background: BRAND.orange }} />
              <div
                className="mt-6 space-y-4 font-poppins text-sm leading-[1.9] sm:text-[15px]"
                style={{ color: `${BRAND.navy}BF` }}
              >
                <p>
                  The Kuwait Foundation for the Advancement of Sciences (KFAS)
                  provides grants for Applied Research Proposals. Applied Research
                  is directed towards creating practical solutions to specific
                  problems for specific end-users/stakeholders through innovation
                  in practice, products, or procedures. Proposals of this type
                  should include concrete plans for implementation, engagement,
                  and real-world impact. The outcomes of this research may lead to
                  commercialization of products, generation of patents, or the
                  potential to produce relevant policies, or clinical and service
                  applications.
                </p>
                <p>
                  All submitted proposals should aim to generate solutions and
                  outcomes that advance a scientific field, promote innovative
                  approaches or methodologies, and support the development of new
                  technologies.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2026 CALL ── */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
          style={{ background: `${BRAND.lightBlue}25` }}
        >
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>
              KFAS 2026 First Call for Research Proposals for Applied,
              Fundamental, Policy and Young Researcher Proposals
            </SectionHeading>
            <div
              className="mt-8 space-y-4 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
            >
              <motion.p {...fadeUp(0.05)}>
                The Kuwait Foundation for the Advancement of Sciences invites
                competitive research proposals to be submitted starting on the:
              </motion.p>
              <motion.p
                className="font-semibold"
                style={{ color: BRAND.navy }}
                {...fadeUp(0.1)}
              >
                15th of January to 15th of April 2026, by midnight Kuwait time.
              </motion.p>
              <motion.p {...fadeUp(0.15)}>
                <a
                  href="https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2F2025%2F1st%20CALL%20FOR%20PROPOSAL%202026%20%2D%20Final%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS%2F2025&p=true&ga=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium transition-colors hover:opacity-80"
                  style={{ color: BRAND.orange }}
                >
                  KFAS 2026 First Call for Research Proposals
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M7 2l5 5-5 5"
                      stroke={BRAND.orange}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.p>
              <motion.p
                className="border-l-2 pl-4 pt-1"
                style={{ borderColor: `${BRAND.orange}60`, color: `${BRAND.navy}CC` }}
                {...fadeUp(0.2)}
              >
                Please note that only applications that are submitted through
                the{" "}
                <a
                  href="https://grants.kfas.org.kw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-[3px]"
                  style={{ color: BRAND.orange, textDecorationColor: `${BRAND.orange}50` }}
                >
                  KFAS Research Grants Management System
                </a>{" "}
                are accepted, as manual submission of proposals is not accepted.
                Any application missing major requirements by the closing date
                of the cycle will be marked as incomplete and declined.
              </motion.p>
              <motion.p {...fadeUp(0.25)} style={{ color: `${BRAND.navy}BF` }}>
                It is recommended that researchers submit their application
                early on the call announcement to ensure that there is adequate
                time to complete the submission, should any documentation be
                missing.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── FOCUS AREAS ── */}
        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>Focus Areas and Domains</SectionHeading>
            <div
              className="mt-6 space-y-4 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
            >
              <motion.p {...fadeUp(0.05)}>
                All submitted proposals should aim to generate solutions and
                outcomes that advance a scientific field, promote innovative
                approaches or methodologies, or support the development of new
                technologies and policy development.
              </motion.p>
              <motion.p {...fadeUp(0.1)}>
                In addition to the below specified research domains, KFAS invites
                competitive proposals on general topics related to science,
                technology and innovation (STI), however priority will be given
                to the specified domains below:
              </motion.p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {focusAreas.map((label, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-start gap-3 border p-5"
                  style={{
                    borderColor: `${BRAND.blue}35`,
                    background: `${BRAND.lightBlue}15`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <p
                    className="font-poppins text-[13px] font-medium leading-snug"
                    style={{ color: BRAND.navy }}
                  >
                    {label}
                  </p>
                  <div className="mt-auto h-[2px] w-6" style={{ background: BRAND.orange }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FUNDED PROJECT EXAMPLES ── */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
          style={{ background: `${BRAND.lightBlue}25` }}
        >
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>
              Funded Project Examples on KFAS Research Portal
            </SectionHeading>
            <div
              className="mt-8 space-y-4 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
            >
              <motion.p {...fadeUp(0.05)}>
                The KFAS Research Portal is a research information management
                system that connects researchers and collaborators, showcasing
                the expertise and ongoing projects of those working in
                partnership with KFAS across various scholarly fields.
              </motion.p>
              <motion.p {...fadeUp(0.1)}>
                KFAS Research Portal Link
              </motion.p>
              <motion.p {...fadeUp(0.15)}>
                Visit the &apos;Projects and Impact&apos; section of the KFAS
                Research Portal to discover a range of successful KFAS-funded
                projects, both ongoing and completed, from Applied,
                Fundamental, Policy, and Young Researcher grants.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── ATTACHMENTS ── */}
        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>Attachments and proposal requirements</SectionHeading>
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
              {attachmentItems.map((doc, i) => (
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
                    <span
                      className="font-poppins text-sm font-medium"
                      style={{ color: BRAND.navy }}
                    >
                      {doc.label}
                    </span>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0 opacity-25 transition-opacity group-hover:opacity-100"
                  >
                    <path
                      d="M2 7h10M7 2l5 5-5 5"
                      stroke={BRAND.orange}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              ))}
            </div>
            <div
              className="mt-8 space-y-4 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
            >
              <motion.p {...fadeUp(0.2)}>
                In addition to the proposal submission, applicant is required to
                do the following:
              </motion.p>
              <motion.p {...fadeUp(0.25)}>
                To upload, through the Grant Management System (GMS), a Letter
                of Intent written by the institute/organization to which the
                applicant is affiliated, indicating approval of submitting the
                proposal to KFAS. (
                <a
                  href="https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2FSample%20Letter%20of%20Intent%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS&p=true&ga=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-[3px] transition-colors hover:opacity-80"
                  style={{ color: BRAND.orange, textDecorationColor: `${BRAND.orange}50` }}
                >
                  sample of letter of intent
                </a>
                ).
              </motion.p>
              <motion.p {...fadeUp(0.3)}>
                Failure to comply may result in noncompliance consequences for
                both the applicant and their institution, including declining
                proposal funding, as well as negatively impacting any future
                funding requests.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── ELIGIBILITY ── */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
          style={{ background: BRAND.navy }}
        >
          <div className="mx-auto max-w-[1024px]">
            <motion.div {...fadeUp(0)}>
              <h2 className="font-poppins text-[1.45rem] font-semibold leading-snug tracking-tight text-white sm:text-[1.7rem]">
                General Eligibility for Proposal Submissions
              </h2>
              <div className="mt-3 h-[2px] w-10" style={{ background: BRAND.orange }} />
            </motion.div>
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
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: BRAND.blue }}
                        />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </>,
                "Private sector applicants are eligible to apply for Policy Research Proposal Grant only.",
                "Researchers and scientists from international academic and research institutes may apply for research grants only through a Kuwaiti institution, and the project must demonstrate substantial collaboration with a Kuwait-based research team.",
                "Applicants must clearly outline all co-funding schemes in the application&apos;s budget proposal and include it in the letter of intent. Proposals that do not provide clear evidence of co-funding and the required letter of intent will be considered incomplete.",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-4 font-poppins text-sm leading-[1.85] text-white/70 sm:text-[15px]"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: BRAND.blue }}
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="mt-8 font-poppins text-sm leading-[1.85] text-white/50"
              {...fadeUp(0.25)}
            >
              Applicants are strongly encouraged to review all criteria and
              ensure eligibility, prior to proposal submission.
            </motion.p>
          </div>
        </section>

        {/* ── GRANT APPLICATION PORTAL ── */}
        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>Grant Application Portal</SectionHeading>
            <div
              className="mt-8 space-y-4 font-poppins text-sm leading-[1.85] sm:text-[15px]"
              style={{ color: `${BRAND.navy}BF` }}
            >
              <motion.p {...fadeUp(0.05)}>
                All applications must be submitted online through the{" "}
                <a
                  href="https://grants.kfas.org.kw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-[3px] transition-colors hover:opacity-80"
                  style={{ color: BRAND.orange, textDecorationColor: `${BRAND.orange}50` }}
                >
                  KFAS Research Grants Management System
                </a>
                .
              </motion.p>
              <motion.p {...fadeUp(0.1)}>
                If you are new to the portal, start with the following clip for
                instructions on applying. Click below for the KFAS Research
                Grants Management System tutorial.
              </motion.p>
              <motion.p {...fadeUp(0.15)}>
                <a
                  href="https://kfas.sharepoint.com/sites/GrantsSystemTraining/_layouts/15/stream.aspx?id=%2Fsites%2FGrantsSystemTraining%2FShared%20Documents%2FGeneral%2FApplicant%20portal%2Emp4&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E3b78bc20%2Daeff%2D4105%2D9d2a%2D06055df91dfd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium transition-colors hover:opacity-80"
                  style={{ color: BRAND.orange }}
                >
                  GMS Tutorial
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M7 2l5 5-5 5"
                      stroke={BRAND.orange}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
          style={{ borderTop: `1px solid ${BRAND.navy}12` }}
        >
          <div className="mx-auto max-w-[1024px]">
            <SectionHeading>Contact</SectionHeading>
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
                Telephone: (+965) 22278125 or 22278126
              </motion.p>
              <motion.p
                className="pt-2"
                style={{ color: `${BRAND.navy}80` }}
                {...fadeUp(0.15)}
              >
                KFAS decisions regarding research grants are final, and not
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