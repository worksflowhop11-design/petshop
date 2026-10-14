import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Save,
  X,
  AlertTriangle,
  Upload,
  Calendar,
  User,
  Clock,
} from 'lucide-react';
import {
  fetchBlogs,
  saveBlog,
  deleteBlog,
  uploadImageFile,
} from '../../services/firestoreService';
import { AdminBlogItem } from '../../types/admin';

export const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<AdminBlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<AdminBlogItem | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Dr. Elena Rostova');
  const [category, setCategory] = useState('Dog Nutrition');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [isPublished, setIsPublished] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete modal
  const [deleteItem, setDeleteItem] = useState<AdminBlogItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (e) {
      console.error('Error fetching blogs:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (blog?: AdminBlogItem) => {
    if (blog) {
      setEditingBlog(blog);
      setTitle(blog.title);
      setSlug(blog.slug);
      setExcerpt(blog.excerpt);
      setContent(blog.content);
      setAuthor(blog.author);
      setCategory(blog.category);
      setPublishDate(blog.publishDate);
      setIsPublished(blog.isPublished);
      setImageUrl(blog.imageUrl);
      setImagePreview(blog.imageUrl);
    } else {
      setEditingBlog(null);
      setTitle('');
      setSlug('');
      setExcerpt('');
      setContent('');
      setAuthor('Dr. Elena Rostova, DVM');
      setCategory('Nutrition & Health');
      setPublishDate(new Date().toISOString().split('T')[0]);
      setIsPublished(true);
      setImageUrl('https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80');
      setImagePreview('https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingBlog) {
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
    if (!title.trim()) return;

    setSaving(true);
    try {
      let finalImg = imageUrl;
      if (imageFile) {
        finalImg = await uploadImageFile(imageFile, 'blog');
      }

      const payload: AdminBlogItem = {
        id: editingBlog?.id || `blog-${Date.now()}`,
        title: title.trim(),
        slug: slug.trim() || title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: excerpt.trim(),
        content: content.trim() || excerpt.trim(),
        author: author.trim(),
        category: category.trim(),
        publishDate,
        readTime: '4 min read',
        isPublished,
        imageUrl: finalImg,
      };

      await saveBlog(payload);
      await loadBlogs();
      setIsModalOpen(false);
    } catch (e) {
      console.error('Error saving blog:', e);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await deleteBlog(deleteItem.id);
      setBlogs((prev) => prev.filter((b) => b.id !== deleteItem.id));
      setDeleteItem(null);
    } catch (e) {
      console.error('Error deleting blog:', e);
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
            Editorial &amp; Education
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
            Pet Care Blog Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Publish nutrition guides, veterinarian advice, and pet wellness articles.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer hover:scale-102"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Blogs Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Article</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <div className="w-14 h-11 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                      <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="max-w-md">
                      <p className="font-bold text-[#061B3A] line-clamp-1">{b.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono">/blog/{b.slug}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600">{b.author}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FFE082]/40 text-[#061B3A]">
                      {b.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{b.publishDate}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        b.isPublished
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {b.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenModal(b)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#061B3A] hover:bg-slate-100 cursor-pointer"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteItem(b)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#EE1630] hover:bg-red-50 cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Blog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-gray-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-[#061B3A]">
                {editingBlog ? 'Edit Blog Article' : 'Write New Blog Article'}
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
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. 5 Signs Your Dog Needs More Protein in Their Diet"
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Dr. Elena Rostova"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Dog Nutrition"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  Article Excerpt
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short introductory hook shown on the blog cards..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  Full Article Body (Markdown supported)
                </label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the complete article content here..."
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  Cover Image URL or Upload
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
                  />
                  <label className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#061B3A] text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImageFile(e.target.files[0]);
                          setImagePreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 text-[#EE1630] rounded-sm focus:ring-[#EE1630]"
                  />
                  <span className="text-xs font-bold text-[#061B3A]">
                    Published (Visible on public Pet Care Blog)
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
                  {saving ? 'Publishing...' : 'Save Article'}
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
              Delete "{deleteItem.title}"?
            </h3>

            <p className="text-xs text-slate-500">
              Are you sure you want to remove this article? This will remove it from the Pet Care Blog on the public storefront.
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
                {deleting ? 'Deleting...' : 'Delete Article'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
