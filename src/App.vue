<script setup>
import {
	Github,
	Mail,
	Instagram,
	MessageCircle,
	ExternalLink
} from 'lucide-vue-next';

const projects = [
	{
		title: 'PFControl v2',
		description:
			'Fast and reliable flight-strip platform for coordination between air traffic controllers',
		url: 'https://github.com/PFConnect/pfcontrol-2',
		github: 'https://github.com/PFConnect/pfcontrol-2'
	},
	{
		title: 'Cephie',
		description: 'A platform of tools and services for Discord',
		url: 'https://snap.cephie.app',
		github: 'https://github.com/dev-banane'
	},
	{
		title: 'Portfolio',
		description: 'This minimalist portfolio website',
		url: '#',
		github: 'https://github.com/dev-banane/dev-banane'
	}
];

const skills = [
	{ name: 'Java', icon: '/assets/java.svg' },
	{ name: 'Python', icon: '/assets/python.svg' },
	{ name: 'Vue.js', icon: '/assets/vue.svg' },
	{ name: 'React', icon: '/assets/react.svg' },
	{ name: 'TypeScript', icon: '/assets/typescript.svg' },
	{ name: 'Node.js', icon: '/assets/nodejs.svg' },
	{ name: 'Discord.js', icon: '/assets/discordjs.svg' },
	{ name: 'HTML', icon: '/assets/html.svg' },
	{ name: 'CSS', icon: '/assets/css.svg' },
	{ name: 'Tailwind', icon: '/assets/tailwind.svg' },
	{ name: 'Git', icon: '/assets/git.svg' },
	{ name: 'Redis', icon: '/assets/redis.svg' },
	{ name: 'PostgreSQL', icon: '/assets/postgresql.svg' }
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
	<div class="min-h-screen bg-black text-white font-sans relative">
		<div
			class="fixed inset-0 z-0 pointer-events-none opacity-10 bg-center bg-no-repeat"
			style="background-image: url('/pfp-clear.png'); background-size: 60%"
		></div>
		<div class="container mx-auto px-4 py-20 max-w-4xl relative z-10">
			<header class="mb-16 text-left flex items-center gap-4">
				<img
					src="/pfp.webp"
					alt="Profile Picture"
					class="w-20 h-20 mt-1 rounded-full border border-white/12"
				/>
				<div>
					<h1 class="text-4xl font-bold mb-1">devbanane</h1>
					<p class="text-xl text-gray-400">Developer</p>
				</div>
			</header>

			<section class="mb-16">
				<p class="text-lg text-gray-300 leading-relaxed mb-1">
					Learning Java and GoLang as well as building web
					applications and various tools in my spare time.
				</p>
				<p class="text-lg text-gray-300 leading-relaxed">
					Currently working on
					<a
						href="https://snap.cephie.app"
						target="_blank"
						rel="noopener noreferrer"
						class="text-white underline decoration-gray-600 hover:decoration-gray-400"
					>
						Cephie </a
					>, a platform of tools and services for sharing Images.
				</p>
			</section>

			<section class="mb-16">
				<h2
					class="text-2xl font-bold mb-6 pb-2 border-b border-white/12"
				>
					Skills
				</h2>
				<div class="flex flex-wrap gap-4 max-w-4xl">
					<div
						v-for="skill in skills"
						:key="skill.name"
						class="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/12 rounded-full hover:bg-white/10 transition-colors"
					>
						<img
							v-if="skill.icon"
							:src="skill.icon"
							:alt="skill.name"
							class="w-5 h-5"
						/>
						<span class="text-sm">{{ skill.name }}</span>
					</div>
				</div>
			</section>

			<section class="mb-16">
				<h2
					class="text-2xl font-bold mb-6 pb-2 border-b border-white/12"
				>
					Projects
				</h2>
				<div class="space-y-8">
					<div
						v-for="project in projects"
						:key="project.title"
						class="group"
					>
						<div class="flex justify-between items-end mb-2">
							<h3 class="text-xl font-medium">
								{{ project.title }}
							</h3>
							<div class="flex gap-3">
								<a
									v-if="project.github"
									:href="project.github"
									target="_blank"
									rel="noopener noreferrer"
									class="text-gray-400 hover:text-white transition-colors"
								>
									<Github class="w-5 h-5" />
								</a>
								<a
									:href="project.url"
									target="_blank"
									rel="noopener noreferrer"
									class="text-gray-400 hover:text-white transition-colors"
								>
									<ExternalLink class="w-5 h-5" />
								</a>
							</div>
						</div>
						<p class="text-gray-400">{{ project.description }}</p>
					</div>
				</div>
			</section>

			<section class="mb-16">
				<h2
					class="text-2xl font-bold mb-6 pb-2 border-b border-white/12"
				>
					Contact
				</h2>
				<p class="text-gray-300 mb-6">
					Have an idea or want to collaborate? Feel free to reach out.
				</p>
				<div class="flex flex-wrap gap-4">
					<a
						v-for="link in socialLinks"
						:key="link.name"
						:href="link.url"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/12 rounded-full text-sm hover:bg-white/10 transition-colors"
					>
						<component :is="link.icon" class="w-4 h-4" />
						{{ link.name }}
					</a>
				</div>
			</section>

			<footer
				class="text-left text-gray-500 text-sm pt-8 border-t border-white/12"
			>
				<p>©{{ new Date().getFullYear() }} devbanane</p>
			</footer>
		</div>
	</div>
</template>

<style>
body {
	background-color: black;
	color: white;
	font-family:
		-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
		sans-serif;
}

a {
	color: inherit;
	text-decoration: none;
}
</style>
