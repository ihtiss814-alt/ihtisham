import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { supabase } from '@/lib/supabase';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import CarCard, { Car } from '@/components/CarCard';
import {
  COUNTRY_PORTS as COUNTRIES_PORTS, fetchShippingRate, computeLandedCost,
  type ShippingRate,
} from '@/lib/shipping';
import ImageGallery from '@/components/ImageGallery';
import {
  Heart, Share2, Check, ChevronRight, Phone, Send,
  Gauge, Settings, Droplet, Palette, Users, DoorOpen,
  ShieldCheck, ChevronLeft, MessageCircle, Loader2,
} from 'lucide-react';

/* ─────────────────────────────── types ─────────────────────────────── */
type ExtendedCar = Car & {
  engine_code?: string;
  model_code?: string;
  features?: Record<string, boolean> | null;
  exterior_grade?: string;
  interior_grade?: string;
  lot_number?: string;
  manufacture_month?: string | number;
};

/* ── helpers ── */
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function fmtManufactureDate(month: string | number | null | undefined, year: number | null): string {
  if (year == null) return '—';
  if (!month) return String(year);
  const m = typeof month === 'number' ? month : parseInt(String(month), 10);
  if (!isNaN(m) && m >= 1 && m <= 12) return `${MONTH_ABBR[m - 1]} ${year}`;
  return `${month} ${year}`;
}

function gradeClasses(grade: string | undefined): string {
  const g = (grade ?? '').toUpperCase().charAt(0);
  if (g === 'A') return 'text-green-700 bg-green-50 border-green-300';
  if (g === 'B') return 'text-blue-700 bg-blue-50 border-blue-300';
  if (g === 'C') return 'text-orange-700 bg-orange-50 border-orange-300';
  if (g === 'D') return 'text-red-700 bg-red-50 border-red-300';
  return 'text-gray-600 bg-gray-50 border-gray-200';
}

