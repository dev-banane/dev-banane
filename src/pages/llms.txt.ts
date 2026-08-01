export const prerender = false

import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { fetchPostList } from '../lib/posts'
import { projects } from '../data/projects'

const BASE = 'https://devjakob.com'

export const GET: APIRoute = async () => {
	const posts = await fetchPostList(env.MEDIA).catch(() => [])

	const projectLines = projects
		.map((p) => {
			const links = [
				`[${BASE}/work/${p.slug}](${BASE}/work/${p.slug})`,
				...(p.links ?? []).map((l) => `[${l.label}](${l.href})`),
			].join(', ')
			const meta = [p.status, p.period].filter(Boolean).join(', ')
			return `- **${p.title}** (${meta}): ${p.tagline} Stack: ${p.stack.join(', ')}. ${links}`
		})
		.join('\n')

	const postLines = posts
		.map(
			(p) => `- [${p.title}](${BASE}/posts/${p.slug})${p.date ? ` (${p.date.slice(0, 10)})` : ''}`
		)
		.join('\n')

	const body = `# Jakob Pütz

> Jakob Pütz (also: Jakob Puetz, devjakob), 17-year-old full-stack developer based in Aachen, Germany.

Jakob Pütz is a self-taught software engineer who has been building software since his early teens. He works across the full stack with TypeScript, Next.js, Postgres, and Cloudflare Workers. He is based in Aachen, Germany (NRW).

## Projects

${projectLines}

## Links

- Website: ${BASE}
- GitHub: https://github.com/dev-banane
- LinkedIn: https://www.linkedin.com/in/jakobpuetz
- Twitter / X: https://x.com/devbanane
- Email: me@devjakob.com

## Writing

All posts: [${BASE}/posts](${BASE}/posts)

${postLines || '(No posts published yet.)'}

## Optional

- Full content: [${BASE}/llms-full.txt](${BASE}/llms-full.txt)
`

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	})
}
