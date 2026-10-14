import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/config';
import {
  FirestoreProduct,
  ProductCategoryData,
  AdminBlogItem,
  AdminTestimonialItem,
  AdminOrder,
  AdminCustomer,
  WebsiteContentSettings,
} from '../types/admin';
import { PRODUCTS, TESTIMONIALS } from '../data/petshopData';
import { BLOG_POSTS } from '../data/blogData';
import { ProductItem } from '../types';

// ==================== DEFAULT CATEGORIES SEED ====================
export const DEFAULT_CATEGORIES: ProductCategoryData[] = [
  { id: 'cat-dog-food', name: 'Dog Food', slug: 'dog-food', petType: 'dog', isActive: true, description: 'Dry kibble & nutrition for dogs of all sizes' },
  { id: 'cat-cat-food', name: 'Cat Food', slug: 'cat-food', petType: 'cat', isActive: true, description: 'Balanced feline formulas for sleek coats & vitality' },
  { id: 'cat-puppy-food', name: 'Puppy Food', slug: 'puppy-food', petType: 'dog', isActive: true, description: 'DHA-enriched growth recipes for young puppies' },
  { id: 'cat-kitten-food', name: 'Kitten Food', slug: 'kitten-food', petType: 'cat', isActive: true, description: 'Essential colostrum & vitamins for active kittens' },
  { id: 'cat-wet-food', name: 'Wet Food', slug: 'wet-food', petType: 'both', isActive: true, description: 'Slow-cooked chunks in gravy & savory broth cans' },
  { id: 'cat-dry-food', name: 'Dry Food', slug: 'dry-food', petType: 'both', isActive: true, description: 'Crisp oven-baked meat kibble recipes' },
  { id: 'cat-treats', name: 'Treats', slug: 'treats', petType: 'both', isActive: true, description: 'Jerky strips, dental chews, and crunchy bites' },
  { id: 'cat-supplements', name: 'Supplements', slug: 'supplements', petType: 'both', isActive: true, description: 'Joint mobility, skin & coat omega oils' },
  { id: 'cat-accessories', name: 'Accessories', slug: 'accessories', petType: 'both', isActive: true, description: 'Stainless steel bowls, scoops, and dining mats' },
];

