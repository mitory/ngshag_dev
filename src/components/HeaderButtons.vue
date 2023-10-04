
<template>
  <!--    <header v-if="!is_none" class="mb-5 p-2 bg-primary bg-gradient">
        <div class="container d-flex justify-content-between flex-sm-row"
            :class="{ 'flex-column-reverse': !this.$route.path.includes('/LK') }">
            <nav class="text-white d-flex justify-content-center align-items-center col-lg-8">
                <router-link
                    :class="{ 'active': this.$route.path === '/', 'me-1': width <= 350 && this.$route.path === '/LK', 'me-3': width > 350 || !this.$route.path.includes('/LK') }"
                    class="navbar__link text-decoration-none" to="/">Главная</router-link>
                <router-link
                    :class="{ 'active': this.$route.path === '/procedures', 'me-1': width <= 350 && this.$route.path === '/LK', 'me-3': width > 350 || !this.$route.path.includes('/LK') }"
                    class="navbar__link text-decoration-none" to="/policies-and-procedures">Правила</router-link>
                <router-link :class="{ 'active': this.$route.path === '/about-project' }"
                    class="navbar__link text-decoration-none" to="/about-project">О проекте</router-link>
            </nav>
            <div class="col-lg-4 col-xl-3">
                <div class="d-flex justify-content-sm-end justify-content-center mb-sm-0"
                    :class="{ 'mb-4': !this.$route.path.includes('/LK') }">

                    <router-link v-if="loggedIn && this.routes.isProfilePage" class="btn btn-light me-3" to="/LK">
                        Личный кабинет
                    </router-link>

                    <router-link v-if="loggedIn" class="btn btn-light" to="/login">Выйти</router-link>
                </div>
            </div>
        </div>
    </header>-->




  <header v-if="!is_none" class="mb-5 p-2 bg-primary bg-gradient">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient ">
      <div class="container-fluid d-lg-flex justify-lg-content-between">
        <a class="navbar-brand" href="#"><img style="height: 2em;" src="../assets/img/main_logo.svg" alt="Новый Шаг"/></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-md-flex justify-content-md-center gap-md-5 justify-content-lg-end"
          id="navbarTogglerDemo02">
          <ul class="navbar-nav text-center my-lg-auto mx-lg-auto">
            <li class="nav-item me-lg-3 my-auto">
              <router-link :class="{ 'active': this.$route.path === '/' }" class=" custom__link text-decoration-none"
                to="/">Главная</router-link>
            </li>
            <li class="nav-item  me-lg-3">
              <router-link :class="{ 'active': this.$route.path === '/policies-and-procedures' }"
                class="custom__link text-decoration-none" to="/policies-and-procedures">Правила</router-link>
            </li>
            <li class="nav-item">
              <router-link :class="{ 'active': this.$route.path === '/about-project' }"
                class="custom__link text-decoration-none" to="/about-project">О проекте</router-link>
            </li>
          </ul>
          <ul
            class="navbar navbar-nav navbar-right d-flex flex-row flex-md-column-reverse flex-lg-row justify-content-center">
            <li>
              <router-link v-if="loggedIn && this.routes.isProfilePage" class="btn btn-light me-3" to="/LK">
                Личный кабинет
              </router-link>
            </li>
            <li>
              <router-link v-if="loggedIn" class="btn btn-light mb-md-3 mb-0 mb-lg-0" to="/login">Выйти</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
    is_none() {
      return !this.loggedIn || this.$route.path === '/set-user-skills'
    }
  }
}

</script>
<style scoped>
@media (max-width: 992px) {
  .navbar-nav {
    font-size: 1.4rem;
  }

  .custom__link:hover:after,
  .custom__link:focus:after {
    display: none;
  }

  .custom__link.active:after {
    display: none;
  }

  .custom__link.active {
    border-bottom: 1px #225384 solid;
    transition: border-bottom 0.4s ease-in-out;
  }
}

.custom__link {
  color: white;
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
  