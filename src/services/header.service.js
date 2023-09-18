import store from '../store/store'

export const headerService = {
    setHeaderButtonsOtherPage, loggedIn
};

function setHeaderButtonsOtherPage() {
    if (loggedIn()) {
        store.commit('routes/toOtherPageWithLogin')
    } else {
        store.commit('routes/toOtherPageWithoutLogin')
    }
}

function loggedIn() {
    return store.state.auth.status.loggedIn
}