<template>
    <article>
        <div class="">
            <h4 class="text-dark text-center">Текущие мероприятия</h4>
            <div class="p-2 border border-dark rounded mb-2">
                <p class="fs-6">Кубок НИИ «Центрпрограммсистем» по ИТ-дисциплинам – 2023</p>
                <!-- <a @click="showMsg" class="text-dark cursor">Читать подробнее</a> -->
            </div>
        </div>
    </article>
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
            this.$store.dispatch('alert/sendMessage', { message: 'Появится в скором будущем', type: 'Danger' })
        }
    }
}
</script>

<style scoped>
.cursor:hover {
    cursor: pointer;
}
</style>