<template>
    <article v-if="event_list.length">
        <div class="">
            <h4 class="text-white text-center">{{title ? title: 'Текущие мероприятия'}}</h4>
            <div v-for="event in event_list" :key="event.id" class="p-2 templ-item__bg mb-2 text-center">
                <p class="fs-6" v-html="event.name"></p>
                <router-link v-if="event.link_name" class="text-white link hover-btn" :to="'/event/' + event.id">Читать
                    подробнее</router-link>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        event_list: Array,
        title: String
    },
    data() {
        return {

        }
    },
    components: {

    },
    methods: {
    }
}
</script>

<style scoped></style>