<template>
  <div class="py-5 pb-2 bg__blue text-white" style="min-height: 90vh;">
    <div class="container">
      <div class="row d-flex flex-column-reverse flex-lg-row gap-lg-0 gap-3 justify-content-between">
        <div class="col-lg-8 col-12">

          <div v-if="title_and_subtitle">
            <div v-html="title_and_subtitle"></div>
          </div>
          
          <div v-if="main_message">
            <p class="mb-3 text-center p-2 templ-item__bg bg_blue text-white" v-html="main_message"></p>
          </div>

          <ScheduleBar :schedule="schedule" :title="'Расписание мероприятий'"></ScheduleBar>
          <NominationsBar v-if="nominations.length" :nominations_array="nominations"></NominationsBar>

          <div v-if="organizations">
            <div v-html="organizations"></div>
          </div>
          
        </div> 
        <div class="col-lg-3 d-lg-block d-flex flex-sm-row flex-column align-items-center align-items-sm-start justify-content-center gap-3">
          <NewsBar class="mb-2 mb-lg-5 col-sm-5 col-9 col-lg-12 d-md-block d-none" :classes="'flex-column'"></NewsBar>
          <EventsBar :event_list="events" class="col-12 col-md-6 col-lg-12"></EventsBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publicService } from '../services/public.service';

import { eventMethod } from '../methods/event.method';
import { eventService, eventUserService } from '../services/event/event.service';

import NewsBar from './General/NewsBar.vue';
import EventsBar from './Event/EventsBar.vue';
import NominationsBar from './Event/NominationsBar.vue';
import ScheduleBar from './Event/ScheduleBar.vue';


export default {

  name: 'MainPage',
  data() {
    return {
      main_message: '',
      events: [],
      pages: [
        { title: 'Мероприятия', id: 1 },
        { title: 'Новости', id: 2 }
      ],
      nominations: [],
      timepoints: [
        {
          event_name: 'Кубок НИИ "Центрпрограммсистем", 2023',
          datepoints: [
            {
              date: '5 ноября',
              times: [
                {start: '9:00', end: '13:00', nomination: 'Моделирование и реализация графического интерфейса'},
                {start: '9:00', end: '12:00', nomination: 'Базы данных'},
                {start: '12:00', end: '14:00', nomination: 'Программирование сетевого взаимодействия'},
                {start: '12:00', end: '13:00', nomination: 'Программирование графики'},
                {start: '14:00', end: '15:00', nomination: 'Веб-разработка'},
                {start: '15:00', end: '18:00', nomination: 'Математическое моделирование'},
                {start: '15:00', end: '18:00', nomination: 'Анимация трёхмерных моделей'},
              ]
            }
          ]
        },
        {
          event_name: 'Хакатон "защита в действии"',
          datepoints: [
            {
              date: '6 ноября',
              times: [
                {start: '9:00', end: '21:30', nomination: 'Безопасность сетей'}
              ]
            },
            {
              date: '7 ноября',
              times: [
                {start: '9:00', end: '21:30', nomination: 'Безопасность сетей'}
              ]
            }
          ]
        },
      ],
      schedule: [],
      title_and_subtitle: '',
      organizations: '',
    }
  },
  components: {
    NewsBar, EventsBar, NominationsBar, ScheduleBar
  },
  async created() {

    this.title_and_subtitle = (await publicService.getPageContent('main-title-and-sub-title').catch(() => ({
      content: `<h1 class="fs-3 text-center mb-4 ">Студенческий фестиваль ИТ-профессий<br>«Новый шаг»</h1>`
    }))).content;
    this.main_message = (await publicService.getMainMessge().catch(() => '')).text;
    this.organizations = (await publicService.getPageContent('organizations').catch(() => ({content: ''}))).content;

    this.events = await eventService.getActualEventsList().catch(() => []);
    if(!this.events.length) return;

    const teamsEvent = this.events.filter(event => event.team_event);

    this.schedule = eventMethod.createSchedule((
                      await eventService.getSchedule().catch(() => [])),
                      teamsEvent
                    );

    for(let i = 0; i < this.events.length; ++i){
      const temp = eventMethod.createNominationsElem(
                await eventService.getNominationsFromEvent(this.events[i].id).catch(() => []), 
                this.events[i], 
                await eventUserService.getUserNominations().catch(() => []), 
                await eventUserService.getTaskStatusAll().catch(() => []), 
                this.schedule
              );
      Array.prototype.push.apply(this.nominations, temp);
    }
  },
  methods: {}
}
</script>

<style scoped>
  .bg_white {
    background: var(--color-white);
  }
  .bg__blue {
    background: radial-gradient(circle, rgba(2,0,36,1) 12%, rgba(5,10,44,1) 30%, rgba(7,20,52,1) 43%, rgba(6,57,91,1) 55%, rgba(4,107,144,1) 66%, rgba(4,111,148,1) 73%, rgba(3,129,167,1) 85%, rgba(0,212,255,1) 97%);
    /* #1888C5 */
  }
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