import type { AuthUser } from './auth-popup'

export type AuthState = { enabled: boolean; user: AuthUser | null }

const TTL_MS = 60_000

let cached: AuthState | null = null
let cachedAt = 0
let inflight: Promise<AuthState> | null = null

function normalize(data: unknown): AuthState {
	const d = data as { enabled?: unknown; user?: Record<string, unknown> } | null
	return {
		enabled: !!d?.enabled,
		user: d?.user
			? {
					login: String(d.user.login ?? ''),
					name: String(d.user.name ?? ''),
					avatar: String(d.user.avatar ?? ''),
				}
			: null,
	}
}

export function getAuthState(): Promise<AuthState> {
	if (cached && Date.now() - cachedAt < TTL_MS) return Promise.resolve(cached)
	if (inflight) return inflight

	inflight = fetch('/api/auth/me')
		.then((res) => (res.ok ? res.json() : null))
		.then((data) => {
			const state = normalize(data)
			setAuthState(state)
			return state
		})
		.catch(() => cached ?? { enabled: false, user: null })
		.finally(() => {
			inflight = null
		})

	return inflight
}

export function setAuthState(state: AuthState): void {
	cached = state
	cachedAt = Date.now()
}
