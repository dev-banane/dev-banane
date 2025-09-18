<template>
    <div class="min-h-screen bg-black">
        <main class="pt-0 max-w-none mx-0 px-0">
            <section
                id="projects-hero"
                class="pt-16 pb-8 md:pt-32 md:pb-16 flex flex-col items-center justify-center w-full bg-gradient-to-br from-blue-200 via-indigo-300 to-rose-300 min-h-[40vh]"
            >
                <div class="text-center px-6 md:px-8">
                    <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 md:mb-6 drop-shadow-lg leading-tight">
                        My Projects
                    </h1>
                    <p class="text-gray-700 text-lg sm:text-xl md:text-2xl mb-3 font-semibold leading-relaxed max-w-4xl mx-auto" style="font-family: 'Michroma', sans-serif;">
                        A collection of things I've built and worked on
                    </p>
                </div>
            </section>

            <section class="w-full py-12 bg-black relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
                
                <div class="relative z-10 max-w-7xl mx-auto px-6">
                    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
                        <div class="flex flex-wrap gap-3">
                            <button
                                @click="activeFilter = 'all'"
                                :class="[
                                    'px-4 py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer',
                                    activeFilter === 'all'
                                        ? 'bg-white text-gray-900'
                                        : 'bg-white/10 border border-white/20 text-white hover:bg-white/15'
                                ]"
                            >
                                All Projects
                            </button>
                            <button
                                v-for="type in projectTypes"
                                :key="type"
                                @click="activeFilter = type"
                                :class="[
                                    'px-4 py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer',
                                    activeFilter === type
                                        ? 'bg-white text-gray-900'
                                        : 'bg-white/10 border border-white/20 text-white hover:bg-white/15'
                                ]"
                            >
                                {{ type }}
                            </button>
                        </div>
                        
                        <div class="flex items-center gap-4">
                            <div class="text-white/70 text-sm">
                                {{ filteredProjects.length }} {{ filteredProjects.length === 1 ? 'project' : 'projects' }}
                            </div>
                            <a
                                href="https://github.com/dev-banane"
                                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-base bg-white text-gray-900 shadow-lg shadow-white/20 transition-all duration-300 hover:bg-white/90 hover:scale-105"
                            >
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path :d="siGithub.path" />
                                </svg>
                                View GitHub
                            </a>
                        </div>
                    </div>
                    <p class="mt-4 text-white/70 text-sm">These are only my most recent and important projects. Check back later for more updates!</p>
                </div>
            </section>

            <section class="w-full pb-20 bg-black relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
                
                <div class="relative z-10 max-w-7xl mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div
                            v-for="project in filteredProjects"
                            :key="project.id"
                            class="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-[1.02]"
                        >
                            <div class="flex items-center justify-between mb-4">
                                <span
                                    class="text-xs px-3 py-1 rounded-full border font-semibold tracking-wide"
                                    :class="getTypeColorClass(project.typeColor)"
                                >
                                    {{ project.type }}
                                </span>
                                <div class="flex gap-2">
                                    <a
                                        v-if="project.github"
                                        :href="project.github"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="p-2 rounded-lg bg-white/10 border border-white/20 text-white/60 hover:text-white hover:bg-white/15 transition-all duration-300"
                                    >
                                        <Github class="w-4 h-4" />
                                    </a>
                                    <a
                                        :href="project.url"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="p-2 rounded-lg bg-white/10 border border-white/20 text-white/60 hover:text-white hover:bg-white/15 transition-all duration-300"
                                    >
                                        <ExternalLink class="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            <div class="flex-grow">
                                <h3 class="font-bold text-xl mb-3 text-white">
                                    {{ project.title }}
                                </h3>
                                <p class="text-white/70 text-sm mb-4 leading-relaxed">
                                    {{ project.description }}
                                </p>
                            </div>

                            <div class="space-y-4">
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        v-for="tech in project.technologies"
                                        :key="tech"
                                        class="bg-white/20 text-white/80 text-xs px-2 py-1 rounded border border-white/10"
                                    >
                                        {{ tech }}
                                    </span>
                                </div>
                                
                                <div class="flex items-center justify-between">
                                    <div
                                        v-if="project.featured"
                                        class="flex items-center gap-2 text-yellow-400 text-xs"
                                    >
                                        <Star class="w-3 h-3 fill-current" />
                                        <span>Featured</span>
                                    </div>
                                    <div
                                        v-if="project.stats"
                                        class="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white/80 text-xs font-medium"
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
                        <div class="text-white/40 mb-4">
                            <Search class="w-16 h-16 mx-auto" />
                        </div>
                        <h3 class="text-xl font-semibold text-white/70 mb-2">
                            No projects found
                        </h3>
                        <p class="text-white/50">
                            Try adjusting your filter or check back later for new projects.
                        </p>
                    </div>
                </div>
            </section>

            <section class="w-full bg-black relative pb-24 pt-12">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
                <div class="relative z-10 text-center px-6">
                    <h3 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                        Like What You See?
                    </h3>
                    <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        I'm always working on new projects and exploring different technologies.
                        Let's collaborate on something amazing together.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            class="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-lg shadow-white/20"
                        >
                            Start a Project
                        </a>
                        <a
                            href="/about"
                            class="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/15 hover:border-white/30"
                        >
                            Learn About Me
                        </a>
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
</script>