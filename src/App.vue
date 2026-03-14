<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AppButton from './components/AppButton.vue';
import {
	Github,
	Instagram,
	ExternalLink,
	BookOpen,
	ChevronLeft,
	ChevronRight
} from 'lucide-vue-next';

const skills = [
	{ name: 'Java', icon: '/assets/java.svg', description: 'Object-oriented language for backend and Android.' },
	{ name: 'Python', icon: '/assets/python.svg', description: 'Versatile language for scripting, APIs, and data.' },
	{ name: 'React', icon: '/assets/react.svg', description: 'UI library for component-based interfaces.' },
	{ name: 'Vue.js', icon: '/assets/vue.svg', description: 'Progressive framework for reactive UIs.' },
	{ name: 'Next.js', icon: '/assets/nextjs.svg', description: 'React framework with SSR and routing.', invertIcon: true },
	{ name: 'Expo', icon: '/assets/expo.svg', description: 'Toolchain for building React Native apps.' },
	{ name: 'Vite', icon: '/assets/vite.svg', description: 'Fast dev server and build tool for the frontend.' },
	{ name: 'Node.js', icon: '/assets/nodejs.svg', description: 'JavaScript runtime for servers and tooling.' },
	{ name: 'bun.js', icon: '/assets/bunjs.svg', description: 'Fast, low-overhead JavaScript runtime.' },
	{ name: 'Fastify', icon: '/assets/fastify.svg', description: 'Fast, low-overhead Node.js web framework.', invertIcon: true },
	{ name: 'npm.js', icon: '/assets/npmjs.svg', description: 'Package manager and registry for JavaScript.' },
	{ name: 'TypeScript', icon: '/assets/typescript.svg', description: 'Typed superset of JavaScript.' },
	{ name: 'JavaScript', icon: '/assets/javascript.svg', description: 'Language of the web for logic and interactivity.' },
	{ name: 'HTML', icon: '/assets/html.svg', description: 'Markup for structure and content.' },
	{ name: 'CSS', icon: '/assets/css.svg', description: 'Styling and layout for the web.' },
	{ name: 'Tailwind', icon: '/assets/tailwind.svg', description: 'Utility-first CSS framework.' },
	{ name: 'Git', icon: '/assets/git.svg', description: 'Version control for code and collaboration.' },
	{ name: 'Redis', icon: '/assets/redis.svg', description: 'In-memory store for cache and sessions.' },
	{ name: 'PostgreSQL', icon: '/assets/postgresql.svg', description: 'Robust relational database with SQL.' },
	{ name: 'MySQL', icon: '/assets/mysql.svg', description: 'Popular relational database server.' },
	{ name: 'SQLite', icon: '/assets/sqlite.svg', description: 'Embedded, file-based SQL database.' },
	{ name: 'MongoDB', icon: '/assets/mongodb.svg', description: 'Document-oriented NoSQL database.' },
	{ name: 'Supabase', icon: '/assets/supabase.svg', description: 'Open-source Firebase alternative (Postgres + auth).' },
	{ name: 'Docker', icon: '/assets/docker.svg', description: 'Containers for consistent dev and deploy.' },
	{ name: 'Dokploy', icon: '/assets/dokploy.svg', description: 'Self-hosted PaaS for deploying apps.', invertIcon: true },
	{ name: 'Nginx', icon: '/assets/nginx.svg', description: 'Web server and reverse proxy.' },
	{ name: 'Linux', icon: '/assets/linux.svg', description: 'OS and environment for servers and dev.' },
	{ name: 'REST', icon: '/assets/http.svg', description: 'API design style over HTTP.' },
	{ name: 'Cloudflare', icon: '/assets/cloudflare.svg', description: 'CDN, DNS, and edge security.' },
	{ name: 'OpenWebUI', icon: '/assets/openwebui.svg', description: 'Open-source UI for LLM APIs.' },
	{ name: 'n8n', icon: '/assets/n8n.svg', description: 'Workflow automation and integrations.' }
];

const redisSkillIndex = skills.findIndex((s) => s.name === 'Redis');

