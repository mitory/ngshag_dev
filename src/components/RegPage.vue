<template>
    <div class="container">
        <div class="row" style="height: 100vh">
            <div class="col-sm-8 m-auto ">
                <form @submit.prevent="registration" novalidate>
                    <transition name="slide-fade">
                        <div v-show="step === 1" class="step">
                            <h2 class="text-primary mb-3 text-center">
                                НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ В ЦИФРОВЫХ ПРОФЕССИЯХ
                            </h2>
                            <div class="typewriter mb-3 p-1 border border-dark bg-secondary">
                                <p class="line m-0 pb-0 text-center text-mobile"
                                    v-for="(line, index) in textData.textLines1" :key="index">
                                    {{ line }}
                                </p>
                            </div>
                            <div class="d-flex flex-column flex-lg-row justify-content-evenly mb-5">
                                <div class="d-flex flex-column me-lg-4">
                                    <div class="mb-3 col-ms-2">
                                        <label for="last_name" class="form-label">Фамилия <span
                                                class="text-danger">*</span></label>
                                        <input @change="lastNameChanged" v-model="userData.last_name" type="text"
                                            class="form-control"
                                            v-bind:class="{ 'border-danger': !(isCorrect.last_name) && last_name_changed }"
                                            id="last_name">
                                        <div v-if="!(isCorrect.last_name) && last_name_changed" id="last_name"
                                            class="form-text text-danger">
                                            Введите вашу фамилию <br class="d-none d-lg-inline">(Кириллица)
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="first_name" class="form-label">Имя <span
                                                class="text-danger">*</span></label>
                                        <input @change="firstNameChanged" v-model="userData.first_name" type="text"
                                            class="form-control"
                                            v-bind:class="{ 'border-danger': !(isCorrect.first_name) && first_name_changed }"
                                            id="first_name">
                                        <div v-if="!(isCorrect.first_name) && first_name_changed" id="first_name"
                                            class="form-text text-danger">
                                            Введите ваше имя <br class="d-none d-lg-inline">(Кириллица)
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="middle_name" class="form-label">Отчество</label>
                                        <input v-model="userData.middle_name" type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !isCorrect.middle_name }" id="middle_name">
                                        <div v-if="!isCorrect.middle_name" id="middle_name" class="form-text text-danger">
                                            Введите ваше отчество <br class="d-none d-lg-inline">(Кириллица)
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-column">

                                    <div class="mb-3">
                                        <label for="phone_number" class="form-label">Телефон <span
                                                class="text-danger">*</span></label>
                                        <input @input="checkFirstLetter" @change="phoneChanged"
                                            v-model="userData.phone_number" maxlength="12" type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !(isCorrect.phone_number) && phone_changed }"
                                            id="phone_number" placeholder="+7XXXXXXXXXX">
                                        <div v-if="!(isCorrect.phone_number) && phone_changed" id="phone_number"
                                            class="form-text text-danger">
                                            Введите ваш телефон <br class="d-none d-lg-inline">например: +79998887766
                                        </div>
                                    </div>

                                    <div class="">
                                        <p>Пол</p>
                                        <div class="d-flex justify-content-lg-evenly justify-content-center">
                                            <div class="form-check me-5 me-lg-0">
                                                <input v-model="userData.sex" class="form-check-input" type="radio"
                                                    name="sex" id="M" value="M" checked>
                                                <label class="form-check-label" for="M">
                                                    Мужской
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input v-model="userData.sex" class="form-check-input" type="radio"
                                                    name="sex" id="F" value="F">
                                                <label class="form-check-label" for="F">
                                                    Женский
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <router-link class="btn" to="/login">
                                    Уже есть аккаунт?
                                </router-link>
                                <button @click="nextStep" type="button" class="btn btn-primary">Следующий шаг</button>
                            </div>
                        </div>
                    </transition>
                    <transition name="slide-fade">
                        <div v-show="step === 2" class="step col-sm-8 mx-auto">
                            <div class="d-flex typewriter mb-3 p-1 border border-dark bg-secondary">
                                <p class="mb-0">Где ты учишься?</p>
                            </div>
                            <div>
                                <select @change="getFacults(); universityChanged(); getSpecialty();"
                                    class="form-select mb-3" v-model="userData.current_university"
                                    v-bind:class="{ 'border-danger': !(this.isCorrect.current_university) && university_changed }">
                                    <option value="-1" selected>Выберите ВУЗ</option>
                                    <option v-for="uviver in univers" :value="uviver.id" :key="uviver.id">
                                        {{ uviver.institution_name }}
                                    </option>
                                </select>

                                <select @change="getSpecialty(); facultyChanged()" class="form-select mb-3"
                                    v-model="userData.current_faculty"
                                    v-bind:class="{ 'border-danger': !(this.isCorrect.current_faculty) && faculty_changed }">
                                    <option value="-1" selected>Выберите Факультет</option>
                                    <option v-for="facult in facults" :value="facult.id" :key="facult.id">
                                        {{ facult.faculty_name }}
                                    </option>
                                </select>

                                <select @change="specialtyChanged" class="form-select mb-3"
                                    v-model="userData.current_specialty"
                                    v-bind:class="{ 'border-danger': !(this.isCorrect.current_specialty) && specialty_changed }">
                                    <option value="-1" selected>Выберите Специальность</option>
                                    <option v-for="specialty in specialties" :value="specialty.id" :key="specialty.id">
                                        {{ specialty.specialty_name }}
                                    </option>
                                </select>
                                <div class="mb-3">
                                    <label for="year" class="form-label">Курс<span class="text-danger">*</span></label>
                                    <input @change="yearChanged" v-model="userData.year" inputmode="numeric" pattern="\d*"
                                        maxlength="2" type="number" class="form-control"
                                        v-bind:class="{ 'border-danger': !(isCorrect.year) && year_changed }" id="year"
                                        style="width: 5em;">
                                    <div v-if="!(isCorrect.year) && year_changed" id="year" class="form-text text-danger">
                                        Пожалуйста, введите курс, на котором вы учитесь.
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button @click="backStep" type="button" class="me-2 btn btn-light">Назад</button>
                                <button @click="nextStep" type="button" class="btn btn-primary">Следующий шаг</button>
                            </div>
                        </div>
                    </transition>
                    <transition name="slide-fade">
                        <div v-show="step === 3" class="step col-sm-8 mx-auto">
                            <div class="d-flex typewriter mb-3 p-1 border border-dark bg-secondary">
                                <p class="mb-0">Осталось еще немного...</p>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input @change="emailChanged" v-model="userData.email" type="email" class="form-control"
                                    id="email" v-bind:class="{ 'border-danger': !this.isCorrect.email }">
                                <div v-if="!(isCorrect.email) && email_changed" id="email" class="form-text text-danger">
                                    Пожалуйста, введите корректный email. Например test@mail.ru
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Пароль</label>
                                <input @change="passwordChanged" v-model="userData.password" type="password"
                                    class="form-control" id="password"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.password }">

                            </div>
                            <div class="mb-3">
                                <label for="passwordConfirm" class="form-label">Повторите пароль</label>
                                <input @change="passwordConfirmChanged" v-model="passwordConfirm" type="password"
                                    class="form-control" id="passwordConfirm"
                                    v-bind:class="{ 'border-danger': !(this.isCorrect.password) && password_confirm_changed }">
                                <div v-if="!(isCorrect.password) && password_changed" id="password"
                                    class="form-text text-danger">
                                    Убедитесь, что вы правильно повторили пароль
                                </div>
                            </div>

                            <div class="form-check mb-3">
                                <input @change="confirmPersonalDataChanged" v-model="this.confirm_personal_data"
                                    v-bind:class="{ 'border-danger': !(this.isCorrect.confirm_personal_data) && confirm_personal_data_changed }"
                                    class="form-check-input" type="checkbox" id="confirm_person_data">
                                <label class="form-check-label" for="confirm_person_data">
                                    Согласен на обработку своих персональных данных в соответствии
                                    с Федеральным законом Российской Федерации от 27 июля 2006 года
                                    № 152-ФЗ "О персональных данных", а также информирование с названными
                                    целями для участия в цифровых студенческих мероприятиях с использованием
                                    платформы "Новый шаг".
                                </label>
                            </div>

                            <div class="d-flex justify-content-center">
                                <button @click="backStep" type="button" class="me-2 btn btn-light">Назад</button>
                                <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
                            </div>
                        </div>
                    </transition>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css'
