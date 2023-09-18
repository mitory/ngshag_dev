export const routes = {
    namespaced: true,
    state: {
        isRegPage: false,
        isLoginPage: false,
        isProfilePage: false,
        isMainPage: true
    },
    mutations: {
        toMainPage(state) {
            state.isRegPage = true
            state.isLoginPage = true
            state.isProfilePage = true

            state.isMainPage = false
        },
        toRegPage(state) {
            state.isLoginPage = true
            state.isMainPage = true

            state.isRegPage = false
            state.isProfilePage = false
        },
        toLoginPage(state) {
            state.isMainPage = true
            state.isRegPage = true

            state.isProfilePage = false
            state.isLoginPage = false
        },
        toProfilePage(state) {
            state.isMainPage = true

            state.isProfilePage = false
            state.isLoginPage = false
            state.isRegPage = false
        },
        toOtherPageWithoutLogin(state) {
            state.isMainPage = true
            state.isLoginPage = true
            state.isRegPage = true

            state.isProfilePage = false
        },
        toOtherPageWithLogin(state) {
            state.isMainPage = true
            state.isProfilePage = true

            state.isLoginPage = false
            state.isRegPage = false
        }

    },
    actions: {}
}