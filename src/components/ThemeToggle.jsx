import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const KEY = 'theme';

function currentTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function apply(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#041630' : '#0D3166');
}

// Light / dark switch. The first visit follows the device setting; after that
// the visitor's choice is remembered (see the inline script in index.html,
// which applies it before the page paints so there is no flash).
export function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => (typeof document === 'undefined' ? 'light' : currentTheme()));


  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    apply(next);
    setTheme(next);
    try { localStorage.setItem(KEY, next); } catch { /* storage unavailable */ }
  };

  const Icon = theme === 'dark' ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${className}`}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
