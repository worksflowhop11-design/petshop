import { ProductItem, BenefitFeature, Testimonial, FaqItem } from '../types';

import heroBannerImg from '../assets/images/petshop_hero_banner_1785849875067.jpg';
import dogFoodImg from '../assets/images/petshop_dog_food_1785849895056.jpg';
import catFoodImg from '../assets/images/petshop_cat_food_1785849913533.jpg';
import aboutPackagesImg from '../assets/images/petshop_about_packages_1785854541815.jpg';

// Unique package photoshoot images for every product
import dogChickenPkg from '../assets/images/petshop_dog_chicken_pkg_1786026681629.jpg';
import dogLambPkg from '../assets/images/petshop_dog_lamb_pkg_1786026700696.jpg';
import dogPuppyPkg from '../assets/images/petshop_dog_puppy_pkg_1786026716670.jpg';
import dogSeniorPkg from '../assets/images/petshop_dog_senior_pkg_1786026730148.jpg';
import dogSalmonPkg from '../assets/images/petshop_dog_salmon_pkg_1786026663273.jpg';
import dogSmallPkg from '../assets/images/petshop_dog_small_pkg_1786026745587.jpg';

import catKittenPkg from '../assets/images/petshop_cat_kitten_pkg_1786026761520.jpg';
import catAdultPkg from '../assets/images/petshop_cat_adult_pkg_1786026777274.jpg';
import catOceanPkg from '../assets/images/petshop_cat_ocean_pkg_1786026790163.jpg';
import catHairballPkg from '../assets/images/petshop_cat_hairball_pkg_1786026804557.jpg';
import catIndoorPkg from '../assets/images/petshop_cat_indoor_pkg_1786026819870.jpg';
import catSensitivePkg from '../assets/images/petshop_cat_sensitive_pkg_1786026836146.jpg';

// New Brand Packaging Collection & Photoshoot Assets
import fullCollectionImg from '../assets/images/petshop_full_collection_photoshoot_1787839334527.jpg';
import dogFood3kgImg from '../assets/images/petshop_dog_food_3kg_pkg_1787839358339.jpg';
import catFood3kgImg from '../assets/images/petshop_cat_food_3kg_pkg_1787839380110.jpg';
import wetFoodCansImg from '../assets/images/petshop_wet_food_cans_pkg_1787839401447.jpg';

export const ASSETS = {
  heroBanner: heroBannerImg,
  dogFood: dogFoodImg,
  catFood: catFoodImg,
  aboutPackages: aboutPackagesImg,
  fullCollection: fullCollectionImg,
  dogFood3kg: dogFood3kgImg,
  catFood3kg: catFood3kgImg,
  wetFoodCans: wetFoodCansImg,
};

