import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronRight, AlertTriangle, Clock, Car, Zap } from 'lucide-react';
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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(220,20,60,0.12),0_2px_8px_rgba(0,0,0,0.08)]' : ''}`}
        data-testid="site-header"
      >

        {/* ── Bar 1: Fraud Warning ──────────────────────── */}
        <div style={{ background: 'linear-gradient(90deg, #B20000 0%, #CC0000 40%, #E50000 60%, #B20000 100%)' }}>
          <div className="max-w-7xl mx-auto px-3 md:px-8 py-2 flex items-center justify-center gap-2 flex-wrap">
            <AlertTriangle size={12} className="text-yellow-300 flex-shrink-0" />
            <p className="text-center text-[10.5px] md:text-[11px] leading-snug text-white font-medium tracking-wide">
              <span className="text-yellow-300 font-bold mr-1">⚠ FRAUD WARNING:</span>
              Wazir Trading LLC will{' '}
              <span className="font-bold text-yellow-200 underline underline-offset-2">NEVER</span>{' '}
              request payment to a personal bank account.{' '}
              <span className="font-semibold text-yellow-200">Official bank is in Japan only.</span>
              {' '}Verify before transferring —{' '}
              <a
                href="tel:+818089227375"
                className="text-yellow-300 underline underline-offset-2 hover:text-white transition-colors font-bold whitespace-nowrap"
              >
                +81 80-8922-7375
              </a>
              {' '}·{' '}
              <a
                href="mailto:wazirtrading-pc@outlook.jp"
                className="text-yellow-300 underline underline-offset-2 hover:text-white transition-colors font-bold whitespace-nowrap"
              >
                wazirtrading-pc@outlook.jp
              </a>
            </p>
          </div>
        </div>

        {/* ── Bar 2: Info Bar (light neon) ─────────────── */}
        <div
          style={{
            background: 'linear-gradient(90deg, #F0F6FF 0%, #EAF2FF 30%, #F5F0FF 60%, #FFF0F3 100%)',
            borderBottom: '1px solid rgba(59,130,246,0.15)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-9 flex items-center justify-between gap-4">

            {/* Left — tagline */}
            <div className="hidden sm:flex items-center gap-1.5">
              <Zap size={11} className="text-[#E5000A] flex-shrink-0" fill="currentColor" />
              <span
                className="text-[10px] tracking-[0.22em] uppercase font-bold whitespace-nowrap"
                style={{
                  background: 'linear-gradient(90deg, #C8000A, #0048D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                The Cars Exporting Expert
              </span>
            </div>

            {/* Center — live JST clock */}
            <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
              <Clock size={10} className="text-[#0048D4] flex-shrink-0" />
              <span className="text-[10px] tracking-[0.14em] uppercase text-slate-500 font-medium">
                Japan (JST)
              </span>
              <span
                className="text-[10.5px] font-mono font-bold tabular-nums ml-0.5 min-w-[58px]"
                style={{ color: '#0048D4' }}
              >
                {japanTime || '--:--:--'}
              </span>
            </div>

            {/* Right — stock + rate */}
            <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-[0.1em] uppercase">
              <div className="flex items-center gap-1.5">
                <Car size={10} className="text-[#E5000A]" />
                <span className="text-slate-500">
                  In Stock:{' '}
                  <span
                    className="font-bold"
                    style={{ color: '#E5000A' }}
                  >
                    {stockCount !== null ? stockCount : '—'}
                  </span>
                </span>
              </div>
              <span className="h-3 w-px bg-slate-300" />
              <span className="text-slate-500">
                $1 ={' '}
                <span className="font-bold" style={{ color: '#0048D4' }}>¥162</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Neon accent divider ───────────────────────── */}
        <div
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, #0048D4 15%, #7B00E0 35%, #E5000A 50%, #FF6600 65%, #0048D4 85%, transparent 100%)',
            boxShadow: '0 0 8px rgba(0,72,212,0.4), 0 0 16px rgba(229,0,10,0.3)',
          }}
        />

        {/* ── Main navigation bar (light gradient) ─────── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 30%, #F5F0FF 65%, #FFF5F5 100%)',
            backdropFilter: 'blur(12px)',
            borderBottom: scrolled ? '1px solid rgba(0,72,212,0.12)' : '1px solid rgba(0,0,0,0.04)',
            boxShadow: scrolled
              ? '0 4px 20px rgba(0,72,212,0.08), 0 1px 0 rgba(229,0,10,0.06)'
              : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-[72px]">

              {/* ── Logo ──────────────────────────────────── */}
              <Link href="/" className="flex items-center flex-shrink-0 group" data-testid="link-logo">
                <img
                  src="/logo.png"
                  alt="Wazir Trading LLC"
                  className="h-[56px] md:h-[62px] w-auto transition-all duration-300 group-hover:scale-[1.03]"
                  style={{ mixBlendMode: 'multiply' }}
                  loading="eager"
                />
              </Link>

              {/* ── Desktop nav links ──────────────────────── */}
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
                      <span
                        className={`text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-200 ${
                          active ? '' : 'text-slate-600 group-hover:text-slate-900'
                        }`}
                        style={active ? {
                          background: 'linear-gradient(90deg, #E5000A, #0048D4)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        } : {}}
                      >
                        {link.label}
                      </span>

                      {/* Neon underline */}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-300 ease-out rounded-full ${
                          active ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-70'
                        }`}
                        style={{
                          background: 'linear-gradient(90deg, #E5000A, #7B00E0, #0048D4)',
                          boxShadow: active ? '0 0 6px rgba(229,0,10,0.5)' : 'none',
                        }}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* ── CTA buttons ───────────────────────────── */}
              <div className="hidden lg:flex items-center gap-2.5">

                {/* View Inventory — neon red */}
                <Link
                  href="/cars"
                  className="relative group flex items-center gap-1.5 px-5 py-2.5 rounded-sm overflow-hidden transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #E5000A 0%, #CC0000 100%)',
                    boxShadow: '0 2px 12px rgba(229,0,10,0.35), 0 0 0 1px rgba(229,0,10,0.2)',
                  }}
                  data-testid="nav-browse-btn"
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #FF1A24 0%, #E5000A 100%)' }}
                  />
                  <span className="text-[10.5px] tracking-[0.2em] uppercase font-bold text-white relative z-10">
                    View Inventory
                  </span>
                  <ChevronRight size={11} strokeWidth={2.5} className="text-white/80 relative z-10" />
                </Link>

                {/* WhatsApp CTA — neon green→blue */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group flex items-center gap-2 px-5 py-2.5 rounded-sm overflow-hidden transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #00A651 0%, #007A3D 100%)',
                    boxShadow: '0 2px 12px rgba(0,166,81,0.35), 0 0 0 1px rgba(0,166,81,0.2)',
                  }}
                  data-testid="nav-whatsapp-btn"
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #00C461 0%, #009A4D 100%)' }}
                  />
                  <span className="relative flex-shrink-0">
                    <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-50" style={{ width: 7, height: 7 }} />
                    <span className="relative block w-[7px] h-[7px] rounded-full bg-white" />
                  </span>
                  <WhatsAppIcon className="text-white relative z-10" size={13} />
                  <span className="text-[10.5px] tracking-[0.18em] uppercase font-bold text-white relative z-10">
                    WhatsApp
                  </span>
                </a>
              </div>

              {/* ── Mobile hamburger ──────────────────────── */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #E5000A, #CC0000)',
                  boxShadow: '0 2px 8px rgba(229,0,10,0.3)',
                }}
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
                    className="text-white"
                  >
                    {mobileOpen ? <X size={17} /> : <Menu size={17} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ─────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,90vw)] flex flex-col bg-white"
              style={{
                boxShadow: '-8px 0 40px rgba(229,0,10,0.15), -2px 0 0 rgba(0,72,212,0.1)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Neon top bar in drawer */}
              <div
                style={{
                  height: '3px',
                  background: 'linear-gradient(90deg, #E5000A, #7B00E0, #0048D4, #00A651)',
                }}
              />

              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-[68px] border-b border-slate-100">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="Wazir Trading LLC"
                    className="h-[50px] w-auto"
                    style={{ mixBlendMode: 'multiply' }}
                    loading="eager"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-sm text-slate-500 hover:text-white transition-all duration-200 hover:bg-[#E5000A]"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Fraud warning mini-banner in drawer */}
              <div className="mx-4 mt-3 rounded-sm px-3 py-2 flex items-start gap-2 border-l-4 border-[#E5000A]"
                style={{ background: 'linear-gradient(90deg, #FFF0F0, #FFF8F8)' }}>
                <AlertTriangle size={11} className="text-[#E5000A] flex-shrink-0 mt-0.5" />
                <p className="text-[9.5px] text-slate-600 leading-relaxed">
                  <span className="text-[#E5000A] font-bold">Fraud Warning:</span>{' '}
                  Never pay to personal accounts. Bank in Japan only.{' '}
                  <a href="tel:+818089227375" className="text-[#0048D4] underline font-semibold">+81 80-8922-7375</a>
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
                            ? 'border-l-4 border-[#E5000A]'
                            : 'border border-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                        }`}
                        style={active ? {
                          background: 'linear-gradient(90deg, #FFF0F0, #F0F6FF)',
                          borderColor: '#E5000A',
                        } : {}}
                        data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span
                          className="text-[11px] tracking-[0.22em] uppercase font-bold"
                          style={active ? {
                            background: 'linear-gradient(90deg, #E5000A, #0048D4)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          } : {}}
                        >
                          {link.label}
                        </span>
                        {active
                          ? <span className="w-2 h-2 rounded-full bg-[#E5000A]" style={{ boxShadow: '0 0 6px rgba(229,0,10,0.7)' }} />
                          : <ChevronRight size={13} className="text-slate-300" />
                        }
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Live info strip in drawer */}
              <div
                className="mx-4 mb-3 px-3 py-2 rounded-sm flex items-center justify-between text-[9.5px] tracking-wide"
                style={{ background: 'linear-gradient(90deg, #F0F6FF, #F5F0FF)', border: '1px solid rgba(0,72,212,0.12)' }}
              >
                <span className="text-slate-500">JST <span className="font-mono font-bold text-[#0048D4]">{japanTime || '--:--:--'}</span></span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-slate-500">Stock: <span className="font-bold text-[#E5000A]">{stockCount !== null ? stockCount : '—'}</span></span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-slate-500">$1 = <span className="font-bold text-[#7B00E0]">¥162</span></span>
              </div>

              {/* Drawer footer CTAs */}
              <div className="px-4 pb-8 pt-2 border-t border-slate-100 space-y-2.5">
                <Link
                  href="/cars"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-[10.5px] tracking-[0.22em] uppercase font-bold text-white rounded-sm transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #E5000A, #CC0000)',
                    boxShadow: '0 2px 10px rgba(229,0,10,0.4)',
                  }}
                >
                  View Inventory
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-[10.5px] tracking-[0.22em] uppercase font-bold text-white rounded-sm transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #00A651, #007A3D)',
                    boxShadow: '0 2px 10px rgba(0,166,81,0.4)',
                  }}
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
