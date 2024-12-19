<template>
    <div class='col-lg-6 mx-auto border rounded p-2'>
        <h2>Дата Чемпионата всё ближе!</h2>
        <p class="fs-6 text-primary"><em>5 ноября</em></p>
        <p><em>50 000 рублей*</em> для победителя в каждой из номинаций найдут своего чемпиона.
            Дополнительно победитель получит возможность трудоустройства по выбранному направлению.</p>
        <p><strong>Оргкомитетом принято решение о свободном доступе к конкурсу по первым пяти номинациям.</strong> </p>

        <div>
            <h6 v-if="nominations.length">Вы записаны на следующие номинации:</h6>
            <ul class="list-group list-group-flush mb-2">
                <li class="list-group-item link-nomination" v-for="nomination, index in nominations" :key="index">
                    {{ nomination }}
                </li>
            </ul>
        </div>

        <p v-if="false" class="text-primary">
            Формируется таблица соревнования. Пожалуйста, обозначь свое намерение об участии <em>до 31 октября</em>. Ждём
            твоего отклика, чтобы сформировать удобное расписание.
        </p>

        <!-- isNonActive != undefined && events != [] -->
        <div v-if="false" class="d-flex flex-column">
            <div class="mb-3 mx-1" v-for="event, index in events" :key="event.id">
                <div class="d-flex justify-content-between">
                    <h6 class="mb-2">{{ event.title }}</h6>
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
        <hr>
        <p class="text-primary">*По условиям участия, студенты, ставшие победителями Кубка НИИ «Центрпрограммсистем» получат
            дополнительную стипендию, даже если учатся платно.</p>

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
            isEmailNonAuth: false,
            nominations: []
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
                    if (response.data) {
                        this.nominations.push(event.name)
                    }
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