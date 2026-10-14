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
    try {
      const [prods, cats] = await Promise.all([fetchProducts(), fetchCategories()]);
      setProducts(prods);
      setCategories(cats);
    } catch (e) {
      console.error('Error loading products:', e);
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
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await toggleProductFeatured(id, !currentFeatured);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isFeatured: !currentFeatured } : p))
      );
    } catch (e) {
      console.error('Error updating featured flag:', e);
    }
  };

  const confirmDelete = async () => {
    if (!deleteModalProduct?.id) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteModalProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteModalProduct.id));
      setDeleteModalProduct(null);
    } catch (e) {
      console.error('Delete product error:', e);
    } finally {
      setDeleting(false);
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.productCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesPet = selectedPetType === 'all' || p.petType === selectedPetType;
      const matchesStock = selectedStock === 'all' || p.stockStatus === selectedStock;

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
            Manage your pet food inventory, formulas, pricing, and live public visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Refresh Products"
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

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, SKU, category..."
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

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
            >
              <option value="name">Sort: Name (A-Z)</option>
              <option value="price">Sort: Price (Low to High)</option>
              <option value="featured">Sort: Featured First</option>
            </select>
          </div>

        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-4">SKU / Code</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Package className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-[#061B3A]">No products found</p>
                    <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isActive = p.isActive !== false;
                  const isFeatured = !!p.isFeatured;

                  return (
                    <tr key={p.id || p.name} className="hover:bg-slate-50/50 transition-colors">
                      {/* Product Thumbnail + Name */}
                      <td className="py-3.5 px-6 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                          <img
                            src={p.packageImage}
                            alt={p.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="max-w-xs">
                          <p className="font-bold text-[#061B3A] line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">
                            {p.petType} • {p.packSize || '3 kg'}
                          </p>
                        </div>
                      </td>

                      {/* SKU / Code */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 font-semibold">
                        {p.productCode || 'PET-AUTO'}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 font-semibold text-slate-600">
                        {p.category}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#061B3A]">
                          ${p.price?.toFixed(2) || '29.99'}
                        </span>
                        {p.salePrice && (
                          <span className="block text-[10px] text-slate-400 line-through">
                            ${p.salePrice.toFixed(2)}
                          </span>
                        )}
                      </td>

                      {/* Stock Status */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          In Stock
                        </span>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center">
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

                      {/* Active/Inactive Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => p.id && handleToggleActive(p.id, isActive)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                          }`}
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
                      <td className="py-3.5 px-6 text-right">
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

      {/* Confirmation Delete Modal (Mandatory Requirement) */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#EE1630] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-[#061B3A]">
              Are you sure you want to delete this product?
            </h3>

            <p className="text-xs text-slate-500">
              This action cannot be undone. <span className="font-bold text-[#061B3A]">"{deleteModalProduct.name}"</span> will be permanently removed from Firestore and will no longer appear on the public storefront.
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
