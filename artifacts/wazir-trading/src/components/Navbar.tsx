import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronRight, AlertTriangle, Clock, Car, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

// ─── Brand tokens ────────────────────────────────────────────────
// Primary:   #C8102E  (crimson — extracted from logo shield)
// Dark:      #1A0A0A  (near-black, warm)
// Mid:       #6B7280  (slate-500)
// Surface:   #FFFFFF
// Divider:   #E5E7EB  (gray-200)

const NAV_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'Cars',         href: '/cars' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
];

function useJapanTime() {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const weekday = now.toLocaleDateString('en-US', { timeZone: 'Asia/Tokyo', weekday: 'short' });
      const month   = now.toLocaleDateString('en-US', { timeZone: 'Asia/Tokyo', month: '2-digit' });
      const day     = now.toLocaleDateString('en-US', { timeZone: 'Asia/Tokyo', day: '2-digit' });
      const time    = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: true });
      setDisplay(`${weekday}, ${month}/${day}, ${time}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return display;
}

function useStockCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    supabase
      .from('cars')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'available')
      .then(({ count: c }) => { if (c !== null) setCount(c); });
  }, []);
  return count;
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location]                  = useLocation();
  const japanTime                   = useJapanTime();
  const stockCount                  = useStockCount();

  const waNumber  = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waMessage = encodeURIComponent('Hello, I am interested in purchasing a Japanese used car from Wazir Trading LLC.');
  const waLink    = `https://wa.me/${waNumber}?text=${waMessage}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      <header
        className="fixed top-0 inset-x-0 z-50 transition-shadow duration-300"
        style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.10)' : 'none' }}
        data-testid="site-header"
      >

        {/* ── BAR 1: Fraud Warning ──────────────────────────────────── */}
        <div className="bg-[#7F1D1D]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-[7px] flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <AlertTriangle size={11} className="text-amber-300" />
              <span className="text-amber-300 text-[10.5px] font-bold tracking-[0.18em] uppercase">
                Fraud Warning
              </span>
            </div>
            <span className="hidden sm:block h-3 w-px bg-white/20" />
            <p className="text-center text-[10.5px] leading-snug text-white/85 font-normal tracking-wide">
              We will{' '}
              <strong className="text-white font-semibold">never</strong>{' '}
              request payment to a personal account —{' '}
              <span className="text-white/90 font-medium">official bank is in Japan only.</span>
              {' '}Verify all details:{' '}
              <a
                href="tel:+818089227375"
                className="text-amber-300 hover:text-amber-200 font-semibold transition-colors whitespace-nowrap"
              >
                +81 80-8922-7375
              </a>
              <span className="text-white/40 mx-1.5">·</span>
              <a
                href="mailto:wazirtrading-pc@outlook.jp"
                className="text-amber-300 hover:text-amber-200 font-semibold transition-colors whitespace-nowrap"
              >
                wazirtrading-pc@outlook.jp
              </a>
            </p>
          </div>
        </div>

        {/* ── BAR 2: Info strip ─────────────────────────────────────── */}
        <div className="bg-[#F9F9F9] border-b border-gray-200">

          {/* ── Desktop (md+): three-column layout ── */}
          <div className="hidden md:flex max-w-7xl mx-auto px-8 h-8 items-center justify-between">
            {/* Left — tagline */}
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#C8102E] whitespace-nowrap">
              The Cars Exporting Expert
            </span>

            {/* Center — full JST */}
            <div className="flex items-center gap-1.5">
              <Clock size={10} className="text-gray-400 flex-shrink-0" />
              <span className="text-[10px] tracking-[0.1em] text-gray-400 font-medium whitespace-nowrap">
                Japan Standard Time
              </span>
              <span className="text-[10.5px] font-semibold text-gray-700 tabular-nums whitespace-nowrap">
                {japanTime || '--'}
              </span>
            </div>

            {/* Right — stock + rate */}
            <div className="flex items-center gap-3 text-[10px] tracking-[0.1em] uppercase text-gray-400 whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <Car size={10} className="text-[#C8102E]" />
                <span>
                  In Stock:{' '}
                  <strong className="text-[#C8102E] font-bold">
                    {stockCount !== null ? stockCount : '—'}
                  </strong>
                </span>
              </div>
              <span className="h-3 w-px bg-gray-300" />
              <span>$1 = <strong className="text-gray-700 font-semibold">¥162</strong></span>
            </div>
          </div>

          {/* ── Mobile (< md): single compact row ── */}
          <div className="flex md:hidden max-w-7xl mx-auto px-4 h-8 items-center justify-between gap-2">
            {/* JST abbreviated */}
            <div className="flex items-center gap-1 min-w-0">
              <Clock size={9} className="text-gray-400 flex-shrink-0" />
              <span className="text-[9.5px] font-medium text-gray-400 whitespace-nowrap">JST</span>
              <span className="text-[9.5px] font-bold text-gray-700 tabular-nums truncate">
                {japanTime || '--'}
              </span>
            </div>

            {/* Divider */}
            <span className="h-3 w-px bg-gray-300 flex-shrink-0" />

            {/* Stock */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Car size={9} className="text-[#C8102E]" />
              <span className="text-[9.5px] text-gray-400 uppercase tracking-wide">
                Stock: <strong className="text-[#C8102E]">{stockCount !== null ? stockCount : '—'}</strong>
              </span>
            </div>

            {/* Divider */}
            <span className="h-3 w-px bg-gray-300 flex-shrink-0" />

            {/* Rate */}
            <span className="text-[9.5px] text-gray-400 whitespace-nowrap flex-shrink-0">
              $1 = <strong className="text-gray-700">¥162</strong>
            </span>
          </div>

        </div>

        {/* ── Brand-red accent rule ──────────────────────────────────── */}
        <div className="h-[3px] bg-[#C8102E]" />

        {/* ── MAIN NAV ──────────────────────────────────────────────── */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-[80px]">

              {/* Logo */}
              <Link href="/" className="flex-shrink-0 group" data-testid="link-logo">
                <img
                  src="/logo.png"
                  alt="Wazir Trading LLC"
                  className="h-[64px] md:h-[72px] w-auto transition-opacity duration-200 group-hover:opacity-85"
                  style={{ mixBlendMode: 'multiply' }}
                  loading="eager"
                />
              </Link>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center" aria-label="Main navigation">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-4 py-1 group"
                      data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span
                        className={`block text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-150 ${
                          active
                            ? 'text-[#C8102E]'
                            : 'text-gray-600 group-hover:text-gray-900'
                        }`}
                      >
                        {link.label}
                      </span>
                      {/* Underline indicator */}
                      <span
                        className={`absolute -bottom-px left-3 right-3 h-[2px] rounded-full bg-[#C8102E] transition-all duration-200 origin-left ${
                          active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40'
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-2.5">

                {/* View Inventory — crimson filled */}
                <Link
                  href="/cars"
                  className="group flex items-center gap-1.5 px-5 py-2.5 bg-[#C8102E] hover:bg-[#A50D25] text-white text-[10.5px] tracking-[0.18em] uppercase font-bold transition-colors duration-150 rounded-[2px]"
                  data-testid="nav-browse-btn"
                >
                  View Inventory
                  <ChevronRight size={11} strokeWidth={2.5} className="opacity-75 group-hover:translate-x-0.5 transition-transform duration-150" />
                </Link>

                {/* WhatsApp — outlined */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:border-[#25D366] text-gray-700 hover:text-gray-900 text-[10.5px] tracking-[0.18em] uppercase font-semibold transition-all duration-150 rounded-[2px] hover:bg-[#F0FDF4]"
                  data-testid="nav-whatsapp-btn"
                >
                  <span className="relative flex-shrink-0 w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60" />
                    <span className="relative block w-2 h-2 rounded-full bg-[#25D366]" />
                  </span>
                  <WhatsAppIcon size={13} className="text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-[2px] text-gray-700 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-150"
                aria-label="Toggle menu"
                data-testid="btn-mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? 'x' : 'menu'}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.12 }}
                  >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,88vw)] bg-white flex flex-col"
              style={{ boxShadow: '-4px 0 32px rgba(0,0,0,0.12)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 36 }}
            >
              {/* Crimson top rule */}
              <div className="h-[3px] bg-[#C8102E] flex-shrink-0" />

              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-[64px] border-b border-gray-100 flex-shrink-0">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="Wazir Trading LLC"
                    className="h-[48px] w-auto"
                    style={{ mixBlendMode: 'multiply' }}
                    loading="eager"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Fraud alert in drawer */}
              <div className="mx-4 mt-4 flex-shrink-0 bg-red-50 border border-red-100 rounded-[2px] px-3 py-2.5 flex gap-2">
                <AlertTriangle size={12} className="text-[#C8102E] flex-shrink-0 mt-0.5" />
                <div className="text-[10px] text-gray-600 leading-relaxed">
                  <span className="font-bold text-[#C8102E]">Fraud Warning — </span>
                  never pay to personal accounts. Bank in Japan only.{' '}
                  <a href="tel:+818089227375" className="font-semibold text-[#C8102E] underline underline-offset-2">
                    +81 80-8922-7375
                  </a>
                </div>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 pt-3 pb-2">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.06, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between w-full px-4 py-3.5 mb-px rounded-[2px] transition-all duration-150 ${
                          active
                            ? 'bg-red-50 text-[#C8102E] border-l-[3px] border-[#C8102E] pl-3.5'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-[3px] border-transparent'
                        }`}
                        data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span className="text-[11px] tracking-[0.2em] uppercase font-semibold">
                          {link.label}
                        </span>
                        <ChevronRight
                          size={14}
                          className={active ? 'text-[#C8102E]' : 'text-gray-300'}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Live data strip */}
              <div className="mx-4 mb-3 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-[2px] px-4 py-2.5 flex items-center justify-between text-[10px] text-gray-500 tracking-wide uppercase">
                <div className="flex items-center gap-1.5">
                  <Clock size={9} className="text-gray-400" />
                  <span className="font-mono font-bold text-gray-700">{japanTime || '--:--:--'}</span>
                  <span className="text-gray-300">JST</span>
                </div>
                <span className="h-3 w-px bg-gray-200" />
                <div>
                  Stock:{' '}
                  <strong className="text-[#C8102E]">{stockCount !== null ? stockCount : '—'}</strong>
                </div>
                <span className="h-3 w-px bg-gray-200" />
                <div>
                  $1 = <strong className="text-gray-700">¥162</strong>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="px-4 pb-8 pt-1 border-t border-gray-100 space-y-2.5 flex-shrink-0">
                <Link
                  href="/cars"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#C8102E] hover:bg-[#A50D25] text-white text-[10.5px] tracking-[0.2em] uppercase font-bold rounded-[2px] transition-colors duration-150"
                >
                  View Inventory
                  <ChevronRight size={12} strokeWidth={2.5} />
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1DAA57] text-white text-[10.5px] tracking-[0.2em] uppercase font-bold rounded-[2px] transition-colors duration-150"
                  data-testid="mobile-whatsapp-btn"
                >
                  <WhatsAppIcon size={14} className="text-white" />
                  WhatsApp Us
                </a>

                {/* Contact links */}
                <div className="flex items-center justify-center gap-4 pt-1">
                  <a href="mailto:info@wazirtrading.com" className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition-colors">
                    <Mail size={10} /> info@wazirtrading.com
                  </a>
                </div>
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
