import {
  Mail,
  ChevronRight,
  Ship,
  Info,
  FileText,
  ShieldCheck,
  MapPin,
  PackageCheck,
} from "lucide-react";
import { useMeta } from "@/lib/use-meta";

const NAVY = "var(--brand-navy)";
const RED = "#C8102E";
const WA_LINK =
  "https://wa.me/818089227375?text=Hello%2C%20I%20would%20like%20to%20confirm%20shipping%20options%20for%20a%20Japanese%20vehicle.";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const QUOTE_CHECKS = [
  {
    title: "Ports and route",
    text: "The named departure port and destination port, the proposed route and whether the shipment is direct or includes transshipment.",
  },
  {
    title: "Freight basis",
    text: "Whether freight is prepaid or collect, the amount and currency, who pays origin handling, and what destination terminal costs remain separate.",
  },
  {
    title: "Insurance",
    text: "Whether marine insurance is included, the insurer or policy evidence, insured value, cover, exclusions and any deductible.",
  },
  {
    title: "Schedule",
    text: "The carrier or booking reference when available, estimated departure and arrival dates, and the fact that carrier schedules can change.",
  },
  {
    title: "Documents",
    text: "The exact export and shipping documents that will be supplied for this vehicle and the destination.",
  },
  {
    title: "Exclusions",
    text: "Customs clearance, import duty, tax, inspection, registration, storage, port handling and inland delivery unless specifically included in writing.",
  },
];

