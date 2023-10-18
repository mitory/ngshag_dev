<template>
    <div class='col-lg-6 mx-auto border rounded p-2'>
        <h2>Хакатон "Защита и действие". </h2>
        <p class="fs-6 text-primary"><em>6-7 ноября</em></p>
        <p>Вид мероприятия: Чемпионат Тверской области по спортивному программированию,
            дисциплина «Продуктовое программирование». </p>
        <p> Направление: Информационная безопасность. </p>
        <p>Участие командное, максимальное число участников в команде:<em> 5 человек.</em> </p>
        <p><a @click="showMsg" class="text-dark cursor">Регламент мероприятия</a></p>
        <p>Время проведения: <em>36 часов</em>. С 9:00 6 ноября до 22:00 7 ноября 2023 года.</p>
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
            this.$store.dispatch('alert/sendMessage', { message: 'Будет размещён 17 октября', type: 'Danger' })
        }
    }
}
</script>

<style scoped></style>