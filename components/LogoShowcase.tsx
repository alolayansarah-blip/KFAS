"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 };

type PartnerTile = {
  title: string;
  description: string;
  href: string;
  image: string;
  logo?: string;
  placeholder?: boolean;
  /** Default true — set false for logos with dark/colored artwork (e.g. SACA) */
  logoInvert?: boolean;
  /** White pill behind logo when invert is off */
  logoLightBg?: boolean;
  panelLogoMaxWidth?: number;
  panelLogoScale?: number;
};

function PartnerLogo({
  tile,
  large = false,
  active = true,
  isArabic = false,
}: {
  tile: PartnerTile;
  large?: boolean;
  active?: boolean;
  isArabic?: boolean;
}) {
  if (!tile.logo) return null;

  const invert = tile.logoInvert !== false;
  const largeClass =
    "h-full w-auto object-contain object-left rtl:object-right";
  const img = (
    <img
      src={tile.logo}
      alt={tile.title}
      className={
        large
          ? largeClass
          : "mx-auto max-h-[40px] w-auto max-w-[110px] object-contain transition-all duration-500 sm:max-h-[46px]"
      }
      style={{
        ...(invert ? { filter: "brightness(0) invert(1)" } : {}),
        opacity: invert ? (active ? 1 : 0.5) : active ? 1 : 0.85,
        ...(large
          ? {
              maxWidth: tile.panelLogoMaxWidth ?? 280,
              ...(tile.panelLogoScale
                ? {
                    transform: `scale(${tile.panelLogoScale})`,
                    transformOrigin: isArabic ? "right center" : "left center",
                  }
                : {}),
            }
          : {}),
      }}
    />
  );

  if (tile.logoLightBg) {
    return (
      <div
        className={
          large
            ? "rounded-md bg-white px-3 py-2 shadow-sm"
            : "rounded bg-white/95 px-2 py-1.5 shadow-sm"
        }
      >
        {img}
      </div>
    );
  }

  return img;
}

function PartnerLogoPlaceholder({
  title,
  className = "",
  active = false,
  large = false,
}: {
  title: string;
  className?: string;
  active?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center justify-center rounded border border-dashed border-white/25 bg-white/[0.06]",
        large
          ? "h-full min-h-[72px] w-full max-w-[240px] px-6"
          : "h-full w-full max-w-[120px] px-3",
        active ? "opacity-100" : "opacity-50",
        className,
      ].join(" ")}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <svg
          className={large ? "h-7 w-7 text-white/35" : "h-5 w-5 text-white/35"}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
          />
        </svg>
        <span
          className={[
            "font-medium uppercase tracking-[0.14em] text-white/40",
            large ? "text-[11px]" : "text-[9px]",
          ].join(" ")}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

// Static per-tile data that isn't translated (links, images, logo styling).
const TILE_DATA = [
  {
    titleKey: "partner1Title",
    descriptionKey: "partner1Description",
    href: "https://tsck.org.kw/",
    image: "/image/SCNew.webp",
    logo: "/image/TSCKLogo.png",
  },
  {
    titleKey: "partner2Title",
    descriptionKey: "partner2Description",
    href: "https://linktr.ee/sacgc_kw",
    image: "/image/SAAC.webp",
    logo: "/image/SACA.png",
    panelLogoMaxWidth: 300,
    panelLogoScale: 1.35,
  },
  {
    titleKey: "partner3Title",
    descriptionKey: "partner3Description",
    href: "https://www.aspdkw.com/",
    image: "/image/aspd.png",
    logo: "/image/aspdlogo.png",
  },
  {
    titleKey: "partner4Title",
    descriptionKey: "partner4Description",
    href: "https://www.dasmaninstitute.org/",
    image: "/image/DDI.webp",
    logo: "/image/DDIlogo.png",
  },
  {
    titleKey: "partner5Title",
    descriptionKey: "partner5Description",
    href: "http://www.knsrc.org.kw/",
    image: "/image/NSRC2.webp",
    logo: "/image/NSRClogo.png",
  },
  {
    titleKey: "partner6Title",
    descriptionKey: "partner6Description",
    href: "https://booking.ascckw.com/ticket-selection",
    image: "/image/AbdullahAlsalemBuilding.jpg",
    logo: "/image/ABdullahAlsalem.png",
  },
] as const;

