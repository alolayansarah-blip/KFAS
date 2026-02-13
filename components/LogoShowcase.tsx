"use client";

import { useState, useEffect } from "react";
import SplitText from "./SplitText";

const tiles = [
  {
    title: "The Scientific Center",
    description:
      "The Scientific Center of Kuwait (TSCK) is a leading national institution dedicated to promoting scientific knowledge and public scientific awareness.",
    href: "https://tsck.org.kw/",
    image: "/image/sc.jpg",
    logo: "/image/logo_sc.png",
  },
  {
    title: "Sabah Al-Ahmad Center",
    description:
      "A center dedicated to nurturing talent and creativity in young individuals under the Kuwait Foundation for the Advancement of Sciences.",
    href: "https://linktr.ee/sacgc_kw",
    image: "/image/sabahAlahmad.jpg",
    logo: "/image/logo6.png",
  },
  {
    title: "Advancement of Sciences",
    description:
      "An advanced research and development center focused on innovation, scientific excellence, and the dissemination of knowledge.",
    href: "https://www.aspdkw.com/",
    image: "/image/aspd.jpg",
    logo: "/image/logo4.png",
  },
  {
    title: "Dasman Diabetes Institute",
    description:
      "Developing research projects, educational programs, and awareness-raising initiatives that improve society and combat diabetes.",
    href: "https://www.dasmaninstitute.org/",
    image: "/image/DDI.jpg",
    logo: "/image/logo5.png",
  },
];

export default function LogoShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? 0;
  const activeImage = tiles[activeIndex].image;

  const [visibleImage, setVisibleImage] = useState(activeImage);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setFadeIn(false);
    const timeout = setTimeout(() => {
      setVisibleImage(activeImage);
      setFadeIn(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [activeImage]);

  const ArrowIcon = () => (
    <svg
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
  );

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Hero */}
      <div className="relative min-h-[480px] sm:min-h-[520px] md:min-h-[620px]">
        <div className="absolute inset-0">
          <img
            src={visibleImage}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-[#488FCC]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_40%)]" />
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full px-5 sm:px-6 lg:px-8 pt-10 pb-8 sm:pt-16 sm:pb-10 max-w-7xl mx-auto">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl lg:pl-6 xl:pl-10 text-left">
                <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold text-white leading-tight tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
                  <SplitText
                    text="Building the Future"
                    className="text-white"
                    delay={40}
                    duration={1}
                    ease="easeOut"
                    splitType="chars"
                    from={{ opacity: 0, y: 10 }}
                    to={{ opacity: 1, y: 0 }}
                    textAlign="left"
                  />{" "}
                  <span className="relative inline-block">
                    <SplitText
                      text="Together"
                      className="relative z-10 text-white"
                      delay={40}
                      duration={1}
                      ease="easeOut"
                      splitType="chars"
                      from={{ opacity: 0, y: 10 }}
                      to={{ opacity: 1, y: 0 }}
                      textAlign="left"
                    />
                    <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/20 -z-10" />
                  </span>
                </h2>
                <div className="mt-5 grid w-full grid-cols-2 items-center justify-items-center gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:flex lg:flex-nowrap lg:justify-center lg:gap-10">
                  {tiles.map((tile, index) => (
                    <a
                      key={tile.title}
                      href={tile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full outline-none"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => setHoveredIndex(index)}
                      aria-label={tile.title}
                    >
                      <img
                        src={tile.logo}
                        alt={`${tile.title} logo`}
                        className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain brightness-0 invert opacity-0 animate-[fadeUp_0.8s_ease-out_forwards]"
                        style={{ animationDelay: `${index * 120}ms` }}
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="hidden lg:flex lg:w-[380px] xl:w-[420px]">
                <div className="w-full rounded-2xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={tiles[activeIndex].image}
                      alt={tiles[activeIndex].title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="pt-4">
                    <h3 className="font-poppins text-lg font-semibold text-white">
                      {tiles[activeIndex].title}
                    </h3>
                    <p className="font-poppins mt-2 text-sm text-white/75 leading-relaxed">
                      {tiles[activeIndex].description}
                    </p>
                    <a
                      href={tiles[activeIndex].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white group"
                    >
                      <span className="font-poppins">Read More</span>
                      <ArrowIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
