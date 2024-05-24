<template>
    <div class="modal" @click="closeModal">
      <div class="modal-content" @click.stop="">
        <div class="d-flex justify-content-end">
          <span class="close" @click="closeModal">&times;</span>
        </div>
        <div class="modal__html mb-3 text-center mx-auto col-md-7" v-html="modal.content"></div>
        <form @submit.prevent="regTeam" novalidate class="m-auto col-md-7">

          <div class="mb-3 input-box">
            <label for="team_name" class="form-label">Название команды</label>
            <input v-model="team_name" type="text" class="input"
                    id="team_name"
                    v-bind:class="{ 'border-danger': !(isCorrect.team_name)}" style="width: 100%;">
            </div>

          <div class="d-flex justify-content-center mb-2">
            <button type="submit" class="btn btn-primary">Зарегистрировать команду</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import { validateService } from '../../services/validate.service'
import { teamService } from '../../services/team.service'
import { userService } from '../../services/user.service'
import { publicService } from '../../services/public.service'

export default {
    computed: {
        modal() {
            return this.$store.state.modalCreateTeam;
        }
    },
  data() {
    return {
      team_name: '',
      team_password: '111',
      isCorrect: {
        team_name: true
      },
    }
  },
  methods: {
    closeModal() {
        this.$store.dispatch('modalCreateTeam/closeModal');
        this.clrearModal()
    },
    teamNameChanged() {
      this.isCorrect.team_name = !validateService.checkIsEmptyStr(this.team_name)
      return this.isCorrect.team_name;
    },
    clrearModal(){
      this.team_name = ''
      this.isCorrect.team_name = true
    },
    regTeam() {
      if(!this.teamNameChanged()){
        return;
      }
      teamService.registerTeam({ team_name: this.team_name, team_password: '111' }, this.$store.state.modalCreateTeam.event_id)
        .then(response => {
          this.$store.dispatch('alert/sendMessage', { message: response.ok, type: 'Success' })
          const event_id = this.$store.state.modalCreateTeam.event_id;
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
          this.clrearModal()
        })
      
    }
  }
}
</script>

<style>
</style>