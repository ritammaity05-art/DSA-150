"use client";

import React from 'react';
import Link from 'next/link';
import { ProblemListItem } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { Star, CheckCircle, Clock, ArrowUpRight, Bookmark, Sparkles } from 'lucide-react';

interface ProblemCardProps {
  problem: ProblemListItem;
  isCompleted?: boolean;
  isFavorite?: boolean;
  isBookmarked?: boolean;
  onToggleFavorite?: (id: number) => void;
  onToggleBookmark?: (id: number) => void;
}

export default function ProblemCard({
  problem,
  isCompleted = false,
  isFavorite = false,
  isBookmarked = false,
  onToggleFavorite,
  onToggleBookmark
}: ProblemCardProps) {
  const { isBengali } = useLanguage();

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'hard':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-gray-500/15 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/10 flex flex-col justify-between group relative overflow-hidden">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-gray-500">
            #{problem.id_number}
          </span>

          <div className="flex items-center gap-2">
            {/* Difficulty Badge */}
            <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>

            {/* Favorite Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite?.(problem.id_number);
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
              title="Toggle Favorite"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={`/problem/${problem.slug}`} className="block group-hover:text-blue-400 transition-colors">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-between gap-2">
            <span>{problem.title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 flex-shrink-0" />
          </h3>
        </Link>

        {/* Summary snippet */}
        <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
          {problem.summary}
        </p>
      </div>

      {/* Footer metadata */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
        
        {/* Topic Tag */}
        <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-gray-300 font-medium border border-white/5">
          {problem.topic_name}
        </span>

        <div className="flex items-center gap-3">
          {/* Estimated Time */}
          <span className="flex items-center gap-1 text-gray-400">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            {problem.estimated_time}
          </span>

          {/* Status Icon */}
          {isCompleted && (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold" title="Completed">
              <CheckCircle className="w-4 h-4 fill-emerald-400/20" />
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
