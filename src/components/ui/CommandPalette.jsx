import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Layers } from 'lucide-react';

export default function CommandPalette({
  isOpen = false,
  onClose,
  items = [],
  onSelectItem,
  isDark = true
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter templates list based on search query
  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.model.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-10 pt-10 sm:pt-20 bg-black/60 backdrop-blur-sm">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-default"
          onClick={onClose}
        />

        {/* Console Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-lg w-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col shadow-2xl z-10 dark:bg-zinc-950 dark:border-zinc-800 light:bg-white light:border-zinc-200"
        >
          {/* Search Input bar */}
          <div className="relative border-b border-zinc-900 dark:border-zinc-900 light:border-zinc-100 flex items-center">
            <Search size={16} className="absolute left-4 text-zinc-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search prompt templates... (e.g. logo, perfume, DALL-E)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-12 py-3.5 bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none dark:text-zinc-200 light:text-zinc-800 light:placeholder-zinc-400 font-sans"
            />
            <button
              onClick={onClose}
              className="absolute right-4 p-1 rounded hover:bg-zinc-900 dark:hover:bg-zinc-900 light:hover:bg-zinc-100 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[300px] overflow-y-auto p-2 space-y-1 no-scrollbar min-h-[100px]">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-zinc-900 dark:hover:bg-zinc-900 light:hover:bg-zinc-100 flex items-start gap-3 transition-colors group"
                >
                  <div className="h-6 w-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 dark:bg-zinc-900 dark:border-zinc-800 light:bg-white light:border-zinc-200">
                    <Layers size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800 font-outfit">
                        {item.label}
                      </span>
                      <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 uppercase dark:bg-zinc-950 dark:border-zinc-800 light:bg-white light:border-zinc-200 light:text-zinc-400">
                        {item.model}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-zinc-500 dark:text-zinc-500 light:text-zinc-400 line-clamp-1 mt-0.5 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-zinc-500 dark:text-zinc-500 light:text-zinc-400">
                No templates match your query. Try a different search term.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
