<template>
  <article>
    <div class='text-white'>
      <h4 class="text-dark text-center">Новости</h4>
      <div v-for="news_item in news.results" :key="news_item.id">
        <div class="news__item p-2 bg-primary bg-gradient rounded mb-2">
          <h6>{{ news_item.title }}</h6>
          <p>{{ format_date(news_item.publish_date) }}</p>
        </div>
      </div>
      <router-link class="text-dark cursor" to="/news">Все новости</router-link>
    </div>
  </article>
</template>

<script>
import { publicService } from "@/services/public.service";

export default {
  data() {
    return {
      news: {
        results: [],
      },
    }
  },
  created() {
    publicService.getNews(2).then(response => {
      this.news = response
    })
  },
  components: {

  },
  methods: {
    format_date(date) {
      if (date === '') {
        return ''
      }
      const date_items = date.split('-')
      return date_items[2][0] + date_items[2][1] + '.' + date_items[1] + '.' + date_items[0]
    }
  }
}
</script>

<style scoped></style>