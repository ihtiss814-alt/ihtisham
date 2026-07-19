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
