"use client";

import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

/** Exactly 15 testimonials — the marquee renders this list twice. */
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rafiq Hasan",
    role: "Workshop Owner · Mirpur, Dhaka",
    quote:
      "The 20W50 holds its film in Dhaka traffic. Engines come in cleaner and we rarely see sludge on teardown.",
  },
  {
    name: "Shahidul Islam",
    role: "Fleet Manager · Tejgaon",
    quote:
      "Fifty bikes in daily service. Since we standardised on GermanOil 4T, clutch replacements have dropped noticeably.",
  },
  {
    name: "Nasir Ahmed",
    role: "Lead Technician · Chattogram",
    quote:
      "Oil stays stable between services. Customers have stopped complaining about engine noise after 3,000 km.",
  },
  {
    name: "Imran Chowdhury",
    role: "Plant Engineer · Gazipur",
    quote:
      "Our hydraulic presses run two shifts a day. AW 150 has held pressure and temperature without a single failure.",
  },
  {
    name: "Sabbir Rahman",
    role: "Service Centre · Uttara",
    quote:
      "Gear oil that actually shifts cleanly when cold. The EP 90 became our default for manual transmissions.",
  },
  {
    name: "Ayesha Siddiqua",
    role: "Distributor · Sylhet",
    quote:
      "Predictable supply and consistent batches. Our resellers reorder because customers trust the brand.",
  },
  {
    name: "Mahmudul Karim",
    role: "Garage Owner · Bogura",
    quote:
      "Premium 6000 keeps pistons clean in older petrol engines. Compression numbers stay where they should.",
  },
  {
    name: "Tanvir Alam",
    role: "Operations · Jebel Ali, Dubai",
    quote:
      "Blending is tightly controlled and every batch has documentation. That traceability is why we ship it.",
  },
  {
    name: "Fahim Reza",
    role: "Fleet Supervisor · Rajshahi",
    quote:
      "Thirty light commercial vehicles, one oil. Fewer breakdowns, fewer roadside calls in summer heat.",
  },
  {
    name: "Sumaiya Akter",
    role: "Retail Partner · Khulna",
    quote:
      "Customers ask for GermanOil by name now. The packaging and batch codes give confidence.",
  },
  {
    name: "Kamal Hossain",
    role: "Industrial Buyer · Narayanganj",
    quote:
      "Hydraulic fluid that resists oxidation under load. Our maintenance interval stretched by a third.",
  },
  {
    name: "Rezaul Karim",
    role: "Bike Specialist · Dhanmondi",
    quote:
      "Four-stroke oil that respects the wet clutch. No slip, no chatter, just smooth engagement.",
  },
  {
    name: "Arif Mahmud",
    role: "Workshop Chain · Cumilla",
    quote:
      "Consistent viscosity from bottle to bottle. That consistency is what keeps a busy workshop reliable.",
  },
  {
    name: "Hasibul Islam",
    role: "Truck Maintenance · Rangpur",
    quote:
      "Gear and engine oils that hold up to long hauls. Breakdowns on the road have become rare.",
  },
  {
    name: "Nusrat Jahan",
    role: "Procurement · Dhaka",
    quote:
      "Straight answers, documented specifications and on-time delivery. That is why we keep ordering.",
  },
];

/** One testimonial card — shared by both marquee tracks. */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="w-[300px] shrink-0 rounded-2xl border border-graphite bg-charcoal p-6 sm:w-[360px]">
      <Quote className="h-5 w-5 text-sandGold" aria-hidden="true" />
      <blockquote className="mt-4 text-sm leading-relaxed text-warmGrey">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 border-t border-graphite pt-4">
        <span className="block text-sm font-semibold text-white">{t.name}</span>
        <span className="mt-1 block text-[11px] tracking-[0.14em] text-warmGrey/70 uppercase">
          {t.role}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Infinite horizontal testimonial marquee.
 *
 * The track holds the 15 cards twice and slides exactly 50% of its own
 * width, so the second copy lands precisely where the first started —
 * a seamless loop with no jump. The animation never pauses on hover.
 */
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="overflow-hidden border-t border-graphite bg-richBlack py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        <span className="text-[11px] font-semibold tracking-[0.3em] text-sandGold uppercase">
          Testimonials
        </span>
        <h2
          id="testimonials-title"
          className="font-display mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
        >
          Trusted on the workshop floor
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-warmGrey">
          From motorcycle garages in Dhaka to industrial plants in Gazipur —
          here is what the people who use GermanOil every day report.
        </p>
      </div>

      {/* Marquee — no pause on hover, runs continuously. */}
      <div
        className="mt-14 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        role="region"
        aria-label="Customer testimonials, scrolling"
      >
        <div className="animate-marquee flex w-max items-stretch gap-6 pr-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
          {/* Second copy — identical list, aria-hidden so it is read once. */}
          <div
            className="flex items-stretch gap-6 pr-6"
            aria-hidden="true"
          >
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={`dup-${t.name}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
