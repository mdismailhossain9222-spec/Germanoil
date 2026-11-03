"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface ShowcaseProduct {
  title: string;
  type: string;
  desc: string;
  coverImage: string;
  gallery: string[];
}

interface ProductModalProps {
  product: ShowcaseProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [activeImage, setActiveImage] = useState<string>(
    product?.gallery[0] ?? product?.coverImage ?? ""
  );

  // Reset the active image whenever a different product opens.
  useEffect(() => {
    setActiveImage(product?.gallery[0] ?? product?.coverImage ?? "");
  }, [product]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-richBlack/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            key="modal-box"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-charcoal border border-graphite rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full border border-graphite bg-ink/80 flex items-center justify-center text-white hover:border-sandGold transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              {/* Left: Gallery */}
              <div className="flex flex-col gap-4">
                <div className="relative h-[300px] md:h-[400px] w-full bg-richBlack rounded-xl p-4 flex items-center justify-center">
                  <Image
                    src={activeImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-contain"
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex flex-row flex-wrap gap-3">
                  {product.gallery.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      aria-label={`Select ${img}`}
                      className={`relative h-16 w-16 shrink-0 rounded-lg border bg-richBlack p-1 transition-all duration-300 ${
                        activeImage === img
                          ? "border-sandGold shadow-[0_0_12px_rgba(201,168,92,0.4)]"
                          : "border-graphite opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={img}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div className="flex flex-col">
                <h3 className="font-display text-3xl font-bold tracking-tight text-white">
                  {product.title}
                </h3>
                <span className="text-sandGold text-sm mt-2 uppercase tracking-wider">
                  {product.type}
                </span>
                <p className="text-warmGrey text-sm mt-6 leading-relaxed">
                  {product.desc}
                </p>

                <a
                  href={`https://wa.me/8801792544444?text=Hi,%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(
                    product.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#20b858] transition-colors"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Contact via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}