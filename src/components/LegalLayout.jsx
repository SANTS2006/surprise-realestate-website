import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { ScrollReveal } from './ScrollReveal.jsx';

// Shared shell for every legal/policy page (Privacy Policy, Terms &
// Conditions, Payment Policy, Cookie Policy) — a plain, readable long-form
// layout rather than the marketing-heavy styling used elsewhere on the
// site, since these pages exist to be read carefully, not to sell.
export function LegalLayout({ title, updated, children }) {
  useDocumentTitle(title);

  return (
    <div className="bg-white pb-20 pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-800">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to home
        </Link>

        <ScrollReveal className="mt-4">
          <h1 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-navy-400">Last updated: {updated}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="prose-legal mt-10 flex flex-col gap-8">
          {children}
        </ScrollReveal>
      </div>
    </div>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-navy-900">{heading}</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-navy-600">{children}</div>
    </section>
  );
}
