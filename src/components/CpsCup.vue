<template>
    <div class='col-lg-6 mx-auto border rounded p-2'>
        <h2>Дата Чемпионата всё ближе!</h2>
        <p class="fs-6 text-primary"><em>3-5 ноября</em></p>
        <p>Не меньше <em>50 000 рублей*</em> для победителя в каждой из номинаций ждут своего победителя.</p>
        <p><strong>Оргкомитетом принято решение о свободном доступе к конкурсу.</strong></p>
        <p>Это значит, что каждый может выбрать номинацию и решить конкурсные задачи на очном этапе.</p>
        <p>Формируется таблица соревнования. Пожалуйста, обозначь свое намерение на участие. </p>

        <!-- <div v-else>
            <h6>Вы записаны на следующие номинации:</h6>
            <ul class="list-group list-group-flush mb-2">
                <li class="list-group-item link-nomination" v-for="res, index in result" :key="index">
                    {{ res.nomination.name }}
                </li>
            </ul>
        </div> -->

        <p class="fs-6 text-primary">
            Ждём твоего отклика, чтобы сформировать удобное расписание проведения :)
        </p>
        <div v-if="isNonActive != undefined && events != []" class="d-flex flex-column">
            <div class="mb-3 mx-1" v-for="event, index in events" :key="event.id">
                <div class="d-flex justify-content-between">
                    <h6 class="text-center mb-2">{{ event.title }}</h6>
                    <div class="d-flex justify-content-center">
                        <button class="btn"
                            :class="{ 'btn-primary': isNonActive[index], 'btn-secondary': !isNonActive[index] }"
                            @click="setNonActive(event.id, index)">
                            {{ isNonActive[index] ? 'Я участвую!' : 'Я не приду' }}
                        </button>
                    </div>
                </div>
                <hr>
            </div>
        </div>

        <p>И хорошая новость:</p>
        <p>
            <strong>Победители, которые прошли заочный этап, будут получать существенно увеличенную выплату!</strong>
        </p>
        <hr>
        <p class="text-primary">*По условиям участия, студенты, ставшие победителями Кубка НИИ «Центрпрограммсистем» получат
            дополнительную стипендию, даже если учатся платно. Условия индивидуальной стипендиальной программы зависят от
            курса обучения и места, которое занял победитель.</p>

    </div>
</template>

<script>
import { userService } from '../services/user.service'
import { publicService } from '../services/public.service'

export default {
    data() {
        return {
            events_id: [2, 3, 4, 5, 6],
            events: [],

            isNonActive: [],
            isEmailNonAuth: false
        }
    },
    components: {

    },
    async created() {
        try {
            const response = await publicService.getEventsList();
            this.events = response;
            this.events.sort((a, b) => a.id - b.id);
            this.events = this.events.filter(x => this.events_id.includes(x.id))

            for (const event of this.events) {
                try {
                    const response = await userService.getUserEvent(event.id);
                    this.isNonActive.push(!response.data);
                } catch (error) {
                    if (error.status && [400, 403].includes(error.status)) {
                        this.$store.dispatch('alert/sendMessage', { message: error.error, type: 'Danger' });
                    } else {
                        this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
                    }
                    this.isNonActive = undefined
                    return;

                }
            }

        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        setNonActive(id, i) {
            if (this.isNonActive[i]) {
                userService.postUserEvent(id).then(() => {
                    this.isNonActive[i] = false
                    this.$store.dispatch('alert/sendMessage', { message: 'Мы ждем тебя!', type: 'Success' })
                }).catch((error) => {
                    if (error.status && error.status == 400) {
                        this.$store.dispatch('alert/sendMessage', { message: error.error, type: 'Danger' });
                    } else {
                        this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
                    }
                })
            } else {
                userService.deleteUserEvent(id).then(() => {
                    this.isNonActive[i] = true
                    this.$store.dispatch('alert/sendMessage', { message: 'Очень жаль', type: 'Success' })
                }).catch((error) => {
                    if (error.status && error.status == 400) {
                        this.$store.dispatch('alert/sendMessage', { message: error.error, type: 'Danger' });
                    } else {
                        this.$store.dispatch('alert/sendMessage', { message: 'Непредвиденная ошибка', type: 'Danger' });
                    }
                })
            }
        }

    }
}
</script>

<style scoped></style>