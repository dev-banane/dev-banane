import { calm, dizzy, particle, pick, quip } from './fun'

type Pose =
	| 'stand'
	| 'walk'
	| 'run'
	| 'sit'
	| 'groom'
	| 'bath'
	| 'sleep'
	| 'eat'
	| 'knead'
	| 'jump'
	| 'fall'
	| 'stalk'
	| 'bat'
	| 'stretch'
	| 'belly'
	| 'flail'
	| 'hack'
type Rect = { left: number; right: number; top: number; bottom: number }
type Job = () => Promise<void>
export type CatOptions = { delay?: number; arrive?: 'walk' | 'drop' }

const W = 36
const H = 27
const OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'
const GRAVITY = 0.0016 // px/ms²
const WALK_SPEED = 0.045
const RUN_SPEED = 0.16
const MAX_VX = 0.3 // px/ms; longer jumps arc higher instead of teleporting sideways
const YARN_R = 5.5
const YARN_COOLDOWN = 30_000
const EAT_COOLDOWN = 20_000
const WHOLE = 'inset(0 0% 0 0% round 9999px)'

const PURRS = ['prrr', 'mrrp?', 'meow', '*headbutt*']
const BURPS = ['*burp*', 'crunchy', 'tastes like CSS', 'needed more salt']
const REGROWS = ['respawned', 'it grew back', 'button restored']
const SPOOKED = ['!', '!?', 'hiss']
const DONE = ['ok that’s enough', 'personal space pls', 'bye']
const FOLLOW = ['wait for me!', 'hup', 'coming!', 'wheee']
const CAUGHT_BATHING = ['…what?', 'don’t look', 'this is private', 'rude']
const YAWNS = ['*yaaawn*', '*big stretch*', 'mrrrraow']
const DIZZY = ['@_@', 'the room is spinning', 'got it. almost.']
const RELIEF = ['…better', 'sorry', 'that was lunch']
const TRAP = ['TRAP', 'the belly is a lie', 'no touchy', 'fool.']
const YARN_LOST = ['where did it go', 'it was never mine anyway', '…', 'I meant to do that']
const YARN_CAUGHT = ['mine.', 'gotcha', 'apex predator', 'yarn defeated']

const YARN_SVG = `<svg viewBox="0 0 12 12" width="11" height="11"><circle cx="6" cy="6" r="5.5" fill="#e0587f"/><path d="M1.6 4.2c2.4.3 5.8 2.2 7.6 5.6M3.2 1.6c1.4 1.4 4.6 5.4 4.6 9.6M1 7.4c1.8-.6 5-.4 9.8 1.4" fill="none" stroke="#f7a8bd" stroke-width=".8" stroke-linecap="round"/></svg>`

const SVG = `<div class="cat__flip"><svg class="cat__svg" viewBox="0 0 32 24">
	<g class="cat__tail">
		<path d="M8 13.5C4.2 13 2.4 9.6 3.4 5.4" fill="none" stroke="var(--cat-fur)" stroke-width="2.4" stroke-linecap="round"/>
		<path d="M8 13.5C4.2 13 2.4 9.6 3.4 5.4" fill="none" stroke="var(--cat-stripe)" stroke-width="2.4" stroke-dasharray="1.2 1.8" stroke-dashoffset="-1.5"/>
	</g>
	<g class="cat__leg cat__leg--h1"><g class="cat__stride"><rect x="7.4" y="12.5" width="2.7" height="11.5" rx="1.35" fill="var(--cat-shade)"/><rect x="7.4" y="19.2" width="2.7" height="1.1" fill="var(--cat-stripe)"/></g></g>
	<g class="cat__leg cat__leg--f2"><g class="cat__stride"><rect x="21" y="12.5" width="2.7" height="11.5" rx="1.35" fill="var(--cat-shade)"/><rect x="21" y="19.2" width="2.7" height="1.1" fill="var(--cat-stripe)"/></g></g>
	<g class="cat__torso" fill="var(--cat-fur)"><g class="cat__spine">
		<ellipse cx="15" cy="14.2" rx="8.6" ry="5"/>
		<circle cx="10.2" cy="15.3" r="4.1"/>
		<circle cx="20.2" cy="14.6" r="3.7"/>
		<path d="M10.2 10.3q.9 1.5.1 3.1M13.2 9.5q.9 1.6.1 3.3M16.2 9.4q.9 1.6.1 3.3M19.1 9.9q.8 1.4.1 2.8M7.6 13.6q1.9.6 2.1 2.6" fill="none" stroke="var(--cat-stripe)" stroke-width="1.1" stroke-linecap="round"/>
	</g></g>
	<g class="cat__leg cat__leg--h2"><g class="cat__stride"><rect x="10.5" y="12.5" width="2.7" height="11.5" rx="1.35" fill="var(--cat-fur)"/><rect x="10.5" y="19.2" width="2.7" height="1.1" fill="var(--cat-stripe)"/></g></g>
	<g class="cat__leg cat__leg--f1"><g class="cat__stride"><rect x="18.3" y="12.5" width="2.7" height="11.5" rx="1.35" fill="var(--cat-fur)"/><rect x="18.3" y="19.2" width="2.7" height="1.1" fill="var(--cat-stripe)"/></g></g>
	<g class="cat__head">
		<path d="M19.9 7.2 20.6 1.2 24.3 4.3ZM24.2 4.2 28.1 1.4 28.7 7.1Z" fill="var(--cat-fur)"/>
		<path d="M21 5.9 21.3 2.9 23.2 4.4ZM25.4 4.4 27.6 2.7 27.9 5.6Z" fill="var(--cat-ear)"/>
		<circle cx="24" cy="9" r="5" fill="var(--cat-fur)"/>
		<path d="M22.8 5l.4 1.7M24.4 4.7v1.9M26 5l-.4 1.7" fill="none" stroke="var(--cat-stripe)" stroke-width="0.9" stroke-linecap="round"/>
		<ellipse cx="27.3" cy="10.9" rx="2.1" ry="1.5" fill="var(--cat-cream)"/>
		<circle cx="28.9" cy="10.1" r="0.55" fill="var(--cat-nose)"/>
		<circle class="cat__eye" cx="26.1" cy="8.2" r="0.95" fill="var(--cat-eye)"/>
	</g>
</svg></div>`

