import React, { useState } from 'react';
import { Link } from 'wouter';
import { useMeta } from '@/lib/use-meta';
import { useReveal } from '@/hooks/useReveal';
import {
  Search, FileText, Landmark, Ship, MapPin,
  Car, ChevronDown, ChevronRight, CheckCircle,
  Zap, ShieldCheck, Package, Star, TrendingDown,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: '01',
    icon: <Search size={22} className="text-[#C8102E]" />,
    title: 'Review a Vehicle Listing',
    description:
      'Browse the current inventory and open the vehicle record you are considering. Check its reference, availability status, photographs, mileage, specifications, price field and any auction or condition information actually shown. Ask us to confirm current availability and any important detail before deciding.',
    extra: null,
  },
  {
    num: '02',
    icon: <FileText size={22} className="text-[#C8102E]" />,
    title: 'Request a Written Quotation',
    description:
      'Contact us with the vehicle reference and destination. Before paying, request a written Proforma Invoice or quotation that identifies the vehicle, currency, price basis and named port where applicable, shipping method, included services, exclusions, required documents and payment milestones.',
    extra: null,
  },
  {
    num: '03',
    icon: <Landmark size={22} className="text-[#C8102E]" />,
    title: 'Verify the Invoice and Payment Details',
    description:
      'The website states that payment is by bank-to-bank Telegraphic Transfer to Wazir Trading LLC’s Japan business account. The amount, due date and any deposit or balance milestone are transaction-specific and must be written in the current invoice or sale agreement. Independently verify beneficiary details using the contact information published on this website before transferring funds.',
    extra: (
      <div className="mt-4 bg-[#0D1B3E] rounded-[4px] px-4 py-3 text-sm space-y-1">
        <div className="text-[#C8102E] text-[11px] font-bold uppercase tracking-widest mb-2">Payment Safety Check</div>
        <p className="text-white/85">Do not send money to a personal account or an intermediary claiming to represent the company.</p>
        <p className="text-white/65">If an invoice or message changes bank details, stop and verify the change by calling the phone or WhatsApp number independently obtained from this website.</p>
        <Link href="/payment-information" className="inline-flex mt-2 text-white underline underline-offset-4">Read payment information</Link>
      </div>
    ),
  },
  {
    num: '04',
    icon: <Ship size={22} className="text-[#C8102E]" />,
    title: 'Confirm Shipping Before Booking',
    description:
      'Ro-Ro or container shipping may be quoted where available for the vehicle and destination. The written quotation should identify the proposed departure and destination ports, freight basis, carrier or booking information when available, insurance if included, estimated schedule and charges that remain payable at destination. No fixed sailing or arrival time is promised by this general guide.',
    extra: null,
  },
  {
    num: '05',
    icon: <MapPin size={22} className="text-[#C8102E]" />,
    title: 'Receive the Agreed Export Documents',
    description:
      'After the agreed transaction and export steps, Wazir Trading will provide the documents identified in your written sale and shipping documents. Depending on the shipment and destination, these may include a Japanese export certificate, commercial invoice and a Bill of Lading once issued. Check your country’s official import, customs, inspection and registration requirements before purchase.',
    extra: null,
  },
];

