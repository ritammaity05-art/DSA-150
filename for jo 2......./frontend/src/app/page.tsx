"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProblemCard from '@/components/ProblemCard';
import { fetchTopics, fetchProblems, fetchDashboardStats, Topic, ProblemListItem } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Filter, Search, Sparkles, ChevronLeft, ChevronRight, LayoutGrid, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const { isBengali } = useLanguage();
  const { token } = useAuth();
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [problems, setProblems] = useState<ProblemListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  
  // User progress ids
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchTopics().then(setTopics);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProblems(searchTerm, selectedTopic, selectedDifficulty).then((data) => {
      setProblems(data);
      setLoading(false);
      setCurrentPage(1);
    });
  }, [searchTerm, selectedTopic, selectedDifficulty]);

  useEffect(() => {
    fetchDashboardStats(token || undefined).then((dash) => {
      if (dash) {
        setCompletedIds(dash.completed_ids || []);
        setFavoriteIds(dash.favorite_ids || []);
      }
    });
  }, [token]);

  const handleToggleFavorite = (id: number) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(problems.length / itemsPerPage);
  const displayedProblems = problems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans">
      
      {/* Header Navbar */}
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Main Content Area */}
      <main className="flex-1 pb-24">
        
        {/* Hero Section Banner */}
        <HeroSection />

        {/* Problem Explorer Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          
          {/* Filters Bar Box */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-5 mb-8">
            
            {/* Topic Filter Pills Scrollable */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <LayoutGrid className="w-4 h-4 text-blue-400" />
                  <span>{isBengali ? "টপিক অনুযায়ী ফিল্টার করুন (16 Topics)" : "Filter by Topic (16 Core Topics)"}</span>
                </span>
                <span>{problems.length} {isBengali ? "সমস্যা পাওয়া গেছে" : "Problems"}</span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setSelectedTopic('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedTopic === 'all'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-900 text-gray-400 hover:text-white hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  {isBengali ? "সকল টপিক (All)" : "All Topics"}
                </button>

                {topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopic(t.slug)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      selectedTopic === t.slug
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-900 text-gray-300 hover:text-white hover:bg-slate-800 border border-white/5'
                    }`}
                  >
                    <span>{t.name}</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/10 font-mono">
                      {t.problem_count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-Filters: Difficulty & Quick Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10">
              
              {/* Difficulty Pills */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-gray-400 mr-2 hidden sm:inline">
                  {isBengali ? "কঠিনতা:" : "Difficulty:"}
                </span>

                {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedDifficulty === diff
                        ? diff === 'Easy' 
                          ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20' 
                          : diff === 'Medium'
                          ? 'bg-amber-500 text-slate-950 shadow-amber-500/20'
                          : diff === 'Hard'
                          ? 'bg-rose-500 text-white shadow-rose-500/20'
                          : 'bg-blue-600 text-white shadow-blue-500/20'
                        : 'bg-slate-900 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {diff === 'all' ? (isBengali ? 'সবগুলো' : 'All') : diff}
                  </button>
                ))}
              </div>

              {/* Page Indicator */}
              <div className="text-xs text-gray-400 font-mono">
                Showing {displayedProblems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, problems.length)} of {problems.length}
              </div>

            </div>

          </div>

          {/* Problem Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl h-48 animate-pulse bg-slate-900/50" />
              ))}
            </div>
          ) : displayedProblems.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl space-y-3">
              <Search className="w-10 h-10 mx-auto text-gray-600" />
              <h4 className="text-lg font-bold text-white">
                {isBengali ? "কোনো সমস্যা পাওয়া যায়নি" : "No problems matched your search"}
              </h4>
              <p className="text-xs text-gray-400">
                {isBengali ? "ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।" : "Try clearing search or picking a different topic filter."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProblems.map((prob) => (
                <ProblemCard
                  key={prob.id}
                  problem={prob}
                  isCompleted={completedIds.includes(prob.id_number)}
                  isFavorite={favoriteIds.includes(prob.id_number)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-gray-300 hover:text-white disabled:opacity-40 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono font-bold px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-gray-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-gray-300 hover:text-white disabled:opacity-40 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>

      </main>

      {/* Modern Footer with 150 STRICKs • Powered by Ritam */}
      <footer className="border-t border-white/10 py-8 bg-slate-950 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono font-bold text-gray-300">
            <span className="text-amber-400">150 STRICKs</span> Platform
          </div>
          <div className="text-cyan-400 font-bold flex items-center gap-1">
            ⚡ 150 STRICKs • POWERED BY RITAM • Original Explanations & Visual Dry Runs
          </div>
        </div>
      </footer>

    </div>
  );
}