class Aborted extends Error {}

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const at = (x: number, y: number) => `translate(${x - W / 2}px, ${y - H}px)`

function box(el: Element): Rect {
	const r = el.getBoundingClientRect()
	return { left: r.left + scrollX, right: r.right + scrollX, top: r.top + scrollY, bottom: r.bottom + scrollY }
}

function inView(el: Element) {
	const r = el.getBoundingClientRect()
	return r.width > 0 && r.top > Math.max(H + 8, innerHeight * 0.12) && r.top < innerHeight * 0.92
}

function isSmall(el: Element) {
	const r = el.getBoundingClientRect()
	return r.height < 64 && r.width < 260
}

function spot(el: Element, x?: number) {
	const r = box(el)
	const w = r.right - r.left
	const m = w < 80 ? w * 0.38 : 12
	return clamp(x ?? rand(r.left + m, r.right - m), r.left + m, r.right - m)
}

function arc(x0: number, y0: number, x1: number, y1: number, lift: number) {
	const apex = Math.min(y0, y1) - lift
	const v0 = -Math.sqrt(2 * GRAVITY * (y0 - apex))
	const tUp = -v0 / GRAVITY
	const duration = Math.max(160, tUp + Math.sqrt((2 * (y1 - apex)) / GRAVITY))
	const pos = (t: number): [number, number] =>
		t >= duration ? [x1, y1] : [x0 + (x1 - x0) * (t / duration), y0 + v0 * t + 0.5 * GRAVITY * t * t]
	return { duration, tUp, apex, pos }
}

function weighted(options: [number, Job][]): Job {
	let roll = Math.random() * options.reduce((sum, [w]) => sum + w, 0)
	for (const [w, job] of options) if ((roll -= w) <= 0) return job
	return options[0][1]
}

class Cat {
	private el: HTMLDivElement
	private body: SVGSVGElement
	private x = 0
	private y = 0
	private perch: HTMLElement | null = null
	private hole: HTMLElement | null = null
	private ac = new AbortController()
	private next: Job | null = null
	private locked = true
	private dead = false
	private lastEat = performance.now() - EAT_COOLDOWN / 2
	private lastSpook = 0
	private pets: number[] = []
	private leaveAt = 0
	private timers = new Set<number>()
	private eaten = new Set<HTMLElement>()
	private scrollTimer = 0
	private arrived = false
	private yarn: HTMLDivElement | null = null
	private yarnOn: HTMLElement | null = null
	private yx = 0
	private yy = 0
	private yspin = 0
	private lastYarn = performance.now() - YARN_COOLDOWN / 2
	private lastScrollCheck = 0

	constructor(
		private perchSelector: string,
		private edibleSelector: string,
		private opts: CatOptions = {}
	) {
		this.el = document.createElement('div')
		this.el.className = 'cat'
		this.el.setAttribute('aria-hidden', 'true')
		this.el.innerHTML = SVG
		this.el.style.visibility = 'hidden'
		this.body = this.el.querySelector('svg')!
		this.pose('stand')
		this.face('right')
		document.body.append(this.el)

		this.el.addEventListener('click', this.onPet)
		document.addEventListener('pointerover', this.onOver)
		addEventListener('resize', this.onResize)
		addEventListener('scroll', this.onScroll, { passive: true })
	}

	async run() {
		try {
			await this.wait(this.opts.delay ?? 2500)
			while (!this.dead) {
				try {
					const job = this.next
					this.next = null
					await (job ? job() : this.tick())
				} catch (err) {
					if (!(err instanceof Aborted)) throw err
				}
				if (this.ac.signal.aborted) this.ac = new AbortController()
			}
		} catch (err) {
			if (!(err instanceof Aborted)) console.error(err)
			this.stop()
		}
	}

