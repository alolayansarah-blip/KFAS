"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { NavItem } from "@/types";

// Constants
const SCROLL_THRESHOLD = 50;

// Navigation data
const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/AboutKfas" },
      { label: "Our History", href: "/OurHistory" },
      { label: "Our Strategy", href: "/OurStrategy" },
      { label: "Board of Directors", href: "/BoardOfDirectors" },
      { label: "Executive Management", href: "/about/executive-management" },
    ],
  },
  {
    label: "Research",
    href: "/Research",
    children: [
      { label: "Grants", href: "/research/grants" },
      {
        label: "Activities and Events",
        href: "/research/Activities-and-Events",
      },
      { label: "Projects", href: "/research/projects" },
      { label: "Scientific Missions", href: "/research/Scientific-Missions" },
      {
        label: "Scientific Conference Sponsorship",
        href: "/research/scientific-conference-sponsorship",
      },
    ],
  },
  {
    label: "Tech & Innovation",
    href: "/technology-and-innovation",
    children: [
      {
        label: "Tech Deployment",
        href: "/technology-and-innovation/technology-deployment",
      },
      {
        label: "R&D in Private Sector",
        href: "/technology-and-innovation/RD-in-Private-Sector",
      },
      {
        label: "R&D in Public Sector",
        href: "/technology-and-innovation/RD-in-Public-Sector",
      },
      // { label: "Outcomes", href: "/technology-and-innovation/Outcomes2" },
    ],
  },
  {
    label: "Learning & Development",
    href: "/Learning-and-Development",
    children: [
      { label: "Researchers", href: "/Learning-and-Development/Researchers" },
      {
        label: "Professionals",
        href: "/Learning-and-Development/Professionals",
      },
      { label: "Youth", href: "/Learning-and-Development/Youth" },
      {
        label: "Special Needs",
        href: "/Learning-and-Development/Special-needs",
      },
      // { label: "Outcomes", href: "/Learning-and-Development/Outcomes3" },
    ],
  },
  {
    label: "Science & Society",
    href: "/Science-and-Society",
    children: [
      {
        label: "Activity and Funding",
        href: "/Science-and-Society/Activity-and-Funding",
      },
      {
        label: "Activities and Events",
        href: "/Science-and-Society/Activities-and-Events",
      },
      { label: "Publications", href: "/Science-and-Society/Publications" },
      // { label: "Outcomes", href: "/Science-and-Society/Outcomes4" },
    ],
  },
  {
    label: "Prizes",
    href: "/Prizes",
    children: [
      { label: "Kuwait Prize", href: "/Prizes/Kuwait-Prize" },
      { label: "Jaber Al-Ahmed Prize", href: "/Prizes/Jaber-Al-Ahmed-Prize" },
      { label: "Al Sumait Prize", href: "/Prizes/Al-Sumait-Prize" },
      { label: "Laureates", href: "/Prizes/Laureates" },
    ],
  },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇰🇼" },
];

interface HeaderProps {
  logo?: string;
  logoText?: string;
  navItems?: NavItem[];
  forceWhiteBackground?: boolean;
}

