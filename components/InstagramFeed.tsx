// src/components/InstagramFeed.tsx
"use client";

/**
 * InstagramFeed — latest posts from @kfasinfo in the KFAS editorial style.
 *
 * Requires:
 *   1. src/app/api/instagram/route.ts (the API route delivered with this file)
 *   2. INSTAGRAM_ACCESS_TOKEN in env (.env.local + DigitalOcean encrypted var)
 *   3. "InstagramFeed" namespace in messages/en.json and messages/ar.json
 *      (keys provided alongside this file)
 *
 * Drop into any page:  <InstagramFeed />
 */

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const EASE = [0.22, 1, 0.36, 1] as const;

const NAVY = "#1D2D44";
const ORANGE = "#EC601B";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/kfasinfo/";
/** Homepage shows only the latest three posts. */
const POST_COUNT = 3;

type InstagramPost = {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  imageUrl: string;
  permalink: string;
  timestamp: string;
};

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG — no extra deps)                                 */
/* ------------------------------------------------------------------ */

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlayBadge() {
  return (
    <span
      className="absolute top-3 right-3 rtl:right-auto rtl:left-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#1D2D44] shadow-sm"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-3.5 w-3.5 translate-x-[1px] rtl:-translate-x-[1px]"
      >
        <path d="M8 5.5v13l11-6.5-11-6.5z" />
      </svg>
    </span>
  );
}

function CarouselBadge() {
  return (
    <span
      className="absolute top-3 right-3 rtl:right-auto rtl:left-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#1D2D44] shadow-sm"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-3.5 w-3.5"
      >
        <rect x="3" y="7" width="13" height="13" rx="2.5" />
        <path d="M8 3.5h10A2.5 2.5 0 0 1 20.5 6v10" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Tile                                                               */
/* ------------------------------------------------------------------ */

function PostTile({ post, locale }: { post: InstagramPost; locale: string }) {
  const date = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(post.timestamp));

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-xl bg-[#1D2D44]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC601B]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Instagram CDN URLs expire; next/image caching can serve dead optimized URLs */}
      <img
        src={post.imageUrl}
        alt={post.caption ? post.caption.slice(0, 100) : "Instagram post"}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />

      {post.mediaType === "VIDEO" && <PlayBadge />}
      {post.mediaType === "CAROUSEL_ALBUM" && <CarouselBadge />}

      {/* Navy hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1D2D44]/90 via-[#1D2D44]/35 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        {post.caption && (
          <p className="line-clamp-3 text-[13px] leading-snug text-white/95">
            {post.caption}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-[#7DC0F1]">
          <InstagramGlyph className="h-3.5 w-3.5" />
          <span>{date}</span>
        </div>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function InstagramFeed() {
  const t = useTranslations("InstagramFeed");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const [posts, setPosts] = useState<InstagramPost[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/instagram", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          const next = Array.isArray(json.posts) ? json.posts : [];
          setPosts(next.slice(0, POST_COUNT));
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // If Instagram is unreachable, hide the section entirely rather than
  // showing an error on a marketing page.
  if (failed || (posts && posts.length === 0)) return null;

  const fadeUp = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE, delay: i * 0.06 },
        }),
      };

  return (
    <section className="bg-white py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header row */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span
                className="h-[3px] w-10 rounded-full"
                style={{ backgroundColor: ORANGE }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: ORANGE }}
              >
                {t("kicker")}
              </span>
            </div>
            <h2
              className="text-3xl font-bold leading-tight md:text-4xl"
              style={{ color: NAVY }}
            >
              {t("title")}
            </h2>
          </div>

          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 self-start rounded-full border-2 px-6 py-3 text-sm font-semibold transition-colors duration-300 md:self-auto hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EC601B]"
            style={{ borderColor: ORANGE, color: ORANGE }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ORANGE;
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = ORANGE;
            }}
          >
            <InstagramGlyph className="h-4.5 w-4.5 h-[18px] w-[18px]" />
            {t("follow")}
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {(posts ?? Array.from({ length: POST_COUNT })).map((post, i) =>
            post ? (
              <motion.div
                key={(post as InstagramPost).id}
                variants={fadeUp}
                custom={i + 1}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <PostTile post={post as InstagramPost} locale={locale} />
              </motion.div>
            ) : (
              // Skeleton while loading
              <div
                key={`skeleton-${i}`}
                className="aspect-square animate-pulse rounded-xl bg-[#1D2D44]/[0.06]"
                aria-hidden="true"
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
