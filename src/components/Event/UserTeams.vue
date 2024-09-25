<template>
    <div class="teams">
        <div v-if="teams.length" class="col-xl-10 mx-auto">
            <div class="d-flex gap-sm-3 gap-2 justify-content-center align-items-center mb-3">
                <h5 class="text-uppercase mb-0 text-sm-start text-center">Команды</h5>
            </div>
            <div v-for="team in teams" :key="team.id">
                <div class="p-2 d-flex flex-lg-row flex-column justify-content-center align-items-center gap-2 gap-lg-5">
                    <div>
                        <h5 class="mb-1 fs-6" v-html="team.event_name"></h5>
                        <p class="p-0 m-0 pb-1 mb-1">Команда: <em class="text-second-blue">{{ team.name }}</em></p>
                    </div>
                    <router-link :to="{ name: 'team', params: { id: team.id } }">
                        <button class="btn btn-primary">Комната команды</button>
                    </router-link>
                </div>
                <hr class="mx-auto text-second-blue" size="4" width="100%">
            </div>
            <EventsBar v-if="event_list.length" :event_list="event_list" :title="'Можешь попробовать свои силы в других командных мероприятиях'"/>
        </div>
        <div v-else-if="event_list.length">
            <EventsBar :event_list="event_list" :title="'Текущие командные мероприятия'"/>
        </div>
        <h5 v-else class="text-center">Командных мероприятий нет</h5>
    </div>
</template>

<script>
import { eventService, eventUserService } from '../../services/event/event.service';

import EventsBar from './EventsBar'

export default {
    data() {
        return {
            teams: [],
            message: '',
            event_list: []
        }
    },
    components: {
        EventsBar
    },
    async created() {
        this.teams = (await eventUserService.getTeams().catch(() => ({teams: []}))).teams;
        this.event_list = (await eventService.getActualEventsList().catch(() => [])).filter(event => event.team_event)
        const eventIds = new Set(this.teams.map(team => team.event_id));
        this.event_list = this.event_list.filter(event => !eventIds.has(event.id));
    },
    methods: {

    }
}
</script>

<style scoped></style>