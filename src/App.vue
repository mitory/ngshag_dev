<template>
  <HeaderButtons></HeaderButtons>
  <router-view></router-view>
</template>

<script>
import HeaderButtons from '../src/components/HeaderButtons.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    HeaderButtons
  }
}
</script>

<style>
a {
  color: white;
}
</style>
