import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { useReveal } from '@/hooks/useReveal';
import { ArrowRight, CheckCircle2, ShieldCheck, Ship, Globe, Award, Search, CarFront } from 'lucide-react';

function WhatsAppIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import CarCard, { Car } from '@/components/CarCard';
import { TESTIMONIALS } from '@/lib/testimonials';
import { DEST_COUNTRIES } from '@/lib/shipping';
import { useMeta } from '@/lib/use-meta';

/* ── Destination Countries Section ──────────────────────────── */
const DESTINATIONS = [
  // ── Africa ──────────────────────────────────────────────────────
  { name: 'Angola',                        code: 'ao' },
  { name: 'Botswana',                      code: 'bw' },
  { name: 'Cameroon',                      code: 'cm' },
  { name: 'Djibouti',                      code: 'dj' },
  { name: 'Ethiopia',                      code: 'et' },
  { name: 'Ghana',                         code: 'gh' },
  { name: 'Ivory Coast',                   code: 'ci' },
  { name: 'Kenya',                         code: 'ke' },
  { name: 'Madagascar',                    code: 'mg' },
  { name: 'Malawi',                        code: 'mw' },
  { name: 'Mauritius',                     code: 'mu' },
  { name: 'Mozambique',                    code: 'mz' },
  { name: 'Namibia',                       code: 'na' },
  { name: 'Nigeria',                       code: 'ng' },
  { name: 'Rwanda',                        code: 'rw' },
  { name: 'Senegal',                       code: 'sn' },
  { name: 'South Africa',                  code: 'za' },
  { name: 'South Sudan',                   code: 'ss' },
  { name: 'Tanzania',                      code: 'tz' },
  { name: 'Uganda',                        code: 'ug' },
  { name: 'Zambia',                        code: 'zm' },
  { name: 'Zimbabwe',                      code: 'zw' },
  // ── Americas ────────────────────────────────────────────────────
  { name: 'Canada',                        code: 'ca' },
  { name: 'Chile',                         code: 'cl' },
  { name: 'Colombia',                      code: 'co' },
  { name: 'Ecuador',                       code: 'ec' },
  { name: 'Guyana',                        code: 'gy' },
  { name: 'Mexico',                        code: 'mx' },
  { name: 'Panama',                        code: 'pa' },
  { name: 'Peru',                          code: 'pe' },
  { name: 'Suriname',                      code: 'sr' },
  { name: 'USA',                           code: 'us' },
  // ── Caribbean ───────────────────────────────────────────────────
  { name: 'Anguilla',                      code: 'ai' },
  { name: 'Antigua',                       code: 'ag' },
  { name: 'Aruba',                         code: 'aw' },
  { name: 'Bahamas',                       code: 'bs' },
  { name: 'Barbados',                      code: 'bb' },
  { name: 'Belize',                        code: 'bz' },
  { name: 'Bermuda',                       code: 'bm' },
  { name: 'British Virgin Islands',        code: 'vg' },
  { name: 'Cayman Islands',               code: 'ky' },
  { name: 'Cuba',                          code: 'cu' },
  { name: 'Curaçao',                       code: 'cw' },
  { name: 'Dominica',                      code: 'dm' },
  { name: 'Dominican Republic',            code: 'do' },
  { name: 'Grenada',                       code: 'gd' },
  { name: 'Guadeloupe',                    code: 'gp' },
  { name: 'Haiti',                         code: 'ht' },
  { name: 'Jamaica',                       code: 'jm' },
  { name: 'Martinique',                    code: 'mq' },
  { name: 'Montserrat',                    code: 'ms' },
  { name: 'Sint Maarten',                  code: 'sx' },
  { name: 'St Kitts',                      code: 'kn' },
  { name: 'St Lucia',                      code: 'lc' },
  { name: 'St Vincent',                    code: 'vc' },
  { name: 'Trinidad',                      code: 'tt' },
  { name: 'Turks and Caicos',              code: 'tc' },
  // ── Asia & Middle East ──────────────────────────────────────────
  { name: 'Azerbaijan',                    code: 'az' },
  { name: 'Bahrain',                       code: 'bh' },
  { name: 'Bangladesh',                    code: 'bd' },
  { name: 'Cambodia',                      code: 'kh' },
  { name: 'Georgia',                       code: 'ge' },
  { name: 'India',                         code: 'in' },
  { name: 'Iraq',                          code: 'iq' },
  { name: 'Jordan',                        code: 'jo' },
  { name: 'Kuwait',                        code: 'kw' },
  { name: 'Myanmar',                       code: 'mm' },
  { name: 'Oman',                          code: 'om' },
  { name: 'Pakistan',                      code: 'pk' },
  { name: 'Philippines',                   code: 'ph' },
  { name: 'Qatar',                         code: 'qa' },
  { name: 'Saudi Arabia',                  code: 'sa' },
  { name: 'Sri Lanka',                     code: 'lk' },
  { name: 'Thailand',                      code: 'th' },
  { name: 'UAE',                           code: 'ae' },
  { name: 'Vietnam',                       code: 'vn' },
  // ── Europe ──────────────────────────────────────────────────────
  { name: 'Belgium',                       code: 'be' },
  { name: 'Cyprus',                        code: 'cy' },
  { name: 'France',                        code: 'fr' },
  { name: 'Germany',                       code: 'de' },
  { name: 'Malta',                         code: 'mt' },
  { name: 'Netherlands',                   code: 'nl' },
  { name: 'Poland',                        code: 'pl' },
  { name: 'Russia',                        code: 'ru' },
  { name: 'UK',                             code: 'gb' },
  // ── Pacific & Oceania ───────────────────────────────────────────
  { name: 'Australia',                     code: 'au' },
  { name: 'Fiji',                          code: 'fj' },
  { name: 'New Caledonia',                 code: 'nc' },
  { name: 'New Zealand',                   code: 'nz' },
  { name: 'Papua New Guinea',              code: 'pg' },
  { name: 'Samoa',                         code: 'ws' },
  { name: 'Solomon Islands',               code: 'sb' },
  { name: 'Tonga',                         code: 'to' },
  { name: 'Vanuatu',                       code: 'vu' },
];

function FlagImg({ code, name }: { code: string; name: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    imageFailed ? (
      <div
        role="img"
        aria-label={`${name} flag`}
        className="dest-flag flex items-center justify-center select-none w-full h-full"
        style={{ background: 'rgba(255,255,255,0.06)', fontSize: 16, lineHeight: 1, letterSpacing: '0.12em' }}
      >
        {code.toUpperCase()}
      </div>
    ) : (
      <img
        src={`https://flagcdn.com/w160/${code}.png`}
        alt={`${name} flag`}
        className="dest-flag block w-full h-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={() => setImageFailed(true)}
      />
    )
  );
}

