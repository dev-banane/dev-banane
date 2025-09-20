<template>
    <div class="min-h-screen bg-zinc-900">
        <main class="pt-0 max-w-none mx-0 px-0">
            <section id="about-hero" class="relative min-h-screen bg-black flex items-center overflow-hidden">
                <div class="max-w-7xl mx-auto px-8 w-full">
                    <div class="flex gap-16 items-center">
                        <div class="flex-1 space-y-8">
                            <h1 class="text-6xl lg:text-8xl font-black text-white leading-none">
                                About Me <span class="inline-block transition-all duration-300 hover:scale-110 hover:rotate-12 text-yellow-400 cursor-default">👋</span>
                            </h1>
                            <p class="text-2xl lg:text-3xl text-zinc-300 font-light" style="font-family: 'Michroma', sans-serif;">
                                Get to know the person behind the code
                            </p>
                        </div>
                        <div class="hidden lg:block">
                            <img
                                src="/pfp.webp"
                                alt="Jakob"
                                class="w-96 h-96 rounded-full border-4 border-zinc-700/50 shadow-2xl object-cover"
                            />
                        </div>
                    </div>
                </div>
                
                <svg class="absolute bottom-0 w-full h-24 fill-[#1b1b1e] z-0" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"></path>
                </svg>
            </section>

            <section class="relative pb-52 pt-24 bg-[#1b1b1e] overflow-hidden">
                <div class="max-w-6xl mx-auto px-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div class="space-y-8">
                            <h2 class="text-5xl lg:text-7xl font-black text-white">
                                My Story
                            </h2>
                            <div class="space-y-6">
                                <p class="text-xl text-zinc-300 leading-relaxed" style="font-family: 'Gabarito', sans-serif;">
                                    I'm a 16-year-old <span class="font-bold italic text-white">full-stack developer</span> from Germany with a passion for creating digital experiences that matter.
                                    What started as curiosity about how websites work has evolved into a deep love for programming and technology.
                                </p>
                                <p class="text-xl text-zinc-300 leading-relaxed" style="font-family: 'Gabarito', sans-serif;">
                                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                                    or thinking about the next big idea to bring to life.
                                </p>
                            </div>
                        </div>
                        <div class="hidden lg:block">
                            <img
                                src="/assets/3d.webp"
                                alt="Jakob"
                                class="w-96 h-96 object-cover ml-36"
                            />
                        </div>
                    </div>
                </div>

                <svg class="absolute bottom-0 w-full h-24 fill-black z-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 Q720,0 1440,60 L1440,120 L0,120 Z"></path>
                </svg>
            </section>

            <section class="relative pt-20 pb-56 bg-black overflow-hidden">
                <div class="max-w-6xl mx-auto px-8">
                    <div class="text-center mb-16">
                        <h2 class="text-5xl lg:text-7xl font-black text-white mb-6">
                            My Journey
                        </h2>
                        <p class="text-xl text-zinc-300 max-w-2xl mx-auto" style="font-family: 'Gabarito', sans-serif;">
                            The path that led me to where I am today.
                        </p>
                    </div>

                    <div class="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-8">
                        <div class="space-y-8">
                            <div class="flex items-center gap-6">
                                <div class="w-16 h-16 bg-zinc-700/50 border border-zinc-600/50 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                    2021
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-white font-bold text-xl mb-2">Started with fundamentals</h4>
                                    <p class="text-zinc-300 text-lg">HTML, CSS, and the basics of Python</p>
                                </div>
                            </div>
                            <div class="w-full h-px bg-zinc-700/50"></div>
                            <div class="flex items-center gap-6">
                                <div class="w-16 h-16 bg-zinc-700/50 border border-zinc-600/50 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                    2024
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-white font-bold text-xl mb-2">Discovered JavaScript</h4>
                                    <p class="text-zinc-300 text-lg">Building interactive applications and learning programming logic</p>
                                </div>
                            </div>
                            <div class="w-full h-px bg-zinc-700/50"></div>
                            <div class="flex items-center gap-6">
                                <div class="w-16 h-16 bg-zinc-700/50 border border-zinc-600/50 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                    2024
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-white font-bold text-xl mb-2">Discovered Java for myself</h4>
                                    <p class="text-zinc-300 text-lg">Diving into Java and exploring its ecosystem</p>
                                </div>
                            </div>
                            <div class="w-full h-px bg-zinc-700/50"></div>
                            <div class="flex items-center gap-6">
                                <div class="w-16 h-16 bg-zinc-700/50 border border-zinc-600/50 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                    2025
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-white font-bold text-xl mb-2">Full-stack development</h4>
                                    <p class="text-zinc-300 text-lg">React, Node.js, databases, and complex project architecture</p>
                                </div>
                            </div>
                            <div class="w-full h-px bg-zinc-700/50"></div>
                            <div class="flex items-center gap-6">
                                <div class="w-16 h-16 bg-white border border-zinc-300 rounded-full flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
                                    Now
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-white font-bold text-xl mb-2">Continuous growth</h4>
                                    <p class="text-zinc-300 text-lg">Building innovative solutions and exploring new technologies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <svg class="absolute bottom-0 w-full h-24 fill-[#1b1b1e]" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z"></path>
                </svg>
            </section>

            <section class="relative pt-20 pb-24 bg-[#1b1b1e]">
                <div class="max-w-6xl mx-auto px-8">
                    <div class="text-center space-y-8">
                        <h2 class="text-5xl lg:text-7xl font-black text-white">
                            Let's Connect
                        </h2>
                        <p class="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed" style="font-family: 'Gabarito', sans-serif;">
                            I'm always open to new opportunities, collaborations, and interesting conversations about technology.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <router-link
                                to="/contact"
                                class="inline-block px-8 py-4 bg-white text-zinc-900 font-bold rounded-full hover:bg-zinc-100 transition-colors"
                            >
                                Get In Touch
                            </router-link>
                            <router-link
                                to="/projects"
                                class="inline-block px-8 py-4 border border-white text-white hover:bg-white hover:text-zinc-900 font-bold rounded-full transition-colors"
                            >
                                View My Work
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
