import { env } from 'cloudflare:workers'

const GENERATION_KEY = 'pagecache:generation'
const GENERATION_MEMO_MS = 15_000
const GENERATION_KV_TTL_S = 60

type WaitUntil = (promise: Promise<unknown>) => void

let memo: { at: number; generation: string } | null = null

function edgeCache(): Cache | null {
	if (import.meta.env.DEV || typeof caches === 'undefined') return null
	return (caches as unknown as { default?: Cache }).default ?? null
}

async function generation(): Promise<string> {
	if (memo && Date.now() - memo.at < GENERATION_MEMO_MS) return memo.generation
	let value = '0'
	try {
		value = (await env.CONTENT_CACHE?.get(GENERATION_KEY, { cacheTtl: GENERATION_KV_TTL_S })) ?? '0'
	} catch (err) {
		console.error('[page-cache] generation read failed:', err)
	}
	memo = { at: Date.now(), generation: value }
	return value
}

function isCacheable(response: Response): boolean {
	if (response.status !== 200 || response.headers.has('Set-Cookie')) return false
	const control = response.headers.get('Cache-Control') ?? ''
	return /\bpublic\b/.test(control) && /\bs-maxage=\d+/.test(control)
}

export async function cachedPage(
	request: Request,
	waitUntil: WaitUntil | undefined,
	render: () => Promise<Response>
): Promise<Response> {
	const cache = edgeCache()
	if (!cache || request.method !== 'GET' || request.headers.has('Authorization')) return render()

	const key = new URL(request.url)
	key.searchParams.set('__gen', await generation())
	const cacheKey = new Request(key.toString(), { method: 'GET' })

	const hit = await cache.match(cacheKey)
	if (hit) return new Response(hit.body, hit)

	const response = await render()
	if (!isCacheable(response)) return response

	const store = cache.put(cacheKey, response.clone()).catch((err: unknown) => {
		console.error('[page-cache] put failed:', err)
	})
	if (waitUntil) waitUntil(store)
	else await store
	return response
}

export async function purgePageCache(): Promise<void> {
	memo = null
	await env.CONTENT_CACHE?.put(GENERATION_KEY, Date.now().toString())
}
