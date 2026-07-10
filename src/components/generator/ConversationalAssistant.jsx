import React from 'react';
import { Sparkles, Info, Check, Plus, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ConversationalAssistant({
  quality = 'Needs Improvement',
  strengthFeedback = [],
  suggestions = [],
  onApplySuggestion,
  isDemoMode = false,
  isEnhancing = false,
  isDark = true
}) {
  // Convert quality to visual progress bar and label details
  const getQualityData = () => {
    switch (quality) {
      case 'Excellent':
        return {
          bar: '██████████',
          empty: '',
          color: 'text-emerald-500',
          label: 'Excellent'
        };
      case 'Good':
        return {
          bar: '████████░░',
          empty: '',
          color: 'text-amber-500',
          label: 'Good'
        };
      case 'Needs More Details':
        return {
          bar: '█████░░░░░',
          empty: '',
          color: 'text-orange-500',
          label: 'Needs More Details'
        };
      case 'Needs Improvement':
      default:
        return {
          bar: '███░░░░░░░',
          empty: '',
          color: 'text-rose-500',
          label: 'Needs Improvement'
        };
    }
  };

  const qualityData = getQualityData();

  // Apply all suggestions in one batch
  const handleApplyAll = () => {
    if (suggestions.length === 0) return;
    const combinedFixes = suggestions.map(s => s.fix.replace(/^[,\s]+|[,\s]+$/g, '')).join(', ');
    onApplySuggestion(combinedFixes);
    toast.success('Applied all recommendations!');
  };

  // Human-readable labels for recommendations
  const getCleanRecommendations = () => {
    if (strengthFeedback.length === 0) {
      return ["No issues detected. Your prompt contains strong descriptive parameters."];
    }
    return strengthFeedback.map(f => {
      if (f.toLowerCase().includes('lighting')) return 'Lighting details';
      if (f.toLowerCase().includes('camera') || f.toLowerCase().includes('lens')) return 'Camera settings';
      if (f.toLowerCase().includes('background')) return 'Background environment';
      if (f.toLowerCase().includes('style')) return 'Artistic style guidelines';
      return f.replace(/\.$/, '');
    });
  };

  const recommendationsList = getCleanRecommendations();

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Demo Mode Notice */}
      {isDemoMode && (
        <div className="rounded-lg border border-indigo-500/10 bg-indigo-500/5 p-3 text-indigo-400 dark:border-indigo-500/10 dark:bg-indigo-500/5 dark:text-indigo-400 light:border-indigo-200 light:bg-indigo-50 light:text-indigo-700 flex items-start gap-2 leading-relaxed">
          <Info size={14} className="mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold font-outfit">Demo Mode: </span>
            Prompt logic runs locally. Paste a Gemini API Key (top-right) to unlock advanced AI-powered co-creation.
          </div>
        </div>
      )}

      {/* Visual strength indicator & recommendations */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 py-3 px-4 rounded-xl border border-zinc-800 bg-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900/10 light:border-zinc-200 light:bg-zinc-50 shadow-sm leading-relaxed">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 light:text-zinc-400 uppercase tracking-wider">
            Prompt Quality
          </div>
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className={qualityData.color}>{qualityData.bar}</span>
            <span className="text-xs font-semibold text-zinc-300 dark:text-zinc-300 light:text-zinc-700">
              {qualityData.label}
            </span>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-1 sm:max-w-xs">
            <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 light:text-zinc-400 uppercase tracking-wider">
              Recommendations
            </div>
            <div className="text-[11px] text-zinc-400 dark:text-zinc-400 light:text-zinc-650 leading-relaxed">
              <span className="font-semibold text-zinc-500 dark:text-zinc-500 light:text-zinc-400">Missing: </span>
              {recommendationsList.join(', ')}
            </div>
          </div>
        )}
      </div>

      {/* Assistant conversational bubble */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4.5 space-y-3.5 dark:border-zinc-800 dark:bg-zinc-900/30 light:border-zinc-200 light:bg-white shadow-sm leading-relaxed">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-zinc-300 dark:text-zinc-200 light:text-zinc-800 font-bold font-outfit">
            <span>🤖</span>
            <span>AI Assistant</span>
          </div>

          {suggestions.length > 0 && (
            <button
              onClick={handleApplyAll}
              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 dark:text-indigo-400 dark:hover:text-indigo-300 light:text-indigo-650 light:hover:text-indigo-800 transition-colors"
            >
              Apply All
            </button>
          )}
        </div>

        <p className="text-zinc-300 dark:text-zinc-300 light:text-zinc-600 leading-relaxed text-xs">
          {quality === 'Excellent' 
            ? "Nice job! Your prompt has clear subject parameters and rendering styles. It is optimized to generate high fidelity graphics."
            : "Nice start. I recommend adding these tokens to boost the structure:"}
        </p>

        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {suggestions.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onApplySuggestion(chip.fix);
                  toast.success(`Added "${chip.label}"!`);
                }}
                className="group flex items-center gap-1 px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-[10px] text-zinc-300 transition-all dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800 dark:text-zinc-300 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-600 light:hover:bg-zinc-100"
              >
                <span>{chip.label}</span>
                <Plus size={10} className="text-indigo-400" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
