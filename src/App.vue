<template>
  <div class="d-flex flex-column justify-content-between" style="min-height: 100vh;">
    <div>
      <HeaderButtons></HeaderButtons>
      <router-view></router-view>
    </div>
    <FooterInfo />
    <!-- <AlertMessage v-show="this.$store.state.alert.is_show"/>
    <ModalWindow v-show="this.$store.state.modal.isOpen"/>
    <CreateTeam  v-show="this.$store.state.modalCreateTeam.isOpen" />
    <JoinTeam v-show="this.$store.state.modalJoinTeam.isOpen"/> -->
    <AlertMessage :class="{'d-none': !this.$store.state.alert.is_show, 'd-block': this.$store.state.alert.is_show}"/>
    <ModalWindow :class="{'d-none': !this.$store.state.modal.isOpen, 'd-block': this.$store.state.modal.isOpen}"/>
    <CreateTeam  :class="{'d-none': !this.$store.state.modalCreateTeam.isOpen, 'd-block': this.$store.state.modalCreateTeam.isOpen}" />
    <JoinTeam :class="{'d-none': !this.$store.state.modalJoinTeam.isOpen, 'd-block': this.$store.state.modalJoinTeam.isOpen}"/>
    <div class="cookie-modal templ-item__bg" v-if="is_show_accept_cookies">
      <p class="m-0">Мы используем cookies.</p>
      <button class="btn btn-primary m-0" @click="saveAcceptCookies()">Принять</button>
    </div>
    <div id="loading-screen" v-show="this.$store.state.loading.isShow">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import HeaderButtons from './components/General/HeaderButtons.vue';
import FooterInfo from './components/General/FooterInfo.vue';
import AlertMessage from './components/SigleComponents/AlertMessage.vue';
import ModalWindow from './components/SigleComponents/ModalWindow.vue';
import CreateTeam from './components/Event/CreateTeam.vue';
import JoinTeam from './components/Event/JoinTeam.vue';

export default {
  data() {
    return {
      is_show_accept_cookies: false
    }
  },
  components: {
    FooterInfo,
    HeaderButtons,
    AlertMessage,
    ModalWindow, CreateTeam, JoinTeam
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    is_start(){
      return this.$store.state.notify.status
    }
  },
  created() {
    this.$store.dispatch("auth/setup");
    if(this.loggedIn && !this.is_start){
      this.$store.dispatch("notify/start")
    }
    if(!JSON.parse(localStorage.getItem('accept-cookies-user'))) {
      this.is_show_accept_cookies = true;
    }
  },
  methods: {
    saveAcceptCookies() {
      localStorage.setItem('accept-cookies-user', JSON.stringify(true));
      this.is_show_accept_cookies = false;
    }
  }
}
</script>

<style>
#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(255, 255, 255, 0.8); */
    backdrop-filter: blur(50px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 150;
}

