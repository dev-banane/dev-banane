<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AppButton from './components/AppButton.vue';
import {
	Github,
	Mail,
	Instagram,
	ExternalLink,
	BookOpen
} from 'lucide-vue-next';

const projects = [
	{
		title: 'Cephie API',
		subtitle: 'API',
		description: 'This REST API powers flight tracking, shift scheduling, guild and membership management, image hosting, and the distribution of flight assets for all Cephie products.',
		url: 'https://api.cephie.app',
		github: 'https://github.com/cephie-studios/api',
		docsUrl: 'https://api.cephie.app/docs',
		accent: '#6366f1',
		accentLight: '#eef2ff',
		imgUrl: 'https://api.cephie.app/img/bananensammler_/portfolio_1',
	},
	{
		title: 'Cephie Snap',
		subtitle: 'Image hosting',
		description: 'Rapid image sharing made simple. Upload a picture and get an instant, permanent URL. Used by Cephie products and developers.',
		url: 'https://snap.cephie.app',
		github: 'https://github.com/cephie-studios',
		docsUrl: null,
		accent: '#f59e0b',
		accentLight: '#fffbeb',
		imgUrl: 'https://api.cephie.app/img/bananensammler_/portfolio_2',
	},
	{
		title: 'Cephie Dashboard',
		subtitle: 'Discord bot & management',
		description: 'Manage your virtual airline with ease using our comprehensive dashboard. Track flights, manage your staff and send welcome messages, all in one place.',
		url: 'https://dash.cephie.app',
		github: 'https://github.com/cephie-studios/app',
		docsUrl: null,
		accent: '#10b981',
		accentLight: '#ecfdf5',
		imgUrl: 'https://api.cephie.app/img/bananensammler_/portfolio_3',
	},
	{
		title: 'PFControl v2',
		subtitle: 'ATC strip management',
		description: 'The next-generation flight strip platform built for real-time coordination between air traffic controllers with enterprise-level reliability.',
		url: 'https://pfcontrol.com',
		github: 'https://github.com/cephie-studios/pfcontrol-2',
		docsUrl: null,
		accent: '#3b82f6',
		accentLight: '#eff6ff',
		imgUrl: 'https://api.cephie.app/img/bananensammler_/portfolio_4',
	},
];

const track = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const activeIndex = ref(0);
const velocity = ref(0);
const lastX = ref(0);
const rafId = ref<number | null>(null);

function onMouseDown(e: MouseEvent) {
	if (!track.value) return;
	isDragging.value = true;
	startX.value = e.pageX - track.value.offsetLeft;
	scrollLeft.value = track.value.scrollLeft;
	lastX.value = e.pageX;
	velocity.value = 0;
	if (rafId.value) cancelAnimationFrame(rafId.value);
}

function onMouseMove(e: MouseEvent) {
	if (!isDragging.value || !track.value) return;
	e.preventDefault();
	const x = e.pageX - track.value.offsetLeft;
	const walk = (x - startX.value) * 1.2;
	velocity.value = e.pageX - lastX.value;
	lastX.value = e.pageX;
	track.value.scrollLeft = scrollLeft.value - walk;
	updateActiveIndex();
}

function onMouseUp() {
	isDragging.value = false;
	applyMomentum();
}

function applyMomentum() {
	if (!track.value) return;
	let v = velocity.value * 0.8;
	function step() {
		if (!track.value) return;
		if (Math.abs(v) < 0.5) return;
		track.value.scrollLeft -= v;
		v *= 0.92;
		updateActiveIndex();
		rafId.value = requestAnimationFrame(step);
	}
	rafId.value = requestAnimationFrame(step);
}

const TRACK_FIRST_CARD_OFFSET = 1;

function updateActiveIndex() {
	if (!track.value) return;
	const scrollLeft = track.value.scrollLeft;
	let idx = 0;
	for (let j = 0; j < projects.length; j++) {
		const card = track.value.children[j + TRACK_FIRST_CARD_OFFSET] as HTMLElement;
		if (card && scrollLeft >= card.offsetLeft - 50) idx = j;
	}
	activeIndex.value = idx;
}

function scrollToIndex(i: number) {
	if (!track.value) return;
	const card = track.value.children[i + TRACK_FIRST_CARD_OFFSET] as HTMLElement;
	if (card) {
		track.value.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
		activeIndex.value = i;
	}
}

onMounted(() => {
	window.addEventListener('mouseup', onMouseUp);
	window.addEventListener('mousemove', onMouseMove);
});

onUnmounted(() => {
	window.removeEventListener('mouseup', onMouseUp);
	window.removeEventListener('mousemove', onMouseMove);
});


