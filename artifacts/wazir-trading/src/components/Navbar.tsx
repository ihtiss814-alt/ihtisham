import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone, MapPin, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Cars', href: '/cars' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello, I am interested in purchasing a vehicle from Wazir Trading LLC.')}`;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const onHome = location === '/';
  const transparent = onHome && !isScrolled;

  return (
    <>
      {/* Top utility bar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          transparent
            ? 'bg-[#04060f]/70 backdrop-blur-sm border-b border-white/5'
            : 'bg-[#04060f] border-b border-white/10'
        }`}
        data-testid="topbar"
      >
        <div className="container mx-auto px-4 md:px-8 h-9 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-white/45 font-light">
              <MapPin size={10} className="text-primary/60" />
              Japan Stock · Worldwide Export
            </span>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <a
              href="mailto:info@wazirtrading.com"
              className="hidden sm:flex items-center gap-1.5 text-[11px] tracking-wider text-white/40 hover:text-primary/80 transition-colors duration-200"
            >
              <Mail size={10} />
              info@wazirtrading.com
            </a>
            <span className="hidden sm:block w-px h-3 bg-white/15" />
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] tracking-wider text-white/40 hover:text-primary/80 transition-colors duration-200"
            >
              <Phone size={10} />
              +81 808 922 7375
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        className={`fixed top-9 left-0 w-full z-50 transition-all duration-500 ${
          transparent
            ? 'bg-transparent'
            : 'bg-[#070c18]/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] border-b border-white/[0.06]'
        }`}
        data-testid="navbar"
        initial={false}
      >
        {/* Gold accent line */}
        <div className={`h-px w-full transition-opacity duration-500 ${transparent ? 'opacity-0' : 'opacity-100'}`}
          style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(42 56% 55% / 0.6) 30%, hsl(42 56% 55% / 0.9) 50%, hsl(42 56% 55% / 0.6) 70%, transparent 100%)' }}
        />

        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" data-testid="link-logo">
              {/* Emblem */}
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 rounded-full border border-primary/40 group-hover:border-primary/70 transition-colors duration-300" />
                <div className="absolute inset-[3px] rounded-full border border-primary/20 group-hover:border-primary/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-primary font-bold text-lg leading-none tracking-tight">W</span>
                </div>
              </div>
              {/* Wordmark */}
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[17px] font-semibold tracking-[0.12em] uppercase text-white group-hover:text-primary/90 transition-colors duration-300">
                  Wazir Trading
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-primary/60 font-light mt-0.5">
                  Japanese Automotive Exports
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const active = link.href === '/'
                  ? location === '/'
                  : location.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 group"
                    data-testid={`link-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 ${
                      active ? 'text-primary' : 'text-white/60 group-hover:text-white'
                    }`}>
                      {link.name}
                    </span>
                    {/* Active indicator */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ${
                        active ? 'w-4 bg-primary opacity-100' : 'w-0 bg-primary/60 opacity-0 group-hover:w-4 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA area */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Inventory button */}
              <Link
                href="/cars"
                className="px-5 py-2 text-[11px] tracking-[0.18em] uppercase font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/25 rounded-sm transition-all duration-200"
                data-testid="link-nav-browse"
              >
                Browse Stock
              </Link>

              {/* WhatsApp CTA */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-sm overflow-hidden transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, hsl(42 56% 48%) 0%, hsl(42 56% 58%) 100%)' }}
                data-testid="link-whatsapp-nav"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)' }} />
                <WhatsAppIcon />
                <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[#0a0f1e] relative z-10">
                  WhatsApp
                </span>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-sm border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-all duration-200"
              data-testid="button-mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,90vw)] flex flex-col"
              style={{ background: 'linear-gradient(160deg, #0a1022 0%, #060c18 100%)' }}
            >
              {/* Drawer top bar */}
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/[0.06]">
                <div className="flex flex-col leading-none">
                  <span className="font-serif text-base font-semibold tracking-widest uppercase text-white">
                    Wazir Trading
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-primary/60 mt-0.5">
                    Japanese Automotive Exports
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-sm border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer links */}
              <div className="flex-1 overflow-y-auto py-6 px-4">
                {links.map((link, i) => {
                  const active = link.href === '/'
                    ? location === '/'
                    : location.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between w-full px-4 py-4 mb-1 rounded-sm border transition-all duration-200 ${
                          active
                            ? 'border-primary/30 bg-primary/5 text-primary'
                            : 'border-transparent hover:border-white/10 hover:bg-white/[0.03] text-white/60 hover:text-white'
                        }`}
                        data-testid={`link-mobile-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span className="text-[12px] tracking-[0.2em] uppercase font-medium">
                          {link.name}
                        </span>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer footer */}
              <div className="px-4 pb-8 pt-2 border-t border-white/[0.06] space-y-3">
                <Link
                  href="/cars"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3 border border-white/15 rounded-sm text-[11px] tracking-[0.2em] uppercase font-medium text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  Browse Inventory
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-sm text-[11px] tracking-[0.2em] uppercase font-semibold text-[#0a0f1e] transition-all"
                  style={{ background: 'linear-gradient(135deg, hsl(42 56% 48%) 0%, hsl(42 56% 60%) 100%)' }}
                  data-testid="link-mobile-whatsapp"
                >
                  <WhatsAppIcon />
                  Contact on WhatsApp
                </a>
                <p className="text-center text-[10px] tracking-wider text-white/20 uppercase pt-1">
                  Direct Japan Export Since 2010
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#0a0f1e] relative z-10">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
