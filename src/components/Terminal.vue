<template>
    <div class="fixed bottom-6 right-6 z-50">
        <button
            @click="toggleModal"
            class="group relative bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 text-black p-4 rounded-full shadow-lg transition-all duration-300 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 hover:scale-110 hover:shadow-xl cursor-pointer"
            :class="{ 'scale-90': isOpen }"
        >
            <Terminal
                class="w-6 h-6 transition-transform duration-200"
                :class="{ 'rotate-12': isOpen }"
            />
            
            <div class="absolute bottom-full right-0 mb-2 px-3 py-1 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none" style="font-family: 'Michroma', sans-serif;">
                Terminal
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
            class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            @click="closeModal"
        />
    </Transition>

    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 translate-y-8 scale-95"
        leave-to-class="opacity-0 translate-y-8 scale-95"
    >
        <div
            v-if="isOpen"
            class="fixed inset-0 flex items-center justify-center z-50 p-4"
            @click.self="closeModal"
        >
            <div
                :class="[
                    'bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex flex-col font-mono text-sm transition-all duration-300',
                    isFullscreen
                        ? 'w-full h-full max-w-none max-h-none'
                        : 'w-[800px] h-[600px] max-w-[90vw] max-h-[90vh]'
                ]"
            >
                <div class="flex items-center justify-between bg-zinc-800 px-4 py-3 rounded-t-xl border-b border-zinc-700">
                    <div class="flex items-center gap-2">
                        <button
                            @click="closeModal"
                            class="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors group relative"
                        >
                            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="w-1.5 h-0.5 bg-red-900 rotate-45"></div>
                                <div class="w-1.5 h-0.5 bg-red-900 -rotate-45 absolute"></div>
                            </div>
                        </button>
                        <button
                            @click="minimizeModal"
                            class="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors group relative"
                        >
                            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="w-1.5 h-0.5 bg-yellow-900"></div>
                            </div>
                        </button>
                        <button
                            @click="toggleFullscreen"
                            class="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors group relative"
                        >
                            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div class="w-1 h-1 border border-green-900"></div>
                            </div>
                        </button>
                    </div>
                    
                    <div class="absolute left-1/2 transform -translate-x-1/2 text-zinc-300 text-sm font-medium">
                        Terminal — root@devbanane: ~
                    </div>
                    
                    <div class="flex items-center gap-2">
                        <button
                            @click="clearTerminal"
                            class="text-zinc-400 hover:text-white transition-colors text-xs px-2 py-1 rounded hover:bg-zinc-700"
                            title="Clear terminal"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div class="flex-1 overflow-y-auto p-4 bg-black text-green-400 space-y-1" ref="terminalContent">
                    <div v-for="(line, index) in terminalHistory" :key="index" class="whitespace-pre-wrap" v-html="line"></div>

                    <div class="flex items-center">
                        <span class="text-blue-400">root@devbanane</span>:<span class="text-blue-600">~</span>$ 
                        <input
                            ref="terminalInput"
                            v-model="currentCommand"
                            @keydown="handleKeydown"
                            class="flex-1 bg-transparent border-none outline-none text-green-400 ml-1 font-mono"
                            placeholder=""
                            autocomplete="off"
                        />
                    </div>
                </div>

                <div class="bg-zinc-800 px-4 py-2 rounded-b-xl border-t border-zinc-700 flex items-center justify-between text-xs text-zinc-400">
                    <div class="flex items-center gap-4">
                        <span>Lines: {{ terminalHistory.length }}</span>
                        <span>History: {{ commandHistory.length }}</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <span>Press Ctrl+` to toggle</span>
                        <span>ESC to close</span>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted, watch } from 'vue'
import { Terminal } from 'lucide-vue-next'

const isOpen = ref(false)
const isFullscreen = ref(false)
const currentCommand = ref('')
const terminalHistory = ref<string[]>([])
const terminalContent = ref<HTMLElement>()
const terminalInput = ref<HTMLInputElement>()
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)

watch(isOpen, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

const commands = {
    help: {
        description: 'Show available commands',
        action: () => {
            return `<span class="text-white">Available commands:
  help       - Show this help message
  clear      - Clear terminal
  whoami     - Display current user
  date       - Show current date and time
  projects   - List my projects
  skills     - Show my technical skills
  contact    - Show contact information
  socials    - Display social media links
  ls         - List directory contents
  cat        - Read file contents
  pwd        - Print working directory
  echo       - Display text
  neofetch   - System information
  exit       - Close terminal

