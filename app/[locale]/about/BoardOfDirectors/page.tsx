"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { User, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EASE = [0.16, 1, 0.3, 1] as const;

type Section = { label: string; items: string[] };
type Member = { name: string; sections: Section[] };

// Image paths aren't locale-specific, so they stay out of the translation files.
const MEMBER_IMAGES: Record<string, string> = {
  sheikhAhmad: "/image/ShaikhAhmed.png",
  abdullah: "/image/Dr.AbdullahAlGunaim.png",
  meshaal: "/image/ShaikhDrMeshal.png",
  ibrahim: "/image/DrIbraheemAlrashdan.png",
  ahmadAldekheel: "/image/AhmedAlDhakheel.png",
  khaled: "/image/DrKhaledAlfadhel.png",
  ameenah: "/image/DrAmeenahRajab.png",
};

// ─── Modal component — shared across all board members ────────────────────────

function Modal({
  isOpen,
  onClose,
  imageSrc,
  name,
  closeLabel,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  name: string;
  closeLabel: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#1D2D44]/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Orange top accent */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#EC601B] via-[#7DC0F1]/50 to-transparent rtl:bg-gradient-to-l" />

            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-[#1D2D44]/08">
              <div className="flex items-start gap-5 px-6 py-5">
                {imageSrc && (
                  <div className="shrink-0 w-16 h-16 overflow-hidden border border-[#1D2D44]/08">
                    <img
                      src={imageSrc}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="font-poppins text-base font-semibold text-[#1D2D44] leading-snug tracking-tight">
                    {name}
                  </h3>
                  <div className="mt-2 h-px w-8 bg-gradient-to-r from-[#EC601B]/50 to-transparent rtl:bg-gradient-to-l" />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 p-2 text-[#1D2D44]/30 hover:text-[#EC601B] transition-colors duration-200"
                  aria-label={closeLabel}
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)] px-6 py-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalSection({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-7">
      <p className="mb-3 text-[10px] font-semibold tracking-wide text-[#EC601B]">
        {label}
      </p>
      <div className="pl-4 border-l border-[#1D2D44]/08 rtl:pl-0 rtl:pr-4 rtl:border-l-0 rtl:border-r">
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-[13px] text-[#1D2D44]/65 leading-relaxed font-light"
            >
              <span
                className="shrink-0 w-1 h-1 rounded-full bg-[#EC601B]/50 mt-2"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Profile Card ─────────────────────────────────────────────────────────────

function ProfileCard({
  imageSrc,
  imageAlt,
  name,
  title,
  usePlaceholder = false,
  isInView,
  animationDelay = 0,
  compact = false,
  large = false,
  onClick,
}: {
  imageSrc?: string;
  imageAlt: string;
  name: React.ReactNode;
  title: string;
  usePlaceholder?: boolean;
  isInView: boolean;
  animationDelay?: number;
  compact?: boolean;
  large?: boolean;
  onClick?: () => void;
}) {
  // Uniform image size for every card — all the same.
  const imgSize = "w-44 h-44 sm:w-52 sm:h-52";

  const content = (
    <div
      className={`flex flex-col items-center gap-4 ${onClick ? "cursor-pointer group" : ""}`}
    >
      {/* Image */}
      <motion.div
        className="relative shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: animationDelay, ease: EASE }}
      >
        {/* Corner brackets */}
        <div className="pointer-events-none absolute -start-2 -top-2 z-10 h-6 w-6 border-s-[1.5px] border-t-[1.5px] border-[#EC601B]/40" />
        <div className="pointer-events-none absolute -end-2 -bottom-2 z-10 h-6 w-6 border-e-[1.5px] border-b-[1.5px] border-[#7DC0F1]/35" />

        <div className={`relative overflow-hidden ${imgSize}`}>
          {usePlaceholder ? (
            <div className="w-full h-full flex items-center justify-center bg-[#1D2D44]/05 text-[#1D2D44]/20">
              <User className="w-16 h-16" strokeWidth={1} />
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          )}
        </div>
      </motion.div>

      {/* Name + title */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, delay: animationDelay + 0.12, ease: EASE }}
      >
        <p
          className={`font-poppins font-semibold text-[#1D2D44] leading-snug tracking-tight ${large ? "text-base" : "text-[13px] sm:text-[14px]"}`}
        >
          {name}
        </p>
        <p
          className={`mt-1.5 font-light text-[#EC601B] tracking-wide ${large ? "text-[13px]" : "text-[11px] sm:text-[12px]"}`}
        >
          {title}
        </p>
        {onClick && (
          <div className="mt-2 flex justify-center">
            <div className="h-[1px] w-4 bg-[#EC601B]/40 transition-all duration-300 group-hover:w-8" />
          </div>
        )}
      </motion.div>
    </div>
  );

  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-fit focus:outline-none rtl:text-right"
    >
      {content}
    </button>
  ) : (
    content
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BoardOfDirectorsPage() {
  const t = useTranslations("BoardOfDirectorsPage");
  const isArabic = useLocale() === "ar";

  const members = t.raw("members") as Record<string, Member>;

  const [isAhmadModalOpen, setIsAhmadModalOpen] = useState(false);
  const [isAbdullahModalOpen, setIsAbdullahModalOpen] = useState(false);
  const [isMeshaalModalOpen, setIsMeshaalModalOpen] = useState(false);
  const [isAhmadAldekheelModalOpen, setIsAhmadAldekheelModalOpen] =
    useState(false);
  const [isKhaledModalOpen, setIsKhaledModalOpen] = useState(false);
  const [isIbrahimModalOpen, setIsIbrahimModalOpen] = useState(false);
  const [isAmeenahModalOpen, setIsAmeenahModalOpen] = useState(false);

  const heroRef = useRef(null);
  const chairmanRef = useRef(null);
  const directorGeneralRef = useRef(null);
  const membersRef = useRef(null);
  const members2Ref = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const isChairmanInView = useInView(chairmanRef, {
    once: true,
    margin: "-80px",
  });
  const isDirectorGeneralInView = useInView(directorGeneralRef, {
    once: true,
    margin: "-80px",
  });
  const isMembersInView = useInView(membersRef, {
    once: true,
    margin: "-80px",
  });
  const isMembers2InView = useInView(members2Ref, {
    once: true,
    margin: "-80px",
  });

  const anyModalOpen =
    isAhmadModalOpen ||
    isAbdullahModalOpen ||
    isMeshaalModalOpen ||
    isAhmadAldekheelModalOpen ||
    isKhaledModalOpen ||
    isIbrahimModalOpen ||
    isAmeenahModalOpen;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAhmadModalOpen(false);
        setIsAbdullahModalOpen(false);
        setIsMeshaalModalOpen(false);
        setIsAhmadAldekheelModalOpen(false);
        setIsKhaledModalOpen(false);
        setIsIbrahimModalOpen(false);
        setIsAmeenahModalOpen(false);
      }
    };
    if (anyModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [anyModalOpen]);

  return (
    <>
      <Header logo="/image/logo_c.png" forceWhiteBackground={true} />
      <main className="min-h-screen bg-white font-poppins">
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden flex items-center justify-start h-[360px] md:h-[460px] lg:h-[540px]"
        >
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <img
              src="/image/KFASBuilding.webp"
              alt="Board of Directors"
              className="w-full h-full object-cover object-[center_15%] scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background: isArabic
                  ? "linear-gradient(252deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)"
                  : "linear-gradient(108deg, rgba(29,45,68,0.80) 0%, rgba(29,45,68,0.50) 42%, rgba(29,45,68,0.18) 68%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(29,45,68,0.60) 0%, transparent 45%)",
              }}
            />
          </motion.div>

          <motion.div
            className="relative z-10 mt-44 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
            style={{ opacity: heroOpacity }}
          >
            <motion.div
              className={`mb-5 flex items-center gap-2 font-semibold text-white/45 ${
                isArabic
                  ? "text-[15px] tracking-normal"
                  : "text-[10px] uppercase tracking-[0.35em]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <span>{t("breadcrumbAbout")}</span>
              <span className="text-white/25">/</span>
            </motion.div>
            <div
              className={`overflow-hidden ${
                isArabic ? "pt-2 pb-4 sm:pb-5" : "pb-0.5"
              }`}
            >
              <motion.h1
                className={`font-poppins text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white [text-shadow:_2px_2px_16px_rgba(0,0,0,0.4)] ${
                  isArabic
                    ? "leading-[1.55] tracking-normal"
                    : "leading-tight tracking-tight"
                }`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {t("heroTitle")}
              </motion.h1>
            </div>
            <motion.div
              className="mt-5 h-[3px] rounded-full bg-[#EC601B] origin-left rtl:origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ width: 72 }}
            />
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 z-20 h-10 bg-white" />
        </section>

        {/* ── Chairman ── */}
        <section ref={chairmanRef} className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-center">
              <ProfileCard
                imageSrc="/image/ShaikhMeshal.png"
                imageAlt="H.H. The Amir Sheikh Meshal Al-Ahmad Al-Jaber Al-Sabah"
                name={
                  <>
                    {t("chairman.nameLine1")}
                    <br />
                    {t("chairman.nameLine2")}
                  </>
                }
                title={t("chairmanTitle")}
                isInView={isChairmanInView}
                large
              />
            </div>
          </div>
        </section>

        {/* ── Board Members row 1 ── */}
        <section ref={membersRef} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 justify-items-center">
              <ProfileCard
                imageSrc={MEMBER_IMAGES.sheikhAhmad}
                imageAlt={members.sheikhAhmad.name}
                name={members.sheikhAhmad.name}
                title={t("boardMemberTitle")}
                isInView={isMembersInView}
                animationDelay={0}
                compact
                onClick={() => setIsAhmadModalOpen(true)}
              />
              <ProfileCard
                imageSrc={MEMBER_IMAGES.abdullah}
                imageAlt={members.abdullah.name}
                name={members.abdullah.name}
                title={t("boardMemberTitle")}
                isInView={isMembersInView}
                animationDelay={0.05}
                compact
                onClick={() => setIsAbdullahModalOpen(true)}
              />
              <ProfileCard
                imageSrc={MEMBER_IMAGES.meshaal}
                imageAlt={members.meshaal.name}
                name={members.meshaal.name}
                title={t("boardMemberTitle")}
                isInView={isMembersInView}
                animationDelay={0.1}
                compact
                onClick={() => setIsMeshaalModalOpen(true)}
              />
              <ProfileCard
                imageSrc={MEMBER_IMAGES.ibrahim}
                imageAlt={members.ibrahim.name}
                name={members.ibrahim.name}
                title={t("boardMemberTitle")}
                isInView={isMembersInView}
                animationDelay={0.15}
                compact
                onClick={() => setIsIbrahimModalOpen(true)}
              />
            </div>
          </div>
        </section>

        {/* ── Board Members row 2 ── */}
        <section ref={members2Ref} className="bg-white pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 justify-items-center">
              <div className="hidden lg:block" aria-hidden />
              <ProfileCard
                imageSrc={MEMBER_IMAGES.ahmadAldekheel}
                imageAlt={members.ahmadAldekheel.name}
                name={members.ahmadAldekheel.name}
                title={t("boardMemberTitle")}
                isInView={isMembers2InView}
                animationDelay={0}
                compact
                onClick={() => setIsAhmadAldekheelModalOpen(true)}
              />
              <ProfileCard
                imageSrc={MEMBER_IMAGES.khaled}
                imageAlt={members.khaled.name}
                name={members.khaled.name}
                title={t("boardMemberTitle")}
                isInView={isMembers2InView}
                animationDelay={0.1}
                compact
                onClick={() => setIsKhaledModalOpen(true)}
              />
              <div className="hidden lg:block" aria-hidden />
            </div>
          </div>
        </section>

        {/* ── Director General ── */}
        <section ref={directorGeneralRef} className="bg-white pb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-center">
              <ProfileCard
                imageSrc={MEMBER_IMAGES.ameenah}
                imageAlt={members.ameenah.name}
                name={members.ameenah.name}
                title={t("directorGeneralTitle")}
                isInView={isDirectorGeneralInView}
                large
                onClick={() => setIsAmeenahModalOpen(true)}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* ── Modals ── */}

      <Modal
        isOpen={isAmeenahModalOpen}
        onClose={() => setIsAmeenahModalOpen(false)}
        imageSrc={MEMBER_IMAGES.ameenah}
        name={members.ameenah.name}
        closeLabel={t("closeLabel")}
      >
        {members.ameenah.sections.map((s) => (
          <ModalSection key={s.label} label={s.label} items={s.items} />
        ))}
      </Modal>

      <Modal
        isOpen={isAhmadModalOpen}
        onClose={() => setIsAhmadModalOpen(false)}
        imageSrc={MEMBER_IMAGES.sheikhAhmad}
        name={members.sheikhAhmad.name}
        closeLabel={t("closeLabel")}
      >
        {members.sheikhAhmad.sections.map((s) => (
          <ModalSection key={s.label} label={s.label} items={s.items} />
        ))}
      </Modal>

      <Modal
        isOpen={isAbdullahModalOpen}
        onClose={() => setIsAbdullahModalOpen(false)}
        imageSrc={MEMBER_IMAGES.abdullah}
        name={members.abdullah.name}
        closeLabel={t("closeLabel")}
      >
        {members.abdullah.sections.map((s) => (
          <ModalSection key={s.label} label={s.label} items={s.items} />
        ))}
      </Modal>

      <Modal
        isOpen={isMeshaalModalOpen}
        onClose={() => setIsMeshaalModalOpen(false)}
        imageSrc={MEMBER_IMAGES.meshaal}
        name={members.meshaal.name}
        closeLabel={t("closeLabel")}
      >
        {members.meshaal.sections.map((s) => (
          <ModalSection key={s.label} label={s.label} items={s.items} />
        ))}
      </Modal>

      <Modal
        isOpen={isAhmadAldekheelModalOpen}
        onClose={() => setIsAhmadAldekheelModalOpen(false)}
        imageSrc={MEMBER_IMAGES.ahmadAldekheel}
        name={members.ahmadAldekheel.name}
        closeLabel={t("closeLabel")}
      >
        {members.ahmadAldekheel.sections.map((s) => (
          <ModalSection key={s.label} label={s.label} items={s.items} />
        ))}
      </Modal>

      <Modal
        isOpen={isKhaledModalOpen}
        onClose={() => setIsKhaledModalOpen(false)}
        imageSrc={MEMBER_IMAGES.khaled}
        name={members.khaled.name}
        closeLabel={t("closeLabel")}
      >
        {members.khaled.sections.map((s) => (
          <ModalSection key={s.label} label={s.label} items={s.items} />
        ))}
      </Modal>

      <Modal
        isOpen={isIbrahimModalOpen}
        onClose={() => setIsIbrahimModalOpen(false)}
        imageSrc={MEMBER_IMAGES.ibrahim}
        name={members.ibrahim.name}
        closeLabel={t("closeLabel")}
      >
        {members.ibrahim.sections.map((s) => (
          <ModalSection key={s.label} label={s.label} items={s.items} />
        ))}
      </Modal>
    </>
  );
}
