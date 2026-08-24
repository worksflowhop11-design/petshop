export type PetType = 'dog' | 'cat';

export type DogSubCategory = 'chicken-rice' | 'lamb-veg' | 'puppy' | 'senior';
export type CatSubCategory = 'kitten' | 'adult' | 'ocean-fish' | 'hairball';
export type ProductCategory = DogSubCategory | CatSubCategory;

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  petType: PetType;
  petTypeLabel: string; // e.g. "For Adult Dogs", "For Growing Puppies"
  shortDescription: string;
  longDescription: string;
  ageCategory: string; // e.g. "Puppy (0-12 months)", "Adult (1-7 years)", "Senior (7+ years)"
  ingredients: string[];
  mainProtein: string;
  proteinPercentage: string;
  fatPercentage: string;
  fiberPercentage: string;
  moisturePercentage: string;
  benefits: string[];
  packageImage: string;
  petImage: string;
  bagColor: 'red' | 'gold' | 'dark-red';
  guaranteedAnalysis: {
    label: string;
    value: string;
  }[];
  feedingGuideGrams: {
    weightRange: string;
    dailyGrams: string;
    cupsPerDay: string;
  }[];
}

export interface BenefitFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerLocation: string;
  customerPhoto: string;
  petName: string;
  petBreed: string;
  petPhoto: string;
  petType: PetType;
  rating: number;
  reviewText: string;
  verifiedOwner: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'dogs' | 'cats' | 'nutrition';
}
