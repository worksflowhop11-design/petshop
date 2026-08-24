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
    window.addEventListener('scroll', handleScroll);
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
    <div className="sticky top-0 z-50">
      {/* TOP HEADER CONTACT BAR */}
      <div className="bg-[#1E4DB7] text-white min-h-[40px] px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs sm:text-sm font-medium transition-all duration-300 border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Left Side Phone */}
          <a
            href="tel:18002703585"
            className="flex items-center gap-2 hover:text-[#F4C430] transition-colors duration-200 py-2 group cursor-pointer"
          >
            <Phone className="w-4 h-4 text-white group-hover:text-[#F4C430] transition-colors" />
            <span className="font-semibold tracking-wide">1800-270-3585</span>
          </a>

          {/* Right Side Email */}
          <a
            href="mailto:petshop@gmail.com"
            className="flex items-center gap-2 hover:text-[#F4C430] transition-colors duration-200 py-2 group cursor-pointer"
          >
            <Mail className="w-4 h-4 text-white group-hover:text-[#F4C430] transition-colors" />
            <span className="font-semibold tracking-wide">petshop@gmail.com</span>
          </a>
        </div>
      </div>

      {/* MAIN NAVIGATION HEADER */}
      <header
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF8]/95 backdrop-blur-md shadow-md py-3 border-b border-[#FFE8A3]'
            : 'bg-[#FFFDF8] py-4 border-b border-[#FFE8A3]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#D62828] flex items-center justify-center text-white shadow-md group-hover:bg-[#1E4DB7] group-hover:text-white transition-colors duration-300">
                <PawPrint className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-tight text-[#2B2B2B] flex items-center gap-1 font-sans">
                  PET<span className="text-[#D62828]">SHOP</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#D62828] block -mt-1">
                  Healthy Pets, Happy Life
                </span>
              </div>
            </a>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = currentPath === '/' && activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#D62828] text-white shadow-sm'
                        : 'text-[#2B2B2B] hover:text-[#D62828] hover:bg-[#FFE8A3]/40'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* ACTIONS: SEARCH ICON ONLY */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenSearch}
                className="p-2.5 rounded-full bg-[#FFE8A3]/50 text-[#2B2B2B] hover:bg-[#D62828] hover:text-white transition-all duration-200 shadow-sm flex items-center gap-2 text-sm font-medium cursor-pointer"
                title="Search Pet Food Formulas"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider pr-1">
                  Search Food
                </span>
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#2B2B2B] hover:bg-[#FFE8A3]/60 focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU DROPDOWN */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-[#FFE8A3] bg-[#FFFDF8] rounded-b-2xl shadow-lg px-2 space-y-1">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-4 py-2.5 rounded-xl text-base font-semibold text-[#2B2B2B] hover:bg-[#D62828] hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* MOBILE LEGAL LINKS */}
              <div className="pt-3 border-t border-[#FFE8A3]/60 flex flex-col gap-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigate) onNavigate('/privacy-policy');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#D62828] hover:bg-[#FFE8A3]/40 text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigate) onNavigate('/terms-and-conditions');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#D62828] hover:bg-[#FFE8A3]/40 text-left cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
