import { useState, useCallback } from 'react';
import {
  Copy, Check, Shield, Mail, FileText, Ban,
  Landmark, AlertTriangle, Phone, MessageCircle, ChevronRight,
} from 'lucide-react';

// ─── Bank Details Data ─────────────────────────────────────────────────────

const BANK_FIELDS = [
  { label: 'Bank Name',       value: 'Mitsui Sumitomo Ginko (0009)' },
  { label: 'Branch Name',     value: 'Nagoya Ekimae Branch (402)' },
  { label: 'Account Name',    value: 'Wazir Trading LLC' },
  { label: 'Account Number',  value: '7917020' },
  { label: 'SWIFT Code',      value: 'SMBCJPJT' },
  {
    label: 'Bank Address',
    value: 'Nagoya Mitsui Building North 5F, Nakamura-ku, Meieki 4-8-18, Nagoya-shi, Aichi, 450-0002',
  },
];

const COPY_ALL_TEXT = `Bank Name: Mitsui Sumitomo Ginko (0009)
Branch: Nagoya Ekimae Branch (402)
Account Name: Wazir Trading LLC
Account Number: 7917020
SWIFT: SMBCJPJT
Address: Nagoya Mitsui Building North 5F, Nakamura-ku, Meieki 4-8-18, Nagoya, Aichi`;

// ─── Copy Button ──────────────────────────────────────────────────────────

