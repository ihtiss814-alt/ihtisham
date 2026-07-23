import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Search, FileText, Landmark, Ship, MapPin,
  Car, ChevronDown, ChevronRight, CheckCircle,
  Zap, Shield, Package, Star, TrendingDown,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: '01',
    icon: <Search size={22} className="text-[#C8102E]" />,
    title: 'Browse and Select',
    description:
      'Browse our live inventory of quality Japanese used cars. Filter by make, model, year, price, and body type. Each car includes full specifications, auction grade, mileage, and multiple photos. Click Inquire Now on any car you like.',
    extra: null,
  },
  {
    num: '02',
    icon: <FileText size={22} className="text-[#C8102E]" />,
    title: 'Get Your Proforma Invoice',
    description:
      'Once you select your car, contact us on WhatsApp or submit an inquiry. We will send you an official Proforma Invoice within 24 hours. The invoice includes the full price breakdown, banking details, and shipment information.',
    extra: null,
  },
  {
    num: '03',
    icon: <Landmark size={22} className="text-[#C8102E]" />,
    title: 'Make Secure Payment',
    description:
      'Make a Telegraphic Transfer directly to our official Wazir Trading LLC bank account in Japan only. We accept 50% deposit to reserve the car and remaining 50% before shipment. Send us your payment receipt via WhatsApp to confirm.',
    extra: (
      <div className="mt-4 bg-[#0D1B2A] rounded-[4px] px-4 py-3 text-sm font-mono space-y-1">
        <div className="text-[#C8102E] text-[11px] font-bold uppercase tracking-widest mb-2">Bank Details</div>
        {[
          ['Bank', 'Mitsui Sumitomo Ginko (0009)'],
          ['Account', 'Wazir Trading LLC'],
          ['SWIFT', 'SMBCJPJT'],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-3">
            <span className="text-white/40 w-20 flex-shrink-0">{k}:</span>
            <span className="text-white font-semibold">{v}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '04',
    icon: <Ship size={22} className="text-[#C8102E]" />,
    title: 'Professional Shipping',
    description:
      'Once payment is confirmed we arrange immediate shipment from Yokohama port. We offer both RORO and Container shipping options. You will receive photos of your car being loaded, vessel name, voyage number, and estimated arrival date at your port.',
    extra: null,
  },
  {
    num: '05',
    icon: <MapPin size={22} className="text-[#C8102E]" />,
    title: 'Receive Your Car',
    description:
      'We send you the original Bill of Lading and all required export documents to clear your car at your destination port. Our team is available to assist with any documentation questions throughout the process.',
    extra: null,
  },
];

const TIMELINE = [
  { region: 'South Asia',  destination: 'Pakistan',       port: 'Karachi',         method: 'RORO', time: '3–4 weeks' },
  { region: 'South Asia',  destination: 'Pakistan',       port: 'Gwadar',          method: 'RORO', time: '4–5 weeks' },
  { region: 'Middle East', destination: 'UAE',            port: 'Dubai',           method: 'RORO', time: '2–3 weeks' },
  { region: 'Caribbean',   destination: 'Guyana',         port: 'Georgetown',      method: 'RORO', time: '6–8 weeks' },
  { region: 'Caribbean',   destination: 'Jamaica',        port: 'Kingston',        method: 'RORO', time: '6–8 weeks' },
  { region: 'Caribbean',   destination: 'Trinidad',       port: 'Port of Spain',   method: 'RORO', time: '6–8 weeks' },
  { region: 'Africa',      destination: 'Kenya',          port: 'Mombasa',         method: 'RORO', time: '4–5 weeks' },
  { region: 'Africa',      destination: 'Tanzania',       port: 'Dar es Salaam',   method: 'RORO', time: '4–5 weeks' },
  { region: 'Africa',      destination: 'Ghana',          port: 'Tema',            method: 'RORO', time: '6–7 weeks' },
  { region: 'Africa',      destination: 'Nigeria',        port: 'Lagos',           method: 'RORO', time: '6–7 weeks' },
  { region: 'Pacific',     destination: 'New Zealand',    port: 'Auckland',        method: 'RORO', time: '3–4 weeks' },
  { region: 'Pacific',     destination: 'Papua New Guinea', port: 'Port Moresby',  method: 'RORO', time: '4–5 weeks' },
  { region: 'Europe',      destination: 'UK',             port: 'Southampton',     method: 'RORO', time: '5–6 weeks' },
  { region: 'Europe',      destination: 'Germany',        port: 'Hamburg',         method: 'RORO', time: '5–6 weeks' },
  { region: 'Russia',      destination: 'Russia',         port: 'Vladivostok',     method: 'RORO', time: '2–3 weeks' },
];

const BENEFITS = [
  { icon: <Star size={20} className="text-[#C8102E]" />,        title: 'Direct from Japan Auctions',  desc: 'Access to 100,000+ vehicles weekly through all major Japanese auctions' },
  { icon: <TrendingDown size={20} className="text-[#C8102E]" />, title: 'Competitive Pricing',         desc: 'Best auction prices with no unnecessary middleman fees' },
  { icon: <CheckCircle size={20} className="text-[#C8102E]" />, title: 'Quality Inspection',           desc: 'Every car inspected and verified against auction inspection sheet' },
  { icon: <Shield size={20} className="text-[#C8102E]" />,      title: 'Secure Payment',               desc: 'Official Japan bank account only — Bank-to-Bank TT transfers' },
  { icon: <Zap size={20} className="text-[#C8102E]" />,         title: 'Fast Shipping',               desc: 'Earliest available vessel from Yokohama after payment confirmation' },
  { icon: <Package size={20} className="text-[#C8102E]" />,     title: 'Complete Documentation',       desc: 'All export documents, Bill of Lading and shipping papers handled by us' },
];

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'Typically 4 to 8 weeks depending on your destination. See our timeline table above for specific estimates.',
  },
  {
    q: 'What payment method do you accept?',
    a: 'We accept Telegraphic Transfer (TT) only to our official Japan bank account. Visit our Payment Information page for full banking details.',
  },
  {
    q: 'Can you source a car not in your stock?',
    a: 'Yes. Submit your requirements using our Car Request form and we will search Japanese auctions to find your vehicle.',
  },
  {
    q: 'Do I need an agent to buy from you?',
    a: 'No. You can buy directly from us. Never pay to any third party agent claiming to represent Wazir Trading.',
  },
];

