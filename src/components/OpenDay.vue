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
        </p>
        <p class="fs-6 text-primary mt-0"><em>Количество мест может быть ограничено</em></p>
        <div class="d-flex justify-content-center">
            <button class="btn" :class="{ 'btn-primary': isNonActive, 'btn-secondary': !isNonActive }"
                @click="isNonActive = !isNonActive">
                {{ isNonActive ? 'Я участвую!' : 'Я не приду' }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isNonActive: true
        }
    },
    components: {

    },
    methods: {

    }
}
</script>

<style scoped></style>