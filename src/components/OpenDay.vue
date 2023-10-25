<template>
    <div class='col-lg-6 mx-auto border rounded p-2'>
        <h2>Открытый день</h2>
        <p class="fs-6 text-primary"><em>5 ноября</em></p>
        <p>Вид мероприятия: ???</p>
        <p> Направление: ??? </p>
        <p>Участие одиночное </p>
        <p>Время проведения: ???</p>
        <p class="mb-0">
            В этот день любой желающий может прийти на площадку и попробовать свои силы в решении интересных задач.
            <br>Достаточно нажать на кнопку "Я участвую", чтобы записаться на мероприятие!
            <span v-if="isEmailNonAuth" class="text-danger"><br>Подтверди свою почту для участия</span>
        </p>
        <p class="fs-6 text-primary mt-0"><em>Количество мест может быть ограничено</em></p>
        <div v-if="isNonActive != undefined" class="d-flex justify-content-center">
            <button class="btn" :class="{ 'btn-primary': isNonActive, 'btn-secondary': !isNonActive }"
                @click="setNonActive">
                {{ isNonActive ? 'Я участвую!' : 'Я не приду' }}
            </button>
        </div>
    </div>
</template>

<script>
import { userService } from '../services/user.service'

export default {
    data() {
        return {
            isNonActive: undefined,
            isEmailNonAuth: false
        }
    },
    components: {

    },
    created() {
        userService.getUserEvent(3).then((response => {
            this.isNonActive = !response.data
        })).catch(error => {
            if (error.status && [400, 403].includes(error.status)) {
                this.$store.dispatch('alert/sendMessage', { message: error.error, type: 'Danger' });
                if (error.status == 403) {
                    this.isEmailNonAuth = true
                }
            } else {
                this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
            }
            this.isNonActive = undefined

        })
    },
    methods: {
        setNonActive() {
            if (this.isNonActive) {
                userService.postUserEvent(3).then(() => {
                    this.isNonActive = false
                    this.$store.dispatch('alert/sendMessage', { message: 'Мы ждем тебя!', type: 'Success' })
                }).catch((error) => {
                    if (error.status && error.status == 400) {
                        this.$store.dispatch('alert/sendMessage', { message: error.error, type: 'Danger' });
                    } else {
                        this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
                    }
                })
            } else {
                userService.deleteUserEvent(3).then(() => {
                    this.isNonActive = true
                    this.$store.dispatch('alert/sendMessage', { message: 'Очень жаль', type: 'Success' })
                }).catch((error) => {
                    if (error.status && error.status == 400) {
                        this.$store.dispatch('alert/sendMessage', { message: error.error, type: 'Danger' });
                    } else {
                        this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
                    }
                })
            }
        }

    }
}
</script>

<style scoped></style>