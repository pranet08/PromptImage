import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950/40 py-8 transition-colors dark:border-zinc-900 dark:bg-zinc-950/40 light:border-zinc-200 light:bg-zinc-100/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-500 light:text-zinc-400">
        <p className="font-outfit">
          &copy; {new Date().getFullYear()} ImagineFlow AI. Built as a premium prompt engineering co-creator.
        </p>
        <div className="flex gap-6">
          <span className="hover:text-zinc-300 dark:hover:text-zinc-300 light:hover:text-zinc-700 transition-colors cursor-default">Privacy Policy</span>
          <span className="hover:text-zinc-300 dark:hover:text-zinc-300 light:hover:text-zinc-700 transition-colors cursor-default">Terms of Service</span>
          <span className="hover:text-zinc-300 dark:hover:text-zinc-300 light:hover:text-zinc-700 transition-colors cursor-default">Docs</span>
        </div>
      </div>
    </footer>
  );
}
