"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Brand ───────────────────────────────────────────────────────────────────
const BRAND = {
  orange: "#EC601B",
  lightBlue: "#BBDEFB",
  navy: "#1D2D44",
  white: "#FFFFFF",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTAINER = "mx-auto max-w-[1280px]";

// ─── Image placeholder ─────────────────────────────────────────────────────────
// Swap for a real photo by replacing the inner block with:
//   <Image src="/image/your-photo.jpg" alt="…" fill className="object-cover" />
function ImagePlaceholder({
  ratio = "aspect-[4/3]",
  label = "Image",
}: {
  ratio?: string;
  label?: string;
}) {
  return (
    <div
      className={`group relative w-full overflow-hidden border ${ratio}`}
      style={{ borderColor: `${BRAND.navy}14` }}
    >
      {/* ── REPLACE FROM HERE ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${BRAND.lightBlue}45 0%, ${BRAND.navy}12 100%)`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `radial-gradient(${BRAND.navy}18 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${BRAND.navy}`}
            strokeOpacity="0.4"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.6" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span
            className="font-poppins text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: `${BRAND.navy}55` }}
          >
            {label}
          </span>
        </div>
      </div>
      {/* ── REPLACE TO HERE ──────────────────────────────────────────── */}
    </div>
  );
}

// ─── Program section ────────────────────────────────────────────────────────────
function ProgramSection({
  title,
  body,
  imageLabel,
  imageSrc,
  imageAlt,
  imageLeft = false,
  background,
}: {
  title: string;
  body: string;
  imageLabel: string;
  imageSrc?: string;
  imageAlt?: string;
  imageLeft?: boolean;
  background?: string;
}) {
  const text = (
    <motion.div
      className={`flex flex-col gap-5 ${imageLeft ? "lg:order-2" : ""}`}
      initial={{ opacity: 0, x: imageLeft ? 48 : -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div>
        <h3
          className="font-poppins text-[1.4rem] sm:text-[1.65rem] font-semibold leading-[1.3] tracking-tight"
          style={{ color: BRAND.navy }}
        >
          {title}
        </h3>
        <div
          className="mt-4 h-px w-full max-w-[360px]"
          style={{
            background: `linear-gradient(to right, ${BRAND.orange}, ${BRAND.lightBlue}40, transparent)`,
          }}
        />
      </div>
      <p
        className="text-justify font-poppins text-[14.5px] font-light leading-[1.9]"
        style={{ color: `${BRAND.navy}B0` }}
      >
        {body}
      </p>
    </motion.div>
  );

  const image = (
    <motion.div
      className={imageLeft ? "lg:order-1" : ""}
      initial={{ opacity: 0, x: imageLeft ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      whileHover={{ y: -8 }}
    >
      {imageSrc ? (
        <div
          className="group relative aspect-[4/3] w-full overflow-hidden border"
          style={{ borderColor: `${BRAND.navy}14` }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt ?? imageLabel}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <ImagePlaceholder label={imageLabel} />
      )}
    </motion.div>
  );

  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12"
      style={background ? { background } : undefined}
    >
      <div className={CONTAINER}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {text}
          {image}
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function YouthPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <Header
        logo="/image/logo_c.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
        forceWhiteBackground
      />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex h-[60vh] min-h-[420px] items-end justify-start overflow-hidden bg-[#121820]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <div className="absolute inset-0 bg-[#1D2D44]">
              <Image
                src="/image/Youth.jpg"
                alt="Youth engaged in hands-on learning and development"
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
                }}
                aria-hidden
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
                }}
                aria-hidden
              />
            </div>
          </motion.div>

          <motion.div
            className="relative z-10 w-full px-6 pb-14 pt-28 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <div className={`${CONTAINER} w-full`}>
              <motion.div
                className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <span>Learning &amp; Development</span>
                <span className="text-white/25">/</span>
                <span>Youth</span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  className="text-left font-poppins text-4xl font-bold leading-[1.08] tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
                >
                  Youth
                </motion.h1>
              </div>

              <motion.div
                className="mt-6 h-[3px] w-[72px] origin-left rounded-full bg-[#EC601B]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              />
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Overview ─────────────────────────────────────────────────── */}
        <section
          id="overview"
          className="scroll-mt-28 px-6 py-20 sm:px-8 sm:py-28 lg:px-12"
        >
          <div className={CONTAINER}>
            <div className="flex w-full flex-col gap-6">
              <motion.p
                className="text-justify font-poppins text-[16px] sm:text-[17px] font-light leading-[1.95]"
                style={{ color: BRAND.navy }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                KFAS provides learning opportunities targeting K-12 students,
                university undergraduate students, and educators. It emphasizes
                practical, interactive, and inclusive approaches to foster
                curiosity, scientific literacy, and innovation.
              </motion.p>
              <motion.p
                className="text-justify font-poppins text-[16px] sm:text-[17px] font-light leading-[1.95]"
                style={{ color: BRAND.navy }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              >
                Through STEAM &ldquo;Science, Technology, Engineering, Arts, and
                Mathematics&rdquo; events and activities, this offering aims to
                drive and encourage, capacity building and knowledge transfer as
                well as outreach and networking for innovation ecosystem growth.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Scope ────────────────────────────────────────────────────── */}
        <section
          id="scope"
          className="scroll-mt-28 px-6 pb-20 sm:px-8 sm:pb-28 lg:px-12"
        >
          <div className={CONTAINER}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <h2
                className="font-poppins text-[1.55rem] sm:text-[1.8rem] font-semibold leading-[1.3] tracking-tight"
                style={{ color: BRAND.navy }}
              >
                Scope
              </h2>
              <motion.div
                className="mt-4 h-px w-full max-w-[420px] origin-left"
                style={{
                  background: `linear-gradient(to right, ${BRAND.orange}, ${BRAND.lightBlue}40, transparent)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              />
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  title: "STEAM Capacity Building for Students & Educators",
                  items: [
                    "Offer local and international learning and development opportunities for students and educators.",
                    "Train-the-Trainer programs in STEAM.",
                    "Mentorship and peer-learning platforms.",
                  ],
                },
                {
                  title: "Science Communication and Outreach",
                  items: [
                    "Production of Sci & Tech media (videos, podcasts, and infographics) including collaboration with journalists and influencers to make science engaging and accessible.",
                    "Offer mobile platform for delivering hands-on STEAM learning across Kuwait.",
                    "Curation of events and activities under Science Month.",
                  ],
                },
                {
                  title: "Citizen Science Initiatives",
                  items: [
                    "Provide opportunities to engage in projects related to biodiversity, climate change, astronomy, and health.",
                    "Develop online open-data platforms for public view and contributions.",
                    "Establish recognition programs including badges, awards, and certificates.",
                  ],
                },
              ].map((group, gi) => (
                <motion.div
                  key={group.title}
                  className="flex h-full flex-col overflow-hidden border"
                  style={{ borderColor: `${BRAND.navy}14` }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: gi * 0.1, ease: EASE }}
                  whileHover={{ y: -6 }}
                >
                  <div
                    className="h-1 w-full"
                    style={{ background: BRAND.orange }}
                  />
                  <div className="flex flex-col gap-5 px-7 py-8">
                    <h3
                      className="font-poppins text-[16px] font-semibold leading-snug"
                      style={{ color: BRAND.navy }}
                    >
                      {group.title}
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: BRAND.orange }}
                          />
                          <span
                            className="font-poppins text-[14px] font-light leading-[1.8]"
                            style={{ color: `${BRAND.navy}B0` }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section
          id="apply"
          className="scroll-mt-28 px-6 py-20 sm:px-8 sm:py-24 lg:px-12"
          style={{ background: "#7DC0F1" }}
        >
          <div
            className={`${CONTAINER} flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:gap-12 lg:text-left`}
          >
            <motion.h2
              className="max-w-[30ch] font-poppins text-[1.5rem] sm:text-[2rem] font-semibold leading-[1.3] tracking-tight"
              style={{ color: BRAND.white }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              Apply now to participate in KFAS opportunities for the Youth.
            </motion.h2>
            <motion.a
              href="#"
              className="inline-flex shrink-0 items-center justify-center rounded-full px-9 py-3.5 font-poppins text-[13px] font-semibold uppercase tracking-[0.18em] shadow-sm"
              style={{ background: BRAND.white, color: BRAND.navy }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply Now
            </motion.a>
          </div>
        </section>

        {/* ── Programs ─────────────────────────────────────────────────── */}
        <ProgramSection
          title="Generation Science"
          imageLabel="Generation Science"
          imageSrc="/image/Generation.png"
          imageAlt="Students exploring STEM through virtual reality"
          body="Generation Science summer program empowers students in grades 7 to 12 to become ambassadors of STEM awareness and innovation within their schools and communities. By placing youth at the forefront of science and technology engagement, the program sparks a passion for discovery and motivates students to pursue STEM education and careers, ultimately contributing to building a strong, future-ready workforce. Student leaders represent their schools as the voice of STEM. They join a dynamic national cohort of young changemakers, receiving targeted leadership training, collaborating on STEM initiatives, and providing meaningful input to educators, industry professionals, and decision-makers across educational institutions, industry, and government."
        />

        <ProgramSection
          title="Science Month"
          imageLabel="Science Month"
          imageSrc="/image/ScienceMonth.png"
          imageAlt="Science Month community event with youth activities"
          imageLeft
          background={`${BRAND.lightBlue}20`}
          body="Science Month is a national initiative that celebrates science, technology, and innovation through a diverse program of events and activities across Kuwait. The initiative brings together students, educators, researchers, and the wider community to explore the role of science in everyday life. Through workshops, exhibitions, talks, and interactive experiences, Science Month aims to inspire curiosity, promote scientific thinking, and encourage youth to pursue STEM fields. By fostering collaboration among local and international partners, the initiative contributes to building a vibrant science culture and supporting Kuwait’s knowledge-based future."
        />

        <ProgramSection
          title="Science Bus"
          imageLabel="Science Bus"
          imageSrc="/image/SciencesBus.png"
          imageAlt="Students learning inside the mobile Science Bus laboratory"
          body="The Science Bus brings interactive science experiences directly to schools and communities across Kuwait. Designed as a mobile learning platform, the Science Bus delivers engaging, hands-on activities that make science accessible, fun, and relevant to everyday life. Through immersive demonstrations and guided experiments, the program aims to spark curiosity, inspire young minds, and promote interest in STEM fields. By reaching diverse audiences nationwide, the Science Bus plays a key role in expanding access to quality science education and fostering a culture of discovery."
        />
      </main>
      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
