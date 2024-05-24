<template>
    <div class = 'templ_bg bg__blue'>
        <div class="container">
            <div class="row d-flex align-items-center justify-content-evenly" style="min-height: 100vh">
                <form @submit.prevent="sendCallBack" novalidate class="my-auto form-template py-2">
                    <BackLink text='назад' />
                    <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="generalText.header"></h2>
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

                    <div class="d-flex justify-content-center mb-2">
                        <button type="submit" class="btn btn-primary">{{ callBackText.call_back_button }}</button>
                    </div>
                </form>
            </div>
        </div>
   </div>
</template>

<script>
import { generalText } from '../texts/general.text';
import { callBackText } from '../texts/login.text'
import { reportConst } from '../consts/report.const'

import { validateService } from '../services/validate.service'
import { publicService } from '../services/public.service'
import { userService } from '../services/user.service'

import BackLink from './mini-components/BackLink.vue'

export default {
    data() {
        return {
            generalText: {},
            callBackText: {},
            email: '',
            content: '',
            isCorrect: {
                email: true,
                content: true
            }
        }
    },
    components: {
        BackLink
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        }
    },
    created(){
        this.generalText = generalText;
        this.callBackText = callBackText;
    },
    methods: {
        sendCallBack(){
            if(!this.loggedIn){
                if (!this.isCorrectEmail() || this.isContentEmpty()) {
                    return;
                } else {
                    publicService.checkEmail(this.email, this.loggedIn).then(response => {
                        if (!response.status) {
                            this.$store.dispatch('modal/openModal', `<h5 class="text-center py-5">${response.message}</h5>`);
                            return
                        } else {
                            this.sendMessage()
                        }
                    })
                }
            } else {
                if(!this.isContentEmpty()){
                    this.sendMessage();
                }
                
            }
        },
        sendMessage(){
            let report = '';
            if (!this.loggedIn){
                report += `email: ${this.email}\n`;
            }
            report += `сообщение: ${this.content}`;
            
            userService.sendEducationReport(report, reportConst.call_back).then(
                response => {
                    if (response.status) { 
                        this.$store.dispatch('modal/openModal', callBackText.call_back_susses);
                        this.email = '';
                        this.content = '';
                        this.$router.back()
                    } else {
                        this.$store.dispatch('modal/openModal', callBackText.call_back_fail);
                    }

            })
        },
        isCorrectEmail() {
            this.isCorrect.email = validateService.checkIsEmail(this.email);
            return this.isCorrect.email;
        },
        isContentEmpty() {
            this.isCorrect.content = !validateService.checkIsEmptyStr(this.content);
            return !this.isCorrect.content;
        }
    }
}
</script>

<style scoped>
    
</style>