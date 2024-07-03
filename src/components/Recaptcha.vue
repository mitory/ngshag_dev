<template>
    <div class="d-flex">
      <div :id="recaptchaId" class=" mx-auto g-recaptcha"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecaptchaGoodle',
    data(){
        return {
            sitekey: '6LePEP4pAAAAAJSoukWcvn9x2T8JYeMy_40zp1sZ'
        }
    },
    props: {
        recaptchaId: {
            type: String,
            required: true
        }
    },
    mounted() {
      this.renderRecaptcha();
    },
    unmounted() {
        if (this.recaptchaInterval) {
            clearInterval(this.recaptchaInterval);
        }
    },
    methods: {
        startRecaptchaWatcher() {
            this.recaptchaInterval = setInterval(() => {
                if (window.grecaptcha) {
                    const recaptchaResponse = window.grecaptcha.getResponse();
                    if (!recaptchaResponse) {
                        this.$emit('expired');
                    }
                }
            }, 1000); 
        },
        renderRecaptcha() {
            try {
                if (window.grecaptcha) {
                    window.grecaptcha.render(document.getElementById(this.recaptchaId), {
                        sitekey: '6LePEP4pAAAAAJSoukWcvn9x2T8JYeMy_40zp1sZ',
                        callback: this.verifyCallback
                    });
                    this.startRecaptchaWatcher();
                } else {
                    if (this.recaptchaInterval) {
                        clearInterval(this.recaptchaInterval);
                    }
                    location.reload()
                }
            } catch(err) {
                location.reload()
            }
            
        },
        verifyCallback(response) {
            this.$emit('verified', response);
        }
    }
  };
  </script>
  
  <style scoped>
  .g-recaptcha {
    display: block;
  }
  </style>