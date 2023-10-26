<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-sm-4 mx-auto">
                <form @submit.prevent="inviteTeam" novalidate>
                    <div class="mb-3">
                        <label for="team_code" class="form-label">Код приглашения</label>
                        <input v-model="team_code" type="text" class="form-control" id="team_code">
                    </div>

                    <button type="submit" class="btn btn-primary">Присоединиться к команде</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { teamService } from '../services/team.service'
import { headerService } from '../services/header.service';

export default {
    data() {
        return {
            team_code: ''
        }
    },
    components: {

    },
    created() {
        headerService.setHeaderButtonsOtherPage()
    },
    methods: {
        inviteTeam() {
            teamService.invitingTeam(this.team_code).then(response => {
                alert(response.message)
            })
        }
    }
}
</script>

<style scoped></style>