	stop() {
		if (this.dead) return
		this.dead = true
		this.ac.abort()
		for (const t of this.timers) clearTimeout(t)
		clearTimeout(this.scrollTimer)
		this.yarn?.remove()
		for (const b of this.eaten) {
			b.style.visibility = ''
			for (const a of b.getAnimations()) a.cancel()
		}
		this.eaten.clear()
		document.removeEventListener('pointerover', this.onOver)
		removeEventListener('resize', this.onResize)
		removeEventListener('scroll', this.onScroll)
		this.el.remove()
	}

	private perches() {
		return [...document.querySelectorAll<HTMLElement>(this.perchSelector)].filter(
			(b) => !this.eaten.has(b) && b.getClientRects().length > 0
		)
	}

	private row(b: HTMLElement, all: HTMLElement[]) {
		const top = box(b).top
		return all.filter((o) => Math.abs(box(o).top - top) < 6).sort((a, c) => box(a).left - box(c).left)
	}

	private async tick() {
		const all = this.perches()
		if (this.hole) return this.climbOut(all)
		if (!this.perch || !this.perch.isConnected) {
			this.perch = null
			return this.enter(all)
		}
		if (!inView(this.perch)) return this.follow(all)
		this.settle()
		if (performance.now() > this.leaveAt) return this.leave()

		const options: [number, Job][] = [
			[3, () => this.sit()],
			[1.5, () => this.groom()],
			[1, () => this.nap()],
			[2, () => this.stroll()],
			[3, () => this.hop(all)],
			[2, () => this.leap(all)],
			[1, () => this.knead()],
			[1.2, () => this.bath()],
			[1, () => this.stretch()],
			[0.6, () => this.chaseTail()],
			[0.5, () => this.hairball()],
			[0.8, () => this.belly()],
		]
		if (this.canEat(all)) options.push([2, () => this.eat()])
		if (performance.now() - this.lastYarn > YARN_COOLDOWN) options.push([1.2, () => this.yarnPlay()])
		await weighted(options)()
	}

	private async enter(all: HTMLElement[]) {
		const inViewNow = all.filter(inView)
		if (!inViewNow.length) return this.wait(1500)

		this.locked = true
		try {
			const button = inViewNow.find((b) => b.matches(this.edibleSelector))
			const walkIn = button && (this.arrived || this.opts.arrive !== 'drop')
			this.arrived = true
			this.leaveAt = performance.now() + rand(70_000, 120_000)
			if (walkIn) {
				// stroll in along the button row and hop up
				const first = this.row(button!, inViewNow)[0]
				const r = box(first)
				this.face('right')
				this.place(r.left - 70, r.bottom)
				this.show()
				await this.walkTo(r.left - 20)
				await this.wait(rand(250, 600))
				await this.jumpTo(first, spot(first, r.left + 14), r.top)
			} else {
				await this.dropIn(inViewNow[Math.floor(Math.random() * inViewNow.length)])
			}
		} finally {
			this.locked = false
		}
	}

	private async leave() {
		this.locked = true
		try {
			const r = box(this.perch!)
			await this.walkTo(r.left + 8)
			if (r.bottom - r.top < 80) await this.jumpTo(null, r.left - 24, r.bottom, 14)
			this.face('left')
			this.pose('walk')
			await this.play(
				this.el.animate(
					[
						{ transform: at(this.x, this.y), opacity: 1 },
						{ transform: at(this.x - 60, this.y), opacity: 0 },
					],
					{ duration: 1300 }
				),
				true
			)
			this.el.style.visibility = 'hidden'
			this.perch = null
		} finally {
			this.locked = false
		}
		await this.wait(rand(30_000, 60_000))
	}

	private async follow(all: HTMLElement[]) {
		const candidates = all.filter(inView)
		if (!candidates.length) return this.wait(600)

		const aimY = scrollY + innerHeight * 0.35
		const score = (b: HTMLElement) => Math.abs(box(b).top - aimY) + 0.3 * Math.abs(this.midX(b) - this.x)
		const best = candidates.sort((a, c) => score(a) - score(c)).slice(0, 2)
		const t = best[Math.floor(Math.random() * best.length)]

		this.locked = true
		try {
			const top = scrollY
			const bottom = scrollY + innerHeight
			const x = spot(t, this.x)
			let lift = 22
			if (this.y < top) {
				this.place(x, top)
				this.pose('fall')
				lift = 0
			} else if (this.y - H > bottom) {
				this.place(x, bottom + H + 4)
			}
			if (Math.random() < 0.3) quip(this.el, pick(FOLLOW))
			if (lift && this.perch) await this.goTo(t, { run: true, crouch: false })
			else await this.jumpTo(t, x, box(t).top, lift, false)
		} finally {
			this.locked = false
		}
	}

	private async dropIn(t: HTMLElement) {
		const x = spot(t)
		this.place(x, scrollY)
		this.pose('fall')
		this.show()
		await this.jumpTo(t, x, box(t).top, 0, false)
	}

