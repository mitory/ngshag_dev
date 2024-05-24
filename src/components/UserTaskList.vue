<template>
    <div class=''>
        <div v-if="tasks != null">
            <h5 class="text-uppercase text-center mb-3">Задачи</h5>
            <div v-for="task in tasks" :value="task.id" :key="task.id" class="mb-2 border-bottom pb-1"
                :id="task.nom_id">
                <div class="d-flex justify-content-between flex-column flex-lg-row align-items-center flex-wrap gap-2">
                    <div class="col-lg-7">
                        <h5 v-if="task.nom_name" class="text-center text-lg-start mb-2 fs-6">
                            Номинация: <em class="text-second-blue">{{ task.nom_name }}</em>
                        </h5>
                        <h5 class="col-10 col-lg-12 mx-auto mx-lg-0 text-center text-lg-start mb-1 fs-6">
                            {{ task.name }}
                        </h5>

                        <p v-if="task.status" class="text-center text-lg-start p-0 m-0" 
                        :class="{
                            'text-secondary': task.is_accepted == 'О',
                            'text-second-blue': task.is_accepted == 'П',
                            'text-danger': task.is_accepted == 'Н',
                            'd-none': task.is_accepted == 'C'
                        }">
                            {{ task.status }}
                        </p>
                    </div>
                    <div class="d-flex justify-content-center justify-content-lg-end">
                        <button class="btn btn-primary" @click="postTask(task.id, task.is_accepted)" 
                        v-if="task['button_text']"
                            :class="{ 'd-none': ['П', 'Н'].includes(task.is_accepted) }">
                            {{ task['button_text'] }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h5 class="text-uppercase text-center">{{ message }}</h5>
        </div>
    </div>
</template>

<script>
import { userService } from '../services/user.service'
import { publicService } from '../services/public.service'


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
        const nom_list = []
        publicService.getActualEventsList().then(response => {
            const events = response;

            for(let i = 0; i < events.length; ++i){
                publicService.getNominationsFromEvent(events[i].id).then(response => {
                    response.forEach(el => {
                        if(el['programs'] && el['programs'].length > 0 && el['programs'][0]){
                            nom_list.push({id: el.id, name: el.name, task: el['programs'][0]})
                        }
                    })
                })
            }
        })

        userService.getTasks().then(response => {
            this.tasks = response.data;
            userService.getTaskStatusAll().then(response => {
                const active_task = response.sort((a, b) => a.task - b.task)
                this.tasks = this.tasks.filter(el => active_task.find(task => task.task === el.id))
                                        .sort((a, b) => a.id - b.id);
                if (this.tasks.length == 0) {
                    this.zero_data()
                }
                this.tasks.forEach((el, index) => {
                    el['is_accepted'] = active_task[index].is_accepted
                    el['status'] = active_task[index].is_accepted_display
                    if (['C', 'О'].includes(el['is_accepted'])) {
                        el['button_text'] = "Перейти к условию";
                    }
                    const nom = nom_list.find(nom => nom.task === el.id)
                    if(nom){
                        el['id_nom'] = nom.id
                        el['nom_name'] = nom.name
                    }
                })
                this.sortTasks()
            }).catch(() => {
                this.zero_data()
            })
        }).catch(() => {
            this.zero_data()
        })
    },
    methods: {
        zero_data(){
            this.tasks = null
            this.message = 'Задач не найдено'
        },
        sortTasks() {
            const customSortOrder = { 'C': 1, 'П': 3, 'Н': 4, 'О': 2 };

            this.tasks = this.tasks.sort((a, b) => {
                const aOrder = customSortOrder[a.is_accepted] || 5;
                const bOrder = customSortOrder[b.is_accepted] || 5;

                if (aOrder !== bOrder) {
                    return aOrder - bOrder;
                }

                return a.id - b.id;
            })
        },
        postTask(id, is_accepted) {
            if (!is_accepted) {
                const formData = new FormData();
                formData.append('task_id', id);

                userService.postTaskFile(formData).then(() => {
                    this.$store.dispatch('alert/sendMessage', { message: 'Можно приступать к выполнению!', type: 'Success' })
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