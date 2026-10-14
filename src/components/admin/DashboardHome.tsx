import React, { useState, useEffect } from 'react';
import {
  Package,
  CheckCircle,
  FolderTree,
  Star,
  ShoppingBag,
  Users,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Eye,
  Clock,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import {
  fetchProducts,
  fetchCategories,
  fetchOrders,
  fetchCustomers,
} from '../../services/firestoreService';
import { FirestoreProduct, ProductCategoryData, AdminOrder, AdminCustomer } from '../../types/admin';

interface DashboardHomeProps {
  onNavigate: (path: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategoryData[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [prods, cats, ords, custs] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchOrders(),
        fetchCustomers(),
      ]);
      setProducts(prods);
      setCategories(cats);
      setOrders(ords);
      setCustomers(custs);
    } catch (e) {
      console.error('Error loading dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive !== false).length;
  const totalCategories = categories.length;
  const featuredProducts = products.filter((p) => p.isFeatured).length;
  const totalOrders = orders.length;
  const totalCustomers = customers.length;

  const statCards = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'bg-blue-500', link: '/admin/products' },
    { label: 'Active Products', value: activeProducts, icon: CheckCircle, color: 'bg-emerald-500', link: '/admin/products' },
    { label: 'Categories', value: totalCategories, icon: FolderTree, color: 'bg-amber-500', link: '/admin/categories' },
    { label: 'Featured Formulas', value: featuredProducts, icon: Star, color: 'bg-[#EE1630]', link: '/admin/products' },
    { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'bg-indigo-500', link: '/admin/orders' },
    { label: 'Total Customers', value: totalCustomers, icon: Users, color: 'bg-purple-500', link: '/admin/customers' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#EE1630]">
            PETSHOP Live Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time Firestore overview of formulas, inventory, categories, and storefront content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin/products/new')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#EE1630]/25 transition-all cursor-pointer hover:scale-102"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Real Data Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              onClick={() => onNavigate(card.link)}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-2xl ${card.color} text-white flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#EE1630] transition-colors" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#061B3A]">
                  {loading ? '...' : card.value}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {card.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Products & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Products in Firestore (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#061B3A]">Recent Products in Database</h2>
              <p className="text-xs text-slate-500">Live products synced to the public PETSHOP storefront</p>
            </div>
            <button
              onClick={() => onNavigate('/admin/products')}
              className="text-xs font-bold text-[#EE1630] hover:underline cursor-pointer"
            >
              View All Products →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-6">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.slice(0, 5).map((prod) => (
                  <tr key={prod.id || prod.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        <img
                          src={prod.packageImage}
                          alt={prod.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#061B3A] line-clamp-1">{prod.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">{prod.petType} • {prod.packSize || '3 kg'}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      {prod.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#061B3A]">
                      ${prod.price?.toFixed(2) || '29.99'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        In Stock
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onNavigate(`/admin/products/edit/${prod.id}`)}
                        className="text-xs font-bold text-[#0755B8] hover:text-[#EE1630] cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Shortcuts & CMS Health */}
        <div className="space-y-6">
          {/* Quick Management Shortcuts */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-black text-[#061B3A]">Quick CMS Actions</h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('/admin/products/new')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-[#FFE082]/30 border border-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#EE1630] text-white flex items-center justify-center">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#061B3A]">Add New Formula</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('/admin/categories')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-[#FFE082]/30 border border-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                    <FolderTree className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#061B3A]">Manage Categories</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('/admin/content')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-[#FFE082]/30 border border-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#061B3A]">Edit Storefront Text</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Database Synchronization Notice */}
          <div className="bg-gradient-to-br from-[#061B3A] to-[#0A2E63] text-white p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFC21C]">
                Security Active
              </span>
              <h4 className="text-base font-black">Live Firestore &amp; Auth</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Changes made here immediately synchronize to all visitors on the public PETSHOP storefront.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
