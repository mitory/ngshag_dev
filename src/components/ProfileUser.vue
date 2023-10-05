<template>
    <div v-if="!user.error">
        <h1 v-if="user.first_name && user.last_name" class="mb-4">{{ user.first_name + ' ' + user.last_name }}</h1>
        <router-link class="btn btn-primary mb-2" to="/change-password">
            Сменить пароль
        </router-link>
        <div class="mb-4">
            <h5 class="mb-3">Личная информация</h5>
            <div v-if="user.email" class="input-group mb-3">
                <span class="input-group-text" id="email">Email</span>
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.email }}</div>
            </div>
            <div v-if="user.phone_number" class="input-group mb-3">
                <span class="input-group-text" id="phone_number">Телефон</span>
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.phone_number }}</div>
            </div>
        </div>
        <div class="mb-4">
            <h5 class="mb-3">Информация об учебном заведении</h5>
            <div v-if="user.institution && user.institution.institution_name && user.institution.institution_name != 'Нет в списке'"
                class="input-group mb-3">
                <span class="input-group-text" id="inst">Название</span>
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.institution.institution_name }}</div>
            </div>
            <div v-if="user.faculty && user.faculty.faculty_name" class="input-group mb-3">
                <span class="input-group-text" id="faculty">Факультет</span>
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.faculty.faculty_name }}</div>
            </div>
            <div v-if="user.specialty && user.specialty.specialty_name" class="input-group mb-3">
                <span class="input-group-text" id="specialty">Направление</span>
                <!--              <textarea disabled style="resize:none;" class="form-control"
                        :value="user.specialty.specialty_name"
                        aria-label="Название Специальности" aria-describedby="specialty"></textarea>-->
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.specialty.specialty_name }}</div>
            </div>
            <div v-if="user.year" class="input-group mb-3">
                <span class="input-group-text" id="year">Курс</span>
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.year }}</div>
            </div>
        </div>
    </div>
    <div v-else>
        <h3>{{ user.error }}</h3>
    </div>
</template>

<script>
import { userService } from '../services/user.service'

export default {
    data() {
        return {
            user: {
                email: '',
                first_name: '',
                last_name: '',
                // birth_date: '',
                institution: [],
                faculty: [],
                specialty: [],
                phone_number: '',
                year: '',
                error: null
            },
        }
    },
    components: {
    },
    created() {
        this.$store.commit('routes/toProfilePage')
        userService.getLkInfo().then(data => {
            this.user = data;
        }).catch(error => {
            this.user.error = error
        })
    },
    methods: {
        // format_date(date) {
        //     if (date === '') {
        //         return ''
        //     }
        //     const date_items = date.split('-')
        //     return date_items[2] + '.' + date_items[1] + '.' + date_items[0]
        // }
    }
}
</script>

<style scoped>
.bootstrap-like-bg-color {
    background-color: #E9ECEF;
}
</style>