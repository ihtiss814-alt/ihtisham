import { memo, useState } from 'react';
import { Link } from 'wouter';
import { Heart, ImageOff, Eye } from 'lucide-react';
import { isThirdPartyListing, ThirdPartyImageBadge } from '@/components/ThirdPartyImageBadge';
import { vehicleImageAlt } from '@/lib/vehicle-seo';

export interface Car {
  id: string;
  ref_number: string;
  make: string;
  model: string;
  variant?: string | null;
  chassis_number?: string;
  year: number | null;
  engine_cc?: number | null;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  color?: string;
  drive?: string;
  steering?: string;
  seats?: number | null;
  doors?: number | null;
  mileage_km?: number | null;
  auction_grade?: string;
  fob_price_usd: number | null;
  stock_location?: string;
  port_of_loading?: string;
  shipment_method?: string;
  status?: string;
  collection?: string;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  features?: any;
  created_at?: string;
  exterior_grade?: string;
  interior_grade?: string;
  lot_number?: string;
  manufacture_month?: string | number;
  car_images?: Array<{ image_url: string; is_primary?: boolean }>;
}

export type CarCardVariant = 'row' | 'grid' | 'compact';

/** Prefer the DB-flagged primary image, falling back to the first image seen. */
export function resolvePrimaryImage(
  images?: Array<{ image_url: string; is_primary?: boolean }> | null,
): string | null {
  if (!images || images.length === 0) return null;
  return images.find(i => i.is_primary)?.image_url ?? images[0].image_url ?? null;
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhotoPlaceholder({ label }: { label?: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-gray-50 to-gray-100">
      <ImageOff size={32} strokeWidth={1.2} className="text-slate-300" aria-hidden="true" />
      {label && <span className="text-[11px] font-medium text-gray-400">{label}</span>}
    </div>
  );
}

function fmtUSD(price: number | null | undefined): string {
  if (price == null) return '—';
  return `$${price.toLocaleString()}`;
}

function waTitle(car: Car): string {
  return `${car.make} ${car.model}${car.variant ? ' ' + car.variant : ''} ${car.year ?? ''}`.trim();
}

interface CarCardProps {
  car: Car;
  variant: CarCardVariant;
  primaryImage?: string | null;
  pkrRate?: number;
  waNumber?: string;
  /** row variant only — parent supplies the "Offer Price" dialog trigger handling */
  onOfferPrice?: (car: Car) => void;
  /** grid variant only — favorite heart is shown only when a handler is supplied */
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  /** grid variant only — drop the image overlay badges (new arrival / year, engine cc) */
  hideBadges?: boolean;
}

function CarCard({
  car, variant, primaryImage = null, pkrRate = 0,
  waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375',
  onOfferPrice, isFavorite, onToggleFavorite, hideBadges = false,
}: CarCardProps) {
  const [imgError, setImgError] = useState(false);
  const href = `/cars/${car.ref_number}`;
  const pkrPrice = pkrRate > 0 && car.fob_price_usd != null ? Math.round(car.fob_price_usd * pkrRate) : null;
  const waMsg = encodeURIComponent(
    `Hi, I am interested in ${waTitle(car)}\nReference: ${car.ref_number}\nPlease share more details.`,
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMsg}`;
  const isSold = car.status === 'sold';
  const isClearance = car.collection?.toLowerCase() === 'clearance';
  const showImage = primaryImage && !imgError;

  /* ── Row — used on the /cars listing ─────────────────────────────── */
  if (variant === 'row') {
    const badges = [
      car.year ? String(car.year) : null,
      car.mileage_km ? `${car.mileage_km.toLocaleString()} km` : null,
      car.engine_cc ? `${car.engine_cc} cc` : null,
      car.transmission || null,
      car.fuel_type || null,
      car.body_type || null,
      car.steering || null,
      car.drive || null,
      car.color || null,
    ].filter(Boolean) as string[];

    return (
      <div className="car-card car-card-row">
        <Link href={href} className="car-card-image-link">
          <div className="car-img">
            {(car.is_new_arrival || isClearance) && (
              <div
                className="car-badge"
                style={{ background: isClearance ? '#D97706' : '#16A34A' }}>
                {isClearance ? 'CLEARANCE' : 'New Arrival'}
              </div>
            )}
            {showImage ? (
              <img src={primaryImage!} alt={vehicleImageAlt(car, 0)} onError={() => setImgError(true)}
                className="car-img-photo" loading="lazy" decoding="async" />
            ) : (
              <div className="absolute inset-0"><PhotoPlaceholder label="Photo Coming Soon" /></div>
            )}
            {showImage && isThirdPartyListing(car.ref_number) && (
              <ThirdPartyImageBadge className="bottom-2 left-2" />
            )}
            <span className="car-ref">#{car.ref_number}</span>
          </div>
        </Link>

        <div className="car-body">
          <div className="car-card-heading">
            <Link href={href}>
              <h3 className="car-name">
                {car.make} {car.model}{car.variant ? ` ${car.variant}` : ''}
              </h3>
            </Link>
            <div className="car-meta">
              <span className="origin-dot" />
              <span className="car-origin">{car.stock_location || 'Japan'}</span>
            </div>
          </div>

          <div className="specs">
            {badges.map((b, i) => (
              <span key={i} className={`st st-${['year', 'km', 'cc', 'trans', 'fuel', 'body', 'drive', 'color'][i] ?? 'color'}`}>
                {b}
              </span>
            ))}
          </div>

          <div className="car-foot">
            <div className="price-block">
              <div className="price-usd">
                {fmtUSD(car.fob_price_usd)}
              </div>
              {pkrPrice != null && (
                <div className="price-pkr">PKR {pkrPrice.toLocaleString()}</div>
              )}
            </div>

            <div className="car-actions">
              <Link href={href} className="bsm bsm-view">
                <Eye size={13} />
              View Details
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="bsm bsm-wa">
              <WhatsAppIcon size={12} /> WhatsApp
              </a>
              {onOfferPrice && (
                <button onClick={() => onOfferPrice(car)} className="bsm bsm-offer">
                Offer Price
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Compact — similar-cars rail on the detail page ──────────────── */
  if (variant === 'compact') {
    return (
      <div className="flex-shrink-0 w-52 bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow">
        <Link href={href}>
          <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
            <span className="absolute top-2 left-2 z-10 bg-[#0D1B3E] text-white text-[10px] font-bold px-2 py-0.5">{car.year}</span>
            {car.engine_cc != null && (
              <span className="absolute top-2 right-2 z-10 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5">{car.engine_cc}CC</span>
            )}
            {showImage ? (
              <img src={primaryImage!} alt={vehicleImageAlt(car, 0)} onError={() => setImgError(true)}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <span className="text-xs text-gray-300 font-serif">{car.make} {car.model}</span>
              </div>
            )}
          </div>
        </Link>
        <div className="p-3">
          <Link href={href} className="block font-serif font-bold text-[#0D1B3E] text-sm leading-tight hover:text-[#C8102E] transition-colors mb-0.5 line-clamp-1">
            {car.year} {car.make} {car.model}
          </Link>
          <p className="text-[10px] text-gray-400 mb-2">REF #{car.ref_number}</p>
          <p className="text-base font-mono font-bold text-[#C8102E]">{fmtUSD(car.fob_price_usd)}</p>
          {pkrPrice != null && <p className="text-[10px] font-mono text-gray-400 mb-3">PKR {pkrPrice.toLocaleString()}</p>}
          <div className="flex gap-1.5">
            <Link href={href} className="flex-1 text-center text-[10px] font-bold py-1.5 text-white rounded-sm" style={{ background: '#C8102E' }}>
              Inquire
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center text-[10px] font-bold py-1.5 text-white rounded-sm flex items-center justify-center gap-1"
              style={{ background: '#25D366' }}>
              <WhatsAppIcon size={10} /> WA
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ── Grid — home page collections (Featured / Best Sellers) ──────── */
  const showFavorite = typeof onToggleFavorite === 'function';
  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ border: '1px solid #EEF2F7', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '4/3' }}>
        <Link href={href} className="block w-full h-full">
          {showImage ? (
              <img src={primaryImage!} alt={vehicleImageAlt(car, 0)} loading="lazy" decoding="async" onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <PhotoPlaceholder />
          )}
        </Link>
        {showImage && isThirdPartyListing(car.ref_number) && (
          <ThirdPartyImageBadge className="bottom-2.5 left-2.5" />
        )}

        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.45)' }}>
            <span className="px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase text-white"
              style={{ background: '#16A34A', letterSpacing: '0.18em' }}>Sold</span>
          </div>
        )}

        {!hideBadges && (car.is_new_arrival && !isSold ? (
          <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ background: '#16A34A' }}>
            New Arrival
          </span>
        ) : (
          <span className="absolute top-2.5 left-2.5 z-10 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm tracking-wider">
            {car.year}
          </span>
        ))}

        {!hideBadges && car.engine_cc != null && (
          <span className="absolute top-2.5 right-2.5 z-10 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm tracking-wider"
            style={{ background: 'rgba(200,16,46,0.88)', marginTop: showFavorite ? '2.25rem' : 0 }}>
            {car.engine_cc} cc
          </span>
        )}

        {showFavorite && (
          <button
            onClick={() => onToggleFavorite!(car.id)}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border-0"
            style={{ background: isFavorite ? '#C8102E' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', boxShadow: '0 1px 6px rgba(0,0,0,0.15)' }}
            aria-label="Save to favourites">
            <Heart size={13} fill={isFavorite ? 'white' : 'none'} stroke={isFavorite ? 'white' : '#9CA3AF'} strokeWidth={2} />
          </button>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <div>
          <Link href={href}>
            <h3 className="font-bold text-gray-900 text-[13.5px] leading-snug line-clamp-1 hover:text-[#C8102E] transition-colors">
              {car.make} {car.model}{car.variant ? ` ${car.variant}` : ''}
            </h3>
          </Link>
          <p className="text-[10px] font-mono text-gray-400 mt-0.5 tracking-wider">{car.ref_number}</p>
        </div>

        <div className="flex-1">
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-semibold">FOB Price · Japan</p>
          <p className="text-[20px] font-mono font-bold leading-tight tracking-tight" style={{ color: '#C8102E' }}>
            {fmtUSD(car.fob_price_usd)}
          </p>
          {pkrPrice != null && <p className="text-[11px] font-mono text-gray-500">≈ PKR {pkrPrice.toLocaleString()}</p>}
        </div>

        <div className="flex gap-2 pt-1">
          <Link href={href} aria-disabled={isSold}
            className="flex-1 text-center py-2 text-[11px] font-bold rounded-lg text-white transition-colors"
            style={{ background: isSold ? '#9CA3AF' : '#C8102E', pointerEvents: isSold ? 'none' : 'auto' }}>
            {isSold ? 'Sold Out' : 'Inquire Now'}
          </Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg transition-colors hover:opacity-90"
            style={{ background: '#25D366' }}>
            <WhatsAppIcon size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default memo(CarCard);
