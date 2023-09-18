import { createStore } from "vuex";
import { auth } from "./auth.module";
import { routes } from './routes.modul'

const store = createStore({
    modules: {
        auth,
        routes
    },
});

export default store;