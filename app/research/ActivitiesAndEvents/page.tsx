"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

// ─── FadeUp ──────────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Eyebrow ─────────────────────────────────────────────────────────────────
function Eyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-px w-8 shrink-0"
        style={{ background: dark ? "rgba(255,255,255,0.4)" : BRAND.orange }}
      />
      <span
        className="font-poppins text-[10px] font-semibold uppercase tracking-[0.35em]"
        style={{ color: dark ? "rgba(255,255,255,0.55)" : BRAND.orange }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── AccentLine ──────────────────────────────────────────────────────────────
function AccentLine({ dark = false }: { dark?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="h-px origin-left mt-4"
      style={{
        background: dark
          ? "rgba(255,255,255,0.18)"
          : `linear-gradient(to right, ${BRAND.orange}, ${BRAND.lightBlue}40, transparent)`,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
    />
  );
}

// ─── SectionHeading ──────────────────────────────────────────────────────────
function SectionHeading({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <motion.h2
        className="font-poppins text-[1.55rem] sm:text-[1.8rem] font-semibold leading-[1.3] tracking-tight"
        style={{ color: dark ? BRAND.white : BRAND.navy }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        {children}
      </motion.h2>
      <AccentLine dark={dark} />
    </div>
  );
}

// ─── BodyText ────────────────────────────────────────────────────────────────
function BodyText({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className="font-poppins text-[14.5px] font-light leading-[1.9]"
      style={{ color: dark ? "rgba(255,255,255,0.72)" : `${BRAND.navy}B0` }}
    >
      {children}
    </p>
  );
}

// ─── SectionImage ────────────────────────────────────────────────────────────
function SectionImage({
  src,
  alt,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  objectPosition?: "center" | "top";
}) {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 90vw, 420px"
        className={`object-cover transition-transform duration-700 hover:scale-[1.03] ${
          objectPosition === "top" ? "object-top" : "object-center"
        }`}
      />
    </div>
  );
}

// ─── StickyImageSection ───────────────────────────────────────────────────────
// Reusable layout: scrolling text left, sticky image right.
// IMPORTANT: section must NOT have overflow-hidden — it breaks position:sticky.
function StickyImageSection({
  eyebrow,
  dark = false,
  background,
  decorativeGlow,
  children,
  imageSrc,
  imageAlt,
  imageLeft = false,
}: {
  eyebrow: string;
  dark?: boolean;
  background?: string;
  decorativeGlow?: React.ReactNode;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageLeft?: boolean;
}) {
  const textCol = <FadeUp className="flex flex-col gap-6">{children}</FadeUp>;

  // self-start + sticky top-28: image stays pinned while text scrolls past it.
  // Hidden on mobile; a normal image fallback renders below instead.
  const stickyImageCol = (
    <div className="hidden lg:block self-start sticky top-28">
      <FadeUp delay={0.15}>
        <div className="w-full">
          <SectionImage src={imageSrc} alt={imageAlt} />
        </div>
      </FadeUp>
    </div>
  );

  const mobileImage = (
    <FadeUp delay={0.15} className="lg:hidden flex justify-center">
      <div className="w-full max-w-[420px]">
        <SectionImage src={imageSrc} alt={imageAlt} />
      </div>
    </FadeUp>
  );

  return (
    <section
      className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12 relative"
      style={background ? { background } : undefined}
    >
      {decorativeGlow}
      <div className="mx-auto max-w-[1280px] relative z-10">
        <div
          className={`grid gap-12 lg:gap-24 ${
            imageLeft ? "lg:grid-cols-[1fr_1.4fr]" : "lg:grid-cols-[1.4fr_1fr]"
          }`}
        >
          {imageLeft ? (
            <>
              {stickyImageCol}
              {textCol}
            </>
          ) : (
            <>
              {textCol}
              {stickyImageCol}
            </>
          )}
          {mobileImage}
        </div>
      </div>
    </section>
  );
}

// ─── Organized Event Row — WITH image ────────────────────────────────────────
function EventRowWithImage({
  title,
  body,
  imageSrc,
  imageAlt,
  imageRight = false,
  delay = 0,
}: {
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  imageRight?: boolean;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay}>
      <div
        className="flex flex-col lg:flex-row w-full overflow-hidden border"
        style={{ borderColor: `${BRAND.navy}14` }}
      >
        {/* Text */}
        <div
          className={`order-2 flex flex-col justify-center gap-4 px-8 py-8 lg:px-10 lg:py-10 flex-1 ${
            imageRight ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="h-[2px] w-8" style={{ background: BRAND.orange }} />
          <h3
            className="font-poppins text-[16px] font-semibold leading-snug"
            style={{ color: BRAND.navy }}
          >
            {title}
          </h3>
          <p
            className="font-poppins text-[13.5px] font-light leading-[1.9]"
            style={{ color: `${BRAND.navy}95` }}
          >
            {body}
          </p>
        </div>

        {/* Image column */}
        <div
          className={`order-1 relative w-full lg:w-[340px] xl:w-[400px] shrink-0 min-h-[240px] lg:min-h-[320px] ${
            imageRight ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
          />
          {/* Subtle top fade so the image doesn't feel cut */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(29,45,68,0.4) 0%, transparent 28%)",
            }}
            aria-hidden
          />
        </div>
      </div>
    </FadeUp>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ActivitiesAndEventsPage() {
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
          className="relative flex h-[60vh] min-h-[420px] items-end justify-start overflow-hidden"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <video
              className="absolute inset-0 h-full w-full scale-110 object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/image/ActivitiesBanner2.png"
              aria-label="Activities and events"
            >
              <source src="/image/BannerActivites.mp4" type="video/mp4" />
            </video>
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
          </motion.div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-14 pt-28 sm:px-8 lg:px-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>Research</span>
              <span className="text-white/25">/</span>
              <span>Activities &amp; Events</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="text-left font-poppins text-4xl font-bold leading-tight tracking-tight text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl xl:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              >
                Activities &amp; Events
              </motion.h1>
            </div>

            <motion.div
              className="mt-5 h-[3px] w-[72px] origin-left rounded-full bg-[#EC601B]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── 1. STS ───────────────────────────────────────────────────── */}
        <section className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
              <FadeUp className="flex flex-col gap-6">
                <Eyebrow label="STS" />
                <SectionHeading>
                  Science and Technology in Society (STS) Forum
                </SectionHeading>
                <div className="flex flex-col gap-4 mt-1">
                  <BodyText>
                    The Science and Technology in Society (STS) Forum is a
                    leading global platform held annually in Kyoto, Japan,
                    bringing together world leaders from science, industry, and
                    policy to discuss how science and technology can address
                    long‑term global challenges. The forum welcomes over a
                    thousand participants each year, including Nobel laureates,
                    ministers, university presidents, CEOs, and emerging young
                    leaders. It aims to strengthen the positive impact of
                    scientific progress while addressing its risks and societal
                    implications.
                  </BodyText>
                  <BodyText>
                    KFAS supports Kuwaiti researchers and professionals to
                    participate in the STS Young Leaders Program, which invites
                    outstanding individuals under 40 to engage directly with
                    global experts. The program offers high‑level dialogue,
                    exposure to international innovation trends, and
                    opportunities to build lasting networks that contribute to
                    Kuwait's scientific and technological development.
                  </BodyText>
                </div>
              </FadeUp>

              <FadeUp delay={0.15} className="flex justify-center">
                <div className="w-full max-w-[420px]">
                  <SectionImage
                    src="/image/KfasBuilding2.png"
                    alt="KFAS building"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 2. OES ───────────────────────────────────────────────────── */}
        <section
          className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12"
          style={{ background: "#BBDEFB25" }}
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
              <FadeUp
                delay={0.15}
                className="flex justify-center order-2 lg:order-1"
              >
                <div className="w-full max-w-[420px]">
                  <SectionImage
                    src="/image/OES.png"
                    alt="Oxford Energy Seminar"
                  />
                </div>
              </FadeUp>

              <FadeUp className="flex flex-col gap-6 order-1 lg:order-2">
                <Eyebrow label="OES" />
                <SectionHeading>The Oxford Energy Seminar</SectionHeading>
                <div className="flex flex-col gap-4 mt-1">
                  <BodyText>
                    It is a residential educational conference that brings
                    together government officials, industry leaders, managers,
                    and professionals involved in energy policy and
                    decision-making. Widely recognized as an important
                    international forum on energy, the seminar provides
                    participants with an intensive overview of current
                    developments, challenges, and opportunities shaping the
                    global energy landscape and the energy transition.
                  </BodyText>
                  <BodyText>
                    The program features lectures, discussions, and exchanges
                    led by a diverse international panel of experts from
                    governments, the energy industry, financial institutions,
                    academia, and international organizations.
                  </BodyText>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 3. RENAC — sticky image ───────────────────────────────────── */}
        <StickyImageSection
          eyebrow="RENAC"
          dark
          background={BRAND.orange}
          decorativeGlow={
            <div
              className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-20"
              style={{ background: "white" }}
              aria-hidden
            />
          }
          imageSrc="/image/RENAC.jpg"
          imageAlt="RENAC renewable energy training"
        >
          <Eyebrow label="RENAC" dark />
          <SectionHeading dark>
            RENAC – online training in renewable energy and energy efficiency.
          </SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            <BodyText dark>
              The Renewables Academy (RENAC) in Berlin is one of the world's
              leading institutions for professional training and capacity
              building in renewable energy and energy efficiency. As part of its
              commitment to developing national expertise in clean energy, KFAS
              sponsors Kuwaiti students to enroll in RENAC's 6‑month online
              training program in renewable energy and energy efficiency. This
              program provides a structured, in‑depth learning experience
              covering core technologies, system design, energy policy, and
              practical applications within the global renewable energy sector.
            </BodyText>
            <BodyText dark>
              Through this sponsorship, participants gain access to high‑quality
              online modules, expert instruction, and internationally recognized
              training materials—equipping them with the skills needed to
              contribute to Kuwait's transition toward sustainable energy
              solutions. The program serves as an important steppingstone for
              emerging engineers, scientists, and energy professionals seeking
              to build technical competency and advance their careers in the
              renewable energy field.
            </BodyText>
            <div
              className="border-l-2 pl-5 pt-1 flex flex-col gap-3 mt-1"
              style={{ borderColor: "rgba(255,255,255,0.4)" }}
            >
              <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                In-person training RENAC course
              </p>
              <BodyText dark>
                KFAS‑sponsored graduates of the renewable energy and energy
                efficiency online course offered by RENAC were selected for an
                additional, advanced training opportunity through the Research
                Capacity Building Section. These graduates attended a one‑week,
                in‑person program at RENAC's training center in Berlin, titled
                "On‑grid and Off‑grid PV Systems: Practical PVsyst Training."
              </BodyText>
              <BodyText dark>
                This hands‑on course provided participants with practical
                experience in designing, analyzing, and evaluating photovoltaic
                systems using industry‑standard tools and applications. The
                training built on the knowledge gained in the online program,
                enabling participants to deepen their technical skills and
                expand their professional capabilities in renewable energy.
              </BodyText>
            </div>
          </div>
        </StickyImageSection>

        {/* ── 4. CERN ──────────────────────────────────────────────────── */}
        <section className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
              <FadeUp
                delay={0.15}
                className="flex justify-center order-2 lg:order-1"
              >
                <div className="w-full max-w-[420px]">
                  <SectionImage
                    src="/image/KfasBuilding2.png"
                    alt="CERN Summer Student Program"
                  />
                </div>
              </FadeUp>

              <FadeUp className="flex flex-col gap-6 order-1 lg:order-2">
                <Eyebrow label="CERN" />
                <SectionHeading>
                  CERN (The European Organization for Nuclear Research) Summer
                  Student Program
                </SectionHeading>
                <div className="flex flex-col gap-4 mt-1">
                  <BodyText>
                    KFAS fund students to participate in the prestigious summer
                    training program at the CERN (European Organization for
                    Nuclear Research) headquarters in Geneva, Switzerland.
                    During their 8-week stay at CERN, these students worked
                    alongside world-renowned scientists and researchers in the
                    state-of-the-art research labs and accelerators.
                  </BodyText>
                  <BodyText>
                    This hands-on experience allowed them to engage in
                    groundbreaking scientific research and gain valuable
                    insights into the advanced technologies used in particle
                    physics and other related fields. Their time at CERN
                    expanded their academic and practical knowledge and provided
                    them with a unique opportunity to contribute to cutting-edge
                    research in a global scientific community.
                  </BodyText>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 5. AAAS — sticky image ────────────────────────────────────── */}
        <StickyImageSection
          eyebrow="AAAS"
          background="#BBDEFB25"
          imageSrc="/image/AAAS.png"
          imageAlt="AAAS Annual Meeting"
        >
          <Eyebrow label="AAAS" />
          <SectionHeading>AAAS Annual Meeting</SectionHeading>
          <div className="flex flex-col gap-4 mt-1">
            <BodyText>
              The AAAS American Association for the Advancement of Science
              Annual Conference is one of the world's leading multidisciplinary
              science gatherings, bringing together researchers, students,
              policymakers, and global science leaders to explore emerging
              discoveries and engage in high-level scientific dialogue. The
              conference features keynote talks, panel discussions, workshops,
              exhibitions, and a wide range of poster and e-poster presentations
              across all scientific fields.
            </BodyText>
            <BodyText>
              KFAS participates annually by sponsoring Kuwaiti students and
              researchers to present their work and represent Kuwait on an
              international stage. Participants showcase their research through
              e-poster presentations, attend scientific sessions, and engage
              with peers and experts from around the world, strengthening their
              scientific skills, expanding international networks, and
              contributing to Kuwait's visibility within the global research
              community.
            </BodyText>
            <BodyText>
              In 2025, two KFAS-sponsored students received Honorable Mention
              recognition from the AAAS organization for the quality and impact
              of their presentations, an important milestone highlighting the
              excellence of young Kuwaiti researchers participating in the
              program.
            </BodyText>
            <BodyText>
              Through this annual participation, KFAS continues to build
              national research capacity and open doors for emerging scientists
              to engage in international scientific exchange at one of the most
              prestigious scientific conferences in the world.
            </BodyText>
          </div>
        </StickyImageSection>

        {/* ── 6. Networking Events ─────────────────────────────────────── */}
        <section
          className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12 relative"
          style={{ background: BRAND.orange }}
        >
          {/* Decorative glow — isolated so it never blocks sticky on other sections */}
          <div
            className="pointer-events-none absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-20"
            style={{ background: "white" }}
            aria-hidden
          />
          <div className="mx-auto max-w-[1280px] relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
              <FadeUp
                delay={0.15}
                className="flex justify-center order-2 lg:order-1"
              >
                <div className="w-full max-w-[420px]">
                  <SectionImage
                    src="/image/N.E.png"
                    alt="Researchers networking"
                    objectPosition="top"
                  />
                </div>
              </FadeUp>

              <FadeUp className="flex flex-col gap-6 order-1 lg:order-2">
                <Eyebrow label="Networking Events" dark />
                <SectionHeading dark>Networking Events</SectionHeading>
                <div className="flex flex-col gap-4 mt-1">
                  <BodyText dark>
                    Our networking activities aim to strengthen connections
                    within the research community and foster a collaborative
                    environment among researchers supported by the foundation.
                    By bringing together scholars from diverse disciplines and
                    institutions, these activities encourage the exchange of
                    ideas, perspectives, and experiences that can inspire new
                    research directions and partnerships.
                  </BodyText>
                  <BodyText dark>
                    They also support professional development and help build
                    lasting relationships among researchers, contributing to a
                    dynamic research community and enhancing the broader impact
                    of scientific research.
                  </BodyText>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 7. Organized Events ──────────────────────────────────────── */}
        <section className="px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-white">
          <div className="mx-auto max-w-[1280px]">
            <FadeUp className="flex flex-col gap-3 mb-16">
              <Eyebrow label="Organized Events" />
              <SectionHeading>Organized Events</SectionHeading>
            </FadeUp>

            <div className="flex flex-col gap-5">
              <EventRowWithImage
                title="CERN Scientific CV writing workshop"
                imageSrc="/image/KfasBuilding2.png"
                imageAlt="CERN Scientific CV writing workshop"
                body="The CERN (The European Organization for Nuclear Research) CV Workshop is a scientific CV-writing session organized by KFAS to help Kuwaiti students prepare strong, competitive CVs for the CERN Summer Student Training Program. It teaches students how to present their academic, research, and technical experience in a way that meets CERN's strict application requirements, while also guiding them on structure, clarity, and relevance. The workshop is open to eligible Kuwaiti bachelor and master's students in Physics, Computer Science, Mathematics, or Engineering, and often includes practical guidance, post-session CV reviews, and insights from former CERN participants. As part of KFAS's collaboration, the workshop supports national capacity-building by ensuring applicants are well-prepared before applying."
                delay={0}
              />

              <EventRowWithImage
                title="Artificial Intelligence Empowering Research Workshop Led by Elsevier"
                imageSrc="/image/KfasBuilding2.png"
                imageAlt="Artificial Intelligence Empowering Research Workshop Led by Elsevier"
                imageRight
                body={`The Elsevier Workshop was a full-day training session titled "AI Empowering Research," delivered by Elsevier experts and hosted by KFAS. It explored how artificial intelligence was transforming research, publishing, and research management. The workshop covered key topics such as GenAI in research management and its limitations, AI-driven publishing workflows, how leading organizations were using AI, as well as pitfalls, best practices, and research integrity in the context of AI adoption. Participants also received practical, hands-on training with Elsevier's AI tools, applying them in group exercises—including preparing a mock funding proposal. Designed for Kuwaiti researchers, academics, and research administrators, the workshop formed part of KFAS's broader efforts to strengthen national research capacity and promote the responsible use of AI in scientific work.`}
                delay={0.06}
              />

              <EventRowWithImage
                title="Research & Technology Directorate Networking Day"
                imageSrc="/image/KfasBuilding2.png"
                imageAlt="Research & Technology Directorate Networking Day"
                body={`The RTD Research Networking Day was an open, full-day event that provided researchers with the opportunity to engage directly with teams, ask questions, explore available programs, and discuss potential collaborations. The day featured open networking sessions, informational booths, and a special lecture titled "The Art of Crafting a Proposal: From Start to Finish," which guided attendees on developing strong research proposals. The event aimed to create a productive space for researchers to exchange ideas, receive guidance, and build connections across the research community.`}
                delay={0.12}
              />

              <EventRowWithImage
                title="Informative session at KIMS"
                imageSrc="/image/KIMS.png"
                imageAlt="Informative session at KIMS"
                imageRight
                body="The KIMS Information Session was a tailored presentation delivered to the Kuwait Institute for Medical Specialization (KIMS), the national body responsible for postgraduate medical training in Kuwait. The session introduced KIMS-affiliated researchers and trainees to the research-support offerings available through the Research & Technology Directorate (RTD). It provided an overview of KFAS's mission and vision, demonstrated how to use the Pure Portal to access research outputs, track impact, and identify collaborators, and highlighted the tools and platforms available to support grants, networking, outreach, and broader research engagement. The session served to help medical researchers better navigate KFAS's research ecosystem and access opportunities for national and international collaboration."
                delay={0.18}
              />

              <EventRowWithImage
                title="KFASxNASEM Workshops"
                imageSrc="/image/NASEM.png"
                imageAlt="KFASxNASEM workshops"
                body={`KFAS collaborates with the U.S. National Academies of Sciences, Engineering, and Medicine (NASEM) through two major bilateral workshop series designed to advance scientific exchange between Kuwait and the United States. The first, "Promising Practices for Improving the Inclusion of Women in Science, Engineering, and Medicine: Lessons From Kuwait and the United States - Workshop Series" (2020), brought together experts and leaders to explore strategies for enhancing female participation in STEM fields. The second, "Precision Medicine: Promoting Knowledge Exchange and Collaboration between Kuwait and the United States - Workshop Series" (2024-2025), focuses on emerging innovations in personalized medicine, including AI in healthcare, point-of-care technologies, and interdisciplinary approaches. Both collaborations produce published workshop proceedings, ensuring that insights and recommendations are shared with the wider scientific and policy community.`}
                delay={0.24}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer
        logo="/image/logoFooter.png"
        logoText="Kuwait Foundation for the Advancement of Sciences (KFAS)"
      />
    </>
  );
}
