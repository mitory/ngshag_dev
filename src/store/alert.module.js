export const alert = {
    namespaced: true,
    state: {
        is_show: false,
        message: '',
        type: ''
    },
    mutations: {
        showMessage(state, { message, type }) {
            console.log('Алерт появился')
            state.message = message
            state.type = type
            state.is_show = true
        },
        hiddenMessage(state) {
            console.log('Алерт пропал')
            state.is_show = false
            state.type = ''
            state.message = ''
        }
    },
    actions: {
        sendMessage({ commit }, { message, type }) {
            commit('showMessage', { message, type })
            setTimeout(() => { commit('hiddenMessage') }, 2000);
        }
    }
};