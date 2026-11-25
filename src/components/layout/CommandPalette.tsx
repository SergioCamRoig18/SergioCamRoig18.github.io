import { Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Lang } from '../../types/hud';
import './CommandPalette.css';

export interface CommandAction {
  id: string;
  label: string;
  category: string;
  keywords: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  lang: Lang;
  actions: CommandAction[];
  onClose: () => void;
}

export function CommandPalette({ open, lang, actions, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.keywords.toLowerCase().includes(q),
    );
  }, [actions, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  if (!open) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter' && filtered[selectedIdx]) {
      e.preventDefault();
      filtered[selectedIdx].run();
      onClose();
    }
  };

  return (
    <div
      className="aw-cmd-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'es' ? 'Paleta de comandos' : 'Command palette'}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="aw-cmd-dialog aw-fade-in">
        <div className="aw-cmd-header">
          <Search size={16} color="var(--aw-yellow)" />
          <input
            ref={inputRef}
            type="text"
            className="aw-cmd-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              lang === 'es'
                ? 'Ir a sección, proyecto, cambiar idioma, copiar email...'
                : 'Jump to section, project, toggle language, copy email...'
            }
          />
          <span className="aw-keycap">ESC</span>
        </div>

        <div className="aw-cmd-list">
          {filtered.length === 0 ? (
            <div className="aw-cmd-empty">
              {lang === 'es' ? 'SIN COINCIDENCIAS' : 'NO MATCHING COMMANDS'}
            </div>
          ) : (
            filtered.map((action, idx) => (
              <button
                key={action.id}
                type="button"
                className="aw-cmd-item"
                data-selected={idx === selectedIdx}
                onMouseEnter={() => setSelectedIdx(idx)}
                onClick={() => {
                  action.run();
                  onClose();
                }}
              >
                <span className="aw-cmd-item__title">{action.label}</span>
                <span className="aw-cmd-item__cat">{action.category}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
