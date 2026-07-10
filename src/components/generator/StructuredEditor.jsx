import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ChevronDown, ChevronUp, Sparkles, Check, CheckCheck } from 'lucide-react';
import { REWRITE_STYLES } from '../../services/presets';
import toast from 'react-hot-toast';

export default function StructuredEditor({
  structuredPrompt = {},
  onChangeStructured,
  mergedPrompt = '',
  onChangeMerged,
  onRewriteStyle,
  targetModel = 'gemini',
  isRewriting = false,
  isDark = true
}) {
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false);
  const [copiedType, setCopiedType] = useState(null);
  const [isCopyDropdownOpen, setIsCopyDropdownOpen] = useState(false);

  const sections = [
    { key: 'Subject', placeholder: 'Core object or character details...' },
    { key: 'Style', placeholder: 'Artistic medium, e.g. Anime, Photorealistic...' },
    { key: 'Lighting', placeholder: 'Lighting setup, e.g. Cinematic golden hour...' },
    { key: 'Composition', placeholder: 'Framing, e.g. Rule of thirds, centered...' },
    { key: 'Camera', placeholder: 'Camera setting, e.g. 85mm lens, close-up...' },
    { key: 'Background', placeholder: 'Setting environment background details...' },
    { key: 'Mood', placeholder: 'Tone, e.g. Playful, dark, luxury...' },
    { key: 'Rendering', placeholder: 'Engine details, e.g. Octane Render, 8k...' }
  ];

  // Helper to format copy text based on platform specifications
  const handleCopy = (type) => {
    let textToCopy = mergedPrompt;

    if (type === 'gemini') {
      textToCopy = `Please generate an image showing: ${mergedPrompt.replace(/--ar\s+\d+:\d+|--v\s+[\d.]+/g, '').trim()}`;
    } else if (type === 'midjourney') {
      let cleanPrompt = mergedPrompt.replace(/--ar\s+\d+:\d+|--v\s+[\d.]+/g, '').replace(/,\s*,/g, ',').trim();
      let aspect = '--ar 16:9';
      if (mergedPrompt.includes('--ar 1:1')) aspect = '--ar 1:1';
      else if (mergedPrompt.includes('--ar 4:5')) aspect = '--ar 4:5';
      else if (mergedPrompt.includes('--ar 3:4')) aspect = '--ar 3:4';
      textToCopy = `/imagine prompt: ${cleanPrompt} ${aspect} --v 6.0`;
    } else if (type === 'dalle') {
      textToCopy = mergedPrompt
        .replace(/octane render|unreal engine|raytracing|8k|photorealistic|hyperrealistic/gi, '')
        .replace(/--ar\s+\d+:\d+|--v\s+[\d.]+/g, '')
        .trim();
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedType(type);
    setIsCopyDropdownOpen(false);
    toast.success(`Copied for ${type === 'default' ? 'General' : type.toUpperCase()}!`, {
      style: {
        background: isDark ? '#18181b' : '#ffffff',
        color: isDark ? '#f4f4f5' : '#18181b',
        border: '1px solid ' + (isDark ? '#27272a' : '#e4e4e7'),
        fontFamily: 'Inter, sans-serif',
      }
    });

    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      
      {/* 1. HERO MERGED PROMPT WRAPPER */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 light:text-zinc-400 uppercase tracking-wider">
            Enhanced Merged Prompt (Hero Editor)
          </label>

          {/* Unified Copy Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCopyDropdownOpen(!isCopyDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-300 hover:text-white transition-all dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-650"
            >
              <span>Copy</span>
              <ChevronDown size={12} />
            </button>

            {/* Dropdown Options */}
            <AnimatePresence>
              {isCopyDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsCopyDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="absolute right-0 mt-1 w-40 z-20 rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl overflow-hidden py-1 dark:border-zinc-800 dark:bg-zinc-950 light:bg-white light:border-zinc-200"
                  >
                    <button
                      onClick={() => handleCopy('default')}
                      className="w-full text-left px-3 py-2 text-[10.5px] text-zinc-300 hover:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 light:text-zinc-650 light:hover:bg-zinc-50 transition-colors flex items-center justify-between"
                    >
                      <span>Standard Copy</span>
                      {copiedType === 'default' && <CheckCheck size={12} className="text-emerald-500" />}
                    </button>
                    <button
                      onClick={() => handleCopy('gemini')}
                      className="w-full text-left px-3 py-2 text-[10.5px] text-zinc-300 hover:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 light:text-zinc-650 light:hover:bg-zinc-50 transition-colors flex items-center justify-between"
                    >
                      <span>Copy for Gemini</span>
                      {copiedType === 'gemini' && <CheckCheck size={12} className="text-emerald-500" />}
                    </button>
                    <button
                      onClick={() => handleCopy('midjourney')}
                      className="w-full text-left px-3 py-2 text-[10.5px] text-zinc-300 hover:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 light:text-zinc-650 light:hover:bg-zinc-50 transition-colors flex items-center justify-between"
                    >
                      <span>Copy for Midjourney</span>
                      {copiedType === 'midjourney' && <CheckCheck size={12} className="text-emerald-500" />}
                    </button>
                    <button
                      onClick={() => handleCopy('dalle')}
                      className="w-full text-left px-3 py-2 text-[10.5px] text-zinc-300 hover:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 light:text-zinc-650 light:hover:bg-zinc-50 transition-colors flex items-center justify-between"
                    >
                      <span>Copy for DALL-E</span>
                      {copiedType === 'dalle' && <CheckCheck size={12} className="text-emerald-500" />}
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Big Hero Textarea */}
        <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden dark:border-zinc-800 dark:bg-zinc-900/20 light:border-zinc-200 light:bg-white shadow-sm">
          <textarea
            value={mergedPrompt}
            onChange={(e) => onChangeMerged(e.target.value)}
            className="w-full min-h-[110px] bg-transparent p-4 pr-12 text-xs text-zinc-200 leading-relaxed font-mono outline-none resize-none dark:text-zinc-300 light:text-zinc-700"
          />
        </div>
      </div>

      {/* 2. REWRITE STYLESPreset Row */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar -mx-1 px-1 border-b border-zinc-900/60 dark:border-zinc-800 light:border-zinc-100 pb-2">
        <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 light:text-zinc-400 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
          <Sparkles size={11} className={isRewriting ? 'animate-spin' : ''} />
          Rewrite:
        </span>
        {REWRITE_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onRewriteStyle(style.label)}
            disabled={isRewriting || !mergedPrompt}
            className="flex-shrink-0 px-2.5 py-0.5 rounded-full border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-[9.5px] text-zinc-400 hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 light:border-zinc-200 light:bg-white light:text-zinc-500 light:hover:bg-zinc-50 shadow-sm"
          >
            {style.label}
          </button>
        ))}
      </div>

      {/* 3. COLLAPSIBLE PROMPT BREAKDOWN PANEL */}
      <div className="space-y-2">
        <button
          onClick={() => setIsBreakdownExpanded(!isBreakdownExpanded)}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg border border-zinc-800 bg-zinc-900/10 hover:bg-zinc-900/30 text-[11px] font-bold text-zinc-400 hover:text-zinc-200 transition-all dark:border-zinc-800 dark:bg-zinc-900/10 dark:hover:bg-zinc-900/30 dark:text-zinc-400 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-650 light:hover:bg-zinc-100"
        >
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            Prompt Breakdown
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-zinc-400 font-mono">
              {isBreakdownExpanded ? 'Hide' : 'Show breakdown slots'}
            </span>
            {isBreakdownExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </button>

        <AnimatePresence>
          {isBreakdownExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-2 pt-1">
                {sections.map(({ key, placeholder }) => {
                  const val = structuredPrompt[key] || '';
                  return (
                    <div
                      key={key}
                      className="rounded-lg border border-zinc-800 bg-zinc-900/10 p-2.5 space-y-1 focus-within:border-indigo-500/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900/10 light:border-zinc-200 light:bg-white shadow-sm"
                    >
                      <div className="text-[9px] font-bold text-zinc-500 dark:text-zinc-500 light:text-zinc-400 uppercase tracking-wider">
                        {key}
                      </div>
                      <textarea
                        value={val}
                        placeholder={placeholder}
                        onChange={(e) => onChangeStructured(key, e.target.value)}
                        className="w-full bg-transparent text-[11px] text-zinc-200 placeholder-zinc-700 outline-none resize-none h-14 leading-relaxed font-sans dark:text-zinc-300 dark:placeholder-zinc-650 light:text-zinc-700 light:placeholder-zinc-400"
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
