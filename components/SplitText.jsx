import React from "react";
import { motion, useInView } from "framer-motion";

/**
 * @param {{
 *  text: string,
 *  className?: string,
 *  style?: React.CSSProperties,
 *  highlightChars?: number[],
 *  highlightClassName?: string,
 *  delay?: number,
 *  duration?: number,
 *  ease?: string,
 *  splitType?: "chars" | "words",
 *  from?: { opacity: number, y: number },
 *  to?: { opacity: number, y: number },
 *  threshold?: number,
 *  rootMargin?: string,
 *  textAlign?: "left" | "center" | "right",
 *  onLetterAnimationComplete?: () => void,
 *  showCallback?: boolean,
 * }} props
 */
export default function SplitText({
  text,
  className,
  style = undefined,
  highlightChars = [],
  highlightClassName = "",
  delay = 50,
  duration = 0.6,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "0px",
  textAlign = "left",
  onLetterAnimationComplete = undefined,
  showCallback = false,
}) {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, {
    amount: threshold,
    margin: rootMargin,
    once: true,
  });

  const segments =
    splitType === "words" ? text.split(/(\s+)/) : Array.from(text);

  const handleComplete = React.useCallback(() => {
    if (typeof onLetterAnimationComplete === "function") {
      onLetterAnimationComplete();
    }
  }, [onLetterAnimationComplete]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ textAlign, display: "inline-block", ...style }}
      aria-label={text}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          className={
            splitType === "chars" && highlightChars.includes(index)
              ? highlightClassName
              : undefined
          }
          style={{ display: "inline-block", whiteSpace: "pre" }}
          initial={from}
          animate={isInView ? to : from}
          transition={{
            duration,
            ease,
            delay: (delay * index) / 1000,
          }}
          onAnimationComplete={
            index === segments.length - 1 ? handleComplete : undefined
          }
        >
          {segment}
        </motion.span>
      ))}
      {showCallback ? (
        <span className="sr-only">animation complete</span>
      ) : null}
    </span>
  );
}