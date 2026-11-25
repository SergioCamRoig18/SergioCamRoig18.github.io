import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import type { Lang, SectionId } from '../../types/hud';
import './TopNavBar.css';

interface NavItem {
  id: SectionId;
  label: { en: string; es: string };
}

interface TopNavBarProps {
  items: readonly NavItem[];
  activeSection: SectionId;
  lang: Lang;
  onSelectSection: (id: SectionId) => void;
  onStepSection: (delta: -1 | 1) => void;
  onSetLang: (lang: Lang) => void;
  onOpenCommandPalette: () => void;
}

export function TopNavBar({
  items,
  activeSection,
  lang,
  onSelectSection,
  onStepSection,
  onSetLang,
  onOpenCommandPalette,
}: TopNavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (id: SectionId) => {
    setMobileOpen(false);
    onSelectSection(id);
  };

  return (
    <header className="aw-topbar">
      <div className="aw-topbar__inner">
        <a
          href="#profile"
          className="aw-topbar__brand"
          onClick={(e) => {
            e.preventDefault();
            handleSelect('profile');
          }}
        >
          <span className="aw-topbar__monogram">SCR</span>
          <span className="aw-topbar__brand-text">
            <span className="aw-topbar__name">{PROFILE_DATA.displayName}</span>
            <span className="aw-topbar__sub">SWE // HUD v1.0</span>
          </span>
        </a>

        <nav className="aw-topbar__nav" aria-label={lang === 'es' ? 'Navegación principal' : 'Primary navigation'}>
          <button
            type="button"
            className="aw-topbar__key-btn"
            onClick={() => onStepSection(-1)}
            title={lang === 'es' ? 'Sección anterior (Q)' : 'Previous section (Q)'}
            aria-label={lang === 'es' ? 'Sección anterior' : 'Previous section'}
          >
            <span className="aw-keycap">Q</span>
          </button>

          <div className="aw-topbar__tabs" role="tablist">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeSection === item.id}
                data-active={activeSection === item.id}
                className="aw-topbar__tab"
                onClick={() => handleSelect(item.id)}
              >
                {item.label[lang]}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="aw-topbar__key-btn"
            onClick={() => onStepSection(1)}
            title={lang === 'es' ? 'Siguiente sección (E)' : 'Next section (E)'}
            aria-label={lang === 'es' ? 'Siguiente sección' : 'Next section'}
          >
            <span className="aw-keycap">E</span>
          </button>
        </nav>

        <div className="aw-topbar__actions">
          <button
            type="button"
            className="aw-topbar__icon-btn aw-topbar__cmd-btn"
            onClick={onOpenCommandPalette}
            title="Ctrl + K"
            aria-label={lang === 'es' ? 'Abrir paleta de comandos' : 'Open command palette'}
          >
            <Search size={14} />
            <span>CMD</span>
          </button>

          <div className="aw-lang-toggle" role="group" aria-label={lang === 'es' ? 'Idioma' : 'Language'}>
            <button
              type="button"
              className="aw-lang-toggle__btn"
              data-active={lang === 'en'}
              onClick={() => onSetLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className="aw-lang-toggle__btn"
              data-active={lang === 'es'}
              onClick={() => onSetLang('es')}
            >
              ES
            </button>
          </div>

          <button
            type="button"
            className="aw-topbar__menu-btn"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={lang === 'es' ? 'Abrir menú' : 'Toggle menu'}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className="aw-mobile-nav" data-open={mobileOpen}>
        <div className="aw-mobile-nav__list">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className="aw-mobile-nav__item"
              data-active={activeSection === item.id}
              onClick={() => handleSelect(item.id)}
            >
              <span>{item.label[lang]}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', opacity: 0.7 }}>
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
