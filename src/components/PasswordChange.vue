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

                    <button type="submit" class="btn btn-primary">Сменить пароль</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { regText } from '../texts/reg.text'

import { validateService } from '../services/validate.service'
import { userService } from '../services/user.service'

import BackLink from './mini-components/BackLink.vue'

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

            tooltipVisible: false
        }
    },
    components: {
        BackLink
    },
    created() {
        this.regText = regText;
    },
    methods: {
        passwordOldChanged() {
            this.isCorrect.old_password = !validateService.checkIsEmptyStr(this.old_password);
        },
        passwordChanged() {
            this.isCorrect.password = (this.password == this.confirm_password
                && !validateService.checkIsEmptyStr(this.password))
        },
        passwordConfirmChanged() {
            this.isCorrect.password = this.password == this.confirm_password
                && !validateService.checkIsEmptyStr(this.password)
        },
        change_pass() {
            this.passwordOldChanged()
            this.passwordChanged()
            this.passwordConfirmChanged()

            if (this.isCorrect.old_password && this.isCorrect.password && this.isCorrect.confirm_password) {
                userService.changePassword(this.old_password, this.password).then(response => {
                    this.$store.dispatch('alert/sendMessage', { message: response.ok, type: 'Success' })
                    this.$router.push("/login");
                }).catch(error => {
                    if(typeof(error.response.data.error) === 'object'){
                        let attr = '<ul>'
                            for(let el in error.response.data.error){
                                attr += `<li>${error.response.data.error[el]}</li>`
                            }
                            attr += '</ul>'
                            this.$store.dispatch('modal/openModal', attr);
                    } else {
                        this.$store.dispatch('alert/sendMessage', { message: error.response.data.error, type: 'Danger' })
                    }
                    
                })
            }

        }
    }
}
</script>

<style scoped></style>