export default function ShippingInformationPage() {
  useMeta({
    title: "Shipping Information — Japanese Car Export | Wazir Trading LLC",
    description:
      "Understand Ro-Ro and container shipping, what to confirm in an export quotation, shipping documents and destination charges for Japanese vehicle exports.",
    canonical: "https://www.wazirtradingllc.com/shipping-information",
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ paddingTop: "var(--header-h)" }}>
      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative container mx-auto px-4 md:px-8 py-10 md:py-14 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-[#C8102E]" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C8102E]">
                  Logistics
                </span>
                <span className="h-px w-6 bg-[#C8102E]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Shipping Information
              </h1>
              <p className="text-white/55 text-sm max-w-xl">
                Ro-Ro and container options are considered for each vehicle and destination. Ports,
                carrier, costs and estimated dates are confirmed in the written quotation.
              </p>
            </div>
            <div className="flex gap-4 md:gap-6">
              {[
                { val: "2", label: "Common methods" },
                { val: "Quote", label: "Route confirmation" },
                { val: "Written", label: "Cost details" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-white leading-none">
                    {item.val}
                  </p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wide mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex flex-col sm:flex-row items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mb-7">
          <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-amber-900 text-sm mb-1">
              No live sailing timetable is published on this page
            </h2>
            <p className="text-[13px] text-amber-800 leading-relaxed">
              Carrier schedules and route availability change. Any departure, arrival or transit
              estimate must be checked for the specific vehicle, port and booking. Do not rely on an
              old timetable or a general transit range as a confirmed shipping commitment.
            </p>
          </div>
        </div>

        <section className="mb-8">
          <div className="text-center mb-7">
            <p className="text-[10px] tracking-[0.28em] uppercase font-bold text-[#C8102E] mb-2">
              Shipping methods
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0D1B3E]">
              Methods That May Be Quoted
            </h2>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto mt-2">
              The appropriate method depends on carrier service, vehicle type, destination, sailing
              availability and the written booking terms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <article className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div
                className="px-5 py-4 border-b border-gray-100 flex items-center gap-3"
                style={{ background: "#0D1B3E" }}
              >
                <div className="w-10 h-10 rounded-full bg-[#C8102E]/20 flex items-center justify-center">
                  <Ship size={19} className="text-[#C8102E]" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Ro-Ro (Roll-on / Roll-off)</h3>
                  <p className="text-white/45 text-xs">Vehicle carried on a vessel deck</p>
                </div>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>
                  Where a suitable carrier service is available, a vehicle is driven or moved onto
                  and off the vessel using the carrier’s loading procedures.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <ChevronRight size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    Vehicle eligibility and operating condition must meet carrier requirements.
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    Personal items and additional cargo may be restricted by the carrier and
                    destination.
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    Route, port, sailing and price are confirmed for the particular booking.
                  </li>
                </ul>
              </div>
            </article>
            <article className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div
                className="px-5 py-4 border-b border-gray-100 flex items-center gap-3"
                style={{ background: "#0D1B3E" }}
              >
                <div className="w-10 h-10 rounded-full bg-[#C8102E]/20 flex items-center justify-center">
                  <PackageCheck size={19} className="text-[#C8102E]" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Container Shipping</h3>
                  <p className="text-white/45 text-xs">Vehicle secured inside a container</p>
                </div>
              </div>
              <div className="p-5 space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>
                  Where a suitable container service is available, the vehicle is secured inside a
                  shipping container under the agreed loading and handling arrangement.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <ChevronRight size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    Container size, loading arrangement and vehicle fit must be confirmed.
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    Packing, securing, handling and inspection costs must be identified in the
                    quote.
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
                    Availability, ports, transit route and final cost depend on the booking.
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-7">
          <div
            className="px-5 py-4 border-b border-gray-100 flex items-center gap-3"
            style={{ background: "#0D1B3E" }}
          >
            <div className="w-9 h-9 rounded-full bg-[#C8102E]/20 flex items-center justify-center">
              <FileText size={17} className="text-[#C8102E]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm">
                What to Check in Your Shipping Quotation
              </h2>
              <p className="text-white/45 text-xs">
                Ask for each item to be stated clearly before you approve the order.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {QUOTE_CHECKS.map((item) => (
              <div
                key={item.title}
                className="p-5 border-b border-gray-100 last:border-b-0 sm:[&:nth-child(2n)]:border-b-0 lg:[&:nth-child(2n)]:border-b lg:[&:nth-child(3n)]:border-b-0"
              >
                <h3 className="font-bold text-[#0D1B3E] text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck size={19} className="text-[#C8102E]" />
              <h2 className="font-bold text-[#0D1B3E]">Documents to Confirm</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              The exact document set depends on the vehicle, shipping method, transaction and
              destination requirements. Your written quotation should list what Wazir Trading will
              provide and at what stage.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Depending on the shipment, documents may include a Japanese export certificate,
              commercial invoice and a Bill of Lading once issued. The destination country may
              require additional documents, inspection or certification.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <MapPin size={19} className="text-[#C8102E]" />
              <h2 className="font-bold text-[#0D1B3E]">Destination Responsibilities</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Unless your written contract expressly includes them, destination customs clearance,
              import duty, VAT or other taxes, inspection, compliance, registration, storage, port
              handling and inland delivery are not included in a Japan export price. Confirm import
              eligibility and requirements with your destination’s official authorities before
              purchase.
            </p>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mb-7">
          <Info size={17} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-amber-900 flex-1 leading-relaxed">
            <strong>Important:</strong> This page is general information, not a live schedule or a
            shipping offer. The written quotation and booking documents for your vehicle control the
            actual route, price, services, exclusions and dates.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-white text-[11px] font-bold tracking-wide hover:opacity-90 transition-opacity"
            style={{ background: "#25D366" }}
          >
            <WhatsAppIcon size={13} />
            Ask for a Quote
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div
            className="px-5 py-3 border-b border-gray-100 flex items-center gap-2.5"
            style={{ background: NAVY }}
          >
            <div className="w-0.5 h-4 rounded-full" style={{ background: RED }} />
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80">
              Get in Touch
            </p>
            <p className="text-white/40 text-[11px]">— Shipping enquiries and quotations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                  WhatsApp
                </p>
                <p className="font-bold text-sm text-gray-800 group-hover:text-green-600">
                  +81 80-8922-7375
                </p>
              </div>
              <ChevronRight size={15} className="text-gray-300" />
            </a>
            <a
              href="mailto:wazirtrading-pc@outlook.jp"
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Mail size={17} className="text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                  Email
                </p>
                <p className="font-bold text-sm text-gray-800 truncate group-hover:text-blue-600">
                  wazirtrading-pc@outlook.jp
                </p>
              </div>
              <ChevronRight size={15} className="text-gray-300" />
            </a>
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C8102E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
                  Business Hours
                </p>
                <p className="font-bold text-sm text-gray-800">Mon – Sat</p>
                <p className="text-[11px] text-gray-400">9:00 AM – 6:00 PM · Japan Standard Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
