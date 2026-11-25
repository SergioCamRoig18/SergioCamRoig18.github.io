import type { Lang } from '../../types/hud';
import './BottomControlBar.css';

interface BottomControlBarProps {
  lang: Lang;
  onStepSection: (delta: -1 | 1) => void;
  onToggleLang: () => void;
  onOpenCommandPalette: () => void;
  isLiveRemote: boolean;
}

export function BottomControlBar({
  lang,
  onStepSection,
  onToggleLang,
  onOpenCommandPalette,
  isLiveRemote,
}: BottomControlBarProps) {
  return (
    <footer className="aw-bottombar" aria-label={lang === 'es' ? 'Controles rápidos' : 'Quick controls'}>
      <div className="aw-bottombar__inner">
        <div className="aw-bottombar__group">
          <button type="button" className="aw-bottombar__item" onClick={() => onStepSection(-1)}>
            <span>{lang === 'es' ? 'ANTERIOR' : 'PREV SECTION'}</span>
            <span className="aw-keycap">Q</span>
          </button>
          <button type="button" className="aw-bottombar__item" onClick={() => onStepSection(1)}>
            <span>{lang === 'es' ? 'SIGUIENTE' : 'NEXT SECTION'}</span>
            <span className="aw-keycap">E</span>
          </button>
          <button type="button" className="aw-bottombar__item" onClick={onOpenCommandPalette}>
            <span>{lang === 'es' ? 'COMANDOS' : 'COMMANDS'}</span>
            <span className="aw-keycap">CTRL+K</span>
          </button>
        </div>

        <div className="aw-bottombar__group">
          <span className="aw-bottombar__status">
            <span className="aw-radar-dot" aria-hidden="true" />
            <span>
              {isLiveRemote
                ? lang === 'es'
                  ? 'TELEMETRÍA EN VIVO'
                  : 'LIVE TELEMETRY'
                : lang === 'es'
                  ? 'SNAPSHOT SINCRONIZADO'
                  : 'SYNCED SNAPSHOT'}
            </span>
          </span>
          <button type="button" className="aw-bottombar__item" onClick={onToggleLang}>
            <span>{lang === 'es' ? 'IDIOMA' : 'LANGUAGE'}</span>
            <span className="aw-keycap">L</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
