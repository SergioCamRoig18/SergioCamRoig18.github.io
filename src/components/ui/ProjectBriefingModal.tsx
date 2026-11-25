import { ExternalLink, Github, Lock, X } from 'lucide-react';
import { useEffect } from 'react';
import type { Lang, PortfolioProject } from '../../types/hud';
import { ProjectVisual } from './ProjectVisual';
import './ProjectBriefingModal.css';

interface ProjectBriefingModalProps {
  project: PortfolioProject | null;
  lang: Lang;
  onClose: () => void;
}

export function ProjectBriefingModal({ project, lang, onClose }: ProjectBriefingModalProps) {
  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="aw-aar-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aar-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <article className="aw-aar-dialog aw-fade-in">
        <header className="aw-aar-header">
          <div className="aw-aar-header__left">
            <span className="aw-section-header__dot" aria-hidden="true" />
            <h2 id="aar-modal-title" className="aw-aar-title">
              AFTER ACTION REPORT // <strong>{project.name}</strong>
            </h2>
          </div>

          <button type="button" className="aw-aar-close" onClick={onClose}>
            <span className="aw-keycap">ESC</span>
            <span>{lang === 'es' ? 'CERRAR' : 'CLOSE'}</span>
            <X size={15} />
          </button>
        </header>

        {/* Top split card */}
        <div className="aw-aar-split">
          <div className="aw-aar-media">
            <ProjectVisual project={project} lang={lang} variant="modal" />
          </div>

          <div className="aw-aar-brief">
            <div className="aw-aar-brief__kicker">
              <span className="aw-aar-brief__status">
                {project.index} // {project.statusBadge[lang]}
              </span>
              <span className="aw-aar-brief__meta">
                {project.timeframe[lang]} · {project.teamSize[lang]}
              </span>
            </div>

            <h3 className="aw-aar-brief__name">{project.name}</h3>
            <p className="aw-aar-brief__role">{project.role[lang]}</p>
            <p className="aw-aar-brief__summary">{project.summary[lang]}</p>

            <div className="aw-aar-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="aw-aar-tag">
                  +{tag}
                </span>
              ))}
            </div>

            <div className="aw-aar-actions">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="aw-btn aw-btn--primary"
                >
                  <span>{lang === 'es' ? 'ABRIR LIVE DEMO' : 'LAUNCH LIVE SITE'}</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="aw-btn"
                >
                  <Github size={15} />
                  <span>{lang === 'es' ? 'VER REPOSITORIO' : 'VIEW SOURCE'}</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>

            {project.repoVisibilityNote && (
              <div className="aw-aar-private-note">
                <Lock size={14} color="var(--aw-yellow)" style={{ flexShrink: 0 }} />
                <span>{project.repoVisibilityNote[lang]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Factual KPI tiles — zero arbitrary percentages */}
        <p className="aw-aar-subhead">
          {lang === 'es' ? 'DATOS CLAVE DEL PROYECTO' : 'KEY PROJECT FACTS'}
        </p>
        <div className="aw-aar-kpi-grid">
          {project.kpis.map((kpi) => (
            <div
              key={kpi.label.en}
              className={`aw-aar-kpi-tile${kpi.highlight ? ' aw-aar-kpi-tile--highlight' : ''}`}
            >
              <span className="aw-aar-kpi-tile__label">{kpi.label[lang]}</span>
              <span className="aw-aar-kpi-tile__value">{kpi.value[lang]}</span>
              <span className="aw-aar-kpi-tile__sub">{kpi.sublabel[lang]}</span>
            </div>
          ))}
        </div>

        {/* Highlights + Solved Challenges */}
        <div className="aw-aar-columns">
          <div className="aw-aar-box">
            <p className="aw-aar-subhead">
              {lang === 'es' ? 'QUÉ CONSTRUÍ' : 'WHAT WAS BUILT'}
            </p>
            <ul className="aw-aar-highlights">
              {project.highlights.map((item) => (
                <li key={item.en}>{item[lang]}</li>
              ))}
            </ul>
          </div>

          <div className="aw-aar-box">
            <p className="aw-aar-subhead">
              {lang === 'es' ? 'RETOS RESUELTOS Y APORTACIÓN' : 'SOLVED CHALLENGES & ROLE'}
            </p>
            <div className="aw-aar-decisions">
              {project.challenges.map((ch) => (
                <div key={ch.title.en} className="aw-aar-decision">
                  <h4 className="aw-aar-decision__title">{ch.title[lang]}</h4>
                  <p className="aw-aar-decision__detail">{ch.detail[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
