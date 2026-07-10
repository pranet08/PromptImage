import { useEffect } from 'react';

export default function useKeyPress(targetKey, handler) {
  useEffect(() => {
    const downHandler = (event) => {
      if (targetKey === 'Ctrl+Enter') {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
          event.preventDefault();
          handler(event);
        }
      } else if (event.key === targetKey) {
        // If it's ESC, only trigger if it's not inside a text inputs unless wanted
        // Let's keep it generic and let the handler handle specific focus conditions if needed
        event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [targetKey, handler]);
}
