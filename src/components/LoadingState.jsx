import { Loader2 } from 'lucide-react';

export function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white py-20 text-center shadow-card ring-1 ring-navy-100">
      <Loader2 size={24} className="animate-spin text-navy-400" aria-hidden="true" />
      <p className="text-sm text-navy-500">{label}</p>
    </div>
  );
}
