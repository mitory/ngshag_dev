export const loading = {
    namespaced: true,
    state: {
        isShow: false,
        count: 0
    },
    mutations: {
        showLoading(state) {
            state.count++;
            state.isShow = true;
        },
        hideLoading(state) {
            state.count--;
            if(!state.count) state.isShow = false;
            
        }
    },
    actions: {
        show({ commit }) {
            commit('showLoading');
        },
        hide({ commit }) {
            commit('hideLoading');
        }
    }
};