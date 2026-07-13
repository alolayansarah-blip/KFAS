"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

type GrantPage = { label: string; href: string };
type AttachmentItem = { label: string; href: string };

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
        className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:-scale-x-100 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0"
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

// ─── Grant program switcher (transfer between the 5 grant pages) ─────────────
function GrantTabs({
  pages,
  ariaLabel,
  srLabel,
}: {
  pages: GrantPage[];
  ariaLabel: string;
  srLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const activeHref =
    pages.find((p) => pathname === p.href || pathname?.startsWith(p.href + "/"))
      ?.href ?? "";

  return (
    <nav
      aria-label={ariaLabel}
      className="border-b border-[#1D2D44]/[0.08] bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
        <div className="py-2.5 lg:hidden">
          <label htmlFor="grant-switcher" className="sr-only">
            {srLabel}
          </label>
          <select
            id="grant-switcher"
            value={activeHref}
            onChange={(e) => router.push(e.target.value)}
            className="w-full border border-[#1D2D44]/15 bg-white px-4 py-2.5 font-poppins text-[13px] font-medium text-[#1D2D44] focus:border-[#EC601B] focus:outline-none"
          >
            {pages.map((p) => (
              <option key={p.href} value={p.href}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <ul className="hidden grid-cols-2 gap-2 py-2.5 sm:grid-cols-3 lg:grid">
          {pages.map((p) => {
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

export default function YoungResearcherGrantsPage() {
  const t = useTranslations("YRGPage");
  const isArabic = useLocale() === "ar";

  const grantPages = t.raw("grantPages") as GrantPage[];
  const focusAreas = t.raw("focusAreas") as string[];
  const attachmentItems = t.raw("attachmentItems") as AttachmentItem[];
  const heroTitleLine2 = t("heroTitleLine2");

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
          className={`relative overflow-hidden flex items-center justify-start ${
            isArabic
              ? "h-[400px] md:h-[500px] lg:h-[560px]"
              : "h-[360px] md:h-[460px] lg:h-[540px]"
          }`}
        >
          <div className="absolute inset-0">
            <Image
              src="/image/YoungResearcherBanner.png"
              alt="Young researcher working with a microscope in a laboratory"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-center scale-110 md:scale-150 md:object-right md:translate-x-[15%]"
            />
            {/* Directional overlay — heavy on the leading side for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(252deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)"
                  : "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
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

          {/* Content — vertically centered, leading-aligned */}
          <motion.div
            className={`relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 ${
              isArabic ? "mt-32 sm:mt-40 lg:mt-44" : "mt-32 md:mt-28 lg:mt-44"
            }`}
            style={{ opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
            <motion.div
              className={`mb-5 flex items-center gap-2 font-semibold text-white/45 ${
                isArabic
                  ? "text-base tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>{t("breadcrumbResearch")}</span>
              <span className="text-white/25">/</span>
              <Link
                href="/research/grants"
                className="transition-colors hover:text-white"
              >
                {t("breadcrumbGrants")}
              </Link>
            </motion.div>

            {/* Title — clip-path wipe */}
            <div className={`overflow-hidden ${isArabic ? "pb-4 sm:pb-5" : "pb-0.5"}`}>
              <motion.h1
                className={`font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-tight tracking-tight"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                {t("heroTitleLine1")}
                {heroTitleLine2 && (
                  <>
                    <br />
                    {heroTitleLine2}
                  </>
                )}
              </motion.h1>
            </div>

            {/* Orange rule */}
            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
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
        <GrantTabs
          pages={grantPages}
          ariaLabel={t("grantTabsAriaLabel")}
          srLabel={t("grantTabsSrLabel")}
        />

        {/* ── Overview ── */}
        <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <motion.div {...fadeUp(0)}>
              <span className="block h-[3px] w-9 rounded-full bg-[#EC601B]" />
              <p
                className={`mt-5 font-semibold text-[#EC601B] ${
                  isArabic
                    ? "text-[16px] tracking-normal"
                    : "text-[10px] uppercase tracking-[0.4em]"
                }`}
              >
                {t("overviewKicker")}
              </p>
              <h2 className="mt-4 font-poppins text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-[#1D2D44]">
                {t("overviewTitle")}
              </h2>
            </motion.div>
            <div className="mt-7 space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
              <motion.p {...fadeUp(0.05)}>
                {t("overviewBody1Pre")}
                <span className="font-semibold text-[#1D2D44]">
                  {t("overviewBody1Bold")}
                </span>
              </motion.p>
              <motion.p {...fadeUp(0.1)}>{t("overviewBody2")}</motion.p>
            </div>
          </div>
        </section>

        {/* ── 2026 Call ── */}
        <RailSection tint title={t("callTitle")}>
          <div className="space-y-5 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>{t("callBody1")}</motion.p>
            <motion.p className="font-semibold text-[#1D2D44]" {...fadeUp(0.1)}>
              {t("callDates")}
            </motion.p>
            <motion.p {...fadeUp(0.12)}>{t("callBody2")}</motion.p>
            <motion.div {...fadeUp(0.15)}>
              <CtaLink href="https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2F2025%2F1st%20CALL%20FOR%20PROPOSAL%202026%20%2D%20Final%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS%2F2025&p=true&ga=1">
                {t("callLinkText")}
              </CtaLink>
            </motion.div>
            <motion.div {...fadeUp(0.2)}>
              <p className="border-s-2 border-[#EC601B]/40 ps-4 pt-1 text-[#1D2D44]/75">
                {t("callNotePre")}
                <a
                  href="https://grants.kfas.org.kw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40"
                >
                  {t("callNoteLinkText")}
                </a>
                {t("callNotePost")}
              </p>
            </motion.div>
            <motion.p {...fadeUp(0.25)}>{t("callClosing")}</motion.p>
          </div>
        </RailSection>

        {/* ── Focus Areas ── */}
        <RailSection title={t("focusTitle")}>
          <div className="space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>{t("focusBody1")}</motion.p>
            <motion.p {...fadeUp(0.1)}>{t("focusBody2")}</motion.p>
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
        <RailSection tint title={t("portalTitle")}>
          <div className="space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>{t("portalIntro")}</motion.p>
            <motion.p {...fadeUp(0.08)}>{t("portalBody1")}</motion.p>
            <motion.p {...fadeUp(0.1)}>
              <Link
                href="/research/KFASResearchPortal"
                className="font-semibold text-[#EC601B] underline decoration-[#EC601B]/40 underline-offset-[3px] transition-colors hover:text-[#d45510]"
              >
                {t("portalLinkText")}
              </Link>
            </motion.p>
            <motion.p {...fadeUp(0.15)}>{t("portalBody2")}</motion.p>
          </div>
        </RailSection>

        {/* ── Application Related Documents ── */}
        <RailSection title={t("attachmentsTitle")}>
          <motion.p
            className="font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
            {...fadeUp(0.05)}
          >
            {t("attachmentsIntro")}
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
                  className="shrink-0 opacity-20 transition-opacity group-hover:opacity-100 rtl:-scale-x-100"
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
            <motion.p {...fadeUp(0.2)}>{t("additionalIntro")}</motion.p>
            <motion.p {...fadeUp(0.25)}>
              {t("additionalBodyPre")}
              <a
                href="https://kfas.sharepoint.com/Shared%20Documents/Forms/AllItems.aspx?id=%2FShared%20Documents%2FPublic%2FKFAS%2FSample%20Letter%20of%20Intent%2Epdf&parent=%2FShared%20Documents%2FPublic%2FKFAS&p=true&ga=1"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
              >
                {t("additionalLinkText")}
              </a>
              {t("additionalBodyPost")}
            </motion.p>
            <motion.p {...fadeUp(0.3)}>{t("additionalClosing")}</motion.p>
          </div>
        </RailSection>

        {/* ── Eligibility ── */}
        <RailSection tint title={t("eligibilityTitle")}>
          <div className="divide-y divide-[#1D2D44]/[0.08]">
            {[
              <>
                {t("eligibilityItem0Lead")}
                <ul className="mt-3 space-y-2 ps-2">
                  {[
                    t("eligibilityItem0Sub1"),
                    t("eligibilityItem0Sub2"),
                    t("eligibilityItem0Sub3"),
                  ].map((sub, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7DC0F1]" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </>,
              <>{t("eligibilityItem1")}</>,
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group flex gap-5 py-6 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light"
                initial={{ opacity: 0, x: isArabic ? 12 : -12 }}
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
            {t("eligibilityClosing")}
          </motion.p>
        </RailSection>

        {/* ── Grant Application Portal ── */}
        <RailSection title={t("portalSectionTitle")}>
          <div className="space-y-4 font-poppins text-[15px] leading-[1.9] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
              {t("portalSectionBody1Pre")}
              <a
                href="https://grants.kfas.org.kw/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
              >
                {t("portalSectionLinkText")}
              </a>
              {t("portalSectionBody1Post")}
            </motion.p>
            <motion.p {...fadeUp(0.1)}>{t("portalSectionBody2")}</motion.p>
            <motion.div {...fadeUp(0.15)}>
              <CtaLink href="https://kfas.sharepoint.com/sites/GrantsSystemTraining/_layouts/15/stream.aspx?id=%2Fsites%2FGrantsSystemTraining%2FShared%20Documents%2FGeneral%2FApplicant%20portal%2Emp4&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E9d47ccc4%2Df151%2D4ffe%2Dadda%2D65d3a3ac7138">
                {t("gmsTutorialLinkText")}
              </CtaLink>
            </motion.div>
          </div>
        </RailSection>

        {/* ── Contact ── */}
        <RailSection tint title={t("contactTitle")}>
          <div className="space-y-3 font-poppins text-[15px] text-[#1D2D44]/65 font-light">
            <motion.p {...fadeUp(0.05)}>
              {t("contactBody1Pre")}
              <a
                href="mailto:research@kfas.org.kw"
                dir="ltr"
                className="font-medium text-[#EC601B] underline underline-offset-[3px] decoration-[#EC601B]/40 hover:opacity-80"
              >
                research@kfas.org.kw
              </a>
            </motion.p>
            <motion.p {...fadeUp(0.1)}>
              {t("contactPhoneLabel")}
              <a
                href="tel:+96522278125"
                dir="ltr"
                className="font-medium text-[#1D2D44] transition-colors hover:text-[#EC601B]"
              >
                (+965) 22278125
              </a>
              {t("contactPhoneMid")}
              <a
                href="tel:+96522278126"
                dir="ltr"
                className="font-medium text-[#1D2D44] transition-colors hover:text-[#EC601B]"
              >
                22278126
              </a>
            </motion.p>
            <motion.p className="pt-2 text-[#1D2D44]/45" {...fadeUp(0.15)}>
              {t("contactClosing")}
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
