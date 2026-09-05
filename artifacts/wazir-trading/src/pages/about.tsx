import React from 'react';
import { Shield, Award, Clock, Globe, Building2, MapPin } from 'lucide-react';
import { useMeta } from '@/lib/use-meta';
import ShippingRouteCanvas from '@/components/ShippingRouteCanvas';
import { useReveal } from '@/hooks/useReveal';

const offices = [
  {
    name: 'Japan Headquarters',
    location: 'Kuwana, Mie, Japan',
    role: 'Sourcing & export operations',
  },
  {
    name: 'Dubai Office',
    location: 'Dubai, United Arab Emirates',
    role: 'Regional client relations',
  },
  {
    name: 'Guyana Office',
    location: 'Guyana',
    role: 'Regional customer support',
  },
  {
    name: 'Peshawar Office',
    location: 'Peshawar, Pakistan',
    role: 'Local customer relations',
  },
];

export default function AboutPage() {
  useMeta({
    title: 'About Us | Wazir Trading LLC — Japanese Car Exporters',
    description: 'Learn how Wazir Trading LLC helps buyers review Japanese used vehicle listings, understand export steps, and request shipping information.',
    canonical: 'https://www.wazirtradingllc.com/about',
  });
  const story  = useReveal<HTMLDivElement>();
  const values = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background" style={{ paddingTop: 'var(--header-h)' }}>
      {/* Hero Section */}
      <section className="text-white py-24 relative overflow-hidden" style={{ background: 'var(--brand-navy)' }}>
        {/* Live chart of our export routes out of Japan — replaces a stock photo
            of a city we do not operate from. */}
        <div className="absolute inset-0 z-0">
          <ShippingRouteCanvas className="w-full h-full" />
          {/* Scrim over the left half only, where the headline sits. The route
              strokes are already low-alpha, so the right side needs no cover. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, var(--brand-navy) 0%, rgba(13,27,62,0.90) 28%, rgba(13,27,62,0.45) 62%, rgba(13,27,62,0.10) 100%)',
            }}
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">Driven by Excellence. Sourced in Japan.</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Wazir Trading LLC helps buyers review Japanese used vehicle listings and request export information from its Japan-based operation.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div
            ref={story.ref}
            className={`reveal ${story.revealed ? 'is-revealed' : ''} flex flex-col md:flex-row gap-16 items-center`}
          >
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?q=80&w=1887&auto=format&fit=crop" 
                alt="Luxury Car Detail" 
                className="w-full h-[600px] object-cover shadow-2xl border border-border"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">What we do</h2>
              <div className="w-12 h-1 bg-primary mb-8"></div>
              
              <p className="text-muted-foreground leading-relaxed">
                Wazir Trading LLC helps buyers review Japanese used vehicle listings and request export information from its Japan-based operation.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Buying a used vehicle from Japan involves reviewing the available vehicle record, confirming the terms of sale, and checking the shipping and import requirements for the destination. We keep those steps connected to the listing and inquiry process.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Vehicle pages show the available reference, specifications, images, and pricing fields for each listing. Buyers can contact us to confirm availability, shipping options, and the documents required for their destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Commitment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The principles that guide every vehicle we export.</p>
          </div>

          <div
            ref={values.ref}
            className={`reveal ${values.revealed ? 'is-revealed' : ''} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`}
          >
            <ValueCard
              icon={<Shield />} 
              title="Absolute Transparency" 
              desc="Review the reference, specifications, images, and available grade fields shown for each listing."
            />
            <ValueCard 
              icon={<Award />} 
              title="Premium Selection" 
              desc="Use the current inventory and its recorded specifications to compare vehicles against your requirements."
            />
            <ValueCard 
              icon={<Globe />} 
              title="Global Reach" 
              desc="Ask about available RoRo or container options and the destination costs for a specific vehicle."
            />
            <ValueCard 
              icon={<Clock />} 
              title="End-to-End Service" 
              desc="Contact us for availability, shipping options, and the documents required for your destination."
            />
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">Our global presence</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Four Offices. One Global Standard.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From our sourcing headquarters in Japan to our regional offices abroad, our teams keep every client close to the people and expertise behind their vehicle.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {offices.map((office, index) => (
              <div
                key={office.name}
                className={`relative bg-card border p-6 md:p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                  index === 0 ? 'border-primary/50' : 'border-border'
                }`}
              >
                {index === 0 && (
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-primary font-bold">
                    HQ
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
            <h3 className="text-xl font-bold mb-1">Japan Headquarters</h3>
            <p className="text-muted-foreground mb-1 text-sm">Heights Mizutani 1C, 158-1 Jizou, Kuwana-City, Mie-Pref, Japan</p>
            <p className="text-xs text-muted-foreground/60 mb-8">Visits by appointment only</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="uppercase tracking-widest text-xs text-primary font-bold mb-2">Global Sales</div>
                <p className="text-muted-foreground">Operating worldwide with specialized divisions for Africa, Oceania, and the Caribbean.</p>
              </div>
              <div>
                <div className="uppercase tracking-widest text-xs text-primary font-bold mb-2">Auction Operations</div>
                <p className="text-muted-foreground">Direct bidding access to major auction houses across Japan, including USS, TAA, CAA and JAA.</p>
              </div>
              <div>
                <div className="uppercase tracking-widest text-xs text-primary font-bold mb-2">Logistics</div>
                <p className="text-muted-foreground">Strategic partnerships with major shipping lines from Yokohama, Nagoya, and Kobe ports.</p>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3265.8895035567575!2d136.6993446757601!3d35.05950157279439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDAzJzM0LjIiTiAxMzbCsDQyJzA2LjkiRQ!5e0!3m2!1sen!2sus!4v1785990086147!5m2!1sen!2sus"
              width="100%"
              height="420"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Wazir Trading LLC — Japan Office Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
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
