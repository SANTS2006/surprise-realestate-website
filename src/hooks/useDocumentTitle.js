import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} — Surprise Real Estate` : 'Surprise Real Estate';
    return () => { document.title = previous; };
  }, [title]);
}
