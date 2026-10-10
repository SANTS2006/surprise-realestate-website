// The real estate system this site is the public face of. Everything below is
// addressed by the company's URL name (its "slug") in the system — that is how
// the right company's listings, agents and stats are loaded, and how a visitor
// is sent to the right company's sign-in and rental pages.
export const ORG_SLUG = import.meta.env.VITE_ORG_SLUG || 'surpriserealestate';

// The company's real estate system (a separate app): the Navbar's Sign In
// button and the "Rent this unit" button link out to it, and its public API
// is where every listing, agent and stat on this site comes from.
export const APP_URL = (import.meta.env.VITE_APP_URL || 'https://ntsrealestate.onrender.com').replace(/[/]+$/, '');

// VITE_API_URL, when set, overrides the address (…/api/v1/public). Otherwise
// local development talks to the local server and the live site reads from the
// NTS Real Estate System at APP_URL. The company is appended so the site only
// ever reads this one company's public data.
const PUBLIC_API = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api/v1/public' : `${APP_URL}/api/v1/public`)).replace(/[/]+$/, '');
export const API_URL = `${PUBLIC_API}/orgs/${ORG_SLUG}`;

export const PORTAL_LOGIN_URL = `${APP_URL}/${ORG_SLUG}/login`;

// Sends the visitor to register (or sign in) and have this unit added under
// their tenant account.
export const rentUrl = (unitId) => `${APP_URL}/${ORG_SLUG}/rent?unit=${unitId}`;

// Where the platform reports whether it is under maintenance.
export const SYSTEM_STATUS_URL = `${PUBLIC_API}/system-status`;

// Sends the visitor to sign in / register and then rent, buy or lease a house
// (kind: 'rent' | 'buy' | 'lease'), or buy a land.
export const dealUrl = (kind, { unitId, landId }) => {
  const params = new URLSearchParams();
  if (landId) params.set('land', landId); else params.set('unit', unitId);
  params.set('kind', kind);
  return `${APP_URL}/${ORG_SLUG}/rent?${params.toString()}`;
};
