import React from 'react';
import { Shield, Award, Clock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop" alt="Tokyo cityscape" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">Driven by Excellence. Sourced in Japan.</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Wazir Trading LLC is a premier Japanese used vehicle exporter. We operate directly from Japan, ensuring our global clients receive authentic, auction-grade vehicles with complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?q=80&w=1887&auto=format&fit=crop" 
                alt="Luxury Car Detail" 
                className="w-full h-[600px] object-cover shadow-2xl border border-border"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">Our Legacy</h2>
              <div className="w-12 h-1 bg-primary mb-8"></div>
              
              <p className="text-muted-foreground leading-relaxed">
                Founded with a singular vision to elevate the international used car buying experience, Wazir Trading LLC bridges the gap between Japan's pristine automotive market and discerning buyers worldwide.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                The Japanese used car market is globally recognized for its unparalleled quality, largely due to strict "Shaken" inspection laws and meticulously maintained infrastructure. However, navigating the auction houses requires expertise, licensing, and a sharp eye for quality. That is where we excel.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                We are registered members of all major auto auctions in Japan (USS, TAA, CAA, JAA, etc.), giving us access to over 100,000 vehicles weekly. We don't just sell cars; we act as your proxy in Japan, ensuring you get exactly what you pay for without compromise.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<Shield />} 
              title="Absolute Transparency" 
              desc="We provide original auction sheets and authentic condition reports. No hidden damage, no tampered odometers."
            />
            <ValueCard 
              icon={<Award />} 
              title="Premium Selection" 
              desc="We selectively bid on vehicles graded 4.0 and above, ensuring our inventory meets luxury standards."
            />
            <ValueCard 
              icon={<Globe />} 
              title="Global Reach" 
              desc="Our logistics network spans continents, offering RoRo and container shipping to ports worldwide."
            />
            <ValueCard 
              icon={<Clock />} 
              title="End-to-End Service" 
              desc="From auction bidding to port delivery and customs documentation, we handle the entire export process."
            />
          </div>
        </div>
      </section>

      {/* Office Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-12">Japan Headquarters</h2>
          <div className="max-w-4xl mx-auto bg-card border border-border p-8 md:p-12 shadow-sm">
            <h3 className="text-xl font-bold mb-2">Wazir Trading LLC</h3>
            <p className="text-muted-foreground mb-8">Tokyo, Japan</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="uppercase tracking-widest text-xs text-primary font-bold mb-2">Global Sales</div>
                <p className="text-muted-foreground">Operating worldwide with specialized divisions for Africa, Oceania, and the Caribbean.</p>
              </div>
              <div>
                <div className="uppercase tracking-widest text-xs text-primary font-bold mb-2">Auction Operations</div>
                <p className="text-muted-foreground">Direct bidding access to 120+ auction houses across all prefectures in Japan.</p>
              </div>
              <div>
                <div className="uppercase tracking-widest text-xs text-primary font-bold mb-2">Logistics</div>
                <p className="text-muted-foreground">Strategic partnerships with major shipping lines from Yokohama, Nagoya, and Kobe ports.</p>
              </div>
            </div>
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
        {React.cloneElement(icon as React.ReactElement, { size: 28 })}
      </div>
      <h3 className="text-xl font-serif font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
