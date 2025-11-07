<template>
    <div class="absolute inset-0 overflow-hidden pointer-events-none" :style="{ height: '100%', minHeight: '200vh' }">
        <div
            v-for="tile in animatedTiles"
            :key="tile.id"
            class="absolute bg-white opacity-20"
            :style="{
                width: tile.size + 'px',
                height: tile.size + 'px',
                left: tile.x + 'px',
                top: tile.y + 'px',
                animation: `float-${tile.id} ${tile.duration}s infinite ease-in-out`,
                animationDelay: tile.delay + 's'
            }"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const animatedTiles = ref<Array<{
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
}>>([])

let styleElement: HTMLStyleElement | null = null

const generateTiles = () => {
    const tiles = []
    const fullHeight = Math.max(window.innerHeight * 2, document.documentElement.scrollHeight)
    
    for (let i = 0; i < 50; i++) {
        tiles.push({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * fullHeight,
            size: Math.random() * 20 + 10,
            duration: Math.random() * 10 + 8,
            delay: Math.random() * 5
        })
    }
    return tiles
}

const createAnimationStyles = (tiles: typeof animatedTiles.value) => {
    return tiles.map(tile => `
        @keyframes float-${tile.id} {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.1;
            }
            25% {
                transform: translateY(-20px) rotate(90deg);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-50px) rotate(180deg);
                opacity: 0.2;
            }
            75% {
                transform: translateY(-20px) rotate(270deg);
                opacity: 0.25;
            }
        }
    `).join('')
}

onMounted(() => {
    animatedTiles.value = generateTiles()

    styleElement = document.createElement('style')
    styleElement.textContent = createAnimationStyles(animatedTiles.value)
    document.head.appendChild(styleElement)
})

onUnmounted(() => {
    if (styleElement) {
        document.head.removeChild(styleElement)
    }
})
</script>