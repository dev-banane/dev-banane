export const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/dev-banane',
    icon: 'github-01',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jakobpuetz',
    icon: 'linkedin-01',
  },
  {
    label: 'X',
    href: 'https://x.com/devbanane',
    icon: 'new-twitter',
  },
] as const;

export const sourceUrl = 'https://github.com/dev-banane/dev-banane';

export const CHAT_ENABLED = false;

export type Experience = {
  role: string;
  org: string;
  href?: string;
  period: string;
  summary: string;
};

export const experience: Experience[] = [
  {
    role: 'Web Developer',
    org: 'giftGRÜN',
    href: 'https://www.giftgruen.com/',
    period: 'Now',
    summary: 'Building RAG systems and other AI-driven features into production web apps.',
  },
  {
    role: 'Founder & Developer',
    org: 'Cephie Studios',
    href: 'https://cephie.app',
    period: 'Since 2023',
    summary:
      'Production tooling for aviation communities: PFControl, Cephie Cloud, the Cephie API and the PFConnect Discord bot.',
  },
];
