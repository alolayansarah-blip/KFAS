"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useLocale } from "next-intl";
import {
  Link,
  switchLocalePathname,
  usePathname,
  useRouter,
} from "@/src/i18n/navigation";
import type { NavItem } from "@/types";

const SCROLL_THRESHOLD = 50;
const NAV_CLOSE_DELAY_MS = 220;
const HREF_OUR_TEAM = "/about/our-team";
const SEARCH_HREF = "/search";

function navItemKey(item: NavItem) {
  return `${item.href}::${item.label}`;
}

const DEFAULT_NAV_ITEMS_EN: NavItem[] = [
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
      { label: "Grants", href: "/research/grants" },
      { label: "Activities and Events", href: "/research/ActivitiesAndEvents" },
      { label: "Assigned Studies", href: "/research/AssignedStudies" },
      { label: "Scientific Conference Sponsorship", href: "/research/SCS" },
      { label: "Technology Deployment", href: "/research/TechDeployment" },
      { label: "R&D in Private Sector", href: "/research/RandDPrivate" },
      {
        label: "Success Stories and Impact",
        href: "/research/SuccessStories",
      },
      { label: "KFAS Research Portal", href: "/research/KFASResearchPortal" },
    ],
  },
  {
    label: "Learning & Development",
    href: "/Learning-and-Development",
    children: [
      {
        label: "Researchers",
        href: "/Learning-and-Development/Researchers",
      },
      {
        label: "Professionals",
        href: "/Learning-and-Development/Professionals",
      },
      { label: "Youth", href: "/Learning-and-Development/Youth" },
    ],
  },
  {
    label: "Science & Society",
    href: "/Science-and-Society",
    children: [
      {
        label: "Activities and Events Sponsorship",
        href: "/ScienceAndSociety/ActivitiesAndEventsSponsership",
      },
      { label: "Publications", href: "https://www.aspdkw.com/" },
      {
        label: "Special Needs",
        href: "/ScienceAndSociety/SpecialNeeds",
      },
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

const DEFAULT_NAV_ITEMS_AR: NavItem[] = [
  {
    label: "عن المؤسسة",
    href: "/about",
    children: [
      { label: "من نحن", href: "/about/AboutKfas" },
      { label: "تاريخنا", href: "/about/OurHistory" },
      { label: "استراتيجيتنا", href: "/about/OurStrategy" },
      { label: "مجلس الإدارة", href: "/about/BoardOfDirectors" },
      { label: "فريقنا", href: "/about/our-team" },
    ],
  },
  {
    label: "البحث العلمي",
    href: "/Research",
    children: [
      { label: "دعم البحوث / المنح", href: "/research/grants" },
      { label: "الأنشطة والفعاليات", href: "/research/ActivitiesAndEvents" },
      { label: "الدراسات بالتكليف", href: "/research/AssignedStudies" },
      { label: "رعاية المؤتمرات العلمية", href: "/research/SCS" },
      { label: "نشر التكنلوجيـا", href: "/research/TechDeployment" },
      {
        label: "البحث والتطوير في القطاع الخاص",
        href: "/research/RandDPrivate",
      },
      {
        label: "قصص النجاح والأثر",
        href: "/research/SuccessStories",
      },
      { label: "بوابة الكويت للأبحاث", href: "/research/KFASResearchPortal" },
    ],
  },
  {
    label: "التعلّم والتطوير",
    href: "/Learning-and-Development",
    children: [
      {
        label: "الباحثون",
        href: "/Learning-and-Development/Researchers",
      },
      {
        label: "المهنيون",
        href: "/Learning-and-Development/Professionals",
      },
      { label: "الشباب", href: "/Learning-and-Development/Youth" },
    ],
  },
  {
    label: "العلوم والمجتمع",
    href: "/Science-and-Society",
    children: [
      {
        label: "رعاية الأنشطة والفعاليات",
        href: "/ScienceAndSociety/ActivitiesAndEventsSponsership",
      },
      { label: "المنشورات", href: "https://www.aspdkw.com/" },
      {
        label: "ذوي الاحتياجات الخاصة",
        href: "/ScienceAndSociety/SpecialNeeds",
      },
    ],
  },
  {
    label: "الجوائز",
    href: "/prizes",
    children: [
      { label: "جائزة الكويت", href: "/prizes/KuwaitPrize" },
      { label: "جائزة جابر الأحمد", href: "/prizes/Jaber-AlAhmadPrize" },
      { label: "جائزة السميط", href: "/prizes/AlSumaitPrize" },
      { label: "الفائزون", href: "/prizes/Laureates" },
    ],
  },
];

const DEFAULT_NAV_ITEMS = DEFAULT_NAV_ITEMS_EN;

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇰🇼" },
];

const UI_STRINGS = {
  en: {
    search: "Search the website",
    changeLanguage: "Change language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  ar: {
    search: "البحث في الموقع",
    changeLanguage: "تغيير اللغة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    language: "اللغة",
  },
} as const;

interface HeaderProps {
  logo?: string;
  logoText?: string;
  navItems?: NavItem[];
  forceWhiteBackground?: boolean;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

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

const SearchIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const AnniversaryLogo = ({ isScrolled }: { isScrolled: boolean }) => (
  <div
    className={`relative h-10 w-14 shrink-0 transition-transform duration-500 ${isScrolled ? "scale-90" : "scale-100"}`}
  >
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

const SearchButton = ({
  isScrolled,
  onClick,
  ariaLabel,
}: {
  isScrolled: boolean;
  onClick: () => void;
  ariaLabel: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className={`${NAV_LINK_BASE} ${navLinkColor(isScrolled, false)}`}
  >
    <SearchIcon className="h-[18px] w-[18px]" />
  </button>
);

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
}) =>
  isOpen ? (
    <div
      id={id}
      role="menu"
      aria-labelledby={labelledBy}
      className={`absolute top-full z-[111] -mt-2 min-w-[260px] bg-[#EC601B] pt-2 overflow-visible shadow-[0_12px_40px_rgba(236,96,27,0.30),0_4px_12px_rgba(0,0,0,0.08)] ${
        align === "right" ? "right-0" : "left-0"
      }`}
    >
      {children}
    </div>
  ) : null;

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
            className={`${NAV_LINK_BASE} ${navLinkColor(isScrolled, isOpen)} relative`}
          >
            {item.label}
            <ChevronDown
              isOpen={isOpen}
              className="ml-0.5 h-3 w-3 opacity-80"
            />
            {!isScrolled && isOpen && (
              <span className="absolute bottom-0 left-2.5 right-2.5 h-px rounded-full bg-white/60" />
            )}
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
                    <div
                      className={`group flex items-stretch transition-colors duration-150 ${
                        nestedOpenHref === child.href
                          ? "bg-white/15"
                          : "hover:bg-white/15"
                      }`}
                    >
                      <Link
                        href={child.href}
                        role="menuitem"
                        className="flex-1 px-5 py-2.5 text-[14px] text-white/90 whitespace-nowrap transition-colors duration-150 hover:text-white"
                      >
                        {child.label}
                      </Link>
                      <div
                        aria-hidden="true"
                        className="flex shrink-0 items-center border-l border-white/10 px-3 text-[#7DC0F1] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                      >
                        <ChevronRight />
                      </div>
                    </div>

                    {nestedOpenHref === child.href && (
                      <div
                        role="menu"
                        aria-label={child.label}
                        className="absolute left-full top-0 z-[112] min-w-[260px] bg-[#FFF3EE] py-1 shadow-[4px_12px_32px_rgba(236,96,27,0.15)]"
                        style={{ borderLeft: "3px solid #7DC0F1" }}
                        onMouseEnter={() => openNested(child.href)}
                        onMouseLeave={scheduleCloseNested}
                      >
                        {nested.map((sub) => (
                          <div key={navItemKey(sub)}>
                            <Link
                              href={sub.href}
                              role="menuitem"
                              className="block px-5 py-2.5 text-[14px] text-[#EC601B] whitespace-nowrap transition-colors duration-150 hover:bg-[#FEE9DC]"
                            >
                              {sub.label}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
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
  pathname,
  isOpen,
  isScrolled,
  onToggle,
  onNavigate,
  ariaLabel,
}: {
  currentLanguage: string;
  pathname: string;
  isOpen: boolean;
  isScrolled: boolean;
  onToggle: () => void;
  onNavigate: (code: string) => void;
  ariaLabel: string;
}) => (
  <div className="language-switcher relative ml-1 shrink-0">
    <button
      type="button"
      id="lang-trigger"
      onClick={onToggle}
      aria-label={ariaLabel}
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
          <a
            href={switchLocalePathname(pathname, lang.code)}
            role="menuitem"
            aria-current={currentLanguage === lang.code ? "true" : undefined}
            onClick={() => onNavigate(lang.code)}
            className={`flex w-full items-center gap-2.5 px-5 py-2.5 text-[14px] text-left text-white/90 transition-colors duration-150 hover:bg-white/15 hover:text-white ${
              currentLanguage === lang.code ? "bg-white/15 text-white" : ""
            }`}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span>{lang.label}</span>
            {currentLanguage === lang.code && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </a>
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
        <div>
          <Link
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-2 px-2 py-3 text-[14.5px] font-normal text-gray-700 transition-all hover:text-[#EC601B] group"
          >
            <span className="h-4 w-0.5 rounded-full bg-[#EC601B] opacity-0 transition-opacity group-hover:opacity-40" />
            {item.label}
          </Link>
        </div>
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

        {isOpen && (
          <div className="overflow-hidden">
            <div className="mb-1 ml-3 mt-0.5 space-y-0 border-l-2 border-[#EC601B]/20 bg-[#FFF3EE] py-1.5 pl-3">
              {item.children.map((child) => {
                const hasNested = Boolean(child.children?.length);
                const nestedKey = `${item.href}>${child.href}`;

                if (!hasNested) {
                  return (
                    <div key={navItemKey(child)}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="block px-3 py-2 text-[13.5px] font-normal text-gray-600 transition-colors hover:text-[#EC601B]"
                      >
                        {child.label}
                      </Link>
                    </div>
                  );
                }

                return (
                  <div key={navItemKey(child)} className="rounded-md">
                    <div className="flex items-stretch">
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="flex-1 rounded-l-md px-3 py-2 text-left text-[13.5px] font-normal text-gray-600 transition-colors hover:text-[#EC601B]"
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

                    {nestedOpen === nestedKey && child.children && (
                      <div className="overflow-hidden">
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
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);
MobileNavItem.displayName = "MobileNavItem";

// ─── Header ─────────────────────────────────────────────────────────────────

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
  const locale = useLocale();

  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const closeNavTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItemsList =
    navItems.length > 0
      ? navItems
      : locale === "ar"
        ? DEFAULT_NAV_ITEMS_AR
        : DEFAULT_NAV_ITEMS_EN;
  const t = UI_STRINGS[locale === "ar" ? "ar" : "en"];
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

  const handleLanguageNavigate = useCallback((code: string) => {
    setIsLangOpen(false);
    document.cookie = `NEXT_LOCALE=${code};path=/;SameSite=Lax`;
  }, []);

  const closeMobileMenu = useCallback(() => setIsMenuOpen(false), []);

  const goToSearch = useCallback(() => {
    clearCloseTimer();
    setOpenDropdown(null);
    setIsLangOpen(false);
    setIsMenuOpen(false);
    router.push(SEARCH_HREF);
  }, [clearCloseTimer, router]);

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
    <header
      className={`fixed left-0 right-0 top-0 z-[100] w-full transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
        showWhiteBg
          ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      {/* Desktop ─────────────────────────────────────── */}
      <nav
        className={`kfas-nav-desktop hidden w-full max-w-7xl mx-auto px-4 lg:px-6 xl:px-8 md:block transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] ${
          showWhiteBg ? "py-2" : "py-3.5"
        }`}
      >
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <div>
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
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-x-1">
            {navItemsList.map((item) => (
              <div key={navItemKey(item)}>
                <DesktopNavItem
                  item={item}
                  isScrolled={showWhiteBg}
                  isOpen={openDropdown === item.href}
                  onMouseEnter={() => item.children && openNav(item.href)}
                  onMouseLeave={scheduleClose}
                  onTriggerClick={() => toggleNav(item.href)}
                />
              </div>
            ))}

            <div>
              <SearchButton
                isScrolled={showWhiteBg}
                onClick={goToSearch}
                ariaLabel={t.search}
              />
            </div>

            <div>
              <LanguageSwitcher
                currentLanguage={locale}
                pathname={pathname}
                isOpen={isLangOpen}
                isScrolled={showWhiteBg}
                onToggle={() => {
                  clearCloseTimer();
                  setOpenDropdown(null);
                  setIsLangOpen((v) => !v);
                }}
                onNavigate={handleLanguageNavigate}
                ariaLabel={t.changeLanguage}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile ──────────────────────────────────────── */}
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

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goToSearch}
              aria-label={t.search}
              className="p-2 text-gray-400 transition-colors hover:text-[#EC601B] active:scale-95"
            >
              <SearchIcon className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 text-gray-400 transition-colors hover:text-[#EC601B] active:scale-95"
            >
              {/* Hamburger / close icon */}
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
        </div>

        {isMenuOpen && (
          <div
            id="mobile-menu"
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
                {t.language}
              </p>
              <div className="space-y-0.5">
                {LANGUAGES.map((lang) => (
                  <a
                    key={lang.code}
                    href={switchLocalePathname(pathname, lang.code)}
                    onClick={() => {
                      handleLanguageNavigate(lang.code);
                      closeMobileMenu();
                    }}
                    className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-[14px] font-normal transition-colors ${
                      locale === lang.code
                        ? "bg-[#EC601B] text-white rounded-lg"
                        : "text-gray-600 hover:text-[#EC601B]"
                    }`}
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.label}</span>
                    {locale === lang.code && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default memo(Header);
