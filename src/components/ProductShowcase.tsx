"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";

// The gallery modal is a heavy Framer Motion component — load it only
// when it is actually needed (after a card is clicked), not on initial render.
const ProductModal = dynamic(() => import("./ProductModal"), {
  ssr: false,
});

interface ShowcaseProduct {
  title: string;
  type: string;
  desc: string;
  coverImage: string;
  gallery: string[];
}

const WHATSAPP_URL = "https://wa.me/971544478806";

const PRODUCTS: ShowcaseProduct[] = [
  {
    title: "Hydraulic Oil AW 150/100",
    type: "Industrial Use",
    desc: "High-performance anti-wear hydraulic oil for demanding industrial applications.",
    coverImage: "/images/webp/industrial-oil-1.webp",
    gallery: ["/images/webp/industrial-oil-1.webp", "/images/webp/industrial-oil-2.webp"],
  },
  {
    title: "Premium 4T SAE 20W50",
    type: "Motorcycle Engine Oil",
    desc: "Semi-synthetic 4-stroke engine oil ensuring smooth clutch operation and engine protection.",
    coverImage: "/images/webp/motorcycle-engine-oil-1.webp",
    gallery: [
      "/images/webp/motorcycle-engine-oil-1.webp",
      "/images/webp/motorcycle-engine-oil-2.webp",
      "/images/webp/motorcycle-engine-oil-3.webp",
      "/images/webp/motorcycle-engine-oil-4.webp",
    ],
  },
  {
    title: "Premium 6000 SAE 20W50",
    type: "Petrol Engine Oil",
    desc: "Fully synthetic API SM engine oil for modern petrol engines, delivering maximum power.",
    coverImage: "/images/webp/petrol-engine-oil-1.webp",
    gallery: ["/images/webp/petrol-engine-oil-1.webp", "/images/webp/petrol-engine-oil-2.webp"],
  },
  {
    title: "Gear Oil EP 90",
    type: "Transmission Fluid",
    desc: "Heavy-duty gear oil formulated for extreme pressure and smooth gear shifting.",
    coverImage: "/images/webp/gear-oil-1.webp",
    gallery: [
      "/images/webp/gear-oil-1.webp",
      "/images/webp/gear-oil-2.webp",
      "/images/webp/gear-oil-3.webp",
      "/images/webp/gear-oil-4.webp",
    ],
  },
];

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<ShowcaseProduct | null>(
    null
  );

  return (
    <section className="py-24 bg-richBlack max-w-7xl mx-auto px-6">
      <div className="text-center mb-4">
        <span className="text-[11px] font-semibold tracking-[0.3em] text-sandGold uppercase">
          OUR RANGE
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white text-center">
        Premium Lubricants
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {PRODUCTS.map((product) => (
          <button
            key={product.title}
            type="button"
            onClick={() => setSelectedProduct(product)}
            className="bg-charcoal border border-graphite rounded-2xl p-6 transition-all duration-300 hover:border-sandGold hover:shadow-[0_0_30px_rgba(201,168,92,0.15)] group cursor-pointer flex flex-col text-left will-change-transform"
          >
            <div className="relative w-full h-64 mb-6">
              <Image
                src={product.coverImage}
                alt={`Germanoil BD ${product.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.26em] text-sandGold uppercase">
              {product.type}
            </span>
            <h3 className="font-display mt-3 text-xl leading-tight tracking-wide text-white uppercase">
              {product.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-warmGrey">
              {product.desc}
            </p>
            <span className="mt-4 text-[11px] font-bold tracking-[0.2em] text-sandGold uppercase">
              View Details →
            </span>
          </button>
        ))}
      </div>

      <ProductModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}