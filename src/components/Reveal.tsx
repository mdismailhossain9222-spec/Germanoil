"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Small wrapper for scroll-triggered reveals so every section shares the
 * same easing/timing language. Runs once, respects viewport margin.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Shared eyebrow + heading block used across sections. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  light = false,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <Reveal>
        <span className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
          <span className="h-px w-8 bg-gold-dark" aria-hidden="true" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display mt-5 text-3xl leading-[1.05] font-bold tracking-tight uppercase sm:text-5xl ${
            light ? "text-ink" : "text-white"
          }`}
        >
          {title}{" "}
          {accent && <span className="text-gold-gradient">{accent}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-base leading-relaxed ${
              light ? "text-ink/70" : "text-muted"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
