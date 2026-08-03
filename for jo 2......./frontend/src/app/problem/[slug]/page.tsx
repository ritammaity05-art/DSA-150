"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import VisualDryRun from '@/components/VisualDryRun';
import CodeViewer from '@/components/CodeViewer';
import HintAccordion from '@/components/HintAccordion';
import InteractiveActions from '@/components/InteractiveActions';
import { fetchProblemDetail, toggleUserProgress, ProblemDetail } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { 
  ArrowLeft, Globe, Star, Bookmark, CheckCircle2, Clock, 
  BookOpen, Sparkles, Lightbulb, Code2, AlertTriangle, Cpu, Layers, Award, Zap, HelpCircle
} from 'lucide-react';

export default function ProblemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { lang, toggleLang, isBengali } = useLanguage();
  const { token } = useAuth();

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Progress states
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSolutionUnlocked, setIsSolutionUnlocked] = useState(false);
  const [resetAnimKey, setResetAnimKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchProblemDetail(slug).then((data) => {
      setProblem(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8 text-gray-400 font-mono text-sm">
          <div className="animate-pulse flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span>Loading Problem Content...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Problem Not Found</h3>
          <p className="text-sm text-gray-400">The problem slug &quot;{slug}&quot; could not be retrieved.</p>
          <Link href="/" className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleToggleAction = async (action: 'completed' | 'favorite' | 'bookmark') => {
    if (action === 'completed') setIsCompleted(!isCompleted);
    if (action === 'favorite') setIsFavorite(!isFavorite);
    if (action === 'bookmark') setIsBookmarked(!isBookmarked);

    if (token && problem) {
      await toggleUserProgress(problem.id_number, action, token);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans">
      
      {/* Navbar Header */}
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Navigation & Powered By Ritam Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBengali ? "সকল সমস্যা তালিকা" : "All 150 Problems"}</span>
          </Link>

          {/* Powered By Ritam Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300 shadow-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span>POWERED BY RITAM</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switch Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/40 text-blue-300 shadow-md transition-all"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'en' ? 'Switch to বাংলা' : 'Switch to English'}</span>
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => handleToggleAction('favorite')}
              className={`p-2.5 rounded-xl border transition-all ${
                isFavorite 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                  : 'bg-slate-900 border-white/10 text-gray-400 hover:text-white'
              }`}
              title="Bookmark Favorite"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Complete Checkbox */}
            <button
              onClick={() => handleToggleAction('completed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900 border-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400 fill-emerald-400/20' : ''}`} />
              <span>{isCompleted ? (isBengali ? "সম্পন্ন ✓" : "Completed ✓") : (isBengali ? "সম্পন্ন মার্ক করুন" : "Mark Solved")}</span>
            </button>
          </div>

        </div>

        {/* ⚡ 10-Second Golden Rule (Making it super easy to understand!) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-400/40 text-cyan-100 flex items-start gap-4 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 font-bold text-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            ⚡
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-cyan-300 uppercase tracking-wide flex items-center gap-2">
              <span>{isBengali ? "১০ সেকেন্ডে আসল লজিকটি বুঝুন (Golden Rule)" : "10-Second Quick Golden Rule"}</span>
              <span className="text-[10px] bg-cyan-400 text-slate-950 font-black px-2 py-0.5 rounded-full">Easy Concept</span>
            </h4>
            <p className="text-xs text-gray-200 mt-1 font-medium leading-relaxed">
              {isBengali
                ? "কোনো জটিল গণিত ছাড়াই মনে রাখুন: আপনাকে প্রতিবার একটা একটা করে উপাদান চেক করতে হবে এবং ডিকশনারি/মেমোরিতে দেখতে হবে যে প্রয়োজনীয় সঙ্গীটি আগেই উপস্থিত আছে কি না।"
                : "Remember the core secret: Iterate element by element, use a HashMap notepad to remember past items, and instantly grab your partner pair!"}
            </p>
          </div>
        </div>

        {/* Problem Title & Header Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono font-bold text-gray-500">#{problem.id_number}</span>
                <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  {problem.topic_name}
                </span>
                <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {problem.difficulty}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {problem.title}
              </h1>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-white/5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{isBengali ? "আনুমানিক সময়:" : "Est. Time:"} {problem.estimated_time}</span>
            </div>
          </div>

          {/* Section 1: Problem Summary */}
          <div className="mt-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>1. {isBengali ? "সমস্যাটির সংক্ষিপ্ত সারসংক্ষেপ (Problem Summary)" : "Problem Summary"}</span>
            </h3>
            <p className="text-base text-gray-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-white/5 font-medium">
              {problem.summary}
            </p>
          </div>
        </div>

        {/* Section 2: Real Life Analogy */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 bg-slate-950/80">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                2. {isBengali ? "বাস্তব জীবনের উদাহরণ (Real Life Analogy)" : "Real Life Analogy"}
              </h3>
              <p className="text-xs text-gray-400">
                {isBengali ? "বাস্তব ঘটনার মাধ্যমে লজিকটি সহজেই মনে রাখুন" : "Understand the concept using a relatable real-life scenario"}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-100 leading-relaxed font-sans">
            {problem.analogy}
          </div>
        </section>

        {/* Section 3 & 4: Easy Explanation & Bengali Switcher */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>
                3 & 4. {isBengali ? "সহজ বাংলা ব্যাখ্যা (Bengali Explanation)" : "Easy Beginner Explanation (English)"}
              </span>
            </h3>

            <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {isBengali ? "বাংলা মোড সক্রিয়" : "English Mode Active"}
            </div>
          </div>

          <div className="text-sm text-gray-200 leading-relaxed bg-slate-900/80 p-6 rounded-xl border border-white/5 space-y-3 font-sans">
            {isBengali ? problem.bengali_explanation : problem.easy_explanation}
          </div>
        </section>

        {/* Visual Step Flow Diagram Banner before the player */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-blue-400 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>{isBengali ? "ভিজ্যুয়াল ফ্লো ম্যাপ (Quick 3-Step Overview)" : "Quick 3-Step Flow Diagram"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center">1</span>
              <div>
                <span className="font-bold text-white block">Read Element</span>
                <span className="text-[11px] text-gray-400">Current item value</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center">2</span>
              <div>
                <span className="font-bold text-white block">Check HashMap</span>
                <span className="text-[11px] text-gray-400">Is partner saved?</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">3</span>
              <div>
                <span className="font-bold text-white block">Return / Store</span>
                <span className="text-[11px] text-gray-400">Return index or store</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Animated Visual Dry Run */}
        <section key={resetAnimKey}>
          <VisualDryRun steps={problem.dry_run_steps} title="5. Visual Dry Run Player" />
        </section>

        {/* Section 6: Intuition */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-indigo-500/20 bg-slate-950/80 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span>6. {isBengali ? "আইডিয়া ও ইনটুয়েশন (Why This Works)" : "Conceptual Intuition"}</span>
          </h3>
          <p className="text-xs text-gray-400">
            {isBengali ? "কোড লেখার আগে কেন এই এপ্রোচ কাজ করে তা বুঝুন" : "Why this optimal approach works before looking at code syntax"}
          </p>
          <div className="p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-100 leading-relaxed font-sans">
            {problem.intuition}
          </div>
        </section>

        {/* Section 7: Hint System */}
        <section>
          <HintAccordion 
            problem={problem} 
            isSolutionUnlocked={isSolutionUnlocked}
            onUnlockSolution={() => setIsSolutionUnlocked(true)}
          />
        </section>

        {/* Section 8 & 9: Code Viewer & Line-by-Line Breakdown */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              <span>8 & 9. {isBengali ? "কোড সলিউশন ও লাইন বাই লাইন ব্যাখ্যা" : "Multi-Language Solution & Line Breakdown"}</span>
            </h3>
          </div>

          <CodeViewer problem={problem} />
        </section>

        {/* Section 10: Complexity Analysis */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {isBengali ? "টাইম কমপ্লেক্সিটি (Time Complexity)" : "Time Complexity"}
            </div>
            <div className="text-2xl font-black font-mono text-white">
              {problem.time_complexity}
            </div>
            <p className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-white/10 font-sans">
              <span className="font-bold text-gray-200">{isBengali ? "কেন? " : "Why? "}</span>
              {problem.time_complexity_reason}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              {isBengali ? "স্পেস কমপ্লেক্সিটি (Space Complexity)" : "Space Complexity"}
            </div>
            <div className="text-2xl font-black font-mono text-white">
              {problem.space_complexity}
            </div>
            <p className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-white/10 font-sans">
              <span className="font-bold text-gray-200">{isBengali ? "কেন? " : "Why? "}</span>
              {problem.space_complexity_reason}
            </p>
          </div>
        </section>

        {/* Section 11: Common Beginner Mistakes */}
        <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-rose-500/20 bg-slate-950/80 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                11. {isBengali ? "সাধারণ ভুল ও এজ কেস (Common Beginner Mistakes)" : "Common Mistakes & Pitfalls"}
              </h3>
              <p className="text-xs text-gray-400">
                {isBengali ? "ইন্টারভিউতে সবচেয়ে বেশি যে ভুলগুলো হয় তা এড়িয়ে চলুন" : "Avoid these common beginner logic and boundary condition mistakes"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problem.common_mistakes.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-100 space-y-1">
                <h5 className="font-bold text-rose-300 font-sans">{m.title}</h5>
                <p className="text-gray-300 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Learning Action Buttons */}
        <section>
          <InteractiveActions 
            problem={problem} 
            isCompleted={isCompleted}
            onResetAnimation={() => setResetAnimKey(prev => prev + 1)}
            onMarkComplete={() => handleToggleAction('completed')}
          />
        </section>

      </main>

      {/* Footer with 150 STRICKs • Powered by Ritam */}
      <footer className="border-t border-white/10 py-8 bg-slate-950 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono font-bold text-gray-300">
            <span className="text-amber-400">150 STRICKs</span> Platform
          </div>
          <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>150 STRICKs • POWERED BY RITAM</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
