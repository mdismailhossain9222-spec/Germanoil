import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";

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
  title: "GermanOil Project — Premium Automotive & Industrial Lubricants",
  description:
    "Precision engineered in the UAE, powering Bangladesh. GermanOil Project manufactures and distributes premium automotive and industrial lubricants for cars, motorcycles and industry.",
  keywords: [
    "GermanOil",
    "lubricants",
    "engine oil",
    "hydraulic oil",
    "Dubai",
    "UAE",
    "Bangladesh",
  ],
  icons: {
    icon: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="bg-rich-black font-sans text-white antialiased">
        <LenisScroll>{children}</LenisScroll>

        {/* Floating WhatsApp contact button — global, all screens */}
        <a
          href="https://wa.me/8801792544444?text=Hi,%20I%20am%20interested%20in%20GermanOil%20products."
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