const skills = [
	{ name: 'Java', icon: '/assets/java.svg' },
	{ name: 'Python', icon: '/assets/python.svg' },
	{ name: 'React', icon: '/assets/react.svg' },
	{ name: 'Vue.js', icon: '/assets/vue.svg' },
	{ name: 'Next.js', icon: '/assets/nextjs.svg' },
	{ name: 'Expo', icon: '/assets/expo.svg' },
	{ name: 'Vite', icon: '/assets/vite.svg' },
	{ name: 'Node.js', icon: '/assets/nodejs.svg' },
	{ name: 'Fastify', icon: '/assets/fastify.svg' },
	{ name: 'TypeScript', icon: '/assets/typescript.svg' },
	{ name: 'JavaScript', icon: '/assets/javascript.svg' },
	{ name: 'HTML', icon: '/assets/html.svg' },
	{ name: 'CSS', icon: '/assets/css.svg' },
	{ name: 'Tailwind', icon: '/assets/tailwind.svg' },
	{ name: 'Git', icon: '/assets/git.svg' },
	{ name: 'Redis', icon: '/assets/redis.svg' },
	{ name: 'PostgreSQL', icon: '/assets/postgresql.svg' },
	{ name: 'MySQL', icon: '/assets/mysql.svg' },
	{ name: 'SQLite', icon: '/assets/sqlite.svg' },
	{ name: 'MongoDB', icon: '/assets/mongodb.svg' },
	{ name: 'Supabase', icon: '/assets/supabase.svg' },
	{ name: 'Docker', icon: '/assets/docker.svg' },
	{ name: 'Dokploy', icon: '/assets/dokploy.svg' },
	{ name: 'Nginx', icon: '/assets/nginx.svg' },
	{ name: 'Linux', icon: '/assets/linux.svg' },
	{ name: 'REST', icon: '/assets/http.svg' },
	{ name: 'Cloudflare', icon: '/assets/cloudflare.svg' },
	{ name: 'OpenWebUI', icon: '/assets/openwebui.svg' },
	{ name: 'n8n', icon: '/assets/n8n.svg' }
];

const socialLinks = [
	{ name: 'GitHub', url: 'https://github.com/dev-banane', icon: Github },
	{
		name: 'Instagram',
		url: 'https://instagram.com/_jakob09',
		icon: Instagram
	}
];
</script>

