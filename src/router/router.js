import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage';

//General
import TemplatePage from '../components/General/TemplatePage';
import NewsPage from "../components/General/NewsPage";

//CoreSystemComponentsForUser
import LoginPage from '../components/CoreSystemComponentsForUser/LoginPage';
import RegPage from '../components/CoreSystemComponentsForUser/RegPage';
import SettingPage from '../components/CoreSystemComponentsForUser/SettingPage';
import ForgotPasswordPage from '../components/CoreSystemComponentsForUser/ForgotPasswordPage';
import CallBackForm from '../components/CoreSystemComponentsForUser/CallBackForm';

//UserPersonalCabinet
import LK from '../components/UserPersonalCabinet/LK';
import ProfileUser from '../components/UserPersonalCabinet/ProfileUser';
import SetUserSkills from '../components/UserPersonalCabinet/SetUserSkills';
import PasswordChange from '../components/UserPersonalCabinet/PasswordChange';

//Event
import EventPage from '../components/Event/EventPage';
import TeamPage from '../components/Event/TeamPage';
import UserTeams from '../components/Event/UserTeams';
import UserTaskList from '../components/Event/UserTaskList';
import UserTask from '../components/Event/UserTask';

//Project
// import ProjectsPage from '../components/Projects/ProjectsPage';
// import CreateProject from '../components/Projects/CreateProject';


export const router = createRouter({
    routes: [
        {
            path: '/',
            component: MainPage,
        },
        {
            path: '/call-back',
            component: CallBackForm,
            name: 'callBackForm',
            props: true
        },
        {
            path: '/login',
            component: LoginPage
        },
        // {
        //     path: '/projects',
        //     component: ProjectsPage
        // },
        // {
        //     path: '/create-project',
        //     component: CreateProject
        // },
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
        {
            path: '/page/:name',
            component: TemplatePage,
            name: 'templatePage'
        },
        {
            path: '/event/:id',
            name: 'eventPage',
            component: EventPage
        },
        {
            path: '/LK',
            component: LK,
            children: [
                { path: '', component: ProfileUser },
                {
                    path: 'change-password',
                    component: PasswordChange
                },
                {
                    path: 'set-user-skills',
                    name: 'setUserSkills',
                    component: SetUserSkills
                },
                { path: 'my-teams', component: UserTeams },
                {
                    path: 'my-teams/:id',
                    name: 'team',
                    component: TeamPage
                },
                { path: 'my-tasks', component: UserTaskList },
                {
                    path: 'my-tasks/:id',
                    name: 'task',
                    component: UserTask
                },
                {
                    path: 'my-tasks/:hash',
                    name: 'tasks',
                    component: UserTaskList
                },

            ]
        },
        {
            path: '/news',
            component: NewsPage
        },
        {
            path: '/:catchAll(.*)',
            component: MainPage
        }
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const publicPages = [
        '/reg', '/login', '/setting-page-verifice-acc', 
        '/forgot-password', '/call-back', '/news'
    ];
    const publicRoutes = [
        '/page/'
    ];

    const authRequired = publicPages.includes(to.path) || publicRoutes.find(el => to.path.startsWith(el));
    const loggedIn = localStorage.getItem('access');

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