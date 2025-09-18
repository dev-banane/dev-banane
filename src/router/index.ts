import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/Home.vue';
import About from '../components/pages/About.vue';
import Projects from '../components/pages/Projects.vue';
import Contact from '../components/pages/Contact.vue';
import NotFound from '../components/pages/NotFound.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/projects', name: 'Projects', component: Projects },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 };
    },
});

export default router;