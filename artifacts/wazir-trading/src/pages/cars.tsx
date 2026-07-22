import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  MessageCircle, X, SlidersHorizontal, MapPin,
  Gauge, Calendar, Zap, Settings, Users, Palette, DoorOpen,
  Navigation, Fuel, Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Car } from '@/components/CarCard';
import { useExchangeRate } from '@/hooks/useExchangeRate';

/* ─────────────────────────────────────────────────────────────── */
/* TYPES                                                            */
/* ─────────────────────────────────────────────────────────────── */
type CarWithImage = Car & { car_images?: Array<{ image_url: string; is_primary: boolean }> };

/* ─────────────────────────────────────────────────────────────── */
/* CONSTANTS                                                        */
/* ─────────────────────────────────────────────────────────────── */
const NAVY = '#0D1B3E';
const RED  = '#C8102E';
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
const PAGE_SIZE = 20;

const MAKE_NAMES = [
  'Toyota', 'Nissan', 'Honda', 'Mazda', 'Mitsubishi', 'Subaru',
  'Suzuki', 'Daihatsu', 'Lexus', 'Isuzu', 'Audi', 'BMW',
  'Mercedes', 'Volkswagen', 'Land Rover', 'Hino', 'Iseki',
  'John Deere', 'Kubota', 'Massey Ferguson', 'Mametora', 'Shibaura', 'Yanmar',
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
const CATEGORIES    = ['Gasoline', 'Hybrid', 'Diesel', 'Light Oil'];
const LOCATIONS     = ['Japan', 'Chile', 'UK', 'UAE', 'Thailand', 'China'];
const YEAR_RANGES   = ['2021-2023', '2018-2020', '2015-2017', '2012-2014', '2009-2011', '2006-2008', '2003-2005', '2000-2002'];
const DRIVES        = ['2WD', '4WD'];
const TRANSMISSIONS = ['AT', 'MT', 'FAT', 'IAT', 'CVT', 'CAT', 'I5', 'DAT'];
const ENGINE_SIZES  = ['660CC-1000CC', '1000CC-1500CC', '1500CC-1800CC', '1800CC-2000CC', '2000CC-2500CC', '2500CC-3000CC', '3000CC-3500CC'];
const FUELS         = ['Diesel', 'Electric', 'Gasoline', 'Gasoline E Power', 'Gasoline Hybrid'];
const MILEAGES      = ['50000KM-80000KM', '80000KM-100000KM', '100000KM-150000KM', '150000KM-200000KM', '200000KM-250000KM', '250000KM-300000KM'];

const MAKE_BRANDS = [
  { name: 'Toyota',          slug: 'toyota',          accent: '#EB0A1E' },
  { name: 'Nissan',          slug: 'nissan',          accent: '#C3002F' },
  { name: 'Honda',           slug: 'honda',           accent: '#CC0000' },
  { name: 'Mazda',           slug: 'mazda',           accent: '#1E3A8A' },
  { name: 'Mitsubishi',      slug: 'mitsubishi',      accent: '#E60012' },
  { name: 'Subaru',          slug: 'subaru',          accent: '#0033A1' },
  { name: 'Suzuki',          slug: 'suzuki',          accent: '#1B5CCC' },
  { name: 'Daihatsu',        slug: 'daihatsu',        accent: '#005BAC' },
  { name: 'Lexus',           slug: 'lexus',           accent: '#1A1A1A' },
  { name: 'Isuzu',           slug: 'isuzu',           accent: '#D40000' },
  { name: 'Audi',            slug: 'audi',            accent: '#BB0A14' },
  { name: 'BMW',             slug: 'bmw',             accent: '#0066B1' },
  { name: 'Mercedes',        slug: 'mercedes',        accent: '#666666' },
  { name: 'Volkswagen',      slug: 'volkswagen',      accent: '#001E50' },
  { name: 'Land Rover',      slug: 'landrover',       accent: '#005A2B' },
  { name: 'Hino',            slug: 'hino',            accent: '#A31922' },
  { name: 'Iseki',           slug: 'iseki',           accent: '#E05A00' },
  { name: 'John Deere',      slug: 'john-deere',      accent: '#367C2B' },
  { name: 'Kubota',          slug: 'kubota',          accent: '#D0231E' },
  { name: 'Massey Ferguson', slug: 'massey-ferguson', accent: '#CC1011' },
  { name: 'Mametora',        slug: 'mametora',        accent: '#555555' },
  { name: 'Shibaura',        slug: 'shibaura',        accent: '#0047AB' },
  { name: 'Yanmar',          slug: 'yanmar',          accent: '#C8102E' },
];

const COLLECTION_TABS: Array<{ label: string; key: string }> = [
  { label: 'All Cars',    key: '' },
  { label: 'New Arrivals',key: 'new_arrivals' },
  { label: 'Clearance',   key: 'clearance' },
  { label: 'Japan Stock', key: 'japan' },
  { label: 'Hybrid',      key: 'hybrid' },
  { label: 'SUV',         key: 'suv' },
  { label: 'Budget',      key: 'budget' },
];

const SORT_OPTIONS = [
  'Newest First', 'Price Low to High', 'Price High to Low',
  'Mileage Low to High', 'Year Newest', 'Year Oldest',
];

const COUNTRY_PORTS: Record<string, string[]> = {
  Pakistan:           ['Karachi', 'Gwadar'],
  UAE:                ['Dubai', 'Abu Dhabi'],
  UK:                 ['Southampton', 'Tilbury'],
  Guyana:             ['Georgetown'],
  Jamaica:            ['Kingston'],
  Trinidad:           ['Port of Spain'],
  Kenya:              ['Mombasa'],
  Ghana:              ['Tema', 'Takoradi'],
  Nigeria:            ['Lagos', 'Apapa'],
  Russia:             ['Vladivostok', 'Moscow'],
  'New Zealand':      ['Auckland', 'Wellington'],
  'Papua New Guinea': ['Port Moresby'],
  Germany:            ['Hamburg', 'Bremen'],
  Tanzania:           ['Dar es Salaam'],
  Uganda:             ['Kampala (via Mombasa)'],
  'South Africa':     ['Durban', 'Cape Town'],
  Australia:          ['Sydney', 'Melbourne', 'Brisbane'],
};
const DEST_COUNTRIES = Object.keys(COUNTRY_PORTS);

const REVIEWS = [
  { name: 'Muhammad Asif', country: 'Pakistan 🇵🇰', rating: 5, text: 'Excellent service from Wazir Trading. My Toyota Aqua arrived in perfect condition. The whole process was smooth and transparent. Highly recommended for anyone importing from Japan.' },
  { name: 'James Thompson', country: 'Guyana 🇬🇾',   rating: 5, text: 'Very professional company. They found exactly the car I wanted within my budget. Communication was excellent throughout the entire shipping process.' },
  { name: 'David Osei',     country: 'Ghana 🇬🇭',    rating: 5, text: 'Best Japanese car exporter I have dealt with. Quality vehicles at great prices. My Nissan Note arrived on time and exactly as described. Will buy again.' },
  { name: 'Sarah Williams', country: 'UK 🇬🇧',       rating: 5, text: 'Wazir Trading made importing a Japanese car to UK very easy. They handled all the paperwork and kept me updated at every step.' },
];

/* ─────────────────────────────────────────────────────────────── */
/* SMALL HELPERS                                                    */
/* ─────────────────────────────────────────────────────────────── */
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

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
    case 'Sedan': return <svg viewBox="0 0 58 43" width={96} height={44} aria-label="Sedan" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g><path fillRule="evenodd" clipRule="evenodd" d="M29.2326 38.387C15.5491 38.387 4.46516 38.4704 4.46516 38.5677C4.46516 38.6651 15.5491 38.7485 29.2326 38.7485C42.916 38.7485 54 38.6651 54 38.5677C54 38.4704 42.916 38.387 29.2326 38.387Z" fill="#878787"/></g>
      <path d="M45.6556 38.1642C43.582 38.0493 41.994 36.2752 42.1089 34.2016C42.2237 32.1279 43.9979 30.54 46.0715 30.6548C48.1452 30.7697 49.7331 32.5438 49.6182 34.6175C49.5034 36.6911 47.7293 38.279 45.6556 38.1642Z" stroke="#878787" strokeMiterlimit="10"/>
      <path d="M13.5405 30.6494C15.6014 30.6494 17.3008 32.3488 17.3008 34.4097C17.3008 36.4707 15.6014 38.17 13.5405 38.17C11.4795 38.17 9.78017 36.4707 9.78017 34.4097C9.78017 32.3488 11.4795 30.6494 13.5405 30.6494Z" stroke="#878787" strokeMiterlimit="10"/>
      <path d="M3.81381 32.5295C3.81381 32.3126 4.32 32.3126 4.32 32.1318C4.39231 30.8663 4.46463 29.4562 4.60926 28.1545C4.79004 26.5998 7.97184 26.5275 9.92431 25.9128C11.3344 25.4789 12.4553 24.5388 14.2631 23.7434C16.2156 22.8756 17.9511 22.0802 20.0121 22.0802C23.3746 22.0802 28.3643 21.6824 31.5099 22.6587C34.5109 23.5988 37.2589 25.3343 40.0791 26.6721C43.514 27.0337 47.3466 27.7206 50.8538 28.5884C51.9747 28.8777 52.4809 29.3839 52.8063 30.0708C53.1679 30.794 53.3486 31.4809 53.5294 31.9148C53.8187 31.951 53.8187 31.8787 53.891 32.0233C53.9995 32.2041 53.9272 32.421 53.9633 32.7103C53.9995 33.3249 53.9995 34.1566 53.8548 34.7351C53.7102 35.2774 53.5656 35.5305 53.3125 35.7475C53.0956 35.8921 52.8786 36.0005 52.5894 36.0367L51.3239 36.0729C50.5646 35.9282 50.7092 35.8198 50.7454 34.8797C50.7454 34.7351 50.7454 34.5904 50.7454 34.4458C50.7454 31.734 48.5759 29.5646 45.8642 29.5646C43.1524 29.5646 40.983 31.734 40.983 34.4458C40.983 34.7351 40.983 34.9882 41.0192 35.2413C41.1276 36.8683 41.2723 36.5791 39.7898 36.6514L19.2889 36.6152C18.2042 36.4706 18.2765 36.6152 18.385 35.2413C18.4212 34.9882 18.4212 34.6989 18.4212 34.4096C18.4212 31.6979 16.2518 29.5285 13.54 29.5285C10.8282 29.5285 8.65882 31.6979 8.65882 34.4096C8.65882 34.6266 8.65882 34.8797 8.69498 35.0966C8.7673 36.2175 8.47803 36.109 7.71874 36.0729C6.95945 36.0005 6.09169 35.9282 5.40471 35.8198C4.86235 35.7113 4.46463 35.6028 4.28384 35.4582C3.74149 34.952 3.81381 33.3611 3.81381 32.5295ZM25.5079 23.3818C25.7972 24.1411 25.9056 25.8405 26.0864 26.9613C26.1587 27.5037 26.3033 27.6483 26.8457 27.6483C29.0151 27.6845 34.8725 28.0822 34.8725 27.9737C35.0895 27.8653 35.9211 26.9252 36.5719 26.4551C35.1256 25.4066 33.0285 24.2496 31.1122 23.5988C30.4252 23.3818 28.6174 23.0926 27.3519 23.0564L25.7248 23.0203C25.4356 23.0203 25.3994 23.1649 25.5079 23.3818ZM14.2631 25.9851C14.3354 26.2382 14.5885 26.7082 14.7332 26.9252C14.8416 27.0698 14.9501 27.1783 15.2032 27.1783C15.854 27.2144 17.1195 27.2506 17.8788 27.2868C19.9759 27.3952 22.2176 27.5399 24.0616 27.576C24.8209 27.576 24.8571 27.7568 24.7848 27.106C24.4955 24.6473 24.4232 23.8157 24.2063 23.2372C24.1701 23.1287 23.9532 23.0564 23.8085 23.0564L20.9521 23.0926C20.0844 23.0926 19.2166 23.2733 18.3488 23.5264C18.2042 23.5626 17.9511 23.6711 17.6257 23.8157L17.1195 24.0326C16.0348 24.5388 14.6609 25.262 14.4439 25.5512C14.1908 25.732 14.1908 25.8043 14.2631 25.9851Z" fill="#F6F6F6"/>
      <path d="M51.3239 36.0729L52.5894 36.0367C52.8786 36.0005 53.0956 35.8921 53.3125 35.7475C53.5656 35.5305 53.7102 35.2774 53.8548 34.7351C53.9995 34.1566 53.9995 33.3249 53.9633 32.7103C53.9272 32.421 53.9995 32.2041 53.891 32.0233C53.8187 31.8787 53.8187 31.951 53.5294 31.9148C53.3486 31.4809 53.1679 30.794 52.8063 30.0708C52.4809 29.3839 51.9747 28.8777 50.8538 28.5884C47.3466 27.7206 43.514 27.0337 40.0791 26.6721C37.2589 25.3343 34.5109 23.5988 31.5099 22.6587C28.3643 21.6824 23.3746 22.0802 20.0121 22.0802C17.9511 22.0802 16.2156 22.8756 14.2631 23.7434C12.4553 24.5388 11.3344 25.4789 9.92431 25.9128C7.97184 26.5275 4.79004 26.5998 4.60926 28.1545C4.46463 29.4562 4.39232 30.8663 4.32001 32.1318C4.32001 32.3126 3.81381 32.3126 3.81381 32.5295C3.81381 33.3611 3.74149 34.952 4.28384 35.4582C4.46463 35.6028 4.86236 35.7113 5.40471 35.8198C6.09169 35.9282 6.95945 36.0005 7.71874 36.0729M39.7898 36.6514L19.2889 36.6152" stroke="#878787" strokeMiterlimit="10"/>
    </svg>;
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
        {open ? <ChevronUp size={14} className="flex-shrink-0" /> : <ChevronDown size={14} className="flex-shrink-0" />}
      </button>
      {open && <div className="bg-white py-2">{children}</div>}
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
  makeCounts,
  activeMake, setActiveMake, activePrice, setActivePrice,
  activeBody, setActiveBody, activeCategory, setActiveCategory,
  activeLocation, setActiveLocation, activeYear, setActiveYear,
  activeDrive, setActiveDrive, activeTrans, setActiveTrans,
  activeEngine, setActiveEngine, activeFuel, setActiveFuel,
  activeMileage, setActiveMileage,
}: {
  makeCounts: Record<string, number>;
  activeMake: string;     setActiveMake: (v: string) => void;
  activePrice: string;    setActivePrice: (v: string) => void;
  activeBody: string;     setActiveBody: (v: string) => void;
  activeCategory: string; setActiveCategory: (v: string) => void;
  activeLocation: string; setActiveLocation: (v: string) => void;
  activeYear: string;     setActiveYear: (v: string) => void;
  activeDrive: string;    setActiveDrive: (v: string) => void;
  activeTrans: string;    setActiveTrans: (v: string) => void;
  activeEngine: string;   setActiveEngine: (v: string) => void;
  activeFuel: string;     setActiveFuel: (v: string) => void;
  activeMileage: string;  setActiveMileage: (v: string) => void;
}) {
  return (
    <div className="border border-gray-200 overflow-hidden shadow-sm" style={{ width: 210, flexShrink: 0 }}>
      <AccordionSection title="Shop By Make" defaultOpen>
        {MAKE_NAMES.map(name => (
          <FilterItem key={name} label={name} count={makeCounts[name]}
            active={activeMake === name}
            onClick={() => setActiveMake(activeMake === name ? '' : name)} />
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
/* BRAND LOGO                                                       */
/* ─────────────────────────────────────────────────────────────── */
function BrandLogo({ slug, name, accent }: { slug: string; name: string; accent: string }) {
  const [failed, setFailed] = React.useState(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const src = `${base}/logos/${slug}.svg`;
  const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
  if (failed) {
    return (
      <div className="flex items-center justify-center w-full h-full rounded-[6px] font-black text-base tracking-tight text-white select-none"
        style={{ background: accent }}>
        {initials}
      </div>
    );
  }
  return (
    <img src={src} alt={`${name} logo`} onError={() => setFailed(true)}
      className="w-full h-full object-contain p-1" loading="lazy" />
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* SHOP BY MAKE CAROUSEL                                            */
/* ─────────────────────────────────────────────────────────────── */
function MakeCarousel({ setActiveMake, makeCounts }: {
  setActiveMake: (v: string) => void;
  makeCounts: Record<string, number>;
}) {
  const brandsWithCounts = MAKE_BRANDS.map(b => ({
    ...b,
    count: makeCounts[b.name] ?? 0,
  }));
  const track = [...brandsWithCounts, ...brandsWithCounts];
  return (
    <div className="mb-6 bg-white border border-gray-100 py-5 -mx-4 md:-mx-6 px-0 overflow-hidden">
      <style>{`
        @keyframes make-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .make-track { animation: make-scroll 55s linear infinite; will-change: transform; }
        .make-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="px-4 md:px-6 mb-4">
        <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-1" style={{ color: RED }}>Browse By Brand</p>
        <h3 className="font-bold text-base text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>Shop By Make</h3>
      </div>
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />
        <div className="flex make-track gap-3 px-3" style={{ width: 'max-content' }}>
          {track.map(({ name, slug, accent, count }, i) => (
            <button key={`${name}-${i}`} onClick={() => setActiveMake(name)}
              className="group flex-shrink-0 flex flex-col items-center gap-2 w-[100px] py-3 px-2 border border-gray-200 bg-white hover:border-[#C8102E] hover:shadow-[0_4px_16px_rgba(200,16,46,0.12)] transition-all cursor-pointer rounded-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-[6px] overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                <BrandLogo slug={slug} name={name} accent={accent} />
              </div>
              <span className="text-[11px] font-bold text-gray-800 group-hover:text-[#C8102E] text-center leading-tight transition-colors">{name}</span>
              <span className="text-[10px] font-semibold" style={{ color: RED }}>{count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* SHOP BY BODY TYPE CAROUSEL                                       */
/* ─────────────────────────────────────────────────────────────── */
function BodyTypeCarousel({ setActiveBody }: { setActiveBody: (v: string) => void }) {
  const track = [...BODY_TYPE_ITEMS, ...BODY_TYPE_ITEMS];
  return (
    <div className="mb-6 bg-gray-50 border border-gray-100 py-5 -mx-4 md:-mx-6 px-0 overflow-hidden">
      <style>{`
        @keyframes body-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .body-track { animation: body-scroll 40s linear infinite; will-change: transform; }
        .body-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="px-4 md:px-6 mb-4">
        <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-1" style={{ color: RED }}>Browse By Style</p>
        <h3 className="font-bold text-base text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>Shop By Body Type</h3>
      </div>
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} />
        <div className="flex body-track gap-3 px-3" style={{ width: 'max-content' }}>
          {track.map(({ name, accent, bg }, i) => (
            <button key={`${name}-${i}`} onClick={() => setActiveBody(name)}
              className="group flex-shrink-0 flex flex-col items-center gap-2 w-[140px] py-4 px-3 bg-white transition-all duration-200 cursor-pointer rounded-[8px]"
              style={{ border: `1.5px solid ${accent}33`, boxShadow: `0 2px 8px ${accent}0d` }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.border = `1.5px solid ${accent}`; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 20px ${accent}30`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.border = `1.5px solid ${accent}33`; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 2px 8px ${accent}0d`; }}
            >
              <div className="w-full h-[64px] flex items-center justify-center rounded-[6px]" style={{ backgroundColor: bg }}>
                <CarSilhouette type={name} color={accent} />
              </div>
              <span className="text-[11px] font-bold tracking-wide text-center leading-tight" style={{ color: accent }}>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* TOTAL PRICE CALCULATOR (Supabase-connected)                      */
/* ─────────────────────────────────────────────────────────────── */
function TotalPriceCalculator() {
  const [country, setCountry]       = useState('Pakistan');
  const [port, setPort]             = useState('Karachi');
  const [fob, setFob]               = useState('');
  const [inspection, setInspection] = useState('Yes');
  const [insurance, setInsurance]   = useState('Yes');
  const [result, setResult]         = useState<{ usd: number; pkr: number } | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);

  const ports = COUNTRY_PORTS[country] || [];

  const handleCountryChange = (c: string) => {
    setCountry(c);
    const ps = COUNTRY_PORTS[c] || [];
    setPort(ps[0] || '');
  };

  const calculate = async () => {
    setCalcLoading(true);
    setResult(null);
    try {
      const rateRes = await supabase.from('shipping_rates').select('freight_usd, inspection_fee, insurance_rate')
        .eq('country', country).eq('port', port).limit(1).maybeSingle();

      const fobPrice   = parseFloat(fob) || 0;
      const freightUSD = rateRes.data?.freight_usd    ?? (country === 'Pakistan' ? 1200 : 1500);
      const inspFee    = inspection === 'Yes' ? (rateRes.data?.inspection_fee ?? 150)  : 0;
      const insRate    = insurance  === 'Yes' ? (rateRes.data?.insurance_rate  ?? 0.025) : 0;
      const totalUSD   = fobPrice + freightUSD + inspFee + (fobPrice * insRate);

      setResult({ usd: totalUSD, pkr: Math.round(totalUSD * pkrRate) });
    } catch {
      // Fallback to basic calculation
      const fobPrice = parseFloat(fob) || 0;
      const totalUSD = fobPrice + 1200 + (inspection === 'Yes' ? 150 : 0) + (insurance === 'Yes' ? fobPrice * 0.025 : 0);
      setResult({ usd: totalUSD, pkr: Math.round(totalUSD * pkrRate) });
    } finally {
      setCalcLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-sm overflow-hidden shadow-md" style={{ background: NAVY }}>
      <div className="px-6 pt-5 pb-3 border-b border-white/10">
        <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display',serif" }}>Total Price Calculator</h3>
        <p className="text-white/60 text-[12px] mt-1">Estimate the landed cost based on your destination.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-1">FOB Price (USD)</label>
            <input type="number" value={fob} onChange={e => setFob(e.target.value)} placeholder="e.g. 8500"
              className="w-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 outline-none focus:border-[#C8102E] rounded-sm placeholder:text-white/30" />
          </div>
          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-1">Destination Country</label>
            <select value={country} onChange={e => handleCountryChange(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 outline-none focus:border-[#C8102E] rounded-sm">
              {DEST_COUNTRIES.map(c => <option key={c} value={c} className="bg-[#0D1B3E] text-white">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-1">Port</label>
            <select value={port} onChange={e => setPort(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 outline-none focus:border-[#C8102E] rounded-sm">
              {ports.map(p => <option key={p} value={p} className="bg-[#0D1B3E] text-white">{p}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-2">Inspection</label>
            <div className="flex gap-4">
              {['Yes', 'No'].map(o => (
                <label key={o} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="calc-inspection" value={o} checked={inspection === o}
                    onChange={() => setInspection(o)} className="accent-[#C8102E]" />
                  <span className="text-white/80 text-sm">{o}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-white/70 text-[11px] font-semibold uppercase tracking-wide block mb-2">Insurance</label>
            <div className="flex gap-4">
              {['Yes', 'No'].map(o => (
                <label key={o} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="calc-insurance" value={o} checked={insurance === o}
                    onChange={() => setInsurance(o)} className="accent-[#C8102E]" />
                  <span className="text-white/80 text-sm">{o}</span>
                </label>
              ))}
            </div>
          </div>
          {result && (
            <div className="p-4 rounded-sm border border-white/10" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-[11px] text-white/50 uppercase tracking-wider mb-1">Estimated Total</div>
              <div className="text-2xl font-black" style={{ color: RED }}>${result.usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div className="text-sm font-semibold mt-1" style={{ color: '#D4AF37' }}>PKR {result.pkr.toLocaleString()}</div>
              <p className="text-white/30 text-[10px] mt-2">* Estimate only. Customs duties and local taxes not included.</p>
            </div>
          )}
        </div>
      </div>
      <div className="px-6 pb-6">
        <button onClick={calculate} disabled={calcLoading}
          className="w-full py-3 font-bold text-sm tracking-[0.1em] uppercase text-white rounded-sm transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: RED }}>
          {calcLoading ? <><Loader2 size={16} className="animate-spin" /> Calculating...</> : 'Calculate Total Price'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* CAR LISTING CARD                                                 */
/* ─────────────────────────────────────────────────────────────── */
function CarRow({ car, pkrRate }: { car: CarWithImage; pkrRate: number }) {
  const primaryImage =
    car.car_images?.find(img => img.is_primary)?.image_url ||
    car.car_images?.[0]?.image_url ||
    null;

  const pkrPrice = Math.round(car.fob_price_usd * pkrRate);
  const isNewArrival = car.is_new_arrival;
  const isClearance  = car.collection?.toLowerCase() === 'clearance';

  const waInquireMsg = encodeURIComponent(
    `Hi, I am interested in ${car.make} ${car.model} ${car.year}\nReference: ${car.ref_number}\nPlease share more details.`
  );
  const waInquireLink = `https://wa.me/${WA_NUMBER}?text=${waInquireMsg}`;

  const handleOfferPrice = () => {
    const amount = window.prompt(`Enter your offer price in USD for ${car.make} ${car.model} ${car.year}:`);
    if (!amount) return;
    const msg = encodeURIComponent(
      `Hi, I would like to offer $${amount} for ${car.make} ${car.model} ${car.year} Ref: ${car.ref_number}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };

  const badges = [
    car.year ? String(car.year) : null,
    car.mileage_km ? `${car.mileage_km.toLocaleString()} km` : null,
    car.engine_cc  ? `${car.engine_cc} cc` : null,
    car.transmission || null,
    car.fuel_type || null,
    car.body_type || null,
    car.steering || null,
    car.drive || null,
    car.color || null,
  ].filter(Boolean) as string[];

  return (
    <div className="bg-white border border-gray-200 shadow-sm mb-3 overflow-hidden flex flex-col sm:flex-row">

      {/* ── Image ── */}
      <Link href={`/cars/${car.ref_number}`}
        className="relative sm:w-[220px] sm:flex-shrink-0 block">
        <div className="relative bg-gray-100 aspect-[4/3] sm:w-[220px] sm:h-full sm:aspect-auto min-h-[160px]">
          {(isNewArrival || isClearance) && (
            <div
              className="absolute top-2 left-2 z-10 px-1.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider"
              style={{ background: isClearance ? '#D97706' : '#16A34A' }}>
              {isClearance ? 'CLEARANCE' : 'New Arrival'}
            </div>
          )}
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={`${car.make} ${car.model}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-gray-100">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              <span className="text-[11px] font-medium text-gray-400">Photo Coming Soon</span>
            </div>
          )}
        </div>
      </Link>

      {/* ── Details ── */}
      <div className="flex-1 flex flex-col p-3 min-w-0">

        {/* Title + ref */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/cars/${car.ref_number}`}>
            <h3 className="font-bold text-[13px] sm:text-[14px] text-gray-900 leading-snug hover:text-[#C8102E] transition-colors">
              {car.make.toUpperCase()} {car.model.toUpperCase()}{car.variant ? ` ${car.variant.toUpperCase()}` : ''}
            </h3>
          </Link>
          <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0 mt-px">
            #{car.ref_number}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-2">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: RED }} />
          <span className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase">
            {car.stock_location || 'Japan'}
          </span>
        </div>

        {/* Spec badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {badges.map((b, i) => (
            <span key={i}
              className="px-1.5 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-100 border border-gray-200">
              {b}
            </span>
          ))}
        </div>

        {/* Price + Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {/* Price */}
          <div className="mr-auto">
            <div className="text-[20px] sm:text-[22px] font-black leading-none" style={{ color: RED }}>
              ${car.fob_price_usd.toLocaleString()}
            </div>
            {pkrRate > 0 && (
              <div className="text-[10px] font-semibold text-gray-400 mt-0.5">
                PKR {pkrPrice.toLocaleString()}
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <Link href={`/cars/${car.ref_number}`}
            className="px-3 py-1.5 text-[11px] font-bold text-white tracking-wide hover:opacity-90 transition-opacity"
            style={{ background: NAVY }}>
            View Details
          </Link>
          <a href={waInquireLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold text-white hover:opacity-90 transition-opacity"
            style={{ background: '#25D366' }}>
            <WhatsAppIcon size={12} /> WhatsApp
          </a>
          <button onClick={handleOfferPrice}
            className="px-3 py-1.5 text-[11px] font-bold border hover:bg-red-50 transition-colors"
            style={{ borderColor: RED, color: RED }}>
            Offer Price
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* PAGINATION (controlled)                                          */
/* ─────────────────────────────────────────────────────────────── */
function Pagination({ page, total, onPage }: {
  page: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;

  const pageNums: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pageNums.push(i);

  return (
    <div className="flex items-center justify-center gap-1 my-6">
      <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 disabled:opacity-40 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors rounded-sm">
        <ChevronLeft size={14} />
      </button>
      {start > 1 && <>
        <button onClick={() => onPage(1)} className="w-8 h-8 flex items-center justify-center border border-gray-200 text-[13px] font-semibold rounded-sm hover:border-[#C8102E] hover:text-[#C8102E] transition-colors">1</button>
        {start > 2 && <span className="px-1 text-gray-400 text-sm">…</span>}
      </>}
      {pageNums.map(p => (
        <button key={p} onClick={() => onPage(p)}
          className="w-8 h-8 flex items-center justify-center border text-[13px] font-semibold rounded-sm transition-colors"
          style={page === p ? { background: RED, borderColor: RED, color: '#fff' } : { borderColor: '#E5E7EB', color: '#374151' }}>
          {p}
        </button>
      ))}
      {end < totalPages && <>
        {end < totalPages - 1 && <span className="px-1 text-gray-400 text-sm">…</span>}
        <button onClick={() => onPage(totalPages)} className="w-8 h-8 flex items-center justify-center border border-gray-200 text-[13px] font-semibold text-gray-700 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors rounded-sm">{totalPages}</button>
      </>}
      <button onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 disabled:opacity-40 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors rounded-sm">
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/* REVIEWS SECTION                                                  */
/* ─────────────────────────────────────────────────────────────── */
function ReviewsSection() {
  const [active, setActive] = useState(0);
  const perPage = 2;
  const maxIndex = Math.ceil(REVIEWS.length / perPage) - 1;
  const visible = REVIEWS.slice(active * perPage, active * perPage + perPage);
  return (
    <section className="py-12 border-t border-gray-100" style={{ background: '#F8FAFC' }}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
          What Our Happy Customers Say
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-4">
          {[['500+', 'Customers'], ['5.0', 'Star'], ['100%', 'Satisfaction']].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl font-black text-gray-900">{v}</div>
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative max-w-4xl mx-auto px-8">
        <button onClick={() => setActive(a => Math.max(a - 1, 0))} disabled={active === 0}
          className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm disabled:opacity-40 hover:border-[#C8102E] hover:text-[#C8102E] transition-all">
          <ChevronLeft size={16} />
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visible.map(r => (
            <div key={r.name} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div className="text-4xl leading-none font-serif mb-2" style={{ color: 'rgba(200,16,46,0.12)' }}>"</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ background: RED }}>{r.name[0]}</div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                  <div className="text-[11px] text-gray-400">{r.country}</div>
                  <StarRow count={r.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setActive(a => Math.min(a + 1, maxIndex))} disabled={active === maxIndex}
          className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm disabled:opacity-40 transition-all"
          style={{ background: RED }}>
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-5">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: active === i ? RED : '#CBD5E1' }} />
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

/* ─────────────────────────────────────────────────────────────── */
/* SUPABASE QUERY BUILDER                                           */
/* ─────────────────────────────────────────────────────────────── */
type Filters = {
  q: string; make: string; price: string; body: string; category: string;
  location: string; year: string; drive: string; trans: string; engine: string;
  fuel: string; mileage: string; steering: string;
  advMake: string; advModel: string; advBody: string; advFuel: string; advDrive: string;
  advTrans: string; advYearFrom: string; advYearTo: string; advMinPrice: string; advMaxPrice: string;
  advColor: string; advLocation: string; advMinMil: string; advMaxMil: string;
  advMinEng: string; advMaxEng: string;
};

function applyFiltersToQuery(query: any, filters: Filters, activeTab: string, sortBy: string): any {
  // Full-text search
  if (filters.q) {
    const q = filters.q.replace(/'/g, "''");
    query = query.or(`make.ilike.%${q}%,model.ilike.%${q}%,ref_number.ilike.%${q}%,variant.ilike.%${q}%`);
  }

  // Sidebar filters
  if (filters.make)     query = query.ilike('make', filters.make);
  if (filters.body)     query = query.eq('body_type', filters.body);
  if (filters.location) query = query.eq('stock_location', filters.location);
  if (filters.drive)    query = query.eq('drive', filters.drive);
  if (filters.trans)    query = query.eq('transmission', filters.trans);
  if (filters.steering) query = query.eq('steering', filters.steering);

  const fuelFilter = filters.fuel || filters.category;
  if (fuelFilter)       query = query.eq('fuel_type', fuelFilter);

  if (filters.price) {
    const pr = parsePriceRange(filters.price);
    if (pr) query = query.gte('fob_price_usd', pr[0]).lte('fob_price_usd', pr[1]);
  }
  if (filters.year) {
    const yr = parseYearRange(filters.year);
    if (yr) query = query.gte('year', yr[0]).lte('year', yr[1]);
  }
  if (filters.engine) {
    const er = parseEngineRange(filters.engine);
    if (er) query = query.gte('engine_cc', er[0]).lte('engine_cc', er[1]);
  }
  if (filters.mileage) {
    const mr = parseMileageRange(filters.mileage);
    if (mr) query = query.gte('mileage_km', mr[0]).lte('mileage_km', mr[1]);
  }

  // Advanced filters
  if (filters.advMake)     query = query.ilike('make', filters.advMake);
  if (filters.advModel)    query = query.ilike('model', filters.advModel);
  if (filters.advBody)     query = query.eq('body_type', filters.advBody);
  if (filters.advFuel)     query = query.eq('fuel_type', filters.advFuel);
  if (filters.advDrive)    query = query.eq('drive', filters.advDrive);
  if (filters.advTrans)    query = query.eq('transmission', filters.advTrans);
  if (filters.advColor)    query = query.ilike('color', filters.advColor);
  if (filters.advLocation) query = query.eq('stock_location', filters.advLocation);
  if (filters.advYearFrom) query = query.gte('year', parseInt(filters.advYearFrom));
  if (filters.advYearTo)   query = query.lte('year', parseInt(filters.advYearTo));
  if (filters.advMinPrice) query = query.gte('fob_price_usd', parseFloat(filters.advMinPrice));
  if (filters.advMaxPrice) query = query.lte('fob_price_usd', parseFloat(filters.advMaxPrice));
  if (filters.advMinMil) {
    const mr = parseMileageRange(filters.advMinMil);
    if (mr) query = query.gte('mileage_km', mr[0]);
  }
  if (filters.advMaxMil) {
    const mr = parseMileageRange(filters.advMaxMil);
    if (mr) query = query.lte('mileage_km', mr[1]);
  }
  if (filters.advMinEng) {
    const er = parseEngineRange(filters.advMinEng);
    if (er) query = query.gte('engine_cc', er[0]);
  }
  if (filters.advMaxEng) {
    const er = parseEngineRange(filters.advMaxEng);
    if (er) query = query.lte('engine_cc', er[1]);
  }

  // Collection tab
  switch (activeTab) {
    case 'new_arrivals': query = query.eq('is_new_arrival', true); break;
    case 'clearance':    query = query.eq('collection', 'clearance'); break;
    case 'japan':        query = query.eq('stock_location', 'Japan'); break;
    case 'hybrid':       query = query.eq('fuel_type', 'Hybrid'); break;
    case 'suv':          query = query.eq('body_type', 'SUV'); break;
    case 'budget':       query = query.lt('fob_price_usd', 2000); break;
  }

  // Sorting
  switch (sortBy) {
    case 'Price Low to High':   query = query.order('fob_price_usd', { ascending: true }); break;
    case 'Price High to Low':   query = query.order('fob_price_usd', { ascending: false }); break;
    case 'Mileage Low to High': query = query.order('mileage_km', { ascending: true }); break;
    case 'Year Newest':         query = query.order('year', { ascending: false }); break;
    case 'Year Oldest':         query = query.order('year', { ascending: true }); break;
    default:                    query = query.order('created_at', { ascending: false }); break;
  }

  return query;
}

/* ─────────────────────────────────────────────────────────────── */
/* MAIN PAGE                                                        */
/* ─────────────────────────────────────────────────────────────── */
export default function CarsPage() {
  const [, navigate] = useLocation();

  // ── Read URL params ──
  const readFiltersFromUrl = useCallback((): Filters => {
    const p = getParams();
    return {
      q:           p.get('q')           || '',
      make:        p.get('make')        || '',
      price:       p.get('price')       || '',
      body:        p.get('body')        || '',
      category:    p.get('category')    || '',
      location:    p.get('location')    || '',
      year:        p.get('year')        || '',
      drive:       p.get('drive')       || '',
      trans:       p.get('trans')       || '',
      engine:      p.get('engine')      || '',
      fuel:        p.get('fuel')        || '',
      mileage:     p.get('mileage')     || '',
      steering:    p.get('steering')    || '',
      advMake:     p.get('advMake')     || '',
      advModel:    p.get('advModel')    || '',
      advBody:     p.get('advBody')     || '',
      advFuel:     p.get('advFuel')     || '',
      advDrive:    p.get('advDrive')    || '',
      advTrans:    p.get('advTrans')    || '',
      advYearFrom: p.get('advYearFrom') || '',
      advYearTo:   p.get('advYearTo')   || '',
      advMinPrice: p.get('advMinPrice') || '',
      advMaxPrice: p.get('advMaxPrice') || '',
      advColor:    p.get('advColor')    || '',
      advLocation: p.get('advLocation') || '',
      advMinMil:   p.get('advMinMil')   || '',
      advMaxMil:   p.get('advMaxMil')   || '',
      advMinEng:   p.get('advMinEng')   || '',
      advMaxEng:   p.get('advMaxEng')   || '',
    };
  }, []);

  // ── Core state ──
  const [filters, setFilters]           = useState(readFiltersFromUrl);
  const [cars, setCars]                 = useState<CarWithImage[]>([]);
  const [totalCount, setTotalCount]     = useState(0);
  const [loading, setLoading]           = useState(true);
  const [page, setPage]                 = useState(() => parseInt(getParams().get('page') || '1'));
  const [sortBy, setSortBy]             = useState('Newest First');
  const [activeTab, setActiveTab]       = useState('');
  const [makeCounts, setMakeCounts]     = useState<Record<string, number>>({});
  const [tabCounts, setTabCounts]       = useState<Record<string, number>>({});
  const { pkr: pkrRate }                = useExchangeRate();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // ── Ref for scroll-to-results ──
  const resultsRef = useRef<HTMLDivElement>(null);

  // ── Scroll to results when arriving from a filtered link ──
  useEffect(() => {
    const p = getParams();
    const hasFilter = ['q','make','price','body','category','location','year','drive','trans',
      'engine','fuel','mileage','steering','minPrice','maxPrice','advMake','advModel',
      'advBody','advFuel','advDrive','advTrans','advYearFrom','advYearTo','advMinPrice',
      'advMaxPrice','advColor','advLocation','advMinMil','advMaxMil','advMinEng','advMaxEng',
    ].some(k => p.get(k));
    const delay = hasFilter ? setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400) : null;
    return () => { if (delay !== null) clearTimeout(delay); };
  }, []);

  // ── Search input state ──
  const [searchInput, setSearchInput] = useState(filters.q);

  // ── Advanced filter draft state ──
  const [advMake,      setAdvMake]      = useState(filters.advMake);
  const [advModel,     setAdvModel]     = useState(filters.advModel);
  const [advModelCode, setAdvModelCode] = useState('');
  const [advSteering,  setAdvSteering]  = useState(filters.steering);
  const [advBodyType,  setAdvBodyType]  = useState(filters.advBody);
  const [advFuel,      setAdvFuel]      = useState(filters.advFuel);
  const [advDrive,     setAdvDrive]     = useState(filters.advDrive);
  const [advTrans,     setAdvTrans]     = useState(filters.advTrans);
  const [advColor,     setAdvColor]     = useState(filters.advColor);
  const [advLocation,  setAdvLocation]  = useState(filters.advLocation);
  const [advYearFrom,  setAdvYearFrom]  = useState(filters.advYearFrom);
  const [advYearTo,    setAdvYearTo]    = useState(filters.advYearTo);
  const [advMinPrice,  setAdvMinPrice]  = useState(filters.advMinPrice);
  const [advMaxPrice,  setAdvMaxPrice]  = useState(filters.advMaxPrice);
  const [advMinMil,    setAdvMinMil]    = useState(filters.advMinMil);
  const [advMaxMil,    setAdvMaxMil]    = useState(filters.advMaxMil);
  const [advMinEng,    setAdvMinEng]    = useState(filters.advMinEng);
  const [advMaxEng,    setAdvMaxEng]    = useState(filters.advMaxEng);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  // ── Sync URL on back/forward ──
  useEffect(() => {
    const sync = () => {
      setFilters(readFiltersFromUrl());
      setPage(parseInt(getParams().get('page') || '1'));
    };
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [readFiltersFromUrl]);

  // ── Fetch cars ──
  const fetchCars = useCallback(async (currentFilters: Filters, currentTab: string, currentSort: string, currentPage: number) => {
    setLoading(true);
    try {
      let query = supabase
        .from('cars')
        .select('*, car_images(image_url, is_primary)', { count: 'exact' });

      query = applyFiltersToQuery(query, currentFilters, currentTab, currentSort);

      const from = (currentPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (error) throw error;
      setCars((data as CarWithImage[]) || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error('Failed to fetch cars:', err);
      setCars([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch make counts (parallel HEAD queries) ──
  const fetchMakeCounts = useCallback(async () => {
    try {
      const results = await Promise.all(
        MAKE_NAMES.map(name =>
          supabase.from('cars').select('*', { count: 'exact', head: true }).eq('make', name)
            .then(({ count }) => ({ name, count: count || 0 }))
        )
      );
      const counts: Record<string, number> = {};
      results.forEach(({ name, count }) => { counts[name] = count; });
      setMakeCounts(counts);
    } catch (err) {
      console.error('Failed to fetch make counts:', err);
    }
  }, []);

  // ── Fetch tab counts ──
  const fetchTabCounts = useCallback(async () => {
    try {
      const tabConfigs = [
        { key: 'new_arrivals', apply: (q: any) => q.eq('is_new_arrival', true) },
        { key: 'clearance',    apply: (q: any) => q.eq('collection', 'clearance') },
        { key: 'japan',        apply: (q: any) => q.eq('stock_location', 'Japan') },
        { key: 'hybrid',       apply: (q: any) => q.eq('fuel_type', 'Hybrid') },
        { key: 'suv',          apply: (q: any) => q.eq('body_type', 'SUV') },
        { key: 'budget',       apply: (q: any) => q.lt('fob_price_usd', 2000) },
      ];
      const results = await Promise.all(
        tabConfigs.map(({ key, apply }) =>
          apply(supabase.from('cars').select('*', { count: 'exact', head: true }))
            .then(({ count }: any) => ({ key, count: count || 0 }))
        )
      );
      const counts: Record<string, number> = {};
      results.forEach(({ key, count }: any) => { counts[key] = count; });
      setTabCounts(counts);
    } catch (err) {
      console.error('Failed to fetch tab counts:', err);
    }
  }, []);

  // PKR rate is now live via useExchangeRate() — no Supabase fetch needed

  // ── Fetch models for advanced filter ──
  useEffect(() => {
    if (!advMake) { setAvailableModels([]); return; }
    supabase.from('cars').select('model').eq('make', advMake).limit(500)
      .then(({ data }) => {
        const models = [...new Set((data || []).map((r: any) => r.model).filter(Boolean))].sort() as string[];
        setAvailableModels(models);
      });
  }, [advMake]);

  // ── Initial data load ──
  useEffect(() => {
    fetchMakeCounts();
    fetchTabCounts();
  }, [fetchMakeCounts, fetchTabCounts]);

  // ── Re-fetch cars when filters/page/sort/tab change ──
  useEffect(() => {
    fetchCars(filters, activeTab, sortBy, page);
  }, [filters, activeTab, sortBy, page, fetchCars]);

  // ── Write a filter change to state + URL (resets page to 1) ──
  const setFilter = (key: string, value: string) => {
    setParam(key, value);
    setParam('page', '1');
    setPage(1);
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (p: number) => {
    setParam('page', String(p));
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    setPage(1);
    setParam('page', '1');
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setPage(1);
    setParam('page', '1');
  };

  // ── Commit advanced filter to URL ──
  const commitAdvanced = () => {
    const p = getParams();
    const set = (k: string, v: string) => { if (v) p.set(k, v); else p.delete(k); };
    set('advMake', advMake); set('advModel', advModel); set('advBody', advBodyType);
    set('advFuel', advFuel); set('advDrive', advDrive); set('advTrans', advTrans);
    set('advYearFrom', advYearFrom); set('advYearTo', advYearTo);
    set('advMinPrice', advMinPrice); set('advMaxPrice', advMaxPrice);
    set('steering', advSteering); set('advColor', advColor);
    set('advLocation', advLocation); set('advMinMil', advMinMil);
    set('advMaxMil', advMaxMil); set('advMinEng', advMinEng); set('advMaxEng', advMaxEng);
    p.set('page', '1');
    const qs = p.toString();
    window.history.replaceState({}, '', qs ? `?${qs}` : window.location.pathname);
    setPage(1);
    setFilters(readFiltersFromUrl());
  };

  const resetAdv = () => {
    setAdvMake(''); setAdvModel(''); setAdvModelCode(''); setAdvSteering('');
    setAdvBodyType(''); setAdvFuel(''); setAdvDrive(''); setAdvTrans('');
    setAdvColor(''); setAdvLocation(''); setAdvYearFrom(''); setAdvYearTo('');
    setAdvMinPrice(''); setAdvMaxPrice(''); setAdvMinMil(''); setAdvMaxMil('');
    setAdvMinEng(''); setAdvMaxEng('');
    ['advMake', 'advModel', 'advBody', 'advFuel', 'advDrive', 'advTrans',
     'advYearFrom', 'advYearTo', 'advMinPrice', 'advMaxPrice', 'steering',
     'advColor', 'advLocation', 'advMinMil', 'advMaxMil', 'advMinEng', 'advMaxEng']
      .forEach(k => setParam(k, ''));
    setParam('page', '1');
    setPage(1);
    setFilters(readFiltersFromUrl());
  };

  const runSearch = () => setFilter('q', searchInput.trim());

  // ── Active filter count ──
  const filterCount = Object.values(filters).filter(Boolean).length;

  // ── Active filter chips ──
  const activeChips = Object.entries({
    q:           filters.q && `Search: "${filters.q}"`,
    make:        filters.make,
    price:       filters.price,
    body:        filters.body,
    fuel:        filters.fuel,
    category:    filters.category,
    year:        filters.year,
    drive:       filters.drive,
    trans:       filters.trans,
    mileage:     filters.mileage,
    engine:      filters.engine,
    location:    filters.location,
    advMake:     filters.advMake && `Make: ${filters.advMake}`,
    advModel:    filters.advModel && `Model: ${filters.advModel}`,
    advYearFrom: filters.advYearFrom && `Year ≥ ${filters.advYearFrom}`,
    advYearTo:   filters.advYearTo   && `Year ≤ ${filters.advYearTo}`,
    advMinPrice: filters.advMinPrice && `Min $${Number(filters.advMinPrice).toLocaleString()}`,
    advMaxPrice: filters.advMaxPrice && `Max $${Number(filters.advMaxPrice).toLocaleString()}`,
    advColor:    filters.advColor && `Color: ${filters.advColor}`,
  }).filter(([, v]) => !!v) as [string, string][];

  // ── Sidebar props ──
  const sidebarProps = {
    makeCounts,
    activeMake:       filters.make,      setActiveMake:       (v: string) => setFilter('make', v),
    activePrice:      filters.price,     setActivePrice:      (v: string) => setFilter('price', v),
    activeBody:       filters.body,      setActiveBody:       (v: string) => setFilter('body', v),
    activeCategory:   filters.category,  setActiveCategory:   (v: string) => setFilter('category', v),
    activeLocation:   filters.location,  setActiveLocation:   (v: string) => setFilter('location', v),
    activeYear:       filters.year,      setActiveYear:       (v: string) => setFilter('year', v),
    activeDrive:      filters.drive,     setActiveDrive:      (v: string) => setFilter('drive', v),
    activeTrans:      filters.trans,     setActiveTrans:      (v: string) => setFilter('trans', v),
    activeEngine:     filters.engine,    setActiveEngine:     (v: string) => setFilter('engine', v),
    activeFuel:       filters.fuel,      setActiveFuel:       (v: string) => setFilter('fuel', v),
    activeMileage:    filters.mileage,   setActiveMileage:    (v: string) => setFilter('mileage', v),
  };

  /* Select helper for advanced panel */
  const Sel = ({ value, onChange, placeholder, options }: {
    value: string; onChange: (v: string) => void; placeholder: string; options: string[];
  }) => (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full text-white text-[12px] px-3 py-2 outline-none border border-white/20 focus:border-[#C8102E] rounded-sm"
      style={{ background: 'rgba(255,255,255,0.1)' }}>
      <option value="" className="bg-[#0D1B3E]">{placeholder}</option>
      {options.map(o => <option key={o} value={o} className="bg-[#0D1B3E]">{o}</option>)}
    </select>
  );

  const totalDisplay = totalCount.toLocaleString();

  return (
    <div className="min-h-screen bg-gray-50 pt-[175px] md:pt-[148px]">

      {/* ── HERO SEARCH BANNER ─────────────────────────────── */}
      <div className="w-full py-10 px-4" style={{ background: NAVY }}>
        <div className="max-w-3xl mx-auto text-center">
          {/* Stock count badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10"
            style={{ background: 'rgba(212,175,55,0.12)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4AF37' }} />
            <span className="text-[11px] tracking-[0.25em] uppercase font-bold" style={{ color: '#D4AF37' }}>
              {totalCount > 0 ? `${totalDisplay} Vehicles In Stock` : 'Loading Inventory…'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight"
            style={{ fontFamily: "'Playfair Display',serif" }}>
            Find Your Perfect Vehicle
          </h1>
          <p className="text-white/50 text-sm mb-6">
            Quality Japanese imports — exported worldwide
          </p>

          {/* Search bar */}
          <div className="flex w-full max-w-2xl mx-auto rounded-sm overflow-hidden shadow-2xl">
            <div className="relative flex-1 min-w-0">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && runSearch()}
                placeholder="Search make, model, or reference #"
                className="w-full pl-10 pr-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-white"
                style={{ height: 50 }}
              />
            </div>
            <button
              onClick={runSearch}
              className="h-[50px] px-5 sm:px-7 text-white text-[12px] font-bold tracking-[0.08em] uppercase flex items-center gap-1.5 flex-shrink-0 hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ background: RED }}>
              <Search size={13} className="hidden sm:block" /> Search
            </button>
          </div>

          {/* Quick make pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {['Toyota', 'Nissan', 'Honda', 'Mazda'].map(label => (
              <button
                key={label}
                onClick={() => setFilter('make', label)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border border-white/20 text-white/70 hover:border-white/60 hover:text-white hover:bg-white/10 transition-all duration-150">
                {label}
                {makeCounts[label] ? (
                  <span className="text-white/40 text-[10px]">{makeCounts[label].toLocaleString()}</span>
                ) : null}
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
              <button onClick={() => setShowMobileFilter(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <Sidebar {...sidebarProps} />
          </div>
        </div>
      )}

      <div ref={resultsRef} className="flex gap-0">
        {/* ── Desktop Sidebar ────────────────────────────────── */}
        <div className="hidden md:block sticky top-[148px] self-start overflow-y-auto max-h-[calc(100vh-148px)] border-r border-gray-200 bg-white shadow-sm" style={{ minWidth: 220, width: 220 }}>
          <div className="px-3 py-3 border-b border-gray-100" style={{ background: NAVY }}>
            <p className="text-white text-[11px] font-bold tracking-[0.15em] uppercase">Filter Vehicles</p>
            <p className="text-white/50 text-[10px] mt-0.5">{totalDisplay} cars in stock</p>
          </div>
          <Sidebar {...sidebarProps} />
        </div>

        {/* ── Main Content ───────────────────────────────────── */}
        <div className="flex-1 min-w-0 p-3 md:p-5">

          {/* ACTIVE FILTER CHIPS */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {activeChips.map(([key, label]) => (
                <span key={key}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                  style={{ borderColor: RED, color: RED, background: 'rgba(200,16,46,0.06)' }}>
                  {label}
                  <button onClick={() => setFilter(key, '')}
                    className="hover:opacity-70 transition-opacity leading-none" aria-label={`Remove ${key} filter`}>
                    <X size={10} />
                  </button>
                </span>
              ))}
              <button onClick={() => {
                window.history.replaceState({}, '', window.location.pathname);
                setFilters(readFiltersFromUrl());
                setSearchInput('');
                setPage(1);
              }} className="text-[11px] font-semibold text-gray-400 hover:text-gray-700 underline transition-colors">
                Clear all
              </button>
            </div>
          )}

          {/* QUICK CHIPS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: 'Under $2,000',    action: () => setFilter('price', '$500 - $1500') },
              { label: 'SUV & 4WD',       action: () => setFilter('body', 'SUV') },
              { label: 'Right Hand Drive', action: () => setFilter('steering', 'RHD') },
            ].map(({ label, action }) => (
              <button key={label} onClick={action}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-600 hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-red-50 transition-all">
                <span className="w-1.5 h-1.5 rounded-full opacity-60" style={{ background: RED }} />
                {label}
              </button>
            ))}
            <button onClick={() => setShowMobileFilter(true)}
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-600 hover:border-[#C8102E] hover:text-[#C8102E] transition-all">
              <SlidersHorizontal size={12} />
              Filters {filterCount > 0 && `(${filterCount})`}
            </button>
          </div>

          {/* ADVANCED FILTER PANEL */}
          <div className="mb-5 rounded-sm overflow-hidden shadow-sm" style={{ background: NAVY }}>
            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
                <Sel value={advMake}       onChange={v => { setAdvMake(v); setAdvModel(''); }} placeholder="Make"       options={MAKE_NAMES} />
                <Sel value={advModel}      onChange={setAdvModel}      placeholder="Model"      options={availableModels} />
                <Sel value={advModelCode}  onChange={setAdvModelCode}  placeholder="Model Code" options={[]} />
                <Sel value={advSteering}   onChange={setAdvSteering}   placeholder="Steering"   options={['RHD', 'LHD']} />
                <Sel value={advBodyType}   onChange={setAdvBodyType}   placeholder="Body Type"  options={BODY_TYPES} />
                <Sel value={advFuel}       onChange={setAdvFuel}       placeholder="Fuel"       options={FUELS} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
                <Sel value={advDrive}    onChange={setAdvDrive}    placeholder="Drive"        options={DRIVES} />
                <Sel value={advTrans}    onChange={setAdvTrans}    placeholder="Transmission" options={TRANSMISSIONS} />
                <Sel value={advColor}    onChange={setAdvColor}    placeholder="Color"        options={['White', 'Black', 'Silver', 'Red', 'Blue', 'Grey', 'Brown', 'Gold']} />
                <Sel value={advLocation} onChange={setAdvLocation} placeholder="Location"     options={LOCATIONS} />
                <Sel value={advYearFrom} onChange={setAdvYearFrom} placeholder="Year From"    options={Array.from({ length: 26 }, (_, i) => `${2025 - i}`)} />
                <Sel value={advYearTo}   onChange={setAdvYearTo}   placeholder="Year To"      options={Array.from({ length: 26 }, (_, i) => `${2025 - i}`)} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <Sel value={advMinPrice} onChange={setAdvMinPrice} placeholder="Min Price ($)"  options={['1000', '2000', '3000', '5000', '8000', '10000', '15000', '20000']} />
                <Sel value={advMaxPrice} onChange={setAdvMaxPrice} placeholder="Max Price ($)"  options={['3000', '5000', '8000', '10000', '15000', '20000', '30000', '50000']} />
                <Sel value={advMinMil}   onChange={setAdvMinMil}   placeholder="Min Mileage"    options={MILEAGES} />
                <Sel value={advMaxMil}   onChange={setAdvMaxMil}   placeholder="Max Mileage"    options={MILEAGES} />
                <Sel value={advMinEng}   onChange={setAdvMinEng}   placeholder="Min Engine"     options={ENGINE_SIZES} />
                <Sel value={advMaxEng}   onChange={setAdvMaxEng}   placeholder="Max Engine"     options={ENGINE_SIZES} />
              </div>
              <div className="flex gap-3 mt-3 justify-end">
                <button onClick={resetAdv}
                  className="px-5 py-2 text-white/70 border border-white/20 text-[12px] font-semibold rounded-sm hover:border-white/50 hover:text-white transition-all">
                  Reset
                </button>
                <button onClick={commitAdvanced}
                  className="px-7 py-2 text-white text-[12px] font-bold uppercase tracking-[0.1em] rounded-sm hover:opacity-90 transition-opacity"
                  style={{ background: RED }}>
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* SHOP BY MAKE CAROUSEL */}
          <MakeCarousel setActiveMake={(v) => setFilter('make', v)} makeCounts={makeCounts} />

          {/* SHOP BY BODY TYPE CAROUSEL */}
          <BodyTypeCarousel setActiveBody={(v) => setFilter('body', v)} />

          {/* TOTAL PRICE CALCULATOR */}
          <TotalPriceCalculator />

          {/* COLLECTION TABS */}
          <div className="flex flex-wrap gap-2 mb-5">
            {COLLECTION_TABS.map(t => (
              <button key={t.key} onClick={() => handleTabChange(t.key)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all"
                style={activeTab === t.key
                  ? { background: NAVY, color: '#fff', border: `1px solid ${NAVY}` }
                  : { background: '#fff', color: '#374151', border: '1px solid #E5E7EB' }}>
                {t.label}
                {t.key && tabCounts[t.key] !== undefined && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={activeTab === t.key
                      ? { background: 'rgba(255,255,255,0.2)', color: '#fff' }
                      : { background: '#F3F4F6', color: '#6B7280' }}>
                    {tabCounts[t.key].toLocaleString()}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* STOCK LIST HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Playfair Display',serif" }}>
                Stock List
                <span className="inline-block ml-2 h-0.5 w-8 align-middle" style={{ background: RED }} />
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm font-semibold">
                {loading ? 'Loading…' : `${totalDisplay} Cars`}
              </span>
              <select value={sortBy} onChange={e => handleSortChange(e.target.value)}
                className="border border-gray-200 bg-white text-[12px] text-gray-700 px-3 py-1.5 rounded-sm outline-none focus:border-[#C8102E] cursor-pointer">
                {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* TOP PAGINATION */}
          <Pagination page={page} total={totalCount} onPage={handlePageChange} />

          {/* CAR ROWS */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={36} className="animate-spin text-gray-300" />
            </div>
          ) : cars.length > 0 ? (
            cars.map(car => <CarRow key={car.id} car={car} pkrRate={pkrRate} />)
          ) : (
            <div className="border border-gray-200 bg-white p-12 text-center mb-4">
              <Search size={40} className="mx-auto text-gray-300 mb-4" />
              <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
                No cars found matching your criteria
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                Please try different filters or contact us on WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => {
                  window.history.replaceState({}, '', window.location.pathname);
                  setFilters(readFiltersFromUrl());
                  setSearchInput('');
                  setActiveTab('');
                  setPage(1);
                }} className="px-6 py-2.5 text-white text-sm font-bold rounded-sm hover:opacity-90 transition-opacity"
                  style={{ background: RED }}>
                  Clear All Filters
                </button>
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I'm looking for a vehicle but couldn't find it in the listings. Can you help me?")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="px-6 py-2.5 text-white text-sm font-bold rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  style={{ background: '#25D366' }}>
                  <WhatsAppIcon size={16} /> Contact on WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* BOTTOM PAGINATION */}
          <Pagination page={page} total={totalCount} onPage={handlePageChange} />

          {/* REVIEWS */}
          <ReviewsSection />
        </div>
      </div>

      <style>{`
        .scrollbar-hide { scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