const projects = [
	{
		title: 'PFControl v2',
		subtitle: 'Leading ATC strip platform',
		description:
			'The go-to flight-strip and ATC management platform for Project Flight and Roblox aviation. Real-time coordination between controllers and pilots, modern UI, and the scale to support growing communities. Built and run by me and some friends from the ground up.',
		stats: '8,000+ registered users',
		url: 'https://pfcontrol.com',
		github: 'https://github.com/cephie-studios/pfcontrol-2',
		docsUrl: null,
		accent: '#3b82f6',
		accentLight: '#eff6ff',
		imgUrl: 'https://api.cephie.app/img/bananensammler_/portfolio_4'
	},
	{
		title: 'Cephie API',
		subtitle: 'Unified developer platform',
		description:
			'Single, production-ready API powering Cephie products: flight tracking, shifts, guilds, images, and flight assets. Full OpenAPI docs and optional Discord auth for transcripts. The backbone for aviation and community tools.',
		stats: null,
		url: 'https://api.cephie.app',
		github: 'https://github.com/cephie-studios/api',
		docsUrl: 'https://api.cephie.app/docs',
		accent: '#6366f1',
		accentLight: '#eef2ff',
		imgUrl: 'https://api.cephie.app/img/bananensammler_/portfolio_1'
	},
	{
		title: 'Cephie Snap',
		subtitle: 'Image hosting',
		description:
			'Reliable image hosting with permanent URLs and a public API for integrations. Built for anyone who needs stable embeds in apps, and docs. No disappearing links, full control.',
		stats: null,
		url: 'https://snap.cephie.app',
		github: 'https://github.com/cephie-studios',
		docsUrl: null,
		accent: '#f59e0b',
		accentLight: '#fffbeb',
		imgUrl: 'https://api.cephie.app/img/bananensammler_/portfolio_2'
	},
	{
		title: 'Cephie Dashboard',
		subtitle: 'Discord bot & management',
		description:
			'Discord bot and management platform for virtual airlines and aviation communities. Manages the PFConnect Bot; handles role sync, verification, and moderation. Trusted by dozens of major groups to run their servers.',
		stats: null,
		url: 'https://dash.cephie.app',
		github: 'https://github.com/cephie-studios/app',
		docsUrl: null,
		accent: '#10b981',
		accentLight: '#ecfdf5',
		imgUrl: 'https://api.cephie.app/img/bananensammler_/portfolio_3'
	}
];

const activeIndex = ref(0);

function prev() {
	activeIndex.value = (activeIndex.value - 1 + projects.length) % projects.length;
}

function next() {
	activeIndex.value = (activeIndex.value + 1) % projects.length;
}

const touchStartX = ref(0);

function onTouchStart(e: TouchEvent) {
	touchStartX.value = e.touches[0]?.clientX ?? 0;
}

function onTouchEnd(e: TouchEvent) {
	const delta = touchStartX.value - (e.changedTouches[0]?.clientX ?? touchStartX.value);
	if (Math.abs(delta) > 40) {
		delta > 0 ? next() : prev();
	}
}

