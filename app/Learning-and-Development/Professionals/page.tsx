"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cardClass =
  "relative flex flex-col p-8 bg-gradient-to-br from-blue-50 to-sky-50/80 rounded-lg shadow-[0_4px_20px_rgba(86,160,215,0.08)]";
const cornerClass =
  "absolute bottom-4 right-4 w-12 h-12 border-r border-b border-[#56A0D7]/50 pointer-events-none";
const labelClass =
  "text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#56A0D7] uppercase";
const dividerClass = "mt-2 h-px w-8 bg-[#56A0D7]/40";
const titleClass = "font-poppins text-lg font-bold text-gray-900 tracking-tight mt-1";
const bodyClass = "text-[15px] sm:text-base text-gray-600/90 leading-[1.75] font-light mt-4";

function ContentCard({
  label,
  title,
  children,
  delay = 0,
  letter,
}: {
  label?: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
  letter?: string;
}) {
  return (
    <motion.div
      className={`${cardClass} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {letter && (
        <span
          className="absolute top-2 right-4 text-[8rem] sm:text-[10rem] font-bold text-[#56A0D7] opacity-20 pointer-events-none select-none"
          aria-hidden
        >
          {letter}
        </span>
      )}
      <div className={cornerClass} style={{ borderBottomRightRadius: "2px" }} aria-hidden />
      <div className="relative z-10">
        {label && <span className={labelClass}>{label}</span>}
        <h3 className={titleClass}>{title}</h3>
        <div className={dividerClass} />
      </div>
      <p className={`${bodyClass} relative z-10`}>{children}</p>
    </motion.div>
  );
}

function SectionTitle({
  number,
  title,
  delay = 0,
}: {
  number: string;
  title: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="mb-8"
    >
      {/* <span className={labelClass}>Program</span> */}
      <h2 className="font-poppins text-2xl sm:text-3xl font-bold text-[#1D2D44] tracking-tight mt-1">
        {number}. {title}
      </h2>
      <div className="mt-3 h-0.5 w-16 bg-[#56A0D7]/50" />
    </motion.div>
  );
}

export default function ProfessionalsPage() {
  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white pt-20 font-poppins">
        <section className="relative overflow-hidden flex items-center justify-start h-[55vh]">
          <div className="absolute inset-0 bg-[#7DC0F1]" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-left">
              <motion.div
                className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.3em] text-white/70 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="text-white/60">Learning & Development</span>
                <span className="text-white/40">/</span>
                <span className="text-white">Professionals</span>
              </motion.div>
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] mb-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                Professionals
              </motion.h1>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="space-y-16">
              {/* 1. Professional Development Learning */}
              <div>
                <SectionTitle number="1" title="Professional Development Learning" delay={0} />

                <div className="grid gap-8 lg:grid-cols-2">
                  <ContentCard
                    title="Open enrollment courses"
                    delay={0.05}
                    letter="A"
                  >
                    KFAS offer seats on selected topics (in line with KFAS strategic direction) in courses by subject matter expert practitioners. This activity would focus on developing specific skills needed for organizational development. Short-courses (up to 5 days) are offered to all employee levels in open enrollment style. Courses are delivered with latest and highest standard of learning delivery. Seats are open to all Kuwaiti citizens, targeting the entire workforce population.
                  </ContentCard>
                  <ContentCard
                    title="Professional Certificate Incentive Scheme"
                    delay={0.1}
                    letter="B"
                  >
                    KFAS offer grants to enhance the capabilities of the Kuwaiti human capital and sharpen their professional skills by a scheme to encourage individuals to obtain their professional credentials. An attractive monetary reward is given upon successfully obtaining the professional certificate. The amount of the reward will be determined based on KFAS policies and procedures for rewards.
                  </ContentCard>
                </div>
              </div>

              {/* 2. Executive Education */}
              <div>
                <SectionTitle number="2" title="Executive Education" delay={0.15} />

                <div className="grid gap-8 lg:grid-cols-2 mb-10">
                  <ContentCard title="Local courses" delay={0.2} letter="A">
                    KFAS bring executive education short-courses offered by international academic institutions on selected topics (in line with KFAS strategic direction) to Kuwait to offer seats locally and would be available to all Kuwaiti citizens.
                  </ContentCard>
                  <ContentCard title="Abroad courses" delay={0.25} letter="B">
                    KFAS offer seats on selected topics (in line with KFAS strategic direction) in programs already offered by academic institutions. This would allow participants to interact and exchange knowledge with other participants from around the world.
                  </ContentCard>
                </div>

                {/* Customized programs with sub-items */}
                <motion.div
                  className={`${cardClass} overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span
                    className="absolute top-2 right-4 text-[8rem] sm:text-[10rem] font-bold text-[#56A0D7] opacity-20 pointer-events-none select-none"
                    aria-hidden
                  >
                    C
                  </span>
                  <div className={cornerClass} style={{ borderBottomRightRadius: "2px" }} aria-hidden />
                  <div className="relative z-10">
                    <h3 className={titleClass}>Customized programs</h3>
                    <div className={dividerClass} />
                  </div>
                  <p className={`${bodyClass} relative z-10`}>
                    KFAS partner with academic institutions to create customized programs specifically to participants from Kuwait and offer the seats to entities in Kuwait. This offering also includes blended and experiential learning experiences taught over a period of months.
                  </p>
                  <ul className="mt-8 space-y-6 list-none relative z-10">
                    <li>
                      <h4 className="font-poppins font-semibold text-[#1D2D44] mb-2">
                        • KFAS Innovation Challenge
                      </h4>
                      <p className={bodyClass}>
                        One of our standout executive education programs is the annual KFAS Innovation Challenge, in which a small group of selected companies work with prestigious business schools to develop new initiatives and projects that advance a culture of innovation within each organization. After a competitive application process, executives and business leaders spend three to four months taking part in structured learning and training, exploring ways to drive real change within their companies. Each team is expected to tackle a company specific challenge and attempt to solve it during the course of the program.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-poppins font-semibold text-[#1D2D44] mb-2">
                        • Harvard Kennedy School Program
                      </h4>
                      <p className={bodyClass}>
                        Harvard Kennedy Program is a custom executive education program targeting the needs of the Kuwait private sector. This customized program explores new methods of working across traditional sectors and organizational divisions to identify, understand, and address emerging business and public problems. Led by Professor Kessely Hong, the Harvard Kennedy School faculty team has designed an impactful and interactive curriculum specifically tailored to address the challenges and opportunities presented to managers, equipping them with the collaborative and innovative tools needed in today&apos;s reality.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-poppins font-semibold text-[#1D2D44] mb-2">
                        • KFAS High Potential Leadership Program
                      </h4>
                      <p className={bodyClass}>
                        The vitality of every organization is dependent on the strength of its future leaders. By identifying high potential (Hi-Po) leadership candidates early in their career and supporting their development, organizations drive significant returns on their human capital investments. Unlocking the potential in these candidates maximizes an organization&apos;s ability to embed strategic initiatives, grow market competitiveness, and drive overall business growth. Unleashing the power of its high potentials is integral to the continued growth and sustainability of Kuwait&apos;s business leadership trajectory.
                      </p>
                    </li>
                  </ul>
                </motion.div>
              </div>
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
