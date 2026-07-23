import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, MapPin, Phone, Check } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [inquiryType, setInquiryType] = useState('');
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      country: formData.get('country') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase.from('inquiries').insert([data]);
      if (error) throw error;
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-[130px] pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground">Get in touch with our Japan office for vehicle sourcing, shipping quotes, or general inquiries.</p>
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
                        Heights Mizutani 1C, 158-1 Jizou<br/>
                        Kuwana-City, Mie-Pref, Japan<br/>
                        <span className="text-xs opacity-70">(Visits by appointment only)</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0 mr-4">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">WhatsApp & Phone</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        +{waNumber} <span className="text-xs opacity-70">(WhatsApp preferred)</span><br/>
                        050-3740-8980 <span className="text-xs opacity-70">(Office)</span><br/>
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
                      <p className="text-muted-foreground text-sm leading-relaxed">wazirtrading-pc@outlook.jp</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary text-white p-8 border border-secondary-border">
                <h3 className="font-serif font-bold text-xl mb-4">Instant Assistance</h3>
                <p className="text-white/70 text-sm mb-6">Our global sales team is available on WhatsApp to provide fast quotes and stock availability.</p>
                <a 
                  href={`https://wa.me/${waNumber}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-3 font-medium flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
                >
                  <Phone size={20} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-serif font-bold mb-6">Send a Message</h2>
              
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                    <Check size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Received</h3>
                  <p className="text-muted-foreground mb-3">
                    Our team will review your inquiry and reply within a few hours — primarily on WhatsApp for the fastest response.
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    You can also reach us at<br />
                    <span className="font-semibold text-foreground/80">wazirtrading-pc@outlook.jp</span>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Inquiry type selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">What can we help you with?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'sourcing',  label: '🚗  Vehicle Sourcing' },
                        { value: 'shipping',  label: '🚢  Shipping Quote'   },
                        { value: 'payment',   label: '💳  Payment Info'     },
                        { value: 'general',   label: '📋  General Question' },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setInquiryType(opt.value)}
                          className={`py-2.5 px-3 text-xs font-medium border text-left transition-colors ${
                            inquiryType === opt.value
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border text-muted-foreground hover:border-primary/40'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">Full Name *</label>
                    <input required name="name" type="text" placeholder="e.g. Ahmed Al-Rashid" className="w-full border border-border bg-background p-3 focus:border-primary outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">Email Address *</label>
                    <input required name="email" type="email" placeholder="your@email.com" className="w-full border border-border bg-background p-3 focus:border-primary outline-none transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">WhatsApp / Phone</label>
                      <input name="phone" type="tel" placeholder="+1 234 567 8900" className="w-full border border-border bg-background p-3 focus:border-primary outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">Your Country *</label>
                      <input required name="country" type="text" placeholder="e.g. Pakistan" className="w-full border border-border bg-background p-3 focus:border-primary outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 font-medium text-foreground/80">Message *</label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder={
                        inquiryType === 'sourcing'
                          ? "e.g. I'm looking for a Toyota Land Cruiser 2018–2020, budget around $12,000, shipping to Karachi. Please advise on availability and total price."
                          : inquiryType === 'shipping'
                          ? "e.g. I need a shipping quote for a Toyota Hilux (already purchased) to Mombasa, Kenya. Please include inspection and insurance options."
                          : inquiryType === 'payment'
                          ? "e.g. What payment methods do you accept? Can I pay by bank transfer from the UK, and when is payment due?"
                          : "How can we help you? Please include as much detail as possible so we can give you a useful answer."
                      }
                      className="w-full border border-border bg-background p-3 focus:border-primary outline-none resize-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-primary text-primary-foreground py-4 font-medium uppercase tracking-widest text-sm disabled:opacity-70 transition-colors"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send My Inquiry'}
                  </button>
                  {status === 'error' && (
                    <p className="text-destructive text-sm text-center">
                      Failed to send. Please try WhatsApp instead — we're always available there.
                    </p>
                  )}
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
