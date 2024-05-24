<template>
    <div class="modal" @click="closeModal">
      <div class="modal-content"  @click.stop="">
        <div class="d-flex justify-content-end">
          <span class="close" @click="closeModal">&times;</span>
        </div>
        <div class="modal__html mb-3 text-center mx-auto col-md-7" v-html="modal.content"></div>
        <form @submit.prevent="joinTeam" novalidate class="m-auto col-md-7">

          <div class="mb-3 input-box">
            <label for="team_code" class="form-label">Код приглашения</label>
            <input v-model="team_code" type="text" class="input"
                    id="team_code"
                    v-bind:class="{ 'border-danger': !(isCorrect.team_code)}" style="width: 100%;">
            </div>

          <div class="d-flex justify-content-center mb-2">
            <button type="submit" class="btn btn-primary">Присоединиться к команде</button>
          </div>
        </form>
      </div>
    </div>
</template>
<script>

import { validateService } from '../../services/validate.service'
import { publicService } from '../../services/public.service'
import { teamService } from '../../services/team.service'
import { userService } from '../../services/user.service'

export default {
    computed: {
        modal() {
            return this.$store.state.modalJoinTeam;
        }
    },
  data() {
    return {
        team_code: '',
        isCorrect: {
            team_code: true
        }
    }
  },
  methods: {
    closeModal() {
        this.$store.dispatch('modalJoinTeam/closeModal');
        this.clrearModal();
    },
    teamCodeChanged() {
        this.isCorrect.team_code = !validateService.checkIsEmptyStr(this.team_code)
        return this.isCorrect.team_code;
    },
    joinTeam() {
        if(!this.teamCodeChanged()){
            return;
        }
        teamService.invitingTeam(this.team_code).then(response => {
            this.$store.dispatch('alert/sendMessage', { message: response.message, type: 'Success' })
            const event_id = this.$store.state.modalJoinTeam.event_id;
            publicService.getNominationsFromEvent(event_id).then(response => {
              response.forEach(el => {
                    userService.postUserNomination(el.id)
                })
            })
            this.closeModal();
            this.$router.push("/LK/my-teams");
        }).catch(error => {
            if (error.status && error.status == 400) {
                this.$store.dispatch('alert/sendMessage', { message: error.error, type: 'Danger' });
            } else {
                this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
            }
            this.clrearModal();
        })
    },
    clrearModal(){
        this.team_code = ''
        this.isCorrect.team_code = true;
    }
  }
}
</script>

<style>
   
</style>