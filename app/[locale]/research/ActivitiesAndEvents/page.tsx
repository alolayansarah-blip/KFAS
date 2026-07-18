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

// Shared section shell classes
const SECTION_X = "px-6 py-20 sm:px-8 sm:py-28 lg:px-12";
const CONTAINER = "mx-auto max-w-[1280px]";

// ─── JumpTo tuning ─────────────────────────────────────────────────────────────
const HEADER_H = 72; // fallback header height until measured
const BAR_FALLBACK_H = 56; // fallback JumpTo bar height until measured
const JUMP_TRIGGER_MARGIN = 8; // px past the bar before a section counts as active
const MOBILE_QUERY = "(max-width: 1023px)";
const MOBILE_CLOSE_DELAY = 320; // ms — let the dropdown finish closing before scrolling

// Sections read this CSS var (set by JumpTo at runtime) for their scroll-margin-top.
const JUMP_SCROLL_VAR = "--activities-jump-scroll-mt";
const SECTION_SCROLL_MT = `scroll-mt-[var(${JUMP_SCROLL_VAR},128px)]`;

type JumpLink = { id: string; label: string };
type SectionCopy = { eyebrow: string; heading: string; body: string[] };
type OrganizedEvent = { title: string; body: string };

// ─── FadeUp ──────────────────────────────────────────────────────────────────
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Eyebrow ─────────────────────────────────────────────────────────────────
function Eyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  const isArabic = useLocale() === "ar";
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-px w-8 shrink-0"
        style={{ background: dark ? "rgba(255,255,255,0.4)" : BRAND.orange }}
      />
      <span
        className={`font-poppins font-semibold ${
          isArabic
            ? "text-[15px] tracking-normal"
            : "text-[10px] uppercase tracking-[0.35em]"
        }`}
        style={{ color: dark ? "rgba(255,255,255,0.55)" : BRAND.orange }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── AccentLine ──────────────────────────────────────────────────────────────
function AccentLine({ dark = false }: { dark?: boolean }) {
  const isArabic = useLocale() === "ar";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="h-px origin-left rtl:origin-right mt-4"
      style={{
        background: dark
          ? "rgba(255,255,255,0.18)"
          : `linear-gradient(${isArabic ? "to left" : "to right"}, ${BRAND.orange}, ${BRAND.lightBlue}40, transparent)`,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
    />
  );
}

// ─── SectionHeading ──────────────────────────────────────────────────────────
function SectionHeading({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <motion.h2
        className="font-poppins text-[1.55rem] sm:text-[1.8rem] font-semibold leading-[1.3] tracking-tight"
        style={{ color: dark ? BRAND.white : BRAND.navy }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <AccentLine dark={dark} />
    </div>
  );
}

// ─── BodyText ────────────────────────────────────────────────────────────────
function BodyText({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  const isArabic = useLocale() === "ar";
  return (
    <p
      className={`font-poppins font-light leading-[1.9] ${
        isArabic ? "text-[15px]" : "text-[14.5px]"
      }`}
      style={{ color: dark ? "rgba(255,255,255,0.72)" : `${BRAND.navy}B0` }}
    >
      {children}
    </p>
  );
}

// ─── SectionImage ────────────────────────────────────────────────────────────
function SectionImage({
  src,
  alt,
  objectPosition = "center",
  fit = "cover",
}: {
  src: string;
  alt: string;
  objectPosition?: "center" | "top";
  fit?: "cover" | "contain";
}) {
  if (fit === "contain") {
    return (
      <Image
        src={src}
        alt={alt}
        width={420}
        height={420}
        sizes="(max-width: 1024px) 90vw, 420px"
        className="h-auto w-full object-contain transition-transform duration-700 hover:scale-[1.02]"
      />
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 90vw, 420px"
        className={`object-cover transition-transform duration-700 hover:scale-[1.03] ${
          objectPosition === "top" ? "object-top" : "object-center"
        }`}
      />
    </div>
  );
}

// ─── StandardSection ──────────────────────────────────────────────────────────
// Text column + centered image column. Pass full content (Eyebrow, SectionHeading,
// body) as children, mirroring StickyImageSection's interface.
// On mobile the text always renders first; `imageLeft` flips the desktop layout.
function StandardSection({
  id,
  children,
  imageSrc,
  imageAlt,
  imageLeft = false,
  background,
  objectPosition = "center",
  imageFit = "cover",
  decorativeGlow,
}: {
  id?: string;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageLeft?: boolean;
  background?: string;
  objectPosition?: "center" | "top";
  imageFit?: "cover" | "contain";
  decorativeGlow?: ReactNode;
}) {
  const textCol = (
    <FadeUp
      className={`flex flex-col gap-6 ${imageLeft ? "order-1 lg:order-2" : ""}`}
    >
      {children}
    </FadeUp>
  );

  const imageCol = (
    <FadeUp
      delay={0.15}
      className={`flex justify-center ${imageLeft ? "order-2 lg:order-1" : ""}`}
    >
      <div className="w-full max-w-[420px]">
        <SectionImage
          src={imageSrc}
          alt={imageAlt}
          objectPosition={objectPosition}
          fit={imageFit}
        />
      </div>
    </FadeUp>
  );

  return (
    <section
      id={id}
      className={`${SECTION_X} relative ${SECTION_SCROLL_MT}`}
      style={background ? { background } : undefined}
    >
      {decorativeGlow}
      <div className={`${CONTAINER} relative z-10`}>
        <div
          className={`grid items-center gap-12 lg:gap-24 ${
            imageLeft ? "lg:grid-cols-[1fr_1.4fr]" : "lg:grid-cols-[1.4fr_1fr]"
          }`}
        >
          {imageLeft ? (
            <>
              {imageCol}
              {textCol}
            </>
          ) : (
            <>
              {textCol}
              {imageCol}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── StickyImageSection ───────────────────────────────────────────────────────
// Scrolling text + sticky image (desktop) with a normal image fallback (mobile).
// IMPORTANT: section must NOT have overflow-hidden — it breaks position:sticky.
function StickyImageSection({
  id,
  background,
  decorativeGlow,
  children,
  imageSrc,
  imageAlt,
  imageLeft = false,
}: {
  id?: string;
  background?: string;
  decorativeGlow?: ReactNode;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageLeft?: boolean;
}) {
  const textCol = <FadeUp className="flex flex-col gap-6">{children}</FadeUp>;

  // self-start + sticky top-28: image stays pinned while text scrolls past it.
  // Hidden on mobile; a normal image fallback renders below instead.
  const stickyImageCol = (
    <div className="hidden lg:block self-start sticky top-28">
      <FadeUp delay={0.15}>
        <div className="w-full">
          <SectionImage src={imageSrc} alt={imageAlt} />
        </div>
      </FadeUp>
    </div>
  );

  const mobileImage = (
    <FadeUp delay={0.15} className="lg:hidden flex justify-center">
      <div className="w-full max-w-[420px]">
        <SectionImage src={imageSrc} alt={imageAlt} />
      </div>
    </FadeUp>
  );

  return (
    <section
      id={id}
      className={`${SECTION_X} relative ${SECTION_SCROLL_MT}`}
      style={background ? { background } : undefined}
    >
      {decorativeGlow}
      <div className={`${CONTAINER} relative z-10`}>
        <div
          className={`grid gap-12 lg:gap-24 ${
            imageLeft ? "lg:grid-cols-[1fr_1.4fr]" : "lg:grid-cols-[1.4fr_1fr]"
          }`}
        >
          {imageLeft ? (
            <>
              {stickyImageCol}
              {textCol}
            </>
          ) : (
            <>
              {textCol}
              {stickyImageCol}
            </>
          )}
          {mobileImage}
        </div>
      </div>
    </section>
  );
}

// ─── Decorative glow ──────────────────────────────────────────────────────────
// Clipped to the section's own bounds (rather than the section itself having
// overflow-hidden) so it doesn't interfere with StickyImageSection's sticky
// image, and doesn't bleed past the viewport edge in RTL layouts.
function Glow({ position }: { position: "top-right" | "bottom-left" }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div
        className={`absolute h-[480px] w-[480px] rounded-full blur-3xl opacity-20 ${
          position === "top-right"
            ? "-top-32 -end-32"
            : "-bottom-32 -start-32"
        }`}
        style={{ background: "white" }}
      />
    </div>
  );
}

// ─── JumpTo nav ───────────────────────────────────────────────────────────────
// Sticky in-page nav placed directly after the hero. Horizontal row on desktop,
// tappable dropdown on mobile. Smooth-scrolls to each topic and highlights the
// active section on scroll.
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
  // bottom-of-page guard so the final (tall) section always highlights.
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
    // On mobile, wait for the dropdown close animation before scrolling — iOS
    // can cancel a scroll fired while layout is still animating.
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
            {links.map((link) => {
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
                    className="absolute bottom-0 left-3 right-3 h-[2px] origin-left rtl:origin-right rounded-full transition-transform duration-300"
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
                  {links.map((link) => {
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

// ─── Organized Event Row — WITH image ────────────────────────────────────────
function EventRowWithImage({
  title,
  body,
  imageSrc,
  imageAlt,
  imageRight = false,
  delay = 0,
}: {
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  imageRight?: boolean;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div
        className="flex flex-col lg:flex-row w-full overflow-hidden border"
        style={{ borderColor: `${BRAND.navy}14` }}
      >
        {/* Text */}
        <div
          className={`order-2 flex flex-col justify-center gap-4 px-8 py-8 lg:px-10 lg:py-10 flex-1 ${
            imageRight ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="h-[2px] w-8" style={{ background: BRAND.orange }} />
          <h3
            className="font-poppins text-[16px] font-semibold leading-snug"
            style={{ color: BRAND.navy }}
          >
            {title}
          </h3>
          <p
            className="font-poppins text-[13.5px] font-light leading-[1.9]"
            style={{ color: `${BRAND.navy}95` }}
          >
            {body}
          </p>
        </div>

        {/* Image column */}
        <div
          className={`order-1 relative w-full lg:w-[340px] xl:w-[400px] shrink-0 min-h-[240px] lg:min-h-[320px] ${
            imageRight ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
          />
          {/* Subtle top fade so the image doesn't feel cut */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(29,45,68,0.4) 0%, transparent 28%)",
            }}
            aria-hidden
          />
        </div>
      </div>
    </FadeUp>
  );
}

// ─── Organized event image data — not locale-specific ─────────────────────────
const ORGANIZED_EVENT_MEDIA = [
  { imageSrc: "/image/CERN2.jpg", imageRight: false },
  { imageSrc: "/image/Artificial.webp", imageRight: true },
  { imageSrc: "/image/13new.webp", imageRight: false },
  { imageSrc: "/image/KIMS.png", imageRight: true },
  { imageSrc: "/image/NASEM.png", imageRight: false },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ActivitiesAndEventsPage() {
  const t = useTranslations("ActivitiesEventsPage");
  const isArabic = useLocale() === "ar";

  const jumpLinks = t.raw("jumpLinks") as JumpLink[];
  const sts = t.raw("sts") as SectionCopy;
  const oes = t.raw("oes") as SectionCopy;
  const renac = t.raw("renac") as SectionCopy;
  const cern = t.raw("cern") as SectionCopy;
  const aaas = t.raw("aaas") as SectionCopy;
  const networking = t.raw("networking") as SectionCopy;
  const organizedEvents = t.raw("organizedEvents") as OrganizedEvent[];

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
              src="/image/sponsership.webp"
              alt="Activities and events"
              fill
              priority
              quality={65}
              sizes="100vw"
              className="scale-105 object-cover object-center"
            />
            {/* Directional overlay — leading heavy for text legibility */}
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
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
            <motion.div
              className={`mb-5 flex items-center gap-2 font-semibold text-white/45 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>{t("breadcrumbResearch")}</span>
            </motion.div>

            {/* Title — clip-path wipe */}
            <div
              className={`overflow-hidden ${
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-0.5"
              }`}
            >
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

          {/* White bleed into body */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Jump To (flush below hero — no extra white band) ─────────── */}
        <JumpTo
          jumpToLabel={t("jumpToLabel")}
          selectPlaceholder={t("jumpSelectPlaceholder")}
          links={jumpLinks}
        />

        {/* ── 1. STS ───────────────────────────────────────────────────── */}
        <StandardSection
          id="sts"
          imageSrc="/image/sts.webp"
          imageAlt="STS"
          imageFit="contain"
        >
          <Eyebrow label={sts.eyebrow} />
          <SectionHeading>{sts.heading}</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            {sts.body.map((p, i) => (
              <BodyText key={i}>{p}</BodyText>
            ))}
          </div>
        </StandardSection>

        {/* ── 2. OES ───────────────────────────────────────────────────── */}
        <StandardSection
          id="oes"
          imageLeft
          background={`${BRAND.lightBlue}25`}
          imageSrc="/image/Oxford.png"
          imageAlt="Oxford Energy Seminar"
        >
          <Eyebrow label={oes.eyebrow} />
          <SectionHeading>{oes.heading}</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            {oes.body.map((p, i) => (
              <BodyText key={i}>{p}</BodyText>
            ))}
          </div>
        </StandardSection>

        {/* ── 3. RENAC — sticky image ───────────────────────────────────── */}
        <StickyImageSection
          id="renac"
          background={BRAND.orange}
          decorativeGlow={<Glow position="top-right" />}
          imageSrc="/image/RENAC.jpg"
          imageAlt="RENAC renewable energy training"
        >
          <Eyebrow label={renac.eyebrow} dark />
          <SectionHeading dark>{renac.heading}</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            {renac.body.map((p, i) => (
              <BodyText key={i} dark>
                {p}
              </BodyText>
            ))}
          </div>
        </StickyImageSection>

        {/* ── 4. CERN ──────────────────────────────────────────────────── */}
        <StandardSection
          id="cern"
          imageLeft
          imageSrc="/image/CERN.png"
          imageAlt="CERN Summer Student Program"
          imageFit="contain"
        >
          <Eyebrow label={cern.eyebrow} />
          <SectionHeading>{cern.heading}</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            {cern.body.map((p, i) => (
              <BodyText key={i}>{p}</BodyText>
            ))}
          </div>
        </StandardSection>

        {/* ── 5. AAAS — sticky image ────────────────────────────────────── */}
        <StickyImageSection
          id="aaas"
          background={`${BRAND.lightBlue}25`}
          imageSrc="/image/AAAS.png"
          imageAlt="AAAS Annual Meeting"
        >
          <Eyebrow label={aaas.eyebrow} />
          <SectionHeading>{aaas.heading}</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            {aaas.body.map((p, i) => (
              <BodyText key={i}>{p}</BodyText>
            ))}
          </div>
        </StickyImageSection>

        {/* ── 6. Networking Events ─────────────────────────────────────── */}
        <StandardSection
          id="networking"
          imageLeft
          background={BRAND.orange}
          decorativeGlow={<Glow position="bottom-left" />}
          objectPosition="top"
          imageSrc="/image/N.E.png"
          imageAlt="Researchers networking"
        >
          <Eyebrow label={networking.eyebrow} dark />
          <SectionHeading dark>{networking.heading}</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            {networking.body.map((p, i) => (
              <BodyText key={i} dark>
                {p}
              </BodyText>
            ))}
          </div>
        </StandardSection>

        {/* ── 7. Organized Events ──────────────────────────────────────── */}
        <section
          id="organized"
          className={`${SECTION_X} bg-white ${SECTION_SCROLL_MT}`}
        >
          <div className={CONTAINER}>
            <FadeUp className="flex flex-col gap-3 mb-16">
              <Eyebrow label={t("organizedEyebrow")} />
              <SectionHeading>{t("organizedHeading")}</SectionHeading>
            </FadeUp>

            <div className="flex flex-col gap-5">
              {organizedEvents.map((event, i) => (
                <EventRowWithImage
                  key={event.title}
                  title={event.title}
                  body={event.body}
                  imageSrc={ORGANIZED_EVENT_MEDIA[i].imageSrc}
                  imageAlt={event.title}
                  imageRight={ORGANIZED_EVENT_MEDIA[i].imageRight}
                  delay={i * 0.06}
                />
              ))}
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
