import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PageWrapper from '../components/layout/PageWrapper';
import HistoryCard from '../components/history/HistoryCard';
import EmptyState from '../components/history/EmptyState';
import { Search, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HistoryPage() {
  const { history, clearHistory } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [modelFilter, setModelFilter] = useState('all');

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to permanently delete all history records? This cannot be undone.')) {
      clearHistory();
      toast.success('History cleared successfully.');
    }
  };

  // Filter history list based on search and model select
  const filteredHistory = history.filter(item => {
    const matchesSearch = 
      item.originalInput.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.enhancedPrompt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesModel = modelFilter === 'all' || item.model === modelFilter;
    
    return matchesSearch && matchesModel;
  });

  return (
    <PageWrapper>
      <div className="space-y-6 pb-12 font-sans">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-900">
              Generation History
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 light:text-zinc-500">
              Manage and search your past AI creations, prompts, and variation outputs.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-3.5 py-2 rounded-lg border border-rose-500/10 hover:bg-rose-500/5 text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              title="Delete all history items"
            >
              <Trash2 size={13} />
              Clear All History
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="space-y-6">
            {/* Search and simple filter row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search history by original idea or prompt..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 dark:bg-zinc-900 dark:border-zinc-800 light:bg-white light:border-zinc-200 light:text-zinc-700"
                />
              </div>

              {/* Model Filter */}
              <select
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-350 light:bg-white light:border-zinc-200 light:text-zinc-600 focus:outline-none"
              >
                <option value="all">All Models</option>
                <option value="gemini">Gemini Image</option>
                <option value="midjourney">Midjourney v6</option>
                <option value="dalle">DALL-E 3</option>
                <option value="sd">Stable Diffusion 3</option>
                <option value="flux">FLUX.1 Schnell</option>
              </select>
            </div>

            {/* Results Grid */}
            {filteredHistory.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHistory.map((item) => (
                  <HistoryCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-zinc-500">
                No items match your search filters. Try typing a different keyword.
              </div>
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </PageWrapper>
  );
}
