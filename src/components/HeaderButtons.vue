
<template>
  <div v-if="loggedIn" class="wrapp_for_menu">
    <header class="header__wrapper">
      <div class="header">
        <section class="top-nav">
          <div>
            <router-link class="navbar-brand" to="/">
              <img style="height: 2em;" src="../assets/img/main_logo2.svg" alt="Новый Шаг" />
            </router-link>
          </div>
          <input id="menu-toggle" type="checkbox" />
          <label class='menu-button-container' for="menu-toggle">
            <div class='menu-button'></div>
          </label>
          <ul class="menu">
            <li :class="{ 'active': this.$route.path === '/' }">
              <router-link @click="liClicked" :class="{ 'active': this.$route.path === '/' }"
                class="custom__link text-decoration-none" to="/">Главная</router-link>
            </li>
            <li :class="{ 'active': this.$route.path === '/news' }">
              <router-link @click="liClicked" :class="{ 'active': this.$route.path === '/news' }"
                class="custom__link text-decoration-none" to="/news">Новости</router-link>
            </li>
            <li :class="{ 'active': this.$route.path === '/page/regulations-project' }">
              <router-link @click="liClicked" :class="{ 'active': this.$route.path === '/page/regulations-project' }"
                class="custom__link text-decoration-none" to="/page/regulations-project">Правила</router-link>
            </li>
            <li :class="{ 'active': this.$route.path === '/page/about-project' }">
              <router-link @click="liClicked" :class="{ 'active': this.$route.path === '/page/about-project' }"
                class="custom__link text-decoration-none" to="/page/about-project">О проекте</router-link>
            </li>
            <li :class="{ 'active': this.$route.path.includes('/LK') }" class="d-none d-lg-block">
              <router-link @click="liClicked" :class="{ 'active': this.$route.path.includes('/LK') }"
                class="custom__link text-decoration-none" to="/LK" title="Личный кабинет">
                <img src="../assets/icons/profile.svg" class="" style="width: 30px;"/>
              </router-link>
            </li>
            <li :class="{ 'active_circle': is_show}" 
                class="cursor text-decoration-none li_with_circle notify-bar custom_link__notify d-none d-lg-block"
                @click="changeShowNotify" title="Уведомления">
                  <NotifySVG :color="is_show ? '#071434' : '#f2f2f2'"></NotifySVG>
                  <div class="new-notify-active" v-show="count_new_notify">{{count_new_notify}}</div>
            </li>
            <li>
                <router-link v-if="loggedIn" class="custom__link text-decoration-none" to="/login" title="Выйти">
                  <img src="../assets/icons/exit.svg" class="" style="width: 30px;"/>
                </router-link>
            </li>
          </ul>
        </section>
      </div>
    </header>
    <div class="d-flex justify-content-center gap-1 d-lg-none mobail-menu align-items-center"
          :class="{'one-active-elem': is_show && this.$route.path.includes('/LK'), 
                    'one-elem': this.$route.path.includes('/LK') && !is_show}">
      <div :class="{ 'd-none': this.$route.path.includes('/LK') }" @click="hideNotify">
        <router-link
          class="custom__link text-decoration-none" to="/LK" title="Личный кабинет">
          <img src="../assets/icons/profile.svg" class="" style="width: 30px;"/>
        </router-link>
      </div>
      <div :class="{ 'active_circle': is_show }" 
          class="cursor li_with_circle notify-bar custom_link__notify"
          @click="changeShowNotify" title="Уведомления">
            <NotifySVG :color="is_show ? '#071434' : '#f2f2f2'"></NotifySVG>
            <div class="new-notify-active" v-show="count_new_notify">{{count_new_notify}}</div>
      </div>
    </div>
    <div class="user-notify__wrapper">
      <UserNotify class="user-notify" :class="{'active-notify': is_show}"/>
    </div>
  </div>
</template>

<script>
import NotifySVG from './ReactSVG/NotifySVG'
import UserNotify from './UserNotify'

export default {
  name: 'HeaderButtons',
  data() {
    return {
      routes: {},
      width: 0
    }
  },
  components: {
    NotifySVG, UserNotify
  },
  created() {
    this.routes = this.$store.state.routes
    this.width = window.innerWidth;
  },
  methods: {
    liClicked() {
      document.getElementById('menu-toggle').click()
    },
    changeShowNotify(){
      if(this.is_show){
          this.$store.dispatch("notify/updateOldNotify")
      }
      this.$store.dispatch("notify/change_show")
    },
    hideNotify() {
      if(this.is_show){
          this.$store.dispatch("notify/updateOldNotify")
          this.$store.dispatch("notify/set_show", false)
      }
    }
    
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    is_show() {
        return this.$store.state.notify.is_show_menu
    },
    count_new_notify() {
        return this.$store.state.notify.new_notifications.length
    }
  }
}

</script>
<style scoped>
.wrapp_for_menu {
  position: relative;
}
.mobail-menu {
  position: fixed;
  top: 70px;
  left: calc(50% - 32px);
  background: transparent;
  z-index: 20;
}

