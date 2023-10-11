<style scoped>
.header-title {
    height: 30px;
    background: linear-gradient(270deg, rgba(84, 209, 204, 0.2) 51.05%, rgba(75, 161, 235, 0.2) 66%);
    display: flex;
    justify-content: center;
    margin-bottom: 35px;
}

.header-title__text {
    margin: auto 0;
}

.header__logo {
    display: block;
    max-width: 262.7px;
    max-height: 78.26px;
    text-align: center;
    margin-bottom: 35px;
}

.step {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.step1__hello-text {
    display: flex;
    justify-content: end;
}

.hello_text {
    width: 70%;
    background-color: #F6FCFD;
    padding: 23px;
    margin-bottom: 23px;
}

input {
    display: flex;
    padding: 16px 8px 16px 16px;
    /* align-items: center; */
    /* gap: 10px; */
    /* align-self: stretch; */
    border-radius: 18px;
    background: linear-gradient(180deg, #FFF 0%, #F6FBFD 100%);
    border: 1px solid #2896B9;
}

input[type="text"],
input[type="password"] {
    width: 263px;
    height: 49px;
    margin-bottom: 10px;
    font-size: var(--avg-text-size);
    font-weight: 400;
    color: var(--black-color);
}

.form-label {
    display: inline-block;
    font-size: var(--avg-text-size);
    font-weight: 400;
    color: var(--gray-color);
    margin-bottom: 5px;
}

.step1__inputs {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 23px;
}

/* d-flex justify-content-lg-evenly justify-content-center */
.inputs__sex {
    display: flex;
    justify-content: space-evenly;
}


.form-check {
    display: flex;
    margin-right: 10px;
}

.form-check-input {
    margin-right: 5px;
    width: 20px;
}

.form-check-label {
    color: var(--black-color);
    font-size: var(--avg-text-size);
    font-weight: 400;
}

.step1__buttons {
    width: 90%;
    display: flex;
    justify-content: space-evenly;
}


@media (max-width: 992px) {
    .step1__inputs {
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
    }

    .inputs__sex {
        justify-content: center;
        margin-bottom: 23px;
    }

}

@media (max-width: 767px) {
    .step1__buttons {
        flex-direction: column-reverse;
        align-items: center;
        gap: 23px;
        margin-bottom: 10px;
    }
}
</style>

<template>
    <div class="header-title">
        <h1 class="header-title__text">СТУДЕНЧЕСКИЙ IT-ЧЕМПИОНАТ</h1>
    </div>
    <div class="container">
        <img src="../assets/img/main_logo.svg" alt="Лого" class="header__logo mx-auto">
        <div class="row" style="min-height: 70vh">
            <div class="mx-auto " :class="classCol">
                <form @submit.prevent="registration" novalidate>
                    <transition name="slide-fade">
                        <div v-show="step === 1" class="step">
                            <div class="step1__hello-text">
                                <p class="hello_text text-blue text-thin text-max">
                                    Привет! Это верный адрес, отсюда начинается твоё будущее в профессиональных
                                    информационных технологиях.
                                </p>
                            </div>
                            <div class="step1__inputs">
                                <div class="">
                                    <div class="">
                                        <label for="last_name" class="form-label">Фамилия <span
                                                class="text-danger">*</span></label>
                                        <input @change="lastNameChanged" v-model="userData.last_name" type="text"
                                            class="form-control"
                                            :class="{ 'border-danger': !isCorrect.last_name && utility.firstStep.last_name_changed }"
                                            id="last_name">
                                        <div v-if="!(isCorrect.last_name) && utility.firstStep.last_name_changed"
                                            id="last_name" class="form-text text-danger">
                                            Введи свою фамилию (Кириллица)
                                        </div>
                                    </div>

                                    <div class="">
                                        <label for="first_name" class="form-label">Имя <span
                                                class="text-danger">*</span></label>
                                        <input @change="firstNameChanged" v-model="userData.first_name" type="text"
                                            class="form-control"
                                            v-bind:class="{ 'border-danger': !(isCorrect.first_name) && utility.firstStep.first_name_changed }"
                                            id="first_name">

                                        <div v-if="!(isCorrect.first_name) && utility.firstStep.first_name_changed"
                                            id="first_name" class="form-text text-danger">
                                            Введи своё имя (Кириллица)
                                        </div>
                                    </div>

                                    <div class="">
                                        <label for="middle_name" class="form-label">Отчество</label>
                                        <input @change="middleNameChanged" v-model="userData.middle_name" type="text"
                                            class="form-control"
                                            v-bind:class="{ 'border-danger': !(isCorrect.middle_name) && utility.firstStep.middle_name_chaged }"
                                            id="middle_name">
                                        <div v-if="!(isCorrect.middle_name) && utility.firstStep.middle_name_chaged"
                                            id="middle_name" class="form-text text-danger">
                                            Введи своё отчество (Кириллица)
                                        </div>
                                    </div>
                                </div>
                                <div class="">

                                    <div class="">
                                        <label for="phone_number" class="form-label">Телефон <span
                                                class="text-danger">*</span></label>
                                        <input @input="checkFirstLetter" @change="phoneChanged"
                                            v-model="userData.phone_number" maxlength="12" type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !(isCorrect.phone_number) && utility.firstStep.phone_changed }"
                                            id="phone_number" placeholder="+7XXXXXXXXXX">
                                        <div v-if="!(isCorrect.phone_number) && utility.firstStep.phone_changed"
                                            id="phone_number" class="form-text text-danger">
                                            Введи свой номер телефона например: +79998887766
                                        </div>
                                    </div>

                                    <div class="">
                                        <p class="text-avg text-gray">Пол</p>
                                        <div class="inputs__sex">
                                            <div class="form-check">
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
                            <div class="step1__buttons">
                                <router-link class="btn btn-secondary" to="/login">
                                    Уже есть аккаунт?
                                </router-link>
                                <button @click="nextStep" type="button" class="btn">Следующий шаг</button>
                            </div>
                        </div>
                    </transition>
                    <transition name="slide-fade">
                        <div v-show="step === 2" class="step col-sm-8 mx-auto">
                            <h4 class="d-none d-lg-block text-primary mb-3 text-center mt-3">
                                НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
                            </h4>
                            <h4 class="d-none d-lg-none d-md-block text-primary mb-3 text-center fs-4 mt-3">
                                НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
                            </h4>
                            <h4 class="d-md-none d-block text-primary mb-3 text-center fs-6 mt-3">
                                НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
                            </h4>
                            <div class="d-flex typewriter mb-3 p-1 border border-dark bg-secondary">
                                <p class="mb-0">Где ты учишься?</p>
                            </div>
                            <div>
                                <select @change="getFacults(); universityChanged(); checkNotAnOption(); getSpecialty();"
                                    class="form-select mb-3" v-model="userData.current_university"
                                    v-bind:class="{ 'border-danger': !(this.isCorrect.current_university) && utility.secondStep.university_changed }">
                                    <option value="-1" selected>Выбери учебное заведение</option>
                                    <option v-for=" uviver  in  utility.secondStep.univers " :value="uviver.id"
                                        :key="uviver.id">
                                        {{ uviver.institution_name }}
                                    </option>
                                </select>

                                <div v-show="utility.secondStep.not_an_option.univers">
                                    <div class="mb-3">
                                        <label for="custom_univers" class="form-label">Напиши название учебного
                                            заведения<span class="text-danger">*</span></label>
                                        <input @change="customUniversChanged" v-model="utility.secondStep.custom_univers"
                                            type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !(isCorrect.custom_univers) && utility.secondStep.custom_univers_changed }"
                                            id="custom_univers">
                                    </div>
                                </div>

                                <select @change="getSpecialty(); facultyChanged(); checkNotAnOption();"
                                    v-show="!utility.secondStep.not_an_option.univers" class="form-select mb-3"
                                    v-model="userData.current_faculty"
                                    v-bind:class="{ 'border-danger': !(this.isCorrect.current_faculty) && utility.secondStep.faculty_changed }">
                                    <option value="-1" selected>Выбери Факультет</option>
                                    <option v-for=" facult  in  utility.secondStep.facults " :value="facult.id"
                                        :key="facult.id">
                                        {{ facult.faculty_name }}
                                    </option>
                                </select>

                                <div
                                    v-show="utility.secondStep.not_an_option.facults || utility.secondStep.not_an_option.univers">
                                    <div class="mb-3">
                                        <label for="custom_facults" class="form-label">Напиши название факультета<span
                                                class="text-danger">*</span></label>
                                        <input @change="customFacultsChanged" v-model="utility.secondStep.custom_facults"
                                            type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !(isCorrect.custom_facults) && utility.secondStep.custom_facults_changed }"
                                            id="custom_facults">
                                    </div>
                                </div>

                                <select @change="specialtyChanged(); checkNotAnOption();"
                                    v-show="!utility.secondStep.not_an_option.univers && !utility.secondStep.not_an_option.facults && !utility.secondStep.not_an_option.specialty"
                                    class="form-select mb-3" v-model="userData.current_specialty"
                                    v-bind:class="{ 'border-danger': !(this.isCorrect.current_specialty) && utility.secondStep.specialty_changed }">
                                    <option value="-1" selected>Выбери Специальность</option>
                                    <option v-for=" specialty  in  utility.secondStep.specialties " :value="specialty.id"
                                        :key="specialty.id">
                                        {{ specialty.specialty_name }}
                                    </option>
                                </select>

                                <div
                                    v-show="utility.secondStep.not_an_option.facults || utility.secondStep.not_an_option.univers || utility.secondStep.not_an_option.specialty">
                                    <div class="mb-3">
                                        <label for="custom_specialty" class="form-label">Напиши название специальности<span
                                                class="text-danger">*</span></label>
                                        <input @change="customSpecialtyChanged"
                                            v-model="utility.secondStep.custom_specialty" type="text" class="form-control"
                                            v-bind:class="{ 'border-danger': !(isCorrect.custom_specialty) && utility.secondStep.custom_specialty_changed }"
                                            id="custom_specialty">
                                    </div>
                                </div>


                                <div class="mb-3">
                                    <label for="year" class="form-label">Курс<span class="text-danger">*</span></label>
                                    <input @input="checkCorrectYear" @change="yearChanged" v-model="userData.year"
                                        inputmode="numeric" pattern="\d*" maxlength="2" type="number" class="form-control"
                                        v-bind:class="{ 'border-danger': !(isCorrect.year) && utility.secondStep.year_changed }"
                                        id="year" style="width: 5em;">
                                    <div v-if="!(isCorrect.year) && utility.secondStep.year_changed" id="year"
                                        class="form-text text-danger">
                                        Введи курс, на котором ты учишься.
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
                            <h4 class="d-none d-lg-block text-primary mb-3 text-center mt-3">
                                НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
                            </h4>
                            <h4 class="d-none d-lg-none d-md-block text-primary mb-3 text-center fs-4 mt-3">
                                НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
                            </h4>
                            <h4 class="d-md-none d-block text-primary mb-3 text-center fs-6 mt-3">
                                НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
                            </h4>
                            <div class="d-flex typewriter mb-3 p-1 border border-dark bg-secondary">
                                <p class="mb-0">Осталось еще немного...</p>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input @change="emailChanged" v-model="userData.email" type="email" class="form-control"
                                    id="email"
                                    v-bind:class="{ 'border-danger': !(isCorrect.email) && utility.thirdStep.email_changed }">
                                <div v-if="!(isCorrect.email) && utility.thirdStep.email_changed" id="email"
                                    class="form-text text-danger">
                                    Введи корректный email. Например test@mail.ru
                                </div>
                            </div>

                            <div class="mb-3 pass-eye">
                                <label for="password" class="form-label">Пароль</label>
                                <input @change="passwordChanged" v-model="userData.password"
                                    :type="utility.thirdStep.isShowPass ? 'text' : 'password'"
                                    class="form-control pass-eye__inp" id="password"
                                    v-bind:class="{ 'border-danger': !this.isCorrect.password }">

                                <span @click="utility.thirdStep.isShowPass = !utility.thirdStep.isShowPass"
                                    class="pass-eye__btn" :class="{ 'active': utility.thirdStep.isShowPass }"></span>

                            </div>
                            <div class="mb-3 pass-eye">
                                <label for="passwordConfirm" class="form-label">Повторите пароль</label>
                                <input @change="passwordConfirmChanged" v-model="utility.thirdStep.passwordConfirm"
                                    :type="utility.thirdStep.isShowConfirmPass ? 'text' : 'password'"
                                    class="form-control pass-eye__inp" id="passwordConfirm"
                                    v-bind:class="{ 'border-danger': !(isCorrect.password) && utility.thirdStep.password_confirm_changed }">

                                <span @click="utility.thirdStep.isShowConfirmPass = !utility.thirdStep.isShowConfirmPass"
                                    class="pass-eye__btn"
                                    :class="{ 'active': utility.thirdStep.isShowConfirmPass, 'spacing-minus': !(isCorrect.password) && utility.thirdStep.password_confirm_changed }"></span>

                                <div v-if="!(isCorrect.password) && utility.thirdStep.password_confirm_changed"
                                    id="password" class="form-text text-danger">
                                    Убедись, что ты правильно повторил пароль
                                </div>
                            </div>

                            <div class="form-check mb-3">
                                <input @change="confirmPersonalDataChanged" v-model="this.confirm_personal_data"
                                    v-bind:class="{ 'border-danger': !(this.isCorrect.confirm_personal_data) && utility.thirdStep.confirm_personal_data_changed }"
                                    class="form-check-input" type="checkbox" id="confirm_person_data">
                                <label class="form-check-label" for="confirm_person_data">
                                    Согласен на обработку своих персональных данных в соответствии
                                    с Федеральным законом Российской Федерации от 27 июля 2006 года
                                    № 152-ФЗ "О персональных данных", а также информирование для участия в цифровых
                                    студенческих мероприятиях с использованием
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
            <transition name="slide-fade">
                <div v-if="step === 4" class="">
                    <h4 class="d-none d-lg-block text-primary mb-3 text-center mt-3">
                        НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
                    </h4>
                    <h4 class="d-none d-lg-none d-md-block text-primary mb-3 text-center fs-4 mt-3">
                        НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
                    </h4>
                    <h4 class="d-md-none d-block text-primary mb-3 text-center fs-6 mt-3">
                        НОВЫЙ ШАГ: НАЧАЛО ТВОЕГО ПУТИ<br>В ЦИФРОВЫХ ПРОФЕССИЯХ
                    </h4>
                    <div class="col-md-10 col-lg-8 col-xl-8 col-xxl-8 mx-auto">
                        <div class="col-5 col-md-3 typewriter p-1 border border-dark bg-secondary mb-3">
                            <p class="line m-0 pb-0 text-center fs-sm-5 text-mobile">
                                Поздравляем
                            </p>
                        </div>
                        <p class="text-md-start text-center mb-3">
                            с успешной регистрацией на платформе для проведения цифровых мероприятий! Это не только
                            действенный способ усилить свои компетенции, но и возможность получить классные бонусы и
                            предложение на работу в крупную ИТ-компанию. Далее необходимо выяснить направления, по
                            которым
                            ты будешь участвовать в Чемпионате.
                        </p>
                        <p class="text-md-start text-center">
                            С 3 по 7 ноября 2023 на площадке
                            ДЦ «Октябрьский» состоится студенческий чемпионат
                            в области информационных технологий.
                            Извещение о твоих последующих действиях и отборочных
                            заданиях придёт на указанный адрес электронной почты
                            и в личный кабинет.
                        </p>
                    </div>
                    <div class="d-flex justify-content-center mt-2">
                        <button @click="nextStep" type="button" class="btn btn-primary">Продолжить</button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css'
