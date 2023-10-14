<template>
    <div class=''>
        <div v-if="tasks != null">
            <p v-if="user_name"><em>{{ user_name }}, специально для тебя мы подобрали задачи согласно указанным
                    компетенциям.</em></p>
            <p v-else><em>Уважаемый пользователь! Мы подобрали для тебя задачи согласно указанным компетенциям.</em></p>
            <h2 class="text-center mb-5">Задачи для отбора участников по направлениям:</h2>
            <div v-for="task in tasks" :value="task.id" :key="task.id" class="mb-2 border-bottom pb-1">
                <h5 class="mb-1 fs-6">Задача: <span class="task__title">{{ task.name }}</span></h5>
                <p class="p-0 m-0 pb-1">Номинация: <em class="text-primary">{{ task.nomination_name }}</em></p>
                <p v-if="task.status" class="p-0 m-0" :class="{
                    'text-secondary': task.is_accepted == 'О',
                    'text-success': task.is_accepted == 'П',
                    'text-danger': task.is_accepted == 'Н',
                    'd-none': task.is_accepted == 'С'
                }">
                    {{ task.status }}
                </p>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary" @click="postTask(task.id, task.is_accepted)" v-if="task['button_text']"
                        :class="{ 'd-none': task.is_accepted == 'П' || task.is_accepted == 'Н' }">

                        {{ task['button_text'] }}

                    </button>
                </div>
            </div>
            <p class="mb-2">Чем больше сведений о твоих компетенциях, чем больше ты смог решить присланных заданий, чем
                быстрее это получилось сделать (да, время учитывается, но это не повод торопиться, сделай всё вдумчиво и
                внимательно!), тем больше возможностей и бонусов по итогам Чемпионата.</p>
            <p>В скором времени можно будет создавать команды и формулировать собственные проекты, а пока торопись быть в
                числе первых, кто прошёл отборочный этап! 25 октября пройдёт розыгрыш подарков среди самых активных
                пользователей.</p>
        </div>
        <div v-else>
            <h3>{{ message }}</h3>
            <div class="mb-3 text-center text-white bg-primary p-2 rounded">
                Перейди во вкладку "Выбрать навыки" и выбери компетенции, в которых ты силен.
                После этого станут доступны задачи во вкладке "Мои задачи".
            </div>
        </div>
    </div>
</template>

<script>
import { userService } from '../services/user.service'


export default {
    data() {
        return {
            tasks: {},
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
                for (let i = 0; i < this.tasks.length; ++i) {
                    userService.getTaskStatus(this.tasks[i].id).then(response => {
                        if (response.status) {
                            if (response.data) {
                                this.tasks[i]['status'] = response.data.is_accepted_display
                                this.tasks[i]['is_accepted'] = response.data.is_accepted
                                if (this.tasks[i]['is_accepted'] == 'С' || this.tasks[i]['is_accepted'] == 'О') {
                                    this.tasks[i]['button_text'] = "Перейти к условию";
                                }
                                // if (this.tasks[i]['is_accepted'] == 'П' || this.tasks[i]['is_accepted'] == 'Н') {
                                //     this.tasks[i]['button_text'] = null;
                                // }
                            }
                        } else {
                            this.tasks[i]['button_text'] = "Приступить к выполнению";
                        }
                    })
                }
                //this.setTextButton()

                if (this.tasks.length == 0) {
                    this.tasks = null
                    this.message = 'Под твои компетенции еще нет задач'
                } else {
                    //setTimeout(this.sortTasks, 1500);
                }
            } else {
                this.tasks = null
                this.message = response.message
            }
        })
    },
    methods: {
        sortTasks() {
            const customSortOrder = { 'С': 1, 'П': 2, 'Н': 3, 'О': 4 };

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
                if (this.tasks[i].is_accepted == 'С' || this.tasks[i].is_accepted == 'О') {
                    this.tasks[i]['button_text'] = "Перейти к условию";
                } else if (this.tasks[i].is_accepted == 'П' || this.tasks[i].is_accepted == 'Н') {
                    this.tasks[i]['button_text'] = null;
                } else {
                    this.tasks[i]['button_text'] = "Приступить к выполнению";
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
a {
    color: white;
}

.word-break {
    word-break: break-all;
}
</style>