import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

const NAV = [
  { href: "#story", label: "Our Story" },
  { href: "#products", label: "Products" },
  { href: "#quality", label: "Quality" },
  { href: "#reach", label: "Distribution" },
];

const WHATSAPP_URL = "https://wa.me/971544478806";

/** Minimal, clean footer with dual-location contact placeholders. */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-graphite bg-ink"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Germanoil BD logo"
                width={40}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <span className="font-display text-lg tracking-[0.25em] text-white uppercase">
                German<span className="text-gold">Oil</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Premium automotive and industrial lubricants, manufactured in
              Dubai, UAE and distributed throughout Bangladesh. This website is
              a product showcase — no online sales are conducted here.
            </p>
            <a
              href="mailto:samiraccorporation3@gmail.com"
              className="mt-6 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-light"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              samiraccorporation3@gmail.com
            </a>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h3 className="text-[10px] font-semibold tracking-[0.26em] text-white uppercase">
              Navigate
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-muted transition-colors hover:text-gold-light"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Locations */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.26em] text-white uppercase">
              Locations
            </h3>
            <ul className="mt-5 space-y-5 text-sm text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
                <span>
                  <span className="block text-white">UAE — Head Office</span>
                  Jebel Ali Industrial Area, Dubai
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
                <span>
                  <span className="block text-white">Bangladesh — Distribution</span>
                  Mirpur, Dhaka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
                <span>+971 50 796 4529</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
                <span>+880 1913-896322</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-14" aria-hidden="true" />

        <div className="mt-6 flex flex-col gap-3 text-[11px] tracking-[0.14em] text-muted/70 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} GermanOil Project. All rights reserved.</p>
          <p>Dubai, UAE · Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
