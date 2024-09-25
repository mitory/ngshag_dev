<template>
    <div class = ''>
        <div class="mb-3 input-box">
            <label for="email" class="form-label">Email <span
                class="text-danger">*</span></label>
            <input v-model="userDataFour.email" type="email" class="input"
                id="email"
                v-bind:class="{ 'border-danger': !(isCorrect.email)}" style="width: 100%;">
        </div>

        <div class="mb-3 pass-eye">
            <div class="box-answer">
                <label for="password" class="form-label">Пароль <span
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
            <input v-model="userDataFour.password"
                :type="utility.isShowPass ? 'text' : 'password'"
                class="input pass-eye__inp" id="password"
                :class="{ 'border-danger': !this.isCorrect.password }" style="width: 100%;">

            <span @click="utility.isShowPass = !utility.isShowPass"
                class="pass-eye__btn" :class="{ 'active': utility.isShowPass }"></span>

        </div>
        <div class="custom-modal" v-if="tooltipVisible" @click="tooltipVisible = !tooltipVisible;">
            <div class="modal-content" v-html="regText.password_ruls_html"></div>
        </div>
        <div class="mb-3 pass-eye">
            <label for="passwordConfirm" class="form-label">Повтори пароль <span
                class="text-danger">*</span></label>
            <input v-model="userDataFour.passwordConfirm"
                :type="utility.isShowConfirmPass ? 'text' : 'password'"
                class="input pass-eye__inp" id="passwordConfirm"
                :class="{ 'border-danger': !(isCorrect.password)  }" style="width: 100%;">

            <span @click="utility.isShowConfirmPass = !utility.isShowConfirmPass"
                class="pass-eye__btn"
                :class="{ 'active': utility.isShowConfirmPass }"></span>
        </div>

        <div class="form-check mb-3">
            <input @change="confirmPersonalDataChanged" v-model="userDataFour.confirm_personal_data"
                :class="{ 'border-danger': !(this.isCorrect.confirm_personal_data) }"
                class="form-check-input" type="checkbox" id="confirm_person_data">
            <label class="form-check-label" for="confirm_person_data">
                {{ regText.personal_data_about }}
                <router-link class="text-white link hover-btn" to="/page/privacy">{{regText.personal_data_link}}</router-link>
            </label>
        </div>
   </div>
</template>

<script>
import { coreService } from '../../services/core.service';
import { regText } from '../CoreSystemComponentsForUser/core.text';

export default {
    props: {
        userData: Object,
        isCorrect: Object
    },
    data() {
        return {
            regText: {},
            userDataFour: {
                email: '',
                password: '',
                passwordConfirm: '',
                confirm_personal_data: false
            },
            utility: {
                isShowPass: false,
                isShowConfirmPass: false
            },
            tooltipVisible: false,
        }
    },
    components: {
        
    },
    created(){
        const checkProps = this.userData.email && this.userData.password && this.userData.passwordConfirm && this.userData.confirm_personal_data
        if(checkProps){
            this.userDataFour.email = this.userData.email;
            this.userDataFour.password = this.userData.password;
            this.userDataFour.passwordConfirm = this.userData.passwordConfirm;
            this.userDataFour.confirm_personal_data = this.userData.confirm_personal_data;
        }
        this.regText = regText;
        
    },
    methods: {
        async genPassword(){
            try {
                this.userDataFour.password = await coreService.genPass();
                this.utility.isShowPass = true;
            } catch (error) {
                if(error.response.status === 500) {
                    this.$store.dispatch('alert/sendMessage', { message: error.response.data, type: 'Danger' })
                } else {
                    const message = 'Возникла ошибка при генерации пароля';
                    this.$store.dispatch('alert/sendMessage', { message: message, type: 'Danger' })
                }
            }
        },
        getData() {
            return this.userDataFour
        },
    }
}
</script>

<style scoped>
</style>