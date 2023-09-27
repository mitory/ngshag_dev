<template>
  <footer v-if="!is_none">
    <div class="mt-2 p-2 bg-dark bg-gradient">
      <div class="container">
        <div class="d-flex justify-content-end container">
          <p class="text-white me-3 my-auto">
            Телеграм-канал проекта: <a href="https://t.me/tverchamp" target="_blank">@tverchamp</a>
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

<style scoped></style>