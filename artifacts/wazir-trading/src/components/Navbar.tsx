import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkBg = location === '/';
  
  const navClass = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled || !isDarkBg
      ? 'bg-white/90 dark:bg-secondary/90 backdrop-blur-md shadow-sm border-b border-border text-foreground'
      : 'bg-transparent text-white'
  }`;

  const linkClass = `text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary ${
    isScrolled || !isDarkBg ? 'text-foreground/80' : 'text-white/90'
  }`;

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waLink = `https://wa.me/${waNumber}`;

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Cars', href: '/cars' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={navClass} data-testid="navbar">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight">
              WAZIR TRADING <span className="text-primary text-sm tracking-normal">LLC</span>
            </span>
            <span className={`text-[10px] uppercase tracking-widest ${isScrolled || !isDarkBg ? 'text-muted-foreground' : 'text-white/70'}`}>
              Japanese Automotive Exports
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.name}
              </Link>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid="link-whatsapp-nav"
            >
              <Phone size={16} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border absolute top-20 left-0 w-full shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground text-lg font-medium p-2 hover:text-primary hover:bg-muted rounded-sm transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground p-3 rounded-sm font-medium mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone size={18} />
              <span>Contact via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
