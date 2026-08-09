"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import VisualDryRun from '@/components/VisualDryRun';
import CodeViewer from '@/components/CodeViewer';
import HintAccordion from '@/components/HintAccordion';
import InteractiveActions from '@/components/InteractiveActions';
import { fetchProblemDetail, ProblemDetail } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ArrowLeft, Zap, Layers, CheckCircle2, AlertCircle, Sparkles, 
  HelpCircle, Compass, ShieldCheck, Flame, BookOpen, Check, Play, FileCode, ListOrdered
} from 'lucide-react';

export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isBengali } = useLanguage();

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
              {isBengali ? "সমস্যা ও সমাধান লোড হচ্ছে..." : "Loading NeetCode 150 problem breakdown & solutions..."}
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
  const descriptionEnglish = problem.intuition || problem.easy_explanation;
  const descriptionBengali = problem.bengali_explanation;

  const example1 = {
    input: "nums = [1, 4, 1, 2]",
    output: "[1, 4, 1, 2, 1, 4, 1, 2]",
    steps: [
      { line: "Line 1: ans[0] = nums[0] -> 1", desc: isBengali ? "Index 0 এর মান 1 প্রথম অর্ধে ans[0] = 1 এবং দ্বিতীয় অর্ধে ans[0+4] = 1 বসানো হলো।" : "Index 0: Value 1 is copied to ans[0] = 1 and ans[4] = 1." },
      { line: "Line 2: ans[1] = nums[1] -> 4", desc: isBengali ? "Index 1 এর মান 4 প্রথম অর্ধে ans[1] = 4 এবং দ্বিতীয় অর্ধে ans[1+4] = 4 বসানো হলো।" : "Index 1: Value 4 is copied to ans[1] = 4 and ans[5] = 4." },
      { line: "Line 3: ans[2] = nums[2] -> 1", desc: isBengali ? "Index 2 এর মান 1 প্রথম অর্ধে ans[2] = 1 এবং দ্বিতীয় অর্ধে ans[2+4] = 1 বসানো হলো।" : "Index 2: Value 1 is copied to ans[2] = 1 and ans[6] = 1." },
      { line: "Line 4: ans[3] = nums[3] -> 2", desc: isBengali ? "Index 3 এর মান 2 প্রথম অর্ধে ans[3] = 2 এবং দ্বিতীয় অর্ধে ans[3+4] = 2 বসানো হলো।" : "Index 3: Value 2 is copied to ans[3] = 2 and ans[7] = 2." }
    ]
  };

  const example2 = {
    input: "nums = [22, 21, 20, 1]",
    output: "[22, 21, 20, 1, 22, 21, 20, 1]",
    steps: [
      { line: "Line 1: ans[0] = nums[0] -> 22", desc: isBengali ? "Index 0 এর মান 22 প্রথম অর্ধে ans[0] = 22 এবং দ্বিতীয় অর্ধে ans[0+4] = 22 বসানো হলো।" : "Index 0: Value 22 is copied to ans[0] = 22 and ans[4] = 22." },
      { line: "Line 2: ans[1] = nums[1] -> 21", desc: isBengali ? "Index 1 এর মান 21 প্রথম অর্ধে ans[1] = 21 এবং দ্বিতীয় অর্ধে ans[1+4] = 21 বসানো হলো।" : "Index 1: Value 21 is copied to ans[1] = 21 and ans[5] = 21." },
      { line: "Line 3: ans[2] = nums[2] -> 20", desc: isBengali ? "Index 2 এর মান 20 প্রথম অর্ধে ans[2] = 20 এবং দ্বিতীয় অর্ধে ans[2+4] = 20 বসানো হলো।" : "Index 2: Value 20 is copied to ans[2] = 20 and ans[6] = 20." },
      { line: "Line 4: ans[3] = nums[3] -> 1", desc: isBengali ? "Index 3 এর মান 1 প্রথম অর্ধে ans[3] = 1 এবং দ্বিতীয় অর্ধে ans[3+4] = 1 বসানো হলো।" : "Index 3: Value 1 is copied to ans[3] = 1 and ans[7] = 1." }
    ]
  };

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

          {/* Roadmap Track Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              NeetCode 150 Roadmap Track
            </span>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
              Powered by Ritam
            </span>
          </div>
        </div>

        {/* Problem Title & Meta Info Header */}
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

            {/* Topic Notes Link */}
            <div className="flex items-center gap-2">
              <Link
                href="/notes"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{isBengali ? "DSA বইয়ের নোটস দেখুন" : "View Topic Notes"}</span>
              </Link>
            </div>
          </div>

          {/* ⚡ 10-Second Golden Rule Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-indigo-500/20 border border-amber-400/40 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
              <span>{isBengali ? "১০-সেকেন্ডের গোল্ডেন ট্রিক (10-Second Golden Rule)" : "10-Second Golden Rule Trick"}</span>
            </div>
            <p className="text-sm font-semibold text-amber-100 leading-relaxed font-sans">
              {goldenRule}
            </p>
          </div>

          {/* Original Problem Statement Description */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{isBengali ? "সমস্যার ইনটুইশন ও বিবরণী (Problem Intuition)" : "Problem Intuition & Breakdown"}</span>
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-sans bg-slate-900/60 p-5 rounded-2xl border border-white/5">
              {isBengali ? descriptionBengali : descriptionEnglish}
            </p>
          </div>

          {/* Explicit Example 1 and Example 2 Solved Cards DIRECTLY ON WEBSITE */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-amber-400" />
                <span>{isBengali ? "উভয় টেস্ট কেসের লাইন-বাই-লাইন সমাধান (Example 1 & Example 2 Line-by-Line Breakdown)" : "Explicit Example 1 & Example 2 Line-by-Line Solved"}</span>
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                NeetCode 150 Test Cases
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Example 1 Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-4 font-mono shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Example 1:
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Test Case 1 Solved ✓
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-sky-400 font-bold">Input: </span>
                    <span className="text-gray-200 bg-slate-950 px-2 py-1 rounded border border-white/5 inline-block font-mono">
                      {example1.input}
                    </span>
                  </div>

                  <div>
                    <span className="text-emerald-400 font-bold">Output: </span>
                    <span className="text-emerald-300 bg-slate-950 px-2 py-1 rounded border border-white/5 inline-block font-mono font-bold">
                      {example1.output}
                    </span>
                  </div>
                </div>

                {/* Example 1 Line-by-Line Step Breakdown */}
                <div className="space-y-2 pt-2 border-t border-white/5 font-sans">
                  <span className="text-xs font-bold text-amber-400 block mb-1">
                    {isBengali ? "Example 1 এর ধাপে ধাপে এক্সিকিউশন breakdown:" : "Example 1 Line-by-Line Breakdown:"}
                  </span>

                  {example1.steps.map((st, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-white/5 space-y-1 font-mono text-xs">
                      <div className="text-cyan-300 font-bold">{st.line}</div>
                      <div className="text-gray-300 font-sans text-[11px] leading-relaxed">{st.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example 2 Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-4 font-mono shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Example 2:
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Test Case 2 Solved ✓
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-sky-400 font-bold">Input: </span>
                    <span className="text-gray-200 bg-slate-950 px-2 py-1 rounded border border-white/5 inline-block font-mono">
                      {example2.input}
                    </span>
                  </div>

                  <div>
                    <span className="text-emerald-400 font-bold">Output: </span>
                    <span className="text-emerald-300 bg-slate-950 px-2 py-1 rounded border border-white/5 inline-block font-mono font-bold">
                      {example2.output}
                    </span>
                  </div>
                </div>

                {/* Example 2 Line-by-Line Step Breakdown */}
                <div className="space-y-2 pt-2 border-t border-white/5 font-sans">
                  <span className="text-xs font-bold text-amber-400 block mb-1">
                    {isBengali ? "Example 2 এর ধাপে ধাপে এক্সিকিউশন breakdown:" : "Example 2 Line-by-Line Breakdown:"}
                  </span>

                  {example2.steps.map((st, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-white/5 space-y-1 font-mono text-xs">
                      <div className="text-cyan-300 font-bold">{st.line}</div>
                      <div className="text-gray-300 font-sans text-[11px] leading-relaxed">{st.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 🎬 Visual Dry Run Player Simulator with Both Example 1 & Example 2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🎬</span>
              <span>{isBengali ? "ইন্টারেক্টিভ ভিজ্যুয়াল ড্রাই রান (Both Example 1 & 2)" : "Interactive Visual Dry Run (Example 1 & Example 2)"}</span>
            </h2>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Multi-Example Test Case Player
            </span>
          </div>

          <VisualDryRun steps={problem.dry_run_steps} extraExample={problem.extra_example} />
        </section>

        {/* 💻 Multi-Language Code Viewer (Python, C++, Java, JS) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>💻</span>
              <span>{isBengali ? "মাল্টি-ল্যাঙ্গুয়েজ সমাধান (Code Solutions & Breakdown)" : "Multi-Language Solutions & Line Breakdown"}</span>
            </h2>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Python • C++ • Java • JavaScript
            </span>
          </div>

          <CodeViewer problem={problem} />
        </section>

        {/* 3-Stage Progressive Hint System */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>💡</span>
              <span>{isBengali ? "৩-ধাপের প্রোগ্রেসিভ হিন্টস (Progressive Hints)" : "3-Stage Progressive Hints"}</span>
            </h2>
          </div>

          <HintAccordion problem={problem} />
        </section>

        {/* Interactive Action Booster (ELI10 Modal, Simpler Explanation, Practice) */}
        <section className="space-y-4">
          <InteractiveActions problem={problem} />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-slate-950 text-center text-xs font-bold text-cyan-400">
        150 STRICKs • POWERED BY RITAM • NeetCode 150 Complete Roadmap Track
      </footer>

    </div>
  );
}
