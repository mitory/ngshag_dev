<template>
    <div class=''>
        <div v-if="tasks.length || non_active_tasks.length">
            <div class="tasks.length">
                <h5 class="text-uppercase text-center mb-4" v-if="tasks.length">Активные задачи</h5>
                <div v-for="task in tasks" :key="task.id" class="mb-2 pb-1 d-flex flex-column align-items-center" :id="task.id_nom">
                    <div class="task-elem">
                        <div v-if="task.event_name">
                            <span class="event-title text-center" v-html="task.event_name"></span>
                        </div>
                        <div class="task-elem__descr">
                            <h5 v-if="task.nom_name" class="task-elem__nom">
                                <em class="text-second-blue">{{ task.nom_name }}</em>
                            </h5>
                            <p class="task-elem__name">
                                Задача: {{ task.name }}
                            </p>
                            <TimerBack :dateTime="task.end_date" 
                                        v-if="task.end_date && ['C', 'О'].includes(task.is_accepted)"
                                        class="mb-3"/>
                            <p v-if="task.status" class="task-elem__status" 
                                :class="{
                                    'text-secondary': task.is_accepted == 'О',
                                    'text-second-blue': task.is_accepted == 'П',
                                    'text-danger': task.is_accepted == 'Н',
                                    'd-none': task.is_accepted == 'C'
                                }">
                                    {{ task.status }}
                            </p>
                        </div>
                        <div class="task-elem__button-block">
                            <button class="btn btn-primary task-elem__button" @click="postTask(task.id, task.is_accepted)" 
                                    v-if="task['button_text']"
                                    :class="{ 'd-none': ['П', 'Н'].includes(task.is_accepted) || !task.end_date }">
                                    {{ task['button_text'] }}
                            </button>
                        </div>
                    </div>
                </div>

                <h5 class="text-uppercase text-center mb-4" v-if="tasks.length && non_active_tasks.length">
                    Попробуй себя в других задачах
                </h5>
                <h5 class="text-uppercase text-center mb-4" v-if="!tasks.length && non_active_tasks.length">
                    Доступные задачи
                </h5>
                <div v-for="task in non_active_tasks" :key="task.id" class="mb-2 pb-1 d-flex flex-column align-items-center" :id="task.id_nom">
                    <div class="task-elem">
                        <div v-if="task.event_name">
                            <span class="event-title text-center" v-html="task.event_name"></span>
                        </div>
                        <div class="task-elem__descr">
                            <h5 v-if="task.nom_name" class="task-elem__nom">
                                <em class="text-second-blue">{{ task.nom_name }}</em>
                            </h5>
                            <p class="task-elem__name">
                                Задача: {{ task.name }}
                            </p>
                           <p>
                                Доступно до <em class="text-second-blue">{{ getTime(new Date(Date.parse(task.end_date))) }}</em>
                           </p>
                        </div>
                        <div class="task-elem__button-block">
                            <button class="btn btn-primary task-elem__button" @click="postTask(task.id, task.is_accepted)" 
                                    v-if="task['button_text']">
                                    {{ task['button_text'] }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h5 class="text-uppercase text-center">Задач не найдено</h5>
        </div>
    </div>
</template>

<script>
import { validateMethod } from '../../methods/validate.method';

import { eventService, eventUserService } from '../../services/event/event.service';

import TimerBack from '../MiniComponents/TimerBack.vue';


export default {
    data() {
        return {
            tasks: [],
            non_active_tasks: [],
            user_name: ''
        }
    },
    components: {
        TimerBack
    },
    async created() {

        const nom_list = [];
        const events = await eventService.getActualEventsList().catch(() => []);
        for(let i = 0; i < events.length; ++i) {
            (await eventService.getNominationsFromEvent(events[i].id).catch(() => [])).forEach(el => {
                if((el.programs?.length ?? 0) > 0 && el.programs[0] != null){
                    nom_list.push({
                        id: el.id, name: el.name, task: el.programs[0],
                        event_name: events[i].name, event_id: events[i].id,
                        end_date: el.end_date
                    })
                }
            });
        }

        const active_task = (await eventUserService.getTaskStatusAll().catch(() => [])).sort((a, b) => a.task - b.task)
        const all_tasks = (await eventUserService.getTasks().catch(() => []));
        
        all_tasks.forEach(el => {
            const nom = nom_list.find(nom => nom.task === el.id);
            if(nom){
                el.id_nom = nom.id;
                el.nom_name = nom.name;
                el.event_name = nom.event_name;
                el.event_id = nom.event_id;
                el.end_date = nom.end_date;
            }
        });
        
        this.tasks = all_tasks.filter(el => active_task.find(task => task.task === el.id))
                                .sort((a, b) => a.id - b.id);
        this.tasks.forEach((el, index) => {
            el.is_accepted = active_task[index].is_accepted;
            el.status = active_task[index].is_accepted_display;
            if (['C', 'О'].includes(el.is_accepted)) {
                el.button_text = "Перейти к условию";
            }
        });
        this.non_active_tasks = all_tasks.filter(el => !active_task.find(task => task.task === el.id) && el.end_date)
                                            .sort((a, b) => a.id - b.id);
        this.non_active_tasks.forEach(el => {
            el.button_text = "Приступить";
        });

        if(!this.tasks.length) return;

        this.sortTasks();
    },
    methods: {
        getTime(date) {
            return validateMethod.toStringDate(date);
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
        async postTask(id, is_accepted) {
            if (!is_accepted) {
                const formData = new FormData();
                formData.append('task_id', id);

                try {
                    await eventUserService.postTaskFile(formData);
                } catch (error) {
                    this.$store.dispatch('alert/sendMessage', { message: error.response.data.error, type: 'Danger' });
                    return;
                }

                this.$store.dispatch('alert/sendMessage', { message: 'Можно приступать к выполнению!', type: 'Success' })
                
            } 
            this.$router.push("/LK/my-tasks/" + id);
        }
    }
}
</script>

<style scoped>
.task-elem {
    position: relative;
    padding: 10px;
    border-top: 2px solid var(--color-second-blue);
    max-width: 500px;
}
.event-title {
    position: absolute;
    top: -15px;
    right: 10px;
    font-size: 9px;
    border-radius: 10px;
    padding: 5px;
    background: var(--color-second-blue);
    color: white;
}

.task-elem__descr {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
} 
.task-elem__nom {
    text-align: center;
    font-size: 16px;
    margin-top: 15px;
    max-width: 300px;
} 
.task-elem__name {
    max-width: 350px;
    padding: 0 10px;
    font-weight: bold;
} 
.task-elem__button-block {
    display: flex;
    justify-content: end;
} 
.task-elem__button {
    width: 100%;
}

a {
    color: white;
}

.word-break {
    word-break: break-all;
}
</style>