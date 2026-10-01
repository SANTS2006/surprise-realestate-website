import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home as HomeIcon, Phone, LogIn } from 'lucide-react';
import clsx from 'clsx';
import { PORTAL_LOGIN_URL } from '../config/env.js';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Listings' },
  { to: '/about', label: 'About' },
  { to: '/agents', label: 'Agents' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 40 : false));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Transparent-over-hero look only applies on the homepage before the user
  // scrolls past it — every other page (and the homepage once scrolled)
  // gets the solid bar, since a transparent nav over plain content reads as
  // a bug, not a design choice.
  const transparent = pathname === '/' && !scrolled;

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        transparent ? 'bg-transparent py-5' : 'bg-white/95 py-3 shadow-sm backdrop-blur-md'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className={clsx('flex h-9 w-9 items-center justify-center rounded-lg', transparent ? 'bg-white/15' : 'bg-navy-800')}>
            <HomeIcon size={18} className={transparent ? 'text-white' : 'text-gold-400'} aria-hidden="true" />
          </span>
          <span className={clsx('font-display text-lg font-semibold', transparent ? 'text-white' : 'text-navy-900')}>
            Surprise Real Estate
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'text-sm font-medium transition-colors',
                  transparent ? 'text-white/85 hover:text-white' : 'text-navy-600 hover:text-navy-900',
                  isActive && (transparent ? 'text-white' : 'text-navy-900')
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+23276123456" className={clsx('flex items-center gap-1.5 text-sm font-medium', transparent ? 'text-white/90' : 'text-navy-600')}>
            <Phone size={15} aria-hidden="true" />
            +232 76 123 456
          </a>
          <a
            href={PORTAL_LOGIN_URL}
            className={clsx(
              'flex items-center gap-1.5 text-sm font-medium',
              transparent ? 'text-white/90 hover:text-white' : 'text-navy-600 hover:text-navy-900'
            )}
          >
            <LogIn size={15} aria-hidden="true" />
            Sign In
          </a>
          <Link
            to="/listings"
            className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-sm transition-colors hover:bg-gold-300"
          >
            Browse Listings
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className={clsx('rounded-lg p-2 md:hidden', transparent ? 'text-white' : 'text-navy-900')}
        >
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <div
        className={clsx(
          'grid overflow-hidden bg-white shadow-lg transition-[grid-template-rows] duration-300 ease-in-out md:hidden',
          mobileOpen ? 'grid-rows-[1fr] border-t border-navy-100' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Primary mobile" className="flex flex-col gap-1 px-4 py-4">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  clsx('rounded-lg px-3 py-2.5 text-sm font-medium', isActive ? 'bg-navy-50 text-navy-900' : 'text-navy-600 hover:bg-navy-50')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a href="tel:+23276123456" className="mt-2 flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-navy-600">
              <Phone size={15} aria-hidden="true" />
              +232 76 123 456
            </a>
            <a href={PORTAL_LOGIN_URL} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-navy-600">
              <LogIn size={15} aria-hidden="true" />
              Sign In
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
