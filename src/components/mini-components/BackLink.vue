<template>
    <div class="mb-2">
        <router-link :to="link">
            <img src="../../assets/img/arrow_back.svg" :alt="text" style="width: 20px" />
            <span class="text-dark link_svg_text">{{ text }}</span>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        link: String,
        text: String
    },
    data() {
        return {

        }
    },
    components: {

    },
    methods: {

    }
}
</script>

<style scoped></style>