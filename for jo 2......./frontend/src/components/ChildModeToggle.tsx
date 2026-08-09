"use client";

import React, { createContext, useContext, useState } from 'react';
import { Baby, Sparkles, HeartHandshake } from 'lucide-react';

interface ChildModeContextType {
  isChildMode: boolean;
  toggleChildMode: () => void;
}

const ChildModeContext = createContext<ChildModeContextType>({
  isChildMode: true,
  toggleChildMode: () => {},
});

export const ChildModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChildMode, setIsChildMode] = useState<boolean>(true);

  const toggleChildMode = () => {
    setIsChildMode((prev) => !prev);
  };

  return (
    <ChildModeContext.Provider value={{ isChildMode, toggleChildMode }}>
      {children}
    </ChildModeContext.Provider>
  );
};

export const useChildMode = () => useContext(ChildModeContext);

export function ChildModeBanner() {
  const { isChildMode, toggleChildMode } = useChildMode();

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-indigo-500/20 border border-amber-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold">
          <Baby className="w-6 h-6 animate-bounce" />
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
            <span>👶 5-Year-Old Child Explanation Mode (Zero Coding Jargon)</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
              Active
            </span>
          </h4>
          <p className="text-xs text-gray-200">
            No scary programming terms! Everything is explained using everyday toys, chocolates, and games.
          </p>
        </div>
      </div>

      <button
        onClick={toggleChildMode}
        className={`px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2 whitespace-nowrap ${
          isChildMode
            ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 scale-105'
            : 'bg-slate-900 text-gray-300 border border-white/10 hover:text-white'
        }`}
      >
        <HeartHandshake className="w-4 h-4" />
        <span>{isChildMode ? "👶 Child Mode ON (Easy Stories)" : "💻 Technical Mode"}</span>
      </button>
    </div>
  );
}
