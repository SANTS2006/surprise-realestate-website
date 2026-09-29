import { useEffect } from 'react';

// Injects a JSON-LD <script> tag for the current page and removes it on
// unmount — search engines (Googlebot executes JS) and rich-result parsers
// read this for Organization/RealEstateListing rich snippets. Skips
// silently while `data` is null (e.g. a listing that hasn't loaded yet).
export function useStructuredData(data) {
  useEffect(() => {
    if (!data) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => script.remove();
  }, [data]);
}
