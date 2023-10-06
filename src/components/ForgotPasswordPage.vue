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
            <p class="mx-auto">Введи свой email, мы вышлем на него временный пароль</p>
            <div class="col-sm-4 mx-auto">
                <form @submit.prevent="forgotPassword" novalidate>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input @change="emailChanged" v-model="email" type="text" class="form-control" id="email"
                            v-bind:class="{ 'border-danger': !(isCorrect.email) && email_changed }">
                        <div v-if="!(isCorrect.email) && email_changed" id="email" class="form-text text-danger">
                            Введи корректный email. Например test@mail.ru
                        </div>
                    </div>

                    <div class="d-flex justify-content-between">
                        <router-link to="/login" class="btn btn-secondary">Назад</router-link>
                        <button type="submit" class="btn btn-primary">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { validateService } from '../services/validate.service'
import { publicService } from '../services/public.service'

export default {
    data() {
        return {
            email: '',
            isCorrect: {
                email: true,
            },
            email_changed: false
        }
    },
    created() {
        this.$store.dispatch('auth/logout');
    },
    components: {

    },
    methods: {
        forgotPassword() {

            this.emailChanged()
            if (this.isCorrect.email) {
                publicService.getSendEmailForChangePass(this.email).then(response => {
                    if (response.Ok === 'Ok') {
                        this.$store.dispatch('alert/sendMessage', { message: 'Новый пароль вылан на почту', type: 'Success' })
                        this.$router.push("/login");
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
        checkEmail(str) {
            return !validateService.checkIsEmptyStr(str) && validateService.checkIsEmail(str)
        },
    }
}
</script>

<style scoped></style>