function DestinationCountriesSection() {
  const [, navigate] = useLocation();
  // Duplicate list so the marquee loops seamlessly
  const track = [...DESTINATIONS, ...DESTINATIONS];

  return (
    <section className="bg-[#0A0A0A] py-12 overflow-hidden">
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
              {/* Country flag — matched by the ISO code with emoji fallback */}
              <div className="overflow-hidden rounded-[4px] flex-shrink-0"
                style={{ width: 72, height: 48, boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                <FlagImg code={code} name={name} />
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
  { name: 'Toyota',          slug: 'toyota',     accent: '#EB0A1E' },
  { name: 'Nissan',          slug: 'nissan',     accent: '#C3002F' },
  { name: 'Honda',           slug: 'honda',      accent: '#CC0000' },
  { name: 'Mazda',           slug: 'mazda',      accent: '#1E3A8A' },
  { name: 'Mitsubishi',      slug: 'mitsubishi', accent: '#E60012' },
  { name: 'Suzuki',          slug: 'suzuki',     accent: '#1B5CCC' },
  { name: 'Daihatsu',        slug: 'daihatsu',   accent: '#005BAC' },
  { name: 'Subaru',          slug: 'subaru',     accent: '#0033A1' },
  { name: 'Lexus',           slug: 'lexus',      accent: '#1A1A1A' },
  { name: 'Isuzu',           slug: 'isuzu',      accent: '#D40000' },
  { name: 'Audi',            slug: 'audi',       accent: '#BB0A14' },
  { name: 'BMW',             slug: 'bmw',        accent: '#0066B1' },
  { name: 'Mercedes',        slug: 'mercedes',   accent: '#666666' },
  { name: 'Volkswagen',      slug: 'volkswagen', accent: '#001E50' },
  { name: 'Land Rover',      slug: 'landrover',  accent: '#005A2B' },
  { name: 'Hino',            slug: 'hino',       accent: '#A31922' },
  { name: 'Iseki',           slug: 'iseki',      accent: '#E05A00' },
  { name: 'John Deere',      slug: 'john-deere', accent: '#367C2B' },
  { name: 'Kubota',          slug: 'kubota',     accent: '#D0231E' },
  { name: 'Massey Ferguson', slug: 'massey-ferguson', accent: '#CC1011' },
  { name: 'Mametora',        slug: 'mametora',   accent: '#555555' },
  { name: 'Shibaura',        slug: 'shibaura',   accent: '#0047AB' },
  { name: 'Yanmar',          slug: 'yanmar',     accent: '#C8102E' },
];

// Keep the full catalogue above for inventory/filtering. The homepage only
// highlights the brands most visitors are looking for, so the section stays
// calm and scannable at every breakpoint.
const POPULAR_BRANDS = BRANDS.slice(0, 8);

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
      loading="eager"
      decoding="async"
      fetchPriority="high"
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
    '#A31922': 'invert(42%) sepia(100%) saturate(2877%) hue-rotate(-30deg) brightness(61%) contrast(122%)',   // Hino red
    '#E05A00': 'invert(72%) sepia(100%) saturate(3467%) hue-rotate(-360deg) brightness(73%) contrast(168%)',  // Iseki orange
    '#367C2B': 'invert(9%) sepia(100%) saturate(2991%) hue-rotate(-275deg) brightness(212%) contrast(66%)',   // John Deere green
    '#D0231E': 'invert(34%) sepia(100%) saturate(2562%) hue-rotate(339deg) brightness(77%) contrast(118%)',   // Kubota red
    '#CC1011': 'invert(44%) sepia(100%) saturate(4396%) hue-rotate(-22deg) brightness(72%) contrast(134%)',   // Massey Ferguson red
    '#555555': 'invert(92%) sepia(100%) saturate(581%) hue-rotate(-306deg) brightness(0%) contrast(33%)',     // Mametora grey
    '#0047AB': 'invert(46%) sepia(100%) saturate(665%) hue-rotate(-178deg) brightness(59%) contrast(181%)',   // Shibaura blue
    '#C8102E': 'invert(35%) sepia(100%) saturate(3398%) hue-rotate(-29deg) brightness(73%) contrast(125%)',   // Yanmar red
  };
  return map[hex] ?? 'invert(20%)';
}

function ShopByMakeSection() {
  const [, navigate] = useLocation();
  const sectionRef = React.useRef<HTMLElement>(null);
  const [makeCounts, setMakeCounts] = React.useState<Record<string, number>>({});
  const [countsLoading, setCountsLoading] = React.useState(true);
  const [countsError, setCountsError] = React.useState(false);

  // Load each displayed make's exact available count as soon as the homepage
  // mounts. Head/count queries transfer no car rows, so the inventory numbers
  // are accurate without delaying the vehicle cards or downloading the catalogue.
  React.useEffect(() => {
    if (!isSupabaseConfigured) {
      setCountsLoading(false);
      setCountsError(true);
      return;
    }
    let cancelled = false;
    Promise.all(
      POPULAR_BRANDS.map(async ({ name }) => {
        const { count, error } = await supabase
          .from('cars')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'available')
          .ilike('make', name);
        if (error) throw error;
        return [name, count ?? 0] as const;
      }),
    )
      .then(results => {
        if (cancelled) return;
        setMakeCounts(Object.fromEntries(results));
        setCountsLoading(false);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setCountsLoading(false);
        setCountsError(true);
        console.warn('Could not load homepage make counts:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
       <section ref={sectionRef} className="bg-[#F8FAFC] border-y border-gray-100 py-14 md:py-16">
      {/* Heading */}
       <div className="max-w-7xl mx-auto text-center mb-9 px-4">
        <p className="text-[10px] tracking-[0.28em] uppercase font-bold text-[#C8102E] mb-2">
          Browse By Brand
        </p>
         <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">
          Shop By Make
        </h2>
         <p className="mt-2 text-sm text-gray-500">Explore our most requested Japanese marques.</p>
      </div>

       <div className="max-w-6xl mx-auto px-4 md:px-6">
         <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
           {POPULAR_BRANDS.map(({ name, slug, accent }) => {
            const count = makeCounts[name];
            return (
              <button
                key={name}
                onClick={() => navigate(`/cars?make=${encodeURIComponent(name)}`)}
                 className="group flex min-w-0 min-h-[148px] flex-col items-center justify-between gap-2 rounded-xl border border-gray-200/90 bg-white px-3 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:-translate-y-1 hover:border-[#C8102E]/50 hover:shadow-[0_12px_28px_rgba(200,16,46,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 transition-all duration-200 cursor-pointer"
              >
                {/* Logo box */}
                 <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100 group-hover:bg-red-50 transition-colors">
                  <BrandLogo slug={slug} name={name} accent={accent} />
                </div>

                {/* Brand name */}
                <span className="text-[12px] font-bold text-gray-800 group-hover:text-[#C8102E] tracking-wide text-center leading-tight transition-colors">
                  {name}
                </span>

                {/* Live car count */}
                 <span className="min-h-[24px] text-[9px] font-semibold tracking-[0.08em] uppercase leading-4"
                  style={{ color: countsLoading ? '#9CA3AF' : count > 0 ? '#C8102E' : '#9CA3AF' }}>
                  {countsLoading
                    ? 'Loading live stock…'
                    : countsError
                      ? 'Stock unavailable'
                      : `${(count ?? 0).toLocaleString()} ${(count ?? 0) === 1 ? 'vehicle' : 'vehicles'} in stock`}
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
  { name: 'Sedan',               accent: '#3B82F6', bg: '#EFF6FF', icon: '/icons/car-bt-compact-sedan.svg' },
  { name: 'Hatchback',           accent: '#10B981', bg: '#ECFDF5', icon: '/icons/car-bt-compact-hatchback.svg' },
  { name: 'SUV',                 accent: '#F97316', bg: '#FFF7ED', icon: '/icons/car-bt-compact-suv.svg' },
  { name: 'Station Wagon',       accent: '#8B5CF6', bg: '#F5F3FF', icon: '/icons/car-bt-compact-sedan.svg' },
  { name: 'Van',                 accent: '#06B6D4', bg: '#ECFEFF', icon: '/icons/car-bt-micro-van.svg' },
  { name: 'Mini Van',            accent: '#F59E0B', bg: '#FFFBEB', icon: '/icons/car-bt-mini-vehicles.svg' },
  { name: 'Truck',               accent: '#EF4444', bg: '#FEF2F2', icon: '/icons/car-bt-single-cabin.svg' },
  { name: 'Bus',                 accent: '#6366F1', bg: '#EEF2FF', icon: '/icons/car-bt-bus.svg' },
  { name: 'MPV',                 accent: '#EC4899', bg: '#FDF2F8', icon: '/icons/car-bt-mini-vehicles.svg' },
  { name: 'Pickup Truck',        accent: '#84CC16', bg: '#F7FEE7', icon: '/icons/car-bt-double-cabin.svg' },
  { name: 'Coupe',               accent: '#14B8A6', bg: '#F0FDFA', icon: '/icons/car-bt-compact-sedan.svg' },
  { name: 'Convertible',         accent: '#F43F5E', bg: '#FFF1F2', icon: '/icons/car-bt-compact-sedan.svg' },
  { name: 'Compact Sedan',       accent: '#2563EB', bg: '#EFF6FF', icon: '/icons/car-bt-compact-sedan.svg' },
  { name: 'Compact SUV',         accent: '#EA580C', bg: '#FFF7ED', icon: '/icons/car-bt-compact-suv.svg' },
  { name: 'Compact Hatchback',   accent: '#059669', bg: '#ECFDF5', icon: '/icons/car-bt-compact-hatchback.svg' },
  { name: 'Subcompact Hatchback',accent: '#7C3AED', bg: '#F5F3FF', icon: '/icons/car-bt-subcompact-hatchback.svg' },
  { name: 'Micro Van',           accent: '#0891B2', bg: '#ECFEFF', icon: '/icons/car-bt-micro-van.svg' },
  { name: 'Mini Vehicles',       accent: '#D97706', bg: '#FFFBEB', icon: '/icons/car-bt-mini-vehicles.svg' },
  { name: 'Single Cabin',        accent: '#DC2626', bg: '#FEF2F2', icon: '/icons/car-bt-single-cabin.svg' },
  { name: 'Double Cabin',        accent: '#4F46E5', bg: '#EEF2FF', icon: '/icons/car-bt-double-cabin.svg' },
  { name: 'Off-Road Vehicles',   accent: '#16A34A', bg: '#F0FDF4', icon: '/icons/car-bt-off-road-vehicles.svg' },
];

// Keep this section focused on the body styles customers browse most often.
// The full list remains available on the cars page filters.
const POPULAR_BODY_TYPES = [
  'SUV',
  'Sedan',
  'Hatchback',
  'Van',
  'MPV',
  'Pickup Truck',
  'Station Wagon',
  'Coupe',
].map(name => BODY_TYPES.find(body => body.name === name)!);

// All silhouettes share viewBox="0 0 160 72", profile facing right.
function CarSilhouette({ type, color: c }: { type: string; color: string }) {
  const vb = '0 0 160 72';

  // Detailed wheel: dark tire + accent rim + white hub + cross spokes
  const Wheel = (cx: number, cy: number, r = 11) => {
    const ri = r * 0.55; // rim radius
    const rh = r * 0.22; // hub radius
    const rs = ri * 0.95; // spoke reach
    return (
      <g>
        <circle cx={cx} cy={cy} r={r}   fill="#1a1a2e" stroke={c} strokeWidth="1.8"/>
        <circle cx={cx} cy={cy} r={ri}  fill={c}/>
        <line x1={cx-rs} y1={cy}    x2={cx+rs} y2={cy}    stroke="rgba(255,255,255,0.75)" strokeWidth="1"/>
        <line x1={cx}    y1={cy-rs} x2={cx}    y2={cy+rs} stroke="rgba(255,255,255,0.75)" strokeWidth="1"/>
        <line x1={cx-rs*0.7} y1={cy-rs*0.7} x2={cx+rs*0.7} y2={cy+rs*0.7} stroke="rgba(255,255,255,0.45)" strokeWidth="0.8"/>
        <line x1={cx+rs*0.7} y1={cy-rs*0.7} x2={cx-rs*0.7} y2={cy+rs*0.7} stroke="rgba(255,255,255,0.45)" strokeWidth="0.8"/>
        <circle cx={cx} cy={cy} r={rh} fill="rgba(255,255,255,0.92)"/>
      </g>
    );
  };

  const win = 'rgba(255,255,255,0.82)';   // window glass
  const det = 'rgba(0,0,0,0.12)';         // door/pillar line color

  switch (type) {

    /* ── SEDAN ── */
    case 'Sedan':
      return <svg viewBox="0 0 58 43" width={96} height={44} aria-label="Sedan" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g><path fillRule="evenodd" clipRule="evenodd" d="M29.2326 38.387C15.5491 38.387 4.46516 38.4704 4.46516 38.5677C4.46516 38.6651 15.5491 38.7485 29.2326 38.7485C42.916 38.7485 54 38.6651 54 38.5677C54 38.4704 42.916 38.387 29.2326 38.387Z" fill="#878787"/></g>
        <path d="M45.6556 38.1642C43.582 38.0493 41.994 36.2752 42.1089 34.2016C42.2237 32.1279 43.9979 30.54 46.0715 30.6548C48.1452 30.7697 49.7331 32.5438 49.6182 34.6175C49.5034 36.6911 47.7293 38.279 45.6556 38.1642Z" stroke="#878787" strokeMiterlimit="10"/>
        <path d="M13.5405 30.6494C15.6014 30.6494 17.3008 32.3488 17.3008 34.4097C17.3008 36.4707 15.6014 38.17 13.5405 38.17C11.4795 38.17 9.78017 36.4707 9.78017 34.4097C9.78017 32.3488 11.4795 30.6494 13.5405 30.6494Z" stroke="#878787" strokeMiterlimit="10"/>
        <path d="M3.81381 32.5295C3.81381 32.3126 4.32 32.3126 4.32 32.1318C4.39231 30.8663 4.46463 29.4562 4.60926 28.1545C4.79004 26.5998 7.97184 26.5275 9.92431 25.9128C11.3344 25.4789 12.4553 24.5388 14.2631 23.7434C16.2156 22.8756 17.9511 22.0802 20.0121 22.0802C23.3746 22.0802 28.3643 21.6824 31.5099 22.6587C34.5109 23.5988 37.2589 25.3343 40.0791 26.6721C43.514 27.0337 47.3466 27.7206 50.8538 28.5884C51.9747 28.8777 52.4809 29.3839 52.8063 30.0708C53.1679 30.794 53.3486 31.4809 53.5294 31.9148C53.8187 31.951 53.8187 31.8787 53.891 32.0233C53.9995 32.2041 53.9272 32.421 53.9633 32.7103C53.9995 33.3249 53.9995 34.1566 53.8548 34.7351C53.7102 35.2774 53.5656 35.5305 53.3125 35.7475C53.0956 35.8921 52.8786 36.0005 52.5894 36.0367L51.3239 36.0729C50.5646 35.9282 50.7092 35.8198 50.7454 34.8797C50.7454 34.7351 50.7454 34.5904 50.7454 34.4458C50.7454 31.734 48.5759 29.5646 45.8642 29.5646C43.1524 29.5646 40.983 31.734 40.983 34.4458C40.983 34.7351 40.983 34.9882 41.0192 35.2413C41.1276 36.8683 41.2723 36.5791 39.7898 36.6514L19.2889 36.6152C18.2042 36.4706 18.2765 36.6152 18.385 35.2413C18.4212 34.9882 18.4212 34.6989 18.4212 34.4096C18.4212 31.6979 16.2518 29.5285 13.54 29.5285C10.8282 29.5285 8.65882 31.6979 8.65882 34.4096C8.65882 34.6266 8.65882 34.8797 8.69498 35.0966C8.7673 36.2175 8.47803 36.109 7.71874 36.0729C6.95945 36.0005 6.09169 35.9282 5.40471 35.8198C4.86235 35.7113 4.46463 35.6028 4.28384 35.4582C3.74149 34.952 3.81381 33.3611 3.81381 32.5295ZM25.5079 23.3818C25.7972 24.1411 25.9056 25.8405 26.0864 26.9613C26.1587 27.5037 26.3033 27.6483 26.8457 27.6483C29.0151 27.6845 34.8725 28.0822 34.8725 27.9737C35.0895 27.8653 35.9211 26.9252 36.5719 26.4551C35.1256 25.4066 33.0285 24.2496 31.1122 23.5988C30.4252 23.3818 28.6174 23.0926 27.3519 23.0564L25.7248 23.0203C25.4356 23.0203 25.3994 23.1649 25.5079 23.3818ZM14.2631 25.9851C14.3354 26.2382 14.5885 26.7082 14.7332 26.9252C14.8416 27.0698 14.9501 27.1783 15.2032 27.1783C15.854 27.2144 17.1195 27.2506 17.8788 27.2868C19.9759 27.3952 22.2176 27.5399 24.0616 27.576C24.8209 27.576 24.8571 27.7568 24.7848 27.106C24.4955 24.6473 24.4232 23.8157 24.2063 23.2372C24.1701 23.1287 23.9532 23.0564 23.8085 23.0564L20.9521 23.0926C20.0844 23.0926 19.2166 23.2733 18.3488 23.5264C18.2042 23.5626 17.9511 23.6711 17.6257 23.8157L17.1195 24.0326C16.0348 24.5388 14.6609 25.262 14.4439 25.5512C14.1908 25.732 14.1908 25.8043 14.2631 25.9851Z" fill="#F6F6F6"/>
        <path d="M51.3239 36.0729L52.5894 36.0367C52.8786 36.0005 53.0956 35.8921 53.3125 35.7475C53.5656 35.5305 53.7102 35.2774 53.8548 34.7351C53.9995 34.1566 53.9995 33.3249 53.9633 32.7103C53.9272 32.421 53.9995 32.2041 53.891 32.0233C53.8187 31.8787 53.8187 31.951 53.5294 31.9148C53.3486 31.4809 53.1679 30.794 52.8063 30.0708C52.4809 29.3839 51.9747 28.8777 50.8538 28.5884C47.3466 27.7206 43.514 27.0337 40.0791 26.6721C37.2589 25.3343 34.5109 23.5988 31.5099 22.6587C28.3643 21.6824 23.3746 22.0802 20.0121 22.0802C17.9511 22.0802 16.2156 22.8756 14.2631 23.7434C12.4553 24.5388 11.3344 25.4789 9.92431 25.9128C7.97184 26.5275 4.79004 26.5998 4.60926 28.1545C4.46463 29.4562 4.39232 30.8663 4.32001 32.1318C4.32001 32.3126 3.81381 32.3126 3.81381 32.5295C3.81381 33.3611 3.74149 34.952 4.28384 35.4582C4.46463 35.6028 4.86236 35.7113 5.40471 35.8198C6.09169 35.9282 6.95945 36.0005 7.71874 36.0729M39.7898 36.6514L19.2889 36.6152" stroke="#878787" strokeMiterlimit="10"/>
      </svg>;
    }

  return null;
}

    /* ── How To Buy (custom exact markup & styles) ─────────────────── */
    function HowToBuySection() {
      return (
        <>
          <section className="wt-process">
            <div className="wt-process-container">

              {/* HEADER */}
              <div className="wt-process-header">

                <div className="wt-process-eyebrow">
                  <span></span>
                  SIMPLE PROCESS
                  <span></span>
                </div>

                <h2>
                  How to Buy Japanese Cars
                  <br />
                  <em>from Wazir Trading</em>
                </h2>

                <p>
                  From selecting your vehicle to receiving it at your destination port,
                  we keep the entire import process simple, transparent and secure.
                </p>

              </div>


              {/* LARGE VISUAL */}
              <div className="wt-process-visual">

                <div className="wt-process-visual-image">

                  <img
                    src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=85"
                    alt="Japanese vehicle ready for export"
                  />

                  <div className="wt-process-image-overlay"></div>

                  <div className="wt-process-image-content">
                    <span>YOUR JOURNEY STARTS HERE</span>

                    <strong>
                      From Japan
                      <br />
                      to your port.
                    </strong>
                  </div>

                  <div className="wt-japan-badge">
                    <span className="wt-japan-dot"></span>
                    JAPAN EXPORT
                  </div>

                </div>


                {/* PROCESS STATS */}
                <div className="wt-process-stats">

                  <div className="wt-process-stat">
                    <strong>01</strong>
                    <span>Choose</span>
                  </div>

                  <div className="wt-process-stat-line"></div>

                  <div className="wt-process-stat">
                    <strong>02</strong>
                    <span>Reserve</span>
                  </div>

                  <div className="wt-process-stat-line"></div>

                  <div className="wt-process-stat">
                    <strong>03</strong>
                    <span>Pay</span>
                  </div>

                  <div className="wt-process-stat-line"></div>

                  <div className="wt-process-stat">
                    <strong>04</strong>
                    <span>Receive</span>
                  </div>

                </div>

              </div>


              {/* PROCESS STEPS */}
              <div className="wt-process-steps">


                {/* STEP 01 */}
                <article className="wt-step">

                  <div className="wt-step-top">

                    <div className="wt-step-number">
                      01
                    </div>

                    <div className="wt-step-icon">

                      <svg viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="6.5"></circle>
                        <path d="M16 16l4 4"></path>
                        <path d="M8.5 11h5"></path>
                        <path d="M11 8.5v5"></path>
                      </svg>

                    </div>

                  </div>

                  <div className="wt-step-content">

                    <span className="wt-step-label">
                      STEP ONE
                    </span>

                    <h3>
                      Select & Estimate
                    </h3>

                    <p>
                      Browse our available stock and choose your ideal vehicle.
                      Use our Total Price Calculator to estimate the complete
                      C&F cost to your destination port.
                    </p>

                  </div>

                  <div className="wt-step-bottom">
                    <span>Browse vehicles</span>
                    <b>01 / 04</b>
                  </div>

                </article>


                {/* CONNECTOR */}
                <div className="wt-step-connector">
                  <span></span>
                </div>


                {/* STEP 02 */}
                <article className="wt-step">

                  <div className="wt-step-top">

                    <div className="wt-step-number">
                      02
                    </div>

                    <div className="wt-step-icon">

                      <svg viewBox="0 0 24 24">
                        <path d="M6 3h9l4 4v14H6z"></path>
                        <path d="M14 3v5h5"></path>
                        <path d="M9 13h6"></path>
                        <path d="M9 17h6"></path>
                        <path d="M9 9h2"></path>
                      </svg>

                    </div>

                  </div>

                  <div className="wt-step-content">

                    <span className="wt-step-label">
                      STEP TWO
                    </span>

                    <h3>
                      Get Proforma Invoice
                    </h3>

                    <p>
                      Place an inquiry or click Inquire Now to reserve your car.
                      We send you an official proforma invoice with our Japan
                      bank account details.
                    </p>

                  </div>

                  <div className="wt-step-bottom">
                    <span>Reserve your vehicle</span>
                    <b>02 / 04</b>
                  </div>

                </article>


                {/* CONNECTOR */}
                <div className="wt-step-connector">
                  <span></span>
                </div>


                {/* STEP 03 */}
                <article className="wt-step">

                  <div className="wt-step-top">

                    <div className="wt-step-number">
                      03
                    </div>

                    <div className="wt-step-icon">

                      <svg viewBox="0 0 24 24">
                        <path d="M12 2v20"></path>
                        <path d="M17 6.5c-.8-1.2-2.4-2-4.5-2-2.8 0-4.5 1.4-4.5 3.2 0 2 1.8 2.8 4.5 3.5 2.7.7 4.5 1.5 4.5 3.5 0 1.9-1.8 3.3-4.5 3.3-2.1 0-3.8-.8-4.7-2.1"></path>
                      </svg>

                    </div>

                  </div>

                  <div className="wt-step-content">

                    <span className="wt-step-label">
                      STEP THREE
                    </span>

                    <h3>
                      Telegraphic Transfer
                    </h3>

                    <p>
                      Wire your payment directly to our official Wazir Trading
                      bank account in Japan only. Upload your payment receipt
                      to confirm the transaction.
                    </p>

                  </div>

                  <div className="wt-step-bottom">
                    <span>Secure payment</span>
                    <b>03 / 04</b>
                  </div>

                </article>


                {/* CONNECTOR */}
                <div className="wt-step-connector">
                  <span></span>
                </div>


                {/* STEP 04 */}
                <article className="wt-step">

                  <div className="wt-step-top">

                    <div className="wt-step-number">
                      04
                    </div>

                    <div className="wt-step-icon">

                      <svg viewBox="0 0 24 24">
                        <path d="M3 16h18"></path>
                        <path d="M5 16V8h9l3 4h4v4"></path>
                        <path d="M14 8v4h3"></path>
                        <circle cx="7" cy="17" r="2"></circle>
                        <circle cx="18" cy="17" r="2"></circle>
                      </svg>

                    </div>

                  </div>

                  <div className="wt-step-content">

                    <span className="wt-step-label">
                      STEP FOUR
                    </span>

                    <h3>
                      Customs & Port Pickup
                    </h3>

                    <p>
                      We arrange vessel shipment from Yokohama port and send
                      you the original Bill of Lading to help clear your vehicle
                      at the destination port.
                    </p>

                  </div>

                  <div className="wt-step-bottom">
                    <span>Receive your vehicle</span>
                    <b>04 / 04</b>
                  </div>

                </article>

              </div>


              {/* SECURITY NOTICE */}
              <div className="wt-security">

                <div className="wt-security-icon">

                  <svg viewBox="0 0 24 24">
                    <path d="M12 3l9 17H3L12 3z"></path>
                    <path d="M12 9v5"></path>
                    <circle
                      cx="12"
                      cy="17"
                      r=".7"
                      fill="currentColor"
                    ></circle>
                  </svg>

                </div>

                <div className="wt-security-text">

                  <strong>
                    Always verify our Japan bank account details before making any payment.
                  </strong>

                  <span>
                    We never accept payments to personal accounts or agents outside Japan.
                  </span>

                </div>

              </div>


              {/* CTA */}
              <div className="wt-process-cta">

                <div className="wt-cta-copy">

                  <span>
                    READY TO START?
                  </span>

                  <h3>
                    Find your next Japanese vehicle.
                  </h3>

                </div>

                <a href="/cars" className="wt-cta-button">

                  Browse Available Cars

                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h13"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>

                </a>

              </div>

            </div>

          </section>

          <style>{`
    /* =====================================================
       MAIN SECTION
    ===================================================== */

    .wt-process {
      --wt-navy: #071a33;
      --wt-red: #d7193f;
      --wt-blue: #2b6cb0;
      --wt-muted: #718096;
      --wt-border: #e5e9ef;

      width: 100%;
      padding: 115px 0 105px;

      background:
        linear-gradient(
          rgba(7,26,51,.025) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(7,26,51,.025) 1px,
          transparent 1px
        ),
        #ffffff;

      background-size: 40px 40px;

      overflow: hidden;
    }


    /* =====================================================
       CONTAINER
    ===================================================== */

    .wt-process-container {
      width: calc(100% - 40px);
      max-width: 1200px;
      margin: 0 auto;
    }


    /* =====================================================
       HEADER
    ===================================================== */

    .wt-process-header {
      max-width: 800px;
      margin: 0 auto 65px;
      text-align: center;
    }

    .wt-process-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;

      margin-bottom: 18px;

      color: var(--wt-red);

      font-size: 10px;
      font-weight: 800;
      letter-spacing: 4px;
    }

    .wt-process-eyebrow span {
      width: 42px;
      height: 1px;
      background: var(--wt-red);
    }

    .wt-process-header h2 {
      margin: 0;

      color: var(--wt-navy);

      font-family: var(--app-font-serif);

      font-size: clamp(42px, 5vw, 64px);

      line-height: 1.03;
      letter-spacing: -2.5px;
    }

    .wt-process-header h2 em {
      color: var(--wt-red);
      font-weight: 400;
      font-style: italic;
    }

    .wt-process-header p {
      max-width: 670px;
      margin: 23px auto 0;

      color: #7b8798;

      font-size: 15px;
      line-height: 1.8;
    }


    /* =====================================================
       LARGE VISUAL
    ===================================================== */

    .wt-process-visual {
      max-width: 1080px;
      height: 330px;

      margin: 0 auto 55px;

      display: grid;
      grid-template-columns: 1.65fr .75fr;

      overflow: hidden;

      background: var(--wt-navy);

      box-shadow:
        0 25px 60px rgba(7,26,51,.14);
    }

    .wt-process-visual-image {
      position: relative;
      overflow: hidden;
    }

    .wt-process-visual-image img {
      width: 100%;
      height: 100%;

      display: block;
      object-fit: cover;

      transition: transform .8s ease;
    }

    .wt-process-visual:hover img {
      transform: scale(1.035);
    }

    .wt-process-image-overlay {
      position: absolute;
      inset: 0;

      background:
        linear-gradient(
          90deg,
          rgba(7,26,51,.05),
          rgba(7,26,51,.75)
        );
    }

    .wt-process-image-content {
      position: absolute;

      left: 42px;
      bottom: 38px;

      color: white;
    }

    .wt-process-image-content span {
      display: block;

      margin-bottom: 9px;

      color: #ffadbd;

      font-size: 9px;
      font-weight: 800;
      letter-spacing: 3px;
    }

    .wt-process-image-content strong {
      font-family: var(--app-font-serif);

      font-size: 35px;
      font-weight: 400;
      line-height: 1.05;
    }


    /* =====================================================
       JAPAN BADGE
    ===================================================== */

    .wt-japan-badge {
      position: absolute;

      top: 25px;
      left: 25px;

      display: flex;
      align-items: center;
      gap: 9px;

      padding: 11px 15px;

      background: rgba(255,255,255,.95);

      color: var(--wt-navy);

      font-size: 9px;
      font-weight: 800;
      letter-spacing: 1.5px;
    }

    .wt-japan-dot {
      width: 7px;
      height: 7px;

      border-radius: 50%;

      background: var(--wt-red);
    }


    /* =====================================================
       VISUAL STATS
    ===================================================== */

    .wt-process-stats {
      padding: 35px 30px;

      display: flex;
      flex-direction: column;
      justify-content: center;

      background: var(--wt-navy);
    }

    .wt-process-stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .wt-process-stat strong {
      color: var(--wt-red);

      font-family: var(--app-font-serif);

      font-size: 30px;
      font-weight: 400;
    }

    .wt-process-stat span {
      color: rgba(255,255,255,.72);

      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .wt-process-stat-line {
      width: 100%;
      height: 1px;

      margin: 17px 0;

      background: rgba(255,255,255,.12);
    }


    /* =====================================================
       PROCESS GRID
    ===================================================== */

    .wt-process-steps {
      max-width: 1080px;

      margin: 0 auto;

      display: grid;

      grid-template-columns:
        1fr
        30px
        1fr
        30px
        1fr
        30px
        1fr;

      align-items: stretch;
    }


    /* =====================================================
       CARD
    ===================================================== */

    .wt-step {
      position: relative;

      min-height: 360px;

      padding: 25px 25px 21px;

      display: flex;
      flex-direction: column;

      background: rgba(255,255,255,.92);

      border: 1px solid #e4e8ed;

      border-radius: 18px;

      box-shadow:
        0 10px 35px rgba(7,26,51,.055);

      transition:
        transform .35s ease,
        box-shadow .35s ease,
        border-color .35s ease;
    }

    .wt-step:hover {
      transform: translateY(-8px);

      border-color: rgba(43,108,176,.30);

      box-shadow:
        0 22px 45px rgba(7,26,51,.11);
    }


    /* =====================================================
       TOP
    ===================================================== */

    .wt-step-top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 45px;
    }


    /* =====================================================
       BLUE STEP NUMBERS
    ===================================================== */

    .wt-step-number {
      color: #2b6cb0;

      font-family: var(--app-font-serif);

      font-size: 52px;

      font-weight: 700;

      line-height: 1;
    }


    /* =====================================================
       ICON
    ===================================================== */

    .wt-step-icon {
      width: 58px;
      height: 58px;

      display: flex;
      align-items: center;
      justify-content: center;

      color: var(--wt-red);

      background: #fff0f3;

      border-radius: 14px;

      transition:
        background .3s ease,
        color .3s ease,
        transform .3s ease;
    }

    .wt-step:hover .wt-step-icon {
      background: var(--wt-red);
      color: white;

      transform: rotate(-3deg);
    }

    .wt-step-icon svg {
      width: 27px;
      height: 27px;

      fill: none;

      stroke: currentColor;

      stroke-width: 1.7;

      stroke-linecap: round;
      stroke-linejoin: round;
    }


    /* =====================================================
       CARD CONTENT
    ===================================================== */

    .wt-step-content {
      flex: 1;
    }

    .wt-step-label {
      display: block;

      margin-bottom: 8px;

      color: var(--wt-red);

      font-size: 9px;
      font-weight: 800;
      letter-spacing: 2px;
    }

    .wt-step h3 {
      margin: 0 0 13px;

      color: var(--wt-navy);

      font-family: var(--app-font-serif);

      font-size: 22px;

      line-height: 1.2;
    }

    .wt-step p {
      margin: 0;

      color: #718096;

      font-size: 13px;

      line-height: 1.75;
    }


    /* =====================================================
       CARD FOOTER
    ===================================================== */

    .wt-step-bottom {
      display: flex;

      align-items: center;
      justify-content: space-between;

      padding-top: 18px;

      margin-top: 20px;

      border-top: 1px solid #edf0f3;
    }

    .wt-step-bottom span {
      color: var(--wt-red);

      font-size: 10px;
      font-weight: 700;
    }

    .wt-step-bottom b {
      color: #aab3bf;

      font-size: 9px;
      letter-spacing: 1px;
    }


    /* =====================================================
       CONNECTORS
    ===================================================== */

    .wt-step-connector {
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .wt-step-connector span {
      width: 100%;
      height: 1px;

      background:
        linear-gradient(
          90deg,
          #e5e9ef,
          var(--wt-red),
          #e5e9ef
        );

      opacity: .55;
    }

    .wt-step-connector span::after {
      content: "";

      position: absolute;

      width: 6px;
      height: 6px;

      border-top: 1px solid var(--wt-red);
      border-right: 1px solid var(--wt-red);

      transform: rotate(45deg);

      right: 1px;

      top: calc(50% - 3px);
    }


    /* =====================================================
       SECURITY
    ===================================================== */

    .wt-security {
      max-width: 1080px;

      margin: 50px auto 0;

      padding: 20px 25px;

      display: flex;

      align-items: center;

      gap: 18px;

      background: #fffaf0;

      border: 1px solid #f1d993;

      border-radius: 12px;
    }

    .wt-security-icon {
      flex: 0 0 42px;

      width: 42px;
      height: 42px;

      display: flex;
      align-items: center;
      justify-content: center;

      color: #a66a00;

      background: #fff0c7;

      border-radius: 50%;
    }

    .wt-security-icon svg {
      width: 21px;
      height: 21px;

      fill: none;

      stroke: currentColor;

      stroke-width: 1.7;

      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .wt-security-text {
      color: #704b08;

      font-size: 13px;

      line-height: 1.65;
    }

    .wt-security-text strong {
      font-weight: 800;
    }

    .wt-security-text span {
      margin-left: 4px;
    }


    /* =====================================================
       CTA
    ===================================================== */

    .wt-process-cta {
      max-width: 1080px;

      margin: 30px auto 0;

      padding: 30px 35px;

      display: flex;

      align-items: center;

      justify-content: space-between;

      gap: 30px;

      background: var(--wt-navy);

      border-radius: 16px;

      box-shadow:
        0 20px 45px rgba(7,26,51,.14);
    }

    .wt-cta-copy span {
      display: block;

      margin-bottom: 6px;

      color: #ff9caf;

      font-size: 9px;

      font-weight: 800;

      letter-spacing: 2.5px;
    }

    .wt-cta-copy h3 {
      margin: 0;

      color: white;

      font-family: var(--app-font-serif);

      font-size: 25px;

      font-weight: 400;
    }


    /* =====================================================
       BUTTON
    ===================================================== */

    .wt-cta-button {
      min-width: 210px;

      padding: 16px 22px;

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 12px;

      color: white;

      background: var(--wt-red);

      border-radius: 50px;

      text-decoration: none;

      font-size: 12px;
      font-weight: 800;

      box-shadow:
        0 10px 25px rgba(215,25,63,.25);

      transition:
        background .3s ease,
        transform .3s ease,
        box-shadow .3s ease;
    }

    .wt-cta-button:hover {
      background: #b90f32;

      transform: translateY(-2px);

      box-shadow:
        0 14px 30px rgba(215,25,63,.32);
    }

    .wt-cta-button svg {
      width: 18px;
      height: 18px;

      fill: none;

      stroke: currentColor;

      stroke-width: 1.8;

      stroke-linecap: round;
      stroke-linejoin: round;
    }


    /* =====================================================
       TABLET
    ===================================================== */

    @media (max-width: 950px) {

      .wt-process {
        padding: 80px 0;
      }

      .wt-process-visual {
        height: 300px;

        grid-template-columns: 1.4fr .8fr;
      }

      .wt-process-steps {
        grid-template-columns: 1fr 1fr;

        gap: 18px;
      }

      .wt-step-connector {
        display: none;
      }

      .wt-step {
        min-height: 350px;
      }

    }


    /* =====================================================
       MOBILE
    ===================================================== */

    @media (max-width: 650px) {

      .wt-process {
        padding: 65px 0;
      }

      .wt-process-container {
        width: calc(100% - 28px);
      }

      .wt-process-header {
        margin-bottom: 40px;
      }

      .wt-process-header h2 {
        font-size: 40px;

        letter-spacing: -1.5px;
      }

      .wt-process-header p {
        font-size: 13px;
      }


      .wt-process-visual {
        height: auto;

        display: block;

        margin-bottom: 35px;
      }

      .wt-process-visual-image {
        height: 300px;
      }

      .wt-process-image-content {
        left: 22px;
        bottom: 25px;
      }

      .wt-process-image-content strong {
        font-size: 28px;
      }

      .wt-process-stats {
        padding: 25px;
      }

      .wt-process-stat-line {
        margin: 12px 0;
      }


      .wt-process-steps {
        grid-template-columns: 1fr;

        gap: 16px;
      }

      .wt-step {
        min-height: 0;

        padding: 22px;
      }

      .wt-step-top {
        margin-bottom: 30px;
      }


      .wt-security {
        align-items: flex-start;

        padding: 17px;

        gap: 13px;
      }

      .wt-security-text {
        font-size: 11px;
      }

      .wt-security-text span {
        display: block;

        margin: 4px 0 0;
      }


      .wt-process-cta {
        flex-direction: column;

        align-items: flex-start;

        padding: 25px;

        gap: 22px;
      }

      .wt-cta-copy h3 {
        font-size: 23px;
      }

      .wt-cta-button {
        width: 100%;

        box-sizing: border-box;
      }

    }

    `}</style>
        </>
      );
    }

function ShopByBodyTypeSection() {
  const [, navigate] = useLocation();
  const sectionRef = React.useRef<HTMLElement>(null);
  const [bodyCounts, setBodyCounts] = React.useState<Record<string, number>>({});
  const [countsLoading, setCountsLoading] = React.useState(true);
  const [countsError, setCountsError] = React.useState(false);

  React.useEffect(() => {
    if (!isSupabaseConfigured) {
      setCountsLoading(false);
      setCountsError(true);
      return;
    }

    let cancelled = false;
    Promise.all(
      POPULAR_BODY_TYPES.map(async ({ name }) => {
        const { count, error } = await supabase
          .from('cars')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'available')
          .ilike('body_type', name);
        if (error) throw error;
        return [name, count ?? 0] as const;
      }),
    )
      .then(results => {
        if (cancelled) return;
        setBodyCounts(Object.fromEntries(results));
        setCountsLoading(false);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setCountsLoading(false);
        setCountsError(true);
        console.warn('Could not load homepage body type counts:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white border-b border-gray-100 py-14 md:py-16">
      <div className="max-w-7xl mx-auto text-center mb-9 px-4">
        <p className="text-[10px] tracking-[0.28em] uppercase font-bold text-[#C8102E] mb-2">
          Browse By Body Type
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">
          Shop By Body Type
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Find the shape that fits your next journey.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
          {POPULAR_BODY_TYPES.map(({ name, accent, icon }) => {
            const count = bodyCounts[name];
            return (
              <button
                key={name}
                onClick={() => navigate(`/cars?body=${encodeURIComponent(name)}`)}
                className="group flex min-w-0 min-h-[176px] flex-col items-center justify-between gap-3 rounded-xl border border-gray-200/90 bg-white px-3 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:-translate-y-1 hover:border-[#C8102E]/50 hover:shadow-[0_12px_28px_rgba(200,16,46,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 transition-all duration-200 cursor-pointer"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-gray-50 shadow-sm transition-colors group-hover:bg-red-50"
                  style={{ color: accent }}
                >
                  <img
                    src={icon}
                    alt={`${name} vehicles`}
                    className="h-10 w-14 object-contain transition-transform duration-200 group-hover:scale-110"
                    loading="eager"
                    decoding="async"
                    onError={event => {
                      event.currentTarget.style.display = 'none';
                      event.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <CarFront size={38} strokeWidth={1.5} aria-hidden="true" className="hidden" />
                </span>
                <span className="text-[12px] font-bold text-gray-800 group-hover:text-[#C8102E] tracking-wide text-center leading-tight transition-colors">
                  {name}
                </span>
                <span
                  className="min-h-[24px] text-[9px] font-semibold tracking-[0.08em] uppercase leading-4 text-center"
                  style={{ color: countsLoading ? '#9CA3AF' : count > 0 ? '#C8102E' : '#9CA3AF' }}
                >
                  {countsLoading
                    ? 'Loading live stock…'
                    : countsError
                      ? 'Stock unavailable'
                      : `${(count ?? 0).toLocaleString()} ${(count ?? 0) === 1 ? 'vehicle' : 'vehicles'} in stock`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Featured Collection ─────────────────────────────────────── */

async function fetchCarImages(ids: string[]): Promise<Record<string, string>> {
  if (!ids.length) return {};
  const { data } = await supabase
    .from('car_images')
    .select('car_id,image_url,is_primary')
    .in('car_id', ids);
  if (!data) return {};
  const map: Record<string, string> = {};
  // Prefer primary image, then fall back to first found
  for (const row of data as { car_id: string; image_url: string; is_primary: boolean }[]) {
    if (!row.car_id || !row.image_url) continue;
    if (!map[row.car_id] || row.is_primary) map[row.car_id] = row.image_url;
  }
  return map;
}

function FeaturedCollectionSection() {
  const [cars, setCars]       = React.useState<Car[]>([]);
  const [imgMap, setImgMap]   = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(true);
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const { pkr: pkrPerUsd } = useExchangeRate();

  React.useEffect(() => {
    let cancelled = false;
    if (!isSupabaseConfigured) {
      setLoading(false);
      return () => { cancelled = true; };
    }
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('cars')
        .select('id,ref_number,make,model,variant,year,engine_cc,fob_price_usd,is_new_arrival,mileage_km,transmission,fuel_type')
        .eq('is_new_arrival', true)
        .order('created_at', { ascending: false })
        .limit(50);
      if (cancelled) return;
      const fetched = (data ?? []) as Car[];
      setCars(fetched);
      const imgs = await fetchCarImages(fetched.map(c => c.id));
      if (!cancelled) { setImgMap(imgs); setLoading(false); }
    })().catch((error: unknown) => {
      if (!cancelled) {
        setLoading(false);
        console.warn('Could not load featured vehicles:', error);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-12" style={{ background: '#F8FAFC' }}>
      <div className="max-w-[1600px] mx-auto px-3 md:px-5">

        {/* ── Section header ── */}
        <div className="text-center mb-5">
          <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-1" style={{ color: '#C8102E' }}>
            Latest Stock · New Arrivals
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight">
            Featured Collection
          </h2>
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded-lg" style={{ height: 260 }} />
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="font-semibold text-sm">No new arrivals at the moment.</p>
            <Link href="/cars" className="text-[#C8102E] font-bold hover:underline text-sm mt-2 inline-block">
              Browse all stock →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cars.map(car => (
              <CarCard key={car.id} car={car} variant="grid" hideBadges
                primaryImage={imgMap[car.id] ?? null} pkrRate={pkrPerUsd} waNumber={waNumber} />
            ))}
          </div>
        )}

        {/* ── View All button ── */}
        {!loading && cars.length > 0 && (
          <div className="flex justify-center mt-6">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-[11px] font-bold uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ background: '#C8102E' }}
            >
              View All Cars <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Animated count-up hook ──────────────────────────────────── */


/* ── Can't Find Your Car ─────────────────────────────────────── */
const SHIP_TO_COUNTRIES = [
  // Africa
  'Angola','Botswana','Cameroon','Djibouti','Ethiopia','Ghana','Ivory Coast','Kenya',
  'Madagascar','Malawi','Mauritius','Mozambique','Namibia','Nigeria','Rwanda',
  'Senegal','South Africa','South Sudan','Tanzania','Uganda','Zambia','Zimbabwe',
  // Americas
  'Canada','Chile','Colombia','Ecuador','Guyana','Mexico','Panama','Peru','Suriname','USA',
  // Caribbean
  'Anguilla','Antigua','Aruba','Bahamas','Barbados','Belize','Bermuda',
  'British Virgin Islands','Cayman Islands','Cuba','Curaçao','Dominica',
  'Dominican Republic','Grenada','Guadeloupe','Haiti','Jamaica','Martinique',
  'Montserrat','St Kitts','St Lucia','St Vincent','Sint Maarten',
  'Trinidad','Turks and Caicos',
  // Asia & Middle East
  'Azerbaijan','Bahrain','Bangladesh','Cambodia','Georgia','India','Iraq',
  'Jordan','Kuwait','Myanmar','Oman','Pakistan','Philippines','Qatar',
  'Saudi Arabia','Sri Lanka','Thailand','UAE','Vietnam',
  // Europe
  'Belgium','Cyprus','France','Germany','Malta','Netherlands','Poland','Russia','UK',
  // Pacific & Oceania
  'Australia','Fiji','New Caledonia','New Zealand','Papua New Guinea',
  'Samoa','Solomon Islands','Tonga','Vanuatu',
] as const;

const CFYC_BENEFITS = [
  'Share the make, model, and destination you need',
  'Review the available vehicle details before you decide',
  'Request a quote for the vehicle and destination',
  'Ask our team about sourcing options',
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
                  <div className="text-xs text-gray-400">Tell us what you need — we'll find it and send you the price</div>
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
                  <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">We're On It!</h3>
                  <p className="text-gray-500 text-sm max-w-sm mb-2">
                    Your request is with our Japan sourcing desk. We'll search the auction network and send you matching options — with full pricing — on WhatsApp within 24 hours.
                  </p>
                  <p className="text-xs text-gray-400 max-w-xs">
                    No payment needed at this stage. We'll confirm availability and price before anything moves forward.
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
                          {DEST_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
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
                        placeholder="e.g. Right-hand drive, under 80,000 km, silver or white, auction grade 4 or above, sunroof preferred. The more detail you give us, the better we can match."
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
                        {submitting ? 'Sending Request…' : 'Search Japan Auctions for Me'}
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
    title: 'Vehicle records',
    description: 'Reference-led listing details',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    title: 'Available specifications',
    description: 'Review the fields shown',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: 'Payment information',
    description: 'Bank transfer instructions',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Shipping information',
    description: 'Routes and shipping options',
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
    <>
      <section className="wazir-trust">
        <div className="wazir-container">

          <div className="wazir-heading">
            <div className="wazir-eyebrow">
              <span></span>
              CLEAR VEHICLE INFORMATION
              <span></span>
            </div>

            <h2>
              Confidence Behind
              <em>Every Shipment.</em>
            </h2>

            <p>
              Review the current vehicle records, compare available details, and
              contact Wazir Trading about payment and shipping for your destination.
            </p>
          </div>

          <div className="wazir-main">
            <div className="wazir-image">
              <img
                src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=85"
                alt="Japanese vehicle export"
              />

              <div className="wazir-image-overlay"></div>

              <div className="wazir-badge">
                <div className="badge-check">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12.5l4 4L19 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>
                  </svg>
                </div>

                <div>
                  <strong>Japan Export</strong>
                    <small>Vehicle export information</small>
                </div>
              </div>

              <div className="wazir-image-text">
                <span>WAZIR TRADING LLC</span>
                <strong>
                  From Japan to the World
                </strong>
              </div>
            </div>

            <div className="wazir-content">
              <span className="wazir-label">BUILT ON TRUST</span>

              <h3>
                A safer way to buy
                <br />
                <em>Japanese vehicles.</em>
              </h3>

              <p className="wazir-description">
                We bring the vehicle record, payment instructions, and shipping
                information together so buyers can make an informed inquiry.
              </p>

              <div className="wazir-trust-list">

                <div className="wazir-trust-item">
                  <div className="wazir-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M3 13.5h18"/>
                      <path d="M5 13.5l1.8-5.2a2 2 0 0 1 1.9-1.3h6.6a2 2 0 0 1 1.9 1.3L19 13.5"/>
                      <path d="M4 13.5v4h2v2h2v-2h8v2h2v-2h2v-4"/>
                      <circle cx="7.5" cy="15.5" r="1"/>
                      <circle cx="16.5" cy="15.5" r="1"/>
                    </svg>
                  </div>

                  <div className="wazir-item-text">
                    <h4>Vehicle record</h4>
                    <p>Review the reference, specifications, images, and
                      available history fields.
                    </p>
                  </div>

                  <div className="wazir-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7"/>
                      <path d="M8 7h9v9"/>
                    </svg>
                  </div>
                </div>

                <div className="wazir-trust-item">
                  <div className="wazir-icon">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="2"/>
                      <path d="M3 9h18"/>
                      <path d="M7 14h4"/>
                      <path d="M15 13v4"/>
                      <path d="M13 15h4"/>
                    </svg>
                  </div>

                  <div className="wazir-item-text">
                    <h4>Payment instructions</h4>
                    <p>Review the payment information page before sending
                      funds or asking a question.
                    </p>
                  </div>

                  <div className="wazir-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7"/>
                      <path d="M8 7h9v9"/>
                    </svg>
                  </div>
                </div>

                <div className="wazir-trust-item">
                  <div className="wazir-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3l7 3v5c0 4.7-2.9 8.3-7 10-4.1-1.7-7-5.3-7-10V6l7-3z"/>
                      <path d="M8.5 12l2.3 2.3 4.7-5"/>
                    </svg>
                  </div>

                  <div className="wazir-item-text">
                    <h4>Shipping options</h4>
                    <p>Review available routes and ask about insurance for
                      your destination.
                    </p>
                  </div>

                  <div className="wazir-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7"/>
                      <path d="M8 7h9v9"/>
                    </svg>
                  </div>
                </div>

                <div className="wazir-trust-item">
                  <div className="wazir-icon">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M3 12h18"/>
                      <path d="M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9"/>
                      <path d="M12 3c-2.3 2.5-3.5 5.5-3.5 9s1.2 6.5 3.5 9"/>
                      <path d="M5 7.5h14"/>
                      <path d="M5 16.5h14"/>
                    </svg>
                  </div>

                  <div className="wazir-item-text">
                    <h4>Export coordination</h4>
                    <p>Contact the team to discuss routes, documents, and
                      destination requirements.
                    </p>
                  </div>

                  <div className="wazir-arrow">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7"/>
                      <path d="M8 7h9v9"/>
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            <div className="wazir-bottom">
              <div>
                <strong>01</strong>
                <span>Vehicle Records</span>
              </div>
              <i></i>
              <div>
                <strong>02</strong>
                <span>Payment Information</span>
              </div>
              <i></i>
              <div>
                <strong>03</strong>
                <span>Shipping Options</span>
              </div>
              <i></i>
              <div>
                <strong>04</strong>
                <span>Global Delivery</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .wazir-trust {
          width: 100%;
          padding: 100px 0;
          background: #f7f8fa;
          overflow: hidden;
        }

        .wazir-container {
          width: calc(100% - 40px);
          max-width: 1200px;
          margin: 0 auto;
        }

        .wazir-heading {
          max-width: 850px;
          margin: 0 auto 60px;
          text-align: center;
        }

        .wazir-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 18px;
          color: #d7193f;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 4px;
        }

        .wazir-eyebrow span {
          width: 38px;
          height: 1px;
          background: #d7193f;
        }

        .wazir-heading h2 {
          margin: 0;
          color: #071a33;
          font-family: var(--app-font-serif);
          font-size: clamp(40px, 5vw, 64px);
          line-height: 1.05;
          letter-spacing: -2px;
        }

        .wazir-heading h2 em {
          display: block;
          color: #d7193f;
          font-weight: 400;
        }

        .wazir-heading p {
          max-width: 650px;
          margin: 22px auto 0;
          color: #718096;
          font-size: 15px;
          line-height: 1.8;
        }

        .wazir-main {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }

        .wazir-image {
          position: relative;
          height: 570px;
          overflow: hidden;
          background: #071a33;
          box-shadow: 0 25px 60px rgba(7, 26, 51, .16);
        }

        .wazir-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform .7s ease;
        }

        .wazir-image:hover img {
          transform: scale(1.04);
        }

        .wazir-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(7,26,51,.02) 30%, rgba(7,26,51,.85) 100%);
        }

        .wazir-image::after {
          content: "";
          position: absolute;
          top: 20px;
          right: 20px;
          width: 110px;
          height: 110px;
          border-top: 3px solid #d7193f;
          border-right: 3px solid #d7193f;
          pointer-events: none;
        }

        .wazir-badge {
          position: absolute;
          top: 25px;
          left: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px 12px 12px;
          background: rgba(255,255,255,.96);
          box-shadow: 0 15px 35px rgba(0,0,0,.15);
          z-index: 2;
        }

        .badge-check {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #d7193f;
          color: #fff;
        }

        .badge-check svg {
          width: 20px;
          height: 20px;
        }

        .wazir-badge strong {
          display: block;
          color: #071a33;
          font-size: 13px;
        }

        .wazir-badge small {
          display: block;
          margin-top: 3px;
          color: #7b8592;
          font-size: 10px;
        }

        .wazir-image-text {
          position: absolute;
          left: 30px;
          bottom: 30px;
          color: #fff;
          z-index: 2;
        }

        .wazir-image-text span {
          display: block;
          margin-bottom: 8px;
          color: #ffafbe;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .wazir-image-text strong {
          font-family: var(--app-font-serif);
          font-size: 30px;
          font-weight: 400;
        }

        .wazir-content {
          width: 100%;
        }

        .wazir-label {
          color: #d7193f;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .wazir-content h3 {
          margin: 14px 0 18px;
          color: #071a33;
          font-family: var(--app-font-serif);
          font-size: 40px;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .wazir-content h3 em {
          color: #d7193f;
          font-weight: 400;
        }

        .wazir-description {
          max-width: 500px;
          margin: 0 0 30px;
          color: #718096;
          font-size: 14px;
          line-height: 1.8;
        }

        .wazir-trust-list {
          border-top: 1px solid #e1e6ec;
        }

        .wazir-trust-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 5px 18px 0;
          border-bottom: 1px solid #e1e6ec;
          transition: padding-left .3s ease, background .3s ease;
        }

        .wazir-trust-item:hover {
          padding-left: 8px;
          background: rgba(255,255,255,.65);
        }

        .wazir-icon {
          flex: 0 0 54px;
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d7193f;
          background: #fff1f4;
          border: 1px solid rgba(215,25,63,.10);
          border-radius: 12px;
          transition: background .3s ease, color .3s ease, transform .3s ease, box-shadow .3s ease;
        }

        .wazir-icon svg {
          width: 25px;
          height: 25px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .wazir-trust-item:hover .wazir-icon {
          background: #d7193f;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(215,25,63,.20);
        }

        .wazir-item-text {
          flex: 1;
        }

        .wazir-item-text h4 {
          margin: 0 0 5px;
          color: #071a33;
          font-size: 14px;
          font-weight: 800;
        }

        .wazir-item-text p {
          margin: 0;
          color: #8791a0;
          font-size: 11px;
          line-height: 1.5;
        }

        .wazir-arrow {
          color: #c2c8d0;
          transition: color .3s ease, transform .3s ease;
        }

        .wazir-arrow svg {
          width: 19px;
          height: 19px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .wazir-trust-item:hover .wazir-arrow {
          color: #d7193f;
          transform: translate(3px,-3px);
        }

        .wazir-bottom {
          width: 100%;
          max-width: 1080px;
          margin: 55px auto 0;
          padding: 25px 30px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          box-sizing: border-box;
          background: #071a33;
          color: #fff;
          box-shadow: 0 20px 45px rgba(7,26,51,.15);
        }

        .wazir-bottom div {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wazir-bottom strong {
          color: #d7193f;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .wazir-bottom span {
          color: #fff;
          font-size: 11px;
          font-weight: 700;
        }

        .wazir-bottom i {
          width: 1px;
          height: 25px;
          background: rgba(255,255,255,.15);
        }

        @media (max-width: 900px) {
          .wazir-trust { padding: 75px 0; }
          .wazir-main {
            grid-template-columns: 1fr;
            max-width: 650px;
          }
          .wazir-image { height: 500px; }
        }

        @media (max-width: 600px) {
          .wazir-trust { padding: 60px 0; }
          .wazir-container { width: calc(100% - 28px); }
          .wazir-heading { margin-bottom: 40px; }
          .wazir-heading h2 { font-size: 40px; }
          .wazir-heading p { font-size: 13px; }
          .wazir-image { height: 380px; }
          .wazir-badge { top: 15px; left: 15px; }
          .wazir-image-text { left: 20px; bottom: 22px; }
          .wazir-image-text strong { font-size: 24px; }
          .wazir-content h3 { font-size: 34px; }
          .wazir-icon { width: 48px; height: 48px; flex-basis: 48px; }
          .wazir-icon svg { width: 22px; height: 22px; }
          .wazir-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
            padding: 22px;
          }
          .wazir-bottom i { display: none; }
        }
      `}</style>
    </>
  );
}

function CustomerReviewsSection() {
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const shareLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    'Hello Wazir Trading, I recently imported a car with you and would like to share my experience.'
  )}`;
  const hasReviews = TESTIMONIALS.length > 0;

  return (
    <section className="section-lazy py-20 relative overflow-hidden" style={{ background: '#F8FAFC' }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(200,16,46,0.25) 30%, rgba(200,16,46,0.25) 70%, transparent 100%)' }}/>

      <div className="container mx-auto px-4 md:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #C8102E)' }}/>
            <p className="text-[10px] tracking-[0.32em] uppercase font-bold text-[#C8102E]">Customer Reviews</p>
            <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, #C8102E)' }}/>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            {hasReviews ? 'What Our Buyers Say' : 'Be Our First Reviewer'}
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            {hasReviews
              ? 'Words from buyers who have imported with us.'
              : 'We are a growing exporter and we would rather show you nothing than show you reviews we made up. If you have imported with us, we would genuinely like to hear how it went.'}
          </p>
        </div>

        {hasReviews ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {TESTIMONIALS.map(t => (
              <figure key={`${t.name}-${t.country}`}
                className="flex flex-col rounded-2xl p-6"
                style={{ background: '#fff', border: '1px solid #EEF2F7', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                {t.rating != null && (
                  <div className="flex gap-0.5 mb-3" aria-label={`${t.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < t.rating! ? 'text-[#C8102E]' : 'text-gray-200'}>★</span>
                    ))}
                  </div>
                )}
                <blockquote className="text-gray-600 text-sm leading-relaxed flex-1">“{t.quote}”</blockquote>
                <figcaption className="mt-4 pt-4 border-t border-gray-100">
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {t.country}{t.vehicle ? ` · ${t.vehicle}` : ''}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center rounded-2xl p-8"
            style={{ background: '#fff', border: '1px dashed #D8E0EA' }}>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Already bought a car from us? Send us a message and we will publish your review here —
              in your own words, with your name on it.
            </p>
            <a href={shareLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white text-[12px] font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{ background: '#25D366' }}>
              <WhatsAppIcon size={14} />
              Share Your Experience
            </a>
          </div>
        )}

      </div>
    </section>
  );
}

/* ── Best Sellers ────────────────────────────────────────────── */
function BestSellersSection() {
  type Car = import('@/components/CarCard').Car;
  const [, navigate] = useLocation();
  const { pkr: pkrPerUsd } = useExchangeRate();
  const [cars, setCars]       = React.useState<Car[]>([]);
  const [imgMap, setImgMap]   = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(true);
  const [liked, setLiked]     = React.useState<Record<string, boolean>>({});

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const bsRef = React.useRef<HTMLElement>(null);

  // Defer data fetch until section is near the viewport
  React.useEffect(() => {
    const el = bsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
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
            .select('car_id, image_url, is_primary, display_order')
            .in('car_id', ids)
            .order('display_order');
          const map: Record<string, string> = {};
          for (const row of (imgs ?? []) as Record<string, unknown>[]) {
            const cid = String(row.car_id ?? '');
            if (!cid) continue;
            const url = String(row.image_url ?? '');
            if (!url) continue;
            // Always prefer the primary image; fall back to first image seen
            if (!map[cid] || row.is_primary) map[cid] = url;
          }
          setCars(data as Car[]);
          setImgMap(map);
          setLoading(false);
        })
        .then(undefined, (error: unknown) => {
          setLoading(false);
          console.warn('Could not load best sellers:', error);
        });
    }, { rootMargin: '400px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggleLike = (id: string) =>
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section ref={bsRef} className="py-20 relative" style={{ background: '#fff' }}>
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
            {cars.map(car => (
              <CarCard key={car.id} car={car} variant="grid"
                primaryImage={imgMap[car.id] ?? null} pkrRate={pkrPerUsd} waNumber={waNumber}
                isFavorite={!!liked[car.id]} onToggleFavorite={toggleLike} />
            ))}
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

const HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1656522520706-c457fa20e504?auto=format&fit=crop&w=1920&q=76',
  },
  {
    src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=76',
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=76',
  },
  {
    src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1920&q=76',
  },
];

function HeroBackground() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState(() => new Set([0]));

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const nextIndex = (currentSlide + 1) % HERO_SLIDES.length;
    if (loadedSlides.has(nextIndex)) return;
    const preload = new window.Image();
    preload.onload = () => setLoadedSlides((loaded) => new Set(loaded).add(nextIndex));
    preload.src = HERO_SLIDES[nextIndex].src;
  }, [currentSlide, loadedSlides]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        loadedSlides.has(index) && (
          <div
            key={slide.src}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slide.src}')` }}
          />
        )
      ))}

      <div className="slide-indicators">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Animated count-up hook ──────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  // useReveal is IntersectionObserver-based; it replaced framer-motion's
  // useInView, which was the only thing pulling that library into the bundle.
  const { ref, revealed: inView } = useReveal<HTMLDivElement>();

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
  const [stockCount, setStockCount]     = useState(0);

  useMeta({
    title: 'Japanese Used Cars for Export | Wazir Trading LLC',
    description: 'Browse current Japanese used vehicle listings, review specifications and photos, and request export and shipping information from Wazir Trading LLC.',
    canonical: 'https://www.wazirtradingllc.com/',
  });

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waMessage = encodeURIComponent('Hello, I am interested in purchasing a Japanese used car from Wazir Trading LLC.');
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  useEffect(() => {
    let cancelled = false;
    if (!isSupabaseConfigured) return () => { cancelled = true; };
    supabase
      .from('cars')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'available')
      .then(({ count, error }) => {
        if (cancelled) return;
        if (count !== null) setStockCount(count);
        if (error) console.warn('Could not load homepage stock count:', error.message);
      })
      .then(undefined, (error: unknown) => {
        if (!cancelled) console.warn('Could not load homepage stock count:', error);
      });
    return () => { cancelled = true; };
  }, []);

  const TRUST = [
    { text: 'Bank to Bank TT Payment' },
    { text: 'Bill of Lading documentation' },
    { text: 'Export information' },
    { text: 'Live vehicle listings' },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="hero">
        <HeroBackground />

        <div className="hero-content">
          <div className="eyebrow">Japanese Used Vehicles</div>

          <h1 className="hero-title">
            Import Your Dream Car
            <span>Direct from Japan</span>
          </h1>

          <Link href="/cars" className="select-button">
            Select your car
            <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      {/* ── DESTINATION COUNTRIES ─────────────────────────────────── */}
      <DestinationCountriesSection />

      {/* ── SHOP BY MAKE ──────────────────────────────────────────── */}
      <ShopByMakeSection />

      {/* ── SHOP BY BODY TYPE ─────────────────────────────────────── */}
      <ShopByBodyTypeSection />

      {/* ── FEATURED COLLECTION ─────────────────────────���─────────── */}
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

      {/* ── OUR JAPAN OFFICE ──────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.28em] uppercase font-bold text-[#C8102E] mb-2">Find Us</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3">Our Japan Office</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Heights Mizutani 1C, 158-1 Jizou, Kuwana-City, Mie-Pref, Japan
            </p>
          </div>
          <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3265.8895035567575!2d136.6993446757601!3d35.05950157279439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDAzJzM0LjIiTiAxMzbCsDQyJzA2LjkiRQ!5e0!3m2!1sen!2sus!4v1785990086147!5m2!1sen!2sus"
              width="100%"
              height="420"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Wazir Trading LLC — Japan Office Location"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
