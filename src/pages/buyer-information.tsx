import { Link } from "wouter";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  ShieldCheck,
  Ship,
  CarFront,
  MapPin,
} from "lucide-react";
import { useMeta } from "@/lib/use-meta";

const NAVY = "#0D1B3E";
const RED = "#C8102E";

const CHECKS = [
  {
    title: "Vehicle identity and status",
    text: "Record the reference number, make, model, year, variant and the current availability status. Ask Wazir Trading to reconfirm availability before sending money.",
  },
  {
    title: "Condition evidence",
    text: "Review every photograph and specification shown. Ask whether an auction sheet, condition map, service record or independent inspection is available. A grade alone is not a guarantee of condition.",
  },
  {
    title: "Mileage and specifications",
    text: "Confirm the mileage source and the fields that matter to you, including engine, transmission, fuel, drive, equipment and any known damage or repairs.",
  },
  {
    title: "Price and Incoterm",
    text: "The written quotation should state currency, price basis, named port and the agreed Incoterms rule and edition where used. Make sure all included and excluded costs are explicit.",
  },
  {
    title: "Shipping and documents",
    text: "Confirm proposed shipping method, departure and destination ports, freight basis, insurance if any, estimated schedule and the documents that will actually be issued.",
  },
  {
    title: "Import requirements",
    text: "Check vehicle age, steering side, emissions, safety, inspection, customs, duty, tax, registration and road-use requirements with the official authorities in your destination.",
  },
];

export default function BuyerInformationPage() {
  useMeta({
    title: "Buyer Information & Vehicle Purchase Checklist | Wazir Trading LLC",
    description:
      "A practical checklist for reviewing Japanese used vehicle listings, export quotations, payment instructions, shipping scope and destination import requirements.",
    canonical: "https://www.wazirtradingllc.com/buyer-information",
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ paddingTop: "var(--header-h)" }}>
      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-4xl text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C8102E] mb-3">
            Buyer Guide
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Buyer Information</h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            Use this checklist to understand the vehicle record, written price, shipping scope,
            documents and payment instructions before committing to a purchase.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8 md:py-12">
        <section className="bg-white border border-gray-200 rounded-xl p-5 md:p-7 shadow-sm mb-7">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C8102E]/10 flex items-center justify-center shrink-0">
              <CarFront size={19} className="text-[#C8102E]" />
            </div>
            <div>
              <h2 className="font-bold text-[#0D1B3E] text-lg mb-1">Who you are dealing with</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                The website identifies the business as <strong>Wazir Trading LLC</strong> and
                publishes its Japan business address as Heights Mizutani 1C, 158-1 Jizou,
                Kuwana-City, Mie-Prefecture, Japan. Contact the company using the phone, WhatsApp
                and email shown on the{" "}
                <Link href="/contact" className="text-[#C8102E] underline">
                  Contact page
                </Link>
                . Visits are by appointment only. The website does not publish physical overseas
                branch addresses.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="text-center mb-7">
            <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#C8102E] mb-2">
              Before You Buy
            </p>
            <h2 className="text-2xl font-bold text-[#0D1B3E]">Vehicle and Export Checklist</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHECKS.map((item) => (
              <article
                key={item.title}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={17} className="text-[#C8102E]" />
                  <h3 className="font-bold text-[#0D1B3E] text-sm">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-[13px] leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
          <article className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-[#C8102E]" />
              <h2 className="font-bold text-[#0D1B3E]">Your written quotation should state</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
              <li>Vehicle reference and description.</li>
              <li>
                Currency and price basis, including named port and Incoterms edition where
                applicable.
              </li>
              <li>Freight, insurance and origin charges that are included.</li>
              <li>Known exclusions and destination-side costs.</li>
              <li>Payment amount, due dates and the named business beneficiary.</li>
              <li>
                Shipping method, estimated schedule and document list if shipping is included.
              </li>
            </ul>
          </article>
          <article className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={18} className="text-[#C8102E]" />
              <h2 className="font-bold text-[#0D1B3E]">Protect your payment</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
              <li>Pay only according to the current written invoice or signed sale agreement.</li>
              <li>
                Verify the beneficiary and account details independently before every transfer.
              </li>
              <li>
                Never transfer to a personal account or an intermediary based only on a message.
              </li>
              <li>
                If bank details change unexpectedly, stop and call the number published on this
                website.
              </li>
              <li>Keep your invoice, bank receipt and written correspondence.</li>
            </ul>
            <Link
              href="/payment-information"
              className="inline-flex items-center gap-2 text-[#C8102E] font-semibold text-sm mt-4 hover:underline"
            >
              Read payment information
            </Link>
          </article>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-7">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-amber-900 text-sm mb-1">
                Important about destination costs
              </h2>
              <p className="text-amber-900/85 text-sm leading-relaxed">
                A vehicle price or Japan export quotation is not automatically a delivered or
                registered price. Unless expressly included in your written agreement, local customs
                clearance, import duties, VAT or other taxes, destination port charges, inspection,
                storage, registration and inland delivery may remain payable by the buyer. Confirm
                eligibility and local requirements with official authorities before paying.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Ship size={18} className="text-[#C8102E]" />
            <h2 className="font-bold text-[#0D1B3E]">After shipment</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Check the shipment information and documents supplied against your written order. At
            destination, inspect the vehicle and its documents promptly and follow the carrier,
            terminal and insurer procedures and deadlines if you identify damage, shortage or a
            discrepancy. Keep dated photographs and all relevant records.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <Link
              href="/shipping-information"
              className="text-[#C8102E] underline underline-offset-2"
            >
              Shipping information
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-[#C8102E] underline underline-offset-2"
            >
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="text-[#C8102E] underline underline-offset-2">
              Contact Wazir Trading
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
