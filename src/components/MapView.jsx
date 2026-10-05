import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { MapPinOff } from 'lucide-react';
import { formatCurrency } from '../utils/format.js';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Vite bundles Leaflet's default marker images under a hashed path, but
// Leaflet's own CSS still points at the unbundled relative "images/" URLs —
// without this, markers render as broken image icons. Fixing it once here
// (module scope) covers every <Marker> in the app.
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const goldIcon = L.divIcon({
  className: '',
  html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;background:#C88A1B;border:3px solid white;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(10,30,56,0.4);"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -32],
});

// Re-centers/re-fits an already-mounted map when `bounds`/`center` change —
// react-leaflet only reads these props on first mount otherwise.
function MapController({ center, zoom, bounds }) {
  const map = useMap();
  useMemo(() => {
    if (bounds && bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    } else if (center) {
      map.setView(center, zoom ?? map.getZoom());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(bounds), center?.[0], center?.[1], zoom]);
  return null;
}

// `listings`: array of {id, title, price, lat, lng} for multi-pin browse
// mode. `single`: one {lat, lng, title} for a property-detail pin. Exactly
// one of the two is expected. Real listings can have no coordinates yet
// (a staff member hasn't set them on the property) — those are filtered out
// here rather than plotted at (0,0) or crashing Leaflet's bounds-fitting.
export function MapView({ listings, single, height = 420, className, directionsUrl }) {
  const all = listings ?? (single ? [single] : []);
  const points = all.filter((p) => typeof p.lat === 'number' && typeof p.lng === 'number');

  if (points.length === 0) {
    return (
      <div className={className} style={{ height }}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-navy-50 text-center">
          <MapPinOff size={28} className="text-navy-300" aria-hidden="true" />
          <p className="text-sm text-navy-500">
            {listings ? 'None of the current listings have a map location set yet.' : "This listing's exact location hasn't been set yet."}
          </p>
        </div>
      </div>
    );
  }

  const bounds = points.length > 1 ? points.map((p) => [p.lat, p.lng]) : null;
  const center = [points[0].lat, points[0].lng];
  const zoom = points.length === 1 ? 15 : 12;

  return (
    <div className={className} style={{ height }}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%', borderRadius: 16 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} zoom={zoom} bounds={bounds} />
        {points.map((p) => (
          <Marker key={p.id ?? 'single'} position={[p.lat, p.lng]} icon={listings ? goldIcon : defaultIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-navy-900">{p.title}</p>
                {p.price != null && <p className="text-navy-600">{formatCurrency(p.price, { rounded: true })}/mo</p>}
                {directionsUrl && (
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-medium text-navy-700 underline">
                    Get directions
                  </a>
                )}
                {p.id && (
                  <Link to={`/listings/${p.id}`} className="mt-1 inline-block font-medium text-navy-700 underline">
                    View listing
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
