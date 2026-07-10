import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import DemoMockup from '../components/generator/DemoMockup';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, Check, Play, ChevronDown, Cpu, FileText, ImageIcon, Settings, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import local offline demo assets
import coffeeImg from '../assets/demo/coffee.png';
import perfumeImg from '../assets/demo/perfume.png';
import gamingImg from '../assets/demo/gaming.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setActivePrefill } = useApp();
  const [evolutionStep, setEvolutionStep] = useState(0);
  const [timelineStep, setTimelineStep] = useState(0);

  // Auto-cycle the Prompt Evolution Showcase
  useEffect(() => {
    const timer = setInterval(() => {
      setEvolutionStep((prev) => (prev + 1) % 6);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle the Decision Timeline
  useEffect(() => {
    const timer = setInterval(() => {
      setTimelineStep((prev) => (prev + 1) % 6);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    // Prefill Generator with default perfume template so it's never empty
    setActivePrefill({
      originalInput: "Design a luxury perfume advertisement",
      purpose: "instagram",
      model: "gemini",
      creativity: "balanced"
    });
    navigate('/generator');
  };

  const handleScrollToDemo = () => {
    const demo = document.getElementById('watch-think-section');
    if (demo) demo.scrollIntoView({ behavior: 'smooth' });
  };

  // Prompt Evolution Steps (blinking cursor text additions)
  const evolutionData = [
    { text: "Luxury perfume", highlight: "Luxury perfume", label: "Rough User Idea" },
    { text: "Luxury perfume advertisement", highlight: "advertisement", label: "Purpose Context Added" },
    { text: "Luxury perfume advertisement, professional product photography", highlight: "professional product photography", label: "Medium Defined" },
    { text: "Luxury perfume advertisement, professional product photography, volumetric lighting", highlight: "volumetric lighting", label: "Lighting Direction" },
    { text: "Luxury perfume advertisement, professional product photography, volumetric lighting, glass reflections", highlight: "glass reflections", label: "Material Details Added" },
    { text: "Luxury perfume advertisement, professional product photography, volumetric lighting, glass reflections, dark wet basalt stone composition", highlight: "dark wet basalt stone composition", label: "Scenic Composition Finished" }
  ];

  // From Prompt to Production visual outputs (3 examples, local assets)
  const resultTransformations = [
    {
      before: "Coffee Shop Logo",
      improvements: [
        "Minimal vector style",
        "Coffee bean geometry",
        "Sepia brown tone palette"
      ],
      tag: "Optimized for FLUX",
      img: coffeeImg
    },
    {
      before: "Luxury Perfume",
      improvements: [
        "Professional product photography",
        "Volumetric studio lighting",
        "Wet basalt stone backdrop"
      ],
      tag: "Creative Direction Applied",
      img: perfumeImg
    },
    {
      before: "Cozy Gaming Setup",
      improvements: [
        "Cyberpunk aesthetic details",
        "Dual monitors glow",
        "Cyan and purple neon LED lighting"
      ],
      tag: "AI Enhanced",
      img: gamingImg
    }
  ];

  // Decision Timeline Steps
  const timelineEvents = [
    { time: "0.1s", title: "Reading prompt", desc: "AI parses raw text and isolates the subject nouns." },
    { time: "0.4s", title: "Detecting missing details", desc: "Creative Director highlights lighting and layout gaps." },
    { time: "0.8s", title: "Optimizing lighting & camera", desc: "Establishes rule-of-thirds, camera specs, and lens framing." },
    { time: "1.1s", title: "Formatting for target model", desc: "Injects version tags and parameter flags (like Midjourney --ar)." },
    { time: "2.6s", title: "Rendering variations", desc: "Dispatches seed outputs to the GPU diffusion renderer." },
    { time: "3.4s", title: "Images ready", desc: "Generates synchronized 2x canvas outputs." }
  ];

  return (
    <PageWrapper>
      {/* Background blueprint grid is handled in CSS (bg-grid-dots). Soft radial gradient overlay here. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[15%] left-[20%] h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[15%] h-[250px] w-[250px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="space-y-32 pb-20 font-sans relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6 pt-16 relative">
          {/* Subtle animated background gradient behind headline */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-gradient-to-tr from-indigo-500/10 to-violet-600/10 blur-3xl animate-pulse pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/20"
          >
            <Sparkles size={11} className="text-indigo-400" />
            <span>AI Creative Partner</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-[45px] font-extrabold tracking-tight leading-[1.1] font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-900"
          >
            Stop guessing. <br />
            <span className="text-gradient">Create images like a creative director.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-xs sm:text-[13px] text-zinc-400 leading-relaxed dark:text-zinc-400 light:text-zinc-600"
          >
            Collaborate with an AI creative partner that automatically diagnoses weak details, enhances compositions, and structures professional visual guidelines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={handleStart}
              className="px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-bold text-white shadow-lg hover:shadow-indigo-500/10 transition-all hover:scale-102 flex items-center gap-1.5 cursor-pointer"
            >
              Create your first visual
              <ArrowRight size={13} />
            </button>
            <button
              onClick={handleScrollToDemo}
              className="px-6 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/10 dark:text-zinc-300 light:border-zinc-200 light:bg-white light:text-zinc-650 transition-all hover:scale-102"
            >
              Watch AI think
            </button>
          </motion.div>

          {/* Premium Capability Row (Replaces Stats) */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-[9.5px] font-bold text-zinc-500 uppercase tracking-widest pt-6 border-t border-zinc-900/50 w-full dark:border-zinc-900/50 light:border-zinc-100 select-none">
            <span className="flex items-center gap-1.5"><Check size={11} className="text-indigo-400" /> Gemini Prompt Intelligence</span>
            <span className="text-zinc-800 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><Check size={11} className="text-indigo-400" /> 2 Visual Variations</span>
            <span className="text-zinc-800 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><Check size={11} className="text-indigo-400" /> Optimized for Multiple Models</span>
          </div>
        </section>

        {/* 2. WHY AI IMAGES FAIL (Style: Dark Matte Cards with subtle borders) */}
        <section className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Diagnostics</span>
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-800 leading-tight">
              Why standard AI images look average
            </h2>
            <p className="text-xs text-zinc-505 dark:text-zinc-500 light:text-zinc-400 max-w-sm mx-auto">
              Simple text inputs usually lack structural lighting, composition details, and artistic parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4.5 space-y-2 dark:border-zinc-900 dark:bg-zinc-950/40 light:bg-zinc-50/50 light:border-zinc-200 shadow-sm hover:border-zinc-800 transition-colors group">
              <div className="text-rose-500 text-[10px] font-bold font-mono">❌ Generic Descriptions</div>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans group-hover:text-zinc-400 transition-colors">
                Omits specific keywords like environmental backdrops and details.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4.5 space-y-2 dark:border-zinc-900 dark:bg-zinc-950/40 light:bg-zinc-50/50 light:border-zinc-200 shadow-sm hover:border-zinc-800 transition-colors group">
              <div className="text-rose-500 text-[10px] font-bold font-mono">❌ Missing Composition</div>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans group-hover:text-zinc-400 transition-colors">
                Subject renders off-center or awkwardly cropped by default.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4.5 space-y-2 dark:border-zinc-900 dark:bg-zinc-950/40 light:bg-zinc-50/50 light:border-zinc-200 shadow-sm hover:border-zinc-800 transition-colors group">
              <div className="text-rose-500 text-[10px] font-bold font-mono">❌ Flat Lighting</div>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans group-hover:text-zinc-400 transition-colors">
                Produces artificial, uniform, or over-exposed lighting patterns.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4.5 space-y-2 dark:border-zinc-900 dark:bg-zinc-950/40 light:bg-zinc-50/50 light:border-zinc-200 shadow-sm hover:border-zinc-800 transition-colors group">
              <div className="text-rose-500 text-[10px] font-bold font-mono">❌ No Creative Direction</div>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans group-hover:text-zinc-400 transition-colors">
                Lacks lens specifications, textures, and professional visual styling.
              </p>
            </div>
          </div>
        </section>

        {/* 3. PROMPT EVOLUTION (Signature Showcase Section) */}
        <section className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Optimization</span>
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-800 leading-tight">
              Prompt Evolution
            </h2>
            <p className="text-xs text-zinc-505 dark:text-zinc-500 light:text-zinc-400 max-w-sm mx-auto">
              Observe how our creative partner expands rough ideas into optimized visual code.
            </p>
          </div>

          {/* Elevate card slightly on hover */}
          <div className="rounded-xl border border-zinc-900 bg-zinc-950/50 p-6 space-y-4 shadow-lg hover:-translate-y-1 transition-all duration-300 dark:border-zinc-800 light:border-zinc-200 light:bg-white relative overflow-hidden min-h-[170px]">
            {/* Step Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-2 dark:border-zinc-900 light:border-zinc-100">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-zinc-500">
                Active Layer: {evolutionData[evolutionStep].label}
              </span>
              <span className="text-[9px] font-mono text-indigo-400 animate-pulse">
                Evolution Loop...
              </span>
            </div>

            {/* Prompt String Content with typewriting simulation and highlighting */}
            <div className="text-xs sm:text-sm font-mono text-zinc-400 leading-relaxed break-words dark:text-zinc-300 light:text-zinc-650 min-h-[60px]">
              {evolutionData[evolutionStep].text.substring(0, evolutionData[evolutionStep].text.indexOf(evolutionData[evolutionStep].highlight))}
              
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-bold transition-all duration-500 dark:bg-indigo-500/10 dark:text-indigo-400 light:bg-indigo-50 light:text-indigo-700">
                {evolutionData[evolutionStep].highlight}
              </span>

              {evolutionData[evolutionStep].text.substring(evolutionData[evolutionStep].text.indexOf(evolutionData[evolutionStep].highlight) + evolutionData[evolutionStep].highlight.length)}
              <span className="inline-block w-1 h-3.5 bg-indigo-500 ml-1 animate-ping" />
            </div>
          </div>
        </section>

        {/* 4. WATCH IMAGINEFLOW THINK */}
        <section id="watch-think-section" className="max-w-4xl mx-auto scroll-mt-20 space-y-12">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Collaboration</span>
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-800 leading-tight">
              Watch ImagineFlow think
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-zinc-400">
              Click Replay to watch our AI partner structure recommendations and trigger generation seeds.
            </p>
          </div>
          <DemoMockup />
        </section>

        {/* 5. FROM PROMPT TO PRODUCTION (Style: Border-only clean cards, visual outcomes) */}
        <section className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Outcomes</span>
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-800 leading-tight">
              From prompt to production
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-zinc-400 max-w-sm mx-auto">
              Real visual transformations from simple ideas into production-ready assets.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resultTransformations.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-900 p-4.5 bg-transparent space-y-4 hover:border-zinc-800 hover:-translate-y-1 transition-all duration-300 dark:border-zinc-800 shadow-sm flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-wider font-outfit">
                    <span>Input: "{item.before}"</span>
                    <span className="text-indigo-400 font-semibold">{item.tag}</span>
                  </div>

                  <div className="aspect-square rounded-lg overflow-hidden border border-zinc-900 bg-zinc-900 relative dark:border-zinc-800">
                    <img
                      src={item.img}
                      alt={item.before}
                      className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>
                </div>

                {/* AI Reasoning Checklist */}
                <div className="border-t border-zinc-900 dark:border-zinc-900/60 light:border-zinc-100 pt-3 space-y-1">
                  <div className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">
                    AI Improvements
                  </div>
                  <div className="space-y-1 pt-1">
                    {item.improvements.map((imp, impIdx) => (
                      <div key={impIdx} className="text-[10px] text-zinc-400 dark:text-zinc-400 light:text-zinc-600 flex items-center gap-1.5">
                        <span className="text-indigo-400">✓</span>
                        {imp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. OTHER TOOLS VS IMAGINEFLOW COMPARISON (Style: Glass Surface cards) */}
        <section className="max-w-2xl mx-auto space-y-8 pt-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Contrast</span>
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-800 leading-tight">
              How ImagineFlow is different
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Other tools (Glass card style) */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 backdrop-blur-sm p-5 space-y-4 hover:border-zinc-700 transition-colors shadow-sm">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Other AI Image Tools
              </h3>
              <div className="space-y-2.5 text-[11px] text-zinc-500 leading-relaxed font-sans">
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <span>You write prompts yourself from scratch.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <span>Requires studying prompt engineering tags.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <span>Results depend entirely on technical trial-and-error.</span>
                </div>
              </div>
            </div>

            {/* ImagineFlow (Glass card style) */}
            <div className="rounded-xl border border-indigo-500/15 bg-indigo-500/5 backdrop-blur-sm p-5 space-y-4 hover:border-indigo-500/25 transition-colors shadow-sm">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-outfit">
                ImagineFlow
              </h3>
              <div className="space-y-2.5 text-[11px] text-zinc-300 dark:text-zinc-300 light:text-zinc-700 leading-relaxed font-sans">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  <span>AI acts as your collaborative partner.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  <span>Suggests improvements & fills in missing lighting or composition.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  <span>Generates optimized prompts automatically for multiple platforms.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. AI DECISION TIMELINE (New Memorable Section) */}
        <section className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Process</span>
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-800 leading-tight">
              AI Decision Timeline
            </h2>
            <p className="text-xs text-zinc-505 dark:text-zinc-500 light:text-zinc-400 max-w-sm mx-auto">
              How the neural creative engine segments the co-creation workflow in milliseconds.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l border-zinc-900 pl-6 ml-4 space-y-6 dark:border-zinc-800 light:border-zinc-200">
            {timelineEvents.map((evt, idx) => {
              const isActive = idx === timelineStep;
              const isPast = idx < timelineStep;
              
              return (
                <div key={idx} className="relative transition-all duration-300">
                  {/* Timeline Bullet Node */}
                  <div className={`absolute -left-[30px] top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-zinc-950 flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? 'border-indigo-500 scale-110 shadow-lg'
                      : isPast
                        ? 'border-indigo-500/50 bg-indigo-500/10'
                        : 'border-zinc-800'
                  }`}>
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />}
                  </div>

                  <div className={`space-y-0.5 transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-101' : 'opacity-40'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-indigo-400">{evt.time}</span>
                      <span className="text-xs font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800 font-outfit">{evt.title}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-zinc-600 font-sans leading-relaxed">
                      {evt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. PREMIUM COMPACT FOOTER */}
        <footer className="border-t border-zinc-900/60 pt-8 text-[10.5px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-500 light:border-zinc-100 light:text-zinc-400 leading-relaxed font-sans max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
          <div className="space-y-0.5">
            <div className="font-bold text-zinc-400 dark:text-zinc-400 light:text-zinc-700">
              ImagineFlow AI
            </div>
            <div>
              Powered by <span className="font-semibold text-zinc-400">Gemini AI</span> & Image Generation by <span className="font-semibold text-zinc-400">Pollinations AI</span>
            </div>
            <div>
              Built by <span className="text-zinc-400 font-medium">Pranet Narwani</span>
            </div>
          </div>

          <div className="flex gap-4 font-semibold text-[10px]">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
              GitHub
            </a>
            <a href="/privacy" className="hover:text-indigo-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-indigo-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </footer>

      </div>
    </PageWrapper>
  );
}
