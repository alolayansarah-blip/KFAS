"use client";

import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Brand ───────────────────────────────────────────────────────────────────
const BRAND = {
  orange: "#EC601B",
  lightBlue: "#BBDEFB",
  navy: "#1D2D44",
  white: "#FFFFFF",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTAINER = "mx-auto max-w-[1280px]";

// ─── JumpTo tuning ─────────────────────────────────────────────────────────────
const HEADER_H = 72; // fallback header height until measured
const BAR_FALLBACK_H = 56; // fallback JumpTo bar height until measured
const JUMP_TRIGGER_MARGIN = 8; // px past the bar before a section counts as active
const MOBILE_QUERY = "(max-width: 1023px)";
const MOBILE_CLOSE_DELAY = 320; // ms — let the dropdown finish closing before scrolling

// Sections read this CSS var (set by JumpTo at runtime) for their scroll-margin-top.
const JUMP_SCROLL_VAR = "--sponsorship-jump-scroll-mt";
const SECTION_SCROLL_MT = `scroll-mt-[var(${JUMP_SCROLL_VAR},128px)]`;

// ─── Image placeholder ─────────────────────────────────────────────────────────
// Swap each placeholder for a real photo by replacing the inner block with:
//   <Image src="/image/your-photo.jpg" alt="…" fill className="object-cover" />
// (or a plain <img src="…" className="absolute inset-0 h-full w-full object-cover" />)
function ImagePlaceholder({
  ratio = "aspect-[4/3]",
  label = "Image",
  className = "",
}: {
  ratio?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden border ${ratio} ${className}`}
      style={{ borderColor: `${BRAND.navy}14` }}
    >
      {/* ── REPLACE FROM HERE ────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${BRAND.lightBlue}45 0%, ${BRAND.navy}12 100%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `radial-gradient(${BRAND.navy}18 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${BRAND.navy}`}
            strokeOpacity="0.4"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.6" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span
            className="font-poppins text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: `${BRAND.navy}55` }}
          >
            {label}
          </span>
        </div>
      </div>
      {/* ── REPLACE TO HERE ──────────────────────────────────────────── */}

      {/* corner accent */}
      <span
        className="absolute left-0 top-0 h-1 w-10 rtl:left-auto rtl:right-0"
        style={{ background: BRAND.orange }}
        aria-hidden
      />
    </div>
  );
}

// ─── JumpTo nav ───────────────────────────────────────────────────────────────
// Sticky in-page nav placed directly after the hero. Horizontal row on desktop,
// tappable dropdown on mobile. Smooth-scrolls to each topic and highlights the
// active section on scroll.
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
  const [open, setOpen] = useState(false); // mobile dropdown
  const [headerH, setHeaderH] = useState(HEADER_H); // measured at runtime
  const navRef = useRef<HTMLElement>(null);

  // Distance from the top of the viewport to the bottom of the sticky stack
  // (header + bar). Used both for jump targets and active-section detection.
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

  // Measure header + bar height before paint; keep the section scroll-margin
  // CSS var in sync via ResizeObserver.
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

  // Close the mobile dropdown when tapping outside it
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

  // Highlight the last section whose top has passed the trigger line, with a
  // bottom-of-page guard so the final section always highlights.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      const trigger = getJumpOffset() + JUMP_TRIGGER_MARGIN;

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
    // On mobile, wait for the dropdown close animation before scrolling — iOS
    // can cancel a scroll fired while layout is still animating.
    if (window.matchMedia(MOBILE_QUERY).matches) {
      setTimeout(() => scrollToSection(id), MOBILE_CLOSE_DELAY);
    } else {
      requestAnimationFrame(() => scrollToSection(id));
    }
  };

  const activeLabel =
    jumpLinks.find((l) => l.id === active)?.label ?? jumpSelectTopic;

  return (
    <motion.nav
      ref={navRef}
      className="sticky z-40 border-b bg-white/95 backdrop-blur"
      style={{ top: headerH, borderColor: `${BRAND.navy}14` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className={`${CONTAINER} px-6 py-1.5 sm:px-8 sm:py-2 lg:px-12`}>
        {/* ── Desktop: inline horizontal row ──────────────────────────── */}
        <div className="hidden items-stretch lg:flex">
          {/* Label */}
          <div className="flex items-center gap-2.5 pr-4 rtl:pr-0 rtl:pl-4 shrink-0">
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

          {/* Links */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {jumpLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className="group relative whitespace-nowrap px-3 py-1.5 font-poppins text-[13px] font-medium transition-colors"
                  style={{ color: isActive ? BRAND.orange : `${BRAND.navy}B0` }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] origin-left rounded-full transition-transform duration-300"
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

        {/* ── Mobile: dropdown menu ───────────────────────────────────── */}
        <div className="relative lg:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center gap-2.5 py-0.5"
          >
            <span
              className="h-3.5 w-[3px] shrink-0 rounded-full"
              style={{ background: BRAND.orange }}
            />
            <span
              className="font-poppins text-[12px] font-semibold uppercase tracking-[0.18em] shrink-0"
              style={{ color: BRAND.navy }}
            >
              {jumpToLabel}
            </span>
            <span
              className="ml-1 rtl:ml-0 rtl:mr-1 truncate font-poppins text-[13px] font-medium"
              style={{ color: active ? BRAND.orange : `${BRAND.navy}80` }}
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
                <div className="flex flex-col pt-0.5 pb-1">
                  {jumpLinks.map((link) => {
                    const isActive = active === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleClick(link.id)}
                        className="flex items-center gap-3 px-1 py-2 text-left rtl:text-right font-poppins text-[14px] font-medium transition-colors"
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

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ActivitiesAndEventsSponsershipPage() {
  const t = useTranslations("ActivitiesEventsSponsorshipPage");
  const isArabic = useLocale() === "ar";

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const JUMP_LINKS = [
    { id: "overview", label: t("jumpOverview") },
    { id: "objectives", label: t("jumpObjectives") },
    { id: "citizen-science", label: t("jumpCitizenScience") },
    { id: "science-communication", label: t("jumpScienceCommunication") },
    { id: "apply", label: t("jumpApply") },
  ];

  const overviewParagraphs = t.raw("overviewParagraphs") as string[];
  const scienceCommParagraphs = t.raw("scienceCommParagraphs") as string[];

  // English objectives are plain phrases (no title); Arabic pairs a bold
  // title with a description — the two locales are intentionally different
  // shapes here, each preserving its own source wording as given.
  const objectives: { title?: string; body: string }[] = isArabic
    ? [
        { title: t("objective1Title"), body: t("objective1Body") },
        { title: t("objective2Title"), body: t("objective2Body") },
        { title: t("objective3Title"), body: t("objective3Body") },
        { title: t("objective4Title"), body: t("objective4Body") },
      ]
    : [
        { body: t("objective1Body") },
        { body: t("objective2Body") },
        { body: t("objective3Body") },
        { body: t("objective4Body") },
      ];

  // English Scope keeps its original 3-item shape (the third item carries a
  // nested sub-list of target audiences); Arabic uses a flat 4-item list, as
  // given in its own source text — the two locales are intentionally
  // structured differently here.
  const scopeItems: { title: string; body: string; sub?: string[] }[] = isArabic
    ? [
        { title: t("scopeItem1Title"), body: t("scopeItem1Body") },
        { title: t("scopeItem2Title"), body: t("scopeItem2Body") },
        { title: t("scopeItem3Title"), body: t("scopeItem3Body") },
        { title: t("scopeItem4Title"), body: t("scopeItem4Body") },
      ]
    : [
        { title: t("scopeItem1Title"), body: t("scopeItem1Body") },
        { title: t("scopeItem2Title"), body: t("scopeItem2Body") },
        {
          title: t("scopeItem3Title"),
          body: t("scopeItem3Body"),
          sub: t.raw("scopeItem3Sub") as string[],
        },
      ];

  const eligibilityItems = [
    t("eligibilityItem1"),
    t("eligibilityItem2"),
    t("eligibilityItem3"),
    t("eligibilityItem4"),
  ];

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
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px] bg-[#121820]"
        >
          <div className="absolute inset-0 bg-[#1D2D44]">
            <Image
              src="/image/sponsership.webp"
              alt="KFAS-sponsored activities and events engagement"
              fill
              priority
              quality={65}
              sizes="100vw"
              // this important for big screens
              className="object-cover object-center lg:object-[center_34%]"
            />
            {/* Gradient direction is intentionally identical in both locales. */}
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
          </div>

          <motion.div
            className="relative z-10 mt-28 md:mt-28 lg:mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className={`mb-5 flex items-center gap-2 font-semibold uppercase tracking-[0.35em] text-white/45 ${
                isArabic ? "text-[17px]" : "text-[10px]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>{t("breadcrumbScienceSociety")}</span>
            </motion.div>

            <div
              className={`overflow-hidden ${
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-0.5"
              }`}
            >
              <motion.h1
                className={`max-w-[18ch] text-left rtl:text-right font-poppins text-4xl font-bold text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-[1.08] tracking-tight"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>

            {/* Orange divider under title — desktop / tablet */}
            <motion.div
              className="mt-5 hidden h-[3px] w-[72px] rounded-full bg-[#EC601B] origin-left rtl:origin-right md:block"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          {/* Orange divider on navy / white border — mobile only */}
          <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-30 md:hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <motion.div
                className="h-[3px] w-[72px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Jump To (flush below hero — no extra white band) ─────────── */}
        <JumpTo
          jumpLinks={JUMP_LINKS}
          jumpToLabel={t("jumpToLabel")}
          jumpSelectTopic={t("jumpSelectTopic")}
        />

        {/* ── Overview ─────────────────────────────────────────────────── */}
        <section
          id="overview"
          className={`relative overflow-hidden bg-white ${SECTION_SCROLL_MT} px-6 py-20 sm:px-8 sm:py-28 lg:px-12`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-24 h-[28rem] w-[28rem] rounded-full opacity-[0.12] rtl:right-auto rtl:-left-40"
            style={{
              background:
                "radial-gradient(circle, #7DC0F1 0%, transparent 70%)",
            }}
          />
          <div className={`relative ${CONTAINER}`}>
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span
                className="block h-[3px] w-9 rounded-full"
                style={{ background: BRAND.orange }}
              />
              <p
                className={`mt-5 font-poppins font-semibold ${
                  isArabic
                    ? "text-[15px] tracking-normal"
                    : "text-[12px] uppercase tracking-[0.3em]"
                }`}
                style={{ color: BRAND.orange }}
              >
                {t("overviewLabel")}
              </p>
              <div className="mt-7 flex flex-col gap-5">
                {overviewParagraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-poppins text-[15px] font-light leading-[1.95]"
                    style={{ color: `${BRAND.navy}B3` }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Objectives — two-column grid (image + list) ──────────────── */}
        <section
          id="objectives"
          className={`${SECTION_SCROLL_MT} px-6 pb-20 sm:px-8 sm:pb-28 lg:px-12`}
        >
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
                whileHover={{ y: -8 }}
              >
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden border"
                  style={{ borderColor: `${BRAND.navy}14` }}
                >
                  <Image
                    src="/image/obj.webp"
                    alt="STEAM activities and community engagement at sponsored events"
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover object-[center_72%]"
                  />
                  <span
                    className="absolute left-0 top-0 h-1 w-10 rtl:left-auto rtl:right-0"
                    style={{ background: BRAND.orange }}
                    aria-hidden
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                <h2
                  className="font-poppins text-[1.55rem] sm:text-[1.8rem] font-semibold leading-[1.3] tracking-tight"
                  style={{ color: BRAND.navy }}
                >
                  {t("objectivesTitle")}
                </h2>
                <motion.div
                  className="mt-4 h-px w-full max-w-[420px] origin-left rtl:origin-right"
                  style={{
                    background: `linear-gradient(to right, ${BRAND.orange}, ${BRAND.lightBlue}40, transparent)`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                />

                <ul className="mt-9 flex flex-col gap-5">
                  {objectives.map((objective, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.08,
                        ease: EASE,
                      }}
                    >
                      <span
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: BRAND.orange }}
                      />
                      <span
                        className="font-poppins text-[15px] font-light leading-[1.8]"
                        style={{ color: `${BRAND.navy}C0` }}
                      >
                        {objective.title && (
                          <>
                            <strong
                              className="font-medium"
                              style={{ color: BRAND.navy }}
                            >
                              {objective.title}:
                            </strong>{" "}
                          </>
                        )}
                        {objective.body}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Areas of Focus ───────────────────────────────────────────── */}
        <section id="focus" className="scroll-mt-28 px-6 pb-8 sm:px-8 lg:px-12">
          <div className={CONTAINER}>
            <div
              className="h-px w-full"
              style={{ background: `${BRAND.navy}12` }}
            />
          </div>
        </section>

        {/* Citizen Science Grants — image left / text right */}
        <section
          id="citizen-science"
          className={`${SECTION_SCROLL_MT} px-6 py-16 sm:px-8 sm:py-20 lg:px-12`}
        >
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
                whileHover={{ y: -8 }}
              >
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden border"
                  style={{ borderColor: `${BRAND.navy}14` }}
                >
                  <Image
                    src="/image/Citizen%20.png"
                    alt="Community stargazing event with public telescope observation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover object-center"
                  />
                  <span
                    className="absolute left-0 top-0 h-1 w-10 rtl:left-auto rtl:right-0"
                    style={{ background: BRAND.orange }}
                    aria-hidden
                  />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                <h3
                  className="font-poppins text-[1.4rem] sm:text-[1.65rem] font-semibold leading-[1.3] tracking-tight"
                  style={{ color: BRAND.navy }}
                >
                  {t("citizenScienceTitle")}
                </h3>

                <div className="flex flex-col gap-4">
                  <p
                    className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
                    style={{ color: `${BRAND.navy}B0` }}
                  >
                    {t("citizenScienceBody1")}
                  </p>
                  <p
                    className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
                    style={{ color: `${BRAND.navy}B0` }}
                  >
                    {t("citizenScienceBody2")}
                  </p>
                  <p
                    className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
                    style={{ color: `${BRAND.navy}B0` }}
                  >
                    {t("citizenScienceBody3")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Science Communication Grant — text left / image right */}
        <section
          id="science-communication"
          className={`${SECTION_SCROLL_MT} px-6 py-16 sm:px-8 sm:py-20 lg:px-12`}
          style={{ background: `${BRAND.lightBlue}20` }}
        >
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                className="flex flex-col gap-6 lg:order-1"
                initial={{ opacity: 0, x: -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <h3
                  className="font-poppins text-[1.4rem] sm:text-[1.65rem] font-semibold leading-[1.3] tracking-tight"
                  style={{ color: BRAND.navy }}
                >
                  {t("scienceCommTitle")}
                </h3>

                <div className="flex flex-col gap-4">
                  {scienceCommParagraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
                      style={{ color: `${BRAND.navy}B0` }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="lg:order-2"
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                whileHover={{ y: -8 }}
              >
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden border"
                  style={{ borderColor: `${BRAND.navy}14` }}
                >
                  <Image
                    src="/image/ScienceComms.jpeg"
                    alt="Science communication and outreach collaboration at KFAS"
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover object-center"
                  />
                  <span
                    className="absolute left-0 top-0 h-1 w-10 rtl:left-auto rtl:right-0"
                    style={{ background: BRAND.orange }}
                    aria-hidden
                  />
                </div>
              </motion.div>
            </div>

            {/* Scope + Eligibility — two-column grid */}
            <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Scope */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <h4
                  className="font-poppins text-[12px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: BRAND.navy }}
                >
                  {t("scopeTitle")}
                </h4>
                <p
                  className="font-poppins text-[14px] font-light leading-[1.9]"
                  style={{ color: `${BRAND.navy}A0` }}
                >
                  {t("scopeIntro")}
                </p>
                <ul className="flex flex-col gap-4">
                  {scopeItems.map((item) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <span
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: BRAND.orange }}
                      />
                      <span
                        className="font-poppins text-[14.5px] font-light leading-[1.85]"
                        style={{ color: `${BRAND.navy}B0` }}
                      >
                        <strong
                          className="font-medium"
                          style={{ color: BRAND.navy }}
                        >
                          {item.title}
                        </strong>{" "}
                        {item.body}
                        {item.sub && (
                          <span className="mt-3 flex flex-col gap-2 pl-1 rtl:pl-0 rtl:pr-1">
                            {item.sub.map((target) => (
                              <span
                                key={target}
                                className="flex items-start gap-3"
                              >
                                <span
                                  className="mt-[10px] h-1 w-3 shrink-0 rounded-full"
                                  style={{ background: BRAND.lightBlue }}
                                />
                                <span>{target}</span>
                              </span>
                            ))}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Eligibility */}
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              >
                <h4
                  className="font-poppins text-[12px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: BRAND.navy }}
                >
                  {t("eligibilityTitle")}
                </h4>
                <p
                  className="font-poppins text-[14px] font-light leading-[1.9]"
                  style={{ color: `${BRAND.navy}A0` }}
                >
                  {t("eligibilityIntro")}
                </p>
                <ul className="flex flex-col gap-3">
                  {eligibilityItems.map((entity, i) => (
                    <motion.li
                      key={entity}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + i * 0.08,
                        ease: EASE,
                      }}
                    >
                      <span
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: BRAND.orange }}
                      />
                      <span
                        className="font-poppins text-[14.5px] font-light leading-[1.8]"
                        style={{ color: `${BRAND.navy}B0` }}
                      >
                        {entity}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section
          id="apply"
          className={`${SECTION_SCROLL_MT} px-6 py-20 sm:px-8 sm:py-24 lg:px-12`}
          style={{ background: "#7DC0F1" }}
        >
          <div
            className={`${CONTAINER} flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:gap-12 lg:text-left rtl:lg:text-right`}
          >
            <motion.h2
              className="max-w-[30ch] font-poppins text-[1.5rem] sm:text-[2rem] font-semibold leading-[1.3] tracking-tight"
              style={{ color: BRAND.white }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {t("ctaTitle")}
            </motion.h2>
            <motion.a
              href="#"
              className="inline-flex shrink-0 items-center justify-center rounded-full px-9 py-3.5 font-poppins text-[13px] font-semibold uppercase tracking-[0.18em] shadow-sm"
              style={{ background: BRAND.white, color: BRAND.navy }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("ctaButton")}
            </motion.a>
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
