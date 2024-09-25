<template>
    <div class="templ_bg bg__blue">
        <div class = 'container'>
            <div class="row" style="min-height: 100vh">
                <form v-if="step !== -1" @submit.prevent="registration" novalidate class="m-auto form-template">
                    <transition name="slide-fade">
                        <div v-show="step === 1" class="step mt-2">
                            <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="regText.header"></h2>
                            <div>
                                <p class="text-center mx-auto">
                                    {{ regText.hello_text1 }}
                                </p>
                                <div class="mx-lg-auto  mb-3">
                                    <p class="line m-0 pb-0 text-center">
                                        {{ regText.hello_text2 }}
                                    </p>
                                </div>
                            </div>

                            <FirstStepInputs :userData="userData" :isCorrect="isCorrect" ref="FirstStepComponent"/>
                            <FooterReg :step="step" @next-step="nextStep" @back-step="backStep"/>

                        </div>
                    </transition>

                    <transition name="slide-fade">
                        <div v-show="step === 2" class="step mt-2">
                            <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="regText.header"></h2>
                            <div>
                                <div class="mx-lg-auto  mb-3">
                                    <p class="line m-0 pb-0 text-center">
                                        {{ regText.where_you_study }}
                                    </p>
                                </div>
                            </div>

                            <SecondStepInputs :userData="userData" :out_utility="utility" :isCorrect="isCorrect" ref="SecondStepComponent"/>

                            <div class="d-flex justify-content-center my-3">
                                <button @click="step = 3; selectedInst = false" type="button" class="link text-white hover-btn mx-auto">
                                    {{ regText.button_to_hand_stduy }}
                                </button>
                            </div>

                            <FooterReg :step="step" @next-step="nextStep" @back-step="backStep"/>
                        </div>
                    </transition>

                    <transition name="slide-fade">
                        <div v-show="step === 3" class="step mt-2">
                            <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="regText.header"></h2>
                            <div>
                                <div class="mx-lg-auto  mb-3">
                                    <p class="line m-0 pb-0 text-center">
                                        {{ regText.where_you_study }}
                                    </p>
                                </div>
                            </div>

                            <ThirdStepInputs :userData="userData" :isCorrect="isCorrect" ref="ThirdStepComponent"/>

                            <p class="text-danger fw-bold">
                                {{ regText.warning_about_fake_study }}
                            </p>

                            <div class="d-flex justify-content-center my-3">
                                <button @click="step = 2; selectedInst = true" type="button" class="link text-white hover-btn mx-auto">
                                    {{ regText.button_to_auto_study }}
                                </button>
                            </div>

                            <FooterReg :step="step" @next-step="nextStep" @back-step="backStep"/>
                        </div>
                    </transition>

                    <transition name="slide-fade">
                        <div v-show="step === 4" class="step mt-2">
                            <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="regText.header"></h2>
                            <div>
                                <div class="mx-lg-auto  mb-3">
                                    <p class="line m-0 pb-0 text-center">
                                        {{ regText.run_to_finaly }}
                                    </p>
                                </div>
                            </div>

                            <FourStepInputs :userData="userData" :isCorrect="isCorrect" ref="FourStepComponent"/>
                            
                            <YandexCaptcha ref="yancaptcha3" captchaId="yancaptcha-3" v-if="isViewCaptcha3"/>

                            <FooterReg :step="step" @back-step="backStep"/>
                        </div>
                    </transition>
                </form>
                <form v-else @submit.prevent="reg_hand" novalidate class="m-auto form-template">
                    <transition name="slide-fade">
                        <div class="step mt-2">
                            <h2 class="mb-1 text-blue text-center fs-6 pt-3 pb-3" v-html="regText.header"></h2>
                            <div>
                                <p class="text-center mx-auto">
                                    {{ regText.about_auto_reg }}
                                </p>
                            </div>

                            <FirstStepInputs :isCorrect="isCorrectAutoReg" ref="FirstStepComponentAutoReg"/>
                            <ThirdStepInputs :isCorrect="isCorrectAutoReg" ref="ThirdStepComponentAutoReg"/>

                            <div class="mb-3 input-box">
                                <label for="email" class="form-label">Email <span
                                    class="text-danger">*</span></label>
                                <input v-model="autoReg.email" type="email" class="input"
                                    id="email" style="width: 100%;">
                            </div>

                            <div class="form-check mb-3">
                                <input @change="confirmPersonalDataChanged" v-model="autoReg.confirm_personal_data"
                                    class="form-check-input" type="checkbox" id="confirm_person_data">
                                <label class="form-check-label" for="confirm_person_data">
                                    {{ regText.personal_data_about }}
                                    <router-link class="text-white link hover-btn" to="/page/privacy">{{regText.personal_data_link}}</router-link>
                                </label>
                            </div>

                            <YandexCaptcha ref="yancaptcha2" captchaId="yancaptcha-2" v-if="isViewCaptcha2"/>

                            <div class="d-flex justify-content-center mb-2">
                                <button type="submit" class="btn btn-primary mx-auto">{{ regText.button_reg }}</button>
                            </div>
                            
                            <FooterReg :step="step" @next-step="nextStep"/>
                        </div>
                    </transition>
                </form>
            </div>
        </div>
   </div>
