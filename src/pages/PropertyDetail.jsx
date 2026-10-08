import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  BedDouble, Bath, Ruler, MapPin, Calendar, Phone, Mail, Check, Wallet, Sofa, Layers, Building2, ShoppingCart, KeyRound, FileSignature,
  ChevronLeft, ChevronRight, ArrowLeft, Home,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useStructuredData } from '../hooks/useStructuredData.js';
import { listingsApi } from '../api/listings.js';
import { dealUrl } from '../config/env.js';
import { formatCurrency, formatPrice, formatArea, listingKind } from '../utils/format.js';
import { MapView } from '../components/MapView.jsx';
import { LoadingState } from '../components/LoadingState.jsx';
import { PropertyCard } from '../components/PropertyCard.jsx';
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal.jsx';

function Gallery({ images, title }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl bg-navy-100">
        <Home size={48} className="text-navy-300" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-navy-100">
        <img src={images[active]} alt={`${title} — photo ${active + 1}`} className="h-full w-full object-cover" />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-md hover:bg-white"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setActive((i) => (i + 1) % images.length)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-md hover:bg-white"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/70 px-3 py-1 text-xs font-medium text-white">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1} of ${images.length}`}
              aria-current={active === i}
              className={`aspect-[4/3] overflow-hidden rounded-lg ring-2 transition-all ${active === i ? 'ring-gold-400' : 'ring-transparent opacity-70 hover:opacity-100'}`}
            >
              <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InquiryForm({ listing }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    message: `Hi, I'm interested in ${listing.title}. Is it still available?`,
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await listingsApi.inquire(listing.id, form);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-navy-50 p-6 text-center">
        <Check size={28} className="text-navy-700" aria-hidden="true" />
        <p className="font-display text-base font-semibold text-navy-900">Thanks — we'll be in touch shortly.</p>
        <p className="text-sm text-navy-500">
          {listing.agent ? `${listing.agent.name} usually responds within a few hours.` : "Our team usually responds within a few hours."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="inquiry-firstName" className="sr-only">First name</label>
          <input id="inquiry-firstName" required placeholder="First name" value={form.firstName} onChange={onChange('firstName')} className="h-10 w-full rounded-lg border border-navy-200 px-3 text-sm focus:border-navy-400 focus:outline-none" />
        </div>
        <div>
          <label htmlFor="inquiry-lastName" className="sr-only">Last name</label>
          <input id="inquiry-lastName" required placeholder="Last name" value={form.lastName} onChange={onChange('lastName')} className="h-10 w-full rounded-lg border border-navy-200 px-3 text-sm focus:border-navy-400 focus:outline-none" />
        </div>
      </div>
      <label htmlFor="inquiry-email" className="sr-only">Email address</label>
      <input id="inquiry-email" required type="email" placeholder="Email address" value={form.email} onChange={onChange('email')} className="h-10 rounded-lg border border-navy-200 px-3 text-sm focus:border-navy-400 focus:outline-none" />
      <label htmlFor="inquiry-phone" className="sr-only">Phone number</label>
      <input id="inquiry-phone" required type="tel" placeholder="Phone number" value={form.phone} onChange={onChange('phone')} className="h-10 rounded-lg border border-navy-200 px-3 text-sm focus:border-navy-400 focus:outline-none" />
      <label htmlFor="inquiry-message" className="sr-only">Message</label>
      <textarea
        id="inquiry-message"
        required
        rows={3}
        value={form.message}
        onChange={onChange('message')}
        className="rounded-lg border border-navy-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none"
      />
      {status === 'error' && <p className="text-sm text-rose-600">{error}</p>}
      <button type="submit" disabled={status === 'sending'} className="mt-1 rounded-full bg-navy-900 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Request a viewing'}
      </button>
    </form>
  );
}

export default function PropertyDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [similar, setSimilar] = useState([]);

  const description = listing
    ? `${listing.title} in ${listing.city ?? 'a great location'} — ${listing.bedrooms > 0 ? `${listing.bedrooms} bed, ` : ''}${listing.bathrooms} bath, ${formatPrice(listing)}.`
    : undefined;
  useDocumentTitle(listing ? listing.title : 'Listing', description);
  useStructuredData(listing && {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: listing.title,
    description: listing.description || description,
    numberOfRooms: listing.bedrooms || undefined,
    numberOfBathroomsTotal: listing.bathrooms || undefined,
    floorSize: listing.area != null ? { '@type': 'QuantitativeValue', value: listing.area, unitCode: 'MTK' } : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.city,
      addressRegion: listing.region || undefined,
      addressCountry: listing.country,
    },
    ...(listing.lat != null && listing.lng != null
      ? { geo: { '@type': 'GeoCoordinates', latitude: listing.lat, longitude: listing.lng } }
      : {}),
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'SLE',
      availability: 'https://schema.org/InStock',
    },
  });

  useEffect(() => {
    setListing(null);
    setNotFound(false);
    listingsApi.get(id)
      .then((res) => {
        setListing(res.data);
        return listingsApi.list({ neighborhood: res.data.city, pageSize: 4 }).catch(() => null);
      })
      .then((similarRes) => {
        if (similarRes) setSimilar(similarRes.data.filter((l) => l.id !== id).slice(0, 3));
      })
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <Navigate to="/listings" replace />;
  if (!listing) return <div className="pb-20 pt-28"><LoadingState label="Loading listing…" /></div>;

  return (
    <div className="bg-white pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/listings" className="flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-800">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to listings
        </Link>

        <ScrollReveal className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {listing.type && <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">{listing.type}</span>}
              {listingKind(listing) && <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-navy-900">{listingKind(listing)}</span>}
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">{listing.title}</h1>
            {(listing.city || listing.region) && (
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-navy-500">
                <MapPin size={15} aria-hidden="true" />
                {[listing.city, listing.region].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
          <p className="font-display text-3xl font-semibold text-navy-900 sm:text-right">
            {formatPrice(listing)}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mt-8">
          <Gallery images={listing.images} title={listing.title} />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-10">
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl bg-navy-50 p-5 sm:grid-cols-3 sm:p-6 lg:grid-cols-4">
                {listing.bedrooms > 0 && (
                  <div className="flex items-center gap-2.5">
                    <BedDouble size={20} className="text-navy-500" aria-hidden="true" />
                    <div><p className="font-semibold text-navy-900">{listing.bedrooms}</p><p className="text-xs text-navy-500">Bedrooms</p></div>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <Bath size={20} className="text-navy-500" aria-hidden="true" />
                  <div><p className="font-semibold text-navy-900">{listing.bathrooms}</p><p className="text-xs text-navy-500">Bathrooms</p></div>
                </div>
                {listing.area != null && (
                  <div className="flex items-center gap-2.5">
                    <Ruler size={20} className="text-navy-500" aria-hidden="true" />
                    <div><p className="font-semibold text-navy-900">{formatArea(listing.area)}</p><p className="text-xs text-navy-500">Floor area</p></div>
                  </div>
                )}
                {listing.deposit != null && (
                  <div className="flex items-center gap-2.5">
                    <Wallet size={20} className="text-navy-500" aria-hidden="true" />
                    <div><p className="font-semibold text-navy-900">{formatCurrency(listing.deposit, { rounded: true })}</p><p className="text-xs text-navy-500">Deposit</p></div>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <Sofa size={20} className="text-navy-500" aria-hidden="true" />
                  <div><p className="font-semibold text-navy-900">{listing.furnished ? 'Furnished' : 'Unfurnished'}</p><p className="text-xs text-navy-500">Furnishing</p></div>
                </div>
                {listing.floor != null && (
                  <div className="flex items-center gap-2.5">
                    <Layers size={20} className="text-navy-500" aria-hidden="true" />
                    <div><p className="font-semibold text-navy-900">{listing.floor}</p><p className="text-xs text-navy-500">Floor / level</p></div>
                  </div>
                )}
                {listing.buildingName && (
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Building2 size={20} className="shrink-0 text-navy-500" aria-hidden="true" />
                    <div className="min-w-0"><p className="truncate font-semibold text-navy-900">{listing.buildingName}</p><p className="text-xs text-navy-500">Building</p></div>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {listing.description && (
              <ScrollReveal>
                <h2 className="font-display text-xl font-semibold text-navy-900">About this property</h2>
                <p className="mt-3 leading-relaxed text-navy-600">{listing.description}</p>
                {listing.yearBuilt && (
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-navy-500">
                    <Calendar size={15} aria-hidden="true" />
                    Built in {listing.yearBuilt}
                  </p>
                )}
              </ScrollReveal>
            )}

            {listing.amenities.length > 0 && (
              <ScrollReveal>
                <h2 className="font-display text-xl font-semibold text-navy-900">Facilities</h2>
                <StaggerGroup className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {listing.amenities.map((a) => (
                    <StaggerItem key={a} className="flex items-center gap-2.5 text-sm text-navy-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-navy-700">
                        <Check size={13} aria-hidden="true" />
                      </span>
                      {a}
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </ScrollReveal>
            )}

            <ScrollReveal>
              <h2 className="font-display text-xl font-semibold text-navy-900">Location</h2>
              {(listing.city || listing.region) && <p className="mt-1 text-sm text-navy-500">{[listing.city, listing.region].filter(Boolean).join(', ')} · approximate area on the map</p>}
              <div className="mt-4">
                <MapView single={{ lat: listing.lat, lng: listing.lng, title: listing.title }} zoom={13} height={360} className="overflow-hidden rounded-2xl ring-1 ring-navy-100" />
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <ScrollReveal className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100">
              {listing.agent && (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Listing agent</p>
                  <p className="mt-2 font-display text-lg font-semibold text-navy-900">{listing.agent.name}</p>
                  <div className="mt-3 flex flex-col gap-2 text-sm text-navy-600">
                    <a href={`tel:${listing.agent.phone}`} className="flex items-center gap-2 hover:text-navy-900">
                      <Phone size={15} aria-hidden="true" /> {listing.agent.phone}
                    </a>
                    <a href={`mailto:${listing.agent.email}`} className="flex items-center gap-2 hover:text-navy-900">
                      <Mail size={15} aria-hidden="true" /> {listing.agent.email}
                    </a>
                  </div>
                </>
              )}
              <div className="mb-5 flex flex-col gap-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">How would you like it?</p>
                {listing.offers.rent != null && (
                  <a href={dealUrl('rent', { unitId: listing.id })} className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800">
                    <span className="flex items-center gap-2"><KeyRound size={16} aria-hidden="true" />Rent</span>
                    <span className="text-right font-normal text-white/80">{formatCurrency(listing.offers.rent, { rounded: true })} /month</span>
                  </a>
                )}
                {listing.offers.buy != null && (
                  <a href={dealUrl('buy', { unitId: listing.id })} className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg bg-gold-400 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-300">
                    <span className="flex items-center gap-2"><ShoppingCart size={16} aria-hidden="true" />Buy</span>
                    <span className="text-right font-medium">{formatCurrency(listing.offers.buy, { rounded: true })}</span>
                  </a>
                )}
                {listing.offers.lease && (
                  <a href={dealUrl('lease', { unitId: listing.id })} className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-navy-300 bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50">
                    <span className="flex items-center gap-2"><FileSignature size={16} aria-hidden="true" />Lease</span>
                    <span className="text-right font-normal text-navy-600">{formatCurrency(listing.offers.lease.price, { rounded: true })} /year · {listing.offers.lease.termMonths} mo</span>
                  </a>
                )}
              </div>
              <div className={listing.agent ? 'mt-5 border-t border-navy-100 pt-5' : 'border-t border-navy-100 pt-5'}>
                <p className="mb-3 text-sm font-semibold text-navy-900">Or ask a question first</p>
                <InquiryForm listing={listing} />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold text-navy-900">More in {listing.city}</h2>
            </ScrollReveal>
            <StaggerGroup className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {similar.map((l) => (
                <StaggerItem key={l.id}><PropertyCard listing={l} /></StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}
      </div>
    </div>
  );
}
