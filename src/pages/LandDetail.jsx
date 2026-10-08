import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Ruler, Tag, FileCheck2, Check, ChevronLeft, ChevronRight, LandPlot, ShoppingCart, Phone } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { landsApi } from '../api/lands.js';
import { dealUrl } from '../config/env.js';
import { SITE } from '../config/site.js';
import { formatCurrency } from '../utils/format.js';
import { landTypeLabel, formatLandArea } from '../utils/land.js';
import { MapView } from '../components/MapView.jsx';
import { LoadingState } from '../components/LoadingState.jsx';
import { ScrollReveal } from '../components/ScrollReveal.jsx';

function Gallery({ images, title }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) {
    return <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl bg-navy-100"><LandPlot size={48} className="text-navy-300" aria-hidden="true" /></div>;
  }
  const go = (d) => setActive((i) => (i + d + images.length) % images.length);
  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-navy-100">
        <img src={images[active]} alt={`${title} — photo ${active + 1}`} className="h-full w-full object-cover" />
        {images.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-md hover:bg-white"><ChevronLeft size={18} aria-hidden="true" /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-md hover:bg-white"><ChevronRight size={18} aria-hidden="true" /></button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button key={src} type="button" onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 ${i === active ? 'ring-navy-700' : 'ring-transparent'}`}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LandDetail() {
  const { id } = useParams();
  const [land, setLand] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useDocumentTitle(land ? land.title : 'Land', land ? `${land.title} — ${formatLandArea(land.area, land.areaUnit)} in ${land.city ?? 'a great location'}, ${formatCurrency(land.price, { rounded: true })}.` : undefined);

  useEffect(() => {
    setLand(null); setNotFound(false);
    landsApi.get(id).then((res) => setLand(res.data)).catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <Navigate to="/lands" replace />;
  if (!land) return <div className="pb-20 pt-28"><LoadingState label="Loading land…" /></div>;

  const place = [land.city, land.region].filter(Boolean).join(', ');
  const specs = [
    { icon: Ruler, label: 'Size', value: formatLandArea(land.area, land.areaUnit) },
    { icon: Tag, label: 'Type', value: landTypeLabel(land.landType) },
    land.titleDocument && { icon: FileCheck2, label: 'Documents', value: land.titleDocument },
  ].filter(Boolean);

  return (
    <div className="bg-white pb-20 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/lands" className="flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-800"><ArrowLeft size={15} aria-hidden="true" />Back to lands</Link>

        <ScrollReveal className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <span className="rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">{landTypeLabel(land.landType)}</span>
            <h1 className="mt-3 break-words font-display text-3xl font-semibold text-navy-900 sm:text-4xl">{land.title}</h1>
            {place && <p className="mt-1.5 flex items-center gap-1.5 text-sm text-navy-500"><MapPin size={15} aria-hidden="true" />{place}</p>}
          </div>
          <p className="font-display text-3xl font-semibold text-navy-900 sm:text-right">{formatCurrency(land.price, { rounded: true })}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mt-8"><Gallery images={land.images} title={land.title} /></ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="flex min-w-0 flex-col gap-10">
            <ScrollReveal>
              <div className="grid grid-cols-1 gap-5 rounded-2xl bg-navy-50 p-5 sm:grid-cols-3 sm:p-6">
                {specs.map((s) => (
                  <div key={s.label} className="flex min-w-0 items-center gap-2.5">
                    <s.icon size={20} className="shrink-0 text-navy-500" aria-hidden="true" />
                    <div className="min-w-0"><p className="break-words font-semibold text-navy-900">{s.value}</p><p className="text-xs text-navy-500">{s.label}</p></div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {land.description && (
              <ScrollReveal>
                <h2 className="font-display text-xl font-semibold text-navy-900">About this land</h2>
                <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed text-navy-600">{land.description}</p>
              </ScrollReveal>
            )}

            {land.features.length > 0 && (
              <ScrollReveal>
                <h2 className="font-display text-xl font-semibold text-navy-900">Features</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {land.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-navy-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-navy-700"><Check size={13} aria-hidden="true" /></span>{f}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {land.videos.length > 0 && (
              <ScrollReveal>
                <h2 className="font-display text-xl font-semibold text-navy-900">Videos</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {land.videos.map((src) => <video key={src} src={src} controls preload="metadata" className="aspect-video w-full rounded-xl bg-navy-900" />)}
                </div>
              </ScrollReveal>
            )}

            {land.lat != null && land.lng != null && (
              <ScrollReveal>
                <h2 className="font-display text-xl font-semibold text-navy-900">Location</h2>
                {place && <p className="mt-1 text-sm text-navy-500">{place} · approximate area on the map</p>}
                <div className="mt-4"><MapView single={{ lat: land.lat, lng: land.lng, title: land.title }} zoom={13} height={340} className="overflow-hidden rounded-2xl ring-1 ring-navy-100" /></div>
              </ScrollReveal>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <ScrollReveal className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Price</p>
              <p className="mt-1 font-display text-3xl font-semibold text-navy-900">{formatCurrency(land.price, { rounded: true })}</p>
              <a href={dealUrl('buy', { landId: land.id })} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-navy-900 text-sm font-semibold text-white transition-colors hover:bg-navy-800">
                <ShoppingCart size={16} aria-hidden="true" />Buy this land
              </a>
              <p className="mt-3 text-xs text-navy-500">You will sign in (or create an account), and we reserve it for you and get in touch to complete the purchase.</p>
              <div className="mt-5 border-t border-navy-100 pt-5 text-sm text-navy-600">
                <p className="mb-2 font-semibold text-navy-900">Questions first?</p>
                <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 hover:text-navy-900"><Phone size={15} aria-hidden="true" />{SITE.phone}</a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
