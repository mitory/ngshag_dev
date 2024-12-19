import { createApp } from 'vue'
import App from './App.vue'
import VueScrollTo from 'vue-scrollto'
import router from './router/router'
import store from './store/store'



const app = createApp(App);

app.use(router)
    .use(store)
    .use(VueScrollTo)
    .mount('#app');



