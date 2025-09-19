<script setup>
import Navbar from './components/Navbar.vue';
import NotesWidget from './components/NotesWidget.vue';
</script>

<template>
    <Navbar />
    <router-view />
    <NotesWidget />
</template>
