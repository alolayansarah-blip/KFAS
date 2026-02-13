"use client";

import Link from "next/link";
import Image from "next/image";
import { memo, useState } from "react";

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
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
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
];

const DEFAULT_LOGO = "/image/logoFooter.png";
const DEFAULT_LOGO_TEXT =
  "Kuwait Foundation for the Advancement of Sciences (KFAS)";

type NewsletterStatus = "idle" | "loading" | "success" | "error";

function Footer({
  logo = DEFAULT_LOGO,
  logoText = DEFAULT_LOGO_TEXT,
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

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

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
    <footer className="relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: "url(/image/KFASFooter.png)" }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#EC601B] via-[#EC601B]/80 via-[#EC601B]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#D64E10]/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#C23D08]/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,200,100,0.2),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,80,40,0.3),transparent_50%)]" />

      {/* Animated Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-400/15 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-tl from-red-500/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 lg:pt-12 pb-6 lg:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link
              href="/"
              className="inline-flex flex-col gap-0 mb-4 transition-transform hover:scale-105 duration-300"
            >
              {logo && (
                <Image
                  src={logo}
                  alt={logoText}
                  width={160}
                  height={160}
                  className="object-contain w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl"
                />
              )}
              {/* <span className="inline-flex items-center gap-2 mt-2 text-white/70 text-[11px] tracking-[0.25em] font-light uppercase">
                <span className="w-6 h-px bg-white/40" aria-hidden />
                1976
              </span> */}
            </Link>

            {/* <h3 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-4 opacity-90">
              Keep in Touch
            </h3> */}

            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <nav>
            <h3 className="text-white font-bold text-lg tracking-[0.15em] mb-3">
              Explore
            </h3>
            <div className="h-px w-12 bg-white/50 mb-4" />
            <ul className="space-y-2">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group/nav inline-flex items-center text-white/85 hover:text-white text-sm transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="opacity-0 group-hover/nav:opacity-100 transition-opacity mr-2">
                      ›
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-white font-bold text-lg tracking-[0.15em] mb-3">
              Subscribe
            </h3>
            <div className="h-px w-12 bg-white/50 mb-4" />
            <p className="text-white/80 text-sm mb-3 leading-relaxed">
              Sign up for our newsletter to stay updated on all the latest news
              and announcement.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white text-sm transition-all duration-300 disabled:opacity-50"
                aria-label="Email address"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="group/btn inline-flex items-center gap-2 text-sm text-white/90 hover:text-white font-medium transition-all duration-300 disabled:opacity-50 hover:gap-3"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
                <span className="transform group-hover/btn:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </form>

            {message && (
              <div
                className={`mt-3 p-2.5 rounded-lg text-xs leading-relaxed animate-fadeIn ${
                  status === "error"
                    ? "bg-red-500/20 text-red-100 border border-red-400/30"
                    : "bg-green-500/20 text-green-100 border border-green-400/30"
                }`}
                role="alert"
              >
                {message}
              </div>
            )}
          </div>

          {/* Map Column */}
          <div>
            <a
              href={CONTACT_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group/map"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl transition-all duration-300 hover:border-white/40 hover:shadow-3xl hover:scale-[1.02]">
                <iframe
                  src={CONTACT_INFO.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KFAS Location Map"
                  className="w-full h-full grayscale-[30%] group-hover/map:grayscale-0 transition-all duration-500"
                />
              </div>
            </a>
            <address className="not-italic text-white/85 text-sm leading-relaxed space-y-0.5 mt-3">
              <p>{CONTACT_INFO.address}</p>
              <p>{CONTACT_INFO.city}</p>
            </address>
            <a
              href={CONTACT_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mt-2 transition-all duration-300 hover:gap-3 group/link"
            >
              View on Map
              <span className="transform group-hover/link:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/15">
          <p className="text-white/60 text-xs text-center sm:text-left">
            © {currentYear} Kuwait Foundation for the Advancement of Sciences
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
}

export default memo(Footer);
