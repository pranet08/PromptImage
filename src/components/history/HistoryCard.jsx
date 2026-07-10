import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Copy, Download, Play, CopyCheck, Edit, Check, X, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { downloadImage } from '../../services/image';
import Modal from '../ui/Modal';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function HistoryCard({ item }) {
  const { deleteFromHistory, addToHistory, updateHistoryItem, setActivePrefill } = useApp();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(item.enhancedPrompt);
  const [copied, setCopied] = useState(false);
  const [zoomUrl, setZoomUrl] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.enhancedPrompt);
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDuplicate = () => {
    // Duplicate item under a new ID in history
    addToHistory({
      originalInput: item.originalInput,
      enhancedPrompt: item.enhancedPrompt,
      purpose: item.purpose,
      model: item.model,
      creativity: item.creativity,
      images: item.images,
      structuredPrompt: item.structuredPrompt,
      explanations: item.explanations,
      checklist: item.checklist,
      quality: item.quality,
      strengthFeedback: item.strengthFeedback
    });
    toast.success('Generation duplicated successfully!');
  };

  const handleEditSave = () => {
    updateHistoryItem(item.id, { enhancedPrompt: editedPrompt });
    setIsEditing(false);
    toast.success('Prompt updated in history!');
  };

  const handleGenerateAgain = () => {
    setActivePrefill({
      originalInput: item.originalInput,
      purpose: item.purpose,
      model: item.model,
      creativity: item.creativity
    });
    toast.success('Loading parameters into generator...');
    navigate('/generator');
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/10 p-5 space-y-4 dark:border-zinc-800 dark:bg-zinc-900/10 light:border-zinc-200 light:bg-white shadow-sm flex flex-col justify-between">
      {/* 1. Header with details and date */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
          <span className="font-outfit uppercase tracking-widest">{item.date}</span>
          <div className="flex gap-2">
            <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 capitalize dark:bg-zinc-900 dark:border-zinc-800 light:bg-zinc-100 light:border-zinc-200 light:text-zinc-500">
              {item.purpose?.replace('_', ' ') || 'Marketing'}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase dark:bg-zinc-900 dark:border-zinc-800 light:bg-zinc-100 light:border-zinc-200 light:text-zinc-500">
              {item.model || 'Gemini'}
            </span>
          </div>
        </div>

        {/* 2. Original Input Prompt */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Original Idea</span>
          <p className="text-xs text-zinc-400 dark:text-zinc-450 light:text-zinc-650 italic leading-relaxed">
            "{item.originalInput}"
          </p>
        </div>

        {/* 3. Enhanced Prompt (Editable) */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-indigo-400 dark:text-indigo-400 light:text-indigo-650 uppercase tracking-wider flex justify-between">
            <span>Enhanced Output</span>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)} 
                className="hover:text-indigo-300 dark:hover:text-indigo-300 light:hover:text-indigo-800 transition-colors flex items-center gap-0.5"
              >
                <Edit size={10} /> Edit
              </button>
            )}
          </span>

          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="w-full min-h-[60px] bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 leading-relaxed font-mono outline-none resize-none dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-700"
              />
              <div className="flex justify-end gap-1.5">
                <button
                  onClick={() => {
                    setEditedPrompt(item.enhancedPrompt);
                    setIsEditing(false);
                  }}
                  className="p-1 px-2 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <X size={12} />
                </button>
                <button
                  onClick={handleEditSave}
                  className="p-1 px-2 rounded bg-indigo-500 text-[10px] text-white hover:bg-indigo-600 transition-colors flex items-center gap-0.5"
                >
                  <Check size={12} /> Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-zinc-200 leading-relaxed font-mono select-all bg-zinc-900/40 p-3 rounded-lg border border-zinc-800 dark:bg-zinc-900/20 dark:border-zinc-800/80 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-700">
              {item.enhancedPrompt}
            </p>
          )}
        </div>

        {/* 4. Single Image Output Canvas */}
        {item.images && item.images[0] && (
          <div 
            className="relative aspect-[16/10] rounded-lg overflow-hidden group/img bg-zinc-900 border border-zinc-800 dark:border-zinc-800 cursor-pointer"
            onClick={() => setZoomUrl(item.images[0].url)}
          >
            <img
              src={item.images[0].url}
              alt="Generated visual"
              className="w-full h-full object-cover select-none"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
              <Eye size={14} className="text-zinc-200" />
            </div>
          </div>
        )}
      </div>

      {/* 5. Action Bar */}
      <div className="pt-4 mt-2 border-t border-zinc-900/60 dark:border-zinc-800 light:border-zinc-200 flex items-center justify-between text-zinc-500">
        <div className="flex gap-2">
          {/* Generate Again */}
          <button
            onClick={handleGenerateAgain}
            className="p-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 dark:bg-zinc-900/30 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-500 light:hover:bg-zinc-100 flex items-center gap-1.5 text-xs font-semibold transition-all hover:scale-102"
            title="Load back into generator"
          >
            <Play size={10} fill="currentColor" />
            Generate Again
          </button>
          
          {/* Duplicate */}
          <button
            onClick={handleDuplicate}
            className="px-2.5 py-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 dark:bg-zinc-900/30 dark:border-zinc-800 dark:text-zinc-400 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-500 light:hover:bg-zinc-100 text-xs font-medium transition-colors"
          >
            Duplicate
          </button>
        </div>

        <div className="flex gap-1.5">
          {/* Copy Prompt */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 dark:hover:bg-zinc-900 dark:text-zinc-400 light:hover:bg-zinc-100 light:text-zinc-500 transition-colors"
            title="Copy prompt"
          >
            {copied ? <CopyCheck size={14} className="text-emerald-450 dark:text-emerald-400" /> : <Copy size={14} />}
          </button>

          {/* Download main image */}
          {item.images && item.images[0] && (
            <button
              onClick={() => downloadImage(item.images[0].url, `imagineflow-download-${item.id}.jpg`)}
              className="p-2 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 dark:hover:bg-zinc-900 dark:text-zinc-400 light:hover:bg-zinc-100 light:text-zinc-500 transition-colors"
              title="Download primary image variation"
            >
              <Download size={14} />
            </button>
          )}

          {/* Delete */}
          <button
            onClick={() => {
              deleteFromHistory(item.id);
              toast.success('Item deleted from history.');
            }}
            className="p-2 rounded-lg hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 transition-colors"
            title="Delete item"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Lightbox zoom modal */}
      <Modal
        isOpen={!!zoomUrl}
        onClose={() => setZoomUrl(null)}
        imageUrl={zoomUrl}
        prompt={item.enhancedPrompt}
      />
    </div>
  );
}
