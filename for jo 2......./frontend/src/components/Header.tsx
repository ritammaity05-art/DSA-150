"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Search, Globe, Code2, User, LogOut, Bookmark, Sparkles, Sun, Moon, BookOpen, Layers } from 'lucide-react';
import AuthModal from './AuthModal';

interface HeaderProps {
  onSearchChange?: (term: string) => void;
  searchTerm?: string;
}

export default function Header({ onSearchChange, searchTerm = '' }: HeaderProps) {
  const { lang, toggleLang, isBengali } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo with 150 STRICKs & Powered by Ritam */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white font-mono">150</span>
                <span className="px-2 py-0.5 text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full uppercase tracking-wider">
                  STRICKs
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Powered by Ritam</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={isBengali ? "150 STRICKs সার্চ করুন..." : "Search 150 STRICKs by problem name or topic..."}
              className="w-full bg-slate-900/90 text-sm text-gray-200 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {/* Controls & Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* 300 Solved Examples Hub Link */}
            <Link
              href="/examples"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all shadow-sm"
              title="View 300 Solved Examples Hub (150 Problems x 2 Test Cases)"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{isBengali ? "৩০০ Examples Hub" : "300 Examples"}</span>
            </Link>

            {/* DSA Notes Hub Link */}
            <Link
              href="/notes"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all shadow-sm"
              title="DSA Master Notes (5-Year-Old Child Explanations)"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isBengali ? "নোটস Hub" : "DSA Notes"}</span>
            </Link>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-amber-400 border border-white/10 transition-all shadow-sm flex items-center gap-2"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline text-xs text-gray-300">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline text-xs text-gray-300">Dark</span>
                </>
              )}
            </button>

            {/* Dashboard Link */}
            <Link 
              href="/dashboard" 
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 transition-all"
            >
              <Bookmark className="w-4 h-4 text-indigo-400" />
              <span>{isBengali ? "ড্যাশবোর্ড" : "Progress"}</span>
            </Link>

            {/* Language Toggle (EN / বাংলা) */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-500/10 to-indigo-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 text-amber-300 border border-amber-500/30 transition-all shadow-sm"
              title="Toggle Language (English / বাংলা)"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'en' ? 'EN | বাংলা' : 'বাংলা | EN'}</span>
            </button>

            {/* User Profile / Auth Modal */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-medium text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-amber-500 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user?.username?.[0] || 'U'}
                  </div>
                  <span className="hidden lg:inline">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white shadow-lg shadow-amber-500/25 transition-all"
              >
                <User className="w-4 h-4" />
                <span>{isBengali ? "লগইন" : "Sign In"}</span>
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
