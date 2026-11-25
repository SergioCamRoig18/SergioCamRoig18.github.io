import { useEffect, useState } from 'react';
import type { SectionId } from '../types/hud';

export function useScrollSpy(sectionIds: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibleRatios = new Map<SectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          visibleRatios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        // Also check near bottom of page so final COMMS section activates cleanly
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
        if (atBottom) {
          setActive(sectionIds[sectionIds.length - 1]);
          return;
        }

        let bestId: SectionId | null = null;
        let bestRatio = 0;
        for (const id of sectionIds) {
          const ratio = visibleRatios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
      },
      {
        rootMargin: '-18% 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 0.85],
      },
    );

    elements.forEach((el) => observer.observe(el));

    const handleScrollBottom = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48) {
        setActive(sectionIds[sectionIds.length - 1]);
      }
    };
    window.addEventListener('scroll', handleScrollBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollBottom);
    };
  }, [sectionIds]);

  return active;
}
