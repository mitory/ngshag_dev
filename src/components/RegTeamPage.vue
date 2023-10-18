<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-sm-4 mx-auto d-flex flex-column justify-content-center" style="min-height: 50vh;">
        <form @submit.prevent="regTeam" novalidate class="mb-2">
          <!-- <div class="mb-3">
            <label for="team_name" class="form-label">Название команды</label>
            <input v-model="team.team_name" type="text" class="form-control" id="team_name">
          </div> -->

          <div class="mb-3 col-ms-2">
            <label for="last_name" class="form-label">Название команды </label>
            <input @change="teamNameChanged" v-model="team_name" type="text" class="form-control"
              v-bind:class="{ 'border-danger': !(isCorrect.team_name) }" id="last_name">
            <div v-if="!(isCorrect.team_name)" id="last_name" class="form-text text-danger">
              Введите название команды
            </div>
          </div>

          <!-- <div class="mb-3">
            <label for="team_password" class="form-label">Пароль команды</label>
            <input v-model="team.team_password" type="password" class="form-control" id="team_password">
          </div> -->

          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">Зарегистрировать команду</button>
          </div>
        </form>

        <router-link class="col-8 text-center text-dark mx-auto" to="/invite-to-team">Хотите присоединиться к уже
          существующей
          команде?</router-link>

      </div>
    </div>
  </div>
</template>

<script>
import { validateService } from '../services/validate.service'
import { teamService } from '../services/team.service'

export default {
  data() {
    return {
      team_name: '',
      team_password: '111',
      isCorrect: {
        team_name: true
      }
    }
  },
  components: {

  },
  created() {
  },
  methods: {
    teamNameChanged() {
      this.isCorrect.team_name = !validateService.checkIsEmptyStr(this.team_name)
    },
    regTeam() {
      this.teamNameChanged()
      if (this.isCorrect.team_name) {
        teamService.registerTeam({ team_name: this.team_name, team_password: '111' }, this.$route.params.id_event)
          .then(response => {
            this.$store.dispatch('alert/sendMessage', { message: response.ok, type: 'Success' })
            // this.$router.push("/");
          }).catch(error => {
            if (error.status && error.status == 400) {
              this.$store.dispatch('alert/sendMessage', { message: error.error, type: 'Danger' });
            } else {
              this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
            }
          })
      }

    }


  }
}
</script>

<style scoped></style>