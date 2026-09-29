import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { ScrollReveal } from '../components/ScrollReveal.jsx';

const FAQS = [
  { q: 'How do I schedule a viewing?', a: "Open any listing and use the 'Request a viewing' form, or call the listing agent directly — most viewings can be arranged within 24 hours." },
  { q: 'What documents do I need to rent a property?', a: 'A valid ID, proof of income or employment, and a refundable security deposit (typically one month\'s rent) are required for every tenancy.' },
  { q: 'Are utilities included in the monthly rent?', a: 'Utilities (water, electricity, generator fuel) are billed separately unless a listing specifically states otherwise — check the amenities section of each listing.' },
  { q: 'Can I list my own property with Surprise Real Estate?', a: 'Yes — contact our property management team through the Contact page and one of our consultants will arrange a valuation and walkthrough.' },
  { q: 'Do you offer a referral bonus?', a: 'Current tenants can refer friends and family using their personal referral code from their tenant portal — bonuses are reviewed and paid out by our team once the referred tenant signs a lease.' },
  { q: 'What areas do you cover?', a: 'Browse our current neighborhoods on the Listings page — use the neighborhood filter to see everywhere we currently manage properties.' },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-navy-100">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-navy-900">{item.q}</span>
        <ChevronDown size={18} className={clsx('shrink-0 text-navy-400 transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <div className={clsx('grid transition-[grid-template-rows] duration-300 ease-in-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-navy-500">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  useDocumentTitle('Frequently Asked Questions', 'Answers to common questions about viewings, documents, utilities, listing your property, and our referral program.');
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white pb-20 pt-28">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Support</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy-900 sm:text-5xl">Frequently asked questions</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-12">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} item={item} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-10 rounded-2xl bg-navy-50 p-6 text-center">
          <p className="font-display text-base font-semibold text-navy-900">Still have questions?</p>
          <p className="mt-1 text-sm text-navy-500">Our team is happy to help — reach out any time.</p>
          <Link to="/contact" className="mt-4 inline-block rounded-full bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
            Contact us
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
