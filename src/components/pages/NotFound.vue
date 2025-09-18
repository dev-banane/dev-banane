<template>
    <div class="min-h-screen bg-black flex items-center justify-center">
        <main class="text-center px-6 py-24">
            <div class="max-w-2xl mx-auto">
                <div class="mb-8">
                    <h1 class="text-8xl md:text-9xl font-extrabold bg-gradient-to-br from-blue-200 via-indigo-300 to-rose-300 bg-clip-text text-transparent drop-shadow-lg">
                        404
                    </h1>
                </div>

                <div class="mb-8">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    <p class="text-white/70 text-lg md:text-xl leading-relaxed">
                        Oops! The page you're looking for doesn't exist.
                        <br />
                        It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <router-link
                        to="/"
                        class="group px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-lg shadow-white/20 flex items-center gap-3 cursor-pointer"
                    >
                        <Home class="w-5 h-5" />
                        <span>Go Home</span>
                    </router-link>
                    
                    <button
                        @click="goBack"
                        class="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/15 hover:border-white/30 flex items-center gap-3 cursor-pointer shadow-lg shadow-black/20"
                    >
                        <ArrowLeft class="w-5 h-5" />
                        <span>Go Back</span>
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { Home, ArrowLeft } from 'lucide-vue-next'

const goBack = () => {
    if (window.history.length > 1) {
        window.history.back()
    } else {
        window.location.href = '/'
    }
}
</script>