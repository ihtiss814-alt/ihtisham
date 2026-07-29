import React, { useState, useRef, useCallback } from 'react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { supabase } from '@/lib/supabase';
import {
  Upload, Eye, CheckCircle2, XCircle, Loader2, Image, LayoutDashboard,
  Star, Trash2, Download, ChevronDown, ChevronUp, Lock, LogOut, Search,
  PackageOpen, FileSpreadsheet, FolderArchive, RefreshCw, Camera,
} from 'lucide-react';

/* ─── CONSTANTS ──────────────────────────────────────────────── */
const ADMIN_PASSWORD = 'WazirAdmin2024';
const SESSION_KEY    = 'wazir_admin_session';
const SESSION_TTL    = 24 * 60 * 60 * 1000; // 24 h in ms
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'txb1wiw1';
// Cloudinary Admin API calls are proxied through the api-server to keep secrets server-side.
// The frontend only sends the admin password header; actual API key/secret never leave the server.

/* ─── EQUIPMENT MAP ──────────────────────────────────────────── */
const EQUIP_MAP: Record<string, string> = {
  PS:              'Power Steering',
  PW:              'Power Windows',
  AW:              'Alloy Wheels',
  ABS:             'Anti Brake System',
  AAC:             'Automatic Air Conditioning',
  NAVI:            'Navigation',
  HID:             'HID',
  AC:              'Air Conditioner',
  'Back Camera':   'Back Camera',
  'Push Start':    'Push Start',
  'Parking Sensors':'Parking Sensors',
  RADIO:           'Radio',
  Keyless:         'Keyless Entry',
  TV:              'TV',
  airbags:         'Air Bag',
  'FOG Light':     'FOG Light',
  'Leather Seat':  'Leather Seats',
  'Sun Roof':      'Sun Roof',
};

function parseEquipment(raw: string): Record<string, boolean> {
  if (!raw) return {};
  const result: Record<string, boolean> = {};
  // Try multi-word tokens first (longest match), then single tokens
  const sorted = Object.keys(EQUIP_MAP).sort((a, b) => b.length - a.length);
  let remaining = String(raw);
  for (const key of sorted) {
    const re = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    if (re.test(remaining)) {
      result[EQUIP_MAP[key]] = true;
      remaining = remaining.replace(re, '');
    }
  }
  return result;
}

/* ─── COLUMN MAP ─────────────────────────────────────────────── */
type ColMap = {
  lot_number: number;       model_code: number;      chassis_number: number;
  make: number;             model: number;            variant: number;
  year: number;             manufacture_month: number;
  engine_cc: number;        seats: number;
  auction_grade: number;    exterior_grade: number;   interior_grade: number;
  transmission: number;     body_type: number | null; color: number;
  doors: number;            mileage_km: number;
  fuel_type: number;        features: number;         wholesale_price_jpy: number;
};

/**
 * Reads the raw header row and returns the correct column indices.
 * Supports both sheet formats:
 *   • Legacy (no Body Type): 23 columns — Color at 16, Doors 17, …, Price 22
 *   • New    (with Body Type): 24 columns — Body Type at 16, Color 17, …, Price 23
 */
function buildColMap(headerRow: unknown[]): ColMap {
  const hasBodyType = headerRow.some(
    cell => String(cell ?? '').trim().toLowerCase() === 'body type',
  );

  if (hasBodyType) {
    return {
      lot_number: 2,    model_code: 3,      chassis_number: 4,
      make: 5,          model: 6,            variant: 7,
      year: 8,          manufacture_month: 9,
      engine_cc: 10,    seats: 11,
      auction_grade: 12, exterior_grade: 13, interior_grade: 14,
      transmission: 15, body_type: 16,       color: 17,
      doors: 18,        mileage_km: 19,
      fuel_type: 21,    features: 22,        wholesale_price_jpy: 23,
    };
  }
  // Legacy format — no Body Type column
  return {
    lot_number: 2,    model_code: 3,      chassis_number: 4,
    make: 5,          model: 6,            variant: 7,
    year: 8,          manufacture_month: 9,
    engine_cc: 10,    seats: 11,
    auction_grade: 12, exterior_grade: 13, interior_grade: 14,
    transmission: 15, body_type: null,     color: 16,
    doors: 17,        mileage_km: 18,
    fuel_type: 20,    features: 21,        wholesale_price_jpy: 22,
  };
}

/* ─── COLUMN PARSER ──────────────────────────────────────────── */
function parseRow(row: unknown[], colMap: ColMap): Record<string, unknown> {
  const c = (i: number | null) => {
    if (i === null) return '';
    const v = row[i];
    return v === undefined || v === null ? '' : String(v).trim();
  };
  const n = (i: number | null) => {
    if (i === null) return null;
    const v = row[i];
    const num = parseFloat(String(v));
    return isNaN(num) ? null : num;
  };
  // JPY prices have comma-thousands separators (e.g. "1,500,000") — strip before parsing
  const jpy = (i: number | null) => {
    if (i === null) return null;
    const v = row[i];
    const num = parseFloat(String(v).replace(/,/g, ''));
    return isNaN(num) ? null : num;
  };

  return {
    lot_number:          c(colMap.lot_number),
    model_code:          c(colMap.model_code),
    chassis_number:      c(colMap.chassis_number),
    make:                c(colMap.make),
    model:               c(colMap.model),
    variant:             c(colMap.variant),
    year:                n(colMap.year),
    manufacture_month:   c(colMap.manufacture_month),
    engine_cc:           n(colMap.engine_cc),
    seats:               n(colMap.seats),
    auction_grade:       c(colMap.auction_grade),
    exterior_grade:      c(colMap.exterior_grade),
    interior_grade:      c(colMap.interior_grade),
    transmission:        c(colMap.transmission),
    body_type:           c(colMap.body_type),
    color:               c(colMap.color),
    doors:               n(colMap.doors),
    mileage_km:          n(colMap.mileage_km),
    fuel_type:           c(colMap.fuel_type),
    features:            parseEquipment(c(colMap.features)),
    wholesale_price_jpy: jpy(colMap.wholesale_price_jpy),
  };
}

/* ─── CLOUDINARY HELPERS (server-proxied) ────────────────────── */
// All Cloudinary Admin API calls go through /api/admin/cloudinary/* on the
// api-server, which holds the API key/secret as server-only env vars.
// The browser only sends the admin password; no Cloudinary credentials are
// ever bundled in the frontend.

async function adminFetch(path: string) {
  const res = await fetch(`/api${path}`, {
    headers: { 'X-Admin-Password': ADMIN_PASSWORD },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `Server ${res.status}`);
  }
  return res.json();
}

async function listSubfolders(dateFolder: string): Promise<string[]> {
  const data = await adminFetch(
    `/admin/cloudinary/folders/${encodeURIComponent(dateFolder)}`
  );
  return (data.folders || []).map((f: { name: string }) => f.name);
}

async function listFolderImages(dateFolder: string, subfolder: string): Promise<{ url: string; public_id: string }[]> {
  const data = await adminFetch(
    `/admin/cloudinary/resources/${encodeURIComponent(dateFolder)}/${encodeURIComponent(subfolder)}`
  );
  return (data.resources || []).map((r: { secure_url: string; public_id: string }) => ({
    url: r.secure_url,
    public_id: r.public_id,
  }));
}

/* ─── IMAGE ORDER HELPERS ────────────────────────────────────── */
/**
 * Extracts the display order from a Cloudinary public_id.
 *
 * Filename format: CHASSIS_NNx_suffix  (e.g. GFC27-193807_01a_zcacdv)
 *   - _map anywhere → 99 (always last)
 *   - _01a / _02a / _01 / _02 → sequence number (1, 2, …)
 *   - anything else → 50
 */
