<template>
    <div class="min-h-screen bg-black relative">
        <Background />
        
        <main class="pt-0 max-w-none mx-0 px-0 relative z-10">
            <section id="projects-hero" class="relative min-h-screen flex items-center overflow-hidden">
                <div class="max-w-7xl mx-auto px-8 w-full relative z-10">
                    <div class="text-center space-y-8">
                        <h1 class="text-6xl lg:text-8xl font-black text-white leading-none">
                            My Projects <span class="inline-block transition-all duration-300 hover:scale-110 hover:rotate-12 text-yellow-400 cursor-default mt-4">💻</span>
                        </h1>
                        <p class="text-2xl lg:text-3xl text-zinc-300 font-light max-w-4xl mx-auto" style="font-family: 'Michroma', sans-serif;">
                            A collection of things I've built and worked on
                        </p>
                    </div>
                </div>
            </section>

            <section class="relative pt-16 pb-52 overflow-hidden">
                <div class="max-w-7xl mx-auto px-8 relative z-10">
                    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12">
                        <div class="flex flex-wrap gap-3">
                            <button
                                @click="activeFilter = 'all'"
                                :class="[
                                    'px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer',
                                    activeFilter === 'all'
                                        ? 'bg-white text-zinc-900'
                                        : 'bg-zinc-800/50 border border-zinc-700/50 text-white hover:bg-zinc-700/50'
                                ]"
                            >
                                All Projects
                            </button>
                            <button
                                v-for="type in projectTypes"
                                :key="type"
                                @click="activeFilter = type"
                                :class="[
                                    'px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer',
                                    activeFilter === type
                                        ? 'bg-white text-zinc-900'
                                        : 'bg-zinc-800/50 border border-zinc-700/50 text-white hover:bg-zinc-700/50'
                                ]"
                            >
                                {{ type }}
                            </button>
                        </div>
                        
                        <div class="flex items-center gap-4">
                            <div class="text-zinc-400 text-sm">
                                {{ filteredProjects.length }} {{ filteredProjects.length === 1 ? 'project' : 'projects' }}
                            </div>
                            <a
                                href="https://github.com/dev-banane"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-white text-zinc-900 transition-all duration-300 hover:bg-zinc-100 hover:scale-105"
                            >
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path :d="siGithub.path" />
                                </svg>
                                View GitHub
                            </a>
                        </div>
                    </div>
                    
                    <p class="text-zinc-400 text-lg mb-16" style="font-family: 'Gabarito', sans-serif;">
                        These are only my most recent and important projects. Check back later for more updates!
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div
                            v-for="project in filteredProjects"
                            :key="project.id"
                            class="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8 hover:bg-zinc-700/40 transition-all duration-300 hover:transform hover:scale-[1.02] flex flex-col"
                        >
                            <div class="flex items-center justify-between mb-4">
                                <span
                                    class="text-sm px-3 py-1 rounded-full border font-medium"
                                    :class="getTypeColorClass(project.typeColor)"
                                >
                                    {{ project.type }}
                                </span>
                                <div class="flex gap-3">
                                    <a
                                        v-if="project.github"
                                        :href="project.github"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-zinc-300 hover:text-white transition-colors"
                                    >
                                        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path :d="siGithub.path" />
                                        </svg>
                                    </a>
                                    <a
                                        :href="project.url"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-zinc-300 hover:text-white transition-colors"
                                    >
                                        <ExternalLink class="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <div class="flex-grow">
                                <h3 class="text-2xl font-bold text-white mb-4">
                                    {{ project.title }}
                                </h3>
                                <p class="text-zinc-300 mb-6 leading-relaxed">
                                    {{ project.description }}
                                </p>
                            </div>

                            <div class="space-y-4">
                                <div class="flex flex-wrap gap-2">
                                    <div
                                        v-for="tech in project.technologies"
                                        :key="tech"
                                        class="flex items-center gap-2 text-sm px-3 py-1"
                                    >
                                        <img
                                            :src="getTechIcon(tech)"
                                            :alt="tech"
                                            class="w-6 h-6"
                                        />
                                    </div>
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <div
                                        v-if="project.featured"
                                        class="flex items-center gap-2 text-yellow-400 text-sm"
                                    >
                                        <Star class="w-4 h-4 fill-current" />
                                        <span>Featured</span>
                                    </div>
                                    <div
                                        v-if="project.stats"
                                        class="px-3 py-1 bg-zinc-700/50 border border-zinc-600/50 rounded-lg text-zinc-300 text-sm font-medium"
                                    >
                                        {{ project.stats }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="filteredProjects.length === 0"
                        class="text-center py-20"
                    >
                        <div class="text-zinc-600 mb-4">
                            <Search class="w-16 h-16 mx-auto" />
                        </div>
                        <h3 class="text-xl font-semibold text-zinc-400 mb-2">
                            No projects found
                        </h3>
                        <p class="text-zinc-500">
                            Try adjusting your filter or check back later for new projects.
                        </p>
                    </div>
                </div>

                <svg class="absolute bottom-0 w-full h-24 fill-[#1b1b1e] z-0" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"></path>
                </svg>
            </section>

            <section class="relative pt-20 pb-24 bg-[#1b1b1e]">
                <div class="max-w-6xl mx-auto px-8">
                    <div class="text-center space-y-8">
                        <h3 class="text-5xl lg:text-7xl font-black text-white">
                            Like What You See?
                        </h3>
                        <p class="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed" style="font-family: 'Gabarito', sans-serif;">
                            I'm always working on new projects and exploring different technologies.
                            Let's collaborate on something amazing together.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <router-link
                                to="/#contact"
                                class="inline-block px-8 py-4 bg-white text-zinc-900 font-bold rounded-full hover:bg-zinc-100 transition-colors"
                            >
                                Start a Project
                            </router-link>
                            <router-link
                                to="/about"
                                class="inline-block px-8 py-4 border border-white text-white font-bold rounded-full hover:bg-white hover:text-zinc-900 transition-colors"
                            >
                                Learn About Me
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ExternalLink, Star, Search } from 'lucide-vue-next'
import { siGithub } from 'simple-icons'
import { projects } from '../../data/projects'
import Background from '../Background.vue'

