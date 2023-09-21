import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage'
import ProfileUser from '../components/ProfileUser'
import MainPage from '../components/MainPage'
import RegPage from '../components/RegPage'
import EventPage from '../components/EventPage'
import RegTeamPage from '../components/RegTeamPage'
import InviteToTeamPage from '../components/InviteToTeamPage'
import TeamPage from '../components/TeamPage'
import LK from '../components/LK'
import UserTeams from '../components/UserTeams'
import SetUserSkills from '../components/SetUserSkills'

const router = createRouter({
    routes: [
        {
            path: '/',
            component: MainPage
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/reg',
            component: RegPage,
            props: (route) => ({ source: route.query.source })
        },
        {
            path: '/set-user-skills',
            component: SetUserSkills
        },
        {
            path: '/profile',
            component: ProfileUser
        },
        {
            path: '/event/:id_event',
            name: 'eventPage',
            component: EventPage
        },
        {
            path: '/reg-team/:id_event',
            name: 'regTeamPage',
            component: RegTeamPage
        },
        {
            path: '/invite-to-team',
            component: InviteToTeamPage
        },
        {
            path: '/LK',
            component: LK,
            children: [
                { path: '', component: ProfileUser },
                { path: 'my-teams', component: UserTeams },
                {
                    path: '/my-teams/:id',
                    name: 'team',
                    component: TeamPage
                },
            ]
        },
        {
            path: '/:catchAll(.*)',
            component: MainPage
        }
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/reg', '/login', '/set-user-skills'];
    // const publicStartPath = ['/event/'];
    const authRequired = publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    // && publicStartPath.filter(str => to.path.startsWith(str)).length == 0
    if (!authRequired && !loggedIn) {
        next('/reg');
    } else {
        next();
    }
});

export default router;