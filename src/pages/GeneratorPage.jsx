import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import PageWrapper from '../components/layout/PageWrapper';
import { EXAMPLE_PROMPTS, PURPOSES, MODELS, TEMPLATES } from '../services/presets';
import { enhancePromptWithGemini, rewritePromptStyleWithGemini } from '../services/gemini';
import { getImageUrlVariations, getSingleImageUrl } from '../services/image';
import ConversationalAssistant from '../components/generator/ConversationalAssistant';
import PromptComparison from '../components/generator/PromptComparison';
import StructuredEditor from '../components/generator/StructuredEditor';
import ImageGallery from '../components/generator/ImageGallery';
import CommandPalette from '../components/ui/CommandPalette';
import useKeyPress from '../hooks/useKeyPress';
import { Sparkles, Trash2, ArrowRight, RefreshCw, Sliders, ChevronDown, ChevronUp, Check, Settings, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function GeneratorPage() {
  const { geminiApiKey, addToHistory, isDark, activePrefill, setActivePrefill } = useApp();

  // --- Form States (Primary Inputs) ---
  const [description, setDescription] = useState('');
  const [purpose, setPurpose] = useState('instagram');
  const [model, setModel] = useState('gemini');
  const [creativity, setCreativity] = useState('balanced');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [keywords, setKeywords] = useState('');

  // --- Accordion / Panel States ---
  const [showAdvancedSection, setShowAdvancedSection] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);
  const [isTemplatesPaletteOpen, setIsTemplatesPaletteOpen] = useState(false);
  const [isPromptCollapsedAfterGen, setIsPromptCollapsedAfterGen] = useState(false);

  // --- AI Co-Creation Pipeline States ---
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  
  // Prompt results
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [structuredPrompt, setStructuredPrompt] = useState({
    Subject: '', Style: '', Lighting: '', Composition: '', Camera: '', Background: '', Mood: '', Rendering: ''
  });
  const [quality, setQuality] = useState('Needs Improvement');
  const [strengthFeedback, setStrengthFeedback] = useState([
    "Lighting details are missing.",
    "Camera angle could improve realism.",
    "Background context would make the output stronger."
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [explanations, setExplanations] = useState([]);
  const [checklist, setChecklist] = useState([]);

  // Output images
  const [images, setImages] = useState([]);

  // --- Thinking Loader Timeline Step ---
  const [thinkingStep, setThinkingStep] = useState(0);

  // Prefill check on mount
  useEffect(() => {
    if (activePrefill) {
      setDescription(activePrefill.originalInput || '');
      setPurpose(activePrefill.purpose || 'instagram');
      setModel(activePrefill.model || 'gemini');
      setCreativity(activePrefill.creativity || 'balanced');
      setActivePrefill(null); 
    }
  }, [activePrefill, setActivePrefill]);

  // Thinking Loader Timeline Cycler
  useEffect(() => {
    if (!isPipelineRunning) return;

    setThinkingStep(0);
    const interval = setInterval(() => {
      setThinkingStep((prev) => {
        if (prev < 4) return prev + 1;
        return prev;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [isPipelineRunning]);

  // --- Hotkeys ---
  useKeyPress('Ctrl+Enter', () => {
    if (description.trim() && !isPipelineRunning) {
      handleCreatePipeline();
    }
  });

  useKeyPress('Escape', () => {
    handleClearAll();
  });

  // --- Handler Actions ---

  const handleClearAll = () => {
    setDescription('');
    setNegativePrompt('');
    setKeywords('');
    setEnhancedPrompt('');
    setStructuredPrompt({
      Subject: '', Style: '', Lighting: '', Composition: '', Camera: '', Background: '', Mood: '', Rendering: ''
    });
    setQuality('Needs Improvement');
    setStrengthFeedback([
      "Lighting details are missing.",
      "Camera angle could improve realism.",
      "Background context would make the output stronger."
    ]);
    setSuggestions([]);
    setExplanations([]);
    setChecklist([]);
    setImages([]);
    setIsPromptCollapsedAfterGen(false);
    toast.success('Workspace cleared.');
  };

  const handleLoadTemplate = (tpl) => {
    setDescription(tpl.description);
    setPurpose(tpl.purpose);
    setModel(tpl.model);
    setCreativity(tpl.creativity);
    setIsTemplatesPaletteOpen(false);
    toast.success(`Loaded template: ${tpl.label}`);
  };

  // ONE-CLICK "CREATE IMAGES" PIPELINE
  const handleCreatePipeline = async () => {
    if (!description.trim()) {
      toast.error('Please describe your image idea first.');
      return;
    }

    setIsPipelineRunning(true);
    setIsEnhancing(true);
    setIsGenerating(true);
    setImages([]); // Reset images
    setIsPromptCollapsedAfterGen(false);
    setThinkingStep(0);

    try {
      // 1. Start Gemini API call in background
      const dataPromise = enhancePromptWithGemini(
        description,
        { purpose, model, creativity, negativePrompt, keywords },
        geminiApiKey
      );

      // 2. Cycle through the first 4 steps slowly (800ms per step)
      for (let step = 0; step <= 3; step++) {
        setThinkingStep(step);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // 3. Await the prompt expansion data
      const data = await dataPromise;

      setEnhancedPrompt(data.enhancedPrompt);
      setStructuredPrompt(data.structuredPrompt || {
        Subject: description, Style: '', Lighting: '', Composition: '', Camera: '', Background: '', Mood: '', Rendering: ''
      });
      setQuality(data.quality || 'Good');
      setStrengthFeedback(data.strengthFeedback || []);
      setSuggestions(data.suggestions || []);
      setExplanations(data.explanations || []);
      setChecklist(data.checklist || []);

      // 4. Dispatch image generation & start preloading
      const list = getImageUrlVariations(data.enhancedPrompt, purpose);
      
      setThinkingStep(4); // Rendering Images
      
      // Wait for image #1 to be fully generated and cached by the browser
      await new Promise((resolve) => {
        const img = new Image();
        img.src = list[0].url;
        const timer = setTimeout(resolve, 9000); // 9-second safety watchdog
        img.onload = () => { clearTimeout(timer); resolve(); };
        img.onerror = () => { clearTimeout(timer); resolve(); };
      });

      setImages(list);

      // 5. Commit to local storage
      addToHistory({
        originalInput: description,
        enhancedPrompt: data.enhancedPrompt,
        purpose,
        model,
        creativity,
        images: list,
        structuredPrompt: data.structuredPrompt,
        explanations: data.explanations,
        checklist: data.checklist,
        quality: data.quality,
        strengthFeedback: data.strengthFeedback
      });

      // 6. Automatically collapse the prompt editor to highlight the new images
      setIsPromptCollapsedAfterGen(true);
      toast.success('Successfully rendered variations!');
    } catch (e) {
      console.error(e);
      toast.error('Generation pipeline failed. Try again.');
    } finally {
      setIsEnhancing(false);
      setIsGenerating(false);
      setIsPipelineRunning(false);
    }
  };

  const handleApplySuggestion = (fixText) => {
    if (!enhancedPrompt) return;
    
    const cleanPrompt = enhancedPrompt.trim();
    const updated = cleanPrompt.endsWith('.') || cleanPrompt.endsWith(',')
      ? `${cleanPrompt} ${fixText}`
      : `${cleanPrompt}, ${fixText}`;
      
    setEnhancedPrompt(updated);

    if (fixText.toLowerCase().includes('lighting') || fixText.toLowerCase().includes('hour') || fixText.toLowerCase().includes('shadow')) {
      setStructuredPrompt(prev => ({ ...prev, Lighting: (prev.Lighting ? prev.Lighting + ', ' : '') + fixText.replace(/^[,\s]+|[,\s]+$/g, '') }));
    } else if (fixText.toLowerCase().includes('angle') || fixText.toLowerCase().includes('depth') || fixText.toLowerCase().includes('shot')) {
      setStructuredPrompt(prev => ({ ...prev, Camera: (prev.Camera ? prev.Camera + ', ' : '') + fixText.replace(/^[,\s]+|[,\s]+$/g, '') }));
    } else {
      setStructuredPrompt(prev => ({ ...prev, Style: (prev.Style ? prev.Style + ', ' : '') + fixText.replace(/^[,\s]+|[,\s]+$/g, '') }));
    }

    setQuality('Excellent');
    setStrengthFeedback([]);
  };

  const handleRewriteStyle = async (styleLabel) => {
    if (!enhancedPrompt) return;

    setIsRewriting(true);
    try {
      const data = await rewritePromptStyleWithGemini(
        enhancedPrompt,
        styleLabel,
        model,
        geminiApiKey
      );
      setEnhancedPrompt(data.enhancedPrompt);
      setStructuredPrompt(prev => ({ ...prev, Style: styleLabel }));
      toast.success(`Rewritten as ${styleLabel}!`);
    } catch (e) {
      toast.error('Rewrite failed.');
    } finally {
      setIsRewriting(false);
    }
  };

  const handleStructuredFieldChange = (key, val) => {
    const updatedStructured = { ...structuredPrompt, [key]: val };
    setStructuredPrompt(updatedStructured);
    const parts = Object.values(updatedStructured).filter(Boolean);
    setEnhancedPrompt(parts.join(', '));
  };

  const handleRegenerateSingleImage = (idx) => {
    if (!enhancedPrompt) return;

    const { seed, url } = getSingleImageUrl(enhancedPrompt, purpose);
    setImages(prev => {
      const copy = [...prev];
      copy[idx] = { seed, url };
      return copy;
    });
    toast.success(`Regenerated variation #${idx + 1}!`);
  };

  // Popular Templates Inline Selection
  const POPULAR_IDS = ["perfume", "poster", "logo", "ad"];
  const popularTemplates = TEMPLATES.filter(t => POPULAR_IDS.includes(t.id));

  // Loading timeline data
  const TIMELINE_STEPS = [
    "Understanding Request",
    "Finding Missing Details",
    "Choosing Style",
    "Optimizing Prompt",
    "Rendering Images"
  ];

  return (
    <PageWrapper>
      {/* Page Title */}
      <div className="mb-6 space-y-1 font-sans">
        <h1 className="text-xl font-extrabold tracking-tight font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-900">
          Co-Creation Workspace
        </h1>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-500 light:text-zinc-400">
          State-of-the-art collaborative visual generator dashboard.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT SIDE (PRIMARY CONTROLS) ================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* A. Core Input Area */}
          <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-5 space-y-4 dark:border-zinc-800 dark:bg-zinc-950/20 light:border-zinc-200 light:bg-white shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                <label>Enter description idea</label>
                <span>{description.length} / 500</span>
              </div>
              <textarea
                placeholder="Describe the image you want in simple language... (e.g. A luxury coffee shop logo)"
                value={description}
                onChange={(e) => setDescription(e.target.value.substring(0, 500))}
                className="w-full min-h-[90px] bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 leading-relaxed outline-none focus:border-indigo-500/50 resize-none transition-colors dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-700 font-sans"
              />
            </div>

            {/* Clickable prompt suggestions grid */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-1.5 max-h-[85px] overflow-y-auto pr-1 no-scrollbar">
                {EXAMPLE_PROMPTS.slice(0, 4).map((promptText) => (
                  <button
                    key={promptText}
                    onClick={() => setDescription(promptText)}
                    className="px-2 py-1.5 rounded-lg border border-zinc-900 bg-zinc-900/40 text-[9.5px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 text-left line-clamp-1 transition-all dark:border-zinc-800 dark:bg-zinc-900/20 dark:hover:bg-zinc-800 dark:text-zinc-400 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-500 light:hover:bg-zinc-100 shadow-sm"
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-1 flex gap-2">
              <button
                onClick={handleClearAll}
                className="px-3.5 py-2.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-500 hover:text-zinc-200 text-xs font-semibold dark:border-zinc-800 dark:hover:bg-zinc-900 dark:text-zinc-400 light:border-zinc-200 light:hover:bg-zinc-100 light:text-zinc-500 transition-all flex items-center justify-center shadow-sm"
                title="Clear Inputs"
              >
                <Trash2 size={13} />
              </button>
              <button
                onClick={handleCreatePipeline}
                disabled={isPipelineRunning || !description.trim()}
                className="flex-1 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-650 text-xs font-bold text-white shadow-lg hover:shadow-indigo-500/10 hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles size={13} className={isPipelineRunning ? 'animate-spin' : ''} />
                {isPipelineRunning ? 'Creating...' : '✨ Create Images'}
              </button>
            </div>
          </div>

          {/* B. Popular Templates Library */}
          <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-5 space-y-3 dark:border-zinc-800 dark:bg-zinc-950/20 light:border-zinc-200 light:bg-white shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              <span>Popular Templates</span>
              <button
                onClick={() => setIsTemplatesPaletteOpen(true)}
                className="text-indigo-400 hover:underline normal-case text-[9.5px] font-semibold"
              >
                View All →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {popularTemplates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleLoadTemplate(tpl)}
                  className="px-3 py-2 rounded-lg border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-800 text-left transition-all hover:scale-102 hover:border-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/20 dark:hover:bg-zinc-800 dark:hover:border-zinc-800 light:border-zinc-200 light:bg-zinc-50 light:hover:bg-zinc-100 shadow-sm"
                >
                  <div className="text-[10.5px] font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800 font-outfit">
                    {tpl.label}
                  </div>
                  <div className="text-[8px] text-zinc-500 dark:text-zinc-500 light:text-zinc-400 line-clamp-1 mt-0.5">
                    {tpl.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE (AI ASSISTANT & RESULTS) ================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* AI Timeline Thinking Loader */}
          {isPipelineRunning && (
            <div className="rounded-xl border border-indigo-500/15 bg-indigo-500/5 p-5 space-y-4 shadow-md dark:border-indigo-500/15 dark:bg-indigo-500/5 light:border-indigo-200 light:bg-indigo-50/50">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider font-outfit">
                <RefreshCw size={13} className="animate-spin text-indigo-400" />
                Generating...
              </div>

              {/* Steps timeline list */}
              <div className="space-y-2">
                {TIMELINE_STEPS.map((step, idx) => {
                  const isDone = idx < thinkingStep;
                  const isActive = idx === thinkingStep;
                  return (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-400 dark:text-zinc-405 light:text-zinc-650">
                      {isDone ? (
                        <span className="text-emerald-500 font-semibold font-mono text-[11px]">✓</span>
                      ) : isActive ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />
                      ) : (
                        <span className="h-1 w-1 rounded-full bg-zinc-800" />
                      )}
                      <span className={`${isActive ? 'text-zinc-200 font-semibold dark:text-zinc-100 light:text-zinc-800' : ''}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Images Hero Outputs Canvas (Always visible if generated) */}
          <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-5 space-y-4 dark:border-zinc-800 dark:bg-zinc-950/20 light:border-zinc-200 light:bg-white shadow-sm">
            <ImageGallery
              images={images}
              onRegenerateSingle={handleRegenerateSingleImage}
              isGenerating={isGenerating}
              promptText={enhancedPrompt}
              isDark={isDark}
            />

            {/* Quick Actions after generation */}
            {images.length > 0 && !isPipelineRunning && (
              <div className="flex gap-2 justify-end pt-2 text-xs">
                <button
                  onClick={() => setShowPromptDetails(true)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/10 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
                >
                  Edit Prompt
                </button>
              </div>
            )}
          </div>

          {/* ================= COLLAPSIBLE POWER-USER TOOLS PANEL (ADVANCED) ================= */}
          {enhancedPrompt && !isPipelineRunning && (
            <div className="border-t border-zinc-900/60 dark:border-zinc-800 light:border-zinc-200 pt-6">
              <button
                onClick={() => setShowAdvancedSection(!showAdvancedSection)}
                className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:bg-zinc-900/30 text-xs font-bold text-zinc-400 hover:text-zinc-200 transition-all dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/30 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-650"
              >
                <span className="flex items-center gap-1.5 uppercase tracking-wider font-outfit">
                  <Sliders size={12} />
                  Advanced Prompt Tools
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-zinc-400 font-mono">
                    {showAdvancedSection ? 'Collapse Advanced' : 'Expand Advanced'}
                  </span>
                  {showAdvancedSection ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>

              <AnimatePresence>
                {(showAdvancedSection || showPromptDetails) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-6 pt-5 pb-2">
                      
                      {/* AI Settings Section (Model, Aspect, Negative) */}
                      <div className="rounded-xl border border-zinc-900 bg-zinc-950/20 p-4 space-y-4 dark:border-zinc-800 dark:bg-zinc-950/10 light:border-zinc-200 light:bg-white shadow-sm">
                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                          AI Pipeline Settings
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                              Target AI Model
                            </label>
                            <select
                              value={model}
                              onChange={(e) => setModel(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-700 focus:outline-none"
                            >
                              {MODELS.map(m => (
                                <option key={m.id} value={m.id}>{m.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                              Output Purpose
                            </label>
                            <select
                              value={purpose}
                              onChange={(e) => setPurpose(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-700 focus:outline-none"
                            >
                              {PURPOSES.map(p => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                              Negative Prompt
                            </label>
                            <input
                              type="text"
                              value={negativePrompt}
                              placeholder="e.g. blur, text"
                              onChange={(e) => setNegativePrompt(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-700 focus:outline-none font-sans"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                              Keywords
                            </label>
                            <input
                              type="text"
                              value={keywords}
                              placeholder="e.g. studio"
                              onChange={(e) => setKeywords(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-700 focus:outline-none font-sans"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Prompt Optimized Accordion */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider">
                          <Check size={14} />
                          Prompt Optimized (for {MODELS.find(m => m.id === model)?.label || 'Gemini'})
                        </div>
                        
                        <StructuredEditor
                          structuredPrompt={structuredPrompt}
                          onChangeStructured={handleStructuredFieldChange}
                          mergedPrompt={enhancedPrompt}
                          onChangeMerged={setEnhancedPrompt}
                          onRewriteStyle={handleRewriteStyle}
                          targetModel={model}
                          isRewriting={isRewriting}
                          isDark={isDark}
                        />
                      </div>

                      {/* Original vs Enhanced Comparison Accordion */}
                      <PromptComparison
                        originalPrompt={description}
                        enhancedPrompt={enhancedPrompt}
                        checklist={checklist}
                        isEnhancing={isEnhancing}
                      />

                      {/* Close detail editor button */}
                      {showPromptDetails && (
                        <button
                          onClick={() => {
                            setShowPromptDetails(false);
                            setShowAdvancedSection(false);
                          }}
                          className="w-full py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 transition-colors font-semibold"
                        >
                          Close Prompt Editor
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

        </div>

      </div>

      {/* SEARCHABLE COMMAND PALETTE FOR TEMPLATES */}
      <CommandPalette
        isOpen={isTemplatesPaletteOpen}
        onClose={() => setIsTemplatesPaletteOpen(false)}
        items={TEMPLATES}
        onSelectItem={handleLoadTemplate}
        isDark={isDark}
      />
    </PageWrapper>
  );
}
