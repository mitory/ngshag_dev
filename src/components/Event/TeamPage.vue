<template>
    <div class=''>
        <BackLink text="назад" />
        <h4 class="mx-auto text-center mb-4">{{ team.name }}</h4>
        <p>Команда зарегистрирована в рамках мероприятия 
            <em v-if="event_data.link_name">
                <router-link 
                class="text-white link hover-btn" 
                :to="'/event/' + event_data.id">
                <span v-html="event_data.name"></span>
            </router-link>
            </em>
            <em v-else class="text-second-blue" v-html="event_name"></em>
        </p>

        <div class="d-md-flex gap-2 align-items-center mb-4">
            <p class="mt-0 me-md-1 me-0 mb-md-0 mb-1 p-0">Код приглашения (пароль команды): </p>
            <div class="d-flex flex-wrap gap-2">
                <input v-model="cnange_code" type="text" class="input" @input="changeCode"
                                id="copyMe"
                                style="max-width: 130px;">
                <button class="btn btn-primary" @click="copyMyText()" style="height: 30px; line-height: 10px">
                    Копировать
                </button>
            </div>
        </div>

        <p class="text-center p-2 templ-item__bg bg_blue text-white" v-if="team_members.length + 1 < event_data.team_size">
            Передай этот код своим друзьям, с которыми ты будешь участвовать в мероприятии.
            Им нужно перейти на страницу соревнования, нажать "Присоединиться к команде" и использовать код для
            присоединения к команде.
        </p>

        <div v-if="team_members.length + 1 < event_data.min_team_size">
            <p class="mb-0">
                Минимальное количество участников в команде: {{ event_data.min_team_size }}
            </p>
            <p class="text-danger mt-0">
                <em>*Число участников в команде меньше минимального порога<br></em>
                Если до {{toStringDate(new Date(Date.parse(event_data.register_end_date)))}} не наберется минимальное количество участников, то команда будет считаться не допущенной к участию в мероприятии.
            </p>
        </div>
        <div v-else>
            <p class="text-second-blue"><em>Команда допущена к участию в мероприятии.</em></p>
        </div>

        <div class="mb-3 mx-auto text-center d-flex justify-content-center align-items-center gap-3">
            <h5 class="mb-0">
                Состав команды {{ team_members.length + 1 }}/{{ event_data.team_size }}
            </h5>
            <button class="btn bg-danger exit-button" @click="exitTeam()">
                Выйти из команды
            </button>
        </div>
        
        <ul class="list-group list-group-flush mb-2">
            <li class="list-group-item bg_second-blue">
                {{ creator.first_name + ' ' + creator.last_name }} (Капитан)
            </li>
            <li class="list-group-item" v-for="member in team_members" :key="member.id">
                {{ member.first_name + ' ' + member.last_name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { teamService, eventService, eventUserService } from '../../services/event/event.service';

import { validateMethod } from '../../methods/validate.method';

import BackLink from '../MiniComponents/BackLink';

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
    async created() {

        try {
            const response = await teamService.getTeam(this.$route.params.id);
            this.team = response.team;
            this.team_members = response.team_members;
            this.event_name = response.event_name;
            this.creator = response.creator;
            this.cnange_code = this.team.invitation_code;
        } catch (error) {
            this.$store.dispatch('alert/sendMessage', { message: 'Нет доступа', type: 'Danger' });
            this.$router.push("/Lk/my-teams");
            return;
        }

        try {
            this.event_data = await eventService.getEvent(this.team.event);
        } catch (error) {
            this.$store.dispatch('alert/sendMessage', { message: error.response.data, type: 'Danger' });
            this.$router.push("/Lk/my-teams");
        }
    },
    methods: {
        async exitTeam(){

            try {
                await teamService.leaveTeam(this.team.id);
                this.$store.dispatch('alert/sendMessage', { message: 'Произведен выход из команды', type: 'Success' });

            } catch (error) {
                this.$store.dispatch('alert/sendMessage', { message: 'Не удалось осуществить выход из команды', type: 'Danger' });
                return;
            }

            try {
                (await eventUserService.getUserNominations(this.event_data.id)).forEach(el => {
                    eventUserService.deleteUserNomination(Number(el)).catch(() => {console.log(Number(el))});
                })
            } catch (error) {
                console.log('error get user nominations');
            } finally {
                this.$router.push("/Lk");
            }
        },
        toStringDate(date){
            return validateMethod.toStringDate(date)
        },
        changeCode() {
            this.cnange_code = this.team.invitation_code
        },
        copyMyText() {
            var textToCopy = document.getElementById("copyMe");
            textToCopy.select();
            document.execCommand("copy");
            this.$store.dispatch('alert/sendMessage', { message: 'Текст скопирован в буфер обмена', type: 'Success' });
        }
    }
}
</script>

<style scoped>
.bg_second-blue {
    background-color: var(--color-second-blue);
    color: var(--white-color)
}
.btn.bg-danger {
    color: var(--color-white)
}
.btn.bg-danger:hover {
    opacity: 0.8;
}

.exit-button {
    height: 30px; line-height: 10px;
}

@media (max-width: 436px) {
    .exit-button {
        height: 45px; line-height: 15px;
    }
}
</style>