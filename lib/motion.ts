/**
 * Shared motion config for consistent animations across landing page sections
 */
export const MOTION = {
  ease: [0.25, 0.46, 0.45, 0.94] as const,
  duration: 0.6,
  viewport: { once: true, amount: 0.2, margin: "0px 0px -80px 0px" as const },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  },
  fadeUpDelay: (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }),
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  },
  whileHover: { y: -6, transition: { duration: 0.25, ease: "easeOut" as const } },
};
