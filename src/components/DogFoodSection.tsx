import React from 'react';
import { ASSETS } from '../data/petshopData';
import { CheckCircle2, Bone, Shield, Flame, Activity } from 'lucide-react';

interface DogFoodSectionProps {
  onOpenCalculator: () => void;
}

export const DogFoodSection: React.FC<DogFoodSectionProps> = ({ onOpenCalculator }) => {
  const highlights = [
    { title: 'Real Deboned Meat First', desc: 'No poultry by-product meal or cheap protein concentrates.', icon: Flame },
    { title: 'Joint & Bone Protection', desc: 'Enriched with Glucosamine & Chondroitin for smooth mobility.', icon: Bone },
    { title: 'Gut-Friendly Fibers', desc: 'Prebiotics & pumpkin for optimal stool consistency.', icon: Shield },
    { title: 'Radiant Coat Health', desc: 'Balanced Omega 3 & 6 for glossy fur and resilient skin.', icon: Activity },
  ];

  return (
    <section id="dog-food" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* IMAGE / VISUAL SIDE */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="absolute -top-4 -left-4 w-60 h-60 bg-[#F4C430]/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-60 h-60 bg-[#D62828]/20 rounded-full blur-2xl -z-10" />

              <div className="rounded-3xl overflow-hidden border-4 border-[#FFE8A3] shadow-xl bg-[#FFFDF8]">
                <img
                  src={ASSETS.dogFood}
                  alt="PETSHOP Dog Food Formula"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* FLOATING SPECS BADGE */}
              <div className="absolute -bottom-6 left-6 right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#FFE8A3] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#2B2B2B]/60">Crude Protein</p>
                  <p className="text-lg font-black text-[#D62828]">Up to 34%</p>
                </div>
                <div className="h-8 w-px bg-[#FFE8A3]" />
                <div>
                  <p className="text-xs font-bold text-[#2B2B2B]/60">Life Stages</p>
                  <p className="text-sm font-black text-[#2B2B2B]">Puppy to Senior</p>
                </div>
              </div>

            </div>
          </div>

          {/* TEXT CONTENT SIDE */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D62828] text-white text-xs font-extrabold uppercase">
              <span>🐶 Canine Nutrition Spotlight</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#2B2B2B]">
              Engineered for Your Dog’s <span className="text-[#D62828]">Vitality & Strength</span>
            </h2>

            <p className="text-base text-[#2B2B2B]/80 font-medium leading-relaxed">
              Whether you have a playful growing puppy, an athletic adult retriever, or a distinguished senior dog, PETSHOP Canine formulas supply the exact amino acid density, vitamins, and minerals required for long-term tail-wagging health.
            </p>

            {/* HIGHLIGHTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#FFE8A3] flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D62828]/10 text-[#D62828] flex items-center justify-center shrink-0">
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

            {/* ACTION & FEEDING CALCULATOR CALLOUT */}
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
                Browse Dog Line
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
