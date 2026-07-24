import { useState, useCallback } from 'react';
import {
  Copy, Check, Shield, Mail, FileText, Ban,
  Landmark, AlertTriangle, Phone, ChevronRight,
} from 'lucide-react';

/* ─── Brand ──────────────────────────────────────────────────────── */
const NAVY = '#0D1B3E';
const RED  = '#C8102E';

/* ─── Bank Details Data ──────────────────────────────────────────── */
const BANK_FIELDS = [
  { label: 'Bank Name',      value: 'Mitsui Sumitomo Ginko (0009)' },
  { label: 'Branch Name',    value: 'Nagoya Ekimae Branch (402)' },
  { label: 'Account Name',   value: 'Wazir Trading LLC' },
  { label: 'Account Number', value: '7917020' },
  { label: 'SWIFT Code',     value: 'SMBCJPJT' },
  { label: 'Bank Address',   value: 'Nagoya Mitsui Building North 5F, Nakamura-ku, Meieki 4-8-18, Nagoya-shi, Aichi, 450-0002' },
];

const COPY_ALL_TEXT = `Bank Name: Mitsui Sumitomo Ginko (0009)
Branch: Nagoya Ekimae Branch (402)
Account Name: Wazir Trading LLC
Account Number: 7917020
SWIFT: SMBCJPJT
Address: Nagoya Mitsui Building North 5F, Nakamura-ku, Meieki 4-8-18, Nagoya, Aichi`;

