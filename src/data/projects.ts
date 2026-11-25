import type { PortfolioProject } from '../types/hud';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'zubopedia-web',
    index: '01',
    name: 'Zubopedia-Web',
    category: 'web3d',
    statusBadge: { en: 'LIVE PRODUCTION', es: 'EN PRODUCCIÓN' },
    maturityLabel: { en: 'Production · 4 Languages', es: 'Producción · 4 Idiomas' },
    shortDesc: {
      en: 'Interactive 3D WebGL encyclopedia (55 models), 5 custom-coordinate Leaflet overworld maps, and daily Zubodle minigame deployed on Cloudflare Edge.',
      es: 'Enciclopedia interactiva 3D en WebGL (55 modelos), 5 mapas de mundo en Leaflet con coordenadas propias y minijuego diario Zubodle en Cloudflare Edge.',
    },
    summary: {
      en: 'A free, ad-free interactive web platform preserving Zubo (Nintendo DS, 2008). Combines a real-time Three.js 3D catalog for all 55 playable characters, 5 custom Leaflet maps with filterable markers, a daily Wordle-style minigame (Zubodle), and custom Cloudflare Pages Edge SEO middleware across 4 languages.',
      es: 'Plataforma web interactiva gratuita y sin anuncios dedicada a preservar Zubo (Nintendo DS, 2008). Combina un catálogo 3D en tiempo real con Three.js para los 55 personajes jugables, 5 mapas interactivos en Leaflet, el minijuego diario Zubodle y middleware Edge en Cloudflare Pages para SEO en 4 idiomas.',
    },
    role: { en: 'Solo Creator & Frontend Engineer', es: 'Creador Único e Ingeniero Frontend' },
    timeframe: { en: '2026 · Active', es: '2026 · Activo' },
    teamSize: { en: 'Solo Project', es: 'Proyecto Individual' },
    tags: ['TypeScript', 'React', 'Three.js', 'Leaflet', 'Cloudflare', 'Vite'],
    visualKind: 'image',
    previewImage: '/projects/zubopedia-preview.png',
    previewAlt: {
      en: 'Zubopedia-Web homepage and 3D interactive catalog preview',
      es: 'Vista previa de Zubopedia-Web y su catálogo 3D interactivo',
    },
    liveUrl: 'https://zubopedia.pages.dev/?lang=en',
    repoUrl: 'https://github.com/SergioCamRoig18/Zubopedia-Web',
    kpis: [
      {
        value: { en: '55', es: '55' },
        label: { en: '3D WebGL Models', es: 'Modelos 3D WebGL' },
        sublabel: { en: 'Three.js · GLTFLoader', es: 'Three.js · GLTFLoader' },
        highlight: true,
      },
      {
        value: { en: '5 Maps', es: '5 Mapas' },
        label: { en: 'Interactive Worlds', es: 'Mundos en Leaflet' },
        sublabel: { en: 'Custom coords & markers', es: 'Coords propias y filtros' },
      },
      {
        value: { en: '4 Langs', es: '4 Idiomas' },
        label: { en: 'Edge SEO Routes', es: 'SEO Edge Multilingüe' },
        sublabel: { en: 'ES · EN · FR · DE', es: 'ES · EN · FR · DE' },
      },
    ],
    highlights: [
      {
        en: '55 rotatable WebGL 3D character models (Three.js GLTFLoader + OrbitControls + Ult form toggle).',
        es: '55 modelos 3D rotables en WebGL (Three.js GLTFLoader + OrbitControls + vista de forma Ult).',
      },
      {
        en: '5 interactive Leaflet world maps with custom coordinate spaces, polygon regions, and direct catalog jump links.',
        es: '5 mapas interactivos en Leaflet con espacios de coordenadas propios, regiones poligonales y saltos directos al catálogo.',
      },
      {
        en: 'Daily Zubodle guessing minigame with streak persistence in localStorage and zero tracking cookies.',
        es: 'Minijuego diario Zubodle con rachas en localStorage, pistas comparativas y cero cookies de rastreo.',
      },
      {
        en: 'Custom Cloudflare Pages Functions middleware (HTMLRewriter) serving localized meta/OG/hreflang tags across 65 routes × 4 languages.',
        es: 'Middleware propio en Cloudflare Pages Functions (HTMLRewriter) generando meta/OG/hreflang en 65 rutas × 4 idiomas.',
      },
    ],
    challenges: [
      {
        title: {
          en: 'Multilingual SEO on a Vite SPA',
          es: 'SEO multilingüe en una SPA con Vite',
        },
        detail: {
          en: 'Built a Cloudflare Pages Functions middleware using HTMLRewriter to dynamically inject localized titles, canonicals, hreflang, and Open Graph previews across 260 localized route variants.',
          es: 'Implementé un middleware en Cloudflare Pages Functions con HTMLRewriter para inyectar títulos, canonical, hreflang y tarjetas Open Graph localizadas en 260 variantes de ruta.',
        },
      },
      {
        title: {
          en: 'Smooth 3D & Map Performance',
          es: 'Rendimiento fluido en 3D y mapas',
        },
        detail: {
          en: 'Loaded GLTF assets on demand per character view with proper WebGL cleanup, paired with lightweight Leaflet image overlays and custom sprite markers for desktop and mobile.',
          es: 'Carga bajo demanda de modelos GLTF por vista con limpieza de recursos WebGL, combinada con capas optimizadas y marcadores ligeros en Leaflet para escritorio y móvil.',
        },
      },
    ],
  },
  {
    id: 'votify',
    index: '02',
    name: 'Votify',
    category: 'fullstack',
    statusBadge: { en: 'CASE STUDY', es: 'CASO DE ESTUDIO' },
    maturityLabel: { en: 'Layered .NET 9 · Team of 4', es: '.NET 9 en Capas · Equipo de 4' },
    shortDesc: {
      en: 'Full-stack event & multi-mode voting platform built in C# / .NET 9, Blazor Server, and PostgreSQL with analytics dashboards, PDF certificates, AI improvement reports, and xUnit tests.',
      es: 'Plataforma full-stack de gestión de eventos y votaciones en C# / .NET 9, Blazor Server y PostgreSQL con dashboards de analítica, certificados PDF, informes IA y tests xUnit.',
    },
    summary: {
      en: 'A collaborative web platform for organizing competitions, hackathons, and academic events. Supports multiple voting modes (simple, scored, and rubric-based), real-time event notifications, automated PDF certificates (QuestPDF), admin & participant analytics dashboards, and AI-assisted improvement roadmaps via Gemini.',
      es: 'Plataforma web colaborativa para organizar competiciones, hackathons y eventos académicos. Soporta múltiples modos de votación (simple, puntuación y baremos), notificaciones en tiempo real, certificados PDF automáticos (QuestPDF), dashboards de analítica para participantes y administradores e informes de mejora asistidos por Gemini AI.',
    },
    role: {
      en: 'Lead Contributor (185 commits) · Service Layer, Dashboards, Certificates & Testing',
      es: 'Principal Contribuidor (185 commits) · Capa de Servicio, Dashboards, Certificados y Testing',
    },
    timeframe: { en: 'Spring 2026', es: 'Primavera 2026' },
    teamSize: { en: '4-Engineer Team', es: 'Equipo de 4' },
    tags: ['C#', '.NET 9', 'Blazor', 'PostgreSQL', 'Supabase', 'xUnit'],
    visualKind: 'votify-blueprint',
    logoImage: '/projects/votify-logo.png',
    previewAlt: {
      en: 'Votify 3-layer .NET 9 system architecture overview',
      es: 'Esquema de arquitectura en 3 capas de Votify en .NET 9',
    },
    repoVisibilityNote: {
      en: 'Private team repository — architecture summary and my individual contributions documented here.',
      es: 'Repositorio privado de equipo — resumen de arquitectura y mi aportación individual documentados aquí.',
    },
    kpis: [
      {
        value: { en: '185', es: '185' },
        label: { en: 'Authored Commits', es: 'Commits Propios' },
        sublabel: { en: 'Lead dev · 4-person team', es: 'Mayor aportación · Equipo de 4' },
        highlight: true,
      },
      {
        value: { en: '3 Layers', es: '3 Capas' },
        label: { en: 'ASP.NET Core 9', es: 'ASP.NET Core 9' },
        sublabel: { en: 'Blazor · Domain · EF Core', es: 'Blazor · Dominio · EF Core' },
      },
      {
        value: { en: 'xUnit', es: 'xUnit' },
        label: { en: 'Automated Testing', es: 'Tests Unitarios' },
        sublabel: { en: 'Core business patterns', es: 'Lógica y patrones clave' },
      },
    ],
    highlights: [
      {
        en: 'Clean 3-layer ASP.NET Core 9 architecture (Presentation · Business Logic · Persistence) backed by PostgreSQL and Entity Framework Core.',
        es: 'Arquitectura en 3 capas en ASP.NET Core 9 (Presentación · Lógica de negocio · Persistencia) sobre PostgreSQL y Entity Framework Core.',
      },
      {
        en: 'Owned core application workflows: voting configuration & rankings, participant/admin dashboards, real-time notifications, PDF certificates, and AI improvement roadmaps.',
        es: 'Desarrollo de los flujos principales: configuración de votaciones y rankings, dashboards de participantes/administradores, notificaciones, certificados PDF y hoja de ruta de mejora con IA.',
      },
      {
        en: 'Authored xUnit unit tests covering certificate generation, event notifications, file handling contracts, and AI report templates.',
        es: 'Pruebas unitarias en xUnit cubriendo la generación de certificados, notificaciones de eventos, contratos de gestión de archivos y plantillas de informes con IA.',
      },
    ],
    challenges: [
      {
        title: {
          en: 'End-to-End Voting Engine, Rankings & Analytics Dashboards',
          es: 'Motor de votaciones, rankings y dashboards de analítica',
        },
        detail: {
          en: 'Built the core service layer and full voting lifecycle (simple, scored, and rubric-based), podium rankings, and dual analytics dashboards for both admins and participants, keeping EF Core reads and Blazor Server sessions stable under concurrent navigation.',
          es: 'Desarrollé la capa de servicio principal y el ciclo completo de votaciones (simple, puntuación y baremos), rankings con podio y dashboards de métricas para administradores y participantes, asegurando la estabilidad de EF Core y sesiones en Blazor Server.',
        },
      },
      {
        title: {
          en: 'Automated PDF Certificates, AI Roadmap & xUnit Testing',
          es: 'Certificados PDF, hoja de ruta IA y cobertura xUnit',
        },
        detail: {
          en: 'Implemented automated performance and award PDF certificates (Builder + QuestPDF), Gemini AI improvement roadmaps (Adapter + Template Method), and xUnit unit tests validating the core domain modules.',
          es: 'Implementé la generación automática de certificados PDF por rendimiento y premios (Builder + QuestPDF), los informes de mejora asistidos con Gemini AI (Adapter + Template Method) y pruebas unitarias en xUnit para validar los módulos críticos.',
        },
      },
    ],
  },
  {
    id: 'github-hud-engine',
    index: '03',
    name: 'GitHub HUD Engine',
    category: 'tooling',
    statusBadge: { en: 'AUTOMATED CI/CD', es: 'CI/CD AUTOMÁTICO' },
    maturityLabel: { en: 'Zero-Dep CLI · Daily Cron', es: 'CLI Cero Deps · Cron Diario' },
    shortDesc: {
      en: 'Zero-dependency TypeScript telemetry collector & deterministic SVG HUD generator with GraphQL+REST fallback, 30-day language deltas, and SHA-256 cache-busting.',
      es: 'Recolector de telemetría y generador SVG HUD en TypeScript sin dependencias externas, con GraphQL+fallback REST, deltas a 30 días y cache-busting SHA-256.',
    },
    summary: {
      en: 'Instead of relying on third-party profile widgets, I engineered a self-contained TypeScript engine that queries GitHub GraphQL (with automatic REST & local cache fallback), persists daily language snapshots to compute 30-day deltas, renders bilingual CoD: AW-inspired SVG panels, and updates READMEs automatically via GitHub Actions.',
      es: 'En lugar de depender de widgets de terceros, diseñé un motor propio en TypeScript que consulta GitHub GraphQL (con fallback automático a REST y caché local), persiste snapshots diarios para calcular deltas de lenguajes a 30 días, renderiza paneles SVG bilingües estilo CoD: AW y actualiza los README automáticamente con GitHub Actions.',
    },
    role: { en: 'Solo Engineer', es: 'Ingeniero Único' },
    timeframe: { en: 'Nov 2026 · Running Daily', es: 'Nov 2026 · Ejecución Diaria' },
    teamSize: { en: 'Solo Project', es: 'Proyecto Individual' },
    tags: ['TypeScript', 'Node.js', 'GraphQL', 'GitHub Actions', 'SVG'],
    visualKind: 'hud-pipeline',
    previewAlt: {
      en: 'GitHub HUD Engine 4-stage automated telemetry and SVG pipeline',
      es: 'Pipeline automatizado en 4 fases del GitHub HUD Engine',
    },
    liveUrl: 'https://github.com/SergioCamRoig18',
    repoUrl: 'https://github.com/SergioCamRoig18/SergioCamRoig18',
    kpis: [
      {
        value: { en: '0 Deps', es: '0 Deps' },
        label: { en: 'Runtime Packages', es: 'Paquetes Externos' },
        sublabel: { en: 'Pure Node.js 24 + TS', es: 'Node.js 24 + TS nativo' },
        highlight: true,
      },
      {
        value: { en: 'Daily', es: 'Diario' },
        label: { en: 'GitHub Actions CI', es: 'CI en GitHub Actions' },
        sublabel: { en: 'Cron + manual dispatch', es: 'Cron + ejecución manual' },
      },
      {
        value: { en: 'SHA-256', es: 'SHA-256' },
        label: { en: 'Cache Busting', es: 'Control de Caché' },
        sublabel: { en: 'EN + ES · node:test', es: 'EN + ES · node:test' },
      },
    ],
    highlights: [
      {
        en: 'Zero runtime npm dependencies — built purely on Node.js 24 native TypeScript execution, node:fs, node:crypto, fetch, and node:test.',
        es: 'Cero dependencias externas en runtime — construido sobre Node.js 24 nativo (node:fs, node:crypto, fetch y node:test).',
      },
      {
        en: 'Resilient data pipeline: primary GraphQL collection → public REST fallback → local cache baseline.',
        es: 'Pipeline tolerante a fallos: consulta principal GraphQL → fallback REST público → caché local.',
      },
      {
        en: '3-tier tech tag prioritization + deterministic width packing without mid-word ellipsis truncation.',
        es: 'Priorización de tags técnicos en 3 niveles + empaquetado exacto por ancho sin truncados a mitad de palabra.',
      },
      {
        en: 'Deterministic 8-char SHA-256 hash cache-busting (?v=<hash>) eliminating stale GitHub Camo proxy renders.',
        es: 'Cache-busting determinista mediante hash SHA-256 de 8 caracteres (?v=<hash>) eliminando la caché obsoleta de GitHub Camo.',
      },
    ],
    challenges: [
      {
        title: {
          en: '30-Day Language Trends Without Historical API',
          es: 'Tendencias a 30 días sin API histórica',
        },
        detail: {
          en: 'GitHub only exposes current byte totals per language, so I persisted a rolling 120-day JSON ledger inside the repository to compute real 30-day deltas on every CI run.',
          es: 'GitHub solo devuelve los bytes actuales por lenguaje, así que persistí un registro rotativo de 120 días en JSON dentro del repo para calcular deltas reales a 30 días en cada ejecución.',
        },
      },
      {
        title: {
          en: 'Eliminating Stale GitHub Camo Image Caching',
          es: 'Evitar imágenes cacheadas en GitHub Camo',
        },
        detail: {
          en: 'Added deterministic SHA-256 hashing (?v=<hash>) automatically rewritten into README.md and README.es.md so updated SVGs refresh immediately after every bot commit.',
          es: 'Añadí hashing SHA-256 determinista (?v=<hash>) reescrito automáticamente en README.md y README.es.md para que los SVG se refresquen al instante tras cada commit del bot.',
        },
      },
    ],
  },
];
