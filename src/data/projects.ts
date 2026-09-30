export type ProjectMonitor = {
  slug: string;
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string[];
  period?: string;
  role: string;
  status: 'Live' | 'In development' | 'Archived';
  stack: string[];
  highlights?: { label: string; value: string }[];
  cover?: string;
  coverAlt?: string;
  links?: { label: string; href: string }[];
  monitors?: ProjectMonitor[];
  article?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'pfcontrol',
    title: 'PFControl',
    tagline: 'Air traffic control strip management, built for virtual controllers.',
    summary: [
      "PFControl is an electronic flight strip platform for virtual air traffic controllers. I started it at 15 because the tools controllers were using were spreadsheets and shared documents, and none of them understood what a strip actually is.",
      'It has grown into a real product: thousands of registered users, around 500 daily actives, and a controller-facing UI that has to stay responsive while a dozen people edit the same board.',
    ],
    period: 'Since 2023',
    role: 'Solo developer',
    status: 'Live',
    stack: ['TypeScript', 'Next.js', 'Postgres', 'WebSockets'],
    highlights: [
      { label: 'Registered users', value: '12,000+' },
      { label: 'Flights logged, last 30 days', value: '62,000+' },
      { label: 'Daily active users', value: '~500' },
    ],
    cover: '/assets/work/pfcontrol.webp',
    coverAlt: 'The PFControl flight strip board',
    links: [
      { label: 'pfcontrol.com', href: 'https://pfcontrol.com' },
      { label: 'GitHub', href: 'https://github.com/cephie-studios/pfcontrol-2' },
    ],
    monitors: [
      { slug: 'pfcontrol', label: 'pfcontrol.com', url: 'https://pfcontrol.com' },
      { slug: 'pfcontrol-canary', label: 'canary.pfcontrol.com', url: 'https://canary.pfcontrol.com' },
    ],
    article: 'pfcontrol',
    featured: true,
  },
  {
    slug: 'cephie',
    title: 'Cephie Studios',
    tagline: 'The studio the rest of it runs on. Cephie Cloud puts every product behind one sign-in.',
    summary: [
      'Cephie Studios is where the infrastructure behind my other projects lives. It designs and runs production software for communities that need serious tooling rather than a weekend script that nobody maintains.',
      'Cephie Cloud merges what used to be four separate apps (the marketing site, the PFConnect bot dashboard, Snap image hosting, and the developer and admin dashboards) into one Vite + React app served by a small Go server. One Discord sign-in gets you Server Setup for the bot, your Media library, and API keys under Developers.',
      'The Cephie API stays its own Go service behind it, backed by MongoDB, Redis and R2, and Cloud is just another client of it: scoped keys, per-key rate limits, and Stripe billing for Snap\'s paid tiers.',
    ],
    role: 'Founder and developer',
    status: 'Live',
    stack: ['Go', 'TypeScript', 'React', 'Vite', 'shadcn/ui', 'MongoDB', 'Redis', 'R2'],
    highlights: [
      { label: 'Apps merged into Cephie Cloud', value: '4 → 1' },
      { label: 'cephie-ui downloads on npm', value: '2,900+' },
      { label: 'cephie-ui releases', value: '21' },
    ],
    cover: '/assets/work/cephie.webp',
    coverAlt: 'The Cephie Cloud site',
    links: [
      { label: 'cephie.app', href: 'https://cephie.app' },
      { label: 'Dashboard', href: 'https://cephie.app/dashboard' },
      { label: 'api.cephie.app', href: 'https://api.cephie.app' },
    ],
    monitors: [
      { slug: 'cephie', label: 'cephie.app', url: 'https://cephie.app' },
      { slug: 'cephie-api', label: 'api.cephie.app', url: 'https://api.cephie.app' },
    ],
    article: 'cephie-snap',
    featured: true,
  },
  {
    slug: 'fsd',
    title: 'FSD + WebEye',
    tagline: 'A classic flight-sim network server, brought back to life with a live traffic map.',
    summary: [
      "FSD is the server behind the classic flight-sim multiplayer networks: pilots and controllers connect over raw TCP and see each other in real time. Starting from the last public copy of the source, I containerized it, fixed its live METAR download and TCP handling, and made every setting configurable through environment variables.",
      'On top of it I built WebEye, a live map shipped as a single Go binary with an embedded Vue 3 and Leaflet frontend. It reads the server\'s whazzup feed and draws traffic, controllers and their sectors, with a flight-level filter and recent position history.',
      "Credit where it's due: the original FSD is by Marty Bochane and the FSD 4.0 fork is by Chris Collins. WebEye's aircraft icons come from VATSIM Radar and its sector data from VATGlasses.",
    ],
    period: '2026',
    role: 'Fork maintainer',
    status: 'In development',
    stack: ['C++', 'Go', 'Vue', 'Leaflet', 'Docker'],
    highlights: [
      { label: 'Lines added to the fork', value: '41,000+' },
      { label: 'Files changed', value: '355' },
    ],
    cover: '/assets/work/fsd.webp',
    coverAlt: 'WebEye showing traffic and controller sectors over Europe (demo data)',
    links: [{ label: 'GitHub', href: 'https://github.com/dev-banane/fsd' }],
    featured: true,
  },
  {
    slug: 'toonscope',
    title: 'ToonScope',
    tagline: 'Compiles a codebase into a token-cheap map so AI agents stop re-reading whole files.',
    summary: [
      'ToonScope compiles a codebase into a `.toon/` folder of YAML: each file\'s exports, function signatures, types, and the import graph. Point an agent at that instead of the source tree, and "what does this export, and who calls it?" costs a few hundred tokens instead of a full file read.',
      "It's static analysis via tree-sitter WASM grammars, not an LLM call per file, so it works with no API key and nothing leaves the machine. Against its own 42-file source it cuts the tokens an agent needs by roughly two-thirds.",
    ],
    period: '2026',
    role: 'Solo developer',
    status: 'Live',
    stack: ['TypeScript', 'tree-sitter', 'WASM', 'Node.js'],
    highlights: [
      { label: 'Fewer tokens per lookup', value: '69%' },
      { label: 'Full build, 42 files', value: '0.2 s' },
      { label: 'Downloads on npm', value: '1,900+' },
    ],
    cover: '/assets/work/toonscope.webp',
    coverAlt: 'The ToonScope banner',
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/toonscope' },
      { label: 'GitHub', href: 'https://github.com/dev-banane/toonscope' },
    ],
    article: 'toonscope',
    featured: true,
  },
  {
    slug: 'weavay',
    title: 'Weavay',
    tagline: 'An email client that threads your mail into real conversations instead of isolated messages.',
    summary: [
      'Weavay is an email client that stops treating messages as isolated items. It connects every thread to the people it touches, so mail reads like an actual conversation instead of a pile of separate messages.',
      'I built Weavay because I wanted my own alternative to Google Workspace, since I manage multiple domains and projects that each need their own mailbox.',
    ],
    period: 'Since 2026',
    role: 'Solo developer',
    status: 'In development',
    stack: ['TypeScript', 'Next.js', 'Postgres', 'IMAP / SMTP'],
    cover: '/assets/work/weavay.webp',
    coverAlt: 'The Weavay inbox and message graph',
    links: [{ label: 'weavay.app', href: 'https://weavay.app' }],
    monitors: [{ slug: 'weavay', label: 'weavay.app', url: 'https://weavay.app' }],
    featured: true,
  },
  {
    slug: 'petal',
    title: 'Petal',
    tagline: 'A unified AI workspace, developed from the ground up.',
    summary: [
      'Petal pulls the models, the context and the conversation into one place instead of scattering them across half a dozen tabs. I am building it from the ground up rather than wrapping an existing chat UI.',
      'It is the project I am spending most of my time on right now, and I am currently raising to take it further.',
    ],
    period: 'Since 2026',
    role: 'Solo developer',
    status: 'In development',
    stack: ['TypeScript', 'Next.js', 'Postgres'],
    cover: '/assets/work/petal.webp',
    coverAlt: 'The Petal workspace interface',
    links: [{ label: 'trypetal.chat', href: 'https://trypetal.chat' }],
    monitors: [{ slug: 'petal', label: 'trypetal.chat', url: 'https://trypetal.chat' }],
    article: 'petal',
    featured: true,
  },
  {
    slug: 'userscriptsplus',
    title: 'Userscripts+',
    tagline: 'A userscript manager for Chrome with a security recon toolkit in the side panel.',
    summary: [
      'Userscripts+ is a Manifest V3 Chrome extension that runs classic `==UserScript==` scripts unchanged, with a CodeMirror editor, templates, the GM_* API and automatic update checks.',
      "The side panel also inspects whatever site you're on: missing security headers, DNS records, subdomains from certificate transparency logs, editable cookies and storage, an exposed-path probe and a JWT decoder. A network tab captures fetch and XHR traffic, lets you edit a JSON or CSS response inline, and turns that edit into a userscript that replays it.",
    ],
    period: '2026',
    role: 'Solo developer',
    status: 'Live',
    stack: ['TypeScript', 'React', 'Chrome MV3', 'CodeMirror', 'Tailwind CSS'],
    cover: '/assets/work/userscriptsplus.webp',
    coverAlt: 'The Userscripts+ side panel showing security headers, cookies and exposed paths',
    links: [
      {
        label: 'Chrome Web Store',
        href: 'https://chromewebstore.google.com/detail/userscripts+/medfogfdmpehaobediffiglninaahpng',
      },
    ],
    featured: true,
  },
  {
    slug: 'acserver',
    title: 'AC Server',
    tagline: 'A private Assetto Corsa server with an admin dashboard and a live 2D and 3D map.',
    summary: [
      "A self-hosted Assetto Corsa racing server for friends. The admin dashboard picks from 180+ cars and 45+ track layouts and writes acServer's config for you, keeping the entry list, client limit and car whitelist in sync (acServer silently drops cars when they drift) and refusing grids bigger than the track's pit boxes.",
      "The public map turns the server's UDP telemetry into a WebSocket stream and draws every car on track in 2D or a three.js 3D view, with trails, a heatmap and a leaderboard. A PowerShell pipeline turns a downloaded mod archive into every asset the server and map need in one command.",
    ],
    period: '2026',
    role: 'Solo developer',
    status: 'Live',
    stack: ['TypeScript', 'React', 'Express', 'three.js', 'WebSockets', 'Docker'],
    highlights: [
      { label: 'Cars on the grid', value: '180+' },
      { label: 'Track layouts', value: '45+' },
      { label: 'Tracks', value: '21+' },
    ],
    cover: '/assets/work/acserver.webp',
    coverAlt: 'The live map showing Spa-Francorchamps',
    links: [{ label: 'ac-map.devjakob.com', href: 'https://ac-map.devjakob.com' }],
    featured: true,
  },
  {
    slug: 'tools',
    title: 'Tools',
    tagline: 'The dev tabs I kept reopening, rebuilt without the ads and sign-up walls.',
    summary: [
      'A small toolbox of the tabs I kept reopening: subdomain enumeration across CT logs and passive DNS (plus an HTTP/sitemap crawl for hosts hiding behind a reverse proxy), DNS lookups across global resolvers, security header grading, IP geolocation, and a handful of generators.',
      "It's a Cloudflare Worker fronting a React app - no accounts, no ads, and no rate-limited free tier asking for a credit card.",
    ],
    period: '2026',
    role: 'Solo developer',
    status: 'Live',
    stack: ['TypeScript', 'React', 'Vite', 'Cloudflare Workers'],
    cover: '/assets/work/tools.webp',
    coverAlt: 'The Tools dashboard',
    links: [
      { label: 'tools.devjakob.com', href: 'https://tools.devjakob.com' },
      { label: 'GitHub', href: 'https://github.com/dev-banane/tools' },
    ],
    monitors: [{ slug: 'tools', label: 'tools.devjakob.com', url: 'https://tools.devjakob.com' }],
    featured: true,
  },
  {
    slug: 'devjakob',
    title: 'devjakob.com',
    tagline: 'This site. Astro on Cloudflare Workers, with comments and voting.',
    summary: [
      'My own corner of the internet. Posts live as markdown in R2, comments and votes in D1, GitHub OAuth for identity, and Workers AI handling moderation.',
      'It renders on demand at the edge, which keeps the view counts and comment threads honest without giving up the speed of a static site.',
    ],
    period: '2026',
    role: 'Solo developer',
    status: 'Live',
    stack: ['Astro', 'Cloudflare Workers', 'D1', 'R2', 'Workers AI'],
    cover: '/assets/work/devjakob.webp',
    coverAlt: 'The devjakob.com homepage',
    links: [{ label: 'GitHub', href: 'https://github.com/dev-banane' }],
    article: 'this-blog-is-a-worker',
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured !== false);

export type Monitor = ProjectMonitor & {
  project: string;
};

export const monitors: Monitor[] = projects.flatMap((project) =>
  (project.monitors ?? []).map((monitor) => ({ ...monitor, project: project.slug }))
);

export const statusIcon = {
  Live: 'checkmark-circle-02',
  'In development': 'wrench-01',
  Archived: 'archive-02',
} as const satisfies Record<Project['status'], string>;
