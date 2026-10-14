import React, { useState } from 'react';
import {
  Settings,
  Lock,
  Mail,
  User,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  LogOut,
  Save,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminSettingsProps {
  onNavigate: (path: string) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onNavigate }) => {
  const { currentUser, adminData, changePassword, logout } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; error: boolean } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 6) {
      setPasswordMsg({ text: 'New password must be at least 6 characters.', error: true });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: 'Passwords do not match.', error: true });
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword(newPassword);
      setPasswordMsg({ text: 'Password updated successfully in Firebase Auth!', error: false });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordMsg({
        text: err.message || 'Failed to update password. You may need to re-login first.',
        error: true,
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onNavigate('/admin/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-[#EE1630]">
          System &amp; Security
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#061B3A] tracking-tight">
          Admin Settings &amp; Security
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your administrator profile, credentials, and authentication settings.
        </p>
      </div>

      {/* Admin Profile Overview */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <User className="w-5 h-5 text-[#EE1630]" />
          <h2 className="text-base font-black text-[#061B3A]">
            Administrator Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Admin Name
            </label>
            <p className="font-bold text-[#061B3A] text-sm">
              {adminData?.displayName || 'Master Administrator'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Registered Email
            </label>
            <p className="font-bold text-[#061B3A] text-sm">
              {currentUser?.email || 'admin@petshop.com'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Privilege Level
            </label>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EE1630]/10 text-[#EE1630]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EE1630]" />
              <span className="uppercase">{adminData?.role || 'Superadmin'}</span>
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              User ID (Firebase UID)
            </label>
            <p className="font-mono text-xs text-slate-500 truncate">
              {currentUser?.uid || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
          <Lock className="w-5 h-5 text-[#0755B8]" />
          <h2 className="text-base font-black text-[#061B3A]">
            Change Password
          </h2>
        </div>

        {passwordMsg && (
          <div
            className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 animate-fadeIn ${
              passwordMsg.error
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            {passwordMsg.error ? (
              <AlertCircle className="w-4 h-4 text-[#EE1630] shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{passwordMsg.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-[#061B3A] outline-hidden focus:border-[#EE1630]"
            />
          </div>

          <button
            type="submit"
            disabled={passwordLoading}
            className="px-6 py-2.5 rounded-2xl bg-[#061B3A] hover:bg-[#0A2E63] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {passwordLoading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Logout Action Card */}
      <div className="bg-white rounded-3xl border border-red-100 shadow-xs p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-black text-[#061B3A]">Session Termination</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Log out of the administrator console on this browser.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-[#EE1630] font-bold text-xs uppercase tracking-wider border border-red-200 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Admin</span>
        </button>
      </div>

    </div>
  );
};
