<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppButton from './components/AppButton.vue';
import {
	Github,
	Mail,
	Instagram,
	ExternalLink,
	BookOpen,
	Server,
	Image,
	LayoutDashboard,
	Plane
} from 'lucide-vue-next';

const projects = [
	{
		title: 'Cephie API',
		description:
			'Single API for Cephie products: flight tracking, shifts, guilds, images, and flight assets. OpenAPI docs and optional Discord auth for transcripts.',
		url: 'https://api.cephie.app',
		github: 'https://github.com/cephie-studios/api',
		icon: Server,
		docsUrl: 'https://api.cephie.app/docs',
		features: [
			'Flight tracking',
			'Shifts',
			'Guilds',
			'Images',
			'Flight assets',
			'Transcripts (Discord auth)'
		]
	},
	{
		title: 'Cephie Snap',
		description:
			'Image hosting with permanent URLs and a public API for developer integrations. Built for reliability and simple embedding in apps and docs.',
		url: 'https://snap.cephie.app',
		github: 'https://github.com/cephie-studios',
		icon: Image
	},
	{
		title: 'Cephie Dashboard',
		description:
			'Discord bot and management platform for virtual airlines and aviation communities. Role sync, verification, and moderation trusted by dozens of major groups.',
		url: 'https://dash.cephie.app',
		github: 'https://github.com/cephie-studios/app',
		icon: LayoutDashboard
	},
	{
		title: 'PFControl v2',
		description:
			'Flight-strip management for Project Flight and Roblox aviation sims. Real-time coordination between ATC and pilots with a modern, fast UI.',
		url: 'https://pfcontrol.com',
		github: 'https://github.com/cephie-studios/pfcontrol-2',
		icon: Plane
	}
];

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
	},
	{ name: 'Email', url: 'mailto:me@devbanane.com', icon: Mail }
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
							href="https://cephie.app"
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

			<section id="work" class="border-b border-black/10 bg-[#fafafa]">
				<div class="mx-auto max-w-6xl px-6 py-24 sm:py-32">
					<h2 class="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Notable work
					</h2>
					<p class="mt-3 max-w-xl text-lg text-black/55">
						Selected projects and products I've built or contribute to.
					</p>

					<div class="mt-14 grid gap-6 sm:grid-cols-2">
						<article
							v-for="project in projects"
							:key="project.title"
							class="group flex flex-col rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition-all duration-300 hover:border-black/15 hover:shadow-md sm:p-8"
						>
							<div class="flex items-start justify-between gap-4">
								<div class="flex min-w-0 items-start gap-4">
									<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-white">
										<component :is="project.icon" class="h-6 w-6" />
									</div>
									<div class="min-w-0">
										<h3 class="font-display text-xl font-bold tracking-tight text-black">
											{{ project.title }}
										</h3>
										<p class="mt-0.5 truncate text-sm text-black/50">
											{{ project.url.replace(/^https?:\/\//, '') }}
										</p>
									</div>
								</div>
							</div>
							<p class="mt-4 flex-1 text-[15px] leading-relaxed text-black/70 line-clamp-3">
								{{ project.description }}
							</p>
							<div
								v-if="'features' in project && project.features?.length"
								class="mt-4 flex flex-wrap gap-1.5"
							>
								<span
									v-for="f in project.features"
									:key="f"
									class="rounded-md bg-black/[0.06] px-2.5 py-1 text-xs font-medium text-black/75"
								>
									{{ f }}
								</span>
							</div>
							<div class="mt-6 flex flex-wrap items-center gap-2">
								<template v-if="'docsUrl' in project && project.docsUrl">
									<AppButton
										:href="project.docsUrl"
										variant="outline"
										target="_blank"
										rel="noopener noreferrer"
									>
										<BookOpen class="h-4 w-4" />
										Docs
									</AppButton>
									<AppButton
										:href="project.url"
										variant="icon"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Visit site"
									>
										<ExternalLink class="h-4 w-4" />
									</AppButton>
								</template>
								<template v-else>
									<AppButton
										v-if="project.github"
										:href="project.github"
										variant="icon"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="GitHub"
									>
										<Github class="h-4 w-4" />
									</AppButton>
									<AppButton
										:href="project.url"
										variant="icon"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Visit site"
									>
										<ExternalLink class="h-4 w-4" />
									</AppButton>
								</template>
							</div>
						</article>
					</div>
				</div>
			</section>

			<section class="border-b border-black/10 bg-[#f2f2f2]">
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
							variant="inverted"
							target="_blank"
							rel="noopener noreferrer"
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
				<div class="flex gap-8">
					<AppButton
						href="https://github.com/dev-banane"
						variant="link"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</AppButton>
					<AppButton href="mailto:me@devbanane.com" variant="link">
						Email
					</AppButton>
				</div>
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
</style>
