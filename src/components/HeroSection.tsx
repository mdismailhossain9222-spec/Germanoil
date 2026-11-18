"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, ThermometerSun, MapPin, Mail, MessageCircle } from "lucide-react";

const NAV_LINKS = [
  { href: "#story", label: "Our Story" },
  { href: "#products", label: "Products" },
  { href: "#quality", label: "Quality" },
  { href: "#reach", label: "Distribution" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const fade = (to: number, duration: number) => {
      const start = performance.now();
      const startOpacity = parseFloat(video.style.opacity || "0");

      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        video.style.opacity = (startOpacity + (to - startOpacity) * progress).toString();
        if (progress < 1) rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);
    };

    const playAndFadeIn = () => {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          // Autoplay was prevented, wait for user interaction
          video.addEventListener("click", playAndFadeIn, { once: true });
        });
      }
      fade(1, 500);
    };

    const handleCanPlay = () => {
      playAndFadeIn();
    };

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime <= 0.55 && video.style.opacity !== "0") {
        fade(0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        playAndFadeIn();
      }, 100);
    };

    // If video is already ready (readyState >= 3 = HAVE_FUTURE_DATA), play immediately
    if (video.readyState >= 3) {
      playAndFadeIn();
    } else {
      video.addEventListener("canplay", handleCanPlay);
    }

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-richBlack">
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-bottom opacity-0"
        aria-hidden="true"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          type="video/mp4"
        />
      </video>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rich-black/40 via-rich-black/55 to-rich-black/85"
      />

      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#top" className="flex items-center" aria-label="Germanoil BD home">
            <Image
              src="/images/logo.png"
              alt="Germanoil BD logo"
              width={40}
              height={40}
              className="h-7 w-auto object-contain"
              priority
            />
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/80 hover:text-sandGold transition-colors text-sm font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://wa.me/971544478806"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="liquid-glass rounded-full px-6 py-2 text-sandGold text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            +971 54 447 8806
          </a>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 sm:pt-40 -translate-y-[10%]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="will-change-transform">
            <span className="liquid-glass rounded-full px-4 py-1 text-white/80 text-xs tracking-widest uppercase mb-6 inline-block">
              Manufactured in Dubai, UAE · Distributed Across Bangladesh
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-white font-display leading-[0.95] will-change-transform"
          >
            Precision Engineered in{" "}
            <span className="text-sandGold">UAE.</span>
            <br />
            Powering <span className="text-white">Bangladesh.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-warmGrey text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed will-change-transform"
          >
            Premium Automotive & Industrial Lubricants — blended to German
            specification, tested for tropical conditions, trusted by workshops
            and plants nationwide.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="will-change-transform max-w-xl w-full flex flex-col sm:flex-row gap-4 mx-auto"
          >
            <div className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors whitespace-nowrap w-full text-center">
              <a
                href="mailto:samiraccorporation3@gmail.com"
                className="flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                samiraccorporation3@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="will-change-transform flex flex-wrap justify-center gap-6 mt-8 text-xs text-warmGrey tracking-widest uppercase"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              API & ISO Aligned
            </span>
            <span className="flex items-center gap-2">
              <ThermometerSun className="h-4 w-4" aria-hidden="true" />
              Tropical-Climate Tested
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Nationwide BD Distribution
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}