export default function LogoShowcase() {
  const t = useTranslations("LogoShowcase");
  const isArabic = useLocale() === "ar";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, VIEWPORT);

  const tiles: PartnerTile[] = TILE_DATA.map((tile) => ({
    title: t(tile.titleKey),
    description: t(tile.descriptionKey),
    href: tile.href,
    image: tile.image,
    logo: tile.logo,
    ...("panelLogoMaxWidth" in tile
      ? { panelLogoMaxWidth: tile.panelLogoMaxWidth }
      : {}),
    ...("panelLogoScale" in tile
      ? { panelLogoScale: tile.panelLogoScale }
      : {}),
  }));

  /** Default to the first partner so the left panel + background are never empty */
  const activeIndex = hoveredIndex ?? 0;
  const active = tiles[activeIndex];
  const isDefault = hoveredIndex === null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-32 lg:py-40"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* ---------- Background ---------- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Partner photo, crossfades on hover */}
        <AnimatePresence>
          <motion.img
            key={active.image}
            src={active.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </AnimatePresence>

        {/* Elegant gradient anchored on #7DC0F1 — lifts slightly on hover so the photo reads */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#7DC0F1] via-[#488FCC] to-[#16263b] transition-opacity duration-700"
          style={{ opacity: isDefault ? 0.92 : 0.62 }}
        />
        {/* Soft radial glow for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: isArabic
              ? "radial-gradient(120% 90% at 85% 25%, rgba(125,192,241,0.55) 0%, rgba(125,192,241,0) 55%)"
              : "radial-gradient(120% 90% at 15% 25%, rgba(125,192,241,0.55) 0%, rgba(125,192,241,0) 55%)",
          }}
        />
        {/* Veil so the text column stays crisp — anchored on the text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c2e]/75 via-[#0f1c2e]/15 to-transparent rtl:bg-gradient-to-l" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* ===== LEFT : heading + dynamic info (compact) ===== */}
          <div className="lg:pr-8 rtl:lg:pr-0 rtl:lg:pl-8">
            <motion.p
              className={`mb-2.5 font-semibold text-white/45 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.42em]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h2
              className="mb-4 font-poppins text-3xl sm:text-4xl font-semibold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              {t("headingMain")}{" "}
              <span className="font-extralight italic text-white/55">
                {t("headingEmphasis")}
              </span>
            </motion.h2>

            <motion.div
              className="mb-6 h-px w-28 origin-left rtl:origin-right bg-gradient-to-r rtl:bg-gradient-to-l from-[#EC601B]/70 via-[#7DC0F1]/40 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            />

            {/* Dynamic partner info — swaps on hover */}
            <div className="min-h-[220px] sm:min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {/* Active partner mark — ties the panel to the grid */}
                  <div className="mb-5 flex h-14 items-center overflow-visible sm:h-16 lg:h-[72px]">
                    {active.placeholder ? (
                      <PartnerLogoPlaceholder
                        title={active.title}
                        large
                        active
                      />
                    ) : (
                      <PartnerLogo
                        tile={active}
                        large
                        active
                        isArabic={isArabic}
                      />
                    )}
                  </div>

                  <h3 className="mb-3 font-poppins text-2xl sm:text-3xl font-semibold text-white">
                    {active.title}
                  </h3>
                  <p className="mb-6 max-w-sm text-[14px] font-light leading-relaxed text-white/75">
                    {active.description}
                  </p>
                  <a
                    href={active.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#EC601B] transition-colors hover:text-[#ff7a36]"
                  >
                    {t("visitPartnerLabel")}
                    <svg
                      className="h-3.5 w-3.5 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
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
              </AnimatePresence>
            </div>
          </div>

          {/* ===== RIGHT : logo grid (2 cols on mobile, 3 cols from sm) ===== */}
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4">
            {tiles.map((tile, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.a
                  key={tile.title}
                  href={tile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`group relative block cursor-pointer ${
                    isActive ? "z-20" : ""
                  }`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.2 + index * 0.08,
                    ease: EASE,
                  }}
                >
                  <div
                    className={`relative flex aspect-square w-full flex-col items-center justify-center px-4 py-6 border transition-all duration-500 ${
                      isActive
                        ? "scale-[1.05] border-[#EC601B]/60 bg-white/10 backdrop-blur-sm"
                        : "border-white/12 bg-white/[0.04] hover:bg-white/[0.07]"
                    }`}
                  >
                    {/* Orange top bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] origin-left rtl:origin-right bg-[#EC601B] transition-transform duration-500 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />

                    {/* Logo */}
                    <div className="flex h-12 w-full items-center justify-center sm:h-14">
                      {tile.placeholder ? (
                        <PartnerLogoPlaceholder
                          title={tile.title}
                          active={isActive}
                        />
                      ) : (
                        <PartnerLogo tile={tile} active={isActive} />
                      )}
                    </div>

                    {/* Caption */}
                    <p
                      className={`mt-3.5 text-center text-[10.5px] font-medium leading-snug transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/45"
                      }`}
                    >
                      {tile.title}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
