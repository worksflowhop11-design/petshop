import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  ShoppingBag,
  Users,
  MessageSquareQuote,
  BookOpen,
  Globe,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  PawPrint,
  ShieldCheck,
  Bell,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPath, onNavigate, children }) => {
  const { adminData, currentUser, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Add Product', path: '/admin/products/new', icon: PlusCircle },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'Pet Care Blog', path: '/admin/blog', icon: BookOpen },
    { label: 'Website Content', path: '/admin/content', icon: Globe },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onNavigate('/admin/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const isActive = (path: string) => {
    if (path === '/admin/dashboard') {
      return currentPath === '/admin' || currentPath === '/admin/dashboard';
    }
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row font-sans text-[#061B3A] select-none">
      
      {/* ================= DESKTOP & TABLET SIDEBAR ================= */}
      <aside className="hidden lg:flex w-72 bg-[#061B3A] text-white flex-col justify-between shrink-0 shadow-xl border-r border-[#0A2E63]">
        <div>
          {/* Logo & Brand */}
          <div className="h-20 px-6 flex items-center gap-3 border-b border-white/10 bg-[#04142B]">
            <div className="w-10 h-10 rounded-full bg-[#EE1630] flex items-center justify-center text-white shadow-md shadow-[#EE1630]/30 shrink-0">
              <PawPrint className="w-5 h-5 fill-current text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight block leading-none font-sans text-white">
                PET<span className="text-[#EE1630]">SHOP</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#FFC21C] block mt-1">
                ADMIN CMS
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)]">
            <p className="px-3 pt-2 pb-1 text-[10px] font-black uppercase tracking-widest text-white/40">
              Navigation
            </p>
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer ${
                    active
                      ? 'bg-[#EE1630] text-white shadow-md shadow-[#EE1630]/30'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#FFC21C]' : 'text-white/60'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Admin Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-[#04142B]/80 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#FFE082] text-[#061B3A] font-black text-sm flex items-center justify-center shrink-0">
              {adminData?.displayName ? adminData.displayName[0].toUpperCase() : 'A'}
            </div>
            <div className="overflow-hidden text-left flex-1">
              <p className="text-xs font-bold text-white truncate">
                {adminData?.displayName || 'Administrator'}
              </p>
              <p className="text-[10px] text-white/50 truncate">
                {currentUser?.email}
              </p>
            </div>
          </div>

          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={() => onNavigate('/')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-bold transition-colors cursor-pointer"
              title="View Public Storefront"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-200 text-[11px] font-bold transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MOBILE HEADER & DRAWER ================= */}
      <div className="lg:hidden bg-[#061B3A] text-white h-16 px-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#EE1630] flex items-center justify-center text-white">
            <PawPrint className="w-4 h-4 fill-current text-white" />
          </div>
          <span className="text-lg font-black tracking-tight">
            PET<span className="text-[#EE1630]">SHOP</span> <span className="text-xs text-[#FFC21C]">ADMIN</span>
          </span>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl text-white hover:bg-white/10 cursor-pointer"
          aria-label="Toggle admin navigation"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileSidebarOpen && (
        <div className="lg:hidden bg-[#061B3A] text-white border-b border-white/10 p-4 space-y-1.5 z-40 animate-fadeIn">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onNavigate(item.path);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer ${
                  active ? 'bg-[#EE1630] text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={() => onNavigate('/')}
              className="flex-1 py-2 rounded-lg bg-white/10 text-white text-xs font-bold"
            >
              View Public Website
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-4 rounded-lg bg-red-600 text-white text-xs font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT VIEWPORT ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EE1630] bg-[#EE1630]/10 px-3 py-1 rounded-full">
              CMS Console
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Firebase Verified Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#FFE082]/50 text-[#061B3A] text-xs font-bold transition-all cursor-pointer border border-slate-200"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#EE1630]" />
              <span>Storefront</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-[#EE1630] text-xs font-bold transition-all cursor-pointer border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Injected Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
};
