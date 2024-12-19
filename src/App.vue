<template>
  <div class="d-flex flex-column justify-content-between" style="min-height: 100vh;">
    <div>
      <HeaderButtons></HeaderButtons>
      <router-view></router-view>
    </div>
    <FooterInfo />
    <AlertMessage :class="{ 'd-block': this.$store.state.alert.is_show, 'd-none': !this.$store.state.alert.is_show }" />
  </div>
</template>

<script>
import HeaderButtons from '../src/components/HeaderButtons.vue'
import FooterInfo from "../src/components/FooterInfo.vue";
import AlertMessage from '../src/components/AlertMessage.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    FooterInfo,
    HeaderButtons,
    AlertMessage
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {

  },
}
</script>

<style>
.cursor:hover {
  cursor: pointer;
}

a,
.text-white {
  color: white;
}

.task__title:first-letter {
  text-transform: uppercase;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.text-w {
  width: 300px;
}

.typewriter p {
  color: white;
  font-family: monospace;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: .15em;
  animation:
    typing 2s steps(30, end)
}

@keyframes typing {
  from {
    width: 0
  }

  to {
    width: 100%
  }
}

.pass-eye {
  position: relative;
}

.pass-eye__btn {
  cursor: pointer;
  position: absolute;
  top: 55%;
  right: 6px;
  display: inline-block;
  width: 25px;
  height: 25px;
  opacity: 0.8;
  background: url('./assets/icons/password_eye/eye-off.svg') 0 0 / cover no-repeat;
}

.pass-eye__btn.active {
  background: url('./assets/icons/password_eye/eye-show.svg') 0 0 / cover no-repeat;
}

.pass-eye__btn.spacing-minus {
  top: 40%;
}
</style>