import { userService } from '../services/user.service'
import { publicService } from '../services/public.service'
import { validateService } from '../services/validate.service'
import { textService } from '../services/text.service'

export default {
    name: 'RegPage',
    data() {
        return {
            step: 1,
            userData: {
                last_name: '',
                first_name: '',
                middle_name: '',
                phone_number: '+7',
                sex: 'M',
                current_university: '-1',
                current_faculty: '-1',
                current_specialty: '-1',
                email: '',
                password: '',
                year: '',
            },
            confirm_personal_data: false,
            isCorrect: {
                last_name: true,
                first_name: true,
                middle_name: true,
                phone_number: true,
                current_university: true,
                current_faculty: true,
                current_specialty: true,
                email: true,
                password: true,
                confirm_personal_data: true,
                year: true,
            },

            univers: {},
            facults: {},
            specialties: {},
            passwordConfirm: '',
            regStatus: '',
            unlock: false,
            last_name_changed: false,
            first_name_changed: false,
            phone_changed: false,
            university_changed: false,
            faculty_changed: false,
            specialty_changed: false,
            email_changed: false,
            password_changed: false,
            password_confirm_changed: false,
            confirm_personal_data_changed: false,
            year_changed: false,

            textData: {
                text1: [
                    'Привет! Это верный адрес, отсюда начинается твой путь',
                    'в профессиональных информационных технологиях.',
                    'Давай знакомиться:'
                ],
                line1: 1,
                textLines1: []
            }
        }
    },
    props: {
        source: String
    },

    created() {
        if (this.source !== undefined) {
            publicService.sendSourse(this.source);
            this.$router.push("/reg");
        }
        this.$store.dispatch('auth/logout');
        this.changeTextForMobile()
        userService.getUnivers().then(response => {
            this.univers = response;
        })
    },
    mounted() {
        this.textData.textLines1.push(this.textData.text1[0])
        if (this.step === 1) {
            textService.appendLine(this.textData.line1, this.textData.text1, this.textData.textLines1);
        }
    },
    methods: {
        changeTextForMobile: function () {
            if (window.innerWidth <= 992) {
                this.textData.text1 = [
                    'Привет! Это верный адрес.',
                    'Отсюда начинается твой путь в',
                    'профессиональных информационных',
                    'технологиях.',
                    'Давай знакомиться:'
                ]
            }
            if (window.innerWidth <= 380) {
                this.textData.text1 = [
                    'Привет! Это верный адрес.',
                    'Отсюда начинается твой путь',
                    'в профессиональных',
                    'информационных',
                    'технологиях.',
                    'Давай знакомиться:'
                ]
            }
            if (window.innerWidth <= 339) {
                this.textData.text1 = [
                    'Привет! Это верный адрес.',
                    'Отсюда начинается',
                    'твой путь',
                    'в профессиональных',
                    'информационных',
                    'технологиях.',
                    'Давай знакомиться:'
                ]
            }
        },
        checkFirstLetter() {
            if (this.userData.phone_number.length < 2 || !this.userData.phone_number.startsWith('+7')) {
                this.userData.phone_number = '+7'
            }
        },
        yearChanged() {
            this.year_changed = true;
            this.isCorrect.year = validateService.checkIsOnlyNumbers(this.userData.year) && this.userData.year <= 6 &&
                this.userData.year > 0;
        },
        emailChanged() {
            this.email_changed = true;
            this.isCorrect.email = validateService.checkIsEmail(this.userData.email)
        },
        passwordChanged() {
            this.password_changed = true;
        },
        passwordConfirmChanged() {
            this.isCorrect.password = this.userData.password == this.passwordConfirm
                && !validateService.checkIsEmptyStr(this.userData.password)
            this.password_confirm_changed = true;
        },
        confirmPersonalDataChanged() {
            this.isCorrect.confirm_personal_data = this.confirm_personal_data
            this.confirm_personal_data_changed = true;
        },
        universityChanged() {
            this.university_changed = true;
            this.isCorrect.current_university = this.userData.current_university != '-1';
        },
        facultyChanged() {
            this.faculty_changed = true;
            this.isCorrect.current_faculty = this.userData.current_faculty != '-1';
        },
        specialtyChanged() {
            this.specialty_changed = true;
            this.isCorrect.current_specialty = this.userData.current_specialty != '-1';
        },
        lastNameChanged() {
            this.last_name_changed = true;
            this.isCorrect.last_name = validateService.checkNamesInput(this.userData.last_name)
        },
        firstNameChanged() {
            this.first_name_changed = true;
            this.isCorrect.first_name = validateService.checkNamesInput(this.userData.first_name)
        },
        phoneChanged() {
            this.phone_changed = true;
            this.isCorrect.phone_number = validateService.checkPhoneNumber(this.userData.phone_number)
        },
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
                    this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Success' })
                    const { email, password } = user;
                    this.$store.dispatch("auth/login", { email, password }).then(
                        () => {
                            this.$router.push("/set-user-skills");
                        })
                } else {
                    this.$store.dispatch('alert/sendMessage', { messge: response.message, type: 'Danger' })
                }
            })
        },

        checkFirstStep() {

            this.isCorrect.middle_name = validateService.checkIsOnlyRussianLetter(this.userData.middle_name) || validateService.checkIsEmptyStr(this.userData.middle_name)
            this.firstNameChanged()
            this.lastNameChanged()
            this.phoneChanged()

            return (this.isCorrect.last_name &&
                this.isCorrect.first_name &&
                this.isCorrect.middle_name &&
                this.isCorrect.phone_number) || this.unlock
        },

        checkSecondStep() {
            this.universityChanged()
            this.facultyChanged()
            this.specialtyChanged()
            this.yearChanged()

            return (this.isCorrect.current_university &&
                this.isCorrect.current_faculty &&
                this.isCorrect.current_specialty &&
                this.isCorrect.year) || this.unlock
        },

        checkThirdStep() {
            this.emailChanged()
            this.passwordConfirmChanged()
            this.confirmPersonalDataChanged()

            return this.isCorrect.email && this.isCorrect.password && this.isCorrect.confirm_personal_data
        },

        getFacults: function () {
            if (this.userData.current_university != -1) {
                userService.getFacults(this.userData.current_university).then(response => {
                    this.facults = response;
                })
            } else {
                this.facults = {};
            }
            this.userData.current_faculty = -1

        },
        getSpecialty: function () {
            if (this.userData.current_faculty != -1) {
                userService.getSpecialty(this.userData.current_university, this.userData.current_faculty).then(response => {
                    this.specialties = response;
                })
            } else {
                this.specialties = {};
            }
            this.userData.current_specialty = -1
        }
    }
}

</script>

<style scoped></style>