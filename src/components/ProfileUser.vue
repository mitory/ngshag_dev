<template>
    <div>
        <h1 class="mb-4">{{ user.first_name + ' ' + user.last_name }}</h1>
        <div class="mb-4">
            <h5 class="mb-3">Личная информация</h5>
            <div class="input-group mb-3">
                <span class="input-group-text" id="email">Email</span>
                <input disabled type="text" class="form-control" :value="this.user.email" aria-label="Имя пользователя"
                    aria-describedby="email">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="birth_date">Дата рождения</span>
                <input disabled type="text" class="form-control" :value="format_date(user.birth_date)"
                    aria-label="Дата рождения" aria-describedby="birth_date">
            </div>
        </div>

        <div class="mb-4">
            <h5 class="mb-3">Информация об учебном заведении</h5>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inst">Название</span>
                <input disabled type="text" class="form-control" :value="this.user.email"
                    aria-label="Название учебного заведения" aria-describedby="inst">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="birth_date">Факультет</span>
                <input disabled type="text" class="form-control" :value="format_date(user.birth_date)"
                    aria-label="Дата рождения" aria-describedby="birth_date">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="birth_date">Направление</span>
                <input disabled type="text" class="form-control" :value="format_date(user.birth_date)"
                    aria-label="Дата рождения" aria-describedby="birth_date">
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
                birth_date: ''
            },
            inst: {
                name: '',
                faculty: '',
                spec: ''
            }

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

<style scoped></style>