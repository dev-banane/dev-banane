import { createApp } from 'vue'
import Lenis from 'lenis'
import './style.css'
import App from './App.vue'

function shouldEnableLenis(): boolean {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	const hasTouchInput =
		'navigator' in window &&
		(navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches)
	const userAgentData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
	const platform = userAgentData?.platform ?? navigator.platform
	const isMac = /mac/i.test(platform)

	return !prefersReducedMotion && !hasTouchInput && !isMac
}

if (shouldEnableLenis()) {
	const lenis = new Lenis({
		duration: 1.05,
		wheelMultiplier: 0.9,
		gestureOrientation: 'vertical',
		smoothWheel: true
	})

	const raf = (time: number) => {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}

	requestAnimationFrame(raf)
}

createApp(App).mount('#app')