Type any command to get started!</span>`
        }
    },
    clear: {
        description: 'Clear the terminal',
        action: () => {
            terminalHistory.value = []
            return ''
        }
    },
    whoami: {
        description: 'Display current user information',
        action: () => '<span class="text-white">16 y/o full-stack developer from Germany, learning Go, C, and building cool things.</span>'
    },
    date: {
        description: 'Show current date and time',
        action: () => `<span class="text-white">${new Date().toString()}</span>`
    },
    projects: {
        description: 'List my projects',
        action: () => {
            return `<span class="text-white">My Projects:
  • PFControl - Flight-strip management platform (4,500+ users)
  • PFConnect Bot - Discord management bot (250+ servers)
  • PFConnect API - RESTful API with documentation
  • Cephie Snap - Image sharing platform
  • Web Dashboard - Management interface
  
Visit /projects for more details!</span>`
        }
    },
    skills: {
        description: 'Show technical skills',
        action: () => {
            return `<span class="text-white">Technical Skills:
  Frontend: Vue.js, React, TypeScript, JavaScript, HTML, CSS, Tailwind
  Backend: Node.js, Java, Python
  Databases: MongoDB, SQLite, Supabase
  Tools: Git, Discord.js
  
Currently learning: Go, C</span>`
        }
    },
    contact: {
        description: 'Show contact information',
        action: () => {
            return `<span class="text-white">Contact Information:
  Email: jakob@uplift.de
  Discord: bananensammler_
  GitHub: github.com/dev-banane
  
Visit /contact for more ways to reach me!</span>`
        }
    },
    socials: {
        description: 'Display social media links',
        action: () => {
            return `<span class="text-white">Social Media:
  Instagram: @_jakob09
  Discord: bananensammler_
  GitHub: @dev-banane</span>`
        }
    },
    ls: {
        description: 'List directory contents',
        action: () => {
            return `<span class="text-white">drwxr-xr-x  projects/
drwxr-xr-x  skills/
-rw-r--r--  about.md
-rw-r--r--  contact.txt
-rw-r--r--  README.md</span>`
        }
    },
    cat: {
        description: 'Read file contents',
        action: (args: string[]) => {
            const filename = args[0]
            const files: { [key: string]: string } = {
                'about.md': `<span class="text-white"># About Jakob

16-year-old full-stack developer from Germany.
Passionate about creating digital experiences that matter.
Currently working on Cephie and learning Go & C.</span>`,
                'contact.txt': `<span class="text-white">Jakob - Full-stack Developer
Email: jakob@uplift.de
Location: Germany
Status: Available for projects</span>`,
                'README.md': `<span class="text-white"># devbanane

Welcome to my digital space! 🍌

I'm Jakob, a 16-year-old developer building cool stuff.
Check out my projects and let's connect!</span>`
            }
            if (typeof filename === 'string' && filename in files) {
                return files[filename]
            }
            return `<span class="text-red-400">cat: ${filename ?? ''}: No such file or directory</span>`
        }
    },
    pwd: {
        description: 'Print working directory',
        action: () => '<span class="text-white">/root</span>'
    },
    echo: {
        description: 'Display text',
        action: (args: string[]) => `<span class="text-white">${args.join(' ')}</span>`
    },
    neofetch: {
        description: 'System information',
        action: () => {
            return `<span class="text-white">      ,,,,,,,,,,,,              <span class="text-blue-400">root@devbanane</span>
    ,;;;;;;;;;;;;;;;;;,          ------------------
  ;;;;;;;;;;;;;;;;;;;;;;;        <span class="text-yellow-400">OS:</span> BananaOS Linux
 ;;;;;;;;;;;;;;;;;;;;;;;;;;       <span class="text-yellow-400">Host:</span> Portfolio 2025
;;;;;;;;;      ;;;;;;;;;;;;;;     <span class="text-yellow-400">Kernel:</span> Vue.js 3.5.21
;;;;;;;;           ;;;;;;;;;;;;   <span class="text-yellow-400">Uptime:</span> Since 2021
;;;;;;;            ;;;;;;;;;;;    <span class="text-yellow-400">Packages:</span> TypeScript, Node.js
;;;;;;;             ;;;;;;;;;;;   <span class="text-yellow-400">Shell:</span> Terminal Widget
;;;;;;;             ;;;;;;;;;;;   <span class="text-yellow-400">Resolution:</span> Responsive
 ;;;;;;             ;;;;;;;;;;    <span class="text-yellow-400">DE:</span> TailwindCSS
  ;;;;               ;;;;;;;;     <span class="text-yellow-400">Theme:</span> Dark Mode
   ;;                 ;;;;;;      <span class="text-yellow-400">Icons:</span> Lucide Vue
    ;                  ;;;;       <span class="text-yellow-400">Terminal:</span> Custom Built
                        ;;        <span class="text-yellow-400">CPU:</span> Brain (16 years)
                                  <span class="text-yellow-400">Memory:</span> Learning Go, C</span>`
        }
    },
    exit: {
        description: 'Close terminal',
        action: () => {
            closeModal()
            return ''
        }
    }
}

