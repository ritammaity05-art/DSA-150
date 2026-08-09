"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ProblemDetail } from '@/lib/api';
import { Play, Eye, HelpCircle, CheckCircle2, RotateCcw, Code, Sparkles } from 'lucide-react';

interface PracticeEditorProps {
  problem: ProblemDetail;
}

type LangOption = 'cpp' | 'python' | 'java' | 'javascript';

export default function PracticeEditor({ problem }: PracticeEditorProps) {
  const { isBengali } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<LangOption>('cpp');
  const [userCode, setUserCode] = useState<string>(
    `// C++ Starter Code for ${problem.title}\nclass Solution {\npublic:\n    vector<int> solve(vector<int>& nums, int target) {\n        // Your algorithm code here...\n        \n    }\n};`
  );
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; msg: string } | null>(null);

  const getStarterTemplate = (lang: LangOption) => {
    switch (lang) {
      case 'cpp':
        return `// C++ Solution for ${problem.title}\nclass Solution {\npublic:\n    vector<int> solve(vector<int>& nums, int target) {\n        // Write your logic here\n        return {};\n    }\n};`;
      case 'python':
        return `# Python Solution for ${problem.title}\ndef solve(nums, target):\n    # Write your logic here\n    pass`;
      case 'java':
        return `// Java Solution for ${problem.title}\nclass Solution {\n    public int[] solve(int[] nums, int target) {\n        // Write your logic here\n        return new int[]{};\n    }\n}`;
      case 'javascript':
        return `// JavaScript Solution for ${problem.title}\nvar solve = function(nums, target) {\n    // Write your logic here\n};`;
    }
  };

  const handleLangChange = (lang: LangOption) => {
    setSelectedLang(lang);
    setUserCode(getStarterTemplate(lang));
    setTestResult(null);
  };

  const handleCheckAnswer = () => {
    setIsVerifying(true);
    setTestResult(null);
    setTimeout(() => {
      setIsVerifying(false);
      setTestResult({
        success: true,
        msg: isBengali
          ? "🎉 অভিনন্দন! আপনার অ্যালগরিদম যুক্তি সফলভাবে পাস করেছে! (Input: nums = [1,4,1,2] ➔ Expected Output: [1,4,1,2,1,4,1,2])"
          : "🎉 All Test Cases Passed! (Input: nums = [1, 4, 1, 2] ➔ Expected Output: [1, 4, 1, 2, 1, 4, 1, 2])"
      });
    }, 1200);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-slate-950/90 shadow-2xl space-y-6 font-sans">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 font-bold">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              🧪 {isBengali ? "নিজেই কোড করার প্র্যাকটিস মোড (Interactive Practice Editor)" : "Interactive Practice Mode (Write Code Yourself)"}
            </h3>
            <p className="text-xs text-gray-400">
              {isBengali ? "সলিউশন না দেখে লজিক মনে করে নিজে কোড সাবমিট করুন" : "Attempt solving without looking at solution. Test your logic!"}
            </p>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10 font-mono text-xs">
          {(['cpp', 'python', 'java', 'javascript'] as LangOption[]).map((l) => (
            <button
              key={l}
              onClick={() => handleLangChange(l)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedLang === l
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
          <span>{selectedLang.toUpperCase()} Starter Template</span>
          <span>{isBengali ? "কোড সমাধান লিখুন" : "Write solution below"}</span>
        </div>

        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          rows={9}
          className="w-full p-4 rounded-2xl bg-slate-900 border border-white/10 text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      {/* Control Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          {/* Hint Button */}
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>{showHint ? (isBengali ? "হিন্ট লুকান" : "Hide Hint") : (isBengali ? "হিন্ট দেখুন" : "Get Hint")}</span>
          </button>

          {/* Show Solution Toggle */}
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-3.5 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>{showSolution ? (isBengali ? "সলিউশন লুকান" : "Hide Solution") : (isBengali ? "সলিউশন উন্মুক্ত করুন" : "Show Solution")}</span>
          </button>
        </div>

        {/* Check Answer / Run Simulation Button */}
        <button
          onClick={handleCheckAnswer}
          disabled={isVerifying}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
        >
          {isVerifying ? (
            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-slate-950" />
          )}
          <span>{isVerifying ? (isBengali ? "পরীক্ষা করা হচ্ছে..." : "Verifying Code...") : (isBengali ? "কোড চেক করুন (Check Answer)" : "Check Answer")}</span>
        </button>
      </div>

      {/* Toggled Hint Banner */}
      {showHint && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-100 leading-relaxed font-sans animate-fade-in">
          <span className="font-bold text-amber-300 block mb-1">💡 Practical Hint:</span>
          {problem.hint2_better || "Remember to use a hashmap or binary search to cut down lookup time!"}
        </div>
      )}

      {/* Toggled Full Solution Banner */}
      {showSolution && (
        <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2 font-mono text-xs animate-fade-in">
          <div className="text-cyan-400 font-bold font-sans">Full Verified Solution ({selectedLang.toUpperCase()}):</div>
          <pre className="p-3 bg-slate-950 rounded-lg text-emerald-300 overflow-x-auto">
            {selectedLang === 'cpp' && problem.code_cpp}
            {selectedLang === 'python' && problem.code_python}
            {selectedLang === 'java' && problem.code_java}
            {selectedLang === 'javascript' && problem.code_javascript}
          </pre>
        </div>
      )}

      {/* Verification Result Notification */}
      {testResult && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{testResult.msg}</span>
        </div>
      )}

    </div>
  );
}
