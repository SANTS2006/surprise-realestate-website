import { useCallback, useEffect, useId, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, MapIcon, SlidersHorizontal, X, SearchX } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { listingsApi } from '../api/listings.js';
import { PropertyCard } from '../components/PropertyCard.jsx';
import { MapView } from '../components/MapView.jsx';
import { LoadingState } from '../components/LoadingState.jsx';
import { StaggerGroup, StaggerItem } from '../components/ScrollReveal.jsx';
import { Pagination } from '../components/Pagination.jsx';

const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

// Declared at module scope (not inside Listings) so it isn't re-created —
// and every filter input's focus/state reset — on every render.
function FilterControls({ neighborhood, type, maxPrice, minBeds, cities, unitTypes, activeFilterCount, setFilter, clearFilters }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor={`${id}-neighborhood`} className="text-xs font-semibold uppercase tracking-wide text-navy-500">Neighborhood</label>
        <select id={`${id}-neighborhood`} value={neighborhood} onChange={(e) => setFilter('neighborhood', e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
          <option value="">All neighborhoods</option>
          {cities.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-type`} className="text-xs font-semibold uppercase tracking-wide text-navy-500">Property type</label>
        <select id={`${id}-type`} value={type} onChange={(e) => setFilter('type', e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
          <option value="">All types</option>
          {unitTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-maxPrice`} className="text-xs font-semibold uppercase tracking-wide text-navy-500">Max monthly rent</label>
        <select id={`${id}-maxPrice`} value={maxPrice} onChange={(e) => setFilter('maxPrice', e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
          <option value="">Any budget</option>
          <option value="1500">Up to Sle 1,500</option>
          <option value="2500">Up to Sle 2,500</option>
          <option value="4000">Up to Sle 4,000</option>
          <option value="10000">Up to Sle 10,000</option>
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-minBeds`} className="text-xs font-semibold uppercase tracking-wide text-navy-500">Minimum bedrooms</label>
        <select id={`${id}-minBeds`} value={minBeds} onChange={(e) => setFilter('minBeds', e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
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
  useDocumentTitle('Listings', 'Browse all available houses and apartments for rent — filter by neighborhood, property type, budget, and bedrooms.');
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [listings, setListings] = useState(null);
  const [meta, setMeta] = useState({ page: 1, pageSize: 20, total: 0, totalPages: 1 });
  const [filterOptions, setFilterOptions] = useState({ cities: [], unitTypes: [] });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const neighborhood = searchParams.get('neighborhood') ?? '';
  const type = searchParams.get('type') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const minBeds = searchParams.get('minBeds') ?? '';
  const sort = searchParams.get('sort') ?? 'newest';

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next, { replace: true });
    setPage(1);
  };

  const clearFilters = () => { setSearchParams({}, { replace: true }); setPage(1); };

  useEffect(() => {
    listingsApi.filterOptions().then((res) => setFilterOptions(res.data)).catch(() => {});
  }, []);

  const load = useCallback(() => {
    setError(null);
    listingsApi.list({ page, pageSize: 21, neighborhood, type, maxPrice, minBeds, sort })
      .then((res) => { setListings(res.data); setMeta(res.meta); })
      .catch((err) => setError(err.message));
  }, [page, neighborhood, type, maxPrice, minBeds, sort]);

  useEffect(() => { load(); }, [load]);

  const activeFilterCount = [neighborhood, type, maxPrice, minBeds].filter(Boolean).length;
  const filterProps = { neighborhood, type, maxPrice, minBeds, cities: filterOptions.cities, unitTypes: filterOptions.unitTypes, activeFilterCount, setFilter, clearFilters };

  return (
    <div className="bg-navy-50/40 pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            {neighborhood ? `Listings in ${neighborhood}` : 'All listings'}
          </h1>
          <p className="text-sm text-navy-500">{meta.total} {meta.total === 1 ? 'property' : 'properties'} available</p>
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
                <label htmlFor="listings-sort" className="sr-only">Sort listings</label>
                <select id="listings-sort" value={sort} onChange={(e) => setFilter('sort', e.target.value)} className="h-10 rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none">
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
              {error && (
                <div className="rounded-2xl bg-white py-16 text-center shadow-card ring-1 ring-navy-100">
                  <p className="text-sm text-rose-600">{error}</p>
                </div>
              )}
              {!error && listings === null && <LoadingState label="Loading listings…" />}
              {!error && listings?.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-20 text-center shadow-card ring-1 ring-navy-100">
                  <SearchX size={32} className="text-navy-300" aria-hidden="true" />
                  <p className="font-display text-lg font-semibold text-navy-900">
                    {activeFilterCount > 0 ? 'No listings match your filters' : 'No listings are available just yet'}
                  </p>
                  <p className="text-sm text-navy-500">
                    {activeFilterCount > 0 ? 'Try widening your search or clearing a filter.' : 'Check back soon — new listings go up regularly.'}
                  </p>
                  {activeFilterCount > 0 && (
                    <button type="button" onClick={clearFilters} className="mt-2 rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-800">
                      Clear filters
                    </button>
                  )}
                </div>
              ) : null}
              {!error && listings && listings.length > 0 && view === 'grid' && (
                <>
                  <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {listings.map((listing) => (
                      <StaggerItem key={listing.id}>
                        <PropertyCard listing={listing} />
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                  <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={setPage} />
                </>
              )}
              {!error && listings && listings.length > 0 && view === 'map' && (
                <MapView listings={listings} height={600} className="overflow-hidden rounded-2xl shadow-card ring-1 ring-navy-100" />
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
            Show {meta.total} results
          </button>
        </div>
      </div>
    </div>
  );
}
