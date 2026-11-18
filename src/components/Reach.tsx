"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2, Bike, Car, Wrench } from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";

const SEGMENTS = [
  { icon: Car, label: "Passenger Cars", copy: "Sedans, hatchbacks and light commercial fleets." },
  { icon: Bike, label: "Motorcycles", copy: "Four-stroke commuter and performance bikes." },
  { icon: Building2, label: "Industry", copy: "Hydraulic presses, lifts and factory machinery." },
  { icon: Wrench, label: "Workshops", copy: "Independent service centres and garage networks." },
];

const CORRIDOR = [
  { step: "01", place: "Dubai, UAE", detail: "Blending & quality assurance" },
  { step: "02", place: "Jebel Ali Port", detail: "Containerised export" },
  { step: "03", place: "Narayanganj", detail: "Import & bonded warehousing" },
  { step: "04", place: "Mirpur", detail: "Distributor & retail network" },
];

/** Distribution corridor + served segments, with parallax backdrop. */
export default function Reach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  return (
    <section
      id="reach"
      aria-labelledby="reach-title"
      className="relative overflow-hidden border-t border-graphite bg-ink py-24 sm:py-32"
    >
      <motion.div
        style={{ y: glowY }}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-german-red/10 blur-[120px]"
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div id="reach-title">
          <SectionHeading
            eyebrow="Supply Corridor"
            title="Dubai to Dhaka,"
            accent="without compromise."
            description="A short, controlled route from our blending plant to the workshop floor — so product integrity is preserved from batch to bottle."
          />
        </div>

        {/* Corridor timeline */}
        <ol className="mt-14 grid gap-px overflow-hidden rounded-sm bg-graphite md:grid-cols-4">
          {CORRIDOR.map((c, i) => (
            <li key={c.step} className="bg-charcoal">
              <Reveal delay={i * 0.1}>
                <div className="group h-full p-7 transition-colors duration-500 hover:bg-charcoal/40">
                  <span className="font-display text-sm tracking-[0.3em] text-gold-dark">
                    {c.step}
                  </span>
                  <h3 className="font-display mt-4 text-xl tracking-wide text-white uppercase">
                    {c.place}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{c.detail}</p>
                  <span
                    aria-hidden="true"
                    className="mt-6 block h-px w-10 bg-graphite transition-all duration-500 group-hover:w-20 group-hover:bg-gold"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Segments served */}
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-sm border border-graphite bg-charcoal/60 p-6 transition-colors duration-500 hover:border-gold/60">
                  <s.icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">
                      {s.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {s.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
