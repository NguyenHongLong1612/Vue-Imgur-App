'use strict';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import HomePage from '@/components/HomePage.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import BackLoginPage from '@/components/BackLoginPage.vue';

const router = new createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: 'login' },
        {
            name: 'home',
            path: '/home',
            component: HomePage,
        },
        { name: 'login', path: '/login', component: LoginPage },
        { name: 'loading', path: '/loading', component: LoadingPage },
        { name: 'back', path: '/back', component: BackLoginPage },
    ],
});

export default router;
