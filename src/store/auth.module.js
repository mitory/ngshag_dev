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
                    alert(error)
                    commit('loginFailure');
                    authService.logout();
                    location.reload(true);
                }
            );
        },
        logout({ commit }) {
            authService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return authService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return response;
                }).catch(() => {
                    commit('registerFailure');
                })
        },
        sendEducationReport({commit}, source){
            return authService.sendEducationReport(source).then(
                response => {
                    commit('sendEducationSuccess');
                    return response;
                }).catch(() => {
                commit('sendEducationFailure');
                })
        }
    }
};