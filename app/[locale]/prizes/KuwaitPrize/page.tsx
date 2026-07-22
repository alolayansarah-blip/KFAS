"use client";

import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocale, useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const BRAND = {
  orange: "#EC601B",
  navy: "#1D2D44",
};

const HEADER_H = 72;
const BAR_FALLBACK_H = 56;
const JUMP_TRIGGER_MARGIN = 8;
const MOBILE_QUERY = "(max-width: 1023px)";
const MOBILE_CLOSE_DELAY = 320;
const JUMP_SCROLL_VAR = "--kuwait-prize-jump-scroll-mt";
const SECTION_SCROLL_MT = `scroll-mt-[var(${JUMP_SCROLL_VAR},128px)]`;

type JumpLink = { id: string; label: string };
type PrizeComponent = { title: string; desc: string };

// ─── FadeUp ───────────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isArabic = useLocale() === "ar";
  return (
    <div ref={ref} className="mb-10">
      <motion.h2
        className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <motion.div
        className={`mt-5 h-px ${
          isArabic
            ? "origin-right bg-gradient-to-l from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
            : "origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
        }`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      />
    </div>
  );
}

// ─── Section Heading Light (for orange bg) ────────────────────────────────────
function SectionHeadingLight({ children }: { children: ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isArabic = useLocale() === "ar";
  return (
    <div ref={ref} className="mb-10">
      <motion.h2
        className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <motion.div
        className={`mt-5 h-px bg-white/30 ${isArabic ? "origin-right" : "origin-left"}`}
        style={{ width: 48 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
      />
    </div>
  );
}

// ─── Apply Link — matches site CTA style ─────────────────────────────────────
function ApplyLink({ href = "#", text }: { href?: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 inline-flex items-center gap-3 w-fit"
    >
      <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
      <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
        {text}
      </span>
      <svg
        className="h-3 w-3 -translate-x-1 rtl:translate-x-1 rtl:-scale-x-100 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
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

// ─── Prize Components ─────────────────────────────────────────────────────────
function PrizeComponentRows({ items }: { items: PrizeComponent[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="mt-10 border-t border-[#1D2D44]/08 pt-12 sm:pt-14"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-0">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            className="relative flex min-w-0 flex-col items-center border-b border-[#1D2D44]/06 px-5 py-10 text-center last:border-b-0 sm:border-b-0 sm:border-e sm:border-[#1D2D44]/08 sm:py-2 sm:last:border-e-0 lg:px-10"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.28, ease: EASE }}
          >
            <p className="font-poppins text-[#EC601B] font-light text-[1.5rem] leading-[1.25] tracking-[0.03em] sm:text-[1.65rem] lg:text-[1.8rem]">
              {item.title}
            </p>
            <p className="mx-auto mt-6 max-w-[15.5rem] font-poppins text-[0.9375rem] font-light leading-[1.75] text-[#1D2D44]/58">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Prize Fields ─────────────────────────────────────────────────────────────
function PrizeFieldRow({ label, index }: { label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-white/25 group"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-white mt-[10px] flex-shrink-0"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          duration: 2.5,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p className="font-poppins text-white/85 font-light leading-[1.85] text-[0.95rem]">
        {label}
      </p>
    </motion.div>
  );
}

function PrizeFieldRows({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((label, i) => (
        <PrizeFieldRow key={label} label={label} index={i} />
      ))}
    </div>
  );
}

// ─── Eligibility ──────────────────────────────────────────────────────────────
function EligibilityRow({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-[#1D2D44]/10 group"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-[#EC601B] mt-[10px] flex-shrink-0"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          duration: 2.5,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p className="font-poppins text-[#1D2D44]/70 font-light leading-[1.85] text-[0.95rem]">
        {text}
      </p>
    </motion.div>
  );
}

function EligibilityRows({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((text, i) => (
        <EligibilityRow key={i} text={text} index={i} />
      ))}
    </div>
  );
}

// ─── Objectives ───────────────────────────────────────────────────────────────
function ObjectiveRow({ text, index }: { text: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="flex gap-5 py-5 border-b border-[#1D2D44]/10 group"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-[#EC601B] mt-[10px] flex-shrink-0"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          duration: 2.5,
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p className="font-poppins text-[#1D2D44]/70 font-light leading-[1.85] text-[0.95rem]">
        {text}
      </p>
    </motion.div>
  );
}

function ObjectiveRows({ items }: { items: string[] }) {
  return (
    <div>
      {items.map((text, i) => (
        <ObjectiveRow key={i} text={text} index={i} />
      ))}
    </div>
  );
}

// ─── JumpTo nav ───────────────────────────────────────────────────────────────
function JumpTo({
  jumpToLabel,
  selectPlaceholder,
  links,
}: {
  jumpToLabel: string;
  selectPlaceholder: string;
  links: JumpLink[];
}) {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [headerH, setHeaderH] = useState(HEADER_H);
  const navRef = useRef<HTMLElement>(null);

  const getJumpOffset = useCallback(
    () => headerH + (navRef.current?.offsetHeight ?? BAR_FALLBACK_H),
    [headerH],
  );

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top =
        el.getBoundingClientRect().top + window.scrollY - getJumpOffset();
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    },
    [getJumpOffset],
  );

  useLayoutEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const measure = () => {
      const headerHeight = header.getBoundingClientRect().height;
      const barHeight = navRef.current?.offsetHeight ?? BAR_FALLBACK_H;
      setHeaderH(headerHeight);
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
      const trigger = getJumpOffset() + JUMP_TRIGGER_MARGIN;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActive(links[links.length - 1].id);
        return;
      }

      let current = "";
      for (const link of links) {
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
  }, [getJumpOffset, links]);

  const handleClick = (id: string) => {
    setActive(id);
    setOpen(false);
    if (window.matchMedia(MOBILE_QUERY).matches) {
      setTimeout(() => scrollToSection(id), MOBILE_CLOSE_DELAY);
    } else {
      requestAnimationFrame(() => scrollToSection(id));
    }
  };

  const activeLabel =
    links.find((l) => l.id === active)?.label ?? selectPlaceholder;

  return (
    <motion.nav
      ref={navRef}
      className="sticky z-40 border-b bg-white/95 backdrop-blur"
      style={{ top: headerH, borderColor: `${BRAND.navy}14` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="mx-auto max-w-7xl px-6 py-1.5 sm:px-8 sm:py-2 lg:px-12">
        <div className="hidden items-stretch lg:flex">
          <div className="flex shrink-0 items-center gap-2.5 pe-4">
            <span
              className="h-3.5 w-[3px] rounded-full"
              style={{ background: BRAND.orange }}
            />
            <span
              className="font-poppins text-[12px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: BRAND.navy }}
            >
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
                stroke={`${BRAND.navy}55`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleClick(link.id)}
                  className="group relative whitespace-nowrap px-3 py-1.5 font-poppins text-[13px] font-medium transition-colors"
                  style={{ color: isActive ? BRAND.orange : `${BRAND.navy}B0` }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] origin-left rounded-full transition-transform duration-300 rtl:origin-right"
                    style={{
                      background: BRAND.orange,
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center gap-2.5 py-0.5"
          >
            <span
              className="h-3.5 w-[3px] shrink-0 rounded-full"
              style={{ background: BRAND.orange }}
            />
            <span
              className="shrink-0 font-poppins text-[12px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: BRAND.navy }}
            >
              {jumpToLabel}
            </span>
            <span
              className="ms-1 truncate font-poppins text-[13px] font-medium"
              style={{ color: active ? BRAND.orange : `${BRAND.navy}80` }}
            >
              {activeLabel}
            </span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="ms-auto shrink-0"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              aria-hidden
            >
              <path
                d="M6 9l6 6 6-6"
                stroke={BRAND.navy}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute left-0 right-0 top-full z-50 overflow-hidden border bg-white shadow-lg"
                style={{ borderColor: `${BRAND.navy}14` }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <div className="flex flex-col pb-1 pt-0.5">
                  {links.map((link) => {
                    const isActive = active === link.id;
                    return (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => handleClick(link.id)}
                        className="flex items-center gap-3 px-1 py-2 text-start font-poppins text-[14px] font-medium transition-colors"
                        style={{ color: isActive ? BRAND.orange : BRAND.navy }}
                      >
                        <span
                          className="h-4 w-[3px] shrink-0 rounded-full transition-opacity"
                          style={{
                            background: BRAND.orange,
                            opacity: isActive ? 1 : 0,
                          }}
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function KuwaitPrizesPage() {
  const t = useTranslations("KuwaitPrizePage");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const jumpLinks = t.raw("jumpLinks") as JumpLink[];
  const objectiveItems = t.raw("objectiveItems") as string[];
  const fieldItems = t.raw("fieldItems") as string[];
  const eligibilityItems = t.raw("eligibilityItems") as string[];
  const prizeComponents = t.raw("prizeComponents") as PrizeComponent[];

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero — full bleed, header overlays on top ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#121820]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/Prizes1.png"
              alt=""
              fill
              priority
              quality={65}
              sizes="100vw"
              className="object-cover object-[center_40%] scale-[1.06] brightness-[0.98] contrast-[1.02]"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                background: isArabic
                  ? [
                      "linear-gradient(232deg, rgba(72,143,204,0.34) 0%, rgba(72,143,204,0.09) 44%, transparent 70%)",
                      "radial-gradient(ellipse 90% 65% at 90% 6%, rgba(200,220,250,0.16) 0%, transparent 58%)",
                      "linear-gradient(to bottom, rgba(18,24,32,0.14) 0%, rgba(29,45,68,0.3) 42%, rgba(10,14,22,0.8) 100%)",
                    ].join(", ")
                  : [
                      "linear-gradient(128deg, rgba(72,143,204,0.34) 0%, rgba(72,143,204,0.09) 44%, transparent 70%)",
                      "radial-gradient(ellipse 90% 65% at 10% 6%, rgba(200,220,250,0.16) 0%, transparent 58%)",
                      "linear-gradient(to bottom, rgba(18,24,32,0.14) 0%, rgba(29,45,68,0.3) 42%, rgba(10,14,22,0.8) 100%)",
                    ].join(", "),
              }}
            />
          </div>

          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
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
              <span>{t("breadcrumb")}</span>
              <span className="text-white/25">/</span>
            </motion.div>
            <div className={`overflow-hidden ${isArabic ? "pb-2" : "pb-0.5"}`}>
              <motion.h1
                className={`font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight [text-shadow:_0_2px_28px_rgba(0,0,0,0.45),_0_1px_2px_rgba(0,0,0,0.35)] ${
                  isArabic ? "leading-[1.4]" : "leading-tight"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>
            <motion.div
              className={`mt-5 h-[3px] rounded-full bg-[#EC601B] ${
                isArabic ? "origin-right" : "origin-left"
              }`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        <JumpTo
          jumpToLabel={t("jumpToLabel")}
          selectPlaceholder={t("jumpSelectPlaceholder")}
          links={jumpLinks}
        />

        {/* ── Body ── */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto w-full max-w-7xl space-y-16 px-6 sm:space-y-20 sm:px-8 lg:px-12">
            {/* Overview */}
            <div id="overview" className={SECTION_SCROLL_MT}>
              <SectionHeading>{t("overviewTitle")}</SectionHeading>
              <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
                <div className="min-w-0 flex-1 space-y-6">
                  <FadeUp delay={0.1}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                      {t("overviewBody1")}
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.18}>
                    <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                      {t("overviewBody2Pre")}
                      <span className="font-semibold text-[#1D2D44]">
                        {t("overviewBody2Year")}
                      </span>
                      {t("overviewBody2Post")}
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.22}>
                    <ApplyLink
                      href="https://prizes.kfas.org.kw"
                      text={t("applyLinkText")}
                    />
                  </FadeUp>
                </div>
                <FadeUp
                  delay={0.25}
                  className="flex shrink-0 justify-center lg:justify-end lg:pt-1"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#EC601B]/10 blur-3xl rounded-full scale-125 pointer-events-none" />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src="/image/KuwaitPrizeLogo.png"
                        alt={t("logoAlt")}
                        width={400}
                        height={400}
                        className="relative h-auto w-full max-w-[240px] object-contain sm:max-w-[280px] lg:max-w-[300px] drop-shadow-lg"
                        sizes="(max-width: 1024px) 280px, 300px"
                      />
                    </motion.div>
                  </div>
                </FadeUp>
              </div>
            </div>

            {/* Objectives */}
            <div
              id="objectives"
              className={`${SECTION_SCROLL_MT} grid items-start gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20`}
            >
              <div className="lg:sticky lg:top-32">
                <SectionHeading>{t("objectivesTitle")}</SectionHeading>
                <FadeUp delay={0.15}>
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-4">
                    {t("objectivesIntro")}
                  </p>
                </FadeUp>
              </div>
              <ObjectiveRows items={objectiveItems} />
            </div>
          </div>
        </section>

        {/* ── Prize Fields — orange ── */}
        <section
          id="fields"
          className={`relative bg-[#EC601B] py-24 ${SECTION_SCROLL_MT}`}
        >
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden
          >
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 1px, transparent 0, transparent 50%)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          </div>
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
              <div className="lg:sticky lg:top-32">
                <SectionHeadingLight>{t("fieldsTitle")}</SectionHeadingLight>
                <FadeUp delay={0.15}>
                  <p className="font-poppins text-base leading-[1.9] text-white/70 font-light mt-4">
                    {t("fieldsIntro")}
                  </p>
                </FadeUp>
              </div>
              <PrizeFieldRows items={fieldItems} />
            </div>
            <FadeUp delay={0.2}>
              <p className="font-poppins text-base leading-[1.9] text-white/75 font-light mt-14 lg:mt-16 max-w-2xl">
                {t("fieldsClosing")}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Eligibility — light blue tint ── */}
        <section
          id="eligibility"
          className={`relative bg-[#BBDEFB40] py-24 ${SECTION_SCROLL_MT}`}
        >
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden
          >
            <svg
              className="absolute -top-20 -end-20 opacity-[0.08] w-[480px]"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="130"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="80"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
            </svg>
            <svg
              className="absolute -bottom-16 -start-16 opacity-[0.06] w-[320px]"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="110"
                fill="none"
                stroke="#EC601B"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start relative z-10">
            <div className="lg:sticky lg:top-32">
              <FadeUp>
                <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight">
                  {t("eligibilityTitle")}
                </h2>
                <motion.div
                  className={`mt-5 h-px ${
                    isArabic
                      ? "origin-right bg-gradient-to-l from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
                      : "origin-left bg-gradient-to-r from-[#EC601B]/40 via-[#7DC0F1]/20 to-transparent"
                  }`}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                />
                <FadeUp delay={0.15}>
                  <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/60 font-light mt-6">
                    {t("eligibilityIntro")}
                  </p>
                </FadeUp>
              </FadeUp>
            </div>
            <EligibilityRows items={eligibilityItems} />
          </div>
        </section>

        {/* ── Prize Components ── */}
        <section
          id="components"
          className={`bg-white py-20 sm:py-28 ${SECTION_SCROLL_MT}`}
        >
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <SectionHeading>{t("componentsTitle")}</SectionHeading>
            <div className="mt-8 space-y-6">
              <FadeUp delay={0.05}>
                <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                  {t("componentsIntro")}
                </p>
              </FadeUp>
              <PrizeComponentRows items={prizeComponents} />
              <FadeUp delay={0.1}>
                <p className="font-poppins text-base leading-[1.9] text-[#1D2D44]/65 font-light">
                  {t("componentsClosing")}
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── Back to Top ── */}
        <div className="flex justify-center bg-white py-12">
          <motion.button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex flex-col items-center gap-2 text-[#1D2D44]/35 transition-colors duration-300 hover:text-[#EC601B]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-label={t("backToTop")}
          >
            <div className="flex h-9 w-9 items-center justify-center border border-[#1D2D44]/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#EC601B]/50">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
              {t("backToTop")}
            </span>
          </motion.button>
        </div>
      </main>
      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
