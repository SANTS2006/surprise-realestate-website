import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout.jsx';
import Home from './pages/Home.jsx';

// Home stays eager (it's the near-universal landing page), everything else
// is lazy — the map (Leaflet) and animation (Framer Motion) libraries are
// the bulk of the bundle, and most visitors never touch most pages.
const Listings = lazy(() => import('./pages/Listings.jsx'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Agents = lazy(() => import('./pages/Agents.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy.jsx'));
const Terms = lazy(() => import('./pages/legal/Terms.jsx'));
const PaymentPolicy = lazy(() => import('./pages/legal/PaymentPolicy.jsx'));
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-200 border-t-navy-700" />
    </div>
  );
}

function Lazy({ Component }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Component />
    </Suspense>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Lazy Component={Listings} />} />
        <Route path="/listings/:id" element={<Lazy Component={PropertyDetail} />} />
        <Route path="/about" element={<Lazy Component={About} />} />
        <Route path="/agents" element={<Lazy Component={Agents} />} />
        <Route path="/contact" element={<Lazy Component={Contact} />} />
        <Route path="/faq" element={<Lazy Component={FAQ} />} />
        <Route path="/privacy-policy" element={<Lazy Component={PrivacyPolicy} />} />
        <Route path="/terms" element={<Lazy Component={Terms} />} />
        <Route path="/payment-policy" element={<Lazy Component={PaymentPolicy} />} />
        <Route path="/cookie-policy" element={<Lazy Component={CookiePolicy} />} />
        <Route path="*" element={<Lazy Component={NotFound} />} />
      </Route>
    </Routes>
  );
}
