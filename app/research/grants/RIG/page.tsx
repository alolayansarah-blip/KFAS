"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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

// ─── Sticky rail heading ────────────────────────────────────────────────────
function SectionHead({ title }: { title: ReactNode }) {
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

// ─── Hairline list marker (grows on row hover) ──────────────────────────────
function Mark() {
  return (
    <span
      aria-hidden
      className="mt-[0.7rem] block h-px w-6 shrink-0 bg-[#EC601B]/70 transition-all duration-500 group-hover:w-10"
    />
  );
}

// ─── Two-column rail section ────────────────────────────────────────────────
function RailSection({
  title,
  tint = false,
  children,
}: {
  title: ReactNode;
  tint?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`px-6 py-20 sm:px-8 sm:py-24 lg:px-12 ${tint ? "bg-[#7DC0F1]/[0.06]" : "bg-white"}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead title={title} />
          </div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

// ─── Grant program switcher (transfer between the 5 grant pages) ─────────────
// Drop this same <GrantTabs /> into all five grant pages — the active tab is
// detected automatically from the URL, so no per-page edits are needed.
const GRANT_PAGES = [
  { label: "Research Infrastructure Grants", href: "/research/grants/RIG" },
  {
    label: "Applied Research Grants",
    href: "/research/grants/Applied-Research-Grants",
  },
  {
    label: "Fundamental Research Grants",
    href: "/research/grants/Fundamental-Research-Grants",
  },
  {
    label: "Young Researcher Grants",
    href: "/research/grants/Young-Researcher-Grants",
  },
  {
    label: "Policy Research Grants",
    href: "/research/grants/Policy-Research-Grants",
  },
];

function GrantTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const activeHref =
    GRANT_PAGES.find(
      (p) => pathname === p.href || pathname?.startsWith(p.href + "/"),
    )?.href ?? "";

  return (
    <nav
      aria-label="Grant programs"
      className="border-b border-[#1D2D44]/[0.08] bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
        <div className="py-2.5 lg:hidden">
          <label htmlFor="grant-switcher" className="sr-only">
            Jump to another grant program
          </label>
          <select
            id="grant-switcher"
            value={activeHref}
            onChange={(e) => router.push(e.target.value)}
            className="w-full border border-[#1D2D44]/15 bg-white px-4 py-2.5 font-poppins text-[13px] font-medium text-[#1D2D44] focus:border-[#EC601B] focus:outline-none"
          >
            {GRANT_PAGES.map((p) => (
              <option key={p.href} value={p.href}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <ul className="hidden grid-cols-2 gap-2 py-2.5 sm:grid-cols-3 lg:grid">
          {GRANT_PAGES.map((p) => {
            const active = p.href === activeHref;
            return (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full border px-3 py-2 text-center font-poppins text-[11.5px] font-medium leading-snug tracking-[0.01em] transition-all duration-300 sm:text-[12px] ${
                    active
                      ? "border-[#EC601B] bg-[#EC601B] text-white"
                      : "border-[#1D2D44]/15 text-[#1D2D44]/65 hover:border-[#EC601B] hover:text-[#EC601B]"
                  }`}
                >
                  {p.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
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
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/Research.webp"
              alt="Researchers collaborating in a laboratory"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-105 object-cover object-[center_42%]"
            />
            {/* Directional overlay — left heavy for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
              aria-hidden
            />
            {/* Bottom fade */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
              aria-hidden
            />
          </div>

          {/* Content — vertically centered, left-aligned */}
          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
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
            </motion.div>

            {/* Title — clip-path wipe */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                RIG
              </motion.h1>
            </div>

            {/* Orange rule */}
            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          {/* White bleed into body */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Grant program switcher ── */}
        <GrantTabs />

        {/* ── Overview ── */}
        <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#EC601B]">
                Overview
              </p>
              <h2 className="mt-4 font-poppins text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-[#1D2D44]">
                Research Infrastructure Grants
              </h2>
            </motion.div>
            <div className="mt-7 space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
              <motion.p {...fadeUp(0.05)}>
                The Kuwait Foundation for the Advancement of Sciences (KFAS)
                provides grants for research infrastructure proposals. The
                Research Infrastructure Grant (RIG) will support and invest in
                public research centers and laboratories in Kuwait, in an aim to
                maximize their impact on the scientific community and strengthen
                their alignment with the global research ecosystem standards.
              </motion.p>
              <motion.p {...fadeUp(0.1)}>
                All submitted proposals by the public institutions in Kuwait,
                should focus on strengthening research infrastructure by
                enabling the acquisition of cutting-edge equipment and enhancing
                institutional research capabilities to advance scientific
                fields.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── 2026 Call ── */}
        <RailSection
          tint
          title="KFAS 2026 Call for Research Infrastructure Grant Proposals"
        >
          <div className="space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
              For the 2026 First Call for Research Infrastructure Grant
              Proposals (RIG), the Kuwait Foundation for the Advancement of
              Sciences (KFAS) invites competitive proposals to be submitted
              starting from February 1st 2026 to May 1st 2026.
            </motion.p>
            <motion.p {...fadeUp(0.1)}>
              The call can be accessed and downloaded from the link below:
            </motion.p>
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
                <span className="font-semibold text-[#1D2D44]">Note:</span> Only
                applications that are submitted via email to{" "}
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
        </RailSection>

        {/* ── Focus Areas ── */}
        <RailSection title="Focus Areas and Domains:">
          <motion.p
            className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
            {...fadeUp(0.05)}
          >
            The Kuwait Foundation for the Advancement of Sciences (KFAS) invites
            proposals that advance Kuwait&apos;s research infrastructure within
            the following priority domains:
          </motion.p>
          <div className="mt-6 divide-y divide-[#1D2D44]/[0.08]">
            {focusAreas.map((label, i) => (
              <motion.div
                key={label}
                className="group flex items-center gap-5 py-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="h-px w-6 shrink-0 bg-[#EC601B]/70 transition-all duration-500 group-hover:w-10" />
                <p className="font-poppins text-[15px] font-medium leading-snug text-[#1D2D44]">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="mt-7 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
            {...fadeUp(0.2)}
          >
            All submitted proposals should demonstrate how the proposed
            infrastructure will elevate research capacity, catalyze innovation,
            and enable impactful scientific and technological advancement.
          </motion.p>
        </RailSection>

        {/* ── Proposal Submissions ── */}
        <RailSection tint title="Proposal Submissions:">
          <div className="space-y-5 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
              All proposals must be submitted by the Principal Researchers, who
              are the individuals responsible for managing and overseeing
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
            </motion.p>
            <motion.p {...fadeUp(0.15)}>
              A Letter of Intent:{" "}
              <a
                href="https://kfas.sharepoint.com/:w:/g/IQBE5Pe5xj0kTK7vhkYRBiXnAcc26lBv17tZdUR88wnKcpg?e=XLADNz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
              >
                RIG Letter of Intent Sample
              </a>{" "}
              from the applicant&apos;s institution/organization issued by the
              assigned authority, indicating the approval to submit the proposal
              to KFAS is required with the submission.
            </motion.p>
            <motion.p {...fadeUp(0.2)}>
              Proposals are strongly encouraged to set short- to medium-term
              objectives and are expected to be implemented within five years of
              the award date.
            </motion.p>
          </div>
        </RailSection>

        {/* ── Eligibility ── */}
        <RailSection title="General Eligibility for Proposal Submissions:">
          <motion.p
            className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
            {...fadeUp(0.05)}
          >
            All institutions applying for the Research Infrastructure Grant must
            meet the following eligibility requirements:
          </motion.p>
          <div className="mt-6 divide-y divide-[#1D2D44]/[0.08]">
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
                demonstrates their capacity to effectively utilize the requested
                equipment in the proposed research area.
              </>,
              <>
                Ensure the requested infrastructure supports research that meets
                high standards of excellence and has the potential of generating
                high quality, impactful outputs.
              </>,
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group flex gap-5 py-6 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Mark />
                <div className="min-w-0 flex-1">{item}</div>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="mt-7 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/50 font-light"
            {...fadeUp(0.2)}
          >
            Any application missing major requirements by the closing date of
            the cycle will be marked as incomplete and consequently declined.
          </motion.p>
        </RailSection>

        {/* ── Important Information ── */}
        <RailSection tint title="Important Information:">
          <div className="divide-y divide-[#1D2D44]/[0.08]">
            {[
              "A Letter of Intent from the applicant's institution/organization issued by the assigned authority, indicating the approval to submit the proposal to KFAS is required.",
              "All proposals that pass KFAS' initial internal screening will be evaluated by external peer reviewers and will subsequently undergo a binary review (decline or approval).",
              "Applicant Institution should be committed to providing an environment that upholds research ethics of transparency, accountability, and auditability, including rules that govern KFAS's Intellectual Property (IP) Policy.",
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group flex gap-5 py-6 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Mark />
                <div className="min-w-0 flex-1">{item}</div>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="mt-7 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/50 font-light"
            {...fadeUp(0.25)}
          >
            Applicants (Principal Researchers, who hold official administrative
            titles) are strongly encouraged to submit their applications early
            in the call announcement period to ensure sufficient time for
            resolving any missing documentation.
          </motion.p>
        </RailSection>

        {/* ── Documents ── */}
        <RailSection title="Application Related Documents:">
          <motion.p
            className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
            {...fadeUp(0.05)}
          >
            All details, conditions and information on the scope of funding and
            proposal requirements can be found in the following attachments:
          </motion.p>
          <div className="mt-6 divide-y divide-[#1D2D44]/[0.08]">
            {documents.map((doc, i) => (
              <motion.a
                key={doc.label}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#7DC0F1]/15">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
                  <span className="font-poppins text-[14px] font-medium text-[#1D2D44] transition-colors group-hover:text-[#EC601B]">
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
          <motion.p
            className="mt-7 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
            {...fadeUp(0.2)}
          >
            It is the responsibility of the applicant and the applicant&apos;s
            institution to ensure that they read, understand, and adhere to the
            application requirements and all KFAS guidelines, rules, and
            regulations.
          </motion.p>
        </RailSection>

        {/* ── Contact ── */}
        <RailSection tint title="Contact Us:">
          <div className="space-y-3 font-poppins text-[15px] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
              If you have any inquiries, please email us at:{" "}
              <a
                href="mailto:research@kfas.org.kw"
                className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
              >
                research@kfas.org.kw
              </a>
            </motion.p>
            <motion.p {...fadeUp(0.1)}>
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
            </motion.p>
            <motion.p className="pt-2 text-[#1D2D44]/45" {...fadeUp(0.15)}>
              KFAS decisions regarding research grants are final and not subject
              to appeal.
            </motion.p>
          </div>
        </RailSection>
      </main>
      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