import { userService } from '../services/user.service'
import { publicService } from '../services/public.service'
import { validateService } from '../services/validate.service'

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
                custom_univers: true,
                custom_specialty: true,
                custom_facults: true,
                unlock: false,
            },
            utility: {
                firstStep: {
                    last_name_changed: false,
                    first_name_changed: false,
                    phone_changed: false,
                    middle_name_chaged: false,
                },
                secondStep: {
                    univers: {},
                    facults: {},
                    specialties: {},
                    university_changed: false,
                    faculty_changed: false,
                    specialty_changed: false,
                    year_changed: false,
                    not_an_option: {
                        univers: false,
                        facults: false,
                        specialty: false
                    },
                    custom_univers: '',
                    custom_univers_changed: false,
                    custom_specialty: '',
                    custom_specialty_changed: false,
                    custom_facults: '',
                    custom_facults_changed: false
                },
                thirdStep: {
                    passwordConfirm: '',
                    regStatus: '',
                    email_changed: false,
                    password_changed: false,
                    password_confirm_changed: false,
                    confirm_personal_data_changed: false,
                    isShowPass: false,
                    isShowConfirmPass: false
                },
            }
        }
    },
    props: {
        source: String
    },
    computed: {
        classCol() {
            return {
                'col-8': window.innerWidth > 768,
                'col-10': window.innerWidth <= 768 && window.innerWidth > 576,
                'col-12': window.innerWidth <= 576
            };
        }
    },
    created() {
        if (this.source !== undefined) {
            publicService.sendSourse(this.source);
            this.$router.push("/reg");
        }
        this.$store.dispatch('auth/logout');
        userService.getUnivers().then(response => {
            this.utility.secondStep.univers = response;
        })
    },
    mounted() {
    },
    methods: {
        styleDanger(isDanger) {
            return {
                'border-danger': isDanger,
                'border-success': !isDanger
            }
        },
        customUniversChanged() {
            this.utility.secondStep.custom_univers_changed = true;
            this.isCorrect.custom_univers = !validateService.checkIsEmptyStr(this.utility.secondStep.custom_univers)
        },
        customFacultsChanged() {
            this.utility.secondStep.custom_facults_changed = true;
            this.isCorrect.custom_facults = !validateService.checkIsEmptyStr(this.utility.secondStep.custom_facults)
        },
        customSpecialtyChanged() {
            this.utility.secondStep.custom_specialty_changed = true;
            this.isCorrect.custom_specialty = !validateService.checkIsEmptyStr(this.utility.secondStep.custom_specialty)
        },
        checkNotAnOption() {
            this.utility.secondStep.not_an_option.univers = this.userData.current_university == '1';
            if (this.utility.secondStep.not_an_option.univers) {
                this.userData.current_faculty = -2
                this.userData.current_specialty = -2
            }

            this.utility.secondStep.not_an_option.facults = this.userData.current_faculty == '-2';

            if (this.utility.secondStep.not_an_option.facults) {
                this.userData.current_specialty = -2
            }

            this.utility.secondStep.not_an_option.specialty = this.userData.current_specialty == '-2';

        },
        checkCorrectYear() {
            if (this.userData.year === '') {
                return;
            }
            if (this.userData.year < 1) {
                this.userData.year = 1
            } else {
                if (this.userData.year > 6) {
                    this.userData.year = 6
                }
            }
        },
        checkFirstLetter() {
            if (this.userData.phone_number.length < 2 || !this.userData.phone_number.startsWith('+7')) {
                this.userData.phone_number = '+7'
            }
        },
        yearChanged() {
            this.utility.secondStep.year_changed = true;
            this.isCorrect.year = validateService.checkIsOnlyNumbers(this.userData.year) && ((this.userData.year <= 6 &&
                this.userData.year > 0) || this.userData.year === '');
        },
        emailChanged() {
            this.utility.thirdStep.email_changed = true;
            this.isCorrect.email = validateService.checkIsEmail(this.userData.email)
        },
        passwordChanged() {
            this.utility.thirdStep.password_changed = true;
            this.isCorrect.password = (this.userData.password == this.utility.thirdStep.passwordConfirm
                && !validateService.checkIsEmptyStr(this.userData.password)) || !(this.utility.thirdStep.password_confirm_changed)
        },
        passwordConfirmChanged() {
            this.isCorrect.password = this.userData.password == this.utility.thirdStep.passwordConfirm
                && !validateService.checkIsEmptyStr(this.userData.password)
            this.utility.thirdStep.password_confirm_changed = true;
        },
        confirmPersonalDataChanged() {
            this.isCorrect.confirm_personal_data = this.confirm_personal_data
            this.utility.thirdStep.confirm_personal_data_changed = true;
        },
        universityChanged(finale_check = false) {
            this.utility.secondStep.university_changed = true;
            this.isCorrect.current_university = this.userData.current_university != '-1';
            if (this.isCorrect.current_university) {
                this.isCorrect.current_faculty = '-1'
                this.isCorrect.current_specialty = '-1'
            }
            if (this.userData.current_university != 1 && !finale_check) {
                this.utility.secondStep.custom_univers = '';
                this.utility.secondStep.custom_facults = '';
                this.utility.secondStep.custom_specialty = '';
                this.utility.secondStep.not_an_option.specialty = false
            }
            if (this.userData.current_university != 1 && !finale_check) {
                this.userData.current_faculty = -1;
                this.userData.current_specialty = -1;
            }
        },
        facultyChanged(finale_check = false) {
            this.utility.secondStep.faculty_changed = true;
            this.isCorrect.current_faculty = this.userData.current_faculty != '-1';

            if (this.isCorrect.current_faculty) {
                this.isCorrect.current_specialty = '-1'
            }
            if (this.userData.current_faculty != -2 && !finale_check) {
                this.utility.secondStep.custom_facults = '';
                this.utility.secondStep.custom_specialty = '';
            }
            if (this.userData.current_faculty == -1) {
                this.userData.current_specialty = -1
            }
        },
        specialtyChanged(finale_check = false) {
            this.utility.secondStep.specialty_changed = true;
            this.isCorrect.current_specialty = this.userData.current_specialty != '-1';
            if (this.userData.current_specialty != -2 && !finale_check) {
                this.utility.secondStep.custom_specialty = '';
            }
        },
        lastNameChanged() {
            this.utility.firstStep.last_name_changed = true;
            this.userData.last_name = this.userData.last_name.trim()
            this.isCorrect.last_name = validateService.checkNamesInput(this.userData.last_name)
        },
        firstNameChanged() {
            this.utility.firstStep.first_name_changed = true;
            this.userData.first_name = this.userData.first_name.trim()
            this.isCorrect.first_name = validateService.checkNamesInput(this.userData.first_name)
        },
        phoneChanged() {
            this.utility.firstStep.phone_changed = true;
            this.isCorrect.phone_number = validateService.checkPhoneNumber(this.userData.phone_number)
        },
        middleNameChanged() {
            this.utility.firstStep.middle_name_chaged = true;
            this.userData.middle_name = this.userData.middle_name.trim()
            this.isCorrect.middle_name = validateService.checkIsOnlyRussianLetter(this.userData.middle_name) || validateService.checkIsEmptyStr(this.userData.middle_name)
        },
        nextStep() {
            if (this.step === 1 && !this.checkFirstStep()) {
                return false;
            }
            if (this.step === 2 && !this.checkSecondStep()) {
                return false
            }
            if (this.step === 4) {
                this.$router.push("/");
            }
            this.step++
        },
        backStep() {
            this.step--
        },
        registration() {

            const resort = {
                university: this.utility.secondStep.custom_univers ?
                    this.utility.secondStep.custom_univers :
                    `id: ${this.userData.current_university}`,
                faculty: this.utility.secondStep.custom_facults ?
                    this.utility.secondStep.custom_facults :
                    `id: ${this.userData.current_faculty}`,
                speciality: this.utility.secondStep.custom_specialty ?
                    this.utility.secondStep.custom_specialty :
                    `id: ${this.userData.current_specialty}`
            }

            const sendingEducationResort = `Вуз ${resort.university} \n
                                            Факультет ${resort.faculty} \n
                                            Специальность ${resort.speciality}`

            let is_resort = false
            if (this.isCorrect.custom_univers ||
                this.isCorrect.custom_facults || this.isCorrect.custom_specialty) {
                is_resort = true
                this.userData.current_university = 1
                this.userData.current_faculty = '';
                this.userData.current_specialty = '';
            }

            if (!this.checkThirdStep()) {
                return false;
            }

            const user = this.userData;
            this.$store.dispatch('auth/register', user).then(response => {
                if (response.status) {
                    this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Success' })
                    const { email, password } = user;
                    this.$store.dispatch("auth/login", { email, password }).then(
                        () => {

                            if (is_resort) {
                                userService.sendEducationReport(sendingEducationResort).then(
                                    response => {
                                        if (response.status) {
                                            this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Success' })
                                        } else {
                                            this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Danger' })
                                        }

                                    })
                            }
                            this.step = 4
                        })

                } else {
                    this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Danger' })
                }
            })
        },

        checkFirstStep() {

            this.middleNameChanged()
            this.firstNameChanged()
            this.lastNameChanged()
            this.phoneChanged()

            return (this.isCorrect.last_name &&
                this.isCorrect.first_name &&
                this.isCorrect.middle_name &&
                this.isCorrect.phone_number) || this.isCorrect.unlock
        },

        checkSecondStep() {
            this.universityChanged(true)
            this.facultyChanged(true)
            this.specialtyChanged(true)
            this.yearChanged()
            this.customUniversChanged()
            this.customFacultsChanged()
            this.customSpecialtyChanged()

            this.isCorrect.current_university = this.userData.current_university != '1' &&
                this.userData.current_university != '-1';
            this.isCorrect.current_faculty = this.userData.current_faculty != '-2' &&
                this.userData.current_faculty != '-1';
            this.isCorrect.current_specialty = this.userData.current_specialty != '-2' &&
                this.userData.current_specialty != '-1'

            const result = ((this.isCorrect.current_university && this.isCorrect.current_faculty) && (this.isCorrect.current_specialty || this.isCorrect.custom_specialty)) || ((this.isCorrect.custom_facults && this.isCorrect.custom_specialty) && (this.isCorrect.current_university || this.isCorrect.custom_univers))
            return (result && this.isCorrect.year) || this.isCorrect.unlock;
        },

        checkThirdStep() {
            this.emailChanged()
            this.passwordChanged()
            this.passwordConfirmChanged()
            this.confirmPersonalDataChanged()

            return this.isCorrect.email && this.isCorrect.password && this.isCorrect.confirm_personal_data
        },

        getFacults: function () {
            if (this.userData.current_university != -1 && this.userData.current_university != 1) {
                userService.getFacults(this.userData.current_university).then(response => {
                    this.utility.secondStep.facults = response;
                    this.utility.secondStep.facults.unshift({ id: -2, faculty_name: 'Нет в списке' })
                })
            } else {
                this.utility.secondStep.facults = [];
            }
            this.userData.current_faculty = -1

        },
        getSpecialty: function () {
            if (this.userData.current_faculty != -1 && this.userData.current_faculty != -2) {
                userService.getSpecialty(this.userData.current_university, this.userData.current_faculty).then(response => {
                    this.utility.secondStep.specialties = response;
                    this.utility.secondStep.specialties.unshift({ id: -2, specialty_name: 'Нет в списке' })
                })
            } else {
                this.utility.secondStep.specialties = [];
            }
            this.userData.current_specialty = -1
        }
    }
}

</script>