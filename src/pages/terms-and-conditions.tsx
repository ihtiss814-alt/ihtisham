import { Link } from "wouter";
import { FileText, ShieldCheck, AlertTriangle } from "lucide-react";
import { useMeta } from "@/lib/use-meta";

export default function TermsAndConditionsPage() {
  useMeta({
    title: "Website Terms & Vehicle Purchase Conditions | Wazir Trading LLC",
    description:
      "General website use and Japanese used vehicle purchase information, including listing accuracy, quotations, payment, shipping and import responsibilities.",
    canonical: "https://www.wazirtradingllc.com/terms-and-conditions",
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ paddingTop: "var(--header-h)" }}>
      <section className="relative overflow-hidden" style={{ background: "#0D1B3E" }}>
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
            Policies
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Terms &amp; Conditions</h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            General information about using this website and enquiring about Japanese used vehicles.
            The transaction-specific Proforma Invoice and signed sale agreement govern an actual
            purchase.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-8 md:py-12 space-y-5">
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 leading-relaxed">
            This page is general website information, not a substitute for a vehicle-specific
            quotation, signed contract or legal advice. If a term in a signed transaction document
            conflicts with this general page, ask the company to clarify the written agreement
            before payment. Mandatory rights under applicable law are not excluded.
          </p>
        </div>

        {[
          [
            "1. Business and contact",
            "This website identifies the operator as Wazir Trading LLC, with a published business contact address in Kuwana, Mie, Japan. Official contact details are shown on the Contact page. The website does not represent that it has physical offices in every destination country.",
          ],
          [
            "2. Vehicle listings and availability",
            "Vehicle pages are provided to help buyers review a listing record. Availability, price, mileage, specifications, photographs, condition notes, auction records and included equipment must be confirmed for the specific vehicle before purchase. A web enquiry or viewing a listing does not reserve the vehicle or create a purchase contract. Inventory may change without notice.",
          ],
          [
            "3. Vehicle condition and inspection records",
            "Information shown on a vehicle page is limited to the fields and records available for that listing. Auction grades and condition marks can vary by source and should be read with the original sheet, comments, diagrams and photographs where available. A grade is not a warranty or a substitute for an agreed inspection. Ask in advance whether further inspection can be arranged and what it costs.",
          ],
          [
            "4. Price, Incoterms and quotations",
            "The displayed vehicle price may be shown on an FOB Japan basis. It is not automatically a delivered, duty-paid or registered price. The current written quotation must identify the currency, agreed price basis, named port and Incoterms rule/edition where used. It must also state what is included and excluded. Freight, insurance, export handling, destination port charges, customs clearance, duties, taxes, inspection, storage, registration and inland delivery are separate unless the transaction document expressly includes them.",
          ],
          [
            "5. Payment",
            "The website currently states that payment is by bank-to-bank Telegraphic Transfer to the company’s Japan business bank account. The amount, currency, beneficiary, payment reference, deposit (if any) and due dates are governed by the current Proforma Invoice or signed sale agreement; no universal deposit split or discount is promised on this page. Buyers should independently verify bank details through the contact information published on this website before every transfer. Do not pay a personal account or an intermediary based only on a message.",
          ],
          [
            "6. Shipping and delivery",
            "Ro-Ro or container service may be considered where a carrier offers a suitable option for the vehicle and destination. Route, port, carrier, freight basis, insurance, schedule and document scope must be confirmed in the written quotation and booking documents. General website text is not a live sailing schedule. Departure and arrival estimates can change because of carrier schedules, port operations, weather, transshipment, congestion and customs processing.",
          ],
          [
            "7. Import and destination requirements",
            "The buyer is responsible for checking whether the vehicle is eligible for import, registration and road use in the destination country, including vehicle-age limits, steering side, emissions, safety, inspection, standards, customs requirements, duties and taxes. The buyer should use current official government and customs sources or qualified local advisers. Unless the written agreement says otherwise, local import clearance and destination costs are the buyer’s responsibility.",
          ],
          [
            "8. Documents and claims",
            "The documents supplied for a transaction are the documents identified in its written quotation or sale agreement and actually issued by the relevant exporter, carrier or authority. The buyer should check documents and vehicle condition promptly at destination and follow carrier, terminal and insurer notification procedures and deadlines for damage or discrepancies.",
          ],
          [
            "9. Cancellation, refunds and costs",
            "Cancellation, refund, storage, resale, bank, inspection and third-party costs depend on the signed transaction terms, the stage of the transaction and applicable law. Ask for the specific cancellation and refund terms in writing before paying. This website does not promise a universal cancellation period or refund outcome.",
          ],
          [
            "10. Website content and availability",
            "We aim to keep website information useful and current, but listings and general content may be incomplete, delayed or changed. The website is provided for information and enquiry purposes. It does not guarantee uninterrupted availability, a particular vehicle, shipping route or service.",
          ],
          [
            "11. Privacy",
            "Information submitted through enquiry forms is handled as described in the Privacy Policy. Please do not submit bank passwords, identity credentials or other sensitive financial access information through website forms or messaging.",
          ],
          [
            "12. Applicable agreement and law",
            "The governing law, dispute forum and any transaction-specific conditions should be identified in the signed sale agreement or other binding transaction document. Nothing on this general website page removes a right that cannot lawfully be excluded.",
          ],
        ].map(([heading, text]) => (
          <section
            key={heading}
            className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm"
          >
            <h2 className="font-bold text-[#0D1B3E] text-base mb-2">{heading}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
          </section>
        ))}

        <section className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={18} className="text-[#C8102E]" />
            <h2 className="font-bold text-[#0D1B3E]">Questions about a transaction?</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Ask for written clarification before you approve an invoice or transfer funds. Read the{" "}
            <Link href="/buyer-information" className="text-[#C8102E] underline">
              Buyer Information
            </Link>{" "}
            and{" "}
            <Link href="/payment-information" className="text-[#C8102E] underline">
              Payment Information
            </Link>{" "}
            pages, or{" "}
            <Link href="/contact" className="text-[#C8102E] underline">
              contact Wazir Trading
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
