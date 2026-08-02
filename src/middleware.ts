import { defineMiddleware } from 'astro:middleware'

const STYLE_SRC = import.meta.env.DEV
	? "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com"
	: "style-src 'self' https://fonts.googleapis.com"

const SECURITY_HEADERS: Record<string, string> = {
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy':
		'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
	'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'Cross-Origin-Resource-Policy': 'same-origin',
	'Content-Security-Policy':
		`default-src 'self'; script-src 'self' https://challenges.cloudflare.com; ${STYLE_SRC}; style-src-attr 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; manifest-src 'self'; worker-src 'self'; upgrade-insecure-requests`,
}

export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next()
	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		if (!response.headers.has(name)) response.headers.set(name, value)
	}
	return response
})
