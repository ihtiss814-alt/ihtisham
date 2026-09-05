import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { useMeta } from '@/lib/use-meta';
import CarCard, { Car } from '@/components/CarCard';
import {
  breadcrumbJsonLd,
  isAvailableVehicle,
  isIndexableVehicle,
  isSoldVehicle,
  validImageUrls,
  vehicleCanonical,
  vehicleDescription,
  vehicleJsonLd,
  vehicleImageAlt,
  vehicleSummary,
  vehicleTitle,
  rankRelatedVehicles,
} from '@/lib/vehicle-seo';
import {
  COUNTRY_PORTS as COUNTRIES_PORTS, fetchShippingRate, computeLandedCost,
  type ShippingRate,
} from '@/lib/shipping';
import ImageGallery from '@/components/ImageGallery';
import './car-detail.css';
import {
  Heart, Share2, Check, ChevronRight, Send,
  Gauge, Settings, Droplet, Palette, Users, DoorOpen,
  ShieldCheck, ChevronLeft, Loader2, MapPin, Images,
  BadgeCheck, ArrowUpRight, Calculator, CircleDollarSign,
  CarFront,
} from 'lucide-react';

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useMeta({
    title: car ? vehicleTitle(car) : 'Vehicle details | Wazir Trading LLC',
    description: car
      ? vehicleDescription(car)
      : 'Browse Japanese used vehicle details from Wazir Trading LLC.',
    canonical: ref ? vehicleCanonical(ref) : undefined,
    noindex: !car || !isIndexableVehicle(car),
  });

  /* ─── fetch car ─── */
  useEffect(() => {
    async function load() {
      if (!ref || !isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*, car_images(image_url, is_primary, display_order)')
          .eq('ref_number', ref)
          .single();
        if (error) throw error;
        setCar(data);
      } catch (error) {
        console.warn('Could not load vehicle details:', error);
        setCar(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [ref]);

  /* ─── check saved ─── */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wazir_saved_cars') || '[]');
    setSaved(saved.includes(ref));
  }, [ref]);

  /* ─── social metadata and structured data ─── */
  useEffect(() => {
    if (!car) return;
    const title = vehicleTitle(car);
    const content = vehicleDescription(car);
    const canonicalUrl = vehicleCanonical(car.ref_number);
    const images = validImageUrls(car);

    const setMeta = (property: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    setMeta('og:title', title);
    setMeta('og:description', content);
    setMeta('og:url', canonicalUrl);
    setMeta('og:type', 'product');
    if (images[0]) setMeta('og:image', images[0]);

    const setJsonLd = (id: string, value: Record<string, unknown>) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(value);
    };
    setJsonLd('vehicle-jsonld', vehicleJsonLd(car, images));
    setJsonLd('breadcrumb-jsonld', breadcrumbJsonLd(car));

    return () => {
      document.getElementById('vehicle-jsonld')?.remove();
      document.getElementById('breadcrumb-jsonld')?.remove();
    };
  }, [car]);

  /* ─── similar cars (with primary images) ─── */
  useEffect(() => {
    if (!car || !isSupabaseConfigured) return;
    const currentCar = car;
    async function fetchSimilar() {
      const select = '*, car_images!inner(image_url, is_primary, display_order)';
      const filters = [
        supabase.from('cars').select(select).eq('make', currentCar.make).eq('model', currentCar.model),
        supabase.from('cars').select(select).eq('make', currentCar.make),
        ...(currentCar.body_type
          ? [supabase.from('cars').select(select).eq('body_type', currentCar.body_type)]
          : []),
      ];
      const results = await Promise.all(filters.map(query => query
        .neq('id', currentCar.id)
        .eq('status', 'available')
        .order('year', { ascending: false })
        .limit(16)));
      const candidates = results.flatMap(result => result.data ?? []);
      const qualityCars = rankRelatedVehicles(currentCar, candidates, 6) as Car[];
      setSimilarCars(qualityCars.map((candidate: Car) => ({
        ...candidate,
        primaryImage: validImageUrls(candidate)[0] ?? undefined,
      })));
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
      destination_country: country,
      destination_port: port,
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
      <div className="min-h-screen flex items-center justify-center bg-white" style={{ paddingTop: 'var(--header-h)' }}>
        <Loader2 size={32} className="animate-spin text-[#C8102E]" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen pb-20 bg-white text-center px-4" style={{ paddingTop: 'var(--header-h)' }}>
        <h1 className="text-3xl font-serif font-bold text-[#0D1B3E] mb-4">Car Not Found</h1>
        <p className="text-gray-500 mb-8">This car is no longer available or has been removed from our inventory.</p>
        <Link href="/cars" className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-6 py-3 font-semibold hover:bg-red-700 transition-colors">
          <ChevronLeft size={16} /> Back to Cars
        </Link>
      </div>
    );
  }

  const isAvailable = isAvailableVehicle(car);
  const isSold = isSoldVehicle(car);
  const waOfferMsg = encodeURIComponent(
    `Hi, I would like to make an offer for ${car.make} ${car.model} ${car.year}\nReference: ${car.ref_number}\nPlease let me know your best price.`
  );
  const waDetailMsg = encodeURIComponent(
    `Hi Wazir Trading, I am interested in ${car.make} ${car.model} ${car.year} (Ref: ${car.ref_number}). Is it still available?`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waDetailMsg}`;

  const { total: calcTotalVal, pkr: calcPkr } = calcTotal();

  return (
    <div className="car-detail-page min-h-screen pb-28 lg:pb-24" style={{ paddingTop: 'var(--header-h)' }}>
      <div className="car-detail-shell max-w-[1280px] mx-auto px-4 md:px-6">

        {/* Breadcrumb */}
        <nav className="car-detail-breadcrumb mb-5 flex items-center gap-1.5 text-sm text-gray-400 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#C8102E] transition-colors">Home</Link>
          <ChevronRight size={13} className="text-gray-300" />
          <Link href="/cars" className="hover:text-[#C8102E] transition-colors">Cars</Link>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-gray-400">Japan Stock</span>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-gray-600 font-medium">{car.make} {car.model}</span>
        </nav>

        {/* Two-column layout */}
        <div className="car-detail-layout flex flex-col lg:flex-row gap-6">

          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div className="car-detail-primary lg:w-[65%] space-y-5">

            {/* ── Section 1: Car Header Card ── */}
            <div className="car-detail-header bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="car-detail-kicker">
                  <span className="car-detail-live-dot" />
                   <span>{isSold ? 'Sold / no longer available' : isAvailable ? 'Available in Japan' : 'Availability to be confirmed'}</span>
                  <span className="car-detail-kicker-separator">/</span>
                  <span className="car-detail-reference">REF {car.ref_number}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleSave}
                    className={`car-detail-icon-button w-8 h-8 flex items-center justify-center rounded-full border transition-all ${saved ? 'bg-red-50 border-red-200 text-[#C8102E]' : 'border-gray-200 text-gray-400 hover:border-[#C8102E] hover:text-[#C8102E]'}`}
                    title={saved ? 'Saved' : 'Save'}
                    aria-label={saved ? 'Remove from saved cars' : 'Save this car'}
                  >
                    <Heart size={15} fill={saved ? '#C8102E' : 'none'} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="car-detail-icon-button w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-[#C8102E] hover:text-[#C8102E] transition-all relative"
                    title="Share"
                    aria-label="Share this car"
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

              <div className="car-detail-title-row flex items-end gap-3 flex-wrap mb-2">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0D1B3E]">
                  {car.make} {car.model}
                </h1>
                <span className="car-detail-year text-2xl md:text-3xl font-serif font-bold text-[#C8102E]">{car.year}</span>
              </div>
              {car.variant && (
                <p className="car-detail-variant text-base text-gray-400 font-medium mb-5">{car.variant}</p>
              )}

              <div className="car-detail-meta-row">
                <span><MapPin size={14} /> Stocked in {car.stock_location || 'Japan'}</span>
                <span><BadgeCheck size={14} /> {isSold ? 'Historical vehicle record' : 'Export-ready vehicle'}</span>
              </div>

              {/* Quick spec chips */}
              <div className="car-detail-stat-grid flex flex-wrap gap-2 mt-5">
                {[
                  { icon: <Gauge size={16} />, label: 'Mileage', value: car.mileage_km != null ? `${fmtNum(car.mileage_km)} km` : '—' },
                  { icon: <Settings size={16} />, label: 'Engine', value: car.engine_cc != null ? `${car.engine_cc} CC` : '—' },
                  { icon: <Droplet size={16} />, label: 'Fuel', value: car.fuel_type || '—' },
                  { icon: <Settings size={16} />, label: 'Transmission', value: car.transmission || '—' },
                  { icon: <Palette size={16} />, label: 'Exterior', value: car.color || '—' },
                  ...(car.seats != null ? [{ icon: <Users size={16} />, label: 'Seats', value: String(car.seats) }] : []),
                  ...(car.doors != null ? [{ icon: <DoorOpen size={16} />, label: 'Doors', value: String(car.doors) }] : []),
                ].map((chip, i) => (
                  <div key={i} className="car-detail-stat">
                    <span className="car-detail-stat-icon">{chip.icon}</span>
                    <span>
                      <small>{chip.label}</small>
                      <strong>{chip.value}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 1a: factual overview ── */}
            <section className="car-detail-content-card bg-white border border-gray-200 rounded-sm p-6 shadow-sm" aria-labelledby="vehicle-overview">
              <div className="car-detail-section-heading mb-3">
                <span className="car-detail-section-icon"><CarFront size={17} /></span>
                <div>
                  <h2 id="vehicle-overview" className="text-xl font-serif font-bold text-[#0D1B3E]">Vehicle overview</h2>
                  <p>Key facts from this vehicle record</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{vehicleSummary(car)}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                <Link href="/how-it-works" className="text-[#C8102E] hover:underline">How buying works <ArrowUpRight size={12} className="inline" /></Link>
                <Link href="/shipping-information" className="text-[#C8102E] hover:underline">Shipping information <ArrowUpRight size={12} className="inline" /></Link>
                <Link href="/payment-information" className="text-[#C8102E] hover:underline">Payment information <ArrowUpRight size={12} className="inline" /></Link>
                <Link href="/contact" className="text-[#C8102E] hover:underline">Ask about this vehicle <ArrowUpRight size={12} className="inline" /></Link>
              </div>
            </section>

            {/* ── Mobile-only: compact price + CTA (visible before gallery on small screens) ── */}
            <div className="car-detail-mobile-price lg:hidden rounded-sm overflow-hidden shadow-lg" style={{ background: NAVY }}>
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
                    <div className="text-3xl font-mono font-bold text-[#C8102E]">{convertPrice(car.fob_price_usd ?? 0)}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 mb-0.5">PKR</p>
                    <p className="text-sm font-mono font-bold text-white/70">{fmtNum(Math.round((car.fob_price_usd ?? 0) * rates.pkr))}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {isAvailable ? (
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${waOfferMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 font-bold text-xs text-white rounded-sm transition-all hover:opacity-90"
                      style={{ background: '#25D366' }}
                    >
                      Make an offer
                    </a>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5 py-2.5 font-bold text-xs text-white/70 rounded-sm bg-white/10">
                      {isSold ? 'Vehicle sold' : 'Availability to confirm'}
                    </span>
                  )}
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
            <div className="car-detail-gallery-card bg-white border border-gray-200 rounded-sm p-4 shadow-sm">
              <div className="car-detail-gallery-header">
                <div className="car-detail-section-heading">
                  <span className="car-detail-section-icon"><Images size={17} /></span>
                  <div>
                    <h2>Vehicle photography</h2>
                    <p>Detailed images from our Japan stock inspection</p>
                  </div>
                </div>
                <span className="car-detail-gallery-ref">REF {car.ref_number}</span>
              </div>
              <ImageGallery
                carId={car.id}
                refNumber={car.ref_number}
                make={car.make}
                model={car.model}
                year={car.year}
                variant={car.variant}
              />
            </div>

            {/* ── Section 3: Specifications Table ── */}
            <div className="car-detail-content-card bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="car-detail-section-heading">
                  <span className="car-detail-section-icon"><CircleDollarSign size={17} /></span>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#0D1B3E]">Specifications</h2>
                    <p>Everything you need to compare with confidence</p>
                  </div>
                </div>
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
            <div className="car-detail-content-card bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="car-detail-section-heading">
                  <span className="car-detail-section-icon"><BadgeCheck size={17} /></span>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#0D1B3E]">Key Features</h2>
                    <p>Equipment listed on the Japan auction sheet</p>
                  </div>
                </div>
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

            {/* ── Section 5: Related Vehicles ── */}
            {isIndexableVehicle(car) && similarCars.length > 0 && (
              <div className="car-detail-content-card bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-serif font-bold text-[#0D1B3E]">Related vehicles</h2>
                      <p className="text-sm text-gray-400 mt-0.5">Available vehicles selected from our Japan stock</p>
                    </div>
                    <Link href="/cars" className="car-detail-inline-link hidden sm:flex">View all <ArrowUpRight size={14} /></Link>
                  </div>
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
            <div className="car-detail-assurance bg-white border border-gray-200 rounded-sm shadow-sm">
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
          <div className="car-detail-aside lg:w-[35%]">
            <div className="lg:sticky lg:top-28 space-y-4">

              {/* ── Price Card ── */}
              <div className="car-detail-price-card rounded-sm overflow-hidden shadow-lg" style={{ background: NAVY }}>
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

                  <div className="text-4xl font-mono font-bold text-[#C8102E] mb-1">
                    {convertPrice(car.fob_price_usd)}
                  </div>
                  <p className="text-xs text-white/40 mb-5">FOB Price · Japan</p>

                  {/* Offer button */}
                  {isAvailable && (
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${waOfferMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 font-bold text-sm text-white rounded-sm transition-all hover:opacity-90"
                      style={{ background: '#25D366' }}
                    >
                      Make an offer
                    </a>
                  )}
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
              <div className="car-detail-calculator rounded-sm overflow-hidden shadow-lg" style={{ background: NAVY }}>
                <div className="px-6 py-4 border-b border-white/10">
                  <div className="flex items-start gap-3">
                    <span className="car-detail-aside-icon"><Calculator size={16} /></span>
                    <div>
                      <h3 className="text-base font-serif font-bold text-white">Build your landed cost</h3>
                      <p className="text-xs text-white/45 mt-0.5">See an estimate for your destination</p>
                    </div>
                  </div>
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
                        <div className="text-2xl font-mono font-bold text-[#C8102E]">
                          TOTAL PRICE {fmt(calcTotalVal)}
                        </div>
                        {calcPkr && (
                          <p className="text-xs text-white/50 mt-1">Total Price in Local {calcPkr}</p>
                        )}
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-xs text-white/50">
                          <span>FOB Price</span><span className="font-mono text-white">{fmt(car.fob_price_usd ?? 0)}</span>
                          </div>
                          {freightType === 'Prepaid' && shippingRate && (
                            <div className="flex justify-between text-xs text-white/50">
                              <span>Freight</span><span className="font-mono text-white">{fmt(shippingRate.freight_usd)}</span>
                            </div>
                          )}
                          {withInspection && shippingRate && (
                            <div className="flex justify-between text-xs text-white/50">
                              <span>Inspection</span><span className="font-mono text-white">{fmt(shippingRate.inspection_fee)}</span>
                            </div>
                          )}
                          {withInsurance && shippingRate && (
                            <div className="flex justify-between text-xs text-white/50">
                              <span>Insurance</span><span className="font-mono text-white">{fmt((car.fob_price_usd ?? 0) * shippingRate.insurance_rate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-mono font-bold text-[#C8102E] mb-2">ASK</div>
                        <p className="text-xs text-white/40 mb-3">Rate not available. Contact us for a quote.</p>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white rounded-sm transition-all hover:opacity-90"
                          style={{ background: '#25D366' }}
                        >
                          <WhatsAppIcon size={13} /> Get Quote on WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Inquiry Form ── */}
              <div id="inquiry-section" className="car-detail-inquiry bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100" style={{ background: NAVY }}>
                  <h3 className="text-base font-serif font-bold text-white">Talk to a car export specialist</h3>
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
                          value={country}
                          onChange={e => handleCountryChange(e.target.value)}
                          className="w-full border border-gray-200 text-gray-800 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-[#C8102E] bg-white"
                        >
                          <option value="" disabled>Where are you shipping to?</option>
                          {Object.keys(COUNTRIES_PORTS).map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Nearest Port</label>
                        <select
                          name="dest_port"
                          required
                          value={port}
                          onChange={e => setPort(e.target.value)}
                          className="w-full border border-gray-200 text-gray-800 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-[#C8102E]"
                        >
                          {COUNTRIES_PORTS[country]?.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
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
                      <p className="text-xs text-[#C8102E]">Something went wrong. Please try again or reach us directly on WhatsApp.</p>
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
            <p className="text-lg font-mono font-bold text-[#C8102E] truncate leading-tight">{convertPrice(car.fob_price_usd ?? 0)}</p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 font-bold text-xs text-white rounded-sm shrink-0 transition-opacity hover:opacity-90 active:opacity-75"
            style={{ background: '#25D366' }}
          >
            <WhatsAppIcon size={14} /> WhatsApp
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

