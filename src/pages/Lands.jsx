import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, LandPlot } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { landsApi } from '../api/lands.js';
import { LandCard } from '../components/LandCard.jsx';
import { LoadingState } from '../components/LoadingState.jsx';
import { StaggerGroup, StaggerItem } from '../components/ScrollReveal.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { LAND_TYPES } from '../utils/land.js';

const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'area-desc', label: 'Largest first' },
];
const KEYS = ['q', 'type', 'city', 'minPrice', 'maxPrice', 'minArea'];
const field = 'h-10 w-full rounded-lg border border-navy-200 bg-white px-3 text-sm text-navy-800 focus:border-navy-400 focus:outline-none';
const label = 'text-xs font-semibold uppercase tracking-wide text-navy-500';

// Debounced box: applies shortly after typing stops.
function Box({ value, onCommit, ...props }) {
  const [text, setText] = useState(value);
  useEffect(() => { setText(value); }, [value]);
  useEffect(() => {
    if (text === value) return undefined;
    const t = setTimeout(() => onCommit(text), 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return <input value={text} onChange={(e) => setText(e.target.value)} {...props} />;
}

export default function Lands() {
  useDocumentTitle('Lands for sale', 'Browse lands for sale — filter by type, location, price and size, see photos and videos, and buy online.');
  const [searchParams, setSearchParams] = useSearchParams();
  const [lands, setLands] = useState(null);
  const [meta, setMeta] = useState({ page: 1, pageSize: 12, total: 0, totalPages: 1 });
  const [options, setOptions] = useState({ types: [], cities: [] });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const values = Object.fromEntries(KEYS.map((k) => [k, searchParams.get(k) ?? '']));
  const sort = searchParams.get('sort') ?? 'newest';
  const query = searchParams.toString();
  const active = KEYS.filter((k) => values[k]).length;

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next, { replace: true });
    setPage(1);
  };

  useEffect(() => { landsApi.filterOptions().then((r) => setOptions(r.data)).catch(() => {}); }, []);

  const load = useCallback(() => {
    setError(null);
    const params = Object.fromEntries(new URLSearchParams(query));
    landsApi.list({ ...params, page, pageSize: 12, sort: params.sort ?? 'newest' })
      .then((res) => { setLands(res.data); setMeta(res.meta); })
      .catch((err) => setError(err.message));
  }, [page, query]);
  useEffect(() => { load(); }, [load]);

  return (
    <div className="bg-navy-50/40 pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">Lands for sale</h1>
          <p className="text-sm text-navy-500">{meta.total} {meta.total === 1 ? 'land' : 'lands'} available</p>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-4 shadow-card ring-1 ring-navy-100 sm:p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <label htmlFor="land-q" className={label}>Search</label>
              <div className="relative mt-1.5">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" aria-hidden="true" />
                <Box id="land-q" type="search" value={values.q} onCommit={(v) => setFilter('q', v)} placeholder="Title, town, area…" className={`${field} pl-9`} />
              </div>
            </div>
            <div>
              <label htmlFor="land-type" className={label}>Type</label>
              <select id="land-type" value={values.type} onChange={(e) => setFilter('type', e.target.value)} className={`${field} mt-1.5`}>
                <option value="">All types</option>
                {LAND_TYPES.filter((t) => options.types.includes(t.value)).map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="land-city" className={label}>Town / city</label>
              <select id="land-city" value={values.city} onChange={(e) => setFilter('city', e.target.value)} className={`${field} mt-1.5`}>
                <option value="">Anywhere</option>
                {options.cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <p className={label}>Price</p>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <Box type="number" min="0" aria-label="Minimum price" value={values.minPrice} onCommit={(v) => setFilter('minPrice', v)} placeholder="Min" className={field} />
                <Box type="number" min="0" aria-label="Maximum price" value={values.maxPrice} onCommit={(v) => setFilter('maxPrice', v)} placeholder="Max" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="land-sort" className={label}>Sort</label>
              <select id="land-sort" value={sort} onChange={(e) => setFilter('sort', e.target.value === 'newest' ? '' : e.target.value)} className={`${field} mt-1.5`}>
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          {active > 0 && (
            <button type="button" onClick={() => { setSearchParams({}, { replace: true }); setPage(1); }} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900">
              <X size={14} aria-hidden="true" />Clear filters
            </button>
          )}
        </div>

        <div className="mt-8">
          {error && <div className="rounded-2xl bg-white py-16 text-center shadow-card ring-1 ring-navy-100"><p className="text-sm text-rose-600">{error}</p></div>}
          {!error && lands === null && <LoadingState label="Loading lands…" />}
          {!error && lands?.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-20 text-center shadow-card ring-1 ring-navy-100">
              <LandPlot size={32} className="text-navy-300" aria-hidden="true" />
              <p className="font-display text-lg font-semibold text-navy-900">{active > 0 ? 'No lands match your filters' : 'No lands are for sale just yet'}</p>
              <p className="text-sm text-navy-500">{active > 0 ? 'Try widening your search.' : 'Check back soon — new lands are added regularly.'}</p>
            </div>
          )}
          {!error && lands?.length > 0 && (
            <>
              <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {lands.map((land) => <StaggerItem key={land.id}><LandCard land={land} /></StaggerItem>)}
              </StaggerGroup>
              <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
