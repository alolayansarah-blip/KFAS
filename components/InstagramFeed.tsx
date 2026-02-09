"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  caption?: string;
}

// Placeholder posts to show when no access token is configured
const placeholderPosts: InstagramPost[] = [
  {
    id: "placeholder-1",
    media_type: "IMAGE",
    media_url: "/image/instagram2.webp",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: "2025-01-10T00:00:00.000Z",
    caption:
      "KFAS continues to support scientific research and innovation in Kuwait. Follow us for the latest updates on our programs and initiatives. #KFAS #Science #Innovation",
  },
  {
    id: "placeholder-2",
    media_type: "IMAGE",
    media_url: "/image/InstagramPost.png",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: "2025-01-09T00:00:00.000Z",
    caption:
      "Empowering researchers and scientists to tackle national challenges through cutting-edge research programs. #Research #Kuwait #Technology",
  },
  {
    id: "placeholder-3",
    media_type: "IMAGE",
    media_url: "/image/InstagramPost2.jpg",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: "2025-01-08T00:00:00.000Z",
    caption:
      "Building a sustainable future through science, technology, and innovation. Join us in our mission. #Sustainability #Future #KFAS",
  },
  {
    id: "placeholder-4",
    media_type: "IMAGE",
    media_url: "/image/InstagramPost.png",
    permalink: "https://www.instagram.com/kfasinfo/",
    timestamp: "2025-01-07T00:00:00.000Z",
    caption:
      "Science Directors Program 2022 - Empowering the next generation of science leaders in Kuwait. #ScienceDirectors #Leadership #KFAS",
  },
];

export default function InstagramFeed() {
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    const checkTokenAndFetch = async () => {
      try {
        const response = await fetch("/api/instagram");

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.error?.includes("not configured")) {
            setPosts(placeholderPosts);
            setLoading(false);
            return;
          }
          throw new Error(errorData.error || "Failed to fetch Instagram posts");
        }

        const data = await response.json();
        setPosts(data.posts || []);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching Instagram posts:", err);
        setPosts(placeholderPosts);
        setLoading(false);
      }
    };

    checkTokenAndFetch();
  }, []);

  const InstagramIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );

  const ArrowIcon = () => (
    <svg
      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section
      ref={sectionRef}
      id="instagram-feed"
      className="relative py-20 lg:py-32 bg-gray-50 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute top-20 right-10 w-72 h-72 bg-[#7DC0F1]/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: ySecondary }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-[#EC601B]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-[#EC601B]" />
                <InstagramIcon className="w-6 h-6 text-[#EC601B]" />
                <div className="h-px w-8 bg-[#EC601B]" />
              </div>
            </div>

            <h2 className="font-poppins text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight tracking-tight">
              Join Us in{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#EC601B]">Instagram</span>
                <motion.div
                  className="absolute bottom-2 left-0 right-0 h-3 bg-[#EC601B]/20 -z-10"
                  initial={{ scaleX: 0 }}
                  animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-[4/5] bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {posts.slice(0, 3).map((post, index) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={post.media_url}
                    alt={post.caption || "Instagram post"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                    <InstagramIcon className="w-4 h-4 text-[#EC601B]" />
                    <span>Instagram</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs font-semibold text-white/90">
                    {formatDate(post.timestamp)}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <p className="font-poppins text-sm text-gray-700 line-clamp-3">
                    {post.caption || "Follow our latest updates and highlights."}
                  </p>
                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#EC601B]">
                    <span>View on Instagram</span>
                    <ArrowIcon />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Follow Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="https://www.instagram.com/kfasinfo/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-gray-200 border-b-2 border-b-[#7DC0F1] px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-300 font-poppins"
          >
            <span>Follow @kfasinfo</span>
            <ArrowIcon />
          </a>
        </motion.div>
      </div>
    </section>
  );
}