import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, ShieldCheck, Ship, Globe, Award } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import CarCard, { Car } from '@/components/CarCard';

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [newArrivals, setNewArrivals] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waLink = `https://wa.me/${waNumber}`;

  useEffect(() => {
    async function fetchCars() {
      try {
        const [featuredRes, newArrivalsRes] = await Promise.all([
          supabase.from('cars').select('*').eq('is_featured', true).eq('status', 'available').limit(6),
          supabase.from('cars').select('*').eq('is_new_arrival', true).eq('status', 'available').limit(6)
        ]);

        if (featuredRes.data) setFeaturedCars(featuredRes.data);
        if (newArrivalsRes.data) setNewArrivals(newArrivalsRes.data);
      } catch (err) {
        console.error("Failed to fetch cars", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px] flex items-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10" />
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Cars" 
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20 pt-[135px]">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-block border border-primary/40 px-4 py-1.5 mb-6 bg-secondary/50 backdrop-blur-sm">
              <span className="text-primary font-medium tracking-widest uppercase text-xs">Direct from Japan</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
              Premium Japanese Used Cars.
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-2xl leading-relaxed">
              We export meticulously inspected, auction-grade Japanese vehicles to discerning buyers globally. Experience automotive excellence with direct Japan pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/cars" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 font-medium tracking-wide flex items-center justify-center transition-colors">
                Browse Inventory <ArrowRight className="ml-2" size={18} />
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 font-medium tracking-wide flex items-center justify-center transition-colors backdrop-blur-sm">
                <Phone className="mr-2" size={18} /> Contact on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Inventory</h2>
              <p className="text-muted-foreground max-w-2xl">Hand-selected vehicles from our current stock in Japan, ready for immediate export.</p>
            </div>
            <Link href="/cars" className="hidden md:flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
              View All Cars <ArrowRight className="ml-1" size={16} />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="h-96 bg-muted animate-pulse border border-border" />)}
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredCars.map(car => (
                <motion.div key={car.id} variants={fadeIn} className="h-full">
                  <CarCard car={car} />
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="mt-10 md:hidden flex justify-center">
            <Link href="/cars" className="text-primary font-medium border-b border-primary pb-1 flex items-center">
              View All Cars <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">The Wazir Trading Advantage</h2>
            <p className="text-white/70">We bring transparency, quality, and luxury to the global used car export market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ShieldCheck size={32} />, title: "Verified Quality", desc: "Every vehicle undergoes strict Japanese auction grading and inspection before purchase." },
              { icon: <Award size={32} />, title: "Premium Sourcing", desc: "We focus on high-grade, well-maintained vehicles rather than budget alternatives." },
              { icon: <Ship size={32} />, title: "Global Logistics", desc: "Complete shipping solutions from Japan to your local port with full documentation." },
              { icon: <Globe size={32} />, title: "Direct Access", desc: "Buy directly from Japan without the markup of local importers and dealerships." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors"
              >
                <div className="text-primary mb-6">{feature.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">New Arrivals</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground">Fresh stock from Japanese auctions, updated weekly.</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="h-96 bg-muted animate-pulse border border-border" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newArrivals.slice(0, 3).map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/cars" className="inline-block border border-primary text-primary px-8 py-3 font-medium hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-widest text-sm">
              View Entire Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "10k+", label: "Vehicles Exported" },
              { value: "35+", label: "Countries Served" },
              { value: "99%", label: "Satisfaction Rate" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-white relative">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 max-w-2xl mx-auto">Ready to Import Your Dream Vehicle?</h2>
          <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg">Contact our Japan office today to discuss your requirements, request a quote, or source a specific vehicle from auction.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-8 py-4 font-medium flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Phone className="mr-2" size={18} /> Chat on WhatsApp
            </a>
            <Link href="/contact" className="bg-transparent border border-white/30 px-8 py-4 font-medium flex items-center justify-center hover:bg-white/10 transition-colors">
              Send an Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
