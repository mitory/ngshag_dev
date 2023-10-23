<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-10  mx-auto d-flex flex-column justify-content-center"
                style="min-height: 50vh;">
                <form @submit.prevent="inviteTeam" novalidate class="mb-2">
                    <div class="mb-3 col-xl-8 col-lg-9 col-11 mx-auto">
                        <label for="team_code" class="form-label">Код приглашения</label>
                        <input @change="teamCodeChanged" v-model="team_code" type="text" class="form-control"
                            v-bind:class="{ 'border-danger': !(isCorrect.team_code) }" id="team_code">

                        <div v-if="!(isCorrect.team_code)" id="last_name" class="form-text text-danger">
                            Введите код приглашения
                        </div>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">Присоединиться к команде</button>
                    </div>

                </form>
                <router-link class="col-8 text-center text-dark mx-auto" to="/reg-team/1">Создать команду</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { teamService } from '../services/team.service'
import { validateService } from '../services/validate.service'

export default {
    data() {
        return {
            team_code: '',
            isCorrect: {
                team_code: true
            }
        }
    },
    components: {

    },
    created() {
    },
    methods: {
        teamCodeChanged() {
            this.isCorrect.team_code = !validateService.checkIsEmptyStr(this.team_code)
        },
        inviteTeam() {
            this.teamCodeChanged()
            if (this.isCorrect.team_code) {
                teamService.invitingTeam(this.team_code).then(response => {
                    this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Success' })
                    this.$router.push("/LK/my-teams");
                }).catch(error => {
                    if (error.status && error.status == 400) {
                        this.$store.dispatch('alert/sendMessage', { message: error.error, type: 'Danger' });
                    } else {
                        this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
                    }
                    this.team_code = ''
                    this.isCorrect.team_code = true;
                })

            }
        }
    }
}
</script>

<style scoped></style>