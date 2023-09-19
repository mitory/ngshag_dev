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
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {

    // if (!this.$store.state.auth.status.loggedIn) {
    //   this.$router.push("/reg");
    // }

  },
}
</script>

<style>
a {
  color: white;
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

/* 2 version */

/* .type {
  font-family: monospace;
  color: #000;
  background:
    linear-gradient(-90deg, #000 5px, white 0) 10px 0,
    linear-gradient(white 0 0) 0 0;
  background-size: calc(var(--n)*1ch) 200%;
  -webkit-background-clip: padding-box, text;
  background-clip: padding-box, text;
  background-repeat: no-repeat;
  animation:
    b .7s infinite steps(1),
    t calc(var(--n)*.1s) steps(var(--n)) forwards;

}

@keyframes t {
  from {
    background-size: 0 200%
  }
}

@keyframes b {
  50% {
    background-position: 0 -100%, 0 0
  }
} */
</style>