function getDisplayOrder(publicId: string): number {
  const filename = publicId.split('/').pop() ?? '';
  // Map images always displayed last
  if (/_map(_|$)/i.test(filename)) return 99;
  // Sequence number: _NNx_ or _NNx at end-of-string (before Cloudinary random suffix)
  const match = filename.match(/_(\d+)[a-z]?(_|$)/i);
  if (match) return parseInt(match[1], 10);
  return 50;
}

/**
 * Returns true if the image is the primary (hero) photo.
 * Primary images have sequence _01 or _01a.
 */
function isPrimaryImage(publicId: string): boolean {
  const filename = publicId.split('/').pop() ?? '';
  // _01a_ or _01_ or _01 at end (sequence number 1)
  return /_0*1[a-z]?(_|$)/i.test(filename);
}

/**
 * Extracts chassis number from a Cloudinary public_id.
 *
 * Filename format: CHASSIS_NNx_suffix
 * Examples:
 *   "wazir-trading/MXPA15-0001299_01a_nag8yy" → "MXPA15-0001299"
 *   "wazir-trading/GFC27-193807_01a_zcacdv"   → "GFC27-193807"
 *
 * The chassis number is everything before the first underscore — the
 * sequence marker (_01a, _02a, _map, …) always starts at the first _.
 */
function extractChassisFromPublicId(publicId: string): string {
  const filename = publicId.split('/').pop() ?? publicId;
  return filename.split('_')[0] ?? filename;
}

/* ─── CLOUDINARY FLAT FOLDER FETCH ──────────────────────────── */
// Proxied through the api-server (GET /admin/cloudinary/fetch-flat-folder)
// to keep Cloudinary credentials server-side and avoid CORS restrictions.
// Paginates using next_cursor until all images are fetched.
async function fetchFlatFolder(
  onPage?: (page: number, count: number) => void,
): Promise<{ public_id: string; secure_url: string }[]> {
  const allResources: { public_id: string; secure_url: string }[] = [];
  let nextCursor: string | undefined;
  let page = 0;

  do {
    page++;
    const url = new URL('/api/admin/cloudinary/fetch-flat-folder', window.location.origin);
    if (nextCursor) url.searchParams.set('next_cursor', nextCursor);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'X-Admin-Password': ADMIN_PASSWORD },
    });
    const data = await res.json().catch(() => ({})) as {
      resources?: { public_id: string; secure_url: string }[];
      next_cursor?: string;
      error?: string;
    };
    if (!res.ok) throw new Error(data.error ?? `Server ${res.status}`);
    const pageResources = data.resources ?? [];
    allResources.push(...pageResources);
    onPage?.(page, pageResources.length);
    nextCursor = data.next_cursor;
  } while (nextCursor);

  return allResources;
}

/* ─── CLOUDINARY SEARCH BY CHASSIS ──────────────────────────── */
async function searchCloudinaryByChassis(
  chassisNumber: string,
): Promise<{ url: string; public_id: string }[]> {
  const res = await fetch('/api/admin/cloudinary/search-by-chassis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Password': ADMIN_PASSWORD,
    },
    body: JSON.stringify({ chassis_number: chassisNumber }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error ?? `Server ${res.status}`);
  return ((body as { resources?: { secure_url: string; public_id: string }[] }).resources || [])
    .map(r => ({ url: r.secure_url, public_id: r.public_id }));
}

/* ─── SAVE IMAGES TO SUPABASE (shared logic) ─────────────────── */
async function saveCloudinaryImagesToDb(
  carId: string,
  images: { url: string; public_id: string }[],
): Promise<{ saved: number; error?: string }> {
  if (!images.length) return { saved: 0 };

  const sorted = [...images].sort((a, b) => {
    const aP = isPrimaryImage(a.public_id);
    const bP = isPrimaryImage(b.public_id);
    const aM = /_map$/i.test(a.public_id.split('/').pop() ?? '');
    const bM = /_map$/i.test(b.public_id.split('/').pop() ?? '');
    if (aP) return -1;
    if (bP) return 1;
    if (aM) return 1;
    if (bM) return -1;
    return a.public_id.localeCompare(b.public_id);
  });

  const rows = sorted.map(img => ({
    car_id:        carId,
    image_url:     img.url,
    is_primary:    isPrimaryImage(img.public_id),
    display_order: getDisplayOrder(img.public_id),
  }));

  const { error } = await supabase.from('car_images').insert(rows);
  if (error) return { saved: 0, error: error.message };
  return { saved: rows.length };
}

/* ─── SESSION ────────────────────────────────────────────────── */
function isSessionValid(): boolean {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const { expires } = JSON.parse(raw);
    return Date.now() < expires;
  } catch { return false; }
}

function setSession() {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ expires: Date.now() + SESSION_TTL }));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

