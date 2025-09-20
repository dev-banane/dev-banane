<script setup>
import Navbar from './components/Navbar.vue';
import Terminal from './components/Terminal.vue';
</script>

<template>
    <Navbar />
    <router-view />
    <Terminal />
</template>