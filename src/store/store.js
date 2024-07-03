import { createStore } from "vuex";
import { auth } from "./auth.module";
import { alert } from './alert.module'
import { modal } from './modal.module'
import { modalCreateTeam } from './modalCreateTeam.module'
import { modalJoinTeam } from './modalJoinTeam.module'
import { notify } from './notify.module'

const store = createStore({
    modules: {
        auth, alert, modal, modalCreateTeam, 
        modalJoinTeam, notify
    },
});

export default store;