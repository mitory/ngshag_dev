export const modalJoinTeam = {
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
            state.id_nom = obj.id_nom;
            state.event_id = obj.event_id;
          },
          closeModal(state) {
            state.isOpen = false;
            state.content = '';
            state.id_nom = 0;
            state.event_id = 0;
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