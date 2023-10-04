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
            <div class="col-sm-4 mx-auto">
                <form @submit.prevent="change_pass" novalidate>

                    <div class="mb-3 pass-eye">
                        <label for="old_password" class="form-label">Старый или временный пароль</label>
                        <input @change="passwordOldChanged" v-model="old_password"
                            :type="isShowOldPass ? 'text' : 'password'" class="form-control pass-eye__inp" id="old_password"
                            v-bind:class="{ 'border-danger': !(isCorrect.old_password) && old_password_changed }">

                        <span @click="isShowOldPass = !isShowOldPass" class="pass-eye__btn"
                            :class="{ 'active': isShowOldPass, 'spacing-minus': !(isCorrect.old_password) && old_password_changed }"></span>

                        <div v-if="!(isCorrect.old_password) && old_password_changed" id="password"
                            class="form-text text-danger">
                            Пароль не может быть пустым!
                        </div>
                    </div>

                    <div class="mb-3 pass-eye">
                        <label for="password" class="form-label">Пароль</label>
                        <input @change="passwordChanged" v-model="password" :type="isShowPass ? 'text' : 'password'"
                            class="form-control pass-eye__inp" id="password"
                            v-bind:class="{ 'border-danger': !(isCorrect.password) }">

                        <span @click="isShowPass = !isShowPass" class="pass-eye__btn"
                            :class="{ 'active': isShowPass }"></span>
                    </div>

                    <div class="mb-3 pass-eye">
                        <label for="confirm_password" class="form-label">Повтор пароля</label>
                        <input @change="passwordConfirmChanged" v-model="confirm_password"
                            :type="isShowConfirmPass ? 'text' : 'password'" class="form-control pass-eye__inp"
                            id="confirm_password"
                            v-bind:class="{ 'border-danger': !(isCorrect.password) && confirm_password_changed }">

                        <span @click="isShowConfirmPass = !isShowConfirmPass" class="pass-eye__btn"
                            :class="{ 'active': isShowConfirmPass, 'spacing-minus': !(isCorrect.password) && confirm_password_changed }"></span>

                        <div v-if="!(isCorrect.password) && confirm_password_changed" id="password"
                            class="form-text text-danger">
                            Убедись, что ты правильно повторил пароль
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Сменить пароль</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { validateService } from '../services/validate.service'
import { userService } from '../services/user.service'

export default {
    data() {
        return {
            old_password: '',
            old_password_changed: false,
            isShowOldPass: false,

            password: '',
            password_changed: false,
            isShowPass: false,

            confirm_password: '',
            confirm_password_changed: false,
            isShowConfirmPass: false,

            isCorrect: {
                old_password: true,
                password: true,
                confirm_password: true
            }
        }
    },
    components: {

    },
    methods: {
        passwordOldChanged() {
            this.isCorrect.old_password = !validateService.checkIsEmptyStr(this.old_password);
            this.old_password_changed = true;
        },
        passwordChanged() {
            this.password_changed = true;
            this.isCorrect.password = (this.password == this.confirm_password
                && !validateService.checkIsEmptyStr(this.password)) || !(this.confirm_password_changed)
        },
        passwordConfirmChanged() {
            this.isCorrect.password = this.password == this.confirm_password
                && !validateService.checkIsEmptyStr(this.password)
            this.confirm_password_changed = true;
        },
        change_pass() {
            if (this.isCorrect.old_password && this.isCorrect.password && this.isCorrect.confirm_password) {
                userService.changePassword(this.old_password, this.password).then(response => {
                    this.$store.dispatch('alert/sendMessage', { message: response.ok, type: 'Success' })
                    this.$router.push("/login");
                }).catch(error => {
                    this.$store.dispatch('alert/sendMessage', { message: error.response.data.error, type: 'Danger' })
                })
            }

        }
    }
}
</script>

<style scoped></style>