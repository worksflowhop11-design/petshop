import React, { useState } from 'react';
import { FAQS } from '../data/petshopData';
import { ChevronDown, HelpCircle, PawPrint } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FFFDF8] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE8A3] text-[#2B2B2B] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-[#D62828]" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2B2B]">
            Frequently Asked <span className="text-[#D62828]">Questions</span>
          </h2>

          <p className="text-sm text-[#2B2B2B]/75 font-medium mt-2">
            Everything you need to know about PETSHOP recipes, nutrition guidelines, and feeding practices.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border-2 border-[#FFE8A3] shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base font-extrabold text-[#2B2B2B] flex items-center gap-3">
                    <PawPrint className="w-4 h-4 text-[#D62828] shrink-0" />
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FFE8A3]/50 flex items-center justify-center text-[#2B2B2B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#D62828] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#2B2B2B]/80 font-medium leading-relaxed border-t border-[#FFE8A3]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
