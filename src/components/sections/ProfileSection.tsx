import { ArrowRight, ExternalLink, FileDown, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import type { HudSnapshot, Lang, SectionId } from '../../types/hud';
import './ProfileSection.css';

interface ProfileSectionProps {
  lang: Lang;
  snapshot: HudSnapshot;
  onJumpSection: (id: SectionId) => void;
}

export function ProfileSection({ lang, snapshot, onJumpSection }: ProfileSectionProps) {
  const topLang = snapshot.languages[0];

  return (
    <section id="profile" className="aw-section aw-fade-in" aria-labelledby="profile-heading">
      <div className="aw-hero">
        {/* Left: Direct Human Introduction (3-Second Recruiter Scan) */}
        <div className="aw-panel aw-hero-copy">
          <div className="aw-hero-top">
            <div className="aw-hero-status">
              <span className="aw-radar-dot" aria-hidden="true" />
              <span>{PROFILE_DATA.availability[lang]}</span>
            </div>

            <span className="aw-hero-greeting">{PROFILE_DATA.greeting[lang]}</span>
            <h1 id="profile-heading" className="aw-hero-name">
              {PROFILE_DATA.displayName}
            </h1>
            <p className="aw-hero-role">{PROFILE_DATA.subtitle[lang]}</p>
            <p className="aw-hero-lead">{PROFILE_DATA.intro[lang]}</p>

            <div className="aw-hero-pills">
              <span className="aw-hero-pill aw-hero-pill--accent">
                {lang === 'es' ? 'UPV · 4º Curso' : 'UPV · 4th Year'}
              </span>
              <span className="aw-hero-pill aw-hero-pill--accent">
                {lang === 'es' ? 'Inglés C1' : 'English C1'}
              </span>
              <span className="aw-hero-pill">
                {lang === 'es' ? 'Valencia, España' : 'Valencia, Spain'}
              </span>
              <span className="aw-hero-pill">TypeScript · C# (.NET) · PostgreSQL</span>
            </div>
          </div>

          <div className="aw-hero-actions">
            <button
              type="button"
              className="aw-btn aw-btn--primary"
              onClick={() => onJumpSection('projects')}
            >
              <span>{lang === 'es' ? 'VER PROYECTOS' : 'VIEW PROJECTS'}</span>
              <ArrowRight size={15} />
            </button>

            <a
              href={PROFILE_DATA.links.cv[lang]}
              target="_blank"
              rel="noreferrer"
              className="aw-btn"
            >
              <FileDown size={15} />
              <span>{lang === 'es' ? 'CV (PDF)' : 'RESUME (PDF)'}</span>
            </a>

            <button
              type="button"
              className="aw-btn aw-btn--comms"
              onClick={() => onJumpSection('comms')}
            >
              <Mail size={15} />
              <span>{lang === 'es' ? 'CONTACTO' : 'CONTACT'}</span>
            </button>

            <a
              href={PROFILE_DATA.links.github}
              target="_blank"
              rel="noreferrer"
              className="aw-btn"
              aria-label="GitHub"
            >
              <Github size={15} />
              <span>GITHUB</span>
              <ExternalLink size={12} opacity={0.65} />
            </a>

            <a
              href={PROFILE_DATA.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="aw-btn"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
              <span>LINKEDIN</span>
              <ExternalLink size={12} opacity={0.65} />
            </a>
          </div>
        </div>

        {/* Right: Compact Tactical Operator Dossier with Uncropped Portrait */}
        <aside className="aw-panel aw-portrait-card" aria-label={PROFILE_DATA.displayName}>
          <div className="aw-portrait-header">
            <div className="aw-portrait-frame">
              <img
                src={PROFILE_DATA.portraitUrl}
                alt={PROFILE_DATA.displayName}
                className="aw-portrait-frame__img"
              />
              <div className="aw-portrait-frame__shade" aria-hidden="true" />
              <span className="aw-portrait-frame__corner aw-portrait-frame__corner--tl" aria-hidden="true" />
              <span className="aw-portrait-frame__corner aw-portrait-frame__corner--tr" aria-hidden="true" />
              <span className="aw-portrait-frame__corner aw-portrait-frame__corner--bl" aria-hidden="true" />
              <span className="aw-portrait-frame__corner aw-portrait-frame__corner--br" aria-hidden="true" />
            </div>

            <div className="aw-portrait-meta">
              <span className="aw-portrait-meta__tag">{PROFILE_DATA.shortTag} // SWE</span>
              <strong className="aw-portrait-meta__name">{PROFILE_DATA.displayName}</strong>
              <span className="aw-portrait-meta__handle">@{PROFILE_DATA.username}</span>
              <span className="aw-portrait-meta__loc">
                {lang === 'es' ? 'Valencia, España' : 'Valencia, Spain'}
              </span>
            </div>
          </div>

          <div className="aw-portrait-facts">
            {PROFILE_DATA.credentials.map((item) => (
              <button
                key={item.id}
                type="button"
                className="aw-portrait-fact"
                onClick={() => onJumpSection(item.targetSection)}
              >
                <span>
                  <span className="aw-portrait-fact__lbl">{item.label[lang]}</span>
                  <span className="aw-portrait-fact__val">{item.value[lang]}</span>
                </span>
                <ArrowRight size={14} className="aw-portrait-fact__arrow" />
              </button>
            ))}

            <button
              type="button"
              className="aw-portrait-fact"
              onClick={() => onJumpSection('telemetry')}
            >
              <span>
                <span className="aw-portrait-fact__lbl">
                  {lang === 'es' ? 'Actividad GitHub (12M)' : 'GitHub Activity (12M)'}
                </span>
                <span className="aw-portrait-fact__val">
                  {snapshot.metrics.commits12m} commits
                  {topLang ? ` · ${topLang.name} ${topLang.percent.toFixed(0)}%` : ''}
                </span>
              </span>
              <ArrowRight size={14} className="aw-portrait-fact__arrow" />
            </button>
          </div>
        </aside>
      </div>

      {/* Concise Human About Me Strip */}
      <div className="aw-panel aw-about-strip">
        <span className="aw-about-strip__label">{PROFILE_DATA.about.title[lang]}</span>
        <p className="aw-about-strip__text">{PROFILE_DATA.about.body[lang]}</p>
      </div>
    </section>
  );
}
