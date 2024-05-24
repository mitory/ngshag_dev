<template>
  <div class="templ_bg bg__blue pb-2">
    <div class="container">
      <div class="d-flex flex-column justify-content-center" style="min-height: 100vh;">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 m-auto mt-5 text-white">
          <div class="d-flex justify-content-center g-5 align-items-center mb-2 mb-sm-4">
            <BackLink text='' />
            <h4 class="text-center">{{ newsText.header }}</h4>
          </div>
          <div v-for="news_item in news.results" :key="news_item.id">
            <div class="templ-item__bg px-1 mb-3 ms-1 me-1" :class="{'d-flex justify-content-between py-2 align-items-center': !news_item.text.length && !news_item.images.length, 'py-3': news_item.text.length || news_item.images.length}">
              <h5 class="text-center mb-0" :class="{'mb-4': news_item.text.length || news_item.images.length, 'ps-2': !news_item.text.length && !news_item.images.length}">{{ news_item.title }}</h5>
              <p v-if="news_item.text.length" class="px-sm-3 text-center">{{ news_item.text }}</p>

              <swiper class="" style="vertical-align: baseline;" v-if="news_item.images.length"
              :modules="modules"
                :slides-per-view="1"
                :space-between="0"
                :loop="true"
                navigation
                  :pagination="{ clickable: true }"
              >
                <swiper-slide :isDuplicate="true" v-for="(image, index) in news_item.images" :key="index" class="align-items-center text-center">
                  <img class="templ-item__bg slide__image mx-auto" :src="image.image" alt="" style="object-fit: cover;">
                </swiper-slide>
              </swiper>

              <p class="d-flex justify-content-end me-3 mb-0">{{ format_date(news_item.publish_date) }}</p>
            </div>
          </div>
        </div>
        <div v-if="news.next != null" class="d-flex justify-content-center">
          <button @click="loadMore" class="btn btn-primary">
            {{ newsText.load_more }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publicService } from "@/services/public.service";
import BackLink from './mini-components/BackLink.vue'

import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { newsText } from '../texts/news.text'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default {
  data() {
    return {
      news: {
        count: '',
        next: '',
        results: [],
      },
      current_page: 1,
      page_size: 4,
      newsText: {}
    }
  },
  created() {
    this.newsText = newsText;
    publicService.getNews(this.page_size).then(response => {
      this.news = response
    })
    this.current_page = 1
  },
  components: {
    BackLink,  Swiper, SwiperSlide
  },
  setup() {
      return {
        modules: [Navigation, Pagination, A11y],
      };
    },
  methods: {
    format_date(date) {
      if (date === '') {
        return ''
      }
      const date_items = date.split('-')
      return date_items[2][0] + date_items[2][1] + '.' + date_items[1] + '.' + date_items[0]
    },
    loadMore() {
      if (this.news.next == null) {
        return;
      }
      this.current_page = this.current_page + 1

      this.news.next = null
      publicService.getNews(this.page_size, this.current_page).then(response => {
        this.news.next = response.next
        for (let i = 0; i < response.results.length; ++i) {
          this.news.results.push(response.results[i])
        }
      })
    }
  }
}
</script>

<style scoped>
.slide__image {
  max-width: 100%;
  max-height: 300px;
}

@media (max-width: 450px) {
    .slide__image {
      max-width: 100%;
      max-height: 200px;
    }
  }
</style>