const toggleModal = async () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        if (terminalHistory.value.length === 0) {
            terminalHistory.value.push('<span class="text-yellow-400">Welcome to Banana\'s Terminal! 🍌</span>')
            terminalHistory.value.push('<span class="text-white">Type "help" to see available commands.</span>')
            terminalHistory.value.push('')
        }
        await nextTick()
        focusInput()
    } else {
        isFullscreen.value = false
    }
}

const closeModal = () => {
    isOpen.value = false
    isFullscreen.value = false
    currentCommand.value = ''
}

const minimizeModal = () => {
    closeModal()
}

const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
}

const clearTerminal = () => {
    terminalHistory.value = []
    terminalHistory.value.push('<span class="text-yellow-400">Terminal cleared 🍌</span>')
    terminalHistory.value.push('')
}

const focusInput = () => {
    if (terminalInput.value) {
        terminalInput.value.focus()
    }
}

const scrollToBottom = async () => {
    await nextTick()
    if (terminalContent.value) {
        terminalContent.value.scrollTop = terminalContent.value.scrollHeight
    }
}

const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    terminalHistory.value.push(`<span class="text-blue-400">root@devbanane</span>:<span class="text-blue-600">~</span>$ <span class="text-green-400">${trimmedCommand}</span>`)
    
    commandHistory.value.push(trimmedCommand)
    historyIndex.value = commandHistory.value.length

    const parts = trimmedCommand.split(' ')
    const cmd = (parts[0] ?? '').toLowerCase()
    const args = parts.slice(1)

    if (commands[cmd as keyof typeof commands]) {
        const result = commands[cmd as keyof typeof commands].action(args)
        if (result) {
            terminalHistory.value.push(result)
        }
    } else {
        terminalHistory.value.push(`<span class="text-red-400">bash: ${cmd}: command not found</span>`)
        terminalHistory.value.push('<span class="text-white">Type "help" to see available commands.</span>')
    }

    terminalHistory.value.push('')
    currentCommand.value = ''
    await scrollToBottom()
}

const handleKeydown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        await executeCommand(currentCommand.value)
    } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        if (historyIndex.value > 0) {
            historyIndex.value--
            currentCommand.value = commandHistory.value[historyIndex.value] ?? ''
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (historyIndex.value < commandHistory.value.length - 1) {
            historyIndex.value++
            currentCommand.value = commandHistory.value[historyIndex.value] ?? ''
        } else {
            historyIndex.value = commandHistory.value.length
            currentCommand.value = ''
        }
    } else if (event.key === 'Tab') {
        event.preventDefault()
        const partial = currentCommand.value.toLowerCase()
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial))
        if (matches.length === 1) {
            currentCommand.value = matches[0] ?? ''
        }
    }
}

const handleGlobalKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen.value) {
        closeModal()
    }
    if ((event.ctrlKey || event.metaKey) && event.key === '`') {
        event.preventDefault()
        toggleModal()
    }
    if (event.ctrlKey && event.altKey && (event.key === 'c' || event.key === 'C')) {
        event.preventDefault()
        toggleModal()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleGlobalKeydown)
    document.body.style.overflow = ''
})
</script>