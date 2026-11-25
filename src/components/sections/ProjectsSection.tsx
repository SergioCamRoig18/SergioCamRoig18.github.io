import { ArrowUpRight, Info, Lock, X } from 'lucide-react';
import { useMemo } from 'react';
import type { HudSnapshot, Lang, PortfolioProject, ProjectCategory } from '../../types/hud';
import { ProjectVisual } from '../ui/ProjectVisual';
import { SectionHeader } from '../ui/SectionHeader';
import './ProjectsSection.css';

interface ProjectsSectionProps {
  lang: Lang;
  projects: PortfolioProject[];
  snapshot: HudSnapshot;
  selectedCategory: ProjectCategory;
  activeTechFilter: { id: string; name: string; projectIds: string[] } | null;
  onSelectCategory: (cat: ProjectCategory) => void;
  onClearTechFilter: () => void;
  onOpenProject: (project: PortfolioProject) => void;
}

const CATEGORIES: { id: ProjectCategory; label: { en: string; es: string } }[] = [
  { id: 'all', label: { en: 'All Deployments', es: 'Todos' } },
  { id: 'web3d', label: { en: 'Web / 3D', es: 'Web / 3D' } },
  { id: 'fullstack', label: { en: 'Full-Stack / .NET', es: 'Full-Stack / .NET' } },
  { id: 'tooling', label: { en: 'Tooling & CI/CD', es: 'Tooling y CI/CD' } },
];

export function ProjectsSection({
  lang,
  projects,
  snapshot,
  selectedCategory,
  activeTechFilter,
  onSelectCategory,
  onClearTechFilter,
  onOpenProject,
}: ProjectsSectionProps) {
  const visibleProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (activeTechFilter && !activeTechFilter.projectIds.includes(p.id)) return false;
      return true;
    });
  }, [projects, selectedCategory, activeTechFilter]);

  const liveCount = useMemo(() => projects.filter((p) => Boolean(p.liveUrl)).length, [projects]);

  return (
    <section id="projects" className="aw-section">
      <SectionHeader
        title={lang === 'es' ? 'Proyectos Destacados' : 'Featured Deployments'}
        meta={`${visibleProjects.length} / ${projects.length} ${lang === 'es' ? 'MOSTRADOS' : 'SHOWN'}`}
        metaAccent="yellow"
      />

      <div className="aw-projects-toolbar">
        <div className="aw-filter-tabs" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.id}
              data-active={selectedCategory === cat.id}
              className="aw-filter-tab"
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        {activeTechFilter && (
          <button type="button" className="aw-tech-chip-active" onClick={onClearTechFilter}>
            <span>
              {lang === 'es' ? 'FILTRO STACK:' : 'TECH FILTER:'} {activeTechFilter.name}
            </span>
            <X size={13} />
          </button>
        )}
      </div>

      <div className="aw-projects-layout">
        {/* Left Sidebar (Clan Raids style) */}
        <aside className="aw-projects-sidebar">
          <div className="aw-projects-kpis">
            <div className="aw-panel aw-projects-kpi">
              <span className="aw-projects-kpi__lbl">
                {lang === 'es' ? 'PROYECTOS' : 'PROJECTS'}
              </span>
              <span className="aw-projects-kpi__val">{projects.length}</span>
            </div>
            <div className="aw-panel aw-projects-kpi">
              <span className="aw-projects-kpi__lbl">
                {lang === 'es' ? 'ONLINE' : 'LIVE LINKS'}
              </span>
              <span className="aw-projects-kpi__val aw-projects-kpi__val--yellow">{liveCount}</span>
            </div>
          </div>

          <div className="aw-panel aw-projects-meta-box">
            <div className="aw-projects-meta-row">
              <span>{lang === 'es' ? 'Repos Públicos' : 'Public Repos'}</span>
              <strong>{snapshot.publicRepoCount}</strong>
            </div>
            <div className="aw-projects-meta-row">
              <span>{lang === 'es' ? 'Áreas' : 'Focus Areas'}</span>
              <strong>Web · .NET · CI</strong>
            </div>
          </div>

          <div className="aw-panel aw-projects-status-box">
            <div className="aw-projects-status-box__head aw-projects-status-box__head--info">
              <Info size={14} />
              <span>{lang === 'es' ? 'GUÍA RÁPIDA' : 'QUICK BRIEF'}</span>
            </div>
            <p className="aw-projects-status-box__text">
              {lang === 'es'
                ? 'Haz clic en cualquier tarjeta para abrir su informe detallado, retos resueltos y enlaces.'
                : 'Click any project card to open its detailed breakdown, solved challenges, and links.'}
            </p>
          </div>
        </aside>

        {/* Right Grid */}
        <div>
          {visibleProjects.length === 0 ? (
            <div className="aw-panel aw-projects-empty">
              <p style={{ margin: '0 0 12px' }}>
                {lang === 'es'
                  ? 'Ningún proyecto coincide con los filtros actuales.'
                  : 'No deployments match the current filter combination.'}
              </p>
              <button
                type="button"
                className="aw-btn"
                onClick={() => {
                  onSelectCategory('all');
                  onClearTechFilter();
                }}
              >
                {lang === 'es' ? 'RESTABLECER FILTROS' : 'RESET FILTERS'}
              </button>
            </div>
          ) : (
            <div className="aw-projects-grid">
              {visibleProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className="aw-interactive aw-project-card"
                  onClick={() => onOpenProject(project)}
                >
                  <div className="aw-project-card__media">
                    <ProjectVisual project={project} lang={lang} variant="card" />
                    <span className="aw-project-card__badge">{project.statusBadge[lang]}</span>
                    <span className="aw-project-card__index">{project.index}</span>
                  </div>

                  <div className="aw-project-card__body">
                    <h3 className="aw-project-card__title aw-accent-on-focus">{project.name}</h3>
                    <p className="aw-project-card__desc">{project.shortDesc[lang]}</p>

                    <div className="aw-maturity-row">
                      <span className="aw-maturity-label">{project.maturityLabel[lang]}</span>
                      <span className="aw-maturity-label" style={{ color: 'var(--aw-text-secondary)' }}>
                        {project.timeframe[lang]}
                      </span>
                    </div>

                    <div className="aw-project-card__tags">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="aw-project-tag">
                          +{tag}
                        </span>
                      ))}
                    </div>

                    <div className="aw-project-card__footer">
                      <span>{lang === 'es' ? 'ABRIR INFORME TÉCNICO' : 'OPEN BRIEFING'}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        {!project.repoUrl && <Lock size={13} />}
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="aw-projects-pager">
            <div className="aw-projects-pager__bar" aria-hidden="true">
              <span className="aw-projects-pager__seg" />
            </div>
            <span className="aw-projects-pager__label">PAGE 1/1</span>
          </div>
        </div>
      </div>
    </section>
  );
}
