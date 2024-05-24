import { createStore } from "vuex";
import { auth } from "./auth.module";
import { alert } from './alert.module'
import { modal } from './modal.module'
import { modalCreateTeam } from './modalCreateTeam.module'
import { modalJoinTeam } from './modalJoinTeam.module'

const store = createStore({
    modules: {
        auth, alert, modal, modalCreateTeam, modalJoinTeam
    },
});

export default store;