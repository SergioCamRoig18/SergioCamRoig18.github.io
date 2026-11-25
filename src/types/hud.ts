export type Lang = 'en' | 'es';

export interface LocalizedText {
  en: string;
  es: string;
}

export type SectionId = 'profile' | 'projects' | 'telemetry' | 'loadout' | 'record' | 'comms';

export interface LanguageStat {
  name: string;
  bytes: number;
  percent: number;
  delta30d: number;
  color: string | null;
}

export interface WeekdayStat {
  /** 0 = Monday .. 6 = Sunday */
  dayIndex: number;
  count: number;
  isPeak: boolean;
}

export interface SummaryMetrics {
  commits12m: number;
  repositories: number;
  pullRequests: number;
  activeDaysPercent: number;
  bestStreakDays: number;
  totalStars: number;
  memberSince: number;
}

export interface HudSnapshot {
  version: number;
  generatedAt: string;
  source: 'graphql' | 'rest' | 'cache' | 'demo';
  user: {
    login: string;
    name: string;
    createdAt: string;
    avatarUrl?: string;
  };
  metrics: SummaryMetrics;
  languages: LanguageStat[];
  weekly: WeekdayStat[];
  publicRepoCount: number;
  activeProjectCount: number;
  totalForks: number;
}

export type ProjectCategory = 'all' | 'web3d' | 'fullstack' | 'tooling';

export interface ProjectChallengeItem {
  title: LocalizedText;
  detail: LocalizedText;
}

export interface ProjectKpiItem {
  value: LocalizedText;
  label: LocalizedText;
  sublabel: LocalizedText;
  highlight?: boolean;
}

export type ProjectVisualKind = 'image' | 'votify-blueprint' | 'hud-pipeline';

export interface PortfolioProject {
  id: string;
  index: string;
  name: string;
  category: Exclude<ProjectCategory, 'all'>;
  statusBadge: LocalizedText;
  maturityLabel: LocalizedText;
  shortDesc: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText;
  timeframe: LocalizedText;
  teamSize: LocalizedText;
  tags: string[];
  visualKind: ProjectVisualKind;
  previewImage?: string;
  logoImage?: string;
  previewAlt: LocalizedText;
  liveUrl?: string;
  repoUrl?: string;
  repoVisibilityNote?: LocalizedText;
  highlights: LocalizedText[];
  challenges: ProjectChallengeItem[];
  kpis: ProjectKpiItem[];
}

export type TechMaturity = 'core' | 'proven' | 'working';

export interface TechNode {
  id: string;
  name: string;
  categoryId: 'backend' | 'frontend' | 'databases' | 'devops';
  maturity: TechMaturity;
  summary: LocalizedText;
  proof: LocalizedText;
  relatedProjectIds: string[];
}

export interface TechCluster {
  id: 'backend' | 'frontend' | 'databases' | 'devops';
  label: LocalizedText;
  subtitle: LocalizedText;
  side: 'left' | 'right';
}

export interface TimelineRecord {
  id: string;
  dateLabel: LocalizedText;
  category: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  badge?: LocalizedText;
  highlight?: boolean;
  icon: 'graduation' | 'globe' | 'layers' | 'terminal' | 'languages';
  actionProjectId?: string;
}
