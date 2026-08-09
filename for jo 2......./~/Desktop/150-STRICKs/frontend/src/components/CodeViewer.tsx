"use client";

import React, { useState } from 'react';
import { ProblemDetail } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { Terminal, Copy, Check, Code, HelpCircle, Layers, ListOrdered, FileText } from 'lucide-react';

interface CodeViewerProps {
  problem: ProblemDetail;
}

type LangTab = 'python' | 'cpp' | 'java' | 'javascript';

export default function CodeViewer({ problem }: CodeViewerProps) {
  const { isBengali } = useLanguage();
  const [activeLang, setActiveLang] = useState<LangTab>('python');
  const [selectedLineIdx, setSelectedLineIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (activeLang) {
      case 'python':
        return problem.code_python || `# Python solution for ${problem.title}\ndef solve(nums):\n    return nums + nums`;
      case 'cpp':
        return problem.code_cpp || `// C++ solution for ${problem.title}\nclass Solution {\npublic:\n    vector<int> getConcatenation(vector<int>& nums) {\n        vector<int> ans = nums;\n        ans.insert(ans.end(), nums.begin(), nums.end());\n        return ans;\n    }\n};`;
      case 'java':
        return problem.code_java || `// Java solution for ${problem.title}\nclass Solution {\n    public int[] getConcatenation(int[] nums) {\n        int n = nums.length;\n        int[] ans = new int[2 * n];\n        for (int i = 0; i < n; i++) {\n            ans[i] = nums[i];\n            ans[i + n] = nums[i];\n        }\n        return ans;\n    }\n}`;
      case 'javascript':
        return problem.code_javascript || `// JavaScript solution for ${problem.title}\nvar getConcatenation = function(nums) {\n    return [...nums, ...nums];\n};`;
    }
  };

  const codeString = getCode();
  const lines = codeString.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple token highlighter for VS Code style syntax coloring
  const renderHighlightedLine = (lineStr: string) => {
    if (lineStr.trim().startsWith('#') || lineStr.trim().startsWith('//')) {
      return <span className="text-emerald-500 italic font-mono">{lineStr}</span>;
    }

    const keywords = [
      'def', 'return', 'if', 'else', 'in', 'for', 'while', 'import', 'from',
      'class', 'public', 'private', 'vector', 'unordered_map', 'void', 'int',
      'bool', 'boolean', 'const', 'let', 'var', 'function', 'Map', 'new', 'Stack',
      'HashMap', 'String', 'vector<int>', 'vector<string>'
    ];

    const tokens = lineStr.split(/(\s+|[(),:{}\[\];=<>])/);

    return tokens.map((token, i) => {
      if (keywords.includes(token)) {
        return <span key={i} className="text-sky-400 font-bold">{token}</span>;
      }
      if (/^".*"$/.test(token) || /^'.*'$/.test(token)) {
        return <span key={i} className="text-amber-300">{token}</span>;
      }
      if (/^\d+$/.test(token)) {
        return <span key={i} className="text-emerald-300 font-mono">{token}</span>;
      }
      return <span key={i}>{token}</span>;
    });
  };

  const selectedLineAnnotation = problem.line_by_line.find(
    (item) => selectedLineIdx !== null && item.line === selectedLineIdx + 1
  );

  return (
    <div className="space-y-6">
      
      {/* VS Code Editor Panel */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        
        {/* VS Code Title Bar & Language Tabs */}
        <div className="bg-slate-950/90 px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          
          {/* Mac OS Window Controls + Language Tabs */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Language Selector Buttons */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/5 text-xs font-mono">
              <button
                onClick={() => { setActiveLang('python'); setSelectedLineIdx(null); }}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  activeLang === 'python'
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🐍 Python
              </button>

              <button
                onClick={() => { setActiveLang('cpp'); setSelectedLineIdx(null); }}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  activeLang === 'cpp'
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ⚡ C++
              </button>

              <button
                onClick={() => { setActiveLang('java'); setSelectedLineIdx(null); }}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  activeLang === 'java'
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ☕ Java
              </button>

              <button
                onClick={() => { setActiveLang('javascript'); setSelectedLineIdx(null); }}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  activeLang === 'javascript'
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📜 JavaScript
              </button>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isBengali ? "কপি হয়েছে!" : "Copied!") : (isBengali ? "কোড কপি করুন" : "Copy Code")}</span>
          </button>

        </div>

        {/* Code Editor Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-slate-950/95 font-mono text-sm">
          
          {/* Code Content Area */}
          <div className="lg:col-span-8 p-4 overflow-x-auto border-b lg:border-b-0 lg:border-r border-white/10">
            <p className="text-[11px] text-gray-500 font-sans mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBengali ? "লাইনের ওপর ক্লিক বা হোভার করে সহজ ব্যাখ্যা দেখুন" : "Click or hover any line to view detailed line-by-line breakdown"}</span>
            </p>

            <pre className="text-gray-200 leading-relaxed font-mono">
              {lines.map((lineStr, idx) => {
                const lineNum = idx + 1;
                const isSelected = selectedLineIdx === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedLineIdx(idx)}
                    onMouseEnter={() => setSelectedLineIdx(idx)}
                    className={`code-line flex items-center cursor-pointer rounded-md ${
                      isSelected ? 'active bg-blue-500/20 text-white' : ''
                    }`}
                  >
                    <span className="w-8 text-right pr-4 text-xs text-gray-600 select-none font-mono">
                      {lineNum}
                    </span>
                    <span className="flex-1 whitespace-pre">
                      {renderHighlightedLine(lineStr)}
                    </span>
                  </div>
                );
              })}
            </pre>
          </div>

          {/* Line-by-Line Synchronized Explanation Inspector */}
          <div className="lg:col-span-4 p-5 bg-slate-900/60 font-sans flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Code className="w-4 h-4" />
                <span>{isBengali ? "লাইন বিশ্লেষণ (Line Inspector)" : "Line-by-Line Inspector"}</span>
              </div>

              {selectedLineIdx !== null ? (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                    Line {selectedLineIdx + 1}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto">
                    {lines[selectedLineIdx]}
                  </div>

                  <div className="mt-3">
                    <h6 className="text-xs font-bold text-white mb-1">
                      {isBengali ? "এই লাইনের কাজ ও ব্যাখ্যা:" : "Meaning & Purpose:"}
                    </h6>
                    <p className="text-xs text-gray-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-white/5">
                      {selectedLineAnnotation
                        ? selectedLineAnnotation.explanation
                        : (isBengali ? "এই লাইনটি কোডের প্রধান লজিক বাস্তবায়ন করছে।" : "This line executes a core step for the algorithm.")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center text-gray-500 space-y-3">
                  <Layers className="w-8 h-8 mx-auto text-gray-600 opacity-50" />
                  <p className="text-xs">
                    {isBengali ? "বাম দিকের যেকোনো কোড লাইনের উপর কার্সার রাখুন" : "Hover or click on any line of code to unlock line explanation"}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-gray-500 font-mono">
              150 STRICKs • Powered by Ritam
            </div>

          </div>

        </div>

      </div>

      {/* Full Line-by-Line Explanation Breakdown List Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-950/90 shadow-xl space-y-4 font-sans">
        
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-amber-400" />
            <h4 className="text-base font-bold text-white tracking-tight">
              {isBengali ? "সম্পূর্ণ সলিউশনের লাইন-বাই-লাইন ব্যাখ্যা তালিকা" : "Full Solution Line-by-Line Breakdown List"}
            </h4>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            {activeLang.toUpperCase()} Code Breakdown
          </span>
        </div>

        <div className="space-y-3">
          {lines.map((lineStr, idx) => {
            const annotation = problem.line_by_line.find((item) => item.line === idx + 1);

            return (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-2 font-mono text-xs hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 text-[11px]">
                    Line {idx + 1}
                  </span>
                  <span className="text-[11px] text-gray-500 font-sans">Step {idx + 1} Execution</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-white/5 text-gray-200 overflow-x-auto">
                  {renderHighlightedLine(lineStr)}
                </div>

                <div className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
                  <span className="text-cyan-400 font-semibold">{isBengali ? "ব্যাখ্যা: " : "Explanation: "}</span>
                  {annotation ? annotation.explanation : (isBengali ? "এই কোড লাইনটি অ্যালগোরিদমের শর্ত পূরণ করে রেজাল্ট তৈরি করে।" : "Executes core evaluation or declaration step.")}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
