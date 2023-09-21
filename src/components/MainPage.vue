<template>
    <div class="container">
      <div class="column">
        <div class="mb-5">
          <h1>Студенческий фестиваль ИТ-профессий «Новый шаг-2023»</h1>
          <h3>Проводится с 3 по 7 ноября 2023 года</h3>
        </div>
        <div class="mb-1">
          <h4>Расписание проведения мероприятий:</h4>
        </div>
        <div class="mb-4">
          <div class="mb-3">
            <h5>3 ноября:</h5>
            <p class="mb-1">
              с 9:00 до 15:00 Чемпионат Тверской области по спортивному программированию. Дисциплина «Алгоритмическое программирование»;
            </p>
            <p class="mb-1">
              с 15:00 до 17:30 Кубок НИИ «Центрпрограммсистем» по ИТ-дисциплинам – 2023. Направление: DigitalArt.
            </p>
          </div>
          <div class="mb-3">
            <h5>4-5 ноября:</h5>
            <p class="mb-1">
              с 10:00 4.10 до 10:00 5.10 Чемпионат Тверской области по спортивному программированию. Дисциплина «Продуктовое программирование»;
            </p>
            <p class="mb-1">
              с 12:00 до 14:30 Кубок НИИ «Центрпрограммсистем» по ИТ-дисциплинам – 2023. Направление: Компьютерные сети.
            </p>
          </div>
          <div class="mb-3">
            <h5>7 ноября:</h5>
            <p class="mb-1">
              с 9:00 до 17:30 Кубок НИИ «Центрпрограммсистем» по ИТ-дисциплинам – 2023. Направления: программирование, математическое моделирование.
            </p>
          </div>
        </div>
        <div class="mb-4">
          <div class="mb-1">
            <h4>Главный организатор:</h4>
          </div>
          <p class="mb-1">
            Научно-исследовательский институт «Центрпрограммсистем»
          </p>
          <p class="mb-1">
            при поддержке Федерации спортивного программирования по Тверской области, Комитета по физической культуре и спорту Тверской области, Министерства цифрового развития и информационных технологий Тверской области.
          </p>
          <p>
            Соорганизаторы: региональный оператор связи группа компаний «Аннет», российский производитель электроники Научно-производственное объединение «Автоматизированные вычислительные комплексы»
          </p>
        </div>
        <p>
          Место проведения: БЦ «Октябрьский», проспект Н. Корыткова, д. 3б, помещение № 247 (2 этаж)
        </p>
      </div>
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item" v-for="(page, index) in pages" :key="page.id">
                        <button v-on:click="tab_select = index" class="nav-link"
                            v-bind:class="{ 'active': tab_select === index, 'text-secondary': tab_select !== index }"
                            v-bind:aria-current="{ 'page': tab_select === index }">{{ page.title }}</button>
                    </li>
                </ul>
            </div>
            <div v-if="tab_select === 0" class="card-body">
                <div class="card mb-4" v-for="event in events" :key="event.id">
                    <div class="card-body">
                        <h5 class="card-title">{{ event.title }}</h5>
                        <p class="card-text">{{ event.text }}</p>
                        <router-link class="btn btn-primary" :to="{ name: 'eventPage', params: { id_event: event.id } }">
                            Читать подробнее
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { publicService } from '../services/public.service'

export default {

    name: 'MainPage',
    data() {
        return {
            events: [],
            tab_select: 0,
            pages: [
                { title: 'Мероприятия', id: 1 },
                { title: 'Новости', id: 2 }
            ]
        }
    },
    components: {

    },
    created() {
        this.$store.commit('routes/toMainPage')
        publicService.getEventsList().then(response => {
            this.events = response;
        })
    },
    methods: {
    }
}
</script>

<style scoped></style>