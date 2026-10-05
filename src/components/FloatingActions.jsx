import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { SITE } from '../config/site.js';

// WhatsApp chat shortcut and a back-to-top button, bottom-right on every page.
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-white shadow-lg transition-colors hover:bg-navy-600"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      )}
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello Surprise Real Estate, I would like to ask about a property.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle size={22} aria-hidden="true" />
      </a>
    </div>
  );
}
