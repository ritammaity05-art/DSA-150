"use client";

import React, { useState, useEffect } from 'react';
import { DryRunStep } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

interface VisualDryRunProps {
  steps: DryRunStep[];
  title?: string;
}

export default function VisualDryRun({ steps, title = "Visual Dry Run Player" }: VisualDryRunProps) {
  const { isBengali } = useLanguage();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2000); // ms per step

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, speed]);

  if (!steps || steps.length === 0) {
    return (
      <div className="glass-panel p-6 rounded-2xl text-center text-gray-400 text-sm">
        {isBengali ? "ড্রাই রান তথ্য প্রসেসিং হচ্ছে..." : "Visual dry run data loading..."}
      </div>
    );
  }

  const stepData = steps[currentStepIdx] || steps[0];
  const state = stepData.state || {};

  return (
    <div className="glass-panel p-6 rounded-2xl border border-blue-500/20 bg-slate-950/80 shadow-2xl relative overflow-hidden">
      
      {/* Top Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>{isBengali ? "ভিজ্যুয়াল ড্রাই রান সিমুলেটর" : title}</span>
              <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-blue-500/20 text-blue-300 rounded-md border border-blue-500/30">
                Step {currentStepIdx + 1}/{steps.length}
              </span>
            </h4>
            <p className="text-xs text-gray-400">
              {isBengali ? "অ্যালগোরিদমের প্রতিটি ধাপ ভিজ্যুয়ালি দেখুন" : "Watch the execution step by step in real time"}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => {
              setCurrentStepIdx(0);
              setIsPlaying(false);
            }}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-gray-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIdx === 0}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-gray-300 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-40"
            title="Previous Step"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? (isBengali ? "পজ" : "Pause") : (isBengali ? "প্লে করুন" : "Play")}</span>
          </button>

          <button
            onClick={() => setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStepIdx === steps.length - 1}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-gray-300 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-40"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Step Description Banner */}
      <div className="my-5 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-100 flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
          {currentStepIdx + 1}
        </div>
        <div>
          <h5 className="font-bold text-blue-300">{stepData.title}</h5>
          <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{stepData.desc}</p>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="space-y-6 bg-slate-900/90 p-6 rounded-xl border border-white/10">
        
        {/* Array Visualization */}
        {state.nums && Array.isArray(state.nums) && (
          <div>
            <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
              {isBengali ? "ইনপুট অ্যারে (Array State)" : "Input Array State"}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {state.nums.map((num: number, idx: number) => {
                const isCurrent = state.current_idx === idx;
                const isFound = state.result && Array.isArray(state.result) && state.result.includes(idx);

                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-14 h-14 rounded-xl border flex items-center justify-center font-mono font-bold text-lg transition-all duration-300 ${
                        isFound
                          ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20 scale-110'
                          : isCurrent
                          ? 'bg-blue-500/30 border-blue-400 text-blue-300 shadow-lg shadow-blue-500/20 scale-105 ring-2 ring-blue-400/50'
                          : 'bg-slate-950 border-white/10 text-gray-300'
                      }`}
                    >
                      {num}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-gray-500">
                      idx {idx}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Variable Tracker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          
          {state.target !== undefined && (
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10">
              <div className="text-[11px] text-gray-400 font-semibold">{isBengali ? "টার্গেট মান (Target)" : "Target Value"}</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">{state.target}</div>
            </div>
          )}

          {state.needed !== undefined && (
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10">
              <div className="text-[11px] text-gray-400 font-semibold">{isBengali ? "প্রয়োজনীয় সঙ্গী (Partner Needed)" : "Partner Needed"}</div>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">{state.needed}</div>
            </div>
          )}

          {/* HashMap Display */}
          {state.hashmap !== undefined && (
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 sm:col-span-2 lg:col-span-1">
              <div className="text-[11px] text-gray-400 font-semibold mb-1">{isBengali ? "মেমোরি টেবিল (HashMap State)" : "HashMap Memory State"}</div>
              {Object.keys(state.hashmap).length === 0 ? (
                <span className="text-xs text-gray-500 italic">Empty {}</span>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(state.hashmap).map(([k, v]) => (
                    <span key={k} className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono text-xs">
                      {k} ➔ Index {String(v)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Stack Display */}
          {state.stack !== undefined && (
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 sm:col-span-2">
              <div className="text-[11px] text-gray-400 font-semibold mb-2">{isBengali ? "স্ট্যাক অবস্থা (Stack Memory)" : "Stack Structure"}</div>
              <div className="flex items-center gap-2">
                {state.stack.length === 0 ? (
                  <span className="text-xs text-gray-500 italic">Empty Stack []</span>
                ) : (
                  state.stack.map((item: any, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-sm font-bold">
                      {String(item)}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Progress Slider Bar */}
      <div className="mt-5">
        <input
          type="range"
          min={0}
          max={steps.length - 1}
          value={currentStepIdx}
          onChange={(e) => {
            setCurrentStepIdx(parseInt(e.target.value));
            setIsPlaying(false);
          }}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

    </div>
  );
}
