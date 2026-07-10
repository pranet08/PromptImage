import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';

export default function PromptComparison({
  originalPrompt = '',
  enhancedPrompt = '',
  checklist = [],
  isEnhancing = false
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to map checklist items to educational reasons
  const getChangeReason = (item) => {
    const text = item.toLowerCase();
    if (text.includes('lighting')) {
      return { title: 'Added Cinematic Lighting', reason: 'Improves depth, dimension, and realism.' };
    }
    if (text.includes('camera') || text.includes('lens')) {
      return { title: 'Specified Camera Lens', reason: 'Establishes a professional focal length and depth of field.' };
    }
    if (text.includes('background') || text.includes('backdrop')) {
      return { title: 'Added Studio Background', reason: 'Produces premium composition and contrast.' };
    }
    if (text.includes('style') || text.includes('artistic')) {
      return { title: 'Applied Artistic Style', reason: 'Directs the diffusion generator toward a consistent medium.' };
    }
    if (text.includes('composition') || text.includes('framing')) {
      return { title: 'Adjusted Composition', reason: 'Ensures structured placement within safe zones.' };
    }
    return { title: item, reason: 'Optimizes output fidelity for generative visual engines.' };
  };

  // Highlights words added by the prompt enhancer
  const renderHighlightedPrompt = () => {
    if (!originalPrompt) return enhancedPrompt;
    
    // Create clean list of lowercase words from original to check against
    const cleanWord = (w) => w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    const originalSet = new Set(originalPrompt.split(/\s+/).map(cleanWord).filter(Boolean));
    const enhancedWords = enhancedPrompt.split(/\s+/);

    return (
      <span className="leading-relaxed">
        {enhancedWords.map((word, idx) => {
          const cw = cleanWord(word);
          // Highlight if word is longer than 2 chars and not in original prompt
          const isAdded = cw.length > 2 && !originalSet.has(cw);

          return (
            <span key={idx} className="inline-block mr-1">
              {isAdded ? (
                <span className="bg-indigo-500/15 text-indigo-400 font-semibold px-1 py-0.5 rounded transition-all dark:bg-indigo-500/10 dark:text-indigo-400 light:bg-indigo-50 light:text-indigo-700">
                  {word}
                </span>
              ) : (
                <span>{word}</span>
              )}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="space-y-3 font-sans text-xs">
      {/* Accordion Toggle Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 px-3 rounded-lg border border-zinc-800 bg-zinc-900/10 hover:bg-zinc-900/30 text-[11px] font-bold text-zinc-400 hover:text-zinc-200 transition-all dark:border-zinc-800 dark:bg-zinc-900/10 dark:hover:bg-zinc-900/30 dark:text-zinc-400 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-600 light:hover:bg-zinc-100"
      >
        <span className="flex items-center gap-1.5 uppercase tracking-wider">
          <Sparkles size={12} className="text-indigo-400" />
          View Prompt Improvements
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-zinc-400 font-mono">
            {isExpanded ? 'Collapse' : 'Expand'}
          </span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 pt-1">
              
              {/* Card A: Prompt Compare View */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 p-4 space-y-4 dark:border-zinc-800 dark:bg-zinc-900/10 light:border-zinc-200 light:bg-zinc-50 shadow-sm flex flex-col justify-between min-h-[190px]">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 light:text-zinc-400 uppercase tracking-wider">
                      Original Input
                    </h4>
                    <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-400 light:text-zinc-600 italic break-words">
                      "{originalPrompt}"
                    </p>
                  </div>
                  
                  <div className="border-t border-zinc-900 dark:border-zinc-800 light:border-zinc-200 pt-3">
                    <h4 className="text-[10px] font-bold text-indigo-400 dark:text-indigo-400 light:text-indigo-650 uppercase tracking-wider">
                      Enhanced Output (Highlighted Additions)
                    </h4>
                    <div className="mt-1.5 text-xs text-zinc-200 dark:text-zinc-200 light:text-zinc-700 leading-relaxed break-words font-medium">
                      {isEnhancing ? (
                        <span className="text-zinc-500 italic animate-pulse">Streaming enhancements...</span>
                      ) : (
                        renderHighlightedPrompt()
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card B: Why AI Changed This (Educational Log) */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 p-4 space-y-3.5 dark:border-zinc-800 dark:bg-zinc-900/10 light:border-zinc-200 light:bg-zinc-50 shadow-sm min-h-[190px]">
                <h4 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 light:text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle size={12} />
                  Why AI Changed This
                </h4>

                <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1 no-scrollbar">
                  {checklist.length > 0 ? (
                    checklist.map((item, idx) => {
                      const details = getChangeReason(item);
                      return (
                        <div key={idx} className="space-y-0.5 leading-relaxed">
                          <div className="text-[10.5px] font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800">
                            {details.title}
                          </div>
                          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-zinc-500">
                            <span className="font-semibold text-zinc-600 dark:text-zinc-650 light:text-zinc-400">Reason: </span>
                            {details.reason}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-zinc-600 dark:text-zinc-600 light:text-zinc-400 italic">No alterations processed.</p>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
