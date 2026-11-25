import { Check, Copy, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import type { Lang } from '../../types/hud';
import { SectionHeader } from '../ui/SectionHeader';
import './CommsSection.css';

interface CommsSectionProps {
  lang: Lang;
}

export function CommsSection({ lang }: CommsSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${PROFILE_DATA.email}`;
    }
  };

  return (
    <section id="comms" className="aw-section">
      <SectionHeader
        title={lang === 'es' ? 'Contacto Directo' : 'Direct Comms'}
        meta={lang === 'es' ? 'CANAL ABIERTO' : 'CHANNEL OPEN'}
        metaAccent="green"
      />

      <div className="aw-comms-grid">
        <div className="aw-panel aw-comms-card">
          <div className="aw-comms-status">
            <span className="aw-radar-dot" aria-hidden="true" />
            <span>{PROFILE_DATA.availability[lang]}</span>
          </div>

          <h3 className="aw-comms-headline">
            {lang === 'es'
              ? '¿Buscas un perfil Junior o en prácticas de Ingeniería del Software?'
              : 'Looking for a Software Engineering Intern or Junior Developer?'}
          </h3>

          <p className="aw-comms-text">
            {lang === 'es'
              ? 'Abierto a prácticas curriculares o extracurriculares, puestos Junior de Ingeniería del Software y colaboraciones técnicas. Puedes contactarme directamente por correo o LinkedIn.'
              : 'Open to Software Engineering internships, Junior developer roles, and technical collaborations. Feel free to reach out directly via email or LinkedIn.'}
          </p>
        </div>

        <div className="aw-panel aw-comms-card">
          <div className="aw-comms-email-box">
            <div className="aw-comms-email-info">
              <span className="aw-comms-email-lbl">
                {lang === 'es' ? 'CORREO DIRECTO' : 'DIRECT EMAIL'}
              </span>
              <span className="aw-comms-email-addr">{PROFILE_DATA.email}</span>
            </div>

            <div className="aw-comms-email-actions">
              <button
                type="button"
                className={`aw-btn ${copied ? 'aw-btn--success' : 'aw-btn--primary'}`}
                onClick={handleCopyEmail}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>
                  {copied
                    ? lang === 'es'
                      ? 'COPIADO'
                      : 'COPIED'
                    : lang === 'es'
                      ? 'COPIAR EMAIL'
                      : 'COPY EMAIL'}
                </span>
              </button>

              <a href={`mailto:${PROFILE_DATA.email}`} className="aw-btn">
                <Mail size={15} />
                <span>{lang === 'es' ? 'ENVIAR' : 'MAILTO'}</span>
              </a>
            </div>
          </div>

          <div className="aw-comms-links">
            <a
              href={PROFILE_DATA.links.github}
              target="_blank"
              rel="noreferrer"
              className="aw-interactive aw-comms-link-tile"
            >
              <span className="aw-comms-link-tile__left aw-accent-on-focus">
                <Github size={18} />
                <span>GITHUB</span>
              </span>
              <ExternalLink size={15} color="var(--aw-text-muted)" />
            </a>

            <a
              href={PROFILE_DATA.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="aw-interactive aw-comms-link-tile"
            >
              <span className="aw-comms-link-tile__left aw-accent-on-focus">
                <Linkedin size={18} />
                <span>LINKEDIN</span>
              </span>
              <ExternalLink size={15} color="var(--aw-text-muted)" />
            </a>
          </div>
        </div>
      </div>

      <div className="aw-comms-footer-note">
        <span>
          © {new Date().getFullYear()} {PROFILE_DATA.displayName.toUpperCase()} //{' '}
          {PROFILE_DATA.shortTag}
        </span>
        <span>
          {lang === 'es'
            ? 'REACT + TYPESCRIPT + VITE · ESTÉTICA TÁCTICA AW'
            : 'REACT + TYPESCRIPT + VITE · AW TACTICAL HUD'}
        </span>
      </div>
    </section>
  );
}
