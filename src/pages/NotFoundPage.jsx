import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6 pt-16 font-sans">
        <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 light:bg-white light:border-zinc-200">
          <HelpCircle size={24} />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-outfit text-zinc-200 dark:text-zinc-200 light:text-zinc-800">
            404: Page Not Found
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-550 light:text-zinc-450 leading-relaxed">
            The page you are looking for does not exist or has been relocated in the workflow.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white shadow-md hover:shadow-indigo-500/10 transition-all flex items-center gap-1.5"
        >
          <ArrowLeft size={13} />
          Return to Home
        </button>
      </div>
    </PageWrapper>
  );
}
