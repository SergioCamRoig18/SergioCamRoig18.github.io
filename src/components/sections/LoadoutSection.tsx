import { CheckCircle2, Cpu, Database, Filter, Layers, ShieldCheck, Terminal } from 'lucide-react';
import { useState } from 'react';
import { TECH_CLUSTERS, TECH_NODES } from '../../data/profile';
import type { Lang, TechCluster, TechMaturity, TechNode } from '../../types/hud';
import { SectionHeader } from '../ui/SectionHeader';
import './LoadoutSection.css';

interface LoadoutSectionProps {
  lang: Lang;
  onFilterByTech: (node: TechNode) => void;
}

const MATURITY_LEVEL: Record<TechMaturity, number> = {
  working: 1,
  proven: 2,
  core: 3,
};

const MATURITY_LABELS: Record<TechMaturity, { en: string; es: string }> = {
  working: { en: 'FOUNDATIONS & ACADEMIC', es: 'FUNDAMENTOS Y GRADO' },
  proven: { en: 'PROJECT PROVEN', es: 'PROBADO EN PROYECTOS' },
  core: { en: 'CORE DAILY STACK', es: 'STACK PRINCIPAL DIARIO' },
};

function CategoryIcon({ categoryId, size = 34 }: { categoryId: TechCluster['id']; size?: number }) {
  switch (categoryId) {
    case 'backend':
      return <Layers size={size} strokeWidth={1.5} />;
    case 'databases':
      return <Database size={size} strokeWidth={1.5} />;
    case 'frontend':
      return <Cpu size={size} strokeWidth={1.5} />;
    case 'devops':
      return <Terminal size={size} strokeWidth={1.5} />;
  }
}

export function LoadoutSection({ lang, onFilterByTech }: LoadoutSectionProps) {
  const [selectedId, setSelectedId] = useState<string>('typescript');
  const selectedNode = TECH_NODES.find((n) => n.id === selectedId) ?? TECH_NODES[0];
  const selectedLevel = MATURITY_LEVEL[selectedNode.maturity];

  const leftClusters = TECH_CLUSTERS.filter((c) => c.side === 'left');
  const rightClusters = TECH_CLUSTERS.filter((c) => c.side === 'right');

  const renderCluster = (cluster: TechCluster) => {
    const nodes = TECH_NODES.filter((n) => n.categoryId === cluster.id);
    return (
      <div key={cluster.id} className="aw-panel aw-cluster-card" data-side={cluster.side}>
        <div className="aw-cluster-card__head">
          <h3 className="aw-cluster-card__title">{cluster.label[lang]}</h3>
          <span className="aw-cluster-card__sub">{cluster.subtitle[lang]}</span>
        </div>

        <div className="aw-node-grid">
          {nodes.map((node) => {
            const level = MATURITY_LEVEL[node.maturity];
            const isSelected = node.id === selectedNode.id;
            return (
              <button
                key={node.id}
                type="button"
                className="aw-tech-node"
                data-selected={isSelected}
                data-maturity={node.maturity}
                onClick={() => setSelectedId(node.id)}
              >
                <div className="aw-tech-node__top">
                  <span className="aw-tech-node__name">{node.name}</span>
                  <span className="aw-tech-node__diamond" aria-hidden="true" />
                </div>
                <div className="aw-tech-node__bars" aria-hidden="true">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className="aw-tech-node__bar"
                      data-filled={step <= level}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="loadout" className="aw-section">
      <SectionHeader
        title={lang === 'es' ? 'Stack Tecnológico' : 'Engineering Loadout'}
        meta={
          lang === 'es'
            ? `${TECH_NODES.length} MÓDULOS · CLIC PARA INSPECCIONAR`
            : `${TECH_NODES.length} MODULES · CLICK TO INSPECT`
        }
      />

      <div className="aw-loadout-schematic">
        <div className="aw-loadout-col">{leftClusters.map(renderCluster)}</div>

        <div className="aw-loadout-core" aria-hidden="true">
          <div className="aw-loadout-core__ring">
            <ShieldCheck size={34} strokeWidth={1.5} />
          </div>
          <span className="aw-loadout-core__label">SWE CORE</span>
          <span className="aw-loadout-core__count">{TECH_NODES.length} MODULES</span>
        </div>

        <div className="aw-loadout-col">{rightClusters.map(renderCluster)}</div>
      </div>

      {/* Bottom Inspector Panel (Exo Upgrade System RESISTANCE style) */}
      <div className="aw-inspector" aria-live="polite">
        <div className="aw-inspector__emblem" aria-hidden="true">
          <CategoryIcon categoryId={selectedNode.categoryId} />
        </div>

        <div className="aw-inspector__body">
          <div className="aw-inspector__top">
            <h3 className="aw-inspector__name">{selectedNode.name}</h3>
            <span className="aw-inspector__tier">{MATURITY_LABELS[selectedNode.maturity][lang]}</span>
          </div>

          <p className="aw-inspector__desc">{selectedNode.summary[lang]}</p>
          <p className="aw-inspector__proof">▸ {selectedNode.proof[lang]}</p>

          <div className="aw-inspector__milestones">
            {(
              [
                { step: 1, en: 'Foundations', es: 'Fundamentos' },
                { step: 2, en: 'Shipped Projects', es: 'En Proyectos' },
                { step: 3, en: 'Core Daily Driver', es: 'Uso Principal' },
              ] as const
            ).map((m) => (
              <span
                key={m.step}
                className="aw-milestone"
                data-reached={selectedLevel >= m.step}
                data-current={selectedLevel === m.step}
              >
                <CheckCircle2 size={13} />
                <span>{m[lang]}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="aw-inspector__cta">
          {selectedNode.relatedProjectIds.length > 0 ? (
            <button
              type="button"
              className="aw-btn aw-btn--primary"
              onClick={() => onFilterByTech(selectedNode)}
            >
              <Filter size={14} />
              <span>
                {lang === 'es'
                  ? `VER PROYECTOS (${selectedNode.relatedProjectIds.length})`
                  : `FILTER PROJECTS (${selectedNode.relatedProjectIds.length})`}
              </span>
            </button>
          ) : (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--aw-text-muted)',
                textTransform: 'uppercase',
              }}
            >
              {lang === 'es' ? 'BASE ACADÉMICA' : 'COURSEWORK BASE'}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
