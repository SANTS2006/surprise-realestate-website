import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Page Not Found', "The page you're looking for doesn't exist, or may have moved.", { noindex: true });

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <SearchX size={48} className="text-navy-300" aria-hidden="true" />
      <h1 className="font-display text-4xl font-semibold text-navy-900">Page not found</h1>
      <p className="max-w-sm text-navy-500">The page you're looking for doesn't exist, or may have moved.</p>
      <Link to="/" className="mt-2 flex items-center gap-2 rounded-full bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
        <Home size={15} aria-hidden="true" />
        Back to home
      </Link>
    </div>
  );
}
