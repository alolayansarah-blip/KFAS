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
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-px w-8 shrink-0"
        style={{ background: dark ? "rgba(255,255,255,0.4)" : BRAND.orange }}
      />
      <span
        className="font-poppins text-[10px] font-semibold uppercase tracking-[0.35em]"
        style={{ color: dark ? "rgba(255,255,255,0.55)" : BRAND.orange }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── AccentLine ──────────────────────────────────────────────────────────────
function AccentLine({ dark = false }: { dark?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="h-px origin-left mt-4"
      style={{
        background: dark
          ? "rgba(255,255,255,0.18)"
          : `linear-gradient(to right, ${BRAND.orange}, ${BRAND.lightBlue}40, transparent)`,
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
  return (
    <p
      className="font-poppins text-[14.5px] font-light leading-[1.9]"
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
function Glow({ position }: { position: "top-right" | "bottom-left" }) {
  return (
    <div
      className={`pointer-events-none absolute w-[480px] h-[480px] rounded-full blur-3xl opacity-20 ${
        position === "top-right" ? "-top-32 -right-32" : "-bottom-32 -left-32"
      }`}
      style={{ background: "white" }}
      aria-hidden
    />
  );
}

// ─── JumpTo nav ───────────────────────────────────────────────────────────────
// Sticky in-page nav placed directly after the hero. Horizontal row on desktop,
// tappable dropdown on mobile. Smooth-scrolls to each topic and highlights the
// active section on scroll.
const JUMP_LINKS = [
  { id: "sts", label: "STS Forum" },
  { id: "oes", label: "Oxford Energy Seminar" },
  { id: "renac", label: "RENAC Training" },
  { id: "cern", label: "CERN Program" },
  { id: "aaas", label: "AAAS Meeting" },
  { id: "networking", label: "Networking Events" },
  { id: "organized", label: "Organized Events" },
];

function JumpTo() {
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
        setActive(JUMP_LINKS[JUMP_LINKS.length - 1].id);
        return;
      }

      let current = "";
      for (const link of JUMP_LINKS) {
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
  }, [getJumpOffset]);

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
    JUMP_LINKS.find((l) => l.id === active)?.label ?? "Select a topic";

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
          <div className="flex items-center gap-2.5 pr-4 shrink-0">
            <span
              className="h-3.5 w-[3px] rounded-full"
              style={{ background: BRAND.orange }}
            />
            <span
              className="font-poppins text-[12px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: BRAND.navy }}
            >
              Jump To
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
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
            {JUMP_LINKS.map((link) => {
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
              Jump To
            </span>
            <span
              className="ml-1 truncate font-poppins text-[13px] font-medium"
              style={{ color: active ? BRAND.orange : `${BRAND.navy}80` }}
            >
              {activeLabel}
            </span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-auto shrink-0"
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
                  {JUMP_LINKS.map((link) => {
                    const isActive = active === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleClick(link.id)}
                        className="flex items-center gap-3 px-1 py-2 text-left font-poppins text-[14px] font-medium transition-colors"
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

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ActivitiesAndEventsPage() {
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
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex h-[60vh] min-h-[420px] items-end justify-start overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <video
              className="absolute inset-0 h-full w-full scale-110 object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Activities and events"
            >
              <source src="/image/BannerActivites.mp4" type="video/mp4" />
            </video>
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

          {/* padding on the wrapper, max-width on the inner div — matches body sections */}
          <motion.div
            className="relative z-10 w-full px-6 pb-14 pt-28 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <div className={`${CONTAINER} w-full`}>
              <motion.div
                className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <span>Research</span>
                <span className="text-white/25">/</span>
                <span>Activities &amp; Events</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
                >
                  Activities &amp; Events
                </motion.h1>
              </div>

              <motion.div
                className="mt-5 h-[3px] w-[72px] origin-left rounded-full bg-[#EC601B]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              />
            </div>
          </motion.div>
        </section>

        {/* ── Jump To (flush below hero — no extra white band) ─────────── */}
        <JumpTo />

        {/* ── 1. STS ───────────────────────────────────────────────────── */}
        <StandardSection
          id="sts"
          imageSrc="/image/sts.webp"
          imageAlt="STS"
          imageFit="contain"
        >
          <Eyebrow label="STS" />
          <SectionHeading>
            Science and Technology in Society (STS) Forum
          </SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            <BodyText>
              The Science and Technology in Society (STS) Forum is a leading
              global platform held annually in Kyoto, Japan, bringing together
              world leaders from science, industry, and policy to discuss how
              science and technology can address long‑term global challenges.
              The forum welcomes over a thousand participants each year,
              including Nobel laureates, ministers, university presidents, CEOs,
              and emerging young leaders. It aims to strengthen the positive
              impact of scientific progress while addressing its risks and
              societal implications.
            </BodyText>
            <BodyText>
              KFAS supports Kuwaiti researchers and professionals to participate
              in the STS Young Leaders Program, which invites outstanding
              individuals under 40 to engage directly with global experts. The
              program offers high‑level dialogue, exposure to international
              innovation trends, and opportunities to build lasting networks
              that contribute to Kuwait's scientific and technological
              development.
            </BodyText>
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
          <Eyebrow label="OES" />
          <SectionHeading>The Oxford Energy Seminar</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            <BodyText>
              It is a residential educational conference that brings together
              government officials, industry leaders, managers, and
              professionals involved in energy policy and decision-making.
              Widely recognized as an important international forum on energy,
              the seminar provides participants with an intensive overview of
              current developments, challenges, and opportunities shaping the
              global energy landscape and the energy transition.
            </BodyText>
            <BodyText>
              The program features lectures, discussions, and exchanges led by a
              diverse international panel of experts from governments, the
              energy industry, financial institutions, academia, and
              international organizations.
            </BodyText>
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
          <Eyebrow label="RENAC" dark />
          <SectionHeading dark>RENAC Training Programs</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            <BodyText dark>
              The Research Capacity Building Directorate collaborates with RENAC
              (Renewables Academy) to provide both online and in person training
              opportunities in renewable energy and energy efficiency. The
              Renewables Academy (RENAC) in Berlin is one of the world's leading
              institutions for professional training and capacity building in
              renewable energy and energy efficiency.
            </BodyText>
            <BodyText dark>
              As part of its commitment to developing national expertise in
              clean energy, KFAS sponsors Kuwaiti students to enroll in RENAC's
              six month online training program in renewable energy and energy
              efficiency. The program provides a structured and in depth
              learning experience covering core technologies, system design,
              energy policy, and practical applications within the global
              renewable energy sector.
            </BodyText>
            <BodyText dark>
              Through this sponsorship, participants gain access to high quality
              online modules, expert instruction, and internationally recognized
              training materials, equipping them with the skills needed to
              contribute to Kuwait's transition toward sustainable energy
              solutions. The program serves as an important stepping stone for
              emerging engineers, scientists, and energy professionals seeking
              to build technical competency and advance their careers in the
              renewable energy field.
            </BodyText>
            <BodyText dark>
              In addition to the online program, selected graduates may be
              offered the opportunity to participate in advanced in person
              training at RENAC's training center in Berlin. These specialized
              courses provide hands on experience in the design, analysis, and
              evaluation of renewable energy systems using industry standard
              tools and applications. Building on the knowledge acquired through
              the online program, the in person training further strengthens
              participants' technical expertise and professional capabilities in
              the renewable energy sector{" "}
            </BodyText>
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
          <Eyebrow label="CERN" />
          <SectionHeading>
            CERN (The European Organization for Nuclear Research) Summer Student
            Program
          </SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            <BodyText>
              KFAS fund students to participate in the prestigious summer
              training program at the CERN (European Organization for Nuclear
              Research) headquarters in Geneva, Switzerland. During their 8-week
              stay at CERN, these students worked alongside world-renowned
              scientists and researchers in the state-of-the-art research labs
              and accelerators.
            </BodyText>
            <BodyText>
              This hands-on experience allowed them to engage in groundbreaking
              scientific research and gain valuable insights into the advanced
              technologies used in particle physics and other related fields.
              Their time at CERN expanded their academic and practical knowledge
              and provided them with a unique opportunity to contribute to
              cutting-edge research in a global scientific community.
            </BodyText>
          </div>
        </StandardSection>

        {/* ── 5. AAAS — sticky image ────────────────────────────────────── */}
        <StickyImageSection
          id="aaas"
          background={`${BRAND.lightBlue}25`}
          imageSrc="/image/AAAS.png"
          imageAlt="AAAS Annual Meeting"
        >
          <Eyebrow label="AAAS" />
          <SectionHeading>AAAS Annual Meeting</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            <BodyText>
              The AAAS American Association for the Advancement of Science
              Annual Conference is one of the world's leading multidisciplinary
              science gatherings, bringing together researchers, students,
              policymakers, and global science leaders to explore emerging
              discoveries and engage in high-level scientific dialogue. The
              conference features keynote talks, panel discussions, workshops,
              exhibitions, and a wide range of poster and e-poster presentations
              across all scientific fields.
            </BodyText>
            <BodyText>
              KFAS participates annually by sponsoring Kuwaiti students and
              researchers to present their work and represent Kuwait on an
              international stage. Participants showcase their research through
              e-poster presentations, attend scientific sessions, and engage
              with peers and experts from around the world, strengthening their
              scientific skills, expanding international networks, and
              contributing to Kuwait's visibility within the global research
              community.
            </BodyText>
            <BodyText>
              In 2025, two KFAS-sponsored students received Honorable Mention
              recognition from the AAAS organization for the quality and impact
              of their presentations, an important milestone highlighting the
              excellence of young Kuwaiti researchers participating in the
              program.
            </BodyText>
            <BodyText>
              Through this annual participation, KFAS continues to build
              national research capacity and open doors for emerging scientists
              to engage in international scientific exchange at one of the most
              prestigious scientific conferences in the world.
            </BodyText>
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
          <Eyebrow label="Networking Events" dark />
          <SectionHeading dark>Networking Events</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            <BodyText dark>
              Our networking activities aim to strengthen connections within the
              research community and foster a collaborative environment among
              researchers supported by the foundation. By bringing together
              scholars from diverse disciplines and institutions, these
              activities encourage the exchange of ideas, perspectives, and
              experiences that can inspire new research directions and
              partnerships.
            </BodyText>
            <BodyText dark>
              They also support professional development and help build lasting
              relationships among researchers, contributing to a dynamic
              research community and enhancing the broader impact of scientific
              research.
            </BodyText>
          </div>
        </StandardSection>

        {/* ── 7. Organized Events ──────────────────────────────────────── */}
        <section
          id="organized"
          className={`${SECTION_X} bg-white ${SECTION_SCROLL_MT}`}
        >
          <div className={CONTAINER}>
            <FadeUp className="flex flex-col gap-3 mb-16">
              <Eyebrow label="Organized Events" />
              <SectionHeading>Organized Events</SectionHeading>
            </FadeUp>

            <div className="flex flex-col gap-5">
              <EventRowWithImage
                title="CERN Scientific CV writing workshop"
                imageSrc="/image/CERN2.jpg"
                imageAlt="CERN Scientific CV writing workshop"
                body="The CERN (The European Organization for Nuclear Research) CV Workshop is a scientific CV-writing session organized by KFAS to help Kuwaiti students prepare strong, competitive CVs for the CERN Summer Student Training Program. It teaches students how to present their academic, research, and technical experience in a way that meets CERN's strict application requirements, while also guiding them on structure, clarity, and relevance. The workshop is open to eligible Kuwaiti bachelor and master's students in Physics, Computer Science, Mathematics, or Engineering, and often includes practical guidance, post-session CV reviews, and insights from former CERN participants. As part of KFAS's collaboration, the workshop supports national capacity-building by ensuring applicants are well-prepared before applying."
                delay={0}
              />

              <EventRowWithImage
                title="Artificial Intelligence Empowering Research Workshop Led by Elsevier"
                imageSrc="/image/Artificial.webp"
                imageAlt="Artificial Intelligence Empowering Research Workshop Led by Elsevier"
                imageRight
                body={`The Elsevier Workshop was a full-day training session titled "AI Empowering Research," delivered by Elsevier experts and hosted by KFAS. It explored how artificial intelligence was transforming research, publishing, and research management. The workshop covered key topics such as GenAI in research management and its limitations, AI-driven publishing workflows, how leading organizations were using AI, as well as pitfalls, best practices, and research integrity in the context of AI adoption. Participants also received practical, hands-on training with Elsevier's AI tools, applying them in group exercises—including preparing a mock funding proposal. Designed for Kuwaiti researchers, academics, and research administrators, the workshop formed part of KFAS's broader efforts to strengthen national research capacity and promote the responsible use of AI in scientific work.`}
                delay={0.06}
              />

              <EventRowWithImage
                title="Research & Technology Directorate Networking Day"
                imageSrc="/image/13new.webp"
                imageAlt="Research & Technology Directorate Networking Day"
                body={`The RTD Research Networking Day was an open, full-day event that provided researchers with the opportunity to engage directly with teams, ask questions, explore available programs, and discuss potential collaborations. The day featured open networking sessions, informational booths, and a special lecture titled "The Art of Crafting a Proposal: From Start to Finish," which guided attendees on developing strong research proposals. The event aimed to create a productive space for researchers to exchange ideas, receive guidance, and build connections across the research community.`}
                delay={0.12}
              />

              <EventRowWithImage
                title="Informative Session for the Research Community"
                imageSrc="/image/KIMS.png"
                imageAlt="Informative Session for the Research Community"
                imageRight
                body="The Research Capacity Building Directorate delivered an informative session aimed at the scientific community to introduce KFAS’s research support ecosystem and available services.
The session provided an overview of KFAS’s mission and vision, and highlighted the range of research support offerings available through the Research and Technology Directorate (RTD). It also demonstrated how to use the Pure Portal to access research outputs, track impact, and identify potential collaborators.
In addition, the session introduced the tools and platforms available to support grants, networking, outreach, and broader research engagement. Overall, the session aimed to strengthen awareness of KFAS resources and enhance researchers’ ability to navigate the national research ecosystem and access opportunities for collaboration at both national and international levels."
                delay={0.18}
              />

              <EventRowWithImage
                title="KFASxNASEM Workshops"
                imageSrc="/image/NASEM.png"
                imageAlt="KFASxNASEM workshops"
                body={`KFAS collaborates with the U.S. National Academies of Sciences, Engineering, and Medicine (NASEM) through two major bilateral workshop series designed to advance scientific exchange between Kuwait and the United States. The first, "Promising Practices for Improving the Inclusion of Women in Science, Engineering, and Medicine: Lessons From Kuwait and the United States - Workshop Series" (2020), brought together experts and leaders to explore strategies for enhancing female participation in STEM fields. The second, "Precision Medicine: Promoting Knowledge Exchange and Collaboration between Kuwait and the United States - Workshop Series" (2024-2025), focuses on emerging innovations in personalized medicine, including AI in healthcare, point-of-care technologies, and interdisciplinary approaches. Both collaborations produce published workshop proceedings, ensuring that insights and recommendations are shared with the wider scientific and policy community.`}
                delay={0.24}
              />
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
