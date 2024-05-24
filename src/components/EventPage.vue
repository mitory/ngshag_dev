<template>
  <div class="py-5 pb-2 bg__blue text-white" style="min-height: 90vh;">
    <div class="container">
      <div class='templ-item__bg p-2 col-12 col-md-8 mx-auto'>
        <BackLink text="назад" />
        <h1 class="fs-3 text-center mb-4" v-html="name"></h1>
        <div class="mb-3 col-10 mx-auto">
          <div class="mb-3">
            <router-link v-if="reglament_link" class="text-white link hover-btn" :to="'/page/' + reglament_link">Регламент
              мероприятия</router-link>
          </div>
          <div v-html="content"></div>
        </div>
        <NominationsBar :nominations_array="nominations"></NominationsBar>
        <h4 class="text-center mb-3">Расписание</h4>
        <ScheduleBar :schedule="schedule"></ScheduleBar>
      </div>
    </div>
  </div>
</template>

<script>
import { publicService } from '../services/public.service'
import { userService } from '../services/user.service'
import { validateService } from '../services/validate.service'

import BackLink from './mini-components/BackLink'
import NominationsBar from './NominationsBar.vue'
import ScheduleBar from './ScheduleBar.vue'

export default {
  data() {
    return {
      content: '',
      link_name: '',
      reglament_link: null,
      name: '',
      event: null,
      nominations: [],
      schedule: [],
    }
  },
  components: {
    BackLink, NominationsBar, ScheduleBar
  },
  created() {
    publicService.getEvent(this.$route.params.id).then(response => {
        this.event = response;
        this.link_name = this.event.link_name;
        this.reglament_link = this.event.reglament_link;
        this.name = this.event.name;

        publicService.getPageContent(this.link_name).then(response => {
          this.content = response.content;
        })

        let is_active = []
        userService.getUserNominations().then(response => {
          is_active = response;
        })
        let user_tasks = [];
        userService.getTaskStatusAll().then(response => {
          user_tasks = response;
        })
        
        publicService.getNominationsFromEvent(this.$route.params.id).then(response => {
          response.forEach(el => {
            el['event_id'] = this.event.id
            el['is_team_event'] = this.event.team_size > 1;
            el['is_exist_task'] = el['programs'] != undefined && el['programs'].length > 0 && el['programs'][0] !== null;
            el['is_active'] = Boolean(is_active.find(id => id == el.id));
            el['enddate_register_time'] =  el['is_team_event'] ? 
                                          this.toStringDate(
                                            new Date(Date.parse(this.event.register_end_date))
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

          publicService.getSchedule().then(response => {
            let index = 0;

            this.schedule = response.filter(el => this.event.id === el.event.id)


            this.schedule.forEach(el => {
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
                if(this.event.team_size > 1) {
                  el['stages'].unshift({name: 'Регистрационный', nominations: [{
                    name: 'Формирование команд', 
                    start: this.toStringDate(new Date(Date.parse(this.event.start_date))), 
                    end: this.toStringDate(new Date(Date.parse(this.event.register_end_date)))
                  }]})
                }
              })
            })
          })
        })
    })
  },
  // watch: {
  //   '$route.params.id': 'fetchPageContent'
  // },
  methods: {
    toStringDate(date){
      return validateService.toStringDate(date)
    }
    // fetchPageContent(event_name) {
    //   publicService.getPageContent(event_name).then(response => {
    //     this.content = response.content;
    //   });
    // }
  }
}
</script>

<style scoped></style>