export const PRODUCTS: ProductItem[] = [
  // ==================== FLAGSHIP 3KG PACKS & HERO PRODUCTS ====================
  {
    id: 'dog-premium-3kg',
    name: 'PETSHOP Premium Dog Food (3 kg)',
    category: 'chicken-rice',
    petType: 'dog',
    petTypeLabel: 'For All Adult Dog Breeds',
    packSize: '3 kg',
    shortDescription: 'Complete & Balanced Nutrition crafted with Real Chicken, High Protein, and essential vitamins for strong bones, healthy digestion & shiny coat.',
    longDescription: 'Petshop Premium Dog Food delivers an uncompromising blend of wholesome farm-raised chicken, vital amino acids, and essential fatty acids. Formulated in deep red and warm cream packaging with a proud Golden Retriever visual, it provides everything your canine companion needs for long-lasting energy and vitality.',
    ageCategory: 'Adult (1–7 Years)',
    ingredients: ['Real Deboned Chicken', 'Whole Brown Rice', 'Chicken Protein Meal', 'Sweet Potatoes', 'Fresh Carrots', 'Flaxseed Oil', 'Probiotic Complex', 'Chelated Minerals'],
    mainProtein: 'Real Cage-Free Chicken',
    proteinPercentage: '32% High Protein',
    fatPercentage: '16% Healthy Fats',
    fiberPercentage: '3.8% Crude Fiber',
    moisturePercentage: '10% Max Moisture',
    benefits: [
      'Real Chicken & High Protein',
      'Strong Bones & Healthy Digestion',
      'Shiny Coat & Daily Vitality',
      'Veterinarian Approved Quality Seal'
    ],
    packageImage: dogFood3kgImg,
    petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80', // Golden Retriever
    bagColor: 'red',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '32.0%' },
      { label: 'Crude Fat (Min)', value: '16.0%' },
      { label: 'Crude Fiber (Max)', value: '3.8%' },
      { label: 'Moisture (Max)', value: '10.0%' },
      { label: 'Calcium (Min)', value: '1.4%' },
      { label: 'Omega-6 (Min)', value: '3.2%' },
      { label: 'Omega-3 (Min)', value: '0.8%' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 5 kg (5–11 lbs)', dailyGrams: '50 – 95 g', cupsPerDay: '1/2 – 1 cup' },
      { weightRange: '5 – 10 kg (11–22 lbs)', dailyGrams: '95 – 160 g', cupsPerDay: '1 – 1 2/3 cups' },
      { weightRange: '10 – 25 kg (22–55 lbs)', dailyGrams: '160 – 320 g', cupsPerDay: '1 2/3 – 3 1/3 cups' },
      { weightRange: '25 – 45 kg (55–100 lbs)', dailyGrams: '320 – 500 g', cupsPerDay: '3 1/3 – 5 cups' }
    ]
  },
  {
    id: 'cat-premium-3kg',
    name: 'PETSHOP Premium Cat Food (3 kg)',
    category: 'adult',
    petType: 'cat',
    petTypeLabel: 'For All Adult Cat Breeds',
    packSize: '3 kg',
    shortDescription: 'Complete & Balanced Nutrition featuring Real Chicken, High Protein, Healthy Heart Taurine, Healthy Digestion, and radiant coat luster.',
    longDescription: 'Petshop Premium Cat Food in golden yellow and warm cream packaging is specially formulated for felines. Enriched with real poultry, vital Taurine for cardiovascular support, and controlled urinary minerals to keep your cat active, sleek, and happy.',
    ageCategory: 'Adult (1–7 Years)',
    ingredients: ['Real Chicken', 'Turkey Meal', 'Ocean Salmon Oil', 'Cranberry Extract', 'Taurine', 'Prebiotics FOS', 'Vitamin E & Zinc'],
    mainProtein: 'Real Farm Chicken',
    proteinPercentage: '36% High Protein',
    fatPercentage: '17% Nutrient Fat',
    fiberPercentage: '3.0% Gentle Fiber',
    moisturePercentage: '9.0% Max Moisture',
    benefits: [
      'Real Chicken & High Protein',
      'Healthy Heart with Essential Taurine',
      'Healthy Digestion & Shiny Coat',
      'Balanced Urinary Tract Support'
    ],
    packageImage: catFood3kgImg,
    petImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80', // Tabby Cat
    bagColor: 'gold',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '36.0%' },
      { label: 'Crude Fat (Min)', value: '17.0%' },
      { label: 'Taurine (Min)', value: '0.25%' },
      { label: 'Crude Fiber (Max)', value: '3.0%' },
      { label: 'Moisture (Max)', value: '9.0%' },
      { label: 'Magnesium (Max)', value: '0.08%' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 4 kg (4.5–9 lbs)', dailyGrams: '40 – 60 g', cupsPerDay: '1/3 – 1/2 cup' },
      { weightRange: '4 – 6 kg (9–13 lbs)', dailyGrams: '60 – 80 g', cupsPerDay: '1/2 – 2/3 cup' },
      { weightRange: '6 – 8 kg (13–18 lbs)', dailyGrams: '80 – 100 g', cupsPerDay: '2/3 – 3/4 cup' }
    ]
  },
  {
    id: 'dog-chicken-chunks-can',
    name: 'PETSHOP Chicken Chunks Wet Food (400g Can)',
    category: 'wet-food',
    petType: 'dog',
    petTypeLabel: 'Wet Food for Dogs & Puppies',
    packSize: '400g',
    shortDescription: 'Tender real chicken chunks slow-cooked in savory broth for maximum aroma, natural hydration, and irresistible mealtime flavor.',
    longDescription: 'Petshop Chicken Chunks 400g can brings real meat gastronomy to your dog’s bowl. Made in red and cream packaging with zero fillers, it can be served as a complete meal or mixed with dry kibble for enhanced palatability.',
    ageCategory: 'All Life Stages',
    ingredients: ['Fresh Chicken', 'Chicken Broth', 'Liver', 'Sweet Potato Starch', 'Vitamins & Minerals', 'Natural Gelling Agents'],
    mainProtein: 'Fresh Slow-Cooked Chicken',
    proteinPercentage: '11% Wet Protein (45% Dry Basis)',
    fatPercentage: '6.5% Healthy Fats',
    fiberPercentage: '1.2% Fiber',
    moisturePercentage: '78% Hydration Moisture',
    benefits: [
      'Real Slow-Cooked Chicken Chunks',
      'Boosts Daily Hydration & Satiety',
      'Rich Savory Broth Gravy',
      'Great for Picky Eaters'
    ],
    packageImage: wetFoodCansImg,
    petImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    bagColor: 'red',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '11.0%' },
      { label: 'Crude Fat (Min)', value: '6.5%' },
      { label: 'Moisture (Max)', value: '78.0%' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 5 kg', dailyGrams: '200 – 350 g', cupsPerDay: '1/2 – 1 can' },
      { weightRange: '5 – 15 kg', dailyGrams: '350 – 750 g', cupsPerDay: '1 – 2 cans' },
      { weightRange: '15 – 30 kg', dailyGrams: '750 – 1200 g', cupsPerDay: '2 – 3 cans' }
    ]
  },
  {
    id: 'cat-tuna-chunks-can',
    name: 'PETSHOP Tuna Chunks Wet Food (400g Can)',
    category: 'wet-food',
    petType: 'cat',
    petTypeLabel: 'Wet Food for Cats & Kittens',
    packSize: '400g',
    shortDescription: 'Delicate wild tuna chunks simmered in a light, savory jelly rich in natural Omega-3s and Taurine for optimal feline kidney health.',
    longDescription: 'Petshop Tuna Chunks 400g can in golden yellow packaging provides delicate moisture-rich nutrition that mimics a feline’s natural prey hydration. Packed with whole tuna cuts and fortified with essential amino acids.',
    ageCategory: 'All Life Stages',
    ingredients: ['Wild Tuna Red Meat', 'Tuna Broth', 'Taurine', 'Vitamin E', 'Natural Gelling Jelly'],
    mainProtein: 'Wild Caught Tuna Chunks',
    proteinPercentage: '12% Wet Protein (48% Dry Basis)',
    fatPercentage: '3.0% Marine Fats',
    fiberPercentage: '0.8% Fiber',
    moisturePercentage: '81% Hydration Moisture',
    benefits: [
      'Wild Tuna Flakes in Savory Jelly',
      'Critical Hydration for Kidney Health',
      'High Natural Taurine & Omega-3',
      'Irresistible Taste for Gourmet Cats'
    ],
    packageImage: wetFoodCansImg,
    petImage: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=600&q=80',
    bagColor: 'gold',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '12.0%' },
      { label: 'Crude Fat (Min)', value: '3.0%' },
      { label: 'Taurine (Min)', value: '0.15%' },
      { label: 'Moisture (Max)', value: '81.0%' }
    ],
    feedingGuideGrams: [
      { weightRange: '1 – 3 kg', dailyGrams: '100 – 200 g', cupsPerDay: '1/4 – 1/2 can' },
      { weightRange: '3 – 5 kg', dailyGrams: '200 – 350 g', cupsPerDay: '1/2 – 1 can' },
      { weightRange: '5 – 7 kg', dailyGrams: '350 – 450 g', cupsPerDay: '1 – 1 1/4 cans' }
    ]
  },

  // ==================== DRY DOG FOOD ====================
  {
    id: 'dog-chicken-rice',
    name: 'PETSHOP Classic Chicken & Whole Brown Rice',
    category: 'chicken-rice',
    petType: 'dog',
    petTypeLabel: 'For Adult Dogs',
    packSize: '3 kg / 1.2 kg',
    shortDescription: 'Farm-raised fresh chicken paired with digestible whole grains and essential vitamins for peak daily energy and active muscle maintenance.',
    longDescription: 'Crafted specifically for adult dogs of all breeds, PETSHOP Classic Chicken & Whole Brown Rice provides clean, wholesome nourishment. Real deboned chicken is our #1 ingredient, providing high-quality protein needed for lean muscle tissue.',
    ageCategory: 'Adult (1–7 Years)',
    ingredients: ['Fresh Deboned Chicken', 'Chicken Meal', 'Whole Brown Rice', 'Sweet Potatoes', 'Fresh Carrots', 'Flaxseed', 'Omega-3 Fish Oil', 'Chelated Minerals'],
    mainProtein: 'Real Cage-Free Chicken',
    proteinPercentage: '30% Crude Protein',
    fatPercentage: '16% Healthy Fats',
    fiberPercentage: '4% Crude Fiber',
    moisturePercentage: '10% Max Moisture',
    benefits: [
      'Promotes Lean Muscle Building',
      'Gentle on Sensitive Stomachs',
      'Rich in Omega-3 & 6 for Shiny Coat',
      'Enriched with Glucosamine for Joints'
    ],
    packageImage: dogChickenPkg,
    petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80', // Golden Retriever
    bagColor: 'gold',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '30.0%' },
      { label: 'Crude Fat (Min)', value: '16.0%' },
      { label: 'Crude Fiber (Max)', value: '4.0%' },
      { label: 'Moisture (Max)', value: '10.0%' },
      { label: 'Omega-6 Fatty Acids (Min)', value: '3.2%' },
      { label: 'Omega-3 Fatty Acids (Min)', value: '0.8%' },
      { label: 'Glucosamine (Min)', value: '450 mg/kg' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 5 kg (5–11 lbs)', dailyGrams: '50 – 95 g', cupsPerDay: '1/2 – 1 cup' },
      { weightRange: '5 – 10 kg (11–22 lbs)', dailyGrams: '95 – 160 g', cupsPerDay: '1 – 1 2/3 cups' },
      { weightRange: '10 – 25 kg (22–55 lbs)', dailyGrams: '160 – 320 g', cupsPerDay: '1 2/3 – 3 1/3 cups' },
      { weightRange: '25 – 45 kg (55–100 lbs)', dailyGrams: '320 – 500 g', cupsPerDay: '3 1/3 – 5 cups' }
    ]
  },
  {
    id: 'dog-lamb-veg',
    name: 'PETSHOP New Zealand Lamb & Garden Vegetables',
    category: 'lamb-veg',
    petType: 'dog',
    petTypeLabel: 'For Adult Dogs with Sensitivities',
    shortDescription: 'Grass-fed New Zealand lamb crafted with antioxidant-rich spinach, blueberries, and pumpkin for supreme skin & coat brilliance.',
    longDescription: 'An ideal formula for dogs prone to food sensitivities or skin irritation. Our single-source lamb protein combined with gut-friendly pumpkin and fiber-dense blueberries guarantees high bio-availability and gut comfort.',
    ageCategory: 'Adult (1–7 Years)',
    ingredients: ['Grass-Fed Lamb', 'Lamb Meal', 'Deboned Salmon', 'Pumpkin', 'Spinach', 'Blueberries', 'Pecan Shell Fiber', 'Probiotics'],
    mainProtein: 'Grass-Fed NZ Lamb',
    proteinPercentage: '32% Premium Protein',
    fatPercentage: '17% Healthy Fats',
    fiberPercentage: '3.8% Crude Fiber',
    moisturePercentage: '9.5% Max Moisture',
    benefits: [
      'Single Novel Animal Protein Base',
      'Hypoallergenic & Easy Digestibility',
      'Antioxidant Boost for Immune System',
      'Reduces Itching & Skin Flaking'
    ],
    packageImage: dogLambPkg,
    petImage: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80', // Border Collie / Australian Shepherd
    bagColor: 'red',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '32.0%' },
      { label: 'Crude Fat (Min)', value: '17.0%' },
      { label: 'Crude Fiber (Max)', value: '3.8%' },
      { label: 'Moisture (Max)', value: '9.5%' },
      { label: 'Calcium (Min)', value: '1.4%' },
      { label: 'Phosphorus (Min)', value: '1.1%' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 5 kg (5–11 lbs)', dailyGrams: '45 – 90 g', cupsPerDay: '1/2 – 1 cup' },
      { weightRange: '5 – 10 kg (11–22 lbs)', dailyGrams: '90 – 150 g', cupsPerDay: '1 – 1 1/2 cups' },
      { weightRange: '10 – 25 kg (22–55 lbs)', dailyGrams: '150 – 300 g', cupsPerDay: '1 1/2 – 3 cups' },
      { weightRange: '25 – 45 kg (55–100 lbs)', dailyGrams: '300 – 480 g', cupsPerDay: '3 – 4 3/4 cups' }
    ]
  },
  {
    id: 'dog-puppy-nutrition',
    name: 'PETSHOP Growth & DHA Puppy Formula',
    category: 'puppy',
    petType: 'dog',
    petTypeLabel: 'For Growing Puppies',
    shortDescription: 'DHA-enriched recipe tailored for healthy brain development, bone density, and robust puppy playfulness in the first 12 months.',
    longDescription: 'Growing puppies require higher caloric precision and essential fatty acids for brain, eye, and skeletal growth. PETSHOP Puppy Growth formula features natural DHA from cold-water salmon oil, calcium for sturdy bones, and easy-to-chew small kibble size.',
    ageCategory: 'Puppy (2–12 Months)',
    ingredients: ['Fresh Deboned Chicken', 'Wild-Caught Salmon Oil', 'Egg Powder', 'Whole Oats', 'Carrots', 'Colostrum', 'DHA Fatty Acids'],
    mainProtein: 'Free-Range Chicken & Salmon',
    proteinPercentage: '34% Growth Protein',
    fatPercentage: '18% Vital Fatty Acids',
    fiberPercentage: '3.5% Crude Fiber',
    moisturePercentage: '10% Max Moisture',
    benefits: [
      'High DHA for Brain & Vision Development',
      'Optimized Calcium:Phosphorus Ratio',
      'Small Kibble for Easy Chewing',
      'Colostrum Boost for Immuno-Shield'
    ],
    packageImage: dogPuppyPkg,
    petImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80', // Beagle Puppy
    bagColor: 'gold',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '34.0%' },
      { label: 'Crude Fat (Min)', value: '18.0%' },
      { label: 'DHA (Min)', value: '0.2%' },
      { label: 'Calcium (Min)', value: '1.5%' },
      { label: 'Phosphorus (Min)', value: '1.2%' }
    ],
    feedingGuideGrams: [
      { weightRange: '1 – 3 kg (2–6 lbs)', dailyGrams: '40 – 80 g', cupsPerDay: '1/3 – 3/4 cup' },
      { weightRange: '3 – 8 kg (6–17 lbs)', dailyGrams: '80 – 160 g', cupsPerDay: '3/4 – 1 1/2 cups' },
      { weightRange: '8 – 15 kg (17–33 lbs)', dailyGrams: '160 – 260 g', cupsPerDay: '1 1/2 – 2 1/2 cups' }
    ]
  },
  {
    id: 'dog-senior-formula',
    name: 'PETSHOP Vitality & Mobility Senior Formula',
    category: 'senior',
    petType: 'dog',
    petTypeLabel: 'For Mature & Senior Dogs',
    shortDescription: 'Joint-protecting formula with Chondroitin, L-Carnitine, and reduced calorie density to keep mature dogs active, lean, and pain-free.',
    longDescription: 'As dogs enter their golden years, joint comfort, weight control, and cardiac support become top priorities. PETSHOP Senior Formula features lowered sodium, extra Glucosamine & Chondroitin, and L-Carnitine to mobilize fat into lean cellular energy.',
    ageCategory: 'Senior (7+ Years)',
    ingredients: ['Lean Deboned Turkey', 'Salmon Meal', 'Green Lipped Mussel', 'Chondroitin Sulfate', 'Glucosamine', 'L-Carnitine', 'Turmeric Root'],
    mainProtein: 'Lean Farm Turkey',
    proteinPercentage: '28% Lean Protein',
    fatPercentage: '12% Controlled Fat',
    fiberPercentage: '5.0% Gut Fiber',
    moisturePercentage: '10% Max Moisture',
    benefits: [
      'High Glucosamine + Chondroitin Joint Relief',
      'L-Carnitine Fat Burner for Weight Support',
      'Turmeric & Anti-inflammatory Herbs',
      'Soft Kibble Matrix for Easy Mastication'
    ],
    packageImage: dogSeniorPkg,
    petImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80', // German Shepherd / Senior
    bagColor: 'dark-red',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '28.0%' },
      { label: 'Crude Fat (Min)', value: '12.0%' },
      { label: 'Glucosamine (Min)', value: '750 mg/kg' },
      { label: 'Chondroitin (Min)', value: '600 mg/kg' },
      { label: 'L-Carnitine (Min)', value: '150 mg/kg' }
    ],
    feedingGuideGrams: [
      { weightRange: '5 – 10 kg (11–22 lbs)', dailyGrams: '85 – 140 g', cupsPerDay: '3/4 – 1 1/3 cups' },
      { weightRange: '10 – 25 kg (22–55 lbs)', dailyGrams: '140 – 280 g', cupsPerDay: '1 1/3 – 2 3/4 cups' },
      { weightRange: '25 – 40 kg (55–88 lbs)', dailyGrams: '280 – 400 g', cupsPerDay: '2 3/4 – 4 cups' }
    ]
  },
  {
    id: 'dog-salmon-sensitive',
    name: 'PETSHOP Wild Alaskan Salmon & Sweet Potato',
    category: 'lamb-veg',
    petType: 'dog',
    petTypeLabel: 'For Sensitive Skin & Coat',
    shortDescription: 'Cold-water Alaskan salmon recipe rich in pure EPA & DHA Omega oils for radiant fur, calm digestion, and zero grain fillers.',
    longDescription: 'Specially designed for dogs with severe poultry allergies or dry, flaky coats. Cold-caught Alaskan salmon provides clean, highly digestible amino acids alongside sweet potatoes and ocean kelp.',
    ageCategory: 'Adult (1–7 Years)',
    ingredients: ['Wild Alaskan Salmon', 'Salmon Meal', 'Sweet Potatoes', 'Peas', 'Ocean Kelp', 'Flaxseed', 'Blueberries'],
    mainProtein: 'Wild Alaskan Salmon',
    proteinPercentage: '31% Marine Protein',
    fatPercentage: '16% Omega Fats',
    fiberPercentage: '3.6% Fiber',
    moisturePercentage: '9.5% Max Moisture',
    benefits: [
      'Rich in EPA/DHA Omega-3 for Glossy Coat',
      'Grain-Free & Poultry-Free Formula',
      'Soothes Redness & Skin Sensitivities',
      'Natural Ocean Kelp Trace Minerals'
    ],
    packageImage: dogSalmonPkg,
    petImage: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=600&q=80', // Siberian Husky
    bagColor: 'gold',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '31.0%' },
      { label: 'Crude Fat (Min)', value: '16.0%' },
      { label: 'Omega-3 Fatty Acids (Min)', value: '1.4%' },
      { label: 'Omega-6 Fatty Acids (Min)', value: '2.8%' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 5 kg (5–11 lbs)', dailyGrams: '50 – 90 g', cupsPerDay: '1/2 – 1 cup' },
      { weightRange: '5 – 10 kg (11–22 lbs)', dailyGrams: '90 – 155 g', cupsPerDay: '1 – 1 2/3 cups' },
      { weightRange: '10 – 25 kg (22–55 lbs)', dailyGrams: '155 – 310 g', cupsPerDay: '1 2/3 – 3 1/4 cups' }
    ]
  },
  {
    id: 'dog-small-breed',
    name: 'PETSHOP Small Breed Mini Bites Chicken & Pumpkin',
    category: 'chicken-rice',
    petType: 'dog',
    petTypeLabel: 'For Small & Toy Breeds',
    shortDescription: 'High-density protein micro-kibble designed for smaller jaws, faster metabolisms, and dental tartar reduction in tiny canines.',
    longDescription: 'Small and toy breed dogs have faster metabolic rates and compact mouths. PETSHOP Small Breed formula provides concentrated caloric density, easy-to-crunch micro kibbles, and pumpkin for digestive harmony.',
    ageCategory: 'Adult (1–8 Years)',
    ingredients: ['Deboned Chicken', 'Pumpkin', 'Whole Oats', 'Chicken Fat', 'Apples', 'Probiotics', 'Zinc Chelate'],
    mainProtein: 'Deboned Chicken & Pumpkin',
    proteinPercentage: '33% Dense Protein',
    fatPercentage: '17% Fast Metabolism Fats',
    fiberPercentage: '3.2% Fiber',
    moisturePercentage: '10% Max Moisture',
    benefits: [
      'Micro-Kibble Specially Size-Matched for Tiny Mouths',
      'Higher Caloric Density for Active Small Breeds',
      'Tartar Control Texture Cleans Teeth',
      'Supports Fast Metabolism & Energy'
    ],
    packageImage: dogSmallPkg,
    petImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80', // French Bulldog / Toy Breed
    bagColor: 'red',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '33.0%' },
      { label: 'Crude Fat (Min)', value: '17.0%' },
      { label: 'Crude Fiber (Max)', value: '3.2%' },
      { label: 'Calcium (Min)', value: '1.3%' }
    ],
    feedingGuideGrams: [
      { weightRange: '1 – 3 kg (2–6 lbs)', dailyGrams: '35 – 70 g', cupsPerDay: '1/3 – 2/3 cup' },
      { weightRange: '3 – 6 kg (6–13 lbs)', dailyGrams: '70 – 115 g', cupsPerDay: '2/3 – 1 1/4 cups' },
      { weightRange: '6 – 10 kg (13–22 lbs)', dailyGrams: '115 – 165 g', cupsPerDay: '1 1/4 – 1 3/4 cups' }
    ]
  },

  // ==================== CAT FOOD ====================
  {
    id: 'cat-kitten-nutrition',
    name: 'PETSHOP Pure Growth Kitten Formula',
    category: 'kitten',
    petType: 'cat',
    petTypeLabel: 'For Growing Kittens',
    shortDescription: 'High-protein, Taurine-rich recipe designed for fast muscular development, bright eyes, and shiny coats in young felines.',
    longDescription: 'Kittens require intensive protein and essential Taurine to build cardiac tissues and healthy vision. PETSHOP Pure Growth Kitten formula packs real deboned chicken, ocean salmon oil, and prebiotic FOS into bite-sized kibble designed for tiny jaws.',
    ageCategory: 'Kitten (2–12 Months)',
    ingredients: ['Deboned Chicken', 'Fresh Salmon', 'Chicken Liver', 'Egg Powder', 'Salmon Oil (Source of DHA)', 'Taurine', 'Prebiotics FOS'],
    mainProtein: 'Deboned Chicken & Salmon',
    proteinPercentage: '38% High Protein',
    fatPercentage: '20% Nutrient-Dense Fat',
    fiberPercentage: '2.5% Low Fiber',
    moisturePercentage: '9% Max Moisture',
    benefits: [
      'High Essential Taurine for Cardiac Health',
      'DHA from Salmon Oil for Cognitive Sharpness',
      'Ultra-Small Micro Kibble Matrix',
      'Immune Defense Complex'
    ],
    packageImage: catKittenPkg,
    petImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80', // Playful Ragdoll Kitten
    bagColor: 'red',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '38.0%' },
      { label: 'Crude Fat (Min)', value: '20.0%' },
      { label: 'Taurine (Min)', value: '0.25%' },
      { label: 'DHA (Min)', value: '0.18%' },
      { label: 'Magnesium (Max)', value: '0.08%' }
    ],
    feedingGuideGrams: [
      { weightRange: '0.5 – 1.5 kg (1–3 lbs)', dailyGrams: '25 – 45 g', cupsPerDay: '1/4 – 1/2 cup' },
      { weightRange: '1.5 – 3 kg (3–6.5 lbs)', dailyGrams: '45 – 70 g', cupsPerDay: '1/2 – 3/4 cup' },
      { weightRange: '3 – 5 kg (6.5–11 lbs)', dailyGrams: '70 – 100 g', cupsPerDay: '3/4 – 1 cup' }
    ]
  },
  {
    id: 'cat-adult-food',
    name: 'PETSHOP Active Vitality Adult Cat Food',
    category: 'adult',
    petType: 'cat',
    petTypeLabel: 'For Adult Cats (1–7 Years)',
    shortDescription: 'Balanced poultry and fish recipe formulated with controlled urinary pH minerals, active probiotics, and shiny-coat omega fats.',
    longDescription: 'Cats are obligate carnivores that thrive on rich meat proteins and balanced moisture ratios. PETSHOP Active Vitality Adult Cat formula provides complete day-to-day nourishment, supporting urinary tract safety, oral hygiene, and playful vitality.',
    ageCategory: 'Adult (1–7 Years)',
    ingredients: ['Fresh Deboned Chicken', 'Turkey Meal', 'Salmon Meal', 'Whole Cranberries', 'Dl-Methionine', 'Probiotics', 'Taurine'],
    mainProtein: 'Poultry & Ocean Fish',
    proteinPercentage: '36% Meat Protein',
    fatPercentage: '16% Balanced Fats',
    fiberPercentage: '3.0% Crude Fiber',
    moisturePercentage: '9% Max Moisture',
    benefits: [
      'Urinary Tract Support with Balanced pH',
      'Cranberry Extract for Bladder Health',
      'Plaque-Reduction Kibble Texture',
      'Zero Artificial Flavors or Corn/Soy'
    ],
    packageImage: catAdultPkg,
    petImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80', // British Shorthair / Tuxedo Cat
    bagColor: 'gold',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '36.0%' },
      { label: 'Crude Fat (Min)', value: '16.0%' },
      { label: 'Taurine (Min)', value: '0.2%' },
      { label: 'Magnesium (Max)', value: '0.09%' },
      { label: 'pH Target', value: '6.2 – 6.4' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 4 kg (4.5–9 lbs)', dailyGrams: '40 – 60 g', cupsPerDay: '1/3 – 1/2 cup' },
      { weightRange: '4 – 6 kg (9–13 lbs)', dailyGrams: '60 – 80 g', cupsPerDay: '1/2 – 2/3 cup' },
      { weightRange: '6 – 8 kg (13–18 lbs)', dailyGrams: '80 – 100 g', cupsPerDay: '2/3 – 3/4 cup' }
    ]
  },
  {
    id: 'cat-ocean-fish',
    name: 'PETSHOP Wild Ocean Salmon & Tuna Feast',
    category: 'ocean-fish',
    petType: 'cat',
    petTypeLabel: 'For Gourmet Cats',
    shortDescription: 'Rich, wild-caught salmon and yellowfin tuna recipe bursting with natural Omega-3s to satisfy seafood-loving cats.',
    longDescription: 'For cats that crave authentic oceanic flavors, PETSHOP Ocean Fish Recipe combines cold-water salmon fillet and yellowfin tuna with ocean kelp and flaxseed. Naturally irresistible taste with zero synthetic attractants.',
    ageCategory: 'All Life Stages',
    ingredients: ['Wild Salmon', 'Yellowfin Tuna Meal', 'Deboned Whitefish', 'Ocean Kelp', 'Flaxseed', 'Carrots', 'Taurine', 'Vitamin E'],
    mainProtein: 'Wild Salmon & Yellowfin Tuna',
    proteinPercentage: '37% Marine Protein',
    fatPercentage: '17% Omega-3 Rich Fats',
    fiberPercentage: '3.2% Crude Fiber',
    moisturePercentage: '9.0% Max Moisture',
    benefits: [
      '100% Wild-Caught Marine Protein Base',
      'Unsurpassed Palatability for Picky Eaters',
      'Deep Skin Hydration & Silkiness',
      'High Natural DHA & EPA Content'
    ],
    packageImage: catOceanPkg,
    petImage: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=600&q=80', // Exotic Bengal Cat
    bagColor: 'dark-red',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '37.0%' },
      { label: 'Crude Fat (Min)', value: '17.0%' },
      { label: 'Omega-3 Fatty Acids (Min)', value: '1.2%' },
      { label: 'Taurine (Min)', value: '0.22%' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 4 kg (4.5–9 lbs)', dailyGrams: '38 – 58 g', cupsPerDay: '1/3 – 1/2 cup' },
      { weightRange: '4 – 6 kg (9–13 lbs)', dailyGrams: '58 – 78 g', cupsPerDay: '1/2 – 2/3 cup' },
      { weightRange: '6 – 8 kg (13–18 lbs)', dailyGrams: '78 – 95 g', cupsPerDay: '2/3 – 3/4 cup' }
    ]
  },
  {
    id: 'cat-hairball-control',
    name: 'PETSHOP Gentle Fiber Hairball Control',
    category: 'hairball',
    petType: 'cat',
    petTypeLabel: 'For Indoor & Long-Hair Cats',
    shortDescription: 'Natural insoluble miscanthus grass fiber and psyllium seed husk formula designed to safely pass ingested hair through the digestive track.',
    longDescription: 'Grooming cats ingest significant amounts of loose hair, often leading to unpleasant hairball regurgitation. PETSHOP Hairball Control incorporates natural vegetable fiber matrices that coat ingested hair and facilitate gentle, natural passage.',
    ageCategory: 'Adult & Senior (1+ Years)',
    ingredients: ['Deboned Turkey', 'Chicken Meal', 'Miscanthus Grass Fiber', 'Psyllium Husk', 'Beet Pulp', 'Yucca Schidigera', 'Probiotics'],
    mainProtein: 'Lean Turkey & Chicken',
    proteinPercentage: '34% Balanced Protein',
    fatPercentage: '14% Controlled Fat',
    fiberPercentage: '6.5% Fiber Matrix',
    moisturePercentage: '9.0% Max Moisture',
    benefits: [
      'Gently Sweeps Ingested Hair Through Gut',
      'L-Carnitine for Calorie Control in Indoor Cats',
      'Yucca Extract Reduces Litter Box Odors',
      'Supports Healthy Intestinal Microflora'
    ],
    packageImage: catHairballPkg,
    petImage: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80', // Fluffy White Persian Cat
    bagColor: 'gold',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '34.0%' },
      { label: 'Crude Fat (Min)', value: '14.0%' },
      { label: 'Crude Fiber (Max)', value: '6.5%' },
      { label: 'Taurine (Min)', value: '0.2%' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 4 kg (4.5–9 lbs)', dailyGrams: '35 – 55 g', cupsPerDay: '1/3 – 1/2 cup' },
      { weightRange: '4 – 6 kg (9–13 lbs)', dailyGrams: '55 – 75 g', cupsPerDay: '1/2 – 2/3 cup' },
      { weightRange: '6 – 8 kg (13–18 lbs)', dailyGrams: '75 – 90 g', cupsPerDay: '2/3 – 3/4 cup' }
    ]
  },
  {
    id: 'cat-indoor-weight',
    name: 'PETSHOP Indoor Slim & Fit Weight Control',
    category: 'adult',
    petType: 'cat',
    petTypeLabel: 'For Indoor Weight Management',
    shortDescription: 'L-Carnitine infused recipe with reduced caloric density and high fiber satisfying indoor cats with lower physical activity levels.',
    longDescription: 'Indoor cats spend less energy roaming and hunting. PETSHOP Slim & Fit provides optimal protein nutrition with 25% lower fat and L-Carnitine fat burners to keep sedentary cats at their ideal body condition.',
    ageCategory: 'Adult (1–10 Years)',
    ingredients: ['Lean Deboned Chicken', 'Turkey Meal', 'Cellulose Fiber', 'L-Carnitine', 'Cranberry Extract', 'Probiotics'],
    mainProtein: 'Lean Deboned Chicken',
    proteinPercentage: '35% High Protein',
    fatPercentage: '11% Reduced Fat',
    fiberPercentage: '6.0% Satiety Fiber',
    moisturePercentage: '9% Max Moisture',
    benefits: [
      '25% Less Fat to Prevent Weight Gain',
      'L-Carnitine Mobilizes Stored Body Fat',
      'High Satiety Fiber Prevents Begging',
      'Cranberry Urinary Health Support'
    ],
    packageImage: catIndoorPkg,
    petImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80', // Sleek Siamese Cat
    bagColor: 'gold',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '35.0%' },
      { label: 'Crude Fat (Min)', value: '11.0%' },
      { label: 'L-Carnitine (Min)', value: '120 mg/kg' },
      { label: 'Taurine (Min)', value: '0.2%' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 4 kg (4.5–9 lbs)', dailyGrams: '30 – 50 g', cupsPerDay: '1/4 – 1/2 cup' },
      { weightRange: '4 – 6 kg (9–13 lbs)', dailyGrams: '50 – 70 g', cupsPerDay: '1/2 – 2/3 cup' }
    ]
  },
  {
    id: 'cat-sensitive-stomach',
    name: 'PETSHOP Gentle Turkey & Digestive Care',
    category: 'adult',
    petType: 'cat',
    petTypeLabel: 'For Sensitive Stomachs',
    shortDescription: 'Hypoallergenic turkey formula enriched with digestive enzymes and soothing pumpkin to alleviate vomiting and soft stool issues.',
    longDescription: 'Formulated specifically for felines with gastrointestinal sensitivities or food allergies. Single-source farm turkey combined with prebiotic FOS and pumpkin restores gut balance.',
    ageCategory: 'All Life Stages',
    ingredients: ['Farm-Raised Turkey', 'Turkey Meal', 'Pumpkin', 'Chicory Root', 'Digestive Enzymes', 'Probiotics', 'Omega-3 Fish Oil'],
    mainProtein: 'Single Source Farm Turkey',
    proteinPercentage: '36% Gentle Protein',
    fatPercentage: '15% Digestible Fats',
    fiberPercentage: '3.5% Gentle Fiber',
    moisturePercentage: '9% Max Moisture',
    benefits: [
      'Single Animal Protein Base Eliminates Reaction Triggers',
      'Soothing Pumpkin & Prebiotic Fiber',
      'Active Enzymes Speed Nutrient Absorption',
      'Reduces Stomach Upset & Hairballs'
    ],
    packageImage: catSensitivePkg,
    petImage: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=600&q=80', // Scottish Fold Cat
    bagColor: 'red',
    guaranteedAnalysis: [
      { label: 'Crude Protein (Min)', value: '36.0%' },
      { label: 'Crude Fat (Min)', value: '15.0%' },
      { label: 'Crude Fiber (Max)', value: '3.5%' },
      { label: 'Moisture (Max)', value: '9.0%' }
    ],
    feedingGuideGrams: [
      { weightRange: '2 – 4 kg (4.5–9 lbs)', dailyGrams: '35 – 55 g', cupsPerDay: '1/3 – 1/2 cup' },
      { weightRange: '4 – 6 kg (9–13 lbs)', dailyGrams: '55 – 75 g', cupsPerDay: '1/2 – 2/3 cup' }
    ]
  }
];