// Subcomponents
const AnniversaryLogo = ({ isScrolled }: { isScrolled: boolean }) => {
  const logoProps = {
    className: "absolute inset-0 w-full h-full object-contain",
    style: { filter: "drop-shadow(0 2px 4px rgba(255, 255, 255, 0.2))" },
  };

  return (
    <div className="relative w-16 h-12">
      <motion.img
        src="/image/50.png"
        alt="50 Years"
        {...logoProps}
        initial={false}
        animate={{ opacity: isScrolled ? 0 : 1, scale: isScrolled ? 0.8 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.img
        src="/image/50_gold.png"
        alt="50 Years Gold"
        {...logoProps}
        initial={false}
        animate={{ opacity: isScrolled ? 1 : 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
};

const DropdownIcon = ({
  isOpen,
  className = "",
}: {
  isOpen?: boolean;
  className?: string;
}) => (
  <svg
    className={`transition-all duration-300 ${className} ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
);

const DesktopNavItem = ({
  item,
  isScrolled,
  openDropdown,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavItem;
  isScrolled: boolean;
  openDropdown: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const isOpen = openDropdown === item.href;
  const baseStyles =
    "hover:bg-[#EC601B] font-normal transition-all duration-300 px-2 lg:px-2.5 py-1.5 whitespace-nowrap text-xs lg:text-sm";
  const colorStyles = isOpen
    ? "bg-[#EC601B] text-white"
    : isScrolled
      ? "text-black hover:text-white"
      : "text-white/90 hover:text-white";

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item.children ? (
        <span
          className={`${baseStyles} ${colorStyles} flex items-center cursor-pointer`}
        >
          {item.label}
          <DropdownIcon className="ml-0.5 w-3 h-3" />
        </span>
      ) : (
        <Link href={item.href} className={`${baseStyles} ${colorStyles}`}>
          {item.label}
        </Link>
      )}

      {item.children && isOpen && (
        // ✅ FIXED: Use static class name for min-w
        <div className="absolute top-full left-0 mt-0 bg-[#EC601B] shadow-lg py-4 min-w-[280px] z-50">
          {item.children.map((child, index) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block px-6 py-3 text-white hover:bg-white/20 transition-colors whitespace-nowrap ${
                index < item.children!.length - 1
                  ? "border-b border-white/50"
                  : ""
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const LanguageSwitcher = ({
  currentLanguage,
  isOpen,
  isScrolled,
  onToggle,
  onSelect,
}: {
  currentLanguage: string;
  isOpen: boolean;
  isScrolled: boolean;
  onToggle: () => void;
  onSelect: (code: string) => void;
}) => (
  <div className="relative language-switcher ml-1">
    <button
      onClick={onToggle}
      className={`flex items-center space-x-1 transition-colors px-2 py-1.5 ${
        isScrolled
          ? "text-black hover:text-gray-700"
          : "text-white/90 hover:text-white"
      }`}
      aria-label="Change language"
      aria-expanded={isOpen}
    >
      <span className="uppercase text-xs lg:text-sm">{currentLanguage}</span>
      <DropdownIcon isOpen={isOpen} className="w-3 h-3" />
    </button>

    {isOpen && (
      <div className="absolute right-0 top-full mt-0 bg-[#EC601B] shadow-lg py-4 min-w-[200px] z-50">
        {LANGUAGES.map((lang, index) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className={`w-full text-left px-6 py-3 text-white hover:bg-white/20 transition-colors flex items-center space-x-2 ${
              index < LANGUAGES.length - 1 ? "border-b border-white/50" : ""
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    )}
  </div>
);

function Header({
  logo,
  logoText = "KFAS",
  navItems = [],
  forceWhiteBackground = false,
}: HeaderProps) {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const navItemsList = navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS;
  const shouldShowWhiteBg = isScrolled || forceWhiteBackground;

  // Effects
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isLangDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-switcher")) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangDropdownOpen]);

  // Handlers
  const handleLanguageSelect = (code: string) => {
    setCurrentLanguage(code);
    setIsLangDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        shouldShowWhiteBg
          ? "md:bg-white/90 bg-transparent backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Desktop Header */}
      <nav
        className={`hidden md:block w-full max-w-7xl mx-auto px-4 lg:px-6 xl:px-8 transition-all duration-300 ${
          shouldShowWhiteBg ? "py-0.5" : "py-3"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {logo ? (
              <img
                src={shouldShowWhiteBg ? "/image/logo_c.png" : logo}
                alt={logoText}
                className="w-auto transition-all duration-300 h-20"
              />
            ) : (
              <span
                className={`font-normal transition-all duration-300 ${
                  shouldShowWhiteBg
                    ? "text-xl text-black"
                    : "text-2xl text-white"
                }`}
              >
                {logoText}
              </span>
            )}
            <AnniversaryLogo isScrolled={shouldShowWhiteBg} />
          </Link>

          {/* Navigation Section */}
          <div className="flex items-center justify-end gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-0">
              {navItemsList.map((item) => (
                <DesktopNavItem
                  key={item.href}
                  item={item}
                  isScrolled={shouldShowWhiteBg}
                  openDropdown={openDropdown}
                  onMouseEnter={() =>
                    item.children && setOpenDropdown(item.href)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                />
              ))}
            </div>

            <LanguageSwitcher
              currentLanguage={currentLanguage}
              isOpen={isLangDropdownOpen}
              isScrolled={shouldShowWhiteBg}
              onToggle={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              onSelect={handleLanguageSelect}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="md:hidden w-full bg-white shadow-sm">
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <img
              src="/image/logo_c.png"
              alt={logoText}
              className="h-16 w-auto"
            />
            <span className="h-6 w-px bg-gray-300" />
            <img
              src="/image/50_gold.png"
              alt="50 Years"
              className="h-10 w-auto"
            />
          </Link>

          <button
            className="p-2.5 rounded-lg text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-all active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-t border-gray-100 shadow-lg"
            >
              <div className="px-5 py-4 space-y-1">
                {navItemsList.map((item) => (
                  <div key={item.href}>
                    {item.children ? (
                      <>
                        <button
                          className="w-full flex items-center justify-between py-3.5 px-2 font-normal text-gray-800 hover:text-[#EC601B] hover:bg-gray-50 rounded-lg transition-all group"
                          onClick={() =>
                            setOpenMobileDropdown(
                              openMobileDropdown === item.href
                                ? null
                                : item.href,
                            )
                          }
                          aria-expanded={openMobileDropdown === item.href}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1 h-5 bg-[#EC601B] opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
                            <span>{item.label}</span>
                          </span>
                          <DropdownIcon
                            isOpen={openMobileDropdown === item.href}
                            className={`w-5 h-5 text-gray-400 group-hover:text-[#EC601B] ${
                              openMobileDropdown === item.href
                                ? "text-[#EC601B]"
                                : ""
                            }`}
                          />
                        </button>

                        {openMobileDropdown === item.href && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-1 space-y-0.5 bg-gray-50/50 rounded-lg py-2 border-l-2 border-[#EC601B]/30"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block py-2.5 px-4 font-normal text-gray-600 hover:text-[#EC601B] hover:bg-white rounded-md transition-all"
                                onClick={closeMobileMenu}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3.5 px-2 font-normal text-gray-800 hover:text-[#EC601B] hover:bg-gray-50 rounded-lg transition-all group"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1 h-5 bg-[#EC601B] opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
                          <span>{item.label}</span>
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Language Switcher - Mobile */}
              <div className="mt-2 pt-4 border-t border-gray-100 px-5 pb-4">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="w-full flex items-center justify-between py-3.5 px-2 font-normal text-gray-800 hover:text-[#EC601B] hover:bg-gray-50 rounded-lg transition-all group"
                  aria-label="Change language"
                  aria-expanded={isLangDropdownOpen}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#EC601B] opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
                    <span className="flex items-center space-x-2">
                      <span className="uppercase text-sm">
                        {currentLanguage}
                      </span>
                      <span>Language</span>
                    </span>
                  </span>
                  <DropdownIcon
                    isOpen={isLangDropdownOpen}
                    className={`w-5 h-5 text-gray-400 group-hover:text-[#EC601B] ${
                      isLangDropdownOpen ? "text-[#EC601B]" : ""
                    }`}
                  />
                </button>

                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 mt-2 space-y-0.5 bg-[#EC601B] rounded-lg py-2 border-l-2 border-white/30"
                  >
                    {LANGUAGES.map((lang, index) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`w-full text-left py-3 px-4 font-normal text-white hover:bg-white/20 rounded-md transition-all flex items-center space-x-2 ${
                          index < LANGUAGES.length - 1
                            ? "border-b border-white/50"
                            : ""
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default memo(Header);
