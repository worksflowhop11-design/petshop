import React, { useState, useEffect } from 'react';
import {
  MessageSquareQuote,
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  Save,
  X,
  AlertTriangle,
} from 'lucide-react';
import {
  fetchTestimonials,
  saveTestimonial,
  deleteTestimonial,
} from '../../services/firestoreService';
import { AdminTestimonialItem } from '../../types/admin';

export const TestimonialManagement: React.FC = () => {
  const [testimonials, setTestimonials] = useState<AdminTestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal / Edit state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminTestimonialItem | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [customerPhoto, setCustomerPhoto] = useState('');
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [status, setStatus] = useState<'active' | 'pending' | 'inactive'>('active');
  const [saving, setSaving] = useState(false);

  // Delete modal
  const [deleteItem, setDeleteItem] = useState<AdminTestimonialItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchTestimonials();
      setTestimonials(data);
    } catch (e) {
      console.error('Error fetching testimonials:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: AdminTestimonialItem) => {
    if (item) {
      setEditingItem(item);
      setCustomerName(item.customerName);
      setCustomerLocation(item.customerLocation || '');
      setCustomerPhoto(item.customerPhoto || '');
      setPetName(item.petName || '');
      setPetBreed(item.petBreed || '');
      setPetType(item.petType);
      setRating(item.rating);
      setReviewText(item.reviewText);
      setStatus(item.status);
    } else {
      setEditingItem(null);
      setCustomerName('');
      setCustomerLocation('Verified Pet Parent');
      setCustomerPhoto('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80');
      setPetName('');
      setPetBreed('');
      setPetType('dog');
      setRating(5);
      setReviewText('');
      setStatus('active');
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !reviewText.trim()) return;

    setSaving(true);
    try {
      const payload: AdminTestimonialItem = {
        id: editingItem?.id || `test-${Date.now()}`,
        customerName: customerName.trim(),
        customerLocation: customerLocation.trim() || 'Verified Customer',
        customerPhoto: customerPhoto.trim(),
        petName: petName.trim(),
        petBreed: petBreed.trim(),
        petType,
        rating,
        reviewText: reviewText.trim(),
        verifiedOwner: true,
        status,
      };

      await saveTestimonial(payload);
      await loadData();
      setIsModalOpen(false);
    } catch (e) {
      console.error('Error saving testimonial:', e);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await deleteTestimonial(deleteItem.id);
      setTestimonials((prev) => prev.filter((t) => t.id !== deleteItem.id));
      setDeleteItem(null);
    } catch (e) {
      console.error('Error deleting testimonial:', e);
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
            Social Proof &amp; Reviews
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
            Testimonials Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage customer feedback and rating spotlights for the public PETSHOP landing page.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer hover:scale-102"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.customerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={t.customerName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-[#061B3A] text-sm">{t.customerName}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold">{t.petName ? `${t.petName} (${t.petBreed || t.petType})` : t.customerLocation}</p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    t.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {t.status}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#FFC21C] mb-2">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <p className="text-xs text-slate-600 italic line-clamp-3">
                "{t.reviewText}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                {t.petType === 'dog' ? 'Dog Parent' : 'Cat Parent'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(t)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#061B3A] hover:bg-slate-100 cursor-pointer"
                  title="Edit Review"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteItem(t)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#EE1630] hover:bg-red-50 cursor-pointer"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#061B3A]">
                {editingItem ? 'Edit Testimonial' : 'Add Customer Review'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Sarah Miller"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1">
                    Location / Subtitle
                  </label>
                  <input
                    type="text"
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                    placeholder="Seattle, WA"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1">
                    Pet Name &amp; Breed
                  </label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Max (Golden Retriever)"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1">
                    Pet Type
                  </label>
                  <select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-[#061B3A] outline-hidden focus:border-[#EE1630] bg-white cursor-pointer"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1">
                  Star Rating (1 - 5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-1 cursor-pointer ${star <= rating ? 'text-[#FFC21C]' : 'text-slate-300'}`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1">
                  Review Text *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share the customer's real experience with PETSHOP nutrition..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#061B3A]">
                  Status:
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-[#061B3A] bg-white cursor-pointer"
                >
                  <option value="active">Active (Visible)</option>
                  <option value="pending">Pending Approval</option>
                  <option value="inactive">Hidden</option>
                </select>
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
                  className="px-6 py-2.5 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#EE1630]/25 cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#EE1630] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-[#061B3A]">
              Delete review from "{deleteItem.customerName}"?
            </h3>

            <p className="text-xs text-slate-500">
              This review will be permanently removed from the public website.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteItem(null)}
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
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