.spinner {
    border: 5px solid #fff;
    border-top: 5px solid var(--color-second-blue);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 0.5s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.cookie-modal {
  height: 60px;
  width: 500px;
  position: fixed;
  left: calc(50% - 250px);
  bottom: 20px;
  color: #fff;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  z-index: 100;
}
@media (max-width: 730px) {
  .cookie-modal{
    left: calc(50% - 200px);
    height: 60px;
    width: 400px;
    text-align: center;
 }
}
@media (max-width: 540px) {
  .cookie-modal{
    left: calc(50% - 175px);
    width: 350px;
 }
}
@media (max-width: 400px) {
  .cookie-modal{
    left: calc(50% - 150px);
    width: 300px;
 }
}
*::-webkit-scrollbar {
    width: 10px; 
}

*::-webkit-scrollbar-track {
    background: transparent; 
    border-radius: 20px; 
}

*::-webkit-scrollbar-thumb {
    background: var(--color-second-blue); 
    border-radius: 0; 
}

*::-webkit-scrollbar-thumb:hover {
    background: var(--color-main-blue); 
}
body {
    scrollbar-width: thin; /* делаем скроллбар тоньше */
    scrollbar-color: var(--color-white) transparent; /* цвет бегунка и фона */
}
  :root {
      --swiper-theme-color: white;
      --color-main-blue: #071434;
      --color-pre-main-blue: #102c72;
      --color-second-blue: #00d4ff;
      --color-white: #f2f2f2;
      --color-gray: #cecdcd;
      --color-black: #2d2d2d;
  }

  .bg_second-blue {
    background-color: var(--color-second-blue);
  }

  .btn.btn-primary, .btn.btn-light {
    border: 2px solid rgba(255, 255, 255, .1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, .2);
    backdrop-filter: blur(50px);
    color: var(--color-black);
  }

  .btn.btn-primary {
    background: var(--color-white);
  }
  .btn.btn-primary:hover {
    background: var(--color-main-blue);
    border: 2px solid rgba(255, 255, 255, .1);
  }
  .btn.btn-light {
    background: var(--color-gray);
  }

  

  .btn.btn-primary:active, .btn.btn-primary:focus, .btn.btn-primary:visited {
    background: var(--color-main-blue);
    border: 2px solid rgba(255, 255, 255, .1);
  }

  .swiper-button-prev::after, .swiper-button-next::after {
    color: var(--color-white);
    font-size: 30px !important;
  }

  .swiper-pagination-bullet-active {
    background: var(--color-second-blue)  !important;
  }

  .templ_bg {
    background-size: 100% 100%;
    color: #fff;
    min-height: 100vh; 
    min-height: calc(var(--vh, 1vh) * 100);
  }

  .templ_bg  .form-template {
    max-width: 400px;
    border: 2px solid rgba(255, 255, 255, .1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, .2);
    backdrop-filter: blur(50px);
  }

  .bg__blue {
    background: radial-gradient(circle, rgba(2,0,36,1) 12%, rgba(5,10,44,1) 30%, rgba(7,20,52,1) 43%, rgba(6,57,91,1) 55%, rgba(4,107,144,1) 66%, rgba(4,111,148,1) 73%, rgba(3,129,167,1) 85%, rgba(0,212,255,1) 97%);
  }

  .bg_blue {
    background: var(--color-main-blue);
  }

  .text-blue {
    color: var(--color-main-blue);
    
  }
  .text-second-blue {
    color: var(--color-second-blue);
}

  .form-check-input:checked {
    background-color: var(--color-main-blue) !important;
    border-color: var(--color-second-blue) !important;
}

  .templ-item__bg {
    border: 2px solid rgba(255, 255, 255, .1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, .2);
    backdrop-filter: blur(50px);
  }

  .form-template h2 {
    color: var(--color-black);
    background: var(--color-white);
    border-radius: 10px;
  }

  .input {
    width: 150px;
    outline: none;
    border: none;
    font-size: 16px;
    padding: 3px;
    border-radius: 10px;
    color: var(--color-black);
    padding-left: 10px;
  }
  .link {
    outline: none;
    border: none;
    background: transparent;
    text-decoration: underline;
  }
  a.text-white {
    color: var(--color-white) !important;
  }
  .bg_white {
    background: var(--color-white)
  }
  .hover-btn:hover {
    color: var(--color-main-blue);
  }
  .hover-btn:active, .hover-btn:focus, .hover-btn:visited {
    background: var(--color-main-blue) !important;
  }

  .link.hover-btn:hover {
    color: var(--color-second-blue) !important;
  }
  .border-danger {
    border: 2px solid red;
  }
  @media (max-width: 992px) {
    .input {
      width: 300px;
    }
    .input-box {
      display: flex;
      flex-direction: column;
    }
  }

  .cursor:hover {
    cursor: pointer;
  }

  .text-black {
    color: var(--color-black) !important;
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

  .box-answer {
      display: flex;
      gap: 5px;
  }
  .answer {
      width: 20px;
      height: 20px;
      background: #aaa;
      border-radius: 10px;
      text-align: center;
      line-height: 20px;
      margin-top: 2px;
  }
  .answer:hover {
      cursor: pointer;
      background: var(--color-pre-main-blue);
  }
  .answer.ans-active {
      background: var(--color-pre-main-blue);
  }
  .answer.ans-active:hover {
      background: var(--color-gray);;
  }

  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal .modal-content {
    background: var(--color-second-blue);
    border: 2px solid rgba(255, 255, 255, .1);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 255, 255, .2);
    backdrop-filter: blur(50px);
    margin: auto;
    margin-top: 15vh;
    padding: 20px;
    /* border: 1px solid #888; */
    width: 60%;
    color: var(--color-white);
  }

  @media (max-width: 700px) {
      .modal .modal-content {
        width: 80%;
      }
    }
  .modal .modal-content .modal__html {
    max-height: 60vh;
    /* min-height: 30vh; */
    overflow-y: auto;
    margin: 0 auto;
  }
  .modal .modal-content .close {
    width: 28px;
    color: var(--color-white);
    font-size: 28px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .modal .modal-content .close:hover,
  .modal .modal-content .close:focus {
    color: var(--color-black);
    text-decoration: none;
    cursor: pointer;
  }
</style>
