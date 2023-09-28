<template>
    <div class=''>
        <P>Название команда: {{ team.name }}</P>
        <p>Пароль: {{ team.team_password }}</p>
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
import { userService } from '../services/user.service'

export default {
    data() {
        return {
            team: {},
            team_members: {}
        }
    },
    components: {

    },
    created() {
        userService.getTeam(this.$route.params.id).then(response => {
            if (response.status) {
                this.team = response.data.team;
                this.team_members = response.data.team_members;
            } else {
                this.$router.push("/login");
            }
        })
    },
    methods: {

    }
}
</script>

<style scoped></style>