<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item" v-for="(page, index) in pages" :key="page.id">
                        <button v-on:click="tab_select = index" class="nav-link"
                            v-bind:class="{ 'active': tab_select === index, 'text-secondary': tab_select !== index }"
                            v-bind:aria-current="{ 'page': tab_select === index }">{{ page.title }}</button>
                    </li>
                </ul>
            </div>
            <div v-if="tab_select === 0" class="card-body">
                <div class="card mb-4" v-for="event in events" :key="event.id">
                    <div class="card-body">
                        <h5 class="card-title">{{ event.title }}</h5>
                        <p class="card-text">{{ event.text }}</p>
                        <router-link class="btn btn-primary" :to="{ name: 'eventPage', params: { id_event: event.id } }">
                            Читать подробнее
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { publicService } from '../services/public.service'

export default {

    name: 'MainPage',
    data() {
        return {
            events: [],
            tab_select: 0,
            pages: [
                { title: 'Мероприятия', id: 1 },
                { title: 'Новости', id: 2 }
            ]
        }
    },
    components: {

    },
    created() {
        this.$store.commit('routes/toMainPage')
        publicService.getEventsList().then(response => {
            this.events = response;
        })
    },
    methods: {
    }
}
</script>

<style scoped></style>