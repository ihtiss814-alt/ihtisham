import { Link } from "wouter";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useMeta } from "@/lib/use-meta";

export default function PrivacyPolicyPage() {
  useMeta({
    title: "Privacy Policy | Wazir Trading LLC",
    description:
      "Learn what information Wazir Trading LLC receives through website enquiries, how it is used to respond, and how to contact the business about privacy requests.",
    canonical: "https://www.wazirtradingllc.com/privacy-policy",
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
            How information submitted through the Wazir Trading website is used to handle enquiries
            and provide the requested service.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-8 md:py-12 space-y-5">
        <section className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <LockKeyhole size={18} className="text-[#C8102E]" />
            <h2 className="font-bold text-[#0D1B3E]">Who this policy covers</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            This policy describes information handled when you browse the website or submit an
            enquiry to Wazir Trading LLC. The website publishes a Japan business contact address and
            the contact methods on the{" "}
            <Link href="/contact" className="text-[#C8102E] underline">
              Contact page
            </Link>
            .
          </p>
        </section>
        {[
          [
            "1. Information you provide",
            "Depending on the form you use, the website may collect your name, email address, phone or WhatsApp number, country or destination, vehicle reference or model, budget, enquiry type and message. Please provide only information needed to respond to your enquiry. Do not send bank passwords, card security codes, account logins or identity documents unless the company separately explains a secure and necessary process.",
          ],
          [
            "2. How the information is used",
            "Information is used to review and respond to your vehicle, sourcing, shipping, payment or general enquiry; prepare or discuss a quotation; maintain communication about a transaction; and operate, protect and troubleshoot the website and related services.",
          ],
          [
            "3. Website forms and storage",
            "The quote, contact and vehicle enquiry forms prepare a message in WhatsApp with the details you choose to provide. You must review that draft and press Send in WhatsApp; opening the draft alone does not deliver an enquiry. The website does not automatically receive or store a copy of a WhatsApp conversation through this hand-off. WhatsApp messages are sent through your WhatsApp account and may be processed by WhatsApp/Meta under their terms and privacy policy. The website uses Supabase for site data such as public inventory and related site features. Destination preferences may also be saved in browser storage on your device.",
          ],
          [
            "4. Service providers and external services",
            "The website uses third-party services to operate or provide features. These may include Supabase for database infrastructure, Google Analytics for website measurement, Google Maps for the embedded location map, Cloudinary for image delivery, and WhatsApp or your email provider when you choose to contact us through those services. Those providers may process technical or contact information under their own terms and privacy policies.",
          ],
          [
            "5. Cookies and analytics",
            "The site may use browser storage or cookies and analytics technologies for site functionality and traffic measurement. Your browser settings can be used to restrict cookies or clear stored site data, although some features may not work as intended. This site does not currently describe a separate cookie-preference dashboard.",
          ],
          [
            "6. Sharing and disclosure",
            "We do not publish enquiry form details as public content. When you choose to send a prepared message, the details you include are shared with Wazir Trading only after you press Send in WhatsApp. WhatsApp and your email provider process information according to their own terms and privacy policies. Information may also be accessible to authorized personnel involved in responding to your request, or disclosed where required by law.",
          ],
          [
            "7. Retention",
            "Enquiry information may be retained while it is needed to respond, manage a customer relationship or transaction, maintain business records, resolve disputes or comply with applicable legal obligations. A fixed deletion schedule is not published here.",
          ],
          [
            "8. Security",
            "The website and its service providers use technical and organizational safeguards, but no internet transmission or storage system can be guaranteed completely secure. Use the official contact details on this website to verify payment instructions, and never send passwords or payment credentials through an enquiry form.",
          ],
          [
            "9. Your requests",
            "You may contact Wazir Trading to ask what personal information was supplied through the website, request correction, or ask about deletion. Some information may need to be retained for an active transaction, business record or legal obligation. We may need to verify your identity before acting on a request.",
          ],
          [
            "10. Changes to this policy",
            "This policy may be updated when the website’s forms, service providers or business processes change. The current version will be published on this page.",
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
            <Mail size={18} className="text-[#C8102E]" />
            <h2 className="font-bold text-[#0D1B3E]">Privacy contact</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            For a privacy question or request, email{" "}
            <a className="text-[#C8102E] underline" href="mailto:wazirtrading-pc@outlook.jp">
              wazirtrading-pc@outlook.jp
            </a>{" "}
            or use the contact details on the{" "}
            <Link href="/contact" className="text-[#C8102E] underline">
              Contact page
            </Link>
            . Please do not include passwords or full payment credentials.
          </p>
        </section>
      </div>
    </div>
  );
}