const activeFilter = ref<string>('all')

const projectTypes = computed(() => {
    const types = [...new Set(projects.map(project => project.type))]
    return types.sort()
})

const filteredProjects = computed(() => {
    if (activeFilter.value === 'all') {
        return projects
    }
    return projects.filter(project => project.type === activeFilter.value)
})

const getTypeColorClass = (typeColor: string) => {
    const colorClasses = {
        'purple': 'bg-purple-500/20 text-purple-200 border-purple-400/30',
        'green': 'bg-green-500/20 text-green-200 border-green-400/30',
        'blue': 'bg-blue-500/20 text-blue-200 border-blue-400/30',
        'orange': 'bg-orange-500/20 text-orange-200 border-orange-400/30'
    }
    return colorClasses[typeColor as keyof typeof colorClasses] || colorClasses.blue
}

const getTechIcon = (techName: string) => {
    const techIcons: { [key: string]: string } = {
        'Vue.js': '/assets/vue.svg',
        'React': '/assets/react.svg',
        'TypeScript': '/assets/typescript.svg',
        'JavaScript': '/assets/javascript.svg',
        'Node.js': '/assets/nodejs.svg',
        'discord.js': '/assets/discord.js.svg',
        'Java': '/assets/java.svg',
        'Python': '/assets/python.svg',
        'HTML': '/assets/html.svg',
        'CSS': '/assets/css.svg',
        'TailwindCSS': '/assets/tailwind.svg',
        'Tailwind CSS': '/assets/tailwind.svg',
        'Git': '/assets/git.svg',
        'MongoDB': '/assets/mongodb.svg',
        'SQLite': '/assets/sqlite.svg',
        'Supabase': '/assets/supabase.svg',
        'Express': '/assets/nodejs.svg',
        'Discord.js': '/assets/discord.js.svg'
    }
    return techIcons[techName] || '/assets/default.svg'
}
</script>