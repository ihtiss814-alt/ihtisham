import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import DestinationFields from "@/components/DestinationFields";
import { useDestinationPreference } from "@/hooks/useDestinationPreference";
import { buildWhatsAppHref, openWhatsAppEnquiry } from "@/lib/whatsapp-enquiries";
import { useMeta } from "@/lib/use-meta";
import { useSeoBootstrap } from "@/lib/seo-bootstrap-context";
import { canonicalCountry } from "@/lib/shipping";
import { COUNTRY_LANDING_PAGES, countryLandingPath } from "@/lib/country-landing-pages";

type RequestType = "vehicle" | "sourcing" | "shipping" | "general";
type SubmissionStatus = "idle" | "success" | "error";

interface QuoteForm {
  requestType: RequestType;
  name: string;
  email: string;
  phone: string;
  country: string;
  port: string;
  vehicleRef: string;
  vehicleModel: string;
  budget: string;
  requirements: string;
  consent: boolean;
}

const EMPTY_FORM: QuoteForm = {
  requestType: "sourcing",
  name: "",
  email: "",
  phone: "",
  country: "",
  port: "",
  vehicleRef: "",
  vehicleModel: "",
  budget: "",
  requirements: "",
  consent: false,
};

const REQUEST_TYPES: Array<{ value: RequestType; label: string; detail: string }> = [
  {
    value: "vehicle",
    label: "A vehicle I found",
    detail: "Ask about a specific listing or reference.",
  },
  {
    value: "sourcing",
    label: "Find a vehicle",
    detail: "Tell us the make, model and requirements.",
  },
  {
    value: "shipping",
    label: "Shipping only",
    detail: "Ask whether a route or shipping quote can be offered.",
  },
  {
    value: "general",
    label: "Something else",
    detail: "Ask a payment, process or general question.",
  },
];

const CONTACT_EMAIL = "wazirtrading-pc@outlook.jp";

function guideForCountry(country: string) {
  if (!country) return undefined;
  const key = canonicalCountry(country).toLocaleLowerCase();
  return COUNTRY_LANDING_PAGES.find(
    (item) => canonicalCountry(item.name).toLocaleLowerCase() === key,
  );
}

