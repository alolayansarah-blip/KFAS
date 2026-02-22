// "use client";

// import {
//   motion,
//   useScroll,
//   useTransform,
//   useReducedMotion,
// } from "framer-motion";
// import { useRef, useState } from "react";

// interface HeroProps {
//   titleEn?: string;
//   titleAr?: string;
//   subtitle?: string;
//   description?: string;
//   video?: string;
//   videoPoster?: string;
//   className?: string;
// }

// export default function Hero({
//   titleEn,
//   titleAr,
//   subtitle,
//   description,
//   video,
//   videoPoster,
//   className = "",
// }: HeroProps) {
//   const sectionRef = useRef<HTMLElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const prefersReducedMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end start"],
//   });

//   const contentY = useTransform(
//     scrollYProgress,
//     [0, 0.5],
//     prefersReducedMotion ? [0, 0] : [0, 80]
//   );

//   const splitWords = (text: string | undefined) => {
//     if (!text) return [];
//     return text.split(" ");
//   };

//   const splitLines = (text: string | undefined) => {
//     if (!text) return [];
//     // Split by | separator or newline
//     return text.split(/\||\n/).filter((line) => line.trim());
//   };

//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         videoRef.current.play();
//         setIsPlaying(true);
//       }
//     }
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className={`relative h-[110vh] md:h-[95vh] flex items-center justify-start overflow-hidden ${className}`}
//     >
//       {/* Video Background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10" />
//         <div className="absolute inset-0 bg-[#488FCC]/20 z-10" />
//         <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#488FCC]/30 blur-3xl z-10" />
//         {video && (
//           <video
//             ref={videoRef}
//             autoPlay
//             loop
//             muted
//             playsInline
//             poster={videoPoster}
//             className="absolute inset-0 w-full h-full object-cover"
//             onPlay={() => setIsPlaying(true)}
//             onPause={() => setIsPlaying(false)}
//           >
//             <source src={video} type="video/mp4" />
//           </video>
//         )}
//       </div>

//       {/* Pause/Play Button */}
//       {video && (
//         <button
//           onClick={togglePlayPause}
//           className="absolute right-6 sm:right-8 lg:right-12 bottom-12 z-30 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group"
//           aria-label={isPlaying ? "Pause video" : "Play video"}
//         >
//           {isPlaying ? (
//             <svg
//               className="w-6 h-6 sm:w-7 sm:h-7 text-white"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
//             </svg>
//           ) : (
//             <svg
//               className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M8 5v14l11-7z" />
//             </svg>
//           )}
//         </button>
//       )}

//       {/* Content */}
//       <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left">
//         {" "}
//         {subtitle && (
//           <p className="text-sm tracking-[0.35em] uppercase text-white/90 mb-6 drop-shadow-lg">
//             {subtitle}
//           </p>
//         )}
//         {/* EN title – word by word */}
//         {titleEn && (
//           <h1 className="font-poppins text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.0] drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)]">
//             {splitLines(titleEn).map((line, lineIndex) => (
//               <span key={`line-${lineIndex}`} className="block">
//                 {splitWords(line.trim()).map((word, i) => (
//                   <motion.span
//                     key={`en-${lineIndex}-${i}`}
//                     className="block sm:inline-block sm:mr-3"
//                     initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{
//                       duration: 0.6,
//                       delay: prefersReducedMotion
//                         ? 0
//                         : lineIndex * 0.5 + i * 0.08,
//                       ease: "easeOut",
//                     }}
//                   >
//                     {word}
//                   </motion.span>
//                 ))}
//               </span>
//             ))}
//           </h1>
//         )}
//         {/* AR title – word by word */}
//         {titleAr && (
//           <h2
//             dir="rtl"
//             className="mt-4 text-white/95 text-3xl sm:text-4xl md:text-5xl font-light tracking-wide drop-shadow-2xl [text-shadow:_2px_2px_8px_rgba(0,0,0,0.8)]"
//           >
//             {splitWords(titleAr).map((word, i) => (
//               <motion.span
//                 key={`ar-${i}`}
//                 className="inline-block ml-2"
//                 initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   duration: 0.6,
//                   delay: prefersReducedMotion ? 0 : i * 0.08,
//                   ease: "easeOut",
//                 }}
//               >
//                 {word}
//               </motion.span>
//             ))}
//           </h2>
//         )}
//         {description && (
//           <motion.p
//             initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl"
//           >
//             {description}
//           </motion.p>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

interface HeroProps {
  titleEn?: string;
  titleAr?: string;
  subtitle?: string;
  description?: string;
  video?: string;
  videoPoster?: string;
  className?: string;
}

export default function Hero({
  titleEn,
  titleAr,
  subtitle,
  description,
  video,
  videoPoster,
  className = "",
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const splitWords = (text: string | undefined) => {
    if (!text) return [];
    return text.split(" ");
  };

  const splitLines = (text: string | undefined) => {
    if (!text) return [];
    return text.split(/\||\n/).filter((line) => line.trim());
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-start pt-24 overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Video Background with Improved Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Cleaner gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
        
        {video && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={videoPoster}
            className="absolute inset-0 w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Content Container with Better Spacing */}
      <motion.div 
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left"
      >
        <div className="max-w-7xl">
          {/* Subtitle Badge */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#7DC0F1] to-[#EC601B]"></div>
              <span className="text-sm font-semibold text-white/90 uppercase tracking-widest">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* English Title with Fade-up */}
          {titleEn && (
            <motion.h1
              className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
              style={{
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.6)'
              }}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: prefersReducedMotion ? 0 : 0.3,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {splitLines(titleEn).map((line, lineIndex) => (
                <span key={`line-${lineIndex}`} className="block">
                  {splitWords(line.trim()).map((word, i) => (
                    <span
                      key={`en-${lineIndex}-${i}`}
                      className="inline-block mr-3 sm:mr-4"
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>
          )}

          {/* Arabic Title with Better Styling */}
          {titleAr && (
            <motion.h2
              dir="rtl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/95 text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide mb-6"
              style={{
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)'
              }}
            >
              {titleAr}
            </motion.h2>
          )}

          {/* Description with Backdrop */}
          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <p className="text-base sm:text-lg text-white/90 max-w-7xl leading-relaxed backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10">
                {description}
              </p>
            </motion.div>
          )}

        </div>
      </motion.div>

      {/* Improved Play/Pause Button */}
      {video && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={togglePlayPause}
          className="absolute right-6 sm:right-8 lg:right-12 bottom-8 sm:bottom-12 z-30 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full transition-all duration-300 group border border-white/20 hover:border-white/40"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/70 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}