<template>
    <div class="min-h-screen bg-black">
        <main class="pt-0 max-w-none mx-0 px-0">
            <section
                id="contact-hero"
                class="pt-16 pb-8 md:pt-32 md:pb-16 flex flex-col items-center justify-center w-full bg-gradient-to-br from-blue-200 via-indigo-300 to-rose-300 min-h-[40vh]"
            >
                <div class="text-center px-6 md:px-8">
                    <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 md:mb-6 drop-shadow-lg leading-tight">
                        Let's Connect
                    </h1>
                    <p class="text-gray-700 text-lg sm:text-xl md:text-2xl mb-3 font-semibold leading-relaxed max-w-4xl mx-auto" style="font-family: 'Michroma', sans-serif;">
                        Have an idea? Want to collaborate? Let's chat!
                    </p>
                </div>
            </section>

            <section class="w-full py-16 bg-black relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
                
                <div class="relative z-10 max-w-6xl mx-auto px-6">
                    <div class="text-center mb-12">
                        <h3 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4" style="line-height: 1.4em;">
                            Ways to reach me
                        </h3>
                        <p class="text-white/70 text-lg max-w-2xl mx-auto">
                            Prefer a different way to get in touch? Here are some alternatives.
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-default">
                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                            <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Mail class="w-6 h-6 text-blue-400" />
                            </div>
                            <h4 class="text-white font-semibold mb-2">Email</h4>
                            <a
                                href="mailto:jakob@uplift.de"
                                class="text-white/70 hover:text-white transition-colors text-sm"
                            >
                                jakob@uplift.de
                            </a>
                        </div>

                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                            <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg class="w-6 h-6 text-purple-400 fill-current" viewBox="0 0 24 24">
                                    <path :d="siDiscord.path" />
                                </svg>
                            </div>
                            <h4 class="text-white font-semibold mb-2">Discord</h4>
                            <a
                                href="https://discord.com/users/798485492621770792"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-white/70 hover:text-white transition-colors text-sm"
                            >
                                @bananensammler_
                            </a>
                        </div>

                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                            <div class="w-12 h-12 bg-gray-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg class="w-6 h-6 text-gray-400 fill-current" viewBox="0 0 24 24">
                                    <path :d="siGithub.path" />
                                </svg>
                            </div>
                            <h4 class="text-white font-semibold mb-2">GitHub</h4>
                            <a
                                href="https://github.com/dev-banane"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-white/70 hover:text-white transition-colors text-sm"
                            >
                                @dev-banane
                            </a>
                        </div>

                        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                            <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <MapPin class="w-6 h-6 text-green-400" />
                            </div>
                            <h4 class="text-white font-semibold mb-2">Location</h4>
                            <p class="text-white/70 text-sm">
                                Germany
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="w-full py-20 bg-black relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
                
                <div class="relative z-10 flex flex-col justify-center items-center px-6 max-w-4xl mx-auto">
                    <div class="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 w-full shadow-2xl shadow-black/25 max-w-2xl">
                        <div class="text-center mb-8">
                            <div class="inline-flex flex-row items-center justify-center mb-6 gap-4">
                                <img
                                    src="/pfp-clear.webp"
                                    alt="Logo"
                                    class="w-20"
                                />
                                <h2 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 drop-shadow">
                                    Get In Touch
                                </h2>
                            </div>
                            <p class="text-white/70 text-lg leading-relaxed">
                                Have an idea, want to collaborate, or just want to chat?
                                <br />
                                Drop me a message and let's make something amazing together.
                            </p>
                        </div>
                        
                        <form @submit="handleSubmit" class="space-y-6">
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
                                        :rows="6"
                                        class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all backdrop-blur-sm resize-none"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div class="flex flex-col sm:flex-row items-center gap-4 mt-8">
                                <button
                                    type="submit"
                                    :disabled="loading"
                                    class="group w-full sm:w-auto bg-white text-gray-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-white/90 hover:scale-[1.01] hover:shadow-lg hover:shadow-white/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 cursor-pointer"
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
                                
                                <p class="hidden sm:block text-white/50 text-sm text-center sm:text-right w-full sm:w-auto ml-auto mr-2">
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
                                    <span class="text-sm">Message sent successfully!</span>
                                </div>
                                
                                <div v-if="error" class="flex items-center gap-2 text-red-400">
                                    <AlertCircle class="w-5 h-5" />
                                    <span class="text-sm">{{ error }}</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>


        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    User,
    Mail,
    MessageSquare,
    CheckCircle,
    AlertCircle,
    Loader2,
    Send,
    MapPin
} from 'lucide-vue-next'
import { siDiscord, siGithub } from 'simple-icons'

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