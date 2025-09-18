<template>
    <div class="min-h-screen bg-black">
        <main class="pt-0 max-w-none mx-0 px-0">
            <section
                id="hero"
                class="pt-16 pb-8 md:pt-48 md:pb-32 flex flex-col md:flex-row items-center justify-center w-full bg-gradient-to-br from-blue-200 via-indigo-300 to-rose-300 min-h-screen md:min-h-0"
            >
                <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-8 md:ml-12 order-2 md:order-1 max-w-5xl">
                    <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 md:mb-6 drop-shadow-lg leading-tight">
                        Hi, I'm Jakob <span class="text-4xl sm:text-5xl md:text-6xl">👋</span>
                    </h1>
                    <p class="text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4 font-semibold leading-relaxed max-w-5xl" style="font-family: 'Michroma', sans-serif;">
                        16 y/o developer from Germany, currently learning
                        Go, C, and building cool things.
                    </p>
                    <p class="text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed" >
                        Currently working on
                        <a
                            href="https://snap.cephie.app"
                            class="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold
                                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:via-purple-500 after:to-pink-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Cephie
                        </a>
                        , a platform of tools and services for discord.
                    </p>
                </div>
                <div class="flex-1 flex items-center justify-center w-full px-6 md:px-0 order-1 md:order-2">
                    <div class="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
                        <img
                            src="/pfp.webp"
                            alt="Profile Picture"
                            class="w-60 h-60 sm:w-72 sm:h-72 md:w-92 md:h-92 rounded-full border-4 border-white/30 shadow-lg object-cover"
                        />
                    </div>
                </div>
            </section>

            <section
                id="skills"
                class="w-full py-28 bg-black relative overflow-hidden"
            >
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

                <div class="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-2 mt-4">
                    <div class="flex-1 text-center md:text-left mb-12 md:mb-0 md:mr-16">
                        <h2
                            class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 drop-shadow"
                            style="line-height: 1.15; padding-bottom: 0.15em"
                        >
                            My Skills
                        </h2>
                        <p class="text-lg md:text-xl text-gray-300 mb-6 max-w-xl mx-auto md:mx-0" >
                            I'm always eager to learn new technologies and
                            improve my skills. If you're interested in
                            collaborating or have a project in mind, feel
                            free to reach out!
                        </p>
                        <div class="w-28 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-10 mx-auto md:mx-0" />
                        <router-link
                            to="/projects"
                            class="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/30 cursor-pointer inline-block"
                        >
                            <div class="flex items-center justify-between">
                                <span>Explore my projects</span>
                                <PersonStanding class="ml-2" :size="22" />
                            </div>
                        </router-link>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="flex flex-col items-center gap-y-4 w-full max-w-2xl">
                            <div class="flex gap-4 md:gap-6 justify-center flex-wrap">
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"
                                        alt="Java"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white"
                                        alt="Vue"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/Clerk-000000?style=for-the-badge&logo=clerk&logoColor=white"
                                        alt="Clerk"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                            </div>
                            <div class="flex gap-4 md:gap-6 justify-center ml-2 md:ml-5 flex-wrap">
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"
                                        alt="MongoDB"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white"
                                        alt="SQL"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white"
                                        alt="discord.js"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                            </div>
                            <div class="flex gap-4 md:gap-6 justify-center flex-wrap">
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"
                                        alt="TailwindCSS"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb"
                                        alt="React"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
                                        alt="Node.js"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"
                                        alt="Supabase"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                            </div>
                            <div class="flex gap-4 md:gap-6 justify-center ml-2 md:ml-10 flex-wrap">
                                
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"
                                        alt="TypeScript"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"
                                        alt="Git"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"
                                        alt="Python"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"
                                        alt="GitHub"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                            </div>
                            <div class="flex gap-4 md:gap-6 justify-center flex-wrap">
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"
                                        alt="HTML5"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"
                                        alt="CSS3"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                                <div class="bg-white/10 rounded shadow p-2 md:p-3 flex items-center border border-white/20">
                                    <img
                                        src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"
                                        alt="JavaScript"
                                        class="h-5 md:h-7"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="projects"
                class="w-full py-28 bg-black relative"
            >
                <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

                <div class="max-w-6xl mx-auto px-4 pt-12">
                    <div class="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                        <div class="flex-1 text-left">
                            <h2
                            class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 drop-shadow"
                            style="line-height: 1.15; padding-bottom: 0.15em"
                        >
                            My Projects
                        </h2>
                            <p class="text-white/70 text-lg mb-0 md:mb-0" >
                                A collection of my biggest and most notable
                                projects.
                            </p>
                        </div>
                        <div class="mt-6 md:mt-0">
                            <a
                                href="https://github.com/dev-banane"
                                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-base bg-white text-gray-900 shadow-lg shadow-white/20 transition-all duration-300 hover:bg-white/90 hover:scale-105"
                            >
                                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path :d="siGithub.path" />
                                </svg>
                                View GitHub
                            </a>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div
                            v-for="project in homepageProjects"
                            :key="project.id"
                            class="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg flex flex-col transition-all"
                        >
                            <div class="flex items-center justify-between mb-2">
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
                                        class="text-white/60 hover:text-white transition-colors"
                                    >
                                        <siGithub class="w-4 h-4" />
                                    </a>
                                    <a
                                        :href="project.url"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-white/60 hover:text-white transition-colors"
                                    >
                                        <ExternalLink class="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                            <h3 class="font-bold text-lg mb-1 text-white">
                                {{ project.title }}
                            </h3>
                            <p class="text-white/70 text-sm mb-3 leading-relaxed">
                                {{ project.description }}
                            </p>
                            <div class="flex flex-row justify-between items-end gap-4">
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        v-for="tech in project.technologies"
                                        :key="tech"
                                        class="bg-white/20 text-white/80 text-xs px-2 py-1 rounded"
                                    >
                                        {{ tech }}
                                    </span>
                                </div>
                                <div
                                    v-if="project.stats"
                                    class="p-2 bg-white/10 border border-white/20 rounded-lg text-white/80 text-xs font-medium whitespace-nowrap"
                                >
                                    {{ project.stats }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="contact"
                class="w-full pt-20 bg-black relative"
            >
                <div class="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-pink-300/10 pointer-events-none" />
                <div class="flex flex-col justify-center items-center px-2 py-8 relative z-10 max-w-4xl mx-auto">
                    <div class="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 w-full shadow-2xl shadow-black/25 max-w-2xl">
                        <div class="text-center mb-8">
                            <div class="inline-flex flex-row items-center justify-center mb-6 gap-4">
                                <img
                                    src="/pfp-clear.webp"
                                    alt="Logo"
                                    class="w-20"
                                />
                                <h2 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 drop-shadow">
                                    Let's Connect
                                </h2>
                            </div>
                            <p class="text-white/70 text-lg leading-relaxed" >
                                Have an idea, want to collaborate, or just
                                want to chat?
                                <br />
                                Drop me a message and let's make something
                                amazing together.
                            </p>
                        </div>
                        <form @submit="handleSubmit" class="space-y-6" >
                            <div class="group">
                                <div class="relative">
                                    <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
                                    <input
                                        type="text"
                                        name="name"
                                        v-model="form.name"
                                        placeholder="Your name"
                                        class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="group">
                                <div class="relative">
                                    <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        v-model="form.email"
                                        placeholder="your.email@example.com"
                                        class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all backdrop-blur-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="group">
                                <div class="relative">
                                    <MessageSquare class="absolute left-4 top-6 w-5 h-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
                                    <textarea
                                        name="message"
                                        v-model="form.message"
                                        placeholder="Tell me about your project, idea, or just say hello..."
                                        :rows="5"
                                        class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all backdrop-blur-sm resize-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="flex flex-row items-center gap-4 mt-8">
                                <button
                                    type="submit"
                                    :disabled="loading"
                                    class="group bg-white text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-white/90 hover:scale-[1.01] hover:shadow-lg hover:shadow-white/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 order-1 md:order-none cursor-pointer"
                                >
                                    <template v-if="loading">
                                        <Loader2 class="w-5 h-5 animate-spin" />
                                        Sending...
                                    </template>
                                    <template v-else>
                                        <span>Send Message</span>
                                        <Send class="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                                    </template>
                                </button>
                                <p class="hidden md:block text-white/50 text-sm text-center md:text-right w-full md:w-auto ml-auto mr-2" >
                                    You can also reach me directly at
                                    <a
                                        href="mailto:jakob@uplift.de"
                                        class="text-white/70 hover:text-white transition-colors underline decoration-white/30 hover:decoration-white/70"
                                    >
                                        jakob@uplift.de
                                    </a>
                                </p>
                                <div v-if="success" class="flex items-center gap-2 text-green-400">
                                    <CheckCircle class="w-5 h-5" />
                                    <span>Message sent successfully!</span>
                                </div>
                                <div v-if="error" class="flex items-center gap-2 text-red-400">
                                    <AlertCircle class="w-5 h-5" />
                                    <span>{{ error }}</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <p class="text-center text-white/50 text-sm pt-6 pb-12" style="font-family: 'Michroma', sans-serif;">Website built with Vue.js</p>
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
import { siGithub } from 'simple-icons';
import { projects } from '../../data/projects'

const loading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)
const form = ref({
    name: '',
    email: '',
    message: ''
})

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
            import.meta.env.VUE_APP_SERVICE_ID,
            import.meta.env.VUE_APP_TEMPLATE_ID,
            {
                from_name: form.value.name,
                from_email: form.value.email,
                message: form.value.message,
                to_email: 'jakob@uplift.de'
            },
            import.meta.env.VUE_APP_PUBLIC_KEY
        )

        success.value = true
        form.value = { name: '', email: '', message: '' }
    } catch {
        error.value = 'Failed to send. Please try again later.'
    }
    loading.value = false
}
</script>