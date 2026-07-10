import React from 'react';

export default function ShimmerSkeleton({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-zinc-800/50 dark:bg-zinc-800/30 bg-zinc-200/60 rounded-xl ${className}`}>
      <div 
        className="absolute inset-0 -translate-x-full animate-shimmer"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
          backgroundSize: '200% 100%'
        }}
      />
    </div>
  );
}
