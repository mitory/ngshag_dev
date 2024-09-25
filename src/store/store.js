import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { auth } from "./auth.module";
import { alert } from './alert.module'
import { modal } from './modal.module'
import { modalCreateTeam } from './modalCreateTeam.module'
import { modalJoinTeam } from './modalJoinTeam.module'
import { notify } from './notify.module'
import { loading } from './loading.module'

const store = createStore({
    modules: {
        auth, alert, modal, modalCreateTeam, 
        modalJoinTeam, notify, loading
    },
    plugins: [
        createPersistedState({
            paths: ['modal']
        })
    ]
});

export default store;