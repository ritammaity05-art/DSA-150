"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import ProblemCard from '@/components/ProblemCard';
import { fetchDashboardStats, fetchProblems, DashboardStats, ProblemListItem } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Bookmark, Star, CheckCircle2, Trophy, Clock, ArrowLeft, Layers, Sparkles, Code } from 'lucide-react';

export default function DashboardPage() {
  const { isBengali } = useLanguage();
  const { user, token } = useAuth();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [allProblems, setAllProblems] = useState<ProblemListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchDashboardStats(token || undefined),
      fetchProblems()
    ]).then(([dashData, probData]) => {
      setStats(dashData);
      setAllProblems(probData);
      setLoading(false);
    });
  }, [token]);

  const completedSet = new Set(stats?.completed_ids || []);
  const favoriteSet = new Set(stats?.favorite_ids || []);
  const bookmarkSet = new Set(stats?.bookmark_ids || []);

  const completedList = allProblems.filter(p => completedSet.has(p.id_number));
  const favoriteList = allProblems.filter(p => favoriteSet.has(p.id_number));
  const bookmarkList = allProblems.filter(p => bookmarkSet.has(p.id_number));

  const total = stats?.stats.total_problems || 150;
  const completedCount = stats?.stats.total_completed || 0;
  const percentage = Math.round((completedCount / total) * 100);

  const languageTrackers = [
    {
      lang: "C++ (Default)",
      color: "text-cyan-400 border-cyan-500/30",
      skills: [
        { name: "Arrays & Vectors", status: "✓ Completed" },
        { name: "Loops & Statements", status: "✓ Completed" },
        { name: "unordered_map", status: "◐ In Progress" },
        { name: "Pointers & References", status: "○ Learning" }
      ]
    },
    {
      lang: "Python",
      color: "text-amber-400 border-amber-500/30",
      skills: [
        { name: "Lists & Slicing", status: "✓ Completed" },
        { name: "For in Range Loops", status: "✓ Completed" },
        { name: "Dictionaries {}", status: "◐ In Progress" },
        { name: "Recursion Functions", status: "○ Learning" }
      ]
    },
    {
      lang: "Java",
      color: "text-rose-400 border-rose-500/30",
      skills: [
        { name: "Primitive Arrays", status: "✓ Completed" },
        { name: "For Loops", status: "✓ Completed" },
        { name: "HashMap<K, V>", status: "◐ In Progress" },
        { name: "OOP Classes", status: "○ Learning" }
      ]
    },
    {
      lang: "JavaScript",
      color: "text-emerald-400 border-emerald-500/30",
      skills: [
        { name: "Arrays []", status: "✓ Completed" },
        { name: "For Loops", status: "✓ Completed" },
        { name: "Map() & Objects", status: "◐ In Progress" },
        { name: "Arrow Functions", status: "○ Learning" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans">
      
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white mb-2">
              <ArrowLeft className="w-4 h-4" />
              <span>{isBengali ? "হোম পেজে ফিরে যান" : "Back to Home"}</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {isBengali ? "আপনার শিক্ষা ও ল্যাঙ্গুয়েজ ট্র্যাকিং ড্যাশবোর্ড" : "Learning & Language Progress Dashboard"}
            </h1>
          </div>

          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono font-bold text-blue-400">
            {user ? `@${user.username}` : (isBengali ? 'গেস্ট ইউজার' : 'Guest Learner')}
          </div>
        </div>

        {/* Top Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Completion Progress */}
          <div className="glass-panel p-6 rounded-2xl border border-blue-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-semibold">{isBengali ? "মোট সমাধান" : "Total Solved"}</div>
              <div className="text-3xl font-black text-white font-mono mt-1">{completedCount} / {total}</div>
              <div className="text-xs text-blue-400 font-semibold mt-1">{percentage}% {isBengali ? "সম্পন্ন" : "Completed"}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
          </div>

          {/* Easy Progress */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-semibold">{isBengali ? "Easy লেভেল" : "Easy Problems"}</div>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                {stats?.stats.easy_completed || 0} / {stats?.stats.easy_total || 0}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Medium Progress */}
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-semibold">{isBengali ? "Medium লেভেল" : "Medium Problems"}</div>
              <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                {stats?.stats.medium_completed || 0} / {stats?.stats.medium_total || 0}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Hard Progress */}
          <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-semibold">{isBengali ? "Hard লেভেল" : "Hard Problems"}</div>
              <div className="text-3xl font-black text-rose-400 font-mono mt-1">
                {stats?.stats.hard_completed || 0} / {stats?.stats.hard_total || 0}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* 🧩 Language Mastery Progress Tracking Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <Code className="w-5 h-5 text-cyan-400" />
            <span>{isBengali ? "🧩 ল্যাঙ্গুয়েজ দক্ষতা ট্র্যাকিং (Language Mastery Progress)" : "🧩 Language Mastery Progress Tracking"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {languageTrackers.map((t, idx) => (
              <div key={idx} className={`glass-panel p-6 rounded-2xl border ${t.color} space-y-4`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-sm font-bold text-white font-mono">{t.lang}</h4>
                  <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-gray-300">Tracked</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  {t.skills.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between text-gray-300">
                      <span>{s.name}</span>
                      <span className="text-emerald-400 font-bold">{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revision Queue & Favorites Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>{isBengali ? "বুকমার্কড এবং রিভিশন তালিকা" : "Revision Queue & Bookmarks"}</span>
          </div>

          {favoriteList.length === 0 && bookmarkList.length === 0 ? (
            <div className="glass-panel p-8 text-center text-gray-400 text-sm rounded-2xl">
              {isBengali ? "আপনার বুকমার্ক করা সমস্যাগুলি এখানে দেখা যাবে।" : "No bookmarked problems yet. Click the star icon on any problem to add to your revision queue!"}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...favoriteList, ...bookmarkList].map((prob) => (
                <ProblemCard
                  key={prob.id}
                  problem={prob}
                  isCompleted={completedSet.has(prob.id_number)}
                  isFavorite={favoriteSet.has(prob.id_number)}
                />
              ))}
            </div>
          )}
        </div>

      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs font-bold text-cyan-400">
        150 STRICKs • POWERED BY RITAM • Language Progress Tracker
      </footer>

    </div>
  );
}
