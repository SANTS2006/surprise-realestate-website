import { Link } from 'react-router-dom';
import { MapPin, Ruler, LandPlot } from 'lucide-react';
import { formatCurrency } from '../utils/format.js';
import { landTypeLabel, formatLandArea } from '../utils/land.js';

export function LandCard({ land }) {
  return (
    <Link
      to={`/lands/${land.id}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-100">
        {land.coverImage ? (
          <img src={land.coverImage} alt={land.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center"><LandPlot size={40} className="text-navy-300" aria-hidden="true" /></div>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">{landTypeLabel(land.landType)}</span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent px-4 py-3">
          <p className="font-display text-xl font-semibold text-white">{formatCurrency(land.price, { rounded: true })}</p>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug text-navy-900">{land.title}</h3>
          {(land.city || land.region) && (
            <p className="mt-1 flex items-center gap-1 text-sm text-navy-500">
              <MapPin size={14} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{[land.city, land.region].filter(Boolean).join(', ')}</span>
            </p>
          )}
        </div>
        {land.features?.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {land.features.slice(0, 3).map((f) => <li key={f} className="max-w-full truncate rounded-full bg-navy-50 px-2.5 py-0.5 text-xs text-navy-600">{f}</li>)}
            {land.features.length > 3 && <li className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs text-navy-500">+{land.features.length - 3} more</li>}
          </ul>
        )}
        <div className="mt-auto flex items-center gap-1.5 border-t border-navy-100 pt-3 text-sm text-navy-600">
          <Ruler size={16} className="text-navy-400" aria-hidden="true" />
          {formatLandArea(land.area, land.areaUnit)}
        </div>
      </div>
    </Link>
  );
}
