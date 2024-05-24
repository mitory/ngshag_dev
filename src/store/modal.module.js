export const modal = {
    namespaced: true,
    state: {
        isOpen: false,
        content: ''
    },
    mutations: {
        openModal(state, content) {
            state.isOpen = true;
            state.content = content;
          },
          closeModal(state) {
            state.isOpen = false;
            state.content = '';
          }
    },
    actions: {
        openModal({ commit }, content) {
            commit('openModal', content);
        },
        closeModal({ commit }) {
            commit('closeModal');
        }
    }
};