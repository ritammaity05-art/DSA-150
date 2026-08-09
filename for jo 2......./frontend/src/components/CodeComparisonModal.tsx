"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Layers, Code, Sparkles, HelpCircle } from 'lucide-react';

interface CodeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function CodeComparisonModal({ isOpen, onClose, title }: CodeComparisonModalProps) {
  const { isBengali } = useLanguage();

  if (!isOpen) return null;

  const syntaxComparisonData = [
    {
      concept: isBengali ? "অ্যারে/লিস্ট তৈরি (Array Declaration)" : "Array / List Declaration",
      cpp: "vector<int> nums;",
      python: "nums = []",
      java: "int[] nums = new int[N];",
      javascript: "const nums = [];",
      meaning: isBengali
        ? "চারটি বাক্যই পূর্ণসংখ্যার (integers) একটি তালিকা তৈরি করে যাতে ডেটা রাখা যায়।"
        : "All four lines create an ordered list that stores integer values."
    },
    {
      concept: isBengali ? "হ্যাশম্যাপ/ডিকশনারি তৈরি (HashMap Creation)" : "HashMap / Dictionary Creation",
      cpp: "unordered_map<int, int> mp;",
      python: "mp = {}",
      java: "HashMap<Integer, Integer> mp = new HashMap<>();",
      javascript: "const mp = new Map();",
      meaning: isBengali
        ? "চারটি লাইনই একটি চাবি-মান (Key-Value) ডায়রি বানাচ্ছে যাতে দ্রুত O(1) তথ্য খোঁজা যায়।"
        : "All four lines create a smart key-value structure for instant O(1) lookups."
    },
    {
      concept: isBengali ? "লুপ চালিয়ে প্রতিটা আইটেম দেখা (Loop Traversal)" : "Loop Traversal",
      cpp: "for (int i = 0; i < n; i++)",
      python: "for i in range(n):",
      java: "for (int i = 0; i < n; i++)",
      javascript: "for (let i = 0; i < n; i++)",
      meaning: isBengali
        ? "চারটি লুপই প্রথম উপাদান থেকে শেষ উপাদান পর্যন্ত ১টি ১টি করে সবকটি ঘুরে দেখে।"
        : "All four loops traverse sequentially from index 0 up to n-1."
    },
    {
      concept: isBengali ? "শর্ত পরীক্ষা করা (Conditional If)" : "Conditional If Check",
      cpp: "if (mp.count(target - num))",
      python: "if (target - num) in mp:",
      java: "if (mp.containsKey(target - num))",
      javascript: "if (mp.has(target - num))",
      meaning: isBengali
        ? "চারটি শর্তই চেক করে যে প্রয়োজনীয় বাকি সংখ্যাটি ডায়রিতে আগে সেভ করা আছে কিনা।"
        : "All four conditions verify whether the complement value exists in the map."
    },
    {
      concept: isBengali ? "ফলাফল রিটার্ন করা (Function Return)" : "Function Return Statement",
      cpp: "return {mp[target - num], i};",
      python: "return [mp[target - num], i]",
      java: "return new int[]{mp.get(target - num), i};",
      javascript: "return [mp.get(target - num), i];",
      meaning: isBengali
        ? "চারটি লাইনই দুটি ইনডেক্স জোড়া বানিয়ে চূড়ান্ত উত্তর রিটার্ন করে।"
        : "All four lines construct a two-element index array and return the result."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 font-bold">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              🔍 {isBengali ? "কোড তুলনা মোড (Compare 4 Languages Side-by-Side)" : "Compare Languages Side-by-Side"}
            </h3>
            <p className="text-xs text-cyan-300 font-mono">
              {title} • C++ (Default), Python, Java, JavaScript Equivalent Lines
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-4">
          <div className="text-xs text-gray-400 bg-slate-950/80 p-3 rounded-xl border border-white/5 flex items-center gap-2 font-mono">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {isBengali
                ? "একই অ্যালগরিদম ৪টি ল্যাঙ্গুয়েজে কীভাবে লেখা হয় পাশাপাশি দেখুন"
                : "Notice: The algorithm logic is 100% identical, only syntax changes across languages."}
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-gray-300 border-b border-white/10">
                  <th className="p-3.5 font-bold text-amber-400">Concept</th>
                  <th className="p-3.5 font-bold text-cyan-300">C++ (Default)</th>
                  <th className="p-3.5 font-bold text-amber-300">Python</th>
                  <th className="p-3.5 font-bold text-rose-300">Java</th>
                  <th className="p-3.5 font-bold text-emerald-300">JavaScript</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-900/60">
                {syntaxComparisonData.map((row, idx) => (
                  <React.Fragment key={idx}>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-bold text-white font-sans">{row.concept}</td>
                      <td className="p-3.5 text-cyan-200 bg-cyan-950/20">{row.cpp}</td>
                      <td className="p-3.5 text-amber-200 bg-amber-950/20">{row.python}</td>
                      <td className="p-3.5 text-rose-200 bg-rose-950/20">{row.java}</td>
                      <td className="p-3.5 text-emerald-200 bg-emerald-950/20">{row.javascript}</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="p-3 bg-slate-950/90 text-gray-300 font-sans text-[11px] border-b border-white/10">
                        <span className="text-amber-400 font-bold">🧠 {isBengali ? "আসলে কী ঘটছে? " : "What is happening? "}</span>
                        {row.meaning}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Close */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg transition-all"
        >
          {isBengali ? "বুঝেছি, তুলনা বন্ধ করুন" : "Close Comparison"}
        </button>

      </div>
    </div>
  );
}
