/* Deployed separately from the main site (see ../wrangler.jsonc). Runs on a daily cron to hard-delete chat_conversations rows older than 7 days, as a
 * backstop for the lazy purge in src/pages/api/chat/conversations.ts, which only cleans up when that specific user is active again. */

interface CleanupEnv {
	DB: D1Database
}

const RETENTION_DAYS = 7

async function cleanup(env: CleanupEnv): Promise<void> {
	const result = await env.DB.prepare(
		`DELETE FROM chat_conversations WHERE updated_at < datetime('now', ?1)`
	)
		.bind(`-${RETENTION_DAYS} days`)
		.run()

	const changes = (result.meta as { changes?: number })?.changes ?? 0
	console.log(`[chat-cleanup] deleted ${changes} expired conversation(s)`)
}

export default {
	async scheduled(
		_event: unknown,
		env: CleanupEnv,
		ctx: { waitUntil(promise: Promise<unknown>): void }
	) {
		ctx.waitUntil(cleanup(env))
	},
}
