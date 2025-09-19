<template>
    <div class="fixed bottom-6 right-6 z-50">
        <button
            @click="toggleModal"
            class="group relative bg-gradient-to-br from-blue-400 via-indigo-400 to-rose-300 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:from-blue-500 hover:via-indigo-500 hover:to-rose-400  hover:scale-110 hover:shadow-xl cursor-pointer"
            :class="{ 'scale-90': isOpen }"
        >
            <NotebookPen
                class="w-6 h-6 transition-transform duration-200"
                :class="{ 'rotate-12': isOpen }"
            />
            
            <div
                v-if="notes.length > 0 && !isOpen"
                class="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
            >
                {{ notes.length > 9 ? '9+' : notes.length }}
            </div>
            
            <div class="absolute bottom-full right-0 mb-2 px-3 py-1 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none" style="font-family: 'Michroma', sans-serif;">
                Quick Notes
                <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
        </button>
    </div>

    <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
    >
        <div
            v-if="isOpen"
            class="fixed inset-0 bg-black/30 z-40"
            @click="closeModal"
        />
    </Transition>

    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 translate-y-4 scale-95"
        leave-to-class="opacity-0 translate-y-4 scale-95"
    >
        <div
            v-if="isOpen"
            class="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)] bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col"
        >
            <div class="border-b border-white/10">
            <div class="flex items-center justify-between p-6 pb-3">
                <div class="flex items-center gap-3">
                    <NotebookPen class="w-6 h-6 text-blue-400" />
                    <h3 class="text-lg font-bold text-white">Quick Notes</h3>
                    <span class="text-sm text-white/50 px-2 py-1 rounded-full">
                        {{ notes.length }}
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <button
                        @click="addNote"
                        class="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        title="Add Note"
                    >
                        <Plus class="w-5 h-5" />
                    </button>
                    <button
                        @click="closeModal"
                        class="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        <X class="w-5 h-5" />
                    </button>
                </div>
            </div>
            <p class="text-sm text-white/50 pb-3 text-center">Your notes are stored locally in your browser.</p>
            </div>

            <div class="flex-1 overflow-y-auto p-4 pb-0 space-y-3 min-h-0">
                <div v-if="notes.length === 0" class="text-center py-8">
                    <NotebookPen class="w-12 h-12 text-white/30 mx-auto mb-3" />
                    <p class="text-white/50 text-sm">No notes yet</p>
                    <button
                        @click="addNote"
                        class="mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                        Create your first note
                    </button>
                </div>

                <div
                    v-for="note in notes"
                    :key="note.id"
                    class="bg-white/10 border border-white/20 rounded-xl p-4 group hover:bg-white/15 transition-all duration-200"
                >
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-white/40 text-xs">
                            {{ formatDate(note.createdAt) }}
                        </span>
                        <button
                            @click="deleteNote(note.id)"
                            class="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 transition-all duration-200"
                        >
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>

                    <input
                        v-model="note.title"
                        @input="saveNotes"
                        placeholder="Note title..."
                        class="w-full bg-transparent text-white font-medium text-sm mb-2 placeholder-white/40 focus:outline-none border-none p-0"
                    />

                    <textarea
                        v-model="note.content"
                        @input="handleTextareaInput"
                        placeholder="Write your note..."
                        class="w-full bg-transparent text-white/80 text-sm placeholder-white/40 focus:outline-none border-none p-0 resize-none"
                        rows="3"
                        @focus="autoResize"
                    />

                    <div class="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                        <span class="text-white/30 text-xs">
                            {{ note.content.length }} chars
                        </span>
                        <span class="text-white/30 text-xs">
                            {{ formatTime(note.updatedAt) }}
                        </span>
                    </div>
                </div>
            </div>

            <div v-if="notes.length > 0" class="p-4 border-t border-white/10">
                <button
                    @click="clearAllNotes"
                    class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg transition-all duration-300 hover:bg-red-500/30 text-sm"
                >
                    <Trash2 class="w-4 h-4" />
                    Clear All Notes
                </button>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { Plus, Trash2, NotebookPen, X } from 'lucide-vue-next'

interface Note {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
}

const isOpen = ref(false)
const notes = ref<Note[]>([])

const toggleModal = () => {
    isOpen.value = !isOpen.value
}

const closeModal = () => {
    isOpen.value = false
}

const addNote = async () => {
    const newNote: Note = {
        id: generateId(),
        title: '',
        content: '',
        createdAt: new Date(),
        updatedAt: new Date()
    }
    
    notes.value.unshift(newNote)
    saveNotes()

    await nextTick()
    const titleInput = document.querySelector('.bg-white\\/10 input[placeholder="Note title..."]') as HTMLInputElement
    if (titleInput) {
        titleInput.focus()
    }
}

const deleteNote = (id: string) => {
    notes.value = notes.value.filter(note => note.id !== id)
    saveNotes()
}

const clearAllNotes = () => {
    if (confirm('Are you sure you want to delete all notes? This action cannot be undone.')) {
        notes.value = []
        saveNotes()
    }
}

const saveNotes = () => {
    notes.value.forEach(note => {
        note.updatedAt = new Date()
    })
    
    localStorage.setItem('dev-banane-notes', JSON.stringify(notes.value))
}

const loadNotes = () => {
    const saved = localStorage.getItem('dev-banane-notes')
    if (saved) {
        try {
            const parsed = JSON.parse(saved)
            notes.value = parsed.map((note: any) => ({
                ...note,
                createdAt: new Date(note.createdAt),
                updatedAt: new Date(note.updatedAt)
            }))
        } catch (error) {
            console.error('Failed to load notes:', error)
            notes.value = []
        }
    }
}

const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const formatDate = (date: Date): string => {
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    
    if (isToday) {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }
    
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    })
}

const formatTime = (date: Date): string => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 1) return 'now'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const handleTextareaInput = (event: Event) => {
    saveNotes()
    autoResize(event)
}

const autoResize = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(120, Math.max(60, textarea.scrollHeight)) + 'px'
}

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen.value) {
        closeModal()
    }
}

onMounted(() => {
    loadNotes()
    document.addEventListener('keydown', handleKeydown)
})
</script>