// ==================== IMAGE UPLOADER HELPER ====================
export async function uploadImageFile(file: File, folder: string = 'products'): Promise<string> {
  const cleanName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const storageRef = ref(storage, `${folder}/${cleanName}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.warn('Firebase Storage upload failed or restricted; converting to data URL fallback:', error);
    // Reliable in-memory Base64 data URL fallback
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
}

// ==================== PRODUCT SERVICES ====================
export const getDefaultProducts = (): FirestoreProduct[] => {
  return PRODUCTS.map((p, idx) => ({
    ...p,
    productCode: `PET-${1000 + idx}`,
    productType: p.category === 'wet-food' ? 'Wet Food' : 'Dry Food',
    price: 24.99 + (idx % 4) * 5,
    salePrice: 19.99 + (idx % 4) * 4,
    stockStatus: 'in_stock',
    isFeatured: idx < 6,
    isActive: true,
    brand: 'PETSHOP',
  }));
};

export async function fetchProducts(): Promise<FirestoreProduct[]> {
  try {
    const colRef = collection(db, 'products');
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      // Only authenticated admins can write seed data to Firestore
      if (auth.currentUser) {
        try {
          await seedDefaultProducts();
          const newSnap = await getDocs(colRef);
          if (!newSnap.empty) {
            return newSnap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreProduct));
          }
        } catch {
          // If seeding fails due to permissions, return static products smoothly
        }
      }
      return getDefaultProducts();
    }

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreProduct));
  } catch (err) {
    console.warn('Failed to fetch from Firestore, falling back to static PRODUCTS:', err);
    return getDefaultProducts();
  }
}

export async function seedDefaultProducts(): Promise<void> {
  // Prevent unauthenticated calls which fail Firestore write permissions
  if (!auth.currentUser) {
    return;
  }
  try {
    for (const [idx, p] of PRODUCTS.entries()) {
      const docRef = doc(db, 'products', p.id);
      const productData: FirestoreProduct = {
        name: p.name,
        productCode: `PET-${1000 + idx}`,
        category: p.category,
        petType: p.petType,
        petTypeLabel: p.petTypeLabel || (p.petType === 'dog' ? 'For Adult Dogs' : 'For Adult Cats'),
        productType: p.category === 'wet-food' ? 'Wet Food' : 'Dry Food',
        packSize: p.packSize || '3 kg',
        shortDescription: p.shortDescription || '',
        longDescription: p.longDescription || '',
        ageCategory: p.ageCategory || 'Adult (1–7 Years)',
        ingredients: p.ingredients || [],
        mainProtein: p.mainProtein || 'Real Chicken',
        proteinPercentage: p.proteinPercentage || '32% High Protein',
        fatPercentage: p.fatPercentage || '16% Healthy Fats',
        fiberPercentage: p.fiberPercentage || '3.8% Crude Fiber',
        moisturePercentage: p.moisturePercentage || '10% Max Moisture',
        benefits: p.benefits || [],
        packageImage: p.packageImage,
        petImage: p.petImage || '',
        bagColor: p.bagColor || 'red',
        guaranteedAnalysis: p.guaranteedAnalysis || [],
        feedingGuideGrams: p.feedingGuideGrams || [],
        price: 29.99 + (idx % 3) * 6,
        salePrice: 24.99 + (idx % 3) * 5,
        stockStatus: 'in_stock',
        isFeatured: idx < 6,
        isActive: true,
        brand: 'PETSHOP',
        tags: [p.petType, p.category, 'Grain-Free', 'High-Protein'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(docRef, productData);
    }
  } catch (e) {
    console.warn('Notice: Seeding default products requires administrator credentials:', e);
  }
}

export async function saveProduct(product: FirestoreProduct): Promise<string> {
  const colRef = collection(db, 'products');
  const now = new Date().toISOString();

  if (product.id) {
    const docRef = doc(db, 'products', product.id);
    const { id, ...dataToSave } = product;
    await setDoc(docRef, { ...dataToSave, updatedAt: now }, { merge: true });
    return product.id;
  } else {
    const newDoc = await addDoc(colRef, {
      ...product,
      createdAt: now,
      updatedAt: now,
    });
    return newDoc.id;
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  const docRef = doc(db, 'products', productId);
  await deleteDoc(docRef);
}

export async function toggleProductStatus(productId: string, isActive: boolean): Promise<void> {
  const docRef = doc(db, 'products', productId);
  await updateDoc(docRef, { isActive, updatedAt: new Date().toISOString() });
}

export async function toggleProductFeatured(productId: string, isFeatured: boolean): Promise<void> {
  const docRef = doc(db, 'products', productId);
  await updateDoc(docRef, { isFeatured, updatedAt: new Date().toISOString() });
}

// ==================== CATEGORY SERVICES ====================
export async function fetchCategories(): Promise<ProductCategoryData[]> {
  try {
    const colRef = collection(db, 'categories');
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      if (auth.currentUser) {
        try {
          for (const cat of DEFAULT_CATEGORIES) {
            await setDoc(doc(db, 'categories', cat.id), cat);
          }
        } catch {
          // Ignore permission notice if not admin
        }
      }
      return DEFAULT_CATEGORIES;
    }

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ProductCategoryData));
  } catch (err) {
    console.warn('Failed to fetch categories from Firestore, using defaults:', err);
    return DEFAULT_CATEGORIES;
  }
}

export async function saveCategory(category: ProductCategoryData): Promise<string> {
  const now = new Date().toISOString();
  if (category.id) {
    const docRef = doc(db, 'categories', category.id);
    await setDoc(docRef, { ...category, updatedAt: now }, { merge: true });
    return category.id;
  } else {
    const colRef = collection(db, 'categories');
    const newDoc = await addDoc(colRef, {
      ...category,
      createdAt: now,
      updatedAt: now,
    });
    return newDoc.id;
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  await deleteDoc(doc(db, 'categories', categoryId));
}

// ==================== BLOG SERVICES ====================
export async function fetchBlogs(): Promise<AdminBlogItem[]> {
  try {
    const colRef = collection(db, 'blogs');
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      // Seed default blogs
      const seeded: AdminBlogItem[] = BLOG_POSTS.map((b) => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        excerpt: b.description,
        content: `${b.content.intro}\n\n` + b.content.sections.map((s) => `### ${s.heading}\n${s.body}`).join('\n\n') + `\n\n${b.content.conclusion}`,
        imageUrl: b.image,
        author: b.author.name,
        category: b.category,
        publishDate: b.publishDate,
        readTime: b.readTime,
        isPublished: true,
        tags: [b.category, 'Nutrition', 'Pet Care'],
      }));

      if (auth.currentUser) {
        try {
          for (const item of seeded) {
            await setDoc(doc(db, 'blogs', item.id), item);
          }
        } catch {
          // Ignore permission notice if not admin
        }
      }
      return seeded;
    }

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as AdminBlogItem));
  } catch (err) {
    console.warn('Error fetching blogs, using static fallback:', err);
    return BLOG_POSTS.map((b) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.description,
      content: `${b.content.intro}\n\n` + b.content.sections.map((s) => `### ${s.heading}\n${s.body}`).join('\n\n') + `\n\n${b.content.conclusion}`,
      imageUrl: b.image,
      author: b.author.name,
      category: b.category,
      publishDate: b.publishDate,
      readTime: b.readTime,
      isPublished: true,
      tags: [b.category, 'Nutrition', 'Pet Care'],
    }));
  }
}

