import React, { useState, useEffect } from 'react';
import { Search, Menu, X, PawPrint, Phone, Mail } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate?: (path: string, sectionId?: string) => void;
  currentPath?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  activeSection,
  onNavigate,
  currentPath = '/',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Dogs Food', href: '#dog-food' },
    { label: 'Cats Food', href: '#cat-food' },
    { label: 'Products', href: '#products' },
    { label: 'Why PETSHOP', href: '#why-us' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Pet Care Blog', href: '#pet-care-blog' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (currentPath !== '/' && onNavigate) {
      onNavigate('/', href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('/', href);
      }
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full max-w-full">
      {/* 1. TOP ROYAL BLUE CONTACT BAR (~46px high) */}
      <div className="w-full bg-[#0755B8] text-white h-[46px] px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between text-xs sm:text-sm font-medium border-b border-white/10 select-none">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Phone */}
          <a
            href="tel:18002703585"
            className="flex items-center gap-2 hover:text-[#FFC21C] transition-colors py-1 group cursor-pointer"
          >
            <Phone className="w-4 h-4 text-white group-hover:text-[#FFC21C] transition-colors shrink-0" />
            <span className="font-semibold tracking-wide text-xs sm:text-sm">1800-270-3585</span>
          </a>

          {/* Right: Email */}
          <a
            href="mailto:petshop@gmail.com"
            className="flex items-center gap-2 hover:text-[#FFC21C] transition-colors py-1 group cursor-pointer"
          >
            <Mail className="w-4 h-4 text-white group-hover:text-[#FFC21C] transition-colors shrink-0" />
            <span className="font-semibold tracking-wide text-xs sm:text-sm">petshop@gmail.com</span>
          </a>
        </div>
      </div>

      {/* 2. MAIN WHITE NAVIGATION BAR (~90-100px high with subtle bottom shadow) */}
      <header
        className={`w-full bg-white h-[85px] lg:h-[95px] xl:h-[100px] transition-all duration-300 border-b border-[#FFE8A3]/40 ${
          isScrolled ? 'shadow-[0_6px_25px_rgba(0,0,0,0.08)]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
        }`}
      >
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-full flex items-center justify-between gap-2 sm:gap-4">
          
          {/* BRAND LOGO */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EE1630] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
              <PawPrint className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl sm:text-2xl xl:text-[25px] font-black tracking-tight text-[#061B3A] block font-sans leading-none">
                PET<span className="text-[#EE1630]">SHOP</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-[#EE1630] block mt-0.5 whitespace-nowrap">
                HEALTHY PETS, HAPPY LIFE
              </span>
            </div>
          </a>

          {/* DESKTOP NAVIGATION LINKS (Single row, responsive at 1366px, Home as red pill) */}
          <nav className="hidden min-[1140px]:flex items-center gap-1 xl:gap-2 2xl:gap-3 shrink">
            {navLinks.map((link) => {
              const isHome = link.label === 'Home';
              const isHomeActive = isHome && (activeSection === 'hero' || currentPath === '/');
              const isOtherActive = currentPath === '/' && activeSection === link.href.replace('#', '') && !isHome;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isHomeActive
                      ? 'bg-[#EE1630] text-white px-3.5 xl:px-4 py-1.5 xl:py-2 rounded-full font-bold text-xs xl:text-[13px] 2xl:text-[14px] shadow-sm hover:bg-[#D61429]'
                      : isOtherActive
                      ? 'text-[#EE1630] font-black text-xs xl:text-[13px] 2xl:text-[14px] px-1.5 xl:px-2 py-1'
                      : 'text-[#061B3A] hover:text-[#EE1630] font-semibold text-xs xl:text-[13px] 2xl:text-[14px] px-1.5 xl:px-2 py-1'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* RIGHT ACTION: PALE YELLOW "SEARCH FOOD" BUTTON */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 sm:px-4 xl:px-5 py-2 sm:py-2.5 rounded-full bg-[#FFE082] hover:bg-[#FFD54F] text-[#061B3A] font-black text-xs xl:text-xs tracking-wider uppercase shadow-xs hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
              title="Search Pet Food Formulas"
              aria-label="Search Food"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#061B3A] stroke-[2.5] shrink-0" />
              <span className="hidden xs:inline sm:inline">SEARCH FOOD</span>
            </button>

            {/* Tablet & Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[1140px]:hidden p-2 rounded-xl text-[#061B3A] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE & TABLET DRAWER NAV */}
      {mobileMenuOpen && (
        <div className="min-[1140px]:hidden bg-white/98 backdrop-blur-md border-b border-[#FFE8A3] shadow-xl px-6 py-6 space-y-2 animate-fadeIn max-h-[75vh] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = currentPath === '/' && activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-colors ${
                  isActive
                    ? 'bg-[#EE1630] text-white'
                    : 'text-[#061B3A] hover:bg-[#FFE082]/30 hover:text-[#EE1630]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