export const WHY_PETSHOP_FEATURES: BenefitFeature[] = [
  {
    id: 'f1',
    title: 'Natural Ingredients',
    description: '100% real meat, farm-fresh vegetables, and wholesome whole grains without artificial preservatives, fillers, or synthetic dyes.',
    iconName: 'Leaf',
    highlight: 'Pure & Clean'
  },
  {
    id: 'f2',
    title: 'Balanced Nutrition',
    description: 'Precision macronutrient ratios crafted alongside veterinary nutritionists to support daily endurance and metabolic harmony.',
    iconName: 'Scale',
    highlight: 'Vet Formulated'
  },
  {
    id: 'f3',
    title: 'High Protein Content',
    description: 'First ingredient is always real deboned meat or wild-caught fish, delivering muscle-building amino acids.',
    iconName: 'Flame',
    highlight: 'Real Meat First'
  },
  {
    id: 'f4',
    title: 'Digestive Health',
    description: 'Enriched with live active probiotics, prebiotic FOS fiber, and soothing pumpkin for smooth gut motility.',
    iconName: 'Sparkles',
    highlight: 'Probiotic Shield'
  },
  {
    id: 'f5',
    title: 'Healthy Skin & Coat',
    description: 'Balanced Omega-3 and Omega-6 fatty acids derived from cold-water salmon oil reduce shedding and restore natural coat gloss.',
    iconName: 'ShieldCheck',
    highlight: 'Omega-3 & 6'
  },
  {
    id: 'f6',
    title: 'Strong Bones & Teeth',
    description: 'Balanced bio-available Calcium, Phosphorus, and Vitamin D3 maintain bone density and dental plaque defense.',
    iconName: 'Activity',
    highlight: 'Calcium Boost'
  },
  {
    id: 'f7',
    title: 'Immune System Support',
    description: 'Loaded with antioxidant-rich blueberries, cranberries, Vitamin E, and Vitamin C for cellular defense.',
    iconName: 'HeartPulse',
    highlight: 'Antioxidants'
  },
  {
    id: 'f8',
    title: 'Trusted by Pet Owners',
    description: 'Chosen by over 100,000 loving pet parents across the nation with a 99% satisfaction and pet preference record.',
    iconName: 'Smile',
    highlight: '100k+ Happy Pets'
  },
  {
    id: 'f9',
    title: 'Veterinarian Recommended',
    description: 'Tested and endorsed by certified veterinary medical boards for complete and balanced daily feline and canine life stages.',
    iconName: 'Stethoscope',
    highlight: 'Vet Approved'
  },
  {
    id: 'f10',
    title: 'Fresh Slow-Cooked Batches',
    description: 'Crafted in small, temperature-controlled batches to seal in natural aromas, digestive enzymes, and delicate nutrients.',
    iconName: 'Clock',
    highlight: 'Freshness Sealed'
  }
];

