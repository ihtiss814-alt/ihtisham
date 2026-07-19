import React from 'react';
import { Link } from 'wouter';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

export default function Footer() {
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-secondary-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <img
                src="/logo.png"
                alt="Wazir Trading LLC"
                className="h-[90px] w-auto"
                loading="eager"
              />
            </div>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed max-w-sm">
              Premium Japanese used vehicles exported globally. We bridge the gap between Japanese auto auctions and the world with integrity and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-6 flex items-center">
              <span className="w-8 h-[1px] bg-primary mr-3"></span> Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/cars" className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-2 text-primary" /> Browse Inventory
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-2 text-primary" /> How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-2 text-primary" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center">
                  <ChevronRight size={14} className="mr-2 text-primary" /> Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-6 flex items-center">
              <span className="w-8 h-[1px] bg-primary mr-3"></span> Get in Touch
            </h4>
            <ul className="space-y-4 text-sm text-secondary-foreground/70">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-primary shrink-0 mt-0.5" />
                <span>Tokyo, Japan<br/>Global Export Division</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary shrink-0" />
                <a href={`https://wa.me/${waNumber}`} className="hover:text-primary transition-colors">
                  +{waNumber} (WhatsApp Available)
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary shrink-0" />
                <a href="mailto:info@wazirtrading.com" className="hover:text-primary transition-colors">
                  info@wazirtrading.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-secondary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Wazir Trading LLC. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="px-2 py-1 bg-white/5 rounded-sm">Direct Japan Stock</span>
            <span className="px-2 py-1 bg-white/5 rounded-sm">Auction Grade Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
