"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OurStrategyPage() {
  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white pt-20 font-poppins">
        <section
          className="relative overflow-hidden flex items-center justify-start h-[55vh]"
        >
          <div className="absolute inset-0">
            <Image
              src="/image/benduluim.png"
              alt="Our Strategy"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-left">
              <motion.div
                className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="text-white/60">About</span>
                <span className="text-white/40">/</span>
                <span className="text-white">Our Strategy</span>
              </motion.div>
              <motion.h1
                className="font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl [text-shadow:_3px_3px_10px_rgba(0,0,0,0.8)] mb-6 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Our Strategy
              </motion.h1>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>
        <section className="bg-white py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="space-y-6">
            <p className="text-gray-600 leading-[1.9] text-base text-justify capitalize">
              With its strategy for 2025-2029, the Kuwait Foundation for the
              Advancement of Sciences seeks to enhance and demonstrate the
              potential value of science, technology, and innovation to
              complement national efforts in achieving Kuwait’s vision and
              enhancing individual competitiveness on the global stage. In the
              next five years, we will promote a robust research ecosystem,
              catalyze viable innovation, and invest in Kuwait’s human
              ingenuity. KFAS integrates its three pillars—
              <strong className="font-semibold">
                robust research ecosystem, viable innovation
              </strong>
              , and <strong className="font-semibold"> human ingenuity</strong>
              —to create a synergistic framework where scientific advancements
              drive innovation, innovation fuels economic growth, and
              capacity-building efforts prepare individuals to excel in a
              knowledge-based economy. By aligning research, innovation, and
              human development efforts with Kuwait’s national vision, KFAS
              enhances the interplay between knowledge creation, practical
              application, and talent cultivation, ensuring a sustainable and
              globally competitive future for the nation. To promote a{" "}
              <strong className="font-semibold">
                {" "}
                robust research ecosystem
              </strong>
              , we will amplify Kuwait’s scientific contributions regionally and
              internationally by enabling collaborations with institutions
              around the world. We will focus our efforts on evolving dynamic
              priority areas supported in our preceding strategy.
            </p>
            <p className="text-gray-600 leading-[1.9] text-base text-justify capitalize">
              To catalyze{" "}
              <strong className="font-semibold"> viable innovation</strong>, we
              will continue to empower programs and practices that equip Kuwait
              to meet present and future challenges, converting research outputs
              into applied knowledge and technologies.
            </p>
            <p className="text-gray-600 leading-[1.9] text-base text-justify capitalize">
              To invest in Kuwait’s{" "}
              <strong className="font-semibold"> human ingenuity</strong>, we
              will facilitate knowledge transfers and develop people’s
              capabilities. We will meet shifting demands with rigorous gap
              analyses and needs assessments. To foster a culture of scientific
              interest and curiosity, our programs will promote lifelong
              learning.
            </p>
            <p className="text-gray-600 leading-[1.9] text-base text-justify capitalize">
              Building on the momentum of recent initiatives to modernize our
              operations, we will increasingly distinguish KFAS as a model of
              organizational agility and proficiency. We will strive constantly
              to be more effective and efficient, and we will strive to adhere
              to international standards. Through the interconnected pillars of
              research, innovation, and human ingenuity, KFAS aims to address
              dynamic national and global challenges by fostering collaborative
              networks, bridging gaps between academia and industry, and
              empowering individuals to lead in science, technology, and
              innovation-driven fields. In our pursuit of organizational
              proficiency, we will invest in optimizing our operations and
              developing a positive organizational culture.
            </p>
            <a
              href="/image/KFAS_Strategy_2025-2029_EN.pdf"
              download="KFAS_Strategy_2025-2029_EN.pdf"
              className="inline-flex items-center gap-2 mt-6 text-[#EC601B] font-semibold hover:text-[#D54E0F] transition-colors duration-300"
            >
              Download file
            </a>
            </div>
            <motion.img
              src="/image/KFAS_Strategy.png"
              alt="KFAS strategy diagram"
              className="mt-8 w-full max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
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
