<template>
    <div class="templ_bg bg__blue">
        <div class="container">
            <div class="row d-flex align-items-center justify-content-evenly" style="min-height: 100vh">
                <form @submit.prevent="forgotPassword" novalidate class="my-auto form-template py-2">
                    <BackLink text='назад' />
                    <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="generalText.header"></h2>
                    <p class="text-center mx-auto">
                       {{ forgotPasswordText.change_pass_about }}
                    </p>
                    <div class="mb-3 input-box">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="email" type="email" class="input"
                                id="email"
                                v-bind:class="{ 'border-danger': !(isCorrect.email)}" style="width: 100%;">
                    </div>

                    <div class="d-flex justify-content-center mb-2">
                        <button type="submit" class="btn btn-primary">{{ forgotPasswordText.change_pass_button }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { validateService } from '../services/validate.service'
import { publicService } from '../services/public.service'
import { generalText } from '../texts/general.text'
import { forgotPasswordText } from '../texts/login.text'

import BackLink from './mini-components/BackLink.vue'

export default {
    data() {
        return {
            email: '',
            isCorrect: {
                email: true,
            },
            generalText: {},
            forgotPasswordText: {}
        }
    },
    created() {
        this.$store.dispatch('auth/logout');
        this.generalText = generalText;
        this.forgotPasswordText = forgotPasswordText;
    },
    components: {
        BackLink
    },
    methods: {
        forgotPassword() {
            if (this.isCorrectEmail()) {
                publicService.getSendEmailForChangePass(this.email).then(response => {
                    if (response.Ok === 'Ok') {
                        this.$store.dispatch('modal/openModal', forgotPasswordText.change_pass_susses);
                        this.$router.push("/login");
                    } else {
                        this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Danger' });
                    }
                })
            }
        },
        isCorrectEmail() {
            this.isCorrect.email = validateService.checkIsEmail(this.email);
            return this.isCorrect.email;
        },
    }
}
</script>

<style scoped>
</style>