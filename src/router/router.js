'use strict';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/components/LoginPage.vue';
import HomePage from '@/components/HomePage.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import BackLoginPage from '@/components/BackLoginPage.vue';
import StorePage from '@/components/HomeChildrenCmp/StorePage.vue';
import UploadPage from '@/components/HomeChildrenCmp/UploadPage.vue';

const router = new createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: 'login' },
        {
            path: '/home',
            component: HomePage,
            children: [
                { name: 'home', path: '', redirect: '/home/store' },
                { name: 'store', path: 'store', component: StorePage },
                { name: 'upload', path: 'upload', component: UploadPage },
            ],
        },
        { name: 'login', path: '/login', component: LoginPage },
        { name: 'loading', path: '/loading', component: LoadingPage },
        { name: 'back', path: '/back', component: BackLoginPage },
    ],
});

export default router;
