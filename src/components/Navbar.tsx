import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, Bot, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-90 border-b border-outline-variant/30 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md py-3 shadow-md'
          : 'bg-surface/80 backdrop-blur-md py-5'
      }`}
      id="main-navbar"
    >
      <div className="flex justify-between items-center h-14 px-6 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-space text-lg md:text-xl font-bold text-primary tracking-tight transition-colors flex items-center gap-1.5"
          id="navbar-logo"
        >
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <span>Ayush Automation Lab</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-on-surface-variant hover:text-primary transition-colors font-semibold text-xs uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={onOpenBooking}
            className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-xs hover:bg-primary-container hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            id="book-consultation-btn"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book a Consultation</span>
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-outline-variant/20 bg-white shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-on-surface-variant hover:text-primary text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-outline-variant/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-xs hover:bg-primary-container text-center flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
