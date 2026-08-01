export const prerender = false

import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { fetchPostList } from '../lib/posts'
import { projects } from '../data/projects'

const BASE = 'https://devjakob.com'

export const GET: APIRoute = async () => {
  const posts = await fetchPostList(env.MEDIA).catch(() => [])

  const projectEntries = projects
    .map(
      (p) => `  <url>
    <loc>${BASE}/work/${p.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n')

  const postEntries = posts
    .map(
      (p) => `  <url>
    <loc>${BASE}/posts/${p.slug}</loc>
    ${p.date ? `<lastmod>${p.date.slice(0, 10)}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n')

  const latest = posts.find((p) => p.date)?.date?.slice(0, 10)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE}/posts</loc>
    ${latest ? `<lastmod>${latest}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE}/uptime</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
${projectEntries}
${postEntries}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
