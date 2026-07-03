import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { buildSystemPrompt } from '../../data/jakob-context'
import { getCommentsSalt } from '../../lib/salt'
import { getSessionUser, isGithubAuthEnabled } from '../../lib/auth'

export const prerender = false

const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
const MAX_MESSAGE_CHARS = 1000
const MAX_HISTORY = 24
const DAILY_LIMIT = 40
const MAX_TOKENS = 1600

type ChatTurn = { role: 'user' | 'assistant'; content: string }

async function sha256hex(value: string, salt: string): Promise<string> {
	const data = new TextEncoder().encode(`${salt}:${value}`)
	const digest = await crypto.subtle.digest('SHA-256', data)
	return Array.from(new Uint8Array(digest))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('')
}

function parseTurns(raw: unknown): ChatTurn[] | null {
	if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_HISTORY) {
		return null
	}
	const turns: ChatTurn[] = []
	for (const item of raw) {
		if (!item || typeof item !== 'object') return null
		const { role, content } = item as { role?: unknown; content?: unknown }
		if (role !== 'user' && role !== 'assistant') return null
		if (typeof content !== 'string' || !content.trim()) return null
		if (content.length > MAX_MESSAGE_CHARS * 4) return null
		turns.push({ role, content: content.slice(0, MAX_MESSAGE_CHARS * 4) })
	}
	const last = turns[turns.length - 1]
	if (last.role !== 'user' || last.content.length > MAX_MESSAGE_CHARS) {
		return null
	}
	return turns
}

async function enforceDailyLimit(request: Request, identityKey: string): Promise<Response | null> {
	const db = env.DB
	const salt = getCommentsSalt(env)
	if (!db || !salt) return null

	const ipHash = identityKey.startsWith('gh:')
		? identityKey
		: await sha256hex(identityKey, salt)
	const day = new Date().toISOString().slice(0, 10)

	try {
		const row = await db
			.prepare(
				`INSERT INTO chat_usage (day, ip_hash, count) VALUES (?1, ?2, 1)
         ON CONFLICT(day, ip_hash) DO UPDATE SET count = count + 1
         RETURNING count`
			)
			.bind(day, ipHash)
			.first<{ count: number }>()

		if (row && row.count > DAILY_LIMIT) {
			return Response.json(
				{ error: "That's the daily limit, come back tomorrow, or just email Jakob directly." },
				{ status: 429 }
			)
		}
	} catch (err) {
		console.error('[chat] rate limit check failed:', err)
	}
	return null
}

async function streamCompletion(
	messages: Array<{ role: string; content: string }>
): Promise<ReadableStream | null> {
	const options = {
		messages,
		stream: true,
		max_tokens: MAX_TOKENS,
		temperature: 0.7,
	}

	if (env.AI) {
		const result = await env.AI.run(MODEL, options)
		return result instanceof ReadableStream ? result : null
	}

	const accountId = env.CLOUDFLARE_ACCOUNT_ID?.trim()
	const apiToken = env.CLOUDFLARE_AI_TOKEN?.trim()
	if (!accountId || !apiToken) return null

	const res = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(options),
			signal: AbortSignal.timeout(60_000),
		}
	)

	if (!res.ok || !res.body) {
		console.error('[chat] AI API error:', res.status, await res.text().catch(() => ''))
		return null
	}
	return res.body
}

export const POST: APIRoute = async ({ request, cookies }) => {
	try {
		const authEnabled = isGithubAuthEnabled(env)
		const user = authEnabled ? await getSessionUser(cookies, env) : null
		if (authEnabled && !user) {
			return Response.json({ error: 'Sign in to chat.', code: 'auth' }, { status: 401 })
		}

		const body = await request.json().catch(() => null)
		const turns = parseTurns((body as { messages?: unknown } | null)?.messages)
		if (!turns) {
			return Response.json({ error: 'Invalid message payload.' }, { status: 400 })
		}

		const identityKey = user
			? `gh:${user.id}`
			: (request.headers.get('CF-Connecting-IP') ?? '0.0.0.0')
		const limited = await enforceDailyLimit(request, identityKey)
		if (limited) return limited

		const stream = await streamCompletion([
			{ role: 'system', content: buildSystemPrompt() },
			...turns,
		])

		if (!stream) {
			return Response.json({ error: 'Chat is not available right now.' }, { status: 503 })
		}

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
			},
		})
	} catch (err) {
		console.error('[chat] POST failed:', err)
		return Response.json({ error: 'Internal server error.' }, { status: 500 })
	}
}
