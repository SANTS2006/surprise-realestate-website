# Surprise Real Estate — Public Listings Site

The public-facing marketing and listings website for Surprise Real Estate —
a standalone project, separate from the tenant/staff management portal
(`surprise real estate management system`). Visitors browse available
rentals by location, price, and type without logging in.

## Stack

- React 19 + Vite + React Router
- Tailwind CSS v3
- Framer Motion (scroll-triggered fade-in animations)
- Leaflet + OpenStreetMap (free, no API key) for real property-location maps
- lucide-react for icons

## Pages

Home · Listings (filterable grid/map) · Property Detail (gallery, amenities,
exact-location map, inquiry form) · About · Agents · Contact · FAQ

## Data

`src/data/listings.js` and `src/data/agents.js` currently hold realistic
sample data (real Freetown neighborhoods and coordinates, hotlinked Unsplash
photos). This is **not yet wired to the live management-system API** — that's
the natural next phase: add public (unauthenticated) endpoints on the main
server for available properties/units, and swap the sample data for real
fetches.

## Development

```bash
npm install
npm run dev      # http://localhost:5174
npm run build
npm run lint
```
