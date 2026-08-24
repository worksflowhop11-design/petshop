import React from 'react';
import {
  WHY_PETSHOP_FEATURES
} from '../data/petshopData';
import {
  Leaf,
  Scale,
  Flame,
  Sparkles,
  ShieldCheck,
  Activity,
  HeartPulse,
  Smile,
  Stethoscope,
  Clock,
  PawPrint
} from 'lucide-react';

export const WhyPetshop: React.FC = () => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Leaf,
    Scale,
    Flame,
    Sparkles,
    ShieldCheck,
    Activity,
    HeartPulse,
    Smile,
    Stethoscope,
    Clock
  };

  return (
    <section id="why-us" className="py-16 md:py-24 bg-gradient-to-b from-[#FFFDF8] via-white to-[#FFFDF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D62828] text-white text-xs font-bold uppercase tracking-wider">
            <PawPrint className="w-4 h-4 text-[#F4C430] fill-current" />
            <span>The PETSHOP Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B2B2B]">
            Why Pet Owners Trust <span className="text-[#D62828]">PETSHOP</span>
          </h2>

          <p className="text-base sm:text-lg text-[#2B2B2B]/75 font-medium">
            We believe that pets deserve food made with the same care, freshness, and quality as human meals. Discover what sets our veterinarian-formulated recipes apart.
          </p>
        </div>

        {/* 10 PILLARS GRID */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {WHY_PETSHOP_FEATURES.map((feature) => {
            const IconComp = iconMap[feature.iconName] || Sparkles;
            return (
              <div
                key={feature.id}
                className="group p-5 rounded-3xl bg-white border-2 border-[#FFE8A3] shadow-sm hover:shadow-xl hover:border-[#D62828] transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFE8A3]/60 group-hover:bg-[#D62828] text-[#D62828] group-hover:text-white transition-colors duration-300 flex items-center justify-center shadow-xs">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <span className="inline-block text-[10px] font-black uppercase tracking-wider text-[#D62828] bg-[#D62828]/10 px-2 py-0.5 rounded-md">
                    {feature.highlight}
                  </span>

                  <h3 className="text-base font-extrabold text-[#2B2B2B] group-hover:text-[#D62828] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-[#2B2B2B]/70 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
