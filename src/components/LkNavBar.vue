<template>
    <nav class="nav nav-pills nav-fill flex-column">
        <div class="nav-item" v-for="(page, index) in pages" :key="page.id">
            <router-link v-on:click="page_select = index" class="nav-link" :to="{ path: page.path }"
                v-bind:class="{ 'active': page_select === index, 'text-secondary': page_select !== index }"
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
                    path: '/LK/my-teams',
                    title: 'Мои соревнования'
                }
            ],
            page_select: 0
        }
    },
    components: {
    },
    methods: {
    }
}
</script>

<style scoped></style>