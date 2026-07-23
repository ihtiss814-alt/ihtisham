import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'wouter';
import { supabase } from '@/lib/supabase';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { Car } from '@/components/CarCard';
import ImageGallery from '@/components/ImageGallery';
import {
  Heart, Share2, Check, ChevronRight, Phone, Send,
  Gauge, Settings, Droplet, Palette, Users, DoorOpen,
  Star, ChevronLeft, MessageCircle, Loader2,
} from 'lucide-react';

/* ─────────────────────────────── types ─────────────────────────────── */
type ExtendedCar = Car & {
  engine_code?: string;
  model_code?: string;
  features?: Record<string, boolean> | null;
};

type SimilarCar = Car & {
  primaryImage?: string;
};

interface ShippingRate {
  country: string;
  port: string;
  freight_usd: number;
  inspection_fee: number;
  insurance_rate: number;
}

interface ExchangeRate {
  currency: string;
  rate: number; // relative to USD
}

/* ──────────────────────────── constants ─────────────────────────────── */
const RED = '#C8102E';
const NAVY = '#0D1B3E';
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';

const COUNTRIES_PORTS: Record<string, string[]> = {
  Pakistan: ['Karachi', 'Gwadar'],
  UAE: ['Dubai', 'Abu Dhabi'],
  UK: ['Southampton', 'Tilbury'],
  Guyana: ['Georgetown'],
  Jamaica: ['Kingston'],
  Trinidad: ['Port of Spain'],
  Barbados: ['Bridgetown'],
  Antigua: ['St. John\'s'],
  'St Kitts': ['Basseterre'],
  'St Vincent': ['Kingstown'],
  Suriname: ['Paramaribo'],
  Aruba: ['Oranjestad'],
  Anguilla: ['Blowing Point'],
  Dominica: ['Roseau'],
  Grenada: ['St. George\'s'],
  Chile: ['Valparaíso'],
  'Papua New Guinea': ['Port Moresby'],
  Kenya: ['Mombasa'],
  Uganda: ['Mombasa (via KE)'],
  Mauritius: ['Port Louis'],
  Fiji: ['Suva'],
  Zimbabwe: ['Beira (via MZ)'],
  Cyprus: ['Limassol'],
  Tanzania: ['Dar es Salaam'],
  Namibia: ['Walvis Bay'],
  Zambia: ['Durban (via ZA)'],
  'South Africa': ['Durban'],
  'South Sudan': ['Mombasa (via KE)'],
  Georgia: ['Poti'],
  Malta: ['Valletta'],
  Australia: ['Melbourne', 'Sydney'],
  Ghana: ['Tema'],
};

const ALL_FEATURES = [
  '360 Camera', 'Air Bag', 'Air Conditioner', 'Alloy Wheels', 'Anti Brake System',
  'Automatic Air Conditioning', 'Back Camera', 'Back Spoiler', 'Double Muffler',
  'FOG Light', 'HID', 'Keyless Entry', 'Leather Seats', 'Navigation',
  'Parking Sensors', 'Power Steering', 'Power Windows', 'Push Start', 'Radio',
  'Retractable Mirror', 'Roof Rail', 'Sun Roof', 'TV', 'Cruise Control',
  'Blind Spot Monitor',
];

const CURRENCIES = ['USD', 'GBP', 'EUR', 'JPY'] as const;
type Currency = typeof CURRENCIES[number];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$', GBP: '£', EUR: '€', JPY: '¥',
};

