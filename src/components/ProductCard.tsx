"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Info } from "lucide-react";
import type { Product } from "@/db/schema";

/**
 * Showcase product card.
 * Intentionally contains NO pricing, cart or checkout affordances —
 * "View Details" only expands the technical specification panel.
 */
export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Gentle parallax on the bottle image as the card scrolls through view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const panelId = `product-details-${product.slug}`;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-graphite bg-charcoal transition-colors duration-500 hover:border-gold"
    >
      {/* Gold glow that appears on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(201,168,92,0.14),transparent_60%)]"
      />

      {/* Image stage */}
      <div className="relative aspect-4/3 overflow-hidden border-b border-graphite bg-ink">
        <motion.div style={{ y: imageY }} className="absolute inset-[-8%]">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>

        <span className="absolute top-4 left-4 rounded-sm border border-graphite bg-ink/80 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-gold uppercase backdrop-blur">
          {product.category}
        </span>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[10px] font-semibold tracking-[0.26em] text-muted uppercase">
          {product.grade}
        </p>
        <h3 className="font-display mt-3 text-xl leading-tight tracking-wide text-white uppercase transition-colors duration-300 group-hover:text-gold-light sm:text-2xl">
          {product.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {product.tagline}
        </p>

        {/* Expandable detail panel (showcase information only) */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-graphite pt-5">
                <p className="text-sm leading-relaxed text-muted">
                  {product.description}
                </p>
                <dl className="mt-5 space-y-2.5">
                  {product.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-baseline justify-between gap-4 border-b border-graphite/70 pb-2"
                    >
                      <dt className="text-[10px] tracking-[0.2em] text-muted uppercase">
                        {s.label}
                      </dt>
                      <dd className="text-sm font-medium text-white">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-7">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex w-full items-center justify-between gap-3 rounded-sm border border-graphite px-5 py-3 text-[11px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-gold hover:text-gold-light"
          >
            {open ? "Hide Details" : "View Details"}
            <ChevronDown
              className={`h-4 w-4 text-gold transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
          <p className="mt-3 flex items-center gap-2 text-[10px] tracking-[0.14em] text-muted/70 uppercase">
            <Info className="h-3 w-3" aria-hidden="true" />
            Showcase only — not available for online purchase
          </p>
        </div>
      </div>
    </motion.article>
  );
}
