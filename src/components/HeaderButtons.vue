
<template>
  <header v-if="!is_none" class="header__wrapper">
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
          <li :class="{ 'active': this.$route.path.includes('/LK') }">
            <router-link @click="liClicked" :class="{ 'active': this.$route.path.includes('/LK') }"
              class="custom__link text-decoration-none" to="/LK">
              Личный кабинет
            </router-link>
          </li>
          <li><router-link v-if="loggedIn" class="custom__link text-decoration-none" to="/login">Выйти</router-link></li>
        </ul>
      </section>
    </div>
  </header>
</template>

<script>

export default {
  name: 'HeaderButtons',
  data() {
    return {
      routes: {},
      width: 0
    }
  },
  created() {
    this.routes = this.$store.state.routes
    this.width = window.innerWidth;
  },
  methods: {
    liClicked() {
      document.getElementById('menu-toggle').click()
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    is_none() {
      return !this.loggedIn
    }
  }
}

</script>
<style scoped>
header {
  background: #00d4ff;
  /* background: linear-gradient(180deg, rgba(47, 130, 253, 1) 22%, rgba(22, 116, 253, 1) 71%); */
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

}

.menu {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
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
    z-index: 1;
  }
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
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
    z-index: 1;
  }

  #menu-toggle~.menu li {
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
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

.custom__link:after {
  display: block;
  content: "";
  height: 1px;
  width: 0%;
  background-color: #225384;
  transition: width 0.4s ease-in-out;
}

.custom__link:hover:after,
.custom__link:focus:after {
  width: 100%;
}

.custom__link.active:after {
  width: 100%;
}

.custom__link:hover {
  color: #225384;
}
</style>
  