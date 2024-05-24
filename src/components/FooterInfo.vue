<template>
  <footer v-if="!is_none" class="bg_blue">
    <div class="py-2 pb-3 pb-lg-0">
      <div class="container d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-center">
        <div class="">
          <a class="text-white link hover-btn" href="https://cps.tver.ru/" target="_blank">
            <img src="../assets/img/logo-cps.png" style="max-width: 300px">
            <!-- ©️ НИИ "Центрпрограммсистем", 2023г. -->
          </a>
        </div>
        <div class="d-none d-md-block">
          <img style="width: 100px;" src="../assets/img/tg_qr_code.png" alt="telegram qr-code">
        </div>
        <div class="text-white d-flex flex-column gap-2 py-2">
          <div>
            <p class="m-0">Почта для связи: <a class="text-white link hover-btn" href="mailto:nwstep@internet.ru" target="_blank">nwstep@internet.ru</a></p>
          </div>
          <div class="">
              <router-link class="text-white link hover-btn" to='/call-back'>
                  Форма обратной связи
              </router-link>
          </div>
          <div>
            <router-link class="text-white link hover-btn" to="/page/privacy">
              Политика обработки персональных данных
            </router-link>
          </div>
          <div>
            <p class="">
              Телеграм-канал проекта: <a class="text-white link hover-btn" href="https://t.me/tverchamp" target="_blank">@tverchamp</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { loginText } from '../texts/login.text'
export default {
  data() {
    return {
      loginText: {}
    }
    
  },
  created(){
    this.loginText = loginText;
  },
  methods: {
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    is_none() {
      return !this.loggedIn || this.$route.path === 'LK/set-user-skills' || this.$route.path === '/reg'
    }
  }
}


</script>

<style scoped>
</style>