/* ─── Copy Button ────────────────────────────────────────────────── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const el = document.createElement('textarea');
      el.value = text; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handle}
      aria-label="Copy"
      className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide border transition-all ${
        copied
          ? 'bg-emerald-500 border-emerald-500 text-white'
          : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
      }`}
    >
      {copied ? <Check size={10} strokeWidth={3} /> : <Copy size={10} strokeWidth={2} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function PaymentInformationPage() {
  const [allCopied, setAllCopied] = useState(false);

  const handleCopyAll = useCallback(async () => {
    try { await navigator.clipboard.writeText(COPY_ALL_TEXT); }
    catch {
      const el = document.createElement('textarea');
      el.value = COPY_ALL_TEXT; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
    setAllCopied(true); setTimeout(() => setAllCopied(false), 2000);
  }, []);

  const waNumber = (import.meta as any).env?.VITE_WHATSAPP_NUMBER || '818089227375';
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello, I have a question about making payment to Wazir Trading LLC.')}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-[110px] md:pt-[130px]">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 70%, rgba(200,16,46,0.1) 0%, transparent 50%)`,
        }} />
        <div className="relative container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-[#C8102E]" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C8102E]">Finance</span>
            <span className="h-px w-6 bg-[#C8102E]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">Payment Information</h1>
          <p className="text-white/55 text-sm leading-relaxed max-w-sm mx-auto">
            Secure and transparent payment — direct to our Japan bank account only.
          </p>
        </div>
      </section>

      {/* ── Section 1: Bank Details ─────────────────────────────── */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">

          {/* Warning banner */}
          <div className="flex items-center gap-2.5 mb-4 bg-amber-50 border border-amber-200 rounded-md px-4 py-3">
            <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />
            <p className="text-amber-800 text-xs font-semibold leading-snug">
              We <span className="text-amber-900 font-bold">ONLY</span> accept payments to this account. Never send to any other account.
            </p>
          </div>

          {/* Bank card */}
          <div className="rounded-xl overflow-hidden shadow-2xl" style={{ background: NAVY }}>
            {/* Card header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C8102E]/20 flex items-center justify-center flex-shrink-0">
                <Landmark size={16} className="text-[#C8102E]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">Official Bank Account</p>
                <p className="text-white/40 text-[11px] mt-0.5">Japan · Mitsui Sumitomo Bank</p>
              </div>
            </div>

            {/* Fields */}
            <div className="divide-y divide-white/8">
              {BANK_FIELDS.map(({ label, value }) => (
                <div key={label} className="px-5 py-3.5 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.16em] font-semibold mb-0.5">{label}</p>
                    <p className="text-white font-mono font-semibold text-[13px] md:text-[14px] leading-snug break-words">{value}</p>
                  </div>
                  <CopyBtn text={value} />
                </div>
              ))}
            </div>

            {/* Copy All */}
            <div className="px-5 py-4 border-t border-white/10">
              <button
                onClick={handleCopyAll}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-md text-[12px] font-bold uppercase tracking-[0.15em] transition-all ${
                  allCopied ? 'bg-emerald-500 text-white' : 'text-white hover:opacity-90'
                }`}
                style={allCopied ? {} : { background: RED }}
              >
                {allCopied
                  ? <><Check size={13} strokeWidth={3} /> All Details Copied!</>
                  : <><Copy size={13} /> Copy All Bank Details</>
                }
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Payment Method ────────────────────────────── */}
      <section className="pb-8 md:pb-12">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <h2 className="text-lg font-bold text-[#0D1B3E] mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background: RED }} />
            Accepted Payment Method
          </h2>

          {/* TT card */}
          <div className="border-2 border-[#C8102E]/20 rounded-xl p-5 bg-white flex items-start gap-4 mb-3 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
              <Landmark size={20} className="text-[#C8102E]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <p className="font-bold text-[#0D1B3E] text-base">Telegraphic Transfer (TT)</p>
                <span className="px-2 py-0.5 text-white text-[10px] font-bold uppercase rounded-full" style={{ background: RED }}>Only Method</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Bank-to-bank wire transfer directly to our Japan bank account. This is the only accepted payment method.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <Ban size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500">
              We do <strong>not</strong> accept Western Union, MoneyGram, PayPal, or any personal payment services.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: Step-by-Step ──────────────────────────────── */}
      <section className="py-8 md:py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <h2 className="text-lg font-bold text-[#0D1B3E] mb-6 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background: RED }} />
            Step-by-Step Payment Guide
          </h2>

          {/* Mobile: vertical timeline | Desktop: same vertical but cleaner */}
          <div className="space-y-0">
            {[
              {
                num: 1,
                title: 'Get Your Invoice',
                desc: 'After confirming your car, request your official Proforma Invoice from us via WhatsApp or email. Invoice includes full bank details and payment amount.',
              },
              {
                num: 2,
                title: 'Verify Bank Details',
                desc: 'Cross-check bank details on invoice with the official details on this page. If anything is different contact us immediately before sending.',
              },
              {
                num: 3,
                title: 'Make Transfer',
                desc: 'Visit your bank and make a Telegraphic Transfer (TT) to our Japan account. Include your Invoice Number in the transfer reference.',
              },
              {
                num: 4,
                title: 'Send Payment Receipt',
                desc: 'After transfer, send us a clear photo or scan of your bank receipt via WhatsApp. This confirms payment and we begin processing your shipment.',
              },
            ].map((step, idx, arr) => (
              <div key={step.num} className="flex gap-4">
                {/* Left: number + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0" style={{ background: NAVY }}>
                    {step.num}
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="w-px flex-1 mt-1 mb-1" style={{ background: 'repeating-linear-gradient(to bottom, #CBD5E1 0px, #CBD5E1 4px, transparent 4px, transparent 8px)' }} />
                  )}
                </div>
                {/* Right: content */}
                <div className={`flex-1 pb-6 ${idx === arr.length - 1 ? '' : ''}`}>
                  <h3 className="font-bold text-[#0D1B3E] text-sm mb-1 pt-2.5">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Security ──────────────────────────────────── */}
      <section className="py-8 md:py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <h2 className="text-lg font-bold text-[#0D1B3E] mb-5 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background: RED }} />
            Protect Your Payments &amp; Avoid Scams
          </h2>

          <div className="space-y-3">
            {/* Verify */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <Shield size={16} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#0D1B3E] text-sm mb-1">Verify Bank Account Details</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Before making any payment, confirm you are using the correct bank account information. The beneficiary
                  for all accounts is <strong className="text-[#0D1B3E]">Wazir Trading LLC</strong> and we exclusively
                  use the Japan bank details stated above. We do not use Western Union or any money transfer services.
                </p>
              </div>
            </div>

            {/* Fake emails */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-[#0D1B3E] text-sm mb-1">Avoid Fake Emails and Scams</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Beware of fraudulent emails impersonating Wazir Trading LLC. Always confirm the sender email
                  ends with <strong className="text-[#0D1B3E]">@wazirtrading.com</strong> or check{' '}
                  <strong className="text-[#0D1B3E]">wazirtrading-pc@outlook.jp</strong> before acting on any payment
                  instructions.
                </p>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0D1B3E] text-sm mb-1">Payment Guidelines</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  Wazir Trading strictly prohibits any local agents from accepting payments on our behalf. Our staff is
                  not authorized to conduct any transactions on behalf of clients. All payments go directly to our Japan
                  bank account only.
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Bank account is in Japan only',
                    'Never pay to personal accounts',
                    'Never pay to agents outside Japan',
                    'Always verify details before transfer',
                    'Contact us if anything seems suspicious',
                  ].map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: RED }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right to cancel */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                <Ban size={16} className="text-[#C8102E]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0D1B3E] text-sm mb-1">Right to Cancel</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Wazir Trading reserves the right to cancel, terminate, or suspend any deal if there are suspicions of
                  fraudulent activities or unauthorized transactions by any party involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Warnings ──────────────────────────────────── */}
      <section className="py-8 md:py-12 border-t-4" style={{ borderColor: RED, background: '#fff5f5' }}>
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <div className="rounded-xl overflow-hidden shadow-lg border border-[#C8102E]/20 bg-white">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4" style={{ background: RED }}>
              <AlertTriangle size={18} className="text-white flex-shrink-0" strokeWidth={2.5} />
              <h2 className="text-white font-bold text-base tracking-wide">⚠️ Important Payment Warnings</h2>
            </div>

            <div className="divide-y divide-red-100">
              {[
                {
                  icon: <Landmark size={18} className="text-[#C8102E]" />,
                  title: 'Our bank account is ONLY in Japan.',
                  desc: 'Never send payment to any other country.',
                },
                {
                  icon: <Ban size={18} className="text-[#C8102E]" />,
                  title: 'We do NOT accept payments to personal bank accounts, mobile wallets, or agents.',
                  desc: 'If anyone requests this, contact us immediately.',
                },
                {
                  icon: <Shield size={18} className="text-[#C8102E]" />,
                  title: 'Always verify bank details directly on this page before every transaction.',
                  desc: 'Bank details never change without official notice from us.',
                },
              ].map((w, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-4">
                  <div className="w-9 h-9 rounded-full bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {w.icon}
                  </div>
                  <div>
                    <p className="font-bold text-[#0D1B3E] text-sm leading-snug mb-0.5">{w.title}</p>
                    <p className="text-gray-500 text-sm">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Contact ───────────────────────────────────── */}
      <section className="py-8 md:py-12" style={{ background: NAVY }}>
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Need Payment Assistance?</h2>
            <p className="text-white/50 text-sm">Questions about payment or suspect fraud? Contact us immediately.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 p-4 sm:p-5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all group sm:text-center"
            >
              <div className="w-11 h-11 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon size={20} className="text-[#25D366]" />
              </div>
              <div className="flex-1 sm:flex-none">
                <p className="text-[10px] text-[#25D366]/70 uppercase tracking-widest font-bold mb-0.5">
                  WhatsApp <span className="text-[#25D366]">— Urgent</span>
                </p>
                <p className="text-white font-semibold text-sm">+81 80-8922-7375</p>
              </div>
              <span className="hidden sm:flex items-center gap-1 mt-1 px-3 py-1.5 bg-[#25D366] text-white text-[10px] font-bold uppercase rounded-md group-hover:bg-[#1DAA57] transition-colors">
                Chat Now <ChevronRight size={10} strokeWidth={2.5} />
              </span>
              <ChevronRight size={16} className="text-[#25D366] sm:hidden" />
            </a>

            {/* Email */}
            <a
              href="mailto:wazirtrading-pc@outlook.jp"
              className="flex sm:flex-col items-center gap-4 sm:gap-3 p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group sm:text-center"
            >
              <div className="w-11 h-11 rounded-full bg-[#C8102E]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C8102E]/25 transition-colors">
                <Mail size={18} className="text-[#C8102E]" />
              </div>
              <div className="flex-1 sm:flex-none">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Email</p>
                <p className="text-white font-semibold text-[13px] break-all">wazirtrading-pc@outlook.jp</p>
              </div>
              <ChevronRight size={16} className="text-white/30 sm:hidden" />
            </a>

            {/* Phone */}
            <a
              href="tel:05037408980"
              className="flex sm:flex-col items-center gap-4 sm:gap-3 p-4 sm:p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group sm:text-center"
            >
              <div className="w-11 h-11 rounded-full bg-[#C8102E]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C8102E]/25 transition-colors">
                <Phone size={18} className="text-[#C8102E]" />
              </div>
              <div className="flex-1 sm:flex-none">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Phone</p>
                <p className="text-white font-semibold text-sm">050-3740-8980</p>
              </div>
              <ChevronRight size={16} className="text-white/30 sm:hidden" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
