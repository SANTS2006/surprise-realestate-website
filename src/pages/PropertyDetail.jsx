import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  BedDouble, Bath, Ruler, MapPin, Calendar, Phone, Mail, Check,
  ChevronLeft, ChevronRight, ArrowLeft,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { getListingById, listings } from '../data/listings.js';
import { formatCurrency, formatArea } from '../utils/format.js';
import { MapView } from '../components/MapView.jsx';
import { PropertyCard } from '../components/PropertyCard.jsx';
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal.jsx';

function Gallery({ images, title }) {
  const [active, setActive] = useState(0);
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
              className={`aspect-[4/3] overflow-hidden rounded-lg ring-2 transition-all ${active === i ? 'ring-gold-400' : 'ring-transparent opacity-70 hover:opacity-100'}`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InquiryForm({ listing }) {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-navy-50 p-6 text-center">
        <Check size={28} className="text-navy-700" aria-hidden="true" />
        <p className="font-display text-base font-semibold text-navy-900">Thanks — we'll be in touch shortly.</p>
        <p className="text-sm text-navy-500">{listing.agent.name} usually responds within a few hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <input required placeholder="First name" className="h-10 rounded-lg border border-navy-200 px-3 text-sm focus:border-navy-400 focus:outline-none" />
        <input required placeholder="Last name" className="h-10 rounded-lg border border-navy-200 px-3 text-sm focus:border-navy-400 focus:outline-none" />
      </div>
      <input required type="email" placeholder="Email address" className="h-10 rounded-lg border border-navy-200 px-3 text-sm focus:border-navy-400 focus:outline-none" />
      <input required type="tel" placeholder="Phone number" className="h-10 rounded-lg border border-navy-200 px-3 text-sm focus:border-navy-400 focus:outline-none" />
      <textarea
        rows={3}
        defaultValue={`Hi, I'm interested in ${listing.title}. Is it still available?`}
        className="rounded-lg border border-navy-200 px-3 py-2 text-sm focus:border-navy-400 focus:outline-none"
      />
      <button type="submit" className="mt-1 rounded-full bg-navy-900 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
        Request a viewing
      </button>
    </form>
  );
}

export default function PropertyDetail() {
  const { id } = useParams();
  const listing = getListingById(id);
  useDocumentTitle(listing ? listing.title : 'Listing not found');

  if (!listing) return <Navigate to="/listings" replace />;

  const similar = listings.filter((l) => l.id !== listing.id && l.neighborhood === listing.neighborhood).slice(0, 3);

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
              <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">{listing.type}</span>
              {listing.featured && <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-900">Featured</span>}
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">{listing.title}</h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-navy-500">
              <MapPin size={15} aria-hidden="true" />
              {listing.address}
            </p>
          </div>
          <p className="font-display text-3xl font-semibold text-navy-900 sm:text-right">
            {formatCurrency(listing.price, { rounded: true })}
            <span className="text-base font-sans font-normal text-navy-400"> /month</span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mt-8">
          <Gallery images={listing.images} title={listing.title} />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-10">
            <ScrollReveal>
              <div className="grid grid-cols-3 gap-4 rounded-2xl bg-navy-50 p-5 sm:gap-8 sm:p-6">
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
                <div className="flex items-center gap-2.5">
                  <Ruler size={20} className="text-navy-500" aria-hidden="true" />
                  <div><p className="font-semibold text-navy-900">{formatArea(listing.area)}</p><p className="text-xs text-navy-500">Floor area</p></div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-xl font-semibold text-navy-900">About this property</h2>
              <p className="mt-3 leading-relaxed text-navy-600">{listing.description}</p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-navy-500">
                <Calendar size={15} aria-hidden="true" />
                Built in {listing.yearBuilt}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-xl font-semibold text-navy-900">Amenities</h2>
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

            <ScrollReveal>
              <h2 className="font-display text-xl font-semibold text-navy-900">Location</h2>
              <p className="mt-1 text-sm text-navy-500">{listing.address}</p>
              <div className="mt-4">
                <MapView single={{ lat: listing.lat, lng: listing.lng, title: listing.title }} height={360} className="overflow-hidden rounded-2xl ring-1 ring-navy-100" />
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <ScrollReveal className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100">
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
              <div className="mt-5 border-t border-navy-100 pt-5">
                <InquiryForm listing={listing} />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold text-navy-900">More in {listing.neighborhood}</h2>
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
