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
        <NominationsBar v-if="nominations.length" :nominations_array="nominations"></NominationsBar>
        <ScheduleBar :schedule="schedule" :title="'Расписание'"></ScheduleBar>
      </div>
    </div>
  </div>
</template>

<script>
import { publicService } from '../../services/public.service';

import { eventMethod } from '../../methods/event.method';
import { eventService, eventUserService } from '../../services/event/event.service';

import BackLink from '../MiniComponents/BackLink';
import NominationsBar from './NominationsBar.vue';
import ScheduleBar from './ScheduleBar.vue';

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
  async created() {
  
    try {
      this.event = await eventService.getEvent(this.$route.params.id);
      this.link_name = this.event.link_name;
      this.reglament_link = this.event.reglament_link;
      this.name = this.event.name;
    } catch (error) {
      this.$store.dispatch('alert/sendMessage', { message: 'Страница не найдена', type: 'Danger' });
      this.$router.back();
    }

    this.content = (await publicService.getPageContent(this.link_name).catch(() => ({ content: '' }))).content;


    this.schedule = eventMethod.createSchedule((
                      await eventService.getSchedule().catch(() => [])).filter(el => this.event.id === el.event.id),
                      [this.event]
                    );


    this.nominations = eventMethod.createNominationsElem(
                        await eventService.getNominationsFromEvent(this.$route.params.id).catch(() => []),
                        this.event,
                        await eventUserService.getUserNominations().catch(() => []),
                        await eventUserService.getTaskStatusAll().catch(() => []),
                        this.schedule
                      );
  },
  methods: {}
}
</script>

<style scoped></style>