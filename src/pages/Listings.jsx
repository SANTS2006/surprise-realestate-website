import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, MapIcon, SlidersHorizontal, X, SearchX } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { listings, NEIGHBORHOODS, PROPERTY_TYPES } from '../data/listings.js';
import { PropertyCard } from '../components/PropertyCard.jsx';
import { MapView } from '../components/MapView.jsx';
import { StaggerGroup, StaggerItem } from '../components/ScrollReveal.jsx';

const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

// Declared at module scope (not inside Listings) so it isn't re-created —
// and every filter input's focus/state reset — on every render.
function FilterControls({ neighborhood, type, maxPrice, minBeds, activeFilterCount, setFilter, clearFilters }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-navy-500">Neighborhood</label>
        <select value={neighborhood} onChange={(e) => setFilter('neighborhood', e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
          <option value="">All neighborhoods</option>
          {NEIGHBORHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-navy-500">Property type</label>
        <select value={type} onChange={(e) => setFilter('type', e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
          <option value="">All types</option>
          {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-navy-500">Max monthly rent</label>
        <select value={maxPrice} onChange={(e) => setFilter('maxPrice', e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
          <option value="">Any budget</option>
          <option value="1500">Up to Sle 1,500</option>
          <option value="2500">Up to Sle 2,500</option>
          <option value="4000">Up to Sle 4,000</option>
          <option value="10000">Up to Sle 10,000</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-navy-500">Minimum bedrooms</label>
        <select value={minBeds} onChange={(e) => setFilter('minBeds', e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
        </select>
      </div>
      {activeFilterCount > 0 && (
        <button type="button" onClick={clearFilters} className="flex items-center justify-center gap-1.5 rounded-lg border border-navy-200 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50">
          <X size={14} aria-hidden="true" />
          Clear filters
        </button>
      )}
    </div>
  );
}

export default function Listings() {
  useDocumentTitle('Listings');
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const neighborhood = searchParams.get('neighborhood') ?? '';
  const type = searchParams.get('type') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const minBeds = searchParams.get('minBeds') ?? '';
  const sort = searchParams.get('sort') ?? 'newest';

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => setSearchParams({}, { replace: true });

  const filtered = useMemo(() => {
    let rows = listings.filter((l) => {
      if (neighborhood && l.neighborhood !== neighborhood) return false;
      if (type && l.type !== type) return false;
      if (maxPrice && l.price > Number(maxPrice)) return false;
      if (minBeds && l.bedrooms < Number(minBeds)) return false;
      return true;
    });
    if (sort === 'price-asc') rows = [...rows].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') rows = [...rows].sort((a, b) => b.price - a.price);
    return rows;
  }, [neighborhood, type, maxPrice, minBeds, sort]);

  const activeFilterCount = [neighborhood, type, maxPrice, minBeds].filter(Boolean).length;
  const filterProps = { neighborhood, type, maxPrice, minBeds, activeFilterCount, setFilter, clearFilters };

  return (
    <div className="bg-navy-50/40 pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            {neighborhood ? `Listings in ${neighborhood}` : 'All listings'}
          </h1>
          <p className="text-sm text-navy-500">{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} available</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl bg-white p-5 shadow-card ring-1 ring-navy-100">
              <h2 className="flex items-center gap-2 font-display text-base font-semibold text-navy-900">
                <SlidersHorizontal size={16} aria-hidden="true" />
                Filters
              </h2>
              <div className="mt-5"><FilterControls {...filterProps} /></div>
            </div>
          </aside>

          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 lg:hidden"
              >
                <SlidersHorizontal size={15} aria-hidden="true" />
                Filters {activeFilterCount > 0 && <span className="rounded-full bg-navy-900 px-1.5 text-xs text-white">{activeFilterCount}</span>}
              </button>

              <div className="ml-auto flex items-center gap-3">
                <select value={sort} onChange={(e) => setFilter('sort', e.target.value)} className="h-10 rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
                  {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                <div className="flex rounded-lg border border-navy-200 bg-white p-1">
                  <button type="button" onClick={() => setView('grid')} aria-label="Grid view" className={`rounded-md p-1.5 ${view === 'grid' ? 'bg-navy-900 text-white' : 'text-navy-500'}`}>
                    <LayoutGrid size={16} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => setView('map')} aria-label="Map view" className={`rounded-md p-1.5 ${view === 'map' ? 'bg-navy-900 text-white' : 'text-navy-500'}`}>
                    <MapIcon size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-6">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-20 text-center shadow-card ring-1 ring-navy-100">
                  <SearchX size={32} className="text-navy-300" aria-hidden="true" />
                  <p className="font-display text-lg font-semibold text-navy-900">No listings match your filters</p>
                  <p className="text-sm text-navy-500">Try widening your search or clearing a filter.</p>
                  <button type="button" onClick={clearFilters} className="mt-2 rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-800">
                    Clear filters
                  </button>
                </div>
              ) : view === 'grid' ? (
                <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((listing) => (
                    <StaggerItem key={listing.id}>
                      <PropertyCard listing={listing} />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              ) : (
                <MapView listings={filtered} height={600} className="overflow-hidden rounded-2xl shadow-card ring-1 ring-navy-100" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${filtersOpen ? '' : 'pointer-events-none'}`} aria-hidden={!filtersOpen}>
        <div
          className={`absolute inset-0 bg-navy-950/50 transition-opacity duration-300 ${filtersOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setFiltersOpen(false)}
        />
        <div className={`absolute inset-y-0 right-0 w-full max-w-xs overflow-y-auto bg-white p-5 shadow-2xl transition-transform duration-300 ${filtersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-navy-900">Filters</h2>
            <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="rounded-lg p-1.5 text-navy-500 hover:bg-navy-50">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-5"><FilterControls {...filterProps} /></div>
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="mt-6 w-full rounded-full bg-navy-900 py-2.5 text-sm font-semibold text-white"
          >
            Show {filtered.length} results
          </button>
        </div>
      </div>
    </div>
  );
}