/* ═══════════════════════════════════════════════════════════════
   PASSWORD GATE
═══════════════════════════════════════════════════════════════ */
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setSession();
      onAuth();
    } else {
      setError('Incorrect password. Try again.');
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B3E] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-[#C8102E] rounded-full flex items-center justify-center mb-3">
            <Lock className="text-white" size={26} />
          </div>
          <h1 className="text-xl font-bold text-[#0D1B3E]">Admin Access</h1>
          <p className="text-sm text-gray-500 mt-1">Wazir Trading — Restricted Area</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <XCircle size={13} /> {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#C8102E] hover:bg-[#a00d24] text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURE 1 — CSV / EXCEL UPLOAD
═══════════════════════════════════════════════════════════════ */
type ParsedCar = ReturnType<typeof parseRow>;

function CsvUploadTab() {
  const [rows, setRows]     = useState<ParsedCar[]>([]);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState<'idle' | 'inserting' | 'done' | 'error'>('idle');
  const [insertMsg, setInsertMsg] = useState('');
  const [progress, setProgress] = useState({ current: 0, total: 0, images: 0 });
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw: unknown[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      // Skip header rows. The sheet has multi-line headers so we filter out any row where:
      // (a) chassis_number column (4) is empty, OR
      // (b) year column (8) is not a valid 4-digit year — which catches second-header rows
      const headerRow = raw[0] ?? [];
      const colMap = buildColMap(headerRow);
      const parsed = raw.slice(1).filter(r => {
        const chassis = r[colMap.chassis_number] && String(r[colMap.chassis_number]).trim();
        const year = parseFloat(String(r[colMap.year]));
        return chassis && !isNaN(year) && year > 1900;
      });
      setRows(parsed.map(r => parseRow(r, colMap)));
      setStatus('idle');
    };
    reader.readAsArrayBuffer(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const insertAll = async () => {
    if (!rows.length) return;
    setStatus('inserting');
    setInsertMsg('');
    setProgress({ current: 0, total: rows.length, images: 0 });

    // 1. Fetch live JPY/USD rate for FOB price calculation
    let jpyRate = 162; // conservative fallback
    try {
      const rateRes = await fetch('https://open.er-api.com/v6/latest/USD', { credentials: 'omit' });
      if (rateRes.ok) {
        const rateJson = await rateRes.json();
        if (rateJson.result === 'success' && rateJson.rates?.JPY) {
          jpyRate = rateJson.rates.JPY;
        }
      }
    } catch { /* use fallback */ }

    // 2. Find the highest existing ref_number
    const { data: latest } = await supabase
      .from('cars')
      .select('ref_number')
      .order('ref_number', { ascending: false })
      .limit(1);

    // 3. Extract the numeric part (e.g. "WTL-000042" → 42), default to 0
    let nextNum = 1;
    if (latest && latest.length > 0 && latest[0].ref_number) {
      const match = String(latest[0].ref_number).match(/(\d+)$/);
      if (match) nextNum = parseInt(match[1], 10) + 1;
    }

    // 4. Insert each car one-by-one and search Cloudinary for existing images
    let totalImages = 0;
    let firstRef = '';
    let lastRef  = '';
    let anyError = '';

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const refNo = `WTL-${String(nextNum + i).padStart(6, '0')}`;
      if (i === 0) firstRef = refNo;
      lastRef = refNo;

      const record = {
        ref_number:          refNo,
        lot_number:          r.lot_number      || null,
        model_code:          r.model_code      || null,
        chassis_number:      r.chassis_number  || null,
        make:                r.make            || null,
        model:               r.model           || null,
        variant:             r.variant         || null,
        year:                r.year            ?? null,
        manufacture_month:   r.manufacture_month || null,
        engine_cc:           r.engine_cc       ?? null,
        seats:               r.seats           ?? null,
        auction_grade:       r.auction_grade   || null,
        exterior_grade:      r.exterior_grade  || null,
        interior_grade:      r.interior_grade  || null,
        transmission:        r.transmission    || null,
        body_type:           r.body_type       || null,
        color:               r.color           || null,
        doors:               r.doors           ?? null,
        mileage_km:          r.mileage_km      ?? null,
        fuel_type:           r.fuel_type       || null,
        features:            r.features        || {},
        wholesale_price_jpy: r.wholesale_price_jpy ?? null,
        fob_price_usd:       r.wholesale_price_jpy != null
          ? Math.round((r.wholesale_price_jpy as number) / jpyRate)
          : null,
        status: 'available',
      };

      const { data: carData, error: carErr } = await supabase
        .from('cars').insert([record]).select('id').single();

      if (carErr) { anyError = carErr.message; break; }

      // Search Cloudinary for existing images for this chassis number
      const chassis = String(r.chassis_number || '');
      if (chassis) {
        try {
          const images = await searchCloudinaryByChassis(chassis);
          if (images.length > 0) {
            const { saved } = await saveCloudinaryImagesToDb(carData.id, images);
            totalImages += saved;
          }
        } catch { /* images can be synced later */ }
      }

      setProgress({ current: i + 1, total: rows.length, images: totalImages });
    }

    if (anyError) {
      setStatus('error');
      setInsertMsg(anyError);
    } else {
      setStatus('done');
      setInsertMsg(
        `${rows.length} cars inserted (${firstRef} → ${lastRef}).` +
        (totalImages > 0 ? ` ${totalImages} images synced from Cloudinary.` : ' No existing Cloudinary images found.')
      );
    }
  };

  const PREVIEW_COLS = [
    { label: 'Chassis #',    key: 'chassis_number' },
    { label: 'Make',         key: 'make' },
    { label: 'Model',        key: 'model' },
    { label: 'Variant',      key: 'variant' },
    { label: 'Year',         key: 'year' },
    { label: 'Body Type',    key: 'body_type' },
    { label: 'CC',           key: 'engine_cc' },
    { label: 'Trans',        key: 'transmission' },
    { label: 'Color',        key: 'color' },
    { label: 'KM',           key: 'mileage_km' },
    { label: 'Seats',        key: 'seats' },
    { label: 'Grade',        key: 'auction_grade' },
    { label: 'Ext',          key: 'exterior_grade' },
    { label: 'Int',          key: 'interior_grade' },
    { label: 'Fuel',         key: 'fuel_type' },
    { label: 'Price JPY',    key: 'wholesale_price_jpy' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-gray-300 hover:border-[#C8102E] rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors group"
      >
        <Upload className="text-gray-400 group-hover:text-[#C8102E] transition-colors" size={36} />
        <p className="font-semibold text-gray-600 group-hover:text-[#C8102E] transition-colors">
          {fileName ? fileName : 'Drop CSV or Excel file here, or click to select'}
        </p>
        <p className="text-xs text-gray-400">.csv or .xlsx accepted</p>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
        />
      </div>

      {/* Preview */}
      {rows.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-[#0D1B3E] flex items-center gap-2">
              <Eye size={16} />
              Preview — {rows.length} rows parsed
            </p>
            <button
              onClick={insertAll}
              disabled={status === 'inserting' || status === 'done'}
              className="flex items-center gap-2 bg-[#C8102E] hover:bg-[#a00d24] disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              {status === 'inserting' ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              {status === 'inserting'
                ? `Inserting ${progress.current}/${progress.total}…`
                : status === 'done' ? 'Done ✓' : 'Confirm & Insert All'}
            </button>
          </div>

          {insertMsg && (
            <div className={`mb-3 p-3 rounded-lg text-sm font-medium ${status === 'done' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {insertMsg}
            </div>
          )}

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full text-xs">
              <thead className="bg-[#0D1B3E] text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">#</th>
                  {PREVIEW_COLS.map(c => (
                    <th key={c.key} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{c.label}</th>
                  ))}
                  <th className="px-3 py-2 text-left font-semibold">Features</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                    {PREVIEW_COLS.map(c => (
                      <td key={c.key} className="px-3 py-2 whitespace-nowrap text-gray-700">
                        {row[c.key] == null ? <span className="text-gray-300">—</span> : String(row[c.key])}
                      </td>
                    ))}
                    <td className="px-3 py-2">
                      <button
                        onClick={() => setExpanded(e => ({ ...e, [i]: !e[i] }))}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {Object.keys(row.features as object).length} items
                        {expanded[i] ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                      </button>
                      {expanded[i] && (
                        <div className="mt-1 text-gray-500 leading-relaxed">
                          {Object.keys(row.features as object).join(', ') || '—'}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURE 2 — CLOUDINARY IMAGE MATCHING
═══════════════════════════════════════════════════════════════ */
type ImageJob = {
  chassis_number: string;
  car_id?: string;
  images: { url: string; public_id: string }[];
  status: 'pending' | 'inserting' | 'done' | 'no_car' | 'error';
  error?: string;
};

function CloudinaryTab() {
  const [dateFolder, setDateFolder] = useState('');
  const [jobs, setJobs]             = useState<ImageJob[]>([]);
  const [phase, setPhase]           = useState<'idle' | 'listing' | 'matching' | 'done' | 'error'>('idle');
  const [progress, setProgress]     = useState(0);
  const [errorMsg, setErrorMsg]     = useState('');

  const updateJob = (chassis: string, patch: Partial<ImageJob>) =>
    setJobs(js => js.map(j => j.chassis_number === chassis ? { ...j, ...patch } : j));

  const run = async () => {
    if (!dateFolder.trim()) return;
    setPhase('listing');
    setErrorMsg('');
    setJobs([]);
    setProgress(0);

    try {
      const subfolders = await listSubfolders(dateFolder.trim());
      if (!subfolders.length) {
        setErrorMsg(`No subfolders found in wazir-trading/${dateFolder.trim()}/`);
        setPhase('error');
        return;
      }

      // Fetch images for each subfolder
      const jobList: ImageJob[] = [];
      for (let i = 0; i < subfolders.length; i++) {
        const sf = subfolders[i];
        setProgress(Math.round((i / subfolders.length) * 40));
        const images = await listFolderImages(dateFolder.trim(), sf);
        jobList.push({ chassis_number: sf, images, status: 'pending' });
      }
      setJobs(jobList);
      setPhase('matching');

      // For each job, find the car in Supabase and insert images
      for (let i = 0; i < jobList.length; i++) {
        const job = jobList[i];
        setProgress(40 + Math.round((i / jobList.length) * 60));

        // Look up car by chassis_number
        const { data: cars } = await supabase
          .from('cars')
          .select('id')
          .eq('chassis_number', job.chassis_number)
          .limit(1);

        if (!cars || cars.length === 0) {
          updateJob(job.chassis_number, { status: 'no_car' });
          continue;
        }

        const carId = cars[0].id;
        updateJob(job.chassis_number, { car_id: carId, status: 'inserting' });

        // Sort images: _01a first (primary), _map last (99)
        const sorted = [...job.images].sort((a, b) => {
          const aMap  = a.public_id.endsWith('_map');
          const bMap  = b.public_id.endsWith('_map');
          const a01a  = a.public_id.endsWith('_01a');
          const b01a  = b.public_id.endsWith('_01a');
          if (a01a) return -1;
          if (b01a) return  1;
          if (aMap) return  1;
          if (bMap) return -1;
          return a.public_id.localeCompare(b.public_id);
        });

        const imageRows = sorted.map((img, idx) => {
          const isMap     = img.public_id.split('/').pop()?.endsWith('_map') ?? false;
          const isPrimary = img.public_id.split('/').pop()?.endsWith('_01a') ?? false;
          return {
            car_id:        carId,
            image_url:     img.url,
            is_primary:    isPrimary,
            display_order: isMap ? 99 : idx + 1,
          };
        });

        const { error } = await supabase.from('car_images').insert(imageRows);
        updateJob(job.chassis_number, error
          ? { status: 'error', error: error.message }
          : { status: 'done' }
        );
      }

      setProgress(100);
      setPhase('done');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
      setPhase('error');
    }
  };

  const done  = jobs.filter(j => j.status === 'done').length;
  const noCar = jobs.filter(j => j.status === 'no_car').length;
  const errs  = jobs.filter(j => j.status === 'error').length;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Note:</strong> Image matching is proxied through the API server. Set{' '}
        <code>CLOUDINARY_API_KEY</code> and <code>CLOUDINARY_API_SECRET</code> as{' '}
        <strong>server-side</strong> secrets (not <code>VITE_</code> variables) in the Replit environment.
      </div>

      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Date Folder Name
          </label>
          <input
            type="text"
            value={dateFolder}
            onChange={e => setDateFolder(e.target.value)}
            placeholder="e.g. 23-july-2026"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
        <button
          onClick={run}
          disabled={!dateFolder.trim() || phase === 'listing' || phase === 'matching'}
          className="flex items-center gap-2 bg-[#C8102E] hover:bg-[#a00d24] disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap"
        >
          {(phase === 'listing' || phase === 'matching') ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Image size={14} />
          )}
          {phase === 'listing' ? 'Listing folders…' : phase === 'matching' ? 'Matching…' : 'Run Matching'}
        </button>
      </div>

      {/* Progress bar */}
      {(phase === 'listing' || phase === 'matching' || phase === 'done') && (
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{phase === 'done' ? 'Complete' : phase === 'listing' ? 'Listing subfolders…' : 'Matching images…'}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C8102E] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {phase === 'done' && (
            <div className="mt-3 flex gap-4 text-sm font-medium">
              <span className="text-green-700">✅ {done} matched</span>
              <span className="text-amber-700">⚠️ {noCar} no car found</span>
              {errs > 0 && <span className="text-red-700">❌ {errs} errors</span>}
            </div>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Job list */}
      {jobs.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-xs">
            <thead className="bg-[#0D1B3E] text-white">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Chassis #</th>
                <th className="px-4 py-2 text-left font-semibold">Images</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j, i) => (
                <tr key={j.chassis_number} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-2 font-mono text-gray-700">{j.chassis_number}</td>
                  <td className="px-4 py-2 text-gray-500">{j.images.length}</td>
                  <td className="px-4 py-2">
                    {j.status === 'pending'   && <span className="text-gray-400">Pending</span>}
                    {j.status === 'inserting' && <span className="text-blue-600 flex items-center gap-1"><Loader2 size={11} className="animate-spin" /> Inserting</span>}
                    {j.status === 'done'      && <span className="text-green-700 font-semibold">✅ Done</span>}
                    {j.status === 'no_car'    && <span className="text-amber-700">⚠️ Car not found</span>}
                    {j.status === 'error'     && <span className="text-red-700">❌ {j.error}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURE 3 — REVIEW DASHBOARD
═══════════════════════════════════════════════════════════════ */
type CarRow = {
  id: string;
  chassis_number: string;
  make: string;
  model: string;
  year: number;
  is_featured: boolean;
  image_count: number;
};

/** Inline per-car sync button used in each table row */
function SyncImagesButton({
  car,
  onSynced,
}: {
  car: CarRow;
  onSynced: (carId: string, newCount: number) => void;
}) {
  const [state, setState] = useState<'idle' | 'syncing' | 'done' | 'none' | 'error'>('idle');
  const [synced, setSynced] = useState(0);

  const run = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setState('syncing');
    try {
      const images = await searchCloudinaryByChassis(car.chassis_number);
      if (!images.length) { setState('none'); return; }
      const { saved, error } = await saveCloudinaryImagesToDb(car.id, images);
      if (error) { setState('error'); return; }
      setSynced(saved);
      setState('done');
      onSynced(car.id, car.image_count + saved);
    } catch {
      setState('error');
    }
  };

  if (state === 'syncing') return (
    <span className="inline-flex items-center gap-1 text-blue-500 text-xs">
      <Loader2 size={11} className="animate-spin" /> Syncing…
    </span>
  );
  if (state === 'done') return (
    <span className="inline-flex items-center gap-1 text-green-600 text-xs font-semibold">
      ✅ +{synced} synced
    </span>
  );
  if (state === 'none') return (
    <span className="text-gray-400 text-xs">No images found</span>
  );
  if (state === 'error') return (
    <span className="text-red-500 text-xs">Error — retry?</span>
  );

  return (
    <button
      onClick={run}
      title={`Sync images for ${car.chassis_number}`}
      className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded hover:bg-blue-100 transition-colors whitespace-nowrap"
    >
      <Camera size={11} /> Sync
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLAT FOLDER SYNC — fetches all images from the root wazir-trading/
   folder, extracts chassis numbers from public_ids, and links them
   to cars in Supabase.
═══════════════════════════════════════════════════════════════ */
type FlatSyncLog = { text: string; kind: 'info' | 'ok' | 'warn' | 'error' };

type FlatSyncSummary = {
  totalImages: number;
  carsUpdated: number;
  carsNotFound: number;
  notFoundChassis: string[];
  alreadyExisted: number;
};

function FlatFolderSyncSection({ onDone }: { onDone?: () => void }) {
  const [phase, setPhase]       = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [logs, setLogs]         = useState<FlatSyncLog[]>([]);
  const [summary, setSummary]   = useState<FlatSyncSummary | null>(null);
  const logRef                  = React.useRef<HTMLDivElement>(null);

  const addLog = (text: string, kind: FlatSyncLog['kind'] = 'info') => {
    setLogs(prev => [...prev, { text, kind }]);
    // Auto-scroll
    setTimeout(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 20);
  };

  const run = async () => {
    setPhase('running');
    setLogs([]);
    setSummary(null);

    try {
      addLog('Fetching images from Cloudinary…', 'info');
      const resources = await fetchFlatFolder((page, count) => {
        addLog(`Fetching page ${page} from Cloudinary... (${count} images)`, 'info');
      });
      addLog(`Total fetched: ${resources.length} images, now processing…`, 'info');

      if (!resources.length) {
        addLog('No images found in the wazir-trading folder.', 'warn');
        setPhase('done');
        setSummary({ totalImages: 0, carsUpdated: 0, carsNotFound: 0, notFoundChassis: [], alreadyExisted: 0 });
        return;
      }

      // Group images by chassis number
      const byChassisMap = new Map<string, { public_id: string; secure_url: string }[]>();
      for (const r of resources) {
        const chassis = extractChassisFromPublicId(r.public_id);
        if (!chassis) continue;
        if (!byChassisMap.has(chassis)) byChassisMap.set(chassis, []);
        byChassisMap.get(chassis)!.push(r);
      }

      addLog(`Grouped into ${byChassisMap.size} unique chassis numbers`, 'info');

      let carsUpdated = 0;
      let carsNotFound = 0;
      const notFoundChassis: string[] = [];
      let alreadyExisted = 0;

      for (const [chassis, images] of byChassisMap) {
        // Look up car in Supabase
        const { data: cars } = await supabase
          .from('cars')
          .select('id')
          .eq('chassis_number', chassis)
          .limit(1);

        if (!cars || cars.length === 0) {
          addLog(`${chassis} — car not found in database`, 'warn');
          carsNotFound++;
          notFoundChassis.push(chassis);
          continue;
        }

        const carId = cars[0].id as string;

        // Fetch existing image URLs for this car to avoid duplicates
        const { data: existing } = await supabase
          .from('car_images')
          .select('image_url')
          .eq('car_id', carId);
        const existingUrls = new Set((existing ?? []).map((e: { image_url: string }) => e.image_url));

        const newImages = images.filter(img => !existingUrls.has(img.secure_url));
        const skipped   = images.length - newImages.length;
        alreadyExisted += skipped;

        if (!newImages.length) {
          addLog(`${chassis} — ${skipped} image(s) already exist, skipped`, 'info');
          continue;
        }

        // Build rows sorted by sequence number
        const rows = newImages
          .sort((a, b) => getDisplayOrder(a.public_id) - getDisplayOrder(b.public_id))
          .map(img => ({
            car_id:        carId,
            image_url:     img.secure_url,
            is_primary:    isPrimaryImage(img.public_id),
            display_order: getDisplayOrder(img.public_id),
          }));

        const { error } = await supabase.from('car_images').insert(rows);
        if (error) {
          addLog(`${chassis} — error inserting: ${error.message}`, 'error');
          continue;
        }

        addLog(
          `${chassis} — ${newImages.length} image(s) linked${skipped ? `, ${skipped} skipped` : ''}`,
          'ok',
        );
        carsUpdated++;
      }

      setSummary({
        totalImages:    resources.length,
        carsUpdated,
        carsNotFound,
        notFoundChassis,
        alreadyExisted,
      });
      setPhase('done');
      onDone?.();
    } catch (err) {
      addLog(err instanceof Error ? err.message : 'Unknown error', 'error');
      setPhase('error');
    }
  };

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-indigo-900 text-sm flex items-center gap-2">
            <Image size={15} className="text-indigo-600" />
            Sync Images from Cloudinary (Flat Folder)
          </p>
          <p className="text-xs text-indigo-700 mt-0.5">
            Fetches all images from <code className="bg-indigo-100 px-1 rounded">wazir-trading/</code>,
            extracts chassis numbers from filenames, and links them to cars.
          </p>
        </div>
        <button
          onClick={run}
          disabled={phase === 'running'}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
        >
          {phase === 'running'
            ? <><Loader2 size={14} className="animate-spin" /> Syncing…</>
            : <><RefreshCw size={14} /> Sync Images from Cloudinary</>
          }
        </button>
      </div>

      {/* Live log */}
      {logs.length > 0 && (
        <div
          ref={logRef}
          className="bg-gray-900 text-xs font-mono rounded-lg p-3 max-h-48 overflow-y-auto space-y-0.5"
        >
          {logs.map((l, i) => (
            <div key={i} className={
              l.kind === 'ok'    ? 'text-green-400' :
              l.kind === 'warn'  ? 'text-yellow-400' :
              l.kind === 'error' ? 'text-red-400' :
              'text-gray-300'
            }>
              {l.kind === 'ok' && '✅ '}{l.kind === 'warn' && '⚠️ '}{l.kind === 'error' && '❌ '}
              {l.text}
            </div>
          ))}
          {phase === 'running' && (
            <div className="text-gray-500 animate-pulse">…</div>
          )}
        </div>
      )}

      {/* Final summary */}
      {summary && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            <div className="bg-white rounded-lg border border-indigo-100 p-2.5 text-center">
              <div className="font-bold text-indigo-900">{summary.totalImages}</div>
              <div className="text-xs text-indigo-600 mt-0.5">Total Images Found</div>
            </div>
            <div className="bg-white rounded-lg border border-green-100 p-2.5 text-center">
              <div className="font-bold text-green-700">{summary.carsUpdated}</div>
              <div className="text-xs text-green-600 mt-0.5">Cars Matched & Updated</div>
            </div>
            <div className="bg-white rounded-lg border border-amber-100 p-2.5 text-center">
              <div className="font-bold text-amber-700">{summary.carsNotFound}</div>
              <div className="text-xs text-amber-600 mt-0.5">Cars Not Found in DB</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-100 p-2.5 text-center">
              <div className="font-bold text-gray-600">{summary.alreadyExisted}</div>
              <div className="text-xs text-gray-500 mt-0.5">Images Skipped (existed)</div>
            </div>
          </div>
          {summary.notFoundChassis.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-800 mb-1.5">
                ⚠️ {summary.notFoundChassis.length} chassis number{summary.notFoundChassis.length !== 1 ? 's' : ''} not found in database:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {summary.notFoundChassis.map(c => (
                  <span key={c} className="font-mono text-xs bg-white border border-amber-200 text-amber-800 px-2 py-0.5 rounded">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SYNC IMAGES TAB — dedicated tab for Cloudinary flat-folder sync
═══════════════════════════════════════════════════════════════ */
function SyncImagesTab() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── Section 1: CSV Upload ── */}
      <div>
        <h2 className="text-lg font-bold text-[#0D1B3E]">Upload Cars from CSV</h2>
        <p className="text-sm text-gray-500 mt-1">
          Import car listings from a CSV or Excel file. Each row becomes a car record in the database.
        </p>
      </div>
      <CsvUploadTab />

      <hr className="border-gray-200" />

      {/* ── Section 2: Cloudinary Image Sync ── */}
      <div>
        <h2 className="text-lg font-bold text-[#0D1B3E]">Sync Images from Cloudinary</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fetches all images from the <code className="bg-gray-100 px-1 rounded text-xs">wazir-trading/</code> folder,
          extracts chassis numbers from filenames, and links them to matching cars in the database.
        </p>
      </div>
      <FlatFolderSyncSection />
    </div>
  );
}

function ReviewDashboardTab() {
  const [cars, setCars]       = useState<CarRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch]   = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [actionStatus, setActionStatus] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setSelected(new Set());
    setActionStatus('');

    // Fetch cars with image count via join
    const { data, error } = await supabase
      .from('cars')
      .select('id, chassis_number, make, model, year, is_featured, car_images(id)')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) { setLoading(false); return; }

    const rows: CarRow[] = (data || []).map((c: Record<string, unknown>) => ({
      id:             c.id as string,
      chassis_number: c.chassis_number as string,
      make:           c.make as string,
      model:          c.model as string,
      year:           c.year as number,
      is_featured:    c.is_featured as boolean,
      image_count:    Array.isArray(c.car_images) ? c.car_images.length : 0,
    }));

    setCars(rows);
    setLoading(false);
  }, []);

  React.useEffect(() => { load(); }, [load]);

  /** Update a single car's image count after a per-car sync */
  const onCarSynced = useCallback((carId: string, newCount: number) => {
    setCars(prev => prev.map(c => c.id === carId ? { ...c, image_count: newCount } : c));
  }, []);

  const filtered = cars.filter(c =>
    !search ||
    c.chassis_number?.toLowerCase().includes(search.toLowerCase()) ||
    c.make?.toLowerCase().includes(search.toLowerCase()) ||
    c.model?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) =>
    setSelected(s => { const ns = new Set(s); ns.has(id) ? ns.delete(id) : ns.add(id); return ns; });

  const selectAll = () =>
    setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map(c => c.id)));

  const bulkFeatured = async () => {
    if (!selected.size) return;
    setActionStatus('Updating…');
    const ids = [...selected];
    const allFeatured = ids.every(id => cars.find(c => c.id === id)?.is_featured);
    await supabase.from('cars').update({ is_featured: !allFeatured }).in('id', ids);
    setActionStatus('Done ✓');
    load();
  };

  const bulkDelete = async () => {
    if (!selected.size) return;
    if (!confirm(`Delete ${selected.size} cars? This cannot be undone.`)) return;
    setActionStatus('Deleting…');
    await supabase.from('cars').delete().in('id', [...selected]);
    setActionStatus('Deleted ✓');
    load();
  };

  const exportCsv = () => {
    const rows = filtered.map(c => ({
      chassis_number: c.chassis_number,
      make: c.make,
      model: c.model,
      year: c.year,
      is_featured: c.is_featured,
      image_count: c.image_count,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cars');
    XLSX.writeFile(wb, 'wazir-cars-export.xlsx');
  };

  const hasImages     = cars.filter(c => c.image_count > 0).length;
  const missingImages = cars.filter(c => c.image_count === 0).length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0D1B3E] text-white rounded-xl p-4">
          <div className="text-2xl font-bold">{cars.length}</div>
          <div className="text-xs text-gray-300 mt-1">Total Cars</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-700">{hasImages}</div>
          <div className="text-xs text-green-600 mt-1">✅ Has Images</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-700">{missingImages}</div>
          <div className="text-xs text-red-600 mt-1">❌ Missing Images</div>
        </div>
      </div>

      {/* Sync Images from Cloudinary — flat folder bulk action */}
      <FlatFolderSyncSection onDone={load} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search chassis, make, model…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
        <button onClick={load} className="border border-gray-200 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Refresh
        </button>
        {selected.size > 0 && (
          <>
            <button
              onClick={bulkFeatured}
              className="flex items-center gap-1.5 text-sm px-3 py-2 bg-amber-50 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <Star size={13} /> Toggle Featured ({selected.size})
            </button>
            <button
              onClick={bulkDelete}
              className="flex items-center gap-1.5 text-sm px-3 py-2 bg-red-50 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={13} /> Delete ({selected.size})
            </button>
          </>
        )}
        <button
          onClick={exportCsv}
          className="flex items-center gap-1.5 text-sm px-3 py-2 bg-blue-50 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors ml-auto"
        >
          <Download size={13} /> Export CSV
        </button>
      </div>

      {actionStatus && (
        <div className="text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          {actionStatus}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="animate-spin mr-2" size={20} /> Loading cars…
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-[#0D1B3E] text-white">
              <tr>
                <th className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.size > 0 && selected.size === filtered.length}
                    onChange={selectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-3 py-2 text-left font-semibold text-xs">Chassis #</th>
                <th className="px-3 py-2 text-left font-semibold text-xs">Make</th>
                <th className="px-3 py-2 text-left font-semibold text-xs">Model</th>
                <th className="px-3 py-2 text-left font-semibold text-xs">Year</th>
                <th className="px-3 py-2 text-left font-semibold text-xs">Images</th>
                <th className="px-3 py-2 text-left font-semibold text-xs">Featured</th>
                <th className="px-3 py-2 text-left font-semibold text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car, i) => (
                <tr
                  key={car.id}
                  className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors cursor-pointer`}
                  onClick={() => toggleSelect(car.id)}
                >
                  <td className="px-3 py-2" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(car.id)}
                      onChange={() => toggleSelect(car.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-3 py-2 font-mono text-gray-700 text-xs">{car.chassis_number}</td>
                  <td className="px-3 py-2 text-gray-700">{car.make}</td>
                  <td className="px-3 py-2 text-gray-700">{car.model}</td>
                  <td className="px-3 py-2 text-gray-500">{car.year}</td>
                  <td className="px-3 py-2">
                    {car.image_count > 0
                      ? <span className="inline-flex items-center gap-1 text-green-700 font-semibold">✅ {car.image_count}</span>
                      : <span className="text-red-600 font-semibold">❌ 0</span>
                    }
                  </td>
                  <td className="px-3 py-2">
                    {car.is_featured
                      ? <span className="inline-flex items-center gap-1 text-amber-700 font-semibold"><Star size={12} fill="currentColor" /> Yes</span>
                      : <span className="text-gray-400">—</span>
                    }
                  </td>
                  <td className="px-3 py-2" onClick={e => e.stopPropagation()}>
                    <SyncImagesButton car={car} onSynced={onCarSynced} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">No cars found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURE 4 — COMBINED CSV + ZIP UPLOAD
═══════════════════════════════════════════════════════════════ */

/* ─── types ─── */
type ZipImage = {
  nameNoExt: string;   // e.g. "14961968_01a"
  ext: string;         // e.g. "jpg"
  entry: JSZip.JSZipObject;
  isPrimary: boolean;  // ends with _01a
  isMap: boolean;      // ends with _map
};

type JobStatus = 'pending' | 'uploading' | 'inserting' | 'done' | 'no_images' | 'error';

type CarJob = {
  car: ParsedCar;
  chassis: string;
  images: ZipImage[];
  status: JobStatus;
  uploadedCount: number;
  error?: string;
  refNumber?: string;
};

/* ─── helpers ─── */
function normaliseDateFolder(raw: string): string {
  // "23 JULY 2026" → "23-july-2026"
  return raw.trim().toLowerCase().replace(/\s+/g, '-');
}

function sortZipImages(imgs: ZipImage[]): ZipImage[] {
  return [...imgs].sort((a, b) => {
    if (a.isPrimary) return -1;
    if (b.isPrimary) return 1;
    if (a.isMap)     return  1;
    if (b.isMap)     return -1;
    return a.nameNoExt.localeCompare(b.nameNoExt, undefined, { numeric: true });
  });
}

/* ─── Cloudinary upload — unsigned preset, direct from browser ─── */
// Uses the "wazir_trading" unsigned upload preset so no API secret is needed.
// The preset is configured in the Cloudinary dashboard to allow uploads into
// the wazir-trading folder with the correct transformation settings.
const CLOUDINARY_UPLOAD_PRESET = 'wazir_trading';

async function cloudinarySignedUpload(
  imageData: ArrayBuffer,
  mimeType: string,
  publicId: string,
): Promise<string> {
  const fd = new FormData();
  fd.append('file', new Blob([imageData], { type: mimeType }));
  fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  fd.append('public_id', publicId);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: fd },
  );

  const body = await res.json().catch(() => ({})) as {
    secure_url?: string;
    error?: { message?: string };
  };
  if (!res.ok) {
    throw new Error(body.error?.message ?? `Cloudinary upload failed: ${res.status}`);
  }
  return body.secure_url!;
}

/* ─── parse CSV (shared logic) ─── */
function parseCsvFile(file: File): Promise<ParsedCar[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw: unknown[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        const headerRow = raw[0] ?? [];
        const colMap = buildColMap(headerRow);
        const parsed = raw.slice(1).filter(r => {
          const chassis = r[colMap.chassis_number] && String(r[colMap.chassis_number]).trim();
          const year = parseFloat(String(r[colMap.year]));
          return chassis && !isNaN(year) && year > 1900;
        });
        resolve(parsed.map(r => parseRow(r, colMap)));
      } catch (err) { reject(err); }
    };
    reader.onerror = () => reject(new Error('FileReader failed'));
    reader.readAsArrayBuffer(file);
  });
}

/* ─── parse ZIP ─── */
async function parseZipFile(
  file: File,
): Promise<{ dateFolder: string; groups: Map<string, ZipImage[]> }> {
  const zip = await JSZip.loadAsync(file);
  const groups = new Map<string, ZipImage[]>();
  let rawDateFolder = '';

  for (const [path, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;
    // Skip Mac metadata
    if (path.startsWith('__MACOSX') || path.includes('.DS_Store')) continue;

    const parts = path.split('/').filter(Boolean);
    let chassis: string, filename: string;

    if (parts.length === 3) {
      // date-folder / chassis / image.jpg
      if (!rawDateFolder) rawDateFolder = parts[0];
      chassis  = parts[1];
      filename = parts[2];
    } else if (parts.length === 2) {
      // chassis / image.jpg  (no date wrapper)
      chassis  = parts[0];
      filename = parts[1];
    } else {
      continue;
    }

    const dotIdx = filename.lastIndexOf('.');
    const ext = dotIdx >= 0 ? filename.slice(dotIdx + 1).toLowerCase() : '';
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) continue;

    const nameNoExt = dotIdx >= 0 ? filename.slice(0, dotIdx) : filename;
    const lname = nameNoExt.toLowerCase();
    const isPrimary = lname.endsWith('_01a');
    const isMap     = lname.endsWith('_map');

    if (!groups.has(chassis)) groups.set(chassis, []);
    groups.get(chassis)!.push({ nameNoExt, ext, entry, isPrimary, isMap });
  }

  return { dateFolder: normaliseDateFolder(rawDateFolder), groups };
}

/* ─── component ─── */
function CombinedUploadTab() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [jobs, setJobs]       = useState<CarJob[]>([]);
  const [dateFolder, setDateFolder] = useState('');
  const [phase, setPhase]     = useState<'idle' | 'parsing' | 'preview' | 'running' | 'done'>('idle');
  const [parseErr, setParseErr] = useState('');
  const [overallPct, setOverallPct] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* accept files from drop or picker — detect by extension */
  const acceptFiles = useCallback((files: FileList | File[]) => {
    for (const f of Array.from(files)) {
      const name = f.name.toLowerCase();
      if (name.endsWith('.csv') || name.endsWith('.xlsx') || name.endsWith('.xls')) {
        setCsvFile(f);
      } else if (name.endsWith('.zip')) {
        setZipFile(f);
      }
    }
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    acceptFiles(e.dataTransfer.files);
  };

  /* parse both files → build job list */
  const parse = useCallback(async () => {
    if (!csvFile) return;
    setPhase('parsing');
    setParseErr('');
    try {
      const cars = await parseCsvFile(csvFile);
      let zipGroups = new Map<string, ZipImage[]>();
      let detectedFolder = '';

      if (zipFile) {
        const result = await parseZipFile(zipFile);
        zipGroups = result.groups;
        detectedFolder = result.dateFolder;
        if (detectedFolder) setDateFolder(detectedFolder);
      }

      const built: CarJob[] = cars.map(car => {
        const chassis = String(car.chassis_number || '');
        const images  = zipGroups.get(chassis) ?? [];
        return {
          car,
          chassis,
          images,
          status:        'pending',
          uploadedCount: 0,
        };
      });
      setJobs(built);
      setPhase('preview');
    } catch (err) {
      setParseErr(err instanceof Error ? err.message : 'Parse failed');
      setPhase('idle');
    }
  }, [csvFile, zipFile]);

  /* immutable job updater */
  const updateJob = useCallback((idx: number, patch: Partial<CarJob>) => {
    setJobs(js => js.map((j, i) => (i === idx ? { ...j, ...patch } : j)));
  }, []);

  /* ─── main upload loop ─── */
  const runAll = useCallback(async () => {
    if (!jobs.length) return;
    setPhase('running');
    setOverallPct(0);

    // Live JPY rate
    let jpyRate = 162;
    try {
      const r = await fetch('https://open.er-api.com/v6/latest/USD', { credentials: 'omit' });
      if (r.ok) {
        const j = await r.json();
        if (j.result === 'success' && j.rates?.JPY) jpyRate = j.rates.JPY;
      }
    } catch { /* use fallback */ }

    // Next ref number
    const { data: latest } = await supabase
      .from('cars').select('ref_number')
      .order('ref_number', { ascending: false }).limit(1);
    let nextNum = 1;
    if (latest?.length && latest[0].ref_number) {
      const m = String(latest[0].ref_number).match(/(\d+)$/);
      if (m) nextNum = parseInt(m[1], 10) + 1;
    }

    for (let i = 0; i < jobs.length; i++) {
      const job   = jobs[i];
      const refNo = `WTL-${String(nextNum + i).padStart(6, '0')}`;
      updateJob(i, { refNumber: refNo });

      try {
        /* ── upload images to Cloudinary ── */
        const imageUrls: { url: string; isPrimary: boolean; isMap: boolean; order: number }[] = [];

        if (job.images.length > 0) {
          updateJob(i, { status: 'uploading' });
          const sorted = sortZipImages(job.images);

          for (let k = 0; k < sorted.length; k++) {
            const img      = sorted[k];
            const publicId = `wazir-trading/${dateFolder}/${job.chassis}/${img.nameNoExt}`;
            const mimeType = img.ext === 'jpg' ? 'image/jpeg'
                           : img.ext === 'png' ? 'image/png'
                           : img.ext === 'webp' ? 'image/webp'
                           : 'image/jpeg';

            const data = await img.entry.async('arraybuffer');
            const url  = await cloudinarySignedUpload(data, mimeType, publicId);
            imageUrls.push({
              url,
              isPrimary: img.isPrimary,
              isMap:     img.isMap,
              order:     img.isMap ? 99 : k + 1,
            });
            updateJob(i, { uploadedCount: k + 1 });
          }
        } else {
          updateJob(i, { status: 'no_images' });
        }

        /* ── insert car record ── */
        updateJob(i, { status: 'inserting' });
        const r = job.car;
        const carRecord = {
          ref_number:          refNo,
          lot_number:          r.lot_number       || null,
          model_code:          r.model_code       || null,
          chassis_number:      r.chassis_number   || null,
          make:                r.make             || null,
          model:               r.model            || null,
          variant:             r.variant          || null,
          year:                r.year             ?? null,
          manufacture_month:   r.manufacture_month || null,
          engine_cc:           r.engine_cc        ?? null,
          seats:               r.seats            ?? null,
          auction_grade:       r.auction_grade    || null,
          exterior_grade:      r.exterior_grade   || null,
          interior_grade:      r.interior_grade   || null,
          transmission:        r.transmission     || null,
          body_type:           r.body_type        || null,
          color:               r.color            || null,
          doors:               r.doors            ?? null,
          mileage_km:          r.mileage_km       ?? null,
          fuel_type:           r.fuel_type        || null,
          features:            r.features         || {},
          wholesale_price_jpy: r.wholesale_price_jpy ?? null,
          fob_price_usd:       r.wholesale_price_jpy != null
                                 ? Math.round((r.wholesale_price_jpy as number) / jpyRate)
                                 : null,
          status: 'available',
        };

        const { data: carData, error: carErr } = await supabase
          .from('cars').insert([carRecord]).select('id').single();
        if (carErr) throw carErr;

        /* ── insert car images ── */
        if (imageUrls.length > 0) {
          const imgRows = imageUrls.map(img => ({
            car_id:        carData.id,
            image_url:     img.url,
            is_primary:    img.isPrimary,
            display_order: img.order,
          }));
          const { error: imgErr } = await supabase.from('car_images').insert(imgRows);
          if (imgErr) throw imgErr;
        }

        updateJob(i, { status: 'done' });
      } catch (err) {
        updateJob(i, {
          status: 'error',
          error:  err instanceof Error ? err.message : String(err),
        });
      }

      setOverallPct(Math.round(((i + 1) / jobs.length) * 100));
    }

    setPhase('done');
  }, [jobs, dateFolder, updateJob]);

  /* ── stats ── */
  const totalImages   = jobs.reduce((s, j) => s + j.images.length, 0);
  const matchedCars   = jobs.filter(j => j.images.length > 0).length;
  const doneCars      = jobs.filter(j => j.status === 'done').length;
  const errorCars     = jobs.filter(j => j.status === 'error').length;

  const statusIcon = (j: CarJob) => {
    if (j.status === 'done')      return <span className="text-green-600 font-bold">✅</span>;
    if (j.status === 'error')     return <span className="text-red-600 font-bold">❌</span>;
    if (j.status === 'uploading') return <span className="text-blue-600 flex items-center gap-1"><Loader2 size={12} className="animate-spin"/>{j.uploadedCount}/{j.images.length}</span>;
    if (j.status === 'inserting') return <span className="text-amber-600 flex items-center gap-1"><Loader2 size={12} className="animate-spin"/>Saving…</span>;
    if (j.status === 'no_images') return <span className="text-gray-400">No images</span>;
    return <span className="text-gray-300">—</span>;
  };

  return (
    <div className="space-y-6">

      {/* ── File drop zone ── */}
      {(phase === 'idle' || phase === 'parsing') && (
        <div
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-[#C8102E] rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors group"
        >
          <PackageOpen className="text-gray-400 group-hover:text-[#C8102E] transition-colors" size={40} />
          <p className="font-semibold text-gray-600 group-hover:text-[#C8102E] transition-colors text-center">
            Drop your <strong>CSV</strong> and <strong>ZIP</strong> files here, or click to select
          </p>
          <p className="text-xs text-gray-400">Both files are detected automatically by extension</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls,.zip"
            multiple
            className="hidden"
            onChange={e => { if (e.target.files) acceptFiles(e.target.files); }}
          />

          {/* File badges */}
          <div className="flex gap-3 mt-2 flex-wrap justify-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${csvFile ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              <FileSpreadsheet size={15} />
              {csvFile ? csvFile.name : 'CSV / Excel — not selected'}
              {csvFile && <CheckCircle2 size={14} />}
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${zipFile ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
              <FolderArchive size={15} />
              {zipFile ? zipFile.name : 'ZIP with images — not selected (optional)'}
              {zipFile && <CheckCircle2 size={14} />}
            </div>
          </div>
        </div>
      )}

      {parseErr && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{parseErr}</div>
      )}

      {/* ── Parse button ── */}
      {phase === 'idle' && csvFile && (
        <div className="flex justify-center">
          <button
            onClick={parse}
            className="flex items-center gap-2 bg-[#0D1B3E] hover:bg-[#162d5e] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            <Eye size={16} /> Parse Files
          </button>
        </div>
      )}

      {phase === 'parsing' && (
        <div className="flex items-center justify-center gap-3 py-6 text-gray-500">
          <Loader2 className="animate-spin" size={20} /> Parsing files…
        </div>
      )}

      {/* ── Preview ── */}
      {(phase === 'preview' || phase === 'running' || phase === 'done') && jobs.length > 0 && (
        <div className="space-y-4">

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Cars from CSV',     value: jobs.length,   color: 'bg-[#0D1B3E] text-white' },
              { label: 'Image groups (ZIP)', value: matchedCars,   color: 'bg-blue-50 border border-blue-200 text-blue-700' },
              { label: 'Total images',       value: totalImages,   color: 'bg-purple-50 border border-purple-200 text-purple-700' },
              { label: 'Done',               value: `${doneCars}/${jobs.length}`, color: 'bg-green-50 border border-green-200 text-green-700' },
            ].map(c => (
              <div key={c.label} className={`rounded-xl p-4 ${c.color}`}>
                <div className="text-2xl font-bold">{c.value}</div>
                <div className="text-xs mt-1 opacity-70">{c.label}</div>
              </div>
            ))}
          </div>

          {/* Date folder */}
          {zipFile && (
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Cloudinary folder
              </label>
              <input
                type="text"
                value={dateFolder}
                onChange={e => setDateFolder(e.target.value)}
                placeholder="e.g. 23-july-2026"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                disabled={phase === 'running'}
              />
              <span className="text-xs text-gray-400 whitespace-nowrap">auto-detected from ZIP</span>
            </div>
          )}

          {/* Progress bar */}
          {(phase === 'running' || phase === 'done') && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{phase === 'done' ? 'Complete!' : `Processing car ${doneCars + errorCars} of ${jobs.length}…`}</span>
                <span>{overallPct}%</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C8102E] transition-all duration-300 rounded-full"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              {phase === 'done' && (
                <div className="mt-2 flex gap-4 text-sm font-medium">
                  <span className="text-green-700">✅ {doneCars} done</span>
                  {errorCars > 0 && <span className="text-red-700">❌ {errorCars} errors</span>}
                </div>
              )}
            </div>
          )}

          {/* Upload button */}
          {phase === 'preview' && (
            <div className="flex items-center gap-4">
              <button
                onClick={runAll}
                className="flex items-center gap-2 bg-[#C8102E] hover:bg-[#a00d24] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                <Upload size={16} />
                {zipFile
                  ? `Upload All & Create ${jobs.length} Listings`
                  : `Create ${jobs.length} Listings`}
              </button>
              <button
                onClick={() => { setCsvFile(null); setZipFile(null); setJobs([]); setPhase('idle'); setDateFolder(''); }}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Start over
              </button>
            </div>
          )}

          {/* Per-car job table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm max-h-[520px] overflow-y-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-[#0D1B3E] text-white sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">#</th>
                  <th className="px-3 py-2 text-left font-semibold">Chassis</th>
                  <th className="px-3 py-2 text-left font-semibold">Make / Model</th>
                  <th className="px-3 py-2 text-left font-semibold">Year</th>
                  <th className="px-3 py-2 text-left font-semibold">Images</th>
                  <th className="px-3 py-2 text-left font-semibold">Ref</th>
                  <th className="px-3 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${j.status === 'error' ? 'bg-red-50' : ''}`}>
                    <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                    <td className="px-3 py-2 font-mono text-gray-700">{j.chassis}</td>
                    <td className="px-3 py-2 text-gray-700">{String(j.car.make || '')} {String(j.car.model || '')}</td>
                    <td className="px-3 py-2 text-gray-500">{String(j.car.year ?? '')}</td>
                    <td className="px-3 py-2 text-gray-500">
                      {j.images.length > 0
                        ? <span className="text-blue-700 font-semibold">{j.images.length}</span>
                        : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-3 py-2 font-mono text-gray-400">{j.refNumber ?? '—'}</td>
                    <td className="px-3 py-2">
                      {statusIcon(j)}
                      {j.status === 'error' && j.error && (
                        <div className="text-red-500 text-[10px] mt-0.5 max-w-[200px] truncate" title={j.error}>{j.error}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN ADMIN PAGE
═══════════════════════════════════════════════════════════════ */
const TABS = [
  { id: 'sync',       label: 'Sync Images',         icon: RefreshCw },
  { id: 'combined',   label: 'CSV + Images',         icon: PackageOpen },
  { id: 'upload',     label: 'CSV Only',             icon: Upload },
  { id: 'cloudinary', label: 'Image Matching',       icon: Image },
  { id: 'dashboard',  label: 'Review Dashboard',     icon: LayoutDashboard },
] as const;
type TabId = typeof TABS[number]['id'];

export default function AdminBulkUpload() {
  const [authed, setAuthed]       = useState(isSessionValid);
  const [activeTab, setActiveTab] = useState<TabId>('sync');

  const logout = () => { clearSession(); setAuthed(false); };

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0D1B3E] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#C8102E] rounded flex items-center justify-center">
            <Lock size={14} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none">Admin Panel</h1>
            <p className="text-xs text-gray-400 mt-0.5">Wazir Trading LLC</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <LogOut size={13} /> Sign out
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === id
                  ? 'border-[#C8102E] text-[#C8102E]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'sync'       && <SyncImagesTab />}
        {activeTab === 'combined'   && <CombinedUploadTab />}
        {activeTab === 'upload'     && <CsvUploadTab />}
        {activeTab === 'cloudinary' && <CloudinaryTab />}
        {activeTab === 'dashboard'  && <ReviewDashboardTab />}
      </main>
    </div>
  );
}
