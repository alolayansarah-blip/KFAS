"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types";

const SCROLL_THRESHOLD = 50;
const NAV_CLOSE_DELAY_MS = 220;
const LANG_STORAGE_KEY = "kfas-lang";
const HREF_OUR_TEAM = "/about/our-team";

function navItemKey(item: NavItem) {
  return `${item.href}::${item.label}`;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about/AboutKfas" },
      { label: "Our History", href: "/about/OurHistory" },
      { label: "Our Strategy", href: "/about/OurStrategy" },
      { label: "Board of Directors", href: "/about/BoardOfDirectors" },
      { label: "Our Team", href: "/about/our-team" },
    ],
  },
  {
    label: "Research",
    href: "/Research",
    children: [
      {
        label: "Grants",
        href: "/research/grants",
      },
      { label: "Activities and Events", href: "/research/ActivitiesAndEvents" },
      { label: "Assigned Studies", href: "/research/AssignedStudies" },
      {
        label: "Scientific Conference Sponsorship",
        href: "/Research/scientific-conference-sponsorship",
      },
      {
        label: "Tech Deployment",
        href: "/technology-and-innovation/technology-deployment",
      },
      {
        label: "R&D in Private Sector",
        href: "/technology-and-innovation/RD-in-Private-Sector",
      },
      {
        label: "KFAS Research Portal",
        href: "/research/KFASResearchPortal",
      },
    ],
  },
  {
    label: "Learning & Development",
    href: "/Learning-and-Development",
    children: [
      {
        label: "Researchers",
        href: "/Learning-and-Development/Researchers",
        children: [
          {
            label: "International Collaborative Research",
            href: "/Learning-and-Development/Researchers/International-Collaborative-Research",
          },
          {
            label: "Scholar Fellowship",
            href: "/Learning-and-Development/Researchers/Scholar-Fellowship",
          },
          {
            label: "Scholarly Publication",
            href: "/Learning-and-Development/Researchers/Scholarly-Publication",
          },
          {
            label: "Scientific Missions",
            href: "/Learning-and-Development/Researchers/Scientific-Missions",
          },
        ],
      },
      {
        label: "Professionals",
        href: "/Learning-and-Development/Professionals",
      },
      { label: "Youth", href: "/Learning-and-Development/Youth" },
      {
        label: "Special Needs",
        href: "/Learning-and-Development/Special-needs",
      },
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
    ],
  },
  {
    label: "Prizes",
    href: "/prizes",
    children: [
      { label: "Kuwait Prize", href: "/prizes/KuwaitPrize" },
      { label: "Jaber Al-Ahmed Prize", href: "/prizes/Jaber-AlAhmadPrize" },
      { label: "Al Sumait Prize", href: "/prizes/AlSumaitPrize" },
      { label: "Laureates", href: "/prizes/Laureates" },
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

const EASE = [0.16, 1, 0.3, 1] as const;

const ChevronDown = ({
  isOpen,
  className = "",
}: {
  isOpen?: boolean;
  className?: string;
}) => (
  <svg
    className={`transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${className} ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
);

const AnniversaryLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <div className="relative h-10 w-14 shrink-0">
    <img
      src={isScrolled ? "/image/50_gold.png" : "/image/50.png"}
      alt="KFAS 50 years"
      className="h-full w-full object-contain transition-opacity duration-300"
    />
  </div>
);

const NAV_LINK_BASE =
  "flex items-center gap-1 px-2.5 lg:px-3 py-2 text-sm lg:text-[14px] font-normal whitespace-nowrap cursor-pointer select-none transition-all duration-200";

function navLinkColor(isScrolled: boolean, isActive: boolean): string {
  if (isScrolled) {
    return isActive
      ? "bg-[#EC601B] text-white"
      : "text-gray-700 hover:text-[#EC601B]";
  }
  return isActive
    ? "bg-white/15 text-white"
    : "text-white/85 hover:text-white hover:bg-white/10";
}

const DropdownPanel = ({
  isOpen,
  align = "left",
  id,
  labelledBy,
  children,
}: {
  isOpen: boolean;
  align?: "left" | "right";
  id?: string;
  labelledBy?: string;
  children: React.ReactNode;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        id={id}
        role="menu"
        aria-labelledby={labelledBy}
        className={`absolute top-full z-[111] -mt-2 min-w-[260px] bg-[#EC601B] pt-2 overflow-visible shadow-[0_12px_40px_rgba(236,96,27,0.30),0_4px_12px_rgba(0,0,0,0.08)] ${
          align === "right" ? "right-0" : "left-0"
        }`}
        initial={{ opacity: 0, y: -10, scaleY: 0.94 }}
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
        transition={{ duration: 0.22, ease: EASE }}
        style={{ transformOrigin: "top center" }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const DropdownLink = ({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <Link
    href={href}
    prefetch={false}
    role="menuitem"
    onClick={onClick}
    className={`block px-5 py-2.5 text-[14px] text-white/90 transition-colors duration-150 hover:bg-white/15 hover:text-white whitespace-nowrap ${className}`}
  >
    {children}
  </Link>
);

const DropdownDivider = () => <div className="border-t border-white/10" />;

const DesktopNavItem = memo(
  ({
    item,
    isScrolled,
    isOpen,
    onMouseEnter,
    onMouseLeave,
    onTriggerClick,
  }: {
    item: NavItem;
    isScrolled: boolean;
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTriggerClick: () => void;
  }) => {
    const [nestedOpenHref, setNestedOpenHref] = useState<string | null>(null);
    const nestedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      if (!isOpen) setNestedOpenHref(null);
    }, [isOpen]);

    useEffect(
      () => () => {
        if (nestedTimer.current) clearTimeout(nestedTimer.current);
      },
      [],
    );

    const openNested = useCallback((href: string) => {
      if (nestedTimer.current) clearTimeout(nestedTimer.current);
      setNestedOpenHref(href);
    }, []);

    const scheduleCloseNested = useCallback(() => {
      nestedTimer.current = setTimeout(() => setNestedOpenHref(null), 80);
    }, []);

    const triggerId = `nav-trigger-${item.href.replace(/\//g, "-")}`;
    const menuId = `nav-menu-${item.href.replace(/\//g, "-")}`;

    return (
      <div
        className="relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {item.children ? (
          <button
            type="button"
            id={triggerId}
            aria-expanded={isOpen}
            aria-haspopup="menu"
            aria-controls={isOpen ? menuId : undefined}
            onClick={onTriggerClick}
            className={`${NAV_LINK_BASE} ${navLinkColor(isScrolled, isOpen)}`}
          >
            {item.label}
            <ChevronDown
              isOpen={isOpen}
              className="ml-0.5 h-3 w-3 opacity-80"
            />
          </button>
        ) : (
          <Link
            href={item.href}
            className={`${NAV_LINK_BASE} ${navLinkColor(isScrolled, false)}`}
          >
            {item.label}
          </Link>
        )}

        {item.children && (
          <DropdownPanel isOpen={isOpen} id={menuId} labelledBy={triggerId}>
            {item.children.map((child, idx) => {
              const nested = child.children?.length
                ? child.children
                : undefined;
              const isLast = idx === item.children!.length - 1;

              if (!nested) {
                return (
                  <div key={navItemKey(child)}>
                    <DropdownLink href={child.href}>{child.label}</DropdownLink>
                    {!isLast && <DropdownDivider />}
                  </div>
                );
              }

              return (
                <div key={navItemKey(child)}>
                  {idx > 0 && <DropdownDivider />}
                  <div
                    className="relative"
                    onMouseEnter={() => openNested(child.href)}
                    onMouseLeave={scheduleCloseNested}
                  >
                    <div className="flex items-stretch">
                      <Link
                        href={child.href}
                        role="menuitem"
                        className="flex-1 px-5 py-2.5 text-[14px] text-white/90 transition-colors duration-150 hover:bg-white/15 hover:text-white whitespace-nowrap"
                      >
                        {child.label}
                      </Link>
                      <div
                        aria-hidden="true"
                        className="flex shrink-0 items-center border-l border-white/10 px-3 text-[#7DC0F1]"
                      >
                        <ChevronRight />
                      </div>
                    </div>

                    <AnimatePresence>
                      {nestedOpenHref === child.href && (
                        <motion.div
                          role="menu"
                          aria-label={child.label}
                          className="absolute left-full top-0 z-[112] min-w-[260px] bg-[#FFF3EE] py-1 shadow-[4px_12px_32px_rgba(236,96,27,0.15)]"
                          style={{ borderLeft: "3px solid #7DC0F1" }}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -4 }}
                          transition={{ duration: 0.14, ease: EASE }}
                          onMouseEnter={() => openNested(child.href)}
                          onMouseLeave={scheduleCloseNested}
                        >
                          {nested.map((sub) => (
                            <Link
                              key={navItemKey(sub)}
                              href={sub.href}
                              role="menuitem"
                              className="block px-5 py-2.5 text-[14px] text-[#EC601B] whitespace-nowrap transition-colors duration-150 hover:bg-[#FEE9DC]"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </DropdownPanel>
        )}
      </div>
    );
  },
);
DesktopNavItem.displayName = "DesktopNavItem";

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
  <div className="language-switcher relative ml-1 shrink-0">
    <button
      type="button"
      id="lang-trigger"
      onClick={onToggle}
      aria-label="Change language"
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-controls={isOpen ? "lang-menu" : undefined}
      className={`${NAV_LINK_BASE} ${
        isScrolled
          ? "text-gray-500 hover:text-[#EC601B]"
          : "text-white/75 hover:text-white hover:bg-white/10"
      } ${isOpen ? "bg-[#EC601B] text-white" : ""}`}
    >
      <span className="uppercase">{currentLanguage}</span>
      <ChevronDown isOpen={isOpen} className="h-3 w-3 opacity-80" />
    </button>

    <DropdownPanel
      isOpen={isOpen}
      align="right"
      id="lang-menu"
      labelledBy="lang-trigger"
    >
      {LANGUAGES.map((lang, idx) => (
        <div key={lang.code}>
          <button
            type="button"
            role="menuitem"
            aria-current={currentLanguage === lang.code ? "true" : undefined}
            onClick={() => onSelect(lang.code)}
            className={`flex w-full items-center gap-2.5 px-5 py-2.5 text-[14px] text-left text-white/90 transition-colors duration-150 hover:bg-white/15 hover:text-white ${
              currentLanguage === lang.code ? "bg-white/15 text-white" : ""
            }`}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span>{lang.label}</span>
            {currentLanguage === lang.code && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </button>
          {idx < LANGUAGES.length - 1 && <DropdownDivider />}
        </div>
      ))}
    </DropdownPanel>
  </div>
);

const MobileNavItem = memo(
  ({ item, onClose }: { item: NavItem; onClose: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [nestedOpen, setNestedOpen] = useState<string | null>(null);

    if (!item.children) {
      return (
        <Link
          href={item.href}
          onClick={onClose}
          className="flex items-center gap-2 px-2 py-3 text-[14.5px] font-normal text-gray-700 transition-all hover:text-[#EC601B] group"
        >
          <span className="h-4 w-0.5 rounded-full bg-[#EC601B] opacity-0 transition-opacity group-hover:opacity-40" />
          {item.label}
        </Link>
      );
    }

    return (
      <div>
        <button
          type="button"
          onClick={() => {
            setIsOpen((v) => !v);
            setNestedOpen(null);
          }}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between px-2 py-3 text-[14.5px] font-normal text-gray-700 transition-all group"
        >
          <span className="flex items-center gap-2">
            <span
              className={`h-4 w-0.5 rounded-full bg-[#EC601B] transition-opacity ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
            />
            <span className={isOpen ? "text-[#EC601B]" : ""}>{item.label}</span>
          </span>
          <ChevronDown
            isOpen={isOpen}
            className={`h-4 w-4 transition-colors ${isOpen ? "text-[#EC601B]" : "text-gray-300 group-hover:text-[#EC601B]"}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="children"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mb-1 ml-3 mt-0.5 space-y-0 border-l-2 border-[#EC601B]/20 bg-[#FFF3EE] py-1.5 pl-3">
                {item.children.map((child) => {
                  const hasNested = Boolean(child.children?.length);
                  const nestedKey = `${item.href}>${child.href}`;

                  if (!hasNested) {
                    return (
                      <Link
                        key={navItemKey(child)}
                        href={child.href}
                        onClick={onClose}
                        className="block px-3 py-2 text-[13.5px] font-normal text-gray-600 transition-colors hover:text-[#EC601B]"
                      >
                        {child.label}
                      </Link>
                    );
                  }

                  return (
                    <div key={navItemKey(child)} className="rounded-md">
                      <div className="flex items-stretch">
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="flex-1 rounded-l-md px-3 py-2 text-[13.5px] font-normal text-gray-600 transition-colors hover:text-[#EC601B]"
                        >
                          {child.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={nestedOpen === nestedKey}
                          aria-label={`${child.label} submenu`}
                          onClick={() =>
                            setNestedOpen((v) =>
                              v === nestedKey ? null : nestedKey,
                            )
                          }
                          className="flex shrink-0 items-center border-l border-[#EC601B]/10 px-3 text-gray-300 hover:text-[#EC601B]"
                        >
                          <ChevronDown
                            isOpen={nestedOpen === nestedKey}
                            className="h-4 w-4"
                          />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {nestedOpen === nestedKey && child.children && (
                          <motion.div
                            key={nestedKey}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-orange-100 bg-[#FFF3EE] py-1.5 pl-3">
                              {child.children.map((sub) => (
                                <Link
                                  key={navItemKey(sub)}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="block px-3 py-1.5 text-[13px] font-normal text-gray-500 transition-colors hover:text-[#EC601B]"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
MobileNavItem.displayName = "MobileNavItem";

function Header({
  logo,
  logoText = "KFAS",
  navItems = [],
  forceWhiteBackground = false,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const pathname = usePathname();
  const closeNavTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const navItemsList = navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS;
  const showWhiteBg = isScrolled || forceWhiteBackground;

  const clearCloseTimer = useCallback(() => {
    if (closeNavTimer.current) {
      clearTimeout(closeNavTimer.current);
      closeNavTimer.current = null;
    }
  }, []);

  const openNav = useCallback(
    (href: string) => {
      clearCloseTimer();
      setIsLangOpen(false);
      setOpenDropdown(href);
    },
    [clearCloseTimer],
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeNavTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      closeNavTimer.current = null;
    }, NAV_CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const toggleNav = useCallback(
    (href: string) => {
      clearCloseTimer();
      setIsLangOpen(false);
      setOpenDropdown((prev) => (prev === href ? null : href));
    },
    [clearCloseTimer],
  );

  const handleLanguageSelect = useCallback((code: string) => {
    setCurrentLanguage(code);
    setIsLangOpen(false);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
  }, []);

  const closeMobileMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    setOpenDropdown(null);
    setIsLangOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "en" || saved === "ar") {
        setCurrentLanguage(saved);
        document.documentElement.lang = saved;
        document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      }
    } catch {
      /* SSR / private mode */
    }
  }, []);

  useEffect(() => {
    if (!openDropdown && !isLangOpen && !isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearCloseTimer();
        setOpenDropdown(null);
        setIsLangOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openDropdown, isLangOpen, isMenuOpen, clearCloseTimer]);

  useEffect(() => {
    if (!openDropdown && !isLangOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".kfas-nav-desktop")) {
        clearCloseTimer();
        setOpenDropdown(null);
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [openDropdown, isLangOpen, clearCloseTimer]);

  return (
    <motion.header
      initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`fixed left-0 right-0 top-0 z-[100] w-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
        showWhiteBg
          ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      {/* Desktop */}
      <nav
        className={`kfas-nav-desktop hidden w-full max-w-7xl mx-auto px-4 lg:px-6 xl:px-8 md:block transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
          showWhiteBg ? "py-2" : "py-3.5"
        }`}
      >
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
          >
            {logo ? (
              <img
                src={showWhiteBg ? "/image/logo_c.png" : logo}
                alt={logoText}
                className={`block w-auto object-contain transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
                  showWhiteBg ? "h-14" : "h-[4.5rem]"
                }`}
              />
            ) : (
              <span
                className={`font-normal transition-all duration-500 ${showWhiteBg ? "text-xl text-black" : "text-2xl text-white"}`}
              >
                {logoText}
              </span>
            )}
            <AnniversaryLogo isScrolled={showWhiteBg} />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-x-1">
            {navItemsList.map((item) => (
              <DesktopNavItem
                key={navItemKey(item)}
                item={item}
                isScrolled={showWhiteBg}
                isOpen={openDropdown === item.href}
                onMouseEnter={() => item.children && openNav(item.href)}
                onMouseLeave={scheduleClose}
                onTriggerClick={() => toggleNav(item.href)}
              />
            ))}
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              isOpen={isLangOpen}
              isScrolled={showWhiteBg}
              onToggle={() => {
                clearCloseTimer();
                setOpenDropdown(null);
                setIsLangOpen((v) => !v);
              }}
              onSelect={handleLanguageSelect}
            />
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <nav className="w-full bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] md:hidden">
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <img
              src="/image/logo_c.png"
              alt={logoText}
              className="h-12 w-auto"
            />
            <span className="h-5 w-px bg-gray-200" />
            <AnniversaryLogo isScrolled />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="p-2 text-gray-400 transition-colors hover:text-[#EC601B] active:scale-95"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden border-t border-gray-50 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="space-y-0 px-5 py-3 divide-y divide-gray-50">
                {navItemsList.map((item) => (
                  <MobileNavItem
                    key={navItemKey(item)}
                    item={item}
                    onClose={closeMobileMenu}
                  />
                ))}
              </div>

              <div className="border-t border-gray-50 px-5 pb-4 pt-3">
                <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-300">
                  Language
                </p>
                <div className="space-y-0.5">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        handleLanguageSelect(lang.code);
                        closeMobileMenu();
                      }}
                      className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-[14px] font-normal transition-colors ${
                        currentLanguage === lang.code
                          ? "bg-[#EC601B] text-white rounded-lg"
                          : "text-gray-600 hover:text-[#EC601B]"
                      }`}
                    >
                      <span className="text-base leading-none">
                        {lang.flag}
                      </span>
                      <span>{lang.label}</span>
                      {currentLanguage === lang.code && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

export default memo(Header);
