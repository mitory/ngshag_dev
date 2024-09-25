<template>
  <article v-if="news.results.length">
    <div class='text-white'>
      <h4 class="text-center">{{ newsText.header }}</h4>
      <div class="d-flex align-items-stretch text-center justify-content-center" :class="classes">
        <div v-for="news_item in news.results" :key="news_item.id" class="m-1 p-2 templ-item__bg mb-2">
          <h6>{{ news_item.title }}</h6>
          <p>{{ format_date(news_item.publish_date) }}</p>
        </div>
      </div>
      <div class="text-center">
        <router-link class="text-decoration-underline text-white link hover-btn" to="/news">{{ newsText.all_news_button }}</router-link>
      </div>
    </div>
  </article>
</template>

<script>
import { generalService } from "@/services/general.service";
import { newsText } from './general.text';

export default {
  props: {
    classes: String
  },
  data() {
    return {
      news: {
        results: [],
      },
      newsText: {}
    }
  },
  async created() {
    this.newsText = newsText;
    this.news = (await generalService.getNews(2).catch(() => ({results: []})));
    
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