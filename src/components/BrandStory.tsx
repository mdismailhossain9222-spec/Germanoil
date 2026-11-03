"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Factory, FlaskConical, Ship, Gauge } from "lucide-react";
import Reveal, { SectionHeading } from "./Reveal";

const PILLARS = [
  {
    icon: FlaskConical,
    title: "German Formulation",
    copy: "Additive chemistry and base-stock blends developed to European performance benchmarks.",
  },
  {
    icon: Factory,
    title: "Blended in Dubai",
    copy: "Produced at our UAE facility under tight batch control and laboratory verification.",
  },
  {
    icon: Ship,
    title: "Shipped to Bangladesh",
    copy: "A dedicated supply corridor keeping distributors in Dhaka and Chattogram stocked.",
  },
  {
    icon: Gauge,
    title: "Built for the Climate",
    copy: "Viscosity grades selected for heat, humidity, dust and heavy stop-start traffic.",
  },
];

/** Brand narrative with a parallax statistics rail. */
export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const railY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative overflow-hidden border-t border-graphite bg-ink py-24 sm:py-32"
    >
      {/* Soft gold bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-gold/5 blur-3xl"
      />

      <div
        ref={ref}
        className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
      >
        <div>
          <div id="story-title">
            <SectionHeading
              eyebrow="The GermanOil Project"
              title="From the Gulf"
              accent="to every garage."
              description="GermanOil Project was founded in Dubai with a single conviction: that an engine in Dhaka deserves the same quality of protection as one in Stuttgart."
            />
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted">
              <p>
                Our blending operation in the United Arab Emirates combines
                high-grade base oils with carefully balanced additive packages.
                Every batch is sampled, tested for viscosity, oxidation
                stability and wear protection, and released only once it meets
                our internal specification — which sits above the published
                minimums for its grade.
              </p>
              <p>
                From the Port of Jebel Ali, finished product moves to Chattogram
                and onward through our distribution partners, reaching
                motorcycle workshops, car service centres and industrial plants
                across Bangladesh. The result is a consistent, traceable supply
                of lubricants that technicians can rely on, drum after drum.
              </p>
              <p className="border-l-2 border-gold/60 pl-5 text-white italic">
                &ldquo;We do not sell litres. We protect machinery — and the
                livelihoods that depend on it.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>

        {/* Pillars rail with subtle parallax */}
        <motion.ul style={{ y: railY }} className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08}>
                <div className="group h-full rounded-sm border border-graphite bg-charcoal p-6 transition-colors duration-500 hover:border-gold/60">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-graphite bg-ink transition-colors duration-500 group-hover:border-gold/50">
                    <p.icon className="h-5 w-5 text-gold" aria-hidden="true" />
                  </span>
                  <h3 className="font-display mt-5 text-lg tracking-wide text-white uppercase">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.copy}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
