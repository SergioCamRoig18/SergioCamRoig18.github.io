import { useCallback, useMemo, useState } from 'react';
import { BottomControlBar } from './components/layout/BottomControlBar';
import { CommandPalette, type CommandAction } from './components/layout/CommandPalette';
import { HudBackdrop } from './components/layout/HudBackdrop';
import { TopNavBar } from './components/layout/TopNavBar';
import { CommsSection } from './components/sections/CommsSection';
import { LoadoutSection } from './components/sections/LoadoutSection';
import { ProfileSection } from './components/sections/ProfileSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { RecordSection } from './components/sections/RecordSection';
import { TelemetrySection } from './components/sections/TelemetrySection';
import { ProjectBriefingModal } from './components/ui/ProjectBriefingModal';
import { NAV_SECTIONS, PROFILE_DATA } from './data/profile';
import { PORTFOLIO_PROJECTS } from './data/projects';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { useLanguage } from './hooks/useLanguage';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useTelemetry } from './hooks/useTelemetry';
import type { PortfolioProject, ProjectCategory, SectionId, TechNode } from './types/hud';

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export function App() {
  const { lang, setLang, toggleLang } = useLanguage();
  const { snapshot, isLiveRemote } = useTelemetry();
  const activeSection = useScrollSpy(SECTION_IDS);

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeTechFilter, setActiveTechFilter] = useState<{
    id: string;
    name: string;
    projectIds: string[];
  } | null>(null);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);

  const jumpToSection = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const stepSection = useCallback(
    (delta: -1 | 1) => {
      const idx = SECTION_IDS.indexOf(activeSection);
      const nextIdx = (idx + delta + SECTION_IDS.length) % SECTION_IDS.length;
      jumpToSection(SECTION_IDS[nextIdx]);
    },
    [activeSection, jumpToSection],
  );

  const handleOpenProjectById = useCallback((projectId: string) => {
    const found = PORTFOLIO_PROJECTS.find((p) => p.id === projectId);
    if (found) setActiveProject(found);
  }, []);

  const handleFilterByTech = useCallback(
    (node: TechNode) => {
      setSelectedCategory('all');
      setActiveTechFilter({
        id: node.id,
        name: node.name,
        projectIds: node.relatedProjectIds,
      });
      jumpToSection('projects');
    },
    [jumpToSection],
  );

  const handleEscape = useCallback(() => {
    if (cmdOpen) {
      setCmdOpen(false);
    } else if (activeProject) {
      setActiveProject(null);
    }
  }, [cmdOpen, activeProject]);

  useKeyboardNav({
    sections: SECTION_IDS,
    activeSection,
    onJumpSection: jumpToSection,
    onToggleLang: toggleLang,
    onToggleCommandPalette: () => setCmdOpen((prev) => !prev),
    onEscape: handleEscape,
    isOverlayOpen: cmdOpen || activeProject !== null,
  });

  const commandActions = useMemo<CommandAction[]>(() => {
    const sectionActions: CommandAction[] = NAV_SECTIONS.map((s) => ({
      id: `nav-${s.id}`,
      label: `${lang === 'es' ? 'Ir a' : 'Jump to'} ${s.label[lang]}`,
      category: lang === 'es' ? 'NAVEGACIÓN' : 'NAVIGATION',
      keywords: `${s.id} ${s.label.en} ${s.label.es}`,
      run: () => jumpToSection(s.id),
    }));

    const projectActions: CommandAction[] = PORTFOLIO_PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      label: `${lang === 'es' ? 'Abrir informe:' : 'Open Briefing:'} ${p.name}`,
      category: 'AFTER ACTION REPORT',
      keywords: `${p.name} ${p.tags.join(' ')}`,
      run: () => setActiveProject(p),
    }));

    const utilityActions: CommandAction[] = [
      {
        id: 'toggle-lang',
        label: lang === 'es' ? 'Cambiar idioma a English (EN)' : 'Switch language to Español (ES)',
        category: lang === 'es' ? 'SISTEMA' : 'SYSTEM',
        keywords: 'language idioma english español en es',
        run: toggleLang,
      },
      {
        id: 'copy-email',
        label: lang === 'es' ? 'Copiar email de contacto' : 'Copy contact email',
        category: 'COMMS',
        keywords: 'email correo contact copiar copy',
        run: () => {
          void navigator.clipboard?.writeText(PROFILE_DATA.email);
          jumpToSection('comms');
        },
      },
      {
        id: 'open-cv',
        label: lang === 'es' ? 'Abrir CV en PDF (ES)' : 'Open Resume PDF (EN)',
        category: 'COMMS',
        keywords: 'cv resume pdf curriculum descargar download',
        run: () => window.open(PROFILE_DATA.links.cv[lang], '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'open-github',
        label: 'GitHub (@SergioCamRoig18)',
        category: 'EXTERNAL',
        keywords: 'github repos code',
        run: () => window.open(PROFILE_DATA.links.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'open-linkedin',
        label: 'LinkedIn',
        category: 'EXTERNAL',
        keywords: 'linkedin profile network',
        run: () => window.open(PROFILE_DATA.links.linkedin, '_blank', 'noopener,noreferrer'),
      },
    ];

    return [...sectionActions, ...projectActions, ...utilityActions];
  }, [lang, jumpToSection, toggleLang]);

  return (
    <>
      <HudBackdrop />

      <div className="aw-shell">
        <TopNavBar
          items={NAV_SECTIONS}
          activeSection={activeSection}
          lang={lang}
          onSelectSection={jumpToSection}
          onStepSection={stepSection}
          onSetLang={setLang}
          onOpenCommandPalette={() => setCmdOpen(true)}
        />

        <main className="aw-main">
          <ProfileSection lang={lang} snapshot={snapshot} onJumpSection={jumpToSection} />

          <ProjectsSection
            lang={lang}
            projects={PORTFOLIO_PROJECTS}
            snapshot={snapshot}
            selectedCategory={selectedCategory}
            activeTechFilter={activeTechFilter}
            onSelectCategory={setSelectedCategory}
            onClearTechFilter={() => setActiveTechFilter(null)}
            onOpenProject={setActiveProject}
          />

          <TelemetrySection lang={lang} snapshot={snapshot} isLiveRemote={isLiveRemote} />

          <LoadoutSection lang={lang} onFilterByTech={handleFilterByTech} />

          <RecordSection lang={lang} onOpenProjectById={handleOpenProjectById} />

          <CommsSection lang={lang} />
        </main>

        <BottomControlBar
          lang={lang}
          onStepSection={stepSection}
          onToggleLang={toggleLang}
          onOpenCommandPalette={() => setCmdOpen(true)}
          isLiveRemote={isLiveRemote}
        />
      </div>

      <ProjectBriefingModal
        project={activeProject}
        lang={lang}
        onClose={() => setActiveProject(null)}
      />

      <CommandPalette
        open={cmdOpen}
        lang={lang}
        actions={commandActions}
        onClose={() => setCmdOpen(false)}
      />
    </>
  );
}
export default App;
