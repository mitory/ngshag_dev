<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-sm-4 mx-auto">
                <form @change="formUpdated" @submit.prevent="registration" novalidate>
                    <transition name="slide-fade">
                        <div v-show="step === 1" class="step">
                            <div class="d-flex justify-content-between mb-5">
                                <div class="">
                                    <div class="mb-3">
                                        <label for="last_name" class="form-label">Фамилия</label>
                                        <input v-model="userData.last_name" type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !isCorrect.last_name }" id="last_name">
                                        <div v-if="!isCorrect.last_name" id="last_name" class="form-text text-danger">
                                            Пожалуйста, введите вашу фамилию (Кириллица)
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="first_name" class="form-label">Имя</label>
                                        <input v-model="userData.first_name" type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !isCorrect.first_name }" id="first_name">
                                        <div v-if="!isCorrect.first_name" id="first_name" class="form-text text-danger">
                                            Пожалуйста, введите ваше имя (Кириллица)
                                        </div>
                                    </div>

                                    <div class="">
                                        <p>Пол</p>
                                        <div class="form-check">
                                            <input v-model="userData.sex" class="form-check-input" type="radio" name="sex"
                                                id="M" value="M" checked>
                                            <label class="form-check-label" for="M">
                                                Мужской
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input v-model="userData.sex" class="form-check-input" type="radio" name="sex"
                                                id="F" value="F">
                                            <label class="form-check-label" for="F">
                                                Женский
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-4 ms-4">

                                    <p>Дата рождения:</p>
                                    <p v-bind:class="{ 'text-w text-danger': !isCorrect.birth_date }"
                                        v-if="!isCorrect.birth_date">Вам должно быть не меньше 14 <br> и не больше 100 лет
                                    </p>


                                    <VueDatePicker v-model="userData.birth_date" locale="ru" inline auto-apply
                                        :enable-time-picker="false" :max-date="new Date()" model-type="yyyy-MM-dd">

                                    </VueDatePicker>
                                </div>
                            </div>
                            <button @click="nextStep" type="button" class="btn btn-primary">Следующий шаг</button>
                        </div>
                    </transition>
                    <transition name="slide-fade">
                        <div v-show="step === 2" class="step">
                            <div>
                                <select @change="getFacults()" class="form-select mb-3" v-model="userData.current_univers"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.current_univers }">
                                    <option value="-1" selected>Выберете ВУЗ</option>
                                    <option v-for="uviver in univers" :value="uviver.id" :key="uviver.id">
                                        {{ uviver.institution_name }}
                                    </option>
                                </select>

                                <select class="form-select mb-3" v-model="userData.current_facult"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.current_facult }">
                                    <option value="-1" selected>Выберете Факультет</option>
                                    <option v-for="facult in facults" :value="facult.id" :key="facult.id">
                                        {{ facult.faculty_name }}
                                    </option>
                                </select>
                            </div>

                            <button @click="backStep" type="button" class="m-2 btn btn-light">Назад</button>
                            <button @click="nextStep" type="button" class="btn btn-primary">Следующий шаг</button>
                        </div>
                    </transition>
                    <transition name="slide-fade">
                        <div v-show="step === 3" class="step">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="userData.email" type="email" class="form-control" id="email"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.email }">
                                <div v-if="!isCorrect.email" id="email" class="form-text text-danger">
                                    Пожалуйста, введите корректный email. Например test@mail.ru
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Пароль</label>
                                <input v-model="userData.password" type="password" class="form-control" id="password"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.password }">
                                <div v-if="!isCorrect.password" id="password" class="form-text text-danger">
                                    Убедитесь, что вы правильно повторили пароль
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="passwordConfirm" class="form-label">Повторите пароль</label>
                                <input v-model="passwordConfirm" type="password" class="form-control" id="passwordConfirm"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.password }">
                            </div>

                            <button @click="backStep" type="button" class="m-2 btn btn-light">Назад</button>
                            <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
                        </div>
                    </transition>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { userService } from '../services/user.service'
import { validateService } from '../services/validate.service'

export default {
    name: 'RegPage',
    data() {
        return {
            step: 1,
            userData: {
                last_name: '',
                first_name: '',
                birth_date: '2000-01-01',
                sex: 'M',
                current_univers: '-1',
                current_facult: '-1',
                email: '',
                password: ''
            },
            isCorrect: {
                last_name: true,
                first_name: true,
                birth_date: true,
                current_univers: true,
                current_facult: true,
                email: true,
                password: true
            },

            univers: {},
            facults: {},
            passwordConfirm: '',
            regStatus: ''
        }
    },
    components: { VueDatePicker },
    created() {
        this.$store.dispatch('auth/logout');
        this.$store.commit('routes/toRegPage')
        userService.getUnivers().then(response => {
            this.univers = response;
        })
    },
    methods: {
        nextStep() {
            if (this.step === 1 && !this.checkFirstStep()) {
                return false;
            }
            if (this.step === 2 && !this.checkSecondStep()) {
                return false
            }
            this.step++
        },
        backStep() {
            this.step--
        },
        registration() {

            const user = this.userData;

            if (!this.checkThirdStep()) {
                return false;
            }

            this.$store.dispatch('auth/register', user).then(response => {
                if (response.status) {
                    alert(response.message)
                    this.$router.push("/login");
                } else {
                    alert(response.message)
                }
            })
        },

        checkFirstStep() {

            this.isCorrect.last_name = validateService.checkNamesInput(this.userData.last_name)
            this.isCorrect.first_name = validateService.checkNamesInput(this.userData.first_name)
            this.isCorrect.birth_date = validateService.checkAgeBetween(this.userData.birth_date, 14, 100)

            return this.isCorrect.last_name && this.isCorrect.first_name && this.isCorrect.birth_date
        },

        checkSecondStep() {
            this.isCorrect.current_univers = this.userData.current_univers != -1
            this.isCorrect.current_facult = this.userData.current_facult != -1

            return this.isCorrect.current_univers && this.isCorrect.current_facult
        },

        checkThirdStep() {
            this.isCorrect.email = validateService.checkIsEmail(this.userData.email)
            this.isCorrect.password = this.userData.password === this.passwordConfirm
                && !validateService.checkIsEmptyStr(this.userData.password)

            return this.isCorrect.email && this.isCorrect.password
        },

        getFacults: function () {
            if (this.userData.current_univers != -1) {
                userService.getFacults(this.userData.current_univers).then(response => {
                    this.facults = response;
                })
            } else {
                this.facults = {};
            }
            this.userData.current_facult = -1

        },

        formUpdated() {
            if (this.step === 1) {
                this.checkFirstStep()
            }
            if (this.step === 2) {
                this.checkSecondStep()
            }
            if (this.step === 3) {
                this.checkThirdStep()
            }
        }
    }
}

</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
    transform: translateX(20px);
    opacity: 0;
}

.text-w {
    width: 300px;
}
</style>