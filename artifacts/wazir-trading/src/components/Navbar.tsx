import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronRight, AlertTriangle, Clock, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const NAV_LINKS = [
  { label: 'Home',         href: '/' },
  { label: 'Cars',         href: '/cars' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
];

function useJapanTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useStockCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    supabase
      .from('cars')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'available')
      .then(({ count: c }) => {
        if (c !== null) setCount(c);
      });
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
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.35)]' : ''}`}
        data-testid="site-header"
      >

        {/* ── Bar 1: Fraud Warning ──────────────────────── */}
        <div className="bg-[#7B0000] border-b border-[#a00000]">
          <div className="max-w-7xl mx-auto px-3 md:px-8 py-2 flex items-center justify-center gap-2 flex-wrap">
            <AlertTriangle size={13} className="text-[#FFD700] flex-shrink-0" />
            <p className="text-center text-[10.5px] md:text-[11.5px] leading-snug text-white font-medium tracking-wide">
              <span className="text-[#FFD700] font-bold mr-1">⚠ FRAUD WARNING:</span>
              Wazir Trading LLC will{' '}
              <span className="font-bold text-yellow-300">NEVER</span>{' '}
              request payment to a personal bank account. Our{' '}
              <span className="font-bold text-yellow-300">official bank account is in Japan only.</span>{' '}
              Verify all payment details before transferring.
              {' '}Contact us:{' '}
              <a
                href="tel:+818089227375"
                className="underline underline-offset-2 text-yellow-300 hover:text-white transition-colors font-semibold whitespace-nowrap"
              >
                +81 80-8922-7375
              </a>
              {' '}·{' '}
              <a
                href="mailto:wazirtrading-pc@outlook.jp"
                className="underline underline-offset-2 text-yellow-300 hover:text-white transition-colors font-semibold whitespace-nowrap"
              >
                wazirtrading-pc@outlook.jp
              </a>
            </p>
          </div>
        </div>

        {/* ── Bar 2: Info Bar ───────────────────────────── */}
        <div className="bg-[#0A1628] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-9 flex items-center justify-between gap-4">

            {/* Left — tagline */}
            <span className="hidden sm:block text-[10px] tracking-[0.22em] uppercase font-semibold text-[#C9A84C] whitespace-nowrap">
              The Cars Exporting Expert
            </span>

            {/* Center — live JST clock */}
            <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
              <Clock size={10} className="text-white/40 flex-shrink-0" />
              <span className="text-[10px] tracking-[0.14em] uppercase text-white/50 font-light">
                Japan (JST)
              </span>
              <span className="text-[10.5px] font-mono font-semibold text-white/80 tabular-nums ml-0.5 min-w-[58px]">
                {japanTime || '--:--:--'}
              </span>
            </div>

            {/* Right — stock + rate */}
            <div className="hidden sm:flex items-center gap-4 text-[10px] tracking-[0.12em] text-white/50 uppercase">
              <div className="flex items-center gap-1.5">
                <Car size={10} className="text-[#C9A84C]" />
                <span>
                  In Stock:{' '}
                  <span className="text-white font-semibold">
                    {stockCount !== null ? stockCount : '—'}
                  </span>
                </span>
              </div>
              <span className="h-3 w-px bg-white/15" />
              <span>
                $1 ={' '}
                <span className="text-[#C9A84C] font-semibold">¥162</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Gold accent line ─────────────────────────── */}
        <div style={{ height: '1.5px', background: 'linear-gradient(90deg, transparent 0%, #8B6914 10%, #C9A84C 35%, #F0D080 50%, #C9A84C 65%, #8B6914 90%, transparent 100%)' }} />

        {/* ── Main navigation bar (gradient) ───────────── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #060E1C 0%, #0A1628 40%, #0F1E3C 70%, #152238 100%)',
            boxShadow: scrolled ? '0 1px 0 rgba(201,168,76,0.15)' : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-[72px]">

              {/* ── Logo ──────────────────────────────────── */}
              <Link href="/" className="flex items-center flex-shrink-0 group" data-testid="link-logo">
                <img
                  src="/logo.png"
                  alt="Wazir Trading LLC"
                  className="h-[58px] md:h-[64px] w-auto transition-opacity duration-300 group-hover:opacity-90"
                  style={{ mixBlendMode: 'screen' }}
                  loading="eager"
                />
              </Link>

              {/* ── Desktop nav links ──────────────────────── */}
              <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-4 py-2 group"
                      data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className={`text-[11px] tracking-[0.22em] uppercase font-semibold transition-colors duration-200 ${
                        active
                          ? 'text-[#E2C06A]'
                          : 'text-white/70 group-hover:text-white'
                      }`}>
                        {link.label}
                      </span>

                      {/* Animated underline */}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] transition-all duration-300 ease-out ${
                          active
                            ? 'w-6 opacity-100'
                            : 'w-0 opacity-0 group-hover:w-5 group-hover:opacity-60'
                        }`}
                        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
                      />

                      {/* Gold dot on active */}
                      {active && (
                        <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#C9A84C]" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* ── CTA buttons ───────────────────────────── */}
              <div className="hidden lg:flex items-center gap-2.5">

                {/* View Inventory outline */}
                <Link
                  href="/cars"
                  className="flex items-center gap-1.5 px-5 py-2 text-[10.5px] tracking-[0.2em] uppercase font-semibold text-white/80 border border-white/20 hover:border-[#C9A84C]/60 hover:text-[#E2C06A] rounded-[2px] transition-all duration-200"
                  data-testid="nav-browse-btn"
                >
                  View Inventory
                  <ChevronRight size={11} strokeWidth={2.5} className="opacity-60" />
                </Link>

                {/* WhatsApp CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group flex items-center gap-2 px-5 py-2 rounded-[2px] overflow-hidden transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C 0%, #E2C06A 50%, #C9A84C 100%)',
                    boxShadow: '0 2px 12px rgba(201,168,76,0.3)',
                  }}
                  data-testid="nav-whatsapp-btn"
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'linear-gradient(135deg, #E2C06A 0%, #F5D882 50%, #E2C06A 100%)' }}
                  />
                  <span className="relative flex-shrink-0">
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-70" style={{ width: 7, height: 7 }} />
                    <span className="relative block w-[7px] h-[7px] rounded-full bg-[#25D366]" />
                  </span>
                  <WhatsAppIcon className="text-[#0A1628] relative z-10" size={13} />
                  <span className="text-[10.5px] tracking-[0.18em] uppercase font-bold text-[#0A1628] relative z-10">
                    WhatsApp
                  </span>
                </a>
              </div>

              {/* ── Mobile hamburger ──────────────────────── */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden w-9 h-9 flex items-center justify-center border border-white/20 rounded-[2px] text-white hover:border-[#C9A84C]/50 hover:bg-white/5 transition-colors"
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
                    {mobileOpen ? <X size={17} /> : <Menu size={17} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom shadow line ────────────────────────── */}
        <div
          className={`h-px transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.25) 70%, transparent)' }}
        />
      </header>

      {/* ── Mobile full-screen drawer ─────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,90vw)] flex flex-col"
              style={{
                background: 'linear-gradient(160deg, #060E1C 0%, #0A1628 50%, #0F1E3C 100%)',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.5)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/10">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="Wazir Trading LLC"
                    className="h-[52px] w-auto"
                    style={{ mixBlendMode: 'screen' }}
                    loading="eager"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Fraud warning mini-banner in drawer */}
              <div className="mx-4 mt-4 rounded-sm bg-[#7B0000]/80 border border-[#a00000]/60 px-3 py-2 flex items-start gap-2">
                <AlertTriangle size={12} className="text-[#FFD700] flex-shrink-0 mt-0.5" />
                <p className="text-[9.5px] text-white/80 leading-relaxed">
                  <span className="text-yellow-300 font-bold">Fraud Warning:</span>{' '}
                  Never pay to personal accounts. Bank in Japan only.{' '}
                  <a href="tel:+818089227375" className="text-yellow-300 underline">+81 80-8922-7375</a>
                </p>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-4 mt-2">
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
                            ? 'bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#E2C06A]'
                            : 'border border-transparent hover:bg-white/5 text-white/60 hover:text-white'
                        }`}
                        data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span className="text-[11px] tracking-[0.22em] uppercase font-semibold">{link.label}</span>
                        {active
                          ? <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                          : <ChevronRight size={13} className="text-white/20" />
                        }
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Live info strip in drawer */}
              <div className="mx-4 mb-3 px-3 py-2 rounded-sm border border-white/10 bg-white/5 flex items-center justify-between text-[9.5px] text-white/50 tracking-wide">
                <span>JST <span className="font-mono text-white/70 font-semibold">{japanTime || '--:--:--'}</span></span>
                <span className="h-3 w-px bg-white/15" />
                <span>Stock: <span className="text-white/70 font-semibold">{stockCount !== null ? stockCount : '—'}</span></span>
                <span className="h-3 w-px bg-white/15" />
                <span>$1 = <span className="text-[#C9A84C] font-semibold">¥162</span></span>
              </div>

              {/* Drawer footer CTAs */}
              <div className="px-4 pb-8 pt-2 border-t border-white/10 space-y-2.5">
                <Link
                  href="/cars"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 text-[10.5px] tracking-[0.22em] uppercase font-semibold text-white/80 hover:border-[#C9A84C]/50 hover:text-[#E2C06A] rounded-[2px] transition-all"
                >
                  View Inventory
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-[10.5px] tracking-[0.22em] uppercase font-bold text-[#0A1628] rounded-[2px] transition-all"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #E2C06A)' }}
                  data-testid="mobile-whatsapp-btn"
                >
                  <WhatsAppIcon className="text-[#0A1628]" size={14} />
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
