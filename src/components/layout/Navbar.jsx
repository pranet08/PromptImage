import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Key, Check, Info, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme, geminiApiKey, setGeminiApiKey } = useApp();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempKey, setTempKey] = useState(geminiApiKey);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSaveKey = (e) => {
    e.preventDefault();
    setGeminiApiKey(tempKey.trim());
    toast.success(
      tempKey.trim() 
        ? 'Gemini API Key saved successfully!' 
        : 'Gemini API Key removed. Running in Demo Mode.',
      {
        style: {
          background: theme === 'dark' ? '#18181b' : '#ffffff',
          color: theme === 'dark' ? '#f4f4f5' : '#18181b',
          border: '1px solid ' + (theme === 'dark' ? '#27272a' : '#e4e4e7'),
          fontFamily: 'Inter, sans-serif',
        }
      }
    );
    setIsSettingsOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/generator', label: 'Generator' },
    { path: '/history', label: 'History' },
    { path: '/about', label: 'About' }
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-zinc-950/80 light:border-zinc-200/80 light:bg-white/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:opacity-90 transition-opacity">
                  <span className="text-white font-bold text-xs font-outfit">IF</span>
                </div>
                <span className="font-outfit font-bold text-lg tracking-tight text-zinc-100 dark:text-zinc-100 light:text-zinc-900">
                  Imagine<span className="text-indigo-400">Flow</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-indigo-400 dark:text-indigo-400 light:text-indigo-600 font-semibold'
                        : 'text-zinc-400 dark:text-zinc-400 light:text-zinc-500 hover:text-zinc-200 dark:hover:text-zinc-200 light:hover:text-zinc-900'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 dark:bg-indigo-400 light:bg-indigo-600"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Control Panel Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* API settings button */}
              <button
                onClick={() => {
                  setTempKey(geminiApiKey);
                  setIsSettingsOpen(true);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  geminiApiKey
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-400 light:border-emerald-600/30 light:bg-emerald-600/5 light:text-emerald-700'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50 light:border-zinc-200 light:bg-zinc-100 light:text-zinc-600 light:hover:bg-zinc-200'
                }`}
                title="API Key Settings"
              >
                <Key size={14} className={geminiApiKey ? 'animate-pulse' : ''} />
                {geminiApiKey ? 'API Key Active' : 'Configure API Key'}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 bg-zinc-900/30 transition-all dark:border-zinc-800 dark:bg-zinc-900/30 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-500 light:hover:text-zinc-900"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>

            {/* Mobile menu controls */}
            <div className="flex md:hidden items-center gap-2">
              {/* Mobile Settings Button */}
              <button
                onClick={() => {
                  setTempKey(geminiApiKey);
                  setIsSettingsOpen(true);
                }}
                className={`p-2 rounded-lg border transition-all ${
                  geminiApiKey
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 dark:text-emerald-400 light:border-emerald-600/30 light:text-emerald-700'
                    : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 dark:border-zinc-800 light:border-zinc-200 light:text-zinc-500'
                }`}
              >
                <Key size={15} />
              </button>

              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 text-zinc-400 dark:text-zinc-400 light:text-zinc-500"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Toggle Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 text-zinc-400 dark:text-zinc-400 light:text-zinc-500"
              >
                {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-zinc-800 dark:border-zinc-800 light:border-zinc-200 overflow-hidden bg-zinc-950 dark:bg-zinc-950 light:bg-white"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-base font-medium transition-all ${
                        isActive
                          ? 'bg-zinc-900 text-indigo-400 dark:bg-zinc-900 dark:text-indigo-400 light:bg-zinc-100 light:text-indigo-600 font-semibold'
                          : 'text-zinc-400 dark:text-zinc-400 light:text-zinc-500 hover:bg-zinc-900/50 dark:hover:bg-zinc-900/50 light:hover:bg-zinc-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Settings Modal (API Key Configuration) */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl p-6 dark:bg-zinc-950 dark:border-zinc-800 light:bg-white light:border-zinc-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-outfit text-zinc-100 dark:text-zinc-100 light:text-zinc-900">
                  Settings & Keys
                </h3>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1 rounded-lg hover:bg-zinc-900 dark:hover:bg-zinc-900 light:hover:bg-zinc-100 text-zinc-400 hover:text-zinc-200 dark:hover:text-zinc-200 light:text-zinc-500 light:hover:text-zinc-900 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveKey} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 dark:text-zinc-400 light:text-zinc-500 mb-1.5">
                    Gemini API Key
                  </label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 light:bg-zinc-50 light:border-zinc-200 light:text-zinc-900 light:placeholder-zinc-400"
                  />
                  <p className="mt-2 text-[11px] leading-relaxed text-zinc-500 flex items-start gap-1.5 dark:text-zinc-500 light:text-zinc-400">
                    <Info size={12} className="mt-0.5 flex-shrink-0" />
                    <span>
                      Your key is saved locally in your browser. Leave blank to run in <strong>Demo/Local Mode</strong> using local rule-based engineering.
                    </span>
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-900 dark:border-zinc-900 light:border-zinc-100 flex items-center justify-between text-xs">
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:underline font-medium dark:text-indigo-400 light:text-indigo-600"
                  >
                    Get free Gemini API Key →
                  </a>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSettingsOpen(false)}
                      className="px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:text-zinc-400 light:border-zinc-200 light:hover:bg-zinc-100 light:text-zinc-600 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-md transition-all flex items-center gap-1 hover:shadow-indigo-500/10"
                    >
                      <Check size={14} />
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
