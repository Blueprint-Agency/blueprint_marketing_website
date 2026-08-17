"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flower2,
  Activity,
  Music2,
  Bike,
  Swords,
  Waves,
  Mountain,
  HeartPulse,
  Bone,
  Leaf,
  Sparkles,
  Hand,
  Dumbbell,
  Building2,
  Flower,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The business types Reserve Today is built for.
 *
 * ICONS ARE lucide-react, NOT @hugeicons. The supplied brief listed the
 * hugeicons packages under dependencies and then said, in its own
 * implementation guidelines, "use lucide-react icons for svgs or logos if
 * component requires them". lucide-react was already a dependency here, so
 * that route costs two fewer packages for the same result.
 *
 * IMAGES ARE PLACEHOLDERS. Every URL below is a live Unsplash photograph
 * (all fifteen checked for a 200 on 2026-08-17) standing in until real
 * ones are supplied. They are stock pictures of other people's studios, so
 * they are decoration and must never be captioned, credited or otherwise
 * presented as a customer of this platform. Swap the `image` field and
 * nothing else needs to change.
 *
 * DESCRIPTIONS NAME REAL FEATURES ONLY. Each one says what that kind of
 * business schedules and which parts of the product it lives in. Every
 * capability mentioned exists as a row in MATRIX in lib/pricing.ts:
 * credits, memberships, tiered workshops, room assignment, private
 * sessions, QR check-in, email on 21 events, roles, payroll and
 * commission, retail, multi-location. Nothing here invents one. Waitlists,
 * spot booking, loyalty points and court rental are all absent from that
 * matrix and are therefore absent from these lines.
 */
const FEATURES = [
  {
    id: "yoga",
    label: "Yoga studios",
    kind: "Timetable",
    icon: Flower2,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
    description:
      "A weekly class timetable, sold as credit bundles or unlimited memberships.",
  },
  {
    id: "pilates",
    label: "Pilates & reformer",
    kind: "Timetable",
    icon: Activity,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
    description:
      "Small equipment classes, with the room held as well as the slot so nothing double-books.",
  },
  {
    id: "barre",
    label: "Barre & dance",
    kind: "Timetable",
    icon: Music2,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200",
    description:
      "Terms running beside drop-ins, plus workshops priced in tiers.",
  },
  {
    id: "spin",
    label: "Spin & cycling",
    kind: "Timetable",
    icon: Bike,
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200",
    description:
      "Fixed-size classes that fill and empty fast, with QR check-in at the door.",
  },
  {
    id: "martial",
    label: "Martial arts",
    kind: "Timetable",
    icon: Swords,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
    description:
      "Monthly memberships alongside private 1-on-1 and 2-on-1 sessions.",
  },
  {
    id: "swim",
    label: "Swim schools",
    kind: "Timetable",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1200",
    description:
      "Levels and terms, with roles so an instructor sees her own classes and not the takings.",
  },
  {
    id: "climbing",
    label: "Climbing gyms",
    kind: "Timetable",
    icon: Mountain,
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200",
    description:
      "Day passes and memberships on one schedule, across every location on the plan.",
  },
  {
    id: "physio",
    label: "Physiotherapy",
    kind: "Appointments",
    icon: HeartPulse,
    image:
      "https://images.unsplash.com/photo-1540496905036-5937c10647cc?q=80&w=1200",
    description:
      "An appointment diary rather than a timetable, with packages a patient draws down over weeks.",
  },
  {
    id: "chiro",
    label: "Chiropractic",
    kind: "Appointments",
    icon: Bone,
    image:
      "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200",
    description:
      "Repeat visits on a plan of care, with room and practitioner booked as one thing.",
  },
  {
    id: "tcm",
    label: "TCM & acupuncture",
    kind: "Appointments",
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1591258370814-01609b341790?q=80&w=1200",
    description:
      "Longer one-to-one sessions, with confirmations and reminders emailed on 21 events.",
  },
  {
    id: "aesthetics",
    label: "Aesthetic clinics",
    kind: "Appointments",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200",
    description:
      "Treatment packages with a visible balance, and a retail store for what you sell alongside.",
  },
  {
    id: "massage",
    label: "Massage & spa",
    kind: "Appointments",
    icon: Hand,
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1200",
    description:
      "Therapist and room held together, with card, FPX, DuitNow and Touch 'n Go at checkout.",
  },
  {
    id: "pt",
    label: "Personal training",
    kind: "Appointments",
    icon: Dumbbell,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
    description:
      "Blocks of sessions bought up front, with commission worked out from attendance.",
  },
  {
    id: "gyms",
    label: "Gyms with classes",
    kind: "Both",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
    description:
      "One schedule carrying open access, a class timetable and personal training at once.",
  },
  {
    id: "wellness",
    label: "Wellness centres",
    kind: "Both",
    icon: Flower,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
    description:
      "Several disciplines under one roof, with payroll and commission across the lot.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-border/40">
        {/* THE PANEL WAS #62B2FE AND IS NOW --brand-deep, at the user's
            direction on 2026-08-17. The token is declared in the @theme
            block in app/globals.css and holds the same #0a1b45 that
            plain.css gives --brand-deep, so the two cannot drift.

            Worth knowing rather than rediscovering: DESIGN.v2.md's
            Colour-Concentration Rule says brand blue owns the top and the
            bottom of a page and paper holds the long middle, on the
            grounds that a third blue band costs the colour its impact.
            This panel is that third band. It is a deliberate exception
            made with the component, not an oversight. If the page ever
            feels blue-heavy, this is the first place to look. */}
        <div className="w-full lg:w-[40%] min-h-[350px] md:min-h-[450px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-brand-deep ">
          <div className="absolute inset-x-0 top-0 h-12 md:h-20 lg:h-16 bg-gradient-to-b from-brand-deep via-brand-deep/80 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-12 md:h-20 lg:h-16 bg-gradient-to-t from-brand-deep via-brand-deep/80 to-transparent z-40" />
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance,
              );
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-10 lg:px-8 py-3.5 md:py-5 lg:py-4 rounded-full transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-white text-brand-deep border-white z-10"
                        : "bg-transparent text-white/70 border-white/25 hover:border-white/50 hover:text-white",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-brand-deep" : "text-white/50",
                      )}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>

                    <span className="font-normal text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-secondary/30 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-background bg-background origin-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feature.image}
                    alt=""
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75",
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-10 pt-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-background text-foreground px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-border/50">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="text-white font-normal text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* The original had a pulsing dot labelled "Live Session"
                      here. It is replaced rather than kept: nothing on this
                      page is live, and a fabricated status indicator is the
                      one thing this site's rules refuse outright. The slot
                      now carries what that business actually schedules,
                      which is the distinction the section is built on. */}
                  <div
                    className={cn(
                      "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                    <span className="text-white/80 text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                      {feature.kind}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
