import type { SectionId, TechCluster, TechNode, TimelineRecord } from '../types/hud';

export const NAV_SECTIONS: readonly { id: SectionId; label: { en: string; es: string } }[] = [
  { id: 'profile', label: { en: 'Profile', es: 'Perfil' } },
  { id: 'projects', label: { en: 'Projects', es: 'Proyectos' } },
  { id: 'telemetry', label: { en: 'Telemetry', es: 'Telemetría' } },
  { id: 'loadout', label: { en: 'Loadout', es: 'Stack' } },
  { id: 'record', label: { en: 'Record', es: 'Trayectoria' } },
  { id: 'comms', label: { en: 'Comms', es: 'Contacto' } },
] as const;

export const PROFILE_DATA = {
  username: 'SergioCamRoig18',
  displayName: 'Sergio Camacho Roig',
  shortTag: 'SCR',
  portraitUrl: '/avatar-sergio.jpg',
  email: 'sergiocamroig18@gmail.com',
  links: {
    github: 'https://github.com/SergioCamRoig18',
    linkedin: 'https://www.linkedin.com/in/sergio-camacho-roig-343550318/',
    cv: {
      en: '/cv/Sergio-Camacho-Roig-CV-EN.pdf',
      es: '/cv/Sergio-Camacho-Roig-CV-ES.pdf',
    },
  },
  greeting: {
    en: "HELLO, I'M",
    es: 'HOLA, SOY',
  },
  subtitle: {
    en: 'Software Engineering Student (UPV) · Full-Stack & Backend',
    es: 'Estudiante de Ingeniería del Software (UPV) · Full-Stack y Backend',
  },
  intro: {
    en: '4th-year Computer Engineering student at Universitat Politècnica de València (UPV). I build interactive web applications, clean layered backends, and automated developer tooling with TypeScript, React, C# (.NET) and PostgreSQL.',
    es: 'Estudiante de 4º de Ingeniería Informática en la Universitat Politècnica de València (UPV). Construyo aplicaciones web interactivas, backends limpios por capas y herramientas automatizadas con TypeScript, React, C# (.NET) y PostgreSQL.',
  },
  about: {
    title: { en: 'About Me', es: 'Sobre Mí' },
    body: {
      en: 'I focus on writing readable, testable code and understanding the architecture behind everything I ship — from a 3D WebGL encyclopedia with Edge SEO to a layered .NET platform built in a 4-person team or zero-dependency CI pipelines. Outside engineering, previous customer-facing roles taught me how to communicate clearly, stay organized, and perform calmly under pressure.',
      es: 'Me centro en escribir código legible, testeable y en entender la arquitectura detrás de lo que publico — desde una enciclopedia 3D con SEO en el edge hasta una plataforma en .NET desarrollada en un equipo de 4 o pipelines CI sin dependencias. Fuera del código, mis experiencias laborales previas de cara al público me han dado soltura para comunicarme con claridad y trabajar con calma bajo presión.',
    },
  },
  availability: {
    en: 'Open to Internships & Junior SWE Roles',
    es: 'Disponible para Prácticas y Roles Junior',
  },
  credentials: [
    {
      id: 'university',
      label: { en: 'University', es: 'Universidad' },
      value: { en: 'UPV · 4th Year', es: 'UPV · 4º Curso' },
      targetSection: 'record' as SectionId,
    },
    {
      id: 'languages',
      label: { en: 'Languages', es: 'Idiomas' },
      value: { en: 'Spanish (Native) · English C1', es: 'Español (Nativo) · Inglés C1' },
      targetSection: 'comms' as SectionId,
    },
    {
      id: 'location',
      label: { en: 'Location', es: 'Ubicación' },
      value: { en: 'Valencia, Spain', es: 'Valencia, España' },
      targetSection: 'comms' as SectionId,
    },
  ],
};

