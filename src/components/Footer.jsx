import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SITE } from '../config/site.js';
import { BrandMark } from './BrandMark.jsx';

// lucide-react dropped brand/wordmark icons — simple text badges avoid an
// extra icon-library dependency for three links.
const SOCIALS = ['f', 'in', 'X'];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <BrandMark size={38} />
              <span className="font-display text-lg font-semibold text-white">Surprise Real Estate</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-navy-300">
              Modern property management and rentals — helping you find a place to call home.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label="Social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-sm font-semibold text-navy-300 transition-colors hover:bg-gold-400 hover:text-navy-900"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Explore</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li><Link to="/listings" className="hover:text-gold-300">All listings</Link></li>
              <li><Link to="/lands" className="hover:text-gold-300">Lands for sale</Link></li>
              <li><Link to="/listings?offer=buy" className="hover:text-gold-300">Houses for sale</Link></li>
              <li><Link to="/listings?kind=whole" className="hover:text-gold-300">Whole properties</Link></li>
              <li><Link to="/listings?kind=building" className="hover:text-gold-300">Whole buildings</Link></li>
              <li><Link to="/listings?kind=unit" className="hover:text-gold-300">Units &amp; rooms</Link></li>
              <li><Link to="/about" className="hover:text-gold-300">About us</Link></li>
              <li><Link to="/agents" className="hover:text-gold-300">Our agents</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Company</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li><Link to="/about" className="hover:text-gold-300">Our story</Link></li>
              <li><Link to="/contact" className="hover:text-gold-300">Contact us</Link></li>
              <li><Link to="/faq" className="hover:text-gold-300">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-gold-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold-300">Terms &amp; Conditions</Link></li>
              <li><Link to="/payment-policy" className="hover:text-gold-300">Payment Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Get in touch</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" aria-hidden="true" />
                <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">{SITE.address}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-gold-400" aria-hidden="true" />
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-gold-300">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-gold-400" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="hover:text-gold-300 break-all">{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-navy-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Surprise Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gold-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold-300">Terms &amp; Conditions</Link>
            <Link to="/cookie-policy" className="hover:text-gold-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
