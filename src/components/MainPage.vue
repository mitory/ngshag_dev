<template>
  <div class="container">
    <div class="row d-flex justify-content-between">
      <div class="col-lg-8">
        <h1 class="fs-3 text-center mb-4">Студенческий фестиваль ИТ-профессий<br>«Новый шаг-2023»</h1>
        <p class="fs-6 text-primary"><em>Проводится с 3 по 7 ноября 2023 года</em></p>

        <h4 class="mb-3">Расписание проведения мероприятий:</h4>
        <div class="mb-4">
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
          <div class="mb-1">
            <h4>Организаторы</h4>
          </div>
          <p class="mb-1">
            Главный организатор: Научно-исследовательский институт «Центрпрограммсистем»
          </p>
          <p>При поддержке:</p>
          <ul>
            <li>Федерации спортивного программирования по Тверской области</li>
            <li>Комитета по физической культуре и спорту Тверской области</li>
            <li>Министерства цифрового развития и информационных технологий Тверской области</li>
          </ul>
          <p>Соорганизаторы:</p>
          <ul>
            <li>Региональный оператор связи группа компаний «Аннет»</li>
            <li>Российский производитель электроники Научно-производственное объединение «Автоматизированные
              вычислительные комплексы»</li>
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

export default {

  name: 'MainPage',
  data() {
    return {
      events: [],
      pages: [
        { title: 'Мероприятия', id: 1 },
        { title: 'Новости', id: 2 }
      ]
    }
  },
  components: {
    NewsBar, EventsBar
  },
  created() {
    this.$store.commit('routes/toMainPage')
    // publicService.getEventsList().then(response => {
    //   this.events = response;
    // })
  },
  methods: {
  }
}
</script>

<style scoped></style>