// ─── FAQ Accordion ─────────────────────────────────────────────────────────

function FaqAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-gray-200 rounded-[4px] overflow-hidden transition-all duration-200 ${
        open ? 'border-l-4 border-l-[#C8102E]' : 'border-l-4 border-l-transparent hover:border-l-gray-300'
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#0D1B2A] text-[15px] leading-snug">{q}</span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          className={`flex-shrink-0 text-[#C8102E] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">{a}</div>
      </div>
    </div>
  );
}

// ─── Region badge colours ──────────────────────────────────────────────────

const REGION_COLORS: Record<string, string> = {
  'South Asia':  'bg-blue-50 text-blue-700',
  'Middle East': 'bg-amber-50 text-amber-700',
  'Caribbean':   'bg-purple-50 text-purple-700',
  'Africa':      'bg-green-50 text-green-700',
  'Pacific':     'bg-teal-50 text-teal-700',
  'Europe':      'bg-indigo-50 text-indigo-700',
  'Russia':      'bg-red-50 text-red-700',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  const waLink = `https://wa.me/818089227375?text=${encodeURIComponent('Hello, I am interested in purchasing a Japanese used car from Wazir Trading LLC.')}`;

  return (
    <div className="min-h-screen bg-white pt-[130px]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[#0D1B2A] text-white py-24 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 60%, rgba(200,16,46,0.1) 0%, transparent 50%),
            radial-gradient(circle at 90% 20%, rgba(200,16,46,0.07) 0%, transparent 45%),
            repeating-linear-gradient(
              -45deg,
              transparent, transparent 60px,
              rgba(255,255,255,0.012) 60px, rgba(255,255,255,0.012) 61px
            )
          `,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-[#C8102E]" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-[#C8102E]">Buying Guide</span>
            <span className="h-px w-8 bg-[#C8102E]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">How To Buy Your Dream Car</h1>
          <p className="text-white/60 text-base leading-relaxed max-w-xl mx-auto mb-10">
            Simple, transparent and hassle-free process from Japan to your door
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cars"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C8102E] hover:bg-[#A50D25] text-white text-[11px] tracking-[0.2em] uppercase font-bold rounded-[2px] transition-colors duration-150"
            >
              Browse Cars
              <ChevronRight size={13} strokeWidth={2.5} />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1DAA57] text-white text-[11px] tracking-[0.2em] uppercase font-bold rounded-[2px] transition-colors duration-150"
            >
              <WhatsAppIcon size={14} className="text-white" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 1: Buying Options ──────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0D1B2A] text-center mb-10">Choose Your Buying Option</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white border-2 border-gray-200 hover:border-[#C8102E]/40 rounded-[6px] p-8 flex flex-col transition-colors duration-200">
              <div className="w-12 h-12 rounded-full bg-[#C8102E]/10 flex items-center justify-center mb-5">
                <Car size={22} className="text-[#C8102E]" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] text-xl mb-3">Purchase from Stock</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                Browse and purchase from our live inventory of quality Japanese used cars available for immediate export
                from Japan.
              </p>
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8102E] hover:bg-[#A50D25] text-white text-[11px] tracking-[0.18em] uppercase font-bold rounded-[2px] transition-colors duration-150 self-start"
              >
                Browse Stock
                <ChevronRight size={12} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-2 border-gray-200 hover:border-[#C8102E]/40 rounded-[6px] p-8 flex flex-col transition-colors duration-200">
              <div className="w-12 h-12 rounded-full bg-[#C8102E]/10 flex items-center justify-center mb-5">
                <Search size={22} className="text-[#C8102E]" />
              </div>
              <h3 className="font-bold text-[#0D1B2A] text-xl mb-3">Source Your Specific Car</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                Tell us exactly what you need and we will search Japanese auctions to find your perfect vehicle at the
                best price.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0D1B2A] hover:bg-[#0D1B2A] text-[#0D1B2A] hover:text-white text-[11px] tracking-[0.18em] uppercase font-bold rounded-[2px] transition-all duration-150 self-start"
              >
                Submit Request
                <ChevronRight size={12} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: 5 Step Process ──────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0D1B2A] mb-3">Simple 5 Step Process</h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              From selecting your ideal car to delivery at your destination port
            </p>
          </div>

          <div className="relative">
            {/* Dotted connector line — desktop only */}
            <div className="hidden md:block absolute left-[39px] top-10 bottom-10 w-px border-l-2 border-dashed border-gray-200" />

            <div className="space-y-0">
              {STEPS.map((step, idx) => (
                <div key={step.num} className="relative flex gap-6 md:gap-10">
                  {/* Step number + icon bubble */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="relative z-10 w-[78px] h-[78px] rounded-full bg-[#0D1B2A] border-4 border-white shadow-lg flex flex-col items-center justify-center gap-0.5">
                      <span className="text-[10px] text-white/40 font-bold tracking-widest">{step.num}</span>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-12 ${idx === STEPS.length - 1 ? 'pb-0' : ''}`}>
                    <h3 className="font-bold text-[#0D1B2A] text-xl mt-4 mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                    {step.extra}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Shipping Timeline ───────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0D1B2A] mb-2">Estimated Delivery Timelines</h2>
            <p className="text-gray-500 text-sm">Average shipping time from Japan to major destination ports</p>
          </div>

          <div className="overflow-x-auto rounded-[6px] border border-gray-200 shadow-sm">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-[#0D1B2A] text-white">
                  {['Region', 'Destination', 'Port', 'Shipping Method', 'Est. Time'].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-left text-[11px] uppercase tracking-[0.15em] font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TIMELINE.map((row, idx) => (
                  <tr key={idx} className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          REGION_COLORS[row.region] ?? 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {row.region}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#0D1B2A]">{row.destination}</td>
                    <td className="px-4 py-3 text-gray-600">{row.port}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded">
                        {row.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-[#C8102E]">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Timelines are estimates and may vary based on vessel availability and customs clearance at destination port.
          </p>
        </div>
      </section>

      {/* ── Section 4: Payment Terms ───────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0D1B2A] text-center mb-10">Payment Terms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard */}
            <div className="border-2 border-[#C8102E]/20 rounded-[6px] p-7 bg-[#C8102E]/3">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#C8102E]/15 flex items-center justify-center">
                  <Landmark size={18} className="text-[#C8102E]" />
                </div>
                <h3 className="font-bold text-[#0D1B2A] text-lg">Standard Payment</h3>
              </div>
              <ul className="space-y-3">
                {[
                  '50% deposit to reserve the car',
                  '50% balance before loading on vessel',
                  'Both payments to Japan bank account only',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-[#C8102E] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Multiple vehicles */}
            <div className="border-2 border-gray-200 rounded-[6px] p-7 bg-gray-50">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Car size={18} className="text-gray-600" />
                </div>
                <h3 className="font-bold text-[#0D1B2A] text-lg">For Multiple Vehicles</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Contact us for special bulk pricing',
                  'Special payment terms available',
                  '20% bulk discount for 5 or more vehicles',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-gray-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Why Choose Us ───────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold text-[#0D1B2A] text-center mb-10">Why Choose Wazir Trading LLC?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-gray-200 rounded-[6px] p-6 hover:border-[#C8102E]/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-[#C8102E]/10 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-[#0D1B2A] mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Calculator CTA ──────────────────────────────────────── */}
      <section className="py-16 bg-[#0D1B2A]">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-[#C8102E]" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-[#C8102E]">Pricing</span>
            <span className="h-px w-8 bg-[#C8102E]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Want to Know the Total Cost?</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Use our Total Price Calculator to get an instant estimate of the full C&amp;F price to your destination port
            including shipping, inspection and insurance.
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C8102E] hover:bg-[#A50D25] text-white text-[11px] tracking-[0.2em] uppercase font-bold rounded-[2px] transition-colors duration-150"
          >
            Calculate Your Price
            <ChevronRight size={13} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* ── Section 7: FAQ Teaser ──────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0D1B2A] text-center mb-8">Common Questions</h2>
          <div className="space-y-2.5 mb-8">
            {FAQS.map((faq) => (
              <FaqAccordion key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-1.5 text-[#C8102E] font-semibold text-sm hover:underline underline-offset-2 transition-all"
            >
              See All FAQs
              <ChevronRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 8: Bottom CTA ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            Our expert team is available Mon–Sat 9AM–6PM Japan Standard Time. Contact us now for personalized
            assistance with your car purchase.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link
              href="/cars"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C8102E] hover:bg-[#A50D25] text-white text-[11px] tracking-[0.2em] uppercase font-bold rounded-[2px] transition-colors duration-150"
            >
              Browse Available Cars
              <ChevronRight size={13} strokeWidth={2.5} />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1DAA57] text-white text-[11px] tracking-[0.2em] uppercase font-bold rounded-[2px] transition-colors duration-150"
            >
              <WhatsAppIcon size={14} className="text-white" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact info strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <WhatsAppIcon size={13} className="text-[#25D366]" />
              +81 80-8922-7375
            </span>
            <span className="hidden sm:block h-3 w-px bg-white/20" />
            <span>wazirtrading-pc@outlook.jp</span>
            <span className="hidden sm:block h-3 w-px bg-white/20" />
            <span>Mon–Sat 9AM–6PM JST</span>
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
