"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type SplitTextProps = {
  text: string;
  className?: string;
  /** Stagger delay between each char/word (ms) */
  delay?: number;
  /** Duration of each segment’s transition (seconds) */
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: { opacity: number; y?: number; x?: number };
  to?: { opacity: number; y?: number; x?: number };
  textAlign?: React.CSSProperties["textAlign"];
};

function resolveEase(
  ease: string | undefined,
): [number, number, number, number] {
  switch (ease) {
    case "easeIn":
      return [0.42, 0, 1, 1];
    case "easeInOut":
      return [0.42, 0, 0.58, 1];
    case "easeOut":
    default:
      return [0, 0, 0.2, 1];
  }
}

export default function SplitText({
  text,
  className = "",
  delay = 40,
  duration = 1,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 10 },
  to = { opacity: 1, y: 0 },
  textAlign = "left",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -5% 0px" });

  const segments =
    splitType === "words"
      ? text.split(/\s+/).filter(Boolean)
      : Array.from(text);

  const staggerSec = delay / 1000;

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`.trim()}
      style={{ textAlign }}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={`${i}-${segment === " " ? "sp" : segment}`}
          initial={from}
          animate={isInView ? to : from}
          transition={{
            duration,
            ease: resolveEase(ease),
            delay: i * staggerSec,
          }}
          className="inline-block"
          style={{
            whiteSpace: splitType === "chars" ? "pre" : undefined,
          }}
        >
          {segment}
          {splitType === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
