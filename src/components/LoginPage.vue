<template>
  <div class="container">
    <div class="row" style="height: 100vh">
      <div class="col-sm-4 m-auto">
        <form @change="formUpdated" @submit.prevent="loginUser" novalidate>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="text" class="form-control" id="email"
              v-bind:class="{ 'border-danger': !this.isCorrect.email }">
            <div v-if="!isCorrect.email" id="email" class="form-text text-danger">
              Пожалуйста, введите корректный email. Например test@mail.ru
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input v-model="password" type="password" class="form-control" id="password"
              v-bind:class="{ 'border-danger': !this.isCorrect.password }">

            <div v-if="!isCorrect.password" id="password" class="form-text text-danger">
              Пароль не может быть пустым!
            </div>
          </div>

          <router-link class="btn mb-2" to="/reg">
            Еще нет аккаунта? Тогда зарегестрируйся!
          </router-link>
          <button type="submit" class="btn btn-primary">Войти</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validateService } from '../services/validate.service'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      isCorrect: {
        email: true,
        password: true
      }
    }
  },
  created() {
    this.$store.dispatch('auth/logout');
  },
  methods: {
    loginUser() {
      const { email, password } = this

      if (!this.checkData({ email, password })) {
        return false;
      }

      this.$store.dispatch("auth/login", { email, password }).then(
        () => {
          this.$store.dispatch('alert/sendMessage', { message: 'Авторизация прошла успешно', type: 'Success' })
          this.$router.push("/LK");
        }).catch(err => {
          this.$store.dispatch('alert/sendMessage', { message: err, type: 'Danger' })
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
    formUpdated() {
      const { email, password } = this
      this.checkData({ email, password })
    }
  }
}
</script>

<style scoped></style>