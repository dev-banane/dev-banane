<template>
    <div class="min-h-screen bg-black">
        <main class="pt-0 max-w-none mx-0 px-0">
            <section
                id="about-hero"
                class="pt-16 pb-8 md:pt-32 md:pb-16 flex flex-col items-center justify-center w-full bg-gradient-to-br from-blue-200 via-indigo-300 to-rose-300 min-h-[40vh]"
            >
                <div class="text-center px-6 md:px-8">
                    <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 md:mb-6 drop-shadow-lg leading-tight">
                        About Me
                    </h1>
                    <p class="text-gray-700 text-lg sm:text-xl md:text-2xl mb-3 font-semibold leading-relaxed max-w-4xl mx-auto" style="font-family: 'Michroma', sans-serif;">
                        Get to know the person behind the code
                    </p>
                </div>
            </section>

            <section class="w-full py-20 bg-black relative">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
                
                <div class="relative z-10 max-w-6xl mx-auto px-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        <div class="flex justify-center lg:justify-start">
                            <img
                                src="/pfp.webp"
                                alt="Jakob"
                                class="w-80 h-80 rounded-full border-4 border-white/20 shadow-xl object-cover"
                            />
                        </div>
                        <div class="flex flex-col justify-center">
                            <h2 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6" style="line-height: 115%;">
                                Hi, I'm Jakob!👋
                            </h2>
                            <div class="space-y-4 text-gray-300 text-lg leading-relaxed">
                                <p>
                                    I'm a 16-year-old developer from Germany with a passion for creating digital experiences that matter.
                                    What started as curiosity about how websites work has evolved into a deep love for programming and technology.
                                </p>
                                <p>
                                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                                    or thinking about the next big idea to bring to life.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mb-20 pt-12">
                        <h3 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-8" style="line-height: 1.5em;">My Journey</h3>
                        <div class="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <div class="space-y-8">
                                <div class="flex items-center gap-6">
                                    <div class="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center text-white/80 font-medium text-sm flex-shrink-0">2021</div>
                                    <div class="flex-1">
                                        <h4 class="text-white font-medium text-lg mb-1">Started with fundamentals</h4>
                                        <p class="text-gray-400 text-base">HTML, CSS, and the basics of python</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6">
                                    <div class="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center text-white/80 font-medium text-sm flex-shrink-0">2024</div>
                                    <div class="flex-1">
                                        <h4 class="text-white font-medium text-lg mb-1">Discovered JavaScript</h4>
                                        <p class="text-gray-400 text-base">Building interactive applications and learning programming logic</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6">
                                    <div class="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center text-white/80 font-medium text-sm flex-shrink-0">2024</div>
                                    <div class="flex-1">
                                        <h4 class="text-white font-medium text-lg mb-1">Discovered Java for myself</h4>
                                        <p class="text-gray-400 text-base">Diving into Java and exploring its ecosystem</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6">
                                    <div class="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center text-white/80 font-medium text-sm flex-shrink-0">2025</div>
                                    <div class="flex-1">
                                        <h4 class="text-white font-medium text-lg mb-1">Full-stack development</h4>
                                        <p class="text-gray-400 text-base">React, Node.js, databases, and complex project architecture</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6">
                                    <div class="w-12 h-12 border-2 border-blue-400/40 rounded-full flex items-center justify-center text-blue-400 font-medium text-sm flex-shrink-0">Now</div>
                                    <div class="flex-1">
                                        <h4 class="text-white font-medium text-lg mb-1">Continuous growth</h4>
                                        <p class="text-gray-400 text-base">Building innovative solutions and exploring new technologies</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="w-full bg-black relative pb-24">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />
                <div class="relative z-10 text-center px-6">
                    <h3 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                        Let's Work Together
                    </h3>
                    <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        I'm always open to new opportunities, collaborations, and interesting conversations about technology.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            class="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-lg shadow-white/20"
                        >
                            Get In Touch
                        </a>
                        <a
                            href="/projects"
                            class="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/15 hover:border-white/30"
                        >
                            View My Work
                        </a>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
