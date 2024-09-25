<template>
    <div v-show="nominations.length" class="mb-4">
        <h4 class="text-center mb-2">{{ nombarText.header }}</h4>
        <swiper class="" style="vertical-align: baseline;"
            :modules="modules"
            :slides-per-view="1"
            :space-between="0"
            :loop="true"
            navigation
                :pagination="{ clickable: true }"
            >
            <swiper-slide v-for="nomination, index in nominations" :key="nomination.id" 
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


                    <div v-if="!nomination.is_team_event">
                        <div v-html="getNotTeamInHtml(nomination)"></div>
                    
                        <div class="d-flex flex-sm-row flex-column gap-3 gap-sm-0 align-items-center justify-content-center"
                            v-if="nomination.register_end_date">
                            <button class="btn" 
                                    :class="{
                                        'me-sm-5': nomination.is_exist_task, 
                                        'btn-primary': !nomination.is_active, 
                                        'btn-light': nomination.is_active
                                    }" 
                                    v-if="nomination.is_public && (!nomination.task.is_accepted || nomination.task.is_accepted === 'C')" 
                                    @click="changeActive(nomination.id, index)">
                                {{ !nomination.is_active ? 'Я участвую!' : 'Отказаться от участия'}}
                            </button>
                            
                            <button class="btn btn-primary" v-if="nomination.is_exist_task && nomination.task.button_text" @click="StartTask(nomination.programs[0], nomination.task)">
                                {{ nomination.task.button_text }}
                            </button>
                        </div>
                    </div>

                    <div v-if="nomination.is_team_event">
                        <div v-html="getTeamTextInHtml(nomination)"></div>
                        <div class="d-flex flex-sm-row flex-column gap-3 gap-sm-0 align-items-center justify-content-center" 
                            v-if="!nomination.is_active && nomination.register_end_date">
                            <button class="btn btn-primary me-sm-5" @click="joinTeam(nomination.event_id, nomination.event, nomination.id)">
                                Присоединиться к команде
                            </button>
                            <button class="btn btn-primary" @click="createTeam(nomination.event_id, nomination.event, nomination.id)">
                                Создать команду
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </swiper-slide>
        </swiper>
        </div>
</template>

<script>

import { eventUserService } from '../../services/event/event_user.service';
import { nombarText } from './event.text';

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
            teams_text: '',
            nominations: [],
        }
    },
    components: {
        Swiper, SwiperSlide
    },
    created() {
        this.nombarText = nombarText;
        this.teams_texts = this.nombarText.team_texts;
        this.not_team_texts = this.nombarText.not_team_texts;
        this.nominations = this.nominations_array;
    },
    setup() {
      return {
        modules: [Navigation, Pagination, A11y],
      };
    },
    methods: {
        getNotTeamInHtml(nom) {
            if(nom.is_active) {
                return `<p class="text-center"><em class="text-second-blue">${this.not_team_texts[3]}</em></p>`
            }

            if(!nom.register_end_date) {
                return `<p class="text-center"><em class="text-second-blue">${this.not_team_texts[4]}.</em></p>`
            }

            if(nom.is_exist_task && !nom.is_public && !nom.is_active) {
                return `<p>${this.not_team_texts[0]}</p>`;
            }
            if(nom.is_public && !nom.is_active) {
                let text = `<p>${this.not_team_texts[1]}`;
                if(nom.is_exist_task) {
                    text += `  <br>${this.not_team_texts[2]}</p>`
                }
                return text;
            }

            return '';
        },
        getTeamTextInHtml(nom) {
            if(nom.is_active) {
                return `<p class="text-center"><em class="text-second-blue">${this.teams_texts[1]}</em></p>`
            }

            if(!nom.register_end_date) {
                return `<p class="text-center"><em class="text-second-blue">${this.teams_texts[2]} c ${nom.enddate_register_time_text}.</em></p>`
            }

            if(!nom.is_active) {
                return `<p>${this.teams_texts[0]} ${nom.enddate_register_time_text}</p>`
            }

            return '';
        },
        async StartTask(id, task){
            if(task.is_accepted) {
                this.$router.push("/LK/my-tasks/" + id);
                return;
            }

            const formData = new FormData();
            formData.append('task_id', id);

            try {
                await eventUserService.postTaskFile(formData);
                this.$store.dispatch('alert/sendMessage', { message: this.nombarText.task_active, type: 'Success' })
                this.$router.push("/LK/my-tasks/" + id);
            } catch (error) {
                let message = error.response.data;
                if(error.response.status !== 500) {
                    message = message.error;
                }
                this.$store.dispatch('alert/sendMessage', { message: message, type: 'Danger' });
            }
        },
        createTeam(event_id, event, id_nom) {
            console.log('createTeam')
            const text = 'Регистрация команды' + (event ? ` на мероприятие ${event}` : '');
            this.$store.dispatch('modalCreateTeam/openModal', {content: `<h5>${text}</h5>`, event_id: event_id, id_nom: id_nom});
        },
        joinTeam(event_id, event, id_nom){
            const text = 'Присоединиться к существующей команде' + (event ? ` на мероприятие ${event}` : '');
            this.$store.dispatch('modalJoinTeam/openModal', {content: `<h5>${text}</h5>`, id_nom: id_nom, event_id: event_id});
        },
        changeActive(id_nom, index) {
          if(!this.nominations[index].is_active) {
            this.toActiveAdd(id_nom, index);
          } else {
            this.toRemoveActive(id_nom, index);
          }
        },
        async toActiveAdd(id_nom, index){
            try {
                await eventUserService.postUserNomination(id_nom);
                this.nominations[index].is_active = true;
                this.$store.dispatch('alert/sendMessage', { message: 'Ты участвуешь!', type: 'Success' });
            } catch (error) {
                this.$store.dispatch('alert/sendMessage', { message: 'Запись не удалась. Повторите попытку позднее', type: 'Danger' });
            }
        },
        async toRemoveActive(id_nom, index){
            try {
                await eventUserService.deleteUserNomination(id_nom);
                this.nominations[index].is_active = false;
                this.$store.dispatch('alert/sendMessage', { message: 'Запись отменена', type: 'Success' });
            } catch (error) {
                this.$store.dispatch('alert/sendMessage', { message: 'Отмена записи не удалась. Повторите попытку позднее', type: 'Danger' });
            }
        }
    }
}
</script>

<style scoped>
    .is_active {
        border: 2px solid var(--color-second-blue); 
    }
</style>