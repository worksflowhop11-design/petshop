import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Save,
  X,
  AlertTriangle,
  Upload,
} from 'lucide-react';
import {
  fetchCategories,
  saveCategory,
  deleteCategory,
  uploadImageFile,
} from '../../services/firestoreService';
import { ProductCategoryData } from '../../types/admin';

interface CategoryManagementProps {
  onNavigate: (path: string) => void;
}

export const CategoryManagement: React.FC<CategoryManagementProps> = () => {
  const [categories, setCategories] = useState<ProductCategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategoryData | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [petType, setPetType] = useState<'dog' | 'cat' | 'both'>('both');
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete modal state
  const [deleteCat, setDeleteCat] = useState<ProductCategoryData | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (e) {
      console.error('Error fetching categories:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (cat?: ProductCategoryData) => {
    if (cat) {
      setEditingCategory(cat);
      setName(cat.name);
      setSlug(cat.slug);
      setDescription(cat.description || '');
      setPetType(cat.petType || 'both');
      setIsActive(cat.isActive);
      setImageUrl(cat.imageUrl || '');
      setImagePreview(cat.imageUrl || '');
    } else {
      setEditingCategory(null);
      setName('');
      setSlug('');
      setDescription('');
      setPetType('both');
      setIsActive(true);
      setImageUrl('');
      setImagePreview('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      let finalImg = imageUrl;
      if (imageFile) {
        finalImg = await uploadImageFile(imageFile, 'categories');
      }

      const payload: ProductCategoryData = {
        id: editingCategory?.id || `cat-${Date.now()}`,
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/\s+/g, '-'),
        description: description.trim(),
        petType,
        isActive,
        imageUrl: finalImg,
      };

      await saveCategory(payload);
      await loadCategories();
      setIsModalOpen(false);
    } catch (e) {
      console.error('Error saving category:', e);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteCat) return;
    setDeleting(true);
    try {
      await deleteCategory(deleteCat.id);
      setCategories((prev) => prev.filter((c) => c.id !== deleteCat.id));
      setDeleteCat(null);
    } catch (e) {
      console.error('Error deleting category:', e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#EE1630]">
            Classification
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
            Categories Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Organize formulas into Dog Food, Cat Food, Wet Food, Treats, and custom collections.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer hover:scale-102"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFE082]/40 text-[#061B3A] flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                  {cat.imageUrl ? (
                    <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                  ) : (
                    <FolderTree className="w-5 h-5 text-[#EE1630]" />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-[#061B3A] text-base">{cat.name}</h3>
                  <span className="text-[10px] font-mono font-bold text-slate-400">/{cat.slug}</span>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  cat.isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.isActive ? 'Active' : 'Disabled'}
              </span>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2">
              {cat.description || 'Nutritional category classification for the public storefront.'}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {cat.petType === 'both' ? 'Dogs & Cats' : cat.petType === 'dog' ? 'Dogs Only' : 'Cats Only'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(cat)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#061B3A] hover:bg-slate-100 cursor-pointer"
                  title="Edit Category"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteCat(cat)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#EE1630] hover:bg-red-50 cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-[#061B3A]">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Grain-Free Dog Treats"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="grain-free-dog-treats"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-mono font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  Pet Type Target
                </label>
                <select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
                >
                  <option value="both">Both Dogs &amp; Cats</option>
                  <option value="dog">Dogs Only</option>
                  <option value="cat">Cats Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary shown on category filters..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-[#EE1630] rounded-sm focus:ring-[#EE1630]"
                  />
                  <span className="text-xs font-bold text-[#061B3A]">
                    Active on Storefront Filter Bar
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCat && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#EE1630] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-[#061B3A]">
              Delete "{deleteCat.name}" category?
            </h3>

            <p className="text-xs text-slate-500">
              Are you sure? Products assigned to this category will remain, but the category filter will be removed.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCat(null)}
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
                {deleting ? 'Deleting...' : 'Delete Category'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
