import React, { useEffect, useState, useMemo } from 'react';
import { ChevronDown, Search, Phone, Mail, X } from 'lucide-react';
import { useMeta } from '@/lib/use-meta';
import { Link } from 'wouter';

// ─── FAQPage structured data (semantic content markup) ───────────────────────

/** Recursively extracts plain text from a ReactNode for JSON-LD answers. */
function reactNodeToText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToText).join(' ');
  if (React.isValidElement(node)) {
    return reactNodeToText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

/** Structured data for the FAQ content. Reused by SSR and client navigation. */
export function buildFaqStructuredData(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: reactNodeToText(faq.answer).replace(/\s+/g, ' ').trim(),
      },
    })),
  };
}

/** Keeps the FAQ schema present for client-side Wouter navigation as well. */
function useFaqJsonLd() {
  useEffect(() => {
    const data = buildFaqStructuredData();
    const existing = Array.from(
      document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
    ).find((script) => {
      try {
        const value = JSON.parse(script.textContent || '{}') as { '@type'?: unknown };
        return value['@type'] === 'FAQPage';
      } catch {
        return false;
      }
    });
    const script = existing ?? document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld';
    script.textContent = JSON.stringify(data);
    if (!existing) document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);
}


// ─── Data ────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Buying Process' | 'Payment' | 'Shipping' | 'General' | 'Auction';

interface FaqItem {
  id: number;
  category: Exclude<Category, 'All'>;
  question: string;
  answer: React.ReactNode;
}

const FAQS: FaqItem[] = [
  // ── Buying Process ──
  {
    id: 1,
    category: 'Buying Process',
    question: 'How can I start buying cars from Wazir Trading LLC?',
    answer: (
      <div className="space-y-3">
        <p>Follow these 5 simple steps:</p>
        <ol className="space-y-2">
          {[
            'Search your desired vehicle on our website',
            'Click Inquire Now or contact us on WhatsApp',
            'Receive your Proforma Invoice from us',
            'Make payment via Telegraphic Transfer to our Japan bank account only',
            'We arrange shipment and send you Bill of Lading',
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C8102E] text-white text-[11px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-gray-500 mt-2">
          Visit our <Link href="/how-it-works" className="text-[#C8102E] underline underline-offset-2">How To Buy</Link> page for full details.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    category: 'Buying Process',
    question: 'Who can buy cars from Wazir Trading?',
    answer: 'Buyers can contact Wazir Trading from different countries. Before discussing a purchase, ask us to confirm whether a vehicle and shipping option can be offered for your destination. You are responsible for checking local import, registration and road-use requirements with the relevant authorities.',
  },
  {
    id: 3,
    category: 'Buying Process',
    question: 'How many cars do you have available?',
    answer: 'Our website shows the current inventory records that are ready to review. If you need a vehicle that is not listed, send us the make, model, destination, and requirements so we can tell you what sourcing options are available.',
  },
  {
    id: 4,
    category: 'Buying Process',
    question: 'Can I cancel my purchase order?',
    answer: 'Cancellation, refunds and any costs depend on the signed sale terms, the stage of the transaction and applicable law. Ask for the specific cancellation and refund terms in writing before paying, and contact the company promptly if you need to discuss a change.',
  },
  {
    id: 5,
    category: 'Buying Process',
    question: 'Do you help find specific cars not listed on your website?',
    answer: 'Use the vehicle request form on the homepage or contact us with your make, model, year range, budget and destination. We will review the request and confirm whether a sourcing option can be offered. Availability, source, fees and timing are not guaranteed until confirmed in writing.',
  },

  // ── Payment ──
  {
    id: 6,
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: (
      <div className="space-y-3">
        <p>The current payment information page describes bank-to-bank Telegraphic Transfer (TT) to the company’s Japan business account. The current Proforma Invoice or signed sale agreement must state the beneficiary, account details, currency, amount and due date for your transaction.</p>
        <p>Do not rely on this FAQ or an email alone as authority to transfer funds. Independently verify the beneficiary and account details using the contact information published on this website before every payment. If any detail differs or changes unexpectedly, stop and contact the company by a phone number you obtained independently.</p>
        <p><Link href="/payment-information" className="text-[#C8102E] underline underline-offset-2">Read the payment information and published bank reference</Link> before proceeding.</p>
      </div>
    ),
  },
  {
    id: 7,
    category: 'Payment',
    question: 'Who covers the bank transfer fees?',
    answer: 'Sending, intermediary and receiving bank fees can vary. Ask your bank for its charges and check the written quotation or invoice to see which transfer-related costs are included or payable separately.',
  },
  {
    id: 8,
    category: 'Payment',
    question: 'Is there a registration or hidden fee?',
    answer: 'Do not assume that every possible cost is included in the vehicle price. Ask for a written quotation that itemizes the vehicle price, price basis, freight, insurance, export or handling fees if any, and all known exclusions before paying. Destination customs duty, taxes, registration, storage and inland transport may be separate.',
  },
  {
    id: 9,
    category: 'Payment',
    question: 'What additional charges apply after the car price?',
    answer: (
      <div className="space-y-2">
        {[
          ['FOB price', 'You pay freight, clearance, import duty, registration, and compliance fees in your country.'],
          ['C&F price', 'Freight is included, you pay remaining charges.'],
          ['CIF price', 'Freight and insurance included, you pay remaining charges.'],
        ].map(([term, desc]) => (
          <div key={term as string} className="flex gap-3">
            <span className="flex-shrink-0 px-2 py-0.5 bg-[#C8102E]/10 text-[#C8102E] text-[11px] font-bold rounded self-start mt-0.5">{term}</span>
            <span>{desc}</span>
          </div>
        ))}
      </div>
    ),
  },

  // ── Shipping ──
  {
    id: 10,
    category: 'Shipping',
    question: 'How long does delivery take?',
    answer: 'There is no single delivery time for every destination. Carrier schedules, vessel routing, booking availability, transshipment, port operations and customs affect timing. Request the current estimated schedule for your specific vehicle and destination in writing; estimates can change.',
  },
  {
    id: 11,
    category: 'Shipping',
    question: 'What shipping methods do you offer?',
    answer: 'Ro-Ro and container methods may be quoted where a carrier offers a suitable service for the vehicle and destination. Availability, cost, handling, port and timing are confirmed for each shipment. Do not assume one method is always faster or cheaper.',
  },
  {
    id: 12,
    category: 'Shipping',
    question: 'Do you ship to my country?',
    answer: 'The website does not publish a live carrier schedule. Contact us with the vehicle reference and destination so the route, ports, method and current availability can be checked before you commit.',
  },
  {
    id: 13,
    category: 'Shipping',
    question: 'How do I track my shipment?',
    answer: (
      <div className="space-y-2">
        <p>Once your car is shipped we send you:</p>
        <ul className="space-y-1.5">
          {[
            'The shipment or booking reference available for the transaction',
            'Carrier, vessel or voyage information when provided',
            'The estimated arrival information supplied by the carrier',
            'Bill of Lading or other transport document once issued',
            'The export and shipping documents listed in your written agreement',
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[#C8102E] font-bold flex-shrink-0 mt-0.5">–</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 14,
    category: 'Shipping',
    question: 'What documents do I receive after purchase?',
    answer: 'The documents for each order must be listed in the written quotation or sale agreement. Depending on the transaction and carrier, export documentation may include a Japanese export certificate, commercial invoice and a Bill of Lading once issued. Your destination may require additional documents, inspections or certifications; verify these with the relevant authorities before purchase.',
  },

  // ── Auction ──
  {
    id: 15,
    category: 'Auction',
    question: 'How does the Japanese auction process work?',
    answer: 'If you request a vehicle that is not in current stock, ask whether a sourcing route can be arranged for your requirements. Any auction access, bidding arrangement, fees, conditions and timing must be confirmed in writing for that request. Do not assume direct membership or access to a particular auction house.',
  },
  {
    id: 16,
    category: 'Auction',
    question: 'What do auction grades mean?',
    answer: (
      <div className="space-y-2">
        <p>Auction grading systems and notations can differ between auction houses and record providers. A grade is not a guarantee or a complete description of the vehicle. Review the original sheet, inspector comments, condition map and any available photographs together. Ask for an explanation of unclear marks before deciding.</p>
        <div className="space-y-1.5">
          {[
            ['Grade 5 / 5A', 'Excellent condition, like new, very low mileage', '#16a34a'],
            ['Grade 4.5', 'Very good condition, minor wear only', '#65a30d'],
            ['Grade 4', 'Good condition, small scratches or minor issues', '#ca8a04'],
            ['Grade 3.5', 'Average condition, some visible wear', '#ea580c'],
            ['Grade 3', 'Fair condition, noticeable wear or minor damage', '#dc2626'],
          ].map(([grade, desc, color]) => (
            <div key={grade as string} className="flex gap-3 items-start">
              <span
                className="flex-shrink-0 px-2 py-0.5 text-white text-[11px] font-bold rounded"
                style={{ backgroundColor: color as string }}
              >
                {grade}
              </span>
              <span className="text-sm">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 17,
    category: 'Auction',
    question: 'How can I know the right bidding price for a vehicle?',
    answer: 'Auction results and historical prices are not guaranteed to be available for every model or request. Ask what comparable evidence can be supplied for the specific vehicle and how recent it is before relying on a suggested budget.',
  },

  // ── General ──
  {
    id: 18,
    category: 'General',
    question: 'Do you inspect cars before shipping?',
    answer: 'Check the individual listing to see whether an auction sheet, condition diagram or inspection record is included. The website does not represent that every vehicle has an independent third-party inspection. Ask whether an additional inspection can be arranged, what it covers and who pays before purchase.',
  },
  {
    id: 19,
    category: 'General',
    question: 'Can I get Left Hand Drive (LHD) cars?',
    answer: 'Tell us the make, model, year range and destination. We will review whether a suitable vehicle or sourcing option can be offered. Availability, source, costs and timing must be confirmed for the specific request.',
  },
  {
    id: 20,
    category: 'General',
    question: 'What is FOB price vs C&F price?',
    answer: (
      <div className="space-y-2">
        {[
          ['FOB', 'The quotation should identify the named Japanese port and the agreed Incoterms rule and edition. Confirm the point at which delivery and risk transfer occur, and which onward costs remain yours.'],
          ['CFR / C&F', 'The seller arranges and pays the stated freight to the named destination port under the agreed rule. Confirm the exact port, charges included and the applicable risk-transfer point.'],
          ['CIF', 'The seller arranges the stated freight and minimum insurance cover required by the applicable CIF rule to the named destination port. Ask for the policy details, coverage, exclusions and any additional cover required.'],
        ].map(([term, desc]) => (
          <div key={term as string} className="space-y-0.5">
            <div className="text-[#C8102E] font-semibold text-sm">{term}</div>
            <div className="text-sm text-gray-600 pl-3 border-l-2 border-gray-200">{desc}</div>
          </div>
        ))}
        <p className="text-xs text-gray-500">These short labels are not enough on their own. The written quotation should state the full rule, named port and edition, plus all included and excluded charges.</p>
      </div>
    ),
  },
  {
    id: 21,
    category: 'General',
    question: 'How do I contact Wazir Trading?',
    answer: (
      <div className="space-y-2">
        <p>You can reach us through:</p>
        <ul className="space-y-1.5 text-sm">
          <li><span className="font-semibold">WhatsApp:</span> +81 80-8922-7375 <span className="text-[#C8102E] text-xs">(fastest)</span></li>
          <li><span className="font-semibold">Phone:</span> 050-3740-8980</li>
          <li><span className="font-semibold">Email:</span> wazirtrading-pc@outlook.jp</li>
        </ul>
        <p className="text-sm text-gray-500">Published business hours: Monday–Saturday, 9:00 AM–6:00 PM Japan Standard Time. Please allow for public holidays and time-zone differences.</p>
      </div>
    ),
  },
];

const CATEGORIES: Category[] = ['All', 'Buying Process', 'Payment', 'Shipping', 'General', 'Auction'];

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionFaq({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border border-gray-200 rounded-[4px] overflow-hidden transition-all duration-200 ${
        isOpen ? 'border-l-4 border-l-[#C8102E] shadow-sm' : 'border-l-4 border-l-transparent hover:border-l-gray-300'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors duration-150"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#0D1B3E] text-[15px] leading-snug">{faq.question}</span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          className={`flex-shrink-0 text-[#C8102E] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FaqsPage() {
  useFaqJsonLd();
  useMeta({
    title: 'FAQs — Japanese Car Import Questions Answered | Wazir Trading LLC',
    description: 'Answers to common questions about buying, shipping, and paying for Japanese used cars through Wazir Trading LLC.',
    canonical: 'https://www.wazirtradingllc.com/faqs',
  });
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let items = FAQS;
    if (activeCategory !== 'All') {
      items = items.filter((f) => f.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          (typeof f.answer === 'string' && f.answer.toLowerCase().includes(q))
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setOpenId(null);
  };

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello, I have a question about Wazir Trading LLC.')}`;

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 'var(--header-h)' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[#0D1B3E] text-white py-20 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(200,16,46,0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(200,16,46,0.06) 0%, transparent 50%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.012) 40px,
              rgba(255,255,255,0.012) 41px
            )
          `,
        }}
      >
        {/* Subtle grid overlay */}
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

        <div className="relative container mx-auto px-4 md:px-8 text-center max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-[#C8102E]" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-[#C8102E]">
              Support
            </span>
            <span className="h-px w-8 bg-[#C8102E]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-[#C8102E] text-xl font-semibold mb-3">
            Got Questions? We Have Answers!
          </p>
          <p className="text-white/60 text-base leading-relaxed max-w-xl mx-auto">
            Find answers to the most commonly asked questions about our services,
            processes, and policies.
          </p>
        </div>
      </section>

      {/* ── Search ────────────────────────────────────────────────────────── */}
      <div className="bg-[#0D1B3E] pb-6">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenId(null);
              }}
              className="w-full pl-10 pr-4 py-3.5 rounded-[4px] bg-white border border-white/10 text-[#0D1B3E] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/40 shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
                aria-label="Clear search"
              >
                <X size={15} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? FAQS.length : FAQS.filter((f) => f.category === cat).length;
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-[4px] text-[11px] tracking-[0.15em] uppercase font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#C8102E] text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900'
                  }`}
                >
                  {cat}
                  <span
                    className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${
                      active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count when searching */}
          {searchQuery && (
            <p className="text-sm text-gray-500 mb-5">
              {filtered.length === 0
                ? 'No FAQs match your search.'
                : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${searchQuery}"`}
            </p>
          )}

          {/* Accordion list */}
          {filtered.length > 0 ? (
            <div className="space-y-2.5">
              {filtered.map((faq) => (
                <AccordionFaq
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Search size={36} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-gray-600 mb-1">No matching FAQs</p>
              <p className="text-sm">Try a different search term or browse all categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom Contact Section ─────────────────────────────────────────── */}
      <section className="py-16 bg-[#0D1B3E]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Still Have Questions? Let's Talk!
          </h2>
          <p className="text-white/60 mb-10 max-w-md mx-auto">
            For further inquiries contact us through WhatsApp for the fastest response.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phone */}
            <a
              href="tel:+81508089227375"
              className="group bg-white/5 border border-white/10 rounded-[6px] p-6 flex flex-col items-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-[#C8102E]/15 flex items-center justify-center group-hover:bg-[#C8102E]/25 transition-colors">
                <Phone size={20} className="text-[#C8102E]" />
              </div>
              <div>
                <div className="text-white/50 text-[11px] uppercase tracking-widest font-semibold mb-1">Phone</div>
                <div className="text-white font-semibold">+81 80-8922-7375</div>
              </div>
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

            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#25D366]/10 border border-[#25D366]/30 rounded-[6px] p-6 flex flex-col items-center gap-3 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                <WhatsAppIcon size={22} className="text-[#25D366]" />
              </div>
              <div className="text-center">
                <div className="text-[#25D366]/70 text-[11px] uppercase tracking-widest font-semibold mb-1">WhatsApp</div>
                <div className="text-white font-semibold">+81 80-8922-7375</div>
              </div>
              <span className="mt-1 px-4 py-1.5 bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider rounded-[2px] group-hover:bg-[#1DAA57] transition-colors">
                Chat Now
              </span>
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
