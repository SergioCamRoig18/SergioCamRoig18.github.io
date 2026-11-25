import { useEffect } from 'react';
import type { SectionId } from '../types/hud';

interface KeyboardNavOptions {
  sections: readonly SectionId[];
  activeSection: SectionId;
  onJumpSection: (id: SectionId) => void;
  onToggleLang: () => void;
  onToggleCommandPalette: () => void;
  onEscape: () => void;
  isOverlayOpen: boolean;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

export function useKeyboardNav({
  sections,
  activeSection,
  onJumpSection,
  onToggleLang,
  onToggleCommandPalette,
  onEscape,
  isOverlayOpen,
}: KeyboardNavOptions) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onToggleCommandPalette();
        return;
      }

      if (e.key === 'Escape') {
        onEscape();
        return;
      }

      if (isOverlayOpen || isEditableTarget(e.target) || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'q' || key === 'e') {
        e.preventDefault();
        const idx = sections.indexOf(activeSection);
        const delta = key === 'e' ? 1 : -1;
        const nextIdx = (idx + delta + sections.length) % sections.length;
        onJumpSection(sections[nextIdx]);
        return;
      }

      if (key === 'l') {
        e.preventDefault();
        onToggleLang();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    sections,
    activeSection,
    onJumpSection,
    onToggleLang,
    onToggleCommandPalette,
    onEscape,
    isOverlayOpen,
  ]);
}
