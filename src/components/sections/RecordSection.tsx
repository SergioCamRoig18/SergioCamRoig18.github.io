import {
  ArrowUpRight,
  Globe,
  GraduationCap,
  Languages,
  Layers,
  Terminal,
} from 'lucide-react';
import { DEGREE_SPAN, TIMELINE_RECORDS } from '../../data/profile';
import type { Lang, TimelineRecord } from '../../types/hud';
import { SectionHeader } from '../ui/SectionHeader';
import './RecordSection.css';

interface RecordSectionProps {
  lang: Lang;
  onOpenProjectById: (projectId: string) => void;
}

function RecordIcon({ icon }: { icon: TimelineRecord['icon'] }) {
  switch (icon) {
    case 'graduation':
      return <GraduationCap size={26} strokeWidth={1.5} />;
    case 'globe':
      return <Globe size={26} strokeWidth={1.5} />;
    case 'layers':
      return <Layers size={26} strokeWidth={1.5} />;
    case 'terminal':
      return <Terminal size={26} strokeWidth={1.5} />;
    case 'languages':
      return <Languages size={26} strokeWidth={1.5} />;
  }
}

export function RecordSection({ lang, onOpenProjectById }: RecordSectionProps) {
  return (
    <section id="record" className="aw-section">
      <SectionHeader
        title={lang === 'es' ? 'Formación y Trayectoria' : 'Service Record'}
        meta="2023 — 2027"
        metaAccent="yellow"
      />

      <div className="aw-record-layout">
        {/* Continuous 2023-2027 Degree Overlap Track */}
        <aside className="aw-degree-span" aria-label={DEGREE_SPAN.title[lang]}>
          <div className="aw-degree-span__card">
            <span className="aw-degree-span__kicker">
              <GraduationCap size={14} />
              <span>{DEGREE_SPAN.category[lang]}</span>
            </span>

            <h3 className="aw-degree-span__title">{DEGREE_SPAN.title[lang]}</h3>
            <p className="aw-degree-span__sub">{DEGREE_SPAN.subtitle[lang]}</p>
            <p className="aw-degree-span__desc">{DEGREE_SPAN.description[lang]}</p>

            <div className="aw-degree-span__range">
              <span>{DEGREE_SPAN.periodStart[lang]}</span>
              <span>→</span>
              <span>{DEGREE_SPAN.periodEnd[lang]}</span>
            </div>
          </div>

          <div className="aw-degree-track" aria-hidden="true">
            <span className="aw-degree-track__cap aw-degree-track__cap--top" />
            <span className="aw-degree-track__line" />
            <span className="aw-degree-track__cap" />
          </div>
        </aside>

        {/* Chronological Milestones Rail (newest -> oldest, overlapping the 2023-2027 span) */}
        <div className="aw-record-rail">
          {TIMELINE_RECORDS.map((entry) => {
            const isClickable = Boolean(entry.actionProjectId);
            const content = (
              <>
                <div className="aw-record-card__icon" aria-hidden="true">
                  <RecordIcon icon={entry.icon} />
                </div>
                <div className="aw-record-card__body">
                  <div className="aw-record-card__top">
                    <span className="aw-record-card__cat">{entry.category[lang]}</span>
                    {entry.badge && (
                      <span className="aw-record-card__badge">{entry.badge[lang]}</span>
                    )}
                  </div>
                  <h3 className="aw-record-card__title aw-accent-on-focus">{entry.title[lang]}</h3>
                  <p className="aw-record-card__sub">{entry.subtitle[lang]}</p>
                  <p className="aw-record-card__desc">{entry.description[lang]}</p>
                  {isClickable && (
                    <span className="aw-record-card__action">
                      <span>
                        {lang === 'es' ? 'VER INFORME DEL PROYECTO' : 'INSPECT PROJECT BRIEFING'}
                      </span>
                      <ArrowUpRight size={14} />
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <div key={entry.id} className="aw-record-entry">
                <span className="aw-record-date">[{entry.dateLabel[lang]}]</span>
                <span className="aw-record-dot" aria-hidden="true" />

                {isClickable && entry.actionProjectId ? (
                  <button
                    type="button"
                    className="aw-interactive aw-record-card"
                    onClick={() => onOpenProjectById(entry.actionProjectId!)}
                  >
                    {content}
                  </button>
                ) : (
                  <article className="aw-panel aw-record-card">{content}</article>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
