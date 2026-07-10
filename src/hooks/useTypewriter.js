import { useState, useEffect } from 'react';

export default function useTypewriter(text, speed = 40, onComplete) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      return;
    }

    const words = text.split(' ');
    let currentWordIndex = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedText((prev) => {
          return prev ? prev + ' ' + words[currentWordIndex] : words[currentWordIndex];
        });
        currentWordIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}
