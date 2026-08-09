"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, HelpCircle, ArrowRight, CheckCircle2, FileCode, Play, Sparkles } from 'lucide-react';

interface EmergencyCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function EmergencyCodeModal({ isOpen, onClose, title }: EmergencyCodeModalProps) {
  const { isBengali } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  const emergencySteps = [
    {
      step: 1,
      name: isBengali ? "ধাপ ১: সিনট্যাক্স পরিচিতি (Syntax Breakdown)" : "Step 1: Syntax Breakdown",
      content: isBengali
        ? "কোডিংয়ের বড় চিহ্নগুলোকে ভয় পাওয়ার কিছু নেই! `vector<int>` মানে হলো সংখ্যার একটি সোজা আলমারির সারি। `unordered_map` মানে হলো একটি টেলিফোন ডায়রি যাতে চাবি দিয়ে ১ সেকেন্ডে তথ্য খোঁজা যায়।"
        : "Don't fear code symbols! `vector<int>` simply means a straight row of boxes holding numbers. `unordered_map` is a phonebook that finds data in 1 instant second."
    },
    {
      step: 2,
      name: isBengali ? "ধাপ ২: ভেরিয়েবলের কাজ (Variables Purpose)" : "Step 2: Variables Purpose",
      content: isBengali
        ? "আমরা দুটো পরিবর্তনশীল বাক্স বানাচ্ছি: `left` মানে হলো বামদিকের ১ম বন্ধু, আর `right` মানে হলো ডানদিকের শেষ বন্ধু। তারা ২ প্রান্ত থেকে হেঁটে মাঝখানে এসে উত্তর খুঁজবে।"
        : "We use 2 variables: `left` holds the index of the first friend on left, and `right` holds the last friend on right. They walk towards each other."
    },
    {
      step: 3,
      name: isBengali ? "ধাপ ৩: কাজের লজিক (Operation Meaning)" : "Step 3: Operation Meaning",
      content: isBengali
        ? "লুপ চলাকালীন প্রতি পদক্ষেপে ডায়রিতে চেক করা হচ্ছে: 'টার্গেট ৯ থেকে বর্তমান সংখ্যা ২ বিয়োগ করলে থাকে ৭। এই ৭ সংখ্যাটি কি ডায়রিতে আগে থেকেই লেখা আছে?'"
        : "At every step, the loop checks: 'Target 9 minus current 2 equals 7. Is 7 already recorded in our notepad dictionary?'"
    },
    {
      step: 4,
      name: isBengali ? "ধাপ ৪: খেলনার উদাহরণ (Tiny Toy Example)" : "Step 4: Tiny Toy Example",
      content: isBengali
        ? "মনে করুন ২টি খেলনা গাড়ি বেছে নিতে হবে যাদের দামের যোগফল ১০ টাকা। ১ম গাড়ি ৩ টাকা (ডায়রিতে লিখলাম ৩)। ২য় গাড়ি ৭ টাকা (১০-৭ = ৩ পাওয়া গেছে!)। ৩ টাকা আর ৭ টাকার গাড়ি বেছে নেওয়া হলো!"
        : "Imagine matching 2 toy cars costing 10 total. Car #1 costs 3 (recorded in notepad). Car #2 costs 7 (10-7 = 3 found!). Match found instantly!"
    },
    {
      step: 5,
      name: isBengali ? "ধাপ ৫: পুরো সমাধানের ওয়াকথ্রু (Full Walkthrough)" : "Step 5: Full Problem Walkthrough",
      content: isBengali
        ? "ইনপুট [2, 7, 11, 15] এবং Target = 9। ১ম পদক্ষেপে 2 দেখা হলো (ডায়রিতে রেকর্ড)। ২য় পদক্ষেপে 7 দেখা হলো (9-7 = 2 পাওয়া গেল!)। রেজাল্ট [0, 1] সফলভাবে ফেরত দেওয়া হলো!"
        : "Input [2, 7, 11, 15], Target = 9. Step 1: Record 2. Step 2: See 7, check 9-7 = 2 (Found at index 0!). Return result [0, 1]."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 font-bold">
            <HelpCircle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>😵 {isBengali ? "আমি এই কোডটি বুঝতে পারছি না" : "I Don't Understand This Code"}</span>
            </h3>
            <p className="text-xs text-rose-300 font-mono">
              {title} • 5-Step Guided Breakdown for Absolute Beginners
            </p>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setActiveStep(s)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeStep === s
                  ? 'bg-rose-500 text-white shadow-lg scale-105'
                  : 'bg-slate-950 text-gray-400 border border-white/5 hover:text-white'
              }`}
            >
              <span>Step {s}</span>
              {activeStep === s && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

        {/* Active Step Explanation Card */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-3 font-sans">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
            {emergencySteps[activeStep - 1].name}
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">
            {emergencySteps[activeStep - 1].content}
          </p>
        </div>

        {/* Navigation Next/Prev */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            disabled={activeStep === 1}
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-gray-300 disabled:opacity-40"
          >
            {isBengali ? "আগের ধাপ" : "Previous Step"}
          </button>

          {activeStep < 5 ? (
            <button
              onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold flex items-center gap-1 shadow-md"
            >
              <span>{isBengali ? "পরের ধাপ" : "Next Step"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md"
            >
              {isBengali ? "বুঝেছি, ধন্যবাদ!" : "Got It! Close"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
