"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";

const stats = [
  { value: 1124, label: "Profiles" },
  { value: 111, label: "Organizations" },
  { value: 3590, label: "Research Outputs" },
  { value: 1673, label: "Projects" },
  { value: 97, label: "Impacts" },
  { value: 379, label: "Prizes" },
  { value: 916, label: "Equipment" },
];

export default function CounterSection() {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const startAnimation = () => {
      if (hasAnimatedRef.current) {
        return;
      }
      hasAnimatedRef.current = true;

      // Start counting animation
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 50;
        const stepDuration = duration / steps;
        const increment = stat.value / steps;

        let currentCount = 0;

        const timer = setInterval(() => {
          currentCount += increment;

          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.min(Math.round(currentCount), stat.value);
            return newCounts;
          });

          if (currentCount >= stat.value) {
            clearInterval(timer);
            setCounts((prev) => {
              const newCounts = [...prev];
              newCounts[index] = stat.value;
              return newCounts;
            });
          }
        }, stepDuration);

        timersRef.current.push(timer);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      timersRef.current.forEach((timer) => clearInterval(timer));
      timersRef.current = [];

      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/image/benduluim.png')] bg-cover bg-center bg-fixed" />
      {/* Orange overlay */}
      <div className="absolute inset-0 bg-[#EC601B]/90" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-left max-w-4xl mb-16">
          <h2 className="font-poppins text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight text-left">
            <span className="relative inline-block">
              <SplitText
                text="50 Years"
                className="font-poppins font-bold text-3xl lg:text-4xl xl:text-5xl relative z-10"
                delay={40}
                duration={1}
                ease="easeOut"
                splitType="chars"
                from={{ opacity: 0, y: 10 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="left"
              />
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-white/20 -z-10" />
            </span>{" "}
            Journey Supporting
            <br />
            Science, Technology, and Innovation
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={
                counts[index] > 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center transition-all duration-300 border border-white/20 hover:bg-white/15 hover:border-white/40 cursor-default"
            >
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-2xl group-hover:border-white/50 transition-colors duration-300" />

              {/* Number */}
              <div className="font-poppins text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                {formatNumber(counts[index])}
              </div>

              {/* Divider line */}
              <div className="h-0.5 w-12 bg-white/40 mx-auto mb-3 group-hover:w-16 group-hover:bg-white/60 transition-all duration-300" />

              {/* Label */}
              <p className="font-poppins text-xs text-white/80 font-medium leading-tight uppercase tracking-wide group-hover:text-white transition-colors duration-300">
                {stat.label}
              </p>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-white/60 text-sm">
            <div className="w-12 h-px bg-white/30" />
            <span className="font-poppins font-medium">Since 1976</span>
            <div className="w-12 h-px bg-white/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}