function GradeBadge({ grade }: { grade?: string }) {
  if (!grade) return <span className="text-sm font-bold text-[#0D1B3E]">—</span>;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold border ${gradeClasses(grade)}`}>
      {grade}
    </span>
  );
}

type SimilarCar = Car & {
  primaryImage?: string;
};

interface ExchangeRate {
  currency: string;
  rate: number; // relative to USD
}

/* ──────────────────────────── constants ─────────────────────────────── */
const RED = '#C8102E';
const NAVY = 'var(--brand-navy)'; // token defined once in index.css
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';



const ALL_FEATURES = [
  '360 Camera', 'Air Bag', 'Air Conditioner', 'Alloy Wheels', 'Anti Brake System',
  'Automatic Air Conditioning', 'Back Camera', 'Back Spoiler', 'Double Muffler',
  'FOG Light', 'HID', 'Keyless Entry', 'Leather Seats', 'Navigation',
  'Parking Sensors', 'Power Steering', 'Power Windows', 'Push Start', 'Radio',
  'Retractable Mirror', 'Roof Rail', 'Sun Roof', 'TV', 'Cruise Control',
  'Blind Spot Monitor',
];

/**
 * Abbreviations used in the spreadsheet / database → full display label.
 * Lookups are case-insensitive (keys are stored lower-cased in the set below).
 */
const FEATURE_ALIASES: Record<string, string> = {
  ps:      'Power Steering',
  pw:      'Power Windows',
  aw:      'Alloy Wheels',
  abs:     'Anti Brake System',
  aac:     'Automatic Air Conditioning',
  navi:    'Navigation',
  hid:     'HID',
  ac:      'Air Conditioner',
  keyless: 'Keyless Entry',
};

/** All keys (abbrev + full label, lower-cased) that mean a given display label is active. */
function buildFeatureKeys(label: string): Set<string> {
  const keys = new Set([label.toLowerCase()]);
  for (const [abbr, full] of Object.entries(FEATURE_ALIASES)) {
    if (full.toLowerCase() === label.toLowerCase()) keys.add(abbr);
  }
  return keys;
}

/** Returns true if `features` (any shape the DB might return) includes the given display label. */
function hasFeature(features: unknown, label: string): boolean {
  if (!features) return false;
  const keys = buildFeatureKeys(label);

  if (Array.isArray(features)) {
    return (features as string[]).some(v => keys.has(String(v).toLowerCase()));
  }
  if (typeof features === 'object' && features !== null) {
    return Object.entries(features as Record<string, unknown>).some(
      ([k, v]) => keys.has(k.toLowerCase()) && !!v
    );
  }
  return false;
}

const CURRENCIES = ['USD', 'GBP', 'EUR', 'JPY'] as const;
type Currency = typeof CURRENCIES[number];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$', GBP: '£', EUR: '€', JPY: '¥',
};

/* ─────────────────────────── helpers ───────────────────────────────── */
function fmt(n: number | null | undefined, currency = 'USD') {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtNum(n: number | null | undefined) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US').format(n);
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function CarDetailPage() {
  const params = useParams();
  const ref = params.ref as string;

  // live exchange rates
  const rates = useExchangeRate();

  // core data
  const [car, setCar] = useState<ExtendedCar | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarCars, setSimilarCars] = useState<SimilarCar[]>([]);

  // UI state
  const [currency, setCurrency] = useState<Currency>('USD');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // price calculator
  const [country, setCountry] = useState('Pakistan');
  const [port, setPort] = useState('Karachi');
  const [shipment, setShipment] = useState<'RORO' | 'Container'>('RORO');
  const [freightType, setFreightType] = useState<'Prepaid' | 'Collect'>('Prepaid');
  const [withInspection, setWithInspection] = useState(true);
  const [withInsurance, setWithInsurance] = useState(true);
  const [shippingRate, setShippingRate] = useState<ShippingRate | null>(null);
  const [rateLoading, setRateLoading] = useState(false);

  // inquiry form
  const [formCountry, setFormCountry] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  /* ─── fetch car ─── */
  useEffect(() => {
    async function load() {
      if (!ref) return;
      setLoading(true);
      const { data } = await supabase.from('cars').select('*').eq('ref_number', ref).single();
      setCar(data);
      setLoading(false);
    }
    load();
  }, [ref]);

  /* ─── check saved ─── */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wazir_saved_cars') || '[]');
    setSaved(saved.includes(ref));
  }, [ref]);

  /* ─── SEO ─── */
  useEffect(() => {
    if (!car) return;
    const title = `${car.make} ${car.model} ${car.year}${car.variant ? ' ' + car.variant : ''} | Buy from Japan | Wazir Trading LLC`;
    const content = `${car.make} ${car.model} ${car.year ?? ''}, ${fmtNum(car.mileage_km)}km, ${car.engine_cc ?? ''}CC, ${car.color}, ${car.transmission}. FOB $${car.fob_price_usd ?? 0}. Export from Japan. Ref ${car.ref_number}. Contact Wazir Trading.`;
    const canonicalUrl = `https://wazirtradingllc.com/cars/${car.ref_number}`;

    document.title = title;

    // Description
    let desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!desc) { desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc); }
    desc.setAttribute('content', content);

    // Canonical
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;

    // OG tags
    const setMeta = (property: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    setMeta('og:title', title);
    setMeta('og:description', content);
    setMeta('og:url', canonicalUrl);

    // JSON-LD Vehicle schema for rich search results
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Vehicle',
      name: `${car.make} ${car.model} ${car.year}`,
      brand: { '@type': 'Brand', name: car.make },
      model: car.model,
      vehicleModelDate: String(car.year ?? ''),
      color: car.color ?? undefined,
      vehicleTransmission: car.transmission ?? undefined,
      ...(car.mileage_km != null && {
        mileageFromOdometer: {
          '@type': 'QuantitativeValue',
          value: car.mileage_km,
          unitCode: 'KMT',
        },
      }),
      ...(car.engine_cc != null && {
        vehicleEngine: {
          '@type': 'EngineSpecification',
          engineDisplacement: {
            '@type': 'QuantitativeValue',
            value: car.engine_cc,
            unitCode: 'CMQ',
          },
        },
      }),
      offers: {
        '@type': 'Offer',
        price: car.fob_price_usd ?? undefined,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Wazir Trading LLC', url: 'https://wazirtradingllc.com' },
      },
      url: canonicalUrl,
    };
    let ldScript = document.getElementById('vehicle-jsonld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'vehicle-jsonld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(jsonLd);

    return () => {
      document.title = 'Wazir Trading LLC';
      const c = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (c) c.href = 'https://wazirtradingllc.com/';
      document.getElementById('vehicle-jsonld')?.remove();
    };
  }, [car]);

  /* ─── similar cars (with primary images) ─── */
  useEffect(() => {
    if (!car) return;
    async function fetchSimilar() {
      let { data } = await supabase
        .from('cars')
        .select('*')
        .eq('make', car!.make)
        .eq('model', car!.model)
        .neq('id', car!.id)
        .eq('status', 'available')
        .order('year', { ascending: false })
        .limit(6);
      if (!data || data.length < 3) {
        const { data: fallback } = await supabase
          .from('cars')
          .select('*')
          .eq('make', car!.make)
          .neq('model', car!.model)
          .neq('id', car!.id)
          .eq('status', 'available')
          .order('year', { ascending: false })
          .limit(6);
        data = fallback;
      }
      if (!data) { setSimilarCars([]); return; }

      // Fetch primary images for all similar cars in one query
      const ids = data.map((c: Car) => c.id);
      const { data: imgs } = await supabase
        .from('car_images')
        .select('car_id, image_url, is_primary, display_order')
        .in('car_id', ids)
        .order('display_order');

      const imgMap: Record<string, string> = {};
      for (const img of (imgs ?? []) as { car_id: string; image_url: string; is_primary: boolean }[]) {
        if (!imgMap[img.car_id] || img.is_primary) {
          imgMap[img.car_id] = img.image_url;
        }
      }

      setSimilarCars(data.map((c: Car) => ({ ...c, primaryImage: imgMap[c.id] })));
    }
    fetchSimilar();
  }, [car]);

  // exchange rates are now provided by the useExchangeRate hook above

  /* ─── shipping rate (shared lookup — see lib/shipping.ts) ─── */
  useEffect(() => {
    let cancelled = false;
    setRateLoading(true);
    setShippingRate(null);
    fetchShippingRate(country, port).then(rate => {
      if (cancelled) return;
      setShippingRate(rate);
      setRateLoading(false);
    });
    return () => { cancelled = true; };
  }, [country, port]);

  /* ─── handlers ─── */
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: document.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    const list: string[] = JSON.parse(localStorage.getItem('wazir_saved_cars') || '[]');
    if (saved) {
      const updated = list.filter(r => r !== ref);
      localStorage.setItem('wazir_saved_cars', JSON.stringify(updated));
      setSaved(false);
    } else {
      list.push(ref);
      localStorage.setItem('wazir_saved_cars', JSON.stringify(list));
      setSaved(true);
    }
  };

  const handleCountryChange = (c: string) => {
    setCountry(c);
    const ports = COUNTRIES_PORTS[c] || [];
    setPort(ports[0] || '');
  };

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!car) return;
    setFormStatus('submitting');
    const fd = new FormData(e.currentTarget);
    const payload = {
      car_ref: car.ref_number,
      car_name: `${car.make} ${car.model} ${car.year}`,
      destination_country: fd.get('dest_country') as string,
      destination_port: fd.get('dest_port') as string,
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      message: fd.get('message') as string,
      inquiry_type: 'car-inquiry',
    };
    const { error } = await supabase.from('inquiries').insert([payload]);
    if (error) { setFormStatus('error'); return; }
    setFormStatus('success');
    // open WhatsApp
    const waMsg = encodeURIComponent(
      `New inquiry for ${car.make} ${car.model} ${car.year}\nRef: ${car.ref_number}\nName: ${payload.name}\nCountry: ${payload.destination_country}\nContact: ${payload.phone}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, '_blank');
  };

  /* ─── computed ─── */
  const convertPrice = (usd: number | null): string => {
    if (usd == null) return '—';
    if (currency === 'USD') return fmt(usd, 'USD');
    const rateMap: Record<Currency, number> = {
      USD: 1,
      GBP: rates.gbp,
      EUR: rates.eur,
      JPY: rates.jpy,
    };
    const rate = rateMap[currency] ?? 1;
    return `${CURRENCY_SYMBOLS[currency]}${fmtNum(Math.round(usd * rate))}`;
  };

  const calcTotal = (): { total: number | null; pkr: string | null } => {
    if (!car) return { total: null, pkr: null };
    const cost = computeLandedCost(car.fob_price_usd, shippingRate, {
      freightType, withInspection, withInsurance,
    });
    if (!cost) return { total: null, pkr: null };
    return { total: cost.total, pkr: `PKR ${fmtNum(Math.round(cost.total * rates.pkr))}` };
  };

  /* ─── loading / not found ─── */
  if (loading) {
    return (
      <div className="min-h-screen pt-[164px] flex items-center justify-center bg-white">
        <Loader2 size={32} className="animate-spin text-[#C8102E]" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen pt-[164px] pb-20 bg-white text-center px-4">
        <h1 className="text-3xl font-serif font-bold text-[#0D1B3E] mb-4">Car Not Found</h1>
        <p className="text-gray-500 mb-8">This car is no longer available or has been removed from our inventory.</p>
        <Link href="/cars" className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-6 py-3 font-semibold hover:bg-red-700 transition-colors">
          <ChevronLeft size={16} /> Back to Cars
        </Link>
      </div>
    );
  }

  const waOfferMsg = encodeURIComponent(
    `Hi, I would like to make an offer for ${car.make} ${car.model} ${car.year}\nReference: ${car.ref_number}\nPlease let me know your best price.`
  );
  const waDetailMsg = encodeURIComponent(
    `Hi Wazir Trading, I am interested in ${car.make} ${car.model} ${car.year} (Ref: ${car.ref_number}). Is it still available?`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waDetailMsg}`;

  const { total: calcTotalVal, pkr: calcPkr } = calcTotal();

  return (
    <div className="min-h-screen bg-gray-50 pt-[148px] pb-28 lg:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">

        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-sm text-gray-400 flex-wrap">
          <Link href="/" className="hover:text-[#C8102E] transition-colors">Home</Link>
          <ChevronRight size={13} className="text-gray-300" />
          <Link href="/cars" className="hover:text-[#C8102E] transition-colors">Cars</Link>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-gray-400">Japan Stock</span>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-gray-600 font-medium">{car.make} {car.model}</span>
        </nav>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div className="lg:w-[65%] space-y-5">

            {/* ── Section 1: Car Header Card ── */}
            <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  JAPAN STOCK · REF #{car.ref_number}
                  <span className="inline-flex items-center gap-1 ml-2 text-[#C8102E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] inline-block" /> JAPAN
                  </span>
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleSave}
                    className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${saved ? 'bg-red-50 border-red-200 text-[#C8102E]' : 'border-gray-200 text-gray-400 hover:border-[#C8102E] hover:text-[#C8102E]'}`}
                    title={saved ? 'Saved' : 'Save'}
                  >
                    <Heart size={15} fill={saved ? '#C8102E' : 'none'} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-[#C8102E] hover:text-[#C8102E] transition-all relative"
                    title="Share"
                  >
                    <Share2 size={15} />
                    {copied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                        Link copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0D1B3E]">
                  {car.make} {car.model}
                </h1>
                <span className="text-2xl md:text-3xl font-serif font-bold text-[#C8102E]">{car.year}</span>
              </div>
              {car.variant && (
                <p className="text-base text-gray-400 font-medium mb-4">{car.variant}</p>
              )}

              {/* Quick spec chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { icon: <Gauge size={13} />, label: `${fmtNum(car.mileage_km)} KM` },
                  { icon: <Settings size={13} />, label: `${car.engine_cc ?? '—'} CC` },
                  { icon: <Droplet size={13} />, label: car.fuel_type },
                  { icon: <span className="text-[11px]">⚙️</span>, label: car.transmission },
                  { icon: <Palette size={13} />, label: car.color },
                  { icon: <Users size={13} />, label: car.seats != null ? `${car.seats} Seats` : null },
                  { icon: <DoorOpen size={13} />, label: car.doors != null ? `${car.doors} Doors` : null },
                ].map((chip, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-2.5 py-1.5 rounded-sm">
                    <span className="text-[#C8102E]">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Mobile-only: compact price + CTA (visible before gallery on small screens) ── */}
            <div className="lg:hidden rounded-sm overflow-hidden shadow-lg" style={{ background: NAVY }}>
              <div className="px-4 pt-4 pb-3">
                {/* Currency tabs */}
                <div className="flex mb-3 bg-white/10 rounded-sm overflow-hidden">
                  {CURRENCIES.map(c => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`flex-1 py-1.5 text-xs font-bold transition-all ${currency === c ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                      style={currency === c ? { background: RED } : {}}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">Vehicle Price · FOB Japan</p>
                    <div className="text-3xl font-serif font-bold text-[#C8102E]">{convertPrice(car.fob_price_usd ?? 0)}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 mb-0.5">PKR</p>
                    <p className="text-sm font-bold text-white/70">{fmtNum(Math.round((car.fob_price_usd ?? 0) * rates.pkr))}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${waOfferMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 font-bold text-xs text-white rounded-sm transition-all hover:opacity-90"
                    style={{ background: '#25D366' }}
                  >
                    ⭐ Offer Price
                  </a>
                  <a
                    href="#inquiry-section"
                    className="flex items-center justify-center gap-1.5 py-2.5 font-bold text-xs text-white rounded-sm transition-all hover:opacity-90"
                    style={{ background: RED }}
                  >
                    <Send size={13} /> Send Inquiry
                  </a>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-white/10 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {[
                  ['Stock', car.stock_location],
                  ['Port', car.port_of_loading],
                  ['Shipment', car.shipment_method],
                  ['Auction Grade', car.auction_grade],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <span className="text-[10px] text-white/40">{k}</span>
                    <span className="text-xs font-semibold text-white">{v || '—'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 2: Image Gallery ── */}
            <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm">
              <ImageGallery
                carId={car.id}
                refNumber={car.ref_number}
                make={car.make}
                model={car.model}
              />
            </div>

            {/* ── Section 3: Specifications Table ── */}
            <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-serif font-bold text-[#0D1B3E]">Specifications</h2>
                <span className="text-xs font-semibold text-[#C8102E] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] inline-block" /> JAPAN
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {(() => {
                  const xcar = car as ExtendedCar;
                  // Each row: [label, text value, optional custom node]
                  const rows: [string, string | number | null | undefined, React.ReactNode?][] = [
                    ['Reference #',    car.ref_number],
                    ['Chassis No.',    car.chassis_number],
                    ['Lot Number',     xcar.lot_number],
                    ['Mileage',        car.mileage_km != null ? `${fmtNum(car.mileage_km)} km` : null],
                    ['Year',           fmtManufactureDate(xcar.manufacture_month, car.year)],
                    ['Engine',         car.engine_cc != null ? `${car.engine_cc} CC` : null],
                    ['Fuel',           car.fuel_type],
                    ['Seats',          car.seats],
                    ['Engine Code',    xcar.engine_code],
                    ['Color',          car.color],
                    ['Drive',          car.drive],
                    ['Doors',          car.doors],
                    ['Transmission',   car.transmission],
                    ['Model Code',     xcar.model_code],
                    ['Steering',       car.steering],
                    ['Auction Grade',  car.auction_grade, <GradeBadge grade={car.auction_grade} />],
                    ['Exterior Grade', xcar.exterior_grade, <GradeBadge grade={xcar.exterior_grade} />],
                    ['Interior Grade', xcar.interior_grade, <GradeBadge grade={xcar.interior_grade} />],
                    ['Body Type',      car.body_type],
                  ];
                  return rows.map(([label, value, node], i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center px-6 py-3 border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}`}
                    >
                      <span className="text-sm text-gray-400 font-medium">{label}</span>
                      {node ?? (
                        <span className="text-sm font-bold text-[#0D1B3E] text-right">{String(value ?? '—')}</span>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* ── Section 4: Key Features ── */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-serif font-bold text-[#0D1B3E]">Key Features</h2>
                <p className="text-sm text-gray-400 mt-0.5">Features</p>
              </div>
              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {ALL_FEATURES.map(feat => {
                  const has = hasFeature(car.features, feat);
                  return (
                    <div key={feat} className={`flex items-center gap-2 text-xs py-1 ${has ? 'text-gray-800 font-semibold' : 'text-gray-300'}`}>
                      {has
                        ? <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-[10px] font-bold">✓</span>
                        : <span className="w-4 h-4 rounded-full border border-gray-200 shrink-0" />
                      }
                      {feat}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Section 5: Similar Cars ── */}
            {similarCars.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-serif font-bold text-[#0D1B3E]">Similar Cars</h2>
                </div>
                <div className="px-6 py-4">
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {similarCars.map(sc => (
                      <CarCard key={sc.id} car={sc} variant="compact"
                        primaryImage={sc.primaryImage ?? null} pkrRate={rates.pkr} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Section 6: Buyer assurances ── */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                {[
                  { label: 'Transparent FOB pricing' },
                  { label: 'Auction-graded condition' },
                  { label: 'Worldwide shipping' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center py-6 px-4 text-center gap-2">
                    <ShieldCheck size={20} className="text-[#C8102E]" />
                    <p className="text-xs text-gray-500 font-semibold leading-snug">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT COLUMN (sticky) ══════════════ */}
          <div className="lg:w-[35%]">
            <div className="lg:sticky lg:top-28 space-y-4">

              {/* ── Price Card ── */}
              <div className="rounded-sm overflow-hidden shadow-lg" style={{ background: NAVY }}>
                <div className="px-6 pt-6 pb-4">
                  <p className="text-xs font-bold tracking-widest text-white/50 uppercase mb-3">Vehicle Price</p>

                  {/* Currency tabs */}
                  <div className="flex mb-4 bg-white/10 rounded-sm overflow-hidden">
                    {CURRENCIES.map(c => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`flex-1 py-1.5 text-xs font-bold transition-all ${currency === c ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                        style={currency === c ? { background: RED } : {}}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="text-4xl font-serif font-bold text-[#C8102E] mb-1">
                    {convertPrice(car.fob_price_usd)}
                  </div>
                  <p className="text-xs text-white/40 mb-5">FOB Price · Japan</p>

                  {/* Offer button */}
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${waOfferMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 font-bold text-sm text-white rounded-sm transition-all hover:opacity-90"
                    style={{ background: '#25D366' }}
                  >
                    ⭐ Offer Your Price
                  </a>
                </div>

                {/* Stock info */}
                <div className="px-6 py-4 border-t border-white/10 space-y-2">
                  {[
                    ['Stock Location', car.stock_location],
                    ['Port of Loading', car.port_of_loading],
                    ['Shipment', car.shipment_method],
                    ['Auction Grade', car.auction_grade],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-white/40">{k}</span>
                      <span className="text-white font-semibold">{v || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Total Price Calculator ── */}
              <div className="rounded-sm overflow-hidden shadow-lg" style={{ background: NAVY }}>
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="text-base font-serif font-bold text-white">Total Price Calculator</h3>
                </div>
                <div className="px-6 py-4 space-y-4">

                  {/* Country */}
                  <div>
                    <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Destination Country</label>
                    <select
                      value={country}
                      onChange={e => handleCountryChange(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 text-white text-sm py-2 px-3 rounded-sm focus:outline-none focus:border-[#C8102E] appearance-none"
                    >
                      {Object.keys(COUNTRIES_PORTS).map(c => (
                        <option key={c} value={c} className="text-gray-900 bg-white">{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Port */}
                  <div>
                    <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Destination Port</label>
                    <select
                      value={port}
                      onChange={e => setPort(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 text-white text-sm py-2 px-3 rounded-sm focus:outline-none focus:border-[#C8102E] appearance-none"
                    >
                      {(COUNTRIES_PORTS[country] || []).map(p => (
                        <option key={p} value={p} className="text-gray-900 bg-white">{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* Shipment type */}
                  <div>
                    <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Shipment Type</label>
                    <div className="flex bg-white/10 rounded-sm overflow-hidden border border-white/20">
                      {(['RORO', 'Container'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => setShipment(t)}
                          className={`flex-1 py-2 text-xs font-bold transition-all ${shipment === t ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                          style={shipment === t ? { background: RED } : {}}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Freight */}
                  <div>
                    <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Freight</label>
                    <div className="flex gap-4">
                      {(['Prepaid', 'Collect'] as const).map(f => (
                        <label key={f} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="freight"
                            value={f}
                            checked={freightType === f}
                            onChange={() => setFreightType(f)}
                            className="accent-[#C8102E] w-3.5 h-3.5"
                          />
                          <span className="text-xs text-white/70 font-medium">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Inspection + Insurance */}
                  <div className="flex gap-6">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Inspection</label>
                      <div className="flex gap-3">
                        {[true, false].map(v => (
                          <label key={String(v)} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="inspection"
                              checked={withInspection === v}
                              onChange={() => setWithInspection(v)}
                              className="accent-[#C8102E] w-3.5 h-3.5"
                            />
                            <span className="text-xs text-white/70 font-medium">{v ? 'Yes' : 'No'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Insurance</label>
                      <div className="flex gap-3">
                        {[true, false].map(v => (
                          <label key={String(v)} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="insurance"
                              checked={withInsurance === v}
                              onChange={() => setWithInsurance(v)}
                              className="accent-[#C8102E] w-3.5 h-3.5"
                            />
                            <span className="text-xs text-white/70 font-medium">{v ? 'Yes' : 'No'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="pt-3 border-t border-white/10">
                    {rateLoading ? (
                      <div className="flex items-center gap-2 text-white/50 text-sm py-2">
                        <Loader2 size={14} className="animate-spin" /> Calculating…
                      </div>
                    ) : calcTotalVal !== null ? (
                      <div>
                        <div className="text-2xl font-serif font-bold text-[#C8102E]">
                          TOTAL PRICE {fmt(calcTotalVal)}
                        </div>
                        {calcPkr && (
                          <p className="text-xs text-white/50 mt-1">Total Price in Local {calcPkr}</p>
                        )}
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-xs text-white/50">
                            <span>FOB Price</span><span className="text-white">{fmt(car.fob_price_usd ?? 0)}</span>
                          </div>
                          {freightType === 'Prepaid' && shippingRate && (
                            <div className="flex justify-between text-xs text-white/50">
                              <span>Freight</span><span className="text-white">{fmt(shippingRate.freight_usd)}</span>
                            </div>
                          )}
                          {withInspection && shippingRate && (
                            <div className="flex justify-between text-xs text-white/50">
                              <span>Inspection</span><span className="text-white">{fmt(shippingRate.inspection_fee)}</span>
                            </div>
                          )}
                          {withInsurance && shippingRate && (
                            <div className="flex justify-between text-xs text-white/50">
                              <span>Insurance</span><span className="text-white">{fmt((car.fob_price_usd ?? 0) * shippingRate.insurance_rate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-serif font-bold text-[#C8102E] mb-2">ASK</div>
                        <p className="text-xs text-white/40 mb-3">Rate not available. Contact us for a quote.</p>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white rounded-sm transition-all hover:opacity-90"
                          style={{ background: '#25D366' }}
                        >
                          <MessageCircle size={13} /> Get Quote on WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Inquiry Form ── */}
              <div id="inquiry-section" className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100" style={{ background: NAVY }}>
                  <h3 className="text-base font-serif font-bold text-white">Get Price &amp; Shipping Quote</h3>
                  <p className="text-xs text-white/50 mt-0.5">We'll reply on WhatsApp with your full landed cost</p>
                </div>

                {formStatus === 'success' ? (
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                      <Check size={22} className="text-emerald-600" />
                    </div>
                    <p className="font-bold text-gray-800 mb-2">Quote Request Received!</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Our team will reach out on WhatsApp within a few hours with your complete price — FOB, freight, inspection, and insurance all included.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="p-5 space-y-3">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Tell us where to ship it. We'll calculate the full landed cost and send you a breakdown — no commitment required.
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Vehicle Reference</label>
                      <input
                        type="text"
                        value={car.ref_number}
                        readOnly
                        className="w-full border border-gray-200 bg-gray-50 text-gray-400 text-sm px-3 py-2 rounded-sm cursor-not-allowed font-mono tracking-wide"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">
                          Destination Country <span className="text-[#C8102E]">*</span>
                        </label>
                        <select
                          name="dest_country"
                          required
                          value={formCountry}
                          onChange={e => setFormCountry(e.target.value)}
                          className="w-full border border-gray-200 text-gray-800 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-[#C8102E] bg-white"
                        >
                          <option value="">Where are you shipping to?</option>
                          {Object.keys(COUNTRIES_PORTS).map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Nearest Port</label>
                        <input
                          name="dest_port"
                          type="text"
                          placeholder="e.g. Karachi, Dubai, Mombasa"
                          className="w-full border border-gray-200 text-gray-800 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-[#C8102E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">
                        Your Full Name <span className="text-[#C8102E]">*</span>
                      </label>
                      <input name="name" type="text" required placeholder="e.g. Ahmed Al-Rashid" className="w-full border border-gray-200 text-gray-800 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-[#C8102E]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">
                        WhatsApp Number <span className="text-[#C8102E]">*</span>
                      </label>
                      <input name="phone" type="tel" required placeholder="+1 234 567 8900 (with country code)" className="w-full border border-gray-200 text-gray-800 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-[#C8102E]" />
                      <p className="text-[10px] text-gray-400 mt-0.5">We'll send your quote here first</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">
                        Email Address <span className="text-[#C8102E]">*</span>
                      </label>
                      <input name="email" type="email" required placeholder="your@email.com" className="w-full border border-gray-200 text-gray-800 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-[#C8102E]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Additional Notes</label>
                      <textarea
                        name="message"
                        rows={3}
                        defaultValue={`Hi, I'm interested in the ${car.year} ${car.make} ${car.model} (Ref: ${car.ref_number}). Please send me the total landed cost to my destination, including freight, inspection, and insurance.`}
                        className="w-full border border-gray-200 text-gray-800 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-[#C8102E] resize-none"
                      />
                    </div>

                    {formStatus === 'error' && (
                      <p className="text-xs text-[#C8102E]">⚠ Something went wrong. Please try again or reach us directly on WhatsApp.</p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-3 font-bold text-sm text-white rounded-sm transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                      style={{ background: RED }}
                    >
                      {formStatus === 'submitting' ? (
                        <><Loader2 size={15} className="animate-spin" /> Calculating your quote…</>
                      ) : (
                        <><Send size={15} /> Get My Shipping Quote</>
                      )}
                    </button>
                    <p className="text-[10px] text-gray-400 text-center">No payment required. We'll send you the full price breakdown.</p>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky mobile action bar (replaces floating WA button) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden shadow-2xl" style={{ background: NAVY }}>
        <div className="flex items-center gap-3 px-4 py-3 border-t border-white/10">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-white/40 uppercase tracking-wider leading-none mb-0.5">FOB Price</p>
            <p className="text-lg font-serif font-bold text-[#C8102E] truncate leading-tight">{convertPrice(car.fob_price_usd ?? 0)}</p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 font-bold text-xs text-white rounded-sm shrink-0 transition-opacity hover:opacity-90 active:opacity-75"
            style={{ background: '#25D366' }}
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a
            href="#inquiry-section"
            className="flex items-center gap-1.5 px-4 py-2.5 font-bold text-xs text-white rounded-sm shrink-0 transition-opacity hover:opacity-90 active:opacity-75"
            style={{ background: RED }}
          >
            <Send size={14} /> Inquire
          </a>
        </div>
      </div>
    </div>
  );
}

