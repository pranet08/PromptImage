import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, ArrowRight } from 'lucide-react';

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl p-12 text-center bg-zinc-950/20 min-h-[380px] w-full max-w-lg mx-auto dark:border-zinc-800 dark:bg-zinc-950/20 light:border-zinc-200 light:bg-zinc-50/50">
      <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-500 light:bg-white light:border-zinc-200 light:text-zinc-400 shadow-sm">
        <History size={20} />
      </div>
      <h3 className="text-sm font-bold text-zinc-350 dark:text-zinc-200 light:text-zinc-700 font-outfit mb-1">
        No history items found
      </h3>
      <p className="max-w-xs text-xs text-zinc-500 dark:text-zinc-550 light:text-zinc-450 leading-relaxed mb-6">
        Start creating professional AI prompts and generating image variations to build up your history pipeline.
      </p>
      <button
        onClick={() => navigate('/generator')}
        className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white shadow-md hover:shadow-indigo-500/10 transition-all flex items-center gap-1.5"
      >
        Generate Your First Prompt
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
