import { createApp } from 'vue'
import App from './App.vue'
import VueScrollTo from 'vue-scrollto'
import router from './router/router'
import store from './store/store'
import { SmartCaptchaPlugin } from 'vue3-smart-captcha'

const app = createApp(App);

app.use(router)
    .use(store)
    .use(VueScrollTo)
    .use(SmartCaptchaPlugin)
    .mount('#app');

app.config.errorHandler = (err, instance, info) => {
    console.log('errorHandler')
    console.log(err)
    console.log(instance)
    console.log(info)
}

window.onerror = function(message, source, lineno, colno, error) {
    console.log('onerror')
    console.log(message)
    console.log(source)
    console.log(lineno)
    console.log(colno)
    console.log(error)
  };



