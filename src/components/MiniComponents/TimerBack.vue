<template>
    <div v-if="remainingTime !== null" class="timer-back">
      {{ formattedTime }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      dateTime: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        remainingTime: null,
      };
    },
    computed: {
      formattedTime() {
        const diff = this.remainingTime;
  
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
        if (months > 0) {
          return `${months}м ${days}дн ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else if (days > 0) {
          return `${days}дн ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else if (hours > 0) {
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else if (minutes > 0) {
          return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else if (seconds > 0) {
          return `00:00:${seconds.toString().padStart(2, '0')}`;
        } else {
          return '00:00:00';
        }
      },
    },
    mounted() {
      this.startTimer();
    },
    beforeUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    methods: {
      startTimer() {
        const targetTime = new Date(this.dateTime).getTime();
        const now = new Date().getTime();
        const diff = targetTime - now;
  
        if (diff <= 0) {
          this.remainingTime = null;
          return;
        }
  
        this.updateRemainingTime();
        this.timer = setInterval(this.updateRemainingTime, 1000);
      },
      updateRemainingTime() {
        const targetTime = new Date(this.dateTime).getTime();
        const now = new Date().getTime();
        const diff = targetTime - now;
  
        if (diff <= 0) {
          this.remainingTime = null;
          clearInterval(this.timer);
        } else {
          this.remainingTime = diff;
        }
      },
    },
  };
  </script>

<style>
    .timer-back {
        color: var(--color-second-blue);
    }
</style>
  