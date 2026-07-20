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
  { name: 'Pakistan',         code: 'pk' },
  { name: 'UAE',              code: 'ae' },
  { name: 'United Kingdom',   code: 'gb' },
  { name: 'Guyana',           code: 'gy' },
  { name: 'Jamaica',          code: 'jm' },
  { name: 'Trinidad',         code: 'tt' },
  { name: 'Barbados',         code: 'bb' },
  { name: 'Kenya',            code: 'ke' },
  { name: 'Tanzania',         code: 'tz' },
  { name: 'Ghana',            code: 'gh' },
  { name: 'Nigeria',          code: 'ng' },
  { name: 'Uganda',           code: 'ug' },
  { name: 'Russia',           code: 'ru' },
  { name: 'New Zealand',      code: 'nz' },
  { name: 'Papua New Guinea', code: 'pg' },
  { name: 'Germany',          code: 'de' },
  { name: 'Georgia',          code: 'ge' },
  { name: 'South Africa',     code: 'za' },
  { name: 'Australia',        code: 'au' },
  { name: 'Canada',           code: 'ca' },
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
          animation: marquee-scroll 36s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .dest-flag {
          display: block;
          width: 72px;
          height: 48px;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .dest-card:hover .dest-flag {
          transform: scale(1.06);
          box-shadow: 0 4px 16px rgba(200,16,46,0.35);
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
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A0A0A 30%, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A0A0A 30%, transparent)' }} />

        <div className="flex marquee-track gap-4 px-4" style={{ width: 'max-content' }}>
          {track.map(({ name, code }, i) => (
            <button
              key={`${code}-${i}`}
              onClick={() => navigate(`/cars?destination=${encodeURIComponent(name)}`)}
              className="dest-card group flex-shrink-0 flex flex-col items-center gap-3 w-[108px] py-5 px-3 rounded-[8px] border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C8102E]/60 transition-all duration-200 cursor-pointer"
            >
              {/* Real country flag from flagcdn.com */}
              <div className="overflow-hidden rounded-[4px] flex-shrink-0"
                style={{ width: 72, height: 48, boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                <img
                  src={`https://flagcdn.com/w80/${code}.png`}
                  srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
                  alt={`${name} flag`}
                  className="dest-flag"
                  loading="lazy"
                  width={72}
                  height={48}
                />
              </div>

              <span className="text-[11px] font-bold text-white/90 tracking-wide text-center leading-tight">
                {name}
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#C8102E]/60 group-hover:text-[#C8102E] font-bold transition-colors">
                STOCK
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Shop By Make Section ────────────────────────────────────── */
const BRANDS = [
  { name: 'Toyota',     slug: 'toyota',     accent: '#EB0A1E' },
  { name: 'Nissan',     slug: 'nissan',     accent: '#C3002F' },
  { name: 'Honda',      slug: 'honda',      accent: '#CC0000' },
  { name: 'Mazda',      slug: 'mazda',      accent: '#1E3A8A' },
  { name: 'Mitsubishi', slug: 'mitsubishi', accent: '#E60012' },
  { name: 'Suzuki',     slug: 'suzuki',     accent: '#1B5CCC' },
  { name: 'Daihatsu',   slug: 'daihatsu',   accent: '#005BAC' },
  { name: 'Subaru',     slug: 'subaru',     accent: '#0033A1' },
  { name: 'Lexus',      slug: 'lexus',      accent: '#1A1A1A' },
  { name: 'Isuzu',      slug: 'isuzu',      accent: '#D40000' },
  { name: 'Audi',       slug: 'audi',       accent: '#BB0A14' },
  { name: 'BMW',        slug: 'bmw',        accent: '#0066B1' },
  { name: 'Mercedes',   slug: 'mercedes',   accent: '#666666' },
  { name: 'Volkswagen', slug: 'volkswagen', accent: '#001E50' },
  { name: 'Land Rover', slug: 'landrover',  accent: '#005A2B' },
];

function BrandLogo({ slug, name, accent }: { slug: string; name: string; accent: string }) {
  const [failed, setFailed] = React.useState(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const src = `${base}/logos/${slug}.svg`;
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  if (failed) {
    return (
      <div
        className="flex items-center justify-center w-full h-full rounded-[6px] font-black text-lg tracking-tight text-white select-none"
        style={{ background: accent }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
      className="w-full h-full object-contain p-1"
      loading="lazy"
      style={{
        // Tint monochrome Simple Icons SVGs to brand accent colour
        filter: `brightness(0) saturate(100%) ${accentToFilter(accent)}`,
      }}
    />
  );
}

/**
 * Converts a hex colour to the nearest CSS filter chain so a black SVG
 * can be tinted to that colour via `brightness(0) saturate(100%) <filter>`.
 * Values are pre-computed per brand accent to avoid runtime math.
 */
function accentToFilter(hex: string): string {
  const map: Record<string, string> = {
    '#EB0A1E': 'invert(15%) sepia(99%) saturate(5000%) hue-rotate(349deg) brightness(95%)',   // Toyota red
    '#C3002F': 'invert(10%) sepia(95%) saturate(4000%) hue-rotate(340deg) brightness(90%)',   // Nissan red
    '#CC0000': 'invert(12%) sepia(100%) saturate(5000%) hue-rotate(350deg) brightness(92%)',  // Honda red
    '#1E3A8A': 'invert(16%) sepia(80%) saturate(1500%) hue-rotate(210deg) brightness(85%)',   // Mazda blue
    '#E60012': 'invert(12%) sepia(99%) saturate(6000%) hue-rotate(348deg) brightness(95%)',   // Mitsubishi red
    '#1B5CCC': 'invert(28%) sepia(74%) saturate(900%) hue-rotate(200deg) brightness(90%)',    // Suzuki blue
    '#005BAC': 'invert(22%) sepia(90%) saturate(700%) hue-rotate(200deg) brightness(85%)',    // Daihatsu blue
    '#0033A1': 'invert(18%) sepia(80%) saturate(1200%) hue-rotate(215deg) brightness(80%)',   // Subaru blue
    '#1A1A1A': 'invert(0%) brightness(15%)',                                                    // Lexus near-black
    '#D40000': 'invert(12%) sepia(100%) saturate(5500%) hue-rotate(350deg) brightness(90%)',  // Isuzu red
    '#BB0A14': 'invert(13%) sepia(98%) saturate(3500%) hue-rotate(348deg) brightness(88%)',   // Audi red
    '#0066B1': 'invert(24%) sepia(88%) saturate(700%) hue-rotate(195deg) brightness(90%)',    // BMW blue
    '#666666': 'invert(40%) brightness(60%)',                                                   // Mercedes grey
    '#001E50': 'invert(8%) sepia(80%) saturate(2000%) hue-rotate(220deg) brightness(70%)',    // VW navy
    '#005A2B': 'invert(18%) sepia(80%) saturate(700%) hue-rotate(130deg) brightness(75%)',    // Land Rover green
  };
  return map[hex] ?? 'invert(20%)';
}

function ShopByMakeSection() {
  const [, navigate] = useLocation();
  const [makeCounts, setMakeCounts] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    supabase
      .from('cars')
      .select('make')
      .eq('status', 'available')
      .then(({ data }) => {
        if (!data) return;
        const counts: Record<string, number> = {};
        for (const row of data) {
          if (row.make) counts[row.make] = (counts[row.make] ?? 0) + 1;
        }
        setMakeCounts(counts);
      });
  }, []);

  // Duplicate for seamless loop
  const track = [...BRANDS, ...BRANDS];

  return (
    <section className="bg-white border-b border-gray-100 py-12 overflow-hidden">
      <style>{`
        @keyframes brand-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brand-track {
          animation: brand-scroll 40s linear infinite;
          will-change: transform;
        }
        .brand-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Heading */}
      <div className="text-center mb-8 px-4">
        <p className="text-[10px] tracking-[0.28em] uppercase font-bold text-[#C8102E] mb-2">
          Browse By Brand
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
          Shop By Make
        </h2>
      </div>

      {/* Scrolling row */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div className="flex brand-track gap-4 px-4" style={{ width: 'max-content' }}>
          {track.map(({ name, slug, accent }, i) => {
            const count = makeCounts[name] ?? 0;
            return (
              <button
                key={`${name}-${i}`}
                onClick={() => navigate(`/cars?make=${encodeURIComponent(name)}`)}
                className="group flex-shrink-0 flex flex-col items-center gap-3 w-[120px] py-5 px-3 rounded-[8px] border border-gray-200 bg-white hover:border-[#C8102E] hover:shadow-[0_4px_20px_rgba(200,16,46,0.12)] transition-all duration-200 cursor-pointer"
              >
                {/* Logo box */}
                <div className="w-14 h-14 flex items-center justify-center rounded-[6px] overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                  <BrandLogo slug={slug} name={name} accent={accent} />
                </div>

                {/* Brand name */}
                <span className="text-[12px] font-bold text-gray-800 group-hover:text-[#C8102E] tracking-wide text-center leading-tight transition-colors">
                  {name}
                </span>

                {/* Live car count */}
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: count > 0 ? '#C8102E' : '#9CA3AF' }}>
                  {count > 0 ? `${count} car${count !== 1 ? 's' : ''}` : 'On Request'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Shop By Body Type ───────────────────────────────────────── */
const BODY_TYPES = [
  { name: 'Sedan',         accent: '#3B82F6', bg: '#EFF6FF' },
  { name: 'Hatchback',     accent: '#10B981', bg: '#ECFDF5' },
  { name: 'SUV',           accent: '#F97316', bg: '#FFF7ED' },
  { name: 'Station Wagon', accent: '#8B5CF6', bg: '#F5F3FF' },
  { name: 'Van',           accent: '#06B6D4', bg: '#ECFEFF' },
  { name: 'Mini Van',      accent: '#F59E0B', bg: '#FFFBEB' },
  { name: 'Truck',         accent: '#EF4444', bg: '#FEF2F2' },
  { name: 'Bus',           accent: '#6366F1', bg: '#EEF2FF' },
  { name: 'MPV',           accent: '#EC4899', bg: '#FDF2F8' },
  { name: 'Pickup Truck',  accent: '#84CC16', bg: '#F7FEE7' },
  { name: 'Coupe',         accent: '#14B8A6', bg: '#F0FDFA' },
  { name: 'Convertible',   accent: '#F43F5E', bg: '#FFF1F2' },
];

// All silhouettes share viewBox="0 0 120 52", profile facing right.
// Wheel centres: left cx=25 cy=44 r=8, right at cx/cy per-car.
function CarSilhouette({ type, color: c }: { type: string; color: string }) {
  const vb = '0 0 120 52';
  const w  = { fill: c };
  const mkWheels = (lx: number, rx: number, cy = 44) => (
    <>
      <circle cx={lx} cy={cy} r={8}   fill="#fff" stroke={c} strokeWidth="1.5"/>
      <circle cx={lx} cy={cy} r={3}   fill={c}/>
      <circle cx={rx} cy={cy} r={8}   fill="#fff" stroke={c} strokeWidth="1.5"/>
      <circle cx={rx} cy={cy} r={3}   fill={c}/>
    </>
  );

  switch (type) {
    /* 3-box notchback — distinct trunk step at rear */
    case 'Sedan':
      return <svg viewBox={vb} width={84} height={36} aria-label="Sedan">
        <path {...w} d="M 8,36 L 8,30 L 20,30 Q 26,20 36,14 L 76,14 L 84,20 L 86,30 L 112,30 L 112,36 Z"/>
        {mkWheels(25, 95)}
      </svg>;

    /* 2-box — rear hatch sweeps steeply straight to bumper */
    case 'Hatchback':
      return <svg viewBox={vb} width={84} height={36} aria-label="Hatchback">
        <path {...w} d="M 12,36 L 12,30 L 24,30 Q 28,20 36,14 L 76,14 Q 82,26 84,36 Z"/>
        {mkWheels(26, 72)}
      </svg>;

    /* Tall, boxy, high ground clearance */
    case 'SUV':
      return <svg viewBox={vb} width={84} height={36} aria-label="SUV">
        <path {...w} d="M 6,38 L 6,22 L 18,22 Q 24,10 34,9 L 82,9 Q 92,10 96,22 L 114,22 L 114,38 Z"/>
        {mkWheels(25, 95, 46)}
      </svg>;

    /* Long flat roof extending straight to the tailgate */
    case 'Station Wagon':
      return <svg viewBox={vb} width={84} height={36} aria-label="Station Wagon">
        <path {...w} d="M 6,36 L 6,30 L 18,30 Q 24,20 32,14 L 92,14 L 92,30 L 114,30 L 114,36 Z"/>
        {mkWheels(23, 97)}
      </svg>;

    /* Tall flat-sided box van */
    case 'Van':
      return <svg viewBox={vb} width={84} height={36} aria-label="Van">
        <path {...w} d="M 8,38 L 8,8 Q 8,6 12,6 L 108,6 Q 112,6 112,8 L 112,38 Z"/>
        {mkWheels(25, 95, 46)}
      </svg>;

    /* Rounded people-carrier profile */
    case 'Mini Van':
      return <svg viewBox={vb} width={84} height={36} aria-label="Mini Van">
        <path {...w} d="M 10,36 L 10,28 Q 14,13 26,12 L 88,12 Q 100,13 102,28 L 112,28 L 112,36 Z"/>
        {mkWheels(27, 93)}
      </svg>;

    /* Cab-over rigid truck — tall flat-nose cab + low flat bed */
    case 'Truck':
      return <svg viewBox={vb} width={84} height={36} aria-label="Truck">
        <path {...w} d="M 6,36 L 6,10 L 52,10 L 52,28 L 114,28 L 114,36 Z"/>
        {mkWheels(25, 95)}
      </svg>;

    /* Long tall rectangular bus */
    case 'Bus':
      return <svg viewBox={vb} width={84} height={36} aria-label="Bus">
        <path {...w} d="M 2,38 Q 2,6 10,6 L 110,6 Q 118,6 118,10 L 118,38 Z"/>
        {mkWheels(20, 100, 46)}
      </svg>;

    /* Multi-Purpose Vehicle — taller & aerodynamic, curved nose */
    case 'MPV':
      return <svg viewBox={vb} width={84} height={36} aria-label="MPV">
        <path {...w} d="M 8,36 L 8,26 Q 16,12 30,11 L 82,11 Q 96,12 102,24 L 106,30 L 112,30 L 112,36 Z"/>
        {mkWheels(26, 94)}
      </svg>;

    /* Pickup — shaped cab + open flatbed (no lid) */
    case 'Pickup Truck':
      return <svg viewBox={vb} width={84} height={36} aria-label="Pickup Truck">
        <path {...w} d="M 8,36 L 8,26 Q 12,14 22,13 L 58,13 Q 64,18 66,26 L 66,36 Z"/>
        <path {...w} d="M 68,28 L 68,36 L 112,36 L 112,28 Z"/>
        {mkWheels(25, 98)}
      </svg>;

    /* Sporty fastback — long hood, low sweeping roofline */
    case 'Coupe':
      return <svg viewBox={vb} width={84} height={36} aria-label="Coupe">
        <path {...w} d="M 6,36 L 6,30 L 12,30 Q 20,22 30,16 L 72,16 Q 84,22 94,30 L 114,30 L 114,36 Z"/>
        {mkWheels(25, 95)}
      </svg>;

    /* Convertible — open top, visible windshield post & door sill */
    case 'Convertible':
      return <svg viewBox={vb} width={84} height={36} aria-label="Convertible">
        {/* lower body / sill */}
        <path {...w} d="M 6,36 L 6,30 L 114,30 L 114,36 Z"/>
        {/* windshield post + header line (open top) */}
        <path {...w} d="M 22,30 Q 26,22 34,18 L 40,18 L 40,30 Z"/>
        {/* rear deck + post */}
        <path {...w} d="M 80,30 L 80,18 L 86,18 Q 94,22 96,30 Z"/>
        {/* bumpers */}
        <rect {...w} x={6}   y={30} width={10} height={4} rx={1}/>
        <rect {...w} x={104} y={30} width={10} height={4} rx={1}/>
        {mkWheels(25, 95)}
      </svg>;

    default:
      return <svg viewBox={vb} width={84} height={36}>
        <rect fill={c} x="8" y="18" width="104" height="18" rx="3"/>
        {mkWheels(25, 95)}
      </svg>;
  }
}

function ShopByBodyTypeSection() {
  const [, navigate] = useLocation();
  const track = [...BODY_TYPES, ...BODY_TYPES];

  return (
    <section className="bg-gray-50 border-b border-gray-100 py-12 overflow-hidden">
      <style>{`
        @keyframes body-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .body-track {
          animation: body-scroll 45s linear infinite;
          will-change: transform;
        }
        .body-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Heading */}
      <div className="text-center mb-8 px-4">
        <p className="text-[10px] tracking-[0.28em] uppercase font-bold text-[#C8102E] mb-2">
          Browse By Style
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
          Shop by Vehicle Body Type
        </h2>
      </div>

      {/* Scrolling row */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} />

        <div className="flex body-track gap-4 px-4" style={{ width: 'max-content' }}>
          {track.map(({ name, accent, bg }, i) => (
            <button
              key={`${name}-${i}`}
              onClick={() => navigate(`/cars?body=${encodeURIComponent(name)}`)}
              className="group flex-shrink-0 flex flex-col items-center gap-3 w-[138px] py-5 px-3 rounded-[10px] bg-white transition-all duration-200 cursor-pointer"
              style={{
                border: `1.5px solid ${accent}33`,
                boxShadow: `0 2px 8px ${accent}0d`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.border = `1.5px solid ${accent}`;
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 20px ${accent}30`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.border = `1.5px solid ${accent}33`;
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 2px 8px ${accent}0d`;
              }}
            >
              {/* Icon box */}
              <div
                className="w-full h-[64px] flex items-center justify-center rounded-[6px]"
                style={{ backgroundColor: bg }}
              >
                <CarSilhouette type={name} color={accent} />
              </div>

              {/* Body type name */}
              <span
                className="text-[12px] font-bold tracking-wide text-center leading-tight"
                style={{ color: accent }}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Shop By Price Range ─────────────────────────────────────── */
const PRICE_RANGES = [
  { label: '$500 – $1,500',    min: 500,  max: 1500  },
  { label: '$1,500 – $2,000',  min: 1500, max: 2000  },
  { label: '$2,000 – $2,500',  min: 2000, max: 2500  },
  { label: '$2,500 – $3,000',  min: 2500, max: 3000  },
  { label: '$3,000 – $3,500',  min: 3000, max: 3500  },
  { label: '$3,500 – $4,000',  min: 3500, max: 4000  },
  { label: '$4,000 – $4,500',  min: 4000, max: 4500  },
  { label: '$4,500 – $5,000',  min: 4500, max: 5000  },
  { label: '$5,000 – $6,000',  min: 5000, max: 6000  },
  { label: '$6,000 – $7,000',  min: 6000, max: 7000  },
  { label: '$7,000 – $8,000',  min: 7000, max: 8000  },
  { label: '$8,000 – $9,000',  min: 8000, max: 9000  },
  { label: '$9,000 – $10,000', min: 9000, max: 10000 },
] as const;

function PriceRangeCard({ label, min, max }: { label: string; min: number; max: number }) {
  const [hov, setHov] = React.useState(false);
  return (
    <Link
      href={`/cars?minPrice=${min}&maxPrice=${max}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '10px',
        width:          '172px',
        padding:        '20px 14px',
        borderRadius:   '14px',
        background:     hov ? '#1C0608' : '#161616',
        border:         `1px solid ${hov ? 'rgba(200,16,46,0.55)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow:      hov
          ? '0 12px 40px rgba(200,16,46,0.22), inset 0 1px 0 rgba(200,16,46,0.15)'
          : '0 2px 12px rgba(0,0,0,0.35)',
        transform:      hov ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition:     'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor:         'pointer',
        textDecoration: 'none',
      }}
    >
      {/* Dollar circle */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        background: hov ? 'rgba(200,16,46,0.2)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hov ? 'rgba(200,16,46,0.4)' : 'rgba(255,255,255,0.09)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.22s',
        flexShrink: 0,
      }}>
        <span style={{ color: hov ? '#C8102E' : '#555', fontSize: 15, fontWeight: 800, lineHeight: 1 }}>$</span>
      </div>

      {/* Range label */}
      <span style={{
        color:      hov ? '#fff' : 'rgba(255,255,255,0.6)',
        fontSize:   13,
        fontWeight: 600,
        textAlign:  'center',
        lineHeight: 1.35,
        letterSpacing: '0.01em',
        transition: 'color 0.2s',
      }}>
        {label}
      </span>

      {/* Browse CTA */}
      <div style={{
        display:    'flex',
        alignItems: 'center',
        gap:        4,
        fontSize:   9,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: hov ? '#C8102E' : 'rgba(255,255,255,0.18)',
        transition: 'color 0.2s',
      }}>
        Browse
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </Link>
  );
}

function ShopByBudgetSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#0D0D0D' }}>
      {/* Ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,16,46,0.07) 0%, transparent 70%)',
      }}/>
      {/* Top edge line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(200,16,46,0.5), transparent)' }}/>

      {/* Centered heading */}
      <div className="text-center mb-14 px-4 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(200,16,46,0.6))' }}/>
          <p className="text-[10px] tracking-[0.32em] uppercase font-bold text-[#C8102E]">FOB Japan</p>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, rgba(200,16,46,0.6))' }}/>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
          Shop by Price Range
        </h2>
        <p className="text-white/35 text-sm">
          All prices are Free-On-Board Japan — export-ready
        </p>
      </div>

      {/* Price-range card grid — centered with flex-wrap */}
      <div className="relative z-10 flex justify-center px-4">
        <div className="flex flex-wrap justify-center gap-3" style={{ maxWidth: 1100 }}>
          {PRICE_RANGES.map(({ label, min, max }) => (
            <PriceRangeCard key={label} label={label} min={min} max={max} />
          ))}
        </div>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(200,16,46,0.3), transparent)' }}/>
    </section>
  );
}

/* ── Featured Collection ─────────────────────────────────────── */
// PKR/USD rate — update this constant when the rate changes
const PKR_PER_USD = 278;

type FcCar = {
  id: string;
  ref_number: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  engine_cc?: number;
  fob_price_usd: number;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  fuel_type?: string;
  body_type?: string;
  status?: string;
  [key: string]: unknown;
};

const FC_TABS = [
  { id: 'arrivals', label: 'New Arrivals' },
  { id: 'featured', label: 'Featured'     },
  { id: 'hybrid',   label: 'Hybrid'       },
  { id: 'suv',      label: 'SUV'          },
  { id: 'budget',   label: 'Budget'       },
] as const;

type FcTabId = typeof FC_TABS[number]['id'];

async function fetchFcCars(tab: FcTabId): Promise<FcCar[]> {
  let q = supabase.from('cars').select('*');
  if (tab === 'arrivals') {
    q = q.order('created_at', { ascending: false }).limit(10);
  } else if (tab === 'featured') {
    q = q.eq('is_featured', true).limit(10);
  } else if (tab === 'hybrid') {
    q = q.ilike('fuel_type', '%hybrid%').limit(10);
  } else if (tab === 'suv') {
    q = q.ilike('body_type', '%suv%').limit(10);
  } else if (tab === 'budget') {
    q = q.lt('fob_price_usd', 2000).order('fob_price_usd', { ascending: true }).limit(10);
  }
  const { data } = await q;
  return (data ?? []) as FcCar[];
}

async function fetchCarImages(ids: string[]): Promise<Record<string, string>> {
  if (!ids.length) return {};
  const { data } = await supabase
    .from('car_images')
    .select('*')
    .in('car_id', ids);
  if (!data) return {};
  // Build map: car_id → first image URL found
  const map: Record<string, string> = {};
  for (const row of data as Record<string, unknown>[]) {
    const cid = String(row.car_id ?? '');
    if (!cid || map[cid]) continue; // keep first (lowest position)
    const url = String(row.image_url ?? row.url ?? row.src ?? '');
    if (url) map[cid] = url;
  }
  return map;
}

function FcCarCard({ car, imgMap, waNumber, navigate }: {
  car: FcCar;
  imgMap: Record<string, string>;
  waNumber: string;
  navigate: (to: string) => void;
}) {
  const [hov, setHov] = React.useState(false);
  const primaryImg = imgMap[car.id] ?? null;
  const pkrPrice   = Math.round(car.fob_price_usd * PKR_PER_USD).toLocaleString('en-PK');
  const waMsg      = encodeURIComponent(
    `Hi Wazir Trading, I'm interested in the ${car.year} ${car.make} ${car.model}${car.variant ? ' ' + car.variant : ''} (Ref: ${car.ref_number}). Please share details and availability.`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink:   0,
        width:        '272px',
        borderRadius: '16px',
        overflow:     'hidden',
        background:   '#fff',
        border:       `1px solid ${hov ? 'rgba(200,16,46,0.28)' : '#E8ECF0'}`,
        boxShadow:    hov
          ? '0 16px 48px rgba(0,0,0,0.14), 0 4px 16px rgba(200,16,46,0.08)'
          : '0 2px 12px rgba(0,0,0,0.06)',
        transform:    hov ? 'translateY(-4px)' : 'translateY(0)',
        transition:   'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor:       'default',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16/10', background: '#F3F4F6', overflow: 'hidden' }}>
        {/* Gradient overlay at bottom */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)',
        }}/>

        {/* Year badge */}
        <span style={{
          position: 'absolute', top: 10, left: 10, zIndex: 2,
          background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)',
          color: '#fff', fontSize: 10, fontWeight: 700,
          padding: '3px 8px', borderRadius: 6, letterSpacing: '0.06em',
        }}>
          {car.year}
        </span>

        {/* CC badge */}
        {car.engine_cc && (
          <span style={{
            position: 'absolute', top: 10, right: 10, zIndex: 2,
            background: 'rgba(200,16,46,0.88)', backdropFilter: 'blur(6px)',
            color: '#fff', fontSize: 10, fontWeight: 700,
            padding: '3px 8px', borderRadius: 6, letterSpacing: '0.06em',
          }}>
            {car.engine_cc} cc
          </span>
        )}

        {/* Ref number over image bottom */}
        <span style={{
          position: 'absolute', bottom: 8, left: 10, zIndex: 2,
          color: 'rgba(255,255,255,0.65)', fontSize: 9, fontFamily: 'monospace',
          letterSpacing: '0.1em', fontWeight: 600,
        }}>
          {car.ref_number}
        </span>

        {primaryImg ? (
          <img
            src={primaryImg}
            alt={`${car.make} ${car.model}`}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hov ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.6s ease',
            }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2F7 100%)',
          }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.2">
              <rect x="1" y="3" width="22" height="16" rx="2.5"/>
              <path d="M1 9h22M7 3v6"/>
              <circle cx="12" cy="17" r="2"/>
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Make + Model */}
        <div>
          <h3 style={{
            fontWeight: 700, color: '#111827', fontSize: 13.5,
            lineHeight: 1.3, margin: 0,
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          }}>
            {car.make} {car.model}{car.variant ? ` ${car.variant}` : ''}
          </h3>
        </div>

        {/* Price block */}
        <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 10 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, marginBottom: 2 }}>
            FOB Price · Japan
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', lineHeight: 1, letterSpacing: '-0.02em' }}>
            ${car.fob_price_usd.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#C8102E', marginTop: 3 }}>
            ≈ PKR {pkrPrice}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8, paddingTop: 2 }}>
          <button
            onClick={() => navigate(`/cars/${car.ref_number}`)}
            style={{
              flex: 1, padding: '8px 0', borderRadius: 9,
              background: hov ? '#A50D25' : '#C8102E',
              color: '#fff', fontSize: 11, fontWeight: 700,
              border: 'none', cursor: 'pointer', transition: 'background 0.2s',
              letterSpacing: '0.03em',
            }}
          >
            Inquire Now
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            style={{
              width: 36, height: 36, flexShrink: 0, borderRadius: 9,
              background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#128C7E')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#25D366')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function FeaturedCollectionSection() {
  const [, navigate] = useLocation();

  const [activeTab, setActiveTab] = React.useState<FcTabId>('arrivals');
  const [cars, setCars]           = React.useState<FcCar[]>([]);
  const [imgMap, setImgMap]       = React.useState<Record<string, string>>({});
  const [loading, setLoading]     = React.useState(true);
  const cache = React.useRef<Partial<Record<FcTabId, { cars: FcCar[]; imgs: Record<string, string> }>>>({});

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';

  const loadTab = React.useCallback(async (tab: FcTabId) => {
    if (cache.current[tab]) {
      const hit = cache.current[tab]!;
      setCars(hit.cars);
      setImgMap(hit.imgs);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetched = await fetchFcCars(tab);
    const ids     = fetched.map(c => c.id);
    const imgs    = await fetchCarImages(ids);
    cache.current[tab] = { cars: fetched, imgs };
    setCars(fetched);
    setImgMap(imgs);
    setLoading(false);
  }, []);

  React.useEffect(() => { loadTab(activeTab); }, [activeTab, loadTab]);

  // Duplicate for seamless marquee loop
  const track = cars.length > 0 ? [...cars, ...cars] : [];
  const animDuration = Math.max(cars.length * 5, 24);

  return (
    <section className="py-16 relative overflow-hidden" style={{ background: '#FAFBFC' }}>
      <style>{`
        @keyframes fc-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .fc-track {
          animation: fc-scroll var(--fc-dur, 30s) linear infinite;
          will-change: transform;
        }
        .fc-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Subtle top border accent */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(200,16,46,0.3) 30%, rgba(200,16,46,0.3) 70%, transparent 100%)' }}/>

      {/* ── Centered header ── */}
      <div className="text-center px-4 mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C8102E)' }}/>
          <p className="text-[10px] tracking-[0.32em] uppercase font-bold text-[#C8102E]">Handpicked for You</p>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, #C8102E)' }}/>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
          Featured Collection
        </h2>
        <p className="text-gray-400 text-sm mb-4">Premium vehicles sourced directly from Japan</p>
        {/* Trust badges */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Quality Guaranteed
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-semibold">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Best Price
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Export Ready
          </span>
        </div>
      </div>

      {/* ── Promo Banners (centered, max-width) ── */}
      <div className="px-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #C8102E 0%, #8B0A1E 100%)', boxShadow: '0 8px 32px rgba(200,16,46,0.2)' }}>
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <div>
              <div className="font-bold text-white text-sm leading-tight">Best Deals Available</div>
              <div className="text-white/65 text-xs mt-0.5">Instant quotes · Expert advice</div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </div>
            <div>
              <div className="font-bold text-white text-sm leading-tight">
                <span style={{ color: '#FBBF24' }}>20% Bulk Discount</span>
              </div>
              <div className="text-white/50 text-xs mt-0.5">Buy 5+ vehicles · Wholesale pricing</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter Tabs (centered) ── */}
      <div className="flex justify-center gap-2 flex-wrap px-4 mb-8">
        {FC_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="cursor-pointer transition-all duration-200"
            style={activeTab === tab.id ? {
              padding: '7px 20px', borderRadius: 999,
              background: '#C8102E', color: '#fff',
              border: '1px solid #C8102E',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
              boxShadow: '0 4px 16px rgba(200,16,46,0.35)',
            } : {
              padding: '7px 20px', borderRadius: 999,
              background: '#fff', color: '#64748B',
              border: '1px solid #E2E8F0',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Scrolling card track ── */}
      {loading ? (
        /* Skeleton row */
        <div className="flex gap-5 px-6 overflow-hidden justify-center">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex-shrink-0 w-[272px] rounded-2xl bg-gray-100 animate-pulse" style={{ height: 380 }}/>
          ))}
        </div>
      ) : cars.length === 0 ? (
        /* Empty state */
        <div className="mx-auto max-w-sm flex flex-col items-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5">
              <rect x="1" y="3" width="22" height="16" rx="2.5"/>
              <path d="M1 9h22M7 3v6"/>
              <circle cx="12" cy="17" r="2"/>
            </svg>
          </div>
          <h3 className="font-serif font-bold text-lg text-gray-700 mb-1">No cars in this category</h3>
          <p className="text-gray-400 text-sm">
            Check back soon or{' '}
            <Link href="/cars" className="text-[#C8102E] font-medium hover:underline">browse all stock</Link>.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #FAFBFC, transparent)' }}/>
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #FAFBFC, transparent)' }}/>

          {/* Marquee track — key forces animation restart on tab change */}
          <div key={activeTab} className="overflow-hidden">
            <div
              className="fc-track flex gap-5 py-3 px-4"
              style={{ width: 'max-content', '--fc-dur': `${animDuration}s` } as React.CSSProperties}
            >
              {track.map((car, i) => (
                <FcCarCard
                  key={`${car.id}-${i}`}
                  car={car}
                  imgMap={imgMap}
                  waNumber={waNumber}
                  navigate={navigate}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── See More button (centered below scroll) ── */}
      {!loading && cars.length > 0 && (
        <div className="flex justify-center mt-8">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #C8102E 0%, #9B0D23 100%)',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(200,16,46,0.3)',
              letterSpacing: '0.03em',
            }}
          >
            See More Cars
            <ArrowRight size={15}/>
          </Link>
        </div>
      )}
    </section>
  );
}

/* ── Animated count-up hook ──────────────────────────────────── */
/* ── How To Buy ──────────────────────────────────────────────── */
const HOW_TO_BUY_STEPS = [
  {
    number: '01',
    title: 'Select and Estimate',
    description: 'Browse our stock and choose your vehicle. Use our Total Price Calculator to estimate the full C&F cost to your destination port.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Get Proforma Invoice',
    description: 'Place an inquiry or click Inquire Now to reserve the car. We send you an official proforma invoice with our Japan bank account details.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Telegraphic Transfer',
    description: 'Wire your payment directly to our official Wazir Trading bank account in Japan only. Upload your bank payment receipt to confirm.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Customs and Port Pickup',
    description: 'We arrange immediate vessel shipment from Yokohama port and send you the original Bill of Lading to clear your car at destination port.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"/><path d="m6 17-3.13-3.13A4 4 0 0 1 2 12.82V11a2 2 0 0 1 2-2h7"/><path d="M10 9h12v3.79a2 2 0 0 1-.59 1.42L19 17.42V17a2 2 0 0 0-2-2h-1"/><path d="M14 9V5a2 2 0 0 0-2-2h-1"/>
      </svg>
    ),
  },
] as const;

function HowToBuySection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#fff' }}>
      {/* Subtle background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(#C8102E 1px, transparent 1px), linear-gradient(90deg, #C8102E 1px, transparent 1px)', backgroundSize: '48px 48px' }}/>

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* ── Centered heading ── */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C8102E)' }}/>
            <p className="text-[10px] tracking-[0.32em] uppercase font-bold text-[#C8102E]">Simple Process</p>
            <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, #C8102E)' }}/>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            How to Buy Japanese Cars<br className="hidden sm:block"/> from Wazir Trading
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
            Follow these 4 simple steps to import your dream car directly from Japan
          </p>
        </div>

        {/* ── Step cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {HOW_TO_BUY_STEPS.map((step, idx) => (
            <div key={step.number} className="relative flex flex-col">
              {/* Connector line between cards (desktop only) */}
              {idx < HOW_TO_BUY_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-[38px] left-[calc(100%+1px)] w-6 z-10"
                  style={{ height: 2, background: 'linear-gradient(to right, #C8102E40, #C8102E15)' }}/>
              )}

              <div
                className="flex flex-col h-full rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#FAFBFC',
                  border: '1px solid #EEF2F7',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,16,46,0.3)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow   = '0 12px 40px rgba(200,16,46,0.1), 0 2px 12px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#EEF2F7';
                  (e.currentTarget as HTMLDivElement).style.boxShadow   = '0 2px 12px rgba(0,0,0,0.05)';
                }}
              >
                {/* Step number + icon row */}
                <div className="flex items-start justify-between mb-5">
                  {/* Large step number */}
                  <span className="font-serif font-black leading-none select-none"
                    style={{ fontSize: 52, color: '#F1F5F9', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {step.number}
                  </span>
                  {/* Icon circle */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ background: 'rgba(200,16,46,0.08)', color: '#C8102E' }}>
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {step.description}
                </p>

                {/* Bottom accent bar */}
                <div className="mt-5 h-0.5 rounded-full w-8 transition-all duration-300 group-hover:w-full"
                  style={{ background: 'linear-gradient(to right, #C8102E, #E8425A)' }}/>
              </div>
            </div>
          ))}
        </div>

        {/* ── Warning note ── */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex gap-3 px-5 py-4 rounded-xl"
            style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <span className="text-lg flex-shrink-0 mt-0.5">⚠️</span>
            <p className="text-amber-800 text-sm leading-relaxed">
              <span className="font-bold">Always verify our Japan bank account details before making any payment.</span>
              {' '}We never accept payments to personal accounts or agents outside Japan.
            </p>
          </div>
        </div>

        {/* ── CTA button ── */}
        <div className="flex justify-center">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            style={{
              background:  'linear-gradient(135deg, #C8102E 0%, #9B0D23 100%)',
              boxShadow:   '0 4px 20px rgba(200,16,46,0.35)',
              letterSpacing: '0.03em',
            }}
          >
            Browse Available Cars
            <ArrowRight size={15}/>
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ── Can't Find Your Car ─────────────────────────────────────── */
const SHIP_TO_COUNTRIES = [
  'Pakistan','UAE','UK','Guyana','Jamaica','Trinidad',
  'Kenya','Ghana','Nigeria','Russia','New Zealand',
  'Papua New Guinea','Germany','Tanzania','Uganda',
  'South Africa','Australia',
] as const;

const CFYC_BENEFITS = [
  'Access to 100,000+ Japanese auction vehicles',
  'Best auction price guaranteed',
  'We source any make and model',
  'Response within 24 hours on WhatsApp',
] as const;

type CfycForm = {
  full_name: string;
  email: string;
  phone: string;
  destination_country: string;
  vehicle_model: string;
  budget_usd: string;
  requirements: string;
};

const CFYC_EMPTY: CfycForm = {
  full_name: '', email: '', phone: '', destination_country: '',
  vehicle_model: '', budget_usd: '', requirements: '',
};

function CantFindCarSection() {
  const [form, setForm]         = React.useState<CfycForm>(CFYC_EMPTY);
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess]   = React.useState(false);
  const [error, setError]       = React.useState('');

  const waNumber = '818089227375';
  const email    = 'wazirtrading-pc@outlook.jp';

  const set = (k: keyof CfycForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.destination_country || !form.vehicle_model) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const { error: dbErr } = await supabase.from('inquiries').insert([{
        full_name:          form.full_name,
        email:              form.email,
        phone:              form.phone,
        destination_country:form.destination_country,
        vehicle_model:      form.vehicle_model,
        budget_usd:         form.budget_usd ? Number(form.budget_usd) : null,
        requirements:       form.requirements,
        inquiry_type:       'custom-request',
      }]);
      if (dbErr) throw dbErr;

      // Open WhatsApp with pre-filled message
      const waMsg = encodeURIComponent(
        `New car request from ${form.full_name}. Looking for ${form.vehicle_model}` +
        `${form.budget_usd ? ` with budget ${form.budget_usd}` : ''}. ` +
        `Destination: ${form.destination_country}. Contact: ${form.phone}`
      );
      window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');

      setSuccess(true);
      setForm(CFYC_EMPTY);
    } catch {
      setError('Something went wrong. Please try again or contact us directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  /* shared input style */
  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1px solid #E2E8F0', background: '#fff',
    fontSize: 13.5, color: '#1E293B', outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxSizing: 'border-box',
  };
  const label: React.CSSProperties = {
    display: 'block', fontSize: 11.5, fontWeight: 700,
    color: '#64748B', letterSpacing: '0.06em',
    textTransform: 'uppercase', marginBottom: 5,
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#F8FAFC' }}>
      {/* Subtle top accent */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(200,16,46,0.35) 30%, rgba(200,16,46,0.35) 70%, transparent 100%)' }}/>

      <div className="container mx-auto px-4 md:px-8">

        {/* ── Centered heading ── */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C8102E)' }}/>
            <p className="text-[10px] tracking-[0.32em] uppercase font-bold text-[#C8102E]">Custom Sourcing</p>
            <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, #C8102E)' }}/>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            Can't Find Your Car?
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Submit your requirements below and our global sourcing desk will search Japanese auto auctions to find your exact vehicle.
          </p>
        </div>

        {/* ── Two-column layout: form + sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* ── Form (2/3 width) ── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden"
              style={{ background: '#fff', border: '1px solid #E8ECF4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

              {/* Form header bar */}
              <div className="px-7 py-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(200,16,46,0.1)', color: '#C8102E' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Vehicle Request Form</div>
                  <div className="text-xs text-gray-400">We'll search Japan auctions and reply within 24 hours</div>
                </div>
              </div>

              {success ? (
                /* Success state */
                <div className="px-7 py-14 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'rgba(16,185,129,0.1)' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">Request Submitted!</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Thank you! We will search our Japanese auction network and contact you within 24 hours on WhatsApp.
                  </p>
                  <button onClick={() => setSuccess(false)}
                    className="mt-6 px-6 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer"
                    style={{ background: '#C8102E' }}>
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-7 py-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Full Name */}
                    <div>
                      <label style={label}>Full Name <span style={{ color: '#C8102E' }}>*</span></label>
                      <input type="text" value={form.full_name} onChange={set('full_name')}
                        placeholder="e.g. Ahmed Khan" style={inp} required
                        onFocus={e => { e.target.style.borderColor = '#C8102E'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)'; }}
                        onBlur={e  => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={label}>Email Address <span style={{ color: '#C8102E' }}>*</span></label>
                      <input type="email" value={form.email} onChange={set('email')}
                        placeholder="e.g. ahmed@email.com" style={inp} required
                        onFocus={e => { e.target.style.borderColor = '#C8102E'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)'; }}
                        onBlur={e  => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={label}>Contact Number (WhatsApp) <span style={{ color: '#C8102E' }}>*</span></label>
                      <input type="tel" value={form.phone} onChange={set('phone')}
                        placeholder="e.g. +92 300 1234567" style={inp} required
                        onFocus={e => { e.target.style.borderColor = '#C8102E'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)'; }}
                        onBlur={e  => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Destination Country */}
                    <div>
                      <label style={label}>Destination Country <span style={{ color: '#C8102E' }}>*</span></label>
                      <div className="relative">
                        <select value={form.destination_country} onChange={set('destination_country')} required
                          style={{ ...inp, appearance: 'none', paddingRight: 36,
                            color: form.destination_country ? '#1E293B' : '#94A3B8' }}
                          onFocus={e => { e.target.style.borderColor = '#C8102E'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)'; }}
                          onBlur={e  => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                        >
                          <option value="" disabled>Select country…</option>
                          {SHIP_TO_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>

                    {/* Vehicle Model */}
                    <div>
                      <label style={label}>Vehicle Model &amp; Year <span style={{ color: '#C8102E' }}>*</span></label>
                      <input type="text" value={form.vehicle_model} onChange={set('vehicle_model')}
                        placeholder="e.g. Toyota RAV4 2019" style={inp} required
                        onFocus={e => { e.target.style.borderColor = '#C8102E'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)'; }}
                        onBlur={e  => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Budget */}
                    <div>
                      <label style={label}>Target Budget (USD)</label>
                      <input type="number" value={form.budget_usd} onChange={set('budget_usd')}
                        placeholder="e.g. 5000" min={0} style={inp}
                        onFocus={e => { e.target.style.borderColor = '#C8102E'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)'; }}
                        onBlur={e  => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Requirements — full width */}
                    <div className="sm:col-span-2">
                      <label style={label}>Specific Requirements</label>
                      <textarea value={form.requirements} onChange={set('requirements')}
                        placeholder="Any specific color, mileage, features, grade or other requirements?"
                        rows={4}
                        style={{ ...inp, resize: 'vertical', minHeight: 100 }}
                        onFocus={e => { e.target.style.borderColor = '#C8102E'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.1)'; }}
                        onBlur={e  => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Error message */}
                    {error && (
                      <div className="sm:col-span-2 flex items-start gap-2 px-4 py-3 rounded-xl text-sm"
                        style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {error}
                      </div>
                    )}

                    {/* Submit */}
                    <div className="sm:col-span-2">
                      <button type="submit" disabled={submitting}
                        className="w-full py-3.5 rounded-xl font-bold text-white text-sm cursor-pointer transition-all duration-200"
                        style={{
                          background:    submitting ? '#999' : 'linear-gradient(135deg, #C8102E 0%, #9B0D23 100%)',
                          boxShadow:     submitting ? 'none' : '0 4px 20px rgba(200,16,46,0.35)',
                          letterSpacing: '0.04em',
                          border: 'none',
                        }}
                        onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(200,16,46,0.45)'; }}
                        onMouseLeave={e => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(200,16,46,0.35)'; }}
                      >
                        {submitting ? 'Sending Request…' : 'Send Request'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ── Sidebar (1/3 width) ── */}
          <div className="flex flex-col gap-5">

            {/* Why Request Through Us */}
            <div className="rounded-2xl p-6"
              style={{ background: 'linear-gradient(160deg, #1A0608 0%, #0F172A 100%)', border: '1px solid rgba(200,16,46,0.2)' }}>
              <h3 className="font-serif font-bold text-white text-lg mb-5">
                Why Request Through Us?
              </h3>
              <ul className="flex flex-col gap-3.5">
                {CFYC_BENEFITS.map(b => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(200,16,46,0.2)', border: '1px solid rgba(200,16,46,0.4)' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact directly */}
            <div className="rounded-2xl p-6"
              style={{ background: '#fff', border: '1px solid #E8ECF4', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <h3 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wider">Contact Us Directly</h3>
              <div className="flex flex-col gap-3">
                {/* WhatsApp */}
                <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl transition-colors"
                  style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#DCFCE7')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#F0FDF4')}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#25D366' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">WhatsApp</div>
                    <div className="text-sm font-bold text-gray-900">+81 80-8922-7375</div>
                  </div>
                </a>

                {/* Email */}
                <a href={`mailto:${email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl transition-colors"
                  style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#DBEAFE')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#EFF6FF')}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: '#3B82F6' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Email</div>
                    <div className="text-sm font-bold text-gray-900" style={{ wordBreak: 'break-all' }}>{email}</div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust Badges ────────────────────────────────────────────── */
const TRUST_ITEMS = [
  {
    title: 'JUMVEA Member',
    description: 'Approved Japan Exporter Code',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    title: 'Japan Car Trust',
    description: 'Genuine Odometer Guarantee',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: 'Secure Wire Transfer',
    description: 'Official Japan Bank Account Only',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: '100% Insured Delivery',
    description: 'Full Marine Transit Coverage',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
] as const;

function TrustBadgesSection() {
  return (
    <section className="py-14 relative" style={{ background: '#fff' }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(200,16,46,0.2) 30%, rgba(200,16,46,0.2) 70%, transparent 100%)' }}/>

      <div className="container mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C8102E)' }}/>
            <p className="text-[10px] tracking-[0.32em] uppercase font-bold text-[#C8102E]">Trusted Worldwide</p>
            <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, #C8102E)' }}/>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            Why Thousands of Global Buyers<br className="hidden sm:block"/> Choose Wazir Trading
          </h2>
        </div>

        {/* Items row */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch">
          {TRUST_ITEMS.map((item, idx) => (
            <React.Fragment key={item.title}>
              {/* Vertical divider (between items) */}
              {idx > 0 && (
                <div className="hidden sm:block w-px self-stretch mx-2"
                  style={{ background: 'linear-gradient(to bottom, transparent, #E2E8F0 30%, #E2E8F0 70%, transparent)' }}/>
              )}
              {/* Horizontal divider on mobile */}
              {idx > 0 && (
                <div className="block sm:hidden h-px my-4 mx-6"
                  style={{ background: 'linear-gradient(to right, transparent, #E2E8F0 30%, #E2E8F0 70%, transparent)' }}/>
              )}

              <div className="flex-1 flex flex-col items-center text-center px-6 py-4 group">
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(200,16,46,0.07)', color: '#C8102E' }}>
                  {item.icon}
                </div>
                <div className="font-bold text-gray-900 text-[15px] mb-1">{item.title}</div>
                <div className="text-gray-400 text-[13px] leading-snug">{item.description}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(200,16,46,0.2) 30%, rgba(200,16,46,0.2) 70%, transparent 100%)' }}/>
    </section>
  );
}

/* ── Customer Reviews ────────────────────────────────────────── */
const REVIEWS = [
  {
    name:    'Muhammad Asif',
    country: 'Pakistan 🇵🇰',
    rating:  5,
    text:    'Excellent service from Wazir Trading. My Toyota Aqua arrived in perfect condition. The whole process was smooth and transparent. Highly recommended for anyone importing from Japan.',
  },
  {
    name:    'James Thompson',
    country: 'Guyana 🇬🇾',
    rating:  5,
    text:    'Very professional company. They found exactly the car I wanted within my budget. Communication was excellent throughout the entire shipping process.',
  },
  {
    name:    'David Osei',
    country: 'Ghana 🇬🇭',
    rating:  5,
    text:    'Best Japanese car exporter I have dealt with. Quality vehicles at great prices. My Nissan Note arrived on time and exactly as described. Will buy again.',
  },
  {
    name:    'Sarah Williams',
    country: 'UK 🇬🇧',
    rating:  5,
    text:    'Wazir Trading made importing a Japanese car to UK very easy. They handled all the paperwork and kept me updated at every step.',
  },
] as const;

const REVIEW_STATS = [
  { value: '500+',  label: 'Happy Customers' },
  { value: '5.0',   label: 'Star Average Rating' },
  { value: '100%',  label: 'Satisfaction Rate' },
] as const;

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < count ? '#F59E0B' : 'none'}
          stroke={i < count ? '#F59E0B' : '#D1D5DB'}
          strokeWidth="1.8">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}

function CustomerReviewsSection() {
  const [active, setActive]     = React.useState(0);
  const [paused, setPaused]     = React.useState(false);
  const timerRef                = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const perPage  = 2;
  const maxIndex = Math.ceil(REVIEWS.length / perPage) - 1; // 0..1 for 4 reviews/2 per page

  const prev = () => setActive(a => Math.max(a - 1, 0));
  const next = () => setActive(a => Math.min(a + 1, maxIndex));

  React.useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive(a => (a >= maxIndex ? 0 : a + 1));
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, maxIndex]);

  const visible = REVIEWS.slice(active * perPage, active * perPage + perPage);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#F8FAFC' }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(200,16,46,0.25) 30%, rgba(200,16,46,0.25) 70%, transparent 100%)' }}/>

      <div className="container mx-auto px-4 md:px-8">

        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C8102E)' }}/>
            <p className="text-[10px] tracking-[0.32em] uppercase font-bold text-[#C8102E]">Customer Stories</p>
            <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, #C8102E)' }}/>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            What Our Happy Customers Say
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Join thousands of satisfied car importers who chose Wazir Trading for quality and reliability
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
          {REVIEW_STATS.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-black text-gray-900 leading-none" style={{ letterSpacing: '-0.03em' }}>
                {s.value}
              </span>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>

          {/* Nav — prev */}
          <button
            onClick={prev} disabled={active === 0}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: active === 0 ? '#F1F5F9' : '#fff',
              border:     '1px solid #E2E8F0',
              boxShadow:  active === 0 ? 'none' : '0 2px 12px rgba(0,0,0,0.1)',
              color:      active === 0 ? '#CBD5E1' : '#374151',
            }}
            aria-label="Previous reviews"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Nav — next */}
          <button
            onClick={next} disabled={active === maxIndex}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: active === maxIndex ? '#F1F5F9' : '#C8102E',
              border:     '1px solid transparent',
              boxShadow:  active === maxIndex ? 'none' : '0 4px 16px rgba(200,16,46,0.3)',
              color:      '#fff',
            }}
            aria-label="Next reviews"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-1">
            {visible.map(review => (
              <div key={review.name}
                className="flex flex-col rounded-2xl p-6 transition-all duration-300"
                style={{
                  background:  '#fff',
                  border:      '1px solid #EEF2F7',
                  boxShadow:   '0 4px 20px rgba(0,0,0,0.06)',
                }}>

                {/* Quote mark */}
                <div className="text-5xl leading-none font-serif mb-2 select-none" style={{ color: 'rgba(200,16,46,0.15)', lineHeight: 1 }}>
                  "
                </div>

                {/* Review text */}
                <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-5">
                  {review.text}
                </p>

                {/* Stars */}
                <StarRow count={review.rating} />

                {/* Divider */}
                <div className="my-4 h-px" style={{ background: '#F1F5F9' }}/>

                {/* Reviewer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar placeholder */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #C8102E 0%, #9B0D23 100%)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm leading-tight">{review.name}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{review.country}</div>
                    </div>
                  </div>

                  {/* Verified badge */}
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
                    style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300 rounded-full cursor-pointer border-0"
              style={{
                width:      i === active ? 24 : 8,
                height:     8,
                background: i === active ? '#C8102E' : '#D1D5DB',
                padding:    0,
              }}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Best Sellers ────────────────────────────────────────────── */
function BestSellersSection() {
  type Car = import('@/components/CarCard').Car;
  const [, navigate] = useLocation();
  const [cars, setCars]       = React.useState<Car[]>([]);
  const [imgMap, setImgMap]   = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(true);
  const [liked, setLiked]     = React.useState<Record<string, boolean>>({});

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';

  React.useEffect(() => {
    supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(12)
      .then(async ({ data }) => {
        if (!data) { setLoading(false); return; }
        const ids = data.map((c: Car) => c.id);
        const { data: imgs } = await supabase
          .from('car_images')
          .select('*')
          .in('car_id', ids);
        const map: Record<string, string> = {};
        for (const row of (imgs ?? []) as Record<string, unknown>[]) {
          const cid = String(row.car_id ?? '');
          if (!cid || map[cid]) continue;
          const url = String(row.image_url ?? row.url ?? row.src ?? '');
          if (url) map[cid] = url;
        }
        setCars(data as Car[]);
        setImgMap(map);
        setLoading(false);
      });
  }, []);

  const toggleLike = (id: string) =>
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="py-20 relative" style={{ background: '#fff' }}>
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(200,16,46,0.3) 30%, rgba(200,16,46,0.3) 70%, transparent 100%)' }}/>

      <div className="container mx-auto px-4 md:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C8102E)' }}/>
            <p className="text-[10px] tracking-[0.32em] uppercase font-bold text-[#C8102E]">Top Picks</p>
            <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, #C8102E)' }}/>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">Best Sellers</h2>
          <p className="text-gray-400 text-sm md:text-base">Our most popular vehicles exported worldwide</p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse" style={{ height: 380 }}/>
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No cars available right now.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cars.map(car => {
              const img       = imgMap[car.id] ?? null;
              const pkrPrice  = Math.round(car.fob_price_usd * PKR_PER_USD).toLocaleString('en-PK');
              const isSold    = car.status === 'sold';
              const isNew     = !!car.is_new_arrival;
              const isLiked   = !!liked[car.id];
              const waMsg     = encodeURIComponent(
                `Hi Wazir Trading, I'm interested in the ${car.year} ${car.make} ${car.model}` +
                `${car.variant ? ' ' + car.variant : ''} (Ref: ${car.ref_number}). Please share details and availability.`
              );
              const waLink = `https://wa.me/${waNumber}?text=${waMsg}`;

              return (
                <div key={car.id}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ border: '1px solid #EEF2F7', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>

                  {/* ── Image area ── */}
                  <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '4/3' }}>
                    {img ? (
                      <img src={img} alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2F7 100%)' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.2">
                          <rect x="1" y="3" width="22" height="16" rx="2.5"/>
                          <path d="M1 9h22M7 3v6"/><circle cx="12" cy="17" r="2"/>
                        </svg>
                      </div>
                    )}

                    {/* Sold overlay */}
                    {isSold && (
                      <div className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.45)' }}>
                        <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase text-white"
                          style={{ background: '#16A34A', letterSpacing: '0.18em' }}>Sold</span>
                      </div>
                    )}

                    {/* New Arrival badge */}
                    {isNew && !isSold && (
                      <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ background: '#16A34A' }}>
                        New Arrival
                      </span>
                    )}

                    {/* Year badge (only if no New Arrival badge) */}
                    {!isNew && (
                      <span className="absolute top-2.5 left-2.5 z-10 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm tracking-wider">
                        {car.year}
                      </span>
                    )}

                    {/* Year badge alongside New Arrival */}
                    {isNew && (
                      <span className="absolute top-2.5 left-[calc(theme(spacing.2)+4.5rem)] z-10 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm tracking-wider hidden">
                        {car.year}
                      </span>
                    )}

                    {/* Engine CC badge */}
                    {car.engine_cc && (
                      <span className="absolute top-2.5 right-10 z-10 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm tracking-wider"
                        style={{ background: 'rgba(200,16,46,0.88)' }}>
                        {car.engine_cc} cc
                      </span>
                    )}

                    {/* Heart / favourite */}
                    <button
                      onClick={() => toggleLike(car.id)}
                      className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer border-0"
                      style={{
                        background: isLiked ? '#C8102E' : 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
                      }}
                      aria-label="Save to favourites"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24"
                        fill={isLiked ? 'white' : 'none'}
                        stroke={isLiked ? 'white' : '#9CA3AF'}
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-col flex-1 p-4 gap-2.5">
                    {/* Make + Model */}
                    <div>
                      <h3 className="font-bold text-gray-900 text-[13.5px] leading-snug line-clamp-1">
                        {car.make} {car.model}{car.variant ? ` ${car.variant}` : ''}
                      </h3>
                      <p className="text-[10px] font-mono text-gray-400 mt-0.5 tracking-wider">{car.ref_number}</p>
                    </div>

                    {/* Price */}
                    <div className="flex-1">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-semibold">FOB Price · Japan</p>
                      <p className="text-[20px] font-extrabold leading-tight tracking-tight" style={{ color: '#C8102E' }}>
                        ${car.fob_price_usd.toLocaleString()}
                      </p>
                      <p className="text-[11px] font-semibold text-gray-500">≈ PKR {pkrPrice}</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => navigate(`/cars/${car.ref_number}`)}
                        disabled={isSold}
                        className="flex-1 py-2 text-[11px] font-bold rounded-lg text-white transition-colors cursor-pointer border-0"
                        style={{ background: isSold ? '#9CA3AF' : '#C8102E' }}
                        onMouseEnter={e => { if (!isSold) (e.currentTarget as HTMLButtonElement).style.background = '#A50D25'; }}
                        onMouseLeave={e => { if (!isSold) (e.currentTarget as HTMLButtonElement).style.background = '#C8102E'; }}
                      >
                        {isSold ? 'Sold Out' : 'Inquire Now'}
                      </button>
                      <a href={waLink} target="_blank" rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg transition-colors"
                        style={{ background: '#25D366' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#128C7E')}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#25D366')}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {!loading && cars.length > 0 && (
          <div className="flex flex-col items-center mt-12 gap-3">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5"
              style={{
                background:    'linear-gradient(135deg, #C8102E 0%, #9B0D23 100%)',
                boxShadow:     '0 6px 24px rgba(200,16,46,0.35)',
                fontSize:      15,
                letterSpacing: '0.03em',
              }}
            >
              See More Cars
              <ArrowRight size={16}/>
            </Link>
            <Link href="#cant-find"
              className="text-sm text-gray-400 hover:text-[#C8102E] transition-colors"
              onClick={e => {
                e.preventDefault();
                document.querySelector('[data-section="cant-find"]')?.scrollIntoView({ behavior: 'smooth' });
              }}>
              Can't find what you need? →
            </Link>
          </div>
        )}

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

      {/* ── SHOP BY MAKE ──────────────────────────────────────────── */}
      <ShopByMakeSection />

      {/* ── SHOP BY BODY TYPE ─────────────────────────────────────── */}
      <ShopByBodyTypeSection />

      {/* ── SHOP BY BUDGET ────────────────────────────────────────── */}
      <ShopByBudgetSection />

      {/* ── FEATURED COLLECTION ───────────────────────────────────── */}
      <FeaturedCollectionSection />

      {/* ── HOW TO BUY ────────────────────────────────────────────── */}
      <HowToBuySection />

      {/* ── CAN'T FIND YOUR CAR ───────────────────────────────────── */}
      <CantFindCarSection />

      {/* ── TRUST BADGES ──────────────────────────────────────────── */}
      <TrustBadgesSection />

      {/* ── CUSTOMER REVIEWS ──────────────────────────────────────── */}
      <CustomerReviewsSection />

      {/* ── BEST SELLERS ──────────────────────────────────────────── */}
      <BestSellersSection />

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
