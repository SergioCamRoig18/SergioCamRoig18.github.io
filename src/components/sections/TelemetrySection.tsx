import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import type { HudSnapshot, Lang } from '../../types/hud';
import { SectionHeader } from '../ui/SectionHeader';
import './TelemetrySection.css';

interface TelemetrySectionProps {
  lang: Lang;
  snapshot: HudSnapshot;
  isLiveRemote: boolean;
}

const WEEKDAYS = {
  en: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  es: ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'],
} as const;

export function TelemetrySection({ lang, snapshot, isLiveRemote }: TelemetrySectionProps) {
  const [avatarFailed, setAvatarFailed] = useState(false);

  const peakDay = snapshot.weekly.find((d) => d.isPeak);
  const maxWeekly = Math.max(1, ...snapshot.weekly.map((d) => d.count));

  const kpis = [
    { label: 'COMMITS (12M)', value: String(snapshot.metrics.commits12m) },
    {
      label: lang === 'es' ? 'REPOSITORIOS' : 'REPOSITORIES',
      value: String(snapshot.metrics.repositories),
    },
    { label: 'PULL REQUESTS', value: String(snapshot.metrics.pullRequests) },
    {
      label: lang === 'es' ? 'DÍAS ACTIVOS' : 'ACTIVE DAYS',
      value: `${snapshot.metrics.activeDaysPercent}%`,
    },
    {
      label: lang === 'es' ? 'MEJOR RACHA' : 'BEST STREAK',
      value: `${snapshot.metrics.bestStreakDays}D`,
    },
    {
      label: lang === 'es' ? 'ESTRELLAS' : 'TOTAL STARS',
      value: String(snapshot.metrics.totalStars),
    },
  ];

  return (
    <section id="telemetry" className="aw-section">
      <SectionHeader
        title={lang === 'es' ? 'Telemetría de GitHub' : 'Live GitHub Telemetry'}
        meta={
          isLiveRemote
            ? lang === 'es'
              ? 'SINCRONIZADO EN VIVO · ACTIONS'
              : 'LIVE SYNC · GITHUB ACTIONS'
            : lang === 'es'
              ? 'SNAPSHOT VERIFICADO'
              : 'VERIFIED SNAPSHOT'
        }
        metaAccent="green"
      />

      <div className="aw-telemetry-wrap">
        <div className="aw-operator-banner">
          <div className="aw-operator-banner__identity">
            <div className="aw-operator-banner__avatar">
              {snapshot.user.avatarUrl && !avatarFailed ? (
                <img
                  src={snapshot.user.avatarUrl}
                  alt={`@${PROFILE_DATA.username}`}
                  onError={() => setAvatarFailed(true)}
                />
              ) : (
                <span className="aw-operator-banner__tag-fallback">{PROFILE_DATA.shortTag}</span>
              )}
            </div>
            <div>
              <h3 className="aw-operator-banner__name">@{PROFILE_DATA.username}</h3>
              <p className="aw-operator-banner__sub">
                {lang === 'es'
                  ? 'Feed automatizado vía GitHub HUD Engine (GraphQL + histórico 30D)'
                  : 'Automated feed powered by my GitHub HUD Engine (GraphQL + 30D ledger)'}
              </p>
            </div>
          </div>

          <div className="aw-operator-banner__right">
            <div className="aw-operator-banner__since">
              <span className="aw-operator-banner__since-lbl">
                {lang === 'es' ? 'MIEMBRO DESDE' : 'MEMBER SINCE'}
              </span>
              <span className="aw-operator-banner__since-val">{snapshot.metrics.memberSince}</span>
            </div>

            <a
              href={PROFILE_DATA.links.github}
              target="_blank"
              rel="noreferrer"
              className="aw-btn"
            >
              <Github size={15} />
              <span>{lang === 'es' ? 'PERFIL' : 'PROFILE'}</span>
              <ExternalLink size={12} opacity={0.7} />
            </a>
          </div>
        </div>

        <div className="aw-kpi-grid">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="aw-panel aw-kpi-tile">
              <span className="aw-kpi-tile__label">{kpi.label}</span>
              <span className="aw-kpi-tile__value">{kpi.value}</span>
            </div>
          ))}
        </div>

        <div className="aw-telemetry-split">
          <div className="aw-panel aw-telemetry-card">
            <div className="aw-telemetry-card__head">
              <span className="aw-telemetry-card__title">
                {lang === 'es' ? 'Lenguajes Más Usados' : 'Most Used Languages'}
              </span>
              <span className="aw-telemetry-card__meta">
                {lang === 'es' ? 'DELTA 30D' : '30D DELTA'}
              </span>
            </div>

            <div className="aw-lang-list">
              {snapshot.languages.map((item) => {
                const isPos = item.delta30d > 0;
                const isNeg = item.delta30d < 0;
                const basePct = isPos
                  ? Math.max(0, item.percent - item.delta30d)
                  : item.percent;
                const deltaPct = Math.min(100 - basePct, Math.abs(item.delta30d));

                return (
                  <div key={item.name} className="aw-lang-item">
                    <div className="aw-lang-item__top">
                      <span className="aw-lang-item__name">{item.name}</span>
                      <span className="aw-lang-item__nums">
                        {isPos && (
                          <span className="aw-lang-item__delta--pos">
                            ▲ +{item.delta30d.toFixed(1)}%
                          </span>
                        )}
                        {isNeg && (
                          <span className="aw-lang-item__delta--neg">
                            ▼ {item.delta30d.toFixed(1)}%
                          </span>
                        )}
                        <span className="aw-lang-item__pct">{item.percent.toFixed(1)}%</span>
                      </span>
                    </div>

                    <div className="aw-lang-bar-row">
                      <span className="aw-lang-bar-bound">0</span>
                      <div className="aw-bar-track">
                        <div className="aw-bar-fill" style={{ width: `${basePct}%` }} />
                        {isPos && (
                          <div
                            className="aw-bar-fill aw-bar-fill--yellow"
                            style={{ width: `${deltaPct}%` }}
                          />
                        )}
                        {isNeg && (
                          <div
                            className="aw-coral-hatch"
                            style={{ width: `${deltaPct}%`, height: '100%' }}
                          />
                        )}
                      </div>
                      <span className="aw-lang-bar-bound aw-lang-bar-bound--end">100</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="aw-panel aw-telemetry-card">
            <div className="aw-telemetry-card__head">
              <span className="aw-telemetry-card__title">
                {lang === 'es' ? 'Ritmo Semanal' : 'Weekly Rhythm'}
              </span>
              <span className="aw-telemetry-card__meta aw-telemetry-card__meta--yellow">
                {lang === 'es' ? 'PICO: ' : 'PEAK: '}
                {peakDay ? WEEKDAYS[lang][peakDay.dayIndex] : '—'}
              </span>
            </div>

            <div className="aw-weekly-list">
              {snapshot.weekly.map((day) => {
                const pct = Math.round((day.count / maxWeekly) * 100);
                return (
                  <div key={day.dayIndex} className="aw-weekly-row" data-peak={day.isPeak}>
                    <span className="aw-weekly-row__day">{WEEKDAYS[lang][day.dayIndex]}</span>
                    <div className="aw-bar-track">
                      <div
                        className={`aw-bar-fill${day.isPeak ? ' aw-bar-fill--yellow' : ''}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="aw-weekly-row__count">{day.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="aw-telemetry-footnote">
          <span className="aw-telemetry-footnote__live">
            <span className="aw-radar-dot" aria-hidden="true" />
            <span>
              {lang === 'es'
                ? 'Actualizado automáticamente a diario mediante GitHub Actions (data/telemetry.json)'
                : 'Updated automatically every day via GitHub Actions (data/telemetry.json)'}
            </span>
          </span>
        </p>
      </div>
    </section>
  );
}
