import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Ship, Globe, Award, Search } from 'lucide-react';

/* ── Search bar component ────────────────────────────────────── */
function SearchBar() {
  const [query, setQuery] = useState('');
  const [, navigate] = useLocation();

  const submit = () => {
    const q = query.trim();
    if (q) navigate(`/cars?q=${encodeURIComponent(q)}`);
    else navigate('/cars');
  };

  return (
    <div className="relative flex items-center w-full shadow-[0_4px_24px_rgba(0,0,0,0.10)] rounded-[4px] overflow-hidden border border-gray-200 focus-within:border-[#C8102E] focus-within:shadow-[0_4px_28px_rgba(200,16,46,0.15)] transition-all duration-200">
      <Search size={18} className="absolute left-4 text-gray-400 flex-shrink-0 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        placeholder="Search by make, model, or reference number…"
        className="flex-1 h-14 pl-11 pr-4 text-[15px] text-gray-800 placeholder:text-gray-400 bg-white outline-none"
      />
      <button
        onClick={submit}
        className="h-14 px-7 bg-[#C8102E] hover:bg-[#A50D25] text-white text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-150 flex items-center gap-2 flex-shrink-0"
      >
        <Search size={14} />
        Search
      </button>
    </div>
  );
}

function WhatsAppIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
import { supabase } from '@/lib/supabase';
import CarCard, { Car } from '@/components/CarCard';

/* ── Destination Countries Section ──────────────────────────── */
const DESTINATIONS = [
  { name: 'Pakistan',         flag: '🇵🇰' },
  { name: 'UAE',              flag: '🇦🇪' },
  { name: 'UK',               flag: '🇬🇧' },
  { name: 'Guyana',           flag: '🇬🇾' },
  { name: 'Jamaica',          flag: '🇯🇲' },
  { name: 'Trinidad',         flag: '🇹🇹' },
  { name: 'Barbados',         flag: '🇧🇧' },
  { name: 'Kenya',            flag: '🇰🇪' },
  { name: 'Tanzania',         flag: '🇹🇿' },
  { name: 'Ghana',            flag: '🇬🇭' },
  { name: 'Nigeria',          flag: '🇳🇬' },
  { name: 'Uganda',           flag: '🇺🇬' },
  { name: 'Russia',           flag: '🇷🇺' },
  { name: 'New Zealand',      flag: '🇳🇿' },
  { name: 'Papua New Guinea', flag: '🇵🇬' },
  { name: 'Germany',          flag: '🇩🇪' },
  { name: 'Georgia',          flag: '🇬🇪' },
  { name: 'South Africa',     flag: '🇿🇦' },
  { name: 'Australia',        flag: '🇦🇺' },
  { name: 'Canada',           flag: '🇨🇦' },
];

