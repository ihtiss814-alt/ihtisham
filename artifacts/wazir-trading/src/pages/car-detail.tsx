import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { supabase } from '@/lib/supabase';
import { Car } from '@/components/CarCard';
import ImageGallery from '@/components/ImageGallery';
import { ArrowLeft, Check, Copy, Info, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CarDetailPage() {
  const params = useParams();
  const ref = params.ref;
  
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';

  useEffect(() => {
    async function fetchCar() {
      if (!ref) return;
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('ref_number', ref)
          .single();

        if (error) throw error;
        setCar(data);
      } catch (err) {
        console.error("Failed to fetch car details", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [ref]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      car_ref: car?.ref_number,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      country: formData.get('country') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase.from('inquiries').insert([data]);
      if (error) throw error;
      setFormStatus('success');
      setTimeout(() => {
        setFormOpen(false);
        setFormStatus('idle');
      }, 3000);
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-24 bg-background flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>;
  }

  if (!car) {
    return <div className="min-h-screen pt-32 pb-16 bg-background text-center">
      <h1 className="text-3xl font-serif mb-4">Vehicle Not Found</h1>
      <p className="mb-8">The vehicle you are looking for does not exist or has been removed.</p>
      <Link href="/cars" className="text-primary hover:underline">Return to Inventory</Link>
    </div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  const waMessage = encodeURIComponent(`Hi Wazir Trading, I am interested in ${car.make} ${car.model} (Ref: ${car.ref_number}). Is it still available?`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/cars" className="hover:text-primary flex items-center transition-colors">
            <ArrowLeft size={14} className="mr-1" /> Back to Inventory
          </Link>
          <span className="mx-2">/</span>
          <span>{car.make} {car.model}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-10">
            {/* Header */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="bg-secondary text-white text-xs px-2 py-1 uppercase tracking-wider font-medium">
                  {car.ref_number}
                </span>
                <button 
                  onClick={handleCopyLink}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
                >
                  {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />} 
                  {copied ? 'Copied' : 'Share'}
                </button>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                {car.year} {car.make} {car.model}
              </h1>
              {car.variant && <h2 className="text-xl text-muted-foreground mt-2">{car.variant}</h2>}
            </div>

            {/* Gallery */}
            <ImageGallery 
              carId={car.id} 
              refNumber={car.ref_number} 
              make={car.make} 
              model={car.model} 
            />

            {/* Specifications */}
            <div className="bg-card border border-border p-8">
              <h3 className="text-2xl font-serif font-bold border-b border-border pb-4 mb-6">Vehicle Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                <SpecRow label="Make" value={car.make} />
                <SpecRow label="Model" value={car.model} />
                <SpecRow label="Year" value={car.year.toString()} />
                <SpecRow label="Mileage" value={`${car.mileage_km.toLocaleString()} km`} />
                <SpecRow label="Engine" value={`${car.engine_cc} cc`} />
                <SpecRow label="Fuel" value={car.fuel_type} />
                <SpecRow label="Transmission" value={car.transmission} />
                <SpecRow label="Drive" value={car.drive} />
                <SpecRow label="Steering" value={car.steering} />
                <SpecRow label="Color" value={car.color} />
                <SpecRow label="Body Type" value={car.body_type} />
                <SpecRow label="Doors" value={car.doors.toString()} />
                <SpecRow label="Seats" value={car.seats.toString()} />
                <SpecRow label="Chassis No." value={car.chassis_number} />
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 bg-secondary text-white p-8 border border-secondary-border shadow-xl">
              <div className="mb-8">
                <div className="text-secondary-foreground/70 uppercase tracking-widest text-xs font-medium mb-2">FOB Price (Japan)</div>
                <div className="text-4xl font-serif font-bold text-primary">{formatPrice(car.fob_price_usd)}</div>
                <p className="text-xs text-white/50 mt-2">Freight and local taxes not included.</p>
              </div>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 mb-8">
                <div className="text-3xl font-bold text-white leading-none">{car.auction_grade}</div>
                <div>
                  <div className="flex items-center gap-1 font-medium text-sm">
                    Auction Grade 
                    <div className="group relative">
                      <Info size={14} className="text-primary/70 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-background text-foreground text-xs rounded-sm shadow-lg hidden group-hover:block z-10 border border-border">
                        Japanese Vehicle Inspection Grading: 5 = Excellent, 4.5 = Very Good, 4 = Good, 3.5 = Average
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-white/60">Verified Japanese Standard</div>
                </div>
              </div>

              <div className="space-y-4">
                <a 
                  href={waLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 font-medium flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
                >
                  <Phone size={20} /> Enquire on WhatsApp
                </a>
                
                <button 
                  onClick={() => setFormOpen(!formOpen)}
                  className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-4 font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Send size={20} /> Send Email Enquiry
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-sm text-white/60 space-y-3">
                <div className="flex justify-between">
                  <span>Stock Location</span>
                  <span className="text-white">{car.stock_location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Port of Loading</span>
                  <span className="text-white">{car.port_of_loading}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipment</span>
                  <span className="text-white">{car.shipment_method}</span>
                </div>
              </div>
            </div>

            {/* Sliding Form */}
            {formOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 bg-card border border-border p-6 shadow-md"
              >
                <h4 className="font-serif font-bold text-lg mb-4">Request a Quote</h4>
                
                {formStatus === 'success' ? (
                  <div className="bg-primary/10 text-primary border border-primary/20 p-4 text-center">
                    <Check className="mx-auto mb-2" />
                    <p className="font-medium">Enquiry sent successfully.</p>
                    <p className="text-sm mt-1">Our team will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1">Name</label>
                      <input required name="name" type="text" className="w-full border border-border bg-background p-2 text-sm focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1">Email</label>
                      <input required name="email" type="email" className="w-full border border-border bg-background p-2 text-sm focus:border-primary outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-1">Phone</label>
                        <input name="phone" type="tel" className="w-full border border-border bg-background p-2 text-sm focus:border-primary outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-1">Country</label>
                        <input required name="country" type="text" className="w-full border border-border bg-background p-2 text-sm focus:border-primary outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1">Message</label>
                      <textarea required name="message" rows={4} defaultValue={`I would like to know more about the ${car.year} ${car.make} ${car.model} (Ref: ${car.ref_number}). Please send me the final price including shipping to my country.`} className="w-full border border-border bg-background p-2 text-sm focus:border-primary outline-none resize-none" />
                    </div>
                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-primary text-primary-foreground py-3 font-medium disabled:opacity-70"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Submit Request'}
                    </button>
                    {formStatus === 'error' && <p className="text-destructive text-sm text-center">An error occurred. Please try again.</p>}
                  </form>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="flex flex-col border-b border-border/50 py-2">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value || '-'}</span>
    </div>
  );
}
