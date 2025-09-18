import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/Home.vue';
import About from '../components/pages/About.vue';
import Projects from '../components/pages/Projects.vue';
import Contact from '../components/pages/Contact.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/projects', name: 'Projects', component: Projects },
    { path: '/contact', name: 'Contact', component: Contact },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;