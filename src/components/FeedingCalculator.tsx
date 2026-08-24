import React, { useState } from 'react';
import { X, Calculator, PawPrint, Check, Scale } from 'lucide-react';
import { PetType } from '../types';

interface FeedingCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedingCalculator: React.FC<FeedingCalculatorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [petType, setPetType] = useState<PetType>('dog');
  const [weight, setWeight] = useState<number>(10); // default 10kg
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [lifeStage, setLifeStage] = useState<'young' | 'adult' | 'senior'>('adult');
  const [activity, setActivity] = useState<'low' | 'normal' | 'high'>('normal');

  // Calculation Logic
  const weightInKg = unit === 'lbs' ? weight * 0.453592 : weight;

  let baseGramsPerKg = petType === 'dog' ? 18 : 15; // base
  if (lifeStage === 'young') baseGramsPerKg *= 1.4;
  if (lifeStage === 'senior') baseGramsPerKg *= 0.85;

  if (activity === 'low') baseGramsPerKg *= 0.85;
  if (activity === 'high') baseGramsPerKg *= 1.25;

  const calculatedGrams = Math.round(weightInKg * baseGramsPerKg);
  const calculatedCups = (calculatedGrams / 110).toFixed(1); // ~110g per cup
  const recommendedWaterMl = Math.round(calculatedGrams * 2.5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-[#FFFDF8] rounded-3xl shadow-2xl border-2 border-[#FFE8A3] p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FFE8A3]/50 text-[#2B2B2B] hover:bg-[#D62828] hover:text-white transition-colors"
          aria-label="Close Feeding Calculator"
        >
          <X className="w-5 h-5" />
        </button>

        {/* TITLE */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#D62828] text-white flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#2B2B2B]">PETSHOP Feeding Calculator</h3>
            <p className="text-xs text-[#2B2B2B]/70">Calculate personalized daily kibble portion</p>
          </div>
        </div>

        {/* INPUT FORM */}
        <div className="space-y-5">
          {/* PET TYPE */}
          <div>
            <label className="text-xs font-extrabold uppercase text-[#2B2B2B]/70 block mb-2">
              1. Select Pet Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPetType('dog')}
                className={`py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
                  petType === 'dog'
                    ? 'bg-[#D62828] text-white border-[#D62828] shadow-sm'
                    : 'bg-white text-[#2B2B2B] border-[#FFE8A3] hover:bg-[#FFE8A3]/40'
                }`}
              >
                <span>🐶 Dog</span>
              </button>
              <button
                type="button"
                onClick={() => setPetType('cat')}
                className={`py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
                  petType === 'cat'
                    ? 'bg-[#D62828] text-white border-[#D62828] shadow-sm'
                    : 'bg-white text-[#2B2B2B] border-[#FFE8A3] hover:bg-[#FFE8A3]/40'
                }`}
              >
                <span>🐱 Cat</span>
              </button>
            </div>
          </div>

          {/* WEIGHT */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold uppercase text-[#2B2B2B]/70 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-[#D62828]" />
                <span>2. Pet Body Weight ({unit})</span>
              </label>
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setUnit('kg')}
                  className={`px-2 py-0.5 rounded font-bold ${
                    unit === 'kg' ? 'bg-[#F4C430] text-[#2B2B2B]' : 'text-[#2B2B2B]/60'
                  }`}
                >
                  KG
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setUnit('lbs')}
                  className={`px-2 py-0.5 rounded font-bold ${
                    unit === 'lbs' ? 'bg-[#F4C430] text-[#2B2B2B]' : 'text-[#2B2B2B]/60'
                  }`}
                >
                  LBS
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min={petType === 'dog' ? 1 : 0.5}
                max={petType === 'dog' ? 60 : 15}
                step={0.5}
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full accent-[#D62828] cursor-pointer"
              />
              <span className="w-16 text-center font-black text-lg text-[#D62828] bg-white border border-[#FFE8A3] py-1 px-2 rounded-xl">
                {weight} {unit}
              </span>
            </div>
          </div>

          {/* LIFE STAGE & ACTIVITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-extrabold uppercase text-[#2B2B2B]/70 block mb-2">
                Life Stage
              </label>
              <select
                value={lifeStage}
                onChange={(e) => setLifeStage(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[#FFE8A3] bg-white text-xs font-bold text-[#2B2B2B] focus:outline-none focus:border-[#D62828]"
              >
                <option value="young">{petType === 'dog' ? 'Puppy (0-12m)' : 'Kitten (0-12m)'}</option>
                <option value="adult">Adult (1-7 yrs)</option>
                <option value="senior">Senior (7+ yrs)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-extrabold uppercase text-[#2B2B2B]/70 block mb-2">
                Activity Level
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[#FFE8A3] bg-white text-xs font-bold text-[#2B2B2B] focus:outline-none focus:border-[#D62828]"
              >
                <option value="low">Low / Indoor Calm</option>
                <option value="normal">Normal Playful</option>
                <option value="high">Highly Athletic / Outdoor</option>
              </select>
            </div>
          </div>

          {/* RESULTS BOX */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#D62828] to-[#b31e1e] text-white shadow-lg space-y-3">
            <p className="text-xs uppercase font-extrabold text-[#FFE8A3] tracking-wider">
              Recommended Daily Ration
            </p>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-black">{calculatedGrams}</span>
                <span className="text-sm font-bold text-[#FFE8A3] ml-1">grams / day</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#FFE8A3]">{calculatedCups}</span>
                <span className="text-xs font-bold block">standard cups</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/20 text-xs font-medium text-white/90 flex items-center justify-between">
              <span>💧 Water recommendation:</span>
              <span className="font-extrabold text-[#FFE8A3]">~{recommendedWaterMl} ml / day</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#FFE8A3] text-[#2B2B2B] font-bold text-xs hover:bg-[#F4C430] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
