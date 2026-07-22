import React, { useState } from 'react';
import { Link } from 'wouter';
import { Settings, Droplet, Calendar, Gauge } from 'lucide-react';

export interface Car {
  id: string;
  ref_number: string;
  make: string;
  model: string;
  variant: string | null;
  chassis_number: string;
  year: number;
  engine_cc: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  color: string;
  drive: string;
  steering: string;
  seats: number;
  doors: number;
  mileage_km: number;
  auction_grade: string;
  fob_price_usd: number;
  stock_location: string;
  port_of_loading: string;
  shipment_method: string;
  status: string;
  collection: string;
  is_featured: boolean;
  is_new_arrival: boolean;
  features: any;
  created_at: string;
}

export default function CarCard({ car }: { car: Car }) {
  const [imageError, setImageError] = useState(false);
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'txb1wiw1';
  // f_auto → best format (WebP/AVIF), q_auto → smart quality, w_600 → cap width
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600/cars/${car.ref_number.toLowerCase()}-1`;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <Link href={`/cars/${car.ref_number}`} className="group block h-full">
      <div className="bg-card border border-border rounded-none overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary/50 group-hover:-translate-y-1">
        {/* Image Box */}
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          {car.is_new_arrival && (
            <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-md">
              New Arrival
            </div>
          )}
          <div className="absolute top-4 right-4 z-10 bg-black/80 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider backdrop-blur-sm border border-white/20">
            Grade {car.auction_grade}
          </div>
          
          {!imageError ? (
            <img 
              src={imageUrl} 
              alt={`${car.make} ${car.model}`}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width={600}
              height={450}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/10">
              <span className="font-serif text-lg text-secondary/40 font-medium">
                {car.make} {car.model}
              </span>
            </div>
          )}
        </div>

        {/* Content Box */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-2 text-xs text-muted-foreground uppercase tracking-widest font-medium">
            {car.ref_number}
          </div>
          <h3 className="font-serif text-xl font-bold mb-4 line-clamp-1 group-hover:text-primary transition-colors">
            {car.make} {car.model} {car.variant && <span className="font-normal text-muted-foreground"> {car.variant}</span>}
          </h3>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-foreground/80 mb-6 flex-grow">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-primary/70" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge size={14} className="text-primary/70" />
              <span>{car.mileage_km.toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings size={14} className="text-primary/70" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplet size={14} className="text-primary/70" />
              <span>{car.fuel_type}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">FOB Price</span>
              <span className="font-serif text-xl font-bold text-foreground">{formatPrice(car.fob_price_usd)}</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
