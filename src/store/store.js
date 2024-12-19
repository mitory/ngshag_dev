import { createStore } from "vuex";
import { auth } from "./auth.module";
import { routes } from './routes.modul'
import { alert } from './alert.module'

const store = createStore({
    modules: {
        auth,
        routes,
        alert
    },
});

export default store;