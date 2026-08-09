"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import VisualDryRun from '@/components/VisualDryRun';
import CodeViewer from '@/components/CodeViewer';
import HintAccordion from '@/components/HintAccordion';
import InteractiveActions from '@/components/InteractiveActions';
import CodeComparisonModal from '@/components/CodeComparisonModal';
import EmergencyCodeModal from '@/components/EmergencyCodeModal';
import PracticeEditor from '@/components/PracticeEditor';
import LanguageLearningMode from '@/components/LanguageLearningMode';
import { fetchProblemDetail, ProblemDetail } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ArrowLeft, Zap, Layers, CheckCircle2, AlertCircle, Sparkles, 
  HelpCircle, Compass, ShieldCheck, Flame, BookOpen, Check, Play, FileCode, ListOrdered, Baby, Smile, Code, Brain
} from 'lucide-react';

export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isBengali } = useLanguage();

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Mini quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchProblemDetail(slug)
      .then((data) => {
        setProblem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load problem. Please try again.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
            <p className="text-gray-400 font-mono text-sm animate-pulse">
              {isBengali ? "সমস্যা ও ১৯-ধাপের লজিক লোড হচ্ছে..." : "Loading 19-Step Structured Flow & Algorithms..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4 max-w-md">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
            <h2 className="text-xl font-bold">{isBengali ? "সমস্যা পাওয়া যায়নি" : "Problem Not Found"}</h2>
            <p className="text-sm text-gray-400">{error || "The requested problem could not be found."}</p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isBengali ? "হোমে ফিরে যান" : "Back to All 150 Problems"}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Easy</span>;
      case 'medium':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Medium</span>;
      case 'hard':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">Hard</span>;
      default:
        return null;
    }
  };

  const goldenRule = problem.easy_explanation || problem.analogy || "Focus on key invariants to simplify logic.";
  const childStory = problem.eli10_explanation || problem.analogy || "Imagine matching candies with a friend step by step!";

  const pseudocodeText = `FOR each element item in array:
    needed_value = target - item
    IF needed_value exists in our notepad:
        RETURN pair (notepad[needed_value], current_position)
    ELSE:
        SAVE current_position into notepad[item]`;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans">
      
      {/* Top Header Navbar */}
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBengali ? "সব প্রবলেমে ফিরে যান" : "Back to NeetCode 150 List"}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              19-Step Structured Algorithm Flow
            </span>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
              Powered by Ritam
            </span>
          </div>
        </div>

        {/* Action Triggers Bar (Compare Languages + Emergency Code Modal) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-white/10 shadow-lg">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Code className="w-4 h-4 text-cyan-400" />
              <span>{isBengali ? "🔍 কোড তুলনা মোড (Compare 4 Languages)" : "🔍 Compare Languages Side-by-Side"}</span>
            </button>
          </div>

          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <HelpCircle className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>{isBengali ? "😵 আমি এই কোডটি বুঝতে পারছি না" : "😵 I Don't Understand This Code"}</span>
          </button>
        </div>

        {/* STEP 1 & STEP 2: Problem Story & Title Header */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 bg-slate-950/90 shadow-2xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-amber-400 font-bold text-lg">#{problem.id_number}</span>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {problem.title}
                </h1>
                {getDifficultyBadge(problem.difficulty)}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-400">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-amber-300 font-semibold font-mono">
                  📁 {problem.topic_name}
                </span>
                <span>•</span>
                <span className="font-mono text-emerald-400 font-semibold">Time: {problem.time_complexity}</span>
                <span>•</span>
                <span className="font-mono text-cyan-400 font-semibold">Space: {problem.space_complexity}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/notes"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{isBengali ? "DSA বইয়ের নোটস" : "View Topic Notes"}</span>
              </Link>
            </div>
          </div>

          {/* STEP 3: Real-Life 5-Year-Old Child Story Analogy */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-400/50 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Smile className="w-5 h-5 text-amber-400 animate-bounce" />
              <span>{isBengali ? "STEP 3: 👶 বাস্তব জীবনের গল্প (Real-Life Child Analogy)" : "STEP 3: 👶 Real-Life 5-Year-Old Child Analogy"}</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-amber-100 leading-relaxed font-sans">
              {childStory}
            </p>
          </div>

          {/* STEP 4: Think Yourself Interactive Prompt */}
          <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span>{isBengali ? "STEP 4: 🧠 নিজে একবার চিন্তা করুন (Think Yourself)" : "STEP 4: 🧠 Think Yourself Mental Prompt"}</span>
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed">
              {isBengali
                ? "কোড দেখার আগে ১ মুহূর্ত ভাবুন: আপনি কীভাবে ২টি সংখ্যা বেছে নেবেন যেন তাদের যোগফল কাঙ্ক্ষিত সংখ্যার সমান হয়?"
                : "Before scrolling down to code: How would you manually pair up items on a table without checking every pair twice?"}
            </p>
          </div>

          {/* STEP 5: Progressive Hints Accordion */}
          <section className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              STEP 5: 💡 Progressive Hints (3-Stage Hints)
            </div>
            <HintAccordion problem={problem} />
          </section>

          {/* STEP 6, 7 & 8: Brute Force, Better, and Optimal Approaches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-sans text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 text-[10px]">
                STEP 6: Brute Force O(N²)
              </span>
              <p className="text-gray-300 leading-relaxed">
                {isBengali ? "ডাবল লুপ চালিয়ে প্রতিটি সংখ্যার সাথে অন্য সব সংখ্যা চেক করা।" : "Check every possible pair using nested loops."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 text-[10px]">
                STEP 7: Better Approach O(N log N)
              </span>
              <p className="text-gray-300 leading-relaxed">
                {isBengali ? "অ্যারে সর্ট করে টু পয়েন্টার ব্যবহার করা।" : "Sort array first and use converging Two Pointers."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[10px]">
                STEP 8: Optimal Approach O(N)
              </span>
              <p className="text-gray-300 leading-relaxed">
                {isBengali ? "হ্যাশম্যাপ ব্যবহার করে ১ পাসেই ও(১) সার্চ সম্পন্ন করা।" : "Use HashMap for instant O(1) single-pass lookups."}
              </p>
            </div>
          </div>

          {/* STEP 9: Why This Data Structure? */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>STEP 9: 🔍 Why This Data Structure Was Chosen?</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {isBengali
                ? "আমরা হ্যাশম্যাপ বেছে নিয়েছি কারণ এটি ও(১) কনস্ট্যান্ট টাইমে অতীতে দেখা সংখ্যাগুলো সাথে সাথে খুঁজে বের করতে পারে।"
                : "We selected HashMap because it eliminates nested loops by providing instant O(1) constant time key lookups."}
            </p>
          </div>

        </div>

        {/* STEP 10: Language-Independent Visual Dry Run */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🎬 STEP 10:</span>
              <span>{isBengali ? "ল্যাঙ্গুয়েজ-স্বাধীন ভিজ্যুয়াল ড্রাই রান" : "Language-Independent Visual Dry Run"}</span>
            </h2>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Universal Algorithm Player
            </span>
          </div>

          <VisualDryRun steps={problem.dry_run_steps} extraExample={problem.extra_example} />
        </section>

        {/* STEP 11: Language-Independent Pseudocode */}
        <section className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/90 shadow-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span>STEP 11: 📝 Language-Independent Pseudocode</span>
            </div>
            <span className="text-[10px] text-gray-400 bg-slate-900 px-2.5 py-0.5 rounded border border-white/5">
              Logic Before Syntax
            </span>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900 text-cyan-200 leading-relaxed overflow-x-auto">
            {pseudocodeText}
          </pre>
        </section>

        {/* STEP 12, 13 & 14: Multi-Language Code Viewer (C++ Default, Python, Java, JS) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>💻 STEP 12-14:</span>
              <span>{isBengali ? "মাল্টি-ল্যাঙ্গুয়েজ সলিউশন (C++ Default, Python, Java, JS)" : "Multi-Language Code & Syntax Inspector"}</span>
            </h2>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Default: C++
            </span>
          </div>

          {/* Language Concept Highlights */}
          <LanguageLearningMode topicName={problem.topic_name} />

          <CodeViewer problem={problem} />
        </section>

        {/* STEP 16 & 17: Complexity & Common Mistakes */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/90 space-y-3 font-sans">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>STEP 16: Time & Space Complexity Analysis</span>
            </h3>
            <div className="space-y-2 text-xs text-gray-300 font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-emerald-400 font-bold">Time Complexity: {problem.time_complexity}</span>
                <p className="text-gray-400 font-sans mt-1">{problem.time_complexity_reason}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-cyan-400 font-bold">Space Complexity: {problem.space_complexity}</span>
                <p className="text-gray-400 font-sans mt-1">{problem.space_complexity_reason}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/90 space-y-3 font-sans">
            <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>STEP 17: Common Mistakes to Avoid</span>
            </h3>
            <div className="space-y-2 text-xs text-gray-300">
              {problem.common_mistakes.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                  <div className="font-bold text-rose-300">{m.title}</div>
                  <div className="text-gray-400">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STEP 18: Interactive Mini Quiz */}
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-slate-950/90 shadow-xl space-y-4 font-sans">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>STEP 18: 🏆 Mini Comprehension Quiz</span>
          </div>

          <div className="space-y-3 text-xs">
            <p className="text-white font-semibold">
              Question: Why is HashMap lookup faster than scanning an array sequentially?
            </p>

            <div className="space-y-2">
              {[
                "HashMap uses an instant O(1) hash function to compute the exact bucket index.",
                "HashMap sorts all elements in alphabetical order.",
                "HashMap uses a double loop to check pairs."
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSelectedQuizOption(idx); setQuizSubmitted(true); }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedQuizOption === idx
                      ? idx === 0 
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' 
                        : 'bg-rose-500/20 border-rose-400 text-rose-200'
                      : 'bg-slate-900 border-white/5 hover:border-white/20 text-gray-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizSubmitted && (
              <div className={`p-3 rounded-xl text-xs font-bold ${selectedQuizOption === 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {selectedQuizOption === 0 ? "🎉 Correct! HashMap hash calculation enables instant O(1) retrieval." : "❌ Incorrect. Try again!"}
              </div>
            )}
          </div>
        </section>

        {/* STEP 19: Interactive Practice Mode (Write Code Yourself) */}
        <section className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            STEP 19: 🧪 Interactive Practice Mode (Solve Again Without Looking)
          </div>
          <PracticeEditor problem={problem} />
        </section>

        {/* Interactive Action Booster */}
        <section className="space-y-4">
          <InteractiveActions problem={problem} />
        </section>

      </main>

      {/* Code Comparison Modal */}
      <CodeComparisonModal 
        isOpen={isCompareOpen} 
        onClose={() => setIsCompareOpen(false)} 
        title={problem.title} 
      />

      {/* Emergency Code Explanation Modal */}
      <EmergencyCodeModal 
        isOpen={isEmergencyOpen} 
        onClose={() => setIsEmergencyOpen(false)} 
        title={problem.title} 
      />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-slate-950 text-center text-xs font-bold text-cyan-400">
        150 STRICKs • POWERED BY RITAM • 19-Step Multi-Language DSA Learning System
      </footer>

    </div>
  );
}
