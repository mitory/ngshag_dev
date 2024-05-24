<template>
  <div class="py-5 pb-2 bg__blue text-white">
    <div class="container">
      <div class="row d-flex flex-column-reverse flex-lg-row gap-lg-0 gap-3 justify-content-between">
        <div class="col-lg-8 col-12">
          <div v-html="title_and_subtitle"></div>
          <p class="mb-3 text-center p-2 templ-item__bg bg_blue text-white" v-html="main_message"></p>

          <h4 class="text-center mb-3">Расписание мероприятий</h4>
            <ScheduleBar :schedule="schedule"></ScheduleBar>

          <NominationsBar :nominations_array="nominations"></NominationsBar>
          <div v-html="organizations"></div>
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
import NewsBar from './NewsBar.vue'
import EventsBar from './EventsBar.vue'
import NominationsBar from './NominationsBar.vue'
import ScheduleBar from './ScheduleBar.vue'
import { publicService } from '../services/public.service'
import { userService } from '../services/user.service'
import { validateService } from '../services/validate.service'


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
  created() {
    publicService.getPageContent('main-title-and-sub-title').then(response => {
        this.title_and_subtitle = response.content;
    })
    publicService.getPageContent('organizations').then(response => {
        this.organizations = response.content;
    })
    publicService.getMainMessge().then(response => {
      this.main_message = response.text;
    })
    let is_active = []
    userService.getUserNominations().then(response => {
      is_active = response;
    })
    let user_tasks = [];
    userService.getTaskStatusAll().then(response => {
      user_tasks = response;
    })
    publicService.getActualEventsList().then(response => {
      this.events = response;

      for(let i = 0; i < this.events.length; ++i){
        publicService.getNominationsFromEvent(this.events[i].id).then(response => {
          response.forEach(el => {
            el['event'] = this.events[i].name;
            el['is_team_event'] = this.events[i].team_event
            el['is_exist_task'] = el['programs'] != undefined && el['programs'].length > 0 && el['programs'][0] !== null;
            el['event_id'] = this.events[i].id
            el['event_link_name'] = this.events[i].link_name
            el['is_active'] = Boolean(is_active.find(id => id == el.id));
            el['enddate_register_time'] = this.events[i].team_event ? 
                                          this.toStringDate(
                                            new Date(Date.parse(this.events[i].register_end_date))
                                            ) : 
                                          false;
            if(el['is_exist_task']){
              el['task'] = {}
              const user_task = user_tasks.find(task => task.task === el['programs'][0])
              if(user_task){
                el['task']['status'] = user_task.is_accepted_display
                el['task']['is_accepted'] = user_task.is_accepted
                if(['C', 'О'].includes(el['task']['is_accepted'])){
                  el['task']['button_text'] = 'Перейти к условию';
                }
              } else {
                el['task']['button_text'] = 'Приступить к задаче';
              }
            }
          })
          Array.prototype.push.apply(this.nominations, response);
        })
      }
      publicService.getSchedule().then(response => {
        let index = 0;
        const teamsEvent = this.events.filter(event => event.team_event)

        response.forEach(el => {
          el['stages'] = [{name: 'Отборочный', nominations: []}, {name: 'Очный', nominations: []}]
          el.nominations.forEach(nom => {
            nom.stages.forEach(stage => {
              index = stage.stage_code === 'Отборочный' ? 0: 1;
              el['stages'][index].nominations.push({
                name: nom.nomination.name, 
                start: this.toStringDate(new Date(Date.parse(stage.start_date))), 
                end:  this.toStringDate(new Date(Date.parse(stage.end_date)))
              })
            })
            const event = teamsEvent.find(event => event.id === el.event.id)
            if(event) {
              el['stages'].unshift({name: 'Регистрационный', nominations: [{
                name: 'Формирование команд', 
                start: this.toStringDate(new Date(Date.parse(event.start_date))), 
                end: this.toStringDate(new Date(Date.parse(event.register_end_date)))
              }]})
            }
          })
        })
        this.schedule = response;
      })
    })
  },
  methods: {
    toStringDate(date){
      return validateService.toStringDate(date)
    }
  }
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