import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useTheme from '../hooks/useTheme';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [geminiApiKey, setGeminiApiKey] = useLocalStorage(
    'imagineflow_gemini_key',
    import.meta.env.VITE_GEMINI_API_KEY || ''
  );
  const [history, setHistory] = useLocalStorage('imagineflow_history', []);
  const [activePrefill, setActivePrefill] = useLocalStorage('imagineflow_prefill', null);

  const addToHistory = (item) => {
    setHistory((prev) => [
      {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        ...item,
      },
      ...prev,
    ]);
  };

  const deleteFromHistory = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const updateHistoryItem = (id, updatedFields) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark,
        geminiApiKey,
        setGeminiApiKey,
        history,
        addToHistory,
        deleteFromHistory,
        updateHistoryItem,
        clearHistory,
        activePrefill,
        setActivePrefill,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
