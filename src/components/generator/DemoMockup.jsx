import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Eye, Download } from 'lucide-react';

// Import local offline demo assets
import coffeeImg from '../../assets/demo/coffee.png';
import perfumeImg from '../../assets/demo/perfume.png';
import gamingImg from '../../assets/demo/gaming.png';

const DEMO_STEPS = [
  {
    input: "Design a luxury perfume advertisement",
    aiAssistant: "Analyzing request... Adding volumetric studio lighting, photorealistic glass textures, and a dark basalt stone backdrop for composition contrast.",
    enhancedPrompt: "High-end product photography of a luxury perfume bottle resting on smooth wet basalt stones, water ripples, soft ambient studio lighting, dark dramatic background, hyper-detailed, 8K resolution.",
    checklist: ["✓ Added studio lighting", "✓ Selected realistic style", "✓ Added background context", "✓ Optimized for image model"],
    images: [perfumeImg, perfumeImg]
  },
  {
    input: "Create a futuristic gaming setup",
    aiAssistant: "Analyzing request... Appending cyberpunk aesthetics, cyan and magenta neon accents, close-up camera angle, and volumetric steam details.",
    enhancedPrompt: "Futuristic cyberpunk gaming setup, cozy dark room, dual monitors displaying code, glowing mechanical keyboard, cyan and purple neon LED lighting strips, volumetric fog, high-fidelity render, 8K.",
    checklist: ["✓ Added neon lighting", "✓ Added cyberpunk style", "✓ Added cozy atmosphere", "✓ Adjusted rendering quality"],
    images: [gamingImg, gamingImg]
  },
  {
    input: "Design a premium coffee logo",
    aiAssistant: "Analyzing request... Structuring for flat vector format, adding minimalist styling guidelines, solid light backdrop, and warm coffee-brown tones.",
    enhancedPrompt: "Minimalist geometric logo icon for an artisan organic coffee brand, flat vector illustration, modern emblem of a coffee bean and mountain peaks, warm sepia tones, clean white background.",
    checklist: ["✓ Selected flat vector style", "✓ Selected organic theme", "✓ Configured flat background", "✓ Removed photographic noise"],
    images: [coffeeImg, coffeeImg]
  }
];

