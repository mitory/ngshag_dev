<template>
    <div class="container">
        <div class="d-flex flex-column justify-content-center">
            <BackLink text='назад' />
            <div class="col-sm-10 mx-auto">
                <form @submit.prevent="change_pass" novalidate>

                    <div class="mb-3 pass-eye">
                            <label for="old_password" class="form-label">Текущий или временный пароль 
                                <span class="text-danger">*</span></label>
                        <input v-model="old_password"
                            :type="isShowOldPass ? 'text' : 'password'"
                            class="input pass-eye__inp" id="old_password"
                            :class="{ 'border-danger': !this.isCorrect.old_password }" style="width: 100%;">

                        <span @click="isShowOldPass = !isShowOldPass"
                            class="pass-eye__btn" :class="{ 'active': isShowOldPass }"></span>
                    </div>

                    <div class="mb-3 pass-eye">
                        <div class="box-answer">
                            <label for="password" class="form-label">Новый пароль <span
                                class="text-danger">*</span></label>
                            <div class="answer" :title=regText.password_ruls @click="tooltipVisible = !tooltipVisible;" :class="{ 'ans-active': tooltipVisible  }">
                                ?
                            </div>
                            <div class="d-flex align-items-start" style="margin-top: 2px">
                                <img class="cursor"
                                    src="../../assets/icons/settings.svg" 
                                    @click="genPassword" 
                                    title="Сгенерировать пароль" alt="Сгенерировать пароль" style="width: 20px" />
                            </div>
                        </div>
                        <input v-model="password"
                            :type="isShowPass ? 'text' : 'password'"
                            class="input pass-eye__inp" id="password"
                            :class="{ 'border-danger': !this.isCorrect.password }" style="width: 100%;">

                        <span @click="isShowPass = !isShowPass"
                            class="pass-eye__btn" :class="{ 'active': isShowPass }"></span>

                    </div>

                    <div class="custom-modal" v-if="tooltipVisible" @click="tooltipVisible = !tooltipVisible;">
                        <div class="modal-content" v-html="regText.password_ruls_html"></div>
                    </div>

                    <div class="mb-3 pass-eye">
                            <label for="confirm_password" class="form-label">Повтори новый пароль 
                                <span class="text-danger">*</span></label>
                        <input v-model="confirm_password"
                            :type="isShowConfirmPass ? 'text' : 'password'"
                            class="input pass-eye__inp" id="confirm_password"
                            :class="{ 'border-danger': !this.isCorrect.password }" style="width: 100%;">

                        <span @click="isShowConfirmPass = !isShowConfirmPass"
                            class="pass-eye__btn" :class="{ 'active': isShowConfirmPass }"></span>
                    </div>

                    <YandexCaptcha ref="yancaptcha5" captchaId="yancaptcha-5" v-if="isViewCaptcha5"/>

                    <button type="submit" class="btn btn-primary">Сменить пароль</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import YandexCaptcha from '../MiniComponents/YandexCaptcha.vue';

import { regText } from '../CoreSystemComponentsForUser/core.text';

import { validateMethod } from '../../methods/validate.method';
import { coreService } from '../../services/core.service';
import { modalsMethod } from '../../methods/modals.method';
import { LKService } from '../../services/LK.service'

import BackLink from '../MiniComponents/BackLink.vue';

export default {
    data() {
        return {
            regText: {},

            old_password: '',
            isShowOldPass: false,

            password: '',
            isShowPass: false,

            confirm_password: '',
            isShowConfirmPass: false,

            isCorrect: {
                old_password: true,
                password: true,
                confirm_password: true
            },

            tooltipVisible: false,

            isViewCaptcha5: true
        }
    },
    components: {
        BackLink, YandexCaptcha
    },
    created() {
        this.regText = regText;
    },
    methods: {
        async genPassword(){
            try {
                this.password = await coreService.genPass();
                this.isShowPass = true;
            } catch (error) {
                if(error.response.status === 500) {
                    this.$store.dispatch('alert/sendMessage', { message: error.response.data, type: 'Danger' })
                } else {
                    const message = 'Возникла ошибка при генерации пароля';
                    this.$store.dispatch('alert/sendMessage', { message: message, type: 'Danger' })
                }
            }
        },
        passwordOldChanged() {
            this.isCorrect.old_password = !validateMethod.checkIsEmptyStr(this.old_password);
            return this.isCorrect.old_password;
        },
        passwordChanged() {
            this.isCorrect.password = (this.password == this.confirm_password
                && !validateMethod.checkIsEmptyStr(this.password));
            return this.isCorrect.password;
        },
        passwordConfirmChanged() {
            this.isCorrect.confirm_password = this.password == this.confirm_password
                && !validateMethod.checkIsEmptyStr(this.password);
            return this.isCorrect.confirm_password;
        },
        async change_pass() {

            const is_valid = this.passwordOldChanged() & this.passwordChanged() & this.passwordConfirmChanged();

            if(!is_valid) return;
            if(!this.$refs.yancaptcha5.getToken()) {
                this.$store.dispatch('alert/sendMessage', { message: 'Подтвердите капчу', type: 'Danger' });
                return;
            }
            try {
                const response = await LKService.changePassword(this.old_password, this.password, this.$refs.yancaptcha5.getToken());
                this.$store.dispatch('alert/sendMessage', { message: response.ok, type: 'Success' })
                this.$router.push("/login");
            } catch (error) {
                if(typeof(error.response.data.error) === 'object') {
                    modalsMethod.showMiniListModal(error.response.data.error);
                } else {
                    modalsMethod.showTextModal(error.response.data.error)
                }
                this.$refs.yancaptcha5.resetToken()
                this.isViewCaptcha5 = false;
                this.$nextTick(() => {
                    this.isViewCaptcha5 = true;
                });
                
            }

        }
    }
}
</script>

<style scoped></style>