export async function saveBlog(blog: AdminBlogItem): Promise<string> {
  const now = new Date().toISOString();
  if (blog.id) {
    const docRef = doc(db, 'blogs', blog.id);
    await setDoc(docRef, { ...blog, updatedAt: now }, { merge: true });
    return blog.id;
  } else {
    const colRef = collection(db, 'blogs');
    const newDoc = await addDoc(colRef, { ...blog, createdAt: now, updatedAt: now });
    return newDoc.id;
  }
}

export async function deleteBlog(blogId: string): Promise<void> {
  await deleteDoc(doc(db, 'blogs', blogId));
}

// ==================== TESTIMONIAL SERVICES ====================
export async function fetchTestimonials(): Promise<AdminTestimonialItem[]> {
  try {
    const colRef = collection(db, 'testimonials');
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      const seeded: AdminTestimonialItem[] = TESTIMONIALS.map((t) => ({
        id: t.id,
        customerName: t.customerName,
        customerLocation: t.customerLocation,
        customerPhoto: t.customerPhoto,
        petName: t.petName,
        petBreed: t.petBreed,
        petType: t.petType,
        rating: t.rating,
        reviewText: t.reviewText,
        verifiedOwner: t.verifiedOwner,
        status: 'active',
      }));

      if (auth.currentUser) {
        try {
          for (const item of seeded) {
            await setDoc(doc(db, 'testimonials', item.id), item);
          }
        } catch {
          // Ignore permission notice if not admin
        }
      }
      return seeded;
    }

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as AdminTestimonialItem));
  } catch (err) {
    console.warn('Error fetching testimonials, using fallback:', err);
    return TESTIMONIALS.map((t) => ({
      id: t.id,
      customerName: t.customerName,
      customerLocation: t.customerLocation,
      customerPhoto: t.customerPhoto,
      petName: t.petName,
      petBreed: t.petBreed,
      petType: t.petType,
      rating: t.rating,
      reviewText: t.reviewText,
      verifiedOwner: t.verifiedOwner,
      status: 'active',
    }));
  }
}

export async function saveTestimonial(testimonial: AdminTestimonialItem): Promise<string> {
  const now = new Date().toISOString();
  if (testimonial.id) {
    const docRef = doc(db, 'testimonials', testimonial.id);
    await setDoc(docRef, { ...testimonial, updatedAt: now }, { merge: true });
    return testimonial.id;
  } else {
    const colRef = collection(db, 'testimonials');
    const newDoc = await addDoc(colRef, { ...testimonial, createdAt: now, updatedAt: now });
    return newDoc.id;
  }
}

export async function deleteTestimonial(testimonialId: string): Promise<void> {
  await deleteDoc(doc(db, 'testimonials', testimonialId));
}

