"use client";

import React, { useState } from 'react';
import { ProblemDetail } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { Lightbulb, Lock, Unlock, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HintAccordionProps {
  problem: ProblemDetail;
  onUnlockSolution?: () => void;
  isSolutionUnlocked?: boolean;
}

export default function HintAccordion({ problem, onUnlockSolution, isSolutionUnlocked = false }: HintAccordionProps) {
  const { isBengali } = useLanguage();
  const [unlockedLevel, setUnlockedLevel] = useState<number>(0); // 0 = locked, 1 = hint 1, 2 = hint 2, 3 = hint 3

  const handleUnlockNext = () => {
    const next = unlockedLevel + 1;
    setUnlockedLevel(next);
    if (next >= 3) {
      onUnlockSolution?.();
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 bg-slate-950/80 shadow-2xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lightbulb className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white tracking-tight">
              {isBengali ? "৩-ধাপের হিন্ট সিস্টেম (Progressive Hints)" : "Guided Progressive Hint System"}
            </h4>
            <p className="text-xs text-gray-400">
              {isBengali ? "সরাসরি সলিউশন না দেখে ধাপে ধাপে চিন্তা করতে শিখুন" : "Think first! Reveal hints progressively before unlocking full solution"}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
          {unlockedLevel}/3 {isBengali ? "উন্মুক্ত" : "Unlocked"}
        </span>
      </div>

      {/* Hint 1: Tiny Hint */}
      <div className="rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">1</span>
            <span className="text-sm font-bold text-white">{isBengali ? "হিন্ট ১ (ছোট হিন্ট)" : "Hint 1 (Tiny Hint)"}</span>
          </div>
          {unlockedLevel >= 1 ? (
            <Unlock className="w-4 h-4 text-emerald-400" />
          ) : (
            <Lock className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {unlockedLevel >= 1 && (
          <div className="px-4 pb-4 text-xs text-gray-300 border-t border-white/5 pt-3 leading-relaxed animate-fade-in">
            {problem.hint1_tiny || (isBengali ? "💡 সমীকরণটি চিন্তা করুন: টার্গেট - বর্তমান সংখ্যা = প্রয়োজনীয় সঙ্গী।" : "💡 Consider writing down what complement value is needed as you iterate.")}
          </div>
        )}
      </div>

      {/* Hint 2: Better Hint */}
      <div className="rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">2</span>
            <span className="text-sm font-bold text-white">{isBengali ? "হিন্ট ২ (উন্নত লজিক)" : "Hint 2 (Better Hint)"}</span>
          </div>
          {unlockedLevel >= 2 ? (
            <Unlock className="w-4 h-4 text-emerald-400" />
          ) : (
            <Lock className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {unlockedLevel >= 2 && (
          <div className="px-4 pb-4 text-xs text-gray-300 border-t border-white/5 pt-3 leading-relaxed animate-fade-in">
            {problem.hint2_better || (isBengali ? "💡 প্রতিবার লুপ চালানোর সময় O(1) টাইমে সঙ্গী সংখ্যাটি খুঁজে পাওয়ার জন্য ডিকশনারি/হ্যাশম্যাপ ব্যবহার করুন।" : "💡 Use a lookup table (HashMap) to check if the complement was already encountered in O(1) time.")}
          </div>
        )}
      </div>

      {/* Hint 3: Almost Complete Solution */}
      <div className="rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">3</span>
            <span className="text-sm font-bold text-white">{isBengali ? "হিন্ট ৩ (প্রায় সম্পূর্ণ অ্যালগোরিদম)" : "Hint 3 (Almost Complete)"}</span>
          </div>
          {unlockedLevel >= 3 ? (
            <Unlock className="w-4 h-4 text-emerald-400" />
          ) : (
            <Lock className="w-4 h-4 text-gray-500" />
          )}
        </div>
        {unlockedLevel >= 3 && (
          <div className="px-4 pb-4 text-xs text-gray-300 border-t border-white/5 pt-3 leading-relaxed animate-fade-in">
            {problem.hint3_almost || (isBengali ? "💡 হ্যাশম্যাপের কী (Key) হবে পাস্টের সংখ্যা এবং ভ্যালু (Value) হবে সেটির ইন্ডেক্স। সঙ্গী পেয়ে গেলে দুটো ইন্ডেক্স রিটার্ন করুন।" : "💡 Map each number seen so far to its index. When complement exists in map, return [seen[complement], current_index].")}
          </div>
        )}
      </div>

      {/* Unlock Next / Solution Action Button */}
      <div className="pt-2">
        {unlockedLevel < 3 ? (
          <button
            onClick={handleUnlockNext}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <Unlock className="w-4 h-4" />
            <span>
              {isBengali
                ? `পরবর্তী হিন্ট দেখুন (${unlockedLevel + 1}/3)`
                : `Unlock Next Hint (${unlockedLevel + 1}/3)`}
            </span>
          </button>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {isBengali
                ? "সবগুলো হিন্ট আনলক হয়েছে! নিচে সম্পূর্ণ সলিউশন কোড দেখুন।"
                : "All hints unlocked! Solution unlocked below."}
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
