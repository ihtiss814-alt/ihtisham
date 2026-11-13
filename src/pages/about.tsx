import React from "react";
import { Link } from "wouter";
import { Shield, Award, Clock, Globe, Building2, MapPin } from "lucide-react";
import { useMeta } from "@/lib/use-meta";
import ShippingRouteCanvas from "@/components/ShippingRouteCanvas";
import { useReveal } from "@/hooks/useReveal";
import { buildWhatsAppHref } from "@/lib/whatsapp-enquiries";

const operatingInformation = [
  {
    name: "Japan Business Base",
    location: "Kuwana, Mie, Japan",
    role: "Published company contact address",
  },
  {
    name: "Vehicle Listing Records",
    location: "Reference and specifications shown on each vehicle page",
    role: "Review the record and confirm details before purchase",
  },
  {
    name: "Written Export Quotation",
    location: "Prepared for the specific vehicle and destination enquiry",
    role: "Price basis, included items, exclusions and payment milestones",
  },
  {
    name: "Shipping Enquiry",
    location: "Discuss route, method and destination details for a specific vehicle",
    role: "Confirm the current carrier schedule and document scope in writing before booking",
  },
];

export default function AboutPage() {
  useMeta({
    title: "About Us | Wazir Trading LLC — Japanese Car Exporters",
    description:
      "Learn how Wazir Trading LLC helps buyers review Japanese used vehicle listings, understand export steps, and request shipping information.",
    canonical: "https://www.wazirtradingllc.com/about",
  });
  const story = useReveal<HTMLDivElement>();
  const values = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background" style={{ paddingTop: "var(--header-h)" }}>
      {/* Hero Section */}
      <section
        className="text-white py-24 relative overflow-hidden"
        style={{ background: "var(--brand-navy)" }}
      >
        {/* Illustrative navigation graphic; no active route or shipping coverage is implied. */}
        <div className="absolute inset-0 z-0">
          <ShippingRouteCanvas className="w-full h-full" />
          {/* Scrim over the left half only, where the headline sits. The route
              strokes are already low-alpha, so the right side needs no cover. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, var(--brand-navy) 0%, rgba(13,27,62,0.90) 28%, rgba(13,27,62,0.45) 62%, rgba(13,27,62,0.10) 100%)",
            }}
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="mb-5 inline-flex max-w-xl border border-white/20 bg-black/20 px-3 py-2 text-[11px] leading-5 text-white/65">
            Illustrative route graphic only — not a live service-area map, confirmed carrier route
            or sailing schedule.
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Driven by Excellence. Sourced in Japan.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Wazir Trading LLC helps buyers review Japanese used vehicle listings and request
              export information from its Japan-based operation.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div
            ref={story.ref}
            className={`reveal ${story.revealed ? "is-revealed" : ""} flex flex-col md:flex-row gap-16 items-center`}
          >
            <div className="md:w-1/2 w-full">
              <div className="relative flex min-h-[420px] h-full flex-col justify-between overflow-hidden border border-border bg-[#0D1B3E] p-8 text-white shadow-2xl md:p-10">
                <div
                  className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -right-4 -top-4 h-40 w-40 rounded-full border border-white/10"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                    <MapPin size={23} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                      Published business contact address
                    </p>
                    <p className="font-semibold text-white">Kuwana, Mie, Japan</p>
                  </div>
                </div>
                <div className="relative z-10 my-12">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F2A8B5]">
                    Japan business base
                  </p>
                  <h3 className="max-w-md font-serif text-3xl font-bold leading-tight md:text-4xl">
                    A real point of contact, with clear next steps.
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
                    Heights Mizutani 1C, 158-1 Jizou, Kuwana-City, Mie-Pref, Japan. Office visits
                    are by appointment only.
                  </p>
                </div>
                <div className="relative z-10 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-white/60">
                    Vehicle and destination details are confirmed per enquiry.
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    View contact details
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">What we do</h2>
              <div className="w-12 h-1 bg-primary mb-8"></div>

              <p className="text-muted-foreground leading-relaxed">
                Wazir Trading LLC helps buyers review Japanese used vehicle listings and request
                export information from its Japan-based operation.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Buying a used vehicle from Japan involves reviewing the available vehicle record,
                confirming the terms of sale, and checking the shipping and import requirements for
                the destination. We keep those steps connected to the listing and inquiry process.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Vehicle pages show the available reference, specifications, images, and pricing
                fields for each listing. Buyers can contact us to confirm availability, shipping
                options, and the documents required for their destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO / Leadership */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div
            className="max-w-6xl mx-auto overflow-hidden border border-border shadow-xl"
            style={{ background: "var(--brand-navy)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12 lg:p-14 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4">
                  Leadership
                </p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-3">
                  Meet Our CEO
                </h2>
                <div className="w-12 h-1 bg-primary mb-6" />
                <h3 className="text-2xl font-semibold mb-1">Mr. Mumtaz Khan</h3>
                <p className="text-sm uppercase tracking-[0.16em] text-white/65 font-semibold mb-6">
                  Chief Executive Officer
                </p>
                <p className="text-white/80 leading-relaxed">
                  Wazir Trading LLC helps buyers navigate Japanese vehicle listings, understand
                  export details, and explore shipping information. Mr. Mumtaz Khan leads the
                  company as Chief Executive Officer.
                </p>
              </div>
              <div className="relative min-h-[300px] sm:min-h-[380px] md:min-h-[440px] bg-black/10">
                <img
                  src="/images/mumtaz-khan-ceo.webp"
                  alt="Mr. Mumtaz Khan, Chief Executive Officer of Wazir Trading LLC, seated in his office"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  width="1448"
                  height="1086"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Commitment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The information buyers can review before making a decision.
            </p>
          </div>

          <div
            ref={values.ref}
            className={`reveal ${values.revealed ? "is-revealed" : ""} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`}
          >
            <ValueCard
              icon={<Shield />}
              title="Vehicle-specific details"
              desc="Compare the reference, photographs and specification fields recorded on the individual listing."
            />
            <ValueCard
              icon={<Award />}
              title="Written terms"
              desc="Ask for a written quotation that names the vehicle, currency, price basis, inclusions, exclusions and payment milestones."
            />
            <ValueCard
              icon={<Globe />}
              title="Destination checks"
              desc="Confirm route, carrier, import rules and destination-side costs for the specific vehicle before committing."
            />
            <ValueCard
              icon={<Clock />}
              title="Direct contact"
              desc="Use the published Japan contact details or send a vehicle and destination enquiry through the website."
            />
          </div>
        </div>
      </section>

      {/* Company operating information */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
              Company information
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Japan Base. Clear Transaction Details.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our published business contact address is in Japan. Vehicle availability, sourcing
              options, payment milestones and shipping arrangements are confirmed in writing for
              each enquiry.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {operatingInformation.map((office, index) => (
              <div
                key={office.name}
                className={`relative bg-card border p-6 md:p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                  index === 0 ? "border-primary/50" : "border-border"
                }`}
              >
                {index === 0 && (
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-primary font-bold">
                    BASE
                  </span>
                )}
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Building2 size={21} />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">{office.name}</h3>
                <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin size={15} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>{office.location}</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">
                  {office.role}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-card border border-border p-8 md:p-12 shadow-sm text-center">
            <h3 className="text-xl font-bold mb-1">Japan Business Address</h3>
            <p className="text-muted-foreground mb-1 text-sm">
              Heights Mizutani 1C, 158-1 Jizou, Kuwana-City, Mie-Pref, Japan
            </p>
            <p className="text-xs text-muted-foreground/60 mb-8">Visits by appointment only</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="uppercase tracking-widest text-xs text-primary font-bold mb-2">
                  Buyer Enquiries
                </div>
                <p className="text-muted-foreground">
                  Tell us the vehicle and destination you have in mind. We will confirm what can be
                  offered before you commit.
                </p>
              </div>
              <div>
                <div className="uppercase tracking-widest text-xs text-primary font-bold mb-2">
                  Vehicle Sourcing
                </div>
                <p className="text-muted-foreground">
                  For a vehicle not shown in current stock, send your requirements. Any sourcing
                  route, availability, fees and timing must be confirmed in a written quotation.
                </p>
              </div>
              <div>
                <div className="uppercase tracking-widest text-xs text-primary font-bold mb-2">
                  Shipping Details
                </div>
                <p className="text-muted-foreground">
                  The proposed method, departure and destination ports, carrier schedule, freight
                  and included documents are identified for each confirmed shipment.
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3265.8895035567575!2d136.6993446757601!3d35.05950157279439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDAzJzM0LjIiTiAxMzbCsDQyJzA2LjkiRQ!5e0!3m2!1sen!2sus!4v1785990086147!5m2!1sen!2sus"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Wazir Trading LLC — Japan Office Location"
            />
            <div className="mt-6 flex flex-col items-center justify-between gap-4 border border-border bg-card p-5 sm:flex-row">
              <div>
                <h3 className="font-semibold text-foreground">Contact the Japan office</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  WhatsApp is the direct enquiry route. Office visits are by appointment only.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <a
                  href={buildWhatsAppHref("Hello Wazir Trading LLC. I would like to contact your Japan office.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:opacity-90"
                >
                  WhatsApp the team
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Heights%20Mizutani%201C%2C%20158-1%20Jizou%2C%20Kuwana-City%2C%20Mie-Pref%2C%20Japan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Open address in Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-colors">
      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
        {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 28 })}
      </div>
      <h3 className="text-xl font-serif font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
