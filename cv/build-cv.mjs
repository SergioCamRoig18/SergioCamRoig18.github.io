import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');

function findBrowserExecutable() {
  const candidates = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error('No Chromium/Edge browser found to render PDFs.');
}

function esc(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const CV_CONTENT = {
  en: {
    htmlLang: 'en',
    docTitle: 'Sergio Camacho Roig — Software Engineering CV',
    name: 'Sergio Camacho Roig',
    headline: 'Software Engineering Student (UPV · 4th Year) · Full-Stack & Backend Development',
    location: 'Valencia, Spain',
    sections: {
      profile: 'Profile',
      education: 'Education',
      projects: 'Technical Projects',
      skills: 'Technical Skills & Languages',
      experience: 'Additional Experience',
    },
    profileText:
      '4th-year Computer Engineering student at Universitat Politècnica de València (UPV), specializing in Software Engineering. Focused on full-stack web applications, clean layered backends, and automated tooling with TypeScript, React, C# (.NET 9), and PostgreSQL. Seeking Software Engineering internships or Junior roles.',
    education: [
      {
        school: 'Universitat Politècnica de València (UPV)',
        location: 'Valencia, Spain',
        degree: 'B.Sc. in Computer Engineering — Software Engineering Specialization',
        period: 'Sep 2023 – Jun 2027 (Expected)',
        details:
          'Relevant Coursework: Software Architecture & Design Patterns, Relational Databases, Web Systems, Automated Testing, Data Structures & Algorithms, Operating Systems.',
      },
    ],
    projects: [
      {
        name: 'Zubopedia-Web — Interactive 3D Web Encyclopedia & Edge SEO',
        stack: 'React, TypeScript, Three.js, Leaflet, Vite, Cloudflare Pages Functions',
        period: 'Nov 2026',
        links: [
          { label: 'Live Demo', url: 'https://zubopedia.pages.dev/?lang=en' },
          { label: 'GitHub', url: 'https://github.com/SergioCamRoig18/Zubopedia-Web' },
        ],
        bullets: [
          'Built and deployed a 4-language (ES/EN/FR/DE) interactive SPA with <strong>55 real-time WebGL 3D character models</strong> (Three.js / GLTFLoader) and <strong>5 custom-coordinate Leaflet maps</strong> featuring polygon zones and markers.',
          'Developed the daily <strong>Zubodle</strong> guessing minigame with streak persistence and responsive UI tailored for desktop and mobile browsers.',
          'Engineered a <strong>Cloudflare Pages Functions Middleware (HTMLRewriter)</strong> serving localized Open Graph, canonical, and <code>hreflang</code> SEO metadata dynamically across 65 routes × 4 languages.',
        ],
      },
      {
        name: 'Votify — Full-Stack Event, Voting & Survey Platform',
        stack: '.NET 9, C#, Blazor Server, Entity Framework Core, PostgreSQL, Supabase, xUnit',
        period: 'Spring 2026',
        links: [
          { label: 'Case Study (Private Team Repo)', url: 'https://sergiocamroig18.github.io/#projects' },
        ],
        bullets: [
          'Contributed <strong>185 commits</strong> as a core developer in a 4-person UPV team building a 3-layer ASP.NET Core 9 / Blazor Server application backed by PostgreSQL (23 EF Core schema migrations).',
          'Implemented voting and ranking workflows, participant and admin analytics dashboards, automated PDF certificate generation, and an AI-powered improvement roadmap feature.',
          'Authored <strong>xUnit automated unit tests</strong> verifying business logic and GoF design pattern implementations (Builder, Observer, Proxy, Template Method).',
        ],
      },
      {
        name: 'GitHub HUD Engine — Automated Telemetry & SVG Pipeline',
        stack: 'TypeScript, Node.js, GraphQL, GitHub Actions, node:test',
        period: 'Nov 2026',
        links: [
          { label: 'GitHub', url: 'https://github.com/SergioCamRoig18/SergioCamRoig18' },
          { label: 'Web Portfolio', url: 'https://sergiocamroig18.github.io' },
        ],
        bullets: [
          'Engineered a <strong>zero-dependency TypeScript CLI</strong> querying GitHub GraphQL/REST APIs with automatic fallback to compute 12-month activity metrics, 30-day language deltas, and weekly commit rhythm.',
          'Built deterministic bilingual SVG card renderers, SHA-256 cache-busting, and a <strong>public JSON telemetry feed</strong> (<code>data/telemetry.json</code>) powering live stats on the React/TypeScript portfolio via daily GitHub Actions CI.',
          'Covered data aggregation, tag packing, cache-busting, and SVG rendering with an automated <strong>node:test</strong> unit test suite.',
        ],
      },
    ],
    skills: [
      { label: 'Languages', value: 'TypeScript, C#, Java, JavaScript, SQL, HTML/CSS' },
      { label: 'Frameworks & Libraries', value: '.NET 9 (ASP.NET Core, Entity Framework Core), React, Blazor Server, Node.js, Three.js, Leaflet, Vite' },
      { label: 'Databases & Cloud', value: 'PostgreSQL, Supabase, MySQL, Cloudflare Pages & Functions' },
      { label: 'Tools, Testing & CI/CD', value: 'Git, GitHub Actions, xUnit, node:test, Docker' },
      { label: 'Spoken Languages', value: 'Spanish (Native) · English (C1 — Advanced)' },
    ],
    experience: [
      {
        org: 'Town Council of Anna',
        role: 'Visitor Access & Ticketing Staff (Temporary Staff)',
        location: 'Anna, Valencia',
        period: 'Mar & Aug–Sep 2024',
        bullets: [
          'Managed entry ticketing, daily cash reconciliation, and high-volume visitor assistance at Albufera de Anna Natural Park, maintaining accuracy, reliability, and composure during peak-season days.',
        ],
      },
      {
        org: 'Bar Los Sapatericos',
        role: 'Waiter & Customer Service',
        location: 'Chella, Valencia',
        period: 'May – Aug 2022',
        bullets: [
          'Delivered fast-paced table and customer service during peak summer season, strengthening teamwork, clear communication, and performance under pressure.',
        ],
      },
    ],
  },
  es: {
    htmlLang: 'es',
    docTitle: 'Sergio Camacho Roig — CV Ingeniería del Software',
    name: 'Sergio Camacho Roig',
    headline: 'Estudiante de Ingeniería del Software (UPV · 4º Curso) · Desarrollo Full-Stack y Backend',
    location: 'Valencia, España',
    sections: {
      profile: 'Perfil Profesional',
      education: 'Formación Académica',
      projects: 'Proyectos Técnicos',
      skills: 'Competencias Técnicas e Idiomas',
      experience: 'Experiencia Adicional',
    },
    profileText:
      'Estudiante de 4º de Ingeniería Informática en la Universitat Politècnica de València (UPV), rama de Ingeniería del Software. Enfocado en aplicaciones web full-stack, backends limpios por capas y herramientas automatizadas con TypeScript, React, C# (.NET 9) y PostgreSQL. Abierto a prácticas o roles Junior.',
    education: [
      {
        school: 'Universitat Politècnica de València (UPV)',
        location: 'Valencia, España',
        degree: 'Grado en Ingeniería Informática — Rama de Ingeniería del Software',
        period: 'Sep 2023 – Jun 2027 (Previsto)',
        details:
          'Materias relevantes: Arquitectura y Diseño de Software, Patrones de Diseño, Bases de Datos Relacionales, Sistemas Web, Testing Automatizado, Estructuras de Datos y Algoritmos, Sistemas Operativos.',
      },
    ],
    projects: [
      {
        name: 'Zubopedia-Web — Enciclopedia Web 3D Interactiva y SEO en el Edge',
        stack: 'React, TypeScript, Three.js, Leaflet, Vite, Cloudflare Pages Functions',
        period: 'Nov 2026',
        links: [
          { label: 'Demo en vivo', url: 'https://zubopedia.pages.dev/?lang=es' },
          { label: 'GitHub', url: 'https://github.com/SergioCamRoig18/Zubopedia-Web' },
        ],
        bullets: [
          'Diseñé y desplegué una SPA interactiva en 4 idiomas (ES/EN/FR/DE) con <strong>55 modelos 3D WebGL en tiempo real</strong> (Three.js / GLTFLoader) y <strong>5 mapas Leaflet</strong> con coordenadas personalizadas, zonas poligonales y marcadores.',
          'Implementé el minijuego diario <strong>Zubodle</strong> con persistencia de racha y diseño adaptativo para escritorio y móvil.',
          'Desarrollé un <strong>Middleware en Cloudflare Pages Functions (HTMLRewriter)</strong> para inyectar metadatos SEO dinámicos (Open Graph, canonical y <code>hreflang</code>) en 65 rutas × 4 idiomas.',
        ],
      },
      {
        name: 'Votify — Plataforma Full-Stack de Eventos, Votaciones y Encuestas',
        stack: '.NET 9, C#, Blazor Server, Entity Framework Core, PostgreSQL, Supabase, xUnit',
        period: 'Primavera 2026',
        links: [
          { label: 'Caso de estudio (Repo privado de equipo)', url: 'https://sergiocamroig18.github.io/#projects' },
        ],
        bullets: [
          'Aporté <strong>185 commits</strong> como desarrollador principal en un equipo de 4 en la UPV construyendo una arquitectura en 3 capas con ASP.NET Core 9, Blazor Server y PostgreSQL (23 migraciones de EF Core).',
          'Implementé flujos de votación y rankings, dashboards analíticos de participantes y administradores, generación automatizada de certificados en PDF y una hoja de ruta de mejora con IA.',
          'Escribí <strong>tests unitarios automatizados en xUnit</strong> validando lógica de negocio e implementaciones de patrones GoF (Builder, Observer, Proxy, Template Method).',
        ],
      },
      {
        name: 'GitHub HUD Engine — Pipeline Automatizado de Telemetría y SVG',
        stack: 'TypeScript, Node.js, GraphQL, GitHub Actions, node:test',
        period: 'Nov 2026',
        links: [
          { label: 'GitHub', url: 'https://github.com/SergioCamRoig18/SergioCamRoig18' },
          { label: 'Portfolio Web', url: 'https://sergiocamroig18.github.io' },
        ],
        bullets: [
          'Desarrollé una <strong>CLI en TypeScript sin dependencias externas</strong> que consulta las APIs GraphQL y REST de GitHub (con fallback automático) para calcular métricas anuales, variación de lenguajes a 30 días y ritmo semanal.',
          'Creé renderizadores SVG bilingües deterministas, cache-busting SHA-256 y un <strong>feed JSON público</strong> (<code>data/telemetry.json</code>) que alimenta en directo mi portfolio React/TypeScript mediante GitHub Actions.',
          'Verifiqué la agregación de datos, el empaquetado de etiquetas y el renderizado con una suite automatizada de tests unitarios en <strong>node:test</strong>.',
        ],
      },
    ],
    skills: [
      { label: 'Lenguajes', value: 'TypeScript, C#, Java, JavaScript, SQL, HTML/CSS' },
      { label: 'Frameworks y Librerías', value: '.NET 9 (ASP.NET Core, Entity Framework Core), React, Blazor Server, Node.js, Three.js, Leaflet, Vite' },
      { label: 'Bases de Datos y Cloud', value: 'PostgreSQL, Supabase, MySQL, Cloudflare Pages y Functions' },
      { label: 'Herramientas, Testing y CI/CD', value: 'Git, GitHub Actions, xUnit, node:test, Docker' },
      { label: 'Idiomas', value: 'Español (Nativo) · Inglés (C1 — Avanzado)' },
    ],
    experience: [
      {
        org: 'Ayuntamiento de Anna',
        role: 'Control de Accesos y Atención al Visitante (Personal Interino)',
        location: 'Anna, Valencia',
        period: 'Mar y Ago–Sep 2024',
        bullets: [
          'Gestión de taquilla, cobro de entradas, cuadre diario de caja y atención al público en jornadas de alta afluencia en el paraje natural de la Albufera de Anna, manteniendo precisión y calma bajo presión.',
        ],
      },
      {
        org: 'Bar Los Sapatericos',
        role: 'Camarero y Atención al Cliente',
        location: 'Chella, Valencia',
        period: 'May – Ago 2022',
        bullets: [
          'Servicio de mesa y atención al cliente en campaña de verano de alto ritmo, reforzando el trabajo en equipo, la comunicación clara y la gestión del estrés en horas punta.',
        ],
      },
    ],
  },
};

function renderHtml(lang, phone) {
  const c = CV_CONTENT[lang];
  const contactRow1 = [
    `<span>${esc(c.location)}</span>`,
    ...(phone ? [`<a href="tel:${esc(phone.replace(/\s+/g, ''))}">${esc(phone)}</a>`] : []),
    `<a href="mailto:sergiocamroig18@gmail.com">sergiocamroig18@gmail.com</a>`,
  ];
  const contactRow2 = [
    `<a href="https://sergiocamroig18.github.io">sergiocamroig18.github.io</a>`,
    `<a href="https://github.com/SergioCamRoig18">github.com/SergioCamRoig18</a>`,
    `<a href="https://www.linkedin.com/in/sergio-camacho-roig-343550318/">linkedin.com/in/sergio-camacho-roig</a>`,
  ];

  const projectsHtml = c.projects
    .map(
      (p) => `
      <article class="entry">
        <div class="entry-head">
          <div class="entry-title-wrap">
            <span class="entry-title">${esc(p.name)}</span>
            <span class="entry-links">${p.links
              .map((l) => `<a href="${esc(l.url)}">${esc(l.label)}</a>`)
              .join(' · ')}</span>
          </div>
          <span class="entry-date">${esc(p.period)}</span>
        </div>
        <div class="entry-sub">${esc(p.stack)}</div>
        <ul class="bullets">
          ${p.bullets.map((b) => `<li>${b}</li>`).join('\n          ')}
        </ul>
      </article>`,
    )
    .join('\n');

  const educationHtml = c.education
    .map(
      (e) => `
      <article class="entry">
        <div class="entry-head">
          <span class="entry-title">${esc(e.school)} <span class="entry-loc">— ${esc(e.location)}</span></span>
          <span class="entry-date">${esc(e.period)}</span>
        </div>
        <div class="entry-sub">${esc(e.degree)}</div>
        <p class="edu-details">${esc(e.details)}</p>
      </article>`,
    )
    .join('\n');

  const skillsHtml = c.skills
    .map(
      (s) => `
      <div class="skill-row">
        <span class="skill-label">${esc(s.label)}:</span>
        <span class="skill-val">${esc(s.value)}</span>
      </div>`,
    )
    .join('\n');

  const expHtml = c.experience
    .map(
      (ex) => `
      <article class="entry entry--compact">
        <div class="entry-head">
          <span class="entry-title">${esc(ex.org)} <span class="entry-role">— ${esc(ex.role)}</span></span>
          <span class="entry-date">${esc(ex.period)} · ${esc(ex.location)}</span>
        </div>
        <ul class="bullets">
          ${ex.bullets.map((b) => `<li>${esc(b)}</li>`).join('\n          ')}
        </ul>
      </article>`,
    )
    .join('\n');

  return `<!doctype html>
<html lang="${c.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <title>${esc(c.docTitle)}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      color: #111827;
      font-family: 'Cambria', 'Georgia', 'Times New Roman', serif;
      font-size: 9.5pt;
      line-height: 1.34;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .sheet {
      width: 210mm;
      height: 297mm;
      padding: 11.5mm 14mm 10.5mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 8.5pt;
    }

    a {
      color: #1d3b66;
      text-decoration: none;
    }

    code {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 8.5pt;
      color: #1f2937;
    }

    /* Header (Classic Jake's Resume / Harvard style) */
    .header {
      text-align: center;
      padding-bottom: 3pt;
    }

    .name {
      font-size: 20pt;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #0f172a;
      line-height: 1.1;
    }

    .headline {
      margin-top: 2.5pt;
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 9.4pt;
      font-weight: 600;
      color: #334155;
      letter-spacing: 0.015em;
    }

    .contact {
      margin-top: 4pt;
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 8.6pt;
      color: #1f2937;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2pt;
    }

    .contact-row {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 6pt;
    }

    .contact .sep {
      color: #94a3b8;
    }

    /* Sections */
    .section {
      display: flex;
      flex-direction: column;
      gap: 4.5pt;
    }

    .section-title {
      font-size: 10.2pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #0f172a;
      border-bottom: 0.9pt solid #1e293b;
      padding-bottom: 1.8pt;
      margin-bottom: 1pt;
    }

    .profile-text {
      font-size: 9.35pt;
      line-height: 1.36;
      color: #1f2937;
      text-align: justify;
      hyphens: auto;
    }

    /* Entries */
    .entry {
      display: flex;
      flex-direction: column;
      gap: 1.6pt;
      margin-bottom: 3.5pt;
    }

    .entry:last-child {
      margin-bottom: 0;
    }

    .entry--compact {
      margin-bottom: 2.5pt;
    }

    .entry-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8pt;
    }

    .entry-title-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 6pt;
    }

    .entry-title {
      font-size: 9.8pt;
      font-weight: 700;
      color: #0f172a;
    }

    .entry-loc,
    .entry-role {
      font-weight: 400;
      color: #334155;
    }

    .entry-links {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 8.3pt;
      font-weight: 600;
    }

    .entry-date {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 8.6pt;
      font-weight: 600;
      color: #334155;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .entry-sub {
      font-style: italic;
      font-size: 8.9pt;
      color: #334155;
    }

    .edu-details {
      font-size: 8.95pt;
      color: #1f2937;
      margin-top: 1pt;
    }

    .bullets {
      margin-left: 12pt;
      margin-top: 1.5pt;
      display: flex;
      flex-direction: column;
      gap: 1.8pt;
    }

    .bullets li {
      font-size: 9.2pt;
      line-height: 1.33;
      color: #1f2937;
      padding-left: 1.5pt;
    }

    .bullets li::marker {
      color: #334155;
    }

    /* Skills */
    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: 2.2pt;
    }

    .skill-row {
      font-size: 9.2pt;
      line-height: 1.33;
      color: #1f2937;
    }

    .skill-label {
      font-weight: 700;
      color: #0f172a;
      margin-right: 3pt;
    }
  </style>
</head>
<body>
  <main class="sheet">
    <header class="header">
      <h1 class="name">${esc(c.name)}</h1>
      <div class="headline">${esc(c.headline)}</div>
      <div class="contact">
        <div class="contact-row">${contactRow1.join('<span class="sep">|</span>')}</div>
        <div class="contact-row">${contactRow2.join('<span class="sep">|</span>')}</div>
      </div>
    </header>

    <section class="section">
      <h2 class="section-title">${esc(c.sections.profile)}</h2>
      <p class="profile-text">${esc(c.profileText)}</p>
    </section>

    <section class="section">
      <h2 class="section-title">${esc(c.sections.projects)}</h2>
      ${projectsHtml}
    </section>

    <section class="section">
      <h2 class="section-title">${esc(c.sections.education)}</h2>
      ${educationHtml}
    </section>

    <section class="section">
      <h2 class="section-title">${esc(c.sections.skills)}</h2>
      <div class="skills-grid">
        ${skillsHtml}
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">${esc(c.sections.experience)}</h2>
      ${expHtml}
    </section>
  </main>
</body>
</html>
`;
}

function parsePhoneArg(argv) {
  const idx = argv.indexOf('--phone');
  if (idx !== -1 && argv[idx + 1]) return argv[idx + 1].trim();
  return '';
}

function main() {
  const phone = parsePhoneArg(process.argv.slice(2));
  const isPrivate = Boolean(phone);
  const browser = findBrowserExecutable();

  const outDir = isPrivate ? resolve(ROOT_DIR, 'cv/private') : resolve(ROOT_DIR, 'public/cv');
  mkdirSync(outDir, { recursive: true });

  for (const lang of ['en', 'es']) {
    const suffix = isPrivate ? `-${lang.toUpperCase()}-Private` : `-${lang.toUpperCase()}`;
    const pdfPath = resolve(outDir, `Sergio-Camacho-Roig-CV${suffix}.pdf`);
    const tmpHtmlPath = resolve(__dirname, `cv-${lang}.tmp.html`);

    writeFileSync(tmpHtmlPath, renderHtml(lang, phone), 'utf8');
    try {
      execFileSync(
        browser,
        [
          '--headless=new',
          '--disable-gpu',
          '--no-sandbox',
          '--no-pdf-header-footer',
          `--print-to-pdf=${pdfPath}`,
          pathToFileURL(tmpHtmlPath).href,
        ],
        { stdio: 'pipe', timeout: 30000 },
      );
      console.log(`[cv] Generated ${pdfPath}`);
    } finally {
      if (existsSync(tmpHtmlPath)) unlinkSync(tmpHtmlPath);
    }
  }
}

main();
