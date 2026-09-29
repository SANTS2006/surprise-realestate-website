import { useEffect } from 'react';

const SITE_NAME = 'Surprise Real Estate';
const DEFAULT_DESCRIPTION = 'Find your next home with Surprise Real Estate — browse houses and apartments for rent by location, price, and features, with real map locations for every listing.';

function setMetaTag(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return el;
}

function setCanonical(path) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', `${window.location.origin}${path}`);
  return el;
}

// Sets the document title plus the meta description / Open Graph / Twitter
// Card tags and canonical link for the current route, restoring the
// previous values on unmount — every public page calls this once so a
// crawler (or a social-media unfurl bot, most of which do execute JS)
// sees per-page metadata instead of the same static index.html tags
// everywhere.
export function useDocumentTitle(title, description = DEFAULT_DESCRIPTION, { noindex = false } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    const previousTitle = document.title;
    document.title = fullTitle;

    const descriptionEl = setMetaTag('name', 'description', description);
    const previousDescription = descriptionEl.getAttribute('content');

    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setCanonical(window.location.pathname);

    // A 404 page (or similar) shouldn't be indexed — this SPA always
    // responds 200, so a robots meta tag is the only way to signal that.
    const robotsEl = setMetaTag('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    const previousRobots = robotsEl.getAttribute('content');

    return () => {
      document.title = previousTitle;
      descriptionEl.setAttribute('content', previousDescription);
      robotsEl.setAttribute('content', previousRobots);
    };
  }, [title, description, noindex]);
}