export const MAIN_BENEFITS = [
  {
    id: 'b1',
    title: 'Premium Quality',
    description: 'Human-grade protein sources sourced exclusively from ethical, certified sustainable farms and wild fisheries.',
    icon: 'Award'
  },
  {
    id: 'b2',
    title: '100% Natural Ingredients',
    description: 'Zero corn, zero wheat, zero soy, and absolutely no artificial colors, chemical preservatives, or rendered by-products.',
    icon: 'Leaf'
  },
  {
    id: 'b3',
    title: 'Scientifically Healthy Nutrition',
    description: 'Formulated to meet and exceed all AAFCO dog and cat food nutrient profiles for peak life-stage performance.',
    icon: 'Heart'
  },
  {
    id: 'b4',
    title: 'Loved by Pets',
    description: 'Slow-steamed natural juices seal in rich savory flavor that even picky eaters devour at every mealtime.',
    icon: 'Smile'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    customerName: 'Sarah Jenkins',
    customerLocation: 'Seattle, WA',
    customerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    petName: 'Barnaby',
    petBreed: 'Golden Retriever (3 yrs)',
    petPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80',
    petType: 'dog',
    rating: 5,
    reviewText: 'Barnaby suffered from sensitive stomach issues for almost two years on standard store brands. Switching to PETSHOP Chicken & Rice transformed his digestion within two weeks! His energy levels are amazing and his coat feels like silk.',
    verifiedOwner: true
  },
  {
    id: 't2',
    customerName: 'Dr. Marcus Vance',
    customerLocation: 'Veterinary Nutritionist',
    customerPhoto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
    petName: 'Cleo & Luna',
    petBreed: 'Persian & Ragdoll Cats',
    petPhoto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
    petType: 'cat',
    rating: 5,
    reviewText: 'As a practicing veterinarian, I scrutinize ingredient decks meticulously. PETSHOP provides an extraordinary amino acid balance, genuine real meat first ingredients, and zero filler junk. I recommend PETSHOP to all my clinic patients.',
    verifiedOwner: true
  },
  {
    id: 't3',
    customerName: 'Elena Rostova',
    customerLocation: 'Chicago, IL',
    customerPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    petName: 'Milo',
    petBreed: 'French Bulldog (Puppy)',
    petPhoto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80',
    petType: 'dog',
    rating: 5,
    reviewText: 'Milo is the pickiest puppy I have ever raised! He refused three different high-end brands before we opened our first PETSHOP Growth Puppy bag. Now he does happy dances every single morning at feeding time!',
    verifiedOwner: true
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq1',
    category: 'dogs',
    question: 'Which PETSHOP food is best for puppies?',
    answer: 'For puppies aged 2 to 12 months, we specifically recommend PETSHOP Growth & DHA Puppy Formula. It contains elevated protein (34%), natural DHA from wild salmon oil for brain development, and optimized calcium to build strong bones during rapid growth stages.'
  },
  {
    id: 'faq2',
    category: 'nutrition',
    question: 'How much food should I feed my pet daily?',
    answer: 'Recommended daily feeding amounts depend on your pet’s target body weight, age, and activity level. You can use our interactive Feeding Calculator on this page or reference the feeding guide table on every PETSHOP package. Always divide the daily ration into 2 or 3 fresh meals.'
  },
  {
    id: 'faq3',
    category: 'general',
    question: 'Is PETSHOP pet food 100% natural and grain-free?',
    answer: 'Yes! All PETSHOP recipes use 100% natural meat and vegetable ingredients without artificial colors, chemical preservatives, or synthetic flavors. We offer both wholesome ancient grain options (like brown rice & oats) and grain-sensitive formulas tailored to your pet’s needs.'
  },
  {
    id: 'faq4',
    category: 'general',
    question: 'Can cats and dogs eat the same PETSHOP food?',
    answer: 'No. Dogs and cats have fundamentally different biological nutritional requirements. Cats are obligate carnivores that require high amounts of essential Taurine, Arachidonic Acid, and specific animal fat ratios found only in PETSHOP Cat Food formulas. Dogs thrive on our specialized Canine formulas.'
  },
  {
    id: 'faq5',
    category: 'nutrition',
    question: 'How does PETSHOP ensure high protein and gut health?',
    answer: 'Every PETSHOP recipe starts with real deboned chicken, grass-fed lamb, turkey, or wild-caught fish as the #1 ingredient. For digestive protection, we add micro-encapsulated live probiotics, prebiotic FOS fibers, and soothing pumpkin to ensure smooth nutrient absorption.'
  },
  {
    id: 'faq6',
    category: 'general',
    question: 'Where can I inquire about PETSHOP products or partner stores?',
    answer: 'You can submit an inquiry directly using our Contact form at the bottom of this page, or email our support team at contact@petshopnutrition.com. Our pet care specialists reply within 24 hours to assist you with diet consultations and authorized retailer locations.'
  }
];
