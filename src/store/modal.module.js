export const modal = {
    namespaced: true,
    state: {
        isOpen: false,
        content: '',
        datas: []
    },
    mutations: {
        setupModal(state, modal) {
            state.datas = modal.datas || [];
            state.content = modal.content || '';
            state.isOpen = modal.isOpen || false;
        },
        openModal(state, content) {
            if(state.content !== '') {
                state.datas.push(content)
            } else {
                state.content = content;
            }
            state.isOpen = true;
            
        },
        closeModal(state) {
            if(state.datas.length) {
                state.content = state.datas.shift();
            } else {
                state.isOpen = false;
                state.content = '';
            }
            
        }
    },
    actions: {
        setup({ commit }, modal) {
            commit('setupModal', modal);
        },
        openModal({ commit }, content) {
            commit('openModal', content);
        },
        closeModal({ commit }) {
            commit('closeModal');
        }
    }
};