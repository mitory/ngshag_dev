<template>
    <div class=''>
        <h5 class="mx-auto text-center">{{ team.name }}</h5>
        <p><em>{{ event_name }}</em></p>
        <p>Код приглашения {{ team.invitation_code }}</p>
        <p>Состав команды:</p>
        <ul>
            <li v-for="member in team_members" :value="member.id" :key="member.id">
                {{ member.first_name + ' ' + member.last_name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { teamService } from '../services/team.service'

export default {
    data() {
        return {
            team: {},
            team_members: {},
            event_name: ''
        }
    },
    components: {

    },
    created() {
        teamService.getTeam(this.$route.params.id).then(response => {
            if (response.status) {
                this.team = response.data.team;
                this.team_members = response.data.team_members;
                this.event_name = response.data.event_name;
            } else {
                this.$router.push("/login");
            }
        }).catch(() => {
            this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
        })
    },
    methods: {

    }
}
</script>

<style scoped></style>