import React, { useState, useRef, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabase';
import {
  Upload, Eye, CheckCircle2, XCircle, Loader2, Image, LayoutDashboard,
  Star, Trash2, Download, ChevronDown, ChevronUp, Lock, LogOut, Search,
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

/* ─── COLUMN PARSER ──────────────────────────────────────────── */
function parseRow(row: unknown[]): Record<string, unknown> {
  const c = (i: number) => {
    const v = row[i];
    return v === undefined || v === null ? '' : String(v).trim();
  };
  const n = (i: number) => {
    const v = row[i];
    const num = parseFloat(String(v));
    return isNaN(num) ? null : num;
  };
  // JPY prices have comma-thousands separators (e.g. "1,500,000") — strip before parsing
  const jpy = (i: number) => {
    const v = row[i];
    const num = parseFloat(String(v).replace(/,/g, ''));
    return isNaN(num) ? null : num;
  };

  return {
    lot_number:       c(2),
    model_code:       c(3),
    chassis_number:   c(4),
    make:             c(5),
    model:            c(6),
    variant:          c(7),
    year:             n(8),
    manufacture_month:c(9),
    engine_cc:        n(10),
    seats:            n(11),
    auction_grade:    c(12),
    exterior_grade:   c(13),
    interior_grade:   c(14),
    transmission:     c(15),
    color:            c(16),
    doors:            n(17),
    mileage_km:       n(18),
    fuel_type:        c(20),
    features:         parseEquipment(c(21)),
    wholesale_price_jpy: jpy(22),
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
      const parsed = raw.slice(1).filter(r => {
        const chassis = r[4] && String(r[4]).trim();
        const year = parseFloat(String(r[8]));
        return chassis && !isNaN(year) && year > 1900;
      });
      setRows(parsed.map(parseRow));
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

    // 4. Generate a ref_number for each row
    const records = rows.map((r, i) => ({
      ref_number:          `WTL-${String(nextNum + i).padStart(6, '0')}`,
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
      color:               r.color           || null,
      doors:               r.doors           ?? null,
      mileage_km:          r.mileage_km      ?? null,
      fuel_type:           r.fuel_type       || null,
      features:            r.features        || {},
      wholesale_price_jpy: r.wholesale_price_jpy ?? null,
      // fob_price_usd = wholesale JPY / live JPY rate (rounded to nearest dollar)
      fob_price_usd: r.wholesale_price_jpy != null
        ? Math.round((r.wholesale_price_jpy as number) / jpyRate)
        : null,
      status:              'available',
    }));

    const { error } = await supabase.from('cars').insert(records);
    if (error) {
      setStatus('error');
      setInsertMsg(error.message);
    } else {
      setStatus('done');
      setInsertMsg(`${records.length} cars inserted (${records[0].ref_number} → ${records[records.length - 1].ref_number}).`);
    }
  };

  const PREVIEW_COLS = [
    { label: 'Chassis #',    key: 'chassis_number' },
    { label: 'Make',         key: 'make' },
    { label: 'Model',        key: 'model' },
    { label: 'Variant',      key: 'variant' },
    { label: 'Year',         key: 'year' },
    { label: 'CC',           key: 'engine_cc' },
    { label: 'Trans',        key: 'transmission' },
    { label: 'KM',           key: 'mileage_km' },
    { label: 'Grade',        key: 'auction_grade' },
    { label: 'Color',        key: 'color' },
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
              {status === 'inserting' ? 'Inserting…' : status === 'done' ? 'Done ✓' : 'Confirm & Insert All'}
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

  const hasImages    = filtered.filter(c => c.image_count > 0).length;
  const missingImages = filtered.filter(c => c.image_count === 0).length;

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
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">No cars found.</td>
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
   MAIN ADMIN PAGE
═══════════════════════════════════════════════════════════════ */
const TABS = [
  { id: 'upload',    label: 'CSV / Excel Upload', icon: Upload },
  { id: 'cloudinary', label: 'Image Matching',    icon: Image },
  { id: 'dashboard', label: 'Review Dashboard',   icon: LayoutDashboard },
] as const;
type TabId = typeof TABS[number]['id'];

export default function AdminBulkUpload() {
  const [authed, setAuthed]   = useState(isSessionValid);
  const [activeTab, setActiveTab] = useState<TabId>('upload');

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
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
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
        {activeTab === 'upload'     && <CsvUploadTab />}
        {activeTab === 'cloudinary' && <CloudinaryTab />}
        {activeTab === 'dashboard'  && <ReviewDashboardTab />}
      </main>
    </div>
  );
}
