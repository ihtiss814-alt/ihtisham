import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { buildWhatsAppHref, openWhatsAppEnquiry } from "@/lib/whatsapp-enquiries";
import { Mail, MapPin, Phone, Check, MessageCircle, CarFront, Ship, CreditCard, CircleHelp } from "lucide-react";
import { useMeta } from "@/lib/use-meta";
import DestinationFields from "@/components/DestinationFields";
import { useDestinationPreference } from "@/hooks/useDestinationPreference";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.198.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage() {
  useMeta({
    title: "Contact Wazir Trading LLC | Japanese Car Export",
    description:
      "Contact Wazir Trading LLC by WhatsApp, email, or inquiry form about Japanese used car exports, vehicle pricing, and shipping.",
    canonical: "https://www.wazirtradingllc.com/contact",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [preparedWhatsAppHref, setPreparedWhatsAppHref] = useState("");
  const [inquiryType, setInquiryType] = useState("general");
  const destination = useDestinationPreference();
  const [country, setCountry] = useState("");
  const [port, setPort] = useState("");

  useEffect(() => {
    if (!destination.loaded) return;
    setCountry((current) => current || destination.country);
    setPort((current) => current || destination.port);
  }, [destination.loaded, destination.country, destination.port]);
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "818089227375";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const messageText = String(formData.get("message") ?? "").trim();
    if (!name || !email || !messageText) {
      setStatus("error");
      setErrorMessage("Please complete your name, email address and message.");
      return;
    }
    const message = [
      "Hello Wazir Trading LLC. I would like to make an enquiry.",
      `Enquiry type: ${inquiryType}`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `WhatsApp / phone: ${phone}` : "",
      country.trim() ? `Destination country: ${country.trim()}` : "",
      port.trim() ? `Preferred port / final city: ${port.trim()}` : "",
      messageText,
      "Website: https://www.wazirtradingllc.com/contact",
    ].filter(Boolean).join("\n\n");
    setPreparedWhatsAppHref(buildWhatsAppHref(message));
    openWhatsAppEnquiry(message);
    setStatus("success");
  };

  return (
    <div className="min-h-screen bg-background pb-20" style={{ paddingTop: "var(--header-h)" }}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground">
              Get in touch with our Japan office for vehicle sourcing, shipping quotes, or general
              inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">Japan Headquarters</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Address</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Heights Mizutani 1C, 158-1 Jizou
                        <br />
                        Kuwana-City, Mie-Pref, Japan
                        <br />
                        <span className="text-xs opacity-70">(Visits by appointment only)</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">
                        WhatsApp & Phone
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        +{waNumber} <span className="text-xs opacity-70">(WhatsApp preferred)</span>
                        <br />
                        050-3740-8980 <span className="text-xs opacity-70">(Office)</span>
                        <br />
                        050-3588-6588 <span className="text-xs opacity-70">(Fax)</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Email</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        wazirtrading-pc@outlook.jp
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary text-white p-8 border border-secondary-border">
                <h3 className="font-serif font-bold text-xl mb-4">Instant Assistance</h3>
                <p className="text-white/70 text-sm mb-6">
                  Use WhatsApp for direct enquiries about vehicle records, written quotations and
                  destination-specific shipping questions.
                </p>
                <a
                  href={buildWhatsAppHref("Hello Wazir Trading LLC. I would like to speak with your team.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-3 font-medium flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
                >
                  <WhatsAppIcon size={20} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-serif font-bold mb-2">Send a Message</h2>
              <p className="mb-6 text-sm leading-6 text-muted-foreground">
                Share the details below and continue to WhatsApp. Your message is only delivered
                after you review it and press Send in WhatsApp. For a vehicle-specific or shipping
                request, you can also use the{" "}
                <Link
                  href="/request-a-quote"
                  className="font-semibold text-primary underline underline-offset-2"
                >
                  guided quote form
                </Link>
                .
              </p>

              {status === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                    <Check size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">WhatsApp message prepared</h3>
                  <p className="text-muted-foreground mb-3">
                    WhatsApp has opened with your details prefilled. Please review the
                    message and press Send in WhatsApp to deliver it to our team. The website does
                    not receive an automatic copy through this route.
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <a href={preparedWhatsAppHref} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline underline-offset-2">
                      Open the prepared WhatsApp message again
                    </a>
                    <a href="mailto:wazirtrading-pc@outlook.jp" className="text-sm font-semibold text-primary underline underline-offset-2">
                      wazirtrading-pc@outlook.jp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Inquiry type selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "sourcing", label: "Vehicle Sourcing", icon: CarFront },
                        { value: "shipping", label: "Shipping Quote", icon: Ship },
                        { value: "payment", label: "Payment Info", icon: CreditCard },
                        { value: "general", label: "General Question", icon: CircleHelp },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setInquiryType(opt.value)}
                          className={`py-2.5 px-3 text-xs font-medium border text-left transition-colors ${
                            inquiryType === opt.value
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <opt.icon size={13} />
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">
                      Full Name *
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="e.g. Ahmed Al-Rashid"
                      className="w-full border border-border bg-background p-3 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">
                      Email Address *
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-border bg-background p-3 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">
                      WhatsApp / Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className="w-full border border-border bg-background p-3 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="rounded-sm border border-border bg-muted/20 p-4">
                    <DestinationFields
                      country={country}
                      port={port}
                      onCountryChange={(nextCountry) => {
                        setCountry(nextCountry);
                        setPort("");
                        destination.setDestination({ country: nextCountry, port: "" });
                      }}
                      onPortChange={(nextPort) => {
                        setPort(nextPort);
                        destination.setDestination({ country, port: nextPort });
                      }}
                      idPrefix="contact-destination"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">
                      Message *
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder={
                        inquiryType === "sourcing"
                          ? "e.g. I'm looking for a Toyota Land Cruiser 2018–2020, budget around $12,000, shipping to Karachi. Please advise on availability and total price."
                          : inquiryType === "shipping"
                            ? "e.g. I need a shipping quote for a Toyota Hilux (already purchased) to Mombasa, Kenya. Please include inspection and insurance options."
                            : inquiryType === "payment"
                              ? "e.g. What payment methods do you accept? Can I pay by bank transfer from the UK, and when is payment due?"
                              : "How can we help you? Please include as much detail as possible so we can give you a useful answer."
                      }
                      className="w-full border border-border bg-background p-3 focus:border-primary outline-none resize-none transition-colors"
                    />
                  </div>
                  <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                    <input required type="checkbox" name="whatsapp-consent" value="yes" className="mt-0.5 accent-[#C8102E]" />
                    <span>
                      I agree to continue to WhatsApp with the details above prefilled. I will review
                      the message and press Send to share it with Wazir Trading LLC. See our{" "}
                      <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
                        Privacy Policy
                      </Link>.
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 font-medium uppercase tracking-widest text-sm disabled:opacity-70 transition-colors"
                  >
                    <><MessageCircle size={17} /> Continue to WhatsApp</>
                  </button>
                  {status === "error" && (
                    <p role="alert" className="text-destructive text-sm text-center">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* ── Google Maps ── */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold mb-2 text-center">
              Find Our Japan Office
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-6">
              Heights Mizutani 1C, 158-1 Jizou, Kuwana-City, Mie-Pref, Japan
            </p>
            <div className="rounded-xl overflow-hidden shadow-lg border border-border">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
