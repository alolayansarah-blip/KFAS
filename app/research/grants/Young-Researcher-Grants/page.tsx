"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useLayoutEffect, type ReactNode } from "react";
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

const HEADER_H = 72;

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
  const [headerH, setHeaderH] = useState(HEADER_H);
  const navRef = useRef<HTMLElement>(null);
  const activeHref =
    GRANT_PAGES.find(
      (p) => pathname === p.href || pathname?.startsWith(p.href + "/"),
    )?.href ?? "";

  useLayoutEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const measure = () => {
      setHeaderH(header.getBoundingClientRect().height);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Grant programs"
      className="sticky z-30 border-b border-[#1D2D44]/[0.08] bg-white/90 backdrop-blur"
      style={{ top: headerH }}
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
          className="relative flex h-[540px] items-center justify-start overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/image/YoungResearcherBanner.png"
              alt="Young researcher working with a microscope in a laboratory"
              fill
              priority
              sizes="100vw"
              className="scale-150 object-cover object-right translate-x-[15%]"
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
            className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-8 lg:px-12"
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
                className="transition-colors hover:text-white"
              >
                Grants
              </Link>
              {/* <span className="text-white/25">/</span>
              <span>Young Researcher</span> */}
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                Young
                <br />
                Researcher Grants
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
                Young Researcher Grants
              </h2>
            </motion.div>
            <div className="mt-7 space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
              <motion.p {...fadeUp(0.05)}>
                The Kuwait Foundation for the Advancement of Sciences (KFAS)
                provides grants for Young Researchers. Young Researcher Grants
                are aimed to promote and support students, working professionals
                and researchers (non-Ph.D. holders) under the age of 33 who are
                interested in leading applied or fundamental research projects
                to help foster their research careers. These grants should be
                implemented at local research or academic institutions or
                entities. Individuals awarded these grants should be under the
                supervision of a qualified mentor (holding a PhD degree or
                equivalent) at these institutions or entities.{" "}
                <span className="font-semibold text-[#1D2D44]">
                  Individuals with at least a bachelor&apos;s degree are
                  eligible to apply.
                </span>
              </motion.p>
              <motion.p {...fadeUp(0.1)}>
                All submitted proposals should aim to generate solutions and
                outcomes that advance a scientific field, promote innovative
                approaches or methodologies, and support the development of new
                technologies.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── 2026 Call ── */}
        <RailSection
          tint
          title="KFAS 2026 First Call for Research Proposals for Applied, Fundamental, Policy and Young Researcher Proposals"
        >
          <div className="space-y-5 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
              The Kuwait Foundation for the Advancement of Sciences invites
              competitive research proposals to be submitted starting on the:
            </motion.p>
            <motion.p className="font-semibold text-[#1D2D44]" {...fadeUp(0.1)}>
              15th of January to 15th of April 2026, by midnight Kuwait time.
            </motion.p>
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
                are accepted, as manual submission of proposals is not accepted.
                Any application missing major requirements by the closing date
                of the cycle will be marked as incomplete and declined.
              </p>
            </motion.div>
            <motion.p {...fadeUp(0.25)}>
              It is recommended that researchers submit their application early
              on the call announcement to ensure that there is adequate time to
              complete the submission, should any documentation be missing.
            </motion.p>
          </div>
        </RailSection>

        {/* ── Focus Areas ── */}
        <RailSection title="Focus Areas and Domains:">
          <div className="space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
              All submitted proposals should aim to generate solutions and
              outcomes that advance a scientific field, promote innovative
              approaches or methodologies, or support the development of new
              technologies and policy development.
            </motion.p>
            <motion.p {...fadeUp(0.1)}>
              In addition to the below specified research domains, KFAS invites
              competitive proposals on general topics related to science,
              technology and innovation (STI), however priority will be given to
              the specified domains below:
            </motion.p>
          </div>
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
        </RailSection>

        {/* ── Funded Project Examples ── */}
        <RailSection
          tint
          title="Funded Project Examples on KFAS Research Portal:"
        >
          <div className="space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
              The KFAS Research Portal is a research information management
              system that connects researchers and collaborators, showcasing the
              expertise and ongoing projects of those working in partnership
              with KFAS across various scholarly fields.
            </motion.p>
            <motion.p {...fadeUp(0.1)}>
              <Link
                href="/research/KFASResearchPortal"
                className="font-semibold text-[#EC601B] underline decoration-[#EC601B]/40 underline-offset-[3px] transition-colors hover:text-[#d45510]"
              >
                KFAS Research Portal Link
              </Link>
            </motion.p>
            <motion.p {...fadeUp(0.15)}>
              Visit the &apos;Projects and Impact&apos; section of the KFAS
              Research Portal to discover a range of successful KFAS-funded
              projects, both ongoing and completed, from Applied, Fundamental,
              Policy, and Young Researcher grants.
            </motion.p>
          </div>
        </RailSection>

        {/* ── Application Related Documents ── */}
        <RailSection title="Application Related Documents:">
          <motion.p
            className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
            {...fadeUp(0.05)}
          >
            All details, conditions and information on the scope of funding and
            proposal requirements can be found in the following attachments:
          </motion.p>
          <div className="mt-6 divide-y divide-[#1D2D44]/[0.08]">
            {attachmentItems.map((doc, i) => (
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
          <div className="mt-8 space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.2)}>
              In addition to the proposal submission, applicant is required to
              do the following:
            </motion.p>
            <motion.p {...fadeUp(0.25)}>
              To upload, through the Grant Management System (GMS), a Letter of
              Intent written by the institute/organization to which the
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
            </motion.p>
            <motion.p {...fadeUp(0.3)}>
              Failure to comply may result in noncompliance consequences for
              both the applicant and their institution, including declining
              proposal funding, as well as negatively impacting any future
              funding requests.
            </motion.p>
          </div>
        </RailSection>

        {/* ── Eligibility ── */}
        <RailSection tint title="General Eligibility for Proposal Submissions:">
          <div className="divide-y divide-[#1D2D44]/[0.08]">
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
                <span className="font-semibold text-[#1D2D44]">
                  Individuals with at least a bachelor&apos;s degree (less than
                  33 years of age), are eligible to apply
                </span>{" "}
                under the supervision of a qualified mentor (holding a PhD
                degree or equivalent) at local institutions or entities.
              </>,
              "Applicants must ensure that a letter of intent is submitted with their proposals.",
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
            Applicants are strongly encouraged to review all criteria and ensure
            eligibility, prior to proposal submission.
          </motion.p>
        </RailSection>

        {/* ── Grant Application Portal ── */}
        <RailSection title="Grant Application Portal:">
          <div className="space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
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
            </motion.p>
            <motion.p {...fadeUp(0.1)}>
              If you are new to the portal, start with the following clip for
              instructions on applying. Click below for the KFAS Research Grants
              Management System tutorial.
            </motion.p>
            <motion.div {...fadeUp(0.15)}>
              <CtaLink href="https://kfas.sharepoint.com/sites/GrantsSystemTraining/_layouts/15/stream.aspx?id=%2Fsites%2FGrantsSystemTraining%2FShared%20Documents%2FGeneral%2FApplicant%20portal%2Emp4&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E9d47ccc4%2Df151%2D4ffe%2Dadda%2D65d3a3ac7138">
                GMS Tutorial
              </CtaLink>
            </motion.div>
          </div>
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
            </motion.p>
            <motion.p className="pt-2 text-[#1D2D44]/45" {...fadeUp(0.15)}>
              KFAS decisions regarding research grants are final, and not
              subject to appeal.
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
