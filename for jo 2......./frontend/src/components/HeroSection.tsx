"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { fetchDailyProblem, ProblemDetail } from '@/lib/api';
import { Sparkles, Flame, ArrowRight, Zap, Award, Star } from 'lucide-react';

export default function HeroSection() {
  const { isBengali } = useLanguage();
  const [dailyProblem, setDailyProblem] = useState<ProblemDetail | null>(null);

  useEffect(() => {
    fetchDailyProblem().then(setDailyProblem);
  }, []);

  return (
    <section className="relative pt-10 pb-16 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Powered By Banner */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-indigo-500/20 border border-amber-500/40 text-xs font-black text-amber-300 shadow-xl shadow-amber-500/10 animate-pulse">
            <Award className="w-4 h-4 text-amber-400" />
            <span>150 STRICKs • POWERED BY RITAM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-gray-300 font-semibold">{isBengali ? "একদম সহজ ভাষায় DSA" : "Master Interview Problems Effortlessly"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Title & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {isBengali ? (
                <>
                  <span className="text-amber-400">150 STRICKs</span> দিয়ে কোডিং ইন্টারভিউ শেখা{' '}
                  <span className="text-gradient-cyan">পানির মতো সহজ</span>।
                </>
              ) : (
                <>
                  <span className="text-amber-400">150 STRICKs</span> for Coding Interviews{' '}
                  <span className="text-gradient-cyan">In Plain English</span>.
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              {isBengali
                ? "প্রথমে শিখুন, তারপর কোড করুন! 150 STRICKs এ প্রতিটি সমস্যার আসল বাস্তব উদাহরণ (Analogy), ধাপে ধাপে এনিমেশন ড্রাই রান এবং সহজ বাংলা ব্যাখ্যা দেওয়া হয়েছে।"
                : "No complex math or confusing code. Learn every problem step-by-step with real-life analogies, visual dry run animations, and line-by-line simple breakdowns."}
            </p>

            {/* Beginner Quick Guarantee Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <div className="text-xs text-gray-300">
                <span className="font-bold text-white block mb-0.5">
                  {isBengali ? "প্রথমবার DSA শিখছেন? 150 STRICKs আপনার সাথে আছে!" : "Learning DSA for the absolute first time with 150 STRICKs?"}
                </span>
                {isBengali 
                  ? "আমরা কোনো কঠিন টেকনিক্যাল ভাষা ব্যবহার না করে আপনাকে পাশে বসে শেখানোর মতো সহজ করে তৈরি করেছি।" 
                  : "Every single problem feels like a teacher sitting beside you, explaining WHY the solution works."}
              </div>
            </div>

            {/* Stats Counter Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                <div className="text-2xl font-extrabold text-amber-400 font-mono">150</div>
                <div className="text-xs text-gray-400 font-medium">{isBengali ? "STRICKs প্রবলেমস" : "STRICKs Problems"}</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                <div className="text-2xl font-extrabold text-cyan-400 font-mono">16</div>
                <div className="text-xs text-gray-400 font-medium">{isBengali ? "টপিক ক্যাটাগরি" : "Core Topics"}</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                <div className="text-2xl font-extrabold text-indigo-400 font-mono">4</div>
                <div className="text-xs text-gray-400 font-medium">{isBengali ? "প্রোগ্রামিং ভাষা" : "Languages"}</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">100%</div>
                <div className="text-xs text-gray-400 font-medium">{isBengali ? "ভিজ্যুয়াল ড্রাই রান" : "Animated Dry Runs"}</div>
              </div>
            </div>

          </div>

          {/* Daily Problem Card Spotlight */}
          <div className="lg:col-span-5">
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/15 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500/30 animate-pulse" />
                  <span>{isBengali ? "আজকের স্পেশাল STRICK" : "Daily Spotlight STRICK"}</span>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  {dailyProblem?.difficulty || 'Easy'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                #{dailyProblem?.id_number || 1} {dailyProblem?.title || 'Two Sum'}
              </h3>

              <p className="text-xs text-gray-300 line-clamp-3 mb-6 leading-relaxed">
                {isBengali && dailyProblem?.bengali_explanation 
                  ? dailyProblem.bengali_explanation.slice(0, 140) + "..."
                  : (dailyProblem?.summary || 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.')}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  {dailyProblem?.estimated_time || '10 mins'}
                </span>

                <Link
                  href={`/problem/${dailyProblem?.slug || 'two-sum'}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-amber-500/25 transition-all"
                >
                  <span>{isBengali ? "শেখা শুরু করুন" : "Start Learning"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