/* ─────────────────────────── helpers ───────────────────────────────── */
function fmt(n: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtNum(n: number) {
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
    document.title = `${car.make} ${car.model} ${car.year}${car.variant ? ' ' + car.variant : ''} | Buy from Japan | Wazir Trading LLC`;
    const desc = document.querySelector('meta[name="description"]');
    const content = `${car.make} ${car.model} ${car.year}, ${fmtNum(car.mileage_km)}km, ${car.engine_cc}CC, ${car.color}, ${car.transmission}. FOB $${car.fob_price_usd}. Export from Japan. Ref ${car.ref_number}. Contact Wazir Trading.`;
    if (desc) desc.setAttribute('content', content);
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = content;
      document.head.appendChild(m);
    }
    return () => { document.title = 'Wazir Trading LLC'; };
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

  /* ─── shipping rate ─── */
  const fetchShippingRate = useCallback(async (c: string, p: string) => {
    setRateLoading(true);
    setShippingRate(null);
    const { data } = await supabase
      .from('shipping_rates')
      .select('*')
      .eq('country', c)
      .eq('port', p)
      .maybeSingle();
    setShippingRate(data);
    setRateLoading(false);
  }, []);

  useEffect(() => {
    fetchShippingRate(country, port);
  }, [country, port, fetchShippingRate]);

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
  const convertPrice = (usd: number): string => {
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
    if (!car || !shippingRate) return { total: null, pkr: null };
    const fob = car.fob_price_usd;
    const freight = freightType === 'Prepaid' ? shippingRate.freight_usd : 0;
    const inspection = withInspection ? shippingRate.inspection_fee : 0;
    const insurance = withInsurance ? fob * shippingRate.insurance_rate : 0;
    const total = fob + freight + inspection + insurance;
    const pkr = `PKR ${fmtNum(Math.round(total * rates.pkr))}`;
    return { total, pkr };
  };

  /* ─── loading / not found ─── */
  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-white">
        <Loader2 size={32} className="animate-spin text-[#C8102E]" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-white text-center px-4">
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
    <div className="min-h-screen bg-gray-50 pt-28 pb-28 lg:pb-24">
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
                  { icon: <Settings size={13} />, label: `${car.engine_cc} CC` },
                  { icon: <Droplet size={13} />, label: car.fuel_type },
                  { icon: <span className="text-[11px]">⚙️</span>, label: car.transmission },
                  { icon: <Palette size={13} />, label: car.color },
                  { icon: <Users size={13} />, label: `${car.seats} Seats` },
                  { icon: <DoorOpen size={13} />, label: `${car.doors} Doors` },
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
                    <div className="text-3xl font-serif font-bold text-[#C8102E]">{convertPrice(car.fob_price_usd)}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 mb-0.5">PKR</p>
                    <p className="text-sm font-bold text-white/70">{fmtNum(Math.round(car.fob_price_usd * rates.pkr))}</p>
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
                {[
                  ['Reference #', car.ref_number],
                  ['Chassis No.', car.chassis_number],
                  ['Mileage', `${fmtNum(car.mileage_km)} km`],
                  ['Year', car.year],
                  ['Engine', `${car.engine_cc} CC`],
                  ['Fuel', car.fuel_type],
                  ['Seats', car.seats],
                  ['Engine Code', (car as ExtendedCar).engine_code || '—'],
                  ['Color', car.color],
                  ['Drive', car.drive],
                  ['Doors', car.doors],
                  ['Transmission', car.transmission],
                  ['Model Code', (car as ExtendedCar).model_code || '—'],
                  ['Steering', car.steering],
                  ['Auction Grade', car.auction_grade],
                  ['Body Type', car.body_type],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center px-6 py-3 border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}`}
                  >
                    <span className="text-sm text-gray-400 font-medium">{label}</span>
                    <span className="text-sm font-bold text-[#0D1B3E] text-right">{String(value ?? '—')}</span>
                  </div>
                ))}
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
                  const has = car.features
                    ? (typeof car.features === 'object' && !Array.isArray(car.features)
                        ? !!car.features[feat]
                        : Array.isArray(car.features)
                          ? (car.features as string[]).includes(feat)
                          : false)
                    : false;
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
                      <SimilarCarCard key={sc.id} car={sc} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Section 6: Reviews compact ── */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                {[
                  { value: '500+', label: 'Happy Customers' },
                  { value: '5.0', label: 'Star Rating', icon: <Star size={14} className="text-yellow-400 fill-yellow-400" /> },
                  { value: '100%', label: 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                    <div className="flex items-center gap-1">
                      {stat.icon}
                      <span className="text-2xl font-serif font-bold text-[#0D1B3E]">{stat.value}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
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
                            <span>FOB Price</span><span className="text-white">{fmt(car.fob_price_usd)}</span>
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
                              <span>Insurance</span><span className="text-white">{fmt(car.fob_price_usd * shippingRate.insurance_rate)}</span>
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
            <p className="text-lg font-serif font-bold text-[#C8102E] truncate leading-tight">{convertPrice(car.fob_price_usd)}</p>
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

/* ══════════════════════════════════════════════════════════════════════
   SIMILAR CAR CARD
══════════════════════════════════════════════════════════════════════ */
function SimilarCarCard({ car }: { car: SimilarCar }) {
  const [imgErr, setImgErr] = useState(false);
  const waNum = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waMsg = encodeURIComponent(`Hi, I am interested in ${car.make} ${car.model} ${car.year} (Ref: ${car.ref_number}). Is it available?`);
  const { pkr: pkrRate } = useExchangeRate();
  const imgUrl = car.primaryImage ?? null;

  return (
    <div className="flex-shrink-0 w-52 bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/cars/${car.ref_number}`}>
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          <span className="absolute top-2 left-2 z-10 bg-[#0D1B3E] text-white text-[10px] font-bold px-2 py-0.5">{car.year}</span>
          <span className="absolute top-2 right-2 z-10 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5">{car.engine_cc}CC</span>
          {imgUrl && !imgErr ? (
            <img src={imgUrl} alt={`${car.make} ${car.model}`} onError={() => setImgErr(true)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <span className="text-xs text-gray-300 font-serif">{car.make} {car.model}</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-3">
        <Link href={`/cars/${car.ref_number}`} className="block font-serif font-bold text-[#0D1B3E] text-sm leading-tight hover:text-[#C8102E] transition-colors mb-0.5 line-clamp-1">
          {car.make} {car.model}
        </Link>
        <p className="text-[10px] text-gray-400 mb-2">REF #{car.ref_number}</p>
        <p className="text-base font-serif font-bold text-[#C8102E]">
          ${car.fob_price_usd.toLocaleString()}
        </p>
        <p className="text-[10px] text-gray-400 mb-3">
          PKR {(car.fob_price_usd * pkrRate).toLocaleString()}
        </p>
        <div className="flex gap-1.5">
          <Link
            href={`/cars/${car.ref_number}`}
            className="flex-1 text-center text-[10px] font-bold py-1.5 text-white rounded-sm"
            style={{ background: '#C8102E' }}
          >
            Inquire
          </Link>
          <a
            href={`https://wa.me/${waNum}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-[10px] font-bold py-1.5 text-white rounded-sm flex items-center justify-center gap-1"
            style={{ background: '#25D366' }}
          >
            <MessageCircle size={10} /> WA
          </a>
        </div>
      </div>
    </div>
  );
}
