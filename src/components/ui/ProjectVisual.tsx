import type { Lang, PortfolioProject } from '../../types/hud';
import './ProjectVisual.css';

interface ProjectVisualProps {
  project: PortfolioProject;
  lang: Lang;
  variant: 'card' | 'modal';
}

const GITHUB_OCTOCAT_PATH =
  'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z';

function GitHubTacticalEmblem({ variant }: { variant: 'card' | 'modal' }) {
  return (
    <div className={`aw-gh-emblem aw-gh-emblem--${variant}`} aria-hidden="true">
      <span className="aw-gh-emblem__corner aw-gh-emblem__corner--tl" />
      <span className="aw-gh-emblem__corner aw-gh-emblem__corner--tr" />
      <span className="aw-gh-emblem__corner aw-gh-emblem__corner--bl" />
      <span className="aw-gh-emblem__corner aw-gh-emblem__corner--br" />
      <svg viewBox="0 0 16 16" className="aw-gh-emblem__icon" fill="#FFFFFF">
        <path d={GITHUB_OCTOCAT_PATH} />
      </svg>
    </div>
  );
}

export function ProjectVisual({ project, lang, variant }: ProjectVisualProps) {
  if (project.visualKind === 'image' && project.previewImage) {
    return (
      <img
        src={project.previewImage}
        alt={project.previewAlt[lang]}
        loading={variant === 'card' ? 'lazy' : 'eager'}
      />
    );
  }

  if (project.visualKind === 'votify-blueprint') {
    if (variant === 'card' && project.logoImage) {
      return (
        <div className="aw-vis aw-vis--logo-card" aria-label={project.previewAlt[lang]}>
          <div className="aw-vis__grid" aria-hidden="true" />
          <div className="aw-vis__logo-wrap">
            <img
              src={project.logoImage}
              alt={`${project.name} logo`}
              className="aw-vis__logo-img"
              loading="lazy"
            />
          </div>
        </div>
      );
    }

    if (variant === 'card') {
      return (
        <div className="aw-vis aw-vis--card" aria-label={project.previewAlt[lang]}>
          <div className="aw-vis__grid" aria-hidden="true" />
          <div className="aw-vis__inner">
            <div className="aw-vis-compact-stack">
              <div className="aw-vis-compact-row">
                <span className="aw-vis-compact-row__title">
                  01 · {lang === 'es' ? 'Blazor & Dashboards' : 'Blazor & Dashboards'}
                </span>
                <span className="aw-vis-compact-row__tag">RADZEN UI</span>
              </div>
              <div className="aw-vis-compact-row aw-vis-compact-row--yellow">
                <span className="aw-vis-compact-row__title">
                  02 · {lang === 'es' ? 'Servicio · PDF · IA' : 'Service · PDF · AI'}
                </span>
                <span className="aw-vis-compact-row__tag">.NET 9 · XUNIT</span>
              </div>
              <div className="aw-vis-compact-row aw-vis-compact-row--green">
                <span className="aw-vis-compact-row__title">
                  03 · PostgreSQL &amp; EF Core
                </span>
                <span className="aw-vis-compact-row__tag">REPO / UoW</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="aw-vis aw-vis--modal aw-vis--votify-modal" aria-label={project.previewAlt[lang]}>
        <div className="aw-vis__grid" aria-hidden="true" />
        <div className="aw-vis__inner">
          {project.logoImage && (
            <div className="aw-vis__modal-logo">
              <img src={project.logoImage} alt={`${project.name} logo`} />
            </div>
          )}

          <div className="aw-vis__caption">
            <span>{lang === 'es' ? 'ARQUITECTURA EN 3 CAPAS' : '3-LAYER ARCHITECTURE'}</span>
            <span>C# · .NET 9</span>
          </div>

          <div className="aw-vis-layers">
            <div className="aw-vis-layer">
              <div className="aw-vis-layer__head">
                <span>01 // {lang === 'es' ? 'Presentación Blazor' : 'Blazor Presentation'}</span>
                <span className="aw-vis-layer__tag">RADZEN UI</span>
              </div>
              <div className="aw-vis-layer__items">
                {lang === 'es'
                  ? 'Dashboards · Votaciones · Rankings · Notificaciones'
                  : 'Dashboards · Voting Flows · Rankings · Notifications'}
              </div>
            </div>

            <div className="aw-vis-layer aw-vis-layer--yellow">
              <div className="aw-vis-layer__head">
                <span>02 // {lang === 'es' ? 'Servicio y Dominio' : 'Service & Domain Logic'}</span>
                <span className="aw-vis-layer__tag">PATTERNS + XUNIT</span>
              </div>
              <div className="aw-vis-layer__items">
                {lang === 'es'
                  ? 'Estrategias de Voto · Certificados PDF · Hoja de Ruta IA'
                  : 'Voting Strategies · PDF Certificates · AI Roadmap'}
              </div>
            </div>

            <div className="aw-vis-layer aw-vis-layer--green">
              <div className="aw-vis-layer__head">
                <span>03 // {lang === 'es' ? 'Persistencia Relacional' : 'Relational Persistence'}</span>
                <span className="aw-vis-layer__tag">EF CORE</span>
              </div>
              <div className="aw-vis-layer__items">
                PostgreSQL · Repository / Unit of Work · DTOs
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="aw-vis aw-vis--hud-card" aria-label={project.previewAlt[lang]}>
        <div className="aw-vis__grid" aria-hidden="true" />
        <div className="aw-vis__hud-wrap">
          <GitHubTacticalEmblem variant="card" />
          <span className="aw-vis__hud-label">TELEMETRY // HUD ENGINE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="aw-vis aw-vis--modal aw-vis--hud-modal" aria-label={project.previewAlt[lang]}>
      <div className="aw-vis__grid" aria-hidden="true" />
      <div className="aw-vis__inner">
        <div className="aw-vis__modal-emblem">
          <GitHubTacticalEmblem variant="modal" />
        </div>

        <div className="aw-vis__caption">
          <span>{lang === 'es' ? 'PIPELINE AUTOMATIZADO' : 'AUTOMATED CI PIPELINE'}</span>
          <span>NODE 24 · TS</span>
        </div>

        <div className="aw-vis-pipe">
          <div className="aw-vis-stage">
            <span className="aw-vis-stage__step">01 // COLLECT</span>
            <span className="aw-vis-stage__title">GraphQL + REST</span>
            <span className="aw-vis-stage__sub">
              {lang === 'es' ? 'Fallback y caché local' : 'Fallback & local cache'}
            </span>
          </div>

          <div className="aw-vis-stage">
            <span className="aw-vis-stage__step">02 // LEDGER</span>
            <span className="aw-vis-stage__title">30D History</span>
            <span className="aw-vis-stage__sub">
              {lang === 'es' ? 'Deltas de lenguajes' : 'Language trend deltas'}
            </span>
          </div>

          <div className="aw-vis-stage aw-vis-stage--accent">
            <span className="aw-vis-stage__step">03 // RENDER</span>
            <span className="aw-vis-stage__title">SVG HUD (EN/ES)</span>
            <span className="aw-vis-stage__sub">
              {lang === 'es' ? 'Tags priorizados + tests' : 'Priority tags + tests'}
            </span>
          </div>

          <div className="aw-vis-stage">
            <span className="aw-vis-stage__step">04 // SYNC</span>
            <span className="aw-vis-stage__title">SHA-256 Bust</span>
            <span className="aw-vis-stage__sub">
              {lang === 'es' ? 'Refresco sin caché Camo' : 'Instant Camo refresh'}
            </span>
          </div>
        </div>

        <div className="aw-vis-pipe__footer">
          <span>● CRON 06:00 UTC · GITHUB ACTIONS</span>
          <span>0 RUNTIME DEPS</span>
        </div>
      </div>
    </div>
  );
}
