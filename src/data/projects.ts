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
    slug: 'weavay',
    title: 'Weavay',
    tagline: 'Email that remembers, built as a living graph instead of a folder tree.',
    summary: [
      'Weavay is an email client that stops treating messages as isolated items. Every message becomes a node in a graph of the people, threads and documents it touches, so the context around a conversation is there without digging for it.',
      'You pull that context in with @-mentions, and rules sort mail on the way in without any model involved. The AI features sit on a separate tier and stay source-linked, so nothing is asserted without something to point at.',
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
    links: [
      { label: 'tools.devjakob.com', href: 'https://tools.devjakob.com' },
      { label: 'GitHub', href: 'https://github.com/dev-banane/tools' },
    ],
    monitors: [{ slug: 'tools', label: 'tools.devjakob.com', url: 'https://tools.devjakob.com' }],
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
    cover: '/assets/work/toonscope.webp',
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/toonscope' },
      { label: 'GitHub', href: 'https://github.com/dev-banane/toonscope' },
    ],
    article: 'toonscope',
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
    monitors: [{ slug: 'devjakob', label: 'devjakob.com', url: 'https://devjakob.com' }],
    article: 'this-blog-is-a-worker',
    featured: true,
  },
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
      { label: 'Registered users', value: '1000+' },
      { label: 'Daily actives', value: '~500' },
      { label: 'Building since', value: 'age 15' },
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
    tagline: 'The studio the rest of it runs on: APIs, dashboards, bots and hosted services.',
    summary: [
      'Cephie Studios is where the infrastructure behind my other projects lives. It designs and runs production software for communities that need serious tooling rather than a weekend script that nobody maintains.',
      'The pieces are separate services that share one platform: Snap for instant permanent image URLs, the API that other products integrate against, the dashboard for configuring the Discord bot and reading transcripts, and PFConnect itself.',
    ],
    role: 'Founder and developer',
    status: 'Live',
    stack: ['TypeScript', 'Cloudflare Workers', 'R2', 'Postgres', 'React'],
    cover: '/assets/work/cephie.webp',
    coverAlt: 'The Cephie Studios site',
    links: [
      { label: 'cephie.app', href: 'https://cephie.app' },
      { label: 'snap.cephie.app', href: 'https://snap.cephie.app' },
      { label: 'api.cephie.app', href: 'https://api.cephie.app' },
      { label: 'dash.cephie.app', href: 'https://dash.cephie.app' },
    ],
    monitors: [
      { slug: 'cephie', label: 'cephie.app', url: 'https://cephie.app' },
      { slug: 'cephie-snap', label: 'snap.cephie.app', url: 'https://snap.cephie.app' },
      { slug: 'cephie-api', label: 'api.cephie.app', url: 'https://api.cephie.app' },
      { slug: 'cephie-dash', label: 'dash.cephie.app', url: 'https://dash.cephie.app' },
    ],
    article: 'cephie-snap',
    featured: true,
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
  Live: 'live-streaming-02',
  'In development': 'code-circle',
  Archived: 'archive-02',
} as const satisfies Record<Project['status'], string>;