export default function DemoMockup() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState(0); // 0: input, 1: assistant analyze, 2: enhanced typewriter, 3: images loaded
  const [typedInput, setTypedInput] = useState("");
  const [typedEnhanced, setTypedEnhanced] = useState("");
  const [thinkingMsg, setThinkingMsg] = useState("");

  const currentData = DEMO_STEPS[activeIdx];

  // Logic to simulate workflow typing and cycling
  useEffect(() => {
    let inputTimer, assistantTimer, enhancedTimer, cycleTimer;
    let t1, t2, t3, t4;

    if (phase === 0) {
      setTypedInput("");
      setTypedEnhanced("");
      let charIdx = 0;
      const textToType = currentData.input;

      inputTimer = setInterval(() => {
        if (charIdx <= textToType.length) {
          setTypedInput(textToType.substring(0, charIdx));
          charIdx++;
        } else {
          clearInterval(inputTimer);
          setTimeout(() => setPhase(1), 800);
        }
      }, 40);
    } else if (phase === 1) {
      setThinkingMsg("Understanding idea...");
      t1 = setTimeout(() => setThinkingMsg("Analyzing composition..."), 500);
      t2 = setTimeout(() => setThinkingMsg("Finding better lighting..."), 1000);
      t3 = setTimeout(() => setThinkingMsg("Optimizing prompt..."), 1500);
      t4 = setTimeout(() => setThinkingMsg("Rendering images..."), 2000);

      assistantTimer = setTimeout(() => {
        setPhase(2);
      }, 2500);
    } else if (phase === 2) {
      let wordIdx = 0;
      const words = currentData.enhancedPrompt.split(" ");
      setTypedEnhanced("");

      enhancedTimer = setInterval(() => {
        if (wordIdx < words.length) {
          setTypedEnhanced(prev => (prev ? prev + " " + words[wordIdx] : words[wordIdx]));
          wordIdx++;
        } else {
          clearInterval(enhancedTimer);
          setTimeout(() => setPhase(3), 1000);
        }
      }, 35);
    } else if (phase === 3) {
      cycleTimer = setTimeout(() => {
        setPhase(0);
        setActiveIdx(prev => (prev + 1) % DEMO_STEPS.length);
      }, 6000);
    }

    return () => {
      clearInterval(inputTimer);
      clearTimeout(assistantTimer);
      clearInterval(enhancedTimer);
      clearTimeout(cycleTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [phase, activeIdx]);

  const handleReplay = () => {
    setPhase(0);
    setTypedInput("");
    setTypedEnhanced("");
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/80 shadow-2xl overflow-hidden glass transition-colors dark:border-zinc-800 dark:bg-zinc-950/80 light:border-zinc-200 light:bg-white/90">
      {/* Mock Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 px-4 py-3 dark:border-zinc-905 light:border-zinc-150">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200" />
        </div>
        <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest font-outfit">
          Workflow Simulation
        </div>
        <div className="flex items-center gap-2">
          {phase === 3 && (
            <button
              onClick={handleReplay}
              className="px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-[9px] text-zinc-400 hover:text-zinc-200 transition-all font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={10} />
              Replay
            </button>
          )}
          <div className="h-5 w-12 rounded bg-zinc-900/50 dark:bg-zinc-900/50 light:bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-505 font-mono select-none">
            Demo
          </div>
        </div>
      </div>

      {/* Two Column Layout Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] divide-y lg:divide-y-0 lg:divide-x divide-zinc-900 dark:divide-zinc-900 light:divide-zinc-150">
        
        {/* Left Side: Input Form Mockup (col-span-5) */}
        <div className="lg:col-span-5 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-400 light:text-zinc-500">
                  Image Idea
                </label>
                <span className="text-[9px] text-zinc-600 font-mono">
                  {typedInput.length} chars
                </span>
              </div>
              <div className="w-full min-h-[90px] bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 font-sans outline-none leading-relaxed dark:bg-zinc-900/30 dark:border-zinc-800 dark:text-zinc-300 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-700">
                {typedInput}
                {phase === 0 && <span className="inline-block w-1.5 h-3.5 bg-indigo-500 ml-0.5 animate-pulse" />}
              </div>
            </div>

            {/* Simulated Selectors */}
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <label className="block text-[9px] font-semibold text-zinc-500 mb-1">
                  Purpose
                </label>
                <div className="w-full bg-zinc-900/40 border border-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/20 light:bg-zinc-50 light:border-zinc-200 rounded px-2 py-1 text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-xs">
                  Marketing
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-semibold text-zinc-500 mb-1">
                  Target AI Model
                </label>
                <div className="w-full bg-zinc-900/40 border border-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/20 light:bg-zinc-50 light:border-zinc-200 rounded px-2 py-1 text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-xs">
                  FLUX.1 Schnell
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-900 dark:border-zinc-900 light:border-zinc-150">
            <button
              className={`w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                phase > 0 
                  ? 'bg-indigo-650 text-white shadow-lg' 
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-505'
              }`}
            >
              <Sparkles size={13} />
              {phase === 0 ? 'Create Images' : phase === 1 ? 'AI Analyzing...' : 'Images Created'}
            </button>
          </div>
        </div>

        {/* Right Side: AI Assistant & Image Results Mockup (col-span-7) */}
        <div className="lg:col-span-7 p-5 flex flex-col justify-between bg-zinc-900/10 dark:bg-zinc-900/5 light:bg-zinc-50/30">
          <div className="space-y-4">
            
            {/* AI Assistant bubble */}
            <AnimatePresence mode="wait">
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 space-y-2 dark:bg-zinc-900/50 dark:border-zinc-800 light:bg-white light:border-zinc-200 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-outfit">
                    <Sparkles size={12} />
                    AI Assistant
                  </div>
                  <p className="text-xs text-zinc-305 dark:text-zinc-300 light:text-zinc-650 leading-relaxed">
                    {phase === 1 ? (
                      <span className="flex items-center gap-1.5 text-zinc-450">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                        {thinkingMsg}
                      </span>
                    ) : (
                      currentData.aiAssistant
                    )}
                  </p>

                  {phase >= 2 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentData.checklist.map((item, idx) => (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          key={item}
                          className="px-1.5 py-0.5 rounded bg-indigo-500/10 dark:bg-indigo-500/10 light:bg-indigo-50 text-[9px] font-medium text-indigo-400 dark:text-indigo-400 light:text-indigo-650 border border-indigo-500/10"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated 2x2 Image Grid: Sliced to 2 variations */}
            <AnimatePresence>
              {phase === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-550 flex items-center justify-between">
                    <span>Generated Variations (2 Options)</span>
                    <span className="text-[9px] text-emerald-450 font-mono">100% complete</span>
                  </label>
                  
                  {/* Clean side-by-side grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {currentData.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden group/img bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300 dark:border-zinc-805 dark:hover:border-zinc-700 shadow-md"
                      >
                        <img
                          src={imgUrl}
                          alt="Demo generated"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80";
                          }}
                          className="w-full h-full object-cover select-none transition-transform duration-500 group-hover/img:scale-102"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