function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] text-[11px] font-semibold tracking-wide uppercase transition-all duration-150 flex-shrink-0 ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 hover:border-white/30'
      } ${className}`}
      aria-label={`Copy ${text}`}
    >
      {copied ? (
        <>
          <Check size={12} strokeWidth={2.5} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={12} strokeWidth={2} />
          Copy
        </>
      )}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function PaymentInformationPage() {
  const [allCopied, setAllCopied] = useState(false);

  const handleCopyAll = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(COPY_ALL_TEXT);
    } catch {
      const el = document.createElement('textarea');
      el.value = COPY_ALL_TEXT;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  }, []);

  const waNumber = (import.meta as any).env?.VITE_WHATSAPP_NUMBER || '818089227375';
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello, I have a question about making payment to Wazir Trading LLC.')}`;

  return (
    <div className="min-h-screen bg-white pt-[130px]">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0D1B2A] text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 60%, rgba(200,16,46,0.09) 0%, transparent 55%), radial-gradient(circle at 85% 30%, rgba(200,16,46,0.06) 0%, transparent 50%)`,
          }}
        />
        <div className="relative container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-[#C8102E]" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-[#C8102E]">Finance</span>
            <span className="h-px w-8 bg-[#C8102E]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Payment Information</h1>
          <p className="text-white/60 text-base leading-relaxed max-w-xl mx-auto">
            Secure and transparent payment process for your peace of mind
          </p>
        </div>
      </section>

      {/* ── Section 1: Bank Details ───────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="bg-[#0D1B2A] rounded-[6px] overflow-hidden shadow-2xl">
            {/* Card header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-[#C8102E]/20 flex items-center justify-center flex-shrink-0">
                    <Landmark size={18} className="text-[#C8102E]" />
                  </div>
                  <h2 className="text-white font-bold text-lg leading-snug">
                    Official Bank Account — Japan Only
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/15 border border-yellow-400/30 rounded-full text-yellow-300 text-[11px] font-bold tracking-wide uppercase flex-shrink-0">
                  <AlertTriangle size={11} strokeWidth={2.5} />
                  We ONLY accept payments to this account
                </span>
              </div>
            </div>

            {/* Bank fields */}
            <div className="divide-y divide-white/8">
              {BANK_FIELDS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 px-6 py-4 hover:bg-white/4 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-white/40 uppercase tracking-[0.18em] font-semibold mb-1">
                      {label}
                    </div>
                    <div className="text-white font-mono font-semibold text-[15px] leading-snug break-all">
                      {value}
                    </div>
                  </div>
                  <CopyButton text={value} className="mt-4 opacity-60 group-hover:opacity-100" />
                </div>
              ))}
            </div>

            {/* Copy All button */}
            <div className="px-6 py-5 border-t border-white/10 bg-white/3">
              <button
                onClick={handleCopyAll}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-[4px] text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-200 ${
                  allCopied
                    ? 'bg-green-500 text-white'
                    : 'bg-[#C8102E] hover:bg-[#A50D25] text-white'
                }`}
              >
                {allCopied ? (
                  <>
                    <Check size={14} strokeWidth={2.5} />
                    All Bank Details Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} strokeWidth={2} />
                    Copy All Bank Details
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Payment Method ─────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0D1B2A] mb-8 text-center">Accepted Payment Method</h2>

          <div className="border-2 border-[#C8102E]/20 rounded-[6px] p-6 bg-[#C8102E]/3 flex items-start gap-5 mb-5">
            <div className="w-12 h-12 rounded-full bg-[#C8102E]/15 flex items-center justify-center flex-shrink-0">
              <Landmark size={22} className="text-[#C8102E]" />
            </div>
            <div>
              <div className="font-bold text-[#0D1B2A] text-lg mb-1">Telegraphic Transfer (TT)</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bank-to-bank wire transfer directly to our Japan bank account. This is the only accepted payment method.
              </p>
              <span className="inline-block mt-3 px-3 py-1 bg-[#C8102E] text-white text-[11px] font-bold uppercase tracking-wide rounded-full">
                Only Accepted Method
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-gray-50 border border-gray-200 rounded-[4px] px-4 py-3">
            <Ban size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500">
              We do <strong>not</strong> accept Western Union, MoneyGram, PayPal, or any personal payment services.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: Security ───────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#0D1B2A] mb-3">Protect Your Payments and Avoid Scams</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Wazir Trading values your trust and wants to ensure the security of your transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-[6px] p-6">
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                <Shield size={18} className="text-green-600" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] mb-2">Verify Bank Account Details</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Before making any payment, confirm you are using the correct bank account information. The beneficiary
                for all accounts is <strong className="text-[#0D1B2A]">Wazir Trading LLC</strong> and we exclusively
                use the Japan bank details stated above. We do not use Western Union or any money transfer services.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-[6px] p-6">
              <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mb-4">
                <Mail size={18} className="text-orange-500" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] mb-2">Avoid Fake Emails and Scams</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Beware of fake or fraudulent emails impersonating Wazir Trading LLC. Always confirm the sender email
                ends with <strong className="text-[#0D1B2A]">@wazirtrading.com</strong> or check{' '}
                <strong className="text-[#0D1B2A]">wazirtrading-pc@outlook.jp</strong> before acting on any payment
                instructions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-[6px] p-6">
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                <FileText size={18} className="text-blue-500" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] mb-2">Payment Guidelines</h3>
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
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-200 rounded-[6px] p-6">
              <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                <Ban size={18} className="text-[#C8102E]" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] mb-2">Right to Cancel</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Wazir Trading reserves the right to cancel, terminate, or suspend any deal if there are suspicions of
                fraudulent activities or unauthorized transactions by any party involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Step-by-Step Guide ────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold text-[#0D1B2A] mb-12 text-center">Step by Step Payment Guide</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gray-200 z-0" />

            {[
              {
                num: '01',
                title: 'Get Your Invoice',
                desc: 'After confirming your car, request your official Proforma Invoice from us via WhatsApp or email. Invoice includes full bank details and payment amount.',
              },
              {
                num: '02',
                title: 'Verify Bank Details',
                desc: 'Cross-check bank details on invoice with the official details on this page. If anything is different contact us immediately before sending.',
              },
              {
                num: '03',
                title: 'Make Transfer',
                desc: 'Visit your bank and make a Telegraphic Transfer (TT) to our Japan account. Make sure to include your Invoice Number in the transfer reference.',
              },
              {
                num: '04',
                title: 'Send Payment Receipt',
                desc: 'After transfer, send us a clear photo or scan of your bank payment receipt via WhatsApp. This confirms payment and we begin processing your shipment.',
              },
            ].map((step, idx) => (
              <div key={step.num} className="relative z-10 flex flex-col items-center text-center">
                {/* Number circle */}
                <div className="w-[72px] h-[72px] rounded-full bg-[#0D1B2A] border-4 border-white shadow-lg flex items-center justify-center mb-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">{idx + 1}</span>
                </div>
                <div className="px-1">
                  <h3 className="font-bold text-[#0D1B2A] mb-2 text-[15px]">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Warnings ───────────────────────────────────────── */}
      <section className="py-14 bg-[#C8102E]/6 border-t-4 border-[#C8102E]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-white border-2 border-[#C8102E]/30 rounded-[6px] overflow-hidden shadow-lg">
            {/* Warning header */}
            <div className="bg-[#C8102E] px-6 py-4 flex items-center gap-3">
              <AlertTriangle size={20} className="text-white flex-shrink-0" strokeWidth={2.5} />
              <h2 className="text-white font-bold text-lg tracking-wide uppercase">
                ⚠️ Important Payment Warnings
              </h2>
            </div>

            <div className="divide-y divide-red-100">
              {[
                {
                  icon: <Landmark size={20} className="text-[#C8102E]" />,
                  title: 'Our bank account is ONLY in Japan.',
                  desc: 'Never send payment to any other country.',
                },
                {
                  icon: <Ban size={20} className="text-[#C8102E]" />,
                  title: 'We do NOT accept payments to personal bank accounts, mobile wallets, or agents.',
                  desc: 'If anyone requests this contact us immediately.',
                },
                {
                  icon: <Shield size={20} className="text-[#C8102E]" />,
                  title: 'Always verify bank details directly on this page before every transaction.',
                  desc: 'Bank details never change without official notice from us.',
                },
              ].map((warning, idx) => (
                <div key={idx} className="flex items-start gap-4 px-6 py-5">
                  <div className="w-9 h-9 rounded-full bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {warning.icon}
                  </div>
                  <div>
                    <p className="font-bold text-[#0D1B2A] text-[15px] leading-snug mb-0.5">{warning.title}</p>
                    <p className="text-gray-500 text-sm">{warning.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Contact ────────────────────────────────────────── */}
      <section className="py-16 bg-[#0D1B2A]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Need Payment Assistance?</h2>
          <p className="text-white/60 mb-10 max-w-md mx-auto">
            For any questions about making your payment or if you suspect fraud, contact us immediately.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* WhatsApp — highlighted */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#25D366]/10 border border-[#25D366]/30 rounded-[6px] p-6 flex flex-col items-center gap-3 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-200 order-first md:order-last"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                <WhatsAppIcon size={22} className="text-[#25D366]" />
              </div>
              <div>
                <div className="text-[#25D366]/70 text-[11px] uppercase tracking-widest font-semibold mb-1">
                  WhatsApp <span className="text-[#25D366]">— Most Urgent</span>
                </div>
                <div className="text-white font-semibold">+81 80-8922-7375</div>
              </div>
              <span className="mt-1 px-4 py-1.5 bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider rounded-[2px] group-hover:bg-[#1DAA57] transition-colors flex items-center gap-1.5">
                Chat Now
                <ChevronRight size={11} strokeWidth={2.5} />
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:wazirtrading-pc@outlook.jp"
              className="group bg-white/5 border border-white/10 rounded-[6px] p-6 flex flex-col items-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-[#C8102E]/15 flex items-center justify-center group-hover:bg-[#C8102E]/25 transition-colors">
                <Mail size={20} className="text-[#C8102E]" />
              </div>
              <div>
                <div className="text-white/50 text-[11px] uppercase tracking-widest font-semibold mb-1">Email</div>
                <div className="text-white font-semibold text-sm">wazirtrading-pc@outlook.jp</div>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:05037408980"
              className="group bg-white/5 border border-white/10 rounded-[6px] p-6 flex flex-col items-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-[#C8102E]/15 flex items-center justify-center group-hover:bg-[#C8102E]/25 transition-colors">
                <Phone size={20} className="text-[#C8102E]" />
              </div>
              <div>
                <div className="text-white/50 text-[11px] uppercase tracking-widest font-semibold mb-1">Phone</div>
                <div className="text-white font-semibold">050-3740-8980</div>
              </div>
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
