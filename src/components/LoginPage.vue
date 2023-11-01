<template>
  <div class="container">
    <div class="d-flex flex-column justify-content-center" style="height: 100vh">
      <div class="col-sm-8 mx-auto mb-2 mb-lg-5 ">
        <h2 class="d-none d-lg-block text-primary mb-3 text-center">
          НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
        </h2>
        <h2 class="d-none d-lg-none d-md-block text-primary mb-3 text-center fs-4">
          НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
        </h2>
        <h2 class="d-md-none d-block text-primary mb-3 text-center fs-6">
          НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
        </h2>
      </div>
      <div class="d-flex flex-sm-row justify-content-around flex-column-reverse">
        <div class="col-sm-3"></div>
        <div class="col-sm-4 mx-auto">
          <form @submit.prevent="loginUser" novalidate>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input @change="emailChanged" v-model="email" type="text" class="form-control" id="email"
                v-bind:class="{ 'border-danger': !(isCorrect.email) && email_changed }">
              <div v-if="!(isCorrect.email) && email_changed" id="email" class="form-text text-danger">
                Введи корректный email. Например test@mail.ru
              </div>
            </div>

            <div class="mb-3 pass-eye">
              <label for="password" class="form-label">Пароль</label>
              <input @change="passwordChanged" v-model="password" :type="isShowPass ? 'text' : 'password'"
                class="form-control pass-eye__inp" id="password"
                v-bind:class="{ 'border-danger': !(isCorrect.password) && password_changed }">
              <span @click="isShowPass = !isShowPass" class="pass-eye__btn"
                :class="{ 'active': isShowPass, 'spacing-minus': !(isCorrect.password) && password_changed }"></span>

              <div v-if="!(isCorrect.password) && password_changed" id="password" class="form-text text-danger">
                Пароль не может быть пустым!
              </div>
            </div>

            <div class="d-flex justify-content-between">
              <router-link to="/forgot-password" class="btn btn-secondary">Забыл пароль</router-link>
              <button type="submit" class="btn btn-primary">Войти</button>
            </div>
          </form>
        </div>
        <NewsBar class="col-sm-3 mb-3 mb-sm-0"></NewsBar>
      </div>
      <div class="col-sm-4 mx-auto px-2 bg-dark bg-gradient text-white text-center text-align-center mt-5 rounded">
        <p>Почта для связи: <a href="mailto:nwstep@internet.ru" target="_blank">nwstep@internet.ru</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { validateService } from '../services/validate.service'
import { publicService } from '../services/public.service'
import NewsBar from "@/components/NewsBar";

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
    }
  },
  components: {
    NewsBar
  },
  created() {
    this.$store.dispatch('auth/logout');
  },
  methods: {
    forgotPassword() {
      this.emailChanged()
      if (this.isCorrect.email) {
        publicService.getSendEmailForChangePass(this.email).then(response => {
          if (response.Ok === 'Ok') {
            this.$store.dispatch('alert/sendMessage', { message: 'Новый пароль вылан на почту', type: 'Success' })
          } else {
            this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Danger' });
          }
        })
      }
    },
    emailChanged() {
      this.isCorrect.email = this.checkEmail(this.email);
      this.email_changed = true;
    },
    passwordChanged() {
      this.isCorrect.password = !validateService.checkIsEmptyStr(this.password);
      this.password_changed = true;
    },
    loginUser() {
      const { email, password } = this

      if (!this.checkData({ email, password })) {
        return false;
      }

      this.$store.dispatch("auth/login", { email, password }).then(
        () => {
          this.$store.dispatch('alert/sendMessage', { message: 'Авторизация прошла успешно', type: 'Success' })
          this.$router.push("/");
        }).catch(err => {
          this.$store.dispatch('alert/sendMessage', { message: err, type: 'Danger' });
        })
    },
    checkData(data) {
      this.isCorrect.email = this.checkEmail(data.email)
      this.isCorrect.password = !validateService.checkIsEmptyStr(data.password)

      return this.isCorrect.email && this.isCorrect.password
    },
    checkEmail(str) {
      return !validateService.checkIsEmptyStr(str) && validateService.checkIsEmail(str)
    },
    /*formUpdated() {
      const { email, password } = this
      this.checkData({ email, password })
    }*/
  }
}
</script>

<style scoped></style>