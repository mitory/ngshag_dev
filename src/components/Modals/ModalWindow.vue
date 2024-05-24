<template>
    <div class="modal" @click="closeModal">
      <div class="modal-content"   @click.stop="">
        <div class="d-flex justify-content-end">
          <span class="close" @click="closeModal">&times;</span>
        </div>
        <div class="modal__html" v-html="modal.content"></div>
        <button class="btn btn-primary col-4 mx-auto" @click="closeModal">Принять</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
        modal() {
            return this.$store.state.modal;
        }
    },
    methods: {
        closeModal() {
            this.$store.dispatch('modal/closeModal');
        }
    }
  };
  </script>
  
  <style scoped>
  </style>