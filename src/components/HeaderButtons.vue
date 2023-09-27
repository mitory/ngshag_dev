<template>
    <header v-if="!is_none" class="mb-5 p-2 bg-primary bg-gradient">
        <div class="container d-flex justify-content-between flex-sm-row"
            :class="{ 'flex-column-reverse': this.$route.path !== '/LK' }">
            <nav class="text-white d-flex justify-content-center align-items-center col-lg-8">
                <router-link
                    :class="{ 'active': this.$route.path === '/', 'me-1': width <= 350 && this.$route.path === '/LK', 'me-3': width > 350 || this.$route.path !== '/LK' }"
                    class="navbar__link text-decoration-none" to="/">Главная</router-link>
                <router-link
                    :class="{ 'active': this.$route.path === '/procedures', 'me-1': width <= 350 && this.$route.path === '/LK', 'me-3': width > 350 || this.$route.path !== '/LK' }"
                    class="navbar__link text-decoration-none" to="/policies-and-procedures">Правила</router-link>
                <router-link :class="{ 'active': this.$route.path === '/about-project' }"
                    class="navbar__link text-decoration-none" to="/about-project">О проекте</router-link>
            </nav>
            <div class="col-lg-4 col-xl-3">
                <div class="d-flex justify-content-sm-end justify-content-center mb-sm-0"
                    :class="{ 'mb-4': this.$route.path !== '/LK' }">

                    <router-link v-if="loggedIn && this.routes.isProfilePage" class="btn btn-light me-3" to="/LK">
                        Личный кабинет
                    </router-link>

                    <router-link v-if="loggedIn" class="btn btn-light" to="/login">Выйти</router-link>
                </div>
            </div>
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
.navbar__link:after {
    display: block;
    content: "";
    height: 1px;
    width: 0%;
    background-color: #225384;
    transition: width 0.4s ease-in-out;
}

.navbar__link:hover:after,
.navbar__link:focus:after {
    width: 100%;
}

.navbar__link.active:after {
    width: 100%;
}

.navbar__link:hover {
    color: #225384;
}
</style>
  