<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-sm-4 mx-auto">
        <form @submit.prevent="regTeam" novalidate>
          <div class="mb-3">
            <label for="team_name" class="form-label">Название команды</label>
            <input v-model="team.team_name" type="text" class="form-control" id="team_name">
          </div>

          <div class="mb-3">
            <label for="team_password" class="form-label">Пароль команды</label>
            <input v-model="team.team_password" type="password" class="form-control" id="team_password">
          </div>

          <button type="submit" class="btn btn-primary">Зарегистрировать команду</button>
        </form>
        <button class="btn btn-primary m-3">
          <router-link to="/invite-to-team">Хотите присоединиться к уже существующей команде?</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { teamService } from '../services/team.service'
import { headerService } from '../services/header.service'

export default {
  data() {
    return {
      team: {
        team_name: '',
        team_password: ''
      }
    }
  },
  components: {

  },
  created() {
    headerService.setHeaderButtonsOtherPage()
  },
  methods: {
    regTeam() {
      teamService.registerTeam(this.team, this.$route.params.id_event).then(response => {
        alert(response.message)
      })
    }
  }
}
</script>

<style scoped></style>