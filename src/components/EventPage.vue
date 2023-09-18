<template>
    <div class='container'>
        <h1>{{ event_data.title }}</h1>
        <p>{{ event_data.text }}</p>
        <p>Начало мероприятия: {{ event_data.start_date }}</p>
        <p>Окончание мероприятия: {{ event_data.end_date }}</p>
        <p>Максимальное количество участников в команде: {{ event_data.team_size }}</p>
        <p>Максимальное количество участников в мероприятии: {{ event_data.max_members }}</p>
        <button class="btn btn-primary m-3">
            <router-link :to="{ name: 'regTeamPage', params: { id_event: this.$route.params.id_event } }">
                Зарегистрироваться
            </router-link>
        </button>
    </div>
</template>

<script>
import { publicService } from '../services/public.service'
import { headerService } from '../services/header.service'

export default {
    data() {
        return {
            event_data: {}
        }
    },
    components: {

    },
    created() {
        headerService.setHeaderButtonsOtherPage()
        publicService.getEvent(this.$route.params.id_event).then(response => {
            this.event_data = response;
        })
    },
    methods: {

    }
}
</script>

<style scoped></style>