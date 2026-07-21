import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Heart, Mail, MessageCircle, X, SlidersHorizontal, MapPin,
  Gauge, Calendar, Zap, Settings, Users, Palette, DoorOpen,
  Navigation, Fuel,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────── */
/* CONSTANTS                                                        */
/* ─────────────────────────────────────────────────────────────── */
const NAVY = '#0D1B3E';
const RED  = '#C8102E';
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';

const MAKES = [
  { name: 'Toyota',          count: 19334 },
  { name: 'Nissan',          count: 6516  },
  { name: 'Honda',           count: 4187  },
  { name: 'Mazda',           count: 2859  },
  { name: 'Mitsubishi',      count: 877   },
  { name: 'Subaru',          count: 970   },
  { name: 'Suzuki',          count: 3212  },
  { name: 'Daihatsu',        count: 1354  },
  { name: 'Lexus',           count: 922   },
  { name: 'Isuzu',           count: 299   },
  { name: 'Audi',            count: 373   },
  { name: 'BMW',             count: 765   },
  { name: 'Mercedes',        count: 654   },
  { name: 'Volkswagen',      count: 426   },
  { name: 'Land Rover',      count: 96    },
  { name: 'Hino',            count: 111   },
  { name: 'Iseki',           count: 139   },
  { name: 'John Deere',      count: 5     },
  { name: 'Kubota',          count: 172   },
  { name: 'Massey Ferguson', count: 1     },
  { name: 'Mametora',        count: 1     },
  { name: 'Shibaura',        count: 19    },
  { name: 'Yanmar',          count: 109   },
];

const PRICE_RANGES = [
  '$500 - $1500', '$1500 - $2000', '$2000 - $2500', '$2500 - $3000',
  '$3000 - $3500', '$3500 - $4000', '$4000 - $4500', '$4500 - $5000',
  '$5000 - $6000', '$6000 - $7000', '$7000 - $8000', '$8000 - $9000',
  '$9000 - $10000',
];

const BODY_TYPE_ITEMS = [
  { name: 'Sedan',         accent: '#3B82F6', bg: '#EFF6FF' },
  { name: 'Hatchback',     accent: '#10B981', bg: '#ECFDF5' },
  { name: 'SUV',           accent: '#F97316', bg: '#FFF7ED' },
  { name: 'Station Wagon', accent: '#8B5CF6', bg: '#F5F3FF' },
  { name: 'Van',           accent: '#06B6D4', bg: '#ECFEFF' },
  { name: 'Mini Van',      accent: '#F59E0B', bg: '#FFFBEB' },
  { name: 'Truck',         accent: '#EF4444', bg: '#FEF2F2' },
  { name: 'Bus',           accent: '#6366F1', bg: '#EEF2FF' },
  { name: 'MPV',           accent: '#EC4899', bg: '#FDF2F8' },
  { name: 'Wagon',         accent: '#84CC16', bg: '#F7FEE7' },
  { name: 'Cooper',        accent: '#14B8A6', bg: '#F0FDFA' },
];
const BODY_TYPES    = BODY_TYPE_ITEMS.map(b => b.name);
const CATEGORIES    = ['Gasoline','Hybrid','Diesel','Light Oil'];
const LOCATIONS     = ['Japan','Chile','UK','UAE','Thailand','China'];
const YEAR_RANGES   = ['2021-2023','2018-2020','2015-2017','2012-2014','2009-2011','2006-2008','2003-2005','2000-2002'];
const DRIVES        = ['2WD','4WD'];
const TRANSMISSIONS = ['AT','MT','FAT','IAT','CVT','CAT','I5','DAT'];
const ENGINE_SIZES  = ['660CC-1000CC','1000CC-1500CC','1500CC-1800CC','1800CC-2000CC','2000CC-2500CC','2500CC-3000CC','3000CC-3500CC'];
const FUELS         = ['Diesel','Electric','Gasoline','Gasoline E Power','Gasoline Hybrid'];
const MILEAGES      = ['50000KM-80000KM','80000KM-100000KM','100000KM-150000KM','150000KM-200000KM','200000KM-250000KM','250000KM-300000KM'];

// Full brand data for auto-scroll carousel
const MAKE_BRANDS = [
  { name: 'Toyota',          count: 19334, slug: 'toyota',          accent: '#EB0A1E' },
  { name: 'Nissan',          count: 6516,  slug: 'nissan',          accent: '#C3002F' },
  { name: 'Honda',           count: 4187,  slug: 'honda',           accent: '#CC0000' },
  { name: 'Mazda',           count: 2859,  slug: 'mazda',           accent: '#1E3A8A' },
  { name: 'Mitsubishi',      count: 877,   slug: 'mitsubishi',      accent: '#E60012' },
  { name: 'Subaru',          count: 970,   slug: 'subaru',          accent: '#0033A1' },
  { name: 'Suzuki',          count: 3212,  slug: 'suzuki',          accent: '#1B5CCC' },
  { name: 'Daihatsu',        count: 1354,  slug: 'daihatsu',        accent: '#005BAC' },
  { name: 'Lexus',           count: 922,   slug: 'lexus',           accent: '#1A1A1A' },
  { name: 'Isuzu',           count: 299,   slug: 'isuzu',           accent: '#D40000' },
  { name: 'Audi',            count: 373,   slug: 'audi',            accent: '#BB0A14' },
  { name: 'BMW',             count: 765,   slug: 'bmw',             accent: '#0066B1' },
  { name: 'Mercedes',        count: 654,   slug: 'mercedes',        accent: '#666666' },
  { name: 'Volkswagen',      count: 426,   slug: 'volkswagen',      accent: '#001E50' },
  { name: 'Land Rover',      count: 96,    slug: 'landrover',       accent: '#005A2B' },
  { name: 'Hino',            count: 111,   slug: 'hino',            accent: '#A31922' },
  { name: 'Iseki',           count: 139,   slug: 'iseki',           accent: '#E05A00' },
  { name: 'John Deere',      count: 5,     slug: 'john-deere',      accent: '#367C2B' },
  { name: 'Kubota',          count: 172,   slug: 'kubota',          accent: '#D0231E' },
  { name: 'Massey Ferguson', count: 1,     slug: 'massey-ferguson', accent: '#CC1011' },
  { name: 'Mametora',        count: 1,     slug: 'mametora',        accent: '#555555' },
  { name: 'Shibaura',        count: 19,    slug: 'shibaura',        accent: '#0047AB' },
  { name: 'Yanmar',          count: 109,   slug: 'yanmar',          accent: '#C8102E' },
];

const COLLECTION_TABS = [
  { label: 'New Arrivals',   count: 1247 },
  { label: 'Clearance',      count: 382  },
  { label: 'Third Party',    count: 94   },
  { label: 'Machinery',      count: 211  },
  { label: 'Thailand Stock', count: 88   },
  { label: 'China Stock',    count: 143  },
  { label: 'Engine Stock',   count: 57   },
  { label: 'UAE Stock',      count: 76   },
  { label: 'Taiwan Stock',   count: 31   },
];

const SORT_OPTIONS = [
  'Newest First', 'Price Low to High', 'Price High to Low',
  'Mileage Low to High', 'Year Newest', 'Year Oldest',
];

/* ─────────────────────────────────────────────────────────────── */
/* DUMMY CARS                                                       */
/* ─────────────────────────────────────────────────────────────── */
interface DummyCar {
  ref: string; make: string; model: string; variant: string;
  mileage: string; year: number; engine: string; trans: string;
  modelCode: string; steering: string; fuel: string; seats: number;
  color: string; drive: string; doors: number; fob: number;
  cnf: number; pkr: number; status: 'New Arrival' | 'Clearance';
  country: string; image: string;
}

