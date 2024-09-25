<template>
    <div class="templ_bg bg__blue">
        <div class="container">
            <div class="row d-flex align-items-center justify-content-evenly" style="min-height: 100vh">
                <form @submit.prevent="forgotPassword" novalidate class="my-auto form-template py-2">
                    <BackLink text='назад' />
                    <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="forgotPasswordText.header"></h2>
                    <p class="text-center mx-auto">
                       {{ forgotPasswordText.change_pass_about }}
                    </p>
                    <div class="mb-3 input-box">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="email" type="email" class="input"
                                id="email"
                                v-bind:class="{ 'border-danger': !(isCorrect.email)}" style="width: 100%;">
                    </div>

                    <YandexCaptcha ref="yancaptcha4" captchaId="yancaptcha-4" v-if="isViewCaptcha4"/>

                    <div class="d-flex justify-content-center mb-2">
                        <button type="submit" class="btn btn-primary">{{ forgotPasswordText.change_pass_button }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import YandexCaptcha from '../MiniComponents/YandexCaptcha.vue';

import { validateMethod } from '../../methods/validate.method';
import { modalsMethod } from '../../methods/modals.method';
import { coreService } from '../../services/core.service';

import { forgotPasswordText } from './core.text';

import BackLink from '../MiniComponents/BackLink.vue';

export default {
    data() {
        return {
            email: '',
            captcha_token: '',
            isCorrect: {
                email: true,
            },
            forgotPasswordText: {},
            isViewCaptcha4: true,
        }
    },
    created() {
        if(this.$store.state.auth.status.loggedIn) {
            this.$store.dispatch('auth/logout');
        }
        this.forgotPasswordText = forgotPasswordText;
    },
    components: {
        BackLink, YandexCaptcha
    },
    methods: {
        async forgotPassword() {
            if(!this.isCorrectEmail()) return;
            if(!this.$refs.yancaptcha4.getToken()) {
                this.$store.dispatch('alert/sendMessage', { message: 'Подтвердите капчу', type: 'Danger' });
                return;
            }

            try{
                await coreService.postSendEmailForChangePass(this.email, this.$refs.yancaptcha.getToken());
                modalsMethod.showTextModal(forgotPasswordText.change_pass_susses);
                this.$router.push("/login");
            } catch (error) {
                let message = error.response.data;
                if (error.response.status !== 500) {
                    message = message.error;
                }
                this.$store.dispatch('alert/sendMessage', { message: message, type: 'Danger' });
                this.$refs.yancaptcha4.resetToken()
                this.isViewCaptcha4 = false;
                this.$nextTick(() => {
                    this.isViewCaptcha4 = true;
                });
            }
        },
        isCorrectEmail() {
            this.isCorrect.email = validateMethod.checkIsEmail(this.email);
            return this.isCorrect.email;
        },
    }
}
</script>

<style scoped>
</style>