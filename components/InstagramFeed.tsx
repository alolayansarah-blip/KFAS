"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  caption?: string;
}

const placeholderPosts: InstagramPost[] = [
  {
    id: "placeholder-1",
    media_type: "IMAGE",
    media_url: "/image/instagram2.webp",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: "2025-01-10T00:00:00.000Z",
    caption:
      "KFAS continues to support scientific research and innovation in Kuwait. #KFAS #Science #Innovation",
  },
  {
    id: "placeholder-2",
    media_type: "IMAGE",
    media_url: "/image/InstagramPost.png",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: "2025-01-09T00:00:00.000Z",
    caption:
      "Empowering researchers and scientists to tackle national challenges through cutting-edge research programs. #Research #Kuwait",
  },
  {
    id: "placeholder-3",
    media_type: "IMAGE",
    media_url: "/image/InstagramPost2.jpg",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: "2025-01-08T00:00:00.000Z",
    caption:
      "Building a sustainable future through science, technology, and innovation. #Sustainability #Future #KFAS",
  },
  {
    id: "placeholder-4",
    media_type: "IMAGE",
    media_url: "/image/InstagramPost.png",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: "2025-01-07T00:00:00.000Z",
    caption:
      "Science Directors Program 2022 — Empowering the next generation of science leaders in Kuwait. #Leadership #KFAS",
  },
];

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/instagram");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const fetched = data.posts || [];
        setPosts(fetched.length > 0 ? fetched : placeholderPosts);
      } catch {
        setPosts(placeholderPosts);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const visiblePosts = posts.slice(0, 4);

  return (
    <section
      id="instagram-feed"
      className="relative bg-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#7DC0F1]/6 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.p
              className="mb-4 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#EC601B]"
              {...fadeUp(0)}
            >
              Social Media
            </motion.p>
            <motion.h2
              className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D2D44] leading-tight tracking-tight"
              {...fadeUp(0.1)}
            >
              Join us on{" "}
              <span className="font-extralight italic text-[#1D2D44]/50">
                Instagram
              </span>
            </motion.h2>
            <motion.div
              className="mt-5 h-px origin-left bg-gradient-to-r from-[#EC601B]/50 via-[#7DC0F1]/20 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            />
          </div>

          {/* Follow CTA */}
          <motion.a
            href="https://www.instagram.com/kfasinfo/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 self-start sm:self-auto shrink-0"
            {...fadeUp(0.15)}
          >
            <div className="h-[1.5px] w-6 bg-[#EC601B] transition-all duration-500 group-hover:w-10" />
            <InstagramIcon className="w-4 h-4 text-[#EC601B]" />
            <span className="text-[13px] font-medium tracking-[0.08em] text-[#EC601B] transition-colors duration-300 group-hover:text-[#d45510]">
              Follow @kfasinfo
            </span>
            <svg
              className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#d45510]"
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
          </motion.a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-[#1D2D44]/06 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Posts — asymmetric layout: 1 featured large + 3 small */}
        {!loading && visiblePosts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Featured post — left */}
            <motion.a
              href={visiblePosts[featured]?.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden aspect-square lg:aspect-auto lg:row-span-1"
              {...fadeUp(0.1)}
            >
              <img
                src={visiblePosts[featured]?.media_url}
                alt={visiblePosts[featured]?.caption || "Instagram post"}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D2D44]/90 via-[#1D2D44]/20 to-transparent" />

              {/* Badge */}
              <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/15">
                <InstagramIcon className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                  @kfasinfo
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                  {formatDate(visiblePosts[featured]?.timestamp)}
                </p>
                <p className="font-poppins text-[14px] font-light text-white/80 leading-relaxed line-clamp-3 mb-5">
                  {visiblePosts[featured]?.caption}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-[1.5px] w-5 bg-[#EC601B] transition-all duration-500 group-hover:w-8" />
                  <span className="text-[12px] font-medium tracking-[0.08em] text-[#EC601B]">
                    View post
                  </span>
                  <svg
                    className="h-3 w-3 -translate-x-1 text-[#EC601B] transition-all duration-300 group-hover:translate-x-0"
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
                </div>
              </div>
            </motion.a>

            {/* Right — 3 small thumbnails stacked */}
            <div className="grid grid-cols-1 gap-4">
              {visiblePosts.slice(1, 4).map((post, index) => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex gap-4 bg-[#1D2D44]/03 border border-[#1D2D44]/08 hover:border-[#EC601B]/30 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setFeatured(index + 1)}
                  {...fadeUp(0.15 + index * 0.08)}
                >
                  {/* Thumbnail */}
                  <div className="relative shrink-0 w-24 h-24 overflow-hidden">
                    <img
                      src={post.media_url}
                      alt={post.caption || "Instagram post"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center py-4 pr-5 min-w-0">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1D2D44]/35">
                      {formatDate(post.timestamp)}
                    </p>
                    <p className="font-poppins text-[13px] font-light text-[#1D2D44]/60 leading-relaxed line-clamp-2 group-hover:text-[#1D2D44]/85 transition-colors duration-300">
                      {post.caption}
                    </p>
                  </div>

                  {/* Left accent on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#EC601B] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