function DestinationCountriesSection() {
  const [, navigate] = useLocation();
  // Duplicate list so the marquee loops seamlessly
  const track = [...DESTINATIONS, ...DESTINATIONS];

  return (
    <section className="bg-[#0A0A0A] py-12 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section heading */}
      <div className="text-center mb-8 px-4">
        <p className="text-[10px] tracking-[0.28em] uppercase font-bold text-[#C8102E] mb-2">
          We Ship To
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
          Select Your Destination Country
        </h2>
      </div>

      {/* Scrolling track */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }} />

        <div className="flex marquee-track gap-4 px-4" style={{ width: 'max-content' }}>
          {track.map(({ name, flag }, i) => (
            <button
              key={`${name}-${i}`}
              onClick={() => navigate(`/cars?destination=${encodeURIComponent(name)}`)}
              className="group flex-shrink-0 flex flex-col items-center justify-center gap-2 w-28 py-5 px-3 rounded-[6px] border border-white/10 bg-white/5 hover:bg-[#C8102E] hover:border-[#C8102E] transition-all duration-200 cursor-pointer"
            >
              <span className="text-4xl leading-none select-none">{flag}</span>
              <span className="text-[11px] font-bold text-white tracking-wide text-center leading-tight">
                {name}
              </span>
              <span className="text-[9px] tracking-[0.18em] uppercase text-white/40 group-hover:text-white/70 font-semibold transition-colors">
                STOCK
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Animated count-up hook ──────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || target === 0) return;
    let raf: number;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return { value, ref };
}

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [newArrivals, setNewArrivals]   = useState<Car[]>([]);
  const [loading, setLoading]           = useState(true);
  const [stockCount, setStockCount]     = useState(0);

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waMessage = encodeURIComponent('Hello, I am interested in purchasing a Japanese used car from Wazir Trading LLC.');
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  useEffect(() => {
    async function fetchAll() {
      try {
        const [featuredRes, newArrivalsRes, countRes] = await Promise.all([
          supabase.from('cars').select('*').eq('is_featured', true).eq('status', 'available').limit(6),
          supabase.from('cars').select('*').eq('is_new_arrival', true).eq('status', 'available').limit(6),
          supabase.from('cars').select('id', { count: 'exact', head: true }).eq('status', 'available'),
        ]);
        if (featuredRes.data)      setFeaturedCars(featuredRes.data);
        if (newArrivalsRes.data)   setNewArrivals(newArrivalsRes.data);
        if (countRes.count !== null) setStockCount(countRes.count);
      } catch (err) {
        console.error('Failed to fetch', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  /* ── Per-stat count-up refs (called at top level) ── */
  const stock    = useCountUp(stockCount,   1800);
  const countries = useCountUp(130,         2000);
  const years    = useCountUp(5,            1400);
  const verified = useCountUp(100,          2200);

  const STATS = [
    { countObj: stock,    suffix: '+', label: 'Cars in Stock',      note: 'Live from Japan' },
    { countObj: countries,suffix: '+', label: 'Countries Served',   note: 'Global exports' },
    { countObj: years,    suffix: '+', label: 'Years Experience',    note: 'Established team' },
    { countObj: verified, suffix: '%', label: 'Auction Verified',   note: 'Every vehicle' },
  ];

  const TRUST = [
    { text: 'Bank to Bank TT Payment' },
    { text: 'Bill of Lading Guaranteed' },
    { text: 'Japan Export License' },
    { text: 'Live Auction Access' },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0A0A]">

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=85&w=2400&auto=format&fit=crop"
            alt="Premium Japanese cars"
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layer cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Subtle red glow bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[300px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(200,16,46,0.18) 0%, transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 w-full pt-[152px] pb-16 flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-7"
          >
            <span
              className="px-4 py-1.5 text-[10px] tracking-[0.28em] uppercase font-bold rounded-full border"
              style={{
                color: '#F87171',
                borderColor: 'rgba(200,16,46,0.5)',
                background: 'rgba(200,16,46,0.12)',
                backdropFilter: 'blur(8px)',
              }}
            >
              ● Direct from Japan Auctions
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="font-serif font-bold text-white leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            Japanese Used Cars —<br className="hidden sm:block" />
            <span style={{ color: '#F87171' }}>Exported Worldwide</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36 }}
            className="text-white/70 font-light leading-relaxed mb-10 max-w-xl"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}
          >
            Browse thousands of quality-graded Japanese vehicles sourced directly from
            auction halls in Japan — exported to{' '}
            <span className="text-white font-medium">130+ countries</span>{' '}
            at the best auction prices. No middlemen.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48 }}
            className="flex flex-col sm:flex-row justify-center gap-3 mb-14 w-full sm:w-auto"
          >
            <Link
              href="/cars"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-bold tracking-wide text-white rounded-[3px] transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #C8102E 0%, #A50D25 100%)',
                boxShadow: '0 4px 20px rgba(200,16,46,0.45)',
                fontSize: '0.875rem',
                letterSpacing: '0.12em',
              }}
            >
              Browse Cars
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 font-semibold rounded-[3px] border border-white/25 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-200 backdrop-blur-sm"
              style={{ fontSize: '0.875rem', letterSpacing: '0.12em' }}
            >
              <WhatsAppIcon size={15} className="text-[#25D366]" />
              Contact on WhatsApp
            </a>
          </motion.div>

          {/* ── STATS ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-[4px] overflow-hidden mb-8 w-full max-w-2xl"
          >
            {STATS.map(({ countObj, suffix, label, note }, i) => (
              <div
                key={i}
                ref={countObj.ref}
                className="flex flex-col items-center justify-center px-4 py-5 bg-black/40 backdrop-blur-sm text-center"
              >
                <span className="font-serif font-bold leading-none mb-1" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: i === 0 ? '#F87171' : 'white' }}>
                  {countObj.value}{suffix}
                </span>
                <span className="text-[11px] font-semibold text-white/80 tracking-wide uppercase mb-0.5">{label}</span>
                <span className="text-[9px] text-white/40 tracking-widest uppercase">{note}</span>
              </div>
            ))}
          </motion.div>

          {/* ── TRUST BADGES ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.78 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {TRUST.map(({ text }, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide text-white/75 border border-white/15 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <CheckCircle2 size={11} className="text-[#4ade80] flex-shrink-0" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      </section>

      {/* ── SEARCH SECTION ────────────────────────────────────────── */}
      <section className="bg-white py-10 border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          {/* Search bar */}
          <SearchBar />

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-5">
            {[
              { label: 'Under $2,000',   href: '/cars?maxPrice=2000' },
              { label: 'SUV & 4WD',      href: '/cars?body=SUV' },
              { label: 'Right Hand Drive', href: '/cars?steering=Right' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-600 hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-red-50 transition-all duration-150"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] opacity-60" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATION COUNTRIES ─────────────────────────────────── */}
      <DestinationCountriesSection />

      {/* Featured Cars Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Inventory</h2>
              <p className="text-muted-foreground max-w-2xl">Hand-selected vehicles from our current stock in Japan, ready for immediate export.</p>
            </div>
            <Link href="/cars" className="hidden md:flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
              View All Cars <ArrowRight className="ml-1" size={16} />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="h-96 bg-muted animate-pulse border border-border" />)}
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredCars.map(car => (
                <motion.div key={car.id} variants={fadeIn} className="h-full">
                  <CarCard car={car} />
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="mt-10 md:hidden flex justify-center">
            <Link href="/cars" className="text-primary font-medium border-b border-primary pb-1 flex items-center">
              View All Cars <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">The Wazir Trading Advantage</h2>
            <p className="text-white/70">We bring transparency, quality, and luxury to the global used car export market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck size={32} />, title: "Verified Quality", desc: "Every vehicle undergoes strict Japanese auction grading and inspection before purchase." },
              { icon: <Award size={32} />, title: "Premium Sourcing", desc: "We focus on high-grade, well-maintained vehicles rather than budget alternatives." },
              { icon: <Ship size={32} />, title: "Global Logistics", desc: "Complete shipping solutions from Japan to your local port with full documentation." },
              { icon: <Globe size={32} />, title: "Direct Access", desc: "Buy directly from Japan without the markup of local importers and dealerships." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors"
              >
                <div className="text-primary mb-6">{feature.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">New Arrivals</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground">Fresh stock from Japanese auctions, updated weekly.</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="h-96 bg-muted animate-pulse border border-border" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newArrivals.slice(0, 3).map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/cars" className="inline-block border border-primary text-primary px-8 py-3 font-medium hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-widest text-sm">
              View Entire Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "10k+", label: "Vehicles Exported" },
              { value: "35+", label: "Countries Served" },
              { value: "99%", label: "Satisfaction Rate" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-white relative">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 max-w-2xl mx-auto">Ready to Import Your Dream Vehicle?</h2>
          <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg">Contact our Japan office today to discuss your requirements, request a quote, or source a specific vehicle from auction.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-8 py-4 font-medium flex items-center justify-center hover:bg-primary/90 transition-colors">
              <WhatsAppIcon size={18} className="mr-2 text-white" /> Chat on WhatsApp
            </a>
            <Link href="/contact" className="bg-transparent border border-white/30 px-8 py-4 font-medium flex items-center justify-center hover:bg-white/10 transition-colors">
              Send an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
