<template>
    <div v-if="nominations" class="mb-4">
        <h4 class="text-center mb-2">Текущие  номинации</h4>
        <swiper class="" style="vertical-align: baseline;"
            :modules="modules"
            :slides-per-view="1"
            :space-between="0"
            :loop="true"
            navigation
                :pagination="{ clickable: true }"
            >
            <swiper-slide :isDuplicate="true" v-for="nomination, index in nominations" :key="nomination.id" 
            class="my-auto">
            <div class="nom_item templ-item__bg p-2 mb-4 text-white col-sm-9 col-12 mx-auto" 
            style="height: 100%" :class="{'is_active': nomination.is_active}"
            >
                <h5 class="text-center mb-3">{{ nomination.name }}</h5>
                <div class="mx-auto col-10">
                    <div v-if="nomination.event">
                        <p v-if="nomination.event_link_name" class="text-center">
                            Мероприятие: 
                            <em><router-link 
                                class="text-white link hover-btn" 
                                :to="'/event/' + nomination.event_id">
                                <span v-html="nomination.event"></span>
                            </router-link></em></p>
                        <p v-else class="text-center">Мероприятие: <em>{{ nomination.event }}</em></p>
                    </div>
                    <p>
                    {{ nomination.description }}
                    </p>
                    <p v-if="nomination.is_exist_task && !nomination.is_public && !nomination.is_active">
                    *В рамках отборочного этапа для данной номинации есть задача. Нажми "Приcтупить к задаче", если тебя заинтересовало участие в номинации.
                    </p>
                    <p v-if="nomination.is_public && !nomination.is_active">
                    *Участие в данной номинации доступно без отборочного этапа. Нажми "Я участвую!", если готов продемонстрировать свои навыки. <br> <span v-if="nomination.is_exist_task">Также ты можешь решить задачу отборочного этапа, это даст тебе дополнительные очки.</span>
                    </p>
                    <p v-if="nomination.is_active && (nomination.is_public || nomination.is_exist_task)" class="text-center">
                        <em class="text-second-blue">Ты записан на участие в данной номинации!</em>
                    </p>
                    <p v-if="nomination.is_team_event && !nomination.is_active">
                        *Для участия в данной номинации необходимо состоять в команде. 
                        <br>Команды должны быть сформированы до {{ nomination.enddate_register_time }}.
                    </p>
                    <p v-if="nomination.is_team_event && nomination.is_active" class="text-center">
                        <em class="text-second-blue">Ты уже состоишь в команде для участия в данной номинации!</em>
                    </p>
                    <div class="d-flex flex-sm-row flex-column gap-3 gap-sm-0 align-items-center justify-content-center">
                    <button class="btn btn-primary" :class="{'me-sm-5': nomination.is_exist_task}" v-if="nomination.is_public && !nomination.is_active" 
                    @click="toActiveAdd(nomination.id, index)">
                        Я участвую!
                    </button>
                    <button class="btn btn-light" :class="{'me-sm-5': nomination.is_exist_task}"      v-if="nomination.is_public && nomination.is_active"
                    @click="toRemoveActive(nomination.id, index)">
                        Отказаться от участия
                    </button>
                    <button class="btn btn-primary" v-if="nomination.is_exist_task" @click="StartTask(nomination.programs[0], nomination.task)">
                        {{ nomination.task.button_text }}
                    </button>
                    </div>
                    <div class="d-flex flex-sm-row flex-column gap-3 gap-sm-0 align-items-center justify-content-center" v-if="nomination.is_team_event && !nomination.is_active">
                        <button class="btn btn-primary me-sm-5" @click="joinTeam(nomination.id, nomination.event, nomination.event_id)">
                            Присоединиться к команде
                        </button>
                        <button class="btn btn-primary" @click="createTeam(nomination.event_id, nomination.event, nomination.id)">
                            Создать команду
                        </button>
                    </div>
                </div>
            </div>
            </swiper-slide>
        </swiper>
        </div>
</template>

<script>
import { userService } from '../services/user.service'

import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default {
    props: {
        nominations_array: Array
    },
    data() {
        return {
            nominations: []
        }
    },
    components: {
        Swiper, SwiperSlide
    },
    setup() {
      return {
        modules: [Navigation, Pagination, A11y],
      };
    },
    created(){
        this.nominations = this.nominations_array;
    },
    methods: {
        StartTask(id, task){
            if (!task.is_accepted) {
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
        },
        createTeam(event_id, event, id_nom) {
            const text = 'Регистрация команды' + (event ? ` на мероприятие ${event}` : '');
            this.$store.dispatch('modalCreateTeam/openModal', {content: `<h5>${text}</h5>`, event_id: event_id, id_nom: id_nom});
        },
        joinTeam(id_nom, event, event_id){
            const text = 'Присоединиться к существующей команде' + (event ? ` на мероприятие ${event}` : '');
            this.$store.dispatch('modalJoinTeam/openModal', {content: `<h5>${text}</h5>`, id_nom: id_nom, event_id: event_id});
        },
        toActiveAdd(id_nom, index){
            userService.postUserNomination(id_nom).then(() => {
                this.nominations[index]['is_active'] = true;
                this.$store.dispatch('alert/sendMessage', { message: 'Ты участвуешь!', type: 'Success' });
            }).catch(() => {
                this.$store.dispatch('alert/sendMessage', { message: 'Запись не удалась. Повторите попытку позднее', type: 'Danger' });
            })
        },
        toRemoveActive(id_nom, index){
            userService.deleteUserNomination(id_nom).then(() => {
                this.nominations[index]['is_active'] = false;
                this.$store.dispatch('alert/sendMessage', { message: 'Запись отменена', type: 'Success' });
            }).catch(() => {
                this.$store.dispatch('alert/sendMessage', { message: 'Произошла ошибка. Повторите попытку позднее', type: 'Danger' });
            })
        }
    }
}
</script>

<style scoped>
    .is_active {
        border: 2px solid var(--color-second-blue); 
    }
</style>