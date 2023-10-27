<template>
  <div class="container">
    <div class="row d-flex justify-content-between">
      <div class="col-lg-8">
        <h1 class="fs-3 text-center mb-4">Студенческий фестиваль ИТ-профессий<br>«Новый шаг-2023»</h1>
        <p class="fs-6 text-primary"><em>Проводится с 3 по 7 ноября 2023 года</em></p>

        <!-- <p class="mb-3 text-center text-white bg-primary p-2 rounded">
          Для дальнейшего участия необходимо выбрать номинацию и пройти отборочный этап, представив свои решения задач
          комиссии.
          Приём решений заканчивается 25.10.2023 23:59.
          Лучшие участники по решению отборочной комиссии будут допущены к очному этапу мероприятия.
          При проведении очного этапа допускается участие в нескольких номинациях, если соревнования по каждой из них не
          проходят одновременно.
        </p> -->

        <p class="mb-3 text-center text-white bg-primary p-2 rounded">
          Оргкомитет принял решение о свободном доступе к конкурсу по первым пяти номинациям. Это значит, что каждый может
          принять участие в очном этапе.<br> Для этого переходи <router-link class="text-white"
            to="/cps-cup">сюда</router-link> и выбери номинации, в которых ты бы хотел принять участие.
          <br>Ожидаем твоего отклика до 31.10.2023 г. включительно.
        </p>

        <h4 class="mb-3 d-none">Расписание проведения мероприятий:</h4>
        <div class="mb-4 d-none">
          <div class="mb-3 p-2 border border-primary rounded">
            <h5 class="text-center">3 ноября</h5>
            <ul>
              <li class="mb-1">
                с 9:00 до 15:00 Чемпионат Тверской области по спортивному программированию. <br>
                Дисциплина <em>«Алгоритмическое программирование»</em>
              </li>
              <li class="mb-1">
                с 15:00 до 17:30 Кубок НИИ «Центрпрограммсистем» по ИТ-дисциплинам – 2023. <br>
                Направление: <em>DigitalArt</em>
              </li>
            </ul>
          </div>
          <div class="mb-3 p-2 border border-primary rounded">
            <h5 class="text-center">4-5 ноября:</h5>
            <ul>
              <li class="mb-1">
                с 10:00 4.10 до 10:00 5.10 Чемпионат Тверской области по спортивному программированию. <br> Дисциплина
                <em>«Продуктовое программирование»</em>
              </li>
              <li class="mb-1">
                с 12:00 до 14:30 Кубок НИИ «Центрпрограммсистем» по ИТ-дисциплинам – 2023. <br>
                Направление: <em>Компьютерные сети</em>
              </li>
            </ul>
          </div>
          <div class="mb-3 p-2 border border-primary rounded">
            <h5 class="text-center">7 ноября:</h5>
            <ul>
              <li class="mb-1">
                с 9:00 до 17:30 Кубок НИИ «Центрпрограммсистем» по ИТ-дисциплинам – 2023. <br>
                Направления: <em>программирование, математическое моделирование</em>
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-4">
          <h4 class="mb-3">Текущие номинации:</h4>
          <ul class="list-group list-group-flush mb-2">
            <router-link class="link-underline-none" v-for="nomination in nominations" :key="nomination.id"
              :to="{ name: 'tasks', params: { hash: nomination.id } }" v-scroll-to="'#' + nomination.id">
              <li class="list-group-item link-nomination">
                {{ nomination.id }}. {{ nomination.name }}
              </li>
            </router-link>
          </ul>
          <!-- <div class="d-flex justify-content-end">
            <router-link class="btn btn-primary text-white" to="/LK/my-tasks">Перейти к задачам</router-link>
          </div> -->
        </div>
        <div class="mb-4">
          <div class="mb-1">
            <h4>Организаторы</h4>
          </div>
          <p class="mb-1">
            Главный организатор: Научно-исследовательский институт «<a href="https://cps.tver.ru"
              target="_blank">Центрпрограммсистем</a>»
          </p>
          <p>При поддержке:
            <a href="https://fsp-russia.com/" target="_blank">
              Федерации спортивного программирования по Тверской области
            </a>
          </p>
          <p>Соорганизаторы:</p>
          <ul>
            <li>Региональный оператор связи группа компаний «<a href="https://www.an-net.ru" target="_blank">Аннет</a>»
            </li>
            <li>Российский производитель электроники Научно-производственное объединение «<a href="https://npoavk.ru/"
                target="_blank">Автоматизированные вычислительные комплексы</a>»</li>
          </ul>
        </div>
        <div>
          Место проведения:
          <a class="text-dark" target="_blank"
            href="https://yandex.ru/maps/14/tver/house/prospekt_nikolaya_korytkova_3b/Z0wYfgZnTUIDQFtsfXR1d3xrYg==/?ll=35.817475%2C56.846086&z=16">
            БЦ
            «Октябрьский», проспект Н. Корыткова, д. 3б,</a> помещение № 247 (2 этаж)

        </div>
      </div>
      <div class="col-lg-3">
        <NewsBar class="mb-2 mb-lg-5"></NewsBar>
        <EventsBar></EventsBar>
      </div>
    </div>
  </div>
</template>

<script>
// import { publicService } from '../services/public.service'
import NewsBar from './NewsBar.vue'
import EventsBar from './EventsBar.vue'
import { publicService } from '../services/public.service'

export default {

  name: 'MainPage',
  data() {
    return {
      events: [],
      pages: [
        { title: 'Мероприятия', id: 1 },
        { title: 'Новости', id: 2 }
      ],
      nominations: []
    }
  },
  components: {
    NewsBar, EventsBar
  },
  created() {
    this.$store.commit('routes/toMainPage')
    publicService.getNominations().then(response => {
      this.nominations = response
    })
    // publicService.getEventsList().then(response => {
    //   this.events = response;
    // })
  },
  methods: {
  }
}
</script>

<style scoped>
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