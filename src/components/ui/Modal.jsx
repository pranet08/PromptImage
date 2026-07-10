import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { downloadImage } from '../../services/image';

export default function Modal({ isOpen, onClose, imageUrl, prompt }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-zoom-out"
          onClick={onClose}
        />
        
        {/* Modal content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="relative max-w-5xl w-full max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl z-10"
        >
          {/* Action buttons bar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => downloadImage(imageUrl)}
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 backdrop-blur-sm transition-all shadow-md hover:scale-105 active:scale-95"
              title="Download image"
            >
              <Download size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 backdrop-blur-sm transition-all shadow-md hover:scale-105 active:scale-95"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Image container */}
          <div className="flex-1 flex items-center justify-center p-4 min-h-0 bg-zinc-950">
            <img
              src={imageUrl}
              alt={prompt || "ImagineFlow Generation"}
              className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-lg select-none"
            />
          </div>

          {/* Prompt description bar */}
          {prompt && (
            <div className="w-full bg-zinc-900/80 border-t border-zinc-800 p-5 text-sm text-zinc-400 select-all backdrop-blur-sm">
              <p className="font-semibold text-zinc-200 mb-1.5 font-outfit">Prompt</p>
              <p className="leading-relaxed text-zinc-300 font-sans">{prompt}</p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
