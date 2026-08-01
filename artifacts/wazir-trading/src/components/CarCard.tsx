import React, { memo, useState } from 'react';
import { Link } from 'wouter';
import { Settings, Droplet, Calendar, Gauge } from 'lucide-react';

export interface Car {
  id: string;
  ref_number: string;
  make: string;
  model: string;
  variant: string | null;
  chassis_number: string;
  year: number | null;
  engine_cc: number | null;
  fuel_type: string;
  transmission: string;
  body_type: string;
  color: string;
  drive: string;
  steering: string;
  seats: number | null;
  doors: number | null;
  mileage_km: number | null;
  auction_grade: string;
  fob_price_usd: number | null;
  stock_location: string;
  port_of_loading: string;
  shipment_method: string;
  status: string;
  collection: string;
  is_featured: boolean;
  is_new_arrival: boolean;
  features: any;
  created_at: string;
  exterior_grade?: string;
  interior_grade?: string;
  lot_number?: string;
  manufacture_month?: string | number;
}

function CarCard({ car }: { car: Car }) {
  const [imageError, setImageError] = useState(false);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'txb1wiw1';
  const ref = car.ref_number.toLowerCase();
  const base = `https://res.cloudinary.com/${cloudName}/image/upload`;
  const imageUrl  = `${base}/f_auto,q_auto,w_600/cars/${ref}-1`;
  const imageSrcSet = [
    `${base}/f_auto,q_auto,w_380/cars/${ref}-1 380w`,
    `${base}/f_auto,q_auto,w_600/cars/${ref}-1 600w`,
    `${base}/f_auto,q_auto,w_800/cars/${ref}-1 800w`,
  ].join(', ');

  const formatPrice = (price: number | null | undefined) => {
    if (price == null) return '—';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <Link href={`/cars/${car.ref_number}`} className="group block h-full">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-[#C8102E]/30 group-hover:-translate-y-1">

        {/* ── Image ── */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          {car.is_new_arrival && (
            <div className="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
              New Arrival
            </div>
          )}
          <div className="absolute top-3 right-3 z-10 bg-[#0D1B3E]/85 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10 shadow">
            Grade {car.auction_grade}
          </div>

          {!imageError ? (
            <img
              src={imageUrl}
              srcSet={imageSrcSet}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              alt={`${car.make} ${car.model}`}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width={600}
              height={450}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-50 to-gray-100">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.2">
                <rect x="1" y="3" width="22" height="16" rx="2.5"/>
                <path d="M1 9h22M7 3v6"/><circle cx="12" cy="17" r="2"/>
              </svg>
              <span className="text-xs font-medium text-gray-400">
                {car.make} {car.model}
              </span>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Ref */}
          <div className="mb-1 text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            {car.ref_number}
          </div>

          {/* Car name */}
          <h3 className="font-serif text-lg font-bold mb-3 line-clamp-1 text-gray-900 group-hover:text-[#C8102E] transition-colors leading-snug">
            {car.make} {car.model}
            {car.variant && (
              <span className="font-normal text-gray-400 text-base"> {car.variant}</span>
            )}
          </h3>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-sm text-gray-600 mb-4 flex-grow">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#C8102E]/70 flex-shrink-0" />
              <span className="font-medium">{car.year || '—'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge size={13} className="text-[#C8102E]/70 flex-shrink-0" />
              <span className="font-medium">
                {car.mileage_km != null ? car.mileage_km.toLocaleString() : '—'} km
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Settings size={13} className="text-[#C8102E]/70 flex-shrink-0" />
              <span className="font-medium">{car.transmission || '—'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplet size={13} className="text-[#C8102E]/70 flex-shrink-0" />
              <span className="font-medium">{car.fuel_type || '—'}</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between mt-auto">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">FOB Price</div>
              <div className="font-serif text-xl font-black text-[#C8102E] leading-none">
                {formatPrice(car.fob_price_usd)}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#C8102E] flex items-center justify-center text-white group-hover:bg-[#A50D25] transition-colors shadow-md">
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(CarCard);

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
