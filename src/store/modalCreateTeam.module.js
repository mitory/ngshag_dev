export const modalCreateTeam = {
    namespaced: true,
    state: {
        isOpen: false,
        content: '',
        event_id: 0,
        id_nom: 0
    },
    mutations: {
        openModal(state, obj) {
            state.isOpen = true;
            state.content = obj.content;
            state.event_id = obj.event_id;
            state.id_nom = obj.id_nom;
          },
          closeModal(state) {
            state.isOpen = false;
            state.content = '';
            state.event_id = 0;
            state.id_nom = 0;
          }
    },
    actions: {
        openModal({ commit }, obj) {
            commit('openModal', obj);
        },
        closeModal({ commit }) {
            commit('closeModal');
        }
    }
};