<template>
    <div class="min-h-screen bg-zinc-900">
        <main class="pt-0 max-w-none mx-0 px-0">
            <section id="hero" class="relative min-h-screen bg-black flex items-center overflow-hidden">
                <div class="max-w-7xl mx-auto px-8 w-full">
                    <div class="flex gap-16 items-center">
                        <div class="space-y-8">
                            <h1 class="text-6xl lg:text-8xl font-black text-white leading-none">
                                Hi, I'm Jakob <span class="inline-block transition-all duration-300 hover:scale-110 hover:rotate-12 text-yellow-400 cursor-default">👋</span>
                            </h1>
                            <p class="text-2xl lg:text-3xl text-zinc-300 font-light" style="font-family: 'Michroma', sans-serif;">
                                16 y/o <span class="italic">full-stack</span> developer from Germany, learning Go, C, and building cool things.
                            </p>
                            <p class="text-xl text-zinc-400 leading-relaxed" style="font-family: 'Gabarito', sans-serif;">
                                Currently working on
                                <a
                                    href="https://snap.cephie.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-white font-bold hover:text-zinc-300 transition-colors underline decoration-zinc-600 hover:decoration-zinc-400"
                                >
                                    Cephie
                                </a>
                                , a platform of tools and services for Discord.
                            </p>
                        </div>
                    </div>
                </div>
                
                <svg class="absolute bottom-0 w-full h-24 fill-[#1b1b1e] z-0" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"></path>
                </svg>
            </section>

            <section id="skills" class="relative py-16 sm:py-32 bg-[#1b1b1e] z-10">
                <div class="max-w-6xl mx-auto px-4 sm:px-8 pb-12 sm:pb-24">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div class="order-2 lg:order-1">
                            <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
                                <div
                                    v-for="skill in skills"
                                    :key="skill.name"
                                    class="relative p-2 sm:p-4 hover:scale-105 transition-all cursor-pointer group"
                                    @mouseenter="hoveredSkill = skill"
                                    @mouseleave="hoveredSkill = null"
                                    @click="hoveredSkill = hoveredSkill === skill ? null : skill"
                                >
                                    <img :src="skill.icon" :alt="skill.name" class="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mx-auto" />

                                    <div
                                        v-if="hoveredSkill === skill"
                                        class="absolute z-[9999] bottom-full left-1/2 transform -translate-x-1/2 mb-2 sm:mb-3 w-56 sm:w-64 bg-black/95 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-3 sm:p-4 shadow-2xl"
                                    >
                                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black/95"></div>
                                        
                                        <div class="text-center">
                                            <h4 class="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2">{{ skill.name }}</h4>
                                            <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed">{{ skill.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="order-1 lg:order-2 space-y-6 sm:space-y-8 lg:ml-12">
                            <h2 class="text-4xl sm:text-5xl lg:text-7xl font-black text-white">
                                Skills
                            </h2>
                            <div class="space-y-4 sm:space-y-6">
                                <p class="text-lg sm:text-xl text-zinc-300 leading-relaxed" style="font-family: 'Gabarito', sans-serif;">
                                    Technologies I work with and continuously learn to build amazing projects.
                                </p>
                            </div>
                            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <router-link
                                    to="/projects"
                                    class="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-zinc-900 font-bold rounded-full hover:bg-zinc-100 transition-colors text-center"
                                >
                                    View Projects
                                </router-link>
                                <router-link
                                    to="/about"
                                    class="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-white text-white font-bold rounded-full hover:bg-white hover:text-zinc-900 transition-colors"
                                >
                                    <PersonStanding class="w-5 h-5 mr-2" />
                                    About me
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <svg class="absolute bottom-0 w-full h-16 sm:h-24 fill-black z-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 Q720,0 1440,60 L1440,120 L0,120 Z"></path>
                </svg>
            </section>

            <section id="projects" class="relative pb-56 pt-8  bg-black overflow-hidden">
                <div class="max-w-6xl mx-auto px-8">
                    <div class="text-center mb-16">
                        <h2 class="text-5xl lg:text-7xl font-black text-white mb-6">
                            Featured Projects
                        </h2>
                        <p class="text-xl text-zinc-300 max-w-2xl mx-auto" style="font-family: 'Gabarito', sans-serif;">
                            A collection of my biggest and most notable projects.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div
                            v-for="project in homepageProjects"
                            :key="project.id"
                            class="bg-zinc-700/50 border border-zinc-700/50 rounded-2xl p-8 hover:bg-zinc-700/60 transition-all"
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
                                        <ExternalLink class="w-5 h-5" />
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
                            <h3 class="text-2xl font-bold text-white mb-4">
                                {{ project.title }}
                            </h3>
                            <p class="text-zinc-300 mb-6 leading-relaxed">
                                {{ project.description }}
                            </p>
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
                        </div>
                    </div>
                </div>

                <svg class="absolute bottom-0 w-full h-24 fill-[#1b1b1e]" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"></path>
                </svg>
            </section>

            <section id="contact" class="relative py-32 bg-[#1b1b1e]">
                <div class="max-w-6xl mx-auto px-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div class="space-y-8">
                            <h2 class="text-5xl lg:text-7xl font-black text-white">
                                Let's Connect
                            </h2>
                            <p class="text-xl text-zinc-300 leading-relaxed" style="font-family: 'Gabarito', sans-serif;">
                                Have an idea or want to collaborate? Drop me a message and let's make something amazing together.
                            </p>

                            <div class="flex gap-6">
                                <a
                                    href="https://github.com/dev-banane"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-zinc-400 hover:text-white transition-colors group"
                                    title="GitHub"
                                >
                                    <svg class="w-8 h-8 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path :d="siGithub.path" />
                                    </svg>
                                </a>
                                <a
                                    href="https://instagram.com/_jakob09"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-zinc-400 hover:text-white transition-colors group"
                                    title="Instagram"
                                >
                                    <svg class="w-8 h-8 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path :d="siInstagram.path" />
                                    </svg>
                                </a>
                                <a
                                    href="https://discord.com/users/798485492621770792"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-zinc-400 hover:text-white transition-colors group"
                                    title="Discord"
                                >
                                    <svg class="w-8 h-8 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path :d="siDiscord.path" />
                                    </svg>
                                </a>
                                <a
                                    href="https://open.spotify.com/user/31pqvbbf3v2vaiictlvpz6dy4yye?si=d4059a18b49141f7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-zinc-400 hover:text-white transition-colors group"
                                    title="Spotify"
                                >
                                    <svg class="w-8 h-8 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path :d="siSpotify.path" />
                                    </svg>
                                </a>
                                <a
                                    href="https://steamcommunity.com/profiles/76561199061188081/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-zinc-400 hover:text-white transition-colors group"
                                    title="Steam"
                                >
                                    <svg class="w-8 h-8 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path :d="siSteam.path" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <div class="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8 shadow-xl">
                            <form @submit="handleSubmit" class="space-y-6">
                                <input
                                    type="text"
                                    v-model="form.name"
                                    placeholder="Your name"
                                    class="w-full px-6 py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all shadow-xl"
                                    required
                                />
                                <input
                                    type="email"
                                    v-model="form.email"
                                    placeholder="your@email.com"
                                    class="w-full px-6 py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all shadow-xl"
                                    required
                                />
                                <textarea
                                    v-model="form.message"
                                    placeholder="Tell me about you..."
                                    rows="4"
                                    class="w-full px-6 py-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all resize-none shadow-xl"
                                    required
                                />
                                <button
                                    type="submit"
                                    :disabled="loading"
                                    class="w-full py-4 bg-white text-zinc-900 font-bold rounded-xl hover:bg-zinc-100 transition-colors disabled:opacity-70 shadow-xl"
                                >
                                    <span v-if="loading" class="flex items-center justify-center gap-2">
                                        <Loader2 class="w-5 h-5 animate-spin" />
                                        Sending...
                                    </span>
                                    <span v-else class="flex items-center justify-center gap-2">
                                        <Send class="w-5 h-5" />
                                        Send Message
                                    </span>
                                </button>
                            </form>
                            
                            <div v-if="success" class="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-200 text-center flex items-center justify-center gap-2">
                                <CheckCircle class="w-5 h-5" />
                                Message sent successfully!
                            </div>
                            <div v-if="error" class="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-center flex items-center justify-center gap-2">
                                <AlertCircle class="w-5 h-5" />
                                {{ error }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    User,
    Mail,
    MessageSquare,
    CheckCircle,
    AlertCircle,
    Loader2,
    Send,
    ExternalLink,
    PersonStanding
} from 'lucide-vue-next'
import { siGithub, siInstagram, siDiscord, siSpotify, siSteam } from 'simple-icons';
import { projects } from '../../data/projects'

