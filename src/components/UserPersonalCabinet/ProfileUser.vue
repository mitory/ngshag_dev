<template>
    <div>
        <h1 class="text-center mb-4">
            {{ user.first_name + ' ' + user.last_name }}
        </h1>
        <div v-if="user.categories.length == 0"
            class="mb-4 d-flex justify-content-center">
            <button class="btn btn-primary mx-auto" @click="this.$router.push('/LK/set-user-skills')">
                    Выбрать навыки
            </button>

        </div>
        <div v-else class="mb-4">
            <div class="d-flex gap-3 justify-content-center align-items-center mb-3">
                <h5 class="text-uppercase mb-0">Навыки</h5>
                <img class="cursor" src="../../assets/icons/settings.svg" title="Изменить" alt="Изменить" style="width: 25px" @click="this.$router.push('/LK/set-user-skills')"/>
            </div>

            <div class="d-flex flex-wrap gap-2">
                <div v-for="skill in user.skills" :key="skill.id" class="skill fs-6">{{ skill.name }}</div>
            </div>
        </div>
        <div class="mb-4">
            <div class="d-flex gap-sm-3 gap-2 justify-content-center align-items-center mb-3">
                <h5 class="text-uppercase mb-0 text-sm-start text-center">Личная информация</h5>
                <img class="cursor" v-if="!changePersonalData"
                    src="../../assets/icons/settings.svg" 
                    @click="changePersonalData = !changePersonalData" 
                    title="Изменить" alt="Изменить" style="width: 25px" />

                <img class="cursor"  v-if="changePersonalData"
                    src="../../assets/icons/success.svg"  
                    @click="changePersonalData = !changePersonalData; this.changePersonalDataMethod()" 
                    title="Подтвердить" alt="Подтвердить"  style="width: 25px">
            </div>
            <div v-if="!changePersonalData">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="email">Email</span>
                    <div class="form-control text-break">{{ user.email }}</div>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="phone_number">Телефон</span>
                    <div class="form-control text-break">{{ user.phone_number }}</div>
                </div>
                <div v-if="user.birth_date !== '1000-01-01'" class="input-group mb-3">
                    <span class="input-group-text" id="birth_date">Дата рождения</span>
                    <div class="form-control text-break">{{ format_date(user.birth_date) }}</div>
                </div>
                <button class="btn btn-primary mx-auto" @click="this.$router.push('/LK/change-password')">
                    Сменить пароль
                </button>
            </div>
            <div v-else>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="new_phone_number">Телефон</span>
                    <input class="form-control text-break" @input="checkTel" v-model="new_phone_number" maxlength="12" type="tel" id="new_phone_number" placeholder="+7XXXXXXXXXX">
                </div>
                <div class="input-group mb-3 flex-column align-items-center">
                    <span class="input-group-text rounded mb-2" id="birth_date">Дата рождения</span>
                    <VueDatePicker v-model="birth_date" locale="ru" inline auto-apply
                                    :enable-time-picker="false" :max-date="new Date()" model-type="yyyy-MM-dd"
                                    class="mx-auto justify-content-center" id="birth_date">

                    </VueDatePicker>
                </div>
            </div>
        </div>
        <div v-if="user.institution && user.institution.institution_name && user.institution.institution_name != 'Нет в списке'"
            class="mb-4">
            <div class="d-flex gap-sm-3 gap-1 justify-content-center align-items-center mb-3">
                <h5 class="text-uppercase mb-0 text-sm-start text-center">Информация об учебном заведении</h5>
                
                <img class="cursor" v-if="!changeUnivers"
                    src="../../assets/icons/settings.svg" 
                    @click="changeUnivers = !changeUnivers" 
                    title="Изменить" alt="Изменить" style="width: 25px" />

                <img class="cursor"  v-if="changeUnivers"
                    src="../../assets/icons/success.svg"  
                    @click="changeUnivers = !changeUnivers; this.changeUniver()" 
                    title="Подтвердить" alt="Подтвердить"  style="width: 25px">
            </div>
            <div v-if="!changeUnivers">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inst">Название</span>
                    <div class="form-control text-break">{{ user.institution.institution_name }}
                    </div>
                </div>
                <div v-if="user.faculty && user.faculty.faculty_name" class="input-group mb-3">
                    <span class="input-group-text" id="faculty">Факультет</span>
                    <div class="form-control text-break">{{ user.faculty.faculty_name }}</div>
                </div>
                <div v-if="user.specialty && user.specialty.specialty_name" class="input-group mb-3">
                    <span class="input-group-text" id="specialty">Направление</span>
                    <div class="form-control text-break">{{ user.specialty.specialty_name }}</div>
                </div>
                <div v-if="user.year" class="input-group mb-3">
                    <span class="input-group-text" id="year">Курс</span>
                    <div class="form-control text-break">{{ user.year }}</div>
                </div>
            </div>
            <div v-else>
                <SecondStepInputs  :userData="userData" :out_utility="utility" :isCorrect="isCorrect" ref="SecondStepComponent"/>
            </div>
        </div>
    </div>
