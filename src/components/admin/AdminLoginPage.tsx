import React, { useState } from 'react';
import { PawPrint, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginPageProps {
  onNavigate: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const { login, setupFirstAdmin, resetPassword, hasAdminsRegistered } = useAuth();

  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(!hasAdminsRegistered);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both your administrator email and password.');
      return;
    }

    setLoading(true);

    try {
      if (isFirstTimeSetup) {
        if (password.length < 6) {
          setErrorMsg('Password must be at least 6 characters long.');
          setLoading(false);
          return;
        }
        await setupFirstAdmin(email.trim(), password, displayName.trim() || 'Master Admin');
        setSuccessMsg('Master Admin account created successfully! Redirecting...');
        setTimeout(() => {
          onNavigate('/admin/dashboard');
        }, 800);
      } else {
        await login(email.trim(), password);
        setSuccessMsg('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          onNavigate('/admin/dashboard');
        }, 600);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      let message = 'Failed to sign in. Please verify your email and password.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        message = 'Invalid administrator credentials. Please check your email and password.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Too many failed login attempts. Please reset your password or try again later.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please sign in instead.';
      } else if (err.message) {
        message = err.message;
      }
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotMsg('Please provide your admin account email.');
      return;
    }

    setForgotLoading(true);
    setForgotMsg(null);

    try {
      await resetPassword(forgotEmail.trim());
      setForgotMsg('Password reset link sent! Check your inbox.');
    } catch (err: any) {
      setForgotMsg(err.message || 'Failed to send reset link. Please verify the email address.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Background Soft Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FFE082]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#EE1630]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Return Button */}
      <div className="max-w-md w-full mx-auto mb-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#061B3A]/70 hover:text-[#EE1630] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Store</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-[#EE1630] flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#EE1630]" />
          <span>Admin Portal</span>
        </span>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl shadow-black/5 border border-[#FFE8A3]/70 overflow-hidden relative z-10">
        
        {/* Card Header */}
        <div className="bg-gradient-to-r from-[#061B3A] to-[#0A2E63] px-8 py-8 text-center text-white relative">
          <div className="w-14 h-14 rounded-full bg-[#EE1630] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#EE1630]/30">
            <PawPrint className="w-8 h-8 fill-current text-white" />
          </div>
          
          <h1 className="text-2xl font-black tracking-tight font-sans">
            PET<span className="text-[#EE1630]">SHOP</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest font-extrabold text-[#FFC21C] mt-0.5">
            HEALTHY PETS, HAPPY LIFE
          </p>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-sm font-bold text-white/90">
            <Lock className="w-4 h-4 text-[#FFC21C]" />
            <span>{isFirstTimeSetup ? 'First-Time Admin Setup' : 'Administrator Login'}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-[#EE1630] shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isFirstTimeSetup && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                  Full Name / Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Master Admin"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#EE1630] focus:ring-2 focus:ring-[#EE1630]/20 text-sm font-medium transition-all outline-hidden text-[#061B3A]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#061B3A] mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@petshop.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-[#EE1630] focus:ring-2 focus:ring-[#EE1630]/20 text-sm font-medium transition-all outline-hidden text-[#061B3A]"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#061B3A]">
                  Password
                </label>
                {!isFirstTimeSetup && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(true);
                      setForgotEmail(email);
                    }}
                    className="text-xs font-bold text-[#0755B8] hover:text-[#EE1630] transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl border border-gray-200 focus:border-[#EE1630] focus:ring-2 focus:ring-[#EE1630]/20 text-sm font-medium transition-all outline-hidden text-[#061B3A]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#EE1630] hover:bg-[#D61429] text-white font-black text-sm tracking-wider uppercase shadow-md shadow-[#EE1630]/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-6 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{isFirstTimeSetup ? 'Creating Admin...' : 'Authenticating...'}</span>
                </>
              ) : (
                <span>{isFirstTimeSetup ? 'Create Master Admin' : 'Sign In to Dashboard'}</span>
              )}
            </button>
          </form>

          {/* Toggle between first time setup and regular login */}
          <div className="pt-3 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={() => {
                setIsFirstTimeSetup(!isFirstTimeSetup);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-xs font-semibold text-gray-500 hover:text-[#061B3A] transition-colors cursor-pointer"
            >
              {isFirstTimeSetup
                ? 'Already have an admin account? Sign In'
                : 'Need to configure a new administrator? Setup First Admin'}
            </button>
          </div>

        </div>

        {/* Security Notice Footer */}
        <div className="bg-[#FFFDF8] px-8 py-4 border-t border-[#FFE8A3]/50 text-center">
          <p className="text-[11px] font-medium text-gray-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Protected by Firebase Authentication &amp; Firestore Security Rules</span>
          </p>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-4">
            <h3 className="text-lg font-black text-[#061B3A]">Reset Admin Password</h3>
            <p className="text-xs text-gray-600">
              Enter your registered administrator email address and Firebase Auth will send a secure password reset link.
            </p>

            {forgotMsg && (
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700">
                {forgotMsg}
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="admin@petshop.com"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#EE1630] text-sm text-[#061B3A] outline-hidden"
              />

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="px-5 py-2.5 rounded-xl bg-[#EE1630] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#D61429] cursor-pointer disabled:opacity-50"
                >
                  {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
