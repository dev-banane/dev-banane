<template>
    <nav class="fixed top-0 left-0 right-0 z-100 transition-all duration-300" :class="navClass">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <router-link to="/" class="flex items-center space-x-3">
                    <img
                        src="/pfp-clear.webp"
                        alt="Logo"
                        class="w-12 h-12"
                    />
                    <span class="text-xl font-bold text-white" style="font-family: 'Michroma', sans-serif;">
                        devbanane
                    </span>
                </router-link>

                <div class="hidden md:flex items-center space-x-8">
                    <router-link
                        v-for="link in navLinks"
                        :key="link.path"
                        :to="link.path"
                        class="px-4 py-2 rounded-full text-md font-medium transition-all duration-200"
                        :class="isActive(link.path)
                            ? 'text-white bg-white/15'
                            : 'text-white/70 hover:text-white hover:bg-white/15'"
                    >
                        {{ link.label }}
                    </router-link>
                </div>

                <div class="flex items-center space-x-4">

                    <button
                        @click="toggleMobileMenu"
                        class="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        <X v-if="mobileMenuOpen" :size="24" />
                        <Menu v-else :size="24" />
                    </button>
                    <a
                        href="https://github.com/dev-banane"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-base bg-white text-gray-900 shadow-lg shadow-white/20 transition-all duration-300 hover:bg-white/90 hover:scale-105"
                    >
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path :d="siGithub.path" />
                        </svg>
                        <span class="hidden md:inline">View GitHub</span>
                    </a>
                </div>
            </div>

            <div
                class="md:hidden transition-all duration-300 overflow-hidden"
                :class=" [
                    mobileMenuOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0',
                    mobileMenuOpen ? 'bg-black/95 backdrop-blur-xl' : ''
                ]"
            >
                <div class="py-4 space-y-2 border-t border-white/10">
                    <router-link
                        v-for="link in navLinks"
                        :key="link.path"
                        :to="link.path"
                        @click="closeMobileMenu"
                        class="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                        :class="isActive(link.path)
                            ? 'text-white bg-white/10'
                            : 'text-white/70 hover:text-white hover:bg-white/5'"
                    >
                        <component :is="link.icon" :size="18" />
                        <span>{{ link.label }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    Home,
    User,
    Briefcase,
    Mail,
    Menu,
    X
} from 'lucide-vue-next'
import {
    siGithub
} from 'simple-icons';

const mobileMenuOpen = ref(false)
const route = useRoute()

const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: User },
    { label: 'Projects', path: '/projects', icon: Briefcase },
    { label: 'Contact', path: '/contact', icon: Mail }
]

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
    mobileMenuOpen.value = false
}

const isActive = (path: string) => {
    return route.path === path
}

const scrolled = ref(false)
const bgApplied = ref(false)

const navClass = computed(() => {
    let cls = scrolled.value ? 'pt-0' : 'pt-2'
    cls += bgApplied.value ? ' bg-black/90 backdrop-blur-xl' : ' bg-transparent'
    return cls
})

const handleScroll = () => {
    if (window.scrollY > 0) {
        scrolled.value = true
        bgApplied.value = true
    } else {
        scrolled.value = false
        bgApplied.value = false
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>