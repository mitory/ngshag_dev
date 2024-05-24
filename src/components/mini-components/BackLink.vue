<template>
    <div class="mb-2">
        <div class="cursor" @click="this.$router.back()">
            <img src="../../assets/img/arrow_back.svg" alt="назад" style="width: 20px" />
            <span class="text-white link_svg_text">{{ text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
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