<template>
    <SmartCaptcha :sitekey="sitekey" :callback="setToken"
                    :on-token-expired="resetToken" :on-network-error="resetToken"
                    :id="captchaId"
                    class="mb-2"/>
</template>

<script>
import { SmartCaptcha } from 'vue3-smart-captcha';

export default {
    props: {
        captchaId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            token: '',
            sitekey: 'ysc1_26Hz0UU9y8eQGwf68hrkVq1ZwWa7SOq4LUjHtFiW05c21582'
        }
    },
    components: {
        SmartCaptcha
    },
    methods: {
        getToken() {
            return this.token;
        },
        setToken(token) {
            this.token = token;
        },
        resetToken() {
            this.token = '';
        },
    }
}
</script>

<style scoped>
    
</style>