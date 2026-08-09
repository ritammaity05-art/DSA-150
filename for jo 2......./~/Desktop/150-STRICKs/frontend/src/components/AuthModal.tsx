"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, Lock, Mail, User as UserIcon, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { isBengali } = useLanguage();
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (isRegisterMode) {
      const success = await register(username, email, password);
      if (success) {
        onClose();
      } else {
        setErrorMsg(isBengali ? 'রেজিস্ট্রেশন ব্যর্থ হয়েছে। অন্য ইউজারনেম ব্যবহার করুন।' : 'Registration failed. Try a different username.');
      }
    } else {
      const success = await login(username, password);
      if (success) {
        onClose();
      } else {
        setErrorMsg(isBengali ? 'ইউজারনেম অথবা পাসওয়ার্ড ভুল।' : 'Invalid username or password.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>150 STRICKs Platform</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {isRegisterMode 
              ? (isBengali ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create an Account') 
              : (isBengali ? 'লগইন করুন' : 'Welcome Back')}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {isBengali ? 'আপনার অগ্রগতি ট্র্যাক করুন এবং প্রিয় সমস্যাগুলি সেভ করুন' : 'Track your progress and bookmark top 150 problems.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {isBengali ? 'ইউজারনেম' : 'Username'}
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="coder123"
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {isRegisterMode && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                {isBengali ? 'ইমেইল' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {isBengali ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
          >
            {loading ? (isBengali ? 'প্রসেসিং...' : 'Processing...') : (isRegisterMode ? (isBengali ? 'সাইন আপ করুন' : 'Sign Up') : (isBengali ? 'লগইন করুন' : 'Sign In'))}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-gray-400">
          {isRegisterMode ? (
            <span>
              {isBengali ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsRegisterMode(false)}
                className="text-blue-400 hover:underline font-semibold"
              >
                {isBengali ? 'লগইন করুন' : 'Sign In'}
              </button>
            </span>
          ) : (
            <span>
              {isBengali ? 'নতুন ইউজার?' : 'New to 150 STRICKs?'}{' '}
              <button
                onClick={() => setIsRegisterMode(true)}
                className="text-blue-400 hover:underline font-semibold"
              >
                {isBengali ? 'সাইন আপ করুন' : 'Create Account'}
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
