<template>
    <footer>
      <div v-if="!is_none" class="mt-2 p-2 bg-primary bg-gradient">
        <div class="container">
        <div class="d-flex justify-content-end container">
          <p class="text me-3 my-auto" >
            Ссылка на телеграм-канал проекта: @tvercham
          </p>
          <img style="height: 50px;" src="../assets/img/img.png" alt="telegram qr-code">
        </div>
      </div>
      </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.text{
  color: white;
}
</style>