<template>
    <div v-if="!is_none" class="mb-5 mt-2 p-2 bg-primary bg-gradient">
        <div class="d-flex justify-content-end container">

            <router-link v-if="loggedIn && this.routes.isProfilePage" class="btn btn-light me-3" to="/LK">
                Личный кабинет
            </router-link>


            <router-link v-if="this.routes.isMainPage" class="btn btn-light me-3" to="/">
                Главная
            </router-link>

            <router-link v-if="!loggedIn && this.routes.isLoginPage" class="btn btn-light me-3" to="/login">
                Войти
            </router-link>

            <router-link v-if="!loggedIn && this.routes.isRegPage" class="btn btn-light me-3" to="/reg">
                Зарегистрироваться
            </router-link>

            <router-link v-if="loggedIn" class="btn btn-light me-3" to="/login">Выйти</router-link>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'HeaderButtons',
    data() {
        return {
            routes: {},
        }
    },
    created() {
        this.routes = this.$store.state.routes
    },
    methods: {
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        },
        is_none() {
            console.log(this.$route.path)
            return !this.loggedIn || this.$route.path === '/set-user-skills'
        }
    }
}
</script>
  
<style scoped></style>
  