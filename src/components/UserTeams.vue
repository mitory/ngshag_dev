<template>
    <div class="teams">
        <div :v-if="teams != null" v-for="team in teams" :value="team.id" :key="team.id">
            <h3>Команда: {{ team.name }}</h3>
            <button class="btn btn-primary m-3">
                <router-link router-link :to="{ name: 'team', params: { id: team.id } }">
                    Перейти
                </router-link>
            </button>
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