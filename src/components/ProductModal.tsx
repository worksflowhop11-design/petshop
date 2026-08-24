import React from 'react';
import { X, CheckCircle, PawPrint, Shield, BookOpen, Layers } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFFDF8] rounded-3xl shadow-2xl border-2 border-[#FFE8A3] p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-[#FFE8A3]/50 text-[#2B2B2B] hover:bg-[#D62828] hover:text-white transition-colors"
          aria-label="Close formula details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL HEADER */}
        <div className="flex flex-col sm:flex-row items-start gap-6 border-b border-[#FFE8A3] pb-6">
          <div className="w-full sm:w-1/3 aspect-square rounded-2xl overflow-hidden bg-white border border-[#FFE8A3] p-2 relative flex items-center justify-center">
            <img
              src={product.packageImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl"
            />
            <span className="absolute top-4 left-4 bg-[#D62828] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
              PETSHOP
            </span>
          </div>

          <div className="w-full sm:w-2/3 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE8A3] text-[#2B2B2B] text-xs font-bold">
              <PawPrint className="w-3.5 h-3.5 text-[#D62828]" />
              <span>{product.petTypeLabel}</span>
              <span className="mx-1">•</span>
              <span>{product.ageCategory}</span>
            </div>

            <h3 className="text-2xl font-black text-[#2B2B2B]">{product.name}</h3>

            <p className="text-sm text-[#2B2B2B]/80 font-medium leading-relaxed">
              {product.longDescription}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-lg bg-[#D62828]/10 text-[#D62828] font-bold text-xs border border-[#D62828]/20">
                {product.proteinPercentage}
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#F4C430]/20 text-[#2B2B2B] font-bold text-xs border border-[#F4C430]/40">
                {product.mainProtein}
              </span>
            </div>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="mt-6 space-y-6">
          {/* INGREDIENTS BREAKDOWN */}
          <div>
            <h4 className="text-base font-bold text-[#2B2B2B] flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-[#D62828]" />
              <span>Natural Ingredients Deck</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#FFE8A3] text-xs font-semibold text-[#2B2B2B] shadow-xs"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* GUARANTEED ANALYSIS */}
          <div>
            <h4 className="text-base font-bold text-[#2B2B2B] flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-[#D62828]" />
              <span>Guaranteed Nutritional Analysis</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {product.guaranteedAnalysis.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#FFE8A3]">
                  <p className="text-[11px] font-semibold text-[#2B2B2B]/60">{item.label}</p>
                  <p className="text-sm font-extrabold text-[#D62828]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FEEDING GUIDE TABLE */}
          <div>
            <h4 className="text-base font-bold text-[#2B2B2B] flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#D62828]" />
              <span>Recommended Daily Feeding Portion</span>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-[#FFE8A3] bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFE8A3]/50 text-[#2B2B2B] font-bold border-b border-[#FFE8A3]">
                  <tr>
                    <th className="p-3">Pet Body Weight</th>
                    <th className="p-3">Daily Grams</th>
                    <th className="p-3">Cups per Day</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FFE8A3]/30">
                  {product.feedingGuideGrams.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FFFDF8]">
                      <td className="p-3 font-medium text-[#2B2B2B]">{row.weightRange}</td>
                      <td className="p-3 font-extrabold text-[#D62828]">{row.dailyGrams}</td>
                      <td className="p-3 font-bold text-[#2B2B2B]">{row.cupsPerDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BENEFITS */}
          <div>
            <h4 className="text-base font-bold text-[#2B2B2B] mb-2">Key Health Benefits</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.benefits.map((b, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#2B2B2B]">
                  <CheckCircle className="w-4 h-4 text-[#D62828] shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="mt-8 pt-4 border-t border-[#FFE8A3] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#D62828] text-white font-bold text-sm hover:bg-[#F4C430] hover:text-[#2B2B2B] transition-colors"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
};
