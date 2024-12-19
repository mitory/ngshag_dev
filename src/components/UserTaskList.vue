<template>
    <div class=''>
        <div v-if="tasks != null">
            <!-- <p v-if="user_name"><em>{{ user_name }}, начался отборочный этап мероприятия, теперь ты можешь приступить к
                    выполнению задач. <br>Отправлять решения можно до 31.10.2023 включительно</em></p>
            <p v-else><em>Уважаемый пользователь! начался отборочный этап мероприятия, теперь ты можешь приступить к
                    выполнению задач. <br>Отправлять решения можно до 31.10.2023 включительно</em></p> -->
            <h2 class="text-center mb-5">Задачи</h2>

            <div v-for="task in tasks" :value="task.id" :key="task.id" class="mb-2 border-bottom pb-1"
                :id="task.nomination">
                <!-- <h5 class="mb-1 fs-6">Задача: <span class="task__title">{{ task.name }}</span></h5> -->
                <!-- <h5 class="mb-1 fs-6">Номинация: <span class="task__title">{{ task.nomination_name }}</span></h5> -->
                <h5 class="mb-1 fs-6"><span class="task__title">{{ task.name }}</span></h5>
                <!-- <p class="p-0 m-0 pb-1">Задача: <em class="text-primary task__title">{{ task.name }}</em></p> -->
                <!-- <p class="p-0 m-0 pb-1">Номинация: <em class="text-primary">{{ task.nomination_name }}</em></p> -->
                <p v-if="task.is_user_category && !task.is_accepted" class="text-warning">
                    Рекомендовано
                </p>

                <p v-if="task.status" class="p-0 m-0" :class="{
                    'text-secondary': task.is_accepted == 'О',
                    'text-success': task.is_accepted == 'П',
                    'text-danger': task.is_accepted == 'Н',
                    'd-none': task.is_accepted == 'C'
                }">
                    {{ task.status }}
                </p>
                <div v-if="task['button_text']" class="d-flex justify-content-end">
                    <button class="btn btn-primary" @click="postTask(task.id, task.is_accepted)" v-if="task['button_text']"
                        :class="{ 'd-none': task.is_accepted == 'П' || task.is_accepted == 'Н' }">

                        {{ task['button_text'] }}

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
            tasks: null,
            message: '',
            user_name: ''
        }
    },
    components: {

    },
    created() {
        const user_data = JSON.parse(localStorage.getItem('user_data'));

        if (user_data) {
            this.user_name = user_data.first_name
        }

        userService.getTasks().then(response => {
            if (response.status) {
                this.tasks = response.data;
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

                                // if (this.tasks[i]['is_accepted'] == 'П' || this.tasks[i]['is_accepted'] == 'Н') {
                                //     this.tasks[i]['button_text'] = null;
                                // }
                            }
                        } else {
                            if (this.tasks[i].is_end_date_passed) {
                                this.tasks[i]['button_text'] = "Приступить к выполнению";
                            }

                        }
                    })
                }
                //this.setTextButton()

                if (this.tasks.length == 0) {
                    this.tasks = null
                    this.message = 'Задач не найдено'
                } else {
                    //setTimeout(this.sortTasks, 1500);
                }
                const hash = this.$route.params.hash;
                if (hash) {
                    setTimeout(() => {
                        const elementToScrollTo = document.getElementById(hash);
                        if (elementToScrollTo) {
                            elementToScrollTo.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 500);

                }
            } else {
                this.tasks = null
                this.message = response.message
            }
        })
    },
    methods: {
        sortTasks() {
            const customSortOrder = { 'C': 1, 'П': 2, 'Н': 3, 'О': 4 };

            this.tasks = this.tasks.sort((a, b) => {
                const aOrder = customSortOrder[a.is_accepted] || 5;
                const bOrder = customSortOrder[b.is_accepted] || 5;

                if (aOrder !== bOrder) {
                    return aOrder - bOrder;
                }

                // Если значения a.is_accepted и b.is_accepted равны, то сравниваем по другому полю, например, id.
                return a.id - b.id;
            })
        },
        setTextButton() {
            for (let i = 0; i < this.tasks.length; ++i) {
                if (!this.tasks[i].is_end_date_passed) {
                    this.tasks[i]['button_text'] = null;
                } else {
                    if (this.tasks[i].is_accepted == 'C' || this.tasks[i].is_accepted == 'О') {
                        this.tasks[i]['button_text'] = "Перейти к условию";
                    } else if (this.tasks[i].is_accepted == 'П' || this.tasks[i].is_accepted == 'Н') {
                        this.tasks[i]['button_text'] = null;
                    } else {
                        this.tasks[i]['button_text'] = "Приступить к выполнению";
                    }
                }


            }

        },
        postTask(id, is_accepted) {
            if (!is_accepted) {
                const formData = new FormData();
                formData.append('task_id', id);

                userService.postTaskFile(formData).then(() => {
                    this.$store.dispatch('alert/sendMessage', { message: 'Вы приступили к выполнению!', type: 'Success' })
                    this.$router.push("/LK/my-tasks/" + id);
                }).catch(error => {
                    this.$store.dispatch('alert/sendMessage', { message: error.response.data.error, type: 'Danger' });
                })
            } else {
                this.$router.push("/LK/my-tasks/" + id);
            }


        }
    }
}
</script>

<style scoped>
button {
    width: 170px;
}

a {
    color: white;
}

.word-break {
    word-break: break-all;
}
</style>