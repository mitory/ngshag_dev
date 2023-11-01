import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage'
import MainPage from '../components/MainPage'

import ForgotPasswordPage from '../components/ForgotPasswordPage'
// import UserTaskList from '../components/UserTaskList'
import UserTask from '../components/UserTask'

export const router = createRouter({
    routes: [
        {
            path: '/',
            component: MainPage,
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/forgot-password',
            component: ForgotPasswordPage
        },
        // { path: '/my-tasks', component: UserTaskList },
        {
            path: '/my-tasks/:id',
            name: 'task',
            component: UserTask
        },
        {
            path: '/:catchAll(.*)',
            component: MainPage
        }
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/forgot-password'];
    // const publicStartPath = ['/event/'];
    const authRequired = publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    // && publicStartPath.filter(str => to.path.startsWith(str)).length == 0
    if (!to.hash) {
        window.scrollTo(0, 0);
    }
    if (!authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});



export default router