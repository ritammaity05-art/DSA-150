"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Sparkles, Code2, ChevronDown, ChevronUp } from 'lucide-react';

interface LanguageLearningModeProps {
  topicName: string;
}

type SelectedLanguage = 'cpp' | 'python' | 'java' | 'javascript';

export default function LanguageLearningMode({ topicName }: LanguageLearningModeProps) {
  const { isBengali } = useLanguage();
  const [activeLang, setActiveLang] = useState<SelectedLanguage>('cpp');
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);

  const conceptsMap: Record<SelectedLanguage, Array<{ title: string; desc: string; example: string }>> = {
    cpp: [
      {
        title: "vector<int>",
        desc: isBengali ? "একটি ডাইনামিক অ্যারে যা পূর্ণসংখ্যা জমানোর আলমারি।" : "A dynamic resizable array storing integer elements.",
        example: "vector<int> nums = {1, 2, 3};"
      },
      {
        title: "unordered_map<int, int>",
        desc: isBengali ? "একটি অতি দ্রুত O(1) কী-ভ্যালু ডায়রি।" : "A fast O(1) average lookup key-value hash table.",
        example: "unordered_map<int, int> mp; mp[key] = val;"
      },
      {
        title: "for loop",
        desc: isBengali ? "সবকটি উপাদান ১ম থেকে শেষ পর্যন্ত ঘোরার নির্দেশ।" : "Looping construct to iterate over array indices.",
        example: "for (int i = 0; i < n; i++) {}"
      }
    ],
    python: [
      {
        title: "List []",
        desc: isBengali ? "যেকোনো ধরণের উপাদান জমানোর সহজ ফ্লেক্সিবল তালিকা।" : "A flexible ordered sequence of elements.",
        example: "nums = [1, 2, 3]"
      },
      {
        title: "Dictionary {}",
        desc: isBengali ? "কী-ভ্যালু ডায়রি যা চাবি বললেই মান বের করে।" : "Hash map dictionary storing key:value pairs.",
        example: "freq = {'apple': 3}"
      },
      {
        title: "for in range()",
        desc: isBengali ? "নির্দিষ্ট ইনডেক্স সংখ্যা পর্যন্ত ঘুরার লুপ।" : "Loop traversing a sequence of numbers.",
        example: "for i in range(len(nums)):"
      }
    ],
    java: [
      {
        title: "int[] Array",
        desc: isBengali ? "স্থির আকারের ইনটিজার মেমোরি ব্লক।" : "Fixed size array container for primitive integers.",
        example: "int[] nums = new int[5];"
      },
      {
        title: "HashMap<Integer, Integer>",
        desc: isBengali ? "কী এবং ভ্যালুর জন্য জাভা হ্যাশ টেবিল।" : "Java standard key-value hash map data structure.",
        example: "HashMap<Integer, Integer> map = new HashMap<>();"
      }
    ],
    javascript: [
      {
        title: "Array []",
        desc: isBengali ? "JavaScript এর ডাইনামিক রিমাইন্ডার লিস্ট।" : "Built-in dynamic resizable array structure.",
        example: "const arr = [1, 2, 3];"
      },
      {
        title: "Map()",
        desc: isBengali ? "JS এর কী-ভ্যালু চাবি ডায়রি।" : "ES6 Key-Value Map data structure.",
        example: "const mp = new Map();"
      }
    ]
  };

  const currentConcepts = conceptsMap[activeLang];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-slate-950/90 shadow-xl space-y-4 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-amber-300">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            🎯 {isBengali ? "এই প্রবলেমে ব্যবহৃত ল্যাঙ্গুয়েজ কনসেপ্ট" : "Language Concepts Used In This Problem"}
          </h4>
        </div>

        {/* Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10 font-mono text-xs">
          {(['cpp', 'python', 'java', 'javascript'] as SelectedLanguage[]).map((l) => (
            <button
              key={l}
              onClick={() => setActiveLang(l)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeLang === l
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Concepts Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
        {currentConcepts.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
            <div className="text-amber-300 font-bold font-mono text-sm">{item.title}</div>
            <p className="text-gray-300 font-sans text-xs leading-relaxed">{item.desc}</p>
            <div className="p-2 rounded-lg bg-slate-950 border border-white/5 text-cyan-300 text-[11px]">
              {item.example}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