	private show() {
		this.el.style.visibility = ''
		this.el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 })
	}

	private async sit() {
		this.pose('sit')
		await this.wait(rand(2000, 5000))
	}

	private async groom() {
		this.pose('groom')
		await this.wait(rand(1500, 3000))
		this.pose('sit')
		await this.wait(600)
	}

	private async nap() {
		this.pose('sit')
		await this.wait(800)
		this.pose('sleep')
		const end = performance.now() + rand(6000, 11_000)
		while (performance.now() < end) {
			this.zzz()
			await this.wait(1100)
		}
		this.pose('sit')
		await this.wait(500)
	}

	private async stroll() {
		await this.walkTo(spot(this.perch!))
		await this.wait(rand(400, 900))
	}

	private async knead() {
		this.pose('knead')
		const b = this.perch!
		if (isSmall(b)) {
			await this.play(
				b.animate([{ transform: 'none' }, { transform: 'translateY(1px) scaleY(0.96)' }], {
					duration: 280,
					iterations: 8,
					direction: 'alternate',
					easing: 'ease-in-out',
				})
			)
		} else {
			await this.wait(2240)
		}
		this.pose('sit')
		await this.wait(500)
	}

	private async hop(all: HTMLElement[]) {
		const b = this.perch!
		const row = this.row(b, all)
		const i = row.indexOf(b)
		const dirs = [-1, 1].filter((d) => row[i + d])
		if (!dirs.length) return this.leap(all)
		const d = dirs[Math.floor(Math.random() * dirs.length)]
		const n = row[i + d]
		const rb = box(b)
		await this.walkTo(d > 0 ? rb.right - 9 : rb.left + 9)
		this.face(d > 0 ? 'right' : 'left')
		await this.wait(rand(200, 700))
		const rn = box(n)
		await this.jumpTo(n, d > 0 ? rn.left + 12 : rn.right - 12, rn.top, 12)
	}

	private async leap(all: HTMLElement[]) {
		const others = all.filter((b) => b !== this.perch && inView(b) && Math.abs(box(b).top - this.y) < 180)
		if (!others.length) return this.stroll()
		const t = others[Math.floor(Math.random() * others.length)]
		await this.goTo(t, { lift: 26 })
		if (Math.random() < 0.5) await this.stroll()
	}

	private canEat(all: HTMLElement[]) {
		return (
			this.perch!.matches(this.edibleSelector) &&
			all.filter((b) => b.matches(this.edibleSelector)).length >= 3 &&
			this.eaten.size === 0 &&
			performance.now() - this.lastEat > EAT_COOLDOWN &&
			inView(this.perch!)
		)
	}

	private async eat() {
		const b = this.perch!
		this.locked = true
		try {
			const r = box(b)
			const w = r.right - r.left
			this.pose('stand')
			await this.wait(350)
			this.pose('eat')

			const f = clamp((this.x - r.left) / w, 0.2, 0.8)
			let clip = WHOLE
			for (let i = 1; i <= 4; i++) {
				const k = i / 4
				const next = `inset(0 ${((1 - f) * k * 100).toFixed(1)}% 0 ${(f * k * 100).toFixed(1)}% round 9999px)`
				b.animate([{ clipPath: clip }, { clipPath: next }], { duration: 110, easing: OUT, fill: 'forwards' })
				clip = next
				this.crumbs(r.left + w * f * k, (r.top + r.bottom) / 2)
				this.crumbs(r.right - w * (1 - f) * k, (r.top + r.bottom) / 2)
				await this.wait(280)
			}

			b.style.visibility = 'hidden'
			for (const a of b.getAnimations()) a.cancel()
			this.eaten.add(b)
			this.lastEat = performance.now()
			this.perch = null
			this.hole = b

			this.pose('stand')
			await this.wait(500)
			quip(this.el, 'oh.')
			await this.wait(700)
			await this.jumpTo(null, this.x, r.bottom, 0, false)
			await this.wait(700)
			quip(this.el, pick(BURPS))
			await this.wait(1300)
		} finally {
			this.locked = false
		}
	}

	private async climbOut(all: HTMLElement[]) {
		const hole = this.hole!
		const others = all.filter((b) => b !== hole)
		const visibleOthers = others.filter(inView)
		const pool = visibleOthers.length ? visibleOthers : others
		const near = pool.sort((a, c) => Math.abs(this.midX(a) - this.x) - Math.abs(this.midX(c) - this.x))[0]
		if (near) {
			const r = box(near)
			await this.jumpTo(near, spot(near, this.midX(near) > this.x ? r.left : r.right), r.top, 16)
		}
		this.hole = null
		this.later(() => this.regrow(hole), near ? 900 : 0)
		if (!near) {
			this.el.style.visibility = 'hidden'
			await this.wait(rand(30_000, 60_000))
		}
	}

	private regrow(b: HTMLElement) {
		if (!this.eaten.delete(b)) return
		b.style.visibility = ''
		if (!b.isConnected) return
		b.animate(
			[
				{ clipPath: 'inset(0 50% 0 50% round 9999px)', transform: 'scale(0.7)' },
				{ clipPath: WHOLE, transform: 'scale(1.08)', offset: 0.6 },
				{ clipPath: WHOLE, transform: 'none' },
			],
			{ duration: 520, easing: OUT }
		)
		quip(b, pick(REGROWS))
	}

	private async bath() {
		this.pose('sit')
		await this.wait(500)
		this.pose('bath')
		await this.wait(rand(2500, 4000))
		if (Math.random() < 0.4) {
			// caught mid-lick
			this.pose('sit')
			await this.wait(250)
			quip(this.el, pick(CAUGHT_BATHING))
			await this.wait(1500)
		}
		this.pose('sit')
		await this.wait(400)
	}

	private async stretch() {
		this.pose('stand')
		await this.wait(200)
		this.pose('stretch')
		await this.wait(700)
		if (Math.random() < 0.6) quip(this.el, pick(YAWNS))
		await this.wait(1300)
		this.pose('stand')
		await this.wait(500)
	}

	private async chaseTail() {
		this.pose('stand')
		if (Math.random() < 0.5) quip(this.el, '?!')
		await this.wait(400)
		for (let i = 0; i < 8; i++) {
			this.face(this.el.dataset.facing === 'left' ? 'right' : 'left')
			this.body.animate([{ transform: 'none' }, { transform: 'translateY(-4px)', offset: 0.5 }, { transform: 'none' }], {
				duration: 240,
				easing: 'ease-in-out',
			})
			await this.wait(250)
		}
		dizzy(this.body)
		quip(this.el, pick(DIZZY))
		await this.wait(1100)
		this.pose('sit')
		await this.wait(600)
	}

	private async hairball() {
		this.pose('hack')
		quip(this.el, 'hk hk hk')
		for (let i = 0; i < 3; i++) {
			this.body.animate(
				[
					{ transform: 'none' },
					{ transform: 'scale(1.07, 0.88)', offset: 0.4 },
					{ transform: 'scale(0.97, 1.05)', offset: 0.75 },
					{ transform: 'none' },
				],
				{ duration: 380, easing: 'ease-in-out' }
			)
			await this.wait(460)
		}
		this.spit()
		this.pose('stand')
		await this.wait(700)
		quip(this.el, pick(RELIEF))
		await this.wait(1200)
	}

	private async belly() {
		this.pose('stand')
		await this.wait(250)
		this.pose('belly')
		await this.wait(rand(3000, 5000))
		this.pose('stand')
		await this.wait(500)
	}

	private async trap() {
		this.pose('flail')
		quip(this.el, pick(TRAP))
		await this.wait(1100)
		await this.jumpTo(this.perch, this.x, this.y, 14, false)
		this.pose('sit')
		await this.wait(1200)
	}

	private async yarnPlay() {
		const on = this.perch!
		const r = box(on)
		const dir = r.right - this.x > this.x - r.left ? 1 : -1
		const lx = spot(on, this.x + dir * rand(40, 80))
		this.lastYarn = performance.now()

		const yarn = document.createElement('div')
		yarn.className = 'cat-yarn'
		yarn.setAttribute('aria-hidden', 'true')
		yarn.innerHTML = YARN_SVG
		document.body.append(yarn)
		this.yarn = yarn
		this.yarnOn = on
		this.placeYarn(lx - dir * 10, scrollY - 12, 0)

		try {
			this.pose('stand')
			await this.yarnFall(lx, r.top)
			this.face(this.yx > this.x ? 'right' : 'left')
			quip(this.el, '!')
			await this.wait(500)

			let lost = false
			for (let round = 0; round < 3; round++) {
				if (!(await this.reachYarn())) {
					lost = true
					break
				}
				const side = this.yx >= this.x ? 1 : -1
				if (round === 0) {
					this.pose('stalk')
					await this.wiggle()
					await this.jumpTo(this.yarnOn, spot(this.yarnOn!, this.yx - side * 6), box(this.yarnOn!).top, 16, false)
				} else {
					this.pose('bat')
					await this.wait(140)
				}
				await this.yarnRoll(side * rand(50, 120))
				this.pose('stand')
			}

			if (lost || !(await this.reachYarn())) {
				this.pose('stand')
				await this.wait(300)
				quip(this.el, pick(YARN_LOST))
				await this.wait(1500)
				return
			}
			await this.jumpTo(this.yarnOn, spot(this.yarnOn!, this.yx), box(this.yarnOn!).top, 10)
			yarn.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' })
			this.pose('sit')
			quip(this.el, pick(YARN_CAUGHT))
			await this.wait(1600)
		} finally {
			this.yarn = null
			this.yarnOn = null
			yarn.animate([{ opacity: getComputedStyle(yarn).opacity }, { opacity: 0 }], { duration: 300 }).finished.finally(() =>
				yarn.remove()
			)
		}
	}

	private async reachYarn() {
		const on = this.yarnOn
		if (!on || !inView(on)) return false
		if (on !== this.perch) {
			if (this.perch && box(on).top > this.y + 20) {
				await this.walkTo(spot(this.perch, this.yx), true)
				this.face(this.yx > this.x ? 'right' : 'left')
				this.pose('stand')
				await this.wait(350)
			}
			const side = this.yx >= this.x ? 1 : -1
			await this.goTo(on, { lift: 18, x: spot(on, this.yx - side * 20), run: true })
		}
		const side = this.yx >= this.x ? 1 : -1
		const stop = spot(on, this.yx - side * 16)
		await this.walkTo(stop, Math.abs(stop - this.x) > 30)
		this.face(this.yx >= this.x ? 'right' : 'left')
		return true
	}

	private async wiggle() {
		await this.play(
			this.body.animate([{ transform: 'translateX(-0.8px) rotate(-2deg)' }, { transform: 'translateX(0.8px) rotate(2deg)' }], {
				duration: 110,
				iterations: 8,
				direction: 'alternate',
				easing: 'ease-in-out',
			})
		)
	}

	private placeYarn(x: number, y: number, spin = this.yspin) {
		this.yx = x
		this.yy = y
		this.yspin = spin
		this.yarn!.style.transform = `translate(${x - YARN_R}px, ${y - 2 * YARN_R}px) rotate(${spin}deg)`
	}

	private yarnFrame(x: number, y: number, spin: number): Keyframe {
		return { transform: `translate(${x - YARN_R}px, ${y - 2 * YARN_R}px) rotate(${spin}deg)` }
	}

	private async yarnFall(x1: number, y1: number, bounce = true) {
		const dir = Math.sign(x1 - this.yx) || 1
		const segs = [arc(this.yx, this.yy, x1, y1, 0)]
		if (bounce) segs.push(arc(x1, y1, x1 + dir * 10, y1, 12), arc(x1 + dir * 10, y1, x1 + dir * 16, y1, 4))
		const total = segs.reduce((sum, a) => sum + a.duration, 0)
		const x0 = this.yx
		const frames: Keyframe[] = []
		let t0 = 0
		for (const a of segs) {
			for (let t = 0; t < a.duration; t += 30) {
				const [px, py] = a.pos(t)
				frames.push({ ...this.yarnFrame(px, py, this.yspin + ((px - x0) / YARN_R) * 57.3), offset: (t0 + t) / total })
			}
			t0 += a.duration
		}
		const [fx, fy] = [bounce ? x1 + dir * 16 : x1, y1]
		const spin = this.yspin + ((fx - x0) / YARN_R) * 57.3
		frames.push({ ...this.yarnFrame(fx, fy, spin), offset: 1 })
		await this.play(this.yarn!.animate(frames, { duration: total }))
		this.placeYarn(fx, fy, spin)
	}

	private async yarnRoll(dist: number) {
		const r = box(this.yarnOn!)
		const lo = r.left + YARN_R
		const hi = r.right - YARN_R
		const target = this.yx + dist
		const off = target < lo || target > hi
		const tx = off ? (target < lo ? r.left - YARN_R : r.right + YARN_R) : target
		const d = tx - this.yx
		const spin = this.yspin + (d / YARN_R) * 57.3
		await this.play(
			this.yarn!.animate([this.yarnFrame(this.yx, this.yy, this.yspin), this.yarnFrame(tx, this.yy, spin)], {
				duration: Math.abs(d) / 0.22 + 100,
				// keep speed when it's about to go over the edge, otherwise roll to a stop
				easing: off ? 'cubic-bezier(0.3, 0.6, 0.7, 1)' : 'cubic-bezier(0.2, 0.8, 0.3, 1)',
			})
		)
		this.placeYarn(tx, this.yy, spin)
		if (!off) return

		const x = this.yx + Math.sign(d) * 12
		const below = this.perches()
			.filter((b) => {
				const rb = box(b)
				return b !== this.yarnOn && rb.left <= x && rb.right >= x && rb.top > this.yy + 4 && rb.top < scrollY + innerHeight * 0.9
			})
			.sort((a, c) => box(a).top - box(c).top)[0]
		this.yarnOn = below ?? null
		await this.yarnFall(x, below ? box(below).top : scrollY + innerHeight + 30, !!below)
	}

	private async spook() {
		const from = this.perch!
		quip(this.el, pick(SPOOKED))
		await this.jumpTo(from, this.x, box(from).top, 26, false)
		const others = this.perches().filter((b) => b !== from && inView(b) && Math.abs(box(b).top - this.y) < 220)
		if (!others.length) return
		const t = others[Math.floor(Math.random() * others.length)]
		await this.goTo(t, { lift: 30, run: true, crouch: false })
		this.pose('sit')
		await this.wait(1200)
	}

	private async walkTo(x: number, run = false) {
		const dx = x - this.x
		if (Math.abs(dx) < 2) return
		this.face(dx > 0 ? 'right' : 'left')
		this.pose(run ? 'run' : 'walk')
		await this.play(
			this.el.animate([{ transform: at(this.x, this.y) }, { transform: at(x, this.y) }], {
				// a short turn before setting off, then ease in/out so the stride ramps with the speed
				duration: Math.abs(dx) / (run ? RUN_SPEED : WALK_SPEED) + (run ? 80 : 200),
				delay: run ? 40 : 120,
				easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
			}),
			true
		)
		this.place(x, this.y)
		this.pose('stand')
	}

	private async goTo(
		target: HTMLElement,
		{ lift = 22, x, run = false, crouch = true }: { lift?: number; x?: number; run?: boolean; crouch?: boolean } = {}
	) {
		if (this.perch && this.perch !== target) {
			const aim = x ?? spot(target, this.x)
			const takeoff = spot(this.perch, aim)
			const d = Math.abs(takeoff - this.x)
			if (d > 6) await this.walkTo(takeoff, run || d > 120)
		}
		await this.jumpTo(target, x ?? spot(target, this.x), box(target).top, lift, crouch)
	}

	private async jumpTo(target: HTMLElement | null, x: number, y = this.y, lift = 22, crouch = true) {
		const was = this.locked
		this.locked = true
		try {
			if (Math.abs(x - this.x) > 1) this.face(x > this.x ? 'right' : 'left')
			this.pose('stand')
			let squat: Animation | null = null
			if (crouch) {
				squat = this.body.animate([{ transform: 'none' }, { transform: 'scale(1.12, 0.78)' }], {
					duration: 220,
					easing: OUT,
					fill: 'forwards',
				})
				await this.play(squat)
			}

			const x0 = this.x
			const y0 = this.y
			let path = arc(x0, y0, x, y, lift)
			while (Math.abs(x - x0) / path.duration > MAX_VX && lift < 240) path = arc(x0, y0, x, y, (lift += 12))
			const { duration, tUp, apex } = path
			const steps = Math.max(12, Math.round(duration / 30))
			const frames: Keyframe[] = []
			for (let i = 0; i <= steps; i++) frames.push({ transform: at(...path.pos((i / steps) * duration)) })

			const falling = this.el.dataset.pose === 'fall'
			if (!falling) {
				this.pose('jump')
				this.body.animate([{ transform: 'scale(0.88, 1.14)' }, { transform: 'none' }], { duration: 280, easing: OUT })
			}
			squat?.cancel()
			if (!falling && y - apex > 90) this.later(() => this.el.dataset.pose === 'jump' && this.pose('fall'), tUp)
			await this.play(this.el.animate(frames, { duration }), true)

			this.place(x, y)
			this.pose('stand')
			this.land()
			this.perch = target
			if (target && isSmall(target)) {
				target.animate([{ transform: 'none' }, { transform: 'translateY(2px) scale(1.02, 0.92)' }, { transform: 'none' }], {
					duration: 300,
					easing: OUT,
				})
			}
			await this.wait(180)
		} finally {
			this.locked = was
		}
	}

	private land() {
		this.body.animate([{ transform: 'scale(1.16, 0.8)' }, { transform: 'none' }], { duration: 280, easing: OUT })
	}

	private settle() {
		const r = box(this.perch!)
		const x = spot(this.perch!, this.x)
		if (Math.abs(this.y - r.top) > 1 || x !== this.x) this.place(x, r.top)
	}

	private midX(b: HTMLElement) {
		const r = box(b)
		return (r.left + r.right) / 2
	}

	private place(x: number, y: number) {
		this.x = x
		this.y = y
		this.el.style.transform = at(x, y)
	}

	private sync() {
		const m = new DOMMatrixReadOnly(getComputedStyle(this.el).transform)
		this.x = m.m41 + W / 2
		this.y = m.m42 + H
	}

	private pose(p: Pose) {
		this.el.dataset.pose = p
	}

	private face(dir: 'left' | 'right') {
		this.el.dataset.facing = dir
	}

	// ---- interaction ----

	private interrupt(job: Job) {
		if (this.locked || this.dead) return
		this.next = job
		this.ac.abort()
		this.sync()
	}

	private onPet = (e: Event) => {
		e.preventDefault()
		const now = performance.now()
		this.pets = [...this.pets.filter((t) => now - t < 3000), now]
		if (this.el.dataset.pose === 'belly' && !this.locked && this.perch) {
			this.interrupt(() => this.trap())
			return
		}
		this.hearts()
		if (this.locked || !this.perch) return
		if (this.pets.length >= 5) {
			this.pets = []
			this.interrupt(async () => {
				this.pose('stand')
				quip(this.el, pick(DONE))
				await this.wait(700)
				await this.leave()
			})
		} else if (this.pets.length === 1 || this.pets.length === 3) {
			this.interrupt(async () => {
				this.pose('sit')
				quip(this.el, pick(PURRS))
				await this.wait(rand(1800, 2600))
			})
		}
	}

	private onOver = (e: PointerEvent) => {
		if (e.pointerType !== 'mouse' || this.locked || !this.perch) return
		if ((e.target as Element | null)?.closest?.(this.perchSelector) !== this.perch) return
		const now = performance.now()
		if (now - this.lastSpook < 1200) return
		this.lastSpook = now
		this.interrupt(() => this.spook())
	}

	private onResize = () => {
		if (!this.perch) return
		this.interrupt(async () => {
			this.settle()
			this.pose('sit')
			await this.wait(400)
		})
	}

	private onScroll = () => {
		clearTimeout(this.scrollTimer)
		this.scrollTimer = window.setTimeout(this.checkPerch, 160)
		const now = performance.now()
		if (now - this.lastScrollCheck > 450) {
			this.lastScrollCheck = now
			this.checkPerch()
		}
	}

	private checkPerch = () => {
		if (this.perch && !inView(this.perch)) this.interrupt(() => this.follow(this.perches()))
	}

	private head() {
		const r = this.el.getBoundingClientRect()
		return { x: r.left + r.width * (this.el.dataset.facing === 'left' ? 0.25 : 0.75), y: r.top + 4 }
	}

	private zzz() {
		const { x, y } = this.head()
		const p = particle(x, y, 'font:600 0.7rem/1 Inter,system-ui,sans-serif;color:var(--fg-muted);', 'z')
		const drift = this.el.dataset.facing === 'left' ? -14 : 14
		p.animate(
			[
				{ transform: 'translate(-50%,-50%) scale(0.6)', opacity: 0 },
				{ transform: `translate(-50%,-50%) translate(${drift / 2}px,-10px) scale(1)`, opacity: 1, offset: 0.3 },
				{ transform: `translate(-50%,-50%) translate(${drift}px,-28px) scale(1.2)`, opacity: 0 },
			],
			{ duration: 1600, easing: 'ease-out' }
		).finished.finally(() => p.remove())
	}

	private hearts() {
		const { x, y } = this.head()
		for (let i = 0; i < 3; i++) {
			const p = particle(x, y, 'font:0.8rem/1 system-ui,sans-serif;color:#ec4899;', '♥')
			const dx = (i - 1) * 12 + rand(-4, 4)
			p.animate(
				[
					{ transform: 'translate(-50%,-50%) scale(0.4)', opacity: 0, easing: OUT },
					{ transform: `translate(-50%,-50%) translate(${dx / 2}px,-12px) scale(1.1)`, opacity: 1, offset: 0.3 },
					{ transform: `translate(-50%,-50%) translate(${dx}px,-34px) scale(0.9)`, opacity: 0 },
				],
				{ duration: 900 + i * 120, delay: i * 70, fill: 'backwards' }
			).finished.finally(() => p.remove())
		}
	}

	private spit() {
		const r = this.el.getBoundingClientRect()
		const dir = this.el.dataset.facing === 'left' ? -1 : 1
		const x = r.left + r.width * (dir > 0 ? 0.88 : 0.12)
		const y = r.top + r.height * 0.5
		const floor = r.bottom - y - 2
		const p = particle(x, y, 'width:5px;height:4px;border-radius:50%;background:#8a4a1c;')
		const end = `translate(-50%,-50%) translate(${dir * 16}px,${floor}px)`
		p.animate(
			[
				{ transform: 'translate(-50%,-50%) scale(0.3)', easing: OUT },
				{ transform: `translate(-50%,-50%) translate(${dir * 10}px,-4px) scale(1)`, offset: 0.15, easing: 'ease-in' },
				{ transform: end, offset: 0.3 },
				{ transform: end, opacity: 1, offset: 0.85 },
				{ transform: end, opacity: 0 },
			],
			{ duration: 2800 }
		).finished.finally(() => p.remove())
	}

	private crumbs(docX: number, docY: number) {
		for (let i = 0; i < 3; i++) {
			const p = particle(
				docX - scrollX,
				docY - scrollY,
				'width:3px;height:3px;border-radius:1px;background:var(--fg-muted);'
			)
			const dx = rand(-14, 14)
			p.animate(
				[
					{ transform: 'translate(-50%,-50%)', opacity: 1, easing: 'ease-out' },
					{ transform: `translate(-50%,-50%) translate(${dx / 2}px,-8px)`, opacity: 1, offset: 0.25, easing: 'ease-in' },
					{ transform: `translate(-50%,-50%) translate(${dx}px,${rand(18, 30)}px) rotate(${rand(-180, 180)}deg)`, opacity: 0 },
				],
				{ duration: rand(500, 750) }
			).finished.finally(() => p.remove())
		}
	}

	private wait(ms: number) {
		const { signal } = this.ac
		return new Promise<void>((resolve, reject) => {
			if (signal.aborted) return reject(new Aborted())
			const t = setTimeout(resolve, ms)
			signal.addEventListener(
				'abort',
				() => {
					clearTimeout(t)
					reject(new Aborted())
				},
				{ once: true }
			)
		})
	}

	private async play(anim: Animation, commit = false) {
		const { signal } = this.ac
		const onAbort = () => {
			if (commit) anim.commitStyles()
			anim.cancel()
		}
		if (signal.aborted) onAbort()
		signal.addEventListener('abort', onAbort, { once: true })
		try {
			await anim.finished
		} catch {
			throw new Aborted()
		} finally {
			signal.removeEventListener('abort', onAbort)
		}
	}

	private later(fn: () => void, ms: number) {
		const t = window.setTimeout(() => {
			this.timers.delete(t)
			fn()
		}, ms)
		this.timers.add(t)
	}
}

export function startCat(perches: string, edible: string, opts: CatOptions = {}): () => void {
	if (calm() || !document.querySelector(perches)) return () => {}
	const cat = new Cat(perches, edible, opts)
	void cat.run()
	return () => cat.stop()
}
