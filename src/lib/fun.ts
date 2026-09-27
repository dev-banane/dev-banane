const RAMP = ['#3b82f6', '#7c3aed', '#d946ef', '#f97316']
const OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'
const FALL = 'cubic-bezier(0.55, 0, 0.85, 0.35)'
const IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)'

export function calm(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

let lastPick: unknown
export function pick<T>(list: readonly T[]): T {
	let next = list[Math.floor(Math.random() * list.length)]
	if (list.length > 1 && next === lastPick) next = list[(list.indexOf(next) + 1) % list.length]
	lastPick = next
	return next
}

function center(el: Element) {
	const r = el.getBoundingClientRect()
	return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

export function particle(x: number, y: number, css: string, text = ''): HTMLSpanElement {
	const p = document.createElement('span')
	p.setAttribute('aria-hidden', 'true')
	p.textContent = text
	p.style.cssText =
		`position:fixed;left:${x}px;top:${y}px;z-index:60;pointer-events:none;` +
		`will-change:transform,opacity;${css}`
	document.body.appendChild(p)
	return p
}

export function confetti(el: Element, count = 16) {
	if (calm()) return
	const { x, y } = center(el)
	for (let i = 0; i < count; i++) {
		const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1
		const dist = 28 + Math.random() * 42
		const dx = Math.cos(angle) * dist
		const dy = Math.sin(angle) * dist
		const w = 4 + Math.random() * 3
		const round = Math.random() < 0.35
		const p = particle(
			x,
			y,
			`width:${w}px;height:${round ? w : w * 0.45}px;border-radius:${round ? '50%' : '1px'};` +
				`background:${RAMP[i % RAMP.length]};`
		)
		const spin = (Math.random() - 0.5) * 720
		p.animate(
			[
				{ transform: 'translate(-50%,-50%) translate(0,0) rotate(0)', opacity: 1, easing: OUT },
				{
					transform: `translate(-50%,-50%) translate(${dx}px,${dy}px) rotate(${spin / 2}deg)`,
					opacity: 1,
					offset: 0.4,
					easing: FALL,
				},
				{
					transform: `translate(-50%,-50%) translate(${dx * 1.2}px,${dy + 34}px) rotate(${spin}deg)`,
					opacity: 0,
				},
			],
			{ duration: 800 + Math.random() * 400 }
		).finished.finally(() => p.remove())
	}
}

export function quip(el: Element, text: string, { fall = false } = {}) {
	if (calm()) return
	const { x, y } = center(el)
	const p = particle(
		x,
		y,
		'font:600 0.75rem/1 Inter,system-ui,sans-serif;white-space:nowrap;color:var(--fg);',
		text
	)
	const drift = (Math.random() - 0.5) * 24
	const frames = fall
		? [
				{ transform: 'translate(-50%,-50%) translate(0,0) rotate(0)', opacity: 0, easing: OUT },
				{ transform: `translate(-50%,-50%) translate(${drift}px,-10px) rotate(-6deg)`, opacity: 1, offset: 0.25, easing: FALL },
				{ transform: `translate(-50%,-50%) translate(${drift * 1.4}px,46px) rotate(14deg)`, opacity: 0 },
			]
		: [
				{ transform: 'translate(-50%,-50%) translate(0,0) scale(0.6)', opacity: 0, easing: OUT },
				{ transform: `translate(-50%,-50%) translate(${drift / 2}px,-22px) scale(1.05)`, opacity: 1, offset: 0.3, easing: 'ease-in' },
				{ transform: `translate(-50%,-50%) translate(${drift}px,-48px) scale(1)`, opacity: 0 },
			]
	p.animate(frames, { duration: fall ? 1000 : 1100 }).finished.finally(() => p.remove())
}

export function launch(icon: Element | null | undefined, dir: 'up' | 'down' = 'up') {
	if (!icon || calm()) return
	const s = dir === 'up' ? -1 : 1
	icon.animate(
		[
			{ transform: 'translateY(0) scale(1)', opacity: 1, easing: IN_OUT },
			{ transform: `translateY(${s * -3}px) scale(0.85, 1.15)`, opacity: 1, offset: 0.15, easing: 'ease-in' },
			{ transform: `translateY(${s * 26}px) scale(0.7, 1.3)`, opacity: 0, offset: 0.45 },
			{ transform: `translateY(${s * -18}px) scale(1)`, opacity: 0, offset: 0.46, easing: OUT },
			{ transform: 'translateY(0) scale(1)', opacity: 1 },
		],
		{ duration: 700 }
	)
}

export function deflate(el: Element) {
	if (calm()) return
	el.animate(
		[
			{ transform: 'scale(1)', easing: OUT },
			{ transform: 'scale(1.08, 0.78) translateY(2px)', offset: 0.3, easing: IN_OUT },
			{ transform: 'scale(0.96, 1.04)', offset: 0.65, easing: OUT },
			{ transform: 'scale(1)' },
		],
		{ duration: 560 }
	)
}

export function dizzy(el: Element) {
	if (calm()) return
	el.animate(
		[
			{ transform: 'rotate(0)' },
			{ transform: 'rotate(-18deg)', offset: 0.15 },
			{ transform: 'rotate(14deg)', offset: 0.35 },
			{ transform: 'rotate(-9deg)', offset: 0.55 },
			{ transform: 'rotate(5deg)', offset: 0.75 },
			{ transform: 'rotate(0)' },
		],
		{ duration: 900 }
	)
}
