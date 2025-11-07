<template>
    <div class="min-h-screen bg-zinc-900">
        <main class="pt-0 max-w-none mx-0 px-0">
            <section id="contact-hero" class="relative min-h-screen bg-black flex items-center overflow-hidden">
                <Background />

                <div class="max-w-7xl mx-auto px-8 w-full relative z-10">
                    <div class="text-center space-y-8">
                        <h1 class="text-6xl lg:text-8xl font-black text-white leading-none">
                            Contact Me <span class="inline-block transition-all duration-300 hover:scale-110 hover:rotate-12 text-yellow-400 cursor-default">📧</span>
                        </h1>
                        <p class="text-2xl lg:text-3xl text-zinc-300 font-light max-w-4xl mx-auto" style="font-family: 'Michroma', sans-serif;">
                            Let's build something amazing together
                        </p>
                    </div>
                </div>
                
                <svg class="absolute bottom-0 w-full h-24 fill-[#1b1b1e] z-0" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"></path>
                </svg>
            </section>

            <section class="relative pt-32 pb-52 bg-[#1b1b1e] overflow-hidden">
                <div class="max-w-6xl mx-auto px-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div class="space-y-8">
                            <h2 class="text-5xl lg:text-7xl font-black text-white">
                                Get In Touch
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
                                    placeholder="Tell me about your project..."
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

                <svg class="absolute bottom-0 w-full h-24 fill-black z-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 Q720,0 1440,60 L1440,120 L0,120 Z"></path>
                </svg>
            </section>

            <section class="relative pb-32 pt-24 bg-black overflow-hidden">
                <Background />

                <div class="max-w-6xl mx-auto px-8 relative z-10">
                    <div class="text-center mb-16">
                        <h3 class="text-5xl lg:text-7xl font-black text-white mb-6">
                            Other Ways to Reach Me
                        </h3>
                        <p class="text-xl text-zinc-300 max-w-2xl mx-auto" style="font-family: 'Gabarito', sans-serif;">
                            Prefer a different way to connect? Here are some alternatives.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8 text-center">
                            <div class="mb-6">
                                <Mail class="w-12 h-12 text-white mx-auto" />
                            </div>
                            <h4 class="text-2xl font-bold text-white mb-4">Direct Email</h4>
                            <p class="text-zinc-300 mb-6">For business inquiries and collaborations</p>
                            <a
                                href="mailto:me@devbanane.com"
                                class="inline-block px-8 py-4 bg-white text-zinc-900 font-bold rounded-full hover:bg-zinc-100 transition-colors"
                            >
                                me@devbanane.com
                            </a>
                        </div>

                        <div class="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8 text-center">
                            <div class="mb-6">
                                <MessageSquare class="w-12 h-12 text-white mx-auto" />
                            </div>
                            <h4 class="text-2xl font-bold text-white mb-4">Discord</h4>
                            <p class="text-zinc-300 mb-6">Quick questions and casual chat</p>
                            <a
                                href="https://discord.com/users/798485492621770792"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-block px-8 py-4 border border-white text-white font-bold rounded-full hover:bg-white hover:text-zinc-900 transition-colors"
                            >
                                Message on Discord
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Mail, MessageSquare, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-vue-next'
import { siGithub, siInstagram, siDiscord, siSpotify, siSteam } from 'simple-icons'
import Background from '../Background.vue'

const loading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)

const form = ref({
    name: '',
    email: '',
    message: ''
})

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
                to_email: 'me@devbanane.com'
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