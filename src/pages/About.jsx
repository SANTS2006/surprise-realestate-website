import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, HeartHandshake, Building2, Users, Award, MapPinned, User } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { listingsApi } from '../api/listings.js';
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal.jsx';

const VALUES = [
  { icon: Target, title: 'Our Mission', text: 'To make finding and managing a home simple, transparent, and stress-free — for tenants and property owners alike.' },
  { icon: Eye, title: 'Our Vision', text: 'To be the most trusted name in Sierra Leonean real estate, known for honesty, quality, and genuine care for our community.' },
  { icon: HeartHandshake, title: 'Our Values', text: 'Integrity in every transaction, respect for every tenant, and a standard of quality we would want for our own families.' },
];

// Founded this year — see the "Our journey" and stats sections below, which
// both derive from this rather than repeating the year as a magic number.
const FOUNDING_YEAR = 2026;

const TIMELINE = [
  { year: String(FOUNDING_YEAR), text: 'Surprise Real Estate is founded, with our digital tenant and owner portal and this public listings site built and launched from day one.' },
  { year: String(FOUNDING_YEAR), text: 'We open our doors at Kawa Street, Bo, and begin onboarding our first managed properties and tenants.' },
];

export default function About() {
  useDocumentTitle('About Us', 'Learn about Surprise Real Estate — our mission, values, and the team helping you find your next home.');
  const [agents, setAgents] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    listingsApi.agents().then((res) => setAgents(res.data)).catch(() => {});
    listingsApi.stats().then((res) => setStats(res.data)).catch(() => {});
  }, []);

  const yearsInBusiness = Math.max(1, new Date().getFullYear() - FOUNDING_YEAR + 1);
  // No "+" suffix — these are the real, current counts, not rounded-down
  // marketing figures.
  const STATS = stats && [
    { icon: Building2, value: String(stats.totalProperties), label: 'Properties managed' },
    { icon: Users, value: String(stats.tenants), label: 'Happy tenants' },
    { icon: Award, value: String(yearsInBusiness), label: 'Years in business' },
    { icon: MapPinned, value: String(stats.neighborhoods), label: 'Neighborhoods' },
  ];

  return (
    <div className="bg-white pb-20 pt-28">
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">About us</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy-900 sm:text-5xl">
            Real estate, done the right way.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-navy-500">
            Surprise Real Estate helps people find homes and helps owners manage their properties, from our office on Kawa Street, Bo. We believe renting a home shouldn't be complicated — so we've built our business around transparency, verified listings, and genuine service.
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80"
              alt="Our office team"
              loading="lazy"
              decoding="async"
              className="h-[380px] w-full object-cover"
            />
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VALUES.map((v) => (
            <StaggerItem key={v.title} className="rounded-2xl bg-navy-50 p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                <v.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{v.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Our journey</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-navy-900">How we got here</h2>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-8 border-l-2 border-navy-100 pl-8">
          {TIMELINE.map((t, i) => (
            <ScrollReveal key={t.text} delay={i * 0.05} className="relative">
              <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold-400 bg-white" />
              <p className="font-display text-lg font-semibold text-navy-900">{t.year}</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-600">{t.text}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {STATS && (
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy-950 px-6 py-14 sm:px-14">
          <StaggerGroup className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-gold-400">
                  <s.icon size={22} aria-hidden="true" />
                </span>
                <p className="mt-3 font-display text-3xl font-semibold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-navy-300">{s.label}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
      )}

      {agents.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Meet the team</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-navy-900">The people behind Surprise Real Estate</h2>
            </div>
            <Link to="/agents" className="text-sm font-semibold text-navy-700 hover:text-navy-900">Meet all agents →</Link>
          </ScrollReveal>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agents.slice(0, 4).map((a) => (
              <StaggerItem key={a.id} className="text-center">
                {a.photo ? (
                  <img src={a.photo} alt={a.name} loading="lazy" className="mx-auto h-32 w-32 rounded-full object-cover shadow-card" />
                ) : (
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-navy-50 shadow-card">
                    <User size={40} className="text-navy-300" aria-hidden="true" />
                  </div>
                )}
                <p className="mt-4 font-display text-base font-semibold text-navy-900">{a.name}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}
    </div>
  );
}
