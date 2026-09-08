import { Phone, Mail } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { agents } from '../data/agents.js';
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal.jsx';

export default function Agents() {
  useDocumentTitle('Our Agents');

  return (
    <div className="bg-white pb-20 pt-28">
      <section className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Our team</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy-900 sm:text-5xl">Meet our agents</h1>
          <p className="mt-4 text-lg leading-relaxed text-navy-500">
            Every listing has a named consultant who knows the property, the neighborhood, and the paperwork — reach out directly, any time.
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((a) => (
            <StaggerItem key={a.name}>
              <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-navy-100">
                <img src={a.photo} alt={a.name} className="aspect-[4/5] w-full object-cover" />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="font-display text-lg font-semibold text-navy-900">{a.name}</p>
                  <p className="text-sm font-medium text-gold-600">{a.role}</p>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-navy-500">{a.bio}</p>
                  <div className="mt-3 flex flex-col gap-1.5 border-t border-navy-100 pt-3 text-sm text-navy-600">
                    <a href={`tel:${a.phone}`} className="flex items-center gap-2 hover:text-navy-900">
                      <Phone size={14} aria-hidden="true" /> {a.phone}
                    </a>
                    <a href={`mailto:${a.email}`} className="flex items-center gap-2 truncate hover:text-navy-900">
                      <Mail size={14} className="shrink-0" aria-hidden="true" /> <span className="truncate">{a.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </div>
  );
}
