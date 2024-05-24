import { authService } from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    },
    actions: {
        login({ commit }, user) {
            return authService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                },
                error => {
                    commit('loginFailure');
                    authService.logout();
                    throw error
                }
            );
        },
        logout({ commit }, redirect = false) {
            console.log(redirect)
            authService.logout(redirect);
            commit('logout');
        },
        register({ commit }, user) {
            return authService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return response;
                })
        }
    }
};