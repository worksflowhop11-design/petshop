import React from 'react';
import { PawPrint, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleSectionNav = (href: string) => {
    if (onNavigate) {
      onNavigate('/', href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRouteNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <footer className="bg-[#2B2B2B] text-white pt-16 pb-8 border-t-4 border-[#D62828] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleSectionNav('#hero');
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#D62828] flex items-center justify-center text-white">
                <PawPrint className="w-6 h-6 fill-current text-[#F4C430]" />
              </div>
              <div>
                <span className="text-2xl font-black text-white">
                  PET<span className="text-[#F4C430]">SHOP</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#F4C430] block -mt-1">
                  Healthy Pets, Happy Life
                </span>
              </div>
            </a>

            <p className="text-xs text-white/75 font-medium leading-relaxed max-w-sm">
              PETSHOP is dedicated to elevating pet health through veterinarian-formulated, 100% natural canine and feline nutrition. Made with farm-fresh ingredients, real deboned meat, and active probiotics.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* INSTAGRAM */}
              <div className="group relative inline-flex items-center">
                <a
                  href="https://youtube.com/shorts/OVjJlHBP3sE?si=rEY35H-7Yg8DCqNY"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit PETSHOP Instagram"
                  title="Follow us on Instagram"
                  className="p-2.5 rounded-full bg-white/10 text-white hover:bg-[#D62828] hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D62828]/40 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                {/* TOOLTIP */}
                <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#1A1A1A] text-white text-[11px] font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 pointer-events-none z-30 border border-white/10">
                  Follow us on Instagram
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1A1A1A]" />
                </div>
              </div>

              {/* FACEBOOK */}
              <div className="group relative inline-flex items-center">
                <a
                  href="https://youtube.com/shorts/Fr-8_D4Ip2o?si=A2dYNIYDlMYxpXFN"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit PETSHOP Facebook"
                  title="Like us on Facebook"
                  className="p-2.5 rounded-full bg-white/10 text-white hover:bg-[#D62828] hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D62828]/40 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                {/* TOOLTIP */}
                <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#1A1A1A] text-white text-[11px] font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 pointer-events-none z-30 border border-white/10">
                  Like us on Facebook
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1A1A1A]" />
                </div>
              </div>

              {/* YOUTUBE */}
              <div className="group relative inline-flex items-center">
                <a
                  href="https://www.youtube.com/watch?v=AV94qMpz-Gs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit PETSHOP YouTube"
                  title="Watch our Videos"
                  className="p-2.5 rounded-full bg-white/10 text-white hover:bg-[#D62828] hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D62828]/40 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                {/* TOOLTIP */}
                <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#1A1A1A] text-white text-[11px] font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 pointer-events-none z-30 border border-white/10">
                  Watch our Videos
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1A1A1A]" />
                </div>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-[#F4C430] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs font-semibold text-white/80">
              <li>
                <button onClick={() => handleSectionNav('#hero')} className="hover:text-[#F4C430] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleSectionNav('#dog-food')} className="hover:text-[#F4C430] transition-colors cursor-pointer">
                  Dogs Food
                </button>
              </li>
              <li>
                <button onClick={() => handleSectionNav('#cat-food')} className="hover:text-[#F4C430] transition-colors cursor-pointer">
                  Cats Food
                </button>
              </li>
              <li>
                <button onClick={() => handleSectionNav('#products')} className="hover:text-[#F4C430] transition-colors cursor-pointer">
                  Product Showcase
                </button>
              </li>
              <li>
                <button onClick={() => handleSectionNav('#why-us')} className="hover:text-[#F4C430] transition-colors cursor-pointer">
                  Why PETSHOP
                </button>
              </li>
              <li>
                <button onClick={() => handleSectionNav('#benefits')} className="hover:text-[#F4C430] transition-colors cursor-pointer">
                  Our Benefits
                </button>
              </li>
            </ul>
          </div>

          {/* SUPPORT & INFO */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-[#F4C430] uppercase tracking-wider">Support & Info</h4>
            <ul className="space-y-2 text-xs font-semibold text-white/80">
              <li>
                <button onClick={() => handleSectionNav('#testimonials')} className="hover:text-[#F4C430] transition-colors cursor-pointer">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => handleSectionNav('#faq')} className="hover:text-[#F4C430] transition-colors cursor-pointer">
                  FAQ & Nutrition Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleSectionNav('#contact')} className="hover:text-[#F4C430] transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRouteNav('/privacy-policy')}
                  className="hover:text-[#F4C430] transition-colors font-bold text-white cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRouteNav('/terms-and-conditions')}
                  className="hover:text-[#F4C430] transition-colors font-bold text-white cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-[#F4C430] uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
                <span>101 Hill Town Impress, Nikol, Ahmedabad – 382350, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D62828] shrink-0" />
                <a href="tel:18002703585" className="hover:text-[#F4C430] transition-colors">
                  1800-270-3585
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D62828] shrink-0" />
                <a href="mailto:petshop@gmail.com" className="hover:text-[#F4C430] transition-colors">
                  petshop@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 font-medium gap-4">
          <p>© {new Date().getFullYear()} PETSHOP Nutrition Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleRouteNav('/privacy-policy')}
              className="hover:text-[#F4C430] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleRouteNav('/terms-and-conditions')}
              className="hover:text-[#F4C430] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
