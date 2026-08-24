import React from 'react';
import { MAIN_BENEFITS } from '../data/petshopData';
import { Award, Leaf, Heart, Smile } from 'lucide-react';

export const BenefitsGrid: React.FC = () => {
  const icons = [Award, Leaf, Heart, Smile];

  return (
    <section id="benefits" className="py-16 bg-[#FFE8A3]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-[#2B2B2B]">
            Four Core <span className="text-[#D62828]">Promises</span> We Live By
          </h2>
          <p className="text-sm font-medium text-[#2B2B2B]/70 mt-2">
            Every bag of PETSHOP is crafted to exceed strict nutritional guidelines and satisfy even the most discerning pets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MAIN_BENEFITS.map((item, idx) => {
            const Icon = icons[idx] || Award;
            return (
              <div
                key={item.id}
                className="group p-8 rounded-3xl bg-white border-2 border-[#FFE8A3] shadow-md hover:shadow-2xl hover:border-[#F4C430] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#D62828] text-white flex items-center justify-center shadow-lg group-hover:bg-[#F4C430] group-hover:text-[#2B2B2B] transition-colors duration-300 mb-5">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-black text-[#2B2B2B] mb-2">{item.title}</h3>

                <p className="text-xs text-[#2B2B2B]/75 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
