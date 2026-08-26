import React, { useState } from 'react';
import { X, Smartphone, UserCheck, ShieldCheck, Lock, Mail, User as UserIcon, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLoginOrRegister: (user: User) => void;
  onLogout: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginOrRegister,
  onLogout
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gcashNumber, setGcashNumber] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [shippingAddress, setShippingAddress] = useState('Unit 14B, One Bonifacio High Street, BGC, Taguig City');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validate Philippine GCash numbers (09XXXXXXXXX or +639XXXXXXXXX)
  const validateGcash = (num: string) => {
    const cleaned = num.replace(/[\s-]/g, '');
    return /^(09|\+639)\d{9}$/.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!fullName.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
      if (!gcashNumber.trim()) {
        setError('GCash number is required for payments, refunds, and seller payouts.');
        return;
      }
      if (!validateGcash(gcashNumber)) {
        setError('Please enter a valid 11-digit Philippine GCash number (e.g. 09171234567 or 0917-123-4567)');
        return;
      }

      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: fullName.trim(),
        email: email.trim(),
        gcashNumber: gcashNumber.trim(),
        role,
        address: shippingAddress,
        joinedAt: new Date().toISOString().split('T')[0]
      };

      onLoginOrRegister(newUser);
      setSuccess(`Account registered successfully! Welcome, ${newUser.name}.`);
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      // Login simulation
      if (!email.trim()) {
        setError('Please enter your registered email');
        return;
      }
      const existingUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email: email.trim(),
        gcashNumber: gcashNumber || '0917-884-2190',
        role: 'seller',
        address: shippingAddress,
        joinedAt: '2026-08-01'
      };
      onLoginOrRegister(existingUser);
      onClose();
    }
  };

  return (
    <div id="auth-register-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {currentUser ? (
          /* Profile Details View */
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-2xl border border-amber-500/30">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100 font-serif-luxury">{currentUser.name}</h2>
                <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">
                  {currentUser.role.toUpperCase()} ACCOUNT
                </span>
              </div>
            </div>

            {/* GCash Verified Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Linked GCash Account:</span>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active
                </span>
              </div>
              <div className="text-lg font-mono font-extrabold text-amber-400">
                {currentUser.gcashNumber}
              </div>
              <p className="text-[11px] text-slate-400">
                Ready for instantaneous 1-click PayMongo checkouts and seller sales disbursements.
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={onLogout}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-rose-900/30 text-rose-300 hover:text-rose-200 border border-slate-700 hover:border-rose-500/40 text-xs font-semibold cursor-pointer transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form with mandatory GCash input */
          <div className="space-y-5">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                <span>GCash Verified Membership</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif-luxury mt-1">
                {mode === 'register' ? 'Register AURA Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Link your Philippine GCash number for seamless PayMongo purchases and direct seller payouts.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'register' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Register & Input GCash
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'login' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Quick Sign In
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alexandra De Venecia"
                      className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* GCash Number Input (CRITICAL REQUIREMENT) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>GCash Mobile Number</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">09XX-XXX-XXXX</span>
                </div>
                <input
                  type="text"
                  value={gcashNumber}
                  onChange={(e) => setGcashNumber(e.target.value)}
                  placeholder="09171234567"
                  className="w-full bg-slate-950 text-sm text-emerald-300 font-mono font-bold rounded-xl px-4 py-2.5 border border-emerald-500/40 focus:border-emerald-400 focus:outline-none"
                  required={mode === 'register'}
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 text-sm text-slate-100 rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Account Type Selector */}
              {mode === 'register' && (
                <div className="space-y-1 pt-1">
                  <label className="text-xs font-semibold text-slate-300">Primary Account Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('buyer')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                        role === 'buyer'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Buyer / Collector
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('seller')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                        role === 'seller'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      Artisan / Seller
                    </button>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                {mode === 'register' ? 'Register Account with GCash' : 'Sign In to AURA'}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
