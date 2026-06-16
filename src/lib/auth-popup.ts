export type AuthUser = {
	login: string
	name: string
	avatar: string
}

export function openLoginPopup(): void {
	const w = 600
	const h = 720
	const left = window.screenX + Math.max(0, (window.outerWidth - w) / 2)
	const top = window.screenY + Math.max(0, (window.outerHeight - h) / 2)
	window.open(
		'/api/auth/github',
		'gh-oauth',
		`popup,width=${w},height=${h},left=${left},top=${top}`
	)
}

export function onAuthMessage(handler: (user: AuthUser) => void): () => void {
	const listener = (ev: MessageEvent) => {
		if (ev.origin !== location.origin) return
		if (!ev.data || ev.data.type !== 'gh-auth' || !ev.data.user) return
		handler({
			login: String(ev.data.user.login ?? ''),
			name: String(ev.data.user.name ?? ''),
			avatar: String(ev.data.user.avatar ?? ''),
		})
	}
	window.addEventListener('message', listener)
	return () => window.removeEventListener('message', listener)
}
