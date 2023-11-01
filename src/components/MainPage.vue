<template>
  <div class="container">
    <div class="row d-flex justify-content-between">
      <div>
        <h1 class="fs-3 text-center mb-4">Студенческий фестиваль ИТ-профессий<br>«Новый шаг-2023»</h1>
        <p v-if="user" class="col-8 mx-auto text-center text-primary mb-5">
          <em>{{ user.first_name }}, добро пожаловать на чемпионат! Можешь приступать к выполнению задач. <br>Выложись по
            полной,
            мы верим в тебя!</em>
        </p>
        <div v-if="tasks != null && load" class="col-8 mx-auto">
          <div v-for="task in tasks" :value="task.id" :key="task.id"
            class="mb-2 border-bottom pb-1 d-flex justify-content-between" :id="task.nomination">
            <h5 class="mb-1 fs-6">Номинация: <span class="task__title">{{ task.nomination_name }}</span></h5>
            <button class="btn btn-primary" @click="postTask(task.id, task.is_accepted)"
              :class="{ 'd-none': task.is_accepted == 'П' || task.is_accepted == 'Н' }">

              {{ task['button_text'] }}

            </button>
          </div>
        </div>
        <div v-else>
          <h3>{{ message }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publicService } from '../services/public.service'
import { userService } from '../services/user.service'

export default {

  name: 'MainPage',
  data() {
    return {
      events: [],
      nominations: [],
      tasks: null,
      message: '',
      ids_nomination: [],
      load: false,
      user: null
    }
  },
  async created() {

    const user_data = JSON.parse(localStorage.getItem('user_data'));

    if (user_data) {
      this.user = user_data
    } else {
      userService.getLkInfo().then(data => {
        this.user = data;
      }).catch(() => {
        this.user = null
      })
    }

    try {
      this.$store.commit('routes/toMainPage')

      const eventList = await publicService.getEventsList();
      this.events = eventList;
      const response = await userService.getTasks()
      if (response.status) {
        this.tasks = response.data;
      } else {
        this.tasks = null
        this.message = response.message
        return;
      }

      for (let i = 0; i < this.events.length; ++i) {
        const userEvent = await userService.getUserEvent(this.events[i].id);
        if (!userEvent.data) {
          const event = await publicService.getEvent(this.events[i].id)
          this.tasks = this.tasks.filter(x => x.nomination != Number(event.text))
        }
      }
      this.load = true

      if (response.status) {
        this.tasks.sort((a, b) => a.nomination - b.nomination);

        for (let i = 0; i < this.tasks.length; ++i) {
          userService.getTaskStatus(this.tasks[i].id).then(response => {
            if (response.status) {
              if (response.data) {
                this.tasks[i]['status'] = response.data.is_accepted_display
                this.tasks[i]['is_accepted'] = response.data.is_accepted
                if (this.tasks[i].is_end_date_passed) {
                  if (this.tasks[i]['is_accepted'] == 'C' || this.tasks[i]['is_accepted'] == 'О') {
                    this.tasks[i]['button_text'] = "Перейти к условию";
                  }
                }
              }
            } else {
              if (this.tasks[i].is_end_date_passed) {
                this.tasks[i]['button_text'] = "Приступить к выполнению";
              }

            }
          })
        }

        if (this.tasks.length == 0) {
          this.tasks = null
          this.message = 'Задач не найдено'
        }
      }
    } catch {
      this.message = 'Что-то пошло не так, попробуйте обновить страницу и перезайти в аккаунт. Если это не помогло, позовите организатора.'
    }
  },
  methods: {
    postTask(id, is_accepted) {
      if (!is_accepted) {
        const formData = new FormData();
        formData.append('task_id', id);

        userService.postTaskFile(formData).then(() => {
          this.$store.dispatch('alert/sendMessage', { message: 'Вы приступили к выполнению!', type: 'Success' })
          this.$router.push("/my-tasks/" + id);
        }).catch(error => {
          this.$store.dispatch('alert/sendMessage', { message: error.response.data.error, type: 'Danger' });
        })
      } else {
        this.$router.push("/my-tasks/" + id);
      }


    }
  }
}
</script>

<style scoped>
.link-nomination:hover {
  background: #0d6efd;
  color: white;
}

.link-underline-none {
  text-decoration: none;
}

a {
  color: black
}
</style>