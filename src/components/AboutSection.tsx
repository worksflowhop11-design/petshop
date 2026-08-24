import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { ASSETS } from '../data/petshopData';

export const AboutSection: React.FC = () => {
  const features = [
    'Premium Quality Ingredients',
    'Complete & Balanced Nutrition',
    'Dog & Cat Food Collection',
    'Vet Recommended Formula',
    'Affordable Pricing',
    'Trusted by Thousands of Pet Parents',
  ];

  const handleScrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FFFDF8] relative overflow-hidden">
      {/* Decorative background glow elements */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 bg-[#1E4DB7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E1262E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: TEXT CONTENT */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* EYEBROW BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E4DB7]/10 text-[#1E4DB7] text-xs font-bold uppercase tracking-widest border border-[#1E4DB7]/20 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#1E4DB7]" />
              <span>ABOUT PETSHOP</span>
            </div>

            {/* LARGE HEADING */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B2B2B] leading-tight tracking-tight font-sans">
              Providing Healthy Nutrition <br className="hidden sm:inline" />
              <span className="text-[#1E4DB7]">for Every Pet</span>
            </h2>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg text-[#2B2B2B]/80 leading-relaxed font-medium">
              PETSHOP is committed to providing premium-quality nutrition for both dogs and cats. Every product is carefully selected using high-quality ingredients to support healthy growth, stronger immunity, improved digestion, shiny coats, and overall wellness. Our mission is to provide healthy, nutritious, and affordable pet food that every pet parent can trust. We believe every pet deserves balanced nutrition made with care, quality, and love.
            </p>

            {/* FEATURE LIST WITH MODERN ICONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#FFE8A3] shadow-xs hover:border-[#1E4DB7] hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1E4DB7] text-white flex items-center justify-center shrink-0 group-hover:bg-[#E1262E] transition-colors duration-200">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#2B2B2B] tracking-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA BUTTON */}
            <div className="pt-4">
              <a
                href="#products"
                onClick={handleScrollToProducts}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1E4DB7] text-white font-extrabold text-base shadow-xl shadow-[#1E4DB7]/25 hover:bg-[#E1262E] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: PETSHOP BRANDED PACKAGING SHOWCASE */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Backdrops */}
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-[#1E4DB7]/15 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-[#E1262E]/15 rounded-full blur-2xl -z-10" />

              {/* Main Packaging Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white group">
                <img
                  src={ASSETS.aboutPackages}
                  alt="PETSHOP Premium Branded Food Packaging"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Brand Badge Top */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-[#FFE8A3] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1E4DB7]" />
                  <span className="text-xs font-black text-[#2B2B2B] tracking-wider uppercase">
                    100% Original PETSHOP Formula
                  </span>
                </div>

                {/* Floating Rating Pill Bottom */}
                <div className="absolute bottom-4 right-4 bg-[#1E4DB7]/95 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20">
                  <Heart className="w-4 h-4 text-[#FFE8A3] fill-current" />
                  <div>
                    <p className="text-xs font-bold leading-none text-white">Vet Endorsed Recipe</p>
                    <p className="text-[10px] text-[#FFE8A3] font-medium">Dog & Cat Complete Nutrition</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