export default function RequestQuotePage() {
  const [location] = useLocation();
  const bootstrap = useSeoBootstrap();
  const preference = useDestinationPreference();
  const [form, setForm] = useState<QuoteForm>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const search =
    bootstrap?.pathname === "/request-a-quote"
      ? bootstrap.search
      : location.includes("?")
        ? `?${location.split("?")[1]}`
        : "";

  useMeta({
    title: "Request a Japanese Car Export Quote | Wazir Trading LLC",
    description:
      "Send Wazir Trading your vehicle, budget and worldwide destination details. Request a review of availability, route options and a written export quotation.",
    canonical: "https://www.wazirtradingllc.com/request-a-quote",
  });

  useEffect(() => {
    if (!preference.loaded) return;
    const params = new URLSearchParams(search);
    const requestedType = params.get("type");
    const allowedTypes: RequestType[] = ["vehicle", "sourcing", "shipping", "general"];
    const requestType = allowedTypes.includes(requestedType as RequestType)
      ? (requestedType as RequestType)
      : params.get("vehicleRef") || params.get("vehicleModel")
        ? "vehicle"
        : "sourcing";
    setForm((current) => ({
      ...current,
      requestType,
      country: params.get("country") || current.country || preference.country,
      port: params.get("port") || current.port || preference.port,
      vehicleRef: params.get("vehicleRef") || current.vehicleRef,
      vehicleModel: params.get("vehicleModel") || current.vehicleModel,
    }));
  }, [location, preference.loaded, preference.country, preference.port, search]);

  const countryGuide = useMemo(() => guideForCountry(form.country), [form.country]);
  const setField = <K extends keyof QuoteForm>(key: K, value: QuoteForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrorMessage("");
  };
  const changeCountry = (country: string) => {
    setField("country", country);
    setField("port", "");
    preference.setDestination({ country, port: "" });
  };
  const changePort = (port: string) => {
    setField("port", port);
    preference.setDestination({ country: form.country, port });
  };

  const budgetValue = form.budget.trim() ? Number(form.budget) : null;
  const whatsappMessage = [
    "Hello Wazir Trading LLC. I would like to discuss an export enquiry.",
    `Request type: ${REQUEST_TYPES.find((item) => item.value === form.requestType)?.label ?? form.requestType}`,
    form.name.trim() ? `Name: ${form.name.trim()}` : "",
    form.email.trim() ? `Email: ${form.email.trim()}` : "",
    form.phone.trim() ? `WhatsApp / phone: ${form.phone.trim()}` : "",
    form.country.trim() ? `Destination country: ${form.country.trim()}` : "",
    form.port.trim() ? `Preferred port / city: ${form.port.trim()}` : "Preferred port / city: to be confirmed",
    form.vehicleRef.trim() ? `Vehicle reference: ${form.vehicleRef.trim()}` : "",
    form.vehicleModel.trim() ? `Vehicle / model: ${form.vehicleModel.trim()}` : "",
    budgetValue !== null && Number.isFinite(budgetValue) ? `Target budget (USD): ${budgetValue}` : "",
    form.requirements.trim() ? `Requirements: ${form.requirements.trim()}` : "",
    "Please confirm current availability, the written price basis, export documents, shipping options and destination-side costs for this specific request.",
    "Website: https://www.wazirtradingllc.com/request-a-quote",
  ].filter(Boolean).join("\n");
  const whatsappHref = buildWhatsAppHref(whatsappMessage);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    if (!form.country.trim()) {
      setStatus("error");
      setErrorMessage("Please choose the country or territory where the vehicle will be used.");
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name and a valid email address.");
      return;
    }
    if (!form.consent) {
      setStatus("error");
      setErrorMessage("Please confirm that you want to continue to WhatsApp with these details.");
      return;
    }
    if (
      (form.requestType === "vehicle" || form.requestType === "sourcing") &&
      !form.vehicleModel.trim() &&
      !form.vehicleRef.trim()
    ) {
      setStatus("error");
      setErrorMessage("Please enter a vehicle make/model or a listing reference.");
      return;
    }
    if (form.budget.trim() && (!Number.isFinite(Number(form.budget)) || Number(form.budget) < 0)) {
      setStatus("error");
      setErrorMessage("Please enter a valid non-negative budget in USD, or leave it blank.");
      return;
    }

    preference.setDestination({ country: form.country, port: form.port });
    openWhatsAppEnquiry(whatsappMessage);
    setStatus("success");
  };

  return (
    <div className="min-h-screen bg-background pb-16" style={{ paddingTop: "var(--header-h)" }}>
      <section className="bg-[#0D1B3E] text-white">
        <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white/60">
            Vehicle and destination enquiry
          </p>
          <h1 className="max-w-3xl font-serif text-3xl font-bold leading-tight md:text-5xl">
            Tell us where the vehicle needs to go
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
            Share the vehicle or sourcing brief and your destination. We will review the details and
            confirm what can be quoted for that particular request.
          </p>
        </div>
      </section>

      <main className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:py-14">
        <section className="border border-border bg-card p-5 shadow-sm md:p-8">
          {status === "success" ? (
            <div className="py-8 text-center" role="status">
              <MessageCircle size={42} className="mx-auto mb-4 text-[#25D366]" />
              <h2 className="font-serif text-2xl font-bold text-foreground">
                WhatsApp message prepared
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                WhatsApp has opened with your enquiry details prefilled. Review the message and
                press Send in WhatsApp to deliver it to Wazir Trading. This website does not receive
                an automatic copy through this WhatsApp hand-off.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:opacity-90"
                >
                  <MessageCircle size={16} /> Open WhatsApp again
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setForm(EMPTY_FORM);
                  }}
                  className="border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Send another enquiry
                </button>
              </div>
              <p className="mt-5 text-xs leading-5 text-muted-foreground">
                This enquiry does not reserve a vehicle, confirm route availability, grant an import
                permit or create a purchase contract. Wait for a written, vehicle-specific quotation
                and independently verify the destination rules before payment or shipment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  1. What do you need?
                </h2>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {REQUEST_TYPES.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={form.requestType === option.value}
                      onClick={() => setField("requestType", option.value)}
                      className={`rounded-sm border p-3 text-left transition-colors ${
                        form.requestType === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <span className="block text-sm font-bold text-foreground">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {option.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  2. Where is the destination?
                </h2>
                <div className="mt-3">
                  <DestinationFields
                    country={form.country}
                    port={form.port}
                    onCountryChange={changeCountry}
                    onPortChange={changePort}
                    idPrefix="quote-destination"
                  />
                </div>
                {countryGuide ? (
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    Planning an import to {countryGuide.name}? Read the{" "}
                    <Link
                      href={countryLandingPath(countryGuide)}
                      className="font-semibold text-primary underline underline-offset-2"
                    >
                      {countryGuide.name} import guide
                    </Link>{" "}
                    and confirm current rules with the relevant authority.
                  </p>
                ) : (
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    Country-specific guidance is not currently published for every territory. We
                    will not assume eligibility or calculate taxes without verified information.
                    Start with the{" "}
                    <Link
                      href="/import-japanese-cars"
                      className="font-semibold text-primary underline underline-offset-2"
                    >
                      destination guide directory
                    </Link>
                    .
                  </p>
                )}
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">3. Vehicle details</h2>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Vehicle make / model / year
                    <input
                      value={form.vehicleModel}
                      onChange={(event) => setField("vehicleModel", event.target.value)}
                      maxLength={160}
                      placeholder="e.g. Toyota Land Cruiser 2021"
                      className="mt-1.5 w-full rounded-sm border border-border bg-background p-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Vehicle reference (if known)
                    <input
                      value={form.vehicleRef}
                      onChange={(event) => setField("vehicleRef", event.target.value)}
                      maxLength={80}
                      placeholder="Reference from a listing"
                      className="mt-1.5 w-full rounded-sm border border-border bg-background p-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Target budget (USD, optional)
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.budget}
                      onChange={(event) => setField("budget", event.target.value)}
                      placeholder="Leave blank if undecided"
                      className="mt-1.5 w-full rounded-sm border border-border bg-background p-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
                    />
                  </label>
                </div>
                <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Requirements or questions
                  <textarea
                    rows={4}
                    value={form.requirements}
                    onChange={(event) => setField("requirements", event.target.value)}
                    maxLength={3000}
                    placeholder="Tell us about preferred year, mileage, fuel, transmission, condition documents, budget or what you need confirmed."
                    className="mt-1.5 w-full resize-y rounded-sm border border-border bg-background p-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
                  />
                </label>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  4. How can we contact you?
                </h2>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Full name *
                    <input
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => setField("name", event.target.value)}
                      maxLength={120}
                      className="mt-1.5 w-full rounded-sm border border-border bg-background p-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Email address *
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) => setField("email", event.target.value)}
                      maxLength={254}
                      className="mt-1.5 w-full rounded-sm border border-border bg-background p-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                    WhatsApp / phone (optional)
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) => setField("phone", event.target.value)}
                      maxLength={40}
                      placeholder="Include country code"
                      className="mt-1.5 w-full rounded-sm border border-border bg-background p-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
                    />
                  </label>
                </div>
              </div>

              <label className="flex items-start gap-3 text-xs leading-5 text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(event) => setField("consent", event.target.checked)}
                  className="mt-1 accent-[#C8102E]"
                />
                <span>
                  I agree to continue to WhatsApp with the information above prefilled. I will
                  review it and press Send to share it with Wazir Trading LLC. See the{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-primary underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-sm border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
                >
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#C8102E] px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#A50D25] disabled:cursor-not-allowed disabled:opacity-60"
              >
                "Continue to WhatsApp"
                <ArrowRight size={16} />
              </button>
              <p className="text-center text-[11px] leading-5 text-muted-foreground">
                WhatsApp opens with your details prefilled. You must press Send in WhatsApp for the
                enquiry to reach us. No payment is taken here, and a written quotation, route
                confirmation and destination-side cost assessment are separate steps.
              </p>
            </form>
          )}
        </section>

        <aside className="space-y-4">
          <div className="border border-border bg-card p-5">
            <ShieldCheck className="mb-3 text-primary" size={24} />
            <h2 className="font-serif text-lg font-bold text-foreground">
              Clear, itemised answers
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Ask for the exact vehicle reference, price basis, named route, included services,
              exclusions, documents and payment milestones in writing before you decide.
            </p>
          </div>
          <div className="border border-border bg-muted/30 p-5">
            <h2 className="font-semibold text-foreground">Need a direct contact?</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              You can contact our team without sending the form.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 inline-flex w-full items-center justify-center border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Email Wazir Trading
            </a>
          </div>
          <div className="border border-border p-5">
            <h2 className="font-semibold text-foreground">Helpful before you enquire</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">
                  How the purchase process works
                </Link>
              </li>
              <li>
                <Link
                  href="/buyer-information"
                  className="text-muted-foreground hover:text-primary"
                >
                  Buyer checklist and price basis
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-information"
                  className="text-muted-foreground hover:text-primary"
                >
                  Shipping and export documents
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-muted-foreground hover:text-primary">
                  Common questions
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
