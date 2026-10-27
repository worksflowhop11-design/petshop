import { ProductItem, PetType } from '../types';

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'superadmin';
  createdAt?: string;
  lastLogin?: string;
}

export interface FirestoreProduct {
  id?: string;
  name: string;
  category: any;
  petType: PetType;
  petTypeLabel?: string;
  packSize?: string;
  shortDescription?: string;
  longDescription?: string;
  ageCategory?: string;
  ingredients?: string[];
  mainProtein?: string;
  proteinPercentage?: string;
  fatPercentage?: string;
  fiberPercentage?: string;
  moisturePercentage?: string;
  benefits?: string[];
  packageImage: string;
  petImage?: string;
  bagColor?: 'red' | 'gold' | 'dark-red';
  guaranteedAnalysis?: {
    label: string;
    value: string;
  }[];
  feedingGuideGrams?: {
    weightRange: string;
    dailyGrams: string;
    cupsPerDay: string;
  }[];
  productCode?: string;
  productType?: string;
  salePrice?: number;
  price?: number;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
  isFeatured?: boolean;
  isActive?: boolean;
  suitableFor?: string;
  brand?: string;
  tags?: string[];
  additionalImages?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  petType?: 'dog' | 'cat' | 'both';
  isActive: boolean;
  productCount?: number;
  createdAt?: string;
}

export interface AdminBlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  category: string;
  publishDate: string;
  readTime?: string;
  isPublished: boolean;
  isFeatured?: boolean;
  tags?: string[];
  createdAt?: string;
}

export interface AdminTestimonialItem {
  id: string;
  customerName: string;
  customerPhoto?: string;
  customerLocation?: string;
  petName?: string;
  petBreed?: string;
  petType: 'dog' | 'cat' | 'both';
  rating: number;
  reviewText: string;
  verifiedOwner?: boolean;
  status: 'active' | 'pending' | 'inactive';
  createdAt?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  registeredAt: string;
}

export interface WebsiteContentSettings {
  heroBadge?: string;
  heroHeadingLine1?: string;
  heroHeadingLine2?: string;
  heroDescription?: string;
  phone?: string;
  email?: string;
  address?: string;
  aboutTitle?: string;
  aboutParagraph1?: string;
  aboutParagraph2?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  whatsappNumber?: string;
  updatedAt?: string;
}
