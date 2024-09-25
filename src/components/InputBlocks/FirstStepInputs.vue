<template>
    <div class="d-flex flex-column flex-lg-row g-5 justify-content-center mb-lg-2 mb-3">
        <div class="d-flex flex-column ms-lg-4 align-items-center">
            <div class="mb-3 col-ms-2 input-box">
                <label for="last_name" class="form-label">Фамилия <span class="text-danger">*</span></label>
                <input @input="onlyKirillik('last_name')" v-model="userDataFirst.last_name" type="text"
                    class="input"
                    :class="{ 'border-danger': !(isCorrect.last_name)}"
                    id="last_name">
            </div>

            <div class="mb-3 input-box">
                <label for="first_name" class="form-label">Имя <span
                    class="text-danger">*</span></label>
                <input @input="onlyKirillik('first_name')" v-model="userDataFirst.first_name" type="text"
                    class="input"
                    :class="{ 'border-danger': !(isCorrect.first_name)}"
                    id="first_name">
            </div>

            <div class="mb-3 input-box">
                <label for="middle_name" class="form-label">Отчество</label>
                <input @input="onlyKirillik('middle_name')" v-model="userDataFirst.middle_name" type="text"
                    class="input"
                    :class="{ 'border-danger': !(isCorrect.middle_name)}"
                    id="middle_name">
            </div>
        </div>
        <div class="d-flex flex-column align-items-center align-items-lg-start">
            <div class="mb-3 input-box">
                <label for="phone_number" class="form-label">Телефон <span
                    class="text-danger">*</span></label>
                <input @input="checkTel" v-model="userDataFirst.phone_number" maxlength="12" type="tel" class="input"
                    :class="{ 'border-danger': !(isCorrect.phone_number)}"
                    id="phone_number" placeholder="+7XXXXXXXXXX">
            </div>

            <div class="">
                <p class="mb-1">Пол</p>
                <div class="d-flex flex-lg-column justify-content-lg-evenly justify-content-center">
                    <div class="form-check me-5 me-lg-0">
                        <input v-model="userDataFirst.sex" class="form-check-input" type="radio"
                            name="sex" id="M" value="M" checked>
                        <label class="form-check-label" for="M">Мужской</label>
                    </div>
                    <div class="form-check">
                        <input v-model="userDataFirst.sex" class="form-check-input" type="radio"
                            name="sex" id="F" value="F">
                        <label class="form-check-label" for="F">Женский</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { validateMethod } from '../../methods/validate.method';

export default {
    props: {
        userData: Object,
        isCorrect: Object,
        updateUserData: Function
    },
    data() {
        return {
            userDataFirst: {
                last_name: '',
                first_name: '',
                middle_name: '',
                phone_number: '',
                sex: 'M'
            },
        }
    },
    components: {
        
    },
    created() {
        if(this.userData){
            this.userDataFirst.last_name = this.userData.last_name;
            this.userDataFirst.first_name = this.userData.first_name;
            this.userDataFirst.middle_name = this.userData.middle_name;
            this.userDataFirst.phone_number = this.userData.phone_number;
            this.userDataFirst.sex = this.userData.sex;
        }
        if(!this.userDataFirst.sex) {
            this.userDataFirst.sex = 'M'
        }
        
    },
    methods: {
        checkTel() {
            this.userDataFirst.phone_number = validateMethod.correctiongTel(this.userDataFirst.phone_number)
        },
        onlyKirillik(key) {
            this.userDataFirst[key] = this.userDataFirst[key].replace(/[^а-яА-Я ]/g, '');
        },
        getData() {
            return this.userDataFirst;
        }
    }
}
</script>

<style scoped>
</style>