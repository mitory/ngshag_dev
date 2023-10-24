<template>
    <div class="teams">
        <div v-if="teams != null">
            <div class="p-2 border border-primary rounded" v-for="team in teams" :value="team.id" :key="team.id">
                <h5 class="mb-1 fs-6">{{ team.event_name }}</h5>
                <p class="p-0 m-0 pb-1 mb-1">Команда: <em class="text-primary task__title">{{ team.name }}</em></p>
                <div class="d-flex justify-content-end">
                    <router-link class="btn btn-primary" :to="{ name: 'team', params: { id: team.id } }">
                        Комната команды
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else>
            <h5 class="text-center">{{ message }}</h5>
            <EventsBar />
        </div>
    </div>
</template>

<script>
import { userService } from '../services/user.service'
import EventsBar from '../components/EventsBar'

export default {
    data() {
        return {
            teams: null,
            message: ''
        }
    },
    components: {
        EventsBar
    },
    created() {
        userService.getTeams().then(response => {
            if (response.status) {
                this.teams = response.data.teams;
            } else {
                this.teams = null
                this.message = response.message
            }
        })
    },
    methods: {

    }
}
</script>

<style scoped></style>