import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between font-sans bg-zinc-950 dark:bg-zinc-950 light:bg-zinc-50 transition-colors duration-300">
          {/* Header Navigation */}
          <Navbar />

          {/* Page Routing */}
          <main className="flex-1 flex flex-col min-h-0">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/generator" element={<GeneratorPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Global Toast Notification Container */}
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: 'font-sans text-xs font-medium border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 shadow-lg',
              duration: 3500,
            }}
          />
        </div>
      </Router>
    </AppProvider>
  );
}
