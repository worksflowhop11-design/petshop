import React, { useState } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { ProductItem } from '../types';
import { FirestoreProduct } from '../types/admin';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: any) => void;
  productsList?: (FirestoreProduct | ProductItem)[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  productsList = [],
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = productsList.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    const productCode = (p as any).productCode || '';
    const brand = (p as any).brand || 'PETSHOP';
    const category = p.category || '';
    const petType = p.petType || '';

    return (
      p.name.toLowerCase().includes(q) ||
      productCode.toLowerCase().includes(q) ||
      brand.toLowerCase().includes(q) ||
      category.toLowerCase().includes(q) ||
      petType.toLowerCase().includes(q) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
      (p.ingredients && Array.isArray(p.ingredients) && p.ingredients.some((i) => i.toLowerCase().includes(q))) ||
      (p.benefits && Array.isArray(p.benefits) && p.benefits.some((b) => b.toLowerCase().includes(q)))
    );
  });

  const popularTags = ['Chicken', 'Salmon', 'Dog Food', 'Cat Food', 'Wet Food', 'Puppy', 'Kitten', 'Lamb'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#FFFDF8] rounded-3xl shadow-2xl border-2 border-[#FFE8A3] p-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FFE8A3]/50 text-[#061B3A] hover:bg-[#EE1630] hover:text-white transition-colors cursor-pointer"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        {/* INPUT */}
        <div className="relative mt-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#EE1630]" />
          <input
            type="text"
            autoFocus
            placeholder="Search formulas by name, category, brand, pet type, or SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-[#FFE8A3] bg-white text-base font-bold text-[#061B3A] focus:outline-none focus:border-[#EE1630] shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-[#EE1630] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* POPULAR SUGGESTIONS */}
        {!query && (
          <div className="mt-6 space-y-3">
            <p className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Popular Search Categories &amp; Formulas
            </p>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#FFE8A3] text-xs font-bold text-[#061B3A] hover:bg-[#FFC21C] transition-colors cursor-pointer shadow-2xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS LIST */}
        {query && (
          <div className="mt-6 max-h-80 overflow-y-auto space-y-3 pr-1">
            <p className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Search Results ({searchResults.length})
            </p>

            {searchResults.length === 0 ? (
              <div className="py-8 text-center text-sm font-medium text-slate-500 bg-white rounded-2xl border border-[#FFE8A3]">
                No PETSHOP formulas match "{query}". Try searching for 'chicken', 'salmon', 'cat', or 'puppy'.
              </div>
            ) : (
              searchResults.map((p) => (
                <div
                  key={p.id || p.name}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-white border border-[#FFE8A3] hover:border-[#EE1630] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FFE8A3]/40 p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={p.packageImage}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-[#EE1630] uppercase">
                        {p.petTypeLabel || p.petType}
                      </span>
                      <h4 className="text-sm font-extrabold text-[#061B3A] group-hover:text-[#EE1630] transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">
                        {p.packSize || '3 kg'} • {p.proteinPercentage || 'High Protein'}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-[#EE1630] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
