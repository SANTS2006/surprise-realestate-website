import { useEffect, useRef, useState } from 'react';
import { Wrench } from 'lucide-react';
import { SYSTEM_STATUS_URL } from '../config/env.js';

const dateFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' });

// Shown along the top of the site while the platform admin has maintenance
// mode on for the website. Checked on load and every couple of minutes.
export function MaintenanceBanner() {
  const [status, setStatus] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const check = () => fetch(SYSTEM_STATUS_URL)
      .then((r) => r.json())
      .then((p) => { if (!cancelled && p?.data) setStatus(p.data.maintenance); })
      .catch(() => {});
    check();
    const timer = setInterval(check, 120_000);
    return () => { cancelled = true; clearInterval(timer); };
  }, []);

  const visible = Boolean(status?.enabled) && (status.scope === 'all' || (status.pages ?? []).includes('website'));

  useEffect(() => {
    const root = document.documentElement;
    if (!visible || !ref.current) { root.style.setProperty('--maintenance-offset', '0px'); return undefined; }
    const update = () => root.style.setProperty('--maintenance-offset', `${ref.current?.offsetHeight ?? 0}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(ref.current);
    return () => { observer.disconnect(); root.style.setProperty('--maintenance-offset', '0px'); };
  }, [visible]);

  if (!visible) return null;
  return (
    <div ref={ref} role="status" className="fixed inset-x-0 top-0 z-[70] flex items-start gap-3 bg-amber-500 px-4 py-2.5 text-sm text-amber-950">
      <Wrench size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      <p className="min-w-0 break-words">
        <strong className="font-semibold">We are under maintenance.</strong>{' '}
        {status.message || 'Some things may be unavailable or slow for a while.'}
        {status.endsAt && <> Expected back {dateFmt.format(new Date(status.endsAt))}.</>}
      </p>
    </div>
  );
}
