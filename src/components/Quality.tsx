"use client";

import { motion } from "framer-motion";
import { Beaker, FileCheck, Recycle, Thermometer } from "lucide-react";

const STANDARDS = [
  {
    icon: Beaker,
    title: "LABORATORY VERIFIED",
    copy: "Viscosity index, flash point and TBN checked on every production batch before release.",
  },
  {
    icon: FileCheck,
    title: "SPECIFICATION LED",
    copy: "Formulated to meet and exceed API, ISO and OEM performance requirements for each grade.",
  },
  {
    icon: Thermometer,
    title: "THERMAL STABILITY",
    copy: "Oxidation-resistant chemistry that holds film strength through sustained high temperatures.",
  },
  {
    icon: Recycle,
    title: "RESPONSIBLE PACKAGING",
    copy: "Tamper-evident, recyclable containers with batch traceability printed on every unit.",
  },
];

const STATS = [
  { value: "2015", label: "FOUNDED IN DUBAI" },
  { value: "64", label: "DISTRICTS REACHED IN BD" },
  { value: "100%", label: "BATCH TESTED" },
  { value: "3", label: "CORE FORMULATIONS" },
];

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

/** Premium dark quality band — disciplined, quiet, no shortcuts. */
export default function Quality() {
  return (
    <section
      id="quality"
      aria-labelledby="quality-title"
      className="relative bg-richBlack py-28 md:py-40 px-6 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,92,0.05)_0%,_transparent_60%)]"
      />

      <div className="relative max-w-7xl mx-auto text-center">
        <span className="text-sandGold text-xs tracking-[0.3em] uppercase mb-4 block">
          QUALITY COMMITMENT
        </span>
        <h2
          id="quality-title"
          className="font-['Instrument_Serif'] text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
        >
          NO SHORTCUTS.{" "}
          <span className="italic text-sandGold">EVER.</span>
        </h2>
        <p className="text-warmGrey max-w-3xl mx-auto text-center text-sm md:text-base leading-relaxed">
          Lubricant quality is invisible until it fails. That is exactly why we
          over-engineer it — with disciplined blending, documented testing and
          traceable packaging.
        </p>
      </div>

      <motion.div
        variants={cardContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-w-7xl mx-auto will-change-transform"
      >
        {STANDARDS.map((s) => (
          <motion.div
            key={s.title}
            variants={cardItem}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-charcoal border border-graphite rounded-2xl p-8 hover:border-sandGold/50 transition-colors duration-300 flex flex-col will-change-transform"
          >
            <s.icon className="h-7 w-7 text-sandGold" aria-hidden="true" />
            <h3 className="text-white text-sm font-semibold mt-6 tracking-wide">
              {s.title}
            </h3>
            <p className="text-warmGrey text-xs mt-3 leading-relaxed">{s.copy}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 border-y border-graphite py-10 flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-8"
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <span className="font-['Instrument_Serif'] text-4xl md:text-5xl text-white">
              {s.value}
            </span>
            <span className="text-warmGrey text-xs tracking-[0.2em] uppercase mt-2">
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}