function onKeydown(e: KeyboardEvent) {
	if (e.key === 'ArrowLeft') prev();
	if (e.key === 'ArrowRight') next();
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));


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
						<span class="text-black/70"
							><span class="italic">Full-stack</span>
							developer.</span
						>
					</h1>
					<p
						class="mt-8 max-w-6xl text-lg leading-relaxed text-black/60 sm:text-xl"
					>
						I build and ship web applications, APIs, and platforms that people actually use. From ATC tools with <strong>8,000+ users</strong> to developer APIs and Discord bots for management and moderation.
						<br />
						I work at
						<a
							href="https://www.giftgruen.com/"
							target="_blank"
							rel="noopener noreferrer"
							class="underline underline-offset-2 decoration-black/30 hover:decoration-black"
							>giftGRÜN</a
						>
						and run
						<a
							href="https://snap.cephie.app"
							target="_blank"
							rel="noopener noreferrer"
							class="underline underline-offset-2 decoration-black/30 hover:decoration-black"
							>Cephie</a
						>
						on the side—products I built from scratch and maintain myself.
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

			<section
				class="border-b border-black/10 bg-black py-5 text-white"
				aria-label="Technologies"
			>
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
								<span
									class="whitespace-nowrap text-sm font-semibold tracking-wide text-white/90"
									>{{ skill.name }}</span
								>
							</div>
						</template>
					</div>
				</div>
			</section>

			<section id="work" class="bg-white py-20 pt-36 pb-16">
				<div class="mx-auto max-w-6xl px-6 mb-10">
					<div
						class="flex flex-wrap items-end justify-between gap-6"
					>
						<div>
							<h2
								class="font-display text-5xl sm:text-6xl font-bold"
							>
								Things I've
								<em class="italic font-bold">built.</em>
							</h2>
							<p class="mt-4 max-w-xl text-lg text-black/60">
								Products I've built, shipped, and run—with real users and real impact. From my flagship ATC platform to APIs and tools powering aviation communities.
							</p>
						</div>
						<div
							class="flex items-center gap-5 shrink-0 lg:hidden"
						>
							<span
								class="font-mono text-sm tabular-nums text-black/40"
							>
								{{
									String(activeIndex + 1).padStart(2, '0')
								}}&nbsp;/&nbsp;{{
									String(projects.length).padStart(2, '0')
								}}
							</span>
							<div class="flex gap-2">
								<button
									@click="prev"
									class="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/60 transition-all hover:bg-black hover:text-white hover:border-black"
									aria-label="Previous project"
								>
									<ChevronLeft :size="18" />
								</button>
								<button
									@click="next"
									class="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/60 transition-all hover:bg-black hover:text-white hover:border-black"
									aria-label="Next project"
								>
									<ChevronRight :size="18" />
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="lg:hidden px-6">
					<div
						class="overflow-hidden rounded-2xl border border-black/10"
						@touchstart.passive="onTouchStart"
						@touchend.passive="onTouchEnd"
					>
						<div
							class="flex transition-transform duration-500 ease-in-out"
							:style="`transform: translateX(-${activeIndex * 100}%)`"
						>
							<article
								v-for="(project, i) in projects"
								:key="project.title"
								class="w-full shrink-0 bg-[#f8f8f8]"
							>
								<div
									class="h-56 sm:h-72 overflow-hidden bg-neutral-200"
								>
									<img
										:src="project.imgUrl"
										:alt="project.title"
										class="h-full w-full object-cover"
										loading="lazy"
									/>
								</div>
								<div class="p-6 sm:p-8">
									<p
										class="mb-2 text-xs font-bold uppercase tracking-widest"
										:style="{ color: project.accent }"
									>
										{{ project.subtitle }}
									</p>
									<h3
										class="font-display text-2xl sm:text-3xl font-bold italic mb-3 leading-tight"
									>
										{{ project.title }}
									</h3>
									<p
										v-if="project.stats"
										class="text-sm font-semibold mb-2"
										:style="{ color: project.accent }"
									>
										{{ project.stats }}
									</p>
									<p
										class="text-sm sm:text-base leading-relaxed text-black/60 mb-6"
									>
										{{ project.description }}
									</p>
									<div class="flex flex-wrap gap-3">
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
						</div>
					</div>
					<div class="mt-5 flex items-center justify-center gap-2">
						<button
							v-for="(p, i) in projects"
							:key="i"
							class="h-1.5 rounded-full border-0 p-0 transition-all duration-300"
							:class="
								activeIndex === i
									? ''
									: 'w-1.5 bg-black/20 hover:bg-black/40'
							"
							:style="
								activeIndex === i
									? { background: p.accent, width: '2rem' }
									: {}
							"
							@click="activeIndex = i"
							:aria-label="`Go to ${p.title}`"
						/>
					</div>
				</div>

				<div class="hidden lg:flex h-[600px] gap-3 px-6">
					<div
						v-for="(project, i) in projects"
						:key="project.title"
						class="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-in-out"
						:class="activeIndex === i ? 'flex-[4]' : 'flex-[1] hover:flex-[1.3]'"
						@click="activeIndex = i"
					>
						<img
							:src="project.imgUrl"
							:alt="project.title"
							class="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
							:class="activeIndex === i ? 'scale-100' : 'scale-110'"
							loading="lazy"
						/>

						<div
							class="absolute inset-0 bg-black transition-opacity duration-500"
							:class="
								activeIndex === i ? 'opacity-10' : 'opacity-50'
							"
						/>

						<Transition name="panel-label">
							<div
								v-if="activeIndex !== i"
								class="absolute inset-0 flex flex-col items-center justify-end pb-8 gap-3"
							>
								<p
									class="text-white font-bold text-sm tracking-wider opacity-90"
								>
									{{ project.title }}
								</p>
							</div>
						</Transition>

						<Transition name="content-panel">
							<div
								v-if="activeIndex === i"
								class="absolute top-0 right-0 bottom-0 w-[52%] bg-zinc-100 flex flex-col justify-between p-9 xl:p-11"
							>
								<div>
									<div
										class="mb-6 flex items-center gap-3"
									>
										<span
											class="font-mono text-xs tabular-nums text-black/25"
										>
											{{
												String(i + 1).padStart(2, '0')
											}}
										</span>
										<div class="h-px flex-1 bg-black/10" />
									</div>
									<p
										class="mb-3 text-xs font-bold uppercase tracking-widest"
										:style="{ color: project.accent }"
									>
										{{ project.subtitle }}
									</p>
									<h3
										class="font-display text-3xl xl:text-4xl font-bold italic mb-4 leading-tight text-black"
									>
										{{ project.title }}
									</h3>
									<p
										v-if="project.stats"
										class="text-sm font-semibold mb-3"
										:style="{ color: project.accent }"
									>
										{{ project.stats }}
									</p>
									<p
										class="text-sm xl:text-base leading-relaxed text-black/60"
									>
										{{ project.description }}
									</p>
								</div>
								<div class="flex flex-wrap gap-3">
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
						</Transition>
					</div>
				</div>
			</section>

			<section id="skills" class="bg-white">
				<div class="mx-auto max-w-6xl px-6 py-24 sm:py-32">
					<h2
						class="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
					>
						Skills & technologies.
					</h2>
					<p class="mt-4 max-w-2xl text-lg text-black/60">
						Technologies and tools I use day-to-day.
					</p>

					<div
						class="mt-14 hidden lg:grid skills-bento gap-3"
						role="list"
						aria-label="Skills and technologies"
					>
						<div
							v-for="(skill, i) in skills"
							:key="skill.name"
							role="listitem"
							class="skills-bento-item rounded-2xl border border-black/10 bg-white text-left"
							:class="
								redisSkillIndex === i
									? 'col-span-2 row-span-2 shadow-lg shadow-black/5'
									: ''
							"
						>
							<div
								class="flex h-full flex-col justify-between p-4 sm:p-5"
							>
								<div class="flex items-center gap-3">
									<img
										v-if="skill.icon"
										:src="skill.icon"
										alt=""
										class="h-8 w-8 shrink-0 opacity-90"
										:class="{ 'skill-icon--invert': skill.invertIcon }"
										loading="lazy"
									/>
									<span
										class="font-semibold text-black/90"
										:class="
											redisSkillIndex === i ? 'text-base sm:text-lg' : 'text-sm'
										"
									>
										{{ skill.name }}
									</span>
								</div>
								<p
									v-if="redisSkillIndex === i"
									class="mt-2 text-sm leading-relaxed text-black/60"
								>
									{{ skill.description }}
								</p>
							</div>
						</div>
					</div>

					<div class="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:hidden">
						<div
							v-for="(skill, i) in skills"
							:key="skill.name"
							class="rounded-2xl border border-black/10 bg-white p-4 text-left"
							:class="redisSkillIndex === i ? 'col-span-2' : ''"
						>
							<div class="flex items-center gap-2.5">
								<img
									v-if="skill.icon"
									:src="skill.icon"
									alt=""
									class="h-7 w-7 shrink-0 opacity-90"
									:class="{ 'skill-icon--invert': skill.invertIcon }"
									loading="lazy"
								/>
								<span
									class="text-sm font-semibold text-black/90"
									:class="redisSkillIndex === i ? 'text-base' : ''"
								>
									{{ skill.name }}
								</span>
							</div>
							<p
								v-if="redisSkillIndex === i"
								class="mt-2 text-xs leading-relaxed text-black/60"
							>
								{{ skill.description }}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id="contact" class="bg-white text-white">
				<div class="w-full">
					<div class="bg-black max-w-[95%] mx-auto rounded-4xl">
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
						<footer class="bg-black py-8">
							<div
								class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-white/50 sm:flex-row"
							>
								<p>© {{ new Date().getFullYear() }} devbanane</p>
							</div>
						</footer>
					</div>
				</div>
			</section>
		</main>
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

.panel-label-enter-active,
.panel-label-leave-active {
	transition: opacity 0.25s ease;
}
.panel-label-enter-from,
.panel-label-leave-to {
	opacity: 0;
}

.content-panel-enter-active {
	transition:
		opacity 0.35s ease 0.2s,
		transform 0.4s ease 0.15s;
}
.content-panel-leave-active {
	transition: opacity 0.15s ease;
}
.content-panel-enter-from {
	opacity: 0;
	transform: translateX(18px);
}
.content-panel-leave-to {
	opacity: 0;
}

.skills-bento {
	grid-template-columns: repeat(7, 1fr);
	grid-auto-rows: 100px;
	grid-auto-flow: dense;
}
.skill-icon--invert {
	filter: invert(1);
}
</style>
