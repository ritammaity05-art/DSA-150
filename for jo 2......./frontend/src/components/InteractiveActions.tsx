"use client";

import React, { useState } from 'react';
import { ProblemDetail } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Smile, RefreshCw, Layers, CheckCircle2, HelpCircle, X, ArrowRight, ListOrdered } from 'lucide-react';

interface InteractiveActionsProps {
  problem: ProblemDetail;
  onResetAnimation?: () => void;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export default function InteractiveActions({
  problem,
  onResetAnimation,
  onMarkComplete,
  isCompleted = false
}: InteractiveActionsProps) {
  const { isBengali } = useLanguage();
  const [showEli10Modal, setShowEli10Modal] = useState(false);
  const [showSimpler, setShowSimpler] = useState(false);
  const [showExtraExample, setShowExtraExample] = useState(true);

  // Line-by-line step breakdown for Example 2 (nums = [22, 21, 20, 1])
  const example2LineSteps = [
    {
      step: 1,
      lineCode: "ans[0] = nums[0] -> 22",
      explanation: isBengali
        ? "১ম উপাদানের জন্য: Index 0 এর মান 22 প্রথম অর্ধে ans[0] = 22 এবং দ্বিতীয় অর্ধে ans[0+4] = 22 বসানো হলো।"
        : "Line 1: For index 0, value 22 is copied to ans[0] = 22 and ans[0+4] = 22."
    },
    {
      step: 2,
      lineCode: "ans[1] = nums[1] -> 21",
      explanation: isBengali
        ? "২য় উপাদানের জন্য: Index 1 এর মান 21 প্রথম অর্ধে ans[1] = 21 এবং দ্বিতীয় অর্ধে ans[1+4] = 21 বসানো হলো।"
        : "Line 2: For index 1, value 21 is copied to ans[1] = 21 and ans[1+4] = 21."
    },
    {
      step: 3,
      lineCode: "ans[2] = nums[2] -> 20",
      explanation: isBengali
        ? "৩য় উপাদানের জন্য: Index 2 এর মান 20 প্রথম অর্ধে ans[2] = 20 এবং দ্বিতীয় অর্ধে ans[2+4] = 20 বসানো হলো।"
        : "Line 3: For index 2, value 20 is copied to ans[2] = 20 and ans[2+4] = 20."
    },
    {
      step: 4,
      lineCode: "ans[3] = nums[3] -> 1",
      explanation: isBengali
        ? "৪র্থ উপাদানের জন্য: Index 3 এর মান 1 প্রথম অর্ধে ans[3] = 1 এবং দ্বিতীয় অর্ধে ans[3+4] = 1 বসানো হলো।"
        : "Line 4: For index 3, value 1 is copied to ans[3] = 1 and ans[3+4] = 1."
    }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-blue-500/20 bg-slate-950/80 shadow-2xl space-y-6">
      
      {/* Title */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white tracking-tight">
            {isBengali ? "ইন্টারেক্টিভ লার্নিং টুলস" : "Interactive Learning Booster"}
          </h4>
          <p className="text-xs text-gray-400">
            {isBengali ? "সহজ ভাষায় বুঝতে বা অন্য উদাহরণ দিয়ে প্র্যাকটিস করতে ক্লিক করুন" : "Click to view ELI10 story, simplified terms, or extra test case examples"}
          </p>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        
        {/* Explain Like I'm 10 */}
        <button
          onClick={() => setShowEli10Modal(true)}
          className="p-3.5 rounded-xl bg-gradient-to-tr from-amber-500/10 to-orange-500/10 border border-amber-500/30 hover:border-amber-500/60 text-amber-300 hover:text-white flex flex-col items-center justify-center text-center gap-2 group transition-all"
        >
          <Smile className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-400" />
          <span className="text-xs font-bold">{isBengali ? "১০ বছরের বাচ্চার মতো বাংলা" : "Explain Like I'm 10"}</span>
        </button>

        {/* Simpler Explanation */}
        <button
          onClick={() => setShowSimpler(!showSimpler)}
          className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center gap-2 group transition-all ${
            showSimpler 
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' 
              : 'bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300'
          }`}
        >
          <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform text-cyan-400" />
          <span className="text-xs font-bold">{isBengali ? "আরও সহজ ব্যাখ্যার টগল" : "Simpler Explanation"}</span>
        </button>

        {/* Give Another Example */}
        <button
          onClick={() => setShowExtraExample(!showExtraExample)}
          className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center gap-2 group transition-all ${
            showExtraExample
              ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200'
              : 'bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 border-indigo-500/30 hover:border-indigo-500/60 text-indigo-300'
          }`}
        >
          <Layers className="w-5 h-5 group-hover:scale-110 transition-transform text-indigo-400" />
          <span className="text-xs font-bold">{isBengali ? "অন্য আরেকটি উদাহরণ" : "Give Another Example"}</span>
        </button>

        {/* Show Animation Again */}
        <button
          onClick={onResetAnimation}
          className="p-3.5 rounded-xl bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:border-blue-500/60 text-blue-300 hover:text-white flex flex-col items-center justify-center text-center gap-2 group transition-all"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500 text-blue-400" />
          <span className="text-xs font-bold">{isBengali ? "এনিমেশন রি-প্লে" : "Show Animation Again"}</span>
        </button>

        {/* Practice Again / Mark Complete */}
        <button
          onClick={onMarkComplete}
          className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center gap-2 group transition-all ${
            isCompleted
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
              : 'bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300'
          }`}
        >
          <CheckCircle2 className={`w-5 h-5 group-hover:scale-110 transition-transform ${isCompleted ? 'text-emerald-400 fill-emerald-400/20' : 'text-emerald-400'}`} />
          <span className="text-xs font-bold">
            {isCompleted ? (isBengali ? "সম্পন্ন হয়েছে ✓" : "Completed ✓") : (isBengali ? "প্র্যাকটিস শেষ করুন" : "Practice Complete")}
          </span>
        </button>

      </div>

      {/* Toggled Simpler Explanation Banner */}
      {showSimpler && (
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-100 leading-relaxed animate-fade-in">
          <h5 className="font-bold text-cyan-300 mb-1">
            {isBengali ? "💡 অতি সহজ ভাষায় বোঝার টিপস:" : "💡 Simpler Takeaway:"}
          </h5>
          <p>
            {isBengali
              ? "মনে রাখুন, কম্পিউটার প্রতিবার পিছনের সংখ্যাগুলি মনে রাখতে হ্যাশম্যাপ টেবিল ব্যবহার করে। আপনাকে আর দুইবার লুপ চালিয়ে খুঁজতে হবে না।"
              : "Simply put: We use a HashMap as a smart notepad so the computer checks past items in 1 instant glance."}
          </p>
        </div>
      )}

      {/* Toggled Extra Example Banner with Full Line-by-Line Breakdown */}
      {showExtraExample && (
        <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-100 leading-relaxed space-y-4 animate-fade-in font-mono shadow-xl">
          
          <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-amber-400" />
              <h5 className="font-bold text-indigo-300 font-sans text-sm">
                {isBengali ? "📌 Example 2: লাইন-বাই-লাইন সম্পূর্ণ সমাধান (Line-by-Line Solution Breakdown)" : "📌 Example 2: Full Line-by-Line Solution Breakdown"}
              </h5>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
              Verified Solution ✓
            </span>
          </div>

          {/* Input & Output Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10">
              <span className="text-sky-400 font-bold">Input: </span>
              <span className="text-gray-200 font-mono">{problem.extra_example?.input || "nums = [22, 21, 20, 1]"}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10">
              <span className="text-emerald-400 font-bold">Output: </span>
              <span className="text-emerald-300 font-mono font-bold">{problem.extra_example?.output || "[22, 21, 20, 1, 22, 21, 20, 1]"}</span>
            </div>
          </div>

          {/* Line-by-Line Execution Cards for Example 2 */}
          <div className="space-y-2.5 pt-2">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-sans">
              {isBengali ? "ধাপে ধাপে কোড এক্সিকিউশন লাইন breakdown:" : "Step-by-Step Code Execution Breakdown:"}
            </div>

            {example2LineSteps.map((stepItem) => (
              <div 
                key={stepItem.step}
                className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1.5 font-mono text-xs hover:border-amber-400/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px] border border-amber-500/30">
                    Step {stepItem.step}
                  </span>
                  <span className="text-gray-300 text-[11px] font-mono">{stepItem.lineCode}</span>
                </div>

                <div className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
                  <span className="text-cyan-400 font-semibold">{isBengali ? "ব্যাখ্যা: " : "Explanation: "}</span>
                  {stepItem.explanation}
                </div>
              </div>
            ))}
          </div>

          {/* Final Verification Summary */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-semibold flex items-center justify-between">
            <span>{isBengali ? "চুড়ান্ত সমাধান যাচাইকৃত:" : "Final Verified Output:"}</span>
            <span className="font-mono font-bold text-emerald-400">{problem.extra_example?.output || "[22, 21, 20, 1, 22, 21, 20, 1]"} ✓</span>
          </div>

        </div>
      )}

      {/* ELI10 Modal */}
      {showEli10Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowEli10Modal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Smile className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">
                {isBengali ? "১০ বছরের বাচ্চার গল্পে সমাধান" : "Explain Like I'm 10 Story"}
              </h4>
            </div>

            <p className="text-sm text-amber-100 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 leading-relaxed">
              {problem.eli10_explanation || (isBengali ? "মনে করুন আপনার কাছে ক্যান্ডি আছে..." : "Imagine you are matching candies with a friend...")}
            </p>

            <button
              onClick={() => setShowEli10Modal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              {isBengali ? "বুঝেছি, ধন্যবাদ!" : "Got it! Close"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
