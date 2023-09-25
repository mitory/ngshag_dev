<template>
  <footer v-if="!is_none">
    <div class="mt-2 p-2 bg-dark bg-gradient">
      <div class="container">
        <div class="d-flex justify-content-end container">
          <p class="text me-3 my-auto">
            Ссылка на телеграм-канал проекта: @tvercham
          </p>
          <img style="height: 50px;" src="../assets/img/tg_qr_code.png" alt="telegram qr-code">
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
  },
  created() {
    console.log(!this.loggedIn || this.$route.path === '/set-user-skills')
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    is_none() {
      return !this.loggedIn || this.$route.path === '/set-user-skills'
    }
  }
}


</script>

<style scoped>
.text {
  color: white;
}
</style>