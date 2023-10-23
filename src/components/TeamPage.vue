<template>
    <div class=''>
        <BackLink link="/LK/my-teams" text="вернуться к списку команд" />
        <h5 class="mx-auto text-center">{{ team.name }}</h5>
        <p><em>{{ event_name }}</em></p>

        <p class="mb-3 text-center text-white bg-primary p-2 rounded">
            Передай этот код своим друзьям, с которыми ты будешь участвовать в мероприятии.
            Им нужно перейти на страницу соревнования, нажать "Присоединиться к команде" и использовать код для
            присоединения к команде.
        </p>
        <div class="d-md-flex mb-4">
            <p class="mt-0 me-md-1 me-0 mb-md-0 mb-1 p-0">Код приглашения: </p>
            <div class="d-flex">
                <input class="form-control" type="text" @input="changeCode" v-model="this.cnange_code" id="copyMe"
                    style="width: 150px; height: 30px;">
                <button class="btn btn-secondary p-1" @click="copyMyText()" style="height: 30px;">
                    Скопировать
                </button>
            </div>
        </div>

        <div v-if="team_members.length < event_data.min_team_size">
            <p class="mb-0">
                Минимальное количество участников в команде: {{ event_data.min_team_size }}
            </p>
            <p class="text-danger mt-0">
                Число участников в команде меньше минимального порога*<br>
                Если до 30 октября не неберется минимальное количество участников, то команда будет считаться недопущенной
            </p>
        </div>
        <div v-else>
            <p class="text-success">Команда допущена</p>
        </div>

        <h5 class="mb-3 mx-auto text-center">Состав команды {{ team_members.length + 1 }}/{{ event_data.team_size }}</h5>
        <ul class="list-group list-group-flush mb-2">
            <li class="list-group-item bg-warning">
                {{ creator.first_name + ' ' + creator.last_name }} (Капитан)
            </li>
            <li class="list-group-item" v-for="member in team_members" :key="member.id">
                {{ member.first_name + ' ' + member.last_name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { teamService } from '../services/team.service'
import { publicService } from '../services/public.service'
import BackLink from './mini-components/BackLink'

export default {
    data() {
        return {
            team: {},
            team_members: {},
            event_name: '',
            cnange_code: '',
            event_data: {},
            creator: {}
        }
    },
    components: {
        BackLink
    },
    created() {
        teamService.getTeam(this.$route.params.id).then(response => {
            if (response.status) {
                this.team = response.data.team;
                this.team_members = response.data.team_members;
                this.event_name = response.data.event_name;
                this.creator = response.data.creator
                this.cnange_code = this.team.invitation_code
                publicService.getEvent(this.team.event).then(response => {
                    this.event_data = response;
                })
            }
        }).catch((err) => {
            if (err.status && err.status == 404) {
                this.$store.dispatch('alert/sendMessage', { message: err.error, type: 'Danger' });
            } else {
                this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
            }
            this.$router.push("/Lk/my-teams");

        })
    },
    methods: {
        changeCode() {
            this.cnange_code = this.team.invitation_code
        },
        copyMyText() {
            var textToCopy = document.getElementById("copyMe");
            textToCopy.select();
            document.execCommand("copy");
            this.$store.dispatch('alert/sendMessage', { message: 'Текст скопирован в буфер обмена', type: 'Success' })
        }
    }
}
</script>

<style scoped></style>