import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage'
import ProfileUser from '../components/ProfileUser'
import MainPage from '../components/MainPage'
import RegPage from '../components/RegPage'
// import EventPage from '../components/EventPage'
// import RegTeamPage from '../components/RegTeamPage'
// import InviteToTeamPage from '../components/InviteToTeamPage'
import TeamPage from '../components/TeamPage'
import LK from '../components/LK'
import UserTeams from '../components/UserTeams'
import SetUserSkills from '../components/SetUserSkills'
import AboutProject from '../components/AboutProject'
import PoliciesAndProcedures from "../components/PoliciesAndProcedures";
import SettingPage from '../components/SettingPage'
import PasswordChange from '../components/PasswordChange'
import ForgotPasswordPage from '../components/ForgotPasswordPage'

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
        {
            path: '/setting-page-verifice-acc',
            component: SettingPage,
            props: (route) => ({ id: route.query.id, key_link: route.query.key_link })
        },
        {
            path: '/reg',
            component: RegPage,
            props: (route) => ({ source: route.query.source })
        },
        // {
        //     path: '/event/:id_event',
        //     name: 'eventPage',
        //     component: EventPage
        // },
        // {
        //     path: '/reg-team/:id_event',
        //     name: 'regTeamPage',
        //     component: RegTeamPage
        // },
        // {
        //     path: '/invite-to-team',
        //     component: InviteToTeamPage
        // },
        {
            path: '/about-project',
            component: AboutProject
        },
        {
            path: '/LK',
            component: LK,
            children: [
                { path: '', component: ProfileUser },
                {
                    path: '/change-password',
                    component: PasswordChange
                },
                {
                    path: '/set-user-skills',
                    name: 'setUserSkills',
                    component: SetUserSkills
                },
                { path: 'my-teams', component: UserTeams },
                {
                    path: '/my-teams/:id',
                    name: 'team',
                    component: TeamPage
                },
            ]
        },
        {
            path: '/policies-and-procedures',
            component: PoliciesAndProcedures
        },
        {
            path: '/:catchAll(.*)',
            component: MainPage
        }
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/reg', '/login', '/setting-page-verifice-acc', '/forgot-password'];
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

export default router