.mobail-menu.one-elem {
  left: calc(50% - 16px);
}
.one-active-elem {
  left: calc(50% - 26px);
}
.notify-bar {
  position: relative;
}
.user-notify__wrapper {
  position: relative;
}
.new-notify-active {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 15px;
  height: 15px;
  background: var(--color-main-blue);
  border-radius: 50%;
  font-size: 10px;
  text-align: center;
  color: white;
}
.user-notify {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: top 0.4s, z-index 0.4s;
  top: -100vh;
  right: 0;
}

.user-notify.active-notify {
  top: 0;
  animation: dropdown 0.4s forwards;
}
.user-notify:not(.active-notify) {
  animation: dropup 0.4s forwards;
}
@keyframes dropup {
  0% {
    top: 0;
    z-index: 10;
  }
  100% {
    top: -100vh;
    z-index: 1;
  }
}

@keyframes dropdown {
  0% {
    top: -100vh;
    z-index: 1;
  }
  100% {
    top: 0;
    z-index: 10;
  }
}
@media (max-width: 992px) {
  .user-notify {
    position: fixed;
  }
  .user-notify.active-notify {
    top: 64px;
  }
  @keyframes dropup {
    0% {
      top: 64px;
      z-index: 10;
    }
    100% {
      top: -100vh;
      z-index: 1;
    }
  }
  @keyframes dropdown {
    0% {
      top: -100vh;
      z-index: 1;
    }
    100% {
      top: 64px;
      z-index: 10;
    }
  }
}
/* */
@keyframes circleOut {
  0% {
    background-color: var(--color-white);
    border-radius: 50%;
    padding: 0.7rem;
  }
  100% {
    background-color: transparent;
    border-radius: 0;
    padding: 0;
  }
}
.li_with_circle:not(.active_circle) {
  animation: circleOut 0.5s forwards;
}

.active_circle {
  background-color: white;
  /* border-radius: 50% 50% 0% 0%; */
  border-radius: 50%;
  padding: 0.7rem;
  transition: background-color 0.3s, border-radius 0.3s, padding 0.3s;
  animation: circleIn 0.5s forwards;
} 
@keyframes circleIn {
  0% {
    background-color: transparent;
    border-radius: 0;
    padding: 0;
  }
  100% {
    background-color: white;
    /* border-radius: 50% 50% 0% 0%; */
    border-radius: 50%;
    padding: 0.7rem;
  }
}

header {
  background: #00d4ff;
  z-index: 20;
  position: relative;
  /* background: linear-gradient(180deg, rgba(47, 130, 253, 1) 22%, rgba(22, 116, 253, 1) 71%); */
}
.header__wrapper {
  z-index: 20;
}

h2 {
  vertical-align: center;
  text-align: center;
}

html,
body {
  margin: 0;
  height: 100%;
}

* {
  box-sizing: border-box;
}

.top-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #FFF;
  height: 50px;
  padding: 2em;
  position: relative;
  z-index: 11;

}

.menu {
  display: flex;
  align-items: center;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 20;
}

.menu>li {
  margin: 0 1rem;
  overflow: hidden;
}

.menu-button-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-toggle {
  display: none;
  z-index: 22;
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  width: 30px;
  /*transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);*/
  border-radius: 2px;
}

.menu-button::before {
  content: '';
  margin-top: -8px;
}

.menu-button::after {
  content: '';
  margin-top: 8px;
}

#menu-toggle:checked+.menu-button-container .menu-button::before {
  margin-top: 0px;
  transform: rotate(405deg);
}

#menu-toggle:checked+.menu-button-container .menu-button {
  background: rgba(255, 255, 255, 0);
}

#menu-toggle:checked+.menu-button-container .menu-button::after {
  margin-top: 0px;
  transform: rotate(-405deg);
}

@media (max-width: 992px) {
  .header__wrapper {
    margin-bottom: 64px;
  }
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 22;
    background: #00d4ff;
  }
  .menu-button-container {
    display: flex;
  }

  .menu {
    position: absolute;
    top: 0;
    margin-top: 4em;
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    
  }
  .header__wrapper {
    z-index: 40;
  }

  #menu-toggle~.menu li {
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 22;
  }

  #menu-toggle:checked~.menu li {
    border-bottom: 1px solid #ffffff;
    height: 2.5em;
    padding: 0.5em;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu>li {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0.5em 0;
    width: 100%;
    background: var(--color-second-blue);
    /*background: linear-gradient(180deg, rgba(47,130,253,1) 22%, rgba(22,116,253,1) 71%);*/
  }

  .menu>li:not(:last-child) {
    border-bottom: 1px solid #444;
  }

  .menu li.active {
    background-color: white;
  }
}



@media (max-width: 992px) {
  .custom__link {
    font-size: 1.1rem;
  }

  .custom__link:hover:after,
  .custom__link:focus:after {
    display: none;
  }

  .custom__link.active:after {
    display: none;
  }

  .custom__link.active {
    color: black;
  }
}

.custom__link {
  color: white;
  font-size: 1.1rem;
}

.custom__link:after,
.custom_link__notify:after {
  display: block;
  content: "";
  height: 1px;
  width: 0%;
  background-color: #225384;
  transition: width 0.4s ease-in-out;
}

.custom__link:hover:after,
.custom__link:focus:after,
.custom_link__notify.active_circle:hover:after {
  width: 100%;
}

.custom__link.active:after {
  width: 100%;
}

.custom__link:hover {
  color: #225384;
}
</style>
  