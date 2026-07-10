import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Eye, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import ShimmerSkeleton from '../ui/ShimmerSkeleton';
import Modal from '../ui/Modal';
import { downloadImage } from '../../services/image';

export default function ImageGallery({
  images = [],
  onRegenerateSingle,
  isGenerating = false,
  promptText = '',
  isDark = true
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [zoomUrl, setZoomUrl] = useState(null);

  // The single active image object
  const imgObj = images[0];

  // Reset image status on change or regeneration
  useEffect(() => {
    setIsLoaded(false);
    setIsError(false);
  }, [imgObj, isGenerating]);

  const handleImageLoaded = () => {
    setIsLoaded(true);
    setIsError(false);
  };

  const handleImageError = () => {
    setIsError(true);
    setIsLoaded(false);
  };

  const handleRegenerate = () => {
    setIsLoaded(false);
    setIsError(false);
    onRegenerateSingle(0);
  };

  const showSkeleton = (isGenerating || !imgObj) && !isError;

  // Empty canvas state
  if (images.length === 0 && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl p-12 text-center bg-zinc-950/10 min-h-[380px] w-full dark:border-zinc-800 light:border-zinc-200 light:bg-zinc-50/50">
        <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800 light:bg-white light:border-zinc-200 shadow-sm">
          <ImageIcon size={18} />
        </div>
        <h3 className="text-xs font-bold text-zinc-300 dark:text-zinc-200 light:text-zinc-700 font-outfit mb-1">
          Visual Canvas
        </h3>
        <p className="max-w-xs text-[11px] text-zinc-500 dark:text-zinc-500 light:text-zinc-400 leading-relaxed">
          Your generated visual masterpiece will render here. Describe your idea and click Create Images.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans w-full">
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center justify-between select-none">
        <span>Visual Output</span>
        {(isGenerating || !isLoaded) && !isError && (
          <span className="text-indigo-400 animate-pulse text-[9px] font-bold font-mono tracking-widest">
            Rendering masterpiece...
          </span>
        )}
      </div>

      {/* Large Single Canvas Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl border border-zinc-900 bg-zinc-900/10 overflow-hidden group/card shadow-xl transition-all duration-300 hover:border-zinc-800 dark:border-zinc-900 dark:bg-zinc-900/10 light:border-zinc-200 light:bg-white">
        
        {/* Shimmer skeleton */}
        {showSkeleton && (
          <ShimmerSkeleton className="absolute inset-0 w-full h-full z-10" />
        )}

        {/* Error/Server Busy State */}
        {isError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-zinc-950/90 text-center gap-3 dark:bg-zinc-950/95 light:bg-zinc-50/95">
            <AlertTriangle className="text-amber-500 animate-pulse" size={24} />
            <div className="space-y-1">
              <div className="text-xs font-bold text-zinc-300 dark:text-zinc-200 light:text-zinc-800 uppercase tracking-wider">
                Server Timeout
              </div>
              <p className="text-[10px] text-zinc-500 max-w-xs leading-relaxed">
                The image generator cluster is temporarily busy. Click retry to regenerate the seed.
              </p>
            </div>
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-[10px] font-semibold text-zinc-300 transition-all cursor-pointer shadow-sm"
            >
              <RefreshCw size={11} />
              Retry Generation
            </button>
          </div>
        )}

        {/* Image Tag */}
        {imgObj && !isError && (
          <>
            <img
              src={imgObj.url}
              alt="Generated visual masterpiece"
              onLoad={handleImageLoaded}
              onError={handleImageError}
              className={`w-full h-full object-cover select-none transition-all duration-500 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />

            {/* Hover Actions (Controls displayed only on hover) */}
            {isLoaded && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 flex items-center justify-center gap-4 transition-all duration-300 z-20">
                <button
                  onClick={() => setZoomUrl(imgObj.url)}
                  className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-300 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                  title="Expand Visual"
                >
                  <Eye size={15} />
                </button>
                <button
                  onClick={() => downloadImage(imgObj.url, 'imagineflow-masterpiece.jpg')}
                  className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-300 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                  title="Download Visual"
                >
                  <Download size={15} />
                </button>
                <button
                  onClick={handleRegenerate}
                  className="p-3 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-300 hover:text-indigo-400 hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                  title="Regenerate Seed"
                >
                  <RefreshCw size={15} />
                </button>
              </div>
            )}

            {/* Seed badge on hover */}
            {isLoaded && (
              <div className="absolute left-4 bottom-4 px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-800 text-[8.5px] font-mono text-zinc-500 backdrop-blur-sm opacity-0 group-hover/card:opacity-100 transition-opacity z-20 select-none">
                Seed: {imgObj.seed}
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Zoom Modal */}
      <Modal
        isOpen={!!zoomUrl}
        onClose={() => setZoomUrl(null)}
        imageUrl={zoomUrl}
        prompt={promptText}
      />
    </div>
  );
}
