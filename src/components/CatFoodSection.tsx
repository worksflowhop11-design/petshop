import React from 'react';
import { ASSETS } from '../data/petshopData';
import { Heart, ShieldCheck, Droplet, Sparkles } from 'lucide-react';

interface CatFoodSectionProps {
  onOpenCalculator: () => void;
}

export const CatFoodSection: React.FC<CatFoodSectionProps> = ({ onOpenCalculator }) => {
  const catHighlights = [
    { title: 'Essential Taurine Enriched', desc: 'Critical for cardiac rhythm and crisp feline vision.', icon: Heart },
    { title: 'Urinary Tract Defense', desc: 'Controlled magnesium & mineral levels targeting pH 6.2–6.4.', icon: Droplet },
    { title: 'Gentle Hairball Passage', desc: 'Insoluble fiber matrix coats loose fur for natural gut passage.', icon: ShieldCheck },
    { title: '100% Meat & Fish Protein', desc: 'Tailored for obligate carnivores with zero artificial filler.', icon: Sparkles },
  ];

  return (
    <section id="cat-food" className="py-16 md:py-24 bg-[#FFFDF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* TEXT CONTENT SIDE */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D62828] text-white text-xs font-extrabold uppercase">
              <span>🐱 Feline Nutrition Spotlight</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#2B2B2B]">
              Pure Meat Nutrition for <span className="text-[#D62828]">Discerning Cats</span>
            </h2>

            <p className="text-base text-[#2B2B2B]/80 font-medium leading-relaxed">
              Cats are strict obligate carnivores that thrive on protein-dense diets rich in natural Taurine and marine Omega-3 fatty acids. PETSHOP feline formulas deliver mouth-watering taste while protecting urinary tract health and preventing hairball build-up.
            </p>

            {/* HIGHLIGHTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {catHighlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-[#FFE8A3] flex items-start gap-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#F4C430]/30 text-[#D62828] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#2B2B2B]">{h.title}</h4>
                      <p className="text-xs text-[#2B2B2B]/70 mt-0.5">{h.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ACTIONS */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCalculator}
                className="px-6 py-3.5 rounded-full bg-[#D62828] text-white font-bold text-sm shadow-md hover:bg-[#F4C430] hover:text-[#2B2B2B] transition-colors"
              >
                Calculate Daily Feeding Portion
              </button>

              <a
                href="#products"
                className="px-6 py-3.5 rounded-full bg-[#FFE8A3] text-[#2B2B2B] font-bold text-sm hover:bg-[#F4C430] transition-colors"
              >
                Browse Cat Line
              </a>
            </div>

          </div>

          {/* VISUAL SIDE */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="absolute -top-4 -right-4 w-60 h-60 bg-[#D62828]/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-60 h-60 bg-[#F4C430]/20 rounded-full blur-2xl -z-10" />

              <div className="rounded-3xl overflow-hidden border-4 border-[#FFE8A3] shadow-xl bg-white">
                <img
                  src={ASSETS.catFood}
                  alt="PETSHOP Cat Food Formula"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* SPECS BADGE */}
              <div className="absolute -bottom-6 left-6 right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#FFE8A3] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#2B2B2B]/60">Crude Protein</p>
                  <p className="text-lg font-black text-[#D62828]">Up to 38%</p>
                </div>
                <div className="h-8 w-px bg-[#FFE8A3]" />
                <div>
                  <p className="text-xs font-bold text-[#2B2B2B]/60">Taurine</p>
                  <p className="text-sm font-black text-[#2B2B2B]">0.25% Essential</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
