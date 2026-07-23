import React from 'react';
import { Link } from 'wouter';
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Clock,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

/* ── Instagram SVG icon (no extra dependency) ─────────────────────────── */
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.1" fill="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

/* ── Facebook SVG icon ───────────────────────────────────────────────── */
function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/* ── WhatsApp SVG icon ────────────────────────────────────────────────── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

const QUICK_LINKS = [
  { label: 'Browse Inventory', href: '/cars' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

const HELP_LINKS = [
  { label: 'FAQs', href: '/faqs' },
  { label: 'Payment Information', href: '/payment-information' },
  { label: 'Shipping Information', href: '/shipping-information' },
];

const TRUST_BADGES = [
  'Direct Japan Auctions',
  'Grade-Certified Stock',
  'Secure Bank Transfer',
  'Global Shipping',
];

/* ─────────────────────────────────────────────────────────────────────── */

export default function Footer() {
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1B2A] text-white/80 border-t border-white/10">
      {/* ── Top accent bar ──────────────────────────────────────────── */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C8102E] to-transparent opacity-60" />

      {/* ── Main grid ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Col 1: Brand ──────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link href="/" aria-label="Wazir Trading home">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="Wazir Trading LLC"
                  className="h-20 w-auto"
                  loading="lazy"
                  decoding="async"
                  width="267"
                  height="178"
                />
              </picture>
            </Link>

            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Premium Japanese used vehicles exported to buyers worldwide. We
              connect you directly to Japan's top auto auctions — with
              transparency, integrity, and full export support.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/wazirtradingllc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wazir Trading on Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-[#C8102E] hover:border-[#C8102E] transition-all duration-200"
              >
                <InstagramIcon size={18} />
              </a>

              <a
                href="https://www.facebook.com/share/r/1PcvhfmRQy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wazir Trading on Facebook"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200"
              >
                <FacebookIcon size={18} />
              </a>

              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-200"
              >
                <WhatsAppIcon size={18} />
              </a>

              <a
                href="mailto:wazirtrading-pc@outlook.jp"
                aria-label="Email us"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/8 border border-white/10 text-white/60 hover:text-white hover:bg-[#C8102E] hover:border-[#C8102E] transition-all duration-200"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* ── Col 2: Quick Links ────────────────────────────────── */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-[#C8102E]" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-[#C8102E] transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight
                      size={13}
                      className="text-[#C8102E] shrink-0 group-hover:translate-x-0.5 transition-transform"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Help & Info ───────────────────────────────── */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-[#C8102E]" />
              Help &amp; Info
            </h4>
            <ul className="space-y-3">
              {HELP_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-[#C8102E] transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight
                      size={13}
                      className="text-[#C8102E] shrink-0 group-hover:translate-x-0.5 transition-transform"
                    />
                    {label}
                  </Link>
                </li>
              ))}

              {/* Instagram external link repeated here for discoverability */}
              <li>
                <a
                  href="https://www.instagram.com/wazirtradingllc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-[#C8102E] transition-colors flex items-center gap-1.5 group"
                >
                  <ExternalLink
                    size={13}
                    className="text-[#C8102E] shrink-0"
                  />
                  Instagram &nbsp;@wazirtradingllc
                </a>
              </li>
            </ul>
          </div>

          {/* ── Col 4: Contact ───────────────────────────────────── */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-[#C8102E]" />
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                <span>
                  Kuwana-City, Mie-Pref, Japan
                  <br />
                  <span className="text-white/40 text-xs">Global Export Division</span>
                </span>
              </li>

              <li>
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle size={16} className="text-[#25D366] shrink-0" />
                  <span>
                    +{waNumber}
                    <br />
                    <span className="text-white/40 text-xs">WhatsApp preferred</span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:wazirtrading-pc@outlook.jp"
                  className="flex items-center gap-3 text-white/60 hover:text-[#C8102E] transition-colors"
                >
                  <Mail size={16} className="text-[#C8102E] shrink-0" />
                  <span>
                    wazirtrading-pc@outlook.jp
                  </span>
                </a>
              </li>

              <li className="flex items-start gap-3 text-white/60">
                <Clock size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
                <span>
                  Mon–Sat&nbsp; 9 am – 6 pm JST
                  <br />
                  <span className="text-white/40 text-xs">
                    WhatsApp replies outside hours
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Trust badge strip ───────────────────────────────────────── */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-4 md:px-8 py-4 flex flex-wrap gap-2 justify-center">
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="text-xs text-white/40 px-3 py-1 rounded-full border border-white/10 bg-white/5"
            >
              ✓ {badge}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────── */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>© {year} Wazir Trading LLC. All rights reserved.</p>
          <p>
            Exporting quality Japanese vehicles to the world&nbsp;🌍
          </p>
        </div>
      </div>
    </footer>
  );
}