const DUMMY_CARS: DummyCar[] = [
  {
    ref:'WTL-000001', make:'Toyota', model:'Yaris', variant:'2025 Z',
    mileage:'8,000 KM', year:2025, engine:'1500CC', trans:'AT',
    modelCode:'MXPA10', steering:'RHD', fuel:'Gasoline', seats:5,
    color:'White', drive:'2WD', doors:5, fob:14200, cnf:17395,
    pkr:3888132, status:'New Arrival', country:'JAPAN',
    image:'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&q=80',
  },
  {
    ref:'WTL-000002', make:'Honda', model:'Fit', variant:'2020 Basic',
    mileage:'40,000 KM', year:2020, engine:'1300CC', trans:'AT',
    modelCode:'GR1', steering:'RHD', fuel:'Gasoline', seats:5,
    color:'White', drive:'2WD', doors:5, fob:8150, cnf:10825,
    pkr:2231569, status:'New Arrival', country:'JAPAN',
    image:'https://images.unsplash.com/photo-1548111008-18acab6e7069?w=600&q=80',
  },
  {
    ref:'WTL-000003', make:'Mazda', model:'Demio', variant:'2014 XD Touring',
    mileage:'60,000 KM', year:2014, engine:'1500CC', trans:'AT',
    modelCode:'DJ5FS', steering:'RHD', fuel:'Light Oil', seats:5,
    color:'Red', drive:'2WD', doors:5, fob:4300, cnf:6920,
    pkr:1177392, status:'New Arrival', country:'JAPAN',
    image:'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80',
  },
  {
    ref:'WTL-000004', make:'Nissan', model:'Kix', variant:'2021 X',
    mileage:'31,000 KM', year:2021, engine:'1200CC', trans:'AT',
    modelCode:'P15', steering:'RHD', fuel:'Hybrid', seats:5,
    color:'White', drive:'2WD', doors:5, fob:13950, cnf:14668,
    pkr:3819679, status:'New Arrival', country:'JAPAN',
    image:'https://images.unsplash.com/photo-1625231338679-5ad2763f5a9d?w=600&q=80',
  },
  {
    ref:'WTL-000005', make:'Daihatsu', model:'Move', variant:'2012 Custom X',
    mileage:'135,000 KM', year:2012, engine:'660CC', trans:'AT',
    modelCode:'LA100S', steering:'RHD', fuel:'Gasoline', seats:4,
    color:'White', drive:'2WD', doors:5, fob:2500, cnf:4640,
    pkr:684397, status:'Clearance', country:'JAPAN',
    image:'https://images.unsplash.com/photo-1561975258-f824d0acbdec?w=600&q=80',
  },
];

const REVIEWS = [
  { name:'Muhammad Asif', country:'Pakistan 🇵🇰', rating:5, text:'Excellent service from Wazir Trading. My Toyota Aqua arrived in perfect condition. The whole process was smooth and transparent. Highly recommended for anyone importing from Japan.' },
  { name:'James Thompson', country:'Guyana 🇬🇾', rating:5, text:'Very professional company. They found exactly the car I wanted within my budget. Communication was excellent throughout the entire shipping process.' },
  { name:'David Osei', country:'Ghana 🇬🇭', rating:5, text:'Best Japanese car exporter I have dealt with. Quality vehicles at great prices. My Nissan Note arrived on time and exactly as described. Will buy again.' },
  { name:'Sarah Williams', country:'UK 🇬🇧', rating:5, text:'Wazir Trading made importing a Japanese car to UK very easy. They handled all the paperwork and kept me updated at every step.' },
];

