<template>
  <div class="templ_bg bg__blue">
    <div class="container">
      <div class="row d-flex flex-column-reverse flex-lg-row align-items-center justify-content-evenly" style="min-height: 100vh">
          <form @submit.prevent="loginUser" novalidate class="my-auto form-template py-2">
            <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="generalText.header"></h2>

            <div class="mb-3 input-box">
              <label for="email" class="form-label">Email</label>
              <input v-model="email" type="email" class="input"
                    id="email"
                    v-bind:class="{ 'border-danger': !(isCorrect.email)}" style="width: 100%;">
            </div>


            <div class="mb-3 pass-eye">
              <label for="password" class="form-label">Пароль</label>
              <input v-model="password"
                  :type="isShowPass ? 'text' : 'password'"
                  class="input pass-eye__inp" id="password"
                  :class="{ 'border-danger': !this.isCorrect.password }" style="width: 100%;">

              <span @click="isShowPass = !isShowPass"
                  class="pass-eye__btn" :class="{ 'active': isShowPass }"></span>
            </div>
        
            <div class="d-flex justify-content-center mb-2 align-items-center">
              <router-link to="/forgot-password" class="me-3 text-white link hover-btn">{{ loginText.forgot_pass_button }}</router-link>
              <button type="submit" class="btn btn-primary">{{ loginText.login_button }}</button>
            </div>

            <div class="d-flex justify-content-center align-items-center">
              <p class="my-auto"> {{ loginText.button_to_reg_about }}
                <router-link class="text-white link hover-btn" to="/reg">
                    {{ loginText.button_to_reg }}
                </router-link>
              </p>
            </div>

            <div class="d-flex justify-content-center align-items-center">
              <p class="my-0 mt-1">{{ loginText.button_to_question_about }}
                <router-link class="text-white link hover-btn" to='/call-back'>
                    {{ loginText.button_to_question }}
                </router-link>
              </p>
            </div>

            <div class="d-flex justify-content-center align-items-center">
              <p class="my-0 mt-1">{{ loginText.email_contact_about }}
                <a class="text-white link hover-btn" :href="'mailto:' + generalText.email_contact" target="_blank">{{ generalText.email_contact }}</a>
              </p>
            </div>

          </form>
          <NewsBar class="col-lg-3 mb-3 mb-sm-0" :classes="'flex-lg-column'"></NewsBar>
        </div>
    </div>
  </div>
</template>

<script>
import { validateService } from '../services/validate.service'
import NewsBar from "@/components/NewsBar";

import { generalText } from '../texts/general.text'
import { loginText } from '../texts/login.text'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      isShowPass: false,
      isCorrect: {
        email: true,
        password: true
      },
      email_changed: false,
      password_changed: false,
      generalText: {},
      loginText: {}
    }
  },
  components: {
    NewsBar
  },
  created() {
    this.$store.dispatch('auth/logout');
    this.generalText = generalText;
    this.loginText = loginText;
  },
  methods: {
    loginUser() {
      const { email, password } = this

      if (!this.checkData()) {
        return false;
      }

      this.$store.dispatch("auth/login", { email, password }).then(
        () => {
          this.$store.dispatch('alert/sendMessage', { message: 'Авторизация прошла успешно', type: 'Success' })
          this.$store.dispatch("notify/start")
          this.$router.push("/");
        }).catch(err => {
          this.$store.dispatch('alert/sendMessage', { message: err, type: 'Danger' });
        })
    },

    checkData() {
      this.isCorrect.email = validateService.checkIsEmail(this.email)
      this.isCorrect.password = !validateService.checkIsEmptyStr(this.password)

      return this.isCorrect.email && this.isCorrect.password
    },
  }
}
</script>


<style>
  
</style>

<style scoped>
</style>