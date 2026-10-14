import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  Save,
  X,
} from 'lucide-react';
import {
  fetchProducts,
  fetchCategories,
  saveProduct,
  uploadImageFile,
} from '../../services/firestoreService';
import { FirestoreProduct, ProductCategoryData } from '../../types/admin';

interface ProductFormPageProps {
  productId?: string;
  onNavigate: (path: string) => void;
}

export const ProductFormPage: React.FC<ProductFormPageProps> = ({ productId, onNavigate }) => {
  const isEditMode = Boolean(productId);

  const [categories, setCategories] = useState<ProductCategoryData[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [category, setCategory] = useState('dog-food');
  const [petType, setPetType] = useState<'dog' | 'cat' | 'both'>('dog');
  const [productType, setProductType] = useState('Dry Food');
  const [packSize, setPackSize] = useState('3 kg');
  const [price, setPrice] = useState('29.99');
  const [salePrice, setSalePrice] = useState('');
  const [stockStatus, setStockStatus] = useState<'in_stock' | 'low_stock' | 'out_of_stock'>('in_stock');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [brand, setBrand] = useState('PETSHOP');
  const [suitableFor, setSuitableFor] = useState('All Breeds & Life Stages');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [benefitsText, setBenefitsText] = useState('');
  const [tagsText, setTagsText] = useState('');

  // Primary image
  const [packageImage, setPackageImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Additional images
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  useEffect(() => {
    loadCategoriesAndProduct();
  }, [productId]);

  const loadCategoriesAndProduct = async () => {
    try {
      const cats = await fetchCategories();
      setCategories(cats);

      if (cats.length > 0 && !category) {
        setCategory(cats[0].slug);
      }

      if (productId) {
        const allProds = await fetchProducts();
        const found = allProds.find((p) => p.id === productId);
        if (found) {
          setName(found.name || '');
          setProductCode(found.productCode || '');
          setCategory(found.category || (cats[0]?.slug || 'dog-food'));
          setPetType(found.petType || 'dog');
          setProductType(found.productType || 'Dry Food');
          setPackSize(found.packSize || '3 kg');
          setPrice(found.price ? found.price.toString() : '29.99');
          setSalePrice(found.salePrice ? found.salePrice.toString() : '');
          setStockStatus(found.stockStatus || 'in_stock');
          setIsFeatured(!!found.isFeatured);
          setIsActive(found.isActive !== false);
          setBrand(found.brand || 'PETSHOP');
          setSuitableFor(found.suitableFor || 'All Breeds & Life Stages');
          setShortDescription(found.shortDescription || '');
          setLongDescription(found.longDescription || '');
          setPackageImage(found.packageImage || '');
          setImagePreview(found.packageImage || '');

          if (found.ingredients) {
            setIngredientsText(
              Array.isArray(found.ingredients) ? found.ingredients.join('\n') : found.ingredients
            );
          }
          if (found.benefits) {
            setBenefitsText(
              Array.isArray(found.benefits) ? found.benefits.join('\n') : found.benefits
            );
          }
          if (found.tags) {
            setTagsText(Array.isArray(found.tags) ? found.tags.join(', ') : found.tags);
          }
          if (found.additionalImages) {
            setAdditionalImages(found.additionalImages);
            setAdditionalPreviews(found.additionalImages);
          }
        }
      } else {
        // Auto-generate SKU for new product
        setProductCode(`PET-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch (e) {
      console.error('Error loading product details:', e);
    } finally {
      setLoadingInitial(false);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);
      setAdditionalFiles((prev) => [...prev, ...filesArray]);
      const newPreviews = filesArray.map((f: File) => URL.createObjectURL(f));
      setAdditionalPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalPreviews((prev) => prev.filter((_, i) => i !== index));
    setAdditionalFiles((prev) => prev.filter((_, i) => i !== index));
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setErrorMsg('Product name is required.');
      return;
    }

    if (!packageImage && !imageFile) {
      setErrorMsg('Please upload a product packaging image.');
      return;
    }

    setSaving(true);

    try {
      let finalImageUrl = packageImage;

      // Upload main image if a new file was chosen
      if (imageFile) {
        finalImageUrl = await uploadImageFile(imageFile, 'products');
      }

      // Upload any new additional images
      const uploadedAdditional = [...additionalImages];
      for (const file of additionalFiles) {
        const url = await uploadImageFile(file, 'products/gallery');
        uploadedAdditional.push(url);
      }

      const ingredientsList = ingredientsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const benefitsList = benefitsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const tagsList = tagsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const productPayload: FirestoreProduct = {
        id: productId,
        name: name.trim(),
        productCode: productCode.trim() || `PET-${Date.now().toString().slice(-4)}`,
        category,
        petType,
        petTypeLabel:
          petType === 'dog'
            ? 'For Adult Dogs'
            : petType === 'cat'
            ? 'For Adult Cats'
            : 'For Dogs & Cats',
        productType,
        packSize: packSize.trim() || '3 kg',
        price: parseFloat(price) || 29.99,
        salePrice: salePrice ? parseFloat(salePrice) : undefined,
        stockStatus,
        isFeatured,
        isActive,
        brand: brand.trim() || 'PETSHOP',
        suitableFor: suitableFor.trim() || 'All Breeds',
        shortDescription: shortDescription.trim(),
        longDescription: longDescription.trim() || shortDescription.trim(),
        packageImage: finalImageUrl,
        additionalImages: uploadedAdditional,
        ingredients: ingredientsList,
        benefits: benefitsList,
        tags: tagsList,
        bagColor: petType === 'dog' ? 'red' : 'gold',
        mainProtein: 'Real Meat',
        proteinPercentage: '32% High Protein',
        fatPercentage: '16% Healthy Fats',
        fiberPercentage: '3.8% Crude Fiber',
        moisturePercentage: '10% Max Moisture',
      };

      await saveProduct(productPayload);
      setSuccessMsg(`Product "${name}" saved successfully to Firestore!`);

      setTimeout(() => {
        onNavigate('/admin/products');
      }, 1000);
    } catch (err: any) {
      console.error('Error saving product:', err);
      setErrorMsg(err.message || 'Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loadingInitial) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="w-8 h-8 border-3 border-[#EE1630] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-[#061B3A]">Loading product formula details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/admin/products')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#EE1630] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products List</span>
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {isEditMode ? `Editing: ${name}` : 'New Formula'}
        </span>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-8">
        
        {/* Title Header */}
        <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#EE1630]">
              Product Form
            </span>
            <h1 className="text-2xl font-black text-[#061B3A]">
              {isEditMode ? 'Edit Product Formula' : 'Add New Product'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in the formula details, image assets, pricing, and health benefits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/admin/products')}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Product'}</span>
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-[#EE1630] shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#061B3A]">
            1. Core Information &amp; Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. PETSHOP Premium Adult Dog Food (3 kg)"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Product Code / SKU
              </label>
              <input
                type="text"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                placeholder="e.g. PET-1001"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-mono font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Pet Type *
              </label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value as any)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="both">Dog &amp; Cat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Product Type
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
              >
                <option value="Dry Food">Dry Food</option>
                <option value="Wet Food">Wet Food</option>
                <option value="Treats">Treats</option>
                <option value="Supplements">Supplements</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Pricing, Stock & Visibility */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#061B3A]">
            2. Pricing, Inventory &amp; Visibility
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29.99"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-bold text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Sale Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="Optional discount"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-bold text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Pack Size / Net Weight
              </label>
              <input
                type="text"
                value={packSize}
                onChange={(e) => setPackSize(e.target.value)}
                placeholder="e.g. 3 kg, 1.2 kg, 400g"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Stock Status
              </label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value as any)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-[#EE1630] rounded-sm border-slate-300 focus:ring-[#EE1630]"
              />
              <span className="text-xs font-bold text-[#061B3A]">
                Active on Storefront (Visible to public)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-[#EE1630] rounded-sm border-slate-300 focus:ring-[#EE1630]"
              />
              <span className="text-xs font-bold text-[#061B3A] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC21C]" />
                <span>Mark as Featured Product (Highlights in Carousel)</span>
              </span>
            </label>
          </div>
        </div>

        {/* Section 3: Product Packaging Image Uploads */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#061B3A]">
            3. Product Packaging Images (JPG, PNG, WEBP)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Primary Image Upload & Preview */}
            <div className="md:col-span-1 border-2 border-dashed border-slate-200 rounded-3xl p-4 text-center flex flex-col items-center justify-center relative hover:border-[#EE1630] transition-colors bg-slate-50/50">
              {imagePreview ? (
                <div className="relative w-full h-48 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Packaging preview"
                    className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  />
                  <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold rounded-2xl cursor-pointer">
                    <span>Replace Image</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      onChange={handleMainImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center py-6 w-full">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#061B3A]">Upload Primary Pack</span>
                  <span className="text-[10px] text-slate-400 mt-1">JPG, PNG, or WEBP</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleMainImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Additional Images Upload */}
            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A]">
                Additional Gallery Images
              </label>

              <div className="flex flex-wrap items-center gap-3">
                {additionalPreviews.map((preview, idx) => (
                  <div key={idx} className="w-20 h-20 rounded-2xl border border-slate-200 p-1 relative group bg-white">
                    <img src={preview} alt="Gallery item" className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(idx)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                <label className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#EE1630] flex flex-col items-center justify-center text-slate-400 hover:text-[#EE1630] cursor-pointer transition-colors">
                  <Plus className="w-5 h-5" />
                  <span className="text-[9px] font-bold mt-1">Add Image</span>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleAdditionalImagesChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Section 4: Descriptions & Health Benefits */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#061B3A]">
            4. Descriptions, Ingredients &amp; Benefits
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Short Description (Card summary)
              </label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary of the recipe, protein, and health benefits..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Full Description (Product details page)
              </label>
              <textarea
                rows={4}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Comprehensive nutritional breakdown, farm origins, feeding suggestions..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  Ingredients (One per line)
                </label>
                <textarea
                  rows={4}
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  placeholder="Real Deboned Chicken&#10;Whole Brown Rice&#10;Sweet Potatoes&#10;Flaxseed Oil"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  Key Health Benefits (One per line)
                </label>
                <textarea
                  rows={4}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  placeholder="High Protein for Lean Muscles&#10;Gentle Digestion Complex&#10;Shiny Coat &amp; Daily Vitality"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Search Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="Dry Food, Chicken, Grain-Free, Adult Dog"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
              />
            </div>
          </div>
        </div>

        {/* Form Bottom Actions */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/admin/products')}
            className="px-5 py-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Product'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