</template>

<script>
import YandexCaptcha from '../MiniComponents/YandexCaptcha.vue';

import FirstStepInputs from '../InputBlocks/FirstStepInputs.vue';
import SecondStepInputs from '../InputBlocks/SecondStepInputs.vue';
import ThirdStepInputs from '../InputBlocks/ThirdStepInputs.vue';
import FourStepInputs from '../InputBlocks/FourStepInputs.vue';
import FooterReg from '../InputBlocks/FooterReg.vue';

import { coreService } from '../../services/core.service';
import { modalsMethod } from '../../methods/modals.method';

import { regText } from './core.text';
import { reportConst } from '../../consts/report.const';

export default {
    props: {
        source: String
    },
    data() {
        return {
            regText: {},
            autoReg: {
                last_name: '',
                first_name: '',
                middle_name: '',
                phone_number: '',
                sex: 'М',
                TypeInst: '',
                Inst: '',
                Facult: '',
                Spec: '',
                year: 1,
                email: '',
                confirm_personal_data: false
            },
            step: 1,
            userData: {
            },
            isCorrectAutoReg: {
                last_name: true,
                first_name: true,
                middle_name: true,
                phone_number: true,
                currentTypeInst: true,
                currentInst: true,
                currentFacult: true,
                currentSpec: true,
                currentTypeInst_third: true,
                inst_name: true,
                email: true,
                password: true,
                confirm_personal_data: true
            },
            isCorrect: {
                last_name: true,
                first_name: true,
                middle_name: true,
                phone_number: true,
                currentTypeInst: true,
                currentInst: true,
                currentFacult: true,
                currentSpec: true,
                currentTypeInst_third: true,
                inst_name: true,
                email: true,
                password: true,
                confirm_personal_data: true
            },
            utility: {
                isShowPass: false,
                isShowConfirmPass: false
            },
            selectedInst: true,
            isViewCaptcha2: true,
            isViewCaptcha3: true
        }
    },
    components: {
        FirstStepInputs, FooterReg, SecondStepInputs, 
        ThirdStepInputs, FourStepInputs, YandexCaptcha
    },
    async created(){
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });

        if (this.source) {
            try {
                await coreService.sendSourse(this.source);
            } catch(error) { console.log(this.source) } finally {
                this.$router.push("/reg");
            }
        }

        if(this.$store.state.auth.status.loggedIn){
            this.$store.dispatch('auth/logout');
        }
        
        this.getDataLocalStorage();

        this.regText = regText;
    },
    methods: {
        async reg_hand() {
            Object.assign(this.autoReg, this.$refs.FirstStepComponentAutoReg.getData());

            const data = this.$refs.ThirdStepComponentAutoReg.getData().userData;

            this.autoReg.TypeInst = this.$refs.ThirdStepComponentAutoReg.getType();
            this.autoReg.Inst = data.inst_name;
            this.autoReg.Facult = data.faculty_name;
            this.autoReg.Spec = data.spec_name;
            this.autoReg.year = data.year_third;

            const is_full = this.autoReg.last_name && this.autoReg.first_name && this.autoReg.phone_number && 
                            this.autoReg.Inst && this.autoReg.email && this.autoReg.confirm_personal_data &&
                            this.autoReg.TypeInst;
            if(!is_full) {
                modalsMethod.showTextModal(this.regText.error_fill_all_fields);
                return;
            }

            if(!this.$refs.yancaptcha2.getToken()) {
                this.$store.dispatch('alert/sendMessage', { message: 'Подтвердите капчу', type: 'Danger' });
                return;
            }

            const report = `Фамилия: ${this.autoReg.last_name}\nИмя: ${this.autoReg.first_name}\nОтчество: ${this.autoReg.middle_name}\nНомер телефона: ${this.autoReg.phone_number}\nПол: ${this.autoReg.sex}\nТип УЗ: ${this.autoReg.TypeInst}\nНазвание УЗ: ${this.autoReg.Inst}\nФакультет: ${this.autoReg.Facult}\nСпециальность: ${this.autoReg.Spec}\nКурс: ${this.autoReg.year}\nПочта пользователя: ${this.autoReg.email}`;


            try {
                await coreService.sendEducationReport(report, reportConst.auto_reg, this.$refs.yancaptcha2.getToken());
                modalsMethod.showTextModal(this.regText.auto_reg_request_ok);
                this.$router.push("/login");
            } catch(error) {
                this.$refs.yancaptcha2.resetToken()
                this.isViewCaptcha2 = false;
                this.$nextTick(() => {
                    this.isViewCaptcha2 = true;
                });
                modalsMethod.showTextModal(this.regText.auto_reg_request_fail);
            }
        },
        getDataLocalStorage(){
            const data = JSON.parse(localStorage.getItem('register'));
            if(data) {
                this.step = data.step;
                this.userData = data.userData;
                this.utility = data.utility;
                this.selectedInst = data.selectedInst;
            }
        },
        setDataLocalStorage() {
            localStorage.setItem('register', JSON.stringify({
                step: this.step, 
                userData: this.userData, 
                utility: this.utility, 
                selectedInst: this.selectedInst
            }));
        },
        nextStep(){
            if(this.step === -1) {
                this.step = 1;
                return;
            }
            if(this.step === 1){
                Object.assign(this.userData, this.$refs.FirstStepComponent.getData());
                
                if(this.checkEmpty('last_name') & 
                    this.checkEmpty('first_name') &  
                    this.checkEmpty('phone_number') & this.checkPhone()) {
                        if(this.selectedInst){
                            this.step = 2
                        } else {
                            this.step = 3 
                        }
                        
                }

                this.setDataLocalStorage()
                return;
            }
            if(this.step === 2){
                const { userData, utility } = this.$refs.SecondStepComponent.getData();
                Object.assign(this.userData, userData);
                this.utility = utility;
             
                if(this.checkSelect('currentTypeInst') & 
                    this.checkSelect('currentInst') & 
                    this.checkSelectUpp('currentFacult', 'listFacult') & 
                    this.checkSelectUpp('currentSpec', 'listSpec')) {
                        this.step = 4
                }

                this.setDataLocalStorage()
                return;
            }
            if(this.step === 3){
                const { userData, utility } = this.$refs.ThirdStepComponent.getData();
                Object.assign(this.userData, userData);
                this.utility = utility;
             
                if(this.checkSelect('currentTypeInst_third') & 
                    this.checkEmpty('inst_name') ) {
                        this.step = 4
                }

                this.setDataLocalStorage()
                return;
            }
        },
        async registration(){
            Object.assign(this.userData, this.$refs.FourStepComponent.getData());
            this.setDataLocalStorage();

            const checkData = !(this.checkEmpty('email') & 
                                this.checkEmpty('password') & 
                                this.checkCheckBox('confirm_personal_data'))
            if(checkData) { return; }

            if(this.userData.password !== this.userData.passwordConfirm) {
                this.$store.dispatch('alert/sendMessage', { 
                    message: this.regText.dont_confirm_pass, 
                    type: 'Danger' 
                })
                this.isCorrect.password = false
                this.isCorrect.passwordConfirm = false
                return;
            }

            if(!this.$refs.yancaptcha3.getToken()) {
                this.$store.dispatch('alert/sendMessage', { message: 'Подтвердите капчу', type: 'Danger' });
                return;
            }

            if(!this.selectedInst){
                this.userData.currentInst = 1;
                this.userData.currentFacult = '';
                this.userData.currentSpec = '';
            }

            try {
                const response = await coreService.register(this.userData, this.$refs.yancaptcha3.getToken())
                this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Success' })
                modalsMethod.showTextModal(this.regText.register_ok);
            } catch(error) {
                if(error.response.status !== 500){
                    modalsMethod.showListModal(this.regText.header_reg_fail, error.response.data)
                } else {
                    modalsMethod.showTextModal(error.response.data);
                }
                this.$refs.yancaptcha3.resetToken()
                this.isViewCaptcha3 = false;
                this.$nextTick(() => {
                    this.isViewCaptcha3 = true;
                });
                return;
            }
            
            if (!this.selectedInst) {
                const report = `Тип: ${this.utility.listTypeInst.find(x => x.id === this.userData.currentTypeInst_third).name}\nУчебное заведение: ${this.userData.inst_name}\nФакультет: ${this.userData.faculty_name}\nСпециальность: ${this.userData.spec_name}\nГод обучения: ${this.userData.year_third}\nПочта пользователя: ${this.userData.email}`;

                try {
                    await coreService.sendEducationReport(report, reportConst.new_institution, '');
                    modalsMethod.showTextModal(this.regText.edu_report_ok);
                } catch(error){
                    modalsMethod.showTextModal(this.regText.edu_report_fail);
                }
            }

            localStorage.removeItem('register')
            this.$router.push("/login");
            
        },
        checkEmpty(key) {
            this.isCorrect[key] = key in this.userData && this.userData[key] && !!this.userData[key].length;
            return this.isCorrect[key];
        },
        checkPhone(){
            this.isCorrect['phone_number'] = this.userData['phone_number'].length === 12;
            return this.isCorrect['phone_number']
        },
        checkCheckBox(key){
            this.isCorrect[key] = this.userData[key]
            return this.userData[key]
        },
        checkSelect(key) {
            const isValid = this.userData[key] !== '-1';
            this.isCorrect[key] = isValid;
            return isValid;
        },

        checkSelectUpp(key1, key2) {
            const isValid = !(this.userData[key1] === '-1' && this.utility[key2].length > 0);
            this.isCorrect[key1] = isValid;
            return isValid;
        },

        backStep(){
            if(this.step === 1) {
                this.step = -1;
            }
            if(this.step === 2 || this.step === 3){
                this.step = 1
            }
            if(this.step === 4) {
                if(this.selectedInst){
                    this.step = 2
                } else {
                    this.step = 3
                }
            }
        },
       

    }
}
</script>

<style scoped>
</style>