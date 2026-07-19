import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'Cars',         href: '/cars' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location]                  = useLocation();

  const waNumber  = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waMessage = encodeURIComponent('Hello, I found your website and I am interested in purchasing a Japanese used car.');
  const waLink    = `https://wa.me/${waNumber}?text=${waMessage}`;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? location === '/' : location.startsWith(href);

  return (
    <>
      {/* ── Wrapper ─────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.08)]' : ''}`}
        data-testid="site-header"
      >

        {/* ── Top utility bar ─────────────────────── */}
        <div className="bg-[#F5F2EC] border-b border-[#E8E2D6]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-10 flex items-center justify-between">

            {/* Left — origin badge */}
            <div className="flex items-center gap-2">
              {/* Tiny Japan flag circle */}
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white border border-[#E8E2D6] overflow-hidden flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#BC002D]" />
              </span>
              <span className="text-[10.5px] tracking-[0.18em] uppercase font-medium text-[#6B5F4E]">
                Sourced in Japan · Exported Worldwide
              </span>
            </div>

            {/* Right — contact snippets */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href="mailto:info@wazirtrading.com"
                className="flex items-center gap-1.5 text-[10.5px] tracking-[0.12em] text-[#8A7B6A] hover:text-[#B8943A] transition-colors duration-200"
              >
                <Mail size={10} strokeWidth={1.8} />
                info@wazirtrading.com
              </a>
              <span className="h-3 w-px bg-[#D5CEC3]" />
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10.5px] tracking-[0.12em] text-[#8A7B6A] hover:text-[#B8943A] transition-colors duration-200"
              >
                <Phone size={10} strokeWidth={1.8} />
                +81 808 922 7375
              </a>
            </div>
          </div>
        </div>

        {/* ── Thin gold divider ───────────────────── */}
        <div style={{ height: '1.5px', background: 'linear-gradient(90deg, transparent 0%, #C9A84C 25%, #E2C06A 50%, #C9A84C 75%, transparent 100%)' }} />

        {/* ── Main navigation bar ─────────────────── */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-[78px]">

              {/* ── Logo ──────────────────────────── */}
              <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0" data-testid="link-logo">

                {/* Emblem */}
                <div className="relative w-[46px] h-[46px] flex-shrink-0">
                  {/* Outer ring */}
                  <svg viewBox="0 0 46 46" className="absolute inset-0 w-full h-full" fill="none">
                    <circle cx="23" cy="23" r="21.5" stroke="#0F1E3C" strokeWidth="1" />
                    <circle cx="23" cy="23" r="17" stroke="#C9A84C" strokeWidth="0.75" />
                    {/* Tiny tick marks at N/S/E/W */}
                    <line x1="23" y1="1.5" x2="23" y2="5" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
                    <line x1="23" y1="41" x2="23" y2="44.5" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
                    <line x1="1.5" y1="23" x2="5" y2="23" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
                    <line x1="41" y1="23" x2="44.5" y2="23" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-serif text-[20px] font-bold text-[#0F1E3C] leading-none select-none">
                    W
                  </span>
                </div>

                {/* Wordmark */}
                <div className="flex flex-col leading-none">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-[16px] font-semibold tracking-[0.14em] uppercase text-[#0F1E3C] group-hover:text-[#B8943A] transition-colors duration-300">
                      Wazir Trading
                    </span>
                    <span className="text-[10px] tracking-[0.12em] font-medium text-[#C9A84C] uppercase mt-0.5">
                      LLC
                    </span>
                  </div>
                  <span className="text-[9.5px] tracking-[0.28em] uppercase text-[#9B8E7E] font-light mt-[3px]">
                    Japanese Automotive Exports
                  </span>
                </div>
              </Link>

              {/* ── Desktop nav links ─────────────── */}
              <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-4 py-2 group"
                      data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${
                        active
                          ? 'text-[#B8943A]'
                          : 'text-[#2E3A52] group-hover:text-[#0F1E3C]'
                      }`}>
                        {link.label}
                      </span>

                      {/* Active / hover underline — two layered lines */}
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-[#C9A84C] transition-all duration-300 ease-out ${
                        active ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-5 group-hover:opacity-70'
                      }`} />

                      {/* Gold dot on active */}
                      {active && (
                        <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#C9A84C]" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* ── CTA buttons ───────────────────── */}
              <div className="hidden lg:flex items-center gap-2.5">

                {/* Outline button */}
                <Link
                  href="/cars"
                  className="flex items-center gap-1.5 px-5 py-2.5 text-[10.5px] tracking-[0.2em] uppercase font-medium text-[#0F1E3C] border border-[#0F1E3C]/20 hover:border-[#0F1E3C]/50 hover:bg-[#0F1E3C]/[0.03] rounded-[2px] transition-all duration-200"
                  data-testid="nav-browse-btn"
                >
                  View Inventory
                  <ChevronRight size={11} strokeWidth={2} className="opacity-50" />
                </Link>

                {/* WhatsApp CTA — gold gradient pill */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group flex items-center gap-2 px-5 py-2.5 rounded-[2px] overflow-hidden transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #0F1E3C 0%, #1a2f5a 100%)',
                    boxShadow: '0 2px 12px rgba(15,30,60,0.25)',
                  }}
                  data-testid="nav-whatsapp-btn"
                >
                  {/* Shimmer on hover */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, transparent 30%, rgba(201,168,76,0.18) 60%, transparent 80%)' }}
                  />
                  {/* Pulsing green dot */}
                  <span className="relative flex-shrink-0">
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60" style={{ width: 7, height: 7 }} />
                    <span className="relative block w-[7px] h-[7px] rounded-full bg-[#25D366]" />
                  </span>
                  <WhatsAppIcon className="text-white relative z-10" size={13} />
                  <span className="text-[10.5px] tracking-[0.18em] uppercase font-semibold text-white relative z-10">
                    WhatsApp
                  </span>
                </a>
              </div>

              {/* ── Mobile hamburger ──────────────── */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden w-10 h-10 flex items-center justify-center border border-[#E5DDD0] rounded-[2px] text-[#0F1E3C] hover:bg-[#F5F2EC] transition-colors"
                aria-label="Toggle menu"
                data-testid="btn-mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileOpen ? 'x' : 'menu'}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.12 }}
                  >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Subtle bottom shadow line ────────────── */}
        <div className={`h-px transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-40'}`}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.06) 80%, transparent)' }}
        />
      </header>

      {/* ── Mobile full-screen drawer ─────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(360px,90vw)] bg-white flex flex-col"
              style={{ boxShadow: '-8px 0 40px rgba(0,0,0,0.12)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[78px] border-b border-[#F0EBE3]">
                <div className="flex items-center gap-2.5">
                  {/* Mini emblem */}
                  <div className="w-8 h-8 rounded-full border border-[#0F1E3C] flex items-center justify-center">
                    <span className="font-serif text-[14px] font-bold text-[#0F1E3C]">W</span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-serif text-[13px] font-semibold tracking-widest uppercase text-[#0F1E3C]">Wazir Trading</span>
                    <span className="text-[8.5px] tracking-[0.22em] uppercase text-[#C9A84C] mt-0.5">Japanese Exports</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-[#E5DDD0] rounded-sm text-[#0F1E3C] hover:bg-[#F5F2EC] transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-4">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 + 0.08 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between w-full px-4 py-3.5 mb-1 rounded-sm transition-all duration-200 ${
                          active
                            ? 'bg-[#FBF8F2] border border-[#E8DFC8] text-[#B8943A]'
                            : 'border border-transparent hover:bg-[#F9F7F3] text-[#2E3A52] hover:text-[#0F1E3C]'
                        }`}
                        data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span className="text-[11px] tracking-[0.22em] uppercase font-medium">{link.label}</span>
                        {active
                          ? <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                          : <ChevronRight size={13} className="text-[#C5BAA9] opacity-60" />
                        }
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer CTAs */}
              <div className="px-4 pb-8 pt-3 border-t border-[#F0EBE3] space-y-2.5">
                <Link
                  href="/cars"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-[#0F1E3C]/20 text-[10.5px] tracking-[0.22em] uppercase font-medium text-[#0F1E3C] hover:bg-[#F5F2EC] rounded-[2px] transition-all"
                >
                  View Inventory
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-[10.5px] tracking-[0.22em] uppercase font-semibold text-white rounded-[2px] transition-all"
                  style={{ background: 'linear-gradient(135deg, #0F1E3C 0%, #1a2f5a 100%)' }}
                  data-testid="mobile-whatsapp-btn"
                >
                  <WhatsAppIcon className="text-white" size={14} />
                  Contact via WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function WhatsAppIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
