import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { getSessionUser, isGithubAuthEnabled } from '../../../lib/auth'

export const prerender = false

const RETENTION_DAYS = 7
const MAX_TURNS = 24
const MAX_TITLE_CHARS = 60
const MAX_LIST = 20

type Turn = { role: 'user' | 'assistant'; content: string }

type ConversationRow = {
	id: number
	title: string
	messages: string
	updated_at: string
}

function isValidTurns(raw: unknown): raw is Turn[] {
	if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_TURNS) return false
	return raw.every(
		(item) =>
			item &&
			typeof item === 'object' &&
			((item as Turn).role === 'user' || (item as Turn).role === 'assistant') &&
			typeof (item as Turn).content === 'string'
	)
}

function mapRow(row: ConversationRow) {
	let messages: Turn[] = []
	try {
		messages = JSON.parse(row.messages)
	} catch {
		messages = []
	}
	return {
		id: row.id,
		title: row.title,
		messages,
		updatedAt: row.updated_at.replace(' ', 'T') + 'Z',
	}
}

async function purgeExpired(db: D1Database, userId: string): Promise<void> {
	await db
		.prepare(
			`DELETE FROM chat_conversations WHERE user_id = ?1 AND updated_at < datetime('now', ?2)`
		)
		.bind(userId, `-${RETENTION_DAYS} days`)
		.run()
}

export const GET: APIRoute = async ({ cookies }) => {
	if (!isGithubAuthEnabled(env)) return Response.json({ conversations: [] })
	const db = env.DB
	if (!db) return Response.json({ conversations: [] })

	const user = await getSessionUser(cookies, env)
	if (!user) return Response.json({ error: 'Sign in to chat.', code: 'auth' }, { status: 401 })

	const userId = `gh:${user.id}`
	try {
		await purgeExpired(db, userId)
		const { results } = await db
			.prepare(
				`SELECT id, title, messages, updated_at FROM chat_conversations
         WHERE user_id = ?1 ORDER BY updated_at DESC LIMIT ?2`
			)
			.bind(userId, MAX_LIST)
			.all<ConversationRow>()

		return Response.json({ conversations: results.map(mapRow) })
	} catch (err) {
		console.error('[chat/conversations] GET failed:', err)
		return Response.json({ conversations: [] })
	}
}

export const POST: APIRoute = async ({ request, cookies }) => {
	try {
		if (!isGithubAuthEnabled(env)) {
			return Response.json({ error: 'Not available.' }, { status: 503 })
		}
		const db = env.DB
		if (!db) return Response.json({ error: 'Not available.' }, { status: 503 })

		const user = await getSessionUser(cookies, env)
		if (!user) return Response.json({ error: 'Sign in to chat.', code: 'auth' }, { status: 401 })

		const body = await request.json().catch(() => null)
		const turns = (body as { messages?: unknown } | null)?.messages
		const id = (body as { id?: unknown } | null)?.id
		if (!isValidTurns(turns)) {
			return Response.json({ error: 'Invalid conversation.' }, { status: 400 })
		}

		const userId = `gh:${user.id}`
		await purgeExpired(db, userId)

		const messagesJson = JSON.stringify(turns.slice(-MAX_TURNS))
		const firstUserTurn = turns.find((t) => t.role === 'user')
		const title = (firstUserTurn?.content ?? 'Conversation').slice(0, MAX_TITLE_CHARS)

		if (typeof id === 'number' && Number.isInteger(id) && id > 0) {
			const updated = await db
				.prepare(
					`UPDATE chat_conversations SET messages = ?1, updated_at = datetime('now')
           WHERE id = ?2 AND user_id = ?3
           RETURNING id, title, messages, updated_at`
				)
				.bind(messagesJson, id, userId)
				.first<ConversationRow>()

			if (updated) return Response.json({ conversation: mapRow(updated) })
		}

		const inserted = await db
			.prepare(
				`INSERT INTO chat_conversations (user_id, title, messages)
         VALUES (?1, ?2, ?3)
         RETURNING id, title, messages, updated_at`
			)
			.bind(userId, title, messagesJson)
			.first<ConversationRow>()

		if (!inserted) return Response.json({ error: 'Could not save conversation.' }, { status: 500 })
		return Response.json({ conversation: mapRow(inserted) })
	} catch (err) {
		console.error('[chat/conversations] POST failed:', err)
		return Response.json({ error: 'Internal server error.' }, { status: 500 })
	}
}

export const DELETE: APIRoute = async ({ request, cookies }) => {
	try {
		if (!isGithubAuthEnabled(env)) {
			return Response.json({ error: 'Not available.' }, { status: 503 })
		}
		const db = env.DB
		if (!db) return Response.json({ error: 'Not available.' }, { status: 503 })

		const user = await getSessionUser(cookies, env)
		if (!user) return Response.json({ error: 'Sign in to chat.', code: 'auth' }, { status: 401 })

		const body = await request.json().catch(() => null)
		const id = Number((body as { id?: unknown } | null)?.id)
		if (!Number.isInteger(id) || id < 1) {
			return Response.json({ error: 'Invalid conversation.' }, { status: 400 })
		}

		await db
			.prepare(`DELETE FROM chat_conversations WHERE id = ?1 AND user_id = ?2`)
			.bind(id, `gh:${user.id}`)
			.run()

		return Response.json({ ok: true })
	} catch (err) {
		console.error('[chat/conversations] DELETE failed:', err)
		return Response.json({ error: 'Internal server error.' }, { status: 500 })
	}
}
