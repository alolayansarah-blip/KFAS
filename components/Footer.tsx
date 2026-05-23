"use client";

import Link from "next/link";
import Image from "next/image";
import { memo, useState } from "react";
import { motion } from "framer-motion";

interface FooterProps {
  logo?: string;
  logoText?: string;
}

const NAVIGATION_LINKS = [
  { label: "Who We Are", href: "/AboutKfas" },
  { label: "Our Strategy", href: "/OurStrategy" },
  { label: "Our History", href: "/OurHistory" },
  { label: "Board of Directors", href: "/BoardOfDirectors" },
] as const;

const CONTACT_INFO = {
  address: "1 Ahmad Al Jaber St",
  city: "Kuwait City, Kuwait",
  mapUrl: "https://maps.app.goo.gl/ahSd2JURuochJzC17",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.0!2d47.9783!3d29.3697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDIyJzExLjAiTiA0N8KwNTgnNDIuMCJF!5e0!3m2!1sen!2skw!4v1708000000000!5m2!1sen!2skw",
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

type NewsletterStatus = "idle" | "loading" | "success" | "error";

function Footer({
  logo = "/image/logoFooter.png",
  logoText = "Kuwait Foundation for the Advancement of Sciences (KFAS)",
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Subscription failed");
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Failed to subscribe",
      );
    }
  };

  return (
    <footer className="relative bg-[#EC601B] overflow-hidden">
      {/*
        ① Ambient depth orbs — a darker warm shadow bottom-left and a
           lighter highlight top-right, giving the flat orange depth
           without imagery.
      */}
      <motion.div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)",
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

      {/* Top divider */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-white/40 via-white/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        {/* Main grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          {/* ── Brand ── */}
          <motion.div
            className="flex flex-col"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASE },
              },
            }}
          >
            <Link href="/" className="inline-block mb-6">
              {logo && (
                <Image
                  src={logo}
                  alt={logoText}
                  width={140}
                  height={140}
                  className="object-contain w-28 h-28 sm:w-32 sm:h-32
                             brightness-0 invert opacity-90"
                />
              )}
            </Link>

            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
              Follow Us
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group flex h-8 w-8 items-center justify-center
                             border border-white/20 text-white/50
                             transition-all duration-300
                             hover:border-white hover:text-white hover:bg-white/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Explore ── */}
          <motion.nav
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASE },
              },
            }}
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
              Explore
            </p>
            <div className="mb-5 h-px w-8 bg-white/30" />
            <ul className="space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2
                               text-[14px] font-light text-white/65
                               transition-all duration-300 hover:text-white"
                  >
                    <span className="h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* ── Newsletter ── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASE },
              },
            }}
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
              Subscribe
            </p>
            <div className="mb-5 h-px w-8 bg-white/30" />
            <p className="mb-5 text-[14px] font-light text-white/65 leading-relaxed">
              Sign up for our newsletter to stay updated on all the latest news
              and announcements.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                disabled={status === "loading"}
                className="w-full bg-transparent border-b border-white/30 pb-2
                           text-[14px] text-white placeholder-white/35
                           focus:outline-none focus:border-white/70
                           transition-colors duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex items-center gap-3"
              >
                <div className="h-[1.5px] w-5 bg-white transition-all duration-500 group-hover:w-8" />
                <span
                  className="text-[13px] font-medium tracking-[0.08em] text-white/80
                                 transition-colors duration-300 group-hover:text-white"
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </span>
                <svg
                  className="h-3 w-3 -translate-x-1 text-white/80 transition-all duration-300
                             group-hover:translate-x-0 group-hover:text-white"
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
              </button>
            </form>

            {message && (
              <p
                className={`mt-3 text-[12px] leading-relaxed ${
                  status === "error" ? "text-white/60" : "text-white"
                }`}
              >
                {message}
              </p>
            )}
          </motion.div>

          {/* ── Map ── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: EASE },
              },
            }}
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
              Find Us
            </p>
            <div className="mb-5 h-px w-8 bg-white/30" />

            <div className="aspect-[4/3] overflow-hidden border border-white/15 mb-4">
              <iframe
                src={CONTACT_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KFAS Location Map"
                className="w-full h-full opacity-90"
              />
            </div>

            <address className="not-italic text-[14px] font-light text-white/65 leading-relaxed mb-3">
              <p>{CONTACT_INFO.address}</p>
              <p>{CONTACT_INFO.city}</p>
            </address>

            <a
              href={CONTACT_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3"
            >
              <div className="h-[1.5px] w-5 bg-white transition-all duration-500 group-hover:w-8" />
              <span
                className="text-[13px] font-medium tracking-[0.08em] text-white/80
                               transition-colors duration-300 group-hover:text-white"
              >
                View on Map
              </span>
              <svg
                className="h-3 w-3 -translate-x-1 text-white/80 transition-all duration-300
                           group-hover:translate-x-0 group-hover:text-white"
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
          className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <p className="text-[12px] font-light text-white/50 tracking-wide">
            © {currentYear} Kuwait Foundation for the Advancement of Sciences
          </p>
          <p className="text-[12px] font-light text-white/35 tracking-wide">
            Est. 1976
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default memo(Footer);
