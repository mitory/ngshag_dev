<template>
    <div class='col-lg-6 mx-auto border rounded p-2'>
        <h2>Хакатон "Защита в действии". </h2>
        <p class="fs-6 text-primary"><em>6-7 ноября</em></p>
        <p>Вид мероприятия: Чемпионат Тверской области по спортивному программированию,
            дисциплина «Продуктовое программирование». </p>
        <p> Направление: Информационная безопасность. </p>
        <p>Участие командное, максимальное число участников в команде:<em> 5 человек.</em> </p>
        <p>Обязательно ознакомься с <router-link class="text-dark cursor" to="/hackathon-regulations">регламентом
                мероприятия</router-link></p>
        <p>Команда формируется капитаном.</p>
        <p>Время проведения: <em>36 часов</em>. С 9:00 6 ноября до 21:30 7 ноября 2023 года.</p>
        <div class="d-flex justify-content-end">
            <router-link class="btn btn-primary" :to="{ name: 'regTeamPage', params: { id_event: 2 } }">
                Создать команду
            </router-link>
            <!-- <button class="btn btn-primary" @click="showMsg">
                Создать команду
            </button> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components: {

    },
    methods: {
        showMsg: function () {
            this.$store.dispatch('alert/sendMessage', { message: 'Скоро будет доступно', type: 'Danger' })
        }
    }
}
</script>

<style scoped></style>