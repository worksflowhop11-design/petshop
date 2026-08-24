import React, { useState } from 'react';
import { PRODUCTS } from '../data/petshopData';
import { ProductCard } from './ProductCard';
import { ProductItem, PetType } from '../types';
import { PawPrint, Sparkles } from 'lucide-react';

interface ProductCollectionProps {
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({ onSelectProduct }) => {
  const [selectedPetType, setSelectedPetType] = useState<'all' | PetType>('all');
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>('all');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedPetType !== 'all' && product.petType !== selectedPetType) {
      return false;
    }
    if (subCategoryFilter !== 'all' && product.category !== subCategoryFilter) {
      return false;
    }
    return true;
  });

  return (
    <section id="products" className="py-16 md:py-24 bg-[#FFFDF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION TITLE */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE8A3] text-[#2B2B2B] text-xs font-bold uppercase tracking-wider">
            <PawPrint className="w-4 h-4 text-[#D62828]" />
            <span>Showcase Collection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B2B2B]">
            Our Premium <span className="text-[#D62828]">Pet Food</span> Collection
          </h2>

          <p className="text-base sm:text-lg text-[#2B2B2B]/75 font-medium">
            Explore our veterinarian-formulated recipes designed to provide complete, natural, and highly bio-available nutrition for dogs and cats at every life stage.
          </p>
        </div>

        {/* PET TYPE FILTER TABS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setSelectedPetType('all');
              setSubCategoryFilter('all');
            }}
            className={`px-6 py-3 rounded-full font-extrabold text-sm transition-all duration-200 ${
              selectedPetType === 'all'
                ? 'bg-[#D62828] text-white shadow-md'
                : 'bg-white text-[#2B2B2B] border border-[#FFE8A3] hover:bg-[#FFE8A3]/50'
            }`}
          >
            All Formulas ({PRODUCTS.length})
          </button>

          <button
            onClick={() => {
              setSelectedPetType('dog');
              setSubCategoryFilter('all');
            }}
            className={`px-6 py-3 rounded-full font-extrabold text-sm transition-all duration-200 flex items-center gap-2 ${
              selectedPetType === 'dog'
                ? 'bg-[#D62828] text-white shadow-md'
                : 'bg-white text-[#2B2B2B] border border-[#FFE8A3] hover:bg-[#FFE8A3]/50'
            }`}
          >
            <span>🐶 Dog Food</span>
          </button>

          <button
            onClick={() => {
              setSelectedPetType('cat');
              setSubCategoryFilter('all');
            }}
            className={`px-6 py-3 rounded-full font-extrabold text-sm transition-all duration-200 flex items-center gap-2 ${
              selectedPetType === 'cat'
                ? 'bg-[#D62828] text-white shadow-md'
                : 'bg-white text-[#2B2B2B] border border-[#FFE8A3] hover:bg-[#FFE8A3]/50'
            }`}
          >
            <span>🐱 Cat Food</span>
          </button>
        </div>

        {/* SPECIFIC FORMULA SUBCATEGORY PILLS */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {selectedPetType === 'dog' && (
            <>
              {[
                { id: 'all', label: 'All Dog Recipes' },
                { id: 'chicken-rice', label: 'Chicken & Rice' },
                { id: 'lamb-veg', label: 'Lamb & Vegetables' },
                { id: 'puppy', label: 'Puppy Nutrition' },
                { id: 'senior', label: 'Senior Formula' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSubCategoryFilter(sub.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    subCategoryFilter === sub.id
                      ? 'bg-[#F4C430] text-[#2B2B2B]'
                      : 'bg-white text-[#2B2B2B]/70 border border-[#FFE8A3]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </>
          )}

          {selectedPetType === 'cat' && (
            <>
              {[
                { id: 'all', label: 'All Cat Recipes' },
                { id: 'kitten', label: 'Kitten Growth' },
                { id: 'adult', label: 'Adult Cat Food' },
                { id: 'ocean-fish', label: 'Ocean Fish & Salmon' },
                { id: 'hairball', label: 'Hairball Control' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSubCategoryFilter(sub.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    subCategoryFilter === sub.id
                      ? 'bg-[#F4C430] text-[#2B2B2B]'
                      : 'bg-white text-[#2B2B2B]/70 border border-[#FFE8A3]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </>
          )}
        </div>

        {/* PRODUCT CARDS GRID */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {/* INFORMATIONAL DISCLAIMER BANNER */}
        <div className="mt-12 p-4 rounded-2xl bg-[#FFE8A3]/40 border border-[#F4C430] max-w-2xl mx-auto text-center flex items-center justify-center gap-2 text-xs font-bold text-[#2B2B2B]">
          <Sparkles className="w-4 h-4 text-[#D62828]" />
          <span>
            PETSHOP products are distributed through certified veterinary clinics, pet health centers, and authorized partners.
          </span>
        </div>

      </div>
    </section>
  );
};