/* ─────────────────────────────────────────────────────────────── */
/* SMALL HELPERS                                                    */
/* ─────────────────────────────────────────────────────────────── */
function WhatsAppIcon({ size=16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < count ? '#F59E0B' : 'none'}
          stroke={i < count ? '#F59E0B' : '#D1D5DB'}
          strokeWidth="1.8">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* CAR SILHOUETTE SVG (same as homepage)                            */
/* ─────────────────────────────────────────────────────────────── */
function CarSilhouette({ type, color: c }: { type: string; color: string }) {
  const vb = '0 0 160 72';
  const Wheel = (cx: number, cy: number, r = 11) => {
    const ri = r * 0.55; const rh = r * 0.22; const rs = ri * 0.95;
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
  const win = 'rgba(255,255,255,0.82)'; const det = 'rgba(0,0,0,0.12)';
  switch (type) {
    case 'Sedan': return <svg viewBox={vb} width={96} height={44} aria-label="Sedan">
      <path fill={c} d="M 8,52 L 8,44 L 22,44 Q 30,28 44,20 L 100,20 L 112,30 L 118,44 L 150,44 L 150,52 Z"/>
      <path fill={win} d="M 46,21 Q 52,20 60,20 L 60,42 L 42,42 Q 35,34 36,27 Z"/>
      <path fill={win} d="M 62,20 L 98,20 L 108,30 L 108,42 L 62,42 Z"/>
      <line x1={61} y1={20} x2={61} y2={42} stroke={det} strokeWidth="2.5"/>
      {Wheel(32, 58)}{Wheel(130, 58)}</svg>;
    case 'Hatchback': return <svg viewBox={vb} width={96} height={44} aria-label="Hatchback">
      <path fill={c} d="M 14,52 L 14,44 L 28,44 Q 34,28 44,20 L 100,20 Q 112,34 116,52 Z"/>
      <path fill={win} d="M 46,21 Q 52,20 62,20 L 62,42 L 42,42 Q 37,34 38,26 Z"/>
      <path fill={win} d="M 64,20 L 98,20 Q 108,32 110,42 L 64,42 Z"/>
      <line x1={63} y1={20} x2={63} y2={42} stroke={det} strokeWidth="2.5"/>
      {Wheel(34, 58)}{Wheel(106, 58)}</svg>;
    case 'SUV': return <svg viewBox={vb} width={96} height={44} aria-label="SUV">
      <path fill={c} d="M 6,54 L 6,34 L 20,34 Q 26,14 40,12 L 114,12 Q 126,14 132,30 L 152,30 L 152,54 Z"/>
      <path fill={win} d="M 42,13 Q 50,12 60,12 L 60,30 L 38,30 Q 33,22 34,16 Z"/>
      <path fill={win} d="M 62,12 L 112,12 Q 122,14 128,28 L 128,30 L 62,30 Z"/>
      <line x1={61} y1={12} x2={61} y2={30} stroke={det} strokeWidth="2.5"/>
      <line x1={95} y1={12} x2={95} y2={30} stroke={det} strokeWidth="1.5"/>
      {Wheel(34, 60, 12)}{Wheel(128, 60, 12)}</svg>;
    case 'Station Wagon': return <svg viewBox={vb} width={96} height={44} aria-label="Station Wagon">
      <path fill={c} d="M 6,52 L 6,44 L 20,44 Q 26,28 36,20 L 122,20 L 122,44 L 152,44 L 152,52 Z"/>
      <path fill={win} d="M 38,21 Q 44,20 54,20 L 54,42 L 36,42 Q 30,34 31,27 Z"/>
      <path fill={win} d="M 56,20 L 120,20 L 120,42 L 56,42 Z"/>
      <line x1={55} y1={20} x2={55} y2={42} stroke={det} strokeWidth="2.5"/>
      <line x1={88} y1={20} x2={88} y2={42} stroke={det} strokeWidth="1.5"/>
      {Wheel(30, 58)}{Wheel(134, 58)}</svg>;
    case 'Van': return <svg viewBox={vb} width={96} height={44} aria-label="Van">
      <path fill={c} d="M 8,56 L 8,8 Q 8,6 14,6 L 144,6 Q 150,6 150,10 L 150,56 Z"/>
      <path fill={win} d="M 10,8 L 10,30 L 38,30 L 38,8 Z"/>
      <path fill={win} d="M 46,10 L 90,10 L 90,30 L 46,30 Z"/>
      <path fill={win} d="M 96,10 L 140,10 L 140,30 L 96,30 Z"/>
      <line x1={44} y1={8} x2={44} y2={32} stroke={det} strokeWidth="2"/>
      <line x1={92} y1={8} x2={92} y2={32} stroke={det} strokeWidth="2"/>
      {Wheel(32, 62, 11)}{Wheel(124, 62, 11)}</svg>;
    case 'Mini Van': return <svg viewBox={vb} width={96} height={44} aria-label="Mini Van">
      <path fill={c} d="M 10,52 L 10,38 Q 14,16 30,14 L 118,14 Q 134,16 138,34 L 150,34 L 150,52 Z"/>
      <path fill={win} d="M 32,15 Q 40,14 52,14 L 52,32 L 30,32 Q 25,24 26,18 Z"/>
      <path fill={win} d="M 54,14 L 116,14 Q 130,16 134,32 L 54,32 Z"/>
      <line x1={53} y1={14} x2={53} y2={32} stroke={det} strokeWidth="2.5"/>
      <line x1={88} y1={14} x2={88} y2={32} stroke={det} strokeWidth="1.5"/>
      {Wheel(34, 58)}{Wheel(126, 58)}</svg>;
    case 'Truck': return <svg viewBox={vb} width={96} height={44} aria-label="Truck">
      <path fill={c} d="M 6,52 L 6,12 L 70,12 L 70,44 L 6,44 Z"/>
      <path fill={c} d="M 72,38 L 72,52 L 154,52 L 154,38 Z"/>
      <rect fill={c} x={72} y={28} width={4} height={14}/>
      <rect fill={c} x={150} y={28} width={4} height={14}/>
      <path fill={win} d="M 8,14 L 8,34 L 42,34 L 42,14 Z"/>
      <path fill={win} d="M 46,14 L 66,14 L 66,34 L 46,34 Z"/>
      <line x1={44} y1={12} x2={44} y2={36} stroke={det} strokeWidth="2"/>
      {Wheel(28, 58)}{Wheel(120, 58)}</svg>;
    case 'Bus': return <svg viewBox={vb} width={96} height={44} aria-label="Bus">
      <path fill={c} d="M 4,56 Q 4,6 14,6 L 148,6 Q 156,6 156,12 L 156,56 Z"/>
      <path fill={win} d="M 8,8 L 8,32 L 34,32 L 34,8 Z"/>
      {[42, 64, 86, 108, 130].map(x => <rect key={x} fill={win} x={x} y={10} width={16} height={22} rx={2}/>)}
      <line x1={6} y1={34} x2={154} y2={34} stroke={det} strokeWidth="1.5"/>
      {Wheel(30, 62, 11)}{Wheel(130, 62, 11)}</svg>;
    case 'MPV': return <svg viewBox={vb} width={96} height={44} aria-label="MPV">
      <path fill={c} d="M 8,52 L 8,36 Q 18,14 36,12 L 110,12 Q 130,14 138,28 L 144,38 L 152,38 L 152,52 Z"/>
      <path fill={win} d="M 38,13 Q 46,12 58,12 L 58,32 L 36,32 Q 30,24 31,18 Z"/>
      <path fill={win} d="M 60,12 L 108,12 Q 126,14 134,30 L 134,32 L 60,32 Z"/>
      <line x1={59} y1={12} x2={59} y2={32} stroke={det} strokeWidth="2.5"/>
      <line x1={96} y1={12} x2={96} y2={32} stroke={det} strokeWidth="1.5"/>
      {Wheel(32, 58)}{Wheel(132, 58)}</svg>;
    case 'Wagon': return <svg viewBox={vb} width={96} height={44} aria-label="Wagon">
      <path fill={c} d="M 8,52 L 8,36 Q 14,18 28,16 L 76,16 Q 86,20 90,34 L 90,52 Z"/>
      <path fill={c} d="M 92,38 L 92,52 L 152,52 L 152,38 Z"/>
      <rect fill={c} x={92}  y={30} width={4} height={12}/>
      <rect fill={c} x={148} y={30} width={4} height={12}/>
      <path fill={win} d="M 30,17 Q 36,16 50,16 L 50,34 L 28,34 Q 23,26 24,20 Z"/>
      <path fill={win} d="M 52,16 L 74,16 Q 82,20 84,32 L 84,34 L 52,34 Z"/>
      <line x1={51} y1={16} x2={51} y2={34} stroke={det} strokeWidth="2"/>
      {Wheel(30, 58)}{Wheel(128, 58)}</svg>;
    case 'Cooper': return <svg viewBox={vb} width={96} height={44} aria-label="Cooper">
      <path fill={c} d="M 6,52 L 6,42 L 16,42 Q 24,30 38,20 L 96,20 Q 114,28 126,42 L 152,42 L 152,52 Z"/>
      <path fill={win} d="M 40,21 Q 48,20 60,20 L 60,40 L 38,40 Q 32,32 33,25 Z"/>
      <path fill={win} d="M 62,20 L 94,20 Q 110,28 120,40 L 62,40 Z"/>
      <line x1={61} y1={20} x2={61} y2={40} stroke={det} strokeWidth="2.5"/>
      {Wheel(32, 58)}{Wheel(132, 58)}</svg>;
    default: return <svg viewBox={vb} width={96} height={44}>
      <rect fill={c} x="10" y="24" width="140" height="24" rx="4"/>
      {Wheel(32, 58)}{Wheel(128, 58)}</svg>;
  }
}

/* ─────────────────────────────────────────────────────────────── */
/* ACCORDION ITEM                                                   */
/* ─────────────────────────────────────────────────────────────── */
function AccordionSection({
  title, defaultOpen = false, children,
}: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-white text-[11px] font-bold tracking-[0.12em] uppercase"
        style={{ background: RED }}
      >
        {title}
        {open
          ? <ChevronUp size={14} className="flex-shrink-0" />
          : <ChevronDown size={14} className="flex-shrink-0" />}
      </button>
      {open && (
        <div className="bg-white py-2">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* SIDEBAR FILTER ITEM                                             */
/* ─────────────────────────────────────────────────────────────── */
function FilterItem({
  label, count, active, onClick,
}: { label: string; count?: number; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-1.5 text-sm text-left hover:bg-red-50 transition-colors"
    >
      <span className={`${active ? 'text-[#C8102E] font-semibold' : 'text-gray-700'}`}>
        {active && <span className="mr-1">●</span>}{label}
      </span>
      {count !== undefined && (
        <span className="text-[11px] text-gray-400 tabular-nums">{count.toLocaleString()}</span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* SIDEBAR                                                          */
/* ─────────────────────────────────────────────────────────────── */
function Sidebar({
  activeMake, setActiveMake, activePrice, setActivePrice,
  activeBody, setActiveBody, activeCategory, setActiveCategory,
  activeLocation, setActiveLocation, activeYear, setActiveYear,
  activeDrive, setActiveDrive, activeTrans, setActiveTrans,
  activeEngine, setActiveEngine, activeFuel, setActiveFuel,
  activeMileage, setActiveMileage,
}: {
  activeMake: string; setActiveMake: (v:string)=>void;
  activePrice: string; setActivePrice: (v:string)=>void;
  activeBody: string; setActiveBody: (v:string)=>void;
  activeCategory: string; setActiveCategory: (v:string)=>void;
  activeLocation: string; setActiveLocation: (v:string)=>void;
  activeYear: string; setActiveYear: (v:string)=>void;
  activeDrive: string; setActiveDrive: (v:string)=>void;
  activeTrans: string; setActiveTrans: (v:string)=>void;
  activeEngine: string; setActiveEngine: (v:string)=>void;
  activeFuel: string; setActiveFuel: (v:string)=>void;
  activeMileage: string; setActiveMileage: (v:string)=>void;
}) {
  return (
    <div className="border border-gray-200 overflow-hidden shadow-sm" style={{ width: 210, flexShrink: 0 }}>
      <AccordionSection title="Shop By Make" defaultOpen>
        {MAKES.map(m => (
          <FilterItem key={m.name} label={m.name} count={m.count}
            active={activeMake === m.name}
            onClick={() => setActiveMake(activeMake === m.name ? '' : m.name)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Price" defaultOpen>
        {PRICE_RANGES.map(p => (
          <FilterItem key={p} label={p}
            active={activePrice === p}
            onClick={() => setActivePrice(activePrice === p ? '' : p)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Body Type" defaultOpen>
        {BODY_TYPES.map(b => (
          <FilterItem key={b} label={b}
            active={activeBody === b}
            onClick={() => setActiveBody(activeBody === b ? '' : b)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Category" defaultOpen>
        {CATEGORIES.map(c => (
          <FilterItem key={c} label={c}
            active={activeCategory === c}
            onClick={() => setActiveCategory(activeCategory === c ? '' : c)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Location" defaultOpen>
        {LOCATIONS.map(l => (
          <FilterItem key={l} label={l}
            active={activeLocation === l}
            onClick={() => setActiveLocation(activeLocation === l ? '' : l)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Year" defaultOpen>
        {YEAR_RANGES.map(y => (
          <FilterItem key={y} label={y}
            active={activeYear === y}
            onClick={() => setActiveYear(activeYear === y ? '' : y)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Drive" defaultOpen>
        {DRIVES.map(d => (
          <FilterItem key={d} label={d}
            active={activeDrive === d}
            onClick={() => setActiveDrive(activeDrive === d ? '' : d)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Transmission" defaultOpen>
        {TRANSMISSIONS.map(t => (
          <FilterItem key={t} label={t}
            active={activeTrans === t}
            onClick={() => setActiveTrans(activeTrans === t ? '' : t)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Engine Size" defaultOpen>
        {ENGINE_SIZES.map(e => (
          <FilterItem key={e} label={e}
            active={activeEngine === e}
            onClick={() => setActiveEngine(activeEngine === e ? '' : e)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Fuel" defaultOpen>
        {FUELS.map(f => (
          <FilterItem key={f} label={f}
            active={activeFuel === f}
            onClick={() => setActiveFuel(activeFuel === f ? '' : f)} />
        ))}
      </AccordionSection>

      <AccordionSection title="Shop By Mileage" defaultOpen>
        {MILEAGES.map(m => (
          <FilterItem key={m} label={m}
            active={activeMileage === m}
            onClick={() => setActiveMileage(activeMileage === m ? '' : m)} />
        ))}
      </AccordionSection>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* BRAND LOGO (real SVG with accent-color fallback)                 */
/* ─────────────────────────────────────────────────────────────── */
function BrandLogo({ slug, name, accent }: { slug: string; name: string; accent: string }) {
  const [failed, setFailed] = React.useState(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const src = `${base}/logos/${slug}.svg`;
  const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();

  if (failed) {
    return (
      <div
        className="flex items-center justify-center w-full h-full rounded-[6px] font-black text-base tracking-tight text-white select-none"
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
    />
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* SHOP BY MAKE CAROUSEL — auto-scroll, real logos                  */
/* ─────────────────────────────────────────────────────────────── */
function MakeCarousel({ setActiveMake }: { setActiveMake: (v:string)=>void }) {
  // Duplicate track for seamless infinite loop
  const track = [...MAKE_BRANDS, ...MAKE_BRANDS];
  return (
    <div className="mb-6 bg-white border border-gray-100 py-5 -mx-4 md:-mx-6 px-0 overflow-hidden">
      <style>{`
        @keyframes make-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .make-track {
          animation: make-scroll 55s linear infinite;
          will-change: transform;
        }
        .make-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Heading */}
      <div className="px-4 md:px-6 mb-4">
        <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-1" style={{ color: RED }}>
          Browse By Brand
        </p>
        <h3 className="font-bold text-base text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>
          Shop By Make
        </h3>
      </div>

      {/* Scrolling row */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div className="flex make-track gap-3 px-3" style={{ width: 'max-content' }}>
          {track.map(({ name, slug, accent, count }, i) => (
            <button
              key={`${name}-${i}`}
              onClick={() => setActiveMake(name)}
              className="group flex-shrink-0 flex flex-col items-center gap-2 w-[100px] py-3 px-2 border border-gray-200 bg-white hover:border-[#C8102E] hover:shadow-[0_4px_16px_rgba(200,16,46,0.12)] transition-all cursor-pointer rounded-sm"
            >
              {/* Logo box */}
              <div className="w-12 h-12 flex items-center justify-center rounded-[6px] overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                <BrandLogo slug={slug} name={name} accent={accent} />
              </div>
              {/* Name */}
              <span className="text-[11px] font-bold text-gray-800 group-hover:text-[#C8102E] text-center leading-tight transition-colors">
                {name}
              </span>
              {/* Count */}
              <span className="text-[10px] font-semibold" style={{ color: RED }}>
                {count.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* SHOP BY BODY TYPE CAROUSEL — auto-scroll with SVG silhouettes   */
/* ─────────────────────────────────────────────────────────────── */
function BodyTypeCarousel({ setActiveBody }: { setActiveBody: (v:string)=>void }) {
  const track = [...BODY_TYPE_ITEMS, ...BODY_TYPE_ITEMS];
  return (
    <div className="mb-6 bg-gray-50 border border-gray-100 py-5 -mx-4 md:-mx-6 px-0 overflow-hidden">
      <style>{`
        @keyframes body-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .body-track {
          animation: body-scroll 40s linear infinite;
          will-change: transform;
        }
        .body-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Heading */}
      <div className="px-4 md:px-6 mb-4">
        <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-1" style={{ color: RED }}>
          Browse By Style
        </p>
        <h3 className="font-bold text-base text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>
          Shop By Body Type
        </h3>
      </div>

      {/* Scrolling row */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} />

        <div className="flex body-track gap-3 px-3" style={{ width: 'max-content' }}>
          {track.map(({ name, accent, bg }, i) => (
            <button
              key={`${name}-${i}`}
              onClick={() => setActiveBody(name)}
              className="group flex-shrink-0 flex flex-col items-center gap-2 w-[140px] py-4 px-3 bg-white transition-all duration-200 cursor-pointer rounded-[8px]"
              style={{ border: `1.5px solid ${accent}33`, boxShadow: `0 2px 8px ${accent}0d` }}
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
              <div className="w-full h-[64px] flex items-center justify-center rounded-[6px]"
                style={{ backgroundColor: bg }}>
                <CarSilhouette type={name} color={accent} />
              </div>
              {/* Name */}
              <span className="text-[11px] font-bold tracking-wide text-center leading-tight"
                style={{ color: accent }}>
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* TOTAL PRICE CALCULATOR                                           */
/* ─────────────────────────────────────────────────────────────── */
const COUNTRY_PORTS: Record<string, string[]> = {
  Pakistan:         ['Karachi', 'Gwadar'],
  UAE:              ['Dubai', 'Abu Dhabi'],
  UK:               ['Southampton', 'Tilbury'],
  Guyana:           ['Georgetown'],
  Jamaica:          ['Kingston'],
  Trinidad:         ['Port of Spain'],
  Kenya:            ['Mombasa'],
  Ghana:            ['Tema', 'Takoradi'],
  Nigeria:          ['Lagos', 'Apapa'],
  Russia:           ['Vladivostok', 'Moscow'],
  'New Zealand':    ['Auckland', 'Wellington'],
  'Papua New Guinea': ['Port Moresby'],
  Germany:          ['Hamburg', 'Bremen'],
  Tanzania:         ['Dar es Salaam'],
  Uganda:           ['Kampala (via Mombasa)'],
  'South Africa':   ['Durban', 'Cape Town'],
  Australia:        ['Sydney', 'Melbourne', 'Brisbane'],
};
const DEST_COUNTRIES = Object.keys(COUNTRY_PORTS);
const CURRENCIES = ['USD', 'PKR', 'EUR', 'GBP', 'AED'];
const CURRENCY_RATES: Record<string,number> = { USD:1, PKR:278, EUR:0.92, GBP:0.79, AED:3.67 };

function TotalPriceCalculator() {
  const [country, setCountry]     = useState('Pakistan');
  const [port, setPort]           = useState('Karachi');
  const [shipment, setShipment]   = useState('RORO');
  const [freight, setFreight]     = useState('Prepaid');
  const [currency, setCurrency]   = useState('USD');
  const [inspection, setInspection] = useState('Yes');
  const [insurance, setInsurance] = useState('Yes');
  const [result, setResult]       = useState<{usd:number; local:number} | null>(null);

  const ports = COUNTRY_PORTS[country] || [];

  const handleCountryChange = (c: string) => {
    setCountry(c);
    const ps = COUNTRY_PORTS[c] || [];
    setPort(ps[0] || '');
  };

  const calculate = () => {
    // Simple mock calculation
    const base = 10000;
    const freight_cost = shipment === 'RORO' ? 1200 : 1800;
    const ins_cost = insurance === 'Yes' ? 250 : 0;
    const insp_cost = inspection === 'Yes' ? 150 : 0;
    const total_usd = base + freight_cost + ins_cost + insp_cost;
    const rate = CURRENCY_RATES[currency] || 1;
    setResult({ usd: total_usd, local: Math.round(total_usd * rate) });
  };

  return (
    <div className="mb-6 rounded-sm overflow-hidden shadow-md" style={{ background: NAVY }}>
      <div className="px-6 pt-5 pb-3 border-b border-white/10">
        <h3 className="text-white font-bold text-lg" style={{ fontFamily:"'Playfair Display',serif" }}>
          Total Price Calculator
        </h3>
        <p className="text-white/60 text-[12px] mt-1">
          Estimate the price of the vehicles based on your destination.
        </p>
        <p className="text-white/40 text-[11px] mt-0.5">
          In some cases the total price cannot be estimated.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left */}
        <div className="space-y-4">
          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-1">Destination Country</label>
            <select
              value={country}
              onChange={e => handleCountryChange(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 outline-none focus:border-[#C8102E] rounded-sm"
            >
              {DEST_COUNTRIES.map(c => <option key={c} value={c} className="bg-[#0D1B3E] text-white">{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-1">Port</label>
            <select
              value={port}
              onChange={e => setPort(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 outline-none focus:border-[#C8102E] rounded-sm"
            >
              {ports.map(p => <option key={p} value={p} className="bg-[#0D1B3E] text-white">{p}</option>)}
            </select>
          </div>

          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-1">Shipment</label>
            <select
              value={shipment}
              onChange={e => setShipment(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 outline-none focus:border-[#C8102E] rounded-sm"
            >
              <option className="bg-[#0D1B3E] text-white">RORO</option>
              <option className="bg-[#0D1B3E] text-white">Container</option>
            </select>
          </div>

          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-2">Freight</label>
            <div className="flex gap-4">
              {['Prepaid','Collect'].map(o => (
                <label key={o} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="freight" value={o} checked={freight===o}
                    onChange={() => setFreight(o)}
                    className="accent-[#C8102E]" />
                  <span className="text-white/80 text-sm">{o}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-1">Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 outline-none focus:border-[#C8102E] rounded-sm"
            >
              {CURRENCIES.map(c => <option key={c} className="bg-[#0D1B3E] text-white">{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-2">Inspection</label>
            <div className="flex gap-4">
              {['Yes','No'].map(o => (
                <label key={o} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="inspection" value={o} checked={inspection===o}
                    onChange={() => setInspection(o)}
                    className="accent-[#C8102E]" />
                  <span className="text-white/80 text-sm">{o}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-2">Insurance</label>
            <div className="flex gap-4">
              {['Yes','No'].map(o => (
                <label key={o} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="insurance" value={o} checked={insurance===o}
                    onChange={() => setInsurance(o)}
                    className="accent-[#C8102E]" />
                  <span className="text-white/80 text-sm">{o}</span>
                </label>
              ))}
            </div>
          </div>

          {result && (
            <div className="mt-2 p-4 rounded-sm border border-white/10" style={{ background:'rgba(255,255,255,0.05)' }}>
              <div className="text-[11px] text-white/50 uppercase tracking-wider mb-1">Total Price</div>
              <div className="text-2xl font-black" style={{ color: RED }}>
                ${result.usd.toLocaleString()}
              </div>
              <div className="text-sm font-semibold mt-1" style={{ color: '#D4AF37' }}>
                {currency} {result.local.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={calculate}
          className="w-full py-3 font-bold text-sm tracking-[0.1em] uppercase text-white rounded-sm transition-all hover:opacity-90"
          style={{ background: RED }}
        >
          Calculate
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* CAR LISTING ROW                                                  */
/* ─────────────────────────────────────────────────────────────── */
function CarRow({ car }: { car: DummyCar }) {
  const [imgIdx, setImgIdx]     = useState(0);
  const [favorited, setFavorited] = useState(false);
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`I'm interested in ${car.make} ${car.model} ${car.variant} (Ref: ${car.ref})`)}`;

  const specs = [
    { icon: <Gauge size={13} />,       label: 'Mileage',    value: car.mileage    },
    { icon: <Calendar size={13} />,    label: 'Year',       value: String(car.year) },
    { icon: <Zap size={13} />,         label: 'Engine',     value: car.engine     },
    { icon: <Settings size={13} />,    label: 'Trans',      value: car.trans      },
    { icon: <Navigation size={13} />,  label: 'Model Code', value: car.modelCode  },
    { icon: <MapPin size={13} />,      label: 'Steering',   value: car.steering   },
    { icon: <Fuel size={13} />,        label: 'Fuel',       value: car.fuel       },
    { icon: <Users size={13} />,       label: 'Seats',      value: String(car.seats) },
    { icon: <span className="text-[10px] font-bold">ENG</span>, label: 'Engine Code', value: 'B' },
    { icon: <Palette size={13} />,     label: 'Color',      value: car.color      },
    { icon: <Settings size={13} />,    label: 'Drive',      value: car.drive      },
    { icon: <DoorOpen size={13} />,    label: 'Doors',      value: String(car.doors) },
  ];

  return (
    <div className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow mb-4 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* LEFT — Image */}
        <div className="relative md:w-[35%] bg-gray-100 flex-shrink-0" style={{ minHeight: 220 }}>
          {/* Badge */}
          {car.status === 'New Arrival' && (
            <div className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider rounded-sm"
              style={{ background: '#16A34A' }}>
              New Arrival
            </div>
          )}
          {car.status === 'Clearance' && (
            <div className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider rounded-sm"
              style={{ background: '#D97706' }}>
              Clearance
            </div>
          )}
          {/* Favorite */}
          <button
            onClick={() => setFavorited(f => !f)}
            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          >
            <Heart size={14} fill={favorited ? RED : 'none'} stroke={favorited ? RED : '#6B7280'} />
          </button>
          {/* Image */}
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
            style={{ minHeight: 220, maxHeight: 260 }}
          />
          {/* Arrows (decorative) */}
          <button className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <ChevronLeft size={12} />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <ChevronRight size={12} />
          </button>
        </div>

        {/* RIGHT — Details */}
        <div className="flex-1 flex flex-col p-4">
          {/* Title row */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-[17px] text-gray-900 leading-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
              {car.make.toUpperCase()} {car.model.toUpperCase()} {car.variant.toUpperCase()}
            </h3>
            <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
              <span className="w-2 h-2 rounded-full" style={{ background: RED }} />
              <span className="text-[11px] font-bold text-gray-600 tracking-wider">{car.country}</span>
            </div>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 mb-3">
            {specs.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[12px] text-gray-600">
                <span className="text-gray-400 flex-shrink-0">{s.icon}</span>
                <span className="text-gray-400">{s.label}:</span>
                <span className="font-semibold text-gray-800 truncate">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Left actions */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-[11px] font-semibold">
                Reference # {car.ref}
              </span>
              <a
                href={waLink}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-white text-[11px] font-bold transition-opacity hover:opacity-90"
                style={{ background: '#25D366' }}
              >
                <WhatsAppIcon size={13} />
                WhatsApp
              </a>
              <a
                href={`mailto:info@wazirtrading.com?subject=Inquiry: ${car.ref}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-white text-[11px] font-bold transition-opacity hover:opacity-90"
                style={{ background: '#16A34A' }}
              >
                <Mail size={12} />
                Inquire Now
              </a>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold border transition-colors hover:bg-red-50"
                style={{ borderColor: RED, color: RED }}
              >
                Offer Your Price
              </button>
            </div>

            {/* Right — Pricing */}
            <div className="text-right flex-shrink-0">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">FOB Price</div>
              <div className="text-xl font-black leading-tight" style={{ color: RED }}>
                ${car.fob.toLocaleString()}
              </div>
              <div className="text-[11px] font-semibold" style={{ color: '#0D9488' }}>
                Est. C&F Karachi: ${car.cnf.toLocaleString()}
              </div>
              <div className="text-[11px] font-semibold" style={{ color: RED }}>
                PKR {car.pkr.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* PAGINATION                                                       */
/* ─────────────────────────────────────────────────────────────── */
function Pagination() {
  const [page, setPage] = useState(1);
  const total = 4536;
  const pages = [1,2,3,4,5];
  return (
    <div className="flex items-center justify-center gap-1 my-6">
      <button
        onClick={() => setPage(p => Math.max(1, p-1))}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 disabled:opacity-40 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors rounded-sm"
      >
        <ChevronLeft size={14} />
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className="w-8 h-8 flex items-center justify-center border text-[13px] font-semibold rounded-sm transition-colors"
          style={page===p
            ? { background: RED, borderColor: RED, color: '#fff' }
            : { borderColor: '#E5E7EB', color: '#374151' }}
        >
          {p}
        </button>
      ))}
      <span className="px-1 text-gray-400 text-sm">…</span>
      <button
        onClick={() => setPage(total)}
        className="w-12 h-8 flex items-center justify-center border border-gray-200 text-[13px] font-semibold text-gray-700 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors rounded-sm"
      >
        {total}
      </button>
      <button
        onClick={() => setPage(p => Math.min(total, p+1))}
        disabled={page === total}
        className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 disabled:opacity-40 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors rounded-sm"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* REVIEWS SECTION (compact)                                        */
/* ─────────────────────────────────────────────────────────────── */
function ReviewsSection() {
  const [active, setActive] = useState(0);
  const perPage = 2;
  const maxIndex = Math.ceil(REVIEWS.length / perPage) - 1;
  const visible = REVIEWS.slice(active * perPage, active * perPage + perPage);

  return (
    <section className="py-12 border-t border-gray-100" style={{ background: '#F8FAFC' }}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>
          What Our Happy Customers Say
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-4">
          {[['500+','Customers'],['5.0','Star'],['100%','Satisfaction']].map(([v,l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl font-black text-gray-900">{v}</div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-8">
        <button
          onClick={() => setActive(a => Math.max(a-1, 0))}
          disabled={active === 0}
          className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm disabled:opacity-40 hover:border-[#C8102E] hover:text-[#C8102E] transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visible.map(r => (
            <div key={r.name} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div className="text-4xl leading-none font-serif mb-2" style={{ color:'rgba(200,16,46,0.12)' }}>"</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ background: RED }}>
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                  <div className="text-[11px] text-gray-400">{r.country}</div>
                  <StarRow count={r.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setActive(a => Math.min(a+1, maxIndex))}
          disabled={active === maxIndex}
          className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm disabled:opacity-40 transition-all"
          style={{ background: RED }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {Array.from({ length: maxIndex+1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: active===i ? RED : '#CBD5E1' }}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* URL PARAM HELPERS                                                */
/* ─────────────────────────────────────────────────────────────── */
function getParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

function setParam(key: string, value: string) {
  const p = getParams();
  if (value) p.set(key, value); else p.delete(key);
  const qs = p.toString();
  window.history.replaceState({}, '', qs ? `?${qs}` : window.location.pathname);
}

function parsePriceRange(range: string): [number, number] | null {
  const m = range.match(/\$?([\d,]+)\s*-\s*\$?([\d,]+)/);
  if (!m) return null;
  return [Number(m[1].replace(/,/g, '')), Number(m[2].replace(/,/g, ''))];
}

function parseMileageRange(range: string): [number, number] | null {
  const m = range.match(/([\d,]+)KM-([\d,]+)KM/i);
  if (!m) return null;
  return [Number(m[1].replace(/,/g, '')), Number(m[2].replace(/,/g, ''))];
}

function parseEngineRange(range: string): [number, number] | null {
  const m = range.match(/([\d,]+)CC-([\d,]+)CC/i);
  if (!m) return null;
  return [Number(m[1].replace(/,/g, '')), Number(m[2].replace(/,/g, ''))];
}

function parseYearRange(range: string): [number, number] | null {
  const m = range.match(/(\d{4})-(\d{4})/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2])];
}

function parseMileageNum(s: string): number {
  return Number(s.replace(/[^0-9]/g, '')) || 0;
}

function parseEngineNum(s: string): number {
  return Number(s.replace(/[^0-9]/g, '')) || 0;
}

/* ─────────────────────────────────────────────────────────────── */
/* MAIN PAGE                                                        */
/* ─────────────────────────────────────────────────────────────── */
export default function CarsPage() {
  const [, navigate] = useLocation();

  // ── Read URL params helper ──
  const readFiltersFromUrl = () => {
    const p = getParams();
    return {
      q:          p.get('q')          || '',
      make:       p.get('make')       || '',
      price:      p.get('price')      || '',
      body:       p.get('body')       || '',
      category:   p.get('category')   || '',
      location:   p.get('location')   || '',
      year:       p.get('year')       || '',
      drive:      p.get('drive')      || '',
      trans:      p.get('trans')      || '',
      engine:     p.get('engine')     || '',
      fuel:       p.get('fuel')       || '',
      mileage:    p.get('mileage')    || '',
      steering:   p.get('steering')   || '',
      // committed advanced filter values
      advMake:    p.get('advMake')    || '',
      advBody:    p.get('advBody')    || '',
      advFuel:    p.get('advFuel')    || '',
      advDrive:   p.get('advDrive')   || '',
      advTrans:   p.get('advTrans')   || '',
      advYearFrom:p.get('advYearFrom')|| '',
      advYearTo:  p.get('advYearTo')  || '',
      advMinPrice:p.get('advMinPrice')|| '',
      advMaxPrice:p.get('advMaxPrice')|| '',
    };
  };

  const [filters, setFilters] = useState(readFiltersFromUrl);

  // ── Sync from URL on back/forward ──
  useEffect(() => {
    const sync = () => setFilters(readFiltersFromUrl());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  // ── Write a filter change to state + URL ──
  const setFilter = (key: string, value: string) => {
    setParam(key, value);
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // ── Main area local state ──
  const [searchInput, setSearchInput]       = useState(filters.q);
  const [sortBy, setSortBy]                 = useState('Newest First');
  const [activeTab, setActiveTab]           = useState('New Arrivals');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // ── Advanced filter draft state (committed on Search) ──
  const [advMake,     setAdvMake]     = useState(filters.advMake);
  const [advModel,    setAdvModel]    = useState('');
  const [advModelCode,setAdvModelCode]= useState('');
  const [advSteering, setAdvSteering] = useState(filters.steering);
  const [advBodyType, setAdvBodyType] = useState(filters.advBody);
  const [advFuel,     setAdvFuel]     = useState(filters.advFuel);
  const [advDrive,    setAdvDrive]    = useState(filters.advDrive);
  const [advTrans,    setAdvTrans]    = useState(filters.advTrans);
  const [advColor,    setAdvColor]    = useState('');
  const [advLocation, setAdvLocation] = useState('');
  const [advYearFrom, setAdvYearFrom] = useState(filters.advYearFrom);
  const [advYearTo,   setAdvYearTo]   = useState(filters.advYearTo);
  const [advMinPrice, setAdvMinPrice] = useState(filters.advMinPrice);
  const [advMaxPrice, setAdvMaxPrice] = useState(filters.advMaxPrice);
  const [advMinMil,   setAdvMinMil]   = useState('');
  const [advMaxMil,   setAdvMaxMil]   = useState('');
  const [advMinEng,   setAdvMinEng]   = useState('');
  const [advMaxEng,   setAdvMaxEng]   = useState('');

  // ── Commit advanced filter to URL ──
  const commitAdvanced = () => {
    const p = getParams();
    const set = (k:string, v:string) => { if (v) p.set(k, v); else p.delete(k); };
    set('advMake',    advMake);
    set('advBody',    advBodyType);
    set('advFuel',    advFuel);
    set('advDrive',   advDrive);
    set('advTrans',   advTrans);
    set('advYearFrom',advYearFrom);
    set('advYearTo',  advYearTo);
    set('advMinPrice',advMinPrice);
    set('advMaxPrice',advMaxPrice);
    set('steering',   advSteering);
    const qs = p.toString();
    window.history.replaceState({}, '', qs ? `?${qs}` : window.location.pathname);
    setFilters(readFiltersFromUrl());
  };

  const resetAdv = () => {
    setAdvMake(''); setAdvModel(''); setAdvModelCode(''); setAdvSteering('');
    setAdvBodyType(''); setAdvFuel(''); setAdvDrive(''); setAdvTrans('');
    setAdvColor(''); setAdvLocation(''); setAdvYearFrom(''); setAdvYearTo('');
    setAdvMinPrice(''); setAdvMaxPrice(''); setAdvMinMil(''); setAdvMaxMil('');
    setAdvMinEng(''); setAdvMaxEng('');
    // Also clear from URL
    ['advMake','advBody','advFuel','advDrive','advTrans','advYearFrom','advYearTo','advMinPrice','advMaxPrice','steering']
      .forEach(k => setParam(k, ''));
    setFilters(readFiltersFromUrl());
  };

  // ── Run search (main bar) ──
  const runSearch = () => {
    setFilter('q', searchInput.trim());
  };

  // ── Filter DUMMY_CARS ──
  const visibleCars = DUMMY_CARS.filter(car => {
    // Text search
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const hay = `${car.make} ${car.model} ${car.variant} ${car.ref}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    // Sidebar: make
    if (filters.make && car.make.toLowerCase() !== filters.make.toLowerCase()) return false;
    // Sidebar: price range
    if (filters.price) {
      const pr = parsePriceRange(filters.price);
      if (pr && (car.fob < pr[0] || car.fob > pr[1])) return false;
    }
    // Sidebar: body type (approximate via model name matching)
    if (filters.body) {
      const b = filters.body.toLowerCase();
      const modelLower = car.model.toLowerCase();
      // rough match — real data would have body_type field
      if (b === 'suv' && !['kix','rav4','cr-v','cx-5','forester','outlander'].some(s => modelLower.includes(s))) return false;
      if (b === 'sedan' && !['yaris','corolla','civic','demio'].some(s => modelLower.includes(s))) return false;
      if (b === 'hatchback' && !['fit','move','demio','vitz'].some(s => modelLower.includes(s))) return false;
    }
    // Sidebar: fuel/category
    if (filters.fuel && car.fuel.toLowerCase() !== filters.fuel.toLowerCase()) return false;
    if (filters.category && car.fuel.toLowerCase() !== filters.category.toLowerCase()) return false;
    // Sidebar: year range
    if (filters.year) {
      const yr = parseYearRange(filters.year);
      if (yr && (car.year < yr[0] || car.year > yr[1])) return false;
    }
    // Sidebar: drive
    if (filters.drive && car.drive !== filters.drive) return false;
    // Sidebar: transmission
    if (filters.trans && car.trans !== filters.trans) return false;
    // Sidebar: mileage range
    if (filters.mileage) {
      const mr = parseMileageRange(filters.mileage);
      const km = parseMileageNum(car.mileage);
      if (mr && (km < mr[0] || km > mr[1])) return false;
    }
    // Sidebar: engine
    if (filters.engine) {
      const er = parseEngineRange(filters.engine);
      const cc = parseEngineNum(car.engine);
      if (er && (cc < er[0] || cc > er[1])) return false;
    }
    // Advanced: make
    if (filters.advMake && car.make.toLowerCase() !== filters.advMake.toLowerCase()) return false;
    // Advanced: body type
    if (filters.advBody) {
      const b = filters.advBody.toLowerCase();
      if (b === 'suv' && !['kix','rav4','cr-v','cx-5'].some(s => car.model.toLowerCase().includes(s))) return false;
    }
    // Advanced: fuel
    if (filters.advFuel && car.fuel.toLowerCase() !== filters.advFuel.toLowerCase()) return false;
    // Advanced: drive
    if (filters.advDrive && car.drive !== filters.advDrive) return false;
    // Advanced: transmission
    if (filters.advTrans && car.trans !== filters.advTrans) return false;
    // Advanced: year from/to
    if (filters.advYearFrom && car.year < Number(filters.advYearFrom)) return false;
    if (filters.advYearTo   && car.year > Number(filters.advYearTo))   return false;
    // Advanced: price
    if (filters.advMinPrice && car.fob < Number(filters.advMinPrice)) return false;
    if (filters.advMaxPrice && car.fob > Number(filters.advMaxPrice)) return false;
    // Steering
    if (filters.steering && car.steering !== filters.steering) return false;
    // Collection tab
    if (activeTab === 'New Arrivals' && car.status !== 'New Arrival') return false;
    if (activeTab === 'Clearance'    && car.status !== 'Clearance')   return false;
    return true;
  });

  // ── Sort cars ──
  const sortedCars = [...visibleCars].sort((a, b) => {
    if (sortBy === 'Price Low to High')    return a.fob - b.fob;
    if (sortBy === 'Price High to Low')    return b.fob - a.fob;
    if (sortBy === 'Mileage Low to High')  return parseMileageNum(a.mileage) - parseMileageNum(b.mileage);
    if (sortBy === 'Year Newest')          return b.year - a.year;
    if (sortBy === 'Year Oldest')          return a.year - b.year;
    return 0; // Newest First — keep insertion order
  });

  // ── Active filter count ──
  const filterCount = Object.values(filters).filter(Boolean).length;

  // ── Sidebar props ──
  const sidebarProps = {
    activeMake:     filters.make,
    setActiveMake:  (v:string) => setFilter('make', v),
    activePrice:    filters.price,
    setActivePrice: (v:string) => setFilter('price', v),
    activeBody:     filters.body,
    setActiveBody:  (v:string) => setFilter('body', v),
    activeCategory: filters.category,
    setActiveCategory: (v:string) => setFilter('category', v),
    activeLocation: filters.location,
    setActiveLocation: (v:string) => setFilter('location', v),
    activeYear:     filters.year,
    setActiveYear:  (v:string) => setFilter('year', v),
    activeDrive:    filters.drive,
    setActiveDrive: (v:string) => setFilter('drive', v),
    activeTrans:    filters.trans,
    setActiveTrans: (v:string) => setFilter('trans', v),
    activeEngine:   filters.engine,
    setActiveEngine:(v:string) => setFilter('engine', v),
    activeFuel:     filters.fuel,
    setActiveFuel:  (v:string) => setFilter('fuel', v),
    activeMileage:  filters.mileage,
    setActiveMileage:(v:string) => setFilter('mileage', v),
  };

  /* ── Select helper for advanced panel ── */
  const Sel = ({
    value, onChange, placeholder, options,
  }: { value:string; onChange:(v:string)=>void; placeholder:string; options:string[] }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full text-white text-[12px] px-3 py-2 outline-none border border-white/20 focus:border-[#C8102E] rounded-sm"
      style={{ background:'rgba(255,255,255,0.1)' }}
    >
      <option value="" className="bg-[#0D1B3E]">{placeholder}</option>
      {options.map(o => <option key={o} value={o} className="bg-[#0D1B3E]">{o}</option>)}
    </select>
  );

  // ── Active filter chips ──
  const activeChips = Object.entries({
    q: filters.q && `Search: "${filters.q}"`,
    make: filters.make,
    price: filters.price,
    body: filters.body,
    fuel: filters.fuel,
    year: filters.year,
    drive: filters.drive,
    trans: filters.trans,
    mileage: filters.mileage,
    engine: filters.engine,
    advMake: filters.advMake && `Make: ${filters.advMake}`,
    advYearFrom: filters.advYearFrom && `Year ≥ ${filters.advYearFrom}`,
    advYearTo: filters.advYearTo && `Year ≤ ${filters.advYearTo}`,
    advMinPrice: filters.advMinPrice && `Min ${Number(filters.advMinPrice).toLocaleString()}`,
    advMaxPrice: filters.advMaxPrice && `Max ${Number(filters.advMaxPrice).toLocaleString()}`,
  }).filter(([,v]) => !!v) as [string, string][];

  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">

      {/* ── HERO SEARCH BANNER ─────────────────────────────── */}
      <div className="w-full py-8 px-4" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: '#D4AF37' }}>
            45,354 Vehicles In Stock
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>
            Find Your Perfect Vehicle
          </h1>
          <p className="text-white/60 text-sm mb-5">Quality Japanese imports — exported worldwide</p>

          {/* Main Search Bar */}
          <div className="flex shadow-xl overflow-hidden rounded-sm max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && runSearch()}
                placeholder="Search make, model, or reference #"
                className="w-full h-13 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-white"
                style={{ height: 52 }}
              />
            </div>
            <button
              onClick={runSearch}
              className="h-[52px] px-6 text-white text-[13px] font-bold tracking-[0.1em] uppercase flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity"
              style={{ background: RED }}
            >
              <Search size={14} />
              Search
            </button>
          </div>

          {/* Quick stat pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {[
              { label: 'Toyota', count: '19,289' },
              { label: 'Nissan', count: '6,513' },
              { label: 'Honda', count: '4,187' },
              { label: 'Mazda', count: '2,859' },
            ].map(({ label, count }) => (
              <button
                key={label}
                onClick={() => setFilter('make', label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border border-white/20 text-white/80 hover:border-white hover:text-white hover:bg-white/10 transition-all"
              >
                {label}
                <span className="text-white/50 text-[10px]">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ─────────────────────────────── */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)} />
          <div className="relative bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto z-10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
              <span className="font-bold text-gray-900">Filters</span>
              <button onClick={() => setShowMobileFilter(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <Sidebar {...sidebarProps} />
          </div>
        </div>
      )}

      <div className="flex gap-0">
        {/* ── Desktop Sidebar ────────────────────────────────── */}
        <div className="hidden md:block sticky top-[80px] self-start overflow-y-auto max-h-[calc(100vh-80px)] border-r border-gray-200 bg-white shadow-sm" style={{ minWidth: 220, width: 220 }}>
          <div className="px-3 py-3 border-b border-gray-100" style={{ background: NAVY }}>
            <p className="text-white text-[11px] font-bold tracking-[0.15em] uppercase">Filter Vehicles</p>
            <p className="text-white/50 text-[10px] mt-0.5">45,354 cars in stock</p>
          </div>
          <Sidebar {...sidebarProps} />
        </div>

        {/* ── Main Content ───────────────────────────────────── */}
        <div className="flex-1 min-w-0 p-3 md:p-5">

          {/* ACTIVE FILTER CHIPS */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {activeChips.map(([key, label]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                  style={{ borderColor: RED, color: RED, background: 'rgba(200,16,46,0.06)' }}
                >
                  {label}
                  <button
                    onClick={() => setFilter(key, '')}
                    className="hover:opacity-70 transition-opacity leading-none"
                    aria-label={`Remove ${key} filter`}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              <button
                onClick={() => {
                  window.history.replaceState({}, '', window.location.pathname);
                  setFilters(readFiltersFromUrl());
                  setSearchInput('');
                }}
                className="text-[11px] font-semibold text-gray-400 hover:text-gray-700 underline transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* QUICK CHIPS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label:'Under $2,000',    action:() => setFilter('price', '$500 - $1500') },
              { label:'SUV & 4WD',       action:() => setFilter('body', 'SUV') },
              { label:'Right Hand Drive',action:() => setFilter('steering', 'RHD') },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-600 hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-red-50 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full opacity-60" style={{ background:RED }} />
                {label}
              </button>
            ))}
            <button
              onClick={() => setShowMobileFilter(true)}
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-600 hover:border-[#C8102E] hover:text-[#C8102E] transition-all"
            >
              <SlidersHorizontal size={12} />
              Filters {filterCount > 0 && `(${filterCount})`}
            </button>
          </div>

          {/* ADVANCED FILTER PANEL */}
          <div className="mb-5 rounded-sm overflow-hidden shadow-sm" style={{ background: NAVY }}>
            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
                <Sel value={advMake}      onChange={setAdvMake}      placeholder="Make"       options={MAKES.map(m=>m.name)} />
                <Sel value={advModel}     onChange={setAdvModel}     placeholder="Model"      options={[]} />
                <Sel value={advModelCode} onChange={setAdvModelCode} placeholder="Model Code" options={[]} />
                <Sel value={advSteering}  onChange={setAdvSteering}  placeholder="Steering"   options={['RHD','LHD']} />
                <Sel value={advBodyType}  onChange={setAdvBodyType}  placeholder="Body Type"  options={BODY_TYPES} />
                <Sel value={advFuel}      onChange={setAdvFuel}      placeholder="Fuel"       options={FUELS} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
                <Sel value={advDrive}    onChange={setAdvDrive}    placeholder="Drive"        options={DRIVES} />
                <Sel value={advTrans}    onChange={setAdvTrans}    placeholder="Transmission" options={TRANSMISSIONS} />
                <Sel value={advColor}    onChange={setAdvColor}    placeholder="Color"        options={['White','Black','Silver','Red','Blue','Grey']} />
                <Sel value={advLocation} onChange={setAdvLocation} placeholder="Location"     options={LOCATIONS} />
                <Sel value={advYearFrom} onChange={setAdvYearFrom} placeholder="Year From"    options={Array.from({length:24},(_,i)=>`${2025-i}`)} />
                <Sel value={advYearTo}   onChange={setAdvYearTo}   placeholder="Year To"      options={Array.from({length:24},(_,i)=>`${2025-i}`)} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <Sel value={advMinPrice} onChange={setAdvMinPrice} placeholder="Min Price ($)"   options={['1000','2000','3000','5000','8000','10000','15000','20000']} />
                <Sel value={advMaxPrice} onChange={setAdvMaxPrice} placeholder="Max Price ($)"   options={['3000','5000','8000','10000','15000','20000','30000','50000']} />
                <Sel value={advMinMil}   onChange={setAdvMinMil}   placeholder="Min Mileage"  options={MILEAGES} />
                <Sel value={advMaxMil}   onChange={setAdvMaxMil}   placeholder="Max Mileage"  options={MILEAGES} />
                <Sel value={advMinEng}   onChange={setAdvMinEng}   placeholder="Min Engine"   options={ENGINE_SIZES} />
                <Sel value={advMaxEng}   onChange={setAdvMaxEng}   placeholder="Max Engine"   options={ENGINE_SIZES} />
              </div>
              <div className="flex gap-3 mt-3 justify-end">
                <button
                  onClick={resetAdv}
                  className="px-5 py-2 text-white/70 border border-white/20 text-[12px] font-semibold rounded-sm hover:border-white/50 hover:text-white transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={commitAdvanced}
                  className="px-7 py-2 text-white text-[12px] font-bold uppercase tracking-[0.1em] rounded-sm hover:opacity-90 transition-opacity"
                  style={{ background: RED }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* SHOP BY MAKE CAROUSEL */}
          <MakeCarousel setActiveMake={(v) => setFilter('make', v)} />

          {/* SHOP BY BODY TYPE CAROUSEL */}
          <BodyTypeCarousel setActiveBody={(v) => setFilter('body', v)} />

          {/* TOTAL PRICE CALCULATOR */}
          <TotalPriceCalculator />

          {/* COLLECTION TABS */}
          <div className="flex flex-wrap gap-2 mb-5">
            {COLLECTION_TABS.map(t => (
              <button
                key={t.label}
                onClick={() => setActiveTab(t.label)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all"
                style={activeTab === t.label
                  ? { background: NAVY, color: '#fff', border: `1px solid ${NAVY}` }
                  : { background: '#fff', color: '#374151', border: '1px solid #E5E7EB' }}
              >
                {t.label}
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={activeTab === t.label
                    ? { background:'rgba(255,255,255,0.2)', color:'#fff' }
                    : { background:'#F3F4F6', color:'#6B7280' }}
                >
                  {t.count.toLocaleString()}
                </span>
              </button>
            ))}
          </div>

          {/* STOCK LIST HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily:"'Playfair Display',serif" }}>
                Stock List
                <span className="inline-block ml-2 h-0.5 w-8 align-middle" style={{ background:RED }} />
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm font-semibold">
                {sortedCars.length > 0 ? `${sortedCars.length} of 45,354 Cars` : '45,354 Cars'}
              </span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-200 bg-white text-[12px] text-gray-700 px-3 py-1.5 rounded-sm outline-none focus:border-[#C8102E] cursor-pointer"
              >
                {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* TOP PAGINATION */}
          <Pagination />

          {/* CAR ROWS */}
          {sortedCars.length > 0 ? (
            sortedCars.map(car => <CarRow key={car.ref} car={car} />)
          ) : (
            <div className="border border-gray-200 bg-white p-12 text-center mb-4">
              <Search size={40} className="mx-auto text-gray-300 mb-4" />
              <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
                No vehicles found
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                No demo cars match your current filters. Connect to live Supabase data to see full inventory.
              </p>
              <button
                onClick={() => {
                  window.history.replaceState({}, '', window.location.pathname);
                  setFilters(readFiltersFromUrl());
                  setSearchInput('');
                  setActiveTab('New Arrivals');
                }}
                className="px-6 py-2.5 text-white text-sm font-bold rounded-sm hover:opacity-90 transition-opacity"
                style={{ background: RED }}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* BOTTOM PAGINATION */}
          <Pagination />

          {/* REVIEWS */}
          <ReviewsSection />
        </div>
      </div>

      {/* scrollbar-hide style */}
      <style>{`
        .scrollbar-hide { scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