const BENEFITS = [
  { icon: <Star size={20} className="text-[#C8102E]" />, title: 'Japan Vehicle Listings', desc: 'Review the current stock records and use the reference number when asking about a vehicle.' },
  { icon: <TrendingDown size={20} className="text-[#C8102E]" />, title: 'Written Price Basis', desc: 'Ask for a quotation that states the currency, named port and exactly what the price includes or excludes.' },
  { icon: <CheckCircle size={20} className="text-[#C8102E]" />, title: 'Record-Led Review', desc: 'Use the specifications, images and condition information actually supplied for each vehicle; request clarification where a field is missing.' },
  { icon: <ShieldCheck size={20} className="text-[#C8102E]" />, title: 'Payment Verification', desc: 'Verify the current Proforma Invoice and business beneficiary independently before making a bank transfer.' },
  { icon: <Zap size={20} className="text-[#C8102E]" />, title: 'Shipment by Confirmation', desc: 'The proposed method, route and schedule are confirmed for the particular vehicle and destination.' },
  { icon: <Package size={20} className="text-[#C8102E]" />, title: 'Document Scope in Writing', desc: 'Check which export and shipping documents will be issued for your transaction and destination.' },
];

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'There is no single delivery time for every destination. The proposed carrier, vessel schedule, port sequence, booking date, transshipment and customs process all affect timing. Ask for the current estimated schedule in writing; carrier estimates can change.',
  },
  {
    q: 'What payment method do you accept?',
    a: 'The current website payment policy states bank-to-bank Telegraphic Transfer to the company’s Japan business account. The amount and payment milestones are specific to the written Proforma Invoice or sale agreement. Verify the beneficiary independently before transfer.',
  },
  {
    q: 'Can you source a car not in your stock?',
    a: 'Send the make, model, year range, budget and destination using the contact form. We will review the request and confirm whether a sourcing option, price, fees and timing can be offered. A request does not guarantee that a matching vehicle is available.',
  },
  {
    q: 'Do I need an agent to buy from you?',
    a: 'Contact Wazir Trading using the official phone, WhatsApp or email shown on this website. Do not transfer money to a personal account or an agent unless a specific written agreement from the company expressly identifies that arrangement and you have independently verified it.',
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
        <span className="font-semibold text-[#0D1B3E] text-[15px] leading-snug">{q}</span>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  useMeta({
    title: 'How It Works — Buy a Car from Japan | Wazir Trading LLC',
    description: 'Learn how to select, purchase, pay for, and ship a Japanese used car through Wazir Trading LLC.',
    canonical: 'https://www.wazirtradingllc.com/how-it-works',
  });
  const waLink = `https://wa.me/818089227375?text=${encodeURIComponent('Hello, I am interested in purchasing a Japanese used car from Wazir Trading LLC.')}`;
  const steps    = useReveal<HTMLDivElement>();
  const benefits = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--header-h)' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[#0D1B3E] text-white py-24 overflow-hidden"
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
            A clear process for reviewing a Japanese vehicle listing, agreeing the terms and arranging export where available
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
          <h2 className="text-2xl font-bold text-[#0D1B3E] text-center mb-10">Choose Your Buying Option</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white border-2 border-gray-200 hover:border-[#C8102E]/40 rounded-[6px] p-8 flex flex-col transition-colors duration-200">
              <div className="w-12 h-12 rounded-full bg-[#C8102E]/10 flex items-center justify-center mb-5">
                <Car size={22} className="text-[#C8102E]" />
              </div>
              <h3 className="font-bold text-[#0D1B3E] text-xl mb-3">Purchase from Stock</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                Browse the vehicle records shown in our current inventory. Confirm the listing status, current price and export availability with us before committing.
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
              <h3 className="font-bold text-[#0D1B3E] text-xl mb-3">Source Your Specific Car</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                Tell us your requirements and destination. We will review the request and confirm whether a suitable sourcing option, its costs and timing can be offered.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0D1B3E] hover:bg-[#0D1B3E] text-[#0D1B3E] hover:text-white text-[11px] tracking-[0.18em] uppercase font-bold rounded-[2px] transition-all duration-150 self-start"
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
            <h2 className="text-3xl font-bold text-[#0D1B3E] mb-3">Simple 5 Step Process</h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              From reviewing a vehicle to confirming the agreed export documents for your transaction
            </p>
          </div>

          <div
            ref={steps.ref}
            className={`reveal ${steps.revealed ? 'is-revealed' : ''} relative`}
          >
            {/* Dotted connector line — desktop only */}
            <div className="hidden md:block absolute left-[39px] top-10 bottom-10 w-px border-l-2 border-dashed border-gray-200" />

            <div className="space-y-0">
              {STEPS.map((step, idx) => (
                <div key={step.num} className="relative flex gap-6 md:gap-10">
                  {/* Step number + icon bubble */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="relative z-10 w-[78px] h-[78px] rounded-full bg-[#0D1B3E] border-4 border-white shadow-lg flex flex-col items-center justify-center gap-0.5">
                      <span className="text-[10px] text-white/40 font-bold tracking-widest">{step.num}</span>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-12 ${idx === STEPS.length - 1 ? 'pb-0' : ''}`}>
                    <h3 className="font-bold text-[#0D1B3E] text-xl mt-4 mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                    {step.extra}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Shipping details ───────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0D1B3E] mb-2">Shipping Is Confirmed for Each Order</h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">Do not rely on a general transit-time table. Ask for the proposed route and schedule for your vehicle and destination before approving the quotation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Ports and carrier', text: 'Confirm the named departure port, destination port, carrier or booking details where available, and whether the route is direct or includes transshipment.' },
              { title: 'Freight and insurance', text: 'Check whether freight is prepaid or collect, whether marine insurance is included, the cover provided, and any deductible or exclusions.' },
              { title: 'Arrival and local charges', text: 'Ask which destination terminal, customs, duty, tax, inspection, storage, registration and inland-delivery costs are excluded from the export quotation.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-[6px] p-6 shadow-sm">
                <h3 className="font-bold text-[#0D1B3E] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-5 text-center">Schedules and estimated arrival dates are indicative until confirmed by the carrier. They may change due to vessel schedules, port operations, weather, transshipment or customs processing.</p>
          <div className="text-center mt-6">
            <Link href="/shipping-information" className="inline-flex items-center gap-2 text-[#C8102E] font-semibold text-sm hover:underline">Read shipping information <ChevronRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── Section 4: Payment Terms ───────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-[#0D1B3E] text-center mb-10">Payment Terms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard */}
            <div className="border-2 border-[#C8102E]/20 rounded-[6px] p-7 bg-[#C8102E]/3">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#C8102E]/15 flex items-center justify-center">
                  <Landmark size={18} className="text-[#C8102E]" />
                </div>
                <h3 className="font-bold text-[#0D1B3E] text-lg">Standard Payment</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Payment method: bank-to-bank TT as stated in the current payment policy',
                  'Amount and due dates are set out in the current written invoice or sale agreement',
                  'Verify the beneficiary and all bank details through the website’s published contact channel before transfer',
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
                <h3 className="font-bold text-[#0D1B3E] text-lg">For Multiple Vehicles</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Ask for a vehicle-by-vehicle written quotation',
                  'Any volume pricing or different payment terms must be expressly stated in the quotation',
                  'Do not assume a discount or payment arrangement unless confirmed in writing',
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
          <h2 className="text-2xl font-bold text-[#0D1B3E] text-center mb-10">Why Choose Wazir Trading LLC?</h2>
          <div
            ref={benefits.ref}
            className={`reveal ${benefits.revealed ? 'is-revealed' : ''} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`}
          >
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-gray-200 rounded-[6px] p-6 hover:border-[#C8102E]/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-[#C8102E]/10 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-[#0D1B3E] mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Calculator CTA ──────────────────────────────────────── */}
      <section className="py-16 bg-[#0D1B3E]">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-[#C8102E]" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-[#C8102E]">Pricing</span>
            <span className="h-px w-8 bg-[#C8102E]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Want to Know the Total Cost?</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Use the vehicle calculator as an indicative guide only. Confirm freight, insurance, destination handling, customs, duties, taxes and local charges in the written quotation before making a decision.
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
          <h2 className="text-2xl font-bold text-[#0D1B3E] text-center mb-8">Common Questions</h2>
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
      <section className="py-20 bg-[#0D1B3E]">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            Contact the Japan business office using the phone, WhatsApp or email details published on this website. Ask for written confirmation of vehicle availability, price basis and shipping scope before paying.
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
