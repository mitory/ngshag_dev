<template>
  <div>
    <div class="d-flex flex-column justify-content-center">
      <div class="col-sm-5 mx-auto text-white">
        <h4 class="text-dark text-center mb-2 mb-sm-4">Новости</h4>
        <div v-for="news_item in news.results" :key="news_item.id" >
          <div class="news__item p-2 mb-3 mb-sm-3 ms-1 me-1">
            <h5 class="text-center mb-2">{{ news_item.title }}</h5>
            <p >{{news_item.text}}</p>
            <p class="d-flex justify-content-end">{{ format_date(news_item.publish_date) }}</p>
          </div>
        </div>
      </div>
      <div v-if="news.next != null" class="d-flex justify-content-center">
        <button @click="loadMore" class="btn btn-primary">
          Загрузить ещё
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {publicService} from "@/services/public.service";

export default {
  data() {
    return {
      news: {
        count:'',
        next:'',
        results:[],
      },
      current_page: 1,
      page_size: 4,
    }
  },
  created() {
    publicService.getNews(this.page_size).then(response => {
      this.news = response
    })
    this.current_page = 1
  },
  components: {

  },
  methods: {
    format_date(date) {
      if (date === '') {
        return ''
      }
      const date_items = date.split('-')
      return date_items[2][0] + date_items[2][1] +'.' +date_items[1] + '.' + date_items[0]
    },
    loadMore(){
      if(this.news.next == null){
        return
      }
      this.current_page = this.current_page + 1
      // Я, короче, не знаю, но мне кажется, что в промежутке между
      //выполнением запроса и нажатием на кнопку, можно нажать на кнопку ещё разок и
      //УМЕРЕТЬ, поэтому нулю
      this.news.next = null
      publicService.getNews(this.page_size, this.current_page).then(response => {
        this.news.next = response.next
        for (let i =0; i < response.results.length; ++i){
          this.news.results.push(response.results[i])
        }
      })
    }
  }
}
</script>

<style scoped>
.news__item{
  border: solid 3px #1C78FD;
  border-radius: 15px;
  background: rgb(47,130,253);
  background: -moz-radial-gradient(circle, rgba(47,130,253,1) 0%, rgba(22,116,253,1) 100%);
  background: -webkit-radial-gradient(circle, rgba(47,130,253,1) 0%, rgba(22,116,253,1) 100%);
  background: radial-gradient(circle, rgba(47,130,253,1) 0%, rgba(22,116,253,1) 100%);
}
</style>