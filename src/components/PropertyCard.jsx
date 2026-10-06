import { Link } from 'react-router-dom';
import { BedDouble, Bath, Ruler, MapPin, Home } from 'lucide-react';
import { formatCurrency, formatArea, listingKind } from '../utils/format.js';

export function PropertyCard({ listing }) {
  const image = listing.coverImage ?? listing.images?.[0];

  return (
    <Link
      to={`/listings/${listing.id}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-100">
        {image ? (
          <img
            src={image}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Home size={40} className="text-navy-300" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {listing.featured && (
            <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-900 shadow-sm">
              Featured
            </span>
          )}
          {listing.type && (
            <span className="ml-auto rounded-full bg-navy-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              {listing.type}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent px-4 py-3">
          <p className="font-display text-xl font-semibold text-white">
            {formatCurrency(listing.price, { rounded: true })}
            <span className="text-sm font-sans font-normal text-white/70"> /month</span>
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug text-navy-900">{listing.title}</h3>
          {listingKind(listing) && <p className="mt-0.5 text-xs font-medium text-gold-600">{listingKind(listing)}{listing.furnished ? ' · Furnished' : ''}</p>}
          {(listing.city || listing.neighborhood) && (
            <p className="mt-1 flex items-center gap-1 text-sm text-navy-500">
              <MapPin size={14} className="shrink-0" aria-hidden="true" />
              {listing.city ?? listing.neighborhood}
            </p>
          )}
        </div>

        {listing.amenities?.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {listing.amenities.slice(0, 3).map((a) => (
              <li key={a} className="max-w-full truncate rounded-full bg-navy-50 px-2.5 py-0.5 text-xs text-navy-600">{a}</li>
            ))}
            {listing.amenities.length > 3 && <li className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs text-navy-500">+{listing.amenities.length - 3} more</li>}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-navy-100 pt-3 text-sm text-navy-600">
          {listing.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={16} className="text-navy-400" aria-hidden="true" />
              {listing.bedrooms} bd
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Bath size={16} className="text-navy-400" aria-hidden="true" />
            {listing.bathrooms} ba
          </span>
          {listing.area != null && (
            <span className="flex items-center gap-1.5">
              <Ruler size={16} className="text-navy-400" aria-hidden="true" />
              {formatArea(listing.area)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
