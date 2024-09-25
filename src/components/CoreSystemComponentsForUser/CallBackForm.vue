<template>
    <div class = 'templ_bg bg__blue'>
        <div class="container">
            <div class="row d-flex align-items-center justify-content-evenly" style="min-height: 100vh">
                <form @submit.prevent="sendCallBack" novalidate class="my-auto form-template py-2">
                    <BackLink text='назад' />
                    <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="callBackText.header"></h2>
                    <p class="text-center mx-auto">
                      {{ callBackText.call_back_about }}
                    </p>
                    <div v-if="!loggedIn" class="mb-3 input-box">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="email" type="email" class="input"
                                id="email"
                                v-bind:class="{ 'border-danger': !(isCorrect.email)}" style="width: 100%;">
                    </div>

                    <div class="mb-3 input-box">
                        <textarea rows='5' v-model="content" type="content" class="input"
                                id="content"
                                v-bind:class="{ 'border-danger': !(isCorrect.content)}" style="width: 100%;">
                        </textarea>
                    </div>

                    <YandexCaptcha ref="yancaptcha" captchaId="yancaptcha-1" v-if="isViewCaptcha"/>

                    <div class="d-flex justify-content-center mb-2">
                        <button type="submit" class="btn btn-primary">{{ callBackText.call_back_button }}</button>
                    </div>
                </form>
            </div>
        </div>
   </div>
</template>

<script>
import YandexCaptcha from '../MiniComponents/YandexCaptcha.vue';

import { callBackText } from './core.text';
import { reportConst } from '../../consts/report.const';

import { validateMethod } from '../../methods/validate.method';
import { coreService } from '../../services/core.service';
import { modalsMethod } from '../../methods/modals.method';

import BackLink from '../MiniComponents/BackLink.vue';

export default {
    data() {
        return {
            callBackText: {},
            email: '',
            content: '',
            isCorrect: {
                email: true,
                content: true
            },
            isViewCaptcha: true
        }
    },
    components: {
        BackLink, YandexCaptcha
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        }
    },
    created(){
        this.callBackText = callBackText;
    },
    methods: {
        async sendCallBack(){
            if(this.isContentEmpty()) return;
            if(!this.loggedIn & !this.isCorrectEmail()) return;
            if(!this.$refs.yancaptcha.getToken()) {
                this.$store.dispatch('alert/sendMessage', { message: 'Подтвердите капчу', type: 'Danger' });
                return;
            }

            this.sendMessage();
        },
        async sendMessage(){

            let report = `сообщение: ${this.content}`;
            if (!this.loggedIn) report = `email: ${this.email}\n` + report;
            
            try {
                await coreService.sendEducationReport(report, reportConst.call_back, this.$refs.yancaptcha.getToken());
                modalsMethod.showTextModal(callBackText.call_back_susses);
                this.$router.back()

            } catch(error) {
                this.$refs.yancaptcha.resetToken()
                this.isViewCaptcha = false;
                this.$nextTick(() => {
                    this.isViewCaptcha = true;
                });
                modalsMethod.showTextModal(callBackText.call_back_fail);
            }
        },
        isCorrectEmail() {
            this.isCorrect.email = validateMethod.checkIsEmail(this.email);
            return this.isCorrect.email;
        },
        isContentEmpty() {
            this.isCorrect.content = !validateMethod.checkIsEmptyStr(this.content);
            return !this.isCorrect.content;
        }
    }
}
</script>

<style scoped>
    
</style>