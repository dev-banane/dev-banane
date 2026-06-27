export const prerender = false

import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { fetchPostList, fetchPost } from '../lib/posts'

const BASE = 'https://devjakob.com'

export const GET: APIRoute = async () => {
	const posts = await fetchPostList(env.MEDIA).catch(() => [])

	const sections: string[] = []

	sections.push(`# Jakob Pütz — Full content export

Author: Jakob Pütz (Jakob Puetz, devjakob)
Website: ${BASE}
Location: Aachen, Germany
Occupation: Full-stack developer
Contact: me@devjakob.com
GitHub: https://github.com/dev-banane
Twitter: https://x.com/devbanane

Jakob Pütz is a 17-year-old self-taught software engineer from Aachen, Germany. He builds full-stack applications with TypeScript, Next.js, Postgres, and Cloudflare Workers. He has been coding since his early teens and is known online as devjakob and dev-banane.

## Projects

### PFControl
ATC (air traffic control) strip management platform. Started at age 15. Thousands of registered users, approximately 500 daily active users. Repository: https://github.com/cephie-studios/pfcontrol-2

### Petal
Unified AI workspace developed from the ground up. See: ${BASE}/posts/petal
`)

	for (const meta of posts) {
		const post = await fetchPost(meta.slug, env.MEDIA, { title: meta.title }).catch(() => null)
		if (!post) continue

		const plain = post.html
			.replace(/<[^>]+>/g, ' ')
			.replace(/\s{2,}/g, ' ')
			.trim()

		sections.push(`---

## ${meta.title}

URL: ${BASE}/posts/${meta.slug}
Date: ${meta.date?.slice(0, 10) ?? 'unknown'}

${plain}
`)
	}

	return new Response(sections.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	})
}
