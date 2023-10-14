<template>
    <div v-if="!user.error">
        <h1 v-if="user.first_name && user.last_name" class="mb-4">{{ user.first_name + ' ' + user.last_name }}</h1>
        <div v-if="user.categories.length == 0" class="mb-3 text-center text-white bg-primary p-2 rounded">
            Перейди во вкладку "Выбрать навыки" и выбери компетенции, в которых ты силен.
            После этого станут доступны задачи во вкладке "Мои задачи".
        </div>
        <div v-if="user.email" class="mb-4">
            <h5 class="mb-3 text-uppercase text-center">Личная информация</h5>
            <div v-if="user.email" class="input-group mb-3">
                <span class="input-group-text" id="email">Email</span>
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.email }}</div>
            </div>
            <div v-if="user.phone_number" class="input-group mb-3">
                <span class="input-group-text" id="phone_number">Телефон</span>
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.phone_number }}</div>
            </div>
        </div>
        <div v-if="user.institution && user.institution.institution_name && user.institution.institution_name != 'Нет в списке'"
            class="mb-4">
            <h5 class="mb-3 text-uppercase text-center">Информация об учебном заведении</h5>
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
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.specialty.specialty_name }}</div>
            </div>
            <div v-if="user.year" class="input-group mb-3">
                <span class="input-group-text" id="year">Курс</span>
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.year }}</div>
            </div>
        </div>
        <router-link class="btn btn-primary mb-2" to="/LK/change-password">
            Сменить пароль
        </router-link>
        <div class="mb-3" v-if="user.categories.length > 0">
            <h5 class="mb-3 text-uppercase text-center">Навыки</h5>
            <div v-for="category in user.categories" :key="category.id">
                <div class="fs-5 mb-2">{{ category.name }}</div>
                <div class="d-flex flex-row align-items-center flex-wrap">
                    <div class="d-flex" v-for="skill in category.skills" :key="skill.id">
                        <div class="skill fs-6">{{ skill.name }}</div>
                    </div>
                </div>
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
                error: null,
                categories: []
            },
        }
    },
    components: {
    },
    created() {
        this.$store.commit('routes/toProfilePage')
        const user_data = JSON.parse(localStorage.getItem('user_data'));

        if (user_data) {
            this.user = user_data
        } else {
            userService.getLkInfo().then(data => {
                this.user = data;

                String.prototype.replaceAt = function (index, replacement) {
                    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
                }

                for (let i = 5; i < this.user.phone_number.length; ++i) {
                    this.user.phone_number = this.user.phone_number.replaceAt(i, "*");
                }
                localStorage.setItem('user_data', JSON.stringify(data));
            }).catch(error => {
                this.user.error = error
            })
        }

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

.skill {
    border-radius: 5px;
    background-color: #EEEFF1;
    padding: 0.5em 0.5em 0.5em 0.5em;
    margin-right: 0.7em;
    margin-bottom: 0.7em;
}
</style>