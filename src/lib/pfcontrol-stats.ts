const ENDPOINT = 'https://pfcontrol.com/api/data/statistics'
const TIMEOUT_MS = 1200
const MEMO_MS = 10 * 60 * 1000

let memo: { at: number; stats: PFControlStats } | null = null

export type PFControlStats = {
	registeredUsers: number
	flightsLogged30d: number
	sessionsCreated30d: number
	live: boolean
}

const FALLBACK: PFControlStats = {
	registeredUsers: 12198,
	flightsLogged30d: 62638,
	sessionsCreated30d: 2346,
	live: false,
}

export async function getPFControlStats(): Promise<PFControlStats> {
	if (memo && Date.now() - memo.at < MEMO_MS) return memo.stats
	const stats = await fetchStats()
	if (stats.live) memo = { at: Date.now(), stats }
	return stats
}

async function fetchStats(): Promise<PFControlStats> {
	try {
		const res = await fetch(ENDPOINT, {
			signal: AbortSignal.timeout(TIMEOUT_MS),
			cf: { cacheTtl: 3600, cacheEverything: true },
		} as RequestInit)
		if (!res.ok) return FALLBACK
		const data = (await res.json()) as Record<string, unknown>
		const users = Number(data.registeredUsers)
		if (!Number.isFinite(users) || users <= 0) return FALLBACK
		return {
			registeredUsers: users,
			flightsLogged30d: Number(data.flightsLogged) || FALLBACK.flightsLogged30d,
			sessionsCreated30d: Number(data.sessionsCreated) || FALLBACK.sessionsCreated30d,
			live: true,
		}
	} catch {
		return FALLBACK
	}
}

export function formatFloor(n: number, step = 1000): string {
	const floored = Math.max(step, Math.floor(n / step) * step)
	return `${floored.toLocaleString('en-US')}+`
}
