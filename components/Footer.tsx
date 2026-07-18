"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

interface FooterProps {
  logo?: string;
  logoText?: string;
}

const SIGNUP_FORM_URL = "https://kfas.formstack.com/forms/subscribe_to_kfas";

const NAVIGATION_LINKS_EN = [
  { label: "Who We Are", href: "/AboutKfas" },
  { label: "Our Strategy", href: "/OurStrategy" },
  { label: "Our History", href: "/OurHistory" },
  { label: "Board of Directors", href: "/BoardOfDirectors" },
  { label: "Media Library", href: "/MediaLibrary" },
] as const;

const NAVIGATION_LINKS_AR = [
  { label: "من نحن", href: "/AboutKfas" },
  { label: "استراتيجيتنا", href: "/OurStrategy" },
  { label: "تاريخنا", href: "/OurHistory" },
  { label: "مجلس الإدارة", href: "/BoardOfDirectors" },
  { label: "مكتبة الوسائط", href: "/MediaLibrary" },
] as const;

const CONTACT_INFO_EN = {
  address: "1 Ahmad Al Jaber St",
  city: "Kuwait City, Kuwait",
} as const;

const CONTACT_INFO_AR = {
  address: "شارع أحمد الجابر",
  city: "مدينة الكويت، الكويت",
} as const;

const MAP_URL = "https://maps.app.goo.gl/ahSd2JURuochJzC17";

const POLICY_URL = "/Policy";

const FOOTER_STRINGS = {
  en: {
    followUs: "Follow Us",
    explore: "Explore",
    subscribe: "Subscribe",
    newsletterBody:
      "Sign up for our newsletter to stay updated on all the latest news and announcements.",
    signUp: "Sign Up",
    visitUs: "Visit Us",
    viewOnMap: "View on Map",
    copyrightOrg: "Kuwait Foundation for the Advancement of Sciences",
    websitePolicy: "Website Policy",
    est: "Est. 1976",
  },
  ar: {
    followUs: "تابعونا",
    explore: "استكشف",
    subscribe: "اشترك",
    newsletterBody:
      "اشترك في نشرتنا الإخبارية لتبقى على اطلاع بأحدث الأخبار والإعلانات.",
    signUp: "اشترك الآن",
    visitUs: "زوروا مقرنا",
    viewOnMap: "عرض على الخريطة",
    copyrightOrg: "مؤسسة الكويت للتقدم العلمي",
    websitePolicy: "سياسة الموقع",
    est: "تأسست عام 1976",
  },
} as const;

const SOCIAL_LINKS = [
  {
    name: "Twitter / X",
    href: "https://twitter.com/kfasinfo",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/kfasinfo",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/kfasinfo/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@KFASinfo",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.1 };

function Footer({
  logo = "/image/logoFooter.png",
  logoText = "Kuwait Foundation for the Advancement of Sciences (KFAS)",
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isArabic = useLocale() === "ar";
  const s = FOOTER_STRINGS[isArabic ? "ar" : "en"];
  const navigationLinks = isArabic ? NAVIGATION_LINKS_AR : NAVIGATION_LINKS_EN;
  const contactInfo = isArabic ? CONTACT_INFO_AR : CONTACT_INFO_EN;

  return (
    <footer className="relative bg-[#EC601B] overflow-hidden">
      {/* Ambient glow — one soft highlight top-right (top-left in RTL) */}
      <motion.div
        className="pointer-events-none absolute -top-32 -right-32 h-[560px] w-[560px] rounded-full rtl:right-auto rtl:-left-32"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
      />

      <div className="h-[1.5px] w-full bg-gradient-to-r rtl:bg-gradient-to-l from-white/40 via-white/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 pb-6 pt-10 sm:px-8 lg:px-8 lg:pt-12">
        <motion.div
          className="mb-8 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.04 },
            },
          }}
        >
          {/* Brand + Follow */}
          <motion.div
            className="flex flex-col"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE },
              },
            }}
          >
            <Link href="/" className="mb-4 inline-block">
              <Image
                src={logo}
                alt={logoText}
                width={120}
                height={120}
                className="h-20 w-20 object-contain brightness-0 invert sm:h-24 sm:w-24"
              />
            </Link>
            <p
              className={`mb-2.5 font-semibold text-white/50 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
            >
              {s.followUs}
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group flex h-8 w-8 items-center justify-center border border-white/20 text-white/50 transition-all duration-300 hover:border-white hover:bg-white/10 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Explore */}
          <motion.nav
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE },
              },
            }}
          >
            <p
              className={`mb-2.5 font-semibold text-white/50 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
            >
              {s.explore}
            </p>
            <div className="mb-3 h-px w-8 bg-white/30" />
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[14px] font-light text-white/65 transition-all duration-300 hover:text-white"
                  >
                    <span className="h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Sign Up */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE },
              },
            }}
          >
            <p
              className={`mb-2.5 font-semibold text-white/50 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
            >
              {s.subscribe}
            </p>
            <div className="mb-3 h-px w-8 bg-white/30" />
            <p className="mb-4 text-[14px] font-light leading-relaxed text-white/65">
              {s.newsletterBody}
            </p>
            <a
              href={SIGNUP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3"
            >
              <div className="h-[1.5px] w-5 bg-white transition-all duration-500 group-hover:w-8" />
              <span className="text-[13px] font-medium tracking-[0.08em] text-white/80 transition-colors duration-300 group-hover:text-white">
                {s.signUp}
              </span>
              <svg
                className="h-3 w-3 -translate-x-1 text-white/80 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white rtl:translate-x-1 rtl:rotate-180"
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

          {/* Visit Us */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE },
              },
            }}
          >
            <p
              className={`mb-2.5 font-semibold text-white/50 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
            >
              {s.visitUs}
            </p>
            <div className="mb-3 h-px w-8 bg-white/30" />
            <div className="mb-4 flex items-start gap-2.5">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-white/70"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"
                />
                <circle cx="12" cy="9" r="2.3" strokeLinecap="round" />
              </svg>
              <address className="not-italic text-[14px] font-light leading-relaxed text-white/65">
                <p>{contactInfo.address}</p>
                <p>{contactInfo.city}</p>
              </address>
            </div>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3"
            >
              <div className="h-[1.5px] w-5 bg-white transition-all duration-500 group-hover:w-8" />
              <span className="text-[13px] font-medium tracking-[0.08em] text-white/80 transition-colors duration-300 group-hover:text-white">
                {s.viewOnMap}
              </span>
              <svg
                className="h-3 w-3 -translate-x-1 text-white/80 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white rtl:translate-x-1 rtl:rotate-180"
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
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col items-center justify-between gap-2 border-t border-white/15 pt-4 sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
        >
          <p
            className="text-[12px] font-light text-white/50 tracking-wide"
            suppressHydrationWarning
          >
            © {currentYear} {s.copyrightOrg}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={POLICY_URL}
              className="text-[12px] font-light text-white/50 tracking-wide transition-colors duration-300 hover:text-white"
            >
              {s.websitePolicy}
            </Link>
            <p className="text-[12px] font-light text-white/35 tracking-wide">
              {s.est}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default memo(Footer);