</template>

<script>
import { LKService } from '../../services/LK.service';
import SecondStepInputs from '../InputBlocks/SecondStepInputs.vue';
import { validateMethod } from '../../methods/validate.method'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    data() {
        return {
            user: {
                email: '',
                first_name: '',
                last_name: '',
                institution: [],
                faculty: [],
                specialty: [],
                phone_number: '',
                year: '',
                error: null,
                categories: null,
                skills: null
            },
            utility: {},
            isCorrect: {},
            userData: {},
            changeUnivers: false,
            changePersonalData: false,
            new_phone_number: '+7',
            birth_date: '2000-01-01'
        }
    },
    components: {
        SecondStepInputs, VueDatePicker
    },
    async created() {

        try {
            await LKService.getLkInfo();
            this.setBirthData();
        } catch (error) {
            console.log('Не удалось обновить личный кабинет')
        }

        const user_data = JSON.parse(localStorage.getItem('user_data'));


        if (user_data) {
            this.user = user_data;
            this.setBirthData();
        } else {
            this.getLK();
        }
    },
    methods: {
        setBirthData(){
            this.birth_date = validateMethod.checkAgeBetween(this.user.birth_date, 14, 100) ? this.user.birth_date : '2000-01-01';
        },
        checkTel() {
            this.new_phone_number = validateMethod.correctiongTel(this.new_phone_number)
        },
        async getLK(){
            try {
                this.user = await LKService.getLkInfo();
                this.setBirthData();
            } catch(error) {
                this.$router.push("/login");
            }
        },
        async changeData(data) {
            try {
                await LKService.changeUserData(data);
                this.getLK();
                this.$store.dispatch('alert/sendMessage', { message: 'Данные успешно изменены', type: 'Success' });
            } catch (error) {
                if(error.response.status === 500) {
                    this.$store.dispatch('alert/sendMessage', { message: error.response.data, type: 'Danger' });
                    return;
                }
                this.$store.dispatch('alert/sendMessage', { message: 'Ошибка на сервере. Данные не были изменены', type: 'Danger' });
            }
        },
        changePersonalDataMethod(){
            const data = {}
            if(validateMethod.checkAgeBetween(this.birth_date, 14, 100) && this.birth_date !== this.user.birth_date) {
                data.birth_date = this.birth_date;
            }
            if(this.new_phone_number.length === 12 && this.new_phone_number !== this.user.phone_number) {
                data.phone_number = this.new_phone_number;
            }
            if(!data.birth_date && !data.phone_number) {
                this.$store.dispatch('alert/sendMessage', { message: 'Данные не были изменены', type: 'Danger' });
                this.setBirthData();
                this.new_phone_number = '+7';
                return;
            }

            this.changeData(data);
            
        },
        checkPhone(){
            this.isCorrect.phone_number = this.userData.phone_number.length === 12;
            return this.isCorrect.phone_number;
        },
        async changeUniver(){
            const { userData } = this.$refs.SecondStepComponent.getData();
            if(userData.currentFacult === '-1' || 
                userData.currentInst === '-1' || 
                userData.currentSpec === '-1' || 
                userData.currentTypeInst === '-1') {
                    this.$store.dispatch('alert/sendMessage', { message: 'Данные не были изменены', type: 'Danger' });
                    return;
            }

            const {currentInst, currentSpec, currentFacult, year} = userData;

            this.changeData({'institution': currentInst, 'faculty': currentFacult, 'specialty': currentSpec, 'year': year});
        },
        format_date(date) {
            const date_items = date.split('-')
            return date_items[2] + '.' + date_items[1] + '.' + date_items[0];
        }
    }
}
</script>

<style scoped>
.input-group-text {
    min-width: 150px;
    border-radius: 10px;
    background: var(--color-white);
    color: var(--color-black)
}
.form-control {
    background: transparent;
    color: var(--color-white)
}

.bootstrap-like-bg-color {
    background-color: #E9ECEF;
}

.skill {
    border-radius: 10px;
    background: var(--color-white);
    color: var(--color-black);
    padding: 5px;
}

@media (max-width: 460px) { 
    .input-group-text {
        min-width: 125px;
        padding: .200rem .50rem;
    }
 }
 @media (max-width: 400px) {
    .input-group-text {
        min-width: 122px;
        padding: .150rem .25rem;
    }
 }
</style>