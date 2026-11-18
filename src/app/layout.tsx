import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import SiteHeader from "@/components/SiteHeader";

/** Body copy — clean neutral grotesque. */
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** Display face — tall industrial condensed for headlines. */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Germanoil BD | Premium Automotive & Industrial Lubricants in Bangladesh",
  description:
    "Established in 2020, Germanoil BD is the official distributor of premium automotive and industrial lubricants in Bangladesh. Manufactured in Dubai, trusted nationwide.",
  keywords: [
    "germanoil bd",
    "germanoil bangladesh",
    "industrial oil bd",
    "automotive lubricants dhaka",
    "hydraulic oil bangladesh",
  ],
  icons: {
    icon: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Germanoil BD",
      "url": "https://germanoil.bd",
      "logo": "https://germanoil.bd/images/logo.png",
      "sameAs": [
        "https://wa.me/971544478806",
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+8801913896322",
        "contactType": "customer service",
        "availableLanguage": ["English", "Bengali"],
      },
      "foundingDate": "2020",
    },
    {
      "@type": "LocalBusiness",
      "name": "Germanoil BD",
      "description":
        "Established in 2020. Official distributor of premium automotive and industrial lubricants in Bangladesh. Manufactured in Dubai, UAE.",
      "url": "https://germanoil.bd",
      "telephone": "+8801913896322",
      "email": "samiraccorporation3@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "BD",
        "addressRegion": "Dhaka Division",
        "streetAddress": "Tejgaon I/A, Dhaka 1208",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "23.7465",
        "longitude": "90.3763",
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00",
        },
      ],
      "priceRange": "$$",
      "currenciesAccepted": "BDT",
      "paymentAccepted": "Cash, Bank Transfer, Card",
      "foundingDate": "2020",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-rich-black font-sans text-white antialiased">
        <SiteHeader />
        <LenisScroll>{children}</LenisScroll>

        {/* Floating WhatsApp contact button — global, all screens */}
        <a
          href="https://wa.me/971544478806"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact GermanOil on WhatsApp"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </a>
      </body>
    </html>
  );
}