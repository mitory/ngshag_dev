<template>
    <div>
        <h1 class="mb-4">{{ user.first_name + ' ' + user.last_name }}</h1>
        <div class="mb-4">
            <h5 class="mb-3">Личная информация</h5>
            <div class="input-group mb-3">
                <span class="input-group-text" id="email">Email</span>
<!--                <input disabled type="text" class="form-control" :value="this.user.email" aria-label="Имя пользователя"
                    aria-describedby="email">-->
                <div class="form-control text-break bootstrap-like-bg-color">{{ user.email }}</div>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="birth_date">Дата рождения</span>
                <div class="form-control text-break bootstrap-like-bg-color">{{ format_date(user.birth_date) }}</div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="phone_number">Телефон</span>
              <div class="form-control text-break bootstrap-like-bg-color">{{ user.phone_number }}</div>
            </div>
        </div>
        <div class="mb-4">
            <h5 class="mb-3">Информация об учебном заведении</h5>
            <div class="input-group mb-3" >
              <span class="input-group-text" id="inst">Название</span>
              <div class="form-control text-break bootstrap-like-bg-color">{{ user.institution.institution_name }}</div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="faculty">Факультет</span>
              <div class="form-control text-break bootstrap-like-bg-color">{{ user.faculty.faculty_name }}</div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="specialty">Направление</span>
<!--              <textarea disabled style="resize:none;" class="form-control"
                        :value="user.specialty.specialty_name"
                        aria-label="Название Специальности" aria-describedby="specialty"></textarea>-->
              <div class="form-control text-break bootstrap-like-bg-color">{{ user.specialty.specialty_name }}</div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="year">Курс</span>
              <div class="form-control text-break bootstrap-like-bg-color">{{ user.year }}</div>
            </div>
        </div>
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
                birth_date: '',
                institution: [],
                faculty: [],
                specialty: [],
                phone_number:'',
                year:'',
            },
        }
    },
    components: {
    },
    created() {
        this.$store.commit('routes/toProfilePage')
        userService.getLkInfo().then(data => {
            console.log(data)
            this.user = data;
        })
        // userService.postSkills().then(data => {
        //     console.log(data)
        // })
    },
    methods: {
        format_date(date) {
            const date_items = date.split('-')
            return date_items[2] + '.' + date_items[1] + '.' + date_items[0]
            // return date_format.getUTCDate() + '.' + date_format.getMonth() + 1 + '.' + date_format.getUTCFullYear();
        }
    }
}
</script>

<style scoped>
.bootstrap-like-bg-color{
  background-color: #E9ECEF;
}
</style>