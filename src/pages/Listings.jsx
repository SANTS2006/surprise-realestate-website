import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, MapIcon, SlidersHorizontal, X, SearchX, Search, Check } from 'lucide-react';
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

const KINDS = [
  { value: '', label: 'Everything' },
  { value: 'whole', label: 'Whole property', hint: 'A house, villa or shop on its own' },
  { value: 'building', label: 'Whole building', hint: 'A building in a compound' },
  { value: 'unit', label: 'Unit or room', hint: 'A flat, room or shop in a building' },
];

const FILTER_KEYS = ['q', 'kind', 'neighborhood', 'type', 'minPrice', 'maxPrice', 'minBeds', 'minBaths', 'furnished', 'amenities'];

const selectClass = 'mt-1.5 h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none';
const labelClass = 'text-xs font-semibold uppercase tracking-wide text-navy-500';

// A text/number box that applies its value shortly after typing stops, so the
// results update as you type without a request on every keystroke.
function DebouncedInput({ value, onCommit, ...props }) {
  const [text, setText] = useState(value);
  const first = useRef(true);
  useEffect(() => { setText(value); }, [value]);
  useEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    if (text === value) return undefined;
    const t = setTimeout(() => onCommit(text), 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return <input value={text} onChange={(e) => setText(e.target.value)} {...props} />;
}

// Declared at module scope (not inside Listings) so it isn't re-created —
// and every filter input's focus/state reset — on every render.
function FilterControls({ values, options, activeFilterCount, setFilter, clearFilters }) {
  const id = useId();
  const chosenAmenities = values.amenities ? values.amenities.split(',') : [];
  const toggleAmenity = (name) => {
    const next = new Set(chosenAmenities);
    if (next.has(name)) next.delete(name); else next.add(name);
    setFilter('amenities', [...next].join(','));
  };
  const kinds = options.kinds ?? {};
  const bedChoices = Array.from({ length: Math.min(Math.max(options.maxBedrooms ?? 5, 1), 8) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor={`${id}-q`} className={labelClass}>Search</label>
        <div className="relative mt-1.5">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" aria-hidden="true" />
          <DebouncedInput id={`${id}-q`} type="search" value={values.q} onCommit={(v) => setFilter('q', v)} placeholder="Name, street, area…" className="h-10 w-full rounded-lg border border-navy-200 bg-white pl-9 pr-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none" />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>What are you looking for?</legend>
        <div className="mt-1.5 flex flex-col gap-1.5">
          {KINDS.filter((k) => !k.value || kinds[k.value] > 0 || values.kind === k.value).map((k) => {
            const on = values.kind === k.value;
            return (
              <button
                key={k.value || 'all'}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter('kind', k.value)}
                className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${on ? 'border-navy-800 bg-navy-900 text-white' : 'border-navy-200 bg-white text-navy-700 hover:bg-navy-50'}`}
              >
                <span className="min-w-0">
                  <span className="block font-medium">{k.label}</span>
                  {k.hint && <span className={`block truncate text-xs ${on ? 'text-white/70' : 'text-navy-400'}`}>{k.hint}</span>}
                </span>
                {k.value && kinds[k.value] != null && <span className={`shrink-0 text-xs ${on ? 'text-white/80' : 'text-navy-400'}`}>{kinds[k.value]}</span>}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-neighborhood`} className={labelClass}>Neighborhood</label>
        <select id={`${id}-neighborhood`} value={values.neighborhood} onChange={(e) => setFilter('neighborhood', e.target.value)} className={selectClass}>
          <option value="">All neighborhoods</option>
          {(options.cities ?? []).map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-type`} className={labelClass}>Property type</label>
        <select id={`${id}-type`} value={values.type} onChange={(e) => setFilter('type', e.target.value)} className={selectClass}>
          <option value="">All types</option>
          {(options.unitTypes ?? []).map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <p className={labelClass}>Monthly rent</p>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <DebouncedInput type="number" min="0" inputMode="numeric" aria-label="Minimum monthly rent" value={values.minPrice} onCommit={(v) => setFilter('minPrice', v)} placeholder={options.priceRange?.min != null ? `Min ${Math.floor(options.priceRange.min)}` : 'Min'} className="h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none" />
          <DebouncedInput type="number" min="0" inputMode="numeric" aria-label="Maximum monthly rent" value={values.maxPrice} onCommit={(v) => setFilter('maxPrice', v)} placeholder={options.priceRange?.max != null ? `Max ${Math.ceil(options.priceRange.max)}` : 'Max'} className="h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${id}-minBeds`} className={labelClass}>Bedrooms</label>
          <select id={`${id}-minBeds`} value={values.minBeds} onChange={(e) => setFilter('minBeds', e.target.value)} className={selectClass}>
            <option value="">Any</option>
            {bedChoices.map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-minBaths`} className={labelClass}>Bathrooms</label>
          <select id={`${id}-minBaths`} value={values.minBaths} onChange={(e) => setFilter('minBaths', e.target.value)} className={selectClass}>
            <option value="">Any</option>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-navy-700">
        <input type="checkbox" checked={values.furnished === 'true'} onChange={(e) => setFilter('furnished', e.target.checked ? 'true' : '')} className="h-4 w-4 rounded border-navy-300 text-navy-800 focus:ring-navy-400" />
        Furnished only
      </label>

      {(options.amenities ?? []).length > 0 && (
        <fieldset>
          <legend className={labelClass}>Facilities</legend>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {options.amenities.map((name) => {
              const on = chosenAmenities.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleAmenity(name)}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${on ? 'border-navy-800 bg-navy-900 text-white' : 'border-navy-200 bg-white text-navy-600 hover:bg-navy-50'}`}
                >
                  {on && <Check size={12} aria-hidden="true" />}
                  {name}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

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
  useDocumentTitle('Listings', 'Browse all available houses, buildings and apartments for rent — filter by neighborhood, kind of property, budget, bedrooms, bathrooms and facilities.');
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [listings, setListings] = useState(null);
  const [meta, setMeta] = useState({ page: 1, pageSize: 20, total: 0, totalPages: 1 });
  const [filterOptions, setFilterOptions] = useState({ cities: [], unitTypes: [], amenities: [], kinds: {} });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const values = Object.fromEntries(FILTER_KEYS.map((k) => [k, searchParams.get(k) ?? '']));
  const sort = searchParams.get('sort') ?? 'newest';
  const neighborhood = values.neighborhood;

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

  const query = searchParams.toString();
  const load = useCallback(() => {
    setError(null);
    const params = Object.fromEntries(new URLSearchParams(query));
    listingsApi.list({ ...params, page, pageSize: 21, sort: params.sort ?? 'newest' })
      .then((res) => { setListings(res.data); setMeta(res.meta); })
      .catch((err) => setError(err.message));
  }, [page, query]);

  useEffect(() => { load(); }, [load]);

  const activeFilterCount = FILTER_KEYS.filter((k) => values[k]).length;
  const filterProps = { values, options: filterOptions, activeFilterCount, setFilter, clearFilters };

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
