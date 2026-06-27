export const prerender = false

import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { fetchPostList } from '../lib/posts'

const BASE = 'https://devjakob.com'

export const GET: APIRoute = async () => {
	const posts = await fetchPostList(env.MEDIA).catch(() => [])

	const postLines = posts
		.map(
			(p) => `- [${p.title}](${BASE}/posts/${p.slug})${p.date ? ` (${p.date.slice(0, 10)})` : ''}`
		)
		.join('\n')

	const body = `# Jakob Pütz

> Jakob Pütz (also: Jakob Puetz, devjakob) — 17-year-old full-stack developer based in Aachen, Germany.

Jakob Pütz is a self-taught software engineer who has been building software since his early teens. He works across the full stack with TypeScript, Next.js, Postgres, and Cloudflare Workers. He is based in Aachen, Germany (NRW).

## Projects

- **PFControl** — ATC strip management platform, thousands of registered users, ~500 daily actives. Built since age 15. [github.com/cephie-studios/pfcontrol-2](https://github.com/cephie-studios/pfcontrol-2)
- **Petal** — Unified AI workspace, developed from the ground up. [${BASE}/posts/petal](${BASE}/posts/petal)

## Links

- Website: ${BASE}
- GitHub: https://github.com/dev-banane
- LinkedIn: https://www.linkedin.com/in/jakobpuetz
- Twitter / X: https://x.com/devbanane
- Email: me@devjakob.com

## Writing

${postLines || '(No posts published yet.)'}

## Optional

- Full content: [${BASE}/llms-full.txt](${BASE}/llms-full.txt)
`

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	})
}
