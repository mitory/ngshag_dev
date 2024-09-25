import { authService } from '../services/auth.service';

export const auth = {
    namespaced: true,
    state: {
            status: {
                loggedIn: false
            }
        },
    mutations: {
        loginSuccess(state) {
            state.status.loggedIn = true;
        },
        logout(state) {
            state.status.loggedIn = false;
        },
    },
    actions: {
        setup({ commit }) {
            const access = JSON.parse(localStorage.getItem('access'));
            if(access) {
                commit('loginSuccess');
            }
        },
        login({ commit }, user) {
            return authService.login(user).then(
                response => {
                    localStorage.setItem('access', JSON.stringify(response));
                    commit('loginSuccess');
                },
                error => {
                    console.log(error)
                    commit('logout');
                    throw error
                }
            );
        },
        logout({ commit }, redirect = false) {
            localStorage.removeItem('user_data');
            localStorage.removeItem('access');
            commit('logout');
            authService.logout(redirect);
        },
    }
};