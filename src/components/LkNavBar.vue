<template>
    <nav class="nav nav-pills nav-fill flex-column">
        <div class="nav-item" v-for="(page, index) in pages" :key="page.id">
            <router-link v-on:click="page_select = index" class="nav-link" :to="{ path: page.path }"
                :class="{ 'active': (this.$route.path === '/LK' && page.path === this.$route.path) || (this.$route.path !== '/LK' && page.path !== '/LK' && this.$route.path.startsWith(page.path)), 'text-secondary': !((this.$route.path === '/LK' && page.path === this.$route.path) || (this.$route.path !== '/LK' && page.path !== '/LK' && this.$route.path.startsWith(page.path))) }"
                v-bind:aria-current="{ 'page': page_select === index }">
                {{ page.title }}
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            pages: [
                {
                    id: 1,
                    path: '/LK',
                    title: 'Мой кабинет'
                },
                {
                    id: 2,
                    path: '/LK/set-user-skills',
                    title: 'Выбрать навыки'
                },
                {
                    id: 3,
                    path: '/LK/my-tasks',
                    title: 'Мои задачи'
                },
                {
                    id: 4,
                    path: '/LK/my-teams',
                    title: 'Мои команды'
                },
            ],
            page_select: 0
        }
    },
    components: {
    },
    created() {

    },
    methods: {
    }
}
</script>

<style scoped></style>