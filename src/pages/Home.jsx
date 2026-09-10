import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Building2, Users2, MapPinned, ShieldCheck, Wallet, Headphones, Quote, ArrowRight, Home as HomeIcon } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { listingsApi } from '../api/listings.js';
import { PropertyCard } from '../components/PropertyCard.jsx';
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal.jsx';

const FEATURES = [
  { icon: ShieldCheck, title: 'Verified listings', text: 'Every property is inspected and verified by our team before it goes live — no surprises at move-in.' },
  { icon: Wallet, title: 'Transparent pricing', text: 'See the full monthly cost up front, with no hidden fees buried in the fine print.' },
  { icon: Headphones, title: 'Dedicated support', text: 'A named agent for every listing, reachable by phone, email, or in person at our office.' },
];

const TESTIMONIALS = [
  { name: 'Sarah Conteh', role: 'Tenant', quote: 'Surprise Real Estate made finding our family home effortless — the whole process from viewing to moving in took less than two weeks.' },
  { name: 'Mohamed Turay', role: 'Tenant', quote: "Responsive, honest, and professional. I've referred three friends and they've all had the same great experience." },
  { name: 'Isata Koroma', role: 'Property Owner', quote: 'They manage my property like it was their own. Rent collection and maintenance are handled without me lifting a finger.' },
];

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy-700">
        <Icon size={22} aria-hidden="true" />
      </span>
      <p className="mt-3 font-display text-3xl font-semibold text-navy-900">{value}</p>
      <p className="mt-1 text-sm text-navy-500">{label}</p>
    </div>
  );
}

export default function Home() {
  useDocumentTitle('Find Your Next Home');
  const navigate = useNavigate();
  const [search, setSearch] = useState({ neighborhood: '', type: '', maxPrice: '' });
  const [filterOptions, setFilterOptions] = useState({ cities: [], unitTypes: [] });
  const [stats, setStats] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      listingsApi.filterOptions(),
      listingsApi.stats(),
      listingsApi.list({ pageSize: 3, sort: 'newest' }),
    ])
      .then(([optionsRes, statsRes, listingsRes]) => {
        setFilterOptions(optionsRes.data);
        setStats(statsRes.data);
        setFeatured(listingsRes.data);
      })
      .catch(() => setError(true));
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.neighborhood) params.set('neighborhood', search.neighborhood);
    if (search.type) params.set('type', search.type);
    if (search.maxPrice) params.set('maxPrice', search.maxPrice);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-950">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/30" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
          <ScrollReveal y={16}>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-300">Find your place</p>
            <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Find your next home, without the guesswork.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
              Browse verified houses and apartments for rent, with real locations, transparent pricing, and a dedicated agent for every listing.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} y={16} className="mt-10">
            <form onSubmit={onSearch} className="flex flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 sm:border-r sm:border-navy-100">
                <MapPinned size={17} className="shrink-0 text-navy-400" aria-hidden="true" />
                <select
                  value={search.neighborhood}
                  onChange={(e) => setSearch((s) => ({ ...s, neighborhood: e.target.value }))}
                  className="w-full border-none bg-transparent text-sm text-navy-800 focus:outline-none focus:ring-0"
                >
                  <option value="">Any neighborhood</option>
                  {filterOptions.cities.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 sm:border-r sm:border-navy-100">
                <Building2 size={17} className="shrink-0 text-navy-400" aria-hidden="true" />
                <select
                  value={search.type}
                  onChange={(e) => setSearch((s) => ({ ...s, type: e.target.value }))}
                  className="w-full border-none bg-transparent text-sm text-navy-800 focus:outline-none focus:ring-0"
                >
                  <option value="">Any type</option>
                  {filterOptions.unitTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5">
                <Wallet size={17} className="shrink-0 text-navy-400" aria-hidden="true" />
                <select
                  value={search.maxPrice}
                  onChange={(e) => setSearch((s) => ({ ...s, maxPrice: e.target.value }))}
                  className="w-full border-none bg-transparent text-sm text-navy-800 focus:outline-none focus:ring-0"
                >
                  <option value="">Any budget</option>
                  <option value="1500">Up to Sle 1,500/mo</option>
                  <option value="2500">Up to Sle 2,500/mo</option>
                  <option value="4000">Up to Sle 4,000/mo</option>
                  <option value="10000">Up to Sle 10,000/mo</option>
                </select>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                <Search size={16} aria-hidden="true" />
                Search
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="border-b border-navy-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <StaggerGroup className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <StaggerItem><StatCard icon={Building2} value={stats.totalProperties} label="Properties" /></StaggerItem>
              <StaggerItem><StatCard icon={HomeIcon} value={stats.availableListings} label="Available now" /></StaggerItem>
              <StaggerItem><StatCard icon={MapPinned} value={stats.neighborhoods} label="Neighborhoods" /></StaggerItem>
              <StaggerItem><StatCard icon={Users2} value={stats.agents} label="Agents ready to help" /></StaggerItem>
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* Featured listings */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Handpicked for you</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">Newest listings</h2>
          </div>
          <Link to="/listings" className="flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900">
            View all listings <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </ScrollReveal>

        {error && <p className="mt-8 text-sm text-rose-600">Couldn't load listings right now — please try again shortly.</p>}
        {featured?.length === 0 && (
          <p className="mt-8 rounded-2xl bg-navy-50 px-6 py-10 text-center text-sm text-navy-500">
            No listings are available just yet — check back soon, or browse the full catalogue.
          </p>
        )}
        {featured && featured.length > 0 && (
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <StaggerItem key={listing.id}>
                <PropertyCard listing={listing} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      {/* Neighborhoods */}
      {filterOptions.cities.length > 0 && (
        <section className="bg-navy-50/60 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Explore</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">Browse by neighborhood</h2>
            </ScrollReveal>

            <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {filterOptions.cities.map((n) => (
                <StaggerItem key={n}>
                  <Link
                    to={`/listings?neighborhood=${encodeURIComponent(n)}`}
                    className="group flex flex-col items-center gap-2 rounded-2xl bg-white p-6 text-center shadow-card ring-1 ring-navy-100 transition-all hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-400 group-hover:text-navy-900">
                      <MapPinned size={18} aria-hidden="true" />
                    </span>
                    <p className="font-display text-base font-semibold text-navy-900">{n}</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Why Surprise Real Estate</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">A better way to rent</h2>
        </ScrollReveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                <f.icon size={24} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{f.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">Testimonials</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">What our tenants say</h2>
          </ScrollReveal>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <div className="flex h-full flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <Quote size={24} className="text-gold-400" aria-hidden="true" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-100">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-navy-300">{t.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 px-6 py-16 text-center sm:px-16">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Ready to find your next home?</h2>
          <p className="max-w-xl text-navy-200">
            Talk to one of our agents today, or browse the full catalogue of verified listings.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link to="/listings" className="rounded-full bg-gold-400 px-7 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-300">
              Browse listings
            </Link>
            <Link to="/contact" className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Contact an agent
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
