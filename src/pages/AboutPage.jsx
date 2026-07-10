import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import { Compass, Cpu, Server, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const cards = [
    {
      icon: <Compass size={18} className="text-indigo-400" />,
      title: "Prompt Structuralism",
      description: "Generative image models require specific syntactic categories to render optimal lighting, textures, and framing. We divide inputs into 8 modular slots (Subject, Style, Camera, etc.) to give you direct control over these variables."
    },
    {
      icon: <Cpu size={18} className="text-violet-400" />,
      title: "Gemini Integration",
      description: "Our prompt enhancement logic requests structured JSON schemas from Gemini models. It performs semantic gaps analysis to suggest specific lighting, layout, and style improvements based on target aspect ratios and templates."
    },
    {
      icon: <Server size={18} className="text-pink-400" />,
      title: "Seed-Based Variations",
      description: "By binding custom seeds to Pollinations AI image calls, we spin up our generation pipeline. This enables rapid concept exploration and instant visual regeneration."
    }
  ];

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto space-y-12 pb-12 font-sans">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-900">
            About ImagineFlow AI
          </h1>
          <p className="text-sm text-zinc-450 dark:text-zinc-400 light:text-zinc-550 leading-relaxed">
            ImagineFlow AI is a high-fidelity co-creation workspace designed to optimize text-to-image prompts. Instead of a basic black-box prompt converter, the application serves as a collaborative frontend assistant for AI image generators.
          </p>
        </div>

        {/* Dynamic Methodology Grid */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold font-outfit text-zinc-200 dark:text-zinc-200 light:text-zinc-800">
            Methodology & Pipeline Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map((card, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                key={card.title}
                className="rounded-xl border border-zinc-900 bg-zinc-950/20 p-5 space-y-3 dark:border-zinc-800 dark:bg-zinc-950/10 light:border-zinc-200 light:bg-white shadow-sm"
              >
                <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center dark:bg-zinc-900 dark:border-zinc-800 light:bg-zinc-50 light:border-zinc-200">
                  {card.icon}
                </div>
                <h3 className="text-xs font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800 font-outfit">
                  {card.title}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-500 light:text-zinc-500 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prompt Quality Philosophy */}
        <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-6 space-y-4 dark:border-zinc-800 dark:bg-zinc-950 light:border-zinc-200 light:bg-white shadow-sm">
          <h3 className="text-sm font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800 font-outfit flex items-center gap-2">
            <CheckSquare size={16} className="text-indigo-400" />
            Why Prompt Engineering Matters
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-zinc-500 leading-relaxed">
            Image generation models like FLUX and Midjourney rely on dense semantic tags to guide denoising pathways. A basic prompt like <code className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-350 dark:bg-zinc-900 dark:border-zinc-800 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-600 font-mono">"coffee cup"</code> leaves lighting, backdrop composition, and rendering engines entirely to probability, resulting in generic outputs. Appending details like volumetric studio lighting, high resolution, and camera depth-of-field focuses the diffusion steps, producing predictable and premium visual aesthetics.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
