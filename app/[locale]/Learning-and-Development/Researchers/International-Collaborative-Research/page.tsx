"use client";

import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

// Sticky offset for JumpTo (measured at runtime; see JumpTo).
const HEADER_H = 72;
const JUMP_SCROLL_VAR = "--icr-jump-scroll-mt";
const SECTION_SCROLL_MT = `scroll-mt-[var(${JUMP_SCROLL_VAR},128px)]`;
const JUMP_CONTAINER = "mx-auto w-full max-w-7xl";

/* Palette — navy #1D2D44 · orange #EC601B · sky #7DC0F1 · paper #FAFAF8 */

const inlineLink =
  "font-medium text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40";

/* ─── Shared motion variants ──────────────────────────────────────────────── */
// A container that reveals its children one after another on scroll-in.
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// A single child that fades + slides up. Pairs with `staggerContainer`.
const fadeItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const VIEWPORT = { once: true, margin: "-60px" } as const;

// ─── FadeUp — reveals a block once when it scrolls into view ─────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger — reveals its children in sequence when scrolled into view ──────────
function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

// ─── Chapter header — accent, title, rule, logo ─────────────────────────────────
function ChapterHeader({
  title,
  logoSrc,
  logoAlt,
}: {
  title: string;
  logoSrc: string;
  logoAlt: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="relative">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
        <div className="max-w-2xl">
          <motion.span
            className="block h-[3px] w-12 rounded-full bg-[#EC601B]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ transformOrigin: "left" }}
          />
          <motion.h2
            className="mt-6 font-poppins text-[1.7rem] font-semibold leading-[1.22] tracking-tight text-[#1D2D44] sm:text-[2.1rem] lg:text-[2.35rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            {title}
          </motion.h2>
        </div>

        {/* logo — transparent, enlarged; multiply blend drops any white background */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
        >
          <div className="relative h-[90px] w-[240px] sm:h-[180px] sm:w-[500px]">
            <Image
              src={logoSrc}
              alt={logoAlt}
              fill
              quality={95}
              sizes="(max-width: 640px) 400px, 500px"
              className="object-contain object-center mix-blend-multiply"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 h-px w-full origin-left rtl:origin-right bg-[#1D2D44]/10"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
      />
    </div>
  );
}

// ─── Mini heading inside a chapter ───────────────────────────────────────────────
function MiniHeading({ children }: { children: ReactNode }) {
  return (
    <motion.div className="mb-6" variants={fadeItem}>
      <h3 className="font-poppins text-[1.05rem] font-semibold tracking-tight text-[#1D2D44]">
        {children}
      </h3>
      <div className="mt-3 h-px w-9 bg-[#EC601B]/55" />
    </motion.div>
  );
}

// ─── Body paragraph — staggers in when used inside a <Stagger> ───────────────────
function Paragraph({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      variants={fadeItem}
      className={`font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/65 ${className}`}
    >
      {children}
    </motion.p>
  );
}

// ─── Bullet list (dash markers) ─────────────────────────────────────────────────
function BulletList({
  items,
  columns = false,
}: {
  items: string[];
  columns?: boolean;
}) {
  return (
    <motion.ul
      className={
        columns ? "grid gap-x-10 gap-y-[16px] sm:grid-cols-2" : "space-y-[16px]"
      }
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-30px" }}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          className="flex items-start gap-3.5"
          variants={fadeItem}
        >
          <span className="mt-[13px] h-px w-4 shrink-0 bg-[#EC601B]/70" />
          <span className="font-poppins text-[15px] leading-[1.8] font-light text-[#1D2D44]/65">
            {item}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ─── Apply / link ──────────────────────────────────────────────────────────────
function ApplyLink({
  href = "#",
  label = "Click here to apply",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-8 inline-flex items-center gap-3 w-fit"
    >
      <span className="h-[1.5px] w-7 bg-[#EC601B] transition-all duration-500 group-hover:w-12" />
      <span className="font-poppins text-[12.5px] font-semibold uppercase tracking-[0.13em] text-[#EC601B]">
        {label}
      </span>
      <svg
        className="h-3 w-3 -translate-x-1.5 rtl:translate-x-1.5 rtl:rotate-180 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0"
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

// ─── ICTP opportunity row (dot marker, no numbers) ───────────────────────────────
function Opportunity({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className="group border-t border-[#1D2D44]/10 py-7"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="flex items-start gap-4">
        <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#EC601B] transition-transform duration-300 group-hover:scale-125" />
        <div className="flex-1">
          <h4 className="font-poppins text-[16px] font-semibold leading-snug text-[#1D2D44]">
            {title}
          </h4>
          <div className="mt-3 space-y-4 font-poppins text-[15px] leading-[1.85] font-light text-[#1D2D44]/65">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── JumpTo nav ───────────────────────────────────────────────────────────────
// Sticky in-page nav placed directly after the hero. Horizontal row on desktop,
// tappable dropdown on mobile. Smooth-scrolls to each chapter, highlights the
// active one, and measures the real Header height so it pins flush on every
// breakpoint.
function JumpTo({
  jumpLinks,
  jumpToLabel,
  jumpSelectTopic,
}: {
  jumpLinks: { id: string; label: string }[];
  jumpToLabel: string;
  jumpSelectTopic: string;
}) {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [headerH, setHeaderH] = useState(HEADER_H);
  const navRef = useRef<HTMLElement>(null);

  const getJumpOffset = useCallback(() => {
    const barHeight = navRef.current?.offsetHeight ?? 48;
    return headerH + barHeight;
  }, [headerH]);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = getJumpOffset();
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    },
    [getJumpOffset],
  );

  useLayoutEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const measure = () => {
      const headerHeight = header.getBoundingClientRect().height;
      setHeaderH(headerHeight);
      const barHeight = navRef.current?.offsetHeight ?? 48;
      document.documentElement.style.setProperty(
        JUMP_SCROLL_VAR,
        `${headerHeight + barHeight}px`,
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    if (navRef.current) ro.observe(navRef.current);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      document.documentElement.style.removeProperty(JUMP_SCROLL_VAR);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const trigger = getJumpOffset() + 8;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActive(jumpLinks[jumpLinks.length - 1].id);
        return;
      }

      let current = "";
      for (const link of jumpLinks) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= trigger) {
          current = link.id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [getJumpOffset, jumpLinks]);

  const handleClick = (id: string) => {
    setActive(id);
    setOpen(false);
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) {
      setTimeout(() => scrollToSection(id), 320);
    } else {
      requestAnimationFrame(() => scrollToSection(id));
    }
  };

  const activeLabel =
    jumpLinks.find((l) => l.id === active)?.label ?? jumpSelectTopic;

  return (
    <motion.nav
      ref={navRef}
      className="sticky z-40 border-b border-[#1D2D44]/10 bg-white/95 backdrop-blur"
      style={{ top: headerH }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className={`${JUMP_CONTAINER} px-6 py-1.5 sm:px-8 sm:py-2 lg:px-12`}>
        {/* ── Desktop: inline horizontal row ──────────────────────────── */}
        <div className="hidden items-stretch lg:flex">
          <div className="flex items-center gap-2.5 pr-4 rtl:pr-0 rtl:pl-4 shrink-0">
            <span className="h-3.5 w-[3px] rounded-full bg-[#EC601B]" />
            <span className="font-poppins text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1D2D44]">
              {jumpToLabel}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 rtl:rotate-180"
              aria-hidden
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="#1D2D44"
                strokeOpacity="0.35"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {jumpLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className="group relative whitespace-nowrap px-3 py-1.5 font-poppins text-[13px] font-medium transition-colors"
                  style={{ color: isActive ? "#EC601B" : "#1D2D44B0" }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] origin-left rounded-full bg-[#EC601B] transition-transform duration-300"
                    style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: dropdown menu ───────────────────────────────────── */}
        <div className="relative lg:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center gap-2.5 py-0.5"
          >
            <span className="h-3.5 w-[3px] shrink-0 rounded-full bg-[#EC601B]" />
            <span className="font-poppins text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1D2D44] shrink-0">
              {jumpToLabel}
            </span>
            <span
              className="ml-1 rtl:ml-0 rtl:mr-1 truncate font-poppins text-[13px] font-medium"
              style={{ color: active ? "#EC601B" : "#1D2D4480" }}
            >
              {activeLabel}
            </span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-auto rtl:ml-0 rtl:mr-auto shrink-0"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              aria-hidden
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="#1D2D44"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute left-0 right-0 top-full z-50 overflow-hidden border border-[#1D2D44]/10 bg-white shadow-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <div className="flex flex-col pt-0.5 pb-1">
                  {jumpLinks.map((link) => {
                    const isActive = active === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleClick(link.id)}
                        className="flex items-center gap-3 px-1 py-2 text-left rtl:text-right font-poppins text-[14px] font-medium transition-colors"
                        style={{ color: isActive ? "#EC601B" : "#1D2D44" }}
                      >
                        <span
                          className="h-4 w-[3px] shrink-0 rounded-full bg-[#EC601B] transition-opacity"
                          style={{ opacity: isActive ? 1 : 0 }}
                        />
                        {link.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function InternationalCollaborativeResearchPage() {
  const t = useTranslations("InternationalCollaborativeResearchPage");
  const isArabic = useLocale() === "ar";

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const JUMP_LINKS = [
    { id: "hks", label: t("jumpHks") },
    { id: "ictp", label: t("jumpIctp") },
    { id: "lse", label: t("jumpLse") },
  ];

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />

      <main className="min-h-screen bg-white font-poppins selection:bg-[#EC601B] selection:text-white">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#1D2D44]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/intCollabs.webp"
              alt="International collaborative research"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-105 object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  isArabic
                    ? "linear-gradient(252deg, rgba(29,45,68,0.72) 0%, rgba(29,45,68,0.38) 42%, rgba(29,45,68,0.10) 68%, transparent 100%)"
                    : "linear-gradient(108deg, rgba(29,45,68,0.72) 0%, rgba(29,45,68,0.38) 42%, rgba(29,45,68,0.10) 68%, transparent 100%)",
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
            className="relative z-10 mt-32 w-full max-w-7xl mx-auto px-6 py-12 sm:mt-40 sm:px-8 md:mt-44 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className={`mb-6 flex items-center gap-2.5 font-poppins font-semibold text-white/55 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.34em]"
              }`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span>{t("breadcrumbLearning")}</span>
              <span className="text-white/30">/</span>
              <Link
                href="/Learning-and-Development/Researchers"
                className="text-white/80 transition-colors hover:text-white"
              >
                {t("breadcrumbResearchers")}
              </Link>
            </motion.div>

            <div
              className={`overflow-hidden ${
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-1"
              }`}
            >
              <motion.h1
                className={`font-poppins text-4xl font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl [text-shadow:_2px_2px_20px_rgba(0,0,0,0.45)] ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-[1.08] tracking-tight"
                }`}
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>

            {/* Orange divider under title — desktop / tablet */}
            <motion.div
              className="mt-7 hidden h-[3px] w-[76px] origin-left rtl:origin-right rounded-full bg-[#EC601B] md:block"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          {/* Orange divider on navy / white border — mobile only */}
          <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-30 md:hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <motion.div
                className="h-[3px] w-[76px] origin-left rtl:origin-right rounded-full bg-[#EC601B]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ─── Jump To (flush below hero) ─────────────────────────────────── */}
        <JumpTo
          jumpLinks={JUMP_LINKS}
          jumpToLabel={t("jumpToLabel")}
          jumpSelectTopic={t("jumpSelectTopic")}
        />

        {/* ─── Harvard Kennedy School ───────────────────────────────────────── */}
        <section
          id="hks"
          className={`bg-white py-20 ${SECTION_SCROLL_MT} sm:py-28`}
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <ChapterHeader
              title={t("hksTitle")}
              logoSrc="/image/Belfer.png"
              logoAlt="Harvard Kennedy School — Belfer Center for Science and International Affairs"
            />

            <Stagger className="mt-12">
              <Paragraph className="max-w-3xl">{t("hksIntro")}</Paragraph>
            </Stagger>

            <FadeUp delay={0.08} className="mt-14">
              <MiniHeading>{t("hksAboutHeading")}</MiniHeading>

              <Stagger className="max-w-3xl space-y-5">
                <Paragraph>{t("hksAboutPara1")}</Paragraph>
                <Paragraph>{t("hksAboutPara2")}</Paragraph>
              </Stagger>

              <div className="mt-7 max-w-3xl">
                <BulletList
                  items={[
                    t("hksBullet1"),
                    t("hksBullet2"),
                    t("hksBullet3"),
                    t("hksBullet4"),
                  ]}
                />
              </div>

              <ApplyLink
                href="https://www.belfercenter.org/programs/middle-east-initiative/kuwait-program"
                label={t("hksApplyLabel")}
              />
            </FadeUp>
          </div>
        </section>

        {/* ─── ICTP ─────────────────────────────────────────────────────────── */}
        <section
          id="ictp"
          className={`bg-[#BBDEFB25] py-20 ${SECTION_SCROLL_MT} sm:py-28`}
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <ChapterHeader
              title={t("ictpTitle")}
              logoSrc="/image/ICTP.png"
              logoAlt="The Abdus Salam International Centre for Theoretical Physics (ICTP)"
            />

            <Stagger className="mt-12">
              <Paragraph className="max-w-3xl">{t("ictpIntro")}</Paragraph>
            </Stagger>

            <FadeUp delay={0.08} className="mt-12">
              <p className="font-poppins text-[15px] font-semibold text-[#1D2D44]">
                {t("ictpOpportunitiesLabel")}
              </p>

              <div className="mt-6 border-b border-[#1D2D44]/10">
                <Opportunity title={t("ictpOpp1Title")}>
                  <p>
                    {t("ictpOpp1Body")}
                    <a
                      href="https://www.ictp.it/home/scientific-calendar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      {t("ictpOpp1LinkText")}
                    </a>
                    {t("ictpOpp1Post")}
                  </p>
                </Opportunity>

                <Opportunity title={t("ictpOpp2Title")}>
                  <p>
                    {t("ictpOpp2Body")}
                    <a
                      href="https://www.ictp.it/opportunity/ictp-postgraduate-diploma-programme"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      {t("ictpOpp2LinkText")}
                    </a>
                    {t("ictpOpp2Post")}
                  </p>
                </Opportunity>

                <Opportunity title={t("ictpOpp3Title")}>
                  <p>{t("ictpOpp3Body")}</p>
                </Opportunity>

                <Opportunity title={t("ictpOpp4Title")}>
                  <p>{t("ictpOpp4Body1")}</p>
                  <p>
                    {t("ictpOpp4Body2Pre")}
                    <a
                      href="https://www.ictp.it/opportunity/training-and-research-italian-laboratories-tril"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      {t("ictpOpp4Body2LinkText")}
                    </a>
                    {t("ictpOpp4Body2Post")}
                  </p>
                </Opportunity>
              </div>

              <ApplyLink
                href="https://www.ictp.it/opportunity/kuwait-programme-ictp"
                label={t("ictpApplyLabel")}
              />
            </FadeUp>

            {/* ── Eligibility / contact — white card, orange accents, sharp ── */}
            <FadeUp delay={0.1} className="mt-14">
              <div className="group relative max-w-3xl border border-[#1D2D44]/15 bg-white">
                {/* deadline header */}
                <div className="flex items-center gap-3.5 border-b border-dashed border-[#1D2D44]/15 px-7 py-5 sm:px-9">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#EC601B]/10 text-[#EC601B]">
                    <svg
                      className="h-[18px] w-[18px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <p className="font-poppins text-[14.5px] font-light leading-relaxed text-[#1D2D44]/80">
                    {t("ictpDeadlinePre")}
                    <span className="font-semibold text-[#EC601B]">
                      {t("ictpDeadlineDate")}
                    </span>
                    {t("ictpDeadlinePost")}
                  </p>
                </div>

                {/* body */}
                <div className="px-7 py-7 sm:px-9 sm:py-8">
                  <p className="font-poppins text-[14.5px] leading-[1.9] font-light text-[#1D2D44]/70">
                    {t("ictpEligibilityIntro")}
                  </p>

                  <motion.ul
                    className="mt-5 space-y-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-30px" }}
                  >
                    {[t("ictpEligibilityItem1"), t("ictpEligibilityItem2")].map(
                      (item) => (
                        <motion.li
                          key={item}
                          className="flex items-start gap-3 font-poppins text-[13.5px] font-medium text-[#1D2D44]"
                          variants={fadeItem}
                        >
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EC601B]" />
                          {item}
                        </motion.li>
                      ),
                    )}
                  </motion.ul>

                  <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-[#1D2D44]/10 pt-6">
                    <span className="font-poppins text-[13.5px] font-light text-[#1D2D44]/60">
                      {t("ictpContactLabel")}
                    </span>
                    <a
                      href="mailto:ictp.kfas@ictp.it"
                      className="font-poppins text-[13.5px] font-semibold text-[#EC601B] underline decoration-[#EC601B]/30 underline-offset-[3px] transition-colors hover:text-[#1D2D44] hover:decoration-[#1D2D44]/40"
                    >
                      ictp.kfas@ictp.it
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ─── LSE ──────────────────────────────────────────────────────────── */}
        <section
          id="lse"
          className={`bg-white py-20 ${SECTION_SCROLL_MT} sm:py-28`}
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <ChapterHeader
              title={t("lseTitle")}
              logoSrc="/image/LSE.png"
              logoAlt="The London School of Economics and Political Science (LSE)"
            />

            <Stagger className="mt-12">
              <Paragraph className="max-w-3xl">{t("lseIntroPara1")}</Paragraph>
              <div className="mt-8 max-w-3xl">
                <MiniHeading>{t("lseIntroPara2")}</MiniHeading>
              </div>
            </Stagger>

            <FadeUp delay={0.08} className="mt-14">
              <MiniHeading>{t("lseAimsHeading")}</MiniHeading>
              <div className="max-w-3xl">
                <BulletList
                  items={[
                    t("lseAim1"),
                    t("lseAim2"),
                    t("lseAim3"),
                    t("lseAim4"),
                    t("lseAim5"),
                  ]}
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="mt-14">
              <MiniHeading>{t("lseThemesHeading")}</MiniHeading>
              <BulletList
                columns
                items={[
                  t("lseTheme1"),
                  t("lseTheme2"),
                  t("lseTheme3"),
                  t("lseTheme4"),
                  t("lseTheme5"),
                  t("lseTheme6"),
                  t("lseTheme7"),
                  t("lseTheme8"),
                  t("lseTheme9"),
                  t("lseTheme10"),
                ]}
              />
            </FadeUp>

            <FadeUp delay={0.1} className="mt-14">
              <p className="max-w-3xl font-poppins text-[15px] leading-[1.9] font-light text-[#1D2D44]/65">
                {t("lseContactPre")}
                <a
                  href="https://www.lse.ac.uk/people/mercedes-masters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  {t("lseContactLinkText")}
                </a>
                {t("lseContactMid")}
                <a href="mailto:m.c.masters@lse.ac.uk" className={inlineLink}>
                  m.c.masters@lse.ac.uk
                </a>
                {t("lseContactPost")}
              </p>

              <ApplyLink
                href="https://www.lse.ac.uk/middleeastcentre/research/kuwait-programme"
                label={t("lseApplyLabel")}
              />
            </FadeUp>
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