const loading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)
type Skill = {
    name: string
    icon: string
    description: string
}
const hoveredSkill = ref<Skill | null>(null)
const form = ref({
    name: '',
    email: '',
    message: ''
})
const skills = ref([
    {
        name: 'Vue.js',
        icon: '/assets/vue.svg',
        description: 'Progressive JavaScript framework for building user interfaces with reactive data binding and component-based architecture.'
    },
    {
        name: 'React',
        icon: '/assets/react.svg',
        description: 'Popular JavaScript library for building interactive user interfaces using a component-based approach.'
    },
    {
        name: 'TypeScript',
        icon: '/assets/typescript.svg',
        description: 'Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.'
    },
    {
        name: 'JavaScript',
        icon: '/assets/javascript.svg',
        description: 'Dynamic programming language that enables interactive web pages and is an essential part of web applications.'
    },
    {
        name: 'Node.js',
        icon: '/assets/nodejs.svg',
        description: 'JavaScript runtime built on Chrome\'s V8 engine for building scalable network applications and APIs.'
    },
    {
        name: 'discord.js',
        icon: '/assets/discord.js.svg',
        description: 'JavaScript library for interacting with the Discord API, enabling the creation of bots and applications for Discord.'
    },
    {
        name: 'Java',
        icon: '/assets/java.svg',
        description: 'Object-oriented programming language known for its portability, security, and use in enterprise applications.'
    },
    {
        name: 'Python',
        icon: '/assets/python.svg',
        description: 'Versatile programming language used for web development, data science, automation, and artificial intelligence.'
    },
    {
        name: 'HTML',
        icon: '/assets/html.svg',
        description: 'Standard markup language for creating web pages and web applications, defining structure and content.'
    },
    {
        name: 'CSS',
        icon: '/assets/css.svg',
        description: 'Style sheet language used for describing the presentation and visual styling of HTML documents.'
    },
    {
        name: 'Tailwind CSS',
        icon: '/assets/tailwind.svg',
        description: 'Utility-first CSS framework for creating custom designs without having to leave your HTML.'
    },
    {
        name: 'Git',
        icon: '/assets/git.svg',
        description: 'Distributed version control system for tracking changes in source code during software development.'
    },
    {
        name: 'MongoDB',
        icon: '/assets/mongodb.svg',
        description: 'NoSQL document database that provides high performance, high availability, and easy scalability.'
    },
    {
        name: 'SQLite',
        icon: '/assets/sqlite.svg',
        description: 'Lightweight, serverless, self-contained SQL database engine perfect for embedded applications.'
    },
    {
        name: 'Supabase',
        icon: '/assets/supabase.svg',
        description: 'Open-source Firebase alternative that provides a suite of tools for building and scaling applications.'
    },
])

const homepageProjects = computed(() => {
    return projects.filter(project => project.showOnHomepage)
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

const handleSubmit = async (e: Event) => {
    e.preventDefault()
    loading.value = true
    error.value = null
    success.value = false

    if (!form.value.name || !form.value.email || !form.value.message) {
        error.value = 'Please fill in all fields.'
        loading.value = false
        return
    }

    try {
        const emailjs = await import('emailjs-com')

        await emailjs.send(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            {
                from_name: form.value.name,
                from_email: form.value.email,
                message: form.value.message,
                to_email: 'jakob@uplift.de'
            },
            import.meta.env.VITE_PUBLIC_KEY
        )

        success.value = true
        form.value = { name: '', email: '', message: '' }
    } catch {
        error.value = 'Failed to send. Please try again later.'
    }
    loading.value = false
}
</script>