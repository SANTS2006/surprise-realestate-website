import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Check, Navigation } from 'lucide-react';
import { SITE } from '../config/site.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { listingsApi } from '../api/listings.js';
import { MapView } from '../components/MapView.jsx';
import { ScrollReveal } from '../components/ScrollReveal.jsx';

const OFFICE = SITE.office;

export default function Contact() {
  useDocumentTitle('Contact Us', 'Get in touch with Surprise Real Estate — ask about a listing, request a viewing, or reach our team directly.');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await listingsApi.contact(form);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <div className="bg-white pb-20 pt-28">
      <section className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Get in touch</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy-900 sm:text-5xl">We'd love to hear from you</h1>
          <p className="mt-4 text-lg leading-relaxed text-navy-500">
            Questions about a listing, interested in listing your own property, or just want to say hello — reach out any way that suits you.
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-2xl bg-navy-50 p-6 sm:p-8">
              {status === 'sent' ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                    <Check size={26} aria-hidden="true" />
                  </span>
                  <p className="font-display text-xl font-semibold text-navy-900">Message sent</p>
                  <p className="text-sm text-navy-500">Thanks for reaching out — our team will respond within one business day.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-navy-700">First name</label>
                      <input required value={form.firstName} onChange={onChange('firstName')} className="mt-1.5 h-11 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm focus:border-navy-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-navy-700">Last name</label>
                      <input required value={form.lastName} onChange={onChange('lastName')} className="mt-1.5 h-11 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm focus:border-navy-400 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy-700">Email address</label>
                    <input required type="email" value={form.email} onChange={onChange('email')} className="mt-1.5 h-11 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm focus:border-navy-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy-700">Phone number</label>
                    <input required type="tel" value={form.phone} onChange={onChange('phone')} className="mt-1.5 h-11 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm focus:border-navy-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy-700">How can we help?</label>
                    <textarea required rows={4} value={form.message} onChange={onChange('message')} className="mt-1.5 w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm focus:border-navy-400 focus:outline-none" />
                  </div>
                  {status === 'error' && <p className="text-sm text-rose-600">{error}</p>}
                  <button type="submit" disabled={status === 'sending'} className="mt-1 rounded-full bg-navy-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60">
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: MapPin, title: 'Visit us', text: SITE.address, href: SITE.mapUrl },
                { icon: Phone, title: 'Call us', text: SITE.phone, href: `tel:${SITE.phoneTel}` },
                { icon: Mail, title: 'Email us', text: SITE.email, href: `mailto:${SITE.email}` },
                { icon: Clock, title: 'Office hours', text: 'Mon–Fri, 8:30am–5:30pm' },
              ].map((c) => (
                <div key={c.title} className="rounded-xl bg-white p-5 shadow-card ring-1 ring-navy-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                    <c.icon size={18} aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-navy-900">{c.title}</p>
                  {c.href ? (
                    <a href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="break-words text-sm text-navy-500 hover:text-navy-900">{c.text}</a>
                  ) : (
                    <p className="text-sm text-navy-500">{c.text}</p>
                  )}
                </div>
              ))}
            </div>
            <MapView single={OFFICE} height={280} directionsUrl={SITE.directionsUrl} className="overflow-hidden rounded-2xl ring-1 ring-navy-100" />
            <a
              href={SITE.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-300"
            >
              <Navigation size={16} aria-hidden="true" />
              Get directions to {SITE.street}, {SITE.city}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
