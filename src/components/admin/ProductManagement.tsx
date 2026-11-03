import React, { useState, useEffect } from 'react';
import {
  Package,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  ExternalLink,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import {
  fetchProducts,
  deleteProduct,
  toggleProductStatus,
  toggleProductFeatured,
  fetchCategories,
} from '../../services/firestoreService';
import { FirestoreProduct, ProductCategoryData } from '../../types/admin';

interface ProductManagementProps {
  onNavigate: (path: string) => void;
}

export const ProductManagement: React.FC<ProductManagementProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPetType, setSelectedPetType] = useState('all');
  const [selectedStock, setSelectedStock] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'featured'>('name');

  // Delete Modal State
  const [deleteModalProduct, setDeleteModalProduct] = useState<FirestoreProduct | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const [prods, cats] = await Promise.all([fetchProducts(false), fetchCategories()]);
      setProducts(prods);
      setCategories(cats);
    } catch (e: any) {
      console.error('Error loading products:', e);
      setErrorMsg(e?.message || 'Failed to load products from database. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await toggleProductStatus(id, !currentStatus);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive: !currentStatus } : p))
      );
      setSuccessMsg(`Product status updated to ${!currentStatus ? 'Active' : 'Hidden'}.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e: any) {
      console.error('Error updating status:', e);
      setErrorMsg(e?.message || 'Failed to update product visibility status.');
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await toggleProductFeatured(id, !currentFeatured);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isFeatured: !currentFeatured } : p))
      );
      setSuccessMsg(`Featured highlight ${!currentFeatured ? 'enabled' : 'removed'}.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e: any) {
      console.error('Error updating featured flag:', e);
      setErrorMsg(e?.message || 'Failed to update featured flag.');
    }
  };

  const confirmDelete = async () => {
    if (!deleteModalProduct?.id) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteModalProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteModalProduct.id));
      setSuccessMsg(`Product "${deleteModalProduct.name}" permanently deleted from Firestore.`);
      setDeleteModalProduct(null);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (e: any) {
      console.error('Delete product error:', e);
      setErrorMsg(e?.message || 'Failed to delete product from database.');
    } finally {
      setDeleting(false);
    }
  };

  // Helper for rendering dynamic stock status badge
  const renderStockBadge = (status?: string) => {
    if (status === 'out_of_stock') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
          Out of Stock
        </span>
      );
    }
    if (status === 'low_stock') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          Low Stock
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        In Stock
      </span>
    );
  };

  // Filtered & Sorted Products
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.productCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());

      const cleanCat = selectedCategory.replace('cat-', '');
      const matchesCat =
        selectedCategory === 'all' ||
        p.category === selectedCategory ||
        p.category === cleanCat ||
        (cleanCat === 'dog-food' && p.petType === 'dog') ||
        (cleanCat === 'cat-food' && p.petType === 'cat') ||
        (cleanCat === 'wet-food' && (p.category === 'wet-food' || p.productType === 'Wet Food'));

      const matchesPet = selectedPetType === 'all' || p.petType === selectedPetType;
      const matchesStock =
        selectedStock === 'all' ||
        (selectedStock === 'in_stock' && (!p.stockStatus || p.stockStatus === 'in_stock')) ||
        p.stockStatus === selectedStock;

      return matchesSearch && matchesCat && matchesPet && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'featured') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#EE1630]">
            Catalogue Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
            All Products
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your pet food inventory, formulas, pricing, descriptions, and live public visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Refresh Products from Firestore"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => onNavigate('/admin/products/new')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer hover:scale-102"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Alert Banners: Error / Success */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#EE1630] shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={loadData}
            className="px-3 py-1 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 cursor-pointer shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, SKU, category, ingredients..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pet Type Filter */}
          <div>
            <select
              value={selectedPetType}
              onChange={(e) => setSelectedPetType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
            >
              <option value="all">All Pets</option>
              <option value="dog">Dogs Only</option>
              <option value="cat">Cats Only</option>
              <option value="both">Dogs &amp; Cats</option>
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
            >
              <option value="all">All Stock Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table with Loading & Empty States */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Product &amp; Description</th>
                <th className="py-3.5 px-4">SKU / Code</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Visibility</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <div className="w-8 h-8 border-3 border-[#EE1630] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="font-bold text-sm text-[#061B3A]">Loading products from Firestore...</p>
                    <p className="text-xs text-slate-400 mt-1">Connecting to live database collection</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <Package className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-[#061B3A]">No products found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {products.length === 0
                        ? 'No products are currently saved in Firestore. Click "Add Product" to create your first recipe!'
                        : 'No products match your search or filter criteria.'}
                    </p>
                    {products.length > 0 ? (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                          setSelectedPetType('all');
                          setSelectedStock('all');
                        }}
                        className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#061B3A] cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('/admin/products/new')}
                        className="mt-4 px-5 py-2.5 rounded-xl bg-[#EE1630] text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md shadow-[#EE1630]/25"
                      >
                        + Add First Product
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isActive = p.isActive !== false;
                  const isFeatured = !!p.isFeatured;

                  return (
                    <tr key={p.id || p.productCode || p.name} className="hover:bg-slate-50/50 transition-colors">
                      {/* Product Thumbnail, Name & Description */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-start gap-3">
                          <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden mt-0.5">
                            <img
                              src={p.packageImage}
                              alt={p.name}
                              className="max-w-full max-h-full object-contain filter drop-shadow-xs"
                            />
                          </div>
                          <div className="max-w-xs sm:max-w-sm">
                            <p className="font-bold text-[#061B3A] line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                              {p.petType} • {p.packSize || '3 kg'} • {p.productType || 'Dry Food'}
                            </p>
                            {p.shortDescription && (
                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                                {p.shortDescription}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* SKU / Code */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 font-semibold whitespace-nowrap">
                        {p.productCode || 'PET-AUTO'}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 font-semibold text-slate-600 whitespace-nowrap capitalize">
                        {p.category}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-[#061B3A]">
                          ${p.price ? p.price.toFixed(2) : '29.99'}
                        </span>
                        {p.salePrice && (
                          <span className="block text-[10px] text-slate-400 line-through">
                            ${p.salePrice.toFixed(2)}
                          </span>
                        )}
                      </td>

                      {/* Stock Status Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {renderStockBadge(p.stockStatus)}
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => p.id && handleToggleFeatured(p.id, isFeatured)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isFeatured
                              ? 'text-[#FFC21C] hover:bg-amber-50'
                              : 'text-slate-300 hover:text-slate-400'
                          }`}
                          title={isFeatured ? 'Featured (Click to unfeature)' : 'Mark as Featured'}
                        >
                          <Star className={`w-4 h-4 ${isFeatured ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      {/* Active/Inactive Storefront Visibility Toggle */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => p.id && handleToggleActive(p.id, isActive)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Click to toggle public storefront visibility"
                        >
                          {isActive ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-slate-400" />
                              <span>Hidden</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions: View Details, Edit, Delete */}
                      <td className="py-3.5 px-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onNavigate(`/product/${p.id}`)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0755B8] hover:bg-blue-50 transition-colors cursor-pointer"
                            title="View Public Details"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onNavigate(`/admin/products/edit/${p.id}`)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#061B3A] hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteModalProduct(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#EE1630] hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Delete Modal */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#EE1630] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-[#061B3A]">
              Delete this product formula?
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              This action cannot be undone. <span className="font-bold text-[#061B3A]">"{deleteModalProduct.name}"</span> will be permanently deleted from the Firestore database and will no longer appear on the public storefront.
            </p>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteModalProduct(null)}
                className="px-5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="px-6 py-2.5 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#EE1630]/25 cursor-pointer disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