// ==================== WEBSITE CONTENT & SETTINGS ====================
export async function fetchWebsiteContent(): Promise<WebsiteContentSettings> {
  try {
    const docRef = doc(db, 'websiteContent', 'main');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as WebsiteContentSettings;
    }
  } catch (e) {
    console.warn('Error fetching website settings:', e);
  }

  return {
    heroBadge: 'PREMIUM PET FOOD',
    heroHeadingLine1: 'Premium Nutrition',
    heroHeadingLine2: 'For Happy Dogs & Cats',
    heroDescription:
      'Give your furry friends the healthiest and most delicious meals made with real meat, natural ingredients, balanced nutrition, and veterinarian-formulated recipes.',
    phone: '1800-270-3585',
    email: 'petshop@gmail.com',
    whatsappNumber: '+1 (800) 270-3585',
    aboutTitle: 'Crafted with Love, Backed by Science',
    aboutParagraph1:
      'At PETSHOP, we believe every bowl should be filled with nourishing goodness. Our recipes are created with real deboned meat as ingredient #1, fresh farm vegetables, and essential vitamins.',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    twitterUrl: 'https://twitter.com',
    youtubeUrl: 'https://youtube.com',
  };
}

export async function saveWebsiteContent(settings: WebsiteContentSettings): Promise<void> {
  const docRef = doc(db, 'websiteContent', 'main');
  await setDoc(docRef, { ...settings, updatedAt: new Date().toISOString() }, { merge: true });
}

// ==================== ORDERS & CUSTOMERS ====================
export async function fetchOrders(): Promise<AdminOrder[]> {
  try {
    const colRef = collection(db, 'orders');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      // Return representative demo orders
      return [
        {
          id: 'ord-101',
          orderNumber: 'ORD-2026-9812',
          customerName: 'Sarah Jenkins',
          customerEmail: 'sarah.j@example.com',
          customerPhone: '+1 555-0192',
          totalAmount: 64.98,
          status: 'completed',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          items: [
            { productId: 'dog-premium-3kg', productName: 'PETSHOP Premium Dog Food (3 kg)', quantity: 2, price: 32.49 }
          ]
        },
        {
          id: 'ord-102',
          orderNumber: 'ORD-2026-9813',
          customerName: 'Marcus Vance',
          customerEmail: 'm.vance@example.com',
          customerPhone: '+1 555-0284',
          totalAmount: 49.99,
          status: 'processing',
          createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
          items: [
            { productId: 'cat-premium-3kg', productName: 'PETSHOP Premium Cat Food (3 kg)', quantity: 1, price: 34.99 },
            { productId: 'dog-chicken-chunks-can', productName: 'Chicken Chunks Can (400g)', quantity: 3, price: 5.00 }
          ]
        },
        {
          id: 'ord-103',
          orderNumber: 'ORD-2026-9814',
          customerName: 'Elena Rostova',
          customerEmail: 'elena.rostova@example.com',
          totalAmount: 32.49,
          status: 'pending',
          createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
          items: [
            { productId: 'dog-puppy-growth', productName: 'PETSHOP Puppy Growth Nutrition (3 kg)', quantity: 1, price: 32.49 }
          ]
        }
      ];
    }
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as AdminOrder));
  } catch (e) {
    console.warn('Orders fetch error:', e);
    return [];
  }
}

export async function fetchCustomers(): Promise<AdminCustomer[]> {
  try {
    const colRef = collection(db, 'customers');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      return [
        { id: 'cust-1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+1 555-0192', totalOrders: 4, totalSpent: 238.45, registeredAt: '2026-08-12' },
        { id: 'cust-2', name: 'Marcus Vance', email: 'm.vance@example.com', phone: '+1 555-0284', totalOrders: 2, totalSpent: 99.98, registeredAt: '2026-09-02' },
        { id: 'cust-3', name: 'Elena Rostova', email: 'elena.rostova@example.com', phone: '+1 555-0371', totalOrders: 1, totalSpent: 32.49, registeredAt: '2026-09-20' },
        { id: 'cust-4', name: 'David Miller', email: 'david.miller@example.com', phone: '+1 555-0455', totalOrders: 6, totalSpent: 384.20, registeredAt: '2026-07-05' },
      ];
    }
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as AdminCustomer));
  } catch {
    return [];
  }
}
