<template>
    <div class=''>
        <div v-if="tasks != null">
            <h2 class="text-center mb-5">Список задач</h2>
            <div v-for="task in tasks" :value="task.id" :key="task.id" class="mb-3 border-bottom pb-3">
                <h5 class="mb-2">Задача: <span class="task__title">{{ task.name }}</span></h5>
                <p>Номинация: <em class="text-primary">{{ task.nomination_name }}</em></p>
                <p class="mb-2">{{ task.description }}</p>
                <p v-if="task.status" class="mb-2" :class="{
                    'text-secondary': task.is_accepted == 'О',
                    'text-success': task.is_accepted == 'П',
                    'text-danger': task.is_accepted == 'Н'
                }">
                    {{ task.status }}
                </p>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary">
                        <router-link router-link :to="{ name: 'task', params: { id: task.id } }">
                            Перейти
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <h3>{{ message }}</h3>
        </div>
    </div>
</template>

<script>
import { userService } from '../services/user.service'


export default {
    data() {
        return {
            tasks: {},
            message: ''
        }
    },
    components: {

    },
    created() {
        userService.getTasks().then(response => {
            console.log(response)
            if (response.status) {
                this.tasks = response.data;
                for (let i = 0; i < this.tasks.length; ++i) {
                    userService.getTaskStatus(this.tasks[i].id).then(response => {
                        if (response.status) {
                            if (response.data) {
                                this.tasks[i]['status'] = response.data.is_accepted_display
                                this.tasks[i]['is_accepted'] = response.data.is_accepted
                            }
                        }
                    })
                }
                if (this.tasks.length == 0) {
                    this.tasks = null
                    this.message = 'Под твои компетенции еще нет задач'
                }
            } else {
                this.tasks = null
                this.message = response.message
            }
        })
    },
    methods: {

    }
}
</script>

<style scoped>
a {
    color: white;
}

.word-break {
    word-break: break-all;
}
</style>