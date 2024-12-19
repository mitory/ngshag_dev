export const routes = {
    namespaced: true,
    state: {
        isProfilePage: false,
    },
    mutations: {
        toMainPage(state) {
            state.isProfilePage = true
        },
        toProfilePage(state) {
            state.isProfilePage = false
        },
        toOtherPageWithLogin(state) {
            state.isProfilePage = true
        }

    },
    actions: {}
}