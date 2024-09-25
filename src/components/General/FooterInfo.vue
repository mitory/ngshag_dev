<template>
  <footer v-if="loggedIn" class="bg_blue">
    <div class="py-2 pb-3 pb-lg-0">
      <div class="container d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-center">
        <div class="">
          <a class="text-white link hover-btn" href="https://cps.tver.ru/" target="_blank">
            <img src="../../assets/img/logo-cps.png" style="max-width: 300px">
          </a>
        </div>
        <div class="d-none d-md-block">
          <img style="width: 100px;" src="../../assets/img/tg_qr_code.png" alt="telegram qr-code">
        </div>
        <div class="text-white d-flex flex-column gap-2 py-2">
          <div>
            <p class="m-0">{{ footerText.email_about }}<a class="text-white link hover-btn" href="mailto:nwstep@internet.ru" target="_blank">
              {{ footerText.email }}
            </a></p>
          </div>
          <div class="">
              <router-link class="text-white link hover-btn" to='/call-back'>
                {{ footerText.link_to_calback_form }}
              </router-link>
          </div>
          <div>
            <router-link class="text-white link hover-btn" to="/page/privacy">
              {{ footerText.policy_presonal_data }}
            </router-link>
          </div>
          <div>
            <p class="">
              {{ footerText.tg_about }}<a class="text-white link hover-btn" href="https://t.me/tverchamp" target="_blank">{{footerText.tg_link}}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { footerText } from './general.text';

export default {
  data() {
    return {
      footerText: {}
    }
    
  },
  created(){
    this.footerText = footerText;
  },
  methods: {
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  }
}


</script>

<style scoped>
</style>