export const TECH_CLUSTERS: TechCluster[] = [
  {
    id: 'backend',
    label: { en: 'Backend & Core', es: 'Backend y Core' },
    subtitle: { en: 'Layered Systems & APIs', es: 'Arquitectura por Capas y APIs' },
    side: 'left',
  },
  {
    id: 'databases',
    label: { en: 'Databases & Cloud', es: 'Bases de Datos y Cloud' },
    subtitle: { en: 'Relational, Storage & Edge', es: 'Relacional, Storage y Edge' },
    side: 'left',
  },
  {
    id: 'frontend',
    label: { en: 'Frontend & Interactive', es: 'Frontend e Interactivo' },
    subtitle: { en: 'UI, 3D WebGL & Maps', es: 'Interfaces, 3D WebGL y Mapas' },
    side: 'right',
  },
  {
    id: 'devops',
    label: { en: 'DevOps & Quality', es: 'DevOps y Calidad' },
    subtitle: { en: 'CI/CD, Containers & Testing', es: 'CI/CD, Contenedores y Tests' },
    side: 'right',
  },
];

export const TECH_NODES: TechNode[] = [
  {
    id: 'csharp-dotnet',
    name: 'C# (.NET 9)',
    categoryId: 'backend',
    maturity: 'proven',
    summary: {
      en: 'Layered ASP.NET Core 9 architecture with Dependency Injection, Entity Framework Core, Repository/Unit of Work, GoF design patterns, and xUnit testing.',
      es: 'Arquitectura ASP.NET Core 9 por capas con Inyección de Dependencias, Entity Framework Core, Repository/Unit of Work, patrones GoF y testing con xUnit.',
    },
    proof: {
      en: 'Lead contributor on Votify (185 commits, layered service logic, dashboards & xUnit tests).',
      es: 'Principal contribuidor en Votify (185 commits, capa de servicio, dashboards y tests xUnit).',
    },
    relatedProjectIds: ['votify'],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    categoryId: 'backend',
    maturity: 'proven',
    summary: {
      en: 'Zero-dependency Node.js CLI pipelines, native GraphQL/REST fetch clients, SHA-256 asset hashing, and built-in node:test suites.',
      es: 'Herramientas CLI en Node.js sin dependencias externas, clientes nativos GraphQL/REST, hashing SHA-256 y suites de test con node:test.',
    },
    proof: {
      en: 'Powers the automated GitHub HUD Engine running daily in CI.',
      es: 'Motor del GitHub HUD Engine ejecutándose diariamente en CI.',
    },
    relatedProjectIds: ['github-hud-engine'],
  },
  {
    id: 'java',
    name: 'Java',
    categoryId: 'backend',
    maturity: 'working',
    summary: {
      en: 'Object-oriented design, data structures, concurrency fundamentals, and desktop/backend academic projects built across Computer Engineering coursework.',
      es: 'Diseño orientado a objetos, estructuras de datos, fundamentos de concurrencia y proyectos académicos de escritorio/backend a lo largo del grado.',
    },
    proof: {
      en: 'Core language across university algorithms, OOP, and software design courses.',
      es: 'Lenguaje troncal en asignaturas de algoritmos, POO y diseño de software.',
    },
    relatedProjectIds: [],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    categoryId: 'databases',
    maturity: 'proven',
    summary: {
      en: 'Relational schema design, iterative EF Core migrations (Npgsql), referential integrity, unique constraints, and analytical dashboard queries.',
      es: 'Diseño de esquemas relacionales, migraciones iterativas con EF Core (Npgsql), integridad referencial, restricciones únicas y consultas analíticas.',
    },
    proof: {
      en: '23 schema migrations managing events, projects, voting rubrics, and rankings in Votify.',
      es: '23 migraciones gestionando eventos, proyectos, baremos de votación y rankings en Votify.',
    },
    relatedProjectIds: ['votify'],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    categoryId: 'databases',
    maturity: 'working',
    summary: {
      en: 'Managed cloud PostgreSQL hosting and real-time event integrations in collaborative full-stack web apps.',
      es: 'PostgreSQL gestionado en la nube e integraciones de eventos en tiempo real en aplicaciones web full-stack.',
    },
    proof: {
      en: 'Used as the cloud PostgreSQL & Realtime backend foundation in Votify.',
      es: 'Base PostgreSQL en la nube y eventos en tiempo real en el proyecto en equipo Votify.',
    },
    relatedProjectIds: ['votify'],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    categoryId: 'databases',
    maturity: 'working',
    summary: {
      en: 'SQL querying, normalization, indexing fundamentals, and relational modeling across database engineering coursework.',
      es: 'Consultas SQL, normalización, fundamentos de indexación y modelado relacional en asignaturas de ingeniería de bases de datos.',
    },
    proof: {
      en: 'Applied in university database design and relational query optimization labs.',
      es: 'Aplicado en laboratorios universitarios de diseño y optimización relacional.',
    },
    relatedProjectIds: [],
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Pages',
    categoryId: 'databases',
    maturity: 'proven',
    summary: {
      en: 'Global edge deployment and custom Pages Functions Middleware (HTMLRewriter) for dynamic multilingual SEO across static React SPAs.',
      es: 'Despliegue global en el edge y Middleware de Pages Functions (HTMLRewriter) para SEO multilingüe dinámico en SPAs de React.',
    },
    proof: {
      en: 'Serves Zubopedia-Web with dynamic meta/hreflang tags across 65 routes × 4 languages.',
      es: 'Sirve Zubopedia-Web con meta/hreflang dinámicos en 65 rutas × 4 idiomas.',
    },
    relatedProjectIds: ['zubopedia-web'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    categoryId: 'frontend',
    maturity: 'core',
    summary: {
      en: 'Strict-mode TypeScript for React SPAs, typed GraphQL/REST telemetry collectors, deterministic SVG rendering engines, and maintainable modular codebases.',
      es: 'TypeScript en modo estricto para SPAs en React, recolectores tipados GraphQL/REST, motores SVG deterministas y arquitecturas modulares.',
    },
    proof: {
      en: 'Primary language across Zubopedia-Web, GitHub HUD Engine, and this portfolio.',
      es: 'Lenguaje principal en Zubopedia-Web, GitHub HUD Engine y este portfolio.',
    },
    relatedProjectIds: ['zubopedia-web', 'github-hud-engine'],
  },
  {
    id: 'react',
    name: 'React + Vite',
    categoryId: 'frontend',
    maturity: 'core',
    summary: {
      en: 'Component-driven interactive web apps, custom hooks, i18n (ES/EN/FR/DE), accessible keyboard navigation, and fast Vite builds.',
      es: 'Aplicaciones web interactivas basadas en componentes, hooks propios, i18n (ES/EN/FR/DE), navegación por teclado y builds rápidos con Vite.',
    },
    proof: {
      en: 'Production frontend for Zubopedia-Web and this Advanced Warfare HUD portfolio.',
      es: 'Frontend en producción de Zubopedia-Web y de este portfolio HUD.',
    },
    relatedProjectIds: ['zubopedia-web'],
  },
  {
    id: 'threejs',
    name: 'Three.js / Leaflet',
    categoryId: 'frontend',
    maturity: 'proven',
    summary: {
      en: 'Real-time WebGL 3D model viewers (GLTFLoader, OrbitControls, custom lighting) and custom-coordinate interactive 2D maps with polygon zones and markers.',
      es: 'Visores 3D en tiempo real con WebGL (GLTFLoader, OrbitControls, iluminación) y mapas interactivos 2D con coordenadas personalizadas, zonas y marcadores.',
    },
    proof: {
      en: '55 interactive 3D models and 5 overworld maps live in Zubopedia-Web.',
      es: '55 modelos 3D interactivos y 5 mapas del mundo en vivo en Zubopedia-Web.',
    },
    relatedProjectIds: ['zubopedia-web'],
  },
  {
    id: 'blazor',
    name: 'Blazor Server',
    categoryId: 'frontend',
    maturity: 'proven',
    summary: {
      en: 'Componentized C# web UI with Radzen Blazor, interactive dashboards, real-time notifications, DTO binding, and keyboard shortcuts.',
      es: 'Interfaces web en C# con Radzen Blazor, dashboards interactivos, notificaciones en tiempo real, enlace por DTOs y atajos de teclado.',
    },
    proof: {
      en: '30 Razor views and administrative analytics dashboards built for Votify.',
      es: '30 vistas Razor y dashboards de administración construidos para Votify.',
    },
    relatedProjectIds: ['votify'],
  },
  {
    id: 'git-actions',
    name: 'Git & GitHub Actions',
    categoryId: 'devops',
    maturity: 'core',
    summary: {
      en: 'Feature-branch team collaboration, merge conflict resolution, scheduled cron pipelines, automated asset commits, and GitHub Pages deployments.',
      es: 'Colaboración en equipo por ramas, resolución de conflictos, pipelines cron programados, commits automatizados y despliegues en GitHub Pages.',
    },
    proof: {
      en: 'Daily telemetry CI pipeline in GitHub HUD Engine + 185 team commits in Votify.',
      es: 'Pipeline CI diario en GitHub HUD Engine + 185 commits en equipo en Votify.',
    },
    relatedProjectIds: ['github-hud-engine', 'votify'],
  },
  {
    id: 'testing',
    name: 'xUnit & node:test',
    categoryId: 'devops',
    maturity: 'proven',
    summary: {
      en: 'Automated unit testing for business logic, design pattern contracts (Builder, Observer, Proxy, Template Method), and deterministic renderers.',
      es: 'Testing unitario automatizado de lógica de negocio, contratos de patrones (Builder, Observer, Proxy, Template Method) y renderizadores deterministas.',
    },
    proof: {
      en: 'Authored xUnit tests for Votify core modules + unit test suite in GitHub HUD Engine.',
      es: 'Tests unitarios en xUnit para módulos clave de Votify + suite de tests en GitHub HUD Engine.',
    },
    relatedProjectIds: ['votify', 'github-hud-engine'],
  },
  {
    id: 'docker',
    name: 'Docker',
    categoryId: 'devops',
    maturity: 'working',
    summary: {
      en: 'Containerization fundamentals, Dockerfiles, and reproducible local development environments for backend services and databases.',
      es: 'Fundamentos de contenerización, Dockerfiles y entornos locales reproducibles para servicios backend y bases de datos.',
    },
    proof: {
      en: 'Applied across Computer Engineering labs and containerized backend development setups.',
      es: 'Aplicado en laboratorios del grado y entornos contenerizados de desarrollo backend.',
    },
    relatedProjectIds: [],
  },
];

export const DEGREE_SPAN = {
  periodStart: { en: 'SEP 2023', es: 'SEP 2023' },
  periodEnd: { en: '2027 · ONGOING', es: '2027 · EN CURSO' },
  category: { en: 'EDUCATION', es: 'FORMACIÓN' },
  title: {
    en: 'B.Sc. in Computer Engineering',
    es: 'Grado en Ingeniería Informática',
  },
  subtitle: {
    en: 'Universitat Politècnica de València (UPV) · 4th Year · Software Engineering Track',
    es: 'Universitat Politècnica de València (UPV) · 4º Curso · Rama Ingeniería del Software',
  },
  description: {
    en: 'Ongoing four-year degree spanning all engineering deployments alongside core coursework in software architecture, design patterns, relational databases, web systems, and testing.',
    es: 'Grado de cuatro años en curso que enmarca todos los proyectos desarrollados junto a la formación troncal en arquitectura de software, patrones de diseño, bases de datos, sistemas web y testing.',
  },
};

export const TIMELINE_RECORDS: TimelineRecord[] = [
  {
    id: 'zubopedia-launch',
    dateLabel: { en: 'NOV 2026', es: 'NOV 2026' },
    category: { en: 'LIVE DEPLOYMENT', es: 'DESPLIEGUE EN PRODUCCIÓN' },
    title: {
      en: 'Launched Zubopedia-Web (3D, Maps & Daily Minigame)',
      es: 'Lanzamiento de Zubopedia-Web (3D, Mapas y Minijuego Diario)',
    },
    subtitle: {
      en: 'React · TypeScript · Three.js · Leaflet · Cloudflare Pages Functions',
      es: 'React · TypeScript · Three.js · Leaflet · Cloudflare Pages Functions',
    },
    description: {
      en: 'Designed and shipped a 4-language (ES/EN/FR/DE) interactive 3D web encyclopedia with 55 WebGL models, 5 Leaflet overworld maps, Zubodle daily game, and custom Edge SEO middleware.',
      es: 'Diseñé y publiqué una enciclopedia web 3D en 4 idiomas (ES/EN/FR/DE) con 55 modelos WebGL, 5 mapas Leaflet, minijuego diario Zubodle y middleware Edge de SEO.',
    },
    badge: { en: 'LIVE', es: 'ONLINE' },
    icon: 'globe',
    actionProjectId: 'zubopedia-web',
  },
  {
    id: 'hud-engine',
    dateLabel: { en: 'NOV 2026', es: 'NOV 2026' },
    category: { en: 'TOOLING & CI/CD', es: 'TOOLING Y CI/CD' },
    title: {
      en: 'Built Automated GitHub Telemetry & SVG HUD Engine',
      es: 'Motor Automatizado de Telemetría y HUD SVG para GitHub',
    },
    subtitle: {
      en: 'Zero-Dependency TypeScript · GraphQL + REST Fallback · GitHub Actions',
      es: 'TypeScript sin Dependencias · GraphQL + Fallback REST · GitHub Actions',
    },
    description: {
      en: 'Engineered a daily CI pipeline generating bilingual SVG telemetry cards with 30-day language delta tracking, deterministic SHA-256 cache-busting, and automated unit tests.',
      es: 'Desarrollé un pipeline CI diario que genera tarjetas SVG bilingües con histórico de variación a 30 días, cache-busting SHA-256 determinista y tests unitarios.',
    },
    icon: 'terminal',
    actionProjectId: 'github-hud-engine',
  },
  {
    id: 'votify-milestone',
    dateLabel: { en: 'SPRING 2026', es: 'PRIMAVERA 2026' },
    category: { en: 'FULL-STACK · 3RD YEAR', es: 'FULL-STACK · 3º CURSO' },
    title: {
      en: 'Lead Contributor on Votify (.NET 9 / Blazor / PostgreSQL)',
      es: 'Principal Contribuidor en Votify (.NET 9 / Blazor / PostgreSQL)',
    },
    subtitle: {
      en: '185 Commits · 4-Person Team · 3-Layer Architecture · xUnit Tests',
      es: '185 Commits · Equipo de 4 · Arquitectura en 3 Capas · Tests xUnit',
    },
    description: {
      en: 'Built core service workflows, voting & ranking flows, participant/admin dashboards, PDF certificates, AI improvement roadmaps, and xUnit tests on .NET 9 and PostgreSQL.',
      es: 'Desarrollé la capa de servicio, votaciones y rankings, dashboards de participantes/administradores, certificados PDF, hoja de ruta con IA y tests en xUnit sobre .NET 9 y PostgreSQL.',
    },
    icon: 'layers',
    actionProjectId: 'votify',
  },
  {
    id: 'degree-start',
    dateLabel: { en: 'SEP 2023', es: 'SEP 2023' },
    category: { en: 'ACADEMIC START', es: 'INICIO DEL GRADO' },
    title: {
      en: 'Started Computer Engineering Degree',
      es: 'Inicio del Grado en Ingeniería Informática',
    },
    subtitle: {
      en: 'Foundations · Algorithms · OOP · Databases · Software Engineering',
      es: 'Fundamentos · Algoritmia · POO · Bases de Datos · Ingeniería del Software',
    },
    description: {
      en: 'Began university studies in Computer Engineering, later specializing in the Software Engineering track with focus on architecture, collaborative Git workflows, and testing.',
      es: 'Comienzo de la formación universitaria en Ingeniería Informática, especializándome posteriormente en la rama de Ingeniería del Software con foco en arquitectura, trabajo en equipo y testing.',
    },
    icon: 'graduation',
  },
];