<template>
	<div class="min-h-screen bg-white text-[#0a0a0a] font-sans antialiased">
		<main>
			<section
				class="relative overflow-hidden border-b border-black/10 bg-[#f8f8f8]"
			>
				<div class="mx-auto max-w-6xl px-6 py-28 sm:py-36 lg:py-44">
					<h1
						class="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
					>
						Hi, I'm Jakob.<br />
						<span class="text-black/70"><span class="italic">Full-stack</span> developer.</span>
					</h1>
					<p
						class="mt-8 max-w-xl text-lg leading-relaxed text-black/60 sm:text-xl"
					>
						I build web applications, APIs, and tooling.
						<br />
						I work at
						<a
							href="https://www.giftgruen.com/"
							target="_blank"
							rel="noopener noreferrer"
							class="underline underline-offset-2 decoration-black/30 hover:decoration-black"
							>giftGRÜN</a
						>
						and independently on
						<a
							href="https://snap.cephie.app"
							target="_blank"
							rel="noopener noreferrer"
							class="underline underline-offset-2 decoration-black/30 hover:decoration-black"
							>Cephie</a
						>.
					</p>
					<div class="mt-10 flex flex-wrap items-center gap-4">
						<AppButton href="#contact" variant="default">
							Get in touch
						</AppButton>
						<div class="flex gap-2">
							<AppButton
								v-for="link in socialLinks"
								:key="link.name"
								:href="link.url"
								variant="icon"
								target="_blank"
								rel="noopener noreferrer"
								:aria-label="link.name"
							>
								<component :is="link.icon" class="h-5 w-5" />
							</AppButton>
						</div>
					</div>
				</div>
			</section>

			<section class="border-b border-black/10 bg-black py-5 text-white" aria-label="Technologies">
				<div class="overflow-hidden">
					<div class="flex w-max animate-ticker items-center gap-12">
						<template v-for="(_, i) in 2" :key="i">
							<div
								v-for="skill in skills"
								:key="`${i}-${skill.name}`"
								class="flex shrink-0 items-center gap-3"
							>
								<img
									v-if="skill.icon"
									:src="skill.icon"
									:alt="skill.name"
									class="h-8 w-8 opacity-90"
									loading="lazy"
								/>
								<span class="whitespace-nowrap text-sm font-semibold tracking-wide text-white/90">{{ skill.name }}</span>
							</div>
						</template>
					</div>
				</div>
			</section>

			<section id="work" class="bg-white py-20 pt-36">
				<div class="mx-auto max-w-5xl px-6 flex flex-wrap justify-between gap-6 items-end py-12">
					<div>
						<h2 class="font-display text-5xl sm:text-6xl font-bold">
							Things I've <em class="italic font-bold">built.</em>
						</h2>
						<p class="mt-4 max-w-xl text-lg text-black/60">
							A selection of products and projects I've built in recent years.
						</p>
					</div>
					<div class="flex items-center gap-2">
						<button
							v-for="(p, i) in projects"
							:key="i"
							class="h-2 w-2 rounded-full bg-black/15 transition hover:bg-black/30 border-0 p-0"
							:class="activeIndex === i ? 'w-6 rounded-md bg-black/60' : ''"
							:style="activeIndex === i ? { background: p.accent } : {}"
							@click="scrollToIndex(i)"
							:aria-label="`Go to ${p.title}`"
						/>
					</div>
				</div>
				<div class="w-full overflow-x-hidden">
					<div
						ref="track"
						class="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory hide-horizontal-scrollbar select-none ml-16 mr-16"
						:class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
						@mousedown="onMouseDown"
					>
						<div class="min-w-10 shrink-0" aria-hidden="true" />
						<article
						v-for="(project, i) in projects"
						:key="project.title"
						class="flex flex-col min-w-[85vw] sm:min-w-[420px] max-w-[720px] bg-white rounded-2xl border border-black/10 shadow hover:shadow-lg transition hover:-translate-y-1 shrink-0 overflow-hidden snap-start"
					>
						<div v-if="project.imgUrl" class="h-64 bg-neutral-100 overflow-hidden">
							<img :src="project.imgUrl" :alt="project.title" class="h-full w-full object-cover" loading="lazy" />
						</div>
						<div class="flex flex-col px-6 py-6">
							<h3 class="font-display text-2xl sm:text-3xl font-bold italic mb-1 text-black">
								{{ project.title }}
							</h3>
							<p class="text-xs font-semibold uppercase tracking-wide text-black/40 mb-2">
								{{ project.subtitle }}
							</p>
							<p class="text-sm text-black/70 mb-3">
								{{ project.description }}
							</p>
							<div class="flex items-center gap-2">
								<AppButton
									v-if="project.docsUrl"
									:href="project.docsUrl"
									target="_blank"
									rel="noopener"
								>
									<BookOpen :size="15" /> Docs
								</AppButton>
								<AppButton
									:href="project.url"
									target="_blank"
									rel="noopener"
								>
									<ExternalLink :size="15" /> Visit
								</AppButton>
								<AppButton
									v-if="project.github"
									:href="project.github"
									target="_blank"
									rel="noopener"
								>
									<Github :size="15" /> GitHub
								</AppButton>
							</div>
						</div>
					</article>
						<div class="min-w-8 shrink-0" aria-hidden="true" />
					</div>
				</div>
			</section>

			<section class="bg-white">
				<div class="mx-auto max-w-6xl px-6 py-24 sm:py-32">
					<h2
						class="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
					>
						Skills & technologies.
					</h2>
					<p class="mt-4 max-w-2xl text-lg text-black/60">
						These are the technologies and tools I rely on day-to-day to design, develop, and deploy high-quality products and web applications.
					</p>
					<div class="mt-14 flex flex-wrap gap-3">
						<div
							v-for="skill in skills"
							:key="skill.name"
							class="flex items-center gap-2.5 rounded-full bg-black text-white px-4 py-2.5"
						>
							<img
								v-if="skill.icon"
								:src="skill.icon"
								:alt="skill.name"
								class="h-5 w-5 shrink-0"
								loading="lazy"
							/>
							<span class="text-sm font-semibold text-white/85">{{
								skill.name
							}}</span>
						</div>
					</div>
				</div>
			</section>

			<section id="contact" class="bg-black text-white">
				<div class="mx-auto max-w-6xl px-6 py-24 sm:py-32">
					<h2
						class="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
					>
						Let's work together.
					</h2>
					<p
						class="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
					>
						Open to collaboration and new projects. Have an idea or
						want to build something? Reach out.
					</p>
					<p class="mt-4 text-white/90">
						Reach me at
						<a
							href="mailto:me@devbanane.com"
							class="underline underline-offset-2 decoration-white/50 hover:decoration-white"
							>me@devbanane.com</a
						>
					</p>
					<div class="mt-10 flex flex-wrap gap-4">
						<AppButton
							v-for="link in socialLinks"
							:key="link.name"
							:href="link.url"
							target="_blank"
							rel="noopener noreferrer"
							lightMode
						>
							<component :is="link.icon" class="h-4 w-4" />
							{{ link.name }}
						</AppButton>
					</div>
				</div>
			</section>
		</main>

		<footer class="bg-black py-8">
			<div
				class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-white/50 sm:flex-row"
			>
				<p>© {{ new Date().getFullYear() }} devbanane</p>
			</div>
		</footer>
	</div>
</template>

<style>
@keyframes ticker {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
}
.animate-ticker {
	animation: ticker 60s linear infinite;
}

/* Hide horizontal scrollbar on projects track; scroll with wheel up/down */
.hide-horizontal-scrollbar {
	scrollbar-width: none;
	-ms-overflow-style: none;
}
.hide-horizontal-scrollbar::-webkit-scrollbar {
	height: 0;
	display: none;
}
</style>
