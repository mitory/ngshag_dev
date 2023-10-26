<template>
    <div class="teams">
        <div class="p-2 border border-primary rounded" :v-if="teams != null" v-for="team in teams" :value="team.id"
            :key="team.id">
            <h5 class="mb-1 fs-6">{{ team.event_name }}</h5>
            <p class="p-0 m-0 pb-1 mb-1">Команда: <em class="text-primary task__title">{{ team.name }}</em></p>
            <div class="d-flex justify-content-end">
                <router-link class="btn btn-primary" :to="{ name: 'team', params: { id: team.id } }">
                    Комната команды
                </router-link>
            </div>
        </div>
        <div :v-else="teams == null">
            <h3>{{ message }}</h3>
        </div>
    </div>
</template>

<script>
import { userService } from '../services/user.service'

export default {
    data() {
        return {
            teams: null,
            message: